<script setup lang="ts">
/** page meta */
definePageMeta({ layout: "login" });

/** variables */
const step = ref("email");
const data = ref({});
const router = useRouter();
const localePath = useLocalePath();
const { t } = useI18n();

/** methods */
const returnStep = () => {
  if (step.value === "email") {
    router.push(localePath({ name: "login" }));
  } else {
    step.value = "email";
  }
};

const change = (event: any) => {
  data.value = { ...event.data, ...data.value };
  step.value = event.change;
};

onMounted(() => {
  nextTick(() => {
    setLoginUser({ user: undefined, authToken: undefined });
  });
});
</script>
<template>
  <div class="card-img-container">
    <div class="card-image"></div>
  </div>
  <div class="bg-container-password"></div>
  <div class="card-login-container recover-password">
    <Card
      class="card-login"
      :pt="{
        footer: {
          class: 'flex justify-content-end mt-5',
        },
      }"
    >
      <template #content>
        <ForgotPasswordFormEmail v-if="step === 'email'" @change="change" />
        <ForgotPassword v-if="step === 'password'" @return="returnStep" />
      </template>
    </Card>
  </div>
</template>
