import express from "express";
//const express = require(`express`);
 const app = express();
 const port= 4000

 app.get('\route',(req, res)=>{
    res.send("this router is working sucessfully");
 })
 app.listen(port,()=>{
    console.log("request is accepted on this port");
 })