import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
 const userschema = new Schema({
    fullname:{
        type:String,
        required: true,
        unique:true,
    },
    username:{
        type:String,
        required: true,
        lowercase:true,
        unique:true,
    },
    email:{
        type:String,
        required: true,
        unique:true,
    },
    password:{
        type:String,
        required: true,
        unique:true,
    },
    refreshToken:{
        type:String,
    }

 },{timestamps:true})
   userschema.pre('save', async function(next){// hashing the password
     if(!this.isModified('password')) return next();
      try{
         const salt = await bcrypt.genSalt(10);
          this.password = await bcrypt.hash(this.password,salt);
          next();
      }
      catch(error){
         return next(error);
      }
      
   })
    userschema.methods.isPasswordCorrect = async function(password){
        return await bcrypt.compare(password, this.password);
    }
     userschema.methods.generateaccesstoken = function(){
        return jwt.sign({
           id: this._id,
           fullname: this.fullname,
           username: this.username,

        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.AccessTokenExpireIn
        }
    )
     }
      userschema.methods.generaterefreshtoken = function(){
        return jwt.sign({
           id: this._id,
          

        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.RefreshTokenExpireIn
        }
    )
     }
  const User = mongoose.model("User", userschema);
export default User;