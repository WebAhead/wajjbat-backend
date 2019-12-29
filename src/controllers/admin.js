const { getAllBussiness } = require("../queries/getAllBusinesses");
const { getAllUsers } = require("../queries/getAllUsers");

const { getaUserById } = require("../queries/getaUserById");
const { editUserById } = require("../queries/editUserById");
const { getAllFromBusinesse } = require("../queries/getBusinessesById");
const { editBusinesById } = require("../queries/editBusinesById");
const { getReviewsByUserId } = require("../queries/getReviewsByUserId");
const { deleteReviewById } = require("../queries/deleteReviewById");

exports.businesses = async (req, res) => {
  try {
    const { rows: allBusinesses } = await getAllBussiness();

    const normalizedAllBusinesses = allBusinesses.map(item => ({
      ...item,
      approved: item.approved === "approved"
    }));

    res.append("Access-Control-Expose-Headers", "Content-Range");
    res.set("Content-Range", "businesses 0-24/100");
    res.json(normalizedAllBusinesses);
  } catch (err) {
    console.log(err);
  }
};

exports.users = async (req, res) => {
  try {
    const { rows: allUsers } = await getAllUsers();

    res.append("Access-Control-Expose-Headers", "Content-Range");
    res.set("Content-Range", "businesses 0-24/100");
    res.json(allUsers);
  } catch (err) {
    console.log(err);
  }
};

exports.usersId = async (req, res) => {
  const id = req.params.id;
  try {
    const { rows: user } = await getaUserById(id);
    res.json(user);
  } catch (err) {
    console.log(err);
  }
};

exports.editUserById = async (req, res) => {
  const data = req.body;
  try {
    await editUserById(data);
    res.send({ success: true });
  } catch (error) {
    console.log(error);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const result = await getaUserById(req.params.id);
    res.send(result.rows[0]);
  } catch (error) {
    console.log(error);
  }
};

exports.getBusinesseById = async (req, res) => {
  try {
    const result = await getAllFromBusinesse(req.params.id);
    res.send(result.rows[0]);
  } catch (error) {
    console.log(error);
  }
};

exports.editBusinesById = async (req, res) => {
  const data = req.body;
  try {
    await editBusinesById({ ...data, id: req.params.id });
    res.send({ success: true });
  } catch (error) {
    console.log(error);
  }
};

exports.getReviewsByUserId = async (req, res) => {
  try {
    const { rows: reviews } = await getReviewsByUserId(req.params.id);

    //change date format
    Reviews = reviews.map(item => {
      return {
        ...item,
        reviewdate: item.reviewdate.toISOString().split("T")[0]
      };
    });

    res.json(Reviews);
  } catch (error) {
    console.log(error);
  }
};

exports.deleteReviewById = async (req, res) => {
  try {
    await deleteReviewById(req.params.id);
    res.send({ success: true });
  } catch (error) {
    console.log(error);
  }
};
