const express = require('express')
const router = express.Router()

const {
  listFolders,
  removeFolder,
  addFolder,
  updateFolder,
} = require("../../controllers/folderControllers");

const authMiddleware = require('../../middlewares/authMiddleware')

const {
  validatePostedFolder,
  validateUpdatedFolder,
} = require("../../middlewares/validationMiddleware");

router.get('/', listFolders)
router.post('/', authMiddleware, validatePostedFolder, addFolder)
router.delete('/:folderId', authMiddleware, removeFolder)
router.patch('/:folderId', authMiddleware, validateUpdatedFolder, updateFolder)

module.exports = router
