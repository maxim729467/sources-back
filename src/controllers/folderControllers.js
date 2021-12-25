const Folder = require("../db/folderSchema");
const Source = require("../db/sourceSchema");
const {
  NotFoundError,
  ExistingItemError,
} = require("../helpers/errorHandlers");

const listFolders = async (req, res, next) => {
  try {
    const folders = await Folder.find();
    res.json({ message: "success", folders });
  } catch (error) {
    next(error);
  }
};

const removeFolder = async (req, res, next) => {
  const { folderId } = req.params;
  console.log({ folderId });

  try {
    const folder = await Folder.findOne({
      _id: folderId,
    });

    await Source.deleteMany({ folder: folder.name });
    await Folder.findOneAndRemove({ _id: folderId });
    const folders = await Folder.find();
    return res.json({ message: "success", folders });
  } catch (error) {
    next(error);
  }
};

const addFolder = async (req, res, next) => {
  const { name } = req.body;

  try {
    const isExist = await Folder.findOne({ name });
    if (isExist) {
      next(new ExistingItemError(`Folder with name '${name}' already exists`));
    } else {
      const folder = new Folder({ ...req.body });
      await folder.save();
      const folders = await Folder.find();
      return res.status(201).json({ message: "success", folders });
    }
  } catch (error) {
    next(error);
  }
};

const updateFolder = async (req, res, next) => {
  try {
    const { folderId } = req.params;
    const { name } = req.body;

    const folder = await Folder.findOneAndUpdate(
      { _id: folderId },
      { name }
    ).exec();

    if (folder) {
      await Source.updateMany({ folder: folder.name }, { folder: name });
      const folders = await Folder.find();
      return res.json({ message: "success", folders });
    }
    next(new NotFoundError(`Folder with name '${folderName}' is not found`));
    return;
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listFolders,
  removeFolder,
  addFolder,
  updateFolder,
};
