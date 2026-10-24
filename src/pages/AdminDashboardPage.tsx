import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  LayoutDashboard, 
  Package, 
  Truck, 
  FileText, 
  Trash2, 
  Play, 
  Search, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  RefreshCw, 
  MapPin, 
  Plus, 
  TrendingUp 
} from 'lucide-react';
import { ShipmentStatus } from '../types';

export const AdminDashboardPage: React.FC = () => {
  const { 
    shipments, 
    posts, 
    updateShipmentStatus, 
    advanceShipmentStatus, 
    deleteShipment, 
    deletePost, 
    resetDemoData, 
    setActiveTrackingId, 
    setCurrentPage, 
    setSelectedPostId, 
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'shipments' | 'posts'>('shipments');
  const [shipmentSearch, setShipmentSearch] = useState('');
  
  // Custom status update state
  const [selectedShipmentId, setSelectedShipmentId] = useState<string>(shipments[0]?.id || '');
  const [newStatus, setNewStatus] = useState<ShipmentStatus>('In Transit');
  const [newLocation, setNewLocation] = useState('Central Sorting Hub Leipzig - Germany');
  const [newDescription, setNewDescription] = useState('Customs inspection completed. Dispatched on feeder flight.');

  const totalShipments = shipments.length;
  const inTransitCount = shipments.filter((s) => s.currentStatus === 'In Transit').length;
  const outForDeliveryCount = shipments.filter((s) => s.currentStatus === 'Out for Delivery').length;
  const deliveredCount = shipments.filter((s) => s.currentStatus === 'Delivered').length;

  const filteredShipments = shipments.filter(
    (s) =>
      s.id.toLowerCase().includes(shipmentSearch.toLowerCase()) ||
      s.sender.name.toLowerCase().includes(shipmentSearch.toLowerCase()) ||
      s.receiver.name.toLowerCase().includes(shipmentSearch.toLowerCase()) ||
      s.origin.toLowerCase().includes(shipmentSearch.toLowerCase()) ||
      s.destination.toLowerCase().includes(shipmentSearch.toLowerCase())
  );

  const handleApplyStatusUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedShipmentId) return;
    updateShipmentStatus(selectedShipmentId, newStatus, newLocation, newDescription);
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-[#1A1A1A] text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-t-8 border-[#D40511]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-[#FFCC00] text-black text-[10px] font-black uppercase px-2.5 py-0.5 rounded">
                Operations Management
              </span>
              <span className="text-xs text-slate-400">Logistics Simulator Admin Panel</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
              DHL Operations Control Center
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Simulate dispatch updates, advance transit milestones, and manage community posts in real-time.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (window.confirm('Reset all demo data back to default?')) {
                  resetDemoData();
                }
              }}
              className="bg-neutral-800 hover:bg-neutral-700 text-yellow-400 text-xs font-bold px-4 py-2.5 rounded-lg transition cursor-pointer flex items-center gap-2 border border-neutral-700"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset Demo Data
            </button>
          </div>
        </div>

        {/* Operational Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] uppercase font-bold text-slate-500">Total Tracked</span>
              <Package className="w-4 h-4 text-slate-400" />
            </div>
            <div className="text-3xl font-black text-slate-900">{totalShipments}</div>
            <div className="text-[11px] text-slate-500 mt-1">Live in database</div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] uppercase font-bold text-slate-500">In Transit</span>
              <Truck className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-3xl font-black text-blue-600">{inTransitCount}</div>
            <div className="text-[11px] text-slate-500 mt-1">International air / feeder</div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] uppercase font-bold text-slate-500">Out for Delivery</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-3xl font-black text-amber-600">{outForDeliveryCount}</div>
            <div className="text-[11px] text-slate-500 mt-1">On courier vehicles</div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] uppercase font-bold text-slate-500">Delivered</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-3xl font-black text-emerald-600">{deliveredCount}</div>
            <div className="text-[11px] text-slate-500 mt-1">Proof of delivery on file</div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-200 gap-2 text-xs font-bold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('shipments')}
            className={`py-3 px-4 border-b-2 transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'shipments'
                ? 'border-[#D40511] text-[#D40511] bg-white rounded-t-lg'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Package className="w-4 h-4" />
            Manage Shipments ({shipments.length})
          </button>
          <button
            onClick={() => setActiveTab('posts')}
            className={`py-3 px-4 border-b-2 transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'posts'
                ? 'border-[#D40511] text-[#D40511] bg-white rounded-t-lg'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            Manage Community Posts ({posts.length})
          </button>
        </div>

        {/* Tab 1: Shipments Management */}
        {activeTab === 'shipments' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Table of Shipments */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden space-y-4 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h3 className="text-base font-black uppercase text-slate-900">
                  Registered Courier Shipments
                </h3>
                <div className="relative max-w-xs w-full">
                  <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by ID, city, shipper..."
                    value={shipmentSearch}
                    onChange={(e) => setShipmentSearch(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 border border-slate-300 rounded-lg text-xs text-black focus:outline-none focus:border-[#D40511]"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-700 uppercase font-bold text-[10px] border-b border-slate-200">
                    <tr>
                      <th className="p-3">Tracking #</th>
                      <th className="p-3">Route</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredShipments.map((s) => (
                      <tr
                        key={s.id}
                        className={`hover:bg-slate-50 transition cursor-pointer ${
                          selectedShipmentId === s.id ? 'bg-amber-50/60' : ''
                        }`}
                        onClick={() => setSelectedShipmentId(s.id)}
                      >
                        <td className="p-3">
                          <div className="font-mono font-bold text-slate-900">{s.id}</div>
                          <div className="text-[10px] text-slate-400">{s.service.name}</div>
                        </td>
                        <td className="p-3">
                          <div className="truncate max-w-[140px] font-semibold text-slate-800">
                            {s.origin.split(',')[0]} → {s.destination.split(',')[0]}
                          </div>
                        </td>
                        <td className="p-3">
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                              s.currentStatus === 'Delivered'
                                ? 'bg-emerald-100 text-emerald-800'
                                : s.currentStatus === 'Out for Delivery'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {s.currentStatus}
                          </span>
                        </td>
                        <td className="p-3 text-right space-x-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              advanceShipmentStatus(s.id);
                            }}
                            disabled={s.currentStatus === 'Delivered'}
                            className={`p-1 rounded text-xs font-bold transition cursor-pointer ${
                              s.currentStatus === 'Delivered'
                                ? 'text-slate-300'
                                : 'text-[#D40511] hover:bg-red-50'
                            }`}
                            title="Advance to next status"
                          >
                            <Play className="w-3.5 h-3.5 fill-current" />
                          </button>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveTrackingId(s.id);
                              setCurrentPage('tracking');
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="text-slate-600 hover:text-black font-semibold text-xs"
                          >
                            Track
                          </button>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (window.confirm(`Delete shipment ${s.id}?`)) {
                                deleteShipment(s.id);
                              }
                            }}
                            className="text-slate-400 hover:text-red-600 p-1"
                            title="Delete record"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Manual Checkpoint Injector Card */}
            <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 space-y-4 h-fit">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-sm font-black uppercase text-slate-900">
                  Update Checkpoint Status
                </h3>
                <p className="text-xs text-slate-500">
                  Apply manual status changes or log custom facility checkpoints.
                </p>
              </div>

              <form onSubmit={handleApplyStatusUpdate} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Target Shipment</label>
                  <select
                    value={selectedShipmentId}
                    onChange={(e) => setSelectedShipmentId(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg p-2 text-xs font-mono text-black"
                  >
                    {shipments.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.id} ({s.currentStatus})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">New Status</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as any)}
                    className="w-full border border-slate-300 rounded-lg p-2 text-xs text-black"
                  >
                    <option value="Shipment Created">Shipment Created</option>
                    <option value="Picked Up">Picked Up</option>
                    <option value="In Transit">In Transit</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Exception / On Hold">Exception / On Hold</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Checkpoint Location</label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg p-2 text-xs text-black"
                    placeholder="e.g. Frankfurt Hub Gate 4"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Status Description</label>
                  <textarea
                    rows={2}
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg p-2 text-xs text-black"
                    placeholder="e.g. Package loaded onto outbound linehaul truck."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#D40511] hover:bg-red-700 text-white font-black text-xs uppercase py-2.5 rounded-lg transition cursor-pointer shadow-sm"
                >
                  Apply Status Update
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Tab 2: Community Posts Management */}
        {activeTab === 'posts' && (
          <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-black uppercase text-slate-900">
                  Content Management (CMS)
                </h3>
                <p className="text-xs text-slate-500">
                  Review and moderate community posts and project updates.
                </p>
              </div>
              <button
                onClick={() => setCurrentPage('news')}
                className="bg-[#D40511] text-white text-xs font-bold px-4 py-2 rounded-lg cursor-pointer"
              >
                + Write Post
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-700 uppercase font-bold text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="p-3">Title & Category</th>
                    <th className="p-3">Author</th>
                    <th className="p-3">Likes</th>
                    <th className="p-3">Comments</th>
                    <th className="p-3">Date</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {posts.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50 transition">
                      <td className="p-3">
                        <div className="font-bold text-slate-900 line-clamp-1">{p.title}</div>
                        <span className="text-[10px] text-[#D40511] font-semibold">{p.category}</span>
                      </td>
                      <td className="p-3">
                        <div className="font-semibold text-slate-800">{p.authorName}</div>
                      </td>
                      <td className="p-3 font-semibold text-slate-600">❤️ {p.likes}</td>
                      <td className="p-3 font-semibold text-slate-600">💬 {p.comments.length}</td>
                      <td className="p-3 text-slate-500">{new Date(p.createdAt).toLocaleDateString()}</td>
                      <td className="p-3 text-right space-x-2">
                        <button
                          onClick={() => {
                            setSelectedPostId(p.id);
                            setCurrentPage('post-detail');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="text-slate-600 hover:text-black font-bold text-xs"
                        >
                          View
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete post "${p.title}"?`)) {
                              deletePost(p.id);
                            }
                          }}
                          className="text-red-600 hover:underline font-bold text-xs"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
