import { defineStore } from "pinia";
import type {
  VehicleTypes,
  VehicleTypeDetail,
  DriverDetail,
  DriversFilter,
  Favorites,
  ClickinInfo,
} from "~/interfaces/vehicleTypes.interface";
const module = "vehicle";

interface State {
  vehicleTypes: VehicleTypes[];
  vehicleTypeDetail: VehicleTypeDetail[];
  allVehicleTypeDetail: VehicleTypes[];
  driverDetail: DriverDetail;
  typeId: string | number;
  form: DriversFilter;
  favorites: Favorites[];
  clickingInfo: ClickinInfo;
}
interface Filter {
  offset: string | number;
  limit: string | number;
}
export const useVehicleTypesStore = defineStore("vehicle-types", {
  state: (): State => ({
    vehicleTypes: [],
    vehicleTypeDetail: [],
    driverDetail: {} as DriverDetail,
    allVehicleTypeDetail: [],
    typeId: "",
    favorites: [],
    clickingInfo: {} as ClickinInfo,
    form: {
      name: "",
      day: "",
      vehicleType: "",
      offset: 0,
      limit: 10,
    },
  }),
  actions: {
    async getInfoDriver(_data: object) {
      const result = await useApiServices({
        method: "POST",
        url: `vehicle/info-driver`,
        data: _data,
        typeHeader: "auth",
      });
      return result;
    },
    async checkIfClicked(_id: number) {
      this.clickingInfo = {} as ClickinInfo;
      const result = await useApiServices({
        method: "GET",
        url: `drivers/click-status/${_id}`,
        typeHeader: "auth",
      });
      if (result.status && result.code === 100) {
        this.clickingInfo = result.data as ClickinInfo;
      }
      return result;
    },
    async favoriteDriver(_form: object) {
      this.favorites = [];
      const result = await useApiServices({
        method: "POST",
        url: `drivers/favorites`,
        data: _form,
        typeHeader: "auth",
      });
      if (result.status && result.code === 100) {
        this.favorites = result.data.items as Favorites[];
      }
      return result;
    },
    async rateDriver(_form: object) {
      const result = await useApiServices({
        method: "POST",
        url: `drivers/click`,
        data: _form,
        typeHeader: "auth",
      });
      return result;
    },
    async getDriverDetail(_id: any) {
      const result = await useApiServices({
        method: "GET",
        url: `${module}/detail/${_id}`,
        typeHeader: "access",
      });
      if (result.status && result.code === 100) {
        this.driverDetail = result.data;
      }
      return result;
    },
    async getAllListVehicleTypes(_form: Filter) {
      if (_form.offset === 0) {
        this.allVehicleTypeDetail = [];
      }
      const result = await useApiServices({
        method: "POST",
        url: `${module}/types`,
        data: _form,
        typeHeader: "access",
      });
      if (result.status && result.code === 100) {
        this.allVehicleTypeDetail = this.allVehicleTypeDetail.concat(
          result.data.items as VehicleTypes[]
        );
      }
      return result;
    },
    async getVehicleTypes(_form: Filter) {
      this.vehicleTypes = [];
      const result = await useApiServices({
        method: "POST",
        url: `${module}/types`,
        data: _form,
        typeHeader: "access",
      });
      if (result.status && result.code === 100) {
        this.vehicleTypes = result.data.items as VehicleTypes[];
      }
      return result;
    },
    async getOneTypeVehicle(_id: any, _form: Filter) {
      const result = await useApiServices({
        method: "POST",
        url: `${module}/types/${_id}`,
        typeHeader: "access",
        data: _form,
      });

      // Verificar si la respuesta es exitosa
      if (result.status && result.code === 100) {
        const hasData = result.data?.items && result.data.items.length > 0;

        if (_form.offset === 0) {
          if (hasData) {
            this.vehicleTypeDetail = result.data.items as VehicleTypeDetail[];
          } else {
            this.vehicleTypeDetail = [];
          }
        } else {
          if (hasData) {
            this.vehicleTypeDetail = this.vehicleTypeDetail.concat(
              result.data.items as VehicleTypeDetail[]
            );
          }
        }
      } else if (_form.offset === 0) {
        this.vehicleTypeDetail = [];
      }

      return result;
    },
  },
  getters: {
    getClickingInfo: (state): ClickinInfo => {
      return state.clickingInfo;
    },
    getAllFavorites: (state): Favorites[] => {
      return state.favorites;
    },
    getAllVehicleType: (state): VehicleTypes[] => {
      return state.allVehicleTypeDetail;
    },
    getOneDriverDetail: (state): DriverDetail => {
      return state.driverDetail;
    },
    getOneTypeVehicleDetail: (state): VehicleTypeDetail[] => {
      return state.vehicleTypeDetail;
    },
    getVehicletypes: (state): VehicleTypes[] => {
      return state.vehicleTypes;
    },
  },
});
