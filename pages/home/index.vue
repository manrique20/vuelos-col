<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

/** Stores */
const onboardingStore = useOnboardingStore();
const flightStore = useFlightStore();
const flightsStore = useFlightsStore();
const { getLoginUser: userData } = onboardingStore;
const { t } = useI18n();
const localePath = useLocalePath();
const router = useRouter();
const route = useRoute();
const { getFlights: searchResults } = storeToRefs(flightsStore);
const { isLoading, error } = storeToRefs(flightStore);
// Form validation schema
const { handleSubmit, errors, meta, resetForm, values } = useForm({
  validationSchema: toTypedSchema(
    z
      .object({
        selectedOriginCity: z
          .string({ message: t("rule.validation.require") })
          .min(1, { message: t("rule.validation.require") }),
        selectedDestinationCity: z
          .string({ message: t("rule.validation.require") })
          .min(1, { message: t("rule.validation.require") }),
        departureDate: z.date({ message: t("rule.validation.require") }),
        arrivalDate: z.date({ message: t("rule.validation.require") }),
      })
      .refine((data) => data.arrivalDate >= data.departureDate, {
        message: t("rule.validation.date"),
        path: ["arrivalDate"],
      })
  ),
});

const { value: selectedOriginCity } = useField<string>("selectedOriginCity");
const { value: selectedDestinationCity } = useField<string>(
  "selectedDestinationCity"
);
const { value: departureDate } = useField<Date>("departureDate");
const { value: arrivalDate } = useField<Date>("arrivalDate");

const cities = [
  { name: "Bogotá", code: "BOG" },
  { name: "Medellín", code: "MED" },
  { name: "Cali", code: "CALI" },
  { name: "Barranquilla", code: "BAR" },
];

const showResults = ref(false);
// Handle form submission
const onSubmit = handleSubmit(async (values: any) => {
  showResults.value = false;
  // Update route with query params
  await router.push({
    name: route.name,
    query: {
      origin: values.selectedOriginCity,
      destination: values.selectedDestinationCity,
      departureDate: useFormatDate(
        values.departureDate.toISOString(),
        "date-send"
      ),
      arrivalDate: useFormatDate(values.arrivalDate.toISOString(), "date-send"),
    },
  });

  const response = await flightsStore.fetchFlights({
    origin: values.selectedOriginCity,
    destination: values.selectedDestinationCity,
    departureDate: useFormatDate(
      values.departureDate.toISOString(),
      "date-send"
    ),
    arrivalDate: useFormatDate(values.arrivalDate.toISOString(), "date-send"),
  });
  console.log(response);

  showResults.value = true;
});
// Redirect to flight details with query params
const redirectToFlightDetails = (flight: number) => {
  router.push(
    localePath({
      name: "home-id",
      params: { id: flight },
      query: {
        origin: selectedOriginCity.value,
        destination: selectedDestinationCity.value,
        departureDate: useFormatDate(
          departureDate.value?.toISOString() || "",
          "date-send"
        ),
        arrivalDate: useFormatDate(
          arrivalDate.value?.toISOString() || "",
          "date-send"
        ),
      },
    })
  );
};
// Redirect to login with query params
const redirectToLogin = () => {
  router.push(
    localePath({
      name: "login",
      query: {
        origin: selectedOriginCity.value,
        destination: selectedDestinationCity.value,
        departureDate: useFormatDate(
          departureDate.value?.toISOString() || "",
          "date-send"
        ),
        arrivalDate: useFormatDate(
          arrivalDate.value?.toISOString() || "",
          "date-send"
        ),
      },
    })
  );
};
onMounted(() => {
  nextTick(() => {
    // If query params exist, pre-fill the form and submit
    if (
      route.query.origin &&
      route.query.destination &&
      route.query.departureDate &&
      route.query.arrivalDate
    ) {
      selectedOriginCity.value = String(route.query.origin);
      selectedDestinationCity.value = String(route.query.destination);
      departureDate.value = new Date(
        new Date(String(route.query.departureDate)).setDate(
          new Date(String(route.query.departureDate)).getDate() + 1
        )
      );
      arrivalDate.value = new Date(
        new Date(String(route.query.arrivalDate)).setDate(
          new Date(String(route.query.arrivalDate)).getDate() + 1
        )
      );
      onSubmit();
    }
  });
});
</script>

