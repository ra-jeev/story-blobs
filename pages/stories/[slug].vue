<template>
  <div class="space-y-2">
    <template v-if="story">
      <StoryHead v-bind="story.head" />
      <StoryBlob v-for="blob in story.blobs" :key="blob.id" v-bind="blob" />
      <AddBlob @refresh-story="refresh" />
    </template>
  </div>
</template>

<script lang="ts" setup>
import type { Story } from '~/types';

const { params } = useRoute();

const { data: story, refresh } = await useFetch<Story>(
  `/api/stories/${params.slug}`
);
</script>

<style></style>
