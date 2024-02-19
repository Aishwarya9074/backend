import {Schema,model} from 'mongoose';

const appoinmentSchema=Schema({
    doctor:{
        type:Schema.Types.ObjectId,
        ref:'Doctor'
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    slot:{
        type:Schema.Types.ObjectId,
        ref:'Slot'
    },

   
})

const Appoinment=model('Appoinment',appoinmentSchema)
export default Appoinment;