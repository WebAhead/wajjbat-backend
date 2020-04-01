import { sign } from 'jsonwebtoken';
import { calculatDestance } from '../utils/calculatDestance';

import Business from '../queries/Business';
import User from '../queries/User';
import Review from '../queries/Review';
import UsersFollowBusinesses from '../queries/UsersFollowBusinesses';

export async function businesses (req, res) {
  const userLocation = req.body;

  try {
    const result = await Business.getBusinessesWithRating();
    const topRated = await Business.getTopRated();

    // this will add the distance from the user location to the business
    // and then sort by the closest
    const closestBusinesses = result.map(business => {
      const { lat, lng } = business;

      const distance = calculatDestance({ lat, lng }, userLocation);

      return { ...business, distance };
    })
      .sort((a, b) => a.distance - b.distance);

    //  [topRated] witch is the top 5 rating businnes
    //  [businesses] : sorted businesses by distance from user location
    res.status(200).json({
      topRated,
      businesses: closestBusinesses
    });
  } catch (err) {
    console.log('Error on businesses', err);
  }
}

export async function businessesId (req, res) {
  const id = req.params.id;

  try {
    const result = await Business.getBusinessById(id);

    res.json({
      primaryImage: result.image,
      subImages: result.images,
      details: result,
      reviews: result.reviews
    });
  } catch (err) {
    console.log(err);
  }
}

export async function newBusiness (req, res, next) {
  try {
    const response = await Business.create(req.body);

    res.status(200).send({
      success: true,
      msg: 'New Business added'
    });
  } catch (err) {
    next(err);
  }
}

export async function newReview (req, res, next) {
  try {
    await Review.addReview(req.body);

    res.status(200).send({
      success: true,
      msg: 'the data added successfully'
    });
  } catch (error) {
    next(error);
  }
}

export async function oauthHandler (req, res, next) {
  try {
    const user = await User.findUserEmail(req.body.email);

    if (!user.length) {
      // create the new user if it does not exist
      const result = await User.addNewUser(
        req.body.name.split(' ')[0],
        req.body.name.split(' ').slice(1).join(' '),
        req.body.email,
        req.body.url
      );

      // if something goes wrong with the insertion send an error
      if (!result) {
        next(new Error('Something went wrong'));
      }
    }

    // set the auth cookie
    res.cookie('wajjbat_access_token',
      sign({ email: req.body.email }, process.env.JWT_SECRET), { maxAge: 1000 * 60 * 60 });

    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
}

export async function businessesList (req, res, next) {
  try {
    const businessList = await User.bussinessList(req.user.id);

    res.status(200).send(businessList);
  } catch (err) {
    next(err);
  }
}

export async function getUserReviews (req, res) {
  try {
    // User.getUserReviews missing some things
    let reviews = await User.getUserReviews(req.user.id);

    reviews = reviews.map(review => ({
      ...review,
      reviewdate: review.reviewdate.toISOString().split('T')[0]
    }));

    res.json({
      userDetails: {
        firstName: req.user.first_name,
        lastName: req.user.last_name,
        profilePic: req.user.profile_image
      },
      reviews
    });
  } catch (err) {
    console.log(err);
  }
}

export async function getFollowingByUserId (req, res) {
  try {
    // UsersFollowBusinesses.getFollowingByUserId
    const following = await UsersFollowBusinesses.getFollowingByUserId(req.params.userid)
    res.json({
      following
    });
  } catch (err) {
    console.log(err);
  }
}

export async function getBusinessFollowers (req, res) {
  try {
    // UsersFollowBusinesses.getFollowersByBusinessId
    const followers = await UsersFollowBusinesses.getFollowersByBusinessId(req.params.businessid);
    res.json({
      followers
    });
  } catch (err) {
    console.log(err);
  }
}

export async function getReviewsByReviewrId (req, res) {
  try {
    const reviewer_id = req.params.reviewerid;
    let reviews = await User.getUserReviews(reviewer_id);
    const userDetails = await User.findById(reviewer_id);

    reviews = reviews.map(review => ({
      ...review,
      reviewdate: review.reviewdate.toISOString().split('T')[0]
    }));

    res.json({
      userDetails,
      reviews
    });
  } catch (err) {
    console.log(err);
  }
}
