import { defineStore } from "pinia";
import { ref, computed } from "vue";
import flightsData from "../mock/data.json";
import type {
  Flight,
  Booking,
  SearchParams,
  CreateBookingParams,
} from "../../interfaces/Flights.interface";
/**
 * This store manages flight data, including searching for flights, bookings and more
 * This is the center of the flight search and booking logic
 * It includes methods for searching flights based on user criteria, calculating prices,
 * creating bookings, and retrieving flight and booking information
 * It also handles loading states and error management for a smooth user experience
 * The store persists flight and booking data in local storage to maintain state across sessions
 */
export const useFlightStore = defineStore(
  "flight",
  () => {
    const flights = ref<Flight[]>(flightsData.flights);
    const bookings = ref<Booking[]>(flightsData.bookings || []);
    const searchResults = ref<Flight[]>([]);
    const isLoading = ref(false);
    const error = ref<string | null>(null);

    const fetchAllFlights = async () => {
      isLoading.value = true;
      error.value = null;

      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        return flights;
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
            flight.available_seats > 0 &&
            flight.status === "active"
          );
        });

        const returnFlights = flights.value.filter((flight) => {
          return (
            flight.origin === params.selectedDestinationCity &&
            flight.destiny === params.selectedOriginCity &&
            flight.departure_date >= departureDateStr &&
            flight.departure_date <= arrivalDateStr &&
            flight.available_seats > 0 &&
            flight.status === "active"
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
    const createBooking = async (
      params: CreateBookingParams
    ): Promise<Booking | null> => {
      useLoading(true);
      error.value = null;

      try {
        const flight = getFlightById(params.flight_id);
        if (!flight) {
          useShowAlert({
            type: "error",
            message: "Vuelo no encontrado",
          });
          return null;
        }

        if (flight.available_seats < params.seats_count) {
          useShowAlert({
            type: "error",
            message: "No hay suficientes asientos disponibles",
          });
          return null;
        }

        const newBooking: Booking = {
          id:
            bookings.value.length > 0
              ? Math.max(...bookings.value.map((b) => b.id)) + 1
              : 1,
          user_id: params.user_id,
          flight_id: params.flight_id,
          name: params.name,
          surname: params.surname,
          document_type: params.document_type,
          document_number: params.document_number,
          booking_date: new Date().toISOString(),
          seats_count: params.seats_count,
          total_price: params.total_price,
          price_per_seat: params.price,
          status: "paid",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        bookings.value.push(newBooking);

        const flightIndex = flights.value.findIndex(
          (f) => f.id === params.flight_id
        );
        if (flightIndex !== -1) {
          flights.value[flightIndex].available_seats -= params.seats_count;
        }

        await new Promise((resolve) => setTimeout(resolve, 500));
        useShowAlert({
          type: "success",
          message: "Reserva creada exitosamente",
        });
        return newBooking;
      } catch (err) {
        error.value =
          err instanceof Error ? err.message : "Error al crear la reserva";
        return null;
      } finally {
        useLoading(false);
      }
    };

    const getAllBookings = (): Booking[] => {
      return bookings.value;
    };
    const getBookingsByUserId = (userId: number): Booking[] => {
      return bookings.value.filter((booking) => booking.user_id === userId);
    };
    const getFlightById = (flightId: number) => {
      const flight = flights.value.find((f) => f.id === flightId);
      return flight ? flight : null;
    };
    const changeFlightStatus = (flightId: number, status: "active" | "inactive") => {
      const flightIndex = flights.value.findIndex((f) => f.id === flightId);
      if (flightIndex !== -1) {
        flights.value[flightIndex].status = status;
      }
    };
    return {
      flights,
      searchResults,
      bookings,
      isLoading,
      error,
      searchFlights,
      calculateFinalPrice,
      fetchAllFlights,
      getFlightById,
      changeFlightStatus,
      getBookingsByUserId,
      createBooking,
      getAllBookings
    };
  },
  {
    persist: {
      key: "flight-store",
      storage: piniaPluginPersistedstate.localStorage(),
      pick: ["flights",  "bookings"],
    },
  }
);
