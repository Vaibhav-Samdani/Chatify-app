const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes")
require("dotenv").config({ path: ".env" });

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

mongoose
  .connect(MONGO_URL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB started!");
  })
  .catch((err) => {
    console.log("Mongo Error : ", err);
  });


app.use("/api/auth",userRoutes);

app.listen(PORT, () => {
  console.log(`Server is started at http://localhost:${PORT}`);
});
