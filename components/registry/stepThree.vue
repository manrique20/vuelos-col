<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
const emit = defineEmits(["change", 'return']);
const props = defineProps<{
  userData: {
    phone: string;
    email: string;
    name: string;
  }
}>();
const store = useOnboardingStore();
const { t } = useI18n();
const localePath = useLocalePath();
const router = useRouter();
const registryDialog = ref(false);
const code = ref(0);
const { handleSubmit, errorBag, values, meta } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      password: z
        .string()
        .nonempty('require')
        .min(8, { message: 'min' })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d*]+$/, {
          message: 'validation',
        }),
      confirmPassword: z.string().refine((value) => value === values.password, {
        message: 'mask',
      }),
    }),
  ),
})

// variables
const iconPassword = ref(false)
const iconPasswordConfirm = ref(false)
const { value: password } = useField<string>('password')
const { value: confirmPassword } = useField<string>('confirmPassword')

// method

const validateErrors = (input: string, text: string) => {
  let validate = false;

  if (values[input] && errorBag.value[input]) {
    const error = errorBag.value[input];
    if (!error?.includes(text)) {
      validate = true;
    }
  }

  if (values[input] && !errorBag.value[input]) {
    validate = true;
  }

  return validate;
};

const getValidationIcon = (field: string, errorType?: string) => {
  if (!values[field]) {
    return "/icons/icon_password_validation.svg";
  }

  if (errorBag.value[field]) {
    return "/icons/icon_password_false.svg";
  }

  if (field === "password") {
    const hasMinLength = validateErrors("password", "min");
    const hasValidFormat = validateErrors("password", "validation");
    if (hasMinLength && hasValidFormat) {
      return "/icons/icon_password_true.svg";
    } else {
      return "/icons/icon_password_false.svg";
    }
  }

  if (field === "confirmPassword") {
    const isMatching = validateErrors("confirmPassword", "mask");
    if (isMatching) {
      return "/icons/icon_password_true.svg";
    } else {
      return "/icons/icon_password_false.svg";
    }
  }

  return "/icons/icon_password_validation.svg";
};

// methods

const onSubmit = handleSubmit(async (values: any) => {
  useLoading(true);
  const encryPassword = useEncrypt(values.password);
  const formData = 
    {
      fullname: props.userData.name,
      email: props.userData.email,
      phone: props.userData.phone,
      password: encryPassword.password,
      confirmPassword: encryPassword.password,
      iv: encryPassword.iv,
    }
console.log(formData);
    const response = await store.createUser(formData);
    if (response.status && response.code === 100) {
      useShowAlert({
        type: "success",
        message: response.message,
      });
      useCheckTrue()
      useCheckFalse( () => {
        router.push(localePath({ name: 'login' }));
      })
    } else {
      useShowAlert({
        type: "error",
        message: response.message,
      });
    }
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
        {{ t("registry.thirdStep.title") }}
      </h5>
    </div>
    <p class="color-white span-text app-font-arial-regular mt-3">
      {{ t("registry.thirdStep.description") }} 
    </p>
 
    <Form @submit.prevent="onSubmit" class="w-full">
      <div class="flex flex-column">
    <span class="general-input solo-login my-4" >
      <label for="password">
        {{ t("form.passwordNew.label") }}
      </label>
      <IconField icon-position="right">
        <InputText
          v-model="password"
          placeholder="********"
          :type="iconPassword ? 'text' : 'password'"
          aria-describedby="text-error"
        />
        <InputIcon class="cursor-pointer" @click="iconPassword = !iconPassword">
          <img
            :src="`/icons/${!iconPassword ? 'ic_eye_hidden' : 'ic_eye_not_hidden'}.svg`"
            alt="show"
          />
        </InputIcon>
      </IconField>
      <div class="flex flex-column gap-2 ">
        <small class="flex align-items-center gap-2 color-white text-xs">
          <img
            :src="getValidationIcon('password')"
            alt="validation"
            height="9px"
            width="9px"
          />
          {{ t("rule.validation.password.valid") }}
        </small>
      </div>
    </span>
    <span class="general-input solo-login" >
      <label for="password">
        {{ t("form.confirmPassword.label") }}
      </label>

      <IconField icon-position="right">
        <InputText
          v-model="confirmPassword"
          placeholder="********"
          :type="iconPasswordConfirm ? 'text' : 'password'"
          aria-describedby="text-error"
        />
        <InputIcon
          class="cursor-pointer"
          @click="iconPasswordConfirm = !iconPasswordConfirm"
        >
          <img
            :src="`/icons/${!iconPasswordConfirm ? 'ic_eye_hidden' : 'ic_eye_not_hidden'}.svg`"
            alt="show"
          />
        </InputIcon>
      </IconField>
      <div class="flex flex-column tw-mt-8">
        <small class="flex align-items-center gap-2 color-white text-xs">
          <img
            :src="getValidationIcon('confirmPassword')"
            alt="validation"
            height="9px"
            width="9px"
          />
          {{ t("rule.validation.password.confirm") }}
        </small>
      </div>
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
