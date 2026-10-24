import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Package, 
  Search, 
  Send, 
  Menu, 
  X, 
  Bell, 
  User, 
  LogOut, 
  Settings, 
  ShieldCheck, 
  LayoutDashboard, 
  FileText, 
  HelpCircle, 
  Globe, 
  ChevronDown,
  CheckCircle2,
  PhoneCall,
  ExternalLink
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    currentUser, 
    currentPage, 
    setCurrentPage, 
    notifications, 
    markNotificationRead, 
    markAllNotificationsRead, 
    logoutUser, 
    loginAsZubair,
    setActiveTrackingId 
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [quickTrackInput, setQuickTrackInput] = useState('');

  const unreadNotifs = notifications.filter((n) => !n.read);

  const handleNav = (page: string) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    setNotifDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickTrackInput.trim()) return;
    setActiveTrackingId(quickTrackInput.trim());
    setCurrentPage('tracking');
    setQuickTrackInput('');
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-md">
      {/* Top Utility Bar */}
      <div className="bg-[#1A1A1A] text-slate-300 text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-400">
              <Globe className="w-3.5 h-3.5 text-[#FFCC00]" />
              Serving 220+ Countries & Territories
            </span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <PhoneCall className="w-3.5 h-3.5 text-[#FFCC00]" />
              Customer Support: 1-800-225-5345
            </span>
            <span className="text-yellow-400 font-medium">
              Demo Project by Zubair WebsiteWala
            </span>
          </div>

          <div className="flex items-center gap-5">
            <button
              onClick={() => handleNav('services')}
              className="hover:text-white transition cursor-pointer"
            >
              Enterprise Solutions
            </button>
            <button
              onClick={() => handleNav('contact')}
              className="hover:text-white transition cursor-pointer flex items-center gap-1"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              Help & FAQ
            </button>
            <button
              onClick={() => handleNav('admin')}
              className="hover:text-white transition cursor-pointer flex items-center gap-1 text-yellow-400 font-semibold"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              Admin Hub
            </button>
          </div>
        </div>
      </div>

      {/* Main DHL Header */}
      <div className="bg-[#FFCC00] border-b-4 border-[#D40511] px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleNav('home')}
              className="flex items-center gap-2 group cursor-pointer text-left"
            >
              {/* DHL Stylized Logo */}
              <div className="relative bg-[#D40511] px-4 py-1.5 rounded-xs transform -skew-x-12 shadow-md group-hover:scale-105 transition">
                <span className="text-3xl sm:text-4xl font-black italic tracking-tighter text-[#FFCC00] inline-block font-sans select-none">
                  DHL
                </span>
              </div>
              <div className="hidden lg:flex flex-col">
                <span className="text-xs font-black tracking-widest text-black uppercase font-sans">
                  Express & Logistics
                </span>
                <span className="text-[10px] text-slate-800 font-medium tracking-tight">
                  Excellence. Simply Delivered.
                </span>
              </div>
            </button>
          </div>

          {/* Quick Tracking Search in Bar (desktop) */}
          <form
            onSubmit={handleQuickTrackSubmit}
            className="hidden md:flex items-center max-w-xs w-full bg-white rounded-full shadow-inner border border-yellow-600/40 px-3 py-1.5 focus-within:ring-2 focus-within:ring-[#D40511]"
          >
            <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Track # (e.g. DHL-849201938-US)"
              value={quickTrackInput}
              onChange={(e) => setQuickTrackInput(e.target.value)}
              className="w-full text-xs text-black placeholder:text-slate-400 focus:outline-none"
            />
            <button
              type="submit"
              className="ml-1 bg-[#D40511] hover:bg-red-700 text-white text-[11px] font-bold px-2.5 py-1 rounded-full transition cursor-pointer shrink-0"
            >
              Track
            </button>
          </form>

          {/* User & Actions Area */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setNotifDropdownOpen(!notifDropdownOpen);
                  setUserDropdownOpen(false);
                }}
                className="relative p-2 rounded-full bg-white/60 hover:bg-white text-slate-800 transition cursor-pointer"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifs.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#D40511] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                    {unreadNotifs.length}
                  </span>
                )}
              </button>

              {/* Notification Popup */}
              {notifDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900">Notifications</span>
                    {unreadNotifs.length > 0 && (
                      <button
                        onClick={markAllNotificationsRead}
                        className="text-xs text-[#D40511] hover:underline font-semibold cursor-pointer"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-xs text-slate-500">No notifications</div>
                    ) : (
                      notifications.slice(0, 6).map((n) => (
                        <div
                          key={n.id}
                          onClick={() => {
                            markNotificationRead(n.id);
                            if (n.trackingNumber) {
                              setActiveTrackingId(n.trackingNumber);
                              handleNav('tracking');
                            } else if (n.postId) {
                              handleNav('news');
                            }
                          }}
                          className={`p-3 hover:bg-slate-50 cursor-pointer transition text-xs flex items-start gap-2.5 ${
                            !n.read ? 'bg-amber-50/50' : ''
                          }`}
                        >
                          <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${!n.read ? 'bg-[#D40511]' : 'bg-slate-300'}`} />
                          <div className="flex-1">
                            <div className="font-semibold text-slate-900">{n.title}</div>
                            <div className="text-slate-600 mt-0.5 leading-relaxed">{n.message}</div>
                            <div className="text-[10px] text-slate-400 mt-1">
                              {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile / Login */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => {
                    setUserDropdownOpen(!userDropdownOpen);
                    setNotifDropdownOpen(false);
                  }}
                  className="flex items-center gap-2 bg-white/80 hover:bg-white pl-2 pr-3 py-1 rounded-full border border-yellow-600/30 transition cursor-pointer"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-full object-cover border-2 border-[#D40511]"
                  />
                  <div className="hidden sm:block text-left">
                    <div className="text-xs font-bold text-slate-900 leading-none truncate max-w-[110px]">
                      {currentUser.name}
                    </div>
                    <div className="text-[10px] text-slate-500 leading-none mt-0.5">
                      {currentUser.role.includes('Creator') ? 'Creator' : 'Member'}
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-600" />
                </button>

                {/* User Dropdown */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <div className="font-bold text-sm text-slate-900">{currentUser.name}</div>
                      <div className="text-xs text-slate-500 truncate">{currentUser.email}</div>
                      <span className="inline-block mt-1 bg-yellow-100 text-yellow-800 text-[10px] font-bold px-2 py-0.5 rounded">
                        {currentUser.role}
                      </span>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => handleNav('profile')}
                        className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 flex items-center gap-2.5 cursor-pointer"
                      >
                        <User className="w-4 h-4 text-slate-500" />
                        My Profile & Shipments
                      </button>
                      <button
                        onClick={() => handleNav('edit-profile')}
                        className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 flex items-center gap-2.5 cursor-pointer"
                      >
                        <FileText className="w-4 h-4 text-slate-500" />
                        Edit Profile
                      </button>
                      <button
                        onClick={() => handleNav('settings')}
                        className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 flex items-center gap-2.5 cursor-pointer"
                      >
                        <Settings className="w-4 h-4 text-slate-500" />
                        Account Settings
                      </button>
                      <button
                        onClick={() => handleNav('admin')}
                        className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 flex items-center gap-2.5 cursor-pointer"
                      >
                        <LayoutDashboard className="w-4 h-4 text-[#D40511]" />
                        Logistics Admin Panel
                      </button>
                    </div>

                    <div className="border-t border-slate-100 pt-1">
                      <button
                        onClick={() => {
                          logoutUser();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 flex items-center gap-2.5 cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNav('login')}
                  className="bg-white hover:bg-slate-100 text-black text-xs font-bold px-3 py-1.5 rounded-md transition shadow-xs cursor-pointer"
                >
                  Log In
                </button>
                <button
                  onClick={() => handleNav('signup')}
                  className="bg-[#D40511] hover:bg-red-700 text-white text-xs font-bold px-3 py-1.5 rounded-md transition shadow-xs cursor-pointer hidden sm:block"
                >
                  Sign Up
                </button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-black/10 hover:bg-black/20 text-black md:hidden cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Links Bar */}
      <nav className="bg-[#1A1A1A] text-white px-4 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <ul className="hidden md:flex items-center space-x-1 lg:space-x-2 text-xs font-bold tracking-wide uppercase">
            {[
              { id: 'home', label: 'Home' },
              { id: 'tracking', label: 'Track Shipment' },
              { id: 'ship-now', label: 'Ship Now' },
              { id: 'services', label: 'Shipping Services' },
              { id: 'news', label: 'News & Updates' },
              { id: 'profile', label: 'My Profile' },
              { id: 'admin', label: 'Admin Hub' },
              { id: 'contact', label: 'Contact Us' },
            ].map((item) => {
              const isActive = currentPage === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleNav(item.id)}
                    className={`px-3 py-3 inline-block transition cursor-pointer relative ${
                      isActive
                        ? 'text-[#FFCC00] font-black'
                        : 'text-slate-300 hover:text-white hover:bg-neutral-800'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#D40511]" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="hidden md:flex items-center gap-2 py-2">
            <button
              onClick={() => handleNav('ship-now')}
              className="bg-[#D40511] hover:bg-red-700 text-white text-xs font-black px-4 py-2 rounded uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5 shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              Book Shipment
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-neutral-900 text-white border-b border-neutral-700 px-4 py-4 space-y-4 animate-in slide-in-from-top-4 duration-200">
          {/* Mobile Quick Track */}
          <form onSubmit={handleQuickTrackSubmit} className="flex items-center bg-white rounded-lg p-1">
            <input
              type="text"
              placeholder="Enter Tracking Number..."
              value={quickTrackInput}
              onChange={(e) => setQuickTrackInput(e.target.value)}
              className="w-full text-xs text-black px-2 py-1.5 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-[#D40511] text-white text-xs font-bold px-3 py-1.5 rounded cursor-pointer"
            >
              Track
            </button>
          </form>

          {/* Nav List */}
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold uppercase tracking-wider">
            {[
              { id: 'home', label: 'Home' },
              { id: 'tracking', label: 'Track Shipment' },
              { id: 'ship-now', label: 'Ship Now' },
              { id: 'services', label: 'Shipping Services' },
              { id: 'news', label: 'News & Updates' },
              { id: 'profile', label: 'My Profile' },
              { id: 'admin', label: 'Admin Hub' },
              { id: 'contact', label: 'Contact Us' },
              { id: 'settings', label: 'Settings' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`text-left p-2.5 rounded transition ${
                  currentPage === item.id
                    ? 'bg-[#D40511] text-white font-bold'
                    : 'bg-neutral-800 text-slate-300 hover:bg-neutral-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Quick Demo Switch */}
          <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-xs">
            <button
              onClick={() => {
                loginAsZubair();
                setMobileMenuOpen(false);
              }}
              className="text-yellow-400 hover:underline font-bold"
            >
              Load Zubair Profile
            </button>
            {currentUser && (
              <button
                onClick={() => {
                  logoutUser();
                  setMobileMenuOpen(false);
                }}
                className="text-red-400 hover:underline"
              >
                Log Out
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
