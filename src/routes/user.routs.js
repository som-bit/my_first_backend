import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js"


const router = Router()
router.route("/register").post(
    // injecting an multer middleware
    // Returns middleware that processes multiple files associated with the given form fields.
    //The Request object will be populated with a files object which maps each field name to an array of the associated file information objects.



    upload.fields([
        {
            // i am setting the profile pic veriable name as avatar so from frontend they will
            // also use avatar
            name: "avatar",
            maxCount:1
        }, {

            name: "coverImage",
            maxCount:1
        }
    ]),
    registerUser)

export default router