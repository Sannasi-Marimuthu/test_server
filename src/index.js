import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import postRoutes from "./routes/postRoutes.js"

dotenv.config()
connectDB()
const PORT = 5500

const app = express()

//middleware
app.use(cors())  
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/api", postRoutes)
app.get("/",(req,res)=> {
    res.send("<h1>san</h1>")
})



app.listen(PORT,()=> console.log(`Server started on port ${PORT}`))