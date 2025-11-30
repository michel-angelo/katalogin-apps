const mongoose = require('mongoose');
const dotenv = require('dotenv');
const products = require('./data/products');
const User = require('./models/User');
const Product = require('./models/Product');
const connectDB = require('./config/db')

dotenv.config();
connectDB();

const importData = async () => {
    try {
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.create([
            {
                name: 'Admin Toko',
                email: 'admin@katalogin.com',
                password: 'admin123',
                role: 'admin'
            },
            {
                name: 'Customer 1',
                email: 'customer1@katalogin.com',
                password: 'password123',
                role: 'customer'
            }
        ])

        const adminUser = createdUsers[0]._id;

        const sampleProducts = products.map((product) => {
            return {...product, user: adminUser}
        })

        await Product.insertMany(sampleProducts);

        console.log('Data Berhasil di Import');
        process.exit();
    } catch (error) {
        console.error('Error', error)
        process.exit(1);
    }
}

const destroyData = async () => {
    try {
        await Product.deleteMany()
        await User.deleteMany()

        console.log('Data Dihapus');
        process.exit()
    } catch (error) {
        console.error('Error', error)
        process.exit(1)
    }
}

if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}