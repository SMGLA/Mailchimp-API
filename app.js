//jshint esversion:6
const express = require('express');
const app = express();
const https = require('https');
const bodyParser = require ('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));


app.get("/", function(req,res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res) {
  // res.send("Server is working");
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

console.log(firstName,lastName,email);

  var data = {
    members:[
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
        FNAME: firstName,
        LNAME: lastName
        }
      }
    ]
  };

var jsonData = JSON.stringify(data);

const url = "https://us19.api.mailchimp.com/3.0/lists/c32e70462f";
  // usX -> change to the same as API Key: us19

const options = {
    method: "POST",
    auth: "yougento:8ca23ed5a1778b46d54de443f719b3ed-us19"
  };

const request = https.request(url, options, function(response) {
    console.log(response.statusCode);
  if(response.statusCode === 200) {

    res.send ("Successfully Subscribed!");}
    else {
      res.send ("Error!");
    }
    response.on("data", function(data) {

    });

});

request.write(jsonData);
request.end();

});


app.listen(3000, function(){
  console.log("Server started on port 3000");
});



// API Key : 8ca23ed5a1778b46d54de443f719b3ed-us19
// Unique ID : c32e70462f
// URL : https://usX.api.mailchimp.com/3.0/lists (usX -> us19 from API Key)
