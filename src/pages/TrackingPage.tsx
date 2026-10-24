import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Search, 
  Package, 
  MapPin, 
  Calendar, 
  Clock, 
  Truck, 
  Plane, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Printer, 
  Share2, 
  Copy, 
  Play, 
  ShieldCheck, 
  RotateCcw,
  Sparkles,
  Info
} from 'lucide-react';
import { Shipment, ShipmentStatus } from '../types';
import { WaybillModal } from '../components/WaybillModal';

export const TrackingPage: React.FC = () => {
  const { 
    shipments, 
    activeTrackingId, 
    setActiveTrackingId, 
    trackShipment, 
    advanceShipmentStatus, 
    recentSearches, 
    showToast 
  } = useApp();

  const [inputVal, setInputVal] = useState(activeTrackingId || '');
  const [currentShipment, setCurrentShipment] = useState<Shipment | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [showWaybill, setShowWaybill] = useState(false);

  useEffect(() => {
    if (activeTrackingId) {
      const found = trackShipment(activeTrackingId);
      setCurrentShipment(found || null);
      setInputVal(activeTrackingId);
      setHasSearched(true);
    } else if (shipments.length > 0 && !hasSearched) {
      // Default to the first in-transit shipment
      const defaultShipment = shipments.find((s) => s.currentStatus === 'In Transit') || shipments[0];
      setCurrentShipment(defaultShipment);
      setInputVal(defaultShipment.id);
      setHasSearched(true);
    }
  }, [activeTrackingId, shipments]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) {
      showToast('Please enter a tracking number or booking reference.', 'warning');
      return;
    }
    const found = trackShipment(inputVal.trim());
    setCurrentShipment(found || null);
    setActiveTrackingId(inputVal.trim());
    setHasSearched(true);

    if (!found) {
      showToast(`No shipment found matching "${inputVal.trim()}". Try one of the demo tracking numbers.`, 'error');
    }
  };

  const handleSelectDemo = (trackingNum: string) => {
    setInputVal(trackingNum);
    setActiveTrackingId(trackingNum);
    const found = trackShipment(trackingNum);
    setCurrentShipment(found || null);
    setHasSearched(true);
  };

  const handleAdvanceStatus = () => {
    if (!currentShipment) return;
    const updated = advanceShipmentStatus(currentShipment.id);
    if (updated) {
      setCurrentShipment(updated);
    }
  };

  const handleCopyTracking = () => {
    if (!currentShipment) return;
    navigator.clipboard.writeText(currentShipment.id);
    showToast('Tracking number copied to clipboard!', 'success');
  };

  // Status Milestones definition
  const milestones: { label: ShipmentStatus; icon: any }[] = [
    { label: 'Shipment Created', icon: Package },
    { label: 'Picked Up', icon: Truck },
    { label: 'In Transit', icon: Plane },
    { label: 'Out for Delivery', icon: Truck },
    { label: 'Delivered', icon: CheckCircle2 },
  ];

  const getMilestoneIndex = (status: ShipmentStatus) => {
    const list: ShipmentStatus[] = [
      'Shipment Created',
      'Picked Up',
      'In Transit',
      'Out for Delivery',
      'Delivered',
    ];
    return list.indexOf(status);
  };

  const currentMilestoneIdx = currentShipment ? getMilestoneIndex(currentShipment.currentStatus) : -1;

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Page Title & Search Bar */}
        <div className="bg-white rounded-2xl shadow-md border-t-4 border-[#D40511] p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-black text-[#D40511] uppercase tracking-widest">
                Real-Time Milestone Tracking
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase font-sans">
                Track Your Shipment
              </h1>
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs text-slate-500 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-lg">
              <Info className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Educational demo tracking database</span>
            </div>
          </div>

          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Enter 10-digit number or code (e.g. DHL-849201938-US)"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border-2 border-slate-300 rounded-lg text-sm text-black focus:outline-none focus:border-[#D40511] font-mono transition"
              />
            </div>
            <button
              type="submit"
              className="bg-[#D40511] hover:bg-red-700 text-white font-black text-xs uppercase px-8 py-3 rounded-lg transition cursor-pointer flex items-center justify-center gap-2 shadow-md shrink-0"
            >
              Track Shipment
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Selector Chips */}
          <div className="flex flex-wrap items-center gap-2 text-xs pt-2 border-t border-slate-100">
            <span className="font-bold text-slate-700">Test Demo Shipments:</span>
            {[
              { id: 'DHL-849201938-US', label: 'In Transit (USA -> DE)' },
              { id: 'DHL-992014812-DE', label: 'Out for Delivery (DE -> UK)' },
              { id: 'DHL-338291045-GB', label: 'Delivered (JP -> USA)' },
              { id: 'DHL-771920394-AE', label: 'Created (UAE -> SG)' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectDemo(item.id)}
                className={`px-2.5 py-1 rounded border text-[11px] font-mono transition cursor-pointer ${
                  currentShipment?.id === item.id
                    ? 'bg-[#FFCC00] text-black font-bold border-yellow-500 shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-200 text-slate-700 border-slate-200'
                }`}
              >
                {item.id} <span className="text-[10px] opacity-75 hidden sm:inline">({item.label})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Results Container */}
        {currentShipment ? (
          <div className="space-y-6">
            {/* Main Status Header Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="bg-[#FFCC00] p-6 border-b-2 border-yellow-500/40">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-[#D40511] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded">
                        {currentShipment.service.name}
                      </span>
                      <span className="text-xs text-black font-bold">
                        Ref: {currentShipment.bookingReference}
                      </span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-black tracking-tight flex items-center gap-3">
                      <span>{currentShipment.id}</span>
                      <button
                        onClick={handleCopyTracking}
                        className="text-black/60 hover:text-black p-1 transition cursor-pointer"
                        title="Copy tracking number"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Actions & Simulation Control */}
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => setShowWaybill(true)}
                      className="bg-white hover:bg-slate-50 text-black text-xs font-bold px-3.5 py-2 rounded-lg border border-slate-300 transition cursor-pointer flex items-center gap-1.5 shadow-xs"
                    >
                      <Printer className="w-3.5 h-3.5 text-[#D40511]" />
                      Print Waybill
                    </button>

                    {/* Advance Status Button for Testing */}
                    <button
                      onClick={handleAdvanceStatus}
                      disabled={currentShipment.currentStatus === 'Delivered'}
                      className={`text-xs font-black px-4 py-2 rounded-lg transition cursor-pointer flex items-center gap-1.5 shadow-md ${
                        currentShipment.currentStatus === 'Delivered'
                          ? 'bg-slate-300 text-slate-600 cursor-not-allowed'
                          : 'bg-[#D40511] hover:bg-red-700 text-white'
                      }`}
                      title="Advance shipment status to simulate transit checkpoint"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      {currentShipment.currentStatus === 'Delivered'
                        ? 'Delivery Complete'
                        : 'Simulate Next Checkpoint'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Status Banner Summary */}
              <div className="p-6 bg-slate-50 border-b border-slate-200">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="border-r border-slate-200/80 pr-4">
                    <div className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">Current Status</div>
                    <div className="text-lg font-black text-[#D40511] flex items-center gap-1.5 mt-0.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#D40511] animate-pulse" />
                      {currentShipment.currentStatus}
                    </div>
                    {currentShipment.signedBy && (
                      <div className="text-xs text-emerald-700 font-semibold mt-0.5">
                        Signed by: {currentShipment.signedBy}
                      </div>
                    )}
                  </div>

                  <div className="border-r border-slate-200/80 pr-4">
                    <div className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">Estimated Delivery</div>
                    <div className="text-base font-bold text-slate-900 mt-0.5">
                      {new Date(currentShipment.estimatedDelivery).toLocaleDateString(undefined, {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </div>
                    <div className="text-xs text-slate-500">
                      by {new Date(currentShipment.estimatedDelivery).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>

                  <div className="border-r border-slate-200/80 pr-4">
                    <div className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">Origin</div>
                    <div className="text-sm font-bold text-slate-800 truncate mt-0.5">
                      {currentShipment.origin}
                    </div>
                    <div className="text-xs text-slate-500 truncate">{currentShipment.sender.name}</div>
                  </div>

                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">Destination</div>
                    <div className="text-sm font-bold text-slate-800 truncate mt-0.5">
                      {currentShipment.destination}
                    </div>
                    <div className="text-xs text-slate-500 truncate">{currentShipment.receiver.name}</div>
                  </div>
                </div>
              </div>

              {/* Progress Milestones Bar */}
              <div className="p-6 sm:p-8">
                <div className="relative">
                  {/* Progress Line */}
                  <div className="hidden sm:block absolute top-1/2 left-8 right-8 -translate-y-1/2 h-1.5 bg-slate-200 rounded-full">
                    <div
                      className="h-full bg-[#D40511] rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.max(0, (currentMilestoneIdx / (milestones.length - 1)) * 100)}%`,
                      }}
                    />
                  </div>

                  {/* Steps */}
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative z-10">
                    {milestones.map((step, idx) => {
                      const isCompleted = idx <= currentMilestoneIdx;
                      const isCurrent = idx === currentMilestoneIdx;
                      const Icon = step.icon;

                      return (
                        <div key={step.label} className="flex sm:flex-col items-center gap-3 sm:gap-2 text-left sm:text-center">
                          <div
                            className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm shadow-md transition-all duration-300 ${
                              isCurrent
                                ? 'bg-[#D40511] text-white ring-4 ring-red-200 scale-110'
                                : isCompleted
                                ? 'bg-[#FFCC00] text-black'
                                : 'bg-slate-200 text-slate-400'
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <div
                              className={`text-xs font-bold leading-tight ${
                                isCurrent
                                  ? 'text-[#D40511] font-black'
                                  : isCompleted
                                  ? 'text-slate-900'
                                  : 'text-slate-400'
                              }`}
                            >
                              {step.label}
                            </div>
                            {isCurrent && (
                              <div className="text-[10px] text-[#D40511] font-bold uppercase tracking-wider mt-0.5">
                                Active Step
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Checkpoint Logs & Details Split */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Detailed Tracking Events Log */}
              <div className="lg:col-span-2 bg-white rounded-2xl shadow-md border border-slate-200 p-6 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#D40511]" />
                    <h2 className="text-base font-black uppercase text-slate-900">
                      Shipment Activity & Checkpoints ({currentShipment.checkpoints.length})
                    </h2>
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium">
                    Sorted by newest first
                  </span>
                </div>

                <div className="space-y-6 pl-2">
                  {[...currentShipment.checkpoints].reverse().map((cp, idx) => (
                    <div key={cp.id} className="relative flex items-start gap-4 group">
                      {/* Timeline dot & vertical connecting line */}
                      {idx !== currentShipment.checkpoints.length - 1 && (
                        <div className="absolute left-[13px] top-6 bottom-[-24px] w-0.5 bg-slate-200" />
                      )}
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 transition ${
                          idx === 0
                            ? 'bg-[#D40511] text-white ring-4 ring-red-100'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {idx === 0 ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-slate-500" />
                        )}
                      </div>

                      <div className="flex-1 bg-slate-50 p-3.5 rounded-xl border border-slate-200/70">
                        <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                          <span className="text-xs font-bold text-slate-900">
                            {cp.status}
                          </span>
                          <span className="text-[11px] text-slate-500 font-mono">
                            {new Date(cp.timestamp).toLocaleString([], {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-700 mb-1">
                          <MapPin className="w-3.5 h-3.5 text-[#D40511] shrink-0" />
                          <span>{cp.location}</span>
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed">
                          {cp.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Package & Shipper Specs Card */}
              <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 space-y-6 h-fit">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Package className="w-4 h-4 text-[#D40511]" />
                  <h3 className="text-sm font-black uppercase text-slate-900">
                    Shipment Specifications
                  </h3>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">Service:</span>
                    <span className="font-bold text-slate-900 text-right">{currentShipment.service.name}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">Packaging Type:</span>
                    <span className="font-bold text-slate-900">{currentShipment.packageDetails.type}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">Piece Weight:</span>
                    <span className="font-bold text-slate-900">{currentShipment.packageDetails.weightKg} kg</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">Dimensions:</span>
                    <span className="font-bold text-slate-900 font-mono">
                      {currentShipment.packageDetails.dimensionsCm.length} x {currentShipment.packageDetails.dimensionsCm.width} x {currentShipment.packageDetails.dimensionsCm.height} cm
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">Declared Value:</span>
                    <span className="font-bold text-slate-900">${currentShipment.packageDetails.declaredValueUsd} USD</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">Pieces:</span>
                    <span className="font-bold text-slate-900">{currentShipment.packageDetails.pieces} Piece(s)</span>
                  </div>
                </div>

                {/* Add-ons badges */}
                <div>
                  <div className="text-[11px] font-bold text-slate-700 uppercase mb-2">Included Add-ons</div>
                  <div className="flex flex-wrap gap-1.5">
                    {currentShipment.service.addOns.length > 0 ? (
                      currentShipment.service.addOns.map((add, idx) => (
                        <span key={idx} className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-semibold px-2 py-0.5 rounded">
                          ✓ {add}
                        </span>
                      ))
                    ) : (
                      <span className="text-slate-400 text-xs">Standard courier handling</span>
                    )}
                  </div>
                </div>

                {/* Need Help CTA */}
                <div className="bg-amber-50 p-3.5 rounded-xl border border-amber-200 text-xs space-y-2">
                  <div className="font-bold text-amber-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-amber-700" />
                    Delivery Help & Support
                  </div>
                  <p className="text-[11px] text-amber-800 leading-relaxed">
                    Have a question regarding address modification, delivery window, or proof of delivery?
                  </p>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(currentShipment.id);
                      showToast('Shipment ID copied! Connect with support.', 'info');
                    }}
                    className="text-[11px] font-bold text-[#D40511] hover:underline cursor-pointer"
                  >
                    Contact Support for this Shipment →
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : hasSearched ? (
          /* Empty / Not Found State */
          <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-12 text-center space-y-4">
            <div className="w-16 h-16 bg-red-50 text-[#D40511] rounded-full flex items-center justify-center mx-auto">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-black uppercase text-slate-900">
              No Shipment Found for &quot;{inputVal}&quot;
            </h2>
            <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
              We couldn&apos;t locate records for this tracking code in our demo database. Please double-check your tracking number or test with one of the pre-configured demo shipments below.
            </p>

            <div className="flex flex-wrap justify-center gap-2 pt-2">
              <button
                onClick={() => handleSelectDemo('DHL-849201938-US')}
                className="bg-[#FFCC00] text-black font-bold px-4 py-2 rounded-lg text-xs hover:bg-yellow-400 transition cursor-pointer"
              >
                Load Demo Shipment DHL-849201938-US
              </button>
              <button
                onClick={() => handleSelectDemo('DHL-992014812-DE')}
                className="bg-slate-100 text-slate-800 font-bold px-4 py-2 rounded-lg text-xs hover:bg-slate-200 transition cursor-pointer"
              >
                Load Demo Shipment DHL-992014812-DE
              </button>
            </div>
          </div>
        ) : null}
      </div>

      {/* Waybill Modal */}
      {showWaybill && currentShipment && (
        <WaybillModal
          shipment={currentShipment}
          onClose={() => setShowWaybill(false)}
        />
      )}
    </div>
  );
};
