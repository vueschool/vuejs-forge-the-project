<script setup lang="ts">
import { ref, toRefs } from "vue";
// import AppPageHeading from "../../components/AppPageHeading.vue";
import BoardDragAndDrop from "../../components/BoardDragAndDrop.vue";
// import { useAlerts } from "@/stores/Alerts";
// const alerts = useAlerts();
import type { Task } from "@/types";
import { v4 as uuidv4 } from "uuid";
import addTaskMutation from '../../graphql/mutations/addTask.mutation.gql'
import { useMutation } from "@vue/apollo-composable";

const props = defineProps({
  id: String,
});

const { id: boardId } = toRefs(props);

const { mutate: createTaskOnBoard, onDone: onDoneCreatingTask, onError: onErrorCreatingTask } = useMutation(addTaskMutation)

let taskResolve = (task: Task) => {}
let taskReject = (message: Error) => {}

const board = ref({
  id: boardId?.value || "1",
  title: "Let's have an amazing time at Vue.js forge!! 🍍",
  order: JSON.stringify([
    { id: "1", title: "backlog 🌴", taskIds: ["1", "2"] },
  ]),
});

const tasks = ref<Partial<Task>[]>([
  { id: "1", title: "Code like mad people!" },
  { id: "2", title: "Push clean code" },
]);

async function addTask(task: Task) {
  return new Promise((resolve, reject) => {
    taskResolve = resolve
    taskReject = reject
    return resolve(createTaskOnBoard({
      boardId: boardId?.value,
      ...task
    }))
  });
}

onErrorCreatingTask((error) => {
  taskReject(error)
  console.error("Some kind of error", error)
})

onDoneCreatingTask((res) => {
  taskResolve(res.data.boardUpdate.tasks.items[0])
  console.log('You added a new task')
})

const updateBoard = (b) => {
  console.log(b)
  board.value.title = b;
  // alerts.success("Board updated!");
};

const deleteBoardIfConfirmed = () => {
  console.log("delete board");
};
</script>

<template>
  <div>
    <AppPageHeading>
      <input
        type="text"
        :value="board.title"
        @keydown.enter="($event.target as HTMLInputElement).blur()"
        @blur="updateBoard(($event.target as HTMLInputElement).value)"
      />
    </AppPageHeading>
    <BoardMenu :board="board" @deleteBoard="deleteBoardIfConfirmed" />

    <BoardDragAndDrop
      :tasks="tasks"
      :board="board"
      @update="updateBoard"
      :addTask="addTask"
    />
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
