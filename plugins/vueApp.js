import { defineNuxtPlugin } from "#app";
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";
export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  nuxtApp.vueApp.component("infinite-loading", InfiniteLoading);

  nuxtApp.hook("app:beforeMount", async () => {
    await generateAccessToken();
  });
});
