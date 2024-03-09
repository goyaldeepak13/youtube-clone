import { Router } from "express";
import { changeCurrentPassword, getCurrentUser, getUserChannelProfile, getWatchHistory, loginUser, logoutUser, refreshAccessToken, registerUser, updateAccountDetails, updateCoverImage, updateUserAvatar } from "../controllers/user.controller.js";
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


// secured routes
router.route("/logout").post(verifyJWT, logoutUser) // first this verifyJWT middleware will run and in verifyJWT we called next() it means after verifyJWT middleware logoutUser will call
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/current-user").get(verifyJWT, getCurrentUser) // basically here we are not sending data so we can write get and user should be logged in so we have to write verifyJWT
router.route("/update-account").patch(verifyJWT, updateAccountDetails)// basically if we write post then all details will be update
router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar) // basically middleware verifyJWT is for check that user is login or not and second middleware upload is for multer
router.route("/cover-image").patch(verifyJWT, upload.single("coverImgae"), updateCoverImage)
router.route("/c/:username").get(verifyJWT, getUserChannelProfile) // basically we are taking route name from params so there must be colon and we can write /channel also
router.route("/history").get(verifyJWT, getWatchHistory)
export default router 