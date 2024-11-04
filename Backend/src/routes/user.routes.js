import { Router } from "express";
import userregister from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()

router.route('/register').post(
    upload.fields([
        {
            name: 'profile',
            maxCount: 1
        },
        {
            name: 'cover',
            maxCount: 1

        }
    ]),
    
    userregister
)


export default router