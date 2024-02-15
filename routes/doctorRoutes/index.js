import express from 'express';

const router=express.Router()


router.post('/signup',(req,res)=>{
    res.status(201).json({message:'signup succesfull'})

})

router.post('/login',(req,res)=>{
    res.status(201).json({message:'login succesfull'})


})
export default router;