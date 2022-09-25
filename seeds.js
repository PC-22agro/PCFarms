const mongoose = require('mongoose');

const Product = require('./model/product');

mongoose.connect('mongodb://localhost:27017/pcFarm', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("mongo connection open")
    })
    .catch(err => {
        console.log("mongo connection error")
        console.log(err)
    })


const seedProducts = [
    {
        name: 'Catfish',
        price: 900,
        category: 'fish'
    },
    {
        name: 'Plantain',
        price: 2000,
        category: 'crop'
    },
    {
        name: 'Snail',
        price: 1000,
        category: 'mollusc'
    },
    {
        name: 'Pumpkin leaves',
        price: 300,
        category: 'vegetable'
    },
    {
        name: 'Broiler',
        price: 2200,
        category: 'bird'
    }
]

Product.insertMany(seedProducts)
    .then(seedProducts => {
        console.log(seedProducts);
    })
    .catch(e => {
        console.log(e);
    })
