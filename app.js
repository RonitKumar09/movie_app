const express = require('express');
const path = require('path');
const request = require('request');
require('dotenv').config();
const app =express();

app.set("views", path.join(__dirname,'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get("/search", (req,res)=>{
    res.render('search');
});

app.get("/results", (req,res)=>{
    const api_key = process.env.API_KEY;
    let query = req.query.search;
    request(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=`+query, (error, response, body)=>{
       if(error){ console.log (error); }
       
        let data = JSON.parse(body);
        res.render("results", {data:data, query:query});
        // console.log(data);
    });
});

app.listen(8080, ()=>{
    console.log("port started on port no 8080");
});