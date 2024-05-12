<template>
  <div v-if="stories" class="space-y-4">
    <template v-for="story in stories">
      <NuxtLink
        v-if="story.slug"
        :key="story.slug"
        :to="`/stories/${story.slug}`"
      >
        <StoryHead v-bind="story" title-hoverable />
      </NuxtLink>
    </template>
  </div>
</template>

<script lang="ts" setup>
const { data: stories } = await useFetch('/api/stories');
</script>

<style></style>
