const fs = require("fs");
const { matchedData } = require("express-validator");
const { storageModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");
const { findSourceMap } = require("module");

const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;

const getItem = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const data = await storageModel.findById(id);
    const userReq = req.user;
    const response = data ? data : "NOT_FOUND";
    res.send({ response, userReq });
  } catch (e) {
    handleHttpError(res, "ERROR_GET_ITEM");
  }
};

const getItems = async (req, res) => {
  try {
    const userReq = req.user;
    const response = await storageModel.find({});
    res.send({ response, userReq });
  } catch (e) {
    handleHttpError(res, "ERROR_GET_ITEMS");
  }
};

const insertItem = async (req, res) => {
  try {
    const { file } = req;
    const fileData = {
      filename: file.filename,
      url: `${PUBLIC_URL}/${file.filename}`,
    };

    const userReq = req.user;
    const response = await storageModel.create(fileData);

    res.send({ response, userReq });
  } catch (e) {
    handleHttpError(res, "ERROR_INSERT_ITEM");
  }
};

// const updateItem = async (req, res) => {
//   const { id } = req.params;
//   const { body } = req;
//   const data = await TrackModel.updateOne({ _id: id }, body, { new: true });
//   const response = data ? data : "NOT_FOUND";
//   res.send(response);
// };

const deleteItem = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const fileData = await storageModel.findById(id);
    const data = await storageModel.deleteOne({ _id: id });
    const { filename } = fileData;
    const filePath = `${MEDIA_PATH}/${filename}`;
    fs.unlinkSync(filePath);

    const userReq = req.user;
    const response = { path: filePath, data: data };
    res.send({ response, userReq });
  } catch (e) {
    handleHttpError(res, "ERROR_DELETE_ITEM");
  }
};

module.exports = {
  getItem,
  getItems,
  insertItem,
  // updateItem,
  deleteItem,
};
