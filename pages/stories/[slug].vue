<template>
  <div>
    Story: {{ params.slug }}

    <div v-if="data">
      <pre>
        {{ data }}
      </pre>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { params } = useRoute();

const { data } = await useFetch(`/api/stories/${params.slug}`);
</script>

<style></style>
