<template>
  <UCard>
    <div class="md:flex md:gap-x-4">
      <img
        v-if="coverImage"
        :src="`${url.origin}/${coverImage}`"
        class="w-full md:max-w-48 mb-4 md:mb-0"
      />
      <div>
        <h1
          class="text-2xl md:text-3xl font-semibold text-primary"
          :class="{
            'hover:text-primary-600 dark:hover:text-primary-500':
              titleHoverable,
          }"
        >
          {{ title }}
        </h1>

        <p class="text-gray-600 dark:text-gray-300 text-base mt-2">
          {{ premise }}
        </p>
        <Author class="mt-4" v-bind="author" :created-at="createdAt" />
      </div>
    </div>
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
