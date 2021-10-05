const {Product} = require('../models/product');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get(`/`,async (req, res) => {
    const product = await Product.find();
    if(!productList){
        res.status(500).json({success:false})
    }
    res.send(productList)
});
router.post(`/`, async (req, res) => {
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
module.exports =router; 