import express from 'express';
import mongoose from 'mongoose';
import product from './src/models/product.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());
const PORT = 5000;

const MONGODB_URI = "";

const connectMongoDB = async () => {
    const conn = await mongoose.connect(process.env.MONGODB_URI)

    if (conn) {
        console.log('MongoDB connected successfully');
    }
}
connectMongoDB();

app.get('/products', async (req, res) => {

    const products = await product.find()
    res.json({
        success: true,
        data: products,
        message: "Successfully get details of product"
    })
});

app.post('/product', async (req, res) => {
    const { name, description, price, productImage, brand } = req.body;

    const prod = new product({
        name: name,
        description: description,
        price: price,
        productImage: productImage,
        brand: brand,
    })

    const saveproduct = await prod.save();
    res.json({
        success: true,
        data: saveproduct,
        message: 'Successfully added new product',
    })
});

app.get('/product', async (req, res) => {

    const { name } = req.query;

    const Product = await product.findOne({ name: name })
    res.json({
        success: true,
        data: Product,
        message: "Get details of products."
    })
});

app.delete('/product/:_id', async (req, res) => {
    const { _id } = req.params;
    await product.deleteOne({ _id: _id });

    res.json({
        success: true,
        data: {},
        message: `Successfully deleted product with id ${_id}`,
    })
});

app.put('/product/:_id', async (req, res) => {
    const { _id } = req.params;
    const { name, description, price, productImage, brand } = req.body;
    await product.updateOne(
        { _id : _id },
        { $set: {
                name: name,
                description: description,
                price: price,
                productImage: productImage,
                brand: brand,
            }
        }
    );

    const updatedproduct = await product.findOne({ _id: _id });
    res.json({
        success: true,
        data: updatedproduct,
        message: `Successfully updated new product`,
    })
});

app.patch('/product/:_id', async(req, res)=>{
    const {_id} = req.params;
    const { name, description, price, productImage, brand } = req.body;

    const Product = await product.findById(_id);

    if(name){
        Product.name = name;    
    }
    if(description){
        Product.description = description;  
    }
    if(price){
        Product.price = price;  
    }
    if(brand){
        Product.brand = brand;  
    }
    if(productImage){
        Product.productImage =productImage;  
    }

    const updatedproduct =await Product.save();

    res.json({
        success:true,
        data:updatedproduct,
        message:`Successfully updated`,
    })
    
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
});
