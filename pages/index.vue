<script>
const router = useRouter();
const localePath = useLocalePath();
// Redirect to localized home page on mount
onMounted(() => {
  nextTick(() => {
    router.push(localePath({ name: "home" }));
  });
});
</script>

<template></template>
