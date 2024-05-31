import db from "../db/connection.js";


checkDuplicateUsernameOrEmail = (req, res, next) => {
    // check duplicate username and email
    const userWithSameUsername = db.collection("users").findOne({ username
    : req.body.username });

    if (userWithSameUsername) {
        return res.status(409).json({ message: "Username is already taken!" });
    }
    
    const userWithSameEmail = db.collection("users").findOne({ email
    : req.body.email });

    if (userWithSameEmail) {
        return res.status(409).json({ message: "Email is already in use!" });
    }

    next();
};





module.exports = verifySignUp;