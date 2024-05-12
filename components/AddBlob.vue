<template>
  <UCard>
    <UForm :validate="validate" :state="state" @submit="addBlob">
      <div class="text-lg md:text-xl">Continue the story</div>
      <template v-if="!loggedIn">
        <p class="text-gray-600 dark:text-gray-300 mt-1">
          You need to log in, to add to the story
        </p>
        <UButton class="mt-6" @click="onLoginClick">Login now</UButton>
      </template>
      <template v-else>
        <UFormGroup
          label="Blob text"
          name="blob"
          size="md"
          :hint="`${constraints.blob.min}-${constraints.blob.max} chars`"
          required
          class="mt-6"
        >
          <UTextarea
            v-model.trim="state.blob"
            :rows="3"
            :maxrows="6"
            autoresize
            size="md"
            placeholder="Write away..."
          />
        </UFormGroup>
        <UButton
          :loading="loading"
          :disabled="loading"
          trailing-icon="i-heroicons-plus"
          size="md"
          type="submit"
          class="mt-6"
        >
          Add Blob
        </UButton>
      </template>
    </UForm>
  </UCard>
</template>

<script lang="ts" setup>
import type { FormError, FormSubmitEvent } from '#ui/types';

const route = useRoute();
const { loggedIn } = useUserSession();

const constraints: { [key: string]: { min: number; max: number } } = {
  blob: { min: 140, max: 420 },
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

const emit = defineEmits(['refreshStory']);
const loading = ref(false);
const state = ref({
  blob: undefined,
});
const addBlob = async (event: FormSubmitEvent<any>) => {
  try {
    loading.value = true;
    await $fetch(`/api/stories/${route.params.slug}`, {
      method: 'PATCH',
      body: {
        blob: event.data.blob,
      },
    });

    state.value.blob = undefined;
    emit('refreshStory');
  } catch (error) {
    console.log('failed with error', error);
  }

  loading.value = false;
};

const onLoginClick = () => {
  navigateTo({ path: '/login', query: { redirect: route.fullPath } });
};
</script>
