<script lang="ts" setup>
import { useField, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import type { InputFile } from "~/interfaces/Administrators.interface";

const onboardingStore = useOnboardingStore();
const { getProfileData: profile } = storeToRefs(onboardingStore);

const { t } = useI18n();
const refFile = ref<any>(null);
const disabledPassword = ref(true);
const { value: mandatoryNewpassword } = useField<boolean | null>(
  "mandatoryNewpassword"
);

const createValidationSchema: any = (isMandatoryPassword: boolean) => {
  const baseSchema = {
    imageValue: z.object({
      image: z.string().optional(),
      file: z.instanceof(File).nullable().optional(),
    }),
    name: z
      .string({ message: t("rule.validation.require") })
      .min(1, { message: t("rule.validation.require") }),
    email: z
      .string({ message: t("rule.validation.require") })
      .email({ message: t("rule.validation.email") })
      .min(1, { message: t("rule.validation.require") }),
    phone: z
      .string({ message: t("rule.validation.require") })
      .min(1, { message: t("rule.validation.require") }),
    mandatoryNewpassword: z.boolean().nullable().optional().default(false),
  };
  if (isMandatoryPassword) {
    return z.object({
      ...baseSchema,
      currentPassword: z
        .string({ message: t("rule.validation.require") })
        .min(1, { message: t("rule.validation.require") }),
      newPassword: z
        .string({ message: t("rule.validation.require") })
        .min(1, { message: t("rule.validation.require") })
        .min(8, { message: t("rule.validation.password.min") })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d*]+$/, {
          message: t("rule.validation.password.validation"),
        }),
      confirmNewPassword: z
        .string()
        .refine((value) => value === values.newPassword, {
          message: "mask",
        }),
    });
  } else {
    return z.object({
      ...baseSchema,
      newPassword: z.string().nullable().optional().or(z.literal("")),
      confirmNewPassword: z.string().nullable().optional().or(z.literal("")),
    });
  }
};
const validationSchema = computed(() =>
  toTypedSchema(createValidationSchema(mandatoryNewpassword.value))
);

const { handleSubmit, errors, meta, resetForm, values, errorBag, resetField } =
  useForm({
    validationSchema,
  });

const { value: imageValue } = useField<InputFile>("imageValue");
const { value: name } = useField<string>("name");
const { value: email } = useField<string>("email");
const { value: phone } = useField<string>("phone");
const { value: newPassword } = useField<string | null>("newPassword");
const { value: confirmNewPassword } = useField<string | null>(
  "confirmNewPassword"
);
const { value: currentPassword } = useField<string | null>("currentPassword");
const iconPassword = ref(false);
const iconPasswordConfirm = ref(false);
const iconCurrentPassword = ref(false);
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

  if (field === "newPassword") {
    const hasMinLength = validateErrors("newPassword", "min");
    const hasValidFormat = validateErrors("newPassword", "validation");
    if (hasMinLength && hasValidFormat) {
      return "/icons/icon_password_true.svg";
    } else {
      return "/icons/icon_password_false.svg";
    }
  }

  if (field === "confirmNewPassword") {
    const isMatching = validateErrors("confirmNewPassword", "mask");
    if (isMatching) {
      return "/icons/icon_password_true.svg";
    } else {
      return "/icons/icon_password_false.svg";
    }
  }

  return "/icons/icon_password_validation.svg";
};
const onSubmit = handleSubmit(async (values) => {
  useLoading(true);
  const formData: Record<string, any> = {
    fullname: values.name,
    email: values.email,
    phoneNumber: values.phone,
    photo: values.imageValue.file
      ? values.imageValue.file
      : values.imageValue.image,
    ...(mandatoryNewpassword.value
      ? (() => {
          const encryptedOld = useEncrypt(values.currentPassword);
          const encryptedNew = useEncrypt(values.newPassword);

          return {
            newPassword: encryptedNew.password,
            newIv: encryptedNew.iv,
            currentPassword: encryptedOld.password,
            currentIv: encryptedOld.iv,
          };
        })()
      : {}),
  };

  const response = await onboardingStore.updateProfile(formData);

  if (response.status && response.code === 100) {
    useShowAlert({
      message: response.message,
      type: "success",
    });
    getData();
  } else {
    useShowAlert({
      message: response.message,
      type: "error",
    });
  }
  useLoading(false);
});

const getData = async () => {
  useLoading(true);
  await onboardingStore.getProfile();

  useLoading(false);
};
onMounted(() => {
  nextTick(async () => {
    await getData();
    resetForm({
      values: {
        name: profile?.value.fullname || "",
        email: profile?.value.email || "",
        phone: profile?.value.phoneNumber || "",
        mandatoryNewpassword: false,
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      },
    });
    if (!useSearchItemJson("photoUrl", profile.value)) {
      const response = await fetch("/img/default_profile_img.png");
      const blob = await response.blob();
      const file = new File([blob], "img_precharged.png", { type: blob.type });
      imageValue.value = {
        image: URL.createObjectURL(file),
        file,
      };
    } else {
      imageValue.value = {
        image: profile?.value.photoUrl,
        file: null,
      };
    }
  });
});
</script>

