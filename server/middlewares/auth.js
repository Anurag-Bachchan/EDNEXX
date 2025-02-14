const jwt = require('jsonwebtoken');
require("dotenv").config();

exports.auth= (req,res,next)=>{
    // extracting jwt token from the body 
    // console.log(req.body)
    try{

        const token = req.header("Authorisation").replace("Bearer ","") || req.cookies.token || req.body.token ;

        if(!token){// not true par chalega matlab true denga
        return res.status(401).json({
            success:false,
            message:"Token is missing"
        })}

       //now we will verify user using token that it is authenticated or not using verify method
       try{
        const decode= jwt.verify(token,process.env.JWT_SECRET);
        console.log(decode);
        req.user=decode;  // we are putting the value of decode in req so that we can use this data for the authorization
       }
       catch(error){// verification issue
         return res.status(401).json({
            success:false,
            message:"Token is Invalid"
         })}
        next();

    }
    catch(error){
        console.log(error);
        res.status(401).json({
           success:false,
           message:"Somethimg went wromg while validating the token"
        })
    }
}

exports.isStudent= (req,res,next)=>{
    try{
        if(req.user.accountType != "Student"){
           return res.status(401).json({
                success:false,
                message:"This is a protected route for students"
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
           success:false,
           data:"User role is not matching"
        })}
}

//isInstructor
exports.isInstructor= (req,res,next)=>{
    try{
        if(req.user.accountType != "Instructor"){
           return res.status(401).json({
                success:false,
                message:"This is a protected route for Instructor"
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
           success:false,
           data:"User role is not matching"
        })}
}

// isAdmin
exports.isAdmin= (req,res,next)=>{
    try{
        if(req.user.accountType != "Admin"){
           return res.status(401).json({
                success:false,
                message:"This is a protected route for Admin"
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
           success:false,
           data:"User role is not matching"
        })}
}