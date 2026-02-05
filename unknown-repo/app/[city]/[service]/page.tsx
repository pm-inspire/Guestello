import { mockCities, mockServices } from "@/lib/data";
import { ServiceListClient } from "./service-list-client";

export function generateStaticParams() {
  const cities = mockCities;
  const services = mockServices;
  
  return cities.flatMap((city) =>
    services.map((service) => ({
      city: city.slug,
      service: service.slug,
    }))
  );
}

export default function ServiceListPage() {
  return <ServiceListClient />;
}