<template>
  <div class="profile-page">
    <Card class="general-card profile-card">
      <template #content>
        <div>
          <form
            class="flex gap-5 col-12 p-0 lg:flex-row flex-column"
            @submit.prevent="onSubmit"
          >
            <div class="flex flex-column align-items-center span-6">
              <!-- <img v-if="profile.photoUrl" src="/img/default_profile_img.png" alt="default-profile" class="default-profile" /> -->
              <span
                id="inputForUploadImage-dropzone"
                class="general-picker my-3"
              >
                <div @click="!imageValue?.image ? refFile?.openFile() : ''">
                  <div
                    :class="{
                      'add-image-preview': imageValue?.image,
                      'container-image': !imageValue?.image,
                    }"
                    :style="{
                      width: '114px',
                      height: '114px',
                      'border-radius': '50%',
                      'background-image': imageValue?.image
                        ? `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${imageValue?.image})`
                        : `url(${imageValue?.image || ''})`,
                    }"
                  >
                    <div class="button-section">
                      <Button
                        class="app-general-button app-btn-file"
                        icon="pi pi-plus"
                        @click="refFile?.openFile()"
                      ></Button>
                    </div>
                  </div>
                </div>
                <div class="container-text">
                  <GeneralFilePicker
                    :ref="(el) => (refFile = el)"
                    v-model="imageValue"
                    :dropzone="true"
                    :crooper="false"
                    :size="{
                      validate: true,
                      size: 1000000,
                      message: '1 mb',
                    }"
                  />
                  <!-- <GeneralInputError :error="errors['imageValue']" /> -->
                </div>
              </span>
            </div>
            <div class="flex flex-column col-9">
              <span class="general-input solo-form mt-3 w-full">
                <label for="email">{{ t("form.email.label") }}</label>
                <InputText
                  id="email"
                  v-model="email"
                  type="email"
                  :placeholder="$t('form.email.placeholder', { at: '@' })"
                />
                <GeneralInputError :error="errors['email']" />
              </span>
              <span class="general-input solo-form mt-3 w-full">
                <label for="email">{{ t("form.fullname.label") }}</label>
                <InputText
                  id="name"
                  v-model="name"
                  :placeholder="$t('form.fullname.placeholder', { at: '@' })"
                />
                <GeneralInputError :error="errors['email']" />
              </span>
              <span class="general-input solo-form mt-4">
                <label for="password">{{ t("form.phone.label") }}</label>
                <InputGroup>
                  <InputMask
                    v-model="phone"
                    :disabled="disabledPassword"
                    mask="579999999999"
                    slot-char=""
                    :auto-clear="false"
                    :pt="{
                      pcInputText: {
                        root: {
                          inputmode: 'numeric',
                        },
                      },
                    }"
                    :placeholder="t('form.phone.placeholder')"
                  />
                  <Button
                    class="app-general-button app-btn-transparent w-full"
                    :label="t('button.change')"
                    style="width: 85px !important"
                    @click="disabledPassword = !disabledPassword"
                  />
                </InputGroup>
                <GeneralInputError :error="errors['phone']" />
              </span>
              <Divider class="my-4" />
              <div v-if="mandatoryNewpassword" class="flex flex-column gap-2">
                <span class="general-input solo-form">
                  <label for="password">
                    {{ t("form.currentPassword.label") }}
                  </label>
                  <IconField icon-position="right">
                    <InputText
                      v-model="currentPassword"
                      placeholder="********"
                      :type="iconCurrentPassword ? 'text' : 'password'"
                      aria-describedby="text-error"
                    />
                    <InputIcon
                      class="cursor-pointer"
                      @click="iconCurrentPassword = !iconPassword"
                    >
                      <img
                        :src="`/icons/${!iconCurrentPassword ? 'ic_eye_hidden' : 'ic_eye_not_hidden'}.svg`"
                        alt="show"
                      />
                    </InputIcon>
                  </IconField>
                  <GeneralInputError :error="errors['currentPassword']" />
                </span>
                <span class="general-input solo-form my-4">
                  <label for="password">
                    {{ t("form.passwordNew.label") }}
                  </label>
                  <IconField icon-position="right">
                    <InputText
                      v-model="newPassword"
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
                    <small class="flex align-items-center gap-2 text-s-black">
                      <img
                        :src="getValidationIcon('newPassword')"
                        alt="validation"
                        height="9px"
                        width="9px"
                      />
                      {{ t("rule.validation.password.valid") }}
                    </small>
                  </div>
                </span>
                <span class="general-input solo-form">
                  <label for="password">
                    {{ t("form.confirmPassword.label") }}
                  </label>

                  <IconField icon-position="right">
                    <InputText
                      v-model="confirmNewPassword"
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
                    <small class="flex align-items-center gap-2 text-s-black">
                      <img
                        :src="getValidationIcon('confirmNewPassword')"
                        alt="validation"
                        height="9px"
                        width="9px"
                      />
                      {{ t("rule.validation.password.confirm") }}
                    </small>
                  </div>
                </span>
              </div>
              <div class="w-full flex justify-content-between">
                <Button
                  type="button"
                  class="app-general-button app-btn-transparent lined mt-6"
                  @click="
                    ((mandatoryNewpassword = !mandatoryNewpassword),
                    resetField('newPassword'),
                    resetField('confirmNewPassword'),
                    resetField('currentPassword'))
                  "
                  :label="t('button.changePassword')"
                  style="height: 46px"
                />
                <Button
                  type="submit"
                  class="app-general-button mt-6 px-3"
                  :class="{
                    'app-btn-disabled': !meta.valid,
                    'app-btn-primary': meta.valid,
                  }"
                  :label="t('button.saveChanges')"
                  style="height: 46px"
                />
              </div>
            </div>
          </form>
        </div>
      </template>
    </Card>
  </div>
</template>

<style scoped lang="scss">
.profile-page {
  display: flex;
  justify-content: center;
  margin-top: 50px;

  .default-profile {
    width: 114px;
    height: 114px;
    border-radius: 50%;
    object-fit: cover;
  }
}
</style>
