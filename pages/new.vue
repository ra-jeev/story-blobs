<template>
  <NewStory class="w-full max-w-xl" />
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'story',
  middleware: 'auth',
});
</script>
