import { divIcon } from 'leaflet';

export function createBusIcon(rotation: number = 0) {
  return divIcon({
    html: `
      <div style="
        transform: rotate(${rotation}deg);
        transition: transform 0.3s ease-out;
        position: relative;
      ">
        <!-- Professional bus icon - top view for map tracking -->
        <svg width="40" height="40" viewBox="0 0 40 40" style="filter: drop-shadow(0 3px 6px rgba(0,0,0,0.4));">
          <!-- Main bus body -->
          <rect x="10" y="5" width="20" height="30" rx="3" fill="#E74C3C" stroke="#C0392B" stroke-width="1.5"/>

          <!-- Front section (top) -->
          <rect x="11" y="6" width="18" height="8" rx="2" fill="#F56954"/>

          <!-- Windshield -->
          <rect x="12" y="7.5" width="16" height="4" rx="1.5" fill="#5DADE2" opacity="0.85"/>

          <!-- Side windows -->
          <rect x="11.5" y="16" width="6.5" height="6" rx="1" fill="#5DADE2" opacity="0.75"/>
          <rect x="22" y="16" width="6.5" height="6" rx="1" fill="#5DADE2" opacity="0.75"/>

          <!-- Door line -->
          <line x1="20" y1="16" x2="20" y2="32" stroke="#C0392B" stroke-width="1"/>

          <!-- Wheels -->
          <circle cx="15" cy="33" r="3" fill="#2C3E50"/>
          <circle cx="25" cy="33" r="3" fill="#2C3E50"/>
          <circle cx="15" cy="33" r="1.5" fill="#95A5A6"/>
          <circle cx="25" cy="33" r="1.5" fill="#95A5A6"/>

          <!-- Headlights -->
          <circle cx="14" cy="6" r="1.2" fill="#FDB515" opacity="0.9"/>
          <circle cx="26" cy="6" r="1.2" fill="#FDB515" opacity="0.9"/>

          <!-- Direction arrow (points forward) -->
          <path d="M 20 2 L 23 5 L 17 5 Z" fill="#FDB515"/>

          <!-- Side mirrors -->
          <rect x="8" y="13" width="2" height="4" rx="1" fill="#C0392B"/>
          <rect x="30" y="13" width="2" height="4" rx="1" fill="#C0392B"/>
        </svg>

        <!-- Pulsing glow effect -->
        <div style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 50px;
          height: 50px;
          background: radial-gradient(circle, rgba(231, 76, 60, 0.25) 0%, transparent 70%);
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
          z-index: -1;
        "></div>
      </div>
    `,
    className: 'custom-bus-marker',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
}
