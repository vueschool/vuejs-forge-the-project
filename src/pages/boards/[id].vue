<script setup>
import { ref, toRefs } from "vue";
// import AppPageHeading from "../../components/AppPageHeading.vue";
import BoardDragAndDrop from "../../components/BoardDragAndDrop.vue";
// import { useAlerts } from "@/stores/Alerts";
// const alerts = useAlerts();

const props = defineProps({
  id: String,
});

const { id: boardId } = toRefs(props);

const board = ref({
  id: boardId.value,
  title: "Let's have an amazing time at Vue.js forge!! 🍍",
  order: JSON.stringify([
    { id: "1", title: "backlog 🌴", taskIds: ["1", "2"] },
  ]),
});

const tasks = ref([
  { id: "1", title: "Code like mad people!" },
  { id: "2", title: "Push clean code" },
]);

const updateBoard = (b) => {
  board.value = b;
  // alerts.success("Board updated!");
};
</script>

<template>
  <div>
    <!-- <app-page-heading>
      {{ board.title }}
    </app-page-heading> -->

    <board-drag-and-drop :tasks="tasks" :board="board" @update="updateBoard" />

    <details>
      <pre>
        {{ board }}
      </pre>
    </details>
  </div>
</template>

<style scoped>
pre {
  width: 400px;
  overflow-x: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
