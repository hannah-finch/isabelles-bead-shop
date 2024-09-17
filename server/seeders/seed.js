const db = require('../config/connection');

// add more models as needed
const { Product, User } = require('../models');

// add more seeds as needed
const productSeeds = require('./productSeeds.json');
const userSeeds = require('./userSeeds.json');

const cleanDB = require('./cleanDB');

db.once('open', async () => {
    try {
        await cleanDB('Product', 'products');
        await cleanDB('User', 'users');

        await Product.create(productSeeds);
        await User.create(userSeeds);
        
        console.log('Seeding complete!');
    } catch (err) {
        console.error(err);
        process.exit(1);
    } 
});