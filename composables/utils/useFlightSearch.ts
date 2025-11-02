import { ref, computed } from "vue";
import flightsData from "../mock/data.json";

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

export const useFlightSearch = () => {
  const flights = ref<Flight[]>(flightsData.flights);
  const searchResults = ref<Flight[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const allData = ref<Flight[]>(flightsData.flights);
  const fetchAllFlights = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      allData.value = flights.value;

      return allData.value;
    } catch (err) {
      error.value = "Error al obtener vuelos. Por favor intente nuevamente.";
      return [];
    } finally {
      isLoading.value = false;
    }
  };
  const searchFlights = async (params: SearchParams) => {
    isLoading.value = true;
    error.value = null;

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const departureDateStr = useFormatDate(
        params.departureDate.toISOString(),
        "date-send"
      );
      const arrivalDateStr = useFormatDate(
        params.arrivalDate.toISOString(),
        "date-send"
      );

      const outboundFlights = flights.value.filter((flight) => {
        return (
          flight.origin === params.selectedOriginCity &&
          flight.destiny === params.selectedDestinationCity &&
          flight.departure_date >= departureDateStr &&
          flight.departure_date <= arrivalDateStr &&
          flight.available_seats > 0
        );
      });

      const returnFlights = flights.value.filter((flight) => {
        return (
          flight.origin === params.selectedDestinationCity &&
          flight.destiny === params.selectedOriginCity &&
          flight.departure_date >= departureDateStr &&
          flight.departure_date <= arrivalDateStr &&
          flight.available_seats > 0
        );
      });

      searchResults.value = [...outboundFlights, ...returnFlights];

      searchResults.value.sort((a, b) => {
        const dateA = new Date(`${a.departure_date} ${a.departure_hour}`);
        const dateB = new Date(`${b.departure_date} ${b.departure_hour}`);
        return dateA.getTime() - dateB.getTime();
      });
    } catch (err) {
      error.value = "Error al buscar vuelos. Por favor intente nuevamente.";
      searchResults.value = [];
    } finally {
      isLoading.value = false;
    }

    return searchResults.value;
  };

  const calculateFinalPrice = (
    basePrice: number,
    departureDate: string
  ): number => {
    const date = new Date(departureDate);
    const dayOfWeek = date.getDay();
    let finalPrice = basePrice;

    if (dayOfWeek === 0 || dayOfWeek === 6) {
      finalPrice *= flightsData.priceModifiers.weekendSurcharge;
    }

    const today = new Date();
    const daysDifference = Math.ceil(
      (date.getTime() - today.getTime()) / (1000 * 3600 * 24)
    );

    if (daysDifference > 7) {
      finalPrice *= flightsData.priceModifiers.advancePurchaseDiscount;
    } else if (daysDifference <= 2) {
      finalPrice *= flightsData.priceModifiers.lastMinuteDiscount;
    }

    return Math.round(finalPrice);
  };
  const getFlightById = (flightId: number) => {
    const flight = flights.value.find((f) => f.id === flightId);
    return flight ? flight : null;
  };

  const getAllFlights = () => {
    return flights.value.filter((flight) => flight.available_seats > 0);
  };

  const getFlightsByRoute = (origin: string, destination: string) => {
    return flights.value.filter(
      (flight) =>
        flight.origin === origin &&
        flight.destiny === destination &&
        flight.available_seats > 0
    );
  };

  return {
    flights,
    searchResults,
    isLoading,
    error,
    allData,
    searchFlights,
    calculateFinalPrice,
    getAllFlights,
    fetchAllFlights,
    getFlightById,
    getFlightsByRoute,
  };
};
