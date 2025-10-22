<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
const emit = defineEmits(["change"]);

const store = useOnboardingStore();
const { t } = useI18n();
const localePath = useLocalePath();
const router = useRouter();
const registryDialog = ref(false);
const code = ref(0);
const { handleSubmit, errors, meta } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      phone: z
        .string({ message: t("rule.validation.require") })
        .min(10, { message: t("rule.validation.require") })
        .max(10, { message: t("rule.validation.require") }),
    })
  ),
});

// define variable
const { value: phone } = useField<string>("phone");

// methods

const onSubmit = handleSubmit(async (values: any) => {
  // emit('change', { change: 'email', data: { phone: values.phone } });
  // return
  useLoading(true);
  const response = await store.sendCodeRegistry({
    phoneNumber: `57${values.phone}`,
  });
  if (response.status && response.code === 100) {
    useShowAlert({
      type: "success",
      message: response.message,
    });
    registryDialog.value = true;
    code.value = response.data.code;
  } else {
    useShowAlert({
      type: "error",
      message: response.message,
    });
  }

  useLoading(false);
});
const validateOtp = async (otp: string) => {
  useLoading(true);
  const result = await useOnboardingStore().verifyCodeRegistry({
      phoneNumber: `57${phone.value}`,
      code: otp,
      pushToken: "1",
      platform: "user_android",
      version: "1.0.0",
    });

    if (result.status && result.code === 100) {
      emit('change', { change: 'email', data: { phone: phone } })
      setLoginUser({ user: null, ...result.data })
      registryDialog.value = false
      useCheckTrue();
      useShowAlert({
        type: "success",
        message: result.message,
      });
      useCheckFalse();
    } else {
      useShowAlert({
        type: "error",
        message: result.message,
      });
    }
    useLoading(false);
};
</script>
<template>
  <div>
    <div class="flex gap-2 align-items-center">
      <div class="back-icon">
        <i
          class="pi pi-arrow-left"
          @click="router.push(localePath({ name: 'home' }))"
        ></i>
      </div>
      <h5 class="h3-primary">
        {{ t("registry.firstStep.title") }}
      </h5>
    </div>
    <p class="color-white span-text app-font-arial-regular mt-3">
      {{ t("registry.firstStep.description") }}
    </p>
    <Form @submit.prevent="onSubmit" class="w-full">
      <div class="flex flex-column">
        <span class="general-input solo-login mt-4">
          <label for="password">{{ t("form.phone.label") }}</label>
          <InputText
            v-model="phone"
            v-keyfilter.num
            :maxLength="10"
            type="text"
            :placeholder="t('form.phone.placeholder')"
          />
          <GeneralInputError :error="errors['phone']" />
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
          :label="t('button.register')"
          @click="onSubmit"
        />
      </div>
    </Form>
    <GeneralDialog
      v-if="registryDialog"
      v-model:show="registryDialog"
      :closable="true"
      :title="t('text.validateCode')"
      width="613px"
    >
      <div>
        <ForgotPasswordValidateCode
          v-if="registryDialog"
          :user="{ phone: phone, code: code }"
          @otpCompleted="validateOtp($event)"
        />
      </div>
    </GeneralDialog>
  </div>
</template>
