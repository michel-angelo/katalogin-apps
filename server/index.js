const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
// const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();
// connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Server Nyala...");
});

const PORT = process.env.PORT || 5000;

app.use((err, req, res, next) => {
  console.error("❌ ERROR MULTER/CLOUDINARY:", err);
  res.status(500).json({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server jalan di port ${PORT}`);
});
