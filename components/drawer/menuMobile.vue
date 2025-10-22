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
            src="/img/ic_onboarding_image.svg"
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
            active: route.path.includes(localePath({ name: 'home' })),
          }"
          :to="localePath({ name: 'home' })"
          @click="emit('closeModal')"
          >{{ t("menu.searchVehicles") }}
        </nuxt-link>
        <nuxt-link
          class="link"
          :class="{
            active: route.path.includes(localePath({ name: 'favorites' })),
          }"
          :to="localePath({ name: 'favorites' })"
          @click="emit('closeModal')"
          >{{ t("menu.favorites") }}
        </nuxt-link>
        <nuxt-link
        v-if="userData?.id"
          class="link"
          :class="{ active: route.path.includes('profile') }"
          :to="localePath({ name: 'profile' })"
          @click="emit('closeModal')"
          >{{ t("menu.profile") }}
        </nuxt-link>
        <Button
        v-if="userData?.id"
        class="app-general-button app-btn-transparent black p-0"
        :pt="{
          label: 'text-s-black',
        }"
          @click="emit('logout')"
          :label="t('menu.logout')"
          >
        </Button>
        <nuxt-link
        v-else
          class="link"
          :class="{ active: route.path.includes('profile') }"
          :to="localePath({ name: 'login' })"
          >{{ t("button.login") }}
        </nuxt-link>
      </div>
    </Drawer>
  </div>
</template>

<style lang="scss"></style>
