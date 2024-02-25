import express from "express"
import Department from "../../db/models/departmentSchema.js";
import Doctor from "../../db/models/doctorSchema.js"
import checkToken from "../../middlewares/checkToken.js";


const router=express.Router()
//add department
router.post('/',checkToken(['DOCTOR']),async(req,res)=>{
    const body={...req.body}

    const department=await Department.create(body)
    res.status(201).json({message:'department added successfully'})
})
//list all department
router.get('/',checkToken(['DOCTOR','USER']),async(req,res)=>{

  const department=  await Department.find()
  res.status(201).json(department)

})
//list doctors by department

router.get('/doctor/:id',checkToken(['USER']),async(req,res)=>{
  const {id}=req.params

  const doctor=  await Department.find({department:id})
  res.status(201).json(doctor)

})


 export default router;