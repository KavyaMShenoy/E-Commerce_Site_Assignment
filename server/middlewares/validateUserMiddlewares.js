const validateUserMiddlewares = (req, res, next) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({
            message: "User name, email, password and role is required.",
            success: false
        })
    }

    next();
}

module.exports = validateUserMiddlewares;