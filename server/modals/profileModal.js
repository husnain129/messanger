const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    firstName: String,
    lastName: String,
    image: String,
    gallery: [String],
    city: String,
    country: String,
    faceBook: String,
    gitHub: String,
    twitter: String,
    phone: String,
    dob: String,
    gender: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Profile", profileSchema);
  