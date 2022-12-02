const fs = require("fs").promises;
const { json } = require("body-parser");
const { unlinkSync,unlink } = require("fs");
const path = require("path");
const sharp =require('sharp')
const {Blob} =require('buffer');
const { Console } = require("console");
//upload file
const readFile = async (req, res) => {
     try{
      const file =req.file.path;
    
     console.log(file)

     const resp= await sharp(file)
     .rotate()
     .resize(100,100)
     .toFormat('png')
     .png({quality:50})
     .toFile(`images/${new Date()}-sample.png`)
       console.log("result",resp)
       await unlink(file,function(err)
       {
        if(err)
        {
          console.log(err)
        }
        else
        {
          console.log(".tiff file is deleted")
        }
       })
     res.status(200).json({
      message:"file converted successfully",
      res:resp
     })
          }
          catch(err)
          {
            console.log(err);
            res.send(400).json({
              message:"file convetion is failed"
            })
          }

     }

     //convert png to blob
     const pngToBlob =async(req,res)=>{
      try {

    

        //const file =req.file.path;
     
        const buff = Buffer.from("images/Fri Dec 02 2022 18:17:16 GMT+0530 (India Standard Time)-sample.png","utf-8");
         console.log(buff);
         
        //  const con=buff.toString('binary');
        //  console.log(con)
        //  //const blob=new Blob([new Uint8Array([buff]).buffer]);
         const blob = new Blob([buff]); 
          console.log(blob);
        
         //await unlinkSync("images/Fri Dec 02 2022 18:17:16 GMT+0530 (India Standard Time)-sample.png",{type:'image/blob'})
         res.status(200).json({
          message:"converted from png to blob",
          res:blob
         })
         
      } catch (error) {
        console.log(error);
        res.status(400).json({
          message:"unable to send png as blob"
        })
        
      }
      
     }

     
      // const { path } = req.file;

    //    console.log("file uploaded successfully") ;
    //    res.status(200).json({
    //     message:"file uploaded successfully"
    //    }) 
      
    // } catch (err) {
    //   console.log(err);
    //   res.status(400).json({
    //     err:err,
    //     message:"uanble to upload the file"
    //   })
    // }
  
        
      


 
  module.exports ={readFile,pngToBlob}