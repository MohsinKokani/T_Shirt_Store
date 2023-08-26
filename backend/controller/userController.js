import userModel from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";
import crypto from "crypto";
import cloudinary from "cloudinary";
import cartModel from "../models/cartModel.js";

let options = {
    expires: new Date(
        Date.now() + 5 * 24 * 60 * 60 * 1000
    ),
    sameSite: 'None',
    secure: true,
}
class userController {

    static deleteall(req, res) {
        userModel.deleteMany({}).
            then(data => res.send("deleted"))
            .catch(err => res.send(err))
    }
    static async registerUser(req, res) {
        const { name, email, password, avatar, phone_no } = req.body;
        if (!email || !password || !name || !phone_no) {
            return res.status(400).send({
                success: false,
                message: "Please Provide All the fields"
            })
        }
        const role = req.body.role || "user";
        let hashedPass;
        let myCloud;
        let cart = '';
        try {
            if (avatar) myCloud = await cloudinary.v2.uploader.upload(avatar, {
                folder: "avatars",
                width: 150,
                crop: "scale",
            });
            hashedPass = await bcryptjs.hash(password, 10);
            const newCart = await cartModel.create({ });
            cart = newCart._id;
        } catch (err) {
            return res.status(500).send({ success: false, message: err.message || "error in hashing, avatar or cart" })
        }
        userModel.create({
            name,
            email,
            password: hashedPass,
            role,
            cart,
            phone_no,
            avatar: {
                public_id: myCloud?.public_id || '',
                url: myCloud?.secure_url || ''
            }
        }).then(result => {
            const token = result.getPasswordToken();
            res.status(201).cookie('token', token, options).json({
                success: true,
                token,
                ...result.toObject()
            });
        }).catch(err => {
            res.status(400).send({
                sucess: false,
                ...err
            })
        })
    }
    static async login(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "Please Provide Email or Password"
            })
        }
        try {
            const userData = await userModel.findOne({ email }).select("+password");

            if (userData) {
                bcryptjs.compare(password, userData.password, function (err, isMatch) {
                    if (isMatch) {
                        const token = userData.getPasswordToken();
                        res.cookie('token', token, options).json({
                            success: true,
                            token,
                            ...userData.toObject()
                        });
                    } else {
                        res.status(401).send({
                            success: false,
                            message: "Incorrect password"
                        });
                    }
                });
            } else {
                res.status(404).send({
                    success: false,
                    message: "User not found"
                });
            }
        } catch (err) {
            res.status(500).send({
                success: false,
                message: "Error retrieving user",
                error: err
            });
        }
    }
    static logout(req, res) {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true
        })
        res.send({
            success: true,
            message: "Logged Out"
        })
    }
    static forgotPassMail(req, res) {
        const email = req.body.email;
        userModel.findOne({ email })
            .then(data => {
                if (!data) {
                    return res.status(404).send({
                        success: false,
                        message: `${email} is not registered`
                    })
                }
                const token = data.getResetPasswordToken();
                if (!token) return res.send({
                    sucess: false,
                    message: "error generating reset password link"
                })
                const transporter = nodemailer.createTransport({
                    host: process.env.SMTP_HOST,
                    port: process.env.SMTP_PORT,
                    service: process.env.SMTP_SERVICE,
                    secure: true,
                    auth: {
                        user: process.env.EMAIL_ADD,
                        pass: process.env.EMAIL_PASS
                    }
                })
                const emailOptions = {
                    from: process.env.EMAIL_ADD,
                    to: email,
                    subject: "T-shirt Store Reset password token",
                    text: `Your reset password link expires in 15 minutes\nHurry!!!`,
                    html: `
                    <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
                      <h2 style="color: #333;">T-shirt Store Password Reset</h2>
                      <p style="margin-top: 10px;">Your reset password link expires in 15 minutes.</p>
                      <p style="margin-top: 5px;">Click the button below to reset your password:</p>
                      <a href="${req.protocol}://${req.hostname}${process.env.PORT ? `:${process.env.PORT}` : ''}/user/resetPasswordForm/${token}" style="display: inline-block; background-color: #007BFF; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px; margin-top: 10px;">Reset Password</a>
                      <p style="margin-top: 20px;">If you didn't request a password reset, please ignore this email.</p>
                      <p style="margin-top: 5px;">Best regards,<br>T-shirt Store Team</p>
                    </div>
                  `,
                }
                transporter.sendMail(emailOptions)
                    .then(data => {
                        res.send({
                            success: true,
                            message: `Reset link sent successfully to ${email}`
                        })
                    })
                    .catch(error => {
                        res.send({
                            success: false,
                            message: "error while sending the mail",
                            error
                        })
                    })
            })
            .catch(err => {
                res.send({
                    success: false,
                    name: "sha",
                    err
                })
            })
    }
    static showResetPasswordForm(req, res) {
        const token = req.params.token;
        res.render('resetPassword.hbs', { token });
    }
    static resetPassword(req, res) {
        const { newPassword, confirmPassword, token } = req.body;
        if (newPassword != confirmPassword) {
            return res.send({
                success: false,
                message: "Password does not match"
            })
        }
        try {
            const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
            userModel.findOne({ resetPasswordToken: hashedToken })
                .then(async (data) => {
                    if (!data) return res.send({ success: false, message: "reset password has expired" })
                    if (data.tokenExpire > new Date(Date.now())) {
                        const hashedPass = await bcryptjs.hash(newPassword, 10);
                        data.password = hashedPass;
                        res.send({
                            success: true,
                            message: "Password reset Successful"
                        });
                    }
                    else {
                        res.send({
                            success: false,
                            message: "Reset Password token expired"
                        })
                    }
                    data.tokenExpire = undefined;
                    data.resetPasswordToken = undefined;
                    await data.save();
                })
                .catch(error => {
                    res.send({
                        success: false,
                        message: "Please try again",
                        error
                    });
                })
        } catch (error) {
            res.send({
                success: false,
                error
            })
        }

    }
    static getUserDetail(req, res) {
        const id = req.user.id;
        userModel.findById(id)
            .then(data => {
                res.send(data)
            })
            .catch(error => {
                res.send(error);
            })
    }
    static updatePassword(req, res) {
        const { oldPassword, newPassword, confirmPassword } = req.body;
        if (!oldPassword || !newPassword || !confirmPassword) {
            return res.send({
                success: false,
                message: "Please provide all the inputs"
            })
        }
        else if (newPassword != confirmPassword) {
            return res.send({
                success: false,
                message: "Password does not match"
            })
        }
        userModel.findById(req.user.id).select("+password")
            .then(userData => {
                bcryptjs.compare(oldPassword, userData.password, async function (err, isMatch) {
                    if (isMatch) {
                        const hashedPass = await bcryptjs.hash(newPassword, 10);
                        userData.password = hashedPass;
                        await userData.save()
                        res.send({
                            success: true,
                            message: "password changed successfully",
                            ...userData.toObject()
                        })

                    } else {
                        res.status(401).send({
                            success: false,
                            message: "Incorrect old password"
                        });
                    }
                });
            })
            .catch(error => {
                res.send({
                    success: true,
                    message: "something went wrong, please try again latter",
                    error
                })
            })
    }
    static getAllUser(req, res) {
        userModel.find({}).
            then(data => res.send(data))
            .catch(err => res.send({ success: false, ...err, message: "some error occured" }))
    }
    static getUserById(req, res) {
        const id = req.params.id;
        userModel.findById(id).
            then(data => {
                if (!data) return res.send({ success: false, message: "no user found with that id" });
                res.send({
                    success: true,
                    ...data.toObject()
                })
            })
            .catch(err => res.send({ success: false, ...err, message: "internal error occured" }))
    }
    static deleteById(req, res) {
        const id = req.params.id;
        userModel.findByIdAndDelete(id).
            then(data => res.send({ success: true, message: "deleted successfully", data }))
            .catch(err => res.send({ success: false, ...err, message: "internal error occured" }))
    }
    static async updateOwnDetails(req, res) {
        const { name, email, avatar, phone_no } = req.body;
        if (!email || !name || !phone_no) {
            return res.status(400).send({
                success: false,
                message: "Please Provide All the fields"
            })
        }
        const newUserData = {
            name: name,
            email: email,
            phone_no: phone_no
        };
        if (avatar) {
            try {
                const user = await userModel.findById(req.user.id);
                const imageId = user.avatar.public_id;
                if (imageId) await cloudinary.v2.uploader.destroy(imageId);
                const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
                    folder: "avatars",
                    width: 150,
                    crop: "scale",
                });
                newUserData.avatar = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                };
            } catch (error) {
                return res.status(400).send({
                    success: false,
                    error
                })
            }
        }
        userModel.findByIdAndUpdate(req.user.id, newUserData, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }).then(data => {
            if (!data) return res.send({ success: false, message: "no user found with that id", data });
            res.send({
                success: true,
                ...data.toObject()
            })
        }).catch(error => {
            let msg = '';
            if (error.codeName == 'DuplicateKey') msg = 'email already exists';
            res.status(400).send({
                success: false,
                error: msg || 'User Detail Updation failed successfully',//just kidding
                ...error
            })
        })
    }
    static updateUserDetailsById(req, res) {

    }
}

export default userController;