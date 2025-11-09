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
      const result = await useApiServices({
        method: "POST",
        url: "onboarding/login",
        data: form,
      });

      if (result?.status && result.code === 100) {
        setLoginUser(result?.data);
      }

      return result;
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
