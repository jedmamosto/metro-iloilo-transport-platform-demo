Understood. We'll backtrack from the technical implementation details and focus on the **business logic**. This document describes the "what" and "why" of the prototype from a stakeholder's perspective, making it perfect for aligning on the project's goals before any code is written.

Here is the prototype description focused on its business logic and features.

---

# Business Logic & Feature Description: Fleet Management Prototype

## 1. Overview & Purpose

The primary purpose of this prototype is to provide transport cooperative managers and other key stakeholders with a clear, tangible demonstration of the platform's core value proposition: **live, real-time fleet monitoring**.

This interactive demo will simulate the tracking of a single cooperative bus on a map of Iloilo City. It is designed to be visually intuitive, immediately showcasing the operational oversight and modernization that the platform offers, thereby building stakeholder confidence and illustrating immediate practical benefits.

## 2. Key Features & Business Rules

This section outlines the observable features of the prototype and the business rules that govern their behavior.

### Feature 1: Live Vehicle Tracking

- **Description:** A vehicle icon (representing a coaster bus) will be displayed on the map. This icon will move smoothly and automatically along a designated route, simulating a live data feed from an onboard GPS device.
- **Business Rule:** The vehicle's position must update at a consistent, regular interval (e.g., every 2-3 seconds). This demonstrates the system's reliability and provides a true "real-time" feel without requiring the user to manually refresh the screen.

### Feature 2: Dynamic Route Progress Visualization

- **Description:** The vehicle's entire official route is clearly visible on the map as a highlighted line. As the vehicle progresses, the portion of the route it has already traveled will change to a lighter, faded color, while the path ahead remains bright and prominent.
- **Business Rule 1 (Route Adherence):** The simulated vehicle must strictly follow this predefined path. This reinforces the concept of monitoring for route compliance, a key function for transport managers.
- **Business Rule 2 (At-a-Glance Progress):** The color change provides an immediate and intuitive visual indicator of the trip's status. A manager can instantly gauge how far along the route a vehicle is without needing to consult tables or text.

### Feature 3: Interactive Map Interface

- **Description:** The demonstration is presented on a clean, professional-looking map of Iloilo City. The user can perform standard map interactions like zooming in, zooming out, and panning to explore the vehicle's location and its surrounding context.
- **Business Rule:** The map must be centered on Iloilo City by default, ensuring the context is immediately relevant to local stakeholders. The focus is on clarity and ease of use, presenting critical operational data in a simple geographical format.

## 3. User Experience (UX) Flow

When a stakeholder views the prototype, they will experience the following:

1.  **Immediate Context:** They are presented with a familiar map of Iloilo City.
2.  **Focal Point:** Their attention is drawn to a clearly marked route and a moving bus icon.
3.  **Passive Monitoring:** Without any clicks or interaction, they observe the bus progressing along its route. The continuous movement and the "path-painting" effect of the dynamic route coloring provide a clear narrative of a trip in progress.
4.  **Insight:** The stakeholder intuitively understands that they are watching a live feed. They can see where the bus is, where it has been, and where it is going next, simulating the core experience of a fleet dispatcher or operations manager.

## 4. Value Proposition for Stakeholders

This prototype is designed to directly communicate the following benefits to a transport cooperative manager:

- **Enhanced Operational Oversight:** Visibly demonstrates the ability to "see" all units in the field, moving from blind spots to complete situational awareness.
- **Foundation for Efficiency:** This real-time view is the cornerstone for more advanced features like optimizing dispatch, managing headways between buses, and responding to incidents faster.
- **Improved Route Compliance:** The feature of tracking a vehicle against its assigned route directly addresses the business need to ensure drivers are following their designated paths, maximizing service coverage and efficiency.
- **Professionalism and Modernization:** It showcases a significant leap from traditional, radio-based check-ins to a modern, data-driven management platform, aligning with government modernization goals.
