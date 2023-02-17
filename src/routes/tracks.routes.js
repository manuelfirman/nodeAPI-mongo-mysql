const express = require("express");
const { getItems, getItem, insertItem, updateItem, deleteItem } = require("../controllers/tracks.ctrl");
const authMiddleware = require("../middlewares/session");
const checkRol = require("../middlewares/rol");
const { validatorCreateItem, validatorUpdateItem, validatorGetItem } = require("../validators/tracks.valid");
const router = express.Router();

router.get("/", authMiddleware, getItems);

router.get("/:id", authMiddleware, validatorGetItem, getItem);

router.post("/", authMiddleware, validatorCreateItem, insertItem);

router.put("/:id", validatorGetItem, authMiddleware, checkRol(["admin"]), validatorUpdateItem, updateItem);

router.delete("/:id", authMiddleware, validatorGetItem, deleteItem);

module.exports = router;