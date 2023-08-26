import mongoose from "mongoose";
import validator from "validator";
import jsonwebtoken from "jsonwebtoken";
import crypto from "crypto";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        maxLength: 30,
        minLength: 2,
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please Enter your email"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        select: false
    },
    phone_no: {
        type: String,
        required: [true, "Please enter a Phone No"]
    },
    avatar: {
        public_id: {
            type: String
        },
        url: {
            type: String
        }
    },
    cart: {
        type: mongoose.Schema.ObjectId,
        ref: 'cart',
        required: true
    },
    role: {
        type: String,
        default: "user"
    },
    resetPasswordToken: {
        type: String
    },
    tokenExpire: {
        type: Date
    }
})

userSchema.methods.getPasswordToken = function () {
    let token;
    try {
        token = jsonwebtoken.sign({ id: this._id }, process.env.SECRET_PRIVATE_KEY, {
            expiresIn: `${process.env.EXPIRE_DURATION}d`
        })
    } catch (error) {
        return error
    }
    return token;
}

userSchema.methods.getResetPasswordToken = function () {
    let token;
    let hashedToken;
    try {
        token = crypto.randomBytes(20).toString("hex");
        hashedToken = crypto.createHash('sha256').update(token).digest('hex')
    } catch (error) {
        return error;
    }
    this.resetPasswordToken = hashedToken;
    this.tokenExpire = new Date(Date.now() + process.env.PASSWORD_EXPIRATION * 60 * 1000);
    this.save()
        .then(data => {
            return token
        })
        .catch(err => {
            console.log('75', err);
            return null;
        })
    return token;
}

const userModel = mongoose.model("user", userSchema)

export default userModel;