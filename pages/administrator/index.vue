<script setup lang="ts">
import { storeToRefs } from "pinia";

import type { TableFields } from "~/interfaces/Table.interface";

const flightSearchStore = useFlightStore();
const { flights, bookings } = storeToRefs(flightSearchStore);
const { t } = useI18n();
const router = useRouter();
const localePath = useLocalePath();

const onboardingStore = useOnboardingStore();
const { getLoginUser: userData } = storeToRefs(onboardingStore);
const data = ref(flights.value);
const offset = ref(0);
const tabValue = ref("0");
const route = useRoute();
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
      field: "flight_id",
      header: t("table.flightId"),
    },
    {
      field: "user_id",
      header: t("table.userId"),
    },
    {
      field: "name",
      header: t("table.name"),
    },
    {
      field: "surname",
      header: t("table.surname"),
    },
    {
      field: "document_number",
      header: t("table.document_number"),
    },
    {
      field: "booking_date",
      header: t("table.booking_date"),
      type: "date",
    },
    {
      field: "seats_count",
      header: t("table.seats_count"),
    },
    {
      field: "total_price",
      header: t("table.total_price"),
      type: "price",
    },

  ],
  empty: "",
  loading: false,
  limit: 0,
  pages: 0,
});
onMounted(() => {
  nextTick(() => {
    if (userData.value?.rol !== "admin") {
      router.push(localePath({ name: "home" }));
    }
    tabValue.value = (route.query.tab as string) || "0";
  });
});
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
