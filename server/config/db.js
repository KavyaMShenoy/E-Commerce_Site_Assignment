const { default: mongoose } = require('mongoose');

const Users = require('../models/usersModel.js');

const Products = require('../models/productsModel.js');

const usersData = require('../usersData.js');

const productsData = require('../productsData');

async function insertUsersData() {
    try {

        for (let user of usersData) {
            const existingUser = await Users.findOne({ name: new RegExp('^' + user.name + '$', 'i') });

            if (!existingUser) {
                await Users.create(user);
            }
        }

    } catch (err) {
        console.error('Error inserting users data:', err);
    }
}

async function insertProductsData() {
    try {

        for (let product of productsData) {
            const existingProduct = await Products.findOne({ name: new RegExp('^' + product.name + '$', 'i') });

            if (!existingProduct) {
                await Products.create(product);
            }
        }

    } catch (err) {
        console.error('Error inserting products data:', err);
    }
}

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB connected successfully.");

        await insertUsersData();
        await insertProductsData();
    } catch (error) {
        console.log("An error occured.", error.message);
    }
}

module.exports = connectDB;