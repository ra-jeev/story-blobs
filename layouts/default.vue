<template>
  <div>
    <AppBar @open-drawer="isOpen = true" />
    <UContainer class="flex justify-center gap-x-4 sm:gap-x-6 py-4 sm:py-6">
      <AppSideBar class="shrink-0 w-72 hidden md:block" />
      <main class="grow">
        <slot />
      </main>
    </UContainer>
    <USlideover :ui="{ width: 'max-w-xs' }" class="md:hidden" v-model="isOpen">
      <div class="flex justify-between items-center p-4">
        <AppLogo @click="isOpen = false" />
        <UButton
          icon="i-heroicons-x-mark-solid"
          size="xs"
          :padding="false"
          color="white"
          variant="soft"
          @click="isOpen = false"
        />
      </div>
      <div class="p-4">
        <AppSideBar @close-drawer="isOpen = false" />
        <UCard class="mt-4">
          <UButton v-if="!loggedIn" block to="/login"> Login </UButton>
          <UButton v-else block @click="clear"> Logout </UButton>
        </UCard>
      </div>
    </USlideover>
  </div>
</template>

<script setup lang="ts">
const isOpen = ref(false);
const { loggedIn, clear } = useUserSession();
</script>
