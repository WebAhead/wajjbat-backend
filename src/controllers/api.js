const { calculatDestance } = require("../../helpers/calculatDestance");
const JWT = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config/keys');
const { getBusinesses, topRating } = require("../queries/getBusinesses");
const {
  getBusinesseImages,
  getBusinesseReviews,
  getAllFromBusinesse,
  getBusinesseAvgRating
} = require("../queries/getBusinessesById");
const { addNewReview } = require("../queries/addNewReview");

signToken = user => {
  return JWT.sign({
    iss: 'CodeWorkr',
    sub: user.id,
    iat: new Date().getTime(), // current time
    exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
  }, JWT_SECRET);
};

exports.businesses = async (req, res) => {
  const userLocation = req.body;
  try {
    const result = await getBusinesses();
    const tops = await topRating();
    const topsWithoutNullRating = tops.rows.filter(
      ({ rating }) => rating !== null
    );
    // businessWithDestince include business with Cfrom user location
    let businessWithDestince = [];
    // this foreach creat arrays whitch business details include sortByDist
    // calculatDestance is a function from geolib package that calculat distance between 2 points
    result.rows.forEach(business => {
      const { lat, lng } = business;
      const businessLocation = { lat, lng };
      const distance = calculatDestance(businessLocation, userLocation);
      businessWithDestince = [
        ...businessWithDestince,
        { ...business, distance }
      ];
    });
    // this function sorts business by distance from user location
    const sortByDist = businessWithDestince.sort(
      (a, b) => a.distance - b.distance
    );

    // this is the data that we return to the browser
    // [topsWithoutNullRating] witch is the top 5 rating businnes
    //  [sortByDist] : sortting business by distance from user location
    res.status(200).json({
      topRated: [topsWithoutNullRating],
      businesses: [sortByDist]
    });
  } catch (err) {
    console.log("Error on businesses", err);
  }
};

exports.businessesId = async (req, res) => {
  const id = req.params.id;
  try {
    const { rows: allBusinessImages } = await getBusinesseImages(id);
    let { rows: businessReviews } = await getBusinesseReviews(id);
    const { rows: business } = await getAllFromBusinesse(id);
    let { rows: businesseAvgRating } = await getBusinesseAvgRating(id);

    // sometimes businesseAvgRating is null , so we must check this option. if its not we concat it to the business info
    // we want to avoid the case of 3.3333333 so we use Math.round to fix it .

    businesseAvgRating = Math.round(businesseAvgRating[0].avg);
    const businesseWithRate = {
      ...business[0],
      rating: businesseAvgRating === 0 ? null : businesseAvgRating
    };

    // to fix the date and concat the result to items
    businessReviews = businessReviews.map(item => {
      return {
        ...item,
        dateCreated: item.datecreated.toISOString().split("T")[0],
        datecreated: undefined
      };
    });

    // finally, this is the result that we return
    res.json({
      primaryImage: business[0].primaryimage,
      subImages: allBusinessImages.map(item => item.image_url),
      details: businesseWithRate,
      reviews: [businessReviews][0]
    });
  } catch (err) {
    console.log(err);
  }
};

exports.newReview = (req, res) => {
  const data = req.body;
  addNewReview(data)
    .then(res.status(200).send("the data added successfully"))
    .catch(err => console.log(err));
};

exports.googleOAuth = async (req, res, next) => {
  // Generate token
  console.log('got here');
  const token = signToken(req.user);
  res.status(200).json({ token });
};

exports.facebookOAuth = async (req, res, next) => {
  // Generate token
  const token = signToken(req.user);

  res.status(200).json({ token });
}
