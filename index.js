import express from 'express';
import mongoose from 'mongoose';
import product from './src/models/product.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());
const PORT= 5000;

const MONGODB_URI = "";

const connectMongoDB = async()=>{
    const conn = await mongoose.connect(process.env.MONGODB_URI) 

    if (conn){
        console.log('MongoDB connected successfully');
    }
}
connectMongoDB();

app.get('/products', async (req,res)=>{

    const products = await product.find()
    res.json({
        success: true,
        data:products,
        message: "Successfully get details of product"
    })
});

app.post('/product', async (req, res)=>{
    const {name, description, price, productImage, brand} =req.body;

    const prod = new product ({
        name:name,
        description:description,
        price:price,
        productImage:productImage,
        brand:brand,
    })

    const saveproduct = await prod.save();
    res.json({
        success:true,
        data: saveproduct,
        message: 'Successfully added new product',        
    })
});

app.get('/product', async (req, res)=>{

    const {name} = req.query;

    const Product = await product.findOne({name:name})
    res.json({
        success:true,
        data: Product,
        message:"Get details of products."
    })
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}.`)
});
