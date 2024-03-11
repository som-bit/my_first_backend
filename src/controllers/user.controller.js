import { asyncHandler } from "../utils/async_handler.js"
import { ApiError } from "../utils/api_error.js"
import { User } from "../models/user.model.js"

const registerUser = asyncHandler(async (req, res) => {
    // take user data from backend
    // add validation
    // check if user already exist: from email or username
    //check if avatar
    // check multer
    //upload them to cloudinary, check avatar
    // create an user object -- create entry in db
    // remove password and refreash token feed from response
    // check if response 
    // return response or error

    // 1.take data from frontend
    const { fullname, email, password, username } = req.body
    console.log("email:", email, password, fullname, username)
    //2. vlaidate data if presend or not
    if (
        // A function that accepts up to three arguments. The some method calls the predicate function for each element
        //in the array until the predicate returns a value which is coercible to the Boolean value true, or until the end of the array.
        // you can add function for each element in an array according to you
        [
            // the logic here is if any of the value is null or empty it will return true
            fullname, email, password, username
        ].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "all fields is required")

    }
    //3. checking if email and user name already exist
    const existedUser = await User.findOne({
        $or: [{ email }, { username }]
    })

    if (existedUser) {
        throw new ApiError(409, "username or email already exist")
    }
    console.log(req.files);




    res.status(200).json({

        message: "user is registered"
    })
})

export { registerUser }
