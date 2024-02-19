import { v2 as cloudinary } from "cloudinary"
import fs from "fs" // fs is file system




cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
});


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null

        // upload the file on cloudnary
        const response = await cloudinary.uploader.upload(localFilePath, { resource_type: "auto" }) // resource_type means type of resource (video, pdf, audio, images etc) now we set as auto so it will detect automatically

        console.log("File is uploaded on cloudnary: ", response.url);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporaty file as the upload operation got failed
        return null;
    }
}


export { uploadOnCloudinary }
