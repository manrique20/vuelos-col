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
        src="/icons/ic_logo-header.svg"
        alt="logo"
        width="70px"
        height="70px"
        class="cursor-pointer"
        @click="router.push(localePath({ name: 'home' }))"
      />
      <div class="pages-links">
          <nuxt-link
          class="link"
          :class="{
            active: route.path.includes('administrator'),
          }"
          :to="localePath({ name: 'administrator' })"
        >
          {{ $t("menu.administrator") }}
        </nuxt-link>
        <nuxt-link
          class="link"
          :class="{
            active: route.path.includes('home'),
          }"
          :to="localePath({ name: 'home' })"
        >
          {{ $t("menu.searchFlights") }}
        </nuxt-link>
        <nuxt-link
          :class="{
            active: route.path.includes('my-reservations'),
          }"
          class="link"
          :to="localePath({ name: 'my-reservations' })"
        >
          {{ $t("menu.myReservations") }}
        </nuxt-link>
        <nuxt-link
          :class="{
            active: route.path.includes('login'),
          }"
          class="link"
          :to="localePath({ name: 'login' })"
        >
          {{ t("menu.login") }}
        </nuxt-link>
        <Button
          class="app-general-button app-btn-primary"
          :label="t('menu.register')"
          @click="router.push(localePath({ name: 'register' }))"
        />
      </div>
      <i class="pi pi-bars icon-responsive" @click="openMenu"></i>
    </header>
    <main class="main-application">
      <div class="content-application">
        <slot />
      </div>
    </main>
    <!-- <LayoutsLoginLogout
      :dialog="openLogout"
      @close-modal="openLogout = false"
    /> -->
    <DrawerMenuMobile
      v-model:visible="menuMobile"
      :showUpdateDialog="menuMobile"
      @closeModal="hiddemMenu"
      @logout="openLogout = true"
    />
  </div>
</template>
