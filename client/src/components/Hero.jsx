import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="w-full border-b-2 border-black">
      <div className="grid grid-cols-1 md:grid-cols-4 min-h-[60vh] md:h-[80vh]">
        
        {/* BAGIAN 1: FOTO UTAMA (2 KOLOM) */}
        <div className="md:col-span-2 border-r-2 border-black relative group overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80&w=1000" 
            alt="Main Model" 
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 grayscale hover:grayscale-0"
          />
          <div className="absolute bottom-0 left-0 p-8 bg-black/50 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none w-full">
            <h1 className="text-white md:text-black font-display text-5xl md:text-8xl uppercase leading-none mix-blend-difference">
              RAW<br/>VINTAGE
            </h1>
          </div>
        </div>

        {/* BAGIAN 2: KOLOM KANAN (DI BAGI 2 LAGI ATAS BAWAH) */}
        <div className="md:col-span-2 grid grid-rows-2">
          
          {/* KOTAK KANAN ATAS */}
          <div className="border-b-2 border-black relative overflow-hidden group">
             <img 
                src="" 
                alt="Detail 1" 
                className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white font-mono text-xl border border-white px-4 py-2 uppercase">
                  Est. 1990
                </span>
             </div>
          </div>

          {/* KOTAK KANAN BAWAH (TEKS PROMO) */}
          <div className="bg-[#CCFF00] p-8 flex flex-col justify-center items-start relative overflow-hidden">
            {/* Dekorasi Garis */}
            <div className="absolute top-4 right-4 text-xs font-mono">
                /// LIMITED STOCK
            </div>

            <h2 className="font-display text-4xl md:text-6xl uppercase leading-none mb-6 z-10">
              Fresh<br/>Drop.
            </h2>
            <p className="font-mono text-sm mb-8 max-w-xs z-10">
              Koleksi kurasi minggu ini. Jaket kulit, denim belel, dan kaos band langka. Siapa cepat dia dapat.
            </p>
            
            <Link 
              to="/?category=Jaket" 
              className="z-10 bg-black text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-white hover:text-black border border-black transition-colors"
            >
              Lihat Katalog
            </Link>

            {/* Background Pattern Abstrak (Hiasan) */}
            <div className="absolute -right-10 -bottom-10 text-9xl font-black opacity-10 select-none">
                90s
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Hero;