const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRoute = require("./routes/user");


const app = express();
app.use(express.json());
app.use(cors());
try {
  mongoose.connect(
    process.env.MONGODB_URI,
    {
      useNewURLparser: true,
    },
    () => {
      console.log("Database successfully connected!!");
    }
  );
} catch (err) {
  console.log(err);
}

app.use("/api", userRoute);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
