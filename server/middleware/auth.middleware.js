import {verify} from "jsonwebtoken";

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.replace("Bearer ", "");
        const decoded = verify(token, process.env.JWT_SECRET);
        req.userData = decoded;
        next();
    } catch (err) {
        return res.status(401).json({
            message: "Unauthorized (invalid token, token doesn’t exist, token expired)"
        });
    }
};