const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');



let userschema = new  mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        match: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
    },
    password: {
        type: String,
        required: true,
        minlength:3
    }
});







const newsschema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },
  timecreated: {
    type: Date,
    default: Date.now
  },
  owner:{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }

});



userschema.pre('save', async function(next) {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(this.password, salt)
        this.password = hashedpassword;

        next();
    } catch (error) {
        next(error);
    }

})


userschema.methods.isvalid =   async function(password){

    try {
       return await  bcrypt.compare(password, this.password)  //returns boolean 
        
    } catch (error) {
        next(error);
        
    }
    return 0;

}

let News = mongoose.model("News", newsschema);
let User = mongoose.model('User', userschema);


module.exports ={User,News};

