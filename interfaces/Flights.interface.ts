export interface Flight {
  id: number;
  flight_number: string;
  origin: string;
  origin_city: string;
  destiny: string;
  destiny_city: string;
  departure_date: string;
  departure_hour: string;
  arrival_date: string;
  arrival_hour: string;
  base_price: number;
  total_capacity: number;
  available_seats: number;
  status: string;
  aircraft_type: string;
}

export interface SearchParams {
  selectedOriginCity: string;
  selectedDestinationCity: string;
  departureDate: Date;
  arrivalDate: Date;
}
export interface Booking {
  id: number;
  user_id: number;
  flight_id: number;
  name: string;
  surname: string;
  document_type: string;
  document_number: string;
  booking_date: string;
  seats_count: number;
  total_price: number;
  price_per_seat: number;
  status: string;
  created_at: string;
  updated_at: string;
}
export interface CreateBookingParams {
  user_id: number;
  flight_id: number;
  name: string;
  surname: string;
  document_type: string;
  document_number: string;
  seats_count: number;
}
