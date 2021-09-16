const express = require('express');

const md5 = require('md5');

const jwt = require('jsonwebtoken');

const router = express.Router();

const mongo = require('mongodb');

const uri = "mongodb://localhost:27017/users"


router.post("/register", (req, res) => {
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: md5(req.body.password)
    }

    mongo.connect(uri, (err, db) => {
        const data = db.db("postDB");
        data.collection("users").findOne({ email: user.email }, (err, result) => {
            if (err) {
                throw err
            }

            if (result == null) {
                data.collection('users').insertOne(user, (err, result) => {
                    if (err)
                        throw err
                    res.status(201).json({
                        message: "Congrats! Your account registered successfully!!!",
                        user: result.ops
                    });
                })
            } else {
                res.status(201).json({
                    message: "Email already exists!! Please use a different Email",
                    user: []
                })
            }

        })

    })

});

router.post("/login", (req, res) => {
    const userData = req.body;
    mongo.connect(uri, (err, db) => {
        const data = db.db("postDB");
        data.collection('users').findOne({ email: userData.email }, (err, result) => {
            if (err) {
                res.status(200).json({
                    message: "Try to enter a valid Email/password!",
                    user: [],
                    token: ''
                })
            } else {
                if (result != null) {
                    if (result.password === md5(userData.password)) {
                        const token = jwt.sign({ userName: result.name, id: result._id }, '@azxqejm5a68487zkj#kgg45')
                        res.status(200).json({
                            message: "Successfull Login",
                            user: { userName: result.name, id: result._id },
                            token: token
                        })
                    } else {
                        res.status(200).json({
                            message: "Try to enter a valid Email/password!",
                            user: [],
                            token: ''
                        })
                    }
                } else {
                    res.status(200).json({
                        message: "Try to enter a valid Email/password!",
                        user: [],
                        token: ''
                    })
                }
            }


        })
    })
})

module.exports = router
