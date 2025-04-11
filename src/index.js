import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import postRoutes from "./routes/postRoutes.js"

import Yaml from 'yamljs';
import swaggerUI from 'swagger-ui-express';

const yamlFilePath = "./src/api.yaml"
const swaggerJSDocs = Yaml.load(yamlFilePath)



dotenv.config()
connectDB()
const PORT = 5500

const app = express()

//middleware
app.use(cors())  
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/api", postRoutes)
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerJSDocs))
app.get("/",(req,res)=> {
    res.send("<h1>san</h1>")
})



app.listen(PORT,()=> console.log(`Server started on port ${PORT}`))