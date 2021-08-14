const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const followSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    friendsId: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Follow", followSchema);
