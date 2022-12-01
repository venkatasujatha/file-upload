const fs = require("fs").promises;
const { json } = require("body-parser");
const path = require("path");

//upload file
const readFile = async (req, res) => {
    try {
   

       const { path } = req.file;

       console.log("file uploaded successfully") ;
       res.status(200).json({
        message:"file uploaded successfully"
       }) 
      
    } catch (err) {
      console.log(err);
      res.status(400).json({
        err:err,
        message:"uanble to upload the file"
      })
    }
  };
  module.exports ={readFile}