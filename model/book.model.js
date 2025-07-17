import mongoose, {schema} from "mongoose"
const  bookschema =  new schema({
    bname:{
        type:String,
        require:true,
        unique:true,
    },
     title:{
        type:String,
        require:true,
        unique:true,
     },
     author:{
        type:String,
        require:true,
     },
     quantity :{
        type:Number,
        require:true

     }
    
},{timestamps:true})
 export default Book = mongoose.model("Book", bookschema);