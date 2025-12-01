const Product = require("../models/Product");
const User = require("../models/User");

const dummyProducts = [
  {
    _id: "1",
    name: "LOUIS VUITTON MONOGRAM GRAPHIC TEE",
    slug: "lv-monogram-tee",
    images: ["https://imgs.search.brave.com/MWgZgjl6vmuE_mnU6KPpOS70wygOGiQ-bJzdjeGEcUM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aW1nLnBvaXpvbmFw/cC5jb20vcHJvLWlt/Zy9jdXQtaW1nLzIw/MjUwNDEyLzFhMWM4/YjhiMzM5YzQxY2I4/ZTJmMTllMGFlNDc2/ZTBiLmpwZz94LW9z/cy1wcm9jZXNzPWlt/YWdlL2Zvcm1hdCx3/ZWJwL3Jlc2l6ZSx3/XzUwMA"],
    category: "Baju",
    price: 12500000,
    originalPrice: 16000000,
    stock: 1,
    description: "T-shirt premium dengan full-monogram LV. Cotton heavyweight, cutting boxy modern. Kondisi 9/10, minim signs of wear."
  },
  {
    _id: "2",
    name: "GUCCI SELVEDGE DENIM PANTS",
    slug: "gucci-selvedge-denim",
    images: ["https://imgs.search.brave.com/ygWzTcDa4BMh3C1H8Cj-K40TlLSjawjaEg-kX_9F-FA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bHVpc2F3b3JsZC5j/b20vd3AtY29udGVu/dC91cGxvYWRzLzIw/MjUvMDQvODMyNTEw/MzE2NF8zNjg0LTYw/MHg2MDAuanBn"],
    category: "Celana",
    price: 8900000,
    originalPrice: 0,
    stock: 2,
    description: "Denim Jepang selvedge by Gucci dengan hardware branded. Indigo deep, fading natural. Straight fit modern, size 32."
  },
  {
    _id: "3",
    name: "SAINT LAURENT TEDDY VARSITY JACKET",
    slug: "saint-laurent-teddy",
    images: ["https://imgs.search.brave.com/Le1q9hAZC78EdxgI6CxlWwJeAzPdnJp_skb-OWm2Sik/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2Q2LzIx/L2RkL2Q2MjFkZDE0/Zjg0Zjc5ODQzNTBm/MzMyYWYyZDJjZDM1/LmpwZw"],
    category: "Jaket",
    price: 29500000,
    originalPrice: 38000000,
    stock: 3,
    description: "Varsity legendaris SLP. Leather sleeve lambskin premium, body wool tebal. Kondisi like new, tanpa crack atau defect."
  },
  {
    _id: "4",
    name: "OFF-WHITE x NIKE AIR FORCE 1 LOW “MoMA”",
    slug: "off-white-x-nike-af1-low-moma",
    images: ["https://imgs.search.brave.com/eQRFdUHTQwU5zbO0IZwBAkojWhBigY30n95vxVsMlBY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZWRlbGl2ZXJ5Lm5l/dC8yRGZvdnhOZXQ5/U3ljLTR4WXBjc0dn/LzI2NmNhNzRjLTA1/YTQtNDhmMC1iM2E2/LTBkNTJhNzE4MmMw/MC9wcm9kdWN0"],
    category: "Sepatu",
    price: 225000000,
    originalPrice: 465000000,
    stock: 4,
    description: "Rilisan eksklusif MoMA New York, salah satu grail paling langka di sneaker history. Deadstock, Size: US 9,Upper hitam premium dengan Swoosh perak metallic. Signature Off‑White zip tie & Helvetica text. Rilis terbatas hanya di MoMA Store, New York.Koleksi ikonik karya Virgil Abloh, hype abadi."
  },
  {
    _id: "5",
    name: "SUPREME x LOUIS VUITTON HOODIE (2017)",
    slug: "dior-oblique-hoodie",
    images: ["https://imgs.search.brave.com/j2zZUHDUvcJ_th6BFiTdEDjwf4sdpFSOT6sZnPQzmhM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9vZHRv/LmNvbS9jZG4vc2hv/cC9maWxlcy8xNzMx/NzkxMzgzLTIwLmpw/ZWc_dj0xNzMxNzkx/Mzg5JndpZHRoPTMw/MDA"],
    category: "Baju",
    price: 23500000,
    originalPrice: 29000000,
    stock: 2,
    description: "Supreme x Louis Vuitton Hoodie (2017) — hoodie merah monogram ikonik, luxury streetwear grail dengan hype abadi."
  },
  {
    "_id": "6",
    "name": "BAPE x G-SHOCK DW-5750 BAPESTA 20th Anniversary",
    "slug": "bape-gshock-dw5750-bapesta-20th",
    "images": ["https://imgs.search.brave.com/gwcd5T-x9JDUZtQ8T36qDrNI3TzjCqOIKNdanjkrxI0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9oeXBl/YmVhc3QuY29tL2lt/YWdlLzIwMjAvMDMv/YmFwZS1yZWN0LTEu/anBn"],
    "category": "Watch",
    "price": 6500000,
    "originalPrice": 70000000,
    "stock": 1,
    "description": "Jam tangan digital ikonik hasil kolaborasi BAPE x G-SHOCK untuk 20th Anniversary, dengan motif camo khas BAPESTA."
  },
  {
    "_id": "7",
    "name": "Balenciaga x Bang & Olufsen Speaker Bag",
    "slug": "balenciaga-bang-olufsen-speaker-bag",
    "images": ["https://imgs.search.brave.com/LdVHNuT9KRC3JPDVIZn-79I_B9_TzdZPI3f-h_zv3so/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuYXVndXN0bWFu/LmNvbS93cC1jb250/ZW50L3VwbG9hZHMv/c2l0ZXMvMy8yMDIy/LzA3LzE1MjMxNTAz/L2JhbGVuY2lhZ2Et/MS5qcGVn"],
    "category": "Bag",
    "price": 45000000,
    "originalPrice": 0,
    "stock": 1,
    "description": "Tas eksklusif Balenciaga yang berfungsi ganda sebagai speaker Bang & Olufsen, limited edition luxury collab."
  },
  {
    "_id": "8",
    "name": "Adidas x Yeezy Boost 350 V2 Fade",
    "slug": "adidas-yeezy-boost-350-v2-fade",
    "images": ["https://imgs.search.brave.com/d3TURpqJPoggzOLcFioKeeez72p7xi9FuxhNOEFJx78/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aHlwZW5lZWR6LmNv/bS9jZG4vc2hvcC9m/aWxlcy9hZGlkYXNZ/ZWV6eUJvb3N0MzUw/VjJZZWNoZXJQcm9k/dWN0XzYwMHguanBn/P3Y9MTc0MjcxODM5/Nw"],
    "category": "Sneakers",
    "price": 5200000,
    "originalPrice": 0,
    "stock": 1,
    "description": "Sneakers hype hasil kolaborasi Adidas x Kanye West, seri Yeezy Boost 350 V2 Fade dengan desain futuristik dan nyaman dipakai."
  }
];


