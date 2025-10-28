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
    async updateProfile(form: object) {
      const result = await useApiServices({
        method: "POST",
        url: "onboarding/update-profile",
        typeHeader: "auth",
        data: form,
        contentType: 0,
      });

      return result;
    },
    async createUser(form: object) {
      const result = await useApiServices({
        method: "POST",
        url: "onboarding/create-account-user",
        typeHeader: "auth",
        data: form,
      });

      return result;
    },
    async verifyCodeRegistry(form: object) {
      const result = await useApiServices({
        method: "POST",
        url: "onboarding/verify-code-user",
        typeHeader: "access",
        data: form,
      });

      return result;
    },
    async sendCodeRecoveryPassword(form: object) {
      const result = await useApiServices({
        method: "POST",
        url: "onboarding/send-code-user-update",
        typeHeader: "access",
        data: form,
      });

      return result;
    },
    async sendCodeRegistry(form: object) {
      const result = await useApiServices({
        method: "POST",
        url: "onboarding/send-code-user",
        typeHeader: "access",
        data: form,
      });

      return result;
    },
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

    async passwordRecovery(form: object) {
      const result = await useApiServices({
        method: "POST",
        url: "onboarding/password-recovery",
        data: form,
      });

      return result;
    },

    async sendCode(form: object) {
      const result = await useApiServices({
        method: "POST",
        url: "onboarding/password-recovery",
        data: form,
      });

      return result;
    },

    async verifyCode(form: object) {
      const result = await useApiServices({
        method: "POST",
        url: "onboarding/verify-code",
        data: form,
      });

      return result;
    },

    async updatePassword(form: object) {
      const result = await useApiServices({
        method: "POST",
        url: "onboarding/update-password",
        data: form,
        typeHeader: "auth",
      });

      if (result.status && result.code === 100) {
        // setLoginUser({ user: undefined, authToken: undefined });
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

    async getProfile() {
      const result = await useApiServices({
        method: "GET",
        url: "/onboarding/get-profile",
        typeHeader: "auth",
      });
      if (result?.status && result.code === 100) {
        this.profile = result?.data.user;
      }
      return result;
    },
  },
  getters: {
    getProfileData: (state): User => {
      return state.profile;
    },
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
