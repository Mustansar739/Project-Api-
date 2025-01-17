const express = require("express");
const mongoose = require("mongoose");
const enquiryModel = require("./models/enquiry.model");
require("dotenv").config();

const app = express();

app.use(express.json());

// post Api

app.post("/api/enquiry-insert", (req, res) => {
  const { name, email, phone, message } = req.body;
  const enquiry = new enquiryModel({
    name,
    email,
    phone,
    message,
  });
  enquiry
    .save()
    .then(() => {
      const existingEnquiry = userEnquiry.findOne({ email });
      if (existingEnquiry) {
        throw new Error("Email already exists");
      }
      console.log("enquiry inserted successfully");
      res.status(200).json({ success: true, message: "enquiry inserted" });
    })
    .catch((err) => {
      console.error("Error inserting enquiry:", err);
      res
        .status(500)
        .json({ success: false, message: "Error inserting enquiry" });
    });
});

// get Api

app.get("/api/enquiry-list", async (req, res) => {
    const enquiryList = await enquiryModel.find()
    res.status(200).json({success:true,data:enquiryList})
})

// Delete Api
app.delete("/api/enquiry-delete/:id?", async (req, res) => {
  const enquiryId  = req.params.id
  const deleteEnquiry = await enquiryModel.deleteOne({_id:enquiryId})
  res.status(200).json({success:true,message:"enquiry deleted",id:enquiryId,data:deleteEnquiry})
} )

// put Api

app.put("/api/enquiry-update/:id?", async (req, res) => {
  let enquiryId = req.params.id
  let {name, email, phone, message} = req.body

  let updataRes = await enquiryModel.updateOne({_id:enquiryId},{$set:{name, email, phone, message}})
  
  res.status(200).json({success:true,message:"enquiry updated", data:updataRes})

})

mongoose.connect(process.env.DBURL).then(() => {
  console.log("Connected to DB...");
});

app.listen(process.env.PORT, () => {
  console.log(`server is connected.....port${process.env.PORT}`);
});
