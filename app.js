const express = require("express");    // we are using express for better experience
const bodyParser = require("body-parser");
const ejs = require("ejs");  // this is for templating
const _ = require('lodash')
var HTTP_PORT = process.env.PORT || 8080;


const app = express();

const post = [];

app.use(express.static("public"));
app.set("view engine", 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.render('home',{data:post})
})
app.get('/about',(req,res)=>{
    res.render('about')
})
app.get('/contact',(req,res)=>{
    res.render('contact')
})




app.get('/compose',(req,res)=>{
    res.render('compose')
})
app.post('/compose',(req,res)=>{
    const title = req.body.title;
    const content = req.body.content;
    const postData = {
        title:title,
        content:content
    }
    post.push(postData)
})

app.get('/post/:titleslug',function(req,res){
    const requireTitle = _.lowerCase(req.params.titleslug);

    post.forEach(function(e){
        const postTitle = _.lowerCase(e.title);
        if(postTitle === requireTitle){
            res.render('post',{title:e.title,content:e.content})
        }
    })
})



app.listen(HTTP_PORT,()=>{
    console.log("port is running on 3000")
})