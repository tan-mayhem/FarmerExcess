// YOU CAN USE THIS FILE AS REFERENCE FOR SERVER DEVELOPMENT

// include the express module
var express = require("express");

// create an express application
var app = express();

// helps in extracting the body portion of an incoming request stream
var bodyparser = require('body-parser');

// fs module - provides an API for interacting with the file system
var fs = require("fs");

// helps in managing user sessions
var session = require('express-session');

// native js function for hashing messages with the SHA-1 algorithm
var sha1 = require('sha1');

// include the mysql module
var mysql = require("mysql");
 
var request = require("request");
// apply the body-parser middleware to all incoming requests
app.use(bodyparser());

// use express-session
// in mremory session is sufficient for this assignment
app.use(session({
  secret: "stsmsecretkey",
  saveUninitialized: true,
  resave: false}
));
var login_success = 1;
let connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  database: 'hack19stsm',
  password: 'reset123'
});
// server listens on port 9007 for incoming connections
app.listen(9004, () => console.log('Listening on port 9004!'));
// GET method route for the favourites page.
// It serves favourites.html present in client folder

app.get('/user_login', function(req, res) {
    if (login_success) {
        res.sendFile(__dirname + '/client' + '/u_login.html')
    }
    else{
        res.sendFile(__dirname + '/client' + '/failed_login.html')
    }
});

app.get('/farmer_login', function(req, res) {
    if (login_success) {
        res.sendFile(__dirname + '/client' + '/f_login.html')
    }
    else{
        res.sendFile(__dirname + '/client' + '/failed_login.html')
    }
});
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client' + '/welcome.html')
});

app.post('/user_login_details',function(req, res) {
    connection.query ("select * from user_cred where username = ? and password = ?", [req.body.username, sha1(req.body.password)], function(err, results, fields) {
        console.log(results);
        if (err) throw err;
        if (results.length < 1) {
            login_success = 0
            res.redirect('/user_login');
        }
        else {
            console.log("Starting Session");
            login_success = 1
            req.session.value = 1
            res.redirect('/shopping');
        }
    });
});

app.post('/farmer_login_details',function(req, res) {
    connection.query ("select * from farmer_cred where username = ? and password = ?", [req.body.username, sha1(req.body.password)], function(err, results, fields) {
        console.log(results);
        if (err) throw err;
        if (results.length < 1) {
            login_success = 0
            res.redirect('/farmer_login');
        }
        else {
            console.log("Starting Session");
            login_success = 1
            req.session.value = 1
            res.redirect('/selling');
        }
    });
});
app.get('/shopping',function(req, res) {
    if (!req.session.value) {
        res.redirect('/user_login');
    } else {
        res.sendFile(__dirname + '/client' + '/shopping.html');
    }
});
app.get('/selling',function(req, res) {
    if (!req.session.value) {
        res.redirect('/farmer_login');
    } else {
        res.sendFile(__dirname + '/client' + '/selling.html');
    }
});

app.post('/selling_details',function(req, res) {
    if (!req.session.value) {
        res.redirect('/farmer_login');
    } else {
        connection.query("insert into food_items (food, price, quantity, username) values ( ?,  ?, ?, ?)", [req.body.food, req.body.price, req.body.quantity, req.body.username], function(err) {
            if (err) throw err;
            console.log(req.body)
            console.log("success");
            res.send("success");
        }); 
    }

});
app.post('/user_signup_details',function(req, res) {
    connection.query ("insert into user_cred (username, password) values ( ?,  ?)", [req.body.username, sha1(req.body.password)], function(err) {
        if (err) throw err;
        console.log("success");
        res.send("success");
    });
});

app.post('/shopping_address',function(req, res) {
    console.log(req.body);
    request.post({
    "headers": { "content-type": "application/json" },
    "url": "http://10.0.12.65:7002/locate",
    "body": JSON.stringify({
        "address": req.body.address,
    })
    }, (error, response, body) => {
        if(error) {
            return console.log(error);
        }
        var x = JSON.parse(JSON.parse(body));
        var keys = Object.keys(x);
        console.log(x)
        // console.log(x.length)
        data = "<html><head><style><style>table { font-family: arial, sans-serif; border-collapse: collapse; width: 100%; } td, th { border: 1px solid #dddddd; text-align: left; padding: 8px; } </style></head><body>"
        data += "<table style='margin: 0px auto;'><thead>"
        data += "<tr><th>" + "Recipes" + "</th></tr></thead><tbody>"
        // data += "<th>" + "Farmer ID" + "</th>"
        // data += "<th>" + "Price" + "</th></tr></thead>"
        for(i = 0; i < keys.length; i++) {
            // data += "<tbody><tr><td>" + "Item" + "</td>"
            data += "<tr><td>" + keys[i] + "</td></tr>"
            // data += "<td>" + "Price" + "</td></tr>"
        }
        data += "</tbody></table></body></html>"
        res.send(data);
        //console.log(JSON.parse(body));
    });
    // request.post('http://10.0.12.65:7002/locate', {form:{'address' : req.body.address}});
});

app.post('/farmer_signup_details',function(req, res) {
    var str = req.body.address1 + "+" + req.body.address2 + "+" + req.body.address3 + "+" + req.body.address4 + "+" + req.body.address5 
    str =  str.replace(/ /g, '+');
    connection.query ("insert into farmer_cred (username, password, address) values ( ?, ?, ?)", [req.body.username, sha1(req.body.password), str ], function(err) {
        if (err) throw err;
        console.log("success");
        res.send("success");
    });
});

app.get('/food_details',function(req, res) {
    connection.query ("select * from food_items", function(err, results, fields) {
        if (err) throw err;
        res.send(results);
    });
});
app.get('/farmer_details',function(req, res) {
    connection.query ("select * from farmer_cred", function(err, results, fields) {
        if (err) throw err;
        res.send(results);
    });
});

