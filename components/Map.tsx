import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { Leaf } from 'lucide-react'
import ContractInteraction from './ContractInteraction'
import { encryptWasteData, submitEncryptedWasteData, performDataAnalysis } from '@/utils/litProtocol'
import { useSessionSigs } from '@/hooks/useSessionSigs'

interface WastePoint {
  id: string;
  location: [number, number];
  quantity: number;
  timestamp: Date;
}

interface Insight {
  totalWaste: number;
  averageQuantity: number;
  lastUpdated: Date;
  hotspotLocations: Array<{
    location: [number, number];
    wasteAmount: number;
  }>;
}

// Custom leaf icon
const leafIcon = new L.Icon({
  iconUrl: '/leaflet/leaf-green.png',
  shadowUrl: '/leaflet/leaf-shadow.png',
  iconSize: [38, 95],
  shadowSize: [50, 64],
  iconAnchor: [22, 94],
  shadowAnchor: [4, 62],
  popupAnchor: [-3, -76]
})

export default function Map() {
  const [wastePoints, setWastePoints] = useState<WastePoint[]>([]);
  const [insights, setInsights] = useState<Insight | null>(null);
  const sessionSigs = useSessionSigs();

  useEffect(() => {
    const fetchWastePoints = async () => {
      // Implement fetching logic from your backend or IPFS
    };

    fetchWastePoints();
  }, []);

  const handleWasteReport = async (location: [number, number], quantity: number) => {
    const wasteData = { location, quantity };
    const encryptedData = await encryptWasteData(wasteData);
    await submitEncryptedWasteData(encryptedData);
    // Refresh the map or add the new point
    await updateInsights();
  };

  const updateInsights = async () => {
    if (sessionSigs) {
      const newInsights = await performDataAnalysis(sessionSigs);
      setInsights(newInsights);
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] w-full">
      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={5}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {wastePoints.map((point, index) => (
          <Marker key={point.id} position={point.location} icon={leafIcon}>
            <Popup>
              <div>
                <p>Quantity: {point.quantity}</p>
                <p>Time: {point.timestamp.toLocaleString()}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}