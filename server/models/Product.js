const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Nama Produk Wajib Diisi'],
            trim: true,
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true
        },
        description: {
            type: String,
            required: [true, 'Deskripsi Produk Wajib Diisi']
        },
        price: {
            type: Number,
            required: [true, 'Harga Produk Wajib Diisi']
        },
        originalPrice: {
            type: Number,
            default: 0,
        },
        category: {
            type: String,
            required: [true, 'Kategori Produk Wajib Diisi'],
            enum: ['Baju', 'Celana', 'Jaket', 'Aksesoris', 'Sepatu']
        },
        stock: {
            type: Number,
            required: true,
            default: 1
        },
        images: [
            {
                type: String,
                required: true
            }
        ],
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("Products", ProductSchema)