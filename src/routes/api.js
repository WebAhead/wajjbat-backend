const express = require("express");
const router = express.Router();
const { getBusinesses, topRating } = require("../queries/getbusinesses");
const {
  getPrimaryImage,
  getBusinesseImages,
  getBusinesseReviews,
  getAllFromBusinesse,
  getBusinesseAvgRating
} = require("../queries/getbusinessesbyid");

router.get("/businesses", async (req, res) => {
  try {
    const result = await getBusinesses();
    const tops = await topRating();
    res.json({
      topRated: [tops.rows[0]],
      businesses: [result.rows[0]]
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/businesses/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const { rows: primaryImage } = await getPrimaryImage(id);
    const { rows: allBusinessImages } = await getBusinesseImages(id);
    let { rows: businessReviews } = await getBusinesseReviews(id);
    const { rows: businesse } = await getAllFromBusinesse(id);
    let { rows: businesseAvgRating } = await getBusinesseAvgRating(id);

    // sometimes businesseAvgRating is null , so we must check this option. if its not we concat it to the business info
    // we want to avoid the case of 3.3333333 so we use Math.round to fix it .
    let businesseWithRate;
    if (businesseAvgRating != null) {
      businesseAvgRating = Math.round(businesseAvgRating[0].avg);
      businesseWithRate = {
        ...businesse[0],
        rating: businesseAvgRating
      };
    } else {
      businesseWithRate = { ...businesse[0] };
    }

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
      primaryImage: primaryImage[0].primaryimage,
      subImages: allBusinessImages.map(item => item.image_url),
      details: businesseWithRate,
      reviews: [businessReviews][0]
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
