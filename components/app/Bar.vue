<template>
  <header
    class="header-bg backdrop-blur border-b -mb-px sticky top-0 z-50 border-gray-200 dark:border-gray-800"
  >
    <UContainer
      class="flex flex-wrap items-center justify-between"
      :class="`h-[var(--header-height)]`"
    >
      <AppLogo />
      <div class="flex items-center gap-x-4">
        <ColorMode />
        <UButton
          to="https://github.com/ra-jeev/story-blobs"
          icon="i-simple-icons-github"
          aria-label="github"
          color="gray"
          target="_blank"
          variant="ghost"
        />
        <UButton
          icon="i-heroicons-bars-3-bottom-right-20-solid"
          aria-label="menu"
          color="gray"
          variant="ghost"
          class="md:hidden"
          @click="$emit('openDrawer')"
        />
        <div class="hidden md:block">
          <UButton v-if="!loggedIn" to="/login"> Login </UButton>
          <UButton v-else @click="clear"> Logout </UButton>
        </div>
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
