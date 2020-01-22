// import { deleteReviewById } from '../queries/deleteReviewById';

import Business from '../queries/Business';
import User from '../queries/User';
import Review from '../queries/Review';

export async function businesses (req, res, next) {
  try {
    // maxShow is how essentially how many rows to show
    const { offset, limit, maxShow } = req.pagination;

    const businesses = await Business.all(offset, limit);

    res.set('Content-Range', `businesses ${offset}-${maxShow}/${businesses[0].rows_count}`);
    res.json(businesses);
  } catch (err) {
    next(err);
  }
}

export async function users (req, res, next) {
  const { offset, limit, maxShow } = req.pagination;

  try {
    const users = await User.all(offset, limit);

    res.set('Content-Range', `users ${offset}-${maxShow}/${users[0].rows_count}`);

    res.json(users);
  } catch (err) {
    next(err);
  }
}

export async function editUserById (req, res, next) {
  const { first_name, last_name, id } = req.body;

  try {
    await User.adminEdit({ first_name, last_name, id });

    res.send({ success: true });
  } catch (error) {
    next(error);
  }
};

export async function getUserById (req, res, next) {
  try {
    const user = await User.findById(req.params.id);

    res.json(user);
  } catch (error) {
    next(error);
  }
}

export async function getBusinesseById (req, res, next) {
  try {
    const business = await Business.getBusinessById(req.params.id);
    console.log(business);

    res.send(business);
  } catch (error) {
    next(error);
  }
}

export async function editBusinesById (req, res, next) {
  const data = req.body;
  try {
    if (data.statusChange) {
      await Business.changeStatus(data.status);
    }

    await Business.edit({ ...data, id: req.params.id });

    res.send({ success: true });
  } catch (error) {
    next(error);
  }
};

export const getReviewsByUserId = async (req, res, next) => {
  try {
    const reviews = await Review.getByUserId(req.params.id);

    const normalizedReviews = reviews.map(item => ({
      ...item,
      reviewdate: item.created_at.toISOString().split('T')[0]

    }));

    res.json(normalizedReviews);
  } catch (error) {
    next(error);
  }
};

export const deleteReviewById = async (req, res, next) => {
  try {
    await Review.delete(req.params.id);

    res.send({ success: true });
  } catch (error) {
    next(error);
  }
};
