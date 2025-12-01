import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useSearchParams} from 'react-router-dom';

import ProductCard from '../components/ProductCard';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import CategoryBar from '../components/CategoryBar';

const HomePage = () => {
  const [products, setProducts] = useState ([]);
  const [loading, setLoading] = useState (true);

  const [searchParams] = useSearchParams ();
  const category = searchParams.get ('category');
  const keyword = searchParams.get ('keyword');

  useEffect (
    () => {
      const fetchProducts = async () => {
        setLoading(true)
        try {
          let url = '/api/products';
          const params = [];
          if (category) params.push (`category=${category}`);
          if (keyword) params.push (`keyword=${keyword}`);

          if (params.length > 0) url += `?${params.join ('&')}`;

          const {data} = await axios.get (url);
          setProducts (data);
          setLoading (false);
        } catch (error) {
          console.error ('Gagal ambil data:', error);
          setLoading (false);
        }
      };

      fetchProducts ();
    },
    [category, keyword]
  );

  return (
    <Layout>

      {/* 1. HERO SECTION (Cuma muncul kalo gak lagi cari/filter) */}
      {!category && !keyword && <Hero />}

      {/* 2. CATEGORY BAR (Nempel) */}
      <CategoryBar />

      {/* 3. HASIL PENCARIAN (Judul Kecil) */}
      {(category || keyword) &&
        <div className="p-6 border-b border-black bg-gray-50">
          <h2 className="font-mono text-sm uppercase">
            Menampilkan hasil untuk:
            {' '}
            <span className="font-bold">{category || keyword}</span>
          </h2>
        </div>}

      {/* 4. GRID PRODUK */}
      <div className="min-h-screen bg-white">
        <main className="max-w-full">
          {/* max-w-full biar full width, atau max-w-7xl biar ada sisa kiri kanan */}

          {loading
            ? <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 border-l border-black">
                {[1, 2, 3, 4].map (n => (
                  <div
                    key={n}
                    className="aspect-[3/4] bg-gray-200 animate-pulse border-r border-black"
                  />
                ))}
              </div>
            : products.length > 0
                ? // GRID TANPA GAP (Biar border nempel ala tabel)
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 border-l border-black">
                    {products.map (
                      product => // Kita bungkus ProductCard biar bordernya rapi
                      (
                        <div
                          key={product._id}
                          className="border-r border-b border-black"
                        >
                          <ProductCard product={product} />
                        </div>
                      )
                    )}
                  </div>
                : <div className="p-20 text-center font-mono uppercase text-gray-500">
                    Barang Ghoib. Gak ketemu bro.
                  </div>}
        </main>
      </div>

    </Layout>
  );
};

export default HomePage;
