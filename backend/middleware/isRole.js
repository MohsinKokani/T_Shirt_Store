function isRole(role) {
    return (req, res, next) => {
        if (role == req.user?.role) {
            return next();
        }
        res.send({
            success: false,
            message: "You are not authorized to access this resource"
        })
    }
}
export default isRole;