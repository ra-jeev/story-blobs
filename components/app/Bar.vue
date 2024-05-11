<template>
  <header
    class="header-bg backdrop-blur border-b -mb-px sticky top-0 z-50 border-gray-200 dark:border-gray-800"
  >
    <UContainer
      class="flex flex-wrap items-center justify-between"
      :class="`h-[var(--header-height)]`"
    >
      <AppLogo />
      <div class="flex items-center gap-4">
        <ColorMode />
        <UButton v-if="!loggedIn" :ui="{ rounded: 'rounded-full' }" to="/login">
          Login
        </UButton>
        <UButton v-else :ui="{ rounded: 'rounded-full' }" @click="clear">
          Logout
        </UButton>
      </div>
    </UContainer>
  </header>
</template>

<script setup lang="ts">
const { loggedIn, clear } = useUserSession();
</script>

<style scoped>
.header-bg {
  background-color: rgb(var(--ui-background) / 0.75);
}
</style>
