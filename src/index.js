import connectDB from "./db/index.js";
import dotenv from "dotenv"

dotenv.config({
    path: './env'
}) 

connectDB()













// instead of making connection in index.js we made connection in db folder and export it


// const app = express()

//     ; (async () => { // iffy
//         try {
//             await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//             app.on("error", (error) => {
//                 console.log("ERROR: ", error)
//                 throw error
//             })

//             app.listen(process.env.PORT, () => {
//                 console.log(`App is listening on port ${process.env.PORT}`);
//             })
//         } catch (error) {
//             console.error("ERROR: ", error);
//             throw error
//         }
//     })()
