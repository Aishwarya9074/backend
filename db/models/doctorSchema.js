import {model,Schema} from 'mongoose';

const DoctorSchema=Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    userName:{
        type:String,
        required:true,
        trim:true,
        unique:true,
    },
    image:{
        type:String,
        required:true,
        trim:true,

    },
    specialization:{
        type:String,
        required:true,
        trim:true,

    },
    password:{
        type:String,
        required:true,


    },
    department:{
        type:Schema.Types.ObjectId,
        ref:'Department'
    }
},{timestamps:true})

const Doctor=model('doctor',DoctorSchema)
export default Doctor;