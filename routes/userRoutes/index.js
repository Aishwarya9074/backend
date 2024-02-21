import express from "express";
import User from "../../db/models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const router = express.Router();

router.post("/signup", async (req, res) => {
  const body = { ...req.body };
  const user = await User.findOne({ username: body.username });
  if (user) {
    return res.status(403).json({ message: "username already taken" });
  }
  if (body.password !== body.confirmPassword) {
    return res.status(403).json({ message: "password dont match" });
  }
  const hashPassword = await bcrypt.hash(body.password, 2);
  body.password = hashPassword;

  await user.create(body);

  return res.status(201).json({ message: "signup succesfull" });
});

router.post("/login", async (req, res) => {
  const body = { ...req.body };

  const user = await User.findOne({ username: body.username });
  if (!user) {
    return res
      .status(403)
      .json({ message: "username or password is incorrect" });
  }
  const isMatching = await bcrypt.compare(body.password, user.password);
  if (!isMatching) {
    return res
      .status(403)
      .json({ message: "username and password is incorrect" });

  }

  const secret_key="jkjlsdnmewmahjdhklkdlkhjkjedlieidjbnclllgshhdwjklkwlkdpokc"
  const token=jwt.sign({role:'USER',id:user._id},secret_key,{
    expiresIn:'7d'
  })
  return res.status(201).json({ message: "login succesfull",token:token });
});
export default router;
