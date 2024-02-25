import express from "express";
import doctorRoutes from "./doctorRoutes/index.js";
import departmentRoutes from "./departmentRoutes/index.js";
import imageRoute from "./imageRoute/index.js";
import userRoute from "./userRoutes/index.js";
import slotRoute from "./slotRoutes/index.js"
import AppoinmentRoutes from "./AppoinmentRoutes/index.js";
import prescriptionRoutes from "./prescriptionRoutes/index.js"




const router = express.Router();



router.use("/doctor", doctorRoutes);
router.use("/department", departmentRoutes);
router.use("/uploads", imageRoute);
router.use("/user", userRoute);
router.use("/slot",slotRoute)
router.use("/appoinment",AppoinmentRoutes)
router.use("/prescription",prescriptionRoutes)


export default router;
