const express = require("express");
const app = express();
const request =require("request");
const bodyParser = require("body-parser");
const https = require("https");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",function(req,res)
{
    res.sendFile(__dirname+"/signup.html");
    console.log("HELLO");
});

app.post("/",function(req,res)
{
    const fname = req.body.firstName;
    const lname = req.body.lastName;
    const email = req.body.email;
    // 
    
    const data = {
        members : [
        {
            email_address : email,
            status : "subscribed",
            merge_fields :{
                FNAME : fname,
                LNAME : lname
            } 
        }   
        ]
    };
    // console.log(data.members[0].merge_fields.FNAME);
    const jsonData = JSON.stringify(data);

    const url = "https://us17.api.mailchimp.com/3.0/lists/071a23f0c5";
    const options={
        method:"POST",
        auth:"vivek:47e8575da7f06cc5acb488acfba3ff3e-us17"
    };

    console.log(options.auth);

    const request = https.request(url, options, function(response)
    {
        if(response.statusCode === 200)
        {
            res.sendFile(__dirname+"/success.html");
        }
        else
        {
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",function(data)
        {
            // console.log(JSON.parse(data));
        });

    });
    request.write(jsonData);
    request.end();
});

app.listen(3003,function()
{
    console.log("Server is running on 3003..");
});


// 47e8575da7f06cc5acb488acfba3ff3e-us17

//List Id
// 071a23f0c5