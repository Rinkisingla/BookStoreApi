import { AsyncHandler } from "../utilies/AsyncHandler.js";
import { ApiError } from "../utilies/ApiError.js";
import {ApiResponse} from "../utilies/ApiResponse.js" 
import User from "../model/user.model.js"
 const userregister = AsyncHandler(async(req,res)=>{
    // getting  the data from the user
    const{fullname,username, email, password} = req.body;
    console.log(fullname,username, email, password);
    //check if they are empty or not 
     if([fullname,username, email, password].some((field)=>!field||field.trim()==="")){
         throw new ApiError(400, "REQUIRED ALL INFORMATION");
     }

    // by email and username check that already made or not 
     const existinguser = await User.findOne({
        $or :[{email},{username}]
     })
     if(existinguser)
     {
        throw new ApiError(409, "This user is already exists");
     }
     // if not make the user
      const user =await User.create({fullname,username, email, password});
    
      const finduser = await User.findById(user._id).select("-password");
      console.log(finduser);
       if(!finduser){
         throw new ApiError(401, "there is error in creating the user");
       }
       console.log(user);
    res.status(200)
    .json(  new ApiResponse(200, user, "User is created successfully"))
     // now check that user is made sucessfully or not


 })
 export {userregister}