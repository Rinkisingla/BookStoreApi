import express from "express";
import { connectdb } from "./database/index.js";
import dotenv from "dotenv";
import router from "./router/userRouter.js";
dotenv.config();
 const app = express();
 const port= 4000
connectdb();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/users/v1', router);

 app.listen(port,()=>{
    console.log("request is accepted on this port");
 })