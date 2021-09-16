const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const users = require('./routes/users');
const posts = require('./routes/postDB');
const joi = require('./routes/join');
const port = 1000 || process.env.PORT;

const app = express();

app.use("/",(req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET, POST , PUT , DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-type, Authorization');
    next();
});

app.use(bodyParser.json());



app.use('/user',users);
app.use('/posts',posts);
// app.use('/join',joi);

app.listen(port,()=>{
    console.log('Server starts from express at port '+port);
});