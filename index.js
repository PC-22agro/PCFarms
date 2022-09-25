const mongoose = require('mongoose');
const express = require('express');
const ejsMate = require('ejs-mate');
const app = express();
const path = require('path');

const Product = require('./model/product');

mongoose.connect('mongodb://localhost:27017/pcFarm', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("mongo connection open")
    })
    .catch(err => {
        console.log("mongo connection error")
        console.log(err)
    })

app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//tangent on category selector
const categories = ['fish', 'crop', 'vegetable', 'mollusc', 'bird'];

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/abouts', (req, res) => {
    res.render('products/about');
})

app.get('/contact', (req, res) => {
    res.render('products/contact');
})

//filtering by category
app.get('/products', async (req, res) => {
    const { category } = req.query;
    if (category) {
        const products = await Product.find({ category })
        res.render('products/index', { products, category })
    } else {
        const products = await Product.find({})
        res.render('products/index', { products, category: 'All' })
    }
})

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    res.render('products/details', { product })
})



app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000!");
})