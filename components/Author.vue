<template>
  <div class="flex items-center gap-x-4">
    <UAvatar
      :ui="{ background: 'bg-gray-100 dark:bg-gray-700' }"
      icon="i-heroicons-user"
      size="md"
    />
    <div>
      <p>
        {{ name }}
      </p>
      <p class="text-gray-500 dark:text-gray-400 text-xs">
        Started on {{ formatDateTime(createdAt) }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Author } from '~/types';

type AuthorProps = Author & {
  createdAt: string;
};

defineProps<AuthorProps>();
</script>

<style></style>
