import React from 'react';
import { useApp } from '../context/AppContext';
import { Package, Search, Home, ArrowRight, AlertTriangle } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const { setCurrentPage } = useApp();

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border-t-8 border-[#D40511] p-8 text-center space-y-6">
        <div className="w-16 h-16 bg-red-100 text-[#D40511] rounded-2xl flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <div className="text-4xl font-black text-slate-900 tracking-tighter">404</div>
          <h1 className="text-xl font-black uppercase text-slate-900">
            Destination Not Found
          </h1>
          <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
            The page or route you are looking for has been relocated or does not exist in this demo.
          </p>
        </div>

        <div className="space-y-2 pt-2">
          <button
            onClick={() => setCurrentPage('home')}
            className="w-full bg-[#FFCC00] hover:bg-yellow-400 text-black font-black text-xs uppercase py-3 rounded-lg transition cursor-pointer flex items-center justify-center gap-2 shadow-sm"
          >
            <Home className="w-4 h-4" />
            Return to Homepage
          </button>
          <button
            onClick={() => setCurrentPage('tracking')}
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-2.5 rounded-lg transition cursor-pointer flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            Track a Shipment
          </button>
        </div>
      </div>
    </div>
  );
};
