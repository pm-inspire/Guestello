"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
} from "react";
import { mockAddresses, mockNotifications, mockOrders } from "@/lib/data";
import type {
  Address,
  NotificationItem,
  Order,
  UserProfile,
} from "@/lib/types";
import { useLocalStorage } from "@/hooks/use-local-storage";

type UserState = {
  profile: UserProfile;
  addresses: Address[];
  orders: Order[];
  notifications: NotificationItem[];
};

type UserContextValue = UserState & {
  updateProfile: (profile: Partial<UserProfile>) => void;
  addAddress: (address: Address) => void;
  removeAddress: (id: string) => void;
  addOrder: (order: Order) => void;
  updateOrderStatus: (id: string, status: Order["status"]) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  unreadCount: number;
  isLoaded: boolean;
};

const defaultState: UserState = {
  profile: {
    name: "سارة العتيبي",
    email: "sara@example.com",
    phone: "+966512345678",
    loyaltyTier: "Gold",
  },
  addresses: mockAddresses,
  orders: mockOrders,
  notifications: mockNotifications,
};

const UserContext = createContext<UserContextValue | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [state, setState, isLoaded] = useLocalStorage<UserState>(
    "hsmp_user",
    defaultState
  );

  const updateProfile = useCallback(
    (profile: Partial<UserProfile>) => {
      setState((prev) => ({ ...prev, profile: { ...prev.profile, ...profile } }));
    },
    [setState]
  );

  const addAddress = useCallback(
    (address: Address) => {
      setState((prev) => ({
        ...prev,
        addresses: [address, ...prev.addresses],
      }));
    },
    [setState]
  );

  const removeAddress = useCallback(
    (id: string) => {
      setState((prev) => ({
        ...prev,
        addresses: prev.addresses.filter((address) => address.id !== id),
      }));
    },
    [setState]
  );

  const addOrder = useCallback(
    (order: Order) => {
      setState((prev) => ({
        ...prev,
        orders: [order, ...prev.orders],
      }));
    },
    [setState]
  );

  const updateOrderStatus = useCallback(
    (id: string, status: Order["status"]) => {
      setState((prev) => ({
        ...prev,
        orders: prev.orders.map((order) =>
          order.id === id ? { ...order, status } : order
        ),
      }));
    },
    [setState]
  );

  const markNotificationRead = useCallback(
    (id: string) => {
      setState((prev) => ({
        ...prev,
        notifications: prev.notifications.map((notif) =>
          notif.id === id ? { ...notif, read: true } : notif
        ),
      }));
    },
    [setState]
  );

  const markAllNotificationsRead = useCallback(() => {
    setState((prev) => ({
      ...prev,
      notifications: prev.notifications.map((notif) => ({
        ...notif,
        read: true,
      })),
    }));
  }, [setState]);

  const unreadCount = useMemo(
    () => state.notifications.filter((notif) => !notif.read).length,
    [state.notifications]
  );

  const value = useMemo(
    () => ({
      ...state,
      updateProfile,
      addAddress,
      removeAddress,
      addOrder,
      updateOrderStatus,
      markNotificationRead,
      markAllNotificationsRead,
      unreadCount,
      isLoaded,
    }),
    [
      addAddress,
      addOrder,
      markAllNotificationsRead,
      markNotificationRead,
      removeAddress,
      state,
      unreadCount,
      updateOrderStatus,
      updateProfile,
      isLoaded,
    ]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
}
