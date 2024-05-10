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
        :hint="`${constraints.blob.min}-${constraints.blob.max} chars`"
        required
      >
        <UTextarea
          v-model.trim="state.blob"
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

const constraints: { [key: string]: { min: number; max: number } } = {
  blob: { min: 140, max: 280 },
};

const validate = (formState: any): FormError[] => {
  const errors = [];
  const error = validateField(
    'blob',
    formState.blob,
    constraints.blob.min,
    constraints.blob.max
  );

  if (error) {
    errors.push(error);
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

  loading.value = false;
};
</script>