<template>
  <section class="content-page">
    <Card class="general-card">
      <template #content>
        <!-- Form for flight search -->
        <div
          class="tw-flex lg:tw-justify-between max-lg:tw-flex-col tw-items-center tw-gap-6"
        >
          <div
            class="tw-flex tw-items-center max-lg:tw-flex-col tw-gap-3 max-lg:tw-w-full"
          >
            <span class="general-dropwdown form">
              <label> {{ t("form.origin.label") }}</label>
              <IconField>
                <InputIcon>
                  <img
                    src="/icons/ic_airplane.svg"
                    alt="airplane icon"
                    width="15px"
                    height="15px"
                  />
                </InputIcon>
                <Select
                  v-model="selectedOriginCity"
                  :options="cities"
                  optionLabel="name"
                  option-value="code"
                  :placeholder="t('form.origin.placeholder')"
                />
              </IconField>
              <GeneralInputError :error="errors['selectedOriginCity']" />
            </span>
            <span class="general-dropwdown form">
              <label> {{ t("form.destination.label") }}</label>
              <IconField>
                <InputIcon>
                  <img
                    src="/icons/ic_airplane.svg"
                    alt="airplane icon"
                    width="15px"
                    height="15px"
                    style="transform: rotate(180deg)"
                  />
                </InputIcon>
                <Select
                  v-model="selectedDestinationCity"
                  :options="cities"
                  optionLabel="name"
                  option-value="code"
                  :placeholder="t('form.destination.placeholder')"
                />
              </IconField>
              <GeneralInputError :error="errors['selectedDestinationCity']" />
            </span>
            <span class="general-date filter">
              <label>{{ t("form.departureDate.label") }}</label>
              <DatePicker
                v-model="departureDate"
                dateFormat="dd/mm/yy"
                :placeholder="t('form.departureDate.placeholder')"
                :minDate="new Date()"
                showIcon
                fluid
              >
                <template #iconDisplay="slotProps">
                  <i class="pi pi-calendar-plus"></i>
                </template>
              </DatePicker>
              <GeneralInputError :error="errors['departureDate']" />
            </span>
            <span class="general-date filter">
              <label>{{ t("form.arrivalDate.label") }}</label>
              <DatePicker
                v-model="arrivalDate"
                dateFormat="dd/mm/yy"
                :placeholder="t('form.arrivalDate.placeholder')"
                :minDate="departureDate || new Date()"
                showIcon
                fluid
              >
                <template #iconDisplay="slotProps">
                  <i class="pi pi-calendar-plus"></i>
                </template>
              </DatePicker>
              <GeneralInputError :error="errors['arrivalDate']" />
            </span>
          </div>
          <Button
            type="submit"
            class="app-general-button app-btn-primary tw-h-[42px]"
            :label="t('button.search')"
            :loading="isLoading"
            @click="onSubmit"
          />
        </div>
      </template>
    </Card>

    <div v-if="error" class="tw-mt-4">
      <Message severity="error" :closable="true">{{ error }}</Message>
    </div>
    <!-- Display search results -->
    <div v-if="showResults" class="tw-mt-6">
      <Card class="general-card">
        <template #header>
          <div class="tw-px-6 tw-pt-4">
            <h2 class="tw-text-xl tw-font-semibold">
              {{ t("home.availableFlights") }}
              <span class="tw-text-sm tw-font-normal tw-text-gray-600">
                ({{ searchResults.length }} {{ t("home.results") }})
              </span>
            </h2>
          </div>
        </template>
        <template #content>
          <!-- No results found message -->
          <div v-if="searchResults.length === 0" class="tw-text-center tw-py-8">
            <i class="pi pi-inbox tw-text-5xl tw-text-gray-400 tw-mb-4"></i>
            <p class="tw-text-lg tw-text-gray-600">
              {{ t("home.notFound.1") }}
            </p>
            <p class="tw-text-sm tw-text-gray-500 tw-mt-2">
              {{ t("home.notFound.2") }}
            </p>
          </div>
          <!-- List of available flights -->
          <div v-else class="tw-space-y-4">
            <div
              v-for="flight in searchResults"
              :key="flight.id"
              class="flights-card"
            >
              <div
                class="tw-flex lg:tw-justify-between max-lg:tw-flex-col tw-items-start"
              >
                <div class="lg:tw-flex-1 max-lg:tw-w-full">
                  <div class="tw-flex tw-items-center tw-gap-4 tw-mb-3">
                    <span class="tw-text-gray-600">{{
                      flight.flight_number
                    }}</span>
                    <span
                      class="tw-text-xs tw-px-2 tw-py-1 tw-bg-blue-100 tw-text-blue-800 tw-rounded"
                    >
                      {{ flight.aircraft_type }}
                    </span>
                  </div>

                  <div class="tw-flex tw-items-center tw-gap-6">
                    <div class="tw-text-center">
                      <div class="tw-text-2xl tw-font-bold">
                        {{ useFormatDate(flight.departure_hour, "only-hour") }}
                      </div>
                      <div class="tw-text-sm tw-text-gray-600">
                        {{ flight.origin_code }}
                      </div>
                      <div class="tw-text-xs tw-text-gray-500">
                        {{ flight.origin }}
                      </div>
                    </div>

                    <div class="tw-flex-1 tw-flex tw-items-center">
                      <Divider />
                      <i class="pi pi-send tw-mx-2 tw-text-gray-400"></i>
                      <Divider />
                    </div>
                    <div class="tw-text-center">
                      <div class="tw-text-2xl tw-font-bold">
                        {{ useFormatDate(flight.arrival_hour, "only-hour") }}
                      </div>
                      <div class="tw-text-sm tw-text-gray-600">
                        {{ flight.destiny_code }}
                      </div>
                      <div class="tw-text-xs tw-text-gray-500">
                        {{ flight.destiny }}
                      </div>
                    </div>
                  </div>

                  <div
                    class="tw-flex tw-gap-4 tw-mt-3 tw-text-sm tw-text-gray-600 max-lg:tw-justify-center"
                  >
                    <span>
                      <i class="pi pi-calendar tw-mr-1"></i>
                      {{ useFormatDate(flight.departure_date, "date-table") }}
                    </span>
                    <span class="max-lg:tw-text-right">
                      <i class="pi pi-users tw-mr-1"></i>
                      {{ flight.available_seats }}
                      {{ t("home.availableSeats") }}
                    </span>
                  </div>
                </div>

                <div
                  class="lg:tw-text-right lg:tw-ml-4 max-lg:tw-w-full max-lg:tw-text-center max-lg:tw-mt-4"
                >
                  <p
                    class="tw-text-sm tw-text-gray-500 tw-line-through"
                    v-if="
                      flight.base_price !==
                      flightStore.calculateFinalPrice(
                        flight.base_price,
                        flight.departure_date
                      )
                    "
                  >
                    {{ useFormatPrice(flight.base_price) }}
                  </p>
                  <p class="tw-text-2xl tw-font-bold tw-text-green-600">
                    {{
                      useFormatPrice(
                        flightStore.calculateFinalPrice(
                          flight.base_price,
                          flight.departure_date
                        )
                      )
                    }}
                  </p>
                  <p class="tw-text-xs tw-text-gray-500">
                    {{ t("home.perPerson") }}
                  </p>
                  <Button
                    :label="t('button.select')"
                    class="tw-mt-3"
                    size="small"
                    severity="success"
                    @click="
                      userData?.id
                        ? redirectToFlightDetails(flight.id)
                        : redirectToLogin()
                    "
                  />
                </div>
              </div>
            </div>
          </div>
        </template>
      </Card>
    </div>

    <div v-if="isLoading" class="tw-mt-6 tw-text-center">
      <ProgressSpinner
        style="width: 50px; height: 50px"
        strokeWidth="4"
        animationDuration=".5s"
      />
      <p class="tw-mt-2 tw-text-gray-600">{{ t("home.searchingFlights") }}</p>
    </div>
  </section>
</template>

<style scoped></style>
