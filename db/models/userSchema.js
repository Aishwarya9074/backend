import {model,Schema} from 'mongoose';

const userSchema=Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    username:{
        type:String,
        required:true,
        trim:true,
        unique:true,
    },
    image:{
        type:String,
        // required:true,
        trim:true,

    },
    email:{
        type:String,
        required:true,
        unique:true

    },

   
    password:{
        type:String,
        required:true,


    },
  
},{timestamps:true})

const User=model('doctor',userSchema)
export default User;