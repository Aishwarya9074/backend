import express from 'express';
import Slot from "../../db/models/slotSchema.js";
import checkToken from '../../middlewares/checkToken.js';

const router=express.Router()

//add slot by doctor --doctorRoute
router.post('/',checkToken(['DOCTOR']),async(req,res)=>{
    const body=[{...req.body}]
    await Slot.insertMany(body)
    res.status(201).json({message:'slot added successfully'})

})

//list slot by doctor --userRoute

router.get('/doctor/:id',checkToken(['DCTOR','USER']),async(req,res)=>{
    const {id}=req.params
    const slot=await Slot.find({doctor:id})
    res.status(201).json(slot)
})

export default router;