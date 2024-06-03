import jwt from "jsonwebtoken";
import  config from "../config/auth.config.js";
import db from "../model/index.js";

const User = db.user;
const Role = db.role;

const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(401).send({ message: "No token provided!" });
    }

    jwt.verify(token,
        config.secret,
        (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    message: "Unauthorized!",
                });
            }
            req.userId = decoded.id;
            next();
        });
};

const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        const roles = await Role.find({ _id: { $in: user.roles } });
        for (let role of roles) {
            if (role.name === "admin") {
                req.isAdmin = true; // Add this line to mark the user as admin
                return next();
            }
        }

        req.isAdmin = false; // Add this line to mark the user as not admin
        next();
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

const isUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        const roles = await Role.find({ _id: { $in: user.roles } });
        for (let role of roles) {
            if (role.name === "user") {
                req.isUser = true; // Add this line to mark the user as user
                return next();
            }
        }

        req.isUser = false; // Add this line to mark the user as not user
        next();
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

const canAccessUserData = (req, res, next) => {
    const requestedUserId = req.params.userId; // Assuming the user ID to be accessed is in the route parameters
    if (req.isAdmin || (req.isUser && req.userId === requestedUserId)) {
        return next();
    } else {
        return res.status(403).send({ message: "Forbidden: You have no access to this user's data" });
    }
};

const authJwt = {
    verifyToken,
    isAdmin,
    isUser,
    canAccessUserData
};

export default authJwt;