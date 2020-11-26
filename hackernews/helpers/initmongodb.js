const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI,{dbName: process.env.DBNAME,
useNewUrlParser: true,
useUnifiedTopology: true,
useFindAndModify:false,
useCreateIndex: true

})
.then(()=>{
    console.log("connected");
}).catch(err=>{
    console.log("error connecting"+err);
})

mongoose.connection.on('connected',()=>{
    console.log("mongoose is connected");
});


mongoose.connection.on('error',(err)=>{
    console.log(err.message);
});

mongoose.connection.on('disconnected',(err)=>{
    console.log("mongoose is disconnected");
});
//this event is triggered when we press ctrl c
process.on('SIGINT',async()=>{
    await mongoose.connection.close();
    process.exit(0);
})