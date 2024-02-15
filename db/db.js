import mongoose from "mongoose";

mongoose.connect('mongodb://0.0.0.0:27017/doctorDB').then(()=>{
    console.log('DB CONNECTED!')
})
.catch(e=>{
    console.log(e.messaage)
})
export default mongoose;