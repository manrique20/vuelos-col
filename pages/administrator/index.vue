<script setup lang="ts">
import type { PageEvent } from "~/interfaces/General.interface";
import { storeToRefs } from "pinia";

import { Status } from "~/interfaces/Enums.interface";
import type { TableFields } from "~/interfaces/Table.interface";

const flightSearchStore = useFlightSearch();
const {allData} = flightSearchStore;
/** stores */
/** variables */
const { t } = useI18n();
const router = useRouter();
const localePath = useLocalePath();
const openCreate = ref(false);
const statuses = Object.entries(Status).map(([key, value]) => ({
  key: t(`table.state.${key}`),
  value,
}));
      const onboardingStore = useOnboardingStore();
      const { getLoginUser: userData } = storeToRefs(onboardingStore);
const data = ref(allData.value);
const offset = ref(0);
// variables
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
      field: "destination",
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
      field: "aircraft",
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
onMounted(() => {
nextTick(() => {
  if(userData.value?.rol !== 'admin') {
    router.push(localePath({ name: "home" }));
  }
});
});
</script>
<template>
  <section class="content-page">
    <div class="general-filter">
      <div class="filter-section">
        <span class="general-input filter" style="min-width: 269px">
          <IconField>
            <InputText
              :placeholder="t('table.filters.search')"
              @keyup.enter="getList()"
            />
            <InputIcon>
              <i class="pi pi-search"></i>
            </InputIcon>
          </IconField>
        </span>

        <span class="general-dropwdown filter" style="min-width: 166px">
          <Select
            option-value="value"
            option-label="key"
            :options="[
              {
                key: t('table.filters.all'),
                value: '',
              },
              ...statuses,
            ]"
            :placeholder="t('table.filters.status')"
          />
        </span>
      </div>
    </div>
    <GeneralTable
      :headers="table.headers"
      :fields="data"
      :empty="table.empty"
      :loading="table.loading"
      :limit="table.limit"
      :offset="offset"
      :pages="table.pages"
    />
  </section>
</template>
