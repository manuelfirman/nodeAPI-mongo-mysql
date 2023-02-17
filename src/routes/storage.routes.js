const express = require("express");
const router = express.Router();
const { getItems, getItem, insertItem, updateItem, deleteItem } = require("../controllers/storage.ctrl");
const uploadMiddleware = require("../utils/handleStorage");
const authMiddleware = require("../middlewares/session");
const { validateInsertItem, validateGetItem } = require("../validators/storage.valid");

router.get("/", authMiddleware, getItems);
router.get("/:id", authMiddleware, validateGetItem, getItem);
router.post("/", authMiddleware, uploadMiddleware.single("subirArchivo"), insertItem);
// router.put("/:id", updateItem);
router.delete("/:id", authMiddleware, validateGetItem, deleteItem);

module.exports = router;
