import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Configure Cloudinary
// These values need to be defined in your environment variables (usually in a .env file)
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });

        fs.unlinkSync(localFilePath);  // Remove local file
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath);  // Remove local file if upload fails
        return null;
    }
};

export { uploadOnCloudinary };
