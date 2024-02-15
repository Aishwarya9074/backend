import express from 'express';
import Department from '../../db/models/departmentSchema.js';

const router=express.Router()


router.post('/', async(req,res)=>{

    const body={...req.body}
    await Department.create(body)
    res.status(201).json({message:'Department posted successfully'})

})

router.get('/',async(req,res)=>{
    const departments=await Department.find()
    res.status(200).json(departments)
})
router.get('/',async(req,res)=>{
    const id=req.params.id
   const dept= await Department.findById(id)
    res.json(200).json(dept)
})
router.delete('/',async(req,res)=>{
    const id=req.params.id
   await Department.findByIdAndDelete(id)
    res.status(201).json({message:'Department deleted successfully'})
})
router.patch('/',async (req,res)=>{
    const id=req.params.id
    await Department.findByIdAndUpdate(id)
    res.status(201).json({message:'Department Updated Successfully'})
})

export default router;