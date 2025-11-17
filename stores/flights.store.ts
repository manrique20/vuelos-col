import { defineStore } from "pinia";
import type { Flight } from "~/interfaces/Flights.interface";
interface State {
  flights: Array<Flight>;
  flightDetails?: Flight | null;
  allFlights?: Array<Flight>;
}

export const useFlightsStore = defineStore("flights", {
  state: (): State => ({
    flights: [],
    flightDetails: {} as Flight | null,
    allFlights: [],
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
    async getFlightById(flightId: number) {
      try {
        const response = await fetch(
          `http://localhost:3000/flights/detail/${flightId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (data.status && data?.code === 100) {
          this.flightDetails = data?.data as Flight;
        }
        return data;
      } catch (error) {
        console.error("Error fetching flight by ID:", error);
        throw error;
      }
    },
    async fetchAllFlights() {
      try {
        const response = await fetch("http://localhost:3000/flights/get-all-flights", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (data.status && data?.code === 100) {
          this.allFlights = data?.data as Array<Flight>;
        }
        return data;
      } catch (error) {
        console.error("Error fetching all flights:", error);
        throw error;
      }
    },
  },
  getters: {
    getFlightDetails: (state) => {
      return state.flightDetails;
    },
    getFlights: (state) => {
      return state.flights;
    },
    getAllFlights: (state) => {
      return state.allFlights;
    },
  },
});
