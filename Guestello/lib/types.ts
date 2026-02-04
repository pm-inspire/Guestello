export type City = {
  id: string;
  nameAr: string;
  nameEn: string;
  slug: string;
  country: "SA" | "EG";
};

export type ServiceCategory = {
  id: string;
  nameAr: string;
  nameEn: string;
  slug: "spa" | "dining" | "activities" | "hotels";
  descriptionAr: string;
  icon: string;
};

export type HotelService = {
  id: string;
  city: string;
  service: ServiceCategory["slug"];
  name: string;
  nameEn: string;
  hotelName: string;
  rating: number;
  priceRange: "SAR" | "SAR+" | "SAR++" | "SAR+++" | "VIP";
  image: string;
  crowd: "low" | "medium" | "high";
  tags: string[];
};

export type MenuItem = {
  id: string;
  serviceId: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

export type MenuGroup = {
  serviceId: string;
  items: MenuItem[];
};

export type AvailabilitySlot = {
  time: string;
  available: boolean;
};

export type AvailabilityDay = {
  date: string;
  slots: AvailabilitySlot[];
};

export type Availability = {
  serviceId: string;
  days: AvailabilityDay[];
};

export type Address = {
  id: string;
  label: string;
  city: string;
  street: string;
  details: string;
  phone: string;
};

export type Order = {
  id: string;
  type: "table" | "delivery";
  status: "Pending" | "Confirmed" | "Delivered" | "Cancelled";
  serviceName: string;
  hotelName: string;
  date: string;
  total: number;
};

export type NotificationItem = {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
};

export type UserProfile = {
  name: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  loyaltyTier?: string;
};

export type CartItem = {
  id: string;
  serviceId: string;
  name: string;
  price: number;
  qty: number;
  image: string;
};
