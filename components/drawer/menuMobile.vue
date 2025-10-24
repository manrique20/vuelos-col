<script setup lang="ts">
const emit = defineEmits(["closeModal", "update:visible", "logout"]);

const props = defineProps({
  showUpdateDialog: {
    type: Boolean,
    required: true,
  },
});
const store = useOnboardingStore();
const { getLoginUser: userData } = storeToRefs(store);
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

watch(userData, async (newVal) => {
  // if (newVal?.user?.id) {
  //   await accountStore.getProfile();
  // } else {
  //   systemStore.setMenuOpen(false);
  // }
});
</script>

<template>
  <div>
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
        <nuxt-link
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
          class="link"
          :class="{ active: route.path.includes('my-reservations') }"
          :to="localePath({ name: 'my-reservations' })"
          @click="emit('closeModal')"
          >{{ t("menu.myReservations") }}
        </nuxt-link>

        <nuxt-link
          class="link"
          :class="{ active: route.path.includes('login') }"
          :to="localePath({ name: 'login' })"
          >{{ t("menu.login") }}
        </nuxt-link>
      </div>
    </Drawer>
  </div>
</template>

<style lang="scss"></style>
