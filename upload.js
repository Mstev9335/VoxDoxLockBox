// upload file that is created now to aws
// =========================================
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

//configuring the AWS environment
AWS.config.update({
    accessKeyId: "AKIAQMRVTQ4UHNVINY4J",
    secretAccessKey: "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"
  });

var s3 = new AWS.S3();
var filePath = "./apple.jpg";

// upload file to aws
// ===========================
// //configuring parameters
var params = {
  Bucket: 'teamawesome123',
  Body : fs.createReadStream(filePath),
  // Key : "folder/"+Date.now()+"_"+path.basename(filePath)
  Key : "folder/"+path.basename(filePath)
};

s3.upload(params, function (err, data) {
  //handle error
  if (err) {
    console.log("Error", err);
  }
   //success
   if (data) {
    console.log("Uploaded in:", data.Location);
  }
});

// ===========================================


// get files from aws
// =======================================
var params = {
  Bucket: "teamawesome123", 
  Key: "folder/apple.jpg" 
 };

s3.getObject(params, function (err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else console.log(data);           // successful response

});