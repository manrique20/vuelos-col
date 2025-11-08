import { customPreset } from "./assets/scss/utilities/theme/theme.preset";
// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: false },

  imports: {
    dirs: [
      "composables",
      "composables/*/index.{ts,js,mjs,mts}",
      "composables/**",
    ],
  },

  app: {
    head: {
      titleTemplate: "%s - Website",
      title: "Vuelos Col",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "google", content: "notranslate" },
        {
          hid: "description",
          name: "description",
          content: "Stack Front para los Backoffice",
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  // config envs
  runtimeConfig: {
    public: {
      secret: process.env.SECRET_KEY,
      API_BASE_URL: process.env.API_URL,
      SHORT_NAME: process.env.SHORT_NAME,
    },
  },

  // css
  css: ["@/assets/scss/main.scss"],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
            '@use "~/assets/scss/utilities/_variables.scss" as *;',
        },
      },
    },
  },

  // modules
  modules: [
    "@nuxtjs/i18n",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    "@primevue/nuxt-module",
    "@nuxt/eslint",
    '@nuxtjs/tailwindcss',
  ],

  // primevue
  primevue: {
    usePrimeVue: true,
    autoImport: true,
    options: {
      ripple: true,
      theme: {
        preset: customPreset,
        options: {
          darkModeSelector: "",
        },
        cssLayer: {
          name: "primevue",
          order: "app-styles, primevue",
        },
      },
      locale: {
        dayNamesMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
        dayNames: [
          "Domingo",
          "Lunes",
          "Martes",
          "Miércoles",
          "Jueves",
          "Viernes",
          "Sábado",
        ],
        dayNamesShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
        monthNames: [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Septiembre",
          "Octubre",
          "Noviembre",
          "Diciembre",
        ],
        monthNamesShort: [
          "Ene",
          "Feb",
          "Mar",
          "Abr",
          "May",
          "Jun",
          "Jul",
          "Ago",
          "Sep",
          "Oct",
          "Nov",
          "Dic",
        ],
        fileSizeTypes: [
          "Bytes",
          "KB",
          "MB",
          "GB",
          "TB",
          "PB",
          "EB",
          "ZB",
          "YB",
        ],
      },
    },
  },

  // translator
  i18n: {
    locales: [
      {
        code: "es",
        file: "es.ts",
        name: "Español",
        icon: "/icons/language/ic_colombia.svg",
      },
      {
        code: "en",
        file: "en.ts",
        name: "English",
        icon: "/icons/language/ic_uk.svg",
      }
    ],
    lazy: true,
    langDir: "lang/",
    defaultLocale: "es",
  },

  compatibilityDate: "2024-10-01",
});
