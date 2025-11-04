<script setup lang="ts">
import flightsData from "../../../composables/mock/data.json";
import { useField, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
const route = useRoute();
const localePath = useLocalePath();
const router = useRouter();
const flights = ref<Flight[]>(flightsData.flights);
const flightStore = useFlightStore();
const onboardingStore = useOnboardingStore();
const { getLoginUser: userData } = onboardingStore;
const { t } = useI18n();
const flightData = ref();

const { handleSubmit, errors, meta, resetForm } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      name: z
        .string({ message: t("rule.validation.requireEmail") })
        .min(1, { message: t("rule.validation.requireEmail") }),
      surname: z
        .string({ message: t("rule.validation.requireEmail") })
        .min(1, { message: t("rule.validation.requireEmail") }),
      document: z
        .string({ message: t("rule.validation.require") })
        .min(1, { message: t("rule.validation.require") }),
      documentType: z
        .string({ message: t("rule.validation.require") })
        .min(1, { message: t("rule.validation.require") }),
      email: z
        .string({ message: t("rule.validation.requireEmail") })
        .email({ message: t("rule.validation.email") })
        .min(1, { message: t("rule.validation.requireEmail") }),
      selectedFlight: z
        .string({ message: t("rule.validation.require") })
        .min(1, { message: t("rule.validation.require") }),
      origin: z
        .string({ message: t("rule.validation.require") })
        .min(1, { message: t("rule.validation.require") }),
      destination: z
        .string({ message: t("rule.validation.require") })
        .min(1, { message: t("rule.validation.require") }),
      date: z
        .string({ message: t("rule.validation.require") })
        .min(1, { message: t("rule.validation.require") }),
      selectedSeat: z
        .number({ message: t("rule.validation.require") })
        .min(1, { message: t("rule.validation.require") }),
      cardNumber: z
        .string({ message: t("rule.validation.card.number") })
        .min(19, { message: t("rule.validation.card.number") }),
      cardExpiry: z.date({ message: t("rule.validation.card.expiry") }),
      cardCvv: z
        .string({ message: t("rule.validation.card.cvv") })
        .min(3, { message: t("rule.validation.card.cvv") }),

      price: z
        .number({ message: t("rule.validation.require") })
        .min(1, { message: t("rule.validation.require") }),
    })
  ),
});
const { value: name } = useField<string>("name");
const { value: surname } = useField<string>("surname");
const { value: document } = useField<string>("document");
const { value: email } = useField<string>("email");
const { value: selectedFlight } = useField<string>("selectedFlight");
const { value: origin } = useField<string>("origin");
const { value: destination } = useField<string>("destination");
const { value: date } = useField<string>("date");
const { value: selectedSeat } = useField<number>("selectedSeat");
const { value: cardNumber } = useField<string>("cardNumber");
const { value: cardExpiry } = useField<string>("cardExpiry");
const { value: cardCvv } = useField<string>("cardCvv");
const { value: documentType } = useField<string>("documentType", undefined, {
  initialValue: "CC",
});
const { value: price } = useField<string>("price");
const documents = ref([
  { id: "CC", alias: "CC" },
  { id: "CE", alias: "CE" },
  { id: "PASSPORT", alias: "PASAPORTE" },
]);
const onSubmit = handleSubmit(async (values: any) => {
  console.log("Form submitted with values:", values);
  const response = await flightStore.createBooking({
    user_id: userData?.id,
    flight_id: +route.params.id,
    name: values.name,
    surname: values.surname,
    document_number: values.document,
    document_type: values.documentType,
    seats_count: values.selectedSeat,
    total_price: values.price,
    price_per_seat: flightStore.calculateFinalPrice(
      flightData.value?.base_price,
      flightData.value?.departure_date
    ),
  });
  console.log(response);
  
});
const getData = () => {
  flightData.value = flightStore.getFlightById(+route.params.id);
  resetForm({
    values: {
      selectedFlight: flightData.value?.flight_number,
      origin: flightData.value?.origin,
      destination: flightData.value?.destiny,
      date: useFormatDate(flightData.value?.departure_date, "date-table"),
      selectedSeat: 1,
      price: flightStore.calculateFinalPrice(
        flightData.value?.base_price,
        flightData.value?.departure_date
      ),
    },
  });
};
onMounted(() =>
  nextTick(async () => {
    getData();
    
  })
);
watch(
  () => selectedSeat.value,
  (newSeat) => {
    if (newSeat) {
      price.value =
        flightStore.calculateFinalPrice(
          flightData.value?.base_price,
          flightData.value?.departure_date
        ) * newSeat;
    }
  }
);
</script>

