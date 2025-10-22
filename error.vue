<template>
  <div class="error-handle">
    <img src="/img/ic_error.svg" alt="error" />
    <p>{{ error }}</p>
    <Button label="Clear errors" @click="handleError" />
  </div>
</template>

<script setup>
defineProps({
  error: Object,
})

const handleError = () => clearError({ redirect: '/' })
</script>
<style lang="scss">
.error-handle {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f5f6f6;
  padding: 3rem 0;
  height: calc(100%);
  color: black;

  p {
    text-align: center;
    max-width: 550px;
  }
}
</style>
