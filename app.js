const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const { url } = require("inspector");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


// Home route
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;
  // console.log(firstName, lastName, email);

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };
  // above code is js now converting into JSON
  //mailchimp understand JSON only
  var jsonData = JSON.stringify(data);

  const url = "https://us14.api.mailchimp.com/3.0/lists/a7fb6c9b61";

  const options = {
    method: "POST",
    auth: "ajith:c45b82dbdb22f62a5a031608df2aad56-us14",
  };

  const request = https.request(url, options, function (response) {
   
    if(response.statusCode === 200){
        // res.send("Successful")
        res.sendFile(__dirname + "/success.html")
    }else{
        // res.send("try again later")
        res.sendFile(__dirname + "/failure.html")
    }
   
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});

// Failure route
app.post("/failure", function(req, res){
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("Server running in port 3000");
});

// API Key: c45b82dbdb22f62a5a031608df2aad56-us14
// Audience ID : a7fb6c9b61

//'https://<dc>.api.mailchimp.com/3.0/'

//<dc> is us14
