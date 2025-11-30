import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Tembak API Login
      const { data } = await axios.post("/api/users/login", {
        email,
        password,
      });

      // Simpen data user & token di LocalStorage (Browser)
      localStorage.setItem("userInfo", JSON.stringify(data));

      alert(`Welcome back, Boss ${data.name}!`);
      navigate("/admin");
    } catch (error) {
      alert("Login Gagal: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans text-black">
      {/* BAGIAN KIRI: ARTWORK / FOTO TOKO */}
      <div className="hidden lg:flex w-1/2 bg-black items-center justify-center p-12">
        <div className="text-white">
          <h1 className="text-6xl font-black uppercase tracking-tighter mb-4">
            Katalogin<span className="text-red-600">.</span>
          </h1>
          <p className="tracking-widest uppercase text-sm opacity-70">
            Admin Area Only. Trespassers will be stylishly prosecuted.
          </p>
        </div>
      </div>

      {/* BAGIAN KANAN: FORM LOGIN */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-black uppercase tracking-widest mb-8 border-b border-black pb-4">
            Masuk
          </h2>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-black p-4 text-sm focus:outline-none focus:bg-gray-50 rounded-none"
                placeholder="admin@katalogin.com"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-black p-4 text-sm focus:outline-none focus:bg-gray-50 rounded-none"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-4 font-black uppercase tracking-widest hover:bg-gray-800 transition-colors"
            >
              Login System
            </button>
          </form>

          <p className="mt-8 text-xs text-gray-400 text-center uppercase tracking-widest">
            &copy; 2025 Katalogin Studio
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
