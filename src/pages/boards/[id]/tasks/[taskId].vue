<template>
  <KDialog v-if="task" :title="taskResult?.task?.title" @close="onCloseClicked">
    <div class="grid grid-cols-3 gap-4">
      <div class="col-span-2 space-y-3">
        <div class="flex flex-col">
          <p class="text-gray-600 text-sm font-medium">Title</p>
          <KInput v-model="task.title" />
        </div>

        <div class="flex flex-col">
          <p class="text-gray-600 text-sm font-medium">Description</p>
          <KInput v-model="task.description" />
        </div>
      </div>

      <KCalendar v-model="task.dueAt" />
    </div>

    <KDialogActionsBar>
      <KButton @click="onCloseClicked">Close</KButton>
      <KButton>Save</KButton>
    </KDialogActionsBar>
  </KDialog>
</template>

<script lang="ts" setup>
import {
  Dialog as KDialog,
  DialogActionsBar as KDialogActionsBar,
} from "@progress/kendo-vue-dialogs";
import { Input as KInput } from "@progress/kendo-vue-inputs";
import { Calendar as KCalendar } from "@progress/kendo-vue-dateinputs";
import { Button as KButton } from "@progress/kendo-vue-buttons";
import getTaskQuery from "@/graphql/queries/task.query.gql";
import { useRoute, useRouter } from "vue-router";
import { useQuery } from "@vue/apollo-composable";
import { ref } from "vue";
import { parseDate } from "@progress/kendo-intl";

const router = useRouter();
const route = useRoute();

const {
  loading,
  result: taskResult,
  onResult: onTaskLoaded,
} = useQuery(
  getTaskQuery,
  {
    id: route.params.taskId,
  },
  {
    fetchPolicy: "cache-and-network",
  }
);

const task = ref<null | {
  id: string;
  title: string;
  description: string | null;
  dueAt: null | Date;
}>(null);

onTaskLoaded((result) => {
  const data = result.data?.task;
  if (!data) {
    task.value = null;
    return;
  }

  task.value = {
    id: data.id,
    title: data.title,
    description: data.description,
    dueAt: data.dueAt ? parseDate(data.dueAt, "yyyy-MM-dd") : null,
  };
});

function onCloseClicked() {
  router.push(`/boards/${route.params.id}`);
}
</script>
