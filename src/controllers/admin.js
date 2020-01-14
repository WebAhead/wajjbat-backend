import { getAllBussiness } from '../queries/getAllBusinesses';
import { getAllUsers } from '../queries/getAllUsers';

import { getaUserById } from '../queries/getaUserById';
import { editUserById } from '../queries/editUserById';
import { editBusinesById } from '../queries/editBusinesById';
import { getReviewsByUserId } from '../queries/getReviewsByUserId';
import { deleteReviewById } from '../queries/deleteReviewById';

export async function businesses (req, res) {
  try {
    const { rows: allBusinesses } = await getAllBussiness();

    const normalizedAllBusinesses = allBusinesses.map(item => ({
      ...item,
      approved: item.approved
    }));

    res.append('Access-Control-Expose-Headers', 'Content-Range');
    res.set('Content-Range', 'businesses 0-24/100');
    res.json(normalizedAllBusinesses);
  } catch (err) {
    console.log(err);
  }
}

export async function users (req, res) {
  try {
    const { rows: allUsers } = await getAllUsers();

    res.append('Access-Control-Expose-Headers', 'Content-Range');
    res.set('Content-Range', 'businesses 0-24/100');
    res.json(allUsers);
  } catch (err) {
    console.log(err);
  }
}

export async function usersId (req, res) {
  const id = req.params.id;
  try {
    const { rows: user } = await getaUserById(id);
    res.json(user);
  } catch (err) {
    console.log(err);
  }
}

const _editUserById = async (req, res) => {
  const data = req.body;
  try {
    await editUserById(data);
    res.send({ success: true });
  } catch (error) {
    console.log(error);
  }
};
export { _editUserById as editUserById };

export async function getUserById (req, res) {
  try {
    const result = await getaUserById(req.params.id);
    res.send(result.rows[0]);
  } catch (error) {
    console.log(error);
  }
}

export async function getBusinesseById (req, res) {
  try {
    // change to Business model
    // const result = await getAllFromBusinesse(req.params.id);
    // const { rows: subImages } = await getBusinesseImages(req.params.id);
    // result.rows[0].subImages = subImages;
    // res.send(result.rows[0]);
  } catch (error) {
    console.log(error);
  }
}

const _editBusinesById = async (req, res) => {
  const data = req.body;
  try {
    await editBusinesById({ ...data, id: req.params.id });
    res.send({ success: true });
  } catch (error) {
    console.log(error);
  }
};
export { _editBusinesById as editBusinesById };

const _getReviewsByUserId = async (req, res) => {
  try {
    const { rows: reviews } = await getReviewsByUserId(req.params.id);
    // change date format
    Reviews = reviews.map(item => {
      return {
        ...item,
        reviewdate: item.reviewdate.toISOString().split('T')[0]
      };
    });
    res.json(Reviews);
  } catch (error) {
    console.log(error);
  }
};
export { _getReviewsByUserId as getReviewsByUserId };

const _deleteReviewById = async (req, res) => {
  try {
    await deleteReviewById(req.params.id);
    res.send({ success: true });
  } catch (error) {
    console.log(error);
  }
};
export { _deleteReviewById as deleteReviewById };
