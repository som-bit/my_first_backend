// step 1 -  we upload a file in our server
// step 2- than we will take the local path from the server and upload it in cloudinary
// step 3- now when the file is successfully uploaded in cloudinary we will remove the file from our server because this is not needed


// LINKING andd UNLINKING whenever a file is deleted  it is unlinked from the rest  of the files (BAsic OS)



import { v2 as cloudinary } from "cloudinary"
import fs from "fs"



// confiuring cloudinary with api key and secrets
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


// function to pickup file path from server
const uploadOnCloudinary = async (localFilePath) => {

    try {
        if (!localFilePath) {
            return "ERROR: COULD NOT FIND FILE TO SEND TO CLOUDINARY";
        }
        // upoad file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            // setting resource type as auto
            resource_type: "auto",
        })
        // upload suucess
        console.log("file is upload in cloudinary")
        console.log(response.url)
        return response;

    } catch (error) {

        // if we are hitting the catch block that means file is in the server
        // but it is not upload in the cloudinary server
        // so lets manage file system to remove the file from server
        fs.unlinkSync(localFilePath);
        return "failed to upload in cloudinary";

    }

}



cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
    { public_id: "olympic_flag" },
    function (error, result) { console.log(result); });
