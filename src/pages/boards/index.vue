<script setup lang="ts">
import { useAlerts } from "@/stores/alerts";
import type { Board } from "@/types";
import { ref } from "vue";
const boards = ref<Partial<Board>[]>([
  {
    id: "1",
    title: "My First Board",
    order: "[]",
    image: {
      downloadUrl: "https://picsum.photos/480/270?board=1",
    },
  },
  {
    id: "2",
    title: "My Second Board",
    order: "[]",
    image: {
      downloadUrl: "https://picsum.photos/480/270?board=2",
    },
  },
  {
    id: "3",
    title: "My Third Board",
    order: "https://picsum.photos/480/270?watermelon=3",
  },
  {
    id: "4",
    title: "And another one",
    order: "https://picsum.photos/480/270?watermelon=4",
  },
  {
    id: "5",
    title: "Cute boardie",
    order: "https://picsum.photos/480/270?watermelon=5",
  },
  {
    id: "6",
    title: "Serious corpo board",
    order: "https://picsum.photos/480/270?watermelon=6",
  },
]);

const alerts = useAlerts();

function createBoard() {
  alerts.success("Board created!");
}

const getCoolGradient = (index) => {
  let finalGradientString = "";
  switch (index) {
    case 1:
      finalGradientString = "from-orange-400 to-pink-500";
      break;
    case 2:
      finalGradientString = "from-green-400 to-blue-400";
      break;
    case 3:
      finalGradientString = "from-purple-400 to-blue-400";
      break;
    default:
      finalGradientString = "from-orange-400 to-yellow-500";
  }
  return finalGradientString;
};
</script>

<template>
  <h1 class="mb-5 text-3xl">Boards</h1>
  <div class="flex flex-wrap gap-2">
    <div
      class="border rounded-md bg-gradient-to-tr"
      v-for="(board, index) in boards"
      :key="board.id"
      :class="getCoolGradient(index)"
    >
      <BoardCard
        :board="board"
        class="transition duration-100 ease-in border rounded-md hover:-rotate-3"
      />
    </div>
    <button class="text-gray-500" @click="createBoard()">
      <span>New Board +</span>
    </button>
  </div>
</template>
