const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema(
  {
    name: {
      first: String,
      last: String,
    },
    image: String,
    gallery: [String],
    city: String,
    country: String,
    social: [String],
    phone: String,
    dob: Date,
    gender: {
      type: String,
      enum: ["male", "female"],
      required: [true, "Please enter your gender"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Profile", profileSchema);
