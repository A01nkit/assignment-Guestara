import mongoose from "mongoose";



const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
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
    taxType: {
        type: String,
        //enum: ["GST", "VAT"]
        default: "GST"
    },
    categoryId: {//As foreign key
        //type: mongoose.Schema.Types.ObjectId,
       // ref: "category"
        type: String,
        required: true,
        lowercase: true
    }
    
});

 




export const SubCategory = 
    mongoose.models.subCategory || 
    mongoose.model("subCategory", subCategorySchema);