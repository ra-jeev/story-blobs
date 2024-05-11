<template>
  <pre v-if="data">
    {{ data }}
  </pre>
</template>

<script lang="ts" setup>
const { data } = await useFetch('/api/stories');
</script>

<style></style>
