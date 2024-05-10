<template>
  <UCard>
    <UForm
      class="space-y-6"
      :validate="validate"
      :state="state"
      @submit="createStory"
    >
      <div class="text-lg md:text-xl">Story Details</div>
      <UFormGroup
        label="Title"
        name="title"
        required
        size="md"
        :hint="`${constraints.title.min}-${constraints.title.max} chars`"
      >
        <UInput
          v-model.trim="state.title"
          placeholder="Give your story a title..."
        />
      </UFormGroup>
      <UFormGroup
        label="Premise"
        name="premise"
        required
        size="md"
        :hint="`${constraints.premise.min}-${constraints.premise.max} chars`"
        details="For blobbers, to continue the story"
      >
        <UTextarea
          v-model.trim="state.premise"
          :rows="3"
          :maxrows="6"
          autoresize
          size="md"
          placeholder="Add a short premise of the story..."
        />
      </UFormGroup>
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
          placeholder="Add the starting blob, write away..."
        />
      </UFormGroup>
      <UButton
        :disabled="loading"
        trailing-icon="i-heroicons-arrow-right-20-solid"
        size="md"
        type="submit"
      >
        Create Story
      </UButton>
    </UForm>
  </UCard>
</template>

<script lang="ts" setup>
import type { FormError, FormSubmitEvent } from '#ui/types';

const state = ref({
  title: undefined,
  premise: undefined,
  blob: undefined,
});

const constraints: { [key: string]: { min: number; max: number } } = {
  title: { min: 3, max: 80 },
  premise: { min: 140, max: 280 },
  blob: { min: 140, max: 280 },
};

const validate = (formState: any): FormError[] => {
  const errors = [];

  for (const field in state.value) {
    const error = validateField(
      field,
      formState[field],
      constraints[field].min,
      constraints[field].max
    );

    if (error) {
      errors.push(error);
    }
  }

  return errors;
};

const loading = ref(false);
const createStory = async (event: FormSubmitEvent<any>) => {
  try {
    loading.value = true;
    const res = await $fetch(`/api/stories`, {
      method: 'POST',
      body: {
        title: event.data.title,
        premise: event.data.premise,
        blob: event.data.blob,
      },
    });
  } catch (error) {
    console.log('failed with error', error);
  }

  loading.value = false;
};
</script>
