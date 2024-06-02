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
    const page = parseInt(req.query.page) || 1;
    const { limit = 9, brand, type } = req.query;

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

const getBrands = async (req, res) => {
    try {
        const brands = await Brand.find();
        res.send(brands).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching records");
    }
}

const getTypes = async (req, res) => {
    try {
        const types = await Type.find();
        res.send(types).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching records");
    }
}

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate('type')
            .populate('brand')
            .exec();

        res.send(product).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching record");
    }
}

const getProductsByBrand = async (req, res) => {
    try {
        const products = await Product.find({ brand: req.params.id })
            .populate('type')
            .populate('brand')
            .exec();

        res.send(products).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching records");
    }
}

const product = { getProducts, addType, addBrand, addProduct, getBrands, getTypes, getProductById, getProductsByBrand };

export default product;