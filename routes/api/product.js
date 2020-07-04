const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Product = require('../../models/Product');

// @route   POST api/product
// @desc    Create & update Product
// @access  Private (Only Admin)

router.post('/', auth.admin, async (req, res) => {

    const { name, image, marketPrice, hbPrice, stock } = req.body;

     // Build product object
     const productFields = {};
     productFields.name = name;
     productFields.image = image;
     productFields.marketPrice = marketPrice;
     productFields.hbPrice = hbPrice;
     productFields.stock = stock;

     try {
         let product = await Product.findOne({name});
         if(product) {
             // Update
             product = await Product.findOneAndUpdate({name}, {$set: productFields}, {new: true}, {useFindandModify: false});
             return res.json(product); 
         }

         product = new Product(productFields);
         await product.save();
         res.json(product);

    } catch (err) {
         console.error(err.message);
         res.status(500).send('Server Error');
     }

});


// @route   GET api/product
// @desc    Read all product
// @access  Public 
router.get('/', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});


// @route   DELETE api/product
// @desc    Delete product by name
// @access  Private (Only admin)
router.delete('/', auth.admin, async (req, res) => {
    try {
        // Remove product
        var data = JSON.parse(req.body.body);
        var product = await Product.findOneAndRemove({name:data.product.name});

        res.json({msg: 'Product deleted', item: product});

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;