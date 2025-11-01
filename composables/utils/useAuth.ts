import { defineStore } from "pinia";
import flightsData from "../mock/data.json";
import type { User } from "~/interfaces/User.interface";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    currentUser: null as Omit<User, "password"> | null,
    customers: flightsData.users, // Agregar los usuarios al state
  }),
  actions: {
    login(email: string, password: string) {
      const customers = this.customers; // Usar this.customers en lugar de flightsData.users

      const user = customers.find(
        (u) =>
          u.email.toLowerCase() === email.toLowerCase() && u.status === "activo"
      );

      if (!user) {
        useShowAlert({ type: "error", message: "Usuario no encontrado" });
        useLoading(false);
        return;
      }

      if (user.password !== password) {
        useShowAlert({ type: "error", message: "Contraseña incorrecta" });
        useLoading(false);
        return;
      }

      const { password: _, ...userWithoutPassword } = user;
      this.currentUser = userWithoutPassword;

      if (import.meta.client) {
        setLoginUser(userWithoutPassword);
      }

      return userWithoutPassword;
    },
    register(userData: {
      email: string;
      password: string;
      name: string;
      surname: string;
      cellphone: string;
      document_type: string;
      document_number: string;
    }) {
      const existingUser = this.customers.find(
        (u) => u.email.toLowerCase() === userData.email.toLowerCase()
      );

      if (existingUser) {
        useShowAlert({ type: "error", message: "El email ya está registrado" });
        return false;
      }

      const newUser: User = {
        id: Math.max(...this.customers.map((u) => u.id), 0) + 1,
        email: userData.email,
        password: userData.password,
        name: userData.name,
        surname: userData.surname,
        cellphone: userData.cellphone,
        document_type: userData.document_type,
        document_number: userData.document_number,
        birthdate: userData.birthdate,
        rol: "cliente",
        status: "activo",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      this.customers.push(newUser);

      useShowAlert({
        type: "success",
        message: "Usuario registrado exitosamente",
      });
      setTimeout(() => {
        this.currentUser = null;
      }, 1000);
      return true;
    },

    logout() {
      this.currentUser = null;
      setLoginUser({ user: undefined, authToken: undefined });
      this.currentUser = null;
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.currentUser,
    hasRole: (state) => {
      return (role: string) => state.currentUser?.rol === role;
    },
  },

  persist: {
    storage: piniaPluginPersistedstate.localStorage(),

    paths: ["customers"], // Solo persistir el campo customers
  },
});
