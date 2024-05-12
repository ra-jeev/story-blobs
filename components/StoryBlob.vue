<template>
  <UCard>
    <p>
      {{ blob }}
    </p>

    <p class="text-gray-500 dark:text-gray-400 text-xs mt-2">
      {{ author.name }} on {{ formatDateTime(createdAt) }}
    </p>
  </UCard>
</template>

<script lang="ts" setup>
import type { StoryBlob } from '~/types';

defineProps<StoryBlob>();
</script>

<style></style>
