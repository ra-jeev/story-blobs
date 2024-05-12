<template>
  <div v-if="stories" class="space-y-4">
    <div v-for="story in stories" :key="story.slug">
      <ULink v-if="story.slug" :to="`/stories/${story.slug}`">
        <StoryHeadFeed v-bind="story" title-hoverable />
      </ULink>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { data: stories } = await useFetch('/api/stories');
</script>

<style></style>
