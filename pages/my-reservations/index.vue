<script setup lang="ts">
import type { TableFields } from "~/interfaces/Table.interface";
/** Stores */
const flightStore = useFlightStore();
const onboardingStore = useOnboardingStore();
const { getLoginUser: userData } = storeToRefs(onboardingStore);
const bookingsData = ref();
const { t } = useI18n();
const router = useRouter();
const table = ref<TableFields>({
  headers: [
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
    if (!userData.value?.id) router.push({ name: "login" });
    const response = flightStore.getBookingsByUserId(userData.value?.id);
    bookingsData.value = response;
  });
});
</script>
<template>
  <section class="content-page">
    <GeneralTable
      :headers="table.headers"
      :fields="bookingsData"
      :empty="table.empty"
      :loading="table.loading"
      :limit="table.limit"
      :offset="0"
      :pages="table.pages"
    />
  </section>
</template>
