import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

import user from './user.model.js';
import product from './product.model.js';
import type from './type.model.js';
import brand from './brand.model.js';
import role from './role.model.js';

const db = {
    mongoose,
    user,
    product,
    type,
    brand,
    role
};

db.ROLES = ["user", "admin"];

export default db;
