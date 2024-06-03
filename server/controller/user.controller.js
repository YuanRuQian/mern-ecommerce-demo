import db from "../model/index.js";

const User = db.user;

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
            .populate('roles')
            .populate('favorites').exec();
        res.status(200).send(users);
    } catch (err) {
        res.status(500).send({ message: err });
    }
}

const user = {
    getAllUsers
};

export default user;