<template>
  <div>
    <AppBar />
    <UContainer class="flex gap-x-4 py-4">
      <AppSideBar class="w-72" />
      <main class="p-4 w-full">
        <slot />
      </main>
    </UContainer>
  </div>
</template>
