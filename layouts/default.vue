<template>
  <div>
    <AppBar />
    <UContainer class="flex justify-center gap-x-4 sm:gap-x-6 py-4 sm:py-6">
      <AppSideBar class="w-72" />
      <main class="flex-1">
        <slot />
      </main>
    </UContainer>
  </div>
</template>
