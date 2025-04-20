import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'//file system-->file read,write,update,delete karnaysathi used hote

    // Configuration
    cloudinary.config({ 
        cloud_name:process.env.CLOUDINAY_CLOUD_NAME,  
        api_key:process.envCLOUDINAY_API_KEY  ,
        api_secret:process.env.CLOUDINAY_API_SECRET 
    });


    const uploadOnCloudinary=async (localFilePath)=>{
        try{ 
            if(!localFilePath) return null;
            //upload file on cloudinary
            const result=await cloudinary.uploader.upload(localFilePath);(
                localFilePath,{
                    resource_type:'auto',
                }
            )
            //file has been uploaded successfully
            console.log("file is uploaded on cloudinary  ",result.url);
            return result;
        }
        catch(error){
              fs.unlinkSync(localFilePath)//remove the locally saved tempory file as the uploaded operation got file
              return null;
        }
    }

  export default uploadOnCloudinary;
    

      
  