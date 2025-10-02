'use client';

import { useState, useEffect, useRef } from 'react';
import type { LatLngTuple } from 'leaflet';

// Calculate bearing between two points (for vehicle rotation)
function calculateBearing(start: LatLngTuple, end: LatLngTuple): number {
  const startLat = (start[0] * Math.PI) / 180;
  const startLng = (start[1] * Math.PI) / 180;
  const endLat = (end[0] * Math.PI) / 180;
  const endLng = (end[1] * Math.PI) / 180;

  const dLng = endLng - startLng;

  const y = Math.sin(dLng) * Math.cos(endLat);
  const x = Math.cos(startLat) * Math.sin(endLat) -
    Math.sin(startLat) * Math.cos(endLat) * Math.cos(dLng);

  const bearing = Math.atan2(y, x);
  return ((bearing * 180) / Math.PI + 360) % 360;
}

// Interpolate between two points
function interpolatePosition(
  start: LatLngTuple,
  end: LatLngTuple,
  progress: number
): LatLngTuple {
  const lat = start[0] + (end[0] - start[0]) * progress;
  const lng = start[1] + (end[1] - start[1]) * progress;
  return [lat, lng];
}

// Real route along Diversion Road from Smallville Business Complex to Taft North
// Generated using OSRM routing engine - follows actual road geometry (2.25km route)
const ROUTE_COORDINATES: LatLngTuple[] = [
  [10.705057, 122.550968], // Start: Smallville Business Complex
  [10.705173, 122.551179],
  [10.705221, 122.551267],
  [10.705245, 122.551309],
  [10.705818, 122.552315],
  [10.705854, 122.55238],
  [10.705899, 122.55246],
  [10.705806, 122.55249],
  [10.705367, 122.552614],
  [10.705228, 122.552653],
  [10.705266, 122.552801],
  [10.705909, 122.552634],
  [10.706042, 122.552598],
  [10.706132, 122.552568],
  [10.706654, 122.552427],
  [10.70679, 122.552392],
  [10.706861, 122.552371],
  [10.707479, 122.552207],
  [10.707532, 122.552192],
  [10.707616, 122.552169],
  [10.707703, 122.552147],
  [10.708461, 122.551946],
  [10.708656, 122.551889],
  [10.708749, 122.551866],
  [10.709076, 122.551806],
  [10.709519, 122.551745],
  [10.709577, 122.551736],
  [10.709619, 122.551731],
  [10.709728, 122.551721],
  [10.7098, 122.551716],
  [10.709865, 122.551716],
  [10.710099, 122.55171],
  [10.710304, 122.551706],
  [10.710501, 122.551715],
  [10.710713, 122.551726],
  [10.710781, 122.55173],
  [10.710795, 122.551731],
  [10.711014, 122.551747],
  [10.711358, 122.551798],
  [10.71159, 122.551846],
  [10.711821, 122.551905],
  [10.71208, 122.551963],
  [10.712246, 122.552001],
  [10.713111, 122.552239],
  [10.713393, 122.552309],
  [10.714272, 122.552539],
  [10.7148, 122.552662],
  [10.715344, 122.552779],
  [10.715787, 122.552845],
  [10.716213, 122.552891],
  [10.716456, 122.552904],
  [10.716523, 122.552901],
  [10.716733, 122.552892],
  [10.716924, 122.552884],
  [10.717216, 122.552872],
  [10.717278, 122.552865],
  [10.717414, 122.552852],
  [10.717628, 122.552819],
  [10.718207, 122.552718],
  [10.7186, 122.552609],
  [10.718916, 122.552506],
  [10.719312, 122.552338],
  [10.719338, 122.552328],
  [10.719382, 122.552306],
  [10.719569, 122.552219],
  [10.719513, 122.552082],
  [10.719484, 122.552014],
  [10.719463, 122.551961],
  [10.719404, 122.551806],
  [10.719373, 122.551725],
  [10.719313, 122.551566],
  [10.719225, 122.551337],
  [10.718901, 122.550461],
  [10.718789, 122.550058],
  [10.718762, 122.549777],
  [10.718728, 122.549412],
  [10.718718, 122.549317],
  [10.718706, 122.549199], // End: Taft North area
];

const SEGMENT_DURATION = 2000; // 2 seconds per segment (smooth)
const TOTAL_DISTANCE = 2250; // meters (from OSRM)
const SPEED_KMH = 30; // Simulated speed

export function useVehicleAnimation() {
  const [currentPosition, setCurrentPosition] = useState<LatLngTuple>(ROUTE_COORDINATES[0]);
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  const animationRef = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    if (!isAnimating) return;

    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const segmentProgress = (elapsed % SEGMENT_DURATION) / SEGMENT_DURATION;

      // Calculate which segment we're on
      const totalSegments = ROUTE_COORDINATES.length - 1;
      const currentSegment = Math.floor((elapsed / SEGMENT_DURATION) % totalSegments);

      // Get start and end points of current segment
      const start = ROUTE_COORDINATES[currentSegment];
      const end = ROUTE_COORDINATES[currentSegment + 1] || ROUTE_COORDINATES[0];

      // Smooth interpolation between points
      const newPosition = interpolatePosition(start, end, segmentProgress);
      const newRotation = calculateBearing(start, end);

      setCurrentPosition(newPosition);
      setRotation(newRotation);
      setCurrentSegmentIndex(currentSegment);

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isAnimating]);

  // Calculate progress based on segment index
  const progressPercentage = (currentSegmentIndex / (ROUTE_COORDINATES.length - 1)) * 100;
  const traveledPath = ROUTE_COORDINATES.slice(0, currentSegmentIndex + 1);
  const upcomingPath = ROUTE_COORDINATES.slice(currentSegmentIndex);

  // Add current position to traveled path for smooth visualization
  const smoothTraveledPath = [...traveledPath, currentPosition];

  return {
    currentPosition,
    traveledPath: smoothTraveledPath,
    upcomingPath,
    fullRoute: ROUTE_COORDINATES,
    progressPercentage,
    rotation,
    isAnimating,
    setIsAnimating,
    totalDistance: TOTAL_DISTANCE,
    currentSpeed: SPEED_KMH,
  };
}
