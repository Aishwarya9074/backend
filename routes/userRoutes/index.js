import express from 'express';
import User from "../../db/models/userSchema.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import checkToken from '../../middlewares/checkToken.js';


const router=express.Router()

router.post('/signup',async (req,res)=>{
  const body={...req.body}

  const user=await User.findOne({username:body.username})
  if(user){
   return res.status(403).json({message:'username already taken'})
  }
  if(body.password !==  body.confirmPassword){
  return  res.status(403).json({message:'password dont match'})
  }
  const hashPassword=await bcrypt.hash(body.password,2)
  body.password=hashPassword

  await User.create(body)


 return res.status(201).json({message:'signup successfull'})


})
router.post('/login',async(req,res)=>{
    const body={...req.body}
    const user=await User.findOne({username:body.username})
    if(!user){
        return res.status(403).json({message:'username or password is incorrect'})
    }
    const isMatching=await bcrypt.compare(body.password,user.password)
    if(!isMatching){
        return res.status(403).json({message:'username or password is incorrect'})
    }
    // const secret_key="jkjlsdnmewmahjdhklkdlkhjkjedlieidjbnclllgshhdwjklkwlkdpokc"
    const token=jwt.sign({role:'USER',id:user._id},process.env.SECRET_KEY,{
        expiresIn:'7d'
    })
 return res.status(201).json({message:'login successfully',token:token})
})
//get user by id
router.get('/user/:id',async(req,res)=>{
    const {id}=req.params
    // const user=await User.findById(id).populate('department')
    const user=await User.findById(id).populate('department')

    user.password=''
    res.status(201).json(user)
  
  
  })

export default router;

