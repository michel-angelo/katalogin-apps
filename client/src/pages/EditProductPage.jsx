import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';

const EditProductPage = () => {
  const { id } = useParams(); // Ambil ID dari URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    originalPrice: '',
    category: '',
    stock: 0,
    description: '',
    image: '',
  });

  const [uploading, setUploading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  // 1. AMBIL DATA LAMA
  useEffect(() => {
    // PENGAMAN: Kalo ID gak ada di URL, tendang balik
    if (!id) {
        alert("ID Produk tidak valid!");
        navigate('/admin');
        return;
    }

    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products`);
        
        // Cari produk yang ID-nya cocok
        // Kita pake String(id) biar aman kalo tipe datanya beda
        const product = data.find((p) => String(p._id) === String(id));
        
        if (product) {
          setFormData({
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            category: product.category,
            stock: product.stock,
            description: product.description,
            image: product.images[0], 
          });
        } else {
            alert("BARANG GAK KETEMU DI GUDANG!");
            navigate('/admin');
        }
        setLoadingData(false);
      } catch (error) {
        console.error(error);
        alert("GAGAL BUKA ARSIP.");
        navigate('/admin');
      }
    };
    fetchProduct();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUploadFile = async (e) => {
    const file = e.target.files[0];
    const formDataUpload = new FormData();
    formDataUpload.append('image', file);

    setUploading(true);
    try {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      const { data } = await axios.post('/api/upload', formDataUpload, config);
      
      // FIX LOGIC DISINI:
      setFormData((prev) => ({ 
          ...prev, 
          image: data.imageUrl || "https://via.placeholder.com/500" // Fallback kalo imageUrl kosong
      }));
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
      // Fallback Offline
      setFormData((prev) => ({ ...prev, image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/products/${id}`, formData);
      alert('MANIFEST UPDATED!');
      navigate('/admin');
    } catch (error) {
      console.error(error);
      alert('UPDATE FAILED.');
    }
  };

  // STYLE VARIABLE
  const labelClass = "block font-mono text-xs uppercase tracking-widest text-gray-500 mb-2";
  const inputClass = "w-full border-2 border-black p-4 font-mono text-sm focus:outline-none focus:bg-[#CCFF00]/20 rounded-none transition-colors";

  if (loadingData) return (
      <div className="min-h-screen bg-[#f0f0f0] flex items-center justify-center font-mono animate-pulse">
          OPENING FILE...
      </div>
  );

  return (
    <div className="min-h-screen bg-[#f0f0f0] p-4 md:p-12 font-sans text-black">
      
      <div className="max-w-4xl mx-auto bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 md:p-10">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-10 border-b-4 border-black pb-6">
          <div>
            <h1 className="font-display text-3xl md:text-5xl uppercase leading-none">
              Edit Item<br/>
              {/* PENGAMAN: Cek dulu id ada isinya gak sebelum di-slice */}
              #{id ? id.slice(-4) : '????'}
            </h1>
          </div>
          <Link 
            to="/admin" 
            className="font-mono text-xs font-bold uppercase underline hover:text-red-600"
          >
            [X] CANCEL
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* SECTION 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-2">
                <label className={labelClass}>Product Name</label>
                <input 
                    type="text" name="name" value={formData.name} onChange={handleChange} className={inputClass} required
                />
            </div>
          </div>

          {/* SECTION 2 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             <div className="col-span-2 md:col-span-1">
                <label className={labelClass}>Category</label>
                <select name="category" value={formData.category} onChange={handleChange} className={inputClass}>
                    <option value="Baju">BAJU</option>
                    <option value="Celana">CELANA</option>
                    <option value="Jaket">JAKET</option>
                    <option value="Sepatu">SEPATU</option>
                    <option value="Aksesoris">AKSESORIS</option>
                </select>
             </div>
             <div className="col-span-2 md:col-span-1">
                <label className={labelClass}>Stock</label>
                <input type="number" name="stock" value={formData.stock} onChange={handleChange} className={inputClass} />
             </div>
             <div className="col-span-2 md:col-span-1">
                <label className={labelClass}>Price</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} className={inputClass} required />
             </div>
             <div className="col-span-2 md:col-span-1">
                <label className={labelClass}>Core Price</label>
                <input type="number" name="originalPrice" value={formData.originalPrice} onChange={handleChange} className={inputClass} />
             </div>
          </div>

          {/* SECTION 3: IMAGE PREVIEW & EDIT */}
          <div>
            <label className={labelClass}>Visual Proof</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Preview Gambar Lama/Sekarang */}
                <div className="border-2 border-black p-2 bg-gray-50 flex items-center justify-center">
                    {formData.image ? (
                        <img src={formData.image} alt="Current" className="max-h-48 object-contain" />
                    ) : (
                        <span className="font-mono text-xs">NO IMAGE</span>
                    )}
                </div>
                
                {/* Upload Area */}
                <div className="md:col-span-2 border-2 border-black border-dashed p-6 bg-gray-50 flex flex-col items-center justify-center relative hover:bg-white transition-colors">
                    <input type="file" onChange={handleUploadFile} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    <span className="font-mono text-2xl mb-2">🔄</span>
                    <span className="font-mono text-xs uppercase tracking-widest text-gray-500">
                        {uploading ? "REPLACING..." : "CLICK TO REPLACE IMAGE"}
                    </span>
                </div>
            </div>
          </div>

          {/* SECTION 4 */}
          <div>
            <label className={labelClass}>Description</label>
            <textarea name="description" rows="5" value={formData.description} onChange={handleChange} className={inputClass} required></textarea>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4">
             <button 
                type="submit"
                disabled={uploading}
                className={`flex-1 py-5 font-display text-2xl uppercase tracking-widest border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all
                    ${uploading ? "bg-gray-300" : "bg-[#CCFF00] hover:bg-black hover:text-[#CCFF00]"}`}
             >
                {uploading ? "PROCESSING..." : "UPDATE DATA"}
             </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditProductPage;