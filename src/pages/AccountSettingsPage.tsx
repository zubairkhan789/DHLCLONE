import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Settings, 
  Bell, 
  Globe, 
  Lock, 
  ShieldCheck, 
  Save, 
  ArrowLeft, 
  Trash2, 
  CheckCircle2 
} from 'lucide-react';

export const AccountSettingsPage: React.FC = () => {
  const { currentUser, setCurrentPage, showToast, resetDemoData } = useApp();

  const [measurementUnit, setMeasurementUnit] = useState<'Metric (kg, cm)' | 'Imperial (lb, in)'>('Metric (kg, cm)');
  const [preferredCurrency, setPreferredCurrency] = useState<'USD ($)' | 'EUR (€)' | 'GBP (£)'>('USD ($)');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [marketingAlerts, setMarketingAlerts] = useState(false);

  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Account preferences saved successfully!', 'success');
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPass || !newPass) {
      showToast('Please enter both current and new password.', 'warning');
      return;
    }
    showToast('Password updated successfully (Demo simulation).', 'success');
    setCurrentPass('');
    setNewPass('');
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

        <div className="bg-white rounded-3xl shadow-xl border-t-8 border-slate-900 p-6 sm:p-10 space-y-8">
          <div>
            <span className="text-xs font-black text-[#D40511] uppercase tracking-wider">
              Preferences & Configuration
            </span>
            <h1 className="text-2xl font-black text-slate-900 uppercase">
              Account Settings
            </h1>
          </div>

          {/* Preferences Form */}
          <form onSubmit={handleSaveSettings} className="space-y-6">
            {/* Units & Localization */}
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#D40511]" />
                Shipping Measurement & Localization
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Measurement Units</label>
                  <select
                    value={measurementUnit}
                    onChange={(e) => setMeasurementUnit(e.target.value as any)}
                    className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-black focus:outline-none focus:border-[#D40511]"
                  >
                    <option value="Metric (kg, cm)">Metric (kg, cm)</option>
                    <option value="Imperial (lb, in)">Imperial (lb, in)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Default Billing Currency</label>
                  <select
                    value={preferredCurrency}
                    onChange={(e) => setPreferredCurrency(e.target.value as any)}
                    className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-black focus:outline-none focus:border-[#D40511]"
                  >
                    <option value="USD ($)">USD ($)</option>
                    <option value="EUR (€)">EUR (€)</option>
                    <option value="GBP (£)">GBP (£)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Notification Toggles */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="text-xs font-black uppercase text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                <Bell className="w-4 h-4 text-[#D40511]" />
                Notification Preferences
              </h3>

              <div className="space-y-3">
                <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                  <div>
                    <div className="text-xs font-bold text-slate-800">Email Checkpoint Notifications</div>
                    <div className="text-[11px] text-slate-500">
                      Receive an email whenever a package checkpoint status is advanced.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailAlerts}
                    onChange={(e) => setEmailAlerts(e.target.checked)}
                    className="w-4 h-4 text-[#D40511] rounded focus:ring-[#D40511]"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                  <div>
                    <div className="text-xs font-bold text-slate-800">SMS Out-for-Delivery Alerts</div>
                    <div className="text-[11px] text-slate-500">
                      Instant text alert when courier vehicle departs delivery station.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={smsAlerts}
                    onChange={(e) => setSmsAlerts(e.target.checked)}
                    className="w-4 h-4 text-[#D40511] rounded focus:ring-[#D40511]"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                  <div>
                    <div className="text-xs font-bold text-slate-800">DHL Logistics Trends & Community Digest</div>
                    <div className="text-[11px] text-slate-500">
                      Weekly digest of posts, green shipping breakthroughs, and tech updates.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={marketingAlerts}
                    onChange={(e) => setMarketingAlerts(e.target.checked)}
                    className="w-4 h-4 text-[#D40511] rounded focus:ring-[#D40511]"
                  />
                </label>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-slate-900 hover:bg-black text-white text-xs font-black uppercase px-6 py-2.5 rounded-lg transition cursor-pointer flex items-center gap-2 shadow-sm"
              >
                <Save className="w-4 h-4" />
                Save Preferences
              </button>
            </div>
          </form>

          {/* Password Security Form */}
          <div className="pt-6 border-t border-slate-100 space-y-4">
            <h3 className="text-xs font-black uppercase text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#D40511]" />
              Security & Credentials
            </h3>

            <form onSubmit={handlePasswordUpdate} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Current Password</label>
                <input
                  type="password"
                  value={currentPass}
                  onChange={(e) => setCurrentPass(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-black focus:outline-none focus:border-[#D40511]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">New Password</label>
                <input
                  type="password"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-black focus:outline-none focus:border-[#D40511]"
                />
              </div>

              <div className="sm:col-span-2 flex justify-end">
                <button
                  type="submit"
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-4 py-2 rounded-lg cursor-pointer"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>

          {/* Data Reset Danger Zone */}
          <div className="pt-6 border-t border-slate-100 p-4 bg-red-50/50 rounded-2xl border border-red-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-red-900">Reset Demo State</div>
              <div className="text-[11px] text-red-700">
                Restore all default shipments, Zubair WebsiteWala posts, and clear demo cache.
              </div>
            </div>
            <button
              onClick={() => {
                if (window.confirm('Reset all demo data to default initial state?')) {
                  resetDemoData();
                  setCurrentPage('home');
                }
              }}
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded-lg cursor-pointer shrink-0"
            >
              Reset All Demo Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
