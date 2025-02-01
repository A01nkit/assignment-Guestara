import express from "express"
import cors from "cors"


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
import subCategoryRouter from "./routes/subCategory.routes.js"
import itemRouter from "./routes/item.routes.js"

//Routes declarration 
app.use("/category", categoryRouter)
app.use("/subcategory", subCategoryRouter)
app.use("/item", itemRouter)


//Error handling middleware
import { handleError } from "./utils/errorHandler.js"
app.use(handleError);



export { app } 