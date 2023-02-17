const { matchedData } = require("express-validator");
const { userModel } = require("../models/");
const getProperties = require("../utils/handleDBEngineProperties");
const { handleHttpError } = require("../utils/handleError");


const getItem = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const query = {
      [getProperties.id]: id,
    }

    const data = await userModel.findOne(query);
    const response = data ? data : "NOT_FOUND";
    res.send({ response });
  } catch (e) {
    handleHttpError(res, "ERROR_GET_ITEM");
  }
};

const getItems = async (req, res) => {
  try {
    const response = await userModel.find({});
    res.send({ response });
  } catch (e) {
    handleHttpError(res, "ERROR_GET_ITEMS");
    console.log(e);
  }
};

const insertItem = async (req, res) => {
  try {
    const body = matchedData(req);
    const data = await userModel.create(body);
    const response = data ? data : "USER_CREATE_ERROR_DB";
    res.send({ response });
  } catch (e) {
    handleHttpError(res, "ERROR_INSERT_ITEM");
  }
};

const updateItem = async (req, res) => {
  try {
    const { id, ...body } = matchedData(req);
    const data = await userModel.findByIdAndUpdate(id, body);
    const response = data ? data : "USER_NOT_FOUND";
    res.send({ response });
  } catch (e) {
    handleHttpError(res, "ERROR_UPDATE_ITEM");
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const data = await userModel.delete({ _id: id });
    const response = data ? data : "USER_NOT_FOUND";
    res.send({ response });
  } catch (e) {
    handleHttpError(res, "ERROR_DELETE_ITEM");
  }
};

module.exports = {
  getItem,
  getItems,
  insertItem,
  updateItem,
  deleteItem,
};
