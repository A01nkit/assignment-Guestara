import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET//'<your_api_secret>' // Click 'View API Keys' above to copy your API secret
});

const uplodOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        console.log("hi");
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })

        //file uploaded sucessfully
        console.log("file is uploaded on cloudinary", response)
        //fs.unlinkSync(localFilePath)
        return response;
    }
    catch (error) {
        //fs.unlinkSync(localFilePath) //remove file from server if upload operation got failed
        console.log("cloudinary code not working")
        return null;
    }

}




export {uplodOnCloudinary}