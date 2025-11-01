<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
const emit = defineEmits(["change"]);

const authStore = useAuthStore(); 
const { t } = useI18n();
const localePath = useLocalePath();
const router = useRouter();
const registryDialog = ref(false);
const code = ref(0);
const { handleSubmit, errors, meta, errorBag, values } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      phone: z
        .string({ message: t("rule.validation.require") })
        .min(10, { message: t("rule.validation.require") })
        .max(10, { message: t("rule.validation.require") }),
      name: z
        .string({ message: t("rule.validation.require") })
        .min(1, { message: t("rule.validation.require") }),
      surname: z
        .string({ message: t("rule.validation.require") })
        .min(1, { message: t("rule.validation.require") }),
      documentType: z
        .string({ message: t("rule.validation.require") })
        .min(1, { message: t("rule.validation.require") }),
      documentNumber: z
        .string({ message: t("rule.validation.require") })
        .min(1, { message: t("rule.validation.require") }),
      email: z
        .string({ message: t("rule.validation.require") })
        .email({ message: t("rule.validation.email") })
        .min(1, { message: t("rule.validation.require") }),
      password: z
        .string()
        .nonempty("require")
        .min(8, { message: "min" })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d*]+$/, {
          message: "validation",
        }),
      confirmPassword: z.string().refine((value) => value === values.password, {
        message: "mask",
      }),
    })
  ),
});
const documents = ref([
  { id: "CC", alias: "CC" },
  { id: "CE", alias: "CE" },
  { id: "PASSPORT", alias: "PASAPORTE" },
]);
// define variable
const iconPassword = ref(false);
const iconPasswordConfirm = ref(false);
const { value: phone } = useField<string>("phone");
const { value: name } = useField<string>("name");
const { value: surname } = useField<string>("surname");
const { value: documentType } = useField<string>("documentType", undefined, {
  initialValue: "CC",
});
const { value: documentNumber } = useField<string>("documentNumber");
const { value: email } = useField<string>("email");
const { value: password } = useField<string>("password");
const { value: confirmPassword } = useField<string>("confirmPassword");

// methods

const onSubmit = handleSubmit(async (values: any) => {
  try {
    useLoading(true);
    const userData = {
      email: email.value,
      password: password.value,
      name: name.value,
      surname: surname.value,
      cellphone: `57${phone.value}`, 
      document_type: documentType.value,
      document_number: documentNumber.value,
    };

    const newUser = authStore.register(userData);
    
    useShowAlert({
      type: "success",
      message: "Usuario registrado exitosamente",
    });
    
    await router.push(localePath({name: 'login'}));
    
  } catch (error: any) {
    useShowAlert({
      type: "error",
      message: error.message || "Error al registrar el usuario",
    });
  } finally {
    useLoading(false);
  }

});
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
          <label for="name">{{ t("form.name.label") }}</label>
          <InputText
            v-model="name"
            :maxLength="50"
            type="text"
            :placeholder="t('form.name.placeholder')"
          />
          <GeneralInputError :error="errors['name']" />
        </span>
        <span class="general-input solo-login mt-4">
          <label for="surname">{{ t("form.surname.label") }}</label>
          <InputText
            v-model="surname"
            :maxLength="50"
            type="text"
            :placeholder="t('form.surname.placeholder')"
          />
          <GeneralInputError :error="errors['surname']" />
        </span>

        <span class="general-input solo-login mt-4">
          <label for="email">{{ t("form.email.label") }}</label>
          <InputText
            v-model="email"
            :maxLength="100"
            type="email"
            :placeholder="t('form.email.placeholder')"
          />
          <GeneralInputError :error="errors['email']" />
        </span>
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
        <span class="general-input form-group mt-3">
          <label for="age">{{ t("form.document.label") }}</label>
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
                v-model="documentNumber"
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
        <span class="general-input solo-login my-4">
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
            <InputIcon
              class="cursor-pointer"
              @click="iconPassword = !iconPassword"
            >
              <img
                :src="`/icons/${!iconPassword ? 'ic_eye_hidden' : 'ic_eye_not_hidden'}.svg`"
                alt="show"
              />
            </InputIcon>
          </IconField>
          <div class="flex flex-column gap-2">
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
        <span class="general-input solo-login">
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
          <div class="flex flex-column">
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
