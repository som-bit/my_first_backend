import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,

    },
    fullname: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String,//cloudinary url
    },
    coverImage: {
        type: String,//cloudinary url
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password: {
        type: String,
        required: [
            true, "Password is required"
        ],
    },
    refreashtoken: {
        type: String,
        // required: true,
        // unique: true,
        // lowercase: true,
        // trim: true,
        // index: true,
    },

}, { timestamps: true, })


// a hook from mongoose to do something before saving user data
userSchema.pre("save", async function (next) {
    // this if statement checks that whether the password is
    // changed or not and salting or bycryption will only be done when password
    // is modified
    if (!this.isModified("password")) return next();

    this.password = bcrypt.hash(this.password, 10)
    next()

})


// designing custom methodes to validate a password via bcrypt library 
userSchema.methods.isPasswordCorrect = async function
    (password) {
    return await bcrypt.compare(password, this.password)
}

// generating access token with jwt package
userSchema.methods.generateAccesstoken = function () {

    return jwt.sign(
        //name of the key in the payload: the data or value coming from database
        {
            _id: this._id,
            email: this.email,
            fullname: this.fullname,
            username: this.username,
        },
        // expiry always goes in an object
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }

    )
}

userSchema.methods.generateRefreashToken = function () {
    

    return jwt.sign(
        //name of the key in the payload: the data or value coming from database
        {
            _id: this._id,
            email: this.email,
            fullname: this.fullname,
            username: this.username,
        },
        // expiry always goes in an object
        process.env.REFREASH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFREASH_TOKEN_EXPIRY
        }

    )
}

export const User = mongoose.model("User", userSchema)