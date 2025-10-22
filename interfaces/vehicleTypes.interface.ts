export interface VehicleTypes {
  id: number;
  name: string;
  description: string;
  photoUrl: string;
}

export interface VehicleTypeDetail {
  id: number;
  photoUrl: string;
  driverName: string;
  minHours: number;
  minCost: number;
  vehicleTypeName: string;
  dimensions: Dimensions;
  weight: number;
  capacityDescription: string;
  averageRating: number;
  vehicleLocation: VehicleLocation;
}
export interface VehicleLocation {
  latitude: number;
  longitude: number;
}
export interface Dimensions {
  length: number;
  width: number;
  height: number;
}

export interface DriverDetail {
  id: number;
  idDriver: number;
  vehiclePhotoUrl: string;
  driverPhotoUrl: string;
  driverName: string;
  activeHours: number;
  plate: string;
  vehicleTypeName: string;
  dimensions: Dimensions;
  weight: number;
  capacityDescription: string;
  minHours: number;
  minCost: number;
  serviceConditions: string;
  extraMinuteCost: number;
  averageRating: number;
  vehicleTypeId: number;
}

export interface Dimensions {
  length: number;
  width: number;
  height: number;
}
export interface DriversFilter {
  offset: string | number;
  limit: string | number;
  day: string;
  vehicleType: string | number;
  name: string;
}
export interface Favorites {
  name: string;
  clickedAt: Date;
  vehicleType: string;
  rating: number;
}

export interface ClickinInfo {
  hasViewed: boolean;
  viewCount: number;
  lastViewedAt: Date;
  hasRated: boolean;
  ratingCount: number;
  lastRating: LastRating;
  driver: Driver;
}

export interface Driver {
  id: number;
  fullname: string;
  ratingPromedio: number;
  totalRatings: number;
}

export interface LastRating {
  value: number;
  at: Date;
}
