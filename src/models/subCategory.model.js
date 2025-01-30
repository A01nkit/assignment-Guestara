const mongoose = require("mongoose");



const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image_url: {//from cloudinary
        type: String

    },
    description: {
        type: String,
        required: true
    },
    tax_applicability: {
        type: Boolean
    },
    tax: {
        type: Number
    },
    
});

 




export const SubCategory = 
    mongoose.models.subCategory || 
    mongoose.model("subCategory", subCategorySchema);