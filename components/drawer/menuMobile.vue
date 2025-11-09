<script setup lang="ts">
// emits and props for parent communication
const emit = defineEmits(["closeModal", "update:visible", "logout"]);

const props = defineProps({
  showUpdateDialog: {
    type: Boolean,
    required: true,
  },
});

// stores and refs
const store = useOnboardingStore();
const { getLoginUser: userData } = storeToRefs(store);
// Varables and composables
const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const localePath = useLocalePath();

const drawerVisible = computed({
  get: () => props.showUpdateDialog,
  set: (value) => {
    emit("update:visible", value);
    if (!value) {
      emit("closeModal");
    }
  },
});

const closeDrawer = () => {
  drawerVisible.value = false;
};

</script>

<template>
  <div>
    <!-- Mobile Menu Drawer -->
    <Drawer
      v-model:visible="drawerVisible"
      :dismissable="true"
      class="general-drawer menu-mobile-drawer"
      position="right"
    >
      <template #header>
        <div class="header-menu flex items-center gap-2">
          <img
            src="/icons/ic_logo-header.svg"
            alt="logo"
            width="81px"
            height="24px"
          />
        </div>
      </template>
      <template #closeicon>
        <i class="pi pi-times" style="color: #003b71" @click="closeDrawer"></i>
      </template>
      <div class="menu-mobile">
        <!-- Menu Links with validation for roles -->
        <nuxt-link
          v-if="userData.rol === 'admin'"
          class="link"
          :class="{
            active: route.path.includes(localePath({ name: 'administrator' })),
          }"
          :to="localePath({ name: 'administrator' })"
          @click="emit('closeModal')"
          >{{ t("menu.administrator") }}
        </nuxt-link>
        <nuxt-link
          class="link"
          :class="{
            active: route.path.includes(localePath({ name: 'home' })),
          }"
          :to="localePath({ name: 'home' })"
          @click="emit('closeModal')"
          >{{ t("menu.searchFlights") }}
        </nuxt-link>
        <nuxt-link
          v-if="userData.id"
          class="link"
          :class="{ active: route.path.includes('my-reservations') }"
          :to="localePath({ name: 'my-reservations' })"
          @click="emit('closeModal')"
          >{{ t("menu.myReservations") }}
        </nuxt-link>

        <nuxt-link
          v-if="!userData.id"
          class="link"
          :class="{ active: route.path.includes('login') }"
          :to="localePath({ name: 'login' })"
          >{{ t("menu.login") }}
        </nuxt-link>
        <Button
          v-if="!userData.id"
          class="app-general-button app-btn-primary"
          :label="t('menu.register')"
          @click="router.push(localePath({ name: 'register' }))"
        />
        <Button
          v-if="userData?.id"
          class="app-general-button app-btn-primary"
          :label="t('button.logout')"
          @click="setLoginUser({ user: undefined, authToken: undefined })"
        />
      </div>
      <div class="tw-flex tw-justify-center ">
        <!-- Language Switcher -->
        <GeneralLanguageSwitcher />
      </div>

    </Drawer>
  </div>
</template>

<style lang="scss"></style>
