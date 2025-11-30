import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FaWhatsapp, FaArrowLeft } from "react-icons/fa";

const ProductDetailPage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const WA_CONTACT = "6281385042303";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`/api/products/${slug}`);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Gagal Ambil Produk", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [slug]);

  const handleCheckout = () => {
    if (!product) return;

    const message = `Halo min! Saya minat produk:
        Produk  : ${product.name}
        Harga   : ${product.price.toLocaleString("id-ID")}
        Link    : ${window.location.href}
        
        Masih ready kah min?`;

    const url = `https://wa.me/${WA_CONTACT}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank");
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Produk tidak ditemukan :(
      </div>
    );

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* TOMBOL BACK */}
      <div className="p-6 border-b border-black">
        <Link
          to="/"
          className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:underline"
        >
          <FaArrowLeft /> Kembali ke Katalog
        </Link>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2">
        {/* BAGIAN KIRI: FOTO GEDE (Brutalist Style) */}
        <div className="border-r border-black min-h-[50vh] md:min-h-screen bg-gray-100 flex items-center justify-center p-8">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full max-w-lg object-contain drop-shadow-2xl"
          />
        </div>

        {/* BAGIAN KANAN: DETAIL INFO */}
        <div className="p-8 md:p-16 flex flex-col justify-center sticky top-0 h-fit">
          <span className="text-gray-500 tracking-[0.2em] uppercase text-sm mb-4">
            {product.category}
          </span>

          <h1 className="text-4xl md:text-6xl font-black uppercase leading-none mb-6">
            {product.name}
          </h1>

          <div className="flex items-end gap-4 mb-8">
            <span className="text-3xl font-bold">
              Rp {product.price.toLocaleString("id-ID")}
            </span>
            {product.originalPrice > 0 && (
              <span className="text-xl text-gray-400 line-through decoration-2">
                Rp {product.originalPrice.toLocaleString("id-ID")}
              </span>
            )}
          </div>

          <p className="text-gray-700 leading-relaxed mb-10 text-lg border-l-4 border-black pl-4">
            {product.description}
          </p>

          {/* TOMBOL AKSI */}
          <div className="flex flex-col gap-4">
            {product.stock > 0 ? (
              <button
                onClick={handleCheckout}
                className="w-full bg-[#25D366] text-white py-4 px-8 font-bold uppercase tracking-widest hover:bg-[#128C7E] transition-colors flex items-center justify-center gap-3 text-lg"
              >
                <FaWhatsapp className="text-2xl" /> Beli via WhatsApp
              </button>
            ) : (
              <button
                disabled
                className="w-full bg-gray-300 text-gray-500 py-4 px-8 font-bold uppercase tracking-widest cursor-not-allowed"
              >
                Stok Habis
              </button>
            )}

            <div className="flex gap-4 text-xs text-gray-500 uppercase tracking-widest mt-4">
              <span> Stok: {product.stock} pcs</span>
              <span>•</span>
              <span> 100% Original</span>
              <span>•</span>
              <span> Siap Kirim</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
