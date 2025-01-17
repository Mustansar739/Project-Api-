const enquiryModel = require("../../models/enquiry.model");

// Function to insert a new enquiry
let enquiryInsert = (req, res) => {
  const { name, email, phone, message } = req.body;

  // Create a new enquiry instance
  const enquiry = new enquiryModel({
    name,
    email,
    phone,
    message,
  });

  // Save the enquiry to the database
  enquiry
    .save()
    .then(async () => {
      // Check if an enquiry with the same email already exists
      const existingEnquiry = await enquiryModel.findOne({ email });
      if (existingEnquiry) {
        throw new Error("Email already exists");
      }
      console.log("Enquiry inserted successfully");
      res.status(200).json({ success: true, message: "Enquiry inserted" });
    })
    .catch((err) => {
      console.error("Error inserting enquiry:", err);
      res
        .status(500)
        .json({ success: false, message: "Error inserting enquiry" });
    });
};

// Function to list all enquiries
let enquiryList = async (req, res) => {
  try {
    const enquiryList = await enquiryModel.find();
    res.status(200).json({ success: true, data: enquiryList });
  } catch (err) {
    console.error("Error retrieving enquiry list:", err);
    res
      .status(500)
      .json({ success: false, message: "Error retrieving enquiry list" });
  }
};

// Function to delete an enquiry by ID
let deleteEnquiry = async (req, res) => {
  const enquiryId = req.params.id;
  try {
    const deleteRes = await enquiryModel.deleteOne({ _id: enquiryId });
    res
      .status(200)
      .json({
        success: true,
        message: "Enquiry deleted",
        id: enquiryId,
        data: deleteRes,
      });
  } catch (err) {
    console.error("Error deleting enquiry:", err);
    res.status(500).json({ success: false, message: "Error deleting enquiry" });
  }
};

// Function to update an enquiry by ID
let updateEnquiry = async (req, res) => {
  const enquiryId = req.params.id;
  const { name, email, phone, message } = req.body;
  try {
    const updateRes = await enquiryModel.updateOne(
      { _id: enquiryId },
      { $set: { name, email, phone, message } }
    );
    res
      .status(200)
      .json({ success: true, message: "Enquiry updated", data: updateRes });
  } catch (err) {
    console.error("Error updating enquiry:", err);
    res.status(500).json({ success: false, message: "Error updating enquiry" });
  }
};

module.exports = { enquiryInsert, enquiryList, deleteEnquiry, updateEnquiry };
