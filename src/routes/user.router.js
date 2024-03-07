import { Router } from "express";
import { loginUser, logoutUser, refreshAccessToken, registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()
router.route("/register").post( // The route is configured to accept HTTP POST requests using the .post() method.
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ])
    , registerUser
) // now when we come to /register then registerUser will call which is in userController

router.route("/login").post(loginUser)
router.route("/refresh-token").post(refreshAccessToken)

// secured routes
router.route("/logout").post(verifyJWT, logoutUser) // first this verifyJWT middleware will run and in verifyJWT we called next() it means after verifyJWT middleware logoutUser will call
export default router 