<script setup lang="ts">
import flightsData from "../../../composables/mock/data.json";
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
  <div>{{ flightData }}</div>
</template>
