const mongoose = require("mongoose")

const userEnquirySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: true,
        uniquie: true
    },
    phone: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
})


const enquiryModel = mongoose.model("Enquiry", userEnquirySchema)
module.exports = enquiryModel