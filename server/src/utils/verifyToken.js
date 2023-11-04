const jwt = require("jsonwebtoken");

// export the verifyToken function
const verifyToken = (req, res, next) => {
    // get the access token from the request cookies
    const authtoken = req.cookies.accessToken;

    // if there is no token, return an unauthorized response
    if (!authtoken) {
        return res.status(401).json({ success: false, message: "You're not authorized" });
    }

    // verify the token using the JWT_SECRET_KEY environment variable
    jwt.verify(authtoken, process.env.JWT_SECRET_KEY, (err, user) => {
        // if the token is invalid, return an unauthorized response
        if (err) {
            return res.status(401).json({ success: false, message: "Token is invalid" });
        }

        // attach the user object to the request object
        req.user = user;

        // call the next middleware function
        next();
    });
};

// export the verifyUser function
const verifyUser = (req, res, next) => {
    // call the verifyToken function
    verifyToken(req, res, next, () => {
        // if the user is not authorized, return an unauthorized response
        if (req.user.id !== req.params.id || req.user.role !== "admin") {
        return res.status(401).json({ success: false, message: "You're not authenticated" });
        }
        // call the next middleware function
        next();
    });
};

// export the verifyAdmin function
const verifyAdmin = (req, res, next) => {
    // call the verifyToken function
    verifyToken(req, res, next, () => {
        // if the user is not an admin, return an unauthorized response
        if (req.user.role !== "admin") {
        return res.status(401).json({ success: false, message: "You're not authorized" });
        }

        // call the next middleware function
        next();
    });
};

module.exports = {
    verifyToken,
    verifyUser,
    verifyAdmin,
}