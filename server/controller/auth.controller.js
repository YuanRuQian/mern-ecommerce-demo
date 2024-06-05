import config from "../config/auth.config.js";
import db from "../model/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const User = db.user;
const Role = db.role;

const signInUser = async (user, res) => {
  const token = jwt.sign({ id: user.id }, config.secret, {
    algorithm: "HS256",
    allowInsecureKeySizes: true,
    expiresIn: 86400, // 24 hours
  });

  res.status(200).send({
    userData: user,
    accessToken: token,
  });
};

const signup = async (req, res) => {
  try {
    // Create new user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // Save user to database
    const savedUser = await user.save();

    // Check if roles are provided in the request
    if (req.body.roles) {
      // Find roles by name
      const roles = await Role.find({
        name: { $in: req.body.roles },
      });

      // Assign roles to user
      savedUser.roles = roles.map((role) => role._id);
    } else {
      // Assign default "user" role
      const role = await Role.findOne({ name: "user" });
      savedUser.roles = [role._id];
    }

    // Save user with roles
    await savedUser.save();

    // Sign in the user and send the response
    signInUser(savedUser, res);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const signin = async (req, res) => {
  try {
    // Find user by email
    const user = await User.findOne({ email: req.body.email })
      .populate("roles")
      .populate({
        path: "favorites",
        populate: [{ path: "brand" }, { path: "type" }],
      })
      .exec();

    // Check if user exists
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    // Validate password
    const passwordIsValid = bcrypt.compare(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    // Generate token
    const token = jwt.sign({ id: user.id }, config.secret, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: 86400, // 24 hours
    });

    // Send response
    res.status(200).send({
      userData: user,
      accessToken: token,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const auth = { signup, signin };

export default auth;
