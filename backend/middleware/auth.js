const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    try{
        token = req.headers.authorization.split(" ")[1];
        jwt.verify(token,'@azxqejm5a68487zkj#kgg45');
        next();
    }catch(e){
        res.status(401).json({
            message : "Unauthorized Access"
        })
    }
   
}