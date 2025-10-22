<script setup lang="ts">
/** props */
defineProps<{
  error: string | undefined
}>()
</script>
<template>
  <small v-if="error && error !== ''" class="general-input-error">{{
    error || '&nbsp;'
  }}</small>
</template>
<style lang="scss">
.general-input-error {
  font-size: $font-size-13;
  color: $error-messages;
}
</style>
