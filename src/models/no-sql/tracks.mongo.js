const { Schema, Types, model } = require("mongoose");
const MongooseDelete = require("mongoose-delete");

const TrackSchema = new Schema(
  {
    name: {
      type:String,
    },
    album: {
      type:String,
    },
    cover: {
      type:String,
      validate: {
        validator: (req) => {
          return true;
        },
        message: "ERROR_URL",
      }
    },
    artist: {
      name: {
        type:String,
      },
      nickname: {
        type:String,
      },
      nationality: {
        type:String
      }
    },
    duration: {
      start: {
        type: Number,
      },
      end: {
        type:Number,
      }
    },
    mediaId: {
      type: Types.ObjectId
    }
    
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

TrackSchema.plugin(MongooseDelete, {overrideMethods: "all"});

const TrackModel = model("tracks", TrackSchema);

module.exports = TrackModel;