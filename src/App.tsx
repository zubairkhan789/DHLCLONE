import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { DemoDisclaimerBanner } from './components/DemoDisclaimerBanner';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/Toast';

// Pages
import { HomePage } from './pages/HomePage';
import { TrackingPage } from './pages/TrackingPage';
import { ShipNowPage } from './pages/ShipNowPage';
import { ServicesPage } from './pages/ServicesPage';
import { NewsPage } from './pages/NewsPage';
import { PostDetailPage } from './pages/PostDetailPage';
import { ProfilePage } from './pages/ProfilePage';
import { EditProfilePage } from './pages/EditProfilePage';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { AccountSettingsPage } from './pages/AccountSettingsPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

const AppContent: React.FC = () => {
  const { currentPage } = useApp();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'tracking':
        return <TrackingPage />;
      case 'ship-now':
        return <ShipNowPage />;
      case 'services':
        return <ServicesPage />;
      case 'news':
        return <NewsPage />;
      case 'post-detail':
        return <PostDetailPage />;
      case 'profile':
        return <ProfilePage />;
      case 'edit-profile':
        return <EditProfilePage />;
      case 'login':
        return <LoginPage />;
      case 'signup':
        return <SignUpPage />;
      case 'settings':
        return <AccountSettingsPage />;
      case 'admin':
        return <AdminDashboardPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <NotFoundPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-800 font-sans selection:bg-[#FFCC00] selection:text-black">
      <DemoDisclaimerBanner />
      <Header />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
