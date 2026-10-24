import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Plane, 
  Truck, 
  Package, 
  Clock, 
  ShieldCheck, 
  Building, 
  Globe2, 
  ArrowRight, 
  Check, 
  Calculator, 
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { SERVICES_CATALOG } from '../data/initialData';

export const ServicesPage: React.FC = () => {
  const { setCurrentPage } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Rate calculator tool inside Services
  const [calcFrom, setCalcFrom] = useState('United States');
  const [calcTo, setCalcTo] = useState('Germany');
  const [calcWeight, setCalcWeight] = useState(3.0);
  const [calcService, setCalcService] = useState('express-worldwide');

  const filteredServices = selectedCategory === 'All'
    ? SERVICES_CATALOG
    : SERVICES_CATALOG.filter((s) => s.category === selectedCategory);

  // Dynamic estimate calculation
  const selectedSrv = SERVICES_CATALOG.find((s) => s.id === calcService) || SERVICES_CATALOG[0];
  const isDomestic = calcFrom === calcTo;
  const computedPrice = Math.round(
    (selectedSrv.baseRatePerKg * 1.5 + calcWeight * selectedSrv.baseRatePerKg * (isDomestic ? 0.7 : 1.0)) * 100
  ) / 100;

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Page Hero */}
        <div className="bg-[#1A1A1A] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden border-t-8 border-[#FFCC00]">
          <div className="max-w-2xl relative z-10 space-y-4">
            <span className="bg-[#D40511] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded">
              Comprehensive Logistics Solutions
            </span>
            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight font-sans">
              Shipping & Courier Services
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              From global time-critical air express to consolidated ocean freight and contract warehousing, DHL connects businesses and individuals across 220+ territories with speed, reliability, and precision.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => {
                  setCurrentPage('ship-now');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-[#D40511] hover:bg-red-700 text-white font-black text-xs uppercase px-6 py-3 rounded-lg transition cursor-pointer flex items-center gap-2 shadow-md"
              >
                Ship a Parcel Now
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          {/* Subtle plane watermark */}
          <Plane className="absolute -bottom-8 -right-8 w-80 h-80 text-white/5 pointer-events-none" />
        </div>

        {/* Interactive Instant Rate Estimator Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-[#FFCC00] text-black p-2 rounded-lg">
              <Calculator className="w-5 h-5 text-black" />
            </div>
            <div>
              <h2 className="text-lg font-black uppercase text-slate-900">
                Instant Rate & Transit Time Calculator
              </h2>
              <p className="text-xs text-slate-500">
                Estimate real-time pricing and delivery schedules across global corridors.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Origin Country</label>
              <select
                value={calcFrom}
                onChange={(e) => setCalcFrom(e.target.value)}
                className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-black focus:outline-none focus:border-[#D40511]"
              >
                <option value="United States">United States</option>
                <option value="Germany">Germany</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Japan">Japan</option>
                <option value="Singapore">Singapore</option>
                <option value="France">France</option>
                <option value="United Arab Emirates">United Arab Emirates</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Destination Country</label>
              <select
                value={calcTo}
                onChange={(e) => setCalcTo(e.target.value)}
                className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-black focus:outline-none focus:border-[#D40511]"
              >
                <option value="Germany">Germany</option>
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Japan">Japan</option>
                <option value="France">France</option>
                <option value="Singapore">Singapore</option>
                <option value="United Arab Emirates">United Arab Emirates</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Shipment Weight (kg)</label>
              <input
                type="number"
                min="0.5"
                max="200"
                step="0.5"
                value={calcWeight}
                onChange={(e) => setCalcWeight(parseFloat(e.target.value) || 1)}
                className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-black focus:outline-none focus:border-[#D40511]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Shipping Tier</label>
              <select
                value={calcService}
                onChange={(e) => setCalcService(e.target.value)}
                className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-black focus:outline-none focus:border-[#D40511]"
              >
                {SERVICES_CATALOG.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-6">
              <div>
                <span className="text-[11px] text-slate-500 uppercase font-bold block">Estimated Cost</span>
                <span className="text-2xl font-black text-[#D40511]">${computedPrice} USD</span>
              </div>
              <div className="border-l border-slate-300 pl-4">
                <span className="text-[11px] text-slate-500 uppercase font-bold block">Transit Window</span>
                <span className="text-sm font-bold text-slate-900">{selectedSrv.deliverySpeed}</span>
              </div>
              <div className="border-l border-slate-300 pl-4 hidden md:block">
                <span className="text-[11px] text-slate-500 uppercase font-bold block">Customs Clearance</span>
                <span className="text-sm font-bold text-emerald-700">Pre-clearance included</span>
              </div>
            </div>

            <button
              onClick={() => {
                setCurrentPage('ship-now');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-[#D40511] hover:bg-red-700 text-white font-black text-xs uppercase px-6 py-2.5 rounded-lg transition cursor-pointer flex items-center justify-center gap-2 shadow-sm"
            >
              Book at this Rate
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {['All', 'Express', 'Freight', 'Supply Chain', 'eCommerce'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#1A1A1A] text-[#FFCC00]'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Showing {filteredServices.length} logistics service(s)
          </span>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-xl transition"
            >
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="bg-[#FFCC00] text-black text-[10px] font-black uppercase px-2.5 py-1 rounded">
                      {service.category}
                    </span>
                    <h3 className="text-xl font-black text-slate-900 mt-2">
                      {service.name}
                    </h3>
                  </div>
                  {service.badge && (
                    <span className="bg-[#D40511] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded shadow-xs">
                      {service.badge}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {service.description}
                </p>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-xs">
                  <span className="text-slate-500 font-bold block mb-1">Transit Commitment:</span>
                  <span className="font-extrabold text-[#D40511] text-sm">{service.deliverySpeed}</span>
                </div>

                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider block">
                    Core Capabilities & Features:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {service.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Base tier rate</span>
                  <span className="text-sm font-black text-slate-900">${service.baseRatePerKg} / kg</span>
                </div>

                <button
                  onClick={() => {
                    setCurrentPage('ship-now');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-[#D40511] hover:bg-red-700 text-white font-black text-xs uppercase px-5 py-2.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 shadow-sm"
                >
                  Book with {service.category}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Matrix Table */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 sm:p-8 space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-lg font-black uppercase text-slate-900">
              Service Comparison Matrix
            </h3>
            <p className="text-xs text-slate-500">
              Direct comparison of delivery speeds, weight capacities, and customs handling.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-800 uppercase font-black text-[11px]">
                <tr>
                  <th className="p-3">Service</th>
                  <th className="p-3">Speed</th>
                  <th className="p-3">Max Weight</th>
                  <th className="p-3">Tracking</th>
                  <th className="p-3">Customs Clearance</th>
                  <th className="p-3">GoGreen Offset</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="p-3 font-bold text-slate-900">DHL Express Worldwide</td>
                  <td className="p-3 text-[#D40511] font-semibold">End of Next Day</td>
                  <td className="p-3">Up to 70 kg/pc</td>
                  <td className="p-3 text-emerald-600 font-bold">✓ Real-time GPS</td>
                  <td className="p-3">✓ Full in-house</td>
                  <td className="p-3">Available</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-900">DHL Express 12:00</td>
                  <td className="p-3 text-[#D40511] font-semibold">Next Day 12:00 PM</td>
                  <td className="p-3">Up to 70 kg/pc</td>
                  <td className="p-3 text-emerald-600 font-bold">✓ Real-time GPS</td>
                  <td className="p-3">✓ Priority lane</td>
                  <td className="p-3">Available</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-900">DHL Parcel Connect</td>
                  <td className="p-3">2 - 4 Days</td>
                  <td className="p-3">Up to 31.5 kg</td>
                  <td className="p-3">Standard milestones</td>
                  <td className="p-3">EU Simplified</td>
                  <td className="p-3">Included standard</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-900">Global Forwarding Air</td>
                  <td className="p-3">1 - 3 Days Airport</td>
                  <td className="p-3 font-bold">No limit (Pallets)</td>
                  <td className="p-3">Cargo flight telemetry</td>
                  <td className="p-3">Full Brokerage</td>
                  <td className="p-3">SAF credits</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
