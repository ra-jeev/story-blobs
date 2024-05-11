<template>
  <div class="flex flex-col min-h-screen items-center justify-center gap-10">
    <AppLogo text-size="text-3xl" :icon-size="36" />

    <slot />
  </div>
</template>

<script setup lang="ts">
const { user } = useUserSession();
const { query } = useRoute();
watch(
  user,
  () => {
    if (user.value) {
      return navigateTo(query.redirect ? (query.redirect as string) : '/', {
        replace: true,
      });
    }
  },
  { immediate: true }
);
</script>
