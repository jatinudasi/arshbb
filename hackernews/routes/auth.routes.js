const express = require('express');
const router = express.Router();
const { User, News } = require('./../models/user.models');
const createError = require('http-errors');
const { signaccesstoken, verifyaccesstoken } = require('./../helpers/jwthelper')
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")


router.post('/register', async (req, res, next) => {


    try {
        const { email, password } = req.body;  //object destrucring
        const data = await User.findOne({ email: email }) //rwturns null if no user is found else the user which is found
        if (!data) {
            const user = new User({ email, password });
            const saveduser = await user.save();
            const token = await signaccesstoken(saveduser.id, saveduser.email);
            res.send(token);
        } else {
            throw createError.Conflict(`${email}  alredy exists`);
        }

    } catch (error) {
        next(error);
    }
});

router.post('/login', async (req, res, next) => {

    try {
        let response = await User.findOne({ email: req.body.email })
        if (!response)
            res.send("invalid credentials");
        else {


            const result = await response.isvalid(req.body.password);
            if (!result)
                res.send("invalid credentials")

            const token = await signaccesstoken(response.id, response.email);
            res.send(token);





        }


    }
    catch (error) {
        next(error);
    }


});


router.get('/checkauth', verifyaccesstoken, (req, res, next) => {
    res.send("success");
})

router.post('/newnews', async (req, res, next) => {

    try {
        let user = await User.findOne({ email:"jatin.udasi8@gmail.com"});
        let { title } = req.body;
        let news = new News({
            title: title,
            owner: user.id
        })
        await news.save();
        res.send("sucess created news");
    }
    catch (error) {
        next(error);
    }
})
  






module.exports = router;



 // bcrypt.compare(req.body.password,response.password,(err,result) => {
            //     if(err) {
            //         res.send("error in bcrypt")
            //     }
            //    if(result)
            //     {
            //         res.send("succesfull login");
            //        const token= jwt.sign({
            //           email:response.email, 
            //           userid: response.id

            //         },process.env.jwtkey,{
            //             expiresIn: "1h"
            //         })
            //         res.send(token);

            //     const token = await signaccesstoken(result.id,result.email)
            //     res.send(token);
            //     }
            //     else{
            //         res.send("invalid email or password")
            //     }
            // })