<script setup lang="ts">
import { storeToRefs } from "pinia";

/** variables */
const { t } = useI18n();
const store = useOnboardingStore();
const router = useRouter();
const route = useRoute();
const localePath = useLocalePath();
const activeHoverMenu = ref(false);
const { getLoginUser: userData, getProfileData: profile } = storeToRefs(store);
const menuMobile = ref(false);
const openDeniedDialog = ref(false);

const actualPage = ref("");
const openLogout = ref(false);
const openMenu = () => {
  menuMobile.value = true;
};
const hiddemMenu = () => {
  menuMobile.value = false;
};

onMounted(() => {
  nextTick(async () => {
    if (userData.value?.id) {
      actualPage.value = route.path;
      await store.getProfile();
    }
  });
});

watch(
  () => route.path,
  (newVal, oldVal) => {
    if (route && oldVal !== newVal) {
      actualPage.value = newVal;
    }
  }
);
</script>
<template>
  <div class="app-wraper">
    <header class="header-content">
      <img
        src="/img/ic_page_logo.svg"
        alt="logo"
        width="81px"
        height="24px"
        class="cursor-pointer"
        @click="router.push(localePath({ name: 'home' }))"
      />

      <i class="pi pi-bars icon-responsive" @click="openMenu"></i>
    </header>
    <main class="main-application" :class="{ 'hover-menu': activeHoverMenu }">
      <div class="content-application">
        <slot />
      </div>
    </main>
    <LayoutsLoginLogout
      :dialog="openLogout"
      @close-modal="openLogout = false"
    />
    <GeneralDialog
      v-if="showDialog"
      v-model:show="showDialog"
      width="559px"
      :title="t('text.locationModal.title')"
    >
      <div class="content-dialog">
        <p>
          {{ t("text.locationModal.text") }}
        </p>
      </div>
      <div class="action-buttons">
        <Button
          :label="t('button.notAllow')"
          style="min-width: 151px"
          class="app-general-button app-btn-disabled"
          type="button"
          @click="showDialog = false"
        />
        <Button
          :label="t('button.allow')"
          style="min-width: 151px"
          class="app-general-button app-btn-primary"
          type="button"
          @click="getLocation()"
        />
      </div>
    </GeneralDialog>
    <GeneralDialog
      v-if="openDeniedDialog"
      v-model:show="openDeniedDialog"
      :title="t('text.deniedPermitionsModal.title')"
      :closable="true"
      width="559px"
    >
      <div class="content-dialog">
        <div>
          <div class="flex gap-2">
            <i class="pi pi-exclamation-triangle"></i>
            <p>{{ t("text.deniedPermitionsModal.message") }}</p>
          </div>

          <div class="instructions-steps">
            <h4>{{ t("text.deniedPermitionsModal.stepsTitle") }}</h4>
            <ol>
              <li>{{ t("text.deniedPermitionsModal.step1") }}</li>
              <li>{{ t("text.deniedPermitionsModal.step2") }}</li>
              <li>{{ t("text.deniedPermitionsModal.step3") }}</li>
              <li>{{ t("text.deniedPermitionsModal.step4") }}</li>
            </ol>
          </div>
        </div>
      </div>

      <div class="action-buttons">
        <Button
          :label="t('button.understood')"
          style="min-width: 100%"
          class="app-general-button app-btn-primary"
          type="button"
          @click="openDeniedDialog = false"
        />
      </div>
    </GeneralDialog>
    <DrawerMenuMobile
      v-model:visible="menuMobile"
      :showUpdateDialog="menuMobile"
      @closeModal="hiddemMenu"
      @logout="openLogout = true"
    />
  </div>
</template>
