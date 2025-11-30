const Product = require("../models/Product");

const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, image, originalPrice } =
      req.body;
    if (!name || !price || !category || !image) {
      return res.status(400).json({ message: "Data tidak Lengkap!" });
    }
    const slug = name
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
    const productExist = await Product.findOne({ slug });

    if (productExist) {
      return res.status(400).json({ message: "Produk sudah ada..." });
    }

    const adminUser = await require("../models/User").findOne({
      role: "admin",
    });
    const userId = adminUser ? adminUser._id : "65b2a1659223e71465243123";

    const product = new Product({
      name,
      slug,
      description,
      price,
      originalPrice,
      category,
      stock,
      images: [image],
      user: userId,
    });

    const createdProduct = await product.save();
    res.status(200).json(createdProduct);
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ message: "Gagal tambah Produk" + error });
  }
};

const getProducts = async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: i,
          },
        }
      : {};
    const catgory = req.query.category ? { category: req.query.category } : {};
    const products = await Product.find({ ...keyword, ...category }).sort({
      createdAt: -1,
    });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ message: "Server Error: Data Produk Gagal Diakses." });
  }
};

const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });

    if (!product) {
      return res.status(404).json({ message: "Produk tidak ditemukan..." });
    }

    res.json(product);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne();
      res.json({
        message: "Produk Berhasil dihapus",
      });
    } else {
      res.status(404).json({ message: "Produk tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({ message: "Gagal hapus produk" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, image, originalPrice } =
      req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.category = category || product.category;
      product.stock = stock || product.stock;
      product.originalPrice = originalPrice || product.originalPrice;

      if (name) {
        product.slug = name
          .toLowerCase()
          .replace(/ /g, "-")
          .replace(/[^\w-]+/g, "");
      }

      if (image) {
        product.images = [image];
      }

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Produk Tidak Ditemukan" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal update Produk" });
  }
};
module.exports = {
  createProduct,
  getProducts,
  getProductBySlug,
  deleteProduct,
  updateProduct,
};
