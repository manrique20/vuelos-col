<script setup lang="ts">
interface ItemRoute {
  text: string;
  url?: string;
  action?: () => void;
}

export interface Props {
  routes: ItemRoute[];
}

withDefaults(defineProps<Props>(), {
  routes: () => [],
  hasButton: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>

<template>
  <div class="breadcrumb-container">
    <ul>
      <li v-for="(item, key) in routes" :key="key">
        <nuxt-link :to="item.url" @click="item.action" class="body-s-black">
          <i
            class="pi pi-angle-left"
            style="color: #003676; font-size: 18px"
          ></i>
          {{ item.text }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.breadcrumb-container {
  background-color: #dce2ed;
  position: absolute !important;
  top: 0;
  padding: 15px;
  width: 100%;
  left: 0;
  ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  ul li a {
    text-decoration: none;
    font-family: "arial-bold";
    color: #1a1a29;
    font-size: 16px;
    display: flex;
    align-items: center;
    i {
      margin: 0 12px;
    }
  }

  ul li:last-child a {
    cursor: auto;
  }
}
</style>
