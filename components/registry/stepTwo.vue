<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
const emit = defineEmits(["change", 'return']);

const store = useOnboardingStore();
const { t } = useI18n();
const localePath = useLocalePath();
const router = useRouter();
const registryDialog = ref(false);
const code = ref(0);
const { handleSubmit, errors, meta, resetForm } = useForm({
  validationSchema: toTypedSchema(
    z.object({
        name: z
        .string({ message: t("rule.validation.require") })
        .min(1, { message: t("rule.validation.require") })
        .max(100, { message: t("rule.validation.require") }),
        email: z
        .string()
        .email({ message: t("rule.validation.email") })
        .min(1, { message: t("rule.validation.require") }),
      phone: z
        .string({ message: t("rule.validation.require") })
        .min(10, { message: t("rule.validation.require") })
        .max(10, { message: t("rule.validation.require") }),
    })
  ),
});

// define variable
const { value: phone } = useField<string>("phone");
const { value: email } = useField<string>("email");
const { value: name } = useField<string>("name");

// methods

const onSubmit = handleSubmit(async (values: any) => {
  useLoading(true);
  emit('change', {change: 'password', data: values});
  useLoading(false);
});
const resetFormForStep = (userPhone: string) => {
  phone.value = userPhone;
};
defineExpose({
    resetFormForStep,
})
</script>
<template>
  <div>
    <div class="flex gap-2 align-items-center">
      <div class="back-icon">
        <i
          class="pi pi-arrow-left"
          @click="emit('return')"
        ></i>
      </div>
      <h5 class="h3-primary">
        {{ t("registry.secondStep.title") }}
      </h5>
    </div>
    <p class="color-white span-text app-font-arial-regular mt-3">
      {{ t("registry.secondStep.description") }} 
    </p>
 
    <Form @submit.prevent="onSubmit" class="w-full">
      <div class="flex flex-column">
        <span class="general-input solo-login mt-4">
          <label for="password">{{ t("form.fullname.label") }}</label>
          <InputText
            v-model="name"
            type="text"
            :placeholder="t('form.fullname.placeholder')"
          />
          <GeneralInputError :error="errors['name']" />
        </span>
        <span class="general-input solo-login mt-4">
          <label for="password">{{ t("form.phone.label") }}</label>
          <InputGroup>
            <InputText
            v-model="phone"
            v-keyfilter.num
            :maxLength="10"
            :disabled="true"
            type="text"
            :placeholder="t('form.phone.placeholder')"
            />
              <Button
              class="app-general-button app-btn-transparent w-full"
              :label="t('button.change')"
              style="width: 85px !important"
              @click="emit('return')"
              />
            </InputGroup>
          <GeneralInputError :error="errors['phone']" />
        </span>
        <span class="general-input solo-login mt-4">
          <label for="password">{{ t("form.email.label") }}</label>
          <InputText
            v-model="email"
            type="text"
            :placeholder="t('form.email.placeholder')"
          />
          <GeneralInputError :error="errors['email']" />
        </span>
      </div>
      <div class="flex justify-content-between align-items-center mt-6">
        <Button
          type="submit"
          class="app-general-button w-full"
          :class="{
            'app-btn-disabled': !meta.valid,
            ' app-btn-primary': meta.valid,
          }"
          style="height: 50px"
          :label="t('button.continue')"
          @click="onSubmit"
        />
      </div>
    </Form>

  </div>
</template>
