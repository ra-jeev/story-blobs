<template>
  <div>
    <UCard>
      <div class="text-lg md:text-xl font-semibold">Add your story</div>

      <p class="mt-2 text-gray-500 dark:text-gray-400">
        Let your creative juices flow...
      </p>
      <UButton class="mt-6" @click="navigateTo('/new')">Start a story</UButton>
    </UCard>
  </div>
</template>
