import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN, // basically we are allowed particular origin // we want that only our frontend can coonect with our backend
    Credential: true
})) // configuration of cors

app.use(express.json({ limit: "16kb" })) // for json files
app.use(express.urlencoded({ extended: true, limit: "16kb" })) // for url
app.use(express.static("public")) // 
app.use(cookieParser()) // we use cookie parser to set the cookies of user browser basically perform crud operation on cookies

//routes import
import userRouter from './routes/user.router.js' // we can import by any name when export is default 

// routes declaration
app.use("/api/v1/users", userRouter) // we are using use middleware // basically when user will go to /user then  we will give the control of userRouter 
export { app }