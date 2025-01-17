const express = require("express");
const { enquiryInsert, enquiryList,deleteEnquiry, updateEnquiry } = require("../../controllers/web/userEnquiryControllers");

let enquiryRoutes = express.Router()

// post Api
enquiryRoutes.post("/enquiry-insert", enquiryInsert);
// get Api 
enquiryRoutes.get("/enquiry-list", enquiryList);
// Delete Api
enquiryRoutes.delete("/enquiry-delete/:id?", deleteEnquiry);
// put Api
enquiryRoutes.put("/enquiry-update/:id?", updateEnquiry);

module.exports= {enquiryRoutes};  