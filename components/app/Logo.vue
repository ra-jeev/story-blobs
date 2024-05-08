<template>
  <ULink
    :to="nonClickable ? undefined : '/'"
    class="inline-flex items-center whitespace-nowrap gap-2"
    :as="nonClickable ? 'div' : undefined"
  >
    <AppIcon :size="logoSize" />
    <span :class="textClasses" class="leading-none font-bold">
      StoryBlobs
    </span>
  </ULink>
</template>

<script setup lang="ts">
defineProps({
  textClasses: {
    type: String,
    default: 'text-2xl',
  },
  logoSize: {
    type: Number,
    default: 36,
  },
  nonClickable: {
    type: Boolean,
    default: false,
  },
});
</script>
