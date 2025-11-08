<!-- components/LanguageSwitcherElegant.vue -->
<script setup lang="ts">
const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const router = useRouter();
const menu = ref();

interface LocaleOption {
  name: string;
  code: string;
  icon: string;
  iso: string;
}

const currentLocale = computed(() => {
  return locales.value.find(
    (l: any) => l.code === locale.value
  ) as LocaleOption;
});

const menuItems = computed(() => {
  return [
    {
      label: "Idiomas",
      items: locales.value.map((locale: LocaleOption) => ({
        label: locale.name,
        icon: "pi pi-globe",
        badge: locale.icon,
        class: locale.code === currentLocale.value?.code ? "bg-primary-50" : "",
        command: () => {
          if (locale.code !== currentLocale.value?.code) {
            const newLocalePath = switchLocalePath(locale.code);
            router.push(newLocalePath);
          }
        },
      })),
    },
  ];
});

const toggle = (event: Event) => {
  menu.value.toggle(event);
};
</script>

<template>
  <div class="flex ">
    <Button
      @click="toggle"
      text
      rounded
      severity="secondary"
      class="p-0 tw-max-w-[50px] tw-max-h-[50px]"
      aria-label="Cambiar idioma"
    >
      <Avatar
        :image="currentLocale?.icon"
        shape="circle"
        class="hover:bg-gray-100 transition-colors"
        :pt="{
          image: 'tw-object-cover',
        }"
        size="large"
      />
    </Button>

    <Menu ref="menu" :model="menuItems" :popup="true" class="min-w-[200px]">
      <template #item="{ item, props }">
        <a v-bind="props.action" class="flex items-center justify-between">
          <span class="flex items-center gap-2">
            <span>{{ item.label }}</span>
          </span>
          <Avatar
            :image="item.badge"
            shape="circle"
            class="hover:bg-gray-100 transition-colors"
            :pt="{
              image: 'tw-object-cover',
            }"
            size="small"
          />
        </a>
      </template>
    </Menu>
  </div>
</template>
