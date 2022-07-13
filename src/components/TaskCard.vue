<script setup>
const props = defineProps({
  task: Object,
});
</script>

<template>
  <div class="p-5 bg-white">
    {{ task }}
  </div>
</template>
