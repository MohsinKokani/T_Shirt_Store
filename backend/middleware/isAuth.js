import jsonwebtoken from "jsonwebtoken";
import userModel from "../models/userModel.js";

function isAuth(req, res, next) {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).send({
            sucess: false,
            message: "Please Login First"
        });
    }
    jsonwebtoken.verify(token, process.env.SECRET_PRIVATE_KEY, (err, decoded) => {
        if (err) {
            res.send({
                message: "JWT verification failed",
                ...err
            })
        }
        else {
            userModel.findById(decoded.id)
            .then(user => {
                if(!user) return res.status(404).send({message:'Your session expired please login again'})
                    req.user = user;
                    next();
                })
                .catch(err => {
                    res.send({
                        success: false,
                        ...err
                    })
                })
        }
    })
}

export default isAuth;