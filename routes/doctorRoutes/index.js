import express from "express";
import Doctor from "../../db/models/doctorSchema.js";
import bcrypt from "bcrypt";
import mongoose  from "mongoose";
import jwt from 'jsonwebtoken'

const router = express.Router();

router.post("/signup", async (req, res) => {
  const body = { ...req.body };

  const doctor = await Doctor.findOne({ username: body.username });
  if (doctor) {
    return res.status(403).json({ message: "username already taken" });
  }
  if (body.password !== body.confirmPassword) {
    return res.status(403).json({ message: "password dont match" });
  }
  const hashPassword = await bcrypt.hash(body.password, 2);
  body.password = hashPassword;

  await Doctor.create(body);

  return res.status(201).json({ message: "signup successfull" });
});
router.post("/login", async (req, res) => {
  const body = { ...req.body };
  const doctor = await Doctor.findOne({ username: body.username });
  if (!doctor) {
    return res
      .status(403)
      .json({ message: "username or password is incorrect" });
  }
  const isMatching = await bcrypt.compare(body.password, doctor.password);
  if (!isMatching) {
    return res
      .status(403)
      .json({ message: "username or password is incorrect" });
  }
  // const secret_key="jkjlsdnmewmahjdhklkdlkhjkjedlieidjbnclllgshhdwjklkwlkdpokc"
  const token = jwt.sign(
    { role: "DOCTOR", id: doctor._id },
    process.env.SECRET_KEY,
    {
      expiresIn: "7d",
    }
  );
  return res.status(201).json({ message: "login successfully", token: token });
});
//find doctor by id
router.get('/profile/:id',async(req,res)=>{
  const {id}=req.params
  // const doctor=await Doctor.findById(id).populate('department')
  const doctor=await Doctor.aggregate([
    {$match:{
      _id:new mongoose.Types.ObjectId(id)
    }
  },
  {
    $lookup:{ //populate the department
      from:'departments',
      localField:'department',
      foreignField:'_id',
      as:"departmentDetails"
    }
  },{
    $project:{
      name:1,
      username:1,
      image:1,
      specialization:1,
      departmentDetails:1
    }
  }
  ])

  doctor.password=''
  return res.status(200).json(doctor)
})
  
export default router;
