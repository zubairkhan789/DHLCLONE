import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Lock, 
  Mail, 
  ArrowRight, 
  UserCheck, 
  ShieldCheck, 
  Sparkles,
  Key
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { loginUser, loginAsZubair, setCurrentPage, showToast } = useApp();
  const [email, setEmail] = useState('zubair.websitewala@example.com');
  const [password, setPassword] = useState('demopassword123');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      showToast('Please provide both email and password.', 'warning');
      return;
    }
    if (email.includes('zubair')) {
      loginAsZubair();
    } else {
      loginUser(email);
    }
    setCurrentPage('profile');
  };

  const handleQuickZubairLogin = () => {
    loginAsZubair();
    setCurrentPage('profile');
  };

  return (
    <div className="min-h-screen bg-slate-100 py-16 px-4 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border-t-8 border-[#FFCC00] p-8 space-y-6">
        {/* Logo & Heading */}
        <div className="text-center space-y-2">
          <div className="inline-block bg-[#D40511] px-4 py-1.5 rounded-xs transform -skew-x-12 mb-2">
            <span className="text-3xl font-black italic tracking-tighter text-[#FFCC00]">
              DHL
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 uppercase">
            Log In to Your Account
          </h1>
          <p className="text-xs text-slate-500">
            Access shipment tracking history, waybills, and personal posts.
          </p>
        </div>

        {/* Quick Demo Creator Login Button */}
        <div className="p-3.5 bg-yellow-50 rounded-2xl border border-yellow-300 space-y-2">
          <div className="text-xs font-bold text-yellow-900 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-yellow-600" />
            Fast Demo Login:
          </div>
          <button
            onClick={handleQuickZubairLogin}
            type="button"
            className="w-full bg-[#1A1A1A] hover:bg-black text-[#FFCC00] font-black text-xs uppercase py-2.5 px-4 rounded-xl transition cursor-pointer flex items-center justify-center gap-2 shadow-sm"
          >
            <UserCheck className="w-4 h-4" />
            Log In as Zubair WebsiteWala (Creator)
          </button>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-slate-200 w-full" />
          <span className="bg-white px-3 text-[11px] text-slate-400 uppercase font-bold">
            Or Standard Login
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-lg text-xs text-black focus:outline-none focus:border-[#D40511]"
                placeholder="you@company.com"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-700">Password</label>
              <button
                type="button"
                onClick={() => showToast('Demo password reset link dispatched to email.', 'info')}
                className="text-[11px] text-[#D40511] hover:underline"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-lg text-xs text-black focus:outline-none focus:border-[#D40511]"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#D40511] hover:bg-red-700 text-white font-black text-xs uppercase py-3 rounded-lg transition cursor-pointer flex items-center justify-center gap-2 shadow-md"
          >
            Log In
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="text-center pt-2 border-t border-slate-100 text-xs text-slate-500">
          Don&apos;t have an account yet?{' '}
          <button
            onClick={() => setCurrentPage('signup')}
            className="text-[#D40511] font-bold hover:underline cursor-pointer"
          >
            Register for Free
          </button>
        </div>
      </div>
    </div>
  );
};
