import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate, Link} from 'react-router-dom';

const AddProductPage = () => {
  const navigate = useNavigate ();

  const [formData, setFormData] = useState ({
    name: '',
    price: '',
    originalPrice: '',
    category: 'Baju',
    stock: 1,
    description: '',
    image: '',
  });

  const [uploading, setUploading] = useState (false);

  const handleChange = e => {
    setFormData ({...formData, [e.target.name]: e.target.value});
  };

  const handleUploadFile = async e => {
    const file = e.target.files[0];
    const formDataUpload = new FormData ();
    formDataUpload.append ('image', file);

    setUploading (true);
    try {
      const config = {headers: {'Content-Type': 'multipart/form-data'}};
      const {data} = await axios.post ('/api/upload', formDataUpload, config);
      setFormData (prev => ({
        ...prev,
        image: data.imageUrl || 'https://via.placeholder.com/500',
      }));
      setUploading (false);
    } catch (error) {
      console.error (error);
      setUploading (false);
      alert ('GAGAL UPLOAD KE CLOUD! Cek koneksi atau kuota Cloudinary.');
    }
  };

  const handleSubmit = async e => {
    e.preventDefault ();
    try {
      await axios.post ('/api/products', formData);
      alert ('MANIFEST CREATED!'); // Pesan ala gudang
      navigate ('/admin');
    } catch (error) {
      console.error (error);
      alert ('SYSTEM ERROR.');
    }
  };

  // STYLE VARIABLE (BIAR RAPI)
  const labelClass =
    'block font-mono text-xs uppercase tracking-widest text-gray-500 mb-2';
  const inputClass =
    'w-full border-2 border-black p-4 font-mono text-sm focus:outline-none focus:bg-[#CCFF00]/20 rounded-none transition-colors';

  return (
    <div className="min-h-screen bg-[#f0f0f0] p-4 md:p-12 font-sans text-black">

      {/* CONTAINER FORM */}
      <div className="max-w-4xl mx-auto bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 md:p-10">

        {/* HEADER FORM */}
        <div className="flex justify-between items-center mb-10 border-b-4 border-black pb-6">
          <h1 className="font-display text-3xl md:text-5xl uppercase leading-none">
            New Item<br />Entry.
          </h1>
          <Link
            to="/admin"
            className="font-mono text-xs font-bold uppercase underline hover:text-red-600"
          >
            [X] CANCEL
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* SECTION 1: BASIC INFO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-2">
              <label className={labelClass}>Product Name / Title</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={inputClass}
                placeholder="E.G. VINTAGE NIRVANA TEE 1993"
                autoComplete="off"
                required
              />
            </div>
          </div>

          {/* SECTION 2: SPECS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-2 md:col-span-1">
              <label className={labelClass}>Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="Baju">BAJU</option>
                <option value="Celana">CELANA</option>
                <option value="Jaket">JAKET</option>
                <option value="Sepatu">SEPATU</option>
                <option value="Aksesoris">AKSESORIS</option>
              </select>
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className={labelClass}>Stock Qty</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className={labelClass}>Price (IDR)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className={labelClass}>Core Price (Coret)</label>
              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleChange}
                className={inputClass}
                placeholder="Optional"
              />
            </div>
          </div>

          {/* SECTION 3: VISUAL PROOF (UPLOAD) */}
          <div className="border-2 border-black border-dashed p-6 bg-gray-50 text-center relative hover:bg-white transition-colors">
            <input
              type="file"
              onChange={handleUploadFile}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="pointer-events-none">
              <span className="block font-mono text-4xl mb-2">📸</span>
              <span className="block font-mono text-xs uppercase tracking-widest text-gray-500">
                {uploading
                  ? 'UPLOADING TO CLOUD...'
                  : 'DROP IMAGE HERE OR CLICK TO UPLOAD'}
              </span>
            </div>
            {/* Preview Kecil di Pojok */}
            {formData.image &&
              <div className="absolute top-4 right-4 w-20 h-20 border border-black bg-white p-1">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>}
          </div>

          {/* SECTION 4: DETAILS */}
          <div>
            <label className={labelClass}>Description / Condition Log</label>
            <textarea
              name="description"
              rows="5"
              value={formData.description}
              onChange={handleChange}
              className={inputClass}
              placeholder="DESCRIBE CONDITION, DEFECTS, SIZE MEASUREMENTS..."
              required
            />
          </div>

          {/* ACTION BUTTON */}
          <button
            type="submit"
            disabled={uploading || !formData.image}
            className={`w-full py-5 font-display text-2xl uppercase tracking-widest border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all
                ${uploading || !formData.image ? 'bg-gray-300 text-gray-500 cursor-not-allowed border-gray-400 shadow-none' : 'bg-[#CCFF00] text-black hover:bg-black hover:text-[#CCFF00]'}`}
          >
            {uploading ? 'PROCESSING...' : 'SAVE TO INVENTORY'}
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddProductPage;
