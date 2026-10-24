import React, { createContext, useContext, useState, useEffect } from 'react';
import { Shipment, Post, UserProfile, NotificationItem, ShipmentStatus, Checkpoint } from '../types';
import { INITIAL_USER, INITIAL_POSTS, INITIAL_SHIPMENTS, INITIAL_NOTIFICATIONS } from '../data/initialData';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title?: string;
  message: string;
}

interface AppContextType {
  currentUser: UserProfile | null;
  shipments: Shipment[];
  posts: Post[];
  notifications: NotificationItem[];
  recentSearches: string[];
  toasts: ToastMessage[];
  // Navigation helper
  currentPage: string;
  setCurrentPage: (page: string) => void;
  selectedPostId: string | null;
  setSelectedPostId: (id: string | null) => void;
  activeTrackingId: string | null;
  setActiveTrackingId: (id: string | null) => void;
  // Shipment actions
  trackShipment: (idOrRef: string) => Shipment | undefined;
  createBooking: (bookingData: {
    sender: Shipment['sender'];
    receiver: Shipment['receiver'];
    packageDetails: Shipment['packageDetails'];
    service: Shipment['service'];
  }) => Shipment;
  advanceShipmentStatus: (trackingNumber: string) => Shipment | null;
  updateShipmentStatus: (
    trackingNumber: string,
    status: ShipmentStatus,
    location: string,
    description: string
  ) => Shipment | null;
  deleteShipment: (trackingNumber: string) => void;
  // Post actions
  createPost: (postData: {
    title: string;
    content: string;
    category: Post['category'];
    imageUrl?: string;
    tags: string[];
  }) => Post;
  updatePost: (
    postId: string,
    data: { title: string; content: string; category: Post['category']; imageUrl?: string; tags: string[] }
  ) => void;
  deletePost: (postId: string) => void;
  toggleLikePost: (postId: string) => void;
  addComment: (postId: string, text: string) => void;
  deleteComment: (postId: string, commentId: string) => void;
  // Profile & Auth
  updateProfile: (updated: Partial<UserProfile>) => void;
  loginAsZubair: () => void;
  loginUser: (email: string, name?: string) => void;
  logoutUser: () => void;
  // Notifications
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  // System
  resetDemoData: () => void;
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error', title?: string) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const SHIPMENTS_STORAGE_KEY = 'dhl_demo_shipments_v2';
const POSTS_STORAGE_KEY = 'dhl_demo_posts_v2';
const USER_STORAGE_KEY = 'dhl_demo_user_v2';
const NOTIFS_STORAGE_KEY = 'dhl_demo_notifs_v2';
const SEARCHES_STORAGE_KEY = 'dhl_demo_searches_v2';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation state
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [activeTrackingId, setActiveTrackingId] = useState<string | null>(null);

