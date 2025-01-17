const express = require("express");
const mongoose = require("mongoose");
const {enquiryRoutes} = require("./app/routes/web/enquiryRoutes.js");

require("dotenv").config();

const app = express();
app.use(express.json());

//http://localhost:8000/web/api/enquiry
app.use("/web/api/enquiry",enquiryRoutes)

mongoose.connect(process.env.DBURL).then(() => {
  console.log("Connected to DB...");
});

app.listen(process.env.PORT, () => {
  console.log(`server is connected.....port${process.env.PORT}`);
});
