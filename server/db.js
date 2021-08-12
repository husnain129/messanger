const mongoose = require("mongoose");

const PASSWORD = process.env.DATABASE_PASSWORD;
const DB = PASSWORD
  ? process.env.DATABASE.replace("<PASSWORD>", PASSWORD)
  : process.env.DB;

db = () => {
  mongoose
    .connect(DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => console.log("DB connection successful!"))
    .catch((err) => console.log(err));
};
module.exports = db;
