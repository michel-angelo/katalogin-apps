import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Biar alert hapusnya keren

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Ambil data pas halaman dibuka
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data } = await axios.get("/api/products");
    setProducts(data);
  };

  // Logic Hapus Produk
  const handleDelete = async (id) => {
    // Tanya dulu pake SweetAlert
    const result = await Swal.fire({
      title: "YAKIN MAU HAPUS?",
      text: "Barang yang dihapus gak bisa balik lagi bro!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000",
      cancelButtonColor: "#d33",
      confirmButtonText: "YA, MUSNAHKAN!",
      cancelButtonText: "BATAL",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`/api/products/${id}`);
        Swal.fire("Terhapus!", "Produk sudah hilang.", "success");
        fetchProducts(); // Refresh tabel biar data ilang
      } catch (error) {
        Swal.fire("Gagal", "Ada error pas ngehapus.", "error");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-white p-8 font-sans text-black">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-10 border-b border-black pb-6">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter">
              Dashboard Admin
            </h1>
            <p className="text-sm text-gray-500 uppercase tracking-widest mt-1">
              Total Produk: {products.length} Item
            </p>
          </div>

          <div className="flex gap-4">
            <Link
              to="/admin/add"
              className="bg-black text-white px-6 py-3 font-bold uppercase tracking-widest hover:bg-gray-800 transition"
            >
              + Tambah Produk
            </Link>
            <button
              onClick={handleLogout}
              className="border border-red-600 text-red-600 px-6 py-3 font-bold uppercase tracking-widest hover:bg-red-50 transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* TABEL PRODUK (BRUTALIST STYLE) */}
        <div className="overflow-x-auto border border-black">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black text-white uppercase text-xs tracking-widest">
                <th className="p-4 border-r border-gray-700">Foto</th>
                <th className="p-4 border-r border-gray-700">Nama Produk</th>
                <th className="p-4 border-r border-gray-700">Harga</th>
                <th className="p-4 border-r border-gray-700">Stok</th>
                <th className="p-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="p-4 border-r border-gray-200 w-24">
                    <img
                      src={product.images[0]}
                      alt=""
                      className="w-16 h-16 object-cover border border-gray-300"
                    />
                  </td>
                  <td className="p-4 border-r border-gray-200 font-bold uppercase text-sm">
                    {product.name}
                    <br />
                    <span className="text-xs text-gray-400 font-normal">
                      {product.category}
                    </span>
                  </td>
                  <td className="p-4 border-r border-gray-200 text-sm">
                    Rp {product.price.toLocaleString("id-ID")}
                  </td>
                  <td className="p-4 border-r border-gray-200 text-sm">
                    {product.stock > 0 ? (
                      <span className="bg-green-100 text-green-800 px-2 py-1 text-xs font-bold rounded-none">
                        {product.stock} pcs
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-800 px-2 py-1 text-xs font-bold rounded-none">
                        HABIS
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-center flex justify-center gap-4">
                    {/* TOMBOL EDIT */}
                    <Link
                      to={`/admin/edit/${product._id}`}
                      className="text-blue-600 hover:text-blue-900 font-bold text-xs uppercase underline"
                    >
                      Edit
                    </Link>

                    {/* TOMBOL HAPUS */}
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-red-600 hover:text-red-900 font-bold text-xs uppercase underline"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
