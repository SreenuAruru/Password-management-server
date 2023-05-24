const mongoose=require('mongoose');

const passwordSchema=new mongoose.Schema({
    website:String,
    password:String,
    username:String
})

const passwordData=mongoose.model("password",passwordSchema);

module.exports=passwordData;