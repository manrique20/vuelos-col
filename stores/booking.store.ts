import { defineStore } from "pinia";
import type { Bookings } from "~/interfaces/Booking.interface";
interface State {
  bookings?: Array<Bookings>;
}
export const useBookingStore = defineStore("booking", {
  state: (): State => ({
    bookings: [],
  }),
  actions: {
    async createBooking(params: object) {
      try {
        const response = await fetch("http://localhost:3000/booking/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params),
        });
        if (!response.ok) {
          throw new Error("Failed to create booking");
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error creating booking:", error);
        throw error;
      }
    },
    async getBookings() {
      try {
        const response = await fetch("http://localhost:3000/booking", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (data.status && data?.code === 100) {
          this.bookings = data?.data as Array<any>;
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
        throw error;
      }
    },
  },
  getters: {
    allBookings(state): Array<any> | undefined {
      return state.bookings;
    },
  },
});
