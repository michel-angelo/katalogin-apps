const express = require("express");
const router = express.Router();
const upload = require("../config/cloudinary");

router.post("/", upload.single("image"), (req, res) => {
  try {
    res.json({
      message: "Upload Success",
      imageUrl: req.file.path,
    });
  } catch (error) {
    console.error("❌ ERROR UPLOAD DETAIL:");

    console.error(JSON.stringify(error, null, 2));

    res.status(500).json({ message: "Gagal Upload Gambar" });
  }
});

module.exports = router;
