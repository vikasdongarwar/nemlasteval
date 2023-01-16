const mongoose = require("mongoose");
require("dotenv").config();

// const connection=mongoose.connect(process.env.URL);
const connection = mongoose
  .connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

module.exports = { connection };
