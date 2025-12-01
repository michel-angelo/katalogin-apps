import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

// KOMPONEN GARIS POLISI (TETEP SAMA)
const PoliceLine = ({ text, className, direction = 'normal' }) => {
  const content = (
    <div className={`flex whitespace-nowrap font-mono font-black text-xl uppercase tracking-widest text-black ${direction === 'reverse' ? 'animate-marqueeReverse' : 'animate-marquee'}`}>
      <span className="mx-4">{text}</span>
      <span className="mx-4">{text}</span>
      <span className="mx-4">{text}</span>
      <span className="mx-4">{text}</span>
      <span className="mx-4">{text}</span>
      <span className="mx-4">{text}</span>
    </div>
  );

  return (
    <div className={`absolute left-[-50%] right-[-50%] py-3 bg-[#CCFF00] border-y-2 border-black flex overflow-hidden opacity-80 pointer-events-none select-none ${className}`}>
      {content}
      {content}
    </div>
  );
};

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post('/api/users/login', { email, password });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/admin');
    } catch (error) {
      setLoading(false);
      alert('ACCESS DENIED: ' + (error.response?.data?.message || 'Invalid Credentials'));
    }
  };

  return (
    <div className="relative min-h-screen bg-[#111] flex items-center justify-center overflow-hidden font-sans p-4">
      
      {/* === BACKGROUND CHAOS === */}
      <PoliceLine 
        text="/// RESTRICTED AREA /// AUTHORIZED PERSONNEL ONLY /// DO NOT CROSS" 
        className="top-[15%] rotate-6 z-0"
      />
      <PoliceLine 
        text="WARNING /// SYSTEM LOCKED /// SECURITY CLEARANCE REQUIRED" 
        className="bottom-[25%] -rotate-12 z-0 bg-white" 
      />
      <PoliceLine 
        text="/// KATALOGIN INTERNAL SYSTEM ///" 
        className="bottom-10 rotate-2 opacity-50 text-xs py-1"
      />

      {/* === LOGIN BOX (DI-RESIZE BIAR RAMPING DI HP) === */}
      {/* UBAHAN 1: w-[90%] biar ada sisa kiri kanan, max-w-sm biar gak kegedean */}
      <div className="relative z-10 w-[90%] max-w-sm bg-[#f0f0f0] border-4 border-red-600 shadow-[8px_8px_0px_0px_#000]">
        
        {/* HEADER */}
        <div className="bg-red-600 text-white p-4 border-b-4 border-black flex items-center justify-between">
            <div className="flex items-center gap-2">
                <span className="animate-pulse text-xl md:text-2xl">⚠️</span>
                {/* Font judul agak dikecilin dikit di HP */}
                <h2 className="font-display text-xl md:text-2xl uppercase leading-none">
                    Security<br/>Check.
                </h2>
            </div>
            <div className="text-right font-mono text-[8px] md:text-[10px] uppercase leading-tight opacity-80">
                IP: {Math.floor(Math.random() * 255)}.XXX.XXX<br/>
                Loc: UNKNOWN
            </div>
        </div>

        {/* FORM AREA */}
        {/* UBAHAN 2: Padding dikurangin jadi p-6 (sebelumnya p-8) */}
        <div className="p-6">
            <p className="font-mono text-xs text-red-600 mb-4 uppercase tracking-widest border-b border-red-200 pb-2">
                Identify Yourself
            </p>

            <form onSubmit={handleLogin} className="space-y-4 md:space-y-6">
                <div>
                    <label className="block font-mono text-[10px] md:text-xs font-bold uppercase mb-1">Agent Email</label>
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white border-2 border-black p-2 md:p-3 font-mono text-sm focus:outline-none focus:bg-[#CCFF00]/20 focus:border-red-600 rounded-none transition-colors"
                        placeholder="admin@katalogin.com"
                        required
                    />
                </div>

                <div>
                    <label className="block font-mono text-[10px] md:text-xs font-bold uppercase mb-1">Passcode</label>
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-white border-2 border-black p-2 md:p-3 font-mono text-sm focus:outline-none focus:bg-[#CCFF00]/20 focus:border-red-600 rounded-none transition-colors"
                        placeholder="••••••••"
                        required
                    />
                </div>

                <button 
                    type="submit"
                    disabled={loading}
                    className="w-full bg-black text-white border-2 border-transparent py-3 md:py-4 font-display text-lg md:text-xl uppercase tracking-widest hover:bg-red-600 hover:text-white hover:border-black transition-all active:translate-y-1"
                >
                    {loading ? "VERIFYING..." : "UNLOCK SYSTEM"}
                </button>
            </form>

            <div className="mt-4 md:mt-6 text-center">
                <Link to="/" className="font-mono text-[10px] md:text-xs text-gray-500 hover:text-black underline uppercase">
                    &lt; Abort Mission / Back to Home
                </Link>
            </div>
        </div>

        {/* FOOTER DECORATION */}
        <div className="bg-black p-2 text-center">
            <div className="h-1 w-full bg-stripes-white opacity-20"></div>
            <p className="font-mono text-[8px] text-gray-500 uppercase mt-1">
                Unauthorized access is a federal offense.
            </p>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;