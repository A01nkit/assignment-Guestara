import mongoose from "mongoose";



const itemsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true
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
    base_amount: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    total_amount: {
        type: Number
    },
    SubCategoryId: {
        type: String,
        required: true,
        lowercase: true
    }
});

 




export const Item = 
    mongoose.models.items || 
    mongoose.model("items", itemsSchema);
  
  



  
