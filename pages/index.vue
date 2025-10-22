<script>
const router = useRouter();
const localePath = useLocalePath();

onMounted(() => {
  nextTick(() => {
    router.push(localePath({ name: "home" }));
  });
});
</script>

<template></template>
