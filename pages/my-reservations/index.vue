<script setup lang="ts">
import type { TableFields } from "~/interfaces/Table.interface";
/** Stores */
const bookingStore = useBookingStore();
const onboardingStore = useOnboardingStore();
const { getLoginUser: userData } = storeToRefs(onboardingStore);
const {getOneBooking: bookingData} = storeToRefs(bookingStore);
const { t } = useI18n();
const router = useRouter();
const table = ref<TableFields>({
  headers: [
    {
      field: "reservationCode",
      header: t("table.booking_id"),
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
onMounted(() => {
  nextTick(async () => {
    if (!userData.value?.id) router.push({ name: "login" });
    const response = await bookingStore.getBookingByUserId(userData.value?.id);
  });
});
</script>
<template>
  <section class="content-page">
    <GeneralTable
      :headers="table.headers"
      :fields="bookingData"
      :empty="table.empty"
      :loading="table.loading"
      :limit="table.limit"
      :offset="0"
      :pages="table.pages"
    />
  </section>
</template>
