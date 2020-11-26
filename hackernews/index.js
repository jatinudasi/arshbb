const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const createError = require("http-errors");
require('dotenv').config();
require('./helpers/initmongodb')

const {News} = require('./models/news.models')


const app = express();

const authroutes = require('./routes/auth.routes');


app.use(morgan('dev'));

app.use(express.json())


// app.use("/home",homeroutes);
// app.use("/user",userroutes);
app.use('/auth',authroutes);

app.post('/newnews', async (req, res, next) => {
    try {
        // let data = new News({title:req.body.title})
        let data = new News(req.body);
        const result = await data.save()
        res.status(201).send("all done");
    } catch (error) {
        res.send("there was a error",error.message)
        next(error)
    }


})

// app.get('/authrise',(req,res, next)=>{

// })

app.use((req, res, next) => {
    // const error = new Error("not found");
    // error.staus =404;
    // next(error);

    next(createError.NotFound("not found baby"));
});
app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status,
            message: err.message
        }
    })
})




const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`listing on port ${PORT}`);
}) 







// mongoose.connect("mongodb://127.0.0.1:27017")
// mongoose.connect("mongodb://127.0.0.1:27017/students", 
// {
//     useNewUrlParser: true, 
//     useCreateIndex:true,
//     useUnifiedTopology: true
// }).then(()=>{
//     console.log("Connected")
// })
// .catch((err)=>
// {
//     console.log(err.message)
// });
