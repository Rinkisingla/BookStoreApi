import mongoose from "mongoose"
import dotenv from "dotenv";
  const connectdb = async()=>{
     try{
        const connectioninstane = await mongoose.connect (`${process.env.MONGODBURL}/${process.env.DB_NAME}`)
        console.log("connected to database", connectioninstane.connection.host)
     }
     catch(error){
        console.log("MonogoDb Connection error", error)
        process.exit(1)
     }


  }
  export {connectdb}