<template>
  <div class="content-page">
    <form
      class="bg-white shadow-2xl rounded-2xl lg:tw-p-8 max-lg:tw-p-4 w-full max-w-sm border border-gray-200"
      @submit.prevent="onSubmit"
    >
      <div class="text-center lg:tw-mb-8 max-lg:tw-mb-4">
        <h1 class="text-2xl font-extrabold text-gray-800">
          Cada vez más cerca de cumplir tus sueños
        </h1>
        <p class="text-lg font-semibold text-gray-700 mt-1">
          Formulario de datos del pasajero
        </p>
      </div>

      <div class="space-y-4">
        <span class="general-input solo-form mt-3">
          <label for="name">{{ t("form.name.label") }}</label>

          <InputText
            id="name"
            v-model="name"
            :placeholder="$t('form.name.placeholder')"
          />
          <GeneralInputError :error="errors['name']" />
        </span>
        <span class="general-input solo-form mt-3">
          <label for="surname">{{ t("form.surname.label") }}</label>

          <InputText
            id="surname"
            v-model="surname"
            :placeholder="$t('form.surname.placeholder')"
          />
          <GeneralInputError :error="errors['surname']" />
        </span>

        <span class="general-input form-group mt-3">
          <label class="!tw-text-[#1a1a29]" for="age">{{
            t("form.document.label")
          }}</label>
          <div class="flex gap-3">
            <InputGroup>
              <InputGroupAddon>
                <Select
                  v-model="documentType"
                  option-value="id"
                  option-label="alias"
                  :placeholder="'CC'"
                  :options="documents"
                >
                  <template #dropdownicon>
                    <i
                      class="pi pi-angle-down"
                      style="
                        font-size: 15px;
                        color: #3db5e6;
                        font-weight: normal;
                      "
                    ></i>
                  </template>
                </Select>
              </InputGroupAddon>
              <InputText
                v-keyfilter.int
                v-model="document"
                :useGrouping="false"
                fluid
                type="phone"
                :placeholder="t('form.document.placeholder')"
                :maxlength="10"
              />
            </InputGroup>
          </div>
          <GeneralInputError :error="errors['document']" />
        </span>

        <div>
          <span class="general-input solo-form mt-3">
            <label for="email">{{ t("form.email.label") }}</label>

            <InputText
              id="email"
              v-model="email"
              type="email"
              :placeholder="$t('form.email.placeholder', { at: '@' })"
            />
            <GeneralInputError :error="errors['email']" />
          </span>
        </div>
        <span class="general-input solo-form mt-3">
          <label for="selectedFlight">{{
            t("form.selectedFlight.label")
          }}</label>

          <InputText
            id="selectedFlight"
            v-model="selectedFlight"
            :disabled="true"
            :placeholder="$t('form.selectedFlight.placeholder')"
          />
          <GeneralInputError :error="errors['selectedFlight']" />
        </span>

        <div class="tw-flex tw-gap-4 tw-w-full">
          <span class="general-input solo-form mt-3 tw-w-1/2">
            <label for="selectedFlight">{{ t("form.origin.label") }}</label>

            <InputText
              id="origin"
              v-model="origin"
              :disabled="true"
              :placeholder="$t('form.origin.placeholder')"
            />
            <GeneralInputError :error="errors['origin']" />
          </span>
          <span class="general-input solo-form mt-3 tw-w-1/2">
            <label for="selectedFlight">{{
              t("form.destination.label")
            }}</label>

            <InputText
              id="destination"
              v-model="destination"
              :disabled="true"
              :placeholder="$t('form.destination.placeholder')"
            />
            <GeneralInputError :error="errors['destination']" />
          </span>
        </div>

        <span class="general-input solo-form mt-3">
          <label for="selectedFlight">{{
            t("form.departureDate.label")
          }}</label>
          <InputText
            id="departureDate"
            v-model="date"
            :disabled="true"
            :placeholder="$t('form.departureDate.placeholder')"
          />
          <GeneralInputError :error="errors['date']" />
        </span>
        <span class="general-input solo-form mt-3">
          <label for="selectedFlight">{{ t("form.seats.placeholder") }}</label>
          <InputNumber
            id="selectedSeat"
            v-model="selectedSeat"
            :max="flightData?.available_seats"
            :min="1"
            :placeholder="$t('form.seats.placeholder')"
          />
          <GeneralInputError :error="errors['selectedSeat']" />
        </span>
        <span class="general-input form-group mt-3">
          <label class="!tw-text-[#1a1a29]" for="age">{{
            t("form.card.label")
          }}</label>
          <InputGroup>
            <InputGroupAddon>
              <InputMask
                v-model="cardNumber"
                :useGrouping="false"
                fluid
                type="tel"
                slot-char=""
                mask="9999 9999 9999 9999"
                :autoClear="false"
                :placeholder="t('form.card.number')"
              />
            </InputGroupAddon>
            <DatePicker
              v-model="cardExpiry"
              view="month"
              :minDate="new Date()"
              fluid
              dateFormat="mm/yy"
              :placeholder="t('form.card.expiration')"
            />
            <InputGroupAddon>
              <InputText
                v-keyfilter.int
                v-model="cardCvv"
                :useGrouping="false"
                fluid
                type="tel"
                :placeholder="t('form.card.cvv')"
                :maxlength="3"
              />
            </InputGroupAddon>
          </InputGroup>
          <GeneralInputError
            :error="
              errors['cardNumber'] || errors['cardExpiry'] || errors['cardCvv']
            "
          />
        </span>

        <span class="general-input solo-form mt-3">
          <label for="selectedFlight">{{ t("form.price") }}</label>
          <InputNumber
            id="price"
            v-model="price"
            :disabled="true"
            mode="currency"
            currency="COP"
            locale="es-CO"
            :min="1"
            :placeholder="$t('form.price')"
          />
          <GeneralInputError :error="errors['price']" />
        </span>

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
