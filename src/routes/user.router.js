import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
const router = Router()
router.route("/register").post(registerUser) // now when we come to /register then registerUser will call which is in userController

export default router