// const getProducts = async (req, res) => {
//   try {
//     const keyword = req.query.keyword
//       ? {
//         name: {
//           $regex: req.query.keyword,
//           $options: "i",
//         },
//       }
//       : {};

//     const category = req.query.category
//       ? { category: req.query.category }
//       : {};

//     const products = await Product.find({ ...keyword, ...category }).sort({ createdAt: -1 });
//     res.json(products);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error: Gagal ambil data" });
//   }
// };

// const getProductBySlug = async (req, res) => {
//   try {
//     const product = await Product.findOne({ slug: req.params.slug });
//     if (product) {
//       res.json(product);
//     } else {
//       res.status(404).json({ message: "Produk tidak ditemukan" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// const createProduct = async (req, res) => {
//   try {
//     const { name, description, price, category, stock, image, originalPrice } = req.body;

//     if (!image) {
//       return res.status(400).json({ message: "Foto produk wajib diupload!" });
//     }

//     const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

//     const productExists = await Product.findOne({ slug });
//     if (productExists) {
//       return res.status(400).json({ message: "Produk sudah ada!" });
//     }

//     const adminUser = await User.findOne({ role: 'admin' });
//     const userId = adminUser ? adminUser._id : null;

//     const newProduct = new Product({
//       name, slug, description, price, originalPrice, category, stock,
//       images: [image],
//       user: userId
//     });

//     const savedProduct = await newProduct.save();
//     res.status(201).json(savedProduct);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: error.message });
//   }
// };

// const deleteProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (product) {
//       await product.deleteOne();
//       res.json({ message: "Produk berhasil dihapus" });
//     } else {
//       res.status(404).json({ message: "Produk tidak ditemukan" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Gagal hapus produk" });
//   }
// };

// const updateProduct = async (req, res) => {
//   try {
//     const { name, description, price, category, stock, image, originalPrice } = req.body;
//     const product = await Product.findById(req.params.id);

//     if (product) {
//       product.name = name || product.name;
//       product.description = description || product.description;
//       product.price = price || product.price;
//       product.category = category || product.category;
//       product.stock = stock || product.stock;
//       product.originalPrice = originalPrice || product.originalPrice;

//       if (name) {
//         product.slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
//       }
//       if (image) {
//         product.images = [image];
//       }

//       const updatedProduct = await product.save();
//       res.json(updatedProduct);
//     } else {
//       res.status(404).json({ message: "Produk tidak ditemukan" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Gagal update produk" });
//   }
// };

const getProducts = async (req, res) => {
  let filtered = [...dummyProducts];

  if (req.query.category) {
    filtered = filtered.filter(p => p.category === req.query.category);
  }
  if (req.query.keyword) {
    const key = req.query.keyword.toLowerCase();
    filtered = filtered.filter(p => p.name.toLowerCase().includes(key));
  }

  res.json(filtered);
};

const getProductBySlug = async (req, res) => {
  const product = dummyProducts.find(p => p.slug === req.params.slug);
  res.json(product || dummyProducts[0]);
};

const createProduct = async (req, res) => {
  const newProduct = {
    _id: Math.random().toString(36).substr(2, 9),
    ...req.body,
    images: [req.body.image || "https://images.unsplash.com/photo-1576566588028-4147f3842f27"]
  };
  res.status(201).json(newProduct);
};

const deleteProduct = async (req, res) => {
  res.json({ message: "Deleted (Dummy)" });
};

const updateProduct = async (req, res) => {
  res.json({ _id: req.params.id, ...req.body });
};

module.exports = {
  getProducts,
  getProductBySlug,
  createProduct,
  deleteProduct,
  updateProduct
};