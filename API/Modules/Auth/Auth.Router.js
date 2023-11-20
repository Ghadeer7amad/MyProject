import {Router} from 'express'
import * as controllerAuth from "./Auth.Controller.js"
const router = Router()

router.post("/signup", controllerAuth.SignUp);
export default router;