<template>
  <UForm
    ref="form"
    :validate="validate"
    :state="state"
    class="space-y-4"
    @submit="onSignUp"
  >
    <UFormGroup name="name" label="Your name" required>
      <UInput
        v-model.trim="state.name"
        placeholder="Enter your name"
        icon="i-heroicons-user"
      />
    </UFormGroup>

    <UFormGroup name="email" label="Your email" required>
      <UInput
        v-model.trim="state.email"
        placeholder="you@example.com"
        icon="i-heroicons-envelope"
        type="email"
      />
    </UFormGroup>

    <UFormGroup name="password" label="Create your password" required>
      <UInput
        v-model.trim="state.password"
        :type="showPassword ? 'text' : 'password'"
        placeholder="Enter your desired password"
        icon="i-heroicons-key"
        :ui="{ icon: { trailing: { pointer: '' } } }"
      >
        <template #trailing>
          <UButton
            :icon="
              showPassword
                ? `i-heroicons-eye-slash-solid`
                : `i-heroicons-eye-solid`
            "
            :padded="false"
            color="gray"
            variant="link"
            @click="showPassword = !showPassword"
          />
        </template>
      </UInput>
    </UFormGroup>

    <UAlert
      v-if="formError"
      :title="formError"
      icon="i-heroicons-exclamation-triangle-solid"
      color="red"
      variant="subtle"
      :close-button="{
        icon: 'i-heroicons-x-mark-20-solid',
        color: 'red',
        variant: 'link',
      }"
      @close="formError = undefined"
    />

    <UButton
      block
      class="!mt-6"
      :loading="loading"
      :disabled="loading"
      type="submit"
    >
      Create account
    </UButton>
  </UForm>
</template>

<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types';

const showPassword = ref(false);
const loading = ref(false);
const formError = ref();
const form = ref();
const state = ref({
  name: undefined,
  email: undefined,
  password: undefined,
});

const { fetch: refreshSession } = useUserSession();

const validate = (formState: any): FormError[] => {
  const errors = [];

  if (!formState.name) {
    errors.push({ path: 'name', message: 'Please enter your name.' });
  }

  if (!formState.email) {
    errors.push({ path: 'email', message: 'Please enter your email.' });
  }

  if (!formState.password) {
    errors.push({ path: 'password', message: 'Please enter your password.' });
  }

  return errors;
};

const onSignUp = async (event: FormSubmitEvent<any>) => {
  loading.value = true;
  formError.value = undefined;

  try {
    await $fetch('/api/auth/signup', {
      method: 'POST',
      body: {
        name: event.data.name,
        email: event.data.email,
        password: event.data.password,
      },
    });

    await refreshSession();
  } catch (error: any) {
    loading.value = false;
    formError.value =
      error.statusMessage ?? 'Failed to sign up. Please try again later.';
  }
};
</script>
