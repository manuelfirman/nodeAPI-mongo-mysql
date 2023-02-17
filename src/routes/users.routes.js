const express = require("express");
const { getItems, getItem, insertItem, deleteItem, updateItem } = require("../controllers/users.ctrl");
const { validateGetItem, validateInsertItem, validateUpdateItem } = require("../validators/users.valid");

const router = express.Router();

router.get("/", getItems);
router.get("/:id", validateGetItem, getItem);
router.post("/", validateInsertItem, insertItem);
router.put("/:id", validateGetItem, validateUpdateItem, updateItem);
router.delete("/:id", validateGetItem, deleteItem);

module.exports = router;