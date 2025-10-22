import { defineNuxtPlugin } from "#app";
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";
import VueGoogleMaps from "@fawmi/vue-google-maps";
import equal from "fast-deep-equal";
export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  nuxtApp.vueApp.component("infinite-loading", InfiniteLoading);
    nuxtApp.vueApp.use(VueGoogleMaps, {
    load: {
      key: config.public.googlemaps_api_key,
      libraries: "places",
    },
  });
  nuxtApp.hook("app:beforeMount", async () => {
    await generateAccessToken();
  });
});
