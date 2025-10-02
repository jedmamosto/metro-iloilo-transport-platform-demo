'use client';

import dynamic from 'next/dynamic';
import { useVehicleAnimation } from '@/hooks/useVehicleAnimation';
import ProgressBar from '@/components/ProgressBar';
import VehicleInfoPanel from '@/components/VehicleInfoPanel';

// Dynamically import FleetMap to avoid SSR issues with Leaflet
const FleetMap = dynamic(() => import('@/components/FleetMap'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading map...</p>
      </div>
    </div>
  ),
});

export default function Home() {
  const { progressPercentage, currentSpeed, totalDistance } = useVehicleAnimation();

  return (
    <div className="flex flex-col h-screen relative">
      {/* Progress Bar */}
      <ProgressBar progress={progressPercentage} />

      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 shadow-md z-[1000]">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              Metro Iloilo Transport Platform
            </h1>
            <p className="text-sm text-blue-100 mt-1">Real-time Fleet Monitoring System</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
            <p className="text-xs text-blue-100">Demo Mode</p>
            <p className="text-sm font-semibold">Diversion Road Route</p>
          </div>
        </div>
      </header>

      {/* Map Container */}
      <main className="flex-1 relative">
        <FleetMap />

        {/* Vehicle Info Panel */}
        <VehicleInfoPanel
          vehicleId="Bus 001"
          routeName="Smallville - Taft North"
          progress={progressPercentage}
          currentSpeed={currentSpeed}
          totalDistance={totalDistance}
          status="active"
        />
      </main>
    </div>
  );
}
