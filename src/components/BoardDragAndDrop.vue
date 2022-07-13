<script setup>
import { watch, reactive, toRaw } from "vue";
import { cloneDeep } from "lodash-es";
import draggable from "vuedraggable";
import { v4 as uuidv4 } from "uuid";

const props = defineProps({
  board: Object,
  tasks: Array,
});

// emits
const emit = defineEmits(["update"]);

// local data
const tasks = reactive(cloneDeep(props.tasks));
const board = reactive(cloneDeep(props.board));
const columns = reactive(JSON.parse(board.order));

const addColumn = () =>
  columns.push({ id: uuidv4(), title: "New column", taskIds: [] });

watch(columns, () =>
  emit(
    "update",
    cloneDeep({
      ...props.board,
      order: JSON.stringify(toRaw(columns)),
    })
  )
);
</script>

<template>
  <button class="text-gray-500" @click="addColumn">New Column +</button>
  <div class="flex items-start py-12">
    <!-- //! outer block -->
    <draggable
      :list="columns"
      group="columns"
      item-key="id"
      class="flex flex-grow-0 flex-shrink-0 overflow-x-scroll"
    >
      <template #item="{ element: column }">
        <div
          class="column bg-gray-100 flex flex-col justify-between rounded-lg px-3 py-3 rounded mr-4 w-[300px]"
        >
          <h2>{{ column.title }}</h2>
          <!-- //! inner block -->
          <draggable
            :list="column.taskIds"
            group="tasks"
            item-key="uid"
            :animation="200"
            ghost-class="ghost-card"
            class="min-h-[400px]"
          >
            <template #item="{ element: taskId }">
              <task-card
                v-if="tasks.find((t) => t.id === taskId)"
                :task="tasks.find((t) => t.id === taskId)"
                class="mt-3 cursor-move"
              />
            </template>
          </draggable>
        </div>
      </template>
    </draggable>
  </div>
</template>
