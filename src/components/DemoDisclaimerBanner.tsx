import React from 'react';
import { useApp } from '../context/AppContext';
import { AlertCircle, RefreshCw, UserCheck, Shield } from 'lucide-react';

export const DemoDisclaimerBanner: React.FC = () => {
  const { currentUser, loginAsZubair, resetDemoData, setCurrentPage } = useApp();

  return (
    <div className="bg-[#D40511] text-white text-xs py-1.5 px-4 font-medium border-b border-red-700">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 bg-white/20 text-white px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[10px]">
            <Shield className="w-3 h-3" />
            Educational Clone
          </span>
          <span className="hidden sm:inline">
            This is an unofficial educational logistics demo created by <strong>Zubair WebsiteWala</strong>.
          </span>
          <span className="sm:hidden">
            Unofficial Demo by <strong>Zubair WebsiteWala</strong>
          </span>
        </div>

        <div className="flex items-center gap-3">
          {(!currentUser || currentUser.name !== 'Zubair WebsiteWala') ? (
            <button
              onClick={loginAsZubair}
              className="inline-flex items-center gap-1 bg-[#FFCC00] text-black font-semibold px-2 py-0.5 rounded hover:bg-yellow-400 transition cursor-pointer"
              title="Quickly switch to Zubair WebsiteWala profile"
            >
              <UserCheck className="w-3 h-3" />
              Switch to Zubair Profile
            </button>
          ) : (
            <button
              onClick={() => setCurrentPage('profile')}
              className="inline-flex items-center gap-1 bg-white/10 hover:bg-white/20 text-white px-2 py-0.5 rounded transition cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
              Active Profile: Zubair WebsiteWala
            </button>
          )}

          <button
            onClick={() => {
              if (window.confirm('Reset all demo shipments and posts to default initial data?')) {
                resetDemoData();
              }
            }}
            className="inline-flex items-center gap-1 text-white/80 hover:text-white underline cursor-pointer text-[11px]"
            title="Reset data"
          >
            <RefreshCw className="w-2.5 h-2.5" />
            Reset Demo Data
          </button>
        </div>
      </div>
    </div>
  );
};
