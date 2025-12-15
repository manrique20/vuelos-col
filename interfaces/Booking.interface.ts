export interface Bookings {
  id: number;
  reservationCode: string;
  user: User;
  flight: Flight;
  reservationDate: Date;
  seatQuantity: number;
  totalPrice: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Flight {
  id: number;
  flight_number: string;
  origin: string;
  destiny: string;
  departure_date: Date;
  arrival_date: Date;
  departure_hour: string;
  arrival_hour: string;
  base_price: string;
  total_capacity: number;
  available_seats: number;
  aircraft_type: string;
  status: string;
  created_at: Date;
  updated_at: Date;
}

export interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  cellphone: string;
  document_type: string;
  document_number: string;
  rol: string;
  status: string;
  created_at: Date;
  updated_at: Date;
}
