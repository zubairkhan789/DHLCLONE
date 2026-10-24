import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  User, 
  Mail, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck 
} from 'lucide-react';

export const SignUpPage: React.FC = () => {
  const { loginUser, setCurrentPage, showToast } = useApp();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(true);

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      showToast('Please fill in all required fields.', 'warning');
      return;
    }
    if (!agreed) {
      showToast('Please accept the terms to proceed.', 'warning');
      return;
    }

    loginUser(email.trim(), fullName.trim());
    showToast(`Account created! Welcome to DHL Clone, ${fullName}.`, 'success');
    setCurrentPage('profile');
  };

  return (
    <div className="min-h-screen bg-slate-100 py-16 px-4 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border-t-8 border-[#D40511] p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-block bg-[#FFCC00] px-4 py-1.5 rounded-xs transform -skew-x-12 mb-2">
            <span className="text-3xl font-black italic tracking-tighter text-[#D40511]">
              DHL
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 uppercase">
            Create Shipper Account
          </h1>
          <p className="text-xs text-slate-500">
            Sign up to manage global shipments, access invoices, and post updates.
          </p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-lg text-xs text-black focus:outline-none focus:border-[#D40511]"
                placeholder="e.g. Alex Morgan"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-lg text-xs text-black focus:outline-none focus:border-[#D40511]"
                placeholder="alex@company.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-lg text-xs text-black focus:outline-none focus:border-[#D40511]"
                placeholder="Create a password (min 6 chars)"
                required
              />
            </div>
          </div>

          <label className="flex items-start gap-2 text-xs text-slate-600 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 rounded text-[#D40511] focus:ring-[#D40511]"
            />
            <span>
              I agree to the demo terms of service and acknowledge this is an educational DHL clone by Zubair WebsiteWala.
            </span>
          </label>

          <button
            type="submit"
            className="w-full bg-[#D40511] hover:bg-red-700 text-white font-black text-xs uppercase py-3 rounded-lg transition cursor-pointer flex items-center justify-center gap-2 shadow-md"
          >
            Create My Account
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-100 text-xs text-slate-500">
          Already registered?{' '}
          <button
            onClick={() => setCurrentPage('login')}
            className="text-[#D40511] font-bold hover:underline cursor-pointer"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};
