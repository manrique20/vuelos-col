import { storeToRefs } from "pinia";

export default defineNuxtPlugin(() => {
  addRouteMiddleware(
    "global-middleware",
    (to) => {
      /** nuxt app */
      const nuxtApp = useNuxtApp();
      /** stores */
      const onboardingStore = useOnboardingStore();
      const { getLoginUser: userData } = storeToRefs(onboardingStore);

      if (to.path === "/") {
        return navigateTo(nuxtApp?.$localePath({ name: "home" }));
      }

    },
    { global: true }
  );
});
