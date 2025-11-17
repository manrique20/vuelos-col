import { defineStore } from "pinia";
import type { Flight } from "~/interfaces/Flights.interface";
interface State {
  flights: Array<Flight>;
}

export const useFlightsStore = defineStore("flights", {
  state: (): State => ({
    flights: [],
  }),
  actions: {
    async fetchFlights(params: object) {
      this.flights = [];
      try {
        const response = await fetch("http://localhost:3000/flights/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params),
        });

        const data = await response.json();

        if (data?.status && data?.code === 100) {
          this.flights = data?.data as Array<any>;
        }
        return data; 
      } catch (error) {
        console.error("Error fetching flights:", error);
        throw error;
      }
    },
  },
  getters: {
    getFlights: (state) => {
      return state.flights;
    },
  },
});
