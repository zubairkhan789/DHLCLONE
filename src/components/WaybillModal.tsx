import React from 'react';
import { Shipment } from '../types';
import { X, Printer, Download, Check, ShieldCheck, MapPin } from 'lucide-react';

interface WaybillModalProps {
  shipment: Shipment;
  onClose: () => void;
}

export const WaybillModal: React.FC<WaybillModalProps> = ({ shipment, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden my-8">
        {/* Modal Toolbar */}
        <div className="bg-slate-900 text-white px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-[#FFCC00] text-black font-extrabold text-xs px-2 py-0.5 rounded italic">
              DHL
            </span>
            <span className="font-semibold text-sm">Official Air Waybill / Delivery Document (Demo)</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 bg-[#D40511] hover:bg-red-700 text-white text-xs font-semibold px-3 py-1.5 rounded transition cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              Print Label
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded hover:bg-white/10 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Waybill Area */}
        <div className="p-6 bg-amber-50/20 text-slate-800 text-xs font-mono select-none" id="printable-waybill">
          {/* Header */}
          <div className="border-4 border-black p-4 bg-white shadow-sm space-y-4">
            <div className="flex items-start justify-between border-b-2 border-black pb-3">
              <div>
                <div className="text-3xl font-black italic tracking-tighter text-[#D40511] flex items-center gap-2">
                  <span className="bg-[#FFCC00] px-2 py-0.5 border border-black">DHL</span>
                  <span className="text-xl font-bold uppercase tracking-wider text-black not-italic font-sans">
                    EXPRESS
                  </span>
                </div>
                <div className="text-[11px] font-sans font-bold text-slate-600 mt-1">
                  INTERNATIONAL AIR WAYBILL
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-base text-black">{shipment.service.name}</div>
                <div className="text-[10px] text-slate-500">Ref: {shipment.bookingReference}</div>
                <div className="text-[10px] text-emerald-700 font-bold flex items-center justify-end gap-1 mt-0.5">
                  <ShieldCheck className="w-3 h-3" />
                  Electronic Customs Verified
                </div>
              </div>
            </div>

            {/* Tracking Barcode Representation */}
            <div className="text-center py-2 bg-slate-50 border border-slate-300 rounded">
              <div className="text-[9px] text-slate-500 font-sans uppercase tracking-widest mb-1">
                WAYBILL / TRACKING NUMBER
              </div>
              <div className="text-lg font-black tracking-widest text-black">
                {shipment.id}
              </div>
              {/* Synthetic Barcode Lines */}
              <div className="flex justify-center items-center h-12 gap-[2px] mt-1 px-8 overflow-hidden">
                {[...Array(60)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-black h-full"
                    style={{
                      width: i % 4 === 0 ? '4px' : i % 2 === 0 ? '2px' : '1px',
                      opacity: i % 7 === 0 ? 0.3 : 1,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Shipper & Consignee Columns */}
            <div className="grid grid-cols-2 gap-4 border-2 border-black p-3">
              {/* Shipper (From) */}
              <div className="space-y-1 pr-2 border-r border-black/40">
                <div className="bg-black text-white px-1.5 py-0.5 font-bold font-sans text-[10px] uppercase inline-block">
                  FROM (SHIPPER)
                </div>
                <div className="font-bold text-sm text-black">{shipment.sender.name}</div>
                {shipment.sender.company && (
                  <div className="text-slate-600 font-semibold">{shipment.sender.company}</div>
                )}
                <div>{shipment.sender.address}</div>
                <div>{shipment.sender.city}, {shipment.sender.postalCode}</div>
                <div className="font-bold text-black uppercase">{shipment.sender.country}</div>
                <div className="text-[10px] text-slate-500">Tel: {shipment.sender.phone}</div>
              </div>

              {/* Consignee (To) */}
              <div className="space-y-1 pl-2">
                <div className="bg-[#D40511] text-white px-1.5 py-0.5 font-bold font-sans text-[10px] uppercase inline-block">
                  TO (CONSIGNEE)
                </div>
                <div className="font-bold text-sm text-black">{shipment.receiver.name}</div>
                {shipment.receiver.company && (
                  <div className="text-slate-600 font-semibold">{shipment.receiver.company}</div>
                )}
                <div>{shipment.receiver.address}</div>
                <div>{shipment.receiver.city}, {shipment.receiver.postalCode}</div>
                <div className="font-black text-black text-sm uppercase">{shipment.receiver.country}</div>
                <div className="text-[10px] text-slate-500">Tel: {shipment.receiver.phone}</div>
              </div>
            </div>

            {/* Shipment Specifications */}
            <div className="grid grid-cols-4 gap-2 text-[11px] border border-black p-2 bg-yellow-50/40">
              <div>
                <div className="text-slate-500 font-sans text-[9px] uppercase">Piece Weight</div>
                <div className="font-bold text-black">{shipment.packageDetails.weightKg} KG</div>
              </div>
              <div>
                <div className="text-slate-500 font-sans text-[9px] uppercase">Dimensions</div>
                <div className="font-bold text-black">
                  {shipment.packageDetails.dimensionsCm.length}x{shipment.packageDetails.dimensionsCm.width}x{shipment.packageDetails.dimensionsCm.height} CM
                </div>
              </div>
              <div>
                <div className="text-slate-500 font-sans text-[9px] uppercase">Pieces</div>
                <div className="font-bold text-black">{shipment.packageDetails.pieces} of 1</div>
              </div>
              <div>
                <div className="text-slate-500 font-sans text-[9px] uppercase">Declared Value</div>
                <div className="font-bold text-black">${shipment.packageDetails.declaredValueUsd} USD</div>
              </div>
            </div>

            {/* Description & Addons */}
            <div className="border border-slate-300 p-2 text-[10px] space-y-1">
              <div><strong className="font-sans">Contents Description:</strong> {shipment.packageDetails.description}</div>
              <div>
                <strong className="font-sans">Special Services / Add-ons:</strong>{' '}
                {shipment.service.addOns.length > 0 ? shipment.service.addOns.join(', ') : 'Standard Express handling'}
              </div>
            </div>

            {/* Footer with Routing and QR simulation */}
            <div className="flex items-center justify-between pt-2 border-t border-black">
              <div className="space-y-0.5">
                <div className="font-bold text-sm tracking-widest text-black">
                  ROUTING: {shipment.origin.slice(0, 3).toUpperCase()} - {shipment.destination.slice(0, 3).toUpperCase()}
                </div>
                <div className="text-[9px] text-slate-500">
                  Created: {new Date(shipment.createdAt).toLocaleDateString()} | DHL Educational Simulator
                </div>
              </div>

              {/* Synthetic QR Code Box */}
              <div className="w-14 h-14 border border-black bg-white p-1 flex flex-wrap gap-0.5 justify-center items-center">
                <div className="grid grid-cols-5 gap-0.5 w-full h-full">
                  {[...Array(25)].map((_, i) => (
                    <div
                      key={i}
                      className={i % 2 === 0 || i % 5 === 0 ? 'bg-black' : 'bg-transparent'}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="bg-slate-100 px-6 py-3 flex items-center justify-between border-t border-slate-200">
          <div className="text-xs text-slate-500">
            Click <strong>Print Label</strong> or attach this waybill to your demo package.
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg text-xs font-semibold text-slate-700 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
