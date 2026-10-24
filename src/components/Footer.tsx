import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Package, 
  ShieldCheck, 
  Globe2, 
  Leaf, 
  Mail, 
  ArrowRight, 
  Heart, 
  MapPin, 
  Phone, 
  ExternalLink 
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentPage, showToast } = useApp();
  const [emailSub, setEmailSub] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailSub.trim() || !emailSub.includes('@')) {
      showToast('Please enter a valid email address.', 'warning');
      return;
    }
    showToast(`Thank you! Demo newsletter subscription registered for ${emailSub}.`, 'success');
    setEmailSub('');
  };

  return (
    <footer className="bg-[#1A1A1A] text-slate-400 text-xs border-t-4 border-[#FFCC00]">
      {/* DHL Yellow Top Stripe with quick highlights */}
      <div className="bg-[#FFCC00] text-black py-4 px-4 font-sans">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-[#D40511] text-white p-2 rounded-md">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-black text-sm uppercase tracking-wider text-black">
                Mission 2050: Zero Emissions
              </div>
              <div className="text-xs text-slate-900 font-medium">
                Pioneering sustainable green logistics with alternative fuels & electric fleets.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setCurrentPage('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-[#D40511] hover:bg-red-700 text-white font-bold px-4 py-2 rounded text-xs transition cursor-pointer shadow-sm flex items-center gap-1.5"
            >
              Explore Green Solutions
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand & Project Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-[#D40511] px-3 py-1 rounded-xs transform -skew-x-12">
                <span className="text-2xl font-black italic tracking-tighter text-[#FFCC00]">
                  DHL
                </span>
              </div>
              <span className="font-bold text-white text-sm tracking-wide">
                Excellence. Simply Delivered.
              </span>
            </div>

            <p className="text-xs leading-relaxed text-slate-400 max-w-sm">
              Functional logistics and courier platform simulation built for educational and demonstration purposes. Inspired by DHL&apos;s global operations, parcel management, and tracking architecture.
            </p>

            <div className="bg-neutral-900 p-3.5 rounded-lg border border-neutral-800 space-y-1.5">
              <div className="text-[11px] font-bold text-yellow-400 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                Project Creator Details
              </div>
              <div className="text-white font-semibold text-xs">
                Built by Zubair WebsiteWala
              </div>
              <div className="text-[11px] text-slate-400">
                Showcasing responsive full-stack interfaces, state persistence, dynamic tracking simulations, and community blogging.
              </div>
            </div>
          </div>

          {/* Quick Links / Tracking */}
          <div className="space-y-3">
            <div className="text-white font-bold text-sm uppercase tracking-wider border-b border-neutral-800 pb-2">
              Shipping & Tracking
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => { setCurrentPage('tracking'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#FFCC00] transition cursor-pointer"
                >
                  Track Any Shipment
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setCurrentPage('ship-now'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#FFCC00] transition cursor-pointer"
                >
                  Book a New Shipment
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setCurrentPage('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#FFCC00] transition cursor-pointer"
                >
                  DHL Express Worldwide
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setCurrentPage('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#FFCC00] transition cursor-pointer"
                >
                  Air & Ocean Freight
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setCurrentPage('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#FFCC00] transition cursor-pointer"
                >
                  Find a ServicePoint
                </button>
              </li>
            </ul>
          </div>

          {/* Business & Innovation */}
          <div className="space-y-3">
            <div className="text-white font-bold text-sm uppercase tracking-wider border-b border-neutral-800 pb-2">
              Insights & Updates
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => { setCurrentPage('news'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#FFCC00] transition cursor-pointer"
                >
                  Latest News & Articles
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setCurrentPage('news'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#FFCC00] transition cursor-pointer"
                >
                  Zubair&apos;s Project Posts
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setCurrentPage('news'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#FFCC00] transition cursor-pointer"
                >
                  Sustainability Reports
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setCurrentPage('news'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#FFCC00] transition cursor-pointer"
                >
                  Warehouse Robotics & AI
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setCurrentPage('admin'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#FFCC00] transition cursor-pointer text-yellow-400"
                >
                  Logistics Admin Hub
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Form */}
          <div className="space-y-3">
            <div className="text-white font-bold text-sm uppercase tracking-wider border-b border-neutral-800 pb-2">
              Logistics Newsletter
            </div>
            <p className="text-[11px] text-slate-400">
              Receive demo shipping updates, industry trends, and project release notes.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your work email..."
                  value={emailSub}
                  onChange={(e) => setEmailSub(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700 text-white text-xs px-3 py-2 rounded focus:outline-none focus:border-[#FFCC00]"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#D40511] hover:bg-red-700 text-white font-bold py-2 rounded text-xs transition cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Legal & Educational Disclaimer Notice */}
        <div className="mt-12 pt-8 border-t border-neutral-800 space-y-4">
          <div className="bg-neutral-900/80 p-4 rounded-lg border border-neutral-800 text-[11px] text-slate-400 leading-relaxed">
            <strong className="text-yellow-400">DISCLAIMER:</strong> This website is an educational clone simulation and portfolio project engineered by <strong>Zubair WebsiteWala</strong>. It is not affiliated with, endorsed by, or representing Deutsche Post AG, DHL Express, or their subsidiaries. All trademarks, logos, and brand names are the property of their respective owners. No actual packages will be transported or billed through this demonstration system.
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 text-[11px] text-slate-500">
            <div className="flex flex-wrap items-center gap-4">
              <span className="hover:text-slate-300 cursor-pointer">Terms of Use</span>
              <span>•</span>
              <span className="hover:text-slate-300 cursor-pointer">Legal Notice</span>
              <span>•</span>
              <span className="hover:text-slate-300 cursor-pointer">Privacy Statement</span>
              <span>•</span>
              <span className="hover:text-slate-300 cursor-pointer">Cookie Preferences</span>
              <span>•</span>
              <span className="hover:text-slate-300 cursor-pointer">Accessibility</span>
            </div>

            <div>
              © 2026 DHL Clone Demo • Designed & Developed by <strong>Zubair WebsiteWala</strong>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
