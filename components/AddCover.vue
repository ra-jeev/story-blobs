<template>
  <div class="flex flex-col sm:flex-row items-center gap-4 my-6">
    <img :src="imgSrc ?? placeholder" class="w-48" />
    <div>
      <p class="text-sm mb-2 ml-2 text-gray-700 dark:text-gray-300">
        Add cover image (optional)
      </p>
      <UInput
        ref="file"
        type="file"
        accept="image/*"
        size="sm"
        icon="i-heroicons-photo"
        @change="onFilePicked"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import placeholder from '~/assets/img/placeholder.svg';
const imgSrc = ref();
const file = ref();
const selectedFile = ref();
const onFilePicked = (files: FileList) => {
  if (files.length) {
    selectedFile.value = files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      imgSrc.value = e.target?.result;
    };

    reader.readAsDataURL(files[0]);
  } else {
    selectedFile.value = undefined;
  }
};

const uploadCover = async () => {
  if (selectedFile.value) {
    const formData = new FormData();
    formData.append('file', selectedFile.value);

    const res = await $fetch('/api/images/upload', {
      method: 'POST',
      body: formData,
    });

    return res.fileName;
  }
};
defineExpose({
  uploadCover,
});
</script>
