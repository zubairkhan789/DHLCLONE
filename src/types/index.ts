export type ShipmentStatus = 
  | 'Shipment Created'
  | 'Picked Up'
  | 'In Transit'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Exception / On Hold';

export interface Checkpoint {
  id: string;
  status: ShipmentStatus;
  location: string;
  timestamp: string;
  description: string;
  facilityType?: 'Origin Sorting' | 'International Hub' | 'Customs' | 'Local Delivery Station' | 'Destination Customer';
}

export interface Shipment {
  id: string; // Tracking number, e.g. "DHL-849201938-US"
  bookingReference: string; // e.g. "BK-2026-90412"
  createdAt: string;
  sender: {
    name: string;
    company?: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  receiver: {
    name: string;
    company?: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  packageDetails: {
    type: 'Document' | 'Parcel / Box' | 'Freight / Pallet';
    weightKg: number;
    dimensionsCm: {
      length: number;
      width: number;
      height: number;
    };
    description: string;
    declaredValueUsd: number;
    pieces: number;
  };
  service: {
    id: string;
    name: string;
    deliveryEstimate: string;
    basePrice: number;
    totalPrice: number;
    addOns: string[];
  };
  currentStatus: ShipmentStatus;
  origin: string;
  destination: string;
  estimatedDelivery: string;
  checkpoints: Checkpoint[];
  signedBy?: string;
  deliveredAt?: string;
  userId?: string;
}

export interface Comment {
  id: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  content: string;
  createdAt: string;
  likes: number;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  category: 'Website Project Updates' | 'Shipping and Logistics' | 'Technology and Innovation' | 'Sustainability' | 'Company Updates';
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  authorBio?: string;
  createdAt: string;
  imageUrl?: string;
  likes: number;
  likedByCurrentUser?: boolean;
  comments: Comment[];
  tags: string[];
  featured?: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  role: string;
  bio: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  avatar: string;
  joinedDate: string;
  company?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'shipment' | 'post' | 'system';
  trackingNumber?: string;
  postId?: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  tagline: string;
  category: 'Express' | 'Freight' | 'Supply Chain' | 'eCommerce';
  deliverySpeed: string;
  description: string;
  features: string[];
  idealFor: string;
  baseRatePerKg: number;
  iconName: string;
  badge?: string;
}
