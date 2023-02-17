const { matchedData } = require("express-validator");
const { tracksModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");

const getItem = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const data = await tracksModel.findById(id);
    const response = data ? data : "NOT_FOUND";
    res.send({ response });
  } catch (e) {
    handleHttpError(res, "ERROR_GET_ITEM");
  }
};

const getItems = async (req, res) => {
  try {
    const response = await tracksModel.find({});
    res.send({ response });
  } catch (e) {
    handleHttpError(res, "ERROR_GET_ITEMS");
  }
};

const insertItem = async (req, res) => {
  try {
    const body = matchedData(req); // <- limpia el body para no dejar pasar datos basura
    const response = await tracksModel.create(body);
    res.send({ response });
  } catch (e) {
    handleHttpError(res, "ERROR_INSERT_ITEM");
  }
};

const updateItem = async (req, res) => {
  try {
    const { id, ...body } = matchedData(req); // <- restamos el id al body
    const data = await tracksModel.findByIdAndUpdate(id, body);
    const response = data ? data : "NOT_FOUND";
    res.send({ response });
  } catch (e) {
    handleHttpError(res, "ERROR_UPDATE_ITEM");
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await tracksModel.delete({ _id: id });
    const response = data ? data : "NOT_FOUND";
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
