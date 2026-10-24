import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  User, 
  ArrowLeft, 
  Save, 
  Image as ImageIcon, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';

const PRESET_AVATARS = [
  {
    label: 'Zubair Default',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  },
  {
    label: 'Tech Executive',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  },
  {
    label: 'Logistics Engineer',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
  },
  {
    label: 'Courier Specialist',
    url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
  },
  {
    label: 'Digital Designer',
    url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
  },
];

export const EditProfilePage: React.FC = () => {
  const { currentUser, updateProfile, setCurrentPage, showToast } = useApp();

  const [name, setName] = useState(currentUser?.name || 'Zubair WebsiteWala');
  const [role, setRole] = useState(currentUser?.role || 'Demo User & Website Creator');
  const [bio, setBio] = useState(
    currentUser?.bio || 'Exploring AI, technology, web development, and digital innovation.'
  );
  const [email, setEmail] = useState(currentUser?.email || 'zubair.websitewala@example.com');
  const [phone, setPhone] = useState(currentUser?.phone || '+1 (555) 789-0142');
  const [company, setCompany] = useState(currentUser?.company || 'Web Innovations Lab');
  const [address, setAddress] = useState(currentUser?.address || '450 Innovation Parkway, Suite 800');
  const [city, setCity] = useState(currentUser?.city || 'San Francisco, CA');
  const [country, setCountry] = useState(currentUser?.country || 'United States');
  const [avatar, setAvatar] = useState(
    currentUser?.avatar ||
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      showToast('Name and email are required.', 'warning');
      return;
    }

    updateProfile({
      name: name.trim(),
      role: role.trim(),
      bio: bio.trim(),
      email: email.trim(),
      phone: phone.trim(),
      company: company.trim(),
      address: address.trim(),
      city: city.trim(),
      country: country.trim(),
      avatar,
    });

    setCurrentPage('profile');
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <button
          onClick={() => setCurrentPage('profile')}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#D40511] transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Profile
        </button>

        <div className="bg-white rounded-3xl shadow-xl border-t-8 border-[#D40511] p-6 sm:p-10 space-y-8">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-black text-[#D40511] uppercase tracking-wider">
                User Settings
              </span>
              <h1 className="text-2xl font-black text-slate-900 uppercase">
                Edit User Profile
              </h1>
            </div>
            <div className="text-xs text-slate-500 bg-amber-50 px-3 py-1 rounded-lg border border-amber-200">
              Sample Profile: Zubair WebsiteWala
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Avatar Selector */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-700">Profile Picture / Avatar</label>
              <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <img
                  src={avatar}
                  alt="Avatar preview"
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-[#D40511] shadow-md shrink-0"
                />
                <div className="space-y-2 flex-1">
                  <div className="text-xs font-bold text-slate-700">Choose Preset Avatar:</div>
                  <div className="flex flex-wrap gap-2">
                    {PRESET_AVATARS.map((p, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setAvatar(p.url)}
                        className={`text-[11px] px-2.5 py-1 rounded-md border font-semibold transition cursor-pointer ${
                          avatar === p.url
                            ? 'bg-[#FFCC00] text-black border-yellow-500 font-bold'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                  <div>
                    <input
                      type="url"
                      placeholder="Or enter custom image URL..."
                      value={avatar}
                      onChange={(e) => setAvatar(e.target.value)}
                      className="w-full text-xs p-2 border border-slate-300 rounded-lg bg-white text-black"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-black focus:outline-none focus:border-[#D40511]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Professional Role / Title *</label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-black focus:outline-none focus:border-[#D40511]"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Biography / About Me</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
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
                  className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-black focus:outline-none focus:border-[#D40511]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-black focus:outline-none focus:border-[#D40511]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Company / Organization</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-black focus:outline-none focus:border-[#D40511]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">City, State / Region</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-black focus:outline-none focus:border-[#D40511]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Default Street Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-black focus:outline-none focus:border-[#D40511]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setCurrentPage('profile')}
                className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#D40511] hover:bg-red-700 text-white rounded-lg text-xs font-black uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Save className="w-4 h-4" />
                Save Profile Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
