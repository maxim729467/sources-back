const mongoose = require("mongoose");
const { Schema } = mongoose;

const sourceSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set source name"],
      unique: true,
      index: true,
    },
    description: {
      type: String,
    },
    url: {
      type: String,
      required: [true, "Set source URL"],
    },
    folder: {
      type: String,
      required: [true, "Set source folder"],
      index: true,
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

const Source = mongoose.model("Source", sourceSchema);
module.exports = Source;
