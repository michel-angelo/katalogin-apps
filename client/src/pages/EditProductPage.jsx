import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditProductPage = () => {
  const { id } = useParams(); // Ambil ID dari URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    originalPrice: "",
    category: "",
    stock: 0,
    description: "",
    image: "",
  });

  const [uploading, setUploading] = useState(false);
  const [loadingData, setLoadingData] = useState(true); // Loading pas ambil data lama

  // 1. AMBIL DATA LAMA PAS HALAMAN DIBUKA
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Kita nembak endpoint GET by Slug (tapi karena kita butuh ID buat update,
        // kita bisa pake endpoint GET all terus filter, atau bikin endpoint GET by ID di backend.
        // TAPI CARA CEPAT: Kita pake endpoint /api/products (List) terus cari manual di sini,
        // ATAU better kita bikin endpoint GET BY ID di backend.

        // SEMENTARA: Kita cari produk dari list (agak "kotor" tapi jalan tanpa ubah backend GET)
        const { data } = await axios.get(`/api/products`);
        const product = data.find((p) => p._id === id);

        if (product) {
          setFormData({
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            category: product.category,
            stock: product.stock,
            description: product.description,
            image: product.images[0], // Ambil gambar pertama
          });
          setLoadingData(false);
        }
      } catch (error) {
        console.error(error);
        alert("Gagal ambil data produk lama");
      }
    };
    fetchProduct();
  }, [id]);

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

  // 2. SUBMIT REVISI (PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/products/${id}`, formData);
      alert("Produk Berhasil Diupdate!");
      navigate("/admin"); // Balik ke Dashboard
    } catch (error) {
      console.error(error);
      alert("Gagal update produk.");
    }
  };

  const inputClass =
    "w-full border border-black p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black rounded-none";

  if (loadingData)
    return <div className="p-10 text-center">Mengambil data lama...</div>;

  return (
    <div className="min-h-screen bg-white p-8 font-sans text-black">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-black uppercase tracking-tighter mb-8 border-b border-black pb-4">
          Edit Produk: {formData.name}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* SAMA PERSIS KAYAK ADD PRODUCT, CUMA VALUE-NYA UDAH KEISI */}

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
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2">
                Harga
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
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2">
                Harga Coret
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

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2">
              Foto (Upload kalau mau ganti)
            </label>
            <div className="border border-black border-dashed p-4 flex items-center gap-4">
              <input
                type="file"
                onChange={handleUploadFile}
                className="text-sm file:bg-black file:text-white"
              />
              {uploading && <span className="animate-pulse">UPLOADING...</span>}
            </div>
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
              required
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-black text-white py-4 font-black uppercase tracking-widest hover:bg-gray-800 transition-colors disabled:bg-gray-400"
          >
            Update Produk
          </button>

          {/* Tombol Batal */}
          <button
            type="button"
            onClick={() => navigate("/admin")}
            className="w-full border border-black py-4 font-bold uppercase tracking-widest hover:bg-gray-100 mt-2"
          >
            Batal
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProductPage;
