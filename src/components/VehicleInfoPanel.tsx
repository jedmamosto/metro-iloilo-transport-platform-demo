'use client';

import { useState } from 'react';

interface VehicleInfoPanelProps {
  vehicleId: string;
  routeName: string;
  progress: number;
  currentSpeed: number;
  totalDistance: number;
  status: 'active' | 'idle' | 'offline';
}

export default function VehicleInfoPanel({
  vehicleId,
  routeName,
  progress,
  currentSpeed,
  totalDistance,
  status,
}: VehicleInfoPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const traveledDistance = (totalDistance * progress) / 100;
  const remainingDistance = totalDistance - traveledDistance;

  const statusColors = {
    active: 'bg-green-500',
    idle: 'bg-yellow-500',
    offline: 'bg-gray-500',
  };

  const statusLabels = {
    active: 'Live Tracking',
    idle: 'Idle',
    offline: 'Offline',
  };

  return (
    <>
      {/* Desktop: Top-left panel */}
      <div className="hidden md:block absolute top-20 left-6 z-[1000] w-80">
        <div className="bg-white/95 backdrop-blur-md rounded-lg shadow-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-semibold text-lg">{vehicleId}</h3>
              <p className="text-blue-100 text-sm">{routeName}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${statusColors[status]} animate-pulse`}></span>
              <span className="text-white text-sm font-medium">{statusLabels[status]}</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="p-4 space-y-3">
          {/* Progress */}
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Trip Progress</span>
              <span className="font-semibold text-gray-900">{progress.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-green-500 to-emerald-500 h-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Distance */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-500 mb-1">Traveled</p>
              <p className="text-lg font-semibold text-gray-900">
                {(traveledDistance / 1000).toFixed(2)} km
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-500 mb-1">Remaining</p>
              <p className="text-lg font-semibold text-gray-900">
                {(remainingDistance / 1000).toFixed(2)} km
              </p>
            </div>
          </div>

          {/* Speed */}
          <div className="flex items-center justify-between bg-blue-50 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <span className="text-sm text-gray-600">Current Speed</span>
            </div>
            <span className="text-xl font-bold text-blue-600">{currentSpeed} km/h</span>
          </div>

          {/* Location Badge */}
          <div className="flex items-start gap-2 pt-2 border-t border-gray-200">
            <svg
              className="w-5 h-5 text-gray-400 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <div>
              <p className="text-xs text-gray-500">Current Location</p>
              <p className="text-sm text-gray-700 font-medium">Diversion Road, Mandurriao</p>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Mobile: Bottom sheet */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[1000]">
        {/* Drag handle / Collapsed view */}
        <div
          className="bg-white/95 backdrop-blur-md border-t-2 border-gray-200 px-4 py-3 cursor-pointer active:bg-gray-50 transition-colors"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {/* Drag indicator */}
          <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-3"></div>

          {/* Compact info */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <span className={`w-2.5 h-2.5 rounded-full ${statusColors[status]} animate-pulse flex-shrink-0`}></span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-900 truncate">{vehicleId}</p>
                <p className="text-xs text-gray-600 truncate">{routeName}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0">
              <div className="text-right">
                <p className="text-xs text-gray-500">Speed</p>
                <p className="text-sm font-bold text-blue-600">{currentSpeed} km/h</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Progress</p>
                <p className="text-sm font-bold text-gray-900">{progress.toFixed(0)}%</p>
              </div>
              <svg
                className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Expanded content */}
        <div
          className={`bg-white/95 backdrop-blur-md border-t border-gray-200 overflow-hidden transition-all duration-300 ${
            isExpanded ? 'max-h-[70vh] overflow-y-auto' : 'max-h-0'
          }`}
        >
          <div className="p-4 space-y-3 pb-6">
            {/* Status badge */}
            <div className="flex items-center justify-center gap-2 bg-blue-50 rounded-lg py-2">
              <span className={`w-2 h-2 rounded-full ${statusColors[status]} animate-pulse`}></span>
              <span className="text-sm font-medium text-gray-700">{statusLabels[status]}</span>
            </div>

            {/* Progress */}
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Trip Progress</span>
                <span className="font-semibold text-gray-900">{progress.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Distance cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <p className="text-xs text-gray-500 mb-1">Traveled</p>
                <p className="text-xl font-bold text-gray-900">
                  {(traveledDistance / 1000).toFixed(1)}
                </p>
                <p className="text-xs text-gray-500">km</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <p className="text-xs text-gray-500 mb-1">Remaining</p>
                <p className="text-xl font-bold text-gray-900">
                  {(remainingDistance / 1000).toFixed(1)}
                </p>
                <p className="text-xs text-gray-500">km</p>
              </div>
            </div>

            {/* Speed indicator */}
            <div className="flex items-center justify-between bg-blue-50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <span className="text-sm text-gray-600">Current Speed</span>
              </div>
              <span className="text-2xl font-bold text-blue-600">{currentSpeed} km/h</span>
            </div>

            {/* Location */}
            <div className="flex items-start gap-3 pt-3 border-t border-gray-200">
              <svg
                className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <div>
                <p className="text-xs text-gray-500">Current Location</p>
                <p className="text-sm text-gray-700 font-medium">Diversion Road, Mandurriao</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
