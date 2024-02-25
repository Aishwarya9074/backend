import express from 'express';
import Appoinment from "../../db/models/appoinmentSchema.js";
import Slot from '../../db/models/slotSchema.js';

const router=express.Router()
//list appoinments by id
router.get('/doctor/:id',async(req,res)=>{
    const {id}=req.params
    const appoinment=await Appoinment.find({doctor:id})
    res.status(200).json(appoinment)
})
//list appoinment user by id
router.get('/user/:id',async(req,res)=>{
    const {id}=req.params
    const appoinment=await Appoinment.find({user:id})
    res.status(200).json(appoinment)
})
//take appoinment
router.post('/',async(req,res)=>{
    const body={...req.body}
    const slotId=body.slot
    const appoinment=await Appoinment.create(body)
    const slot=await Slot.findByIdAndUpdate(slotId,{availabilty:false})
    res.status(201).json({message:'Appoinment Booked! '})

})

export default router;
