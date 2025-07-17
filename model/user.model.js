import mongoose, {schema} from mongoose;
 const userschema = new schema({
    fullname:{
        type:String,
        require:true,
        unique:true,
    },
    username:{
        type:String,
        require:true,
        lowercase:true,
        unique:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true,
        unique:true,
    },
    refreshToken:{
        type:String,
    }

 },{timestamps:true})
   userschema.pre('save', async function(){// hashing the password
     if(!this.isModified('password')) return next();
      try{
         const salt = await bcrypt.genSalt(10);
          this.password = await bcrypt.hash(this.password,salt);
          next();
      }
      catch(error){
         throw next(error);
      }
      
   })
    userschema.methods.isPasswordCorrect = async function(password){
        return await bcrypt.compare(password, this.password);
    }
     userschema.methods.generateaccesstoken = function(){
        return jwt.sign({
           id: this.id,
           fullname: this.fullname,
           username: this.username,

        },
        process.env.ACCESSTOKENENGENERATE,
        {
            expiresIn:ACCESSTOKENEXPIRESIN
        }
    )
     }
      userschema.methods.generaterefreshtoken = function(){
        return jwt.sign({
           id: this.id,
          

        },
        process.env.REFRESHTOKENENGENERATE,
        {
            expiresIn:REFRESHTOKENEXPIRESIN
        }
    )
     }
  export default User =  mongoose.model("User",userschema)