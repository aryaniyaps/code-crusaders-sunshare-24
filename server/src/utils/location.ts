// utils.ts
/**
 * Calculate the great circle distance between two points
 * on the earth (specified in decimal degrees)
 */
export function haversineDistance(
  lon1: number,
  lat1: number,
  lon2: number,
  lat2: number
): number {
  // Convert decimal degrees to radians
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

  // Haversine formula
  const a =
    Math.sin(deltaPhi / 2) ** 2 +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Radius of Earth in kilometers
  const earthRadius = 6371;

  // Calculate the distance in kilometers
  const distance = c * earthRadius;

  return distance;
}

/**
 * Find locations within a specified radius (in kilometers) of a target location.
 * Returns an array of nearby locations with their arbitrary costs based on distance.
 */
export function findNearbyLocations(
  locations: { name: string; lon: number; lat: number; id: number }[],
  targetLon: number,
  targetLat: number,
  radius: number
): { name: string; lon: number; lat: number; cost: number }[] {
  const nearbyLocations: {
    name: string;
    lon: number;
    lat: number;
    cost: number;
    id: number;
  }[] = [];

  for (const location of locations) {
    const distance = haversineDistance(
      targetLon,
      targetLat,
      location.lon,
      location.lat
    );

    if (distance <= radius) {
      // Calculate an arbitrary cost based on distance
      const cost = calculateCost(distance);
      nearbyLocations.push({ ...location, cost });
    }
  }

  return nearbyLocations;
}

/**
 * Calculate an arbitrary cost based on the distance.
 * This is just a simple example and can be replaced with a more realistic cost calculation.
 */
function calculateCost(distance: number): number {
  // Arbitrary cost calculation
  const baseCost = 100; // Assuming a base cost of 100
  const costPerKm = 5; // Assuming a cost of 5 per km
  const cost = baseCost + distance * costPerKm;

  return cost;
}
