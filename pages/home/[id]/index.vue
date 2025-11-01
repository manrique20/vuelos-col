<script setup lang="ts">
import flightsData from "../../../composables/mock/allData.store";
const route = useRoute();
const localePath = useLocalePath();
const router = useRouter();
const flights = ref<Flight[]>(flightsData.flights);
const flightData = ref();
const { getFlightById, calculateFinalPrice } = useFlightSearch();
const getData = () => {
 flightData.value = getFlightById(+route.params.id);
};
onMounted(() =>
  nextTick(async () => {
    getData();
  })
);
</script>


<template>
  <div class="min-h-screen flex items-center justify-center bg-blue-100 py-10 px-6">
    <form class="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-sm border border-gray-200">
      <div class="text-center mb-8">
        <h1 class="text-2xl font-extrabold text-gray-800">
          Cada vez más cerca de cumplir tus sueños
        </h1>
        <p class="text-lg font-semibold text-gray-700 mt-1">
          Formulario de datos del pasajero
        </p>
      </div>

      <div class="space-y-4">
        <div>
          <label class="block font-semibold mb-1">Nombre:</label>
          <input type="text" class="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400" />
        </div>

        <div>
          <label class="block font-semibold mb-1">Documento:</label>
          <input type="text" class="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400" />
        </div>

        <div>
          <label class="block font-semibold mb-1">Correo:</label>
          <input type="email" class="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400" />
        </div>

        <!-- 🔹 Espaciado mejorado debajo -->
        <div class="mb-4">
          <label class="block font-semibold mb-1">Vuelo Seleccionado:</label>
          <input type="text" class="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400" />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block font-semibold mb-1">Origen:</label>
            <input type="text" class="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label class="block font-semibold mb-1">Salida:</label>
            <input type="text" class="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400" />
          </div>
        </div>

        <div>
          <label class="block font-semibold mb-1">Fecha:</label>
          <input type="date" class="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400" />
        </div>

        <div>
          <label class="block font-semibold mb-1">Selección de Asiento:</label>
          <input type="text" class="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400" />
        </div>

        <!-- 🔹 Bloque actualizado y responsivo -->
        <div>
          <label class="block font-semibold mb-1">Datos de Tarjeta:</label>
          <div class="flex flex-wrap gap-2">
            <input
              type="text"
              placeholder="Número"
              class="flex-grow border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 min-w-[140px]"
            />
            <input
              type="text"
              placeholder="MM/AA"
              class="w-16 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 text"
            />
            <input
              type="text"
              placeholder="CVV"
              class="w-12 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 text"
            />
          </div>
        </div>
        <!-- 🔹 Fin bloque actualizado -->

        <div>
          <label class="block font-semibold mb-1">Precio:</label>
          <input type="text" class="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400" />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition mt-6"
        >
          CONFIRMAR RESERVA
        </button>
      </div>
    </form>
  </div>
</template>



