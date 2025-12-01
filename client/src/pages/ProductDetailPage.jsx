import React from 'react';
import {Link} from 'react-router-dom'; // Hapus useParams, axios, dll
import {FaWhatsapp, FaArrowLeft} from 'react-icons/fa';
import Layout from '../components/Layout';

const ProductDetailPage = () => {
  // 1. DATA PALSU (LANGSUNG TULIS DISINI)
  // Gak perlu loading-loadingan, langsung tampil.
  const product = {
    _id: '123456',
    name: 'VINTAGE OVERSIZE TEE 90S (PREVIEW MODE)',
    category: 'BAJU',
    price: 150000,
    originalPrice: 250000,
    stock: 5,
    description: `Ini contoh deskripsi panjang buat ngecek layout.
    
    Kondisi barang masih mulus 90%. Tag lengkap. Sablon plastisol aman jaya sentosa tidak retak-retak. Bahan cotton combed 20s vintage yang tebal dan nyaman dipakai harian.
    
    Size Chart (PxL):
    72cm x 56cm (Fit to XL)
    
    Minus: Ada noda dikit di bagian bawah, bisa ilang kalo dicuci pake sabun ajaib.`,
    images: [
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80&w=1000',
    ],
  };

  const NOMOR_WA = '6281234567890';

  const handleCheckout = () => {
    const message = `Halo Min, saya minat produk ini:\n*${product.name}*\nHarga: Rp ${product.price.toLocaleString ('id-ID')}\nLink: ${window.location.href}\n\nMasih ready gak?`;
    const url = `https://wa.me/${NOMOR_WA}?text=${encodeURIComponent (message)}`;
    window.open (url, '_blank');
  };

  return (
    <Layout>
      {/* GRID MENTOK KIRI KANAN (FULL WIDTH) */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 min-h-screen font-sans text-black">

        {/* BAGIAN KIRI: FOTO */}
        <div className="border-b md:border-b-0 md:border-r-2 border-black bg-gray-50 relative">
          <div className="sticky top-[140px] h-auto p-8 flex items-center justify-center">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full max-w-xl object-contain drop-shadow-2xl mix-blend-multiply"
            />
          </div>
          <div className="absolute top-0 left-0 bg-black text-white px-4 py-2 font-mono text-xs uppercase tracking-widest">
            {product.category}
          </div>
        </div>

        {/* BAGIAN KANAN: DETAIL INFO */}
        <div className="flex flex-col">

          <div className="p-6 border-b-2 border-black flex justify-between items-center">
            <Link
              to="/"
              className="flex items-center gap-2 text-xs font-mono font-bold uppercase hover:underline"
            >
              <FaArrowLeft /> Back to Catalog
            </Link>
            <div className="text-xs font-mono text-gray-400">
              ID: {product._id}
            </div>
          </div>

          <div className="p-8 md:p-12 flex-grow">
            <h1 className="font-display text-5xl md:text-7xl uppercase leading-[0.9] mb-8 break-words">
              {product.name}
            </h1>

            <div className="border-2 border-black p-6 mb-8 bg-white max-w-md">
              <div className="flex justify-between font-mono text-sm text-gray-500 mb-2 uppercase tracking-widest">
                <span>Price Tag</span>
                <span>IDR</span>
              </div>
              <div className="flex items-baseline gap-4">
                <span className="font-display text-4xl md:text-5xl">
                  {product.price.toLocaleString ('id-ID')}
                </span>
                {product.originalPrice > 0 &&
                  <span className="font-mono text-lg text-red-500 line-through decoration-2">
                    {product.originalPrice.toLocaleString ('id-ID')}
                  </span>}
              </div>
            </div>

            <div className="prose prose-lg text-black font-sans mb-12">
              <h3 className="font-mono text-sm font-bold uppercase border-b border-black inline-block mb-4">
                Product Details
              </h3>
              <p className="whitespace-pre-line leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>

          <div className="sticky bottom-0 md:relative p-4 md:p-12 border-t-2 border-black bg-white z-20">
            <button
              onClick={handleCheckout}
              className="w-full bg-[#CCFF00] text-black border-2 border-black py-5 font-display text-xl md:text-2xl uppercase tracking-widest hover:bg-black hover:text-[#CCFF00] transition-colors flex items-center justify-center gap-4 shadow-brutal active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
            >
              <FaWhatsapp className="text-3xl" />
              Cop This Now
            </button>
            <p className="text-center font-mono text-[10px] mt-2 text-gray-400 uppercase">
              Secure transaction via WhatsApp Direct
            </p>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default ProductDetailPage;
