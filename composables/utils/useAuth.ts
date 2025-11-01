import { defineStore } from 'pinia'
import flightsData from '../mock/data.json'
import type { User } from '~/interfaces/User.interface'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    currentUser: null as Omit<User, 'password'> | null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.currentUser,
    
    hasRole: (state) => {
      return (role: string) => state.currentUser?.rol === role
    },
  },

  actions: {
    login(email: string, password: string) {
      const users = flightsData.users;
      
      const user = users.find(u =>
        u.email.toLowerCase() === email.toLowerCase() &&
        u.status === 'activo'
      );

      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      if (user.password !== password) {
        throw new Error('Contraseña incorrecta');
      }

      const { password: _, ...userWithoutPassword } = user;
      this.currentUser = userWithoutPassword;

      // Asumiendo que setLoginUser es una función que manejas aparte
      if (import.meta.client) {
        setLoginUser(userWithoutPassword);
      }
      
      return userWithoutPassword;
    },

    logout() {
      this.currentUser = null;
      
      if (process.client) {
        // Si estás usando alguna librería de cookies, ajusta esto
        // Por ejemplo con nuxt: 
        // const cookie = useCookie('loggedInUser')
        // cookie.value = null
        cookieStore.delete('loggedInUser');
      }
    },
  },
})