import {Schema,model} from 'mongoose';

const prescriptionSchema=Schema({
user:{
    type:Schema.Types.ObjectId,
    ref:'User'
},
doctor:{
    type:Schema.Types.ObjectId,
    ref:'Doctor'


},
appoinment:{
    type:Schema.Types.ObjectId,
    ref:'Appoinment'
},
message:{
    type:String

},
medication:[
   { type:Schema.Types.ObjectId,
    ref:'Pharmacy'}
]

   
})

const Prescription=model('Prescription',prescriptionSchema)
export default Prescription;