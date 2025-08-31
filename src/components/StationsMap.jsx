import React, { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useColorModeValue } from "@chakra-ui/react";

// Fix default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Helper component to auto-fit map bounds
function FitBounds({ stations }) {
  const map = useMap();
  useEffect(() => {
    if (!stations || stations.length === 0) return;
    const bounds = stations.map((s) => [s.latitude, s.longitude]);
    map.fitBounds(bounds, { padding: [50, 50] });
  }, [stations, map]);
  return null;
}

// Define line colors
const lineColors = {
  purple: "#9F7AEA",
  green: "#48BB78",
  blue: "#4299E1",
  red: "#F56565",
  yellow: "#ECC94B",
  pink: "#ED64A6",
  orange: "#ED8936",
};

// Create a colored SVG marker icon
function createLineIcon(color) {
  return L.divIcon({
    className: "",
    html: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
              <circle cx="12" cy="12" r="10" fill="${color}" stroke="white" stroke-width="2"/>
           </svg>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });
}

export default function StationsMap({ stations }) {
  if (!stations || stations.length === 0) return null;

  const center = [
    stations.reduce((sum, s) => sum + s.latitude, 0) / stations.length,
    stations.reduce((sum, s) => sum + s.longitude, 0) / stations.length,
  ];

  // Group stations by line to draw polylines
  const linesMap = {};
  stations.forEach((station) => {
    const stationLines = station.lines || [station.line];
    stationLines.forEach((line) => {
      if (!linesMap[line]) linesMap[line] = [];
      linesMap[line].push([station.latitude, station.longitude]);
    });
  });

  // Switch map theme based on Chakra UI color mode
  const tileUrl = useColorModeValue(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", // light mode
    "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" // dark mode
  );

  const tileAttribution = useColorModeValue(
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | &copy; <a href="https://www.carto.com/">CARTO</a>'
  );

  return (
    <MapContainer center={center} zoom={13} style={{ height: "300px", width: "100%" }}>
      <TileLayer attribution={tileAttribution} url={tileUrl} />

      {/* Station markers */}
      {stations.map((station) => {
        const isInterchange = station.lines && station.lines.length > 1;
        const color = isInterchange
          ? "#000000" // black for interchange
          : lineColors[station.line] || "gray";
        return (
          <Marker
            key={station.id}
            position={[station.latitude, station.longitude]}
            icon={createLineIcon(color)}
          >
            <Popup>
              <strong>{station.name}</strong>
              <br />
              Line: {isInterchange ? station.lines.join(", ") : station.line}
            </Popup>
          </Marker>
        );
      })}

      {/* Draw colored lines for each metro line */}
      {Object.entries(linesMap).map(([line, coords]) => (
        <Polyline
          key={line}
          positions={coords}
          color={lineColors[line] || "gray"}
          weight={4}
          opacity={1}
        />
      ))}

      <FitBounds stations={stations} />
    </MapContainer>
  );
}
