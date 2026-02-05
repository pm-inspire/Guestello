import { mockOrders } from "@/lib/data";
import { OrderSuccessClient } from "./order-success-client";

export function generateStaticParams() {
  return mockOrders.map((order) => ({
    id: order.id,
  }));
}

export default function OrderSuccessPage() {
  return <OrderSuccessClient />;
}
