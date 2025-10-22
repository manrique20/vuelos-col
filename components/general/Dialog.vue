<template>
  <Dialog
    v-model:visible="visible"
    modal
    :draggable="false"
    :closable="closable"
    :style="{ width: width }"
    class="general-dialog"
    @update:visible="handleVisibilityChange"
  >
    <template #header>
      <h2 class="text-s-black app-font-impact h3 text-center mx-auto">
        {{ title }}
      </h2>
    </template>
    <div class="dialog-content">
      <slot />
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
const emit = defineEmits<{
  close: [];
  "update:show": [value: boolean];
}>();

const props = defineProps<{
  show: boolean;
  width?: string;
  title: string;
  closable?: boolean;
}>();

const width = props.width || "404px";
const closable = props.closable ?? false;

const visible = ref(props.show);

watch(
  () => props.show,
  (newVal) => {
    visible.value = newVal;
  }
);

const handleVisibilityChange = (value: boolean) => {
  visible.value = value;
  emit("update:show", value);

  if (!value) {
    emit("close");
  }
};
</script>
