import express from "express";
import { connectdb } from "./database/index.js";
import dotenv from "dotenv";
dotenv.config();
 const app = express();
 const port= 4000
connectdb();
 app.get('\route',(req, res)=>{
    res.send("this router is working sucessfully");
 })
 app.listen(port,()=>{
    console.log("request is accepted on this port");
 })