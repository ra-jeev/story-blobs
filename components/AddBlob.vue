<template>
  <UCard>
    <UForm
      class="space-y-6"
      :validate="validate"
      :state="state"
      @submit="addBlob"
    >
      <div class="text-lg md:text-xl">Add your blob</div>
      <UFormGroup
        label="Blob text"
        name="blob"
        size="md"
        hint="100-280 chars"
        required
      >
        <UTextarea
          :disabled="loading"
          v-model.trim="state.blob"
          class="w-full"
          :rows="3"
          :maxrows="6"
          autoresize
          size="md"
          placeholder="Continue the story, write away..."
        />
      </UFormGroup>
      <UButton
        :disabled="loading"
        trailing-icon="i-heroicons-plus"
        size="md"
        type="submit"
      >
        Add Blob
      </UButton>
    </UForm>
  </UCard>
</template>

<script lang="ts" setup>
import type { FormError, FormSubmitEvent } from '#ui/types';

const { storyId } = defineProps({
  storyId: {
    type: String,
    required: true,
  },
});

const state = ref({
  blob: undefined,
});

const validate = (formState: any): FormError[] => {
  const errors = [];

  if (!formState.blob) {
    errors.push({ path: 'blob', message: 'Blob is required.' });
  } else if (formState.blob.length < 100) {
    errors.push({
      path: 'blob',
      message: 'Blob can not be less than 100 characters.',
    });
  } else if (formState.blob.length > 280) {
    errors.push({
      path: 'blob',
      message: 'Blob can not be more than 280 characters.',
    });
  }

  return errors;
};

const loading = ref(false);
const addBlob = async (event: FormSubmitEvent<any>) => {
  try {
    loading.value = true;
    const res = await $fetch(`/api/stories/${storyId}`, {
      method: 'PATCH',
      body: {
        blob: event.data.blob,
      },
    });
  } catch (error) {
    console.log('failed with error', error);
  }
};
</script>
