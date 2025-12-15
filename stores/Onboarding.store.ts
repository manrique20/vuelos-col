import { defineStore } from "pinia";
import type { User } from "~/interfaces/User.interface";

interface State {
  authToken: string;
  accessToken: string;
  user: User | unknown;
  profile: User;
}

export const useOnboardingStore = defineStore("onboarding", {
  state: (): State => ({
    user: {} as User,
    authToken: "",
    accessToken: "",
    profile: {} as User,
  }),
  actions: {
    async login(form: object) {
      try {
        const response = await fetch("http://localhost:3000/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        const data = await response.json();
        console.log(data);

        if (data?.status && data?.code === 100) {
          setLoginUser(data?.data);
        }
        return data;
      } catch (error) {
        console.error("Error fetching flights:", error);
        throw error;
      }
    },
    async logout() {
      const result = await useApiServices({
        method: "POST",
        url: "/onboarding/logout",
        typeHeader: "auth",
      });

      setLoginUser({ user: undefined, authToken: undefined });

      return result;
    },
    async register(form: object) {
      try {
        const response = await fetch("http://localhost:3000/users/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        const data = await response.json();
        console.log(data);

        if (data?.status && data?.code === 100) {
          setLoginUser(data?.data);
        }
        return data;
      } catch (error) {
        console.error("Error fetching flights:", error);
        throw error;
      }
    },
  },
  getters: {
    getLoginUser: (state) => {
      return state.user;
    },
  },
  persist: [
    {
      pick: ["user"],
      storage: piniaPluginPersistedstate.localStorage(),
    },
  ],
});
