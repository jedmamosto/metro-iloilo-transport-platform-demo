"use client";

import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  CircleMarker,
  useMap,
} from "react-leaflet";
import { useEffect } from "react";
import { createBusIcon } from "./BusIcon";
import { useVehicleAnimation } from "@/hooks/useVehicleAnimation";
import type { LatLngExpression, LatLngBounds } from "leaflet";
import { latLngBounds } from "leaflet";

// Route center for initial view
const ROUTE_CENTER: LatLngExpression = [10.712, 122.551];
const DEFAULT_ZOOM = 15;

// Component to fit map to route bounds (only on initial mount)
function FitBounds({ bounds }: { bounds: LatLngBounds }) {
  const map = useMap();

  useEffect(() => {
    if (bounds) {
      // Only fit bounds once on mount, then allow user interaction
      map.fitBounds(bounds, { padding: [80, 80], maxZoom: 15 });
    }
    // Empty dependency array - only run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

export default function FleetMap() {
  const { currentPosition, traveledPath, upcomingPath, rotation, fullRoute } = useVehicleAnimation();

  // Calculate bounds to fit entire route
  const routeBounds = latLngBounds(fullRoute);

  return (
    <MapContainer
      center={ROUTE_CENTER}
      zoom={DEFAULT_ZOOM}
      style={{ height: "100%", width: "100%" }}
      zoomControl={true}
    >
      {/* CartoDB Positron tiles - clean, professional look */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        subdomains="abcd"
        maxZoom={20}
      />

      {/* Fit map to route */}
      <FitBounds bounds={routeBounds} />

      {/* Start point marker (blue circle with pulse) */}
      <CircleMarker
        center={fullRoute[0]}
        radius={10}
        pathOptions={{
          color: "#3B82F6",
          fillColor: "#3B82F6",
          fillOpacity: 0.8,
          weight: 3,
        }}
      />

      {/* End point marker (red pin) */}
      <CircleMarker
        center={fullRoute[fullRoute.length - 1]}
        radius={10}
        pathOptions={{
          color: "#EF4444",
          fillColor: "#EF4444",
          fillOpacity: 0.9,
          weight: 3,
        }}
      />

      {/* Traveled path (gray/faded) */}
      {traveledPath.length > 1 && (
        <Polyline
          positions={traveledPath}
          pathOptions={{
            color: "#9CA3AF",
            weight: 6,
            opacity: 0.7,
            lineCap: "round",
            lineJoin: "round",
          }}
        />
      )}

      {/* Upcoming path (vibrant emerald green) */}
      {upcomingPath.length > 0 && (
        <Polyline
          positions={upcomingPath}
          pathOptions={{
            color: "#10B981",
            weight: 6,
            opacity: 1,
            lineCap: "round",
            lineJoin: "round",
          }}
        />
      )}

      {/* Moving bus marker with rotation */}
      <Marker position={currentPosition} icon={createBusIcon(rotation)} />
    </MapContainer>
  );
}
