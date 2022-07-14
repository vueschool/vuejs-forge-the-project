<script setup lang="ts">
import {
  Card as KCard,
  CardTitle as KCardTitle,
} from "@progress/kendo-vue-layout";
import type { Board } from "@/types";
defineProps<{
  board: Board;
}>();
const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
</script>
<template>
  <router-link :to="`/boards/${board.id}`" class="block w-96">
    <KCard>
      <AppImage
        v-if="board.image"
        :src="board.image?.downloadUrl"
        class="384px aspect-video"
      />
      <div
        v-else
        class="384px aspect-video"
        :style="{ backgroundColor: randomColor }"
      ></div>
      <KCardTitle class="p-2">
        <span class="text-xl text-gray-700">{{ board.title }}</span>
      </KCardTitle>
    </KCard>
  </router-link>
</template>
