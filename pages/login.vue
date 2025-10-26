<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

const store = useOnboardingStore();
const { t } = useI18n();
const localePath = useLocalePath();
const router = useRouter();
const forgotPasswordDialog = ref(false);
definePageMeta({ layout: "login" });

const { handleSubmit, errors, meta } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      email: z
        .string({ message: t("rule.validation.requireEmail") })
        .email({ message: t("rule.validation.email") })
        .min(1, { message: t("rule.validation.requireEmail") }),
      password: z
        .string({ message: t("rule.validation.require") })
        .min(1, { message: t("rule.validation.require") }),
    })
  ),
});

// define variable
const { value: email } = useField<string>("email");
const { value: password } = useField<string>("password");
const iconPassword = ref(false);

// methods

const validatePassword = computed(() => {
  let icon = "pi pi-eye-slash";
  if (iconPassword.value) {
    icon = "pi pi-eye";
  }
  return { icon };
});

const onSubmit = handleSubmit(async (values: any) => {
  useLoading(true);
  const formData = { ...values };
  formData.password = useEncrypt(formData.password);
  formData.iv = formData.password.iv;
  formData.password = formData.password.password;
  formData.platform = "backoffice";
  formData.type = "lc";
  formData.version = "1.0.0";
  formData.pushToken = "1";

  const result = await store.login(formData);

  if (result.status && result.code === 100) {
    useShowAlert({
      type: "success",
      message: result.message,
    });
    router.push(localePath({ path: "/profile" }));
  } else {
    useShowAlert({
      type: "error",
      message: result.message,
    });
  }
  useLoading(false);
});
</script>
<template>
  <div class="card-img-container">
    <div class="card-image"></div>
  </div>
  <div class="bg-container-password"></div>
  <div class="card-login-container">
    <Card
      class="card-login"
      :style="{
        'max-width': '512px',
      }"
      :pt="{ footer: { class: 'flex justify-content-end mt-5' } }"
    >
      <template #title>
        <h5 class="h3-primary">
          {{ t("title.welcome") }}
        </h5>
      </template>
      <template #content>
        <Form @submit.prevent="onSubmit" class="w-full">
          <div class="flex flex-column">
            <span class="general-input solo-login mt-3">
              <label for="email">{{ t("form.email.label") }}</label>

              <InputText
                id="email"
                v-model="email"
                type="email"
                :placeholder="$t('form.email.placeholder', { at: '@' })"
              />
              <GeneralInputError :error="errors['email']" />
            </span>
            <span class="general-input solo-login mt-4">
              <label for="password">{{ t("form.password.label") }}</label>
              <IconField>
                <InputText
                  v-model="password"
                  :type="iconPassword ? 'text' : 'password'"
                  :placeholder="t('form.password.placeholder')"
                />
                <InputIcon
                  id="password"
                  class="cursor-pointer"
                  @click="iconPassword = !iconPassword"
                >
                  <i :class="validatePassword.icon"></i>
                </InputIcon>
              </IconField>
              <GeneralInputError :error="errors['password']" />
            </span>
          </div>
          <div
            class="flex justify-content-between align-items-center mt-6 gap-2"
          >
            <Button
              type="button"
              class="app-general-button app-btn-disabled w-full"
              style="height: 46px"
              :label="t('button.back')"
              @click="router.push(localePath({ name: 'home' }))"
            />
            <Button
              type="submit"
              class="app-general-button app-btn-primary w-full"
              style="height: 46px"
              :label="t('button.login')"
              @click="onSubmit"
            />
          </div>
        </Form>
      </template>
    </Card>
  </div>
</template>
