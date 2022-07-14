<script lang="ts" setup>
import { computed, toRefs } from "vue";

const props = defineProps<{
  src: string;
}>();

const { src } = toRefs(props);

function toTwipicsURL(url: string) {
  return url.replace("https://cdn.filestackcontent.com/", "");
}

const twicpicsURL = computed(() => {
  const url = toTwipicsURL(src.value);

  return url;
});
</script>

<template>
  <TwicImg :src="twicpicsURL" ratio="none" />
  <!-- <img /> -->
</template>
