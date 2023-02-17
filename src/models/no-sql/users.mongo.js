const { Schema, Types, model } = require("mongoose");
const MongooseDelete = require("mongoose-delete");

const UserScheme = new Schema(
  {
    name: {
      type: String,
    },
    age: {
      type: Number,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    role: {
      type: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserScheme.plugin(MongooseDelete, {overrideMethods: "all"});

const UserModel = model("users", UserScheme);

module.exports = UserModel;