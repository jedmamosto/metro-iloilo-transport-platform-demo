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
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 sm:px-6 py-3 sm:py-4 shadow-md z-[1000]">
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h1 className="text-lg sm:text-2xl font-bold truncate">
              Metro Iloilo
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 mt-0.5 sm:mt-1 hidden sm:block">Real-time Fleet Monitoring</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg flex-shrink-0">
            <p className="text-[10px] sm:text-xs text-blue-100">Demo Mode</p>
            <p className="text-xs sm:text-sm font-semibold whitespace-nowrap">Diversion Rd</p>
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
