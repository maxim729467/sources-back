const Source = require("../db/sourceSchema");
const Folder = require("../db/folderSchema");
const {
  NotFoundError,
  ExistingItemError,
} = require("../helpers/errorHandlers");

const listSources = async (req, res, next) => {
  const { folder } = req.body;
  try {
    const sources = await Source.find({ folder }).exec();
    res.json({ message: "success", sources });
  } catch (error) {
    next(error);
  }
};

const removeSource = async (req, res, next) => {
  const { sourceId } = req.params;

  try {
    const source = await Source.findOneAndRemove({ _id: sourceId });
    if (source) {
      const sources = await Source.find({ folder: source.folder }).exec();
      return res.json({ message: "success", sources });
    }
    next(new NotFoundError(`Source with ID '${sourceId}' is not found`));
    return;
  } catch (error) {
    next(error);
  }
};

const addSource = async (req, res, next) => {
  const { name, folder } = req.body;
  try {
    const isSourceExist = await Source.findOne({ name });
    const isFolderExist = await Folder.findOne({ name: folder });

    if (isSourceExist) {
      next(new ExistingItemError(`Source with name '${name}' already exists`));
    } else if (!isFolderExist) {
      next(new ExistingItemError(`Folder with name '${folder}' doesn't exist`));
    } else {
      const source = new Source({ ...req.body });
      await source.save();
      const sources = await Source.find({ folder }).exec();
      return res.status(201).json({ message: "success", sources });
    }
  } catch (error) {
    next(error);
  }
};

const updateSource = async (req, res, next) => {
  try {
    const { sourceId } = req.params;
    const source = await Source.findOneAndUpdate({ _id: sourceId }, req.body, {
      new: true,
    }).exec();
    if (source) {
      const sources = await Source.find({ folder: source.folder }).exec();
      return res.json({ message: "success", sources });
    }
    next(new NotFoundError(`Source with ID '${sourceId}' is not found`));
    return;
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listSources,
  removeSource,
  addSource,
  updateSource,
};
