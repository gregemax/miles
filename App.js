const express = require("express");
const mongoose = require("mongoose");
const greg = require("./router");
const { error } = require("./controls");
const app = express();
const phone=require('./errorclass');
const { handle } = require("./error");

app.use(express.json()).use("/", greg);
app.all("*", (req,res,next)=>{

    // res.send('go back')
  //  let err= new Error(`go back ${req.originalUrl}`)
  //  err.status=200
   const err=new phone('wawa',200) 
    next(err)
  
    
  
});
app.use(handle)

mongoose
  .connect(
    "mongodb+srv://greg:greg@cluster0.lwfxd4c.mongodb.net/doc?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("good"))
  .catch(() => console.log("bad"));
app.listen("1000", () => {});
