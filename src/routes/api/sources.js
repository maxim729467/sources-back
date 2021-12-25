const express = require("express");
const router = express.Router();

const {
  listSources,
  removeSource,
  addSource,
  updateSource,
} = require("../../controllers/sourceControllers");

const authMiddleware = require("../../middlewares/authMiddleware");

const {
  validatePostedSource,
  validateUpdatedSource,
} = require("../../middlewares/validationMiddleware");

router.post("/", listSources);
router.post("/new", authMiddleware, validatePostedSource, addSource);
router.delete("/:sourceId", authMiddleware, removeSource);
router.patch("/:sourceId", authMiddleware, validateUpdatedSource, updateSource);

module.exports = router;
