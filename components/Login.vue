<template>
  <UForm
    ref="form"
    :validate="validate"
    :state="state"
    class="space-y-4"
    @submit="onLogin"
  >
    <UFormGroup name="email" label="Email" required>
      <UInput
        v-model.trim="state.email"
        placeholder="Enter you email"
        icon="i-heroicons-envelope"
        type="email"
      />
    </UFormGroup>

    <UFormGroup name="password" label="Password" required>
      <UInput
        v-model.trim="state.password"
        :type="showPassword ? 'text' : 'password'"
        placeholder="Enter your password"
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
      :ui="{ rounded: 'rounded-full' }"
      :loading="loading"
      :disabled="loading"
      trailing-icon="i-heroicons-arrow-right-20-solid"
      type="submit"
    >
      Continue
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
  email: undefined,
  password: undefined,
});

const { fetch: refreshSession } = useUserSession();

const validate = (formState: any): FormError[] => {
  const errors = [];

  if (!formState.email) {
    errors.push({ path: 'email', message: 'Please enter your email.' });
  }

  if (!formState.password) {
    errors.push({ path: 'password', message: 'Please enter your password.' });
  }

  return errors;
};

const onLogin = async (event: FormSubmitEvent<any>) => {
  loading.value = true;
  formError.value = undefined;

  try {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        email: event.data.email,
        password: event.data.password,
      },
    });

    await refreshSession();
  } catch (error: any) {
    console.log('got login error', error);
    console.log('error  message', error.message);
    console.log('error status message', error.statusMessage);
    loading.value = false;
    formError.value =
      error.statusMessage ?? 'Failed to login. Please try again later.';
  }
};
</script>
