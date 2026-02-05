import { mockHotels } from "@/lib/data";
import { ServiceDetailsClient } from "./service-details-client";

export function generateStaticParams() {
  return mockHotels.map((hotel) => ({
    city: hotel.city,
    service: hotel.service,
    id: hotel.id,
  }));
}

export default function ServiceDetailsPage() {
  return <ServiceDetailsClient />;
}
