import mongoose from "mongoose";



const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase:true
    },
    image_url: {//from cloudinary
        type: String,
        default: ""
    },
    description: {
        type: String,
        required: true
    },
    tax_applicability: {
        type: Boolean,
        default: true
    },
    tax: {
        type: Number,
        default: 0
    },
    taxType: {
        type: String,
        //enum: ["GST", "VAT"]
        default: "GST"
    }
});

 




export const Category = 
    mongoose.models.category || 
    mongoose.model("category", categorySchema);
  
  



