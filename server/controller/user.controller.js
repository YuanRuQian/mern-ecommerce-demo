import db from "../model/index.js";

const User = db.user;
const Product = db.product;

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .populate("roles")
      .populate({
        path: "favorites",
        populate: [{ path: "brand" }, { path: "type" }],
      })
      .exec();
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

const getCurrentUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .populate("roles")
      .populate({
        path: "favorites",
        populate: [{ path: "brand" }, { path: "type" }],
      })
      .exec();
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

const addProductToFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const product = await Product.findById(req.body.productId)
      .populate("brand")
      .populate("type")
      .exec();

    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    if (user.favorites.includes(product._id)) {
      return res
        .status(400)
        .send({ message: "Product is already in favorites" });
    }

    user.favorites.push(product._id);
    await user.save();

    res.status(200).send({ message: "Product added to favorites", product });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const removeProductFromFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const product = await Product.findById(req.params.productId)
      .populate("brand")
      .populate("type")
      .exec();

    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    if (!user.favorites.includes(product._id)) {
      return res.status(400).send({ message: "Product is not in favorites" });
    }

    user.favorites = user.favorites.filter(
      (favoriteId) => !favoriteId.equals(product._id),
    );
    await user.save();

    res
      .status(200)
      .send({ message: "Product removed from favorites", product });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const user = {
  getAllUsers,
  getCurrentUserInfo,
  addProductToFavorites,
  removeProductFromFavorites,
};

export default user;
