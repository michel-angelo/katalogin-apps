import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const categories = ["Semua", "Baju", "Jaket", "Celana", "Sepatu", "Aksesoris"];

const CategoryBar = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const activeCategory = searchParams.get('category') || 'Semua';

    const handleCategoryClick = (cat) => {
        if (cat === 'Semua') {
            navigate('/');
        } else {
            navigate(`/?category=${cat}`)
        }
    }

    return (
        <div className="sticky top-[137px] md:top-[82px] z-40 bg-white border-b-2 border-black overflow-x-auto no-scrollbar">
      <div className="flex whitespace-nowrap min-w-full">
        {categories.map((cat, index) => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className={`
              px-8 py-4 font-mono text-sm uppercase tracking-widest border-r border-black transition-colors
              ${activeCategory === cat 
                ? 'bg-black text-white' 
                : 'bg-white text-black hover:bg-gray-100'}
            `}
          >
            {cat}
          </button>
        ))}
        {/* Spacer biar border kanan terakhir keliatan */}
        <div className="flex-grow border-r border-black bg-gray-50"></div>
      </div>
    </div>
    )
}

export default CategoryBar;