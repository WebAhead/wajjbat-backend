const { getAllBussiness } = require("../queries/getAllBusinesses");
const { getAllUsers } = require("../queries/getAllUsers");

const { getaUserById } = require("../queries/getaUserById");
const { getAllFromBusinesse } = require("../queries/getBusinessesById");
const { editBusinesById } = require("../queries/editBusinesById");

exports.businesses = async (req, res) => {
  try {
    const { rows: allBusinesses } = await getAllBussiness();

    res.append("Access-Control-Expose-Headers", "Content-Range");
    res.set("Content-Range", "businesses 0-24/100");
    res.json(allBusinesses);
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
    console.log(1, result);
    res.send(result.rows[0]);
  } catch (error) {
    console.log(error);
  }
};

exports.getBusinesseById = async (req, res) => {
  try {
    const result = await getAllFromBusinesse(req.params.id);
    console.log(1, result);
    res.send(result.rows[0]);
  } catch (error) {
    console.log(error);
  }
};

exports.editBusinesById = async (req, res) => {
  const data = req.body;
  try {
    await editBusinesById(data);
    res.send({ success: true });
  } catch (error) {
    console.log(error);
  }
};
