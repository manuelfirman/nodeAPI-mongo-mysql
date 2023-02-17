const { Schema, Types, model } = require("mongoose");
const MongooseDelete = require("mongoose-delete");

const StorageScheme = new Schema(
  {
    url: {
      type:String,
    },
    filename: {
      type:String,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const StorageModel = model("storage", StorageScheme);

module.exports = StorageModel;