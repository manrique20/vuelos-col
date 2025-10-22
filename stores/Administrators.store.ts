import { defineStore } from 'pinia'
import type {
  Administrator,
  FilterAdministrator,
} from '~/interfaces/Administrators.interface'

const module = 'admin'

interface State {
  admins: Administrator[]
  admin: Administrator
  formAdmin: FilterAdministrator
}

export const useAdministratorsStore = defineStore('administrators', {
  state: (): State => ({
    admins: [],
    admin: {} as Administrator,
    formAdmin: {
      filter: '',
      limit: 10,
      status: '',
      role: '',
    },
  }),
  actions: {
    async getAdministrators() {
      this.admins = []
      const response = await useApiServices({
        method: 'POST',
        url: `${module}/get-admins`,
        typeHeader: 'auth',
        data: this.formAdmin,
      })

      if (response.status && response.code === 100) {
        this.admins = response.data.items as Administrator[]
      }

      return response
    },
    async getAdministrator(id: string) {
      this.admin = {} as Administrator
      const response = await useApiServices({
        method: 'GET',
        url: `${module}/get-admin/${id}`,
        typeHeader: 'auth',
      })

      if (response.status && response.code === 100) {
        this.admin = response.data.item as Administrator
      }

      return response
    },
    async createAdministrators(_form: any) {
      const response = await useApiServices({
        method: 'POST',
        url: `${module}/create-admin`,
        typeHeader: 'auth',
        data: _form,
      })

      return response
    },
    async editAdministrator(id: string, _form: any) {
      const response = await useApiServices({
        method: 'PUT',
        url: `${module}/update-admin/${id}`,
        typeHeader: 'auth',
        data: _form,
      })

      return response
    },
    async changeStatus(id: number) {
      const response = await useApiServices({
        method: 'PUT',
        url: `${module}/change-status/${id}`,
        typeHeader: 'auth',
      })
      return response
    },
  },
  getters: {
    getAllAdmins: (state): Administrator[] => {
      return state.admins
    },
  },
})
