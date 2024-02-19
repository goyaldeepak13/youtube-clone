import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import { Jwt } from "jsonwebtoken";



const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true, // user for remove whitespace
            index: true // 
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String, // cloudinary url
            required: true,
        },
        coverImage: {
            type: String, // cloudinary url
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        refreshToken: {
            type: String
        }

    },
    {
        timestamps: true
    }
)

// basically we are using bcrpt for encrypt password
// basically we are using pre middleware because we want to encrypt password before save it means we want to save the password in encrypted form
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) { // basically isModified is predefined function which tells us that its paramentere is modified or not
        this.password = bcrypt.hash(this.password, 10) // basically this 10 is round it is part of cryptography that how many rounds we want
        next() // we call next middleware basically "next" is not middleware , we are calling the agla wala middleware if exists
    }
    else {
        return next()
    }
})

// basically we create method "isPasswordCorrect" which will check weather our password is correct or not while login 
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password) // it will check password that is entered by user and database encrypted password 
}

// we are adding genereateAccessToken in userSchema
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        // payload
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}


userSchema.methods.generateRefreshToken = function () {
    return jwt.sign( // we are creating token using sign 
        // payload
        {
            _id: this._id, 
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User = mongoose.model("User", userSchema)