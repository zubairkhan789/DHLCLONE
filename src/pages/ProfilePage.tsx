import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  User, 
  Package, 
  FileText, 
  MapPin, 
  Mail, 
  Phone, 
  Calendar, 
  Edit3, 
  ExternalLink, 
  Printer, 
  Plus, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Heart,
  Share2,
  Trash2
} from 'lucide-react';
import { WaybillModal } from '../components/WaybillModal';
import { Shipment } from '../types';

export const ProfilePage: React.FC = () => {
  const { 
    currentUser, 
    shipments, 
    posts, 
    setCurrentPage, 
    setActiveTrackingId, 
    setSelectedPostId, 
    deletePost, 
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'shipments' | 'posts' | 'activity' | 'addresses'>('shipments');
  const [selectedWaybillShipment, setSelectedWaybillShipment] = useState<Shipment | null>(null);

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-100 py-16 px-4 text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-md space-y-4">
          <User className="w-12 h-12 text-slate-400 mx-auto" />
          <h2 className="text-xl font-bold text-slate-800">You are not logged in</h2>
          <p className="text-xs text-slate-500">
            Log in to view your demo profile, shipments history, and personal posts.
          </p>
          <button
            onClick={() => setCurrentPage('login')}
            className="w-full bg-[#D40511] text-white py-2.5 rounded-lg text-xs font-bold uppercase"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // Filter user's shipments
  const userShipments = shipments.filter(
    (s) => s.userId === currentUser.id || s.sender.name === currentUser.name || s.receiver.name === currentUser.name
  );

  // Filter user's posts
  const userPosts = posts.filter((p) => p.authorName === currentUser.name);

  const totalLikes = userPosts.reduce((acc, p) => acc + p.likes, 0);

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Profile Header Card */}
        <div className="bg-white rounded-3xl shadow-xl border-t-8 border-[#FFCC00] overflow-hidden">
          {/* Header Banner */}
          <div className="h-36 sm:h-44 bg-gradient-to-r from-neutral-900 via-slate-800 to-neutral-900 relative">
            <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-xs text-white text-[11px] font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 border border-white/20">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FFCC00]" />
              Sample Profile • Educational Clone
            </div>
          </div>

          {/* Profile Details Container */}
          <div className="px-6 sm:px-10 pb-8 relative -mt-16 sm:-mt-20">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
                <div className="relative">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl object-cover border-4 border-white shadow-xl"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-[#FFCC00] text-black text-[10px] font-black uppercase px-2 py-0.5 rounded shadow-md">
                    Active
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                      {currentUser.name}
                    </h1>
                    {currentUser.name === 'Zubair WebsiteWala' && (
                      <span className="bg-[#D40511] text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded shadow-xs">
                        Website Creator
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-bold text-[#D40511] uppercase tracking-wide">
                    {currentUser.role}
                  </div>
                  <div className="text-xs text-slate-500 flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {currentUser.city}, {currentUser.country}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      Member since {currentUser.joinedDate}
                    </span>
                  </div>
                </div>
              </div>

              {/* Edit Profile & Action Buttons */}
              <div className="flex flex-wrap justify-center sm:justify-end gap-2.5">
                <button
                  onClick={() => setCurrentPage('edit-profile')}
                  className="bg-slate-900 hover:bg-black text-white text-xs font-bold px-4 py-2.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 shadow-sm"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  Edit Profile
                </button>
                <button
                  onClick={() => {
                    setCurrentPage('ship-now');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-[#D40511] hover:bg-red-700 text-white text-xs font-black uppercase px-4 py-2.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 shadow-md"
                >
                  <Package className="w-3.5 h-3.5" />
                  Book New Shipment
                </button>
              </div>
            </div>

            {/* Bio Box */}
            <div className="mt-6 p-4 rounded-2xl bg-amber-50/50 border border-amber-200/60 text-xs text-slate-700 leading-relaxed">
              <strong className="text-slate-900 block mb-0.5 font-bold">About {currentUser.name}:</strong>
              {currentUser.bio}
            </div>

            {/* KPI Stats Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100 text-center">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-2xl font-black text-slate-900">{userShipments.length}</div>
                <div className="text-[10px] uppercase font-bold text-slate-500">Demo Bookings</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-2xl font-black text-[#D40511]">
                  {userShipments.filter((s) => s.currentStatus === 'In Transit' || s.currentStatus === 'Out for Delivery').length}
                </div>
                <div className="text-[10px] uppercase font-bold text-slate-500">In Transit</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-2xl font-black text-slate-900">{userPosts.length}</div>
                <div className="text-[10px] uppercase font-bold text-slate-500">Published Posts</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-2xl font-black text-amber-600">{totalLikes}</div>
                <div className="text-[10px] uppercase font-bold text-slate-500">Total Post Likes</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 gap-2 overflow-x-auto text-xs font-bold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('shipments')}
            className={`py-3 px-4 border-b-2 transition cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === 'shipments'
                ? 'border-[#D40511] text-[#D40511] bg-white rounded-t-lg'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Package className="w-4 h-4" />
            My Shipments ({userShipments.length})
          </button>
          <button
            onClick={() => setActiveTab('posts')}
            className={`py-3 px-4 border-b-2 transition cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === 'posts'
                ? 'border-[#D40511] text-[#D40511] bg-white rounded-t-lg'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            My Posts & Updates ({userPosts.length})
          </button>
          <button
            onClick={() => setActiveTab('addresses')}
            className={`py-3 px-4 border-b-2 transition cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === 'addresses'
                ? 'border-[#D40511] text-[#D40511] bg-white rounded-t-lg'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <MapPin className="w-4 h-4" />
            Saved Address Book
          </button>
        </div>

        {/* Tab 1: Shipments */}
        {activeTab === 'shipments' && (
          <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-black uppercase text-slate-900">
                  Bookings & Tracking History
                </h3>
                <p className="text-xs text-slate-500">
                  Real-time status of all packages linked to this account.
                </p>
              </div>
              <button
                onClick={() => setCurrentPage('ship-now')}
                className="bg-[#D40511] hover:bg-red-700 text-white text-xs font-black uppercase px-4 py-2 rounded-lg transition cursor-pointer flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                Book Package
              </button>
            </div>

            {userShipments.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-700 uppercase font-bold text-[10px] border-b border-slate-200">
                    <tr>
                      <th className="p-4">Tracking Number</th>
                      <th className="p-4">Route</th>
                      <th className="p-4">Service</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Est. Delivery</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {userShipments.map((s) => (
                      <tr key={s.id} className="hover:bg-slate-50 transition">
                        <td className="p-4">
                          <div className="font-mono font-bold text-slate-900">{s.id}</div>
                          <div className="text-[10px] text-slate-400">Ref: {s.bookingReference}</div>
                        </td>
                        <td className="p-4">
                          <div className="font-semibold text-slate-800 truncate max-w-[150px]">
                            {s.origin.split(',')[0]} → {s.destination.split(',')[0]}
                          </div>
                          <div className="text-[10px] text-slate-400 truncate max-w-[150px]">
                            To: {s.receiver.name}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="font-bold text-slate-700">{s.service.name}</div>
                          <div className="text-[10px] text-slate-400">${s.service.totalPrice} USD</div>
                        </td>
                        <td className="p-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                              s.currentStatus === 'Delivered'
                                ? 'bg-emerald-100 text-emerald-800'
                                : s.currentStatus === 'Out for Delivery'
                                ? 'bg-amber-100 text-amber-800'
                                : s.currentStatus === 'In Transit'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-current" />
                            {s.currentStatus}
                          </span>
                        </td>
                        <td className="p-4 text-slate-600">
                          {new Date(s.estimatedDelivery).toLocaleDateString([], {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => {
                              setActiveTrackingId(s.id);
                              setCurrentPage('tracking');
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="text-[#D40511] hover:underline font-bold text-xs cursor-pointer"
                          >
                            Track
                          </button>
                          <button
                            onClick={() => setSelectedWaybillShipment(s)}
                            className="text-slate-600 hover:text-black font-semibold text-xs cursor-pointer"
                            title="Print label"
                          >
                            Label
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-12 text-center text-xs text-slate-500 space-y-2">
                <Package className="w-10 h-10 text-slate-300 mx-auto" />
                <div className="font-bold text-slate-700">No shipments found for this profile.</div>
                <button
                  onClick={() => setCurrentPage('ship-now')}
                  className="bg-[#D40511] text-white px-4 py-2 rounded text-xs font-bold uppercase cursor-pointer"
                >
                  Book your first shipment
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: User's Posts */}
        {activeTab === 'posts' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black uppercase text-slate-900">
                Posts Authored by {currentUser.name}
              </h3>
              <button
                onClick={() => setCurrentPage('news')}
                className="bg-[#D40511] hover:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded-lg cursor-pointer flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                Publish Post
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {userPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-2xl p-5 shadow-md border border-slate-200 flex flex-col justify-between space-y-4"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2">
                      <span className="font-bold text-[#D40511] uppercase">{post.category}</span>
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>

                    <h4
                      onClick={() => {
                        setSelectedPostId(post.id);
                        setCurrentPage('post-detail');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="font-bold text-sm text-slate-900 hover:text-[#D40511] transition cursor-pointer mb-2"
                    >
                      {post.title}
                    </h4>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {post.content}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500">❤️ {post.likes} likes • 💬 {post.comments.length} comments</span>
                    <button
                      onClick={() => {
                        if (window.confirm('Delete this post?')) {
                          deletePost(post.id);
                        }
                      }}
                      className="text-slate-400 hover:text-red-600 p-1 cursor-pointer"
                      title="Delete post"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Saved Addresses */}
        {activeTab === 'addresses' && (
          <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-black uppercase text-slate-900">
                  Registered Locations & Address Book
                </h3>
                <p className="text-xs text-slate-500">
                  Pre-configured addresses for accelerated shipment booking.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Primary Address */}
              <div className="p-4 rounded-xl border-2 border-yellow-500 bg-amber-50/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="bg-[#FFCC00] text-black font-black text-[10px] uppercase px-2 py-0.5 rounded">
                    Default Origin Address
                  </span>
                  <span className="text-[10px] text-slate-500 font-semibold">HQ Lab</span>
                </div>
                <div className="font-bold text-sm text-slate-900">{currentUser.name}</div>
                <div className="text-xs text-slate-600">{currentUser.company}</div>
                <div className="text-xs text-slate-700">{currentUser.address}</div>
                <div className="text-xs text-slate-700">{currentUser.city}, {currentUser.country}</div>
                <div className="text-xs text-slate-500">Tel: {currentUser.phone}</div>
              </div>

              {/* Destination Partner Address */}
              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                <div className="flex items-center justify-between">
                  <span className="bg-slate-100 text-slate-700 font-bold text-[10px] uppercase px-2 py-0.5 rounded">
                    Frequent Destination
                  </span>
                  <span className="text-[10px] text-slate-500 font-semibold">Europe Hub</span>
                </div>
                <div className="font-bold text-sm text-slate-900">EuroTech Distribution</div>
                <div className="text-xs text-slate-600">Attn: Sophia Laurent</div>
                <div className="text-xs text-slate-700">14 Rue de la Paix</div>
                <div className="text-xs text-slate-700">75002 Paris, France</div>
                <div className="text-xs text-slate-500">Tel: +33 1 42 68 55 00</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Printable Waybill Modal */}
      {selectedWaybillShipment && (
        <WaybillModal
          shipment={selectedWaybillShipment}
          onClose={() => setSelectedWaybillShipment(null)}
        />
      )}
    </div>
  );
};
