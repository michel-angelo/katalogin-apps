import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';

// Kita ganti Layout biasa jadi div biasa dulu,
// atau lo bisa bikin "AdminLayout" khusus nanti.
// Di sini kita pake style raw aja.

const AdminDashboard = () => {
  const [products, setProducts] = useState ([]);
  const navigate = useNavigate ();

  useEffect (() => {
    fetchProducts ();
  }, []);

  const fetchProducts = async () => {
    try {
      const {data} = await axios.get ('/api/products');
      setProducts (data);
    } catch (error) {
      console.error (error);
    }
  };

  const handleDelete = async id => {
    // Style Alert Brutalist dikit (pake confirmColor hitam)
    const result = await Swal.fire ({
      title: 'DELETE ITEM?',
      text: 'Data akan dihapus permanen dari database.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#000',
      cancelButtonColor: '#ff0000',
      confirmButtonText: 'YES, DELETE',
      cancelButtonText: 'CANCEL',
      background: '#fff',
      customClass: {
        popup: 'border-2 border-black rounded-none font-mono',
        title: 'uppercase font-black',
        confirmButton: 'rounded-none font-mono uppercase',
        cancelButton: 'rounded-none font-mono uppercase',
      },
    });

    if (result.isConfirmed) {
      try {
        await axios.delete (`/api/products/${id}`);
        Swal.fire ({
          title: 'DELETED',
          icon: 'success',
          confirmButtonColor: '#000',
          customClass: {popup: 'border-2 border-black rounded-none font-mono'},
        });
        fetchProducts ();
      } catch (error) {
        alert ('Gagal Hapus');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem ('userInfo');
    navigate ('/login');
  };

  return (
    <div className="min-h-screen bg-[#f0f0f0] font-mono text-black p-4 md:p-12">

      {/* CONTAINER PUTIH KOTAK */}
      <div className="max-w-7xl mx-auto bg-white border-2 border-black shadow-brutal p-6 md:p-10">

        {/* HEADER ADMIN */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b-4 border-black pb-6 gap-4">
          <div>
            <h1 className="font-display text-4xl md:text-5xl uppercase leading-none">
              Control<br />Panel.
            </h1>
            <div className="flex items-center gap-2 mt-2 text-xs uppercase tracking-widest text-gray-500">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              System Online
            </div>
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            <Link
              to="/admin/add"
              className="flex-1 md:flex-none text-center bg-[#CCFF00] border-2 border-black text-black px-6 py-3 font-bold uppercase tracking-widest hover:bg-black hover:text-[#CCFF00] transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            >
              + New Item
            </Link>
            <button
              onClick={handleLogout}
              className="flex-1 md:flex-none bg-red-600 border-2 border-black text-white px-6 py-3 font-bold uppercase tracking-widest hover:bg-red-700 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none"
            >
              Exit
            </button>
          </div>
        </div>

        {/* INVENTORY STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="border-2 border-black p-4 bg-gray-50">
            <p className="text-xs uppercase text-gray-500 mb-1">Total Items</p>
            <p className="text-3xl font-bold">{products.length}</p>
          </div>
          <div className="border-2 border-black p-4 bg-gray-50">
            <p className="text-xs uppercase text-gray-500 mb-1">Total Value</p>
            <p className="text-3xl font-bold">
              {(products.reduce ((acc, p) => acc + p.price, 0) /
                1000000).toFixed (1)}
              M
            </p>
          </div>
        </div>

        {/* TABEL DATA RAW */}
        <div className="overflow-x-auto border-2 border-black">
          <table className="w-full text-left border-collapse">
            <thead className="bg-black text-white text-xs uppercase tracking-widest">
              <tr>
                <th className="p-4 border-r border-gray-700 w-20">Img</th>
                <th className="p-4 border-r border-gray-700">Product Name</th>
                <th className="p-4 border-r border-gray-700">Category</th>
                <th className="p-4 border-r border-gray-700">Price (IDR)</th>
                <th className="p-4 border-r border-gray-700 text-center">
                  Stock
                </th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {products.map ((product, index) => (
                <tr
                  key={product._id}
                  className="border-b border-black hover:bg-[#CCFF00]/10 transition-colors"
                >
                  <td className="p-4 border-r border-black">
                    <img
                      src={product.images[0]}
                      className="w-12 h-12 object-cover border border-black grayscale hover:grayscale-0"
                      alt=""
                    />
                  </td>
                  <td className="p-4 border-r border-black font-bold uppercase">
                    {product.name}
                    <div className="text-[10px] text-gray-500 font-normal mt-1">
                      ID: {product._id.slice (-4)}
                    </div>
                  </td>
                  <td className="p-4 border-r border-black uppercase text-xs">
                    {product.category}
                  </td>
                  <td className="p-4 border-r border-black font-mono">
                    {product.price.toLocaleString ('id-ID')}
                  </td>
                  <td className="p-4 border-r border-black text-center">
                    {product.stock > 0
                      ? <span className="bg-black text-white text-[10px] px-2 py-1 font-bold">
                          {product.stock}
                        </span>
                      : <span className="bg-red-600 text-white text-[10px] px-2 py-1 font-bold">
                          SOLDOUT
                        </span>}
                  </td>
                  <td className="p-4 flex justify-center gap-3">
                    <Link
                      to={`/admin/edit/${product._id}`}
                      className="text-black hover:underline font-bold text-xs uppercase"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete (product._id)}
                      className="text-red-600 hover:bg-red-600 hover:text-white px-1 font-bold text-xs uppercase transition-colors"
                    >
                      Del
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-right text-[10px] uppercase text-gray-400">
          End of Log ///
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
