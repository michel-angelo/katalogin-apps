import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProductPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    originalPrice: "",
    category: "Baju",
    stock: 1,
    description: "",
    image: "",
  });

  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUploadFile = async (e) => {
    const file = e.target.files[0];
    const formDataUpload = new FormData();
    formDataUpload.append("image", file);

    setUploading(true);
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const { data } = await axios.post("/api/upload", formDataUpload, config);

      setFormData((prev) => ({ ...prev, image: data.imageUrl }));
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
      alert("Gagal upload gambar bro!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/products", formData);
      alert("Produk Berhasil Ditambah!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Gagal simpan produk. Cek console.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  const inputClass =
    "w-full border border-black p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black rounded-none";

  return (
    <div className="min-h-screen bg-white p-8 font-sans text-black">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b border-black pb-4">
          <h1 className="text-3xl font-black uppercase tracking-tighter">
            Admin Area
          </h1>
          <button
            onClick={handleLogout}
            className="text-xs font-bold uppercase tracking-widest text-red-600 hover:text-red-800 border border-red-600 px-4 py-2 hover:bg-red-50 transition"
          >
            Logout
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* NAMA PRODUK */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2">
              Nama Produk
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={inputClass}
              placeholder="CONTOH: JAKET VINTAGE 90s"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* HARGA */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2">
                Harga Jual (Rp)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>
            {/* HARGA CORET */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2">
                Harga Coret (Opsional)
              </label>
              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* KATEGORI */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2">
                Kategori
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="Baju">Baju</option>
                <option value="Celana">Celana</option>
                <option value="Jaket">Jaket</option>
                <option value="Sepatu">Sepatu</option>
                <option value="Aksesoris">Aksesoris</option>
              </select>
            </div>
            {/* STOK */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2">
                Stok
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          {/* UPLOAD FOTO */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2">
              Foto Produk
            </label>
            <div className="border border-black border-dashed p-4 flex items-center gap-4">
              <input
                type="file"
                onChange={handleUploadFile}
                className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-none file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800"
              />
              {uploading && (
                <span className="text-xs font-bold animate-pulse">
                  UPLOADING...
                </span>
              )}
            </div>
            {/* Preview Gambar */}
            {formData.image && (
              <div className="mt-4 border border-black p-1 w-32">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-full h-auto"
                />
              </div>
            )}
          </div>

          {/* DESKRIPSI */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2">
              Deskripsi
            </label>
            <textarea
              name="description"
              rows="5"
              value={formData.description}
              onChange={handleChange}
              className={inputClass}
              placeholder="Jelaskan kondisi barang, ukuran, dll..."
              required
            ></textarea>
          </div>

          {/* TOMBOL SUBMIT */}
          <button
            type="submit"
            disabled={uploading || !formData.image}
            className={`w-full py-4 font-black uppercase tracking-widest transition-colors ${
              uploading || !formData.image
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            {uploading ? "Tunggu Upload..." : "Simpan Produk"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;
