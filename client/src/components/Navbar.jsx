import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {FaSearch, FaUser, FaShoppingBag} from 'react-icons/fa';

const Navbar = () => {
  const [keyword, setKeyword] = useState ('');
  const navigate = useNavigate ();

  const handleSearch = e => {
    e.preventDefault ();
    if (keyword.trim ()) {
      navigate (`/?keyword=${keyword}`);
    } else {
      navigate ('/');
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white w-full font-sans text-black">
      
      {/* 1. RUNNING TEXT (MARQUEE) - BRUTALIST VIBE */}
      <div className="bg-black text-white py-2 overflow-hidden border-b border-black">
        <div className="animate-marquee whitespace-nowrap font-mono text-xs tracking-widest uppercase">
          <span className="mx-4">⚡ FLAT SHIPPING SELURUH INDONESIA</span>
          <span className="mx-4">///</span>
          <span className="mx-4">NEW DROP EVERY FRIDAY 20:00 WIB</span>
          <span className="mx-4">///</span>
          <span className="mx-4">AUTHENTIC VINTAGE ONLY</span>
          <span className="mx-4">///</span>
          <span className="mx-4">NO REFUND NO RETURN</span>
        </div>
      </div>

      {/* 2. MAIN NAVBAR GRID */}
      <div className="flex flex-col md:flex-row border-b-2 border-black">
        
        {/* LOGO SECTION */}
        <div className="p-4 md:w-1/4 border-b md:border-b-0 md:border-r border-black flex items-center justify-between">
          <Link to="/" className="text-2xl font-black tracking-tighter uppercase hover:text-gray-600 transition">
            BASTHATAN<span className="text-red-600">.</span>
          </Link>
          {/* Mobile Menu Button (Nanti aja kalo sempet) */}
        </div>

        {/* SEARCH BAR (Tengah) */}
        <div className="p-0 md:w-2/4 border-b md:border-b-0 md:border-r border-black relative">
          <form onSubmit={handleSearch} className="h-full w-full flex">
            <input 
              type="text"
              placeholder="CARI BARANG GHOIB..."
              className="w-full h-full p-4 pl-12 focus:outline-none font-mono uppercase placeholder:text-gray-400"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button type="submit" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
               <FaSearch />
            </button>
          </form>
        </div>

        {/* MENU KANAN */}
        <div className="md:w-1/4 flex">
          {/* Tombol Login/Admin */}
          <Link 
            to="/login" 
            className="flex-1 flex items-center justify-center p-4 border-r border-black hover:bg-black hover:text-white transition cursor-pointer"
            title="Admin Area"
          >
            <FaUser className="text-lg" />
          </Link>
          
          {/* Tombol Cart (Pajangan dulu) */}
          <div className="flex-1 flex items-center justify-center p-4 hover:bg-black hover:text-white transition cursor-pointer">
            <FaShoppingBag className="text-lg" />
            <span className="ml-2 font-mono font-bold text-xs">0</span>
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;