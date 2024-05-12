import NatureImg from '../NatureImg.vue';
<template>
  <div class="space-y-4">
    <UCard :ui="{ body: { base: 'text-center' } }">
      <div class="text-lg md:text-xl font-medium">Add your story</div>

      <NatureImg class="my-6 px-3 w-full" />
      <p class="text-gray-500 dark:text-gray-400">
        Let your creative juices flow. Write an engaging premise.
      </p>
      <UButton class="mt-4" block @click="navigateTo('/new')">
        Start a story
      </UButton>
    </UCard>
    <UCard :ui="{ body: { base: 'text-center space-y-3' } }">
      <p>Made with ❤️ by Rajeev</p>
      <div class="flex gap-x-2 justify-center">
        <UButton
          v-for="social in socials"
          :key="social.name"
          :to="social.to"
          :icon="social.icon"
          :aria-label="social.name"
          color="gray"
          target="_blank"
          variant="ghost"
        />
      </div>
      <div>
        Want to talk?
        <UButton
          variant="link"
          :padded="false"
          to="mailto:i.rarsh@gmail.com?subject=[Ref: StoryBlobs]"
        >
          Email me
        </UButton>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
const socials = [
  {
    name: 'x',
    icon: 'i-simple-icons-x',
    to: 'https://twitter.com/ra_jeeves',
  },
  {
    name: 'github',
    icon: 'i-simple-icons-github',
    to: 'https://github.com/ra-jeev',
  },
];
</script>
