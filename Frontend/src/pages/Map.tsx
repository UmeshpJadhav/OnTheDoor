import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-control-geocoder";

const Map: React.FC = () => {
  const [startLatLng, setStartLatLng] = useState<L.LatLng | null>(null);
  const [endLatLng, setEndLatLng] = useState<L.LatLng | null>(null);
  const [map, setMap] = useState<L.Map | null>(null);
  const [routingControl, setRoutingControl] = useState<L.Routing.Control | null>(null);

  useEffect(() => {
    // Initialize map
    const newMap = L.map("map").setView([20.5937, 78.9629], 5); // Centered on India
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(newMap);
    setMap(newMap);

    // Track user location
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const newLatLng = L.latLng(position.coords.latitude, position.coords.longitude);
          setStartLatLng(newLatLng);
          L.marker(newLatLng).addTo(newMap).bindPopup("You are here").openPopup();
          newMap.setView(newLatLng, 13);
        },
        (error) => console.error("Location Error:", error),
        { enableHighAccuracy: true, timeout: 30000, maximumAge: 0 }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }

    return () => {
      newMap.remove();
    };
  }, []);

  const generateRoute = () => {
    if (!map || !startLatLng || !endLatLng) {
      alert("Please select valid locations.");
      return;
    }

    // Remove existing route
    if (routingControl) {
      map.removeControl(routingControl);
    }

    // Add new route
    const newRoutingControl = L.Routing.control({
      waypoints: [startLatLng, endLatLng],
      routeWhileDragging: true,
    }).addTo(map);
    setRoutingControl(newRoutingControl);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Destination Input */}
      <form method="post" action="/order/address/orderId">
        <label htmlFor="end">Destination:</label>
        <input
          type="text"
          id="end"
          name="address"
          placeholder="Enter destination"
          className="border p-2 w-full mt-2"
          onChange={(e) => setEndLatLng(L.latLng(28.6139, 77.2090))} // Placeholder for API-based geocoding
        />
        <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
          Get Order
        </button>
      </form>

      {/* Map Container */}
      <div id="map" className="mt-4 w-full h-96"></div>
    </div>
  );
};

export default Map;
