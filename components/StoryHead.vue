<template>
  <UCard>
    <h1
      class="text-3xl md:text-5xl font-semibold text-primary"
      :class="{
        'hover:text-primary-600 dark:hover:text-primary-500': titleHoverable,
      }"
    >
      {{ title }}
    </h1>

    <img
      v-if="coverImage"
      :src="`${url.origin}/${coverImage}`"
      class="my-6 w-full"
    />

    <p class="text-gray-600 dark:text-gray-300 text-sm mt-2">
      {{ premise }}
    </p>
    <Author class="mt-4" v-bind="author" :created-at="createdAt" />
  </UCard>
</template>

<script lang="ts" setup>
import type { StoryHead } from '~/types';

const url = useRequestURL();

type StoryHeadProps = StoryHead & {
  titleHoverable?: boolean;
};

defineProps<StoryHeadProps>();
</script>

<style></style>
