<template>
  <div class="flex flex-col min-h-screen items-center justify-center gap-10">
    <AppLogo text-size="text-3xl" :icon-size="36" />

    <slot />
  </div>
</template>

<script setup lang="ts">
const { user } = useUserSession();
const route = useRoute();
watch(
  user,
  async () => {
    if (user.value) {
      const redirectPath = route.query.redirect
        ? (route.query.redirect as string)
        : '/';
      return navigateTo(redirectPath, {
        replace: true,
      });
    }
  },
  { immediate: true }
);
</script>
