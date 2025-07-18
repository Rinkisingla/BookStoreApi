import { AsyncHandler } from "../utilies/AsyncHandler.js";
import { ApiError } from "../utilies/ApiError.js";
import {ApiResponse} from "../utilies/ApiResponse.js" 
import User from "../model/user.model.js"
 const generatetheaccessandRefreshToken = async(userid)=>{
    try {
         const user = await User.findById(userid);
         const AccessToken = user.generateaccesstoken();
         const RefreshToken =user.generaterefreshtoken();
         console.log(AccessToken, RefreshToken);
         user.refreshToken = RefreshToken;
         await user.save({validateBeforeSave:false})
         return{AccessToken,RefreshToken};
    } catch (error) {
         throw  new ApiError(400,error)
    }
 }
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
  const userSignin = AsyncHandler(async(req,res)=>{
    // take the email and password from the user
    const{email, password} = req.body;
    //check they empty or not 
    // check this email is present or not
     if(!email && !password){
        throw new ApiError(409,"Provide the valid email and password")
     }
     console.log(email, password);
     const user = await User.findOne({email})
     
      if(!user){
        throw new ApiError(402, "user does not exist")
      }
    const  ispasswordvalid = await user.isPasswordCorrect(password);
     if(!ispasswordvalid){
        throw new ApiError(402, "password is invalid")
      }
    // create the refreash and accesstoken
     const {AccessToken,RefreshToken} = await generatetheaccessandRefreshToken(user._id)
     console.log(AccessToken,RefreshToken);
     // save them
    const loginuser = await User.findById(user._id).select("-password -refreshToken")
    console.log(loginuser);
      const options ={
      httponly:true,
      secure:true,
     }
      res.status(200)
      .cookie("accesstoken", AccessToken,options)
     .cookie("refreshtoken",RefreshToken, options)
      .json( new ApiResponse(200,
          {user: loginuser, AccessToken, RefreshToken},"loggedin user successfully"
      ))

  })
 export {userregister, userSignin}