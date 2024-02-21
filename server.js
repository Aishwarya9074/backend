import express from 'express';
import cors from 'cors';
import mongoose from './db/db.js';
import routes from './routes/index.js';
const app=express()
import dotenv from 'dotenv'

dotenv.config({path:'./.env'})

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.use(routes)



app.listen(process.env.PORT,()=>{
    console.log("App is working...@http://localhost:4000/")
})