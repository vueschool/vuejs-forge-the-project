<script setup lang="ts">
import { toRefs, computed, ref } from "vue";
import type { Task, Board } from "@/types";
import { useAlerts } from "@/stores/alerts";
import { useQuery, useMutation } from "@vue/apollo-composable";
import getBoardQuery from "@/graphql/queries/board.query.gql";
import boardsQuery from "@/graphql/queries/boards.query.gql";
import deleteBoardMutation from "@/graphql/mutations/deleteBoard.mutation.gql";
import updateBoardMutation from "@/graphql/mutations/updateBoard.mutation.gql";
import addTaskToBoardMutation from "@/graphql/mutations/addTaskToBoard.mutation.gql";
import { useRouter } from "vue-router";

const alerts = useAlerts();
const router = useRouter();

// Define Props
const props = defineProps<{
  id: string;
}>();
const { id: boardId } = toRefs(props);

// Init Page Data with Board and tasks
const {
  result: boardData,
  loading: loadingBoard,
  onError: onBoardError,
} = useQuery(
  getBoardQuery,
  { id: boardId.value },
  {
    fetchPolicy: "cache-and-network",
  }
);
onBoardError(() => alerts.error("Error loading board"));
const board = computed(() => boardData.value?.board || null);
const tasks = computed(() => board.value?.tasks?.items);

// handle board updates
const updatingTitle = ref(false);
const { mutate: updateBoard, onDone: onBoardUpdated } =
  useMutation(updateBoardMutation);
onBoardUpdated(() => {
  if (updatingTitle.value) {
    alerts.success("Board successfully updated!");
  }
});
const updateBoardTitle = async (title: string) => {
  if (board.value.title === title) return;
  updatingTitle.value = true;
  await updateBoard({ id: boardId.value, title });
  updatingTitle.value = false;
};

//handle delete board
const { mutate: deleteBoard, onError: onErrorDeletingBoard } = useMutation(
  deleteBoardMutation,
  {
    update(cache) {
      cache.updateQuery({ query: boardsQuery }, (res) => ({
        boardsList: {
          items: res.boardsList.items.filter(
            (b: Board) => b.id !== boardId.value
          ),
        },
      }));
    },
  }
);
onErrorDeletingBoard(() => alerts.error("Error deleting board"));
async function deleteBoardIfConfirmed() {
  const yes = confirm("Are you sure you want to delete this board?");
  if (yes) {
    await deleteBoard({ id: boardId.value });
    router.push("/");
    alerts.success(`Board successfully deleted`);
  }
}

// handle create task
const {
  mutate: addTaskToBoard,
  onError: onErrorCreatingTask,
  onDone: onDoneCreatingTask,
} = useMutation(addTaskToBoardMutation);

// eslint-disable-next-line
let taskResolve = (task: Task) => {};
// eslint-disable-next-line
let taskReject = (message: Error) => {};

function addTask(task: Task) {
  return new Promise((resolve, reject) => {
    taskResolve = resolve;
    taskReject = reject;
    addTaskToBoard({
      boardId: boardId.value,
      ...task,
    });
  });
}

onErrorCreatingTask((error) => {
  console.log(error);
  taskReject(error);
  alerts.error("Error creating task");
});
onDoneCreatingTask((res) => {
  taskResolve(res.data.boardUpdate.tasks.items[0]);
  alerts.success("New task created!");
});
</script>
<template>
  <div v-if="board">
    <div class="flex justify-between">
      <AppPageHeading>
        <input
          @keydown.enter="($event.target as HTMLInputElement).blur()"
          @blur="updateBoardTitle(($event.target as HTMLInputElement).value)"
          type="text"
          :value="board.title"
        />
      </AppPageHeading>
      <BoardMenu :board="board" @deleteBoard="deleteBoardIfConfirmed" />
    </div>

    <BoardDragAndDrop
      :board="board"
      :tasks="tasks"
      @update="updateBoard"
      :addTask="addTask"
    />
  </div>
  <AppLoader v-if="loadingBoard" :overlay="true" />
</template>