  // User state
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_USER;
    } catch {
      return INITIAL_USER;
    }
  });

  // Shipments state
  const [shipments, setShipments] = useState<Shipment[]>(() => {
    try {
      const saved = localStorage.getItem(SHIPMENTS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_SHIPMENTS;
    } catch {
      return INITIAL_SHIPMENTS;
    }
  });

  // Posts state
  const [posts, setPosts] = useState<Post[]>(() => {
    try {
      const saved = localStorage.getItem(POSTS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_POSTS;
    } catch {
      return INITIAL_POSTS;
    }
  });

  // Notifications state
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const saved = localStorage.getItem(NOTIFS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  // Recent Searches
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(SEARCHES_STORAGE_KEY);
      return saved ? JSON.parse(saved) : ['DHL-849201938-US', 'DHL-992014812-DE', 'DHL-338291045-GB'];
    } catch {
      return ['DHL-849201938-US', 'DHL-992014812-DE', 'DHL-338291045-GB'];
    }
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(SHIPMENTS_STORAGE_KEY, JSON.stringify(shipments));
  }, [shipments]);

  useEffect(() => {
    localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem(NOTIFS_STORAGE_KEY, JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(SEARCHES_STORAGE_KEY, JSON.stringify(recentSearches));
  }, [recentSearches]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info', title?: string) => {
    const id = 'toast-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4);
    setToasts((prev) => [...prev, { id, message, type, title }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const trackShipment = (idOrRef: string): Shipment | undefined => {
    if (!idOrRef) return undefined;
    const cleanQuery = idOrRef.trim().toUpperCase();
    const found = shipments.find(
      (s) => s.id.toUpperCase() === cleanQuery || s.bookingReference.toUpperCase() === cleanQuery
    );
    if (found) {
      // Add to recent searches if not already there
      setRecentSearches((prev) => {
        const filtered = prev.filter((item) => item.toUpperCase() !== found.id.toUpperCase());
        return [found.id, ...filtered].slice(0, 6);
      });
    }
    return found;
  };

  const createBooking = (bookingData: {
    sender: Shipment['sender'];
    receiver: Shipment['receiver'];
    packageDetails: Shipment['packageDetails'];
    service: Shipment['service'];
  }): Shipment => {
    const randomDigits = Math.floor(100000000 + Math.random() * 900000000);
    const countryCode = bookingData.receiver.country.slice(0, 2).toUpperCase() || 'US';
    const trackingId = `DHL-${randomDigits}-${countryCode}`;
    const bookingRef = `BK-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const nowIso = new Date().toISOString();

    // calculate estimated delivery: 2 days from now
    const estDeliveryDate = new Date();
    estDeliveryDate.setDate(estDeliveryDate.getDate() + 2);
    estDeliveryDate.setHours(17, 0, 0, 0);

    const initialCheckpoint: Checkpoint = {
      id: 'cp-' + Date.now(),
      status: 'Shipment Created',
      location: `${bookingData.sender.city}, ${bookingData.sender.country}`,
      timestamp: nowIso,
      description: 'Shipment booking confirmed. Shipping label and commercial invoice generated.',
      facilityType: 'Origin Sorting',
    };

    const newShipment: Shipment = {
      id: trackingId,
      bookingReference: bookingRef,
      createdAt: nowIso,
      userId: currentUser?.id,
      sender: bookingData.sender,
      receiver: bookingData.receiver,
      packageDetails: bookingData.packageDetails,
      service: bookingData.service,
      currentStatus: 'Shipment Created',
      origin: `${bookingData.sender.city}, ${bookingData.sender.country}`,
      destination: `${bookingData.receiver.city}, ${bookingData.receiver.country}`,
      estimatedDelivery: estDeliveryDate.toISOString(),
      checkpoints: [initialCheckpoint],
    };

    setShipments((prev) => [newShipment, ...prev]);

    // Add a notification
    const newNotif: NotificationItem = {
      id: 'notif-' + Date.now(),
      title: 'New Shipment Booked',
      message: `Your booking #${bookingRef} with tracking #${trackingId} has been confirmed.`,
      timestamp: nowIso,
      read: false,
      type: 'shipment',
      trackingNumber: trackingId,
    };
    setNotifications((prev) => [newNotif, ...prev]);

    showToast(`Shipment booked successfully! Tracking: ${trackingId}`, 'success', 'Booking Confirmed');
    return newShipment;
  };

  const advanceShipmentStatus = (trackingNumber: string): Shipment | null => {
    const shipment = shipments.find((s) => s.id === trackingNumber);
    if (!shipment) return null;

    const statusOrder: ShipmentStatus[] = [
      'Shipment Created',
      'Picked Up',
      'In Transit',
      'Out for Delivery',
      'Delivered',
    ];

    const currentIndex = statusOrder.indexOf(shipment.currentStatus);
    if (currentIndex === -1 || currentIndex >= statusOrder.length - 1) {
      showToast(`Shipment is already at final state: ${shipment.currentStatus}`, 'info');
      return shipment;
    }

    const nextStatus = statusOrder[currentIndex + 1];
    const nowIso = new Date().toISOString();

    let newLocation = shipment.origin;
    let description = `Status updated to ${nextStatus}`;
    let facility: Checkpoint['facilityType'] = 'International Hub';

    if (nextStatus === 'Picked Up') {
      newLocation = `${shipment.sender.city} Express Station - ${shipment.sender.country}`;
      description = 'Package collected by DHL Express courier vehicle.';
      facility = 'Origin Sorting';
    } else if (nextStatus === 'In Transit') {
      newLocation = 'DHL Global Hub Leipzig / Cincinnati Gateway';
      description = 'Customs documentation verified. Dispatched on international air transport flight.';
      facility = 'International Hub';
    } else if (nextStatus === 'Out for Delivery') {
      newLocation = `${shipment.receiver.city} Delivery Depot - ${shipment.receiver.country}`;
      description = 'With local delivery courier on route. Expected today.';
      facility = 'Local Delivery Station';
    } else if (nextStatus === 'Delivered') {
      newLocation = `${shipment.receiver.city}, ${shipment.receiver.country}`;
      description = `Delivered to recipient address and signed by ${shipment.receiver.name}.`;
      facility = 'Destination Customer';
    }

    const newCheckpoint: Checkpoint = {
      id: 'cp-' + Date.now(),
      status: nextStatus,
      location: newLocation,
      timestamp: nowIso,
      description,
      facilityType: facility,
    };

    const updatedShipment: Shipment = {
      ...shipment,
      currentStatus: nextStatus,
      checkpoints: [...shipment.checkpoints, newCheckpoint],
      deliveredAt: nextStatus === 'Delivered' ? nowIso : shipment.deliveredAt,
      signedBy: nextStatus === 'Delivered' ? shipment.receiver.name : shipment.signedBy,
    };

    setShipments((prev) => prev.map((s) => (s.id === trackingNumber ? updatedShipment : s)));

    // Send notification
    const notif: NotificationItem = {
      id: 'notif-' + Date.now(),
      title: `Shipment ${nextStatus}`,
      message: `Shipment #${shipment.id} is now ${nextStatus} (${newLocation}).`,
      timestamp: nowIso,
      read: false,
      type: 'shipment',
      trackingNumber: shipment.id,
    };
    setNotifications((prev) => [notif, ...prev]);

    showToast(`Shipment #${trackingNumber} advanced to "${nextStatus}"!`, 'success', 'Status Simulated');
    return updatedShipment;
  };

  const updateShipmentStatus = (
    trackingNumber: string,
    status: ShipmentStatus,
    location: string,
    description: string
  ): Shipment | null => {
    const shipment = shipments.find((s) => s.id === trackingNumber);
    if (!shipment) return null;

    const nowIso = new Date().toISOString();
    const newCheckpoint: Checkpoint = {
      id: 'cp-' + Date.now(),
      status,
      location,
      timestamp: nowIso,
      description,
    };

    const updated: Shipment = {
      ...shipment,
      currentStatus: status,
      checkpoints: [...shipment.checkpoints, newCheckpoint],
      deliveredAt: status === 'Delivered' ? nowIso : shipment.deliveredAt,
      signedBy: status === 'Delivered' ? shipment.receiver.name : shipment.signedBy,
    };

    setShipments((prev) => prev.map((s) => (s.id === trackingNumber ? updated : s)));
    showToast(`Shipment ${trackingNumber} updated to ${status}`, 'success');
    return updated;
  };

  const deleteShipment = (trackingNumber: string) => {
    setShipments((prev) => prev.filter((s) => s.id !== trackingNumber));
    showToast(`Shipment #${trackingNumber} removed from demo records`, 'info');
  };

  const createPost = (postData: {
    title: string;
    content: string;
    category: Post['category'];
    imageUrl?: string;
    tags: string[];
  }): Post => {
    const newPost: Post = {
      id: 'post-' + Date.now(),
      title: postData.title,
      content: postData.content,
      category: postData.category,
      authorName: currentUser?.name || 'Zubair WebsiteWala',
      authorRole: currentUser?.role || 'Demo User & Website Creator',
      authorAvatar:
        currentUser?.avatar ||
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      authorBio: currentUser?.bio || 'Exploring AI, technology, web development, and digital innovation.',
      createdAt: new Date().toISOString(),
      imageUrl: postData.imageUrl,
      likes: 0,
      likedByCurrentUser: false,
      tags: postData.tags.length > 0 ? postData.tags : ['DHLClone', 'LogisticsUpdate'],
      comments: [],
    };

    setPosts((prev) => [newPost, ...prev]);
    showToast('New post published successfully!', 'success');
    return newPost;
  };

  const updatePost = (
    postId: string,
    data: { title: string; content: string; category: Post['category']; imageUrl?: string; tags: string[] }
  ) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              title: data.title,
              content: data.content,
              category: data.category,
              imageUrl: data.imageUrl ?? p.imageUrl,
              tags: data.tags,
            }
          : p
      )
    );
    showToast('Post updated successfully!', 'success');
  };

  const deletePost = (postId: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
    showToast('Post deleted', 'info');
  };

  const toggleLikePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const currentlyLiked = p.likedByCurrentUser ?? false;
          return {
            ...p,
            likes: currentlyLiked ? p.likes - 1 : p.likes + 1,
            likedByCurrentUser: !currentlyLiked,
          };
        }
        return p;
      })
    );
  };

  const addComment = (postId: string, text: string) => {
    if (!text.trim()) return;
    const newComment = {
      id: 'c-' + Date.now(),
      authorName: currentUser?.name || 'Demo Visitor',
      authorRole: currentUser?.role || 'Community Member',
      authorAvatar:
        currentUser?.avatar ||
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=160&q=80',
      content: text.trim(),
      createdAt: new Date().toISOString(),
      likes: 0,
    };

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            comments: [...p.comments, newComment],
          };
        }
        return p;
      })
    );
    showToast('Comment posted!', 'success');
  };

  const deleteComment = (postId: string, commentId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            comments: p.comments.filter((c) => c.id !== commentId),
          };
        }
        return p;
      })
    );
    showToast('Comment removed', 'info');
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, ...updated };
    setCurrentUser(updatedUser);

    // Also update any posts created by this user
    setPosts((prev) =>
      prev.map((p) => {
        if (p.authorName === currentUser.name) {
          return {
            ...p,
            authorName: updatedUser.name,
            authorRole: updatedUser.role,
            authorBio: updatedUser.bio,
            authorAvatar: updatedUser.avatar,
          };
        }
        return p;
      })
    );

    showToast('Profile updated successfully!', 'success');
  };

  const loginAsZubair = () => {
    setCurrentUser(INITIAL_USER);
    showToast('Signed in as Zubair WebsiteWala (Demo Creator)', 'success');
  };

  const loginUser = (email: string, name?: string) => {
    const newUser: UserProfile = {
      id: 'user-' + Date.now(),
      name: name || email.split('@')[0],
      role: 'Registered Shipper',
      bio: 'DHL Clone demo user exploring fast courier and logistics solutions.',
      email,
      phone: '+1 (555) 019-2831',
      address: '742 Evergreen Terrace',
      city: 'Seattle, WA',
      country: 'United States',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
      joinedDate: 'October 2026',
    };
    setCurrentUser(newUser);
    showToast(`Welcome back, ${newUser.name}!`, 'success');
  };

  const logoutUser = () => {
    setCurrentUser(null);
    showToast('You have been logged out.', 'info');
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  };

  const resetDemoData = () => {
    localStorage.removeItem(SHIPMENTS_STORAGE_KEY);
    localStorage.removeItem(POSTS_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem(NOTIFS_STORAGE_KEY);
    localStorage.removeItem(SEARCHES_STORAGE_KEY);

    setCurrentUser(INITIAL_USER);
    setShipments(INITIAL_SHIPMENTS);
    setPosts(INITIAL_POSTS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setRecentSearches(['DHL-849201938-US', 'DHL-992014812-DE', 'DHL-338291045-GB']);

    showToast('Demo data reset to fresh default state!', 'info', 'Data Reset');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        shipments,
        posts,
        notifications,
        recentSearches,
        toasts,
        currentPage,
        setCurrentPage,
        selectedPostId,
        setSelectedPostId,
        activeTrackingId,
        setActiveTrackingId,
        trackShipment,
        createBooking,
        advanceShipmentStatus,
        updateShipmentStatus,
        deleteShipment,
        createPost,
        updatePost,
        deletePost,
        toggleLikePost,
        addComment,
        deleteComment,
        updateProfile,
        loginAsZubair,
        loginUser,
        logoutUser,
        markNotificationRead,
        markAllNotificationsRead,
        resetDemoData,
        showToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
