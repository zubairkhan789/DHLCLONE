import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Package, 
  Send, 
  MapPin, 
  Truck, 
  Plane, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Printer, 
  Leaf, 
  Sparkles, 
  FileText, 
  UserCheck 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Shipment } from '../types';
import { WaybillModal } from '../components/WaybillModal';

export const ShipNowPage: React.FC = () => {
  const { currentUser, createBooking, setCurrentPage, setActiveTrackingId, showToast } = useApp();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [createdShipment, setCreatedShipment] = useState<Shipment | null>(null);
  const [showWaybill, setShowWaybill] = useState(false);

  // Step 1: Sender
  const [senderName, setSenderName] = useState(currentUser?.name || 'Zubair WebsiteWala');
  const [senderCompany, setSenderCompany] = useState(currentUser?.company || 'Web Innovations Lab');
  const [senderEmail, setSenderEmail] = useState(currentUser?.email || 'zubair.websitewala@example.com');
  const [senderPhone, setSenderPhone] = useState(currentUser?.phone || '+1 (555) 789-0142');
  const [senderAddress, setSenderAddress] = useState(currentUser?.address || '450 Innovation Parkway, Suite 800');
  const [senderCity, setSenderCity] = useState(currentUser?.city || 'San Francisco, CA');
  const [senderPostal, setSenderPostal] = useState('94107');
  const [senderCountry, setSenderCountry] = useState(currentUser?.country || 'United States');

  // Step 2: Receiver
  const [receiverName, setReceiverName] = useState('Sophia Laurent');
  const [receiverCompany, setReceiverCompany] = useState('EuroTech Distribution');
  const [receiverEmail, setReceiverEmail] = useState('sophia.laurent@eurotech.fr');
  const [receiverPhone, setReceiverPhone] = useState('+33 1 42 68 55 00');
  const [receiverAddress, setReceiverAddress] = useState('14 Rue de la Paix');
  const [receiverCity, setReceiverCity] = useState('Paris');
  const [receiverPostal, setReceiverPostal] = useState('75002');
  const [receiverCountry, setReceiverCountry] = useState('France');

  // Step 3: Package
  const [packageType, setPackageType] = useState<'Parcel / Box' | 'Document' | 'Freight / Pallet'>('Parcel / Box');
  const [weightKg, setWeightKg] = useState<number>(3.2);
  const [lengthCm, setLengthCm] = useState<number>(30);
  const [widthCm, setWidthCm] = useState<number>(22);
  const [heightCm, setHeightCm] = useState<number>(15);
  const [description, setDescription] = useState('Electronics hardware and documentation samples');
  const [declaredValue, setDeclaredValue] = useState<number>(450);

  // Step 4: Service & Add-ons
  const [selectedServiceId, setSelectedServiceId] = useState<string>('express-worldwide');
  const [goGreen, setGoGreen] = useState(true);
  const [signatureRequired, setSignatureRequired] = useState(true);
  const [insurance, setInsurance] = useState(false);

  // Pricing calculation
  const servicesConfig = [
    {
      id: 'express-worldwide',
      name: 'DHL Express Worldwide',
      estimate: 'Next Business Day by end of day',
      baseRate: 45.0,
      perKg: 18.0,
      icon: Plane,
      badge: 'Fastest International',
    },
    {
      id: 'express-1200',
      name: 'DHL Express 12:00',
      estimate: 'Next Business Day before 12:00 PM',
      baseRate: 65.0,
      perKg: 22.0,
      icon: Plane,
      badge: 'Time-Guaranteed Morning',
    },
    {
      id: 'parcel-connect',
      name: 'DHL Parcel Connect',
      estimate: '2-4 Business Days',
      baseRate: 22.0,
      perKg: 7.5,
      icon: Truck,
      badge: 'Cost-Effective Economy',
    },
    {
      id: 'air-freight',
      name: 'DHL Global Forwarding Air',
      estimate: '1-3 Business Days',
      baseRate: 110.0,
      perKg: 8.0,
      icon: Plane,
      badge: 'Heavy Cargo / Palletized',
    },
  ];

  const currentServiceObj = servicesConfig.find((s) => s.id === selectedServiceId) || servicesConfig[0];

  const isDomestic = senderCountry.toLowerCase() === receiverCountry.toLowerCase();
  const baseServicePrice = currentServiceObj.baseRate + weightKg * currentServiceObj.perKg * (isDomestic ? 0.7 : 1.0);
  
  const addOnsTotal =
    (goGreen ? 3.5 : 0) +
    (signatureRequired ? 5.0 : 0) +
    (insurance ? Math.max(12.0, declaredValue * 0.02) : 0);

  const finalTotalPrice = Math.round((baseServicePrice + addOnsTotal) * 100) / 100;

  const validateStep = (step: number) => {
    if (step === 1) {
      if (!senderName || !senderAddress || !senderCity || !senderCountry) {
        showToast('Please fill in required sender contact information.', 'warning');
        return false;
      }
    } else if (step === 2) {
      if (!receiverName || !receiverAddress || !receiverCity || !receiverCountry) {
        showToast('Please fill in required receiver contact information.', 'warning');
        return false;
      }
    } else if (step === 3) {
      if (!description || weightKg <= 0) {
        showToast('Please specify valid package description and weight.', 'warning');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => (prev < 4 ? ((prev + 1) as any) : prev));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => (prev > 1 ? ((prev - 1) as any) : prev));
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();

    const addOnsList: string[] = [];
    if (goGreen) addOnsList.push('GoGreen Climate Neutral');
    if (signatureRequired) addOnsList.push('Direct Signature Required');
    if (insurance) addOnsList.push('Extended Liability Insurance');

    const newBooking = createBooking({
      sender: {
        name: senderName,
        company: senderCompany,
        email: senderEmail,
        phone: senderPhone,
        address: senderAddress,
        city: senderCity,
        postalCode: senderPostal,
        country: senderCountry,
      },
      receiver: {
        name: receiverName,
        company: receiverCompany,
        email: receiverEmail,
        phone: receiverPhone,
        address: receiverAddress,
        city: receiverCity,
        postalCode: receiverPostal,
        country: receiverCountry,
      },
      packageDetails: {
        type: packageType,
        weightKg,
        dimensionsCm: {
          length: lengthCm,
          width: widthCm,
          height: heightCm,
        },
        description,
        declaredValueUsd: declaredValue,
        pieces: 1,
      },
      service: {
        id: currentServiceObj.id,
        name: currentServiceObj.name,
        deliveryEstimate: currentServiceObj.estimate,
        basePrice: Math.round(baseServicePrice * 100) / 100,
        totalPrice: finalTotalPrice,
        addOns: addOnsList,
      },
    });

    setCreatedShipment(newBooking);
    setCurrentStep(5);

    // Fire celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFCC00', '#D40511', '#000000'],
      });
    } catch {
      // ignore
    }
  };

  const resetForm = () => {
    setCreatedShipment(null);
    setCurrentStep(1);
    setDescription('Spare parts and technical manual');
    setWeightKg(2.5);
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Title Header */}
        <div className="bg-white rounded-2xl shadow-md border-t-4 border-[#FFCC00] p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-black text-[#D40511] uppercase tracking-widest">
                Online Shipping Tool
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase font-sans">
                Book a DHL Shipment
              </h1>
            </div>

            {/* Step Wizard Indicator */}
            {currentStep < 5 && (
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4].map((stepNum) => (
                  <div
                    key={stepNum}
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition ${
                      currentStep === stepNum
                        ? 'bg-[#D40511] text-white ring-2 ring-red-200'
                        : currentStep > stepNum
                        ? 'bg-[#FFCC00] text-black'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {stepNum}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Wizard Forms */}
        {currentStep < 5 ? (
          <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 sm:p-8 space-y-6">
            {/* Step 1: Shipper Details */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#FFCC00] text-black font-black text-xs flex items-center justify-center">
                      1
                    </span>
                    <h2 className="text-base font-black text-slate-900 uppercase">
                      Sender Details (Origin / Shipper)
                    </h2>
                  </div>
                  {currentUser && (
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Auto-filled from profile
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-black focus:outline-none focus:border-[#D40511]"
                      placeholder="e.g. Zubair WebsiteWala"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Company (Optional)</label>
                    <input
                      type="text"
                      value={senderCompany}
                      onChange={(e) => setSenderCompany(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-black focus:outline-none focus:border-[#D40511]"
                      placeholder="e.g. Web Innovations Lab"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email *</label>
                    <input
                      type="email"
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-black focus:outline-none focus:border-[#D40511]"
                      placeholder="zubair.websitewala@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      value={senderPhone}
                      onChange={(e) => setSenderPhone(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-black focus:outline-none focus:border-[#D40511]"
                      placeholder="+1 (555) 789-0142"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">Street Address *</label>
                    <input
                      type="text"
                      value={senderAddress}
                      onChange={(e) => setSenderAddress(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-black focus:outline-none focus:border-[#D40511]"
                      placeholder="450 Innovation Parkway, Suite 800"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">City / State *</label>
                    <input
                      type="text"
                      value={senderCity}
                      onChange={(e) => setSenderCity(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-black focus:outline-none focus:border-[#D40511]"
                      placeholder="San Francisco, CA"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Postal Code *</label>
                    <input
                      type="text"
                      value={senderPostal}
                      onChange={(e) => setSenderPostal(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-black focus:outline-none focus:border-[#D40511]"
                      placeholder="94107"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">Country / Region *</label>
                    <select
                      value={senderCountry}
                      onChange={(e) => setSenderCountry(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-black focus:outline-none focus:border-[#D40511]"
                    >
                      <option value="United States">United States</option>
                      <option value="Germany">Germany</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Japan">Japan</option>
                      <option value="France">France</option>
                      <option value="Singapore">Singapore</option>
                      <option value="United Arab Emirates">United Arab Emirates</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Consignee Details */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#FFCC00] text-black font-black text-xs flex items-center justify-center">
                      2
                    </span>
                    <h2 className="text-base font-black text-slate-900 uppercase">
                      Receiver Details (Destination / Consignee)
                    </h2>
                  </div>
                  <span className="text-[11px] text-slate-500">Destination address for delivery</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Name / Contact *</label>
                    <input
                      type="text"
                      value={receiverName}
                      onChange={(e) => setReceiverName(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-black focus:outline-none focus:border-[#D40511]"
                      placeholder="e.g. Sophia Laurent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Company Name</label>
                    <input
                      type="text"
                      value={receiverCompany}
                      onChange={(e) => setReceiverCompany(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-black focus:outline-none focus:border-[#D40511]"
                      placeholder="e.g. EuroTech Distribution"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email *</label>
                    <input
                      type="email"
                      value={receiverEmail}
                      onChange={(e) => setReceiverEmail(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-black focus:outline-none focus:border-[#D40511]"
                      placeholder="sophia.laurent@eurotech.fr"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      value={receiverPhone}
                      onChange={(e) => setReceiverPhone(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-black focus:outline-none focus:border-[#D40511]"
                      placeholder="+33 1 42 68 55 00"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">Street Address *</label>
                    <input
                      type="text"
                      value={receiverAddress}
                      onChange={(e) => setReceiverAddress(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-black focus:outline-none focus:border-[#D40511]"
                      placeholder="14 Rue de la Paix"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">City *</label>
                    <input
                      type="text"
                      value={receiverCity}
                      onChange={(e) => setReceiverCity(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-black focus:outline-none focus:border-[#D40511]"
                      placeholder="Paris"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Postal / ZIP Code *</label>
                    <input
                      type="text"
                      value={receiverPostal}
                      onChange={(e) => setReceiverPostal(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-black focus:outline-none focus:border-[#D40511]"
                      placeholder="75002"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">Destination Country *</label>
                    <select
                      value={receiverCountry}
                      onChange={(e) => setReceiverCountry(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-black focus:outline-none focus:border-[#D40511]"
                    >
                      <option value="France">France</option>
                      <option value="Germany">Germany</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United States">United States</option>
                      <option value="Japan">Japan</option>
                      <option value="Singapore">Singapore</option>
                      <option value="United Arab Emirates">United Arab Emirates</option>
                      <option value="Italy">Italy</option>
                      <option value="Spain">Spain</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Package Specifications */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#FFCC00] text-black font-black text-xs flex items-center justify-center">
                      3
                    </span>
                    <h2 className="text-base font-black text-slate-900 uppercase">
                      Package & Cargo Specifications
                    </h2>
                  </div>
                  <span className="text-[11px] text-slate-500">Weight & volumetric details</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">Package Format</label>
                    <div className="grid grid-cols-3 gap-3">
                      {(['Document', 'Parcel / Box', 'Freight / Pallet'] as const).map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setPackageType(type)}
                          className={`p-3 rounded-lg border text-xs font-bold flex flex-col items-center gap-2 transition cursor-pointer ${
                            packageType === type
                              ? 'border-[#D40511] bg-red-50/50 text-[#D40511]'
                              : 'border-slate-200 hover:border-slate-300 text-slate-700'
                          }`}
                        >
                          <Package className="w-5 h-5" />
                          <span>{type}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Weight (kg) *</label>
                      <input
                        type="number"
                        min="0.1"
                        max="300"
                        step="0.1"
                        value={weightKg}
                        onChange={(e) => setWeightKg(parseFloat(e.target.value) || 0.5)}
                        className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-black focus:outline-none focus:border-[#D40511]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Length (cm)</label>
                      <input
                        type="number"
                        min="5"
                        max="500"
                        value={lengthCm}
                        onChange={(e) => setLengthCm(parseInt(e.target.value) || 10)}
                        className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-black focus:outline-none focus:border-[#D40511]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Width (cm)</label>
                      <input
                        type="number"
                        min="5"
                        max="500"
                        value={widthCm}
                        onChange={(e) => setWidthCm(parseInt(e.target.value) || 10)}
                        className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-black focus:outline-none focus:border-[#D40511]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Height (cm)</label>
                      <input
                        type="number"
                        min="1"
                        max="500"
                        value={heightCm}
                        onChange={(e) => setHeightCm(parseInt(e.target.value) || 10)}
                        className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-black focus:outline-none focus:border-[#D40511]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Contents Description (Customs) *
                      </label>
                      <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-black focus:outline-none focus:border-[#D40511]"
                        placeholder="e.g. Printed product catalogues and fabric samples"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Declared Value (USD) *</label>
                      <input
                        type="number"
                        min="1"
                        value={declaredValue}
                        onChange={(e) => setDeclaredValue(parseInt(e.target.value) || 50)}
                        className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-black focus:outline-none focus:border-[#D40511]"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Shipping Service & Add-ons */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#FFCC00] text-black font-black text-xs flex items-center justify-center">
                      4
                    </span>
                    <h2 className="text-base font-black text-slate-900 uppercase">
                      Select Service & Optional Add-ons
                    </h2>
                  </div>
                  <span className="text-[11px] text-slate-500">Compare delivery speeds and rates</span>
                </div>

                <div className="space-y-3">
                  <label className="block text-xs font-bold text-slate-700">Available Shipping Services</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {servicesConfig.map((srv) => {
                      const isSelected = selectedServiceId === srv.id;
                      const Icon = srv.icon;
                      const srvPrice = Math.round(
                        (srv.baseRate + weightKg * srv.perKg * (isDomestic ? 0.7 : 1.0)) * 100
                      ) / 100;

                      return (
                        <div
                          key={srv.id}
                          onClick={() => setSelectedServiceId(srv.id)}
                          className={`p-4 rounded-xl border-2 transition cursor-pointer relative flex flex-col justify-between ${
                            isSelected
                              ? 'border-[#D40511] bg-red-50/30 shadow-md'
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <div>
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <span className="text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                                {srv.badge}
                              </span>
                              <div className="text-right">
                                <span className="text-lg font-black text-[#D40511]">${srvPrice}</span>
                                <span className="text-[10px] text-slate-400 block">USD</span>
                              </div>
                            </div>
                            <h4 className="font-bold text-sm text-slate-900">{srv.name}</h4>
                            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                              <Icon className="w-3.5 h-3.5 text-[#D40511]" />
                              {srv.estimate}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Add-ons Checklist */}
                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <label className="block text-xs font-bold text-slate-700">Recommended Add-on Services</label>
                  <div className="space-y-2">
                    <label className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={goGreen}
                          onChange={(e) => setGoGreen(e.target.checked)}
                          className="w-4 h-4 text-[#D40511] rounded focus:ring-[#D40511]"
                        />
                        <div>
                          <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                            <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                            DHL GoGreen Carbon Neutral Offset
                          </div>
                          <div className="text-[11px] text-slate-500">
                            Offset complete CO2 emissions via certified climate protection projects.
                          </div>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-slate-700">+$3.50</span>
                    </label>

                    <label className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={signatureRequired}
                          onChange={(e) => setSignatureRequired(e.target.checked)}
                          className="w-4 h-4 text-[#D40511] rounded focus:ring-[#D40511]"
                        />
                        <div>
                          <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                            Direct Recipient Signature Required
                          </div>
                          <div className="text-[11px] text-slate-500">
                            Courier will only hand over package to designated consignee with ID verification.
                          </div>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-slate-700">+$5.00</span>
                    </label>

                    <label className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={insurance}
                          onChange={(e) => setInsurance(e.target.checked)}
                          className="w-4 h-4 text-[#D40511] rounded focus:ring-[#D40511]"
                        />
                        <div>
                          <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                            Extended Shipment Protection Insurance
                          </div>
                          <div className="text-[11px] text-slate-500">
                            Full coverage up to declared invoice value of ${declaredValue} USD.
                          </div>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-slate-700">
                        +${Math.max(12, Math.round(declaredValue * 0.02 * 100) / 100)}
                      </span>
                    </label>
                  </div>
                </div>

                {/* Summary Box */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="text-xs text-slate-500">Total Estimated Cost</div>
                    <div className="text-2xl font-black text-[#D40511]">${finalTotalPrice} USD</div>
                    <div className="text-[10px] text-slate-400">
                      Includes fuel surcharge, customs pre-clearance, and selected add-ons.
                    </div>
                  </div>

                  <button
                    onClick={handleConfirmBooking}
                    className="bg-[#D40511] hover:bg-red-700 text-white font-black text-xs uppercase px-8 py-3 rounded-lg transition cursor-pointer flex items-center gap-2 shadow-lg"
                  >
                    Confirm & Generate Waybill
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Wizard Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-300 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
              ) : <div />}

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-1.5 bg-[#D40511] hover:bg-red-700 text-white px-6 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider transition cursor-pointer shadow-md"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : null}
            </div>
          </div>
        ) : createdShipment ? (
          /* Step 5: Booking Confirmation Screen */
          <div className="bg-white rounded-2xl shadow-xl border-t-8 border-[#FFCC00] p-8 space-y-6 text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-black text-emerald-700 uppercase tracking-widest">
                Booking Confirmed (Demo)
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase">
                Your DHL Shipment is Ready!
              </h2>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Electronic airway bill has been generated and registered in the tracking database.
              </p>
            </div>

            {/* Tracking & Ref Cards */}
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 max-w-xl mx-auto space-y-4 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-3 gap-2">
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-500">Tracking Number</div>
                  <div className="text-xl font-black text-[#D40511] tracking-wider font-mono">
                    {createdShipment.id}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase font-bold text-slate-500">Booking Reference</div>
                  <div className="text-sm font-bold text-slate-800 font-mono">
                    {createdShipment.bookingReference}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-500 block text-[11px]">From (Shipper):</span>
                  <strong className="text-slate-900">{createdShipment.sender.name}</strong>
                  <div className="text-slate-600 text-[11px] truncate">{createdShipment.origin}</div>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">To (Consignee):</span>
                  <strong className="text-slate-900">{createdShipment.receiver.name}</strong>
                  <div className="text-slate-600 text-[11px] truncate">{createdShipment.destination}</div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-xs">
                <div>
                  <span className="text-slate-500">Service:</span>{' '}
                  <strong className="text-slate-800">{createdShipment.service.name}</strong>
                </div>
                <div>
                  <span className="text-slate-500">Total Billed:</span>{' '}
                  <strong className="text-[#D40511] font-black">${createdShipment.service.totalPrice} USD</strong>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap justify-center items-center gap-3 pt-4">
              <button
                onClick={() => setShowWaybill(true)}
                className="bg-black hover:bg-slate-800 text-white font-bold text-xs px-6 py-3 rounded-lg transition cursor-pointer flex items-center gap-2 shadow-md"
              >
                <Printer className="w-4 h-4 text-[#FFCC00]" />
                Print Air Waybill & Barcode
              </button>

              <button
                onClick={() => {
                  setActiveTrackingId(createdShipment.id);
                  setCurrentPage('tracking');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-[#D40511] hover:bg-red-700 text-white font-black text-xs uppercase px-6 py-3 rounded-lg transition cursor-pointer flex items-center gap-2 shadow-md"
              >
                Track this Shipment Now
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={resetForm}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs px-5 py-3 rounded-lg transition cursor-pointer"
              >
                Book Another Shipment
              </button>
            </div>
          </div>
        ) : null}
      </div>

      {/* Waybill Modal */}
      {showWaybill && createdShipment && (
        <WaybillModal
          shipment={createdShipment}
          onClose={() => setShowWaybill(false)}
        />
      )}
    </div>
  );
};
