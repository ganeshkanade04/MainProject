import {asyncHandler} from "../utils/AsyncHandler.js";
import { apiError } from "../utils/ApiError.js";
import {User} from "../models/user.models.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
       //get user details from frontend
        //validation --> not empty
       //validation--> check if user already exists
       //check for images,check for avatar
       //upload images to cloudinary,avtar
       //create user object
       //remove password and refresh token from user object
       //check user created successfully
       //return success response

       //req.body==data in from or json
        //req.file==image file from form data
        //req.files==multiple image files from form data
         
        const {fullName,email,username,password}=req.body;
        console.log("fullName",fullName);
        console.log("email :",email); 
        console.log("username :",username);
        console.log("password :",password);

       //send data json
           res.status(200).json({
           success:true,
           message:"User registered successfully",
           data:req.body
            });
         //name validation
        //  if(fullName==""){
        //     return apiError("Name is required",400);
        //  }
          
        if(
          [fullName,email,username,password].some((item)=>
            item?.trim()==="")
        ) 
          {
            throw new apiError(400,"All fields are required",
              null,
              "Name,Email,Username,Password are required");
          }

        //check if user already exists
        
        const userExists=await User.findOne({
          $or:({
            email:email,
            username:username
          })
        })
        
        if(userExists){
          throw new apiError(400,"User already exists",
            null,
            "User with this email or username already exists");
        }

        //check for images,check for avatar
        
        const avatarLocalPath=req.files?.avatar?.[0]?.path;
        const coverImagesLocalPath=req.files?.coverImages?.[0]?.path;
         
        if(!avatarLocalPath){
          throw new apiError(400,"Avatar is required",
            null,
            "Avatar is required");
        }


        //upload images to cloudinary,avtar
        const avatarResult=await uploadOnCloudinary(avatarLocalPath);
        const coverImagesResult=await uploadOnCloudinary(coverImagesLocalPath);

        if(!avatarResult){
          throw new apiError(400,"Avatar upload failed",
            null,
            "Avatar upload failed");
        }
        if(!coverImagesResult){
          throw new apiError(400,"Cover image upload failed",
            null,
            "Cover image upload failed");
        }
//create user object in database
   const user=User.create({
      fullName,
      email,
      username,
      avatar:avatarResult.url, 
      coverImages:coverImagesResult.url || null,
      username:username.toLowerCase(),
   })
      const createdUser=await user.findById(user._id).select("-password -refreshToken")
      //remove password and refresh token from user object

      if(!createdUser){
        throw new apiError(400,"User creation failed",
          null,
          "User creation failed");
      }

      //return success response
      res.status(201).json(
        new ApiResponse(201,createdUser,"User created successfully")
      );
});

export  {registerUser};
