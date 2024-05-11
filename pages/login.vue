<template>
  <UCard class="max-w-sm w-full">
    <h2 class="text-2xl font-medium text-center">Welcome back</h2>

    <Login class="my-6" />

    <div class="text-sm text-center">
      <span class="text-gray-500 dark:text-gray-400">
        Don't have an account?
      </span>
      <ULink
        inactive-class="text-primary font-medium hover:text-primary-600 dark:hover:text-primary-500"
        to="/signup"
      >
        Create one now
      </ULink>
    </div>
  </UCard>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth',
});
</script>
