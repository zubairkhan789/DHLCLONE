import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Search, 
  Package, 
  Truck, 
  Plane, 
  Ship, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  Calculator, 
  MapPin, 
  Send, 
  Headphones, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  FileCheck,
  Building,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { SERVICES_CATALOG, DEMO_FAQS } from '../data/initialData';

export const HomePage: React.FC = () => {
  const { setCurrentPage, setActiveTrackingId, posts, setSelectedPostId, trackShipment, showToast } = useApp();
  const [trackingNumberInput, setTrackingNumberInput] = useState('');
  const [activeTab, setActiveTab] = useState<'track' | 'quote' | 'ship' | 'locations'>('track');

  // Quick rate estimator state
  const [fromCountry, setFromCountry] = useState('United States');
  const [toCountry, setToCountry] = useState('Germany');
  const [calcWeight, setCalcWeight] = useState(2.5);
  const [estimatedCost, setEstimatedCost] = useState<number | null>(null);

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumberInput.trim()) {
      showToast('Please enter a tracking number.', 'warning');
      return;
    }
    setActiveTrackingId(trackingNumberInput.trim());
    setCurrentPage('tracking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickEstimate = (e: React.FormEvent) => {
    e.preventDefault();
    const isDomestic = fromCountry === toCountry;
    const base = isDomestic ? 18.0 : 45.0;
    const weightFee = calcWeight * (isDomestic ? 4.5 : 12.0);
    const total = Math.round(base + weightFee);
    setEstimatedCost(total);
  };

  // Get latest 3 posts
  const recentPosts = posts.slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-neutral-900 text-white overflow-hidden">
        {/* Background Graphic with DHL Yellow & Red Accents */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity pointer-events-none"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2000&q=80')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />

        {/* Speed lines decorative element */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 overflow-hidden pointer-events-none hidden lg:block">
          <div className="w-[120%] h-full bg-[#FFCC00] transform skew-x-[-30deg] translate-x-20" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#FFCC00] text-black px-3 py-1 rounded-sm text-xs font-black uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#D40511] animate-ping" />
              Global Express & Logistics Leader
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase font-sans leading-none">
              Excellence. <br />
              <span className="text-[#FFCC00]">Simply Delivered.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
              Connect your packages to over 220 countries and territories with rapid customs clearance, guaranteed express delivery, and transparent real-time tracking.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  setCurrentPage('ship-now');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-[#D40511] hover:bg-red-700 text-white text-sm font-black px-6 py-3.5 rounded uppercase tracking-wider transition cursor-pointer shadow-lg flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Ship Now
              </button>
              <button
                onClick={() => {
                  setCurrentPage('tracking');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-[#FFCC00] hover:bg-yellow-400 text-black text-sm font-black px-6 py-3.5 rounded uppercase tracking-wider transition cursor-pointer shadow-lg flex items-center gap-2"
              >
                <Search className="w-4 h-4" />
                Track a Shipment
              </button>
            </div>
          </div>

          {/* Floating Interactive Action Card on Hero */}
          <div className="mt-12 bg-white rounded-xl shadow-2xl border-t-4 border-[#FFCC00] overflow-hidden text-slate-800">
            {/* Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 bg-slate-100 border-b border-slate-200 text-xs font-bold uppercase tracking-wider">
              <button
                onClick={() => setActiveTab('track')}
                className={`py-3.5 px-4 flex items-center justify-center gap-2 transition cursor-pointer ${
                  activeTab === 'track'
                    ? 'bg-white text-[#D40511] border-b-2 border-[#D40511]'
                    : 'text-slate-600 hover:text-black hover:bg-slate-200/60'
                }`}
              >
                <Search className="w-4 h-4" />
                Track Shipment
              </button>
              <button
                onClick={() => setActiveTab('quote')}
                className={`py-3.5 px-4 flex items-center justify-center gap-2 transition cursor-pointer ${
                  activeTab === 'quote'
                    ? 'bg-white text-[#D40511] border-b-2 border-[#D40511]'
                    : 'text-slate-600 hover:text-black hover:bg-slate-200/60'
                }`}
              >
                <Calculator className="w-4 h-4" />
                Get a Quote
              </button>
              <button
                onClick={() => {
                  setCurrentPage('ship-now');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`py-3.5 px-4 flex items-center justify-center gap-2 transition cursor-pointer text-slate-600 hover:text-[#D40511] hover:bg-slate-200/60`}
              >
                <Send className="w-4 h-4" />
                Book Delivery
              </button>
              <button
                onClick={() => {
                  setCurrentPage('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`py-3.5 px-4 flex items-center justify-center gap-2 transition cursor-pointer text-slate-600 hover:text-[#D40511] hover:bg-slate-200/60`}
              >
                <MapPin className="w-4 h-4" />
                Find ServicePoint
              </button>
            </div>

            {/* Tab Contents */}
            <div className="p-6">
              {activeTab === 'track' && (
                <form onSubmit={handleTrackSubmit} className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Search className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Enter tracking number (e.g. DHL-849201938-US or DHL-992014812-DE)"
                        value={trackingNumberInput}
                        onChange={(e) => setTrackingNumberInput(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 border-2 border-slate-300 rounded-lg text-sm text-black focus:outline-none focus:border-[#D40511] transition"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-[#D40511] hover:bg-red-700 text-white font-black text-sm uppercase px-8 py-3 rounded-lg transition cursor-pointer flex items-center justify-center gap-2 shadow-md shrink-0"
                    >
                      Track
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Sample chips */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="font-semibold text-slate-700">Quick Demo Numbers:</span>
                    {['DHL-849201938-US', 'DHL-992014812-DE', 'DHL-338291045-GB', 'DHL-771920394-AE'].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => {
                          setTrackingNumberInput(num);
                          setActiveTrackingId(num);
                          setCurrentPage('tracking');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="bg-slate-100 hover:bg-yellow-100 hover:text-[#D40511] text-slate-700 px-2.5 py-1 rounded border border-slate-200 font-mono text-[11px] transition cursor-pointer"
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </form>
              )}

              {activeTab === 'quote' && (
                <form onSubmit={handleQuickEstimate} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">From Country</label>
                      <select
                        value={fromCountry}
                        onChange={(e) => setFromCountry(e.target.value)}
                        className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-black focus:outline-none focus:border-[#D40511]"
                      >
                        <option value="United States">United States</option>
                        <option value="Germany">Germany</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Japan">Japan</option>
                        <option value="Singapore">Singapore</option>
                        <option value="United Arab Emirates">United Arab Emirates</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">To Country</label>
                      <select
                        value={toCountry}
                        onChange={(e) => setToCountry(e.target.value)}
                        className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-black focus:outline-none focus:border-[#D40511]"
                      >
                        <option value="Germany">Germany</option>
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Japan">Japan</option>
                        <option value="Singapore">Singapore</option>
                        <option value="France">France</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Approx. Weight (kg)</label>
                      <input
                        type="number"
                        min="0.5"
                        max="100"
                        step="0.5"
                        value={calcWeight}
                        onChange={(e) => setCalcWeight(parseFloat(e.target.value) || 1)}
                        className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-black focus:outline-none focus:border-[#D40511]"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-100">
                    <div className="text-xs">
                      {estimatedCost !== null ? (
                        <div className="flex items-center gap-2">
                          <span className="text-slate-500">Estimated Express Rate:</span>
                          <span className="text-xl font-black text-[#D40511]">${estimatedCost}.00 USD</span>
                          <span className="text-slate-400 text-[10px]">(Transit: ~1-2 Days)</span>
                        </div>
                      ) : (
                        <span className="text-slate-500">Instant rate calculation based on real weight tiers.</span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="submit"
                        className="bg-slate-900 hover:bg-black text-white text-xs font-bold px-4 py-2 rounded transition cursor-pointer"
                      >
                        Calculate Rate
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setCurrentPage('ship-now');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="bg-[#D40511] hover:bg-red-700 text-white text-xs font-black px-4 py-2 rounded uppercase transition cursor-pointer"
                      >
                        Proceed to Book
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Services Overview Grid */}
      <section className="py-16 px-4 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-black text-[#D40511] uppercase tracking-widest mb-1">
              End-to-End Solutions
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase">
              Shipping Services & Capabilities
            </h2>
          </div>
          <button
            onClick={() => {
              setCurrentPage('services');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-bold text-[#D40511] hover:text-red-700 flex items-center gap-1 cursor-pointer group"
          >
            Explore Full Catalog
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Express */}
          <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden hover:shadow-xl transition flex flex-col">
            <div className="h-44 bg-slate-100 relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80"
                alt="DHL Express Aircraft"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute top-3 left-3 bg-[#FFCC00] text-black text-[10px] font-black uppercase px-2.5 py-1 rounded shadow-xs">
                Express Worldwide
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                  <Plane className="w-4 h-4 text-[#D40511]" />
                  <span>Time-Definite Delivery</span>
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-2">
                  International Express Services
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Door-to-door courier delivery for urgent documents and parcels. Next possible business day arrival with customs clearance handled by our global experts.
                </p>
              </div>
              <button
                onClick={() => {
                  setCurrentPage('ship-now');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full bg-[#1A1A1A] hover:bg-[#D40511] text-white text-xs font-bold py-2.5 rounded transition cursor-pointer flex items-center justify-center gap-2"
              >
                Ship Express
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2: Parcel & eCommerce */}
          <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden hover:shadow-xl transition flex flex-col">
            <div className="h-44 bg-slate-100 relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80"
                alt="Parcel Delivery Van"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-[#D40511] text-white text-[10px] font-black uppercase px-2.5 py-1 rounded shadow-xs">
                Parcel Connect
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                  <Truck className="w-4 h-4 text-[#D40511]" />
                  <span>Domestic & Regional Ground</span>
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-2">
                  Parcel & eCommerce Fulfillment
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Affordable standard shipping for e-commerce stores, merchant platforms, and consumer goods. Integrates with over 120,000 automated lockers and parcel shops.
                </p>
              </div>
              <button
                onClick={() => {
                  setCurrentPage('services');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full bg-[#1A1A1A] hover:bg-[#D40511] text-white text-xs font-bold py-2.5 rounded transition cursor-pointer flex items-center justify-center gap-2"
              >
                Learn More
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 3: Freight & Supply Chain */}
          <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden hover:shadow-xl transition flex flex-col">
            <div className="h-44 bg-slate-100 relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=800&q=80"
                alt="Automated Logistics Warehouse"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-neutral-900 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded shadow-xs">
                Global Forwarding
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                  <Building className="w-4 h-4 text-[#D40511]" />
                  <span>Contract Logistics & Freight</span>
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-2">
                  Air, Ocean & Smart Warehousing
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Heavy palletized cargo, charter flights, ocean containers, and automated AI warehousing with temperature-sensitive pharmaceutical cold chain capabilities.
                </p>
              </div>
              <button
                onClick={() => {
                  setCurrentPage('services');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full bg-[#1A1A1A] hover:bg-[#D40511] text-white text-xs font-bold py-2.5 rounded transition cursor-pointer flex items-center justify-center gap-2"
              >
                View Logistics Suite
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Community & Project Posts Section */}
      <section className="bg-white py-16 px-4 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="text-xs font-black text-[#D40511] uppercase tracking-widest mb-1">
                Community Updates & News
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase">
                Featured Posts by Zubair WebsiteWala
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Explore project milestones, web development learnings, and interactive shipping demonstrations.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setCurrentPage('news');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-[#FFCC00] hover:bg-yellow-400 text-black text-xs font-bold px-4 py-2 rounded transition cursor-pointer shadow-xs"
              >
                View All Posts ({posts.length})
              </button>
              <button
                onClick={() => {
                  setCurrentPage('profile');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold px-4 py-2 rounded transition cursor-pointer"
              >
                Creator Profile
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => {
                  setSelectedPostId(post.id);
                  setCurrentPage('post-detail');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-yellow-500 transition cursor-pointer flex flex-col group"
              >
                {post.imageUrl && (
                  <div className="h-44 overflow-hidden relative">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      {post.category}
                    </div>
                  </div>
                )}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <img
                        src={post.authorAvatar}
                        alt={post.authorName}
                        className="w-6 h-6 rounded-full object-cover border border-[#D40511]"
                      />
                      <span className="text-xs font-bold text-slate-800">{post.authorName}</span>
                      <span className="text-[10px] text-slate-400">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-slate-900 group-hover:text-[#D40511] transition line-clamp-1 mb-2">
                      {post.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                      {post.content}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-200/80 text-[11px] text-slate-500">
                    <div className="flex items-center gap-3">
                      <span>❤️ {post.likes} likes</span>
                      <span>💬 {post.comments.length} comments</span>
                    </div>
                    <span className="text-[#D40511] font-bold flex items-center gap-1 group-hover:translate-x-1 transition">
                      Read
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Network Stats & Global Presence */}
      <section className="bg-neutral-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-white mb-2">
              The World&apos;s Largest Logistics Network
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Reliable infrastructure moving millions of packages across continents every single day.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="bg-neutral-800/60 p-6 rounded-xl border border-neutral-700">
              <div className="text-3xl sm:text-4xl font-black text-[#FFCC00] mb-1">220+</div>
              <div className="text-xs uppercase font-bold text-slate-300">Countries & Territories</div>
              <div className="text-[11px] text-slate-500 mt-1">Unmatched global footprint</div>
            </div>

            <div className="bg-neutral-800/60 p-6 rounded-xl border border-neutral-700">
              <div className="text-3xl sm:text-4xl font-black text-[#FFCC00] mb-1">1.8B+</div>
              <div className="text-xs uppercase font-bold text-slate-300">Parcels Delivered / Year</div>
              <div className="text-[11px] text-slate-500 mt-1">99.4% on-time delivery rate</div>
            </div>

            <div className="bg-neutral-800/60 p-6 rounded-xl border border-neutral-700">
              <div className="text-3xl sm:text-4xl font-black text-[#FFCC00] mb-1">320+</div>
              <div className="text-xs uppercase font-bold text-slate-300">Dedicated Cargo Aircraft</div>
              <div className="text-[11px] text-slate-500 mt-1">Daily intercontinental flights</div>
            </div>

            <div className="bg-neutral-800/60 p-6 rounded-xl border border-neutral-700">
              <div className="text-3xl sm:text-4xl font-black text-[#FFCC00] mb-1">120K+</div>
              <div className="text-xs uppercase font-bold text-slate-300">ServicePoints & Lockers</div>
              <div className="text-[11px] text-slate-500 mt-1">Convenient 24/7 drop-off points</div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Support & FAQs Teaser */}
      <section className="py-16 px-4 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-xs font-black text-[#D40511] uppercase tracking-widest mb-1">
              Customer Support Center
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase mb-4">
              Need Assistance with a Delivery?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
              Our support team is available 24/7 to help you track shipments, update delivery addresses, schedule special pick-ups, or process customs inquiries.
            </p>

            <div className="space-y-3">
              {DEMO_FAQS.slice(0, 3).map((faq, idx) => (
                <div key={idx} className="bg-white p-4 rounded-lg border border-slate-200">
                  <div className="font-bold text-xs text-slate-900 mb-1 flex items-center gap-2">
                    <HelpCircle className="w-3.5 h-3.5 text-[#D40511] shrink-0" />
                    {faq.question}
                  </div>
                  <div className="text-[11px] text-slate-600 leading-relaxed pl-5.5">
                    {faq.answer}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-4">
              <button
                onClick={() => {
                  setCurrentPage('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-[#D40511] hover:bg-red-700 text-white text-xs font-black px-5 py-2.5 rounded uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5 shadow-sm"
              >
                <Headphones className="w-3.5 h-3.5" />
                Contact Support Desk
              </button>
            </div>
          </div>

          {/* Right Banner / ServicePoint finder */}
          <div className="bg-[#FFCC00] rounded-2xl p-8 border-4 border-black/10 text-slate-900 shadow-xl relative overflow-hidden">
            <div className="relative z-10 space-y-4">
              <span className="bg-black text-[#FFCC00] text-[10px] font-black uppercase px-2.5 py-1 rounded">
                Nearby ServicePoints
              </span>
              <h3 className="text-2xl font-black uppercase leading-tight">
                Drop Off or Pick Up at a Nearby Station
              </h3>
              <p className="text-xs text-slate-800 leading-relaxed">
                Find thousands of convenient DHL ServicePoints, Packstations, and express retail outlets with extended opening hours.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setCurrentPage('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-black hover:bg-slate-800 text-white text-xs font-bold px-6 py-3 rounded-lg transition cursor-pointer flex items-center gap-2 shadow-md"
                >
                  <MapPin className="w-4 h-4 text-[#FFCC00]" />
                  Locate DHL ServicePoints
                </button>
              </div>
            </div>

            {/* Decorative truck icon watermark */}
            <Truck className="absolute -bottom-6 -right-6 w-44 h-44 text-yellow-500/40 pointer-events-none" />
          </div>
        </div>
      </section>
    </div>
  );
};
