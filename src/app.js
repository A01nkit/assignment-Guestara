import express from "express"
import cors from "cors"
import { handleError } from "./utils/errorHandler.js"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN
}))

// configuring, what type of date we can get and other configurations.

app.use(express.json())//json data from frontend
//app.use(express.urlencoded())//data from url
app.use(express.static("public"))//to store resources on server 


//Routes import 
import categoryRouter from "./routes/category.routes.js"

//Routes declarration 
app.use("/category", categoryRouter)



app.use(handleError);



export { app } 