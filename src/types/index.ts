export type Page = 'home' | 'marketplace' | 'farms' | 'subscriptions' | 'profile' | 'about' | 'contact';

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: 'Vegetables' | 'Fruits' | 'Dairy & Eggs' | 'Meat & Poultry' | 'Bakery & Pantry';
  price: number;
  unit: string;
  farmId: string;
  farmName: string;
  description: string;
  organic: boolean;
  inStock: boolean;
  rating: number;
  reviewsCount: number;
  calories?: string;
  origin: string;
  harvestDate?: string;
  nutrition?: {
    servingSize: string;
    protein?: string;
    fiber?: string;
    vitamins?: string[];
  };
  tags: string[];
  imageCategory: 'spinach' | 'apples' | 'eggs' | 'beef' | 'tomatoes' | 'corn' | 'honey' | 'sourdough' | 'chicken' | 'carrots' | 'butter' | 'berries';
}

export interface Farm {
  id: string;
  name: string;
  slug: string;
  location: string;
  state: string;
  distanceMiles: number;
  farmerName: string;
  farmerRole: string;
  farmerBio: string;
  story: string;
  practices: string[];
  certifications: string[];
  acreage: number;
  establishedYear: number;
  crops: string[];
  coordinates: { x: number; y: number; lat: number; lng: number }; // percentage coords on stylized map
  imageStyle: 'vegetable_field' | 'orchard' | 'pasture' | 'ranch' | 'greenhouse';
}

export interface SubscriptionPlan {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  frequency: 'Weekly' | 'Bi-Weekly' | 'Monthly';
  itemsIncluded: string[];
  suitableFor: string;
  popular?: boolean;
  boxType: 'veggie' | 'fruit' | 'meat_dairy' | 'complete';
}

export interface UserSubscription {
  id: string;
  planId: string;
  planTitle: string;
  status: 'Active' | 'Paused';
  frequency: 'Weekly' | 'Bi-Weekly' | 'Monthly';
  boxSize: 'Solo (1-2)' | 'Family (3-5)' | 'Harvest Feast (5+)';
  nextDeliveryDate: string;
  pauseStartDate?: string;
  pauseEndDate?: string;
  customAddons: string[];
  excludedItems: string[];
  price: number;
}

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  unit: string;
  farmName: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: 'Delivered' | 'In Transit' | 'Processing';
  deliveryDate: string;
  shippingAddress: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  membershipTier: string;
  memberSince: string;
  carbonOffsetKg: number;
  localFarmsSupported: number;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  billingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ContactSubmission {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}
