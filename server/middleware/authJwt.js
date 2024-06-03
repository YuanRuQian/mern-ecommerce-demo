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
                return next();
            }
        }

        return res.status(403).send({ message: "Require Admin Role!" });
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
                return next();
            }
        }

        return res.status(403).send({ message: "Require User Role!" });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

const authJwt = {
    verifyToken,
    isAdmin,
    isUser,
};

export default authJwt;