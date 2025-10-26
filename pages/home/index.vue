<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
/** Stores */

const { t } = useI18n();
const localePath = useLocalePath();
const router = useRouter();
const { handleSubmit, errors, meta } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      selectedOriginCity: z
        .string({ message: t("rule.validation.require") })
        .min(1, { message: t("rule.validation.require") }),
      selectedDestinationCity: z
        .string({ message: t("rule.validation.require") })
        .min(1, { message: t("rule.validation.require") }),
      departureDate: z.date({ message: t("rule.validation.require") }),
      arrivalDate: z.date({ message: t("rule.validation.require") }),
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
const onSubmit = handleSubmit(async (values: any) => {
  console.log(values);
});
onMounted(() => {
  nextTick(() => {});
});
</script>
<template>
  <section class="content-page">
    <Card class="general-card">
      <template #content>
        <div class="tw-flex lg:tw-justify-between max-lg:tw-flex-col tw-items-center tw-gap-6">
          <div class="tw-flex tw-items-center max-lg:tw-flex-col tw-gap-3 max-lg:tw-w-full">
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
                    style="transform: rotate(180deg);"
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
                :minDate="new Date()"
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
            @click="onSubmit"
          />
        </div>
      </template>
    </Card>
  </section>
</template>
