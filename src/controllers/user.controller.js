import { asyncHandler } from "../utils/async_handler.js"
import { ApiError } from "../utils/api_error.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/api_response.js"



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


    //4. check for images and avatars
    // multer gives us access of files
    // after the user have hit submit  multer have already taken the file and save it in our 
    // server and now we can access the file path
    // check multer middleware for code
    // console.log(req.files?.avatar[0]?.path)
    const avatarLocalPath = req.files?.avatar[0]?.path;
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar image is required")
    }   

    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files?.coverImage[0]?.path    
    }


    //5. upload to cloudinary
    // await here untill the image is upoaded on cloudinary
    // and store a referance
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    //6. check upload success on cloudinary
    if (!avatar) {
        throw new ApiError(409, "avatar not updated to cloudinary")
    }
    // 7. now its time to create an user object in our database
    const user = await User.create({
        fullname,
        email,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        password,
        username: username.toLowerCase()
    })
    //8. sending response according to need after user is created
    const createdUser = await User.findById(user._id).select(
        "-password -refreashtoken"
    )
    if (!createdUser) {
        throw new ApiError(500, "something went wrong while registering user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Register Successfully")
    )


})

export { registerUser }
