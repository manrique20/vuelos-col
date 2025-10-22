import { defineStore } from "pinia";

interface Coordinates {
  latitude?: string;
  longitude?: string;
  accuracy?: string;
  speed?: string | null;
  heading?: string | null;
  timestamp: string
}
export const useMainStore = defineStore("main", {
  state: () => ({
    loading: false,
    check: false,
    showDialog: false,
    coordinates: {} as Coordinates,
  }),
  persist: [
    {
      pick: ["coordinates"],
      storage: piniaPluginPersistedstate.localStorage(),
    },
  ],
});
