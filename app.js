const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

require('dotenv/config');
//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/express_eshop', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(() => {console.log('mongo started');
});
const api = process.env.API_URL;

const productSchema = mongoose.Schema({
    name: String,
    image: String,
    countInStock: {
        type: Number,
        required: true
    }
})

const Product = mongoose.model('Product', productSchema)

app.get(`${api}/products`,async (req, res) => {
    const product = await Product.find();
    if(!productList){
        res.status(500).json({success:false})
    }
    res.send(productList)
});
app.post(`${api}/products`, async (req, res) => {
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock
    })
    product.save().then((createdProduct) => {
        res.status(201).json(createdProduct)
    }).catch((err)=> {
        res.status(500).json({
            error: err,
            success: false
        })
    })

    res.send(newProduct);
});

app.listen(3000, () => {
    console.log(`Server started on port 3000`);
});