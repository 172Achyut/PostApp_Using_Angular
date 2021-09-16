const express = require('express');

const router = express.Router();

const mongo = require('mongodb');

const checkAuthentication = require('../middleware/auth');

const uri = "mongodb://localhost:27017/postDB"

router.get('/post',(req,res)=>{
    mongo.connect(uri,(err,db)=>{
        if(err)
            throw err;
        
        const data = db.db('postDB');

        data.collection('posts').find().toArray((err,result)=>{
            res.status(200).json({
                message : 'Data Fetched',
                posts : result
            })
        })
    })
})

router.post('/saveposts',checkAuthentication,(req,res)=>{
    const postObject = {
        user_id : req.body.user_id,
        postTitle : req.body.title,
        description : req.body.description,
    }

    mongo.connect(uri,(err,db)=>{
        if(err)
            throw err;
        const myDB = db.db('postDB');
        console.log('Connected');

        myDB.collection('posts').insertOne(postObject,(err,result)=>{
            if(err)
                throw err;
            res.status(200).json({
                message:'Data saved successfully .',
                posts : result
            })
        })
    })
})


router.post('/viewone',(req,res)=>{
    const postObject = {
        user_id : req.body.user_id,
        postTitle : req.body.title,
        description : req.body.description,
        
    }
    const id =  req.body.id
    mongo.connect(uri,(err,db)=>{
        if(err)
            throw err;
        const myDB = db.db('postDB');
        console.log('Connected');
        objectID = mongo.ObjectID;
        myDB.collection('posts').findOne({_id:objectID(id)},postObject,(err,result)=>{
            if(err)
                throw err;
            res.status(200).json({
                message:'The requiured data fetched successfully.',
                posts : result
            })
        })
    })
})

router.put('/update',(req,res)=>{
    const id =  req.body.id
    const postObject = {
            $set : {
                user_id : req.body.user_id,
                postTitle : req.body.title,
                description : req.body.description
            }
    }

    mongo.connect(uri,(err,db)=>{
        if(err){
            throw err;
        }
            
        const myDB = db.db('postDB');
        console.log('Connected');
        objectID = mongo.ObjectID;
        myDB.collection('posts').updateOne({_id : objectID(id)},postObject,(err,result)=>{
            if(err){
                throw err;
            }
                
            res.status(200).json({
                message:'Data updated successfully .',
                posts : result
            })
        })
    })
})

router.delete('/delete',(req,res)=>{
    const id =  req.body.id
    // const postObject = {
    //             postTitle : req.body.postTitle,
    //             description : req.body.description
    // }

    mongo.connect(uri,(err,db)=>{
        if(err){
            throw err;
        }
            
        const myDB = db.db('postDB');
        console.log('Connected');
        objectID = mongo.ObjectID;
        myDB.collection('posts').deleteOne({_id : objectID(id)},(err,result)=>{
            if(err){
                throw err;
            }
                
            res.status(200).json({
                message:'Data deleted successfully .',
                posts : result
            })
        })
    })
})


module.exports = router 
