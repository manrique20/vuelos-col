<script setup lang="ts">
/** page meta */
definePageMeta({ layout: "login" });

/** variables */
const step = ref("phone");
const data = ref({});
const router = useRouter();
const localePath = useLocalePath();
const { t } = useI18n();
const refStepTwo = ref();
const userData = ref({
  phone: "",
  email: "",
  name: "",
})
/** methods */
const returnStep = () => {
  if (step.value === "email") {
    step.value = "phone";
  } else {
    step.value = "email";
  }
};

const change = (event: any) => {
  if(step.value === "phone") {
    userData.value.phone = event.data.phone;
    refStepTwo.value?.resetFormForStep(userData.value.phone);
    
  } else if(step.value === "email") {
    userData.value.email = event.data.email;
    userData.value.name = event.data.name;
    userData.value.phone = event.data.phone;
  }
  step.value = event.change;
};

onMounted(() => {
  nextTick(() => {
    setLoginUser({ user: undefined, authToken: undefined });
  });
});
</script>
<template>
  <div class="tw-w-full tw-h-full tw-overflow-auto">
    <div class="card-img-container">
      <div class="card-image"></div>
    </div>
    <div class="bg-container-password"></div>
  
    <div class="card-login-container ">
      <Card
        class="card-login"
        :style="{
          'max-width': '592px',
        }"
        :pt="{
          footer: {
            class: 'flex justify-content-end mt-5',
          },
        }"
      >
        <template #content>
          <RegistryStepOne  v-show="step === 'phone'" @change="change" />
        </template>
      </Card>
    </div>
  </div>
</template>
