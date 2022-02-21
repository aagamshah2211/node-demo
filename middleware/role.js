exports.isAdmin = async(req, res, next) => {
    if (req.user.isAdmin === 'false') {
        return res.status(401).json({
            result: false,
            message: 'You are not an Admin!!'
        })
    }
    next();
}