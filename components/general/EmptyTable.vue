<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: false,
    default: '',
  },
  message: {
    type: String,
    required: false,
    default: '',
  },
  image: {
    type: String,
    required: false,
    default: '/img/ic_empty_table.svg',
  },
})
</script>
<template>
  <div id="content-empty">
    <img :src="image" alt="emptyTable" />
    <h2>{{ title === '' ? $t('table.empty.title') : title }}</h2>
    <p>{{ message === '' ? $t('table.empty.message') : message }}</p>
  </div>
</template>
<style lang="scss" scoped>
#content-empty {
  padding: 60px 10px;
  width: 90%;
  max-width: 900px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  img {
    width: 100%;
    max-width: 125px;
    max-height: 177px;
  }
  h2 {
    margin-top: 20px;
    color: #182a48;
    font-size: 23px;
    font-family: 'OpenSans-Bold';
    margin-bottom: 0;
  }
  p {
    margin: 0;
    color: #18233a;
    letter-spacing: -0.15px;
    font-size: 15px;
    width: 100%;
    max-width: 600px;
    text-align: center;
  }
}
</style>
