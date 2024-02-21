import express from "express";
import Doctor from "../../db/models/userSchema.js";
import bcrypt from "bcrypt";

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

  return res.status(201).json({ message: "signup succesfull" });
});

router.post("/login",async (req, res) => {
  const body = { ...req.body };

  const doctor = await Doctor.findOne({ username: body.username });
  if (!doctor) {
    return res
      .status(403)
      .json({ message: "username or password is incorrect" });
  }
  const isMatch = await bcrypt.compare(body.password, user.password);
  if (!isMatch) {
    return res
      .status(403)
      .json({ message: "username and password is incorrect" });

  }

  const secret_key="jkjlsdnmewmahjdhklkdlkhjkjedlieidjbnclllgfrgtryrujdjrishhdwjklkwlkdpokc"
  const token=jwt.sign({role:'DOCTOR',id:doctor._id},secret_key,{
    expiresIn:'7d'
  })
  res.status(201).json({ message: "login succesfull" });
});
export default router;
