<template>
  <UCard>
    <h1 class="text-2xl md:text-4xl font-semibold">
      {{ title }}
    </h1>
    <p class="text-gray-600 dark:text-gray-300 text-sm mt-2">
      {{ premise }}
    </p>
    <Author class="mt-4" v-bind="author" :created-at="createdAt" />
  </UCard>
</template>

<script lang="ts" setup>
import type { StoryHead } from '~/types';

defineProps<StoryHead>();
</script>

<style></style>
