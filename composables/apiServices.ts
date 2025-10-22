import type { UseFetchOptions } from "nuxt/app";
import { storeToRefs } from "pinia";

interface setting {
  method: "GET" | "POST" | "PUT" | "DELETE";
  typeHeader?: "auth" | "access" | "";
  url: string;
  data?: object;
  api?: string;
  contentType?: 0 | 1;
}

export interface responseApi {
  success?: boolean;
  code: number;
  message: string;
  data?: object | unknown | any;
  status: boolean;
  error?: unknown;
}

export const useApiServices = async (
  setting: setting
): Promise<responseApi> => {
  const nuxtApp = useNuxtApp();

  try {
    const config = useRuntimeConfig();
    /** stores */
    const onboardingStore = useOnboardingStore();
    const { getLoginUser: userData } = storeToRefs(onboardingStore);

    if (userData.value?.id && setting.typeHeader === "") {
      setting.typeHeader = "auth";
    }

    const options: UseFetchOptions<unknown> = {
      key: `${setting.method}-${setting.url}-${Date.now()}`,
      baseURL: setting.api ? setting.api : config.public.API_BASE_URL,
      headers: getHeaders(setting.typeHeader),
      method: setting.method,
      server: false,
      cache: "no-cache",
      timeout: setting.timeout || 9000,
      onRequestError({ error }: { error: Error }) {
        throw new Error(JSON.stringify({ message: error.message }));
      },
      // @ts-ignore
      onResponseError({ response }) {
        throw new Error(
          JSON.stringify({
            statusCode: response.status,
            data: response._data,
            message: response.statusText,
          })
        );
      },
    } as any;

    if (setting.method !== "GET") {
      if (setting.contentType === 0) {
        const formData = new FormData();

        Object.entries(setting.data || {}).forEach((key) => {
          formData.append(`${key[0]}`, key[1]);
        });

        options.headers = {
          ...options.headers,
        };
        options.body = formData;
      } else if (setting.data) {
        options.headers = {
          ...options.headers,
        };
        setting.data = setting.data ? setting.data : {};
        options.body = JSON.stringify(setting.data);
      }
    }

    const { data, error } = await useFetch(setting.url, options);

    if (error.value) {
      throw new Error(JSON.stringify(error.value));
    }

    return data.value as responseApi;
  } catch (e: any) {
    const err = useParseJson(e.message);
    const errorData = useParseJson(err.message) as any;

    console.error("Error en el Store: ", errorData);

    if (errorData.message.includes("aborted"))
      // ? Error por timeout
      return {
        success: false,
        status: false,
        code: 101,
        message: nuxtApp.$i18n.t("store.apiServices.timeOut"),
        error: errorData,
      };

    if (errorData.statusCode === 401) {
      //el token ha expirado
      logout(false);
      return {
        success: false,
        status: false,
        code: 120,
        message: errorData.data.message,
        error: errorData,
      };
    } else if (errorData.statusCode === 404) {
      if (errorData?.data?.message) {
        return {
          success: false,
          status: false,
          code: 102,
          message: errorData.data.message,
          error: errorData,
        };
      } else {
        // ? No encontró el servicio
        return {
          success: false,
          status: false,
          code: 101,
          message: nuxtApp.$i18n.t("store.apiServices.notFound"),
          error: errorData,
        };
      }
    } else if (errorData?.data?.code === 120) {
      if (errorData.data.message.includes("token")) {
        await logout();
      }
      return {
        success: false,
        status: false,
        code: 120,
        message: errorData.data.message,
        error: errorData,
      };
    } else if (errorData?.data?.message) {
      return {
        success: false,
        status: false,
        code: 102,
        message: errorData.data.message,
        error: errorData,
      };
    } else {
      return {
        success: false,
        status: false,
        code: 101,
        message: nuxtApp.$i18n.t("store.apiServices.generalError"),
        error: errorData,
      };
    }
  }
};

export const getHeaders = (type: any) => {
  const config = useRuntimeConfig();
  const onboardingStore = useOnboardingStore();
  const { authToken, accessToken } = storeToRefs(onboardingStore);
  let headers = {};

  if (type === "auth") {
    headers = {
      [`X-${config.public.SHORT_NAME.toUpperCase()}-Auth-Token`]:
        authToken.value || "",
    };
  } else {
    headers = {
      [`X-${config.public.SHORT_NAME.toUpperCase()}-Access-Token`]:
        accessToken.value || "",
    };
  }

  return headers;
};

export const generateAccessToken = async () => {
  const config = useRuntimeConfig();
  const onboardingStore = useOnboardingStore();
  const { accessToken } = storeToRefs(onboardingStore);
  try {
    if (!accessToken.value) {
      const shortName = config.public.SHORT_NAME;

      const result = await useApiServices({
        method: "GET",
        url: `${shortName}/generate-access-token`,
      });

      if (result.code === 100) {
        accessToken.value = result.data?.accessToken;
      }
    }
  } catch (error) {
    console.log(error);
  }

  return accessToken;
};

export const setLoginUser = (data: any) => {
  const onboardingStore = useOnboardingStore();
  const { authToken, user } = storeToRefs(onboardingStore);
  user.value = data.user;
  authToken.value = data.authToken;
};

export const logout = async (logout?: boolean) => {
  const nuxt = useNuxtApp();

  /** stores */
  const onboardingStore = useOnboardingStore();

  if (logout) {
    await onboardingStore.logout();
  }

  setLoginUser({ user: undefined, authToken: undefined });

  setTimeout(async () => {
    await navigateTo(nuxt.$localePath({ name: "home" }));
  }, 500);
};
