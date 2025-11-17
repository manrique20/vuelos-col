<script setup lang="ts">
import { storeToRefs } from "pinia";

import type { TableFields } from "~/interfaces/Table.interface";

const flightStore = useFlightsStore();
const bookingStore = useBookingStore();
const { getAllFlights: data } = storeToRefs(flightStore);
const { allBookings: bookings } = storeToRefs(bookingStore);
const { t } = useI18n();
const router = useRouter();
const localePath = useLocalePath();

const onboardingStore = useOnboardingStore();
const { getLoginUser: userData } = storeToRefs(onboardingStore);
const offset = ref(0);
const tabValue = ref("0");
const route = useRoute();
// Table configuration
const table = ref<TableFields>({
  headers: [
    {
      field: "flight_number",
      header: t("table.flight_number"),
    },
    {
      field: "origin",
      header: t("table.origin"),
    },
    {
      field: "destiny",
      header: t("table.destination"),
    },
    {
      field: "departure_date",
      header: t("table.departure_date"),
    },
    {
      field: "arrival_date",
      header: t("table.arrival_date"),
    },

    {
      field: "aircraft_type",
      header: t("table.aircraft"),
    },
    {
      type: "state",
      field: "status",
      header: t("table.state.title"),
    },
  ],
  empty: "",
  loading: false,
  limit: 0,
  pages: 0,
});
const tableBookings = ref<TableFields>({
  headers: [
    {
      field: "reservationCode",
      header: t("table.flightId"),
    },
    {
      field: "user.id",
      header: t("table.userId"),
    },
    {
      field: "user.name",
      header: t("table.name"),
    },
    {
      field: "user.surname",
      header: t("table.surname"),
    },
    {
      field: "user.document_number",
      header: t("table.document_number"),
    },
    {
      field: "reservationDate",
      header: t("table.booking_date"),
      type: "date",
    },
    {
      field: "seatQuantity",
      header: t("table.seats_count"),
    },
    {
      field: "totalPrice",
      header: t("table.total_price"),
      type: "price",
    },
  ],
  empty: "",
  loading: false,
  limit: 0,
  pages: 0,
});
const getAllData = async () => {
  useLoading(true);
  await flightStore.fetchAllFlights();
  await bookingStore.getBookings();
  useLoading(false);
};
onMounted(() => {
  nextTick(() => {
    if (userData.value?.rol !== "admin") {
      router.push(localePath({ name: "home" }));
    }
    tabValue.value = (route.query.tab as string) || "0";
    getAllData()
  });
});
// Update URL query parameter when tab changes
watch(
  () => tabValue.value,
  (newTab) => {
    router.push({
      query: {
        ...route.query,
        tab: newTab,
      },
    });
  }
);
</script>
<template>
  <section class="content-page">
    <!-- Tabs for Flights and Bookings -->
    <Tabs v-model:value="tabValue">
      <TabList>
        <Tab value="0">Vuelos</Tab>
        <Tab value="1">Reservas</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="0">
          <GeneralTable
            :headers="table.headers"
            :fields="data"
            :empty="table.empty"
            :loading="table.loading"
            :limit="table.limit"
            :offset="offset"
            :pages="table.pages"
          />
        </TabPanel>
        <TabPanel value="1">
          <GeneralTable
            :headers="tableBookings.headers"
            :fields="bookings"
            :empty="tableBookings.empty"
            :loading="tableBookings.loading"
            :limit="tableBookings.limit"
            :offset="offset"
            :pages="table.pages"
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </section>
</template>