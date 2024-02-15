import  express from 'express';
import multer from 'multer';

const router=express.Router()
const storage=multer.diskStorage({
    destination:(req,res,cb)=>{
        cb(null,'public')
    },
    filename:(req,file,cb)=>{
        cb(null,`${Date.now}-${file.orginal}`)
    }
})
const upload=multer({storage:storage})

router.post('/', upload.single('file') ,(req,res)=>{
    res.json({url:`http://localhost:4000/${req.file.filename}`})

})

export default router;