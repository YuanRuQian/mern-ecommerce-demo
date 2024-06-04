import db from "../model/index.js";

const User = db.user;
const ROLES = db.ROLES;

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    // Check for duplicate username
    const userByUsername = await User.findOne({
      username: req.body.username,
    }).exec();
    if (userByUsername) {
      return res
        .status(409)
        .send({ message: "Failed! Username is already in use!" });
    }

    // Check for duplicate email
    const userByEmail = await User.findOne({ email: req.body.email }).exec();
    if (userByEmail) {
      return res
        .status(409)
        .send({ message: "Failed! Email is already in use!" });
    }

    // If no duplicates, proceed to the next middleware
    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`,
        });
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
};

export default verifySignUp;
