const mongoose = require("mongoose");
const { Schema } = mongoose;

const folderSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set folder name"],
      index: true,
      unique: true,
    },
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const Folder = mongoose.model("Folder", folderSchema);
module.exports = Folder;
