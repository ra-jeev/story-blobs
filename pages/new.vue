<template>
  <NewStory />
</template>

<script lang="ts" setup>
import NewStory from '~/components/NewStory.vue';

definePageMeta({
  layout: 'story',
  middleware: 'auth',
});
</script>
