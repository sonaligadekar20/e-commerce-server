import { model,Schema } from "mongoose";
const productSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    productImage: String,
    brand: String,
});

const product = model ('product', productSchema)

export default product;