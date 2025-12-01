import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white border-t-2 border-black font-mono text-xs">
      <div className="w-full grid grid-cols-1 md:grid-cols-4">

        {/* KOLOM 1 */}
        <div className="p-8 border-b md:border-b-0 md:border-r border-gray-800">
          <h3 className="font-bold mb-4 uppercase tracking-widest text-gray-500">
            Alamat
          </h3>
          <p className="leading-relaxed">
            Jl. Kenangan Mantan No. 666<br />
            Jakarta Selatan, 12345<br />
            Indonesia
          </p>
        </div>

        {/* KOLOM 2 */}
        <div className="p-8 border-b md:border-b-0 md:border-r border-gray-800">
          <h3 className="font-bold mb-4 uppercase tracking-widest text-gray-500">
            Kontak
          </h3>
          <p className="leading-relaxed">
            WhatsApp: +62 812-3456-7890<br />
            Email: help@BASTHATAN.com<br />
            Line: @BASTHATAN
          </p>
        </div>

        {/* KOLOM 3 */}
        <div className="p-8 border-b md:border-b-0 md:border-r border-gray-800">
          <h3 className="font-bold mb-4 uppercase tracking-widest text-gray-500">
            Legal
          </h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li>
              <a href="#" className="hover:underline">Terms of Service</a>
            </li>
            <li><a href="#" className="hover:underline">Shipping Info</a></li>
          </ul>
        </div>

        {/* KOLOM 4 */}
        <div className="p-8 flex items-center justify-center bg-white text-black">
          <h1 className="text-2xl font-black uppercase tracking-tighter">
            BASTHATAN<span className="text-red-600">.</span>
          </h1>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-gray-800 p-4 text-center uppercase tracking-widest text-[10px] text-gray-500">
        &copy; 2025 BASTHATAN Studio. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
