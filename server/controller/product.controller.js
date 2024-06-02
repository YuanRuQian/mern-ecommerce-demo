import db from "../model/index.js";

const Product = db.product;
const Type = db.type;
const Brand = db.brand;

const addType = async (req, res) => {
    try {
        let newType = new Type({
            name: req.body.name,
        });

        let result = await newType.save();
        res.send(result).status(204);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding record");
    }
}

const addBrand = async (req, res) => {
    try {
        let newBrand = new Brand({
            name: req.body.name,
        });

        let result = await newBrand.save();
        res.send(result).status(204);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding record");
    }
}

const addProduct = async (req, res) => {
    try {
        let newProduct = new Product({
            name: req.body.name,
            images: req.body.images,
            brand: req.body.brandId,
            type: req.body.typeId,
        });

        let result = await newProduct.save();
        res.send(result).status(204);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding record");
    }
}

const getProducts = async (req, res) => {
    const { page = 1, limit = 9, brand, type } = req.query;

    const filter = {};
    if (brand) {
        filter.brand = { $in: brand.split(';') };
    }
    if (type) {
        filter.type = { $in: type.split(';') };
    }

    try {
        const products = await Product.find(filter)
            .populate('type')
            .populate('brand')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const count = await Product.countDocuments(filter);

        res.json({
            products,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const product = { getProducts, addType, addBrand, addProduct};

export default product;