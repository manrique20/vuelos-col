import { DateTime } from "luxon";
import { storeToRefs } from "pinia";

// interfaces
interface showAlertI {
  title?: string;
  message: string;
  type?: string; // success, info, warn, error
  duration?: number; // Delay in milliseconds to close the message automatically
}


export const useParseJson = (_json: any) => {
  try {
    return JSON.parse(_json);
  } catch (error) {
    return {};
  }
};

export const useLoading = (value: boolean) => {
  const mainStore = useMainStore();
  const { loading } = storeToRefs(mainStore);

  loading.value = value;
};
export const truncateText = (text: string, maxWords: number) => {
  if (!text) return "";
  const words = text.split(" ");
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + "...";
};


export const useSearchItemJson = (path: string, obj: any) => {
  const keys = path.split(".");
  let result = obj;

  for (const key of keys) {
    const matches = key.match(/(\w+)(\[(\d+)\])?/);

    if (matches) {
      const property = matches[1];
      const index = matches[3];
      result = Object.keys(result || {}).length > 0 ? result : {};
      if (
        typeof result !== "undefined" &&
        Object.prototype.hasOwnProperty.call(result, property)
      ) {
        result = result[property];

        if (index !== undefined) {
          result = result[index];
        }
      } else {
        return undefined || null || "";
      }
    } else {
      return undefined || null || "";
    }
  }

  return result;
};

export const useShowAlert = (config: showAlertI) => {
  const nuxtApp = useNuxtApp();
  const toast: any = nuxtApp.$toast;
  config.duration = config.duration || 3500;

  toast.removeAllGroups();

  toast.add({
    severity: config.type,
    summary: config.title,
    detail: config.message,
    life: config.duration,
  });
};

export const useFormatDate = (date: string, type: string) => {
  let dateFormat = "-";

  const parsedDate = DateTime.fromISO(date);

  if (type === "date-send") {
    dateFormat = parsedDate.toFormat("yyyy-MM-dd");
  }

  if (type === "date-table") {
    dateFormat = parsedDate.toFormat("dd-MM-yyyy");
  }
  if (type === "only-hour") {
    dateFormat = parsedDate.toFormat("HH:mm");
  }

  return dateFormat;
};
export const useFormatPrice = (_value: any) => {
  try {
    const valueNumber = parseFloat(_value);

    const priceFormat = valueNumber.toLocaleString("es-CO");

    return "$" + priceFormat + "COP";
  } catch (error) {
    console.error("Error", error);
    return "$0COP";
  }
};
