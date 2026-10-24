import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  HelpCircle, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  Navigation,
  Headphones
} from 'lucide-react';
import { DEMO_SERVICE_POINTS, DEMO_FAQS } from '../data/initialData';

export const ContactPage: React.FC = () => {
  const { showToast } = useApp();

  // Contact form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('Tracking Inquiry');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Locator search
  const [locationSearch, setLocationSearch] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      showToast('Please complete all required fields.', 'warning');
      return;
    }
    setSubmitted(true);
    showToast('Your message has been received! Our support simulator will respond shortly.', 'success');
  };

  const filteredPoints = DEMO_SERVICE_POINTS.filter(
    (sp) =>
      sp.name.toLowerCase().includes(locationSearch.toLowerCase()) ||
      sp.address.toLowerCase().includes(locationSearch.toLowerCase()) ||
      sp.city.toLowerCase().includes(locationSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Banner */}
        <div className="bg-[#1A1A1A] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden border-t-8 border-[#D40511]">
          <div className="max-w-2xl relative z-10 space-y-3">
            <span className="bg-[#FFCC00] text-black text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded">
              Customer Support Center
            </span>
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
              Contact DHL & Find ServicePoints
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We are here to assist with domestic & international tracking inquiries, pickup scheduling, customs formalities, and account setup.
            </p>
          </div>
        </div>

        {/* Support Grid: Direct Channels & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Quick Channels */}
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200 space-y-4">
              <h3 className="text-base font-black uppercase text-slate-900 border-b border-slate-100 pb-3">
                Direct Contact Channels
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="bg-red-50 text-[#D40511] p-2.5 rounded-xl shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">DHL Express Hotline</div>
                    <div className="text-slate-600 font-mono mt-0.5">1-800-225-5345</div>
                    <div className="text-[11px] text-slate-400">Available 24/7 for urgent consignments</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-yellow-50 text-yellow-700 p-2.5 rounded-xl shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Support Desk Email</div>
                    <div className="text-slate-600 mt-0.5">support.demo@dhl-clone.example</div>
                    <div className="text-[11px] text-slate-400">Average response time: &lt; 2 hours</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-emerald-50 text-emerald-700 p-2.5 rounded-xl shrink-0">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Customs Clearance Advice</div>
                    <div className="text-slate-600 mt-0.5">customs.desk@dhl-clone.example</div>
                    <div className="text-[11px] text-slate-400">Harmonized tariff & duties assistance</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Creator Card */}
            <div className="bg-[#FFCC00] p-6 rounded-2xl shadow-md text-slate-900 space-y-2">
              <div className="text-[10px] font-black uppercase bg-black text-[#FFCC00] px-2 py-0.5 rounded inline-block">
                Developer & Portfolio Credit
              </div>
              <h4 className="font-black text-sm uppercase">Engineered by Zubair WebsiteWala</h4>
              <p className="text-xs text-slate-800 leading-relaxed">
                This logistics clone demonstrates real-time milestone timelines, booking algorithms, reactive user state, and community engagement feeds.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-2xl shadow-md border border-slate-200">
            <h3 className="text-base font-black uppercase text-slate-900 mb-1">
              Send an Inquiry to Support
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Fill out the details below and our customer logistics team will assist you.
            </p>

            {submitted ? (
              <div className="p-8 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-black text-emerald-900">Message Received</h4>
                <p className="text-xs text-emerald-700 max-w-md mx-auto">
                  Thank you, {name}! Your inquiry concerning &quot;{category}&quot; has been recorded. Reference ticket #TK-{Math.floor(100000 + Math.random() * 900000)}.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setMessage('');
                  }}
                  className="bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-lg cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. John Miller"
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-black focus:outline-none focus:border-[#D40511]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-black focus:outline-none focus:border-[#D40511]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Inquiry Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-black focus:outline-none focus:border-[#D40511]"
                    >
                      <option value="Tracking Inquiry">Tracking Inquiry</option>
                      <option value="Booking & Pickup Support">Booking & Pickup Support</option>
                      <option value="Customs & Duty Inquiries">Customs & Duty Inquiries</option>
                      <option value="ServicePoint Location Help">ServicePoint Location Help</option>
                      <option value="Technical Feedback">Technical Feedback on Website</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Tracking Number (Optional)
                    </label>
                    <input
                      type="text"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      placeholder="e.g. DHL-849201938-US"
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-black focus:outline-none focus:border-[#D40511] font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Message *</label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your inquiry, request delivery rescheduling, or report a consignment question..."
                    className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-black focus:outline-none focus:border-[#D40511]"
                    required
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="bg-[#D40511] hover:bg-red-700 text-white font-black text-xs uppercase px-8 py-3 rounded-lg transition cursor-pointer flex items-center gap-2 shadow-md"
                  >
                    <Send className="w-4 h-4" />
                    Submit Support Ticket
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* ServicePoint Locator Section */}
        <div className="bg-white rounded-3xl shadow-md border border-slate-200 p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <div className="text-xs font-black text-[#D40511] uppercase tracking-wider">
                Physical Network
              </div>
              <h2 className="text-xl font-black text-slate-900 uppercase">
                Find a DHL ServicePoint or Locker
              </h2>
            </div>

            <div className="relative max-w-sm w-full">
              <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by city, street, or zip..."
                value={locationSearch}
                onChange={(e) => setLocationSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-xs text-black focus:outline-none focus:border-[#D40511]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredPoints.map((point) => (
              <div
                key={point.id}
                className="p-5 rounded-2xl border border-slate-200 hover:border-yellow-500 bg-slate-50/50 flex flex-col justify-between space-y-4 hover:shadow-md transition"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="bg-[#FFCC00] text-black font-black text-[10px] uppercase px-2 py-0.5 rounded">
                      ServicePoint
                    </span>
                    <span className="text-xs font-bold text-slate-500">{point.distance}</span>
                  </div>

                  <h4 className="font-bold text-sm text-slate-900">{point.name}</h4>
                  <div className="text-xs text-slate-600 flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#D40511] shrink-0 mt-0.5" />
                    <span>{point.address}, {point.city}</span>
                  </div>

                  <div className="text-xs text-slate-600 flex items-start gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span>{point.hours}</span>
                  </div>

                  <div className="pt-2">
                    <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                      Available Services:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {point.services.map((svc, i) => (
                        <span key={i} className="bg-white border border-slate-200 text-slate-700 text-[10px] px-2 py-0.5 rounded">
                          {svc}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => showToast(`Directions loaded for ${point.name}!`, 'info')}
                  className="w-full bg-slate-900 hover:bg-black text-white text-xs font-bold py-2 rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#FFCC00]" />
                  Get Directions
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs Accordion Section */}
        <div className="bg-white rounded-3xl shadow-md border border-slate-200 p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <span className="text-xs font-black text-[#D40511] uppercase tracking-wider">
              Answers & Guidance
            </span>
            <h2 className="text-xl font-black text-slate-900 uppercase">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {DEMO_FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;

              return (
                <div
                  key={idx}
                  className="border border-slate-200 rounded-xl overflow-hidden transition"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 text-left font-bold text-xs text-slate-900 bg-slate-50/50 hover:bg-slate-100 transition cursor-pointer flex items-center justify-between gap-4"
                  >
                    <span className="flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-[#D40511] shrink-0" />
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="p-4 bg-white text-xs text-slate-600 leading-relaxed border-t border-slate-200/80">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
