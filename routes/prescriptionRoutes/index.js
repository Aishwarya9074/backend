import express from "express";
import Prescription from "../../db/models/prescriptionSchema.js"
import checkToken from "../../middlewares/checkToken.js";
import Pharmacy from "../../db/models/pharmacySchema.js"

const router=express.Router()
//add prescription by doctor
router.post('/doctor',checkToken(['DOCTOR']),async(req,res)=>{

    const body={...req.body}
    const prescription=await Prescription.create(body)
    res.status(201).json({message:'Prescription added'})

})
//list medicines by prescription by id

router.get('/pharmacy/appoinment/:id',checkToken(['DOCTOR','USER']),async(req,res)=>{
    const {id}=req.params
    const prescription=await Prescription.findOne({appoinment:id})
    const medicines=await Pharmacy.find({
        _id:{$in:prescription.medication},
    })
    res.status(201).json(medicines)

})

export default router;