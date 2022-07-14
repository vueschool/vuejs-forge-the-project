<script setup lang="ts">
import { Drawer, DrawerContent } from "@progress/kendo-vue-layout";
import { useLocalStorage } from "@vueuse/core";
import { useRouter, useRoute } from "vue-router";

import { computed, ref } from "vue";

const router = useRouter();
const route = useRoute();
const selectedId = ref(0);

const expanded = useLocalStorage("vue-forge-drawer-expanded", true);
const expandedIcon = computed(() =>
  expanded.value ? "k-i-arrow-chevron-left" : "k-i-arrow-chevron-right"
);
const items = computed(() =>
  [
    {
      text: "Boards",
      icon: "k-i-set-column-position",
      data: {
        path: "/boards",
      },
    },
    {
      text: "Templates",
      icon: "k-i-border-left",
      data: {
        path: "/templates",
      },
    },
    {
      text: "Settings",
      icon: "k-i-gear",
      data: {
        path: "/settings",
      },
    },
    {
      text: "Collapse",
      icon: expandedIcon.value,
      data: {
        action: () => (expanded.value = !expanded.value),
      },
    },
  ].map((item, index) => ({
    ...item,
    selected: route.path === item.data.path,
  }))
);

function onSelect({ itemIndex }: { itemIndex: number }) {
  const item = items.value[itemIndex];
  if (!item) return;
  selectedId.value = itemIndex;
  if (item.data.path) router.push(item.data.path);
  if (typeof item.data.action === "function") item.data.action();
}
</script>

<template>
  <Drawer
    class="h-[90vh]"
    :expanded="expanded"
    position="start"
    mode="push"
    :mini="true"
    :items="items"
    @select="onSelect"
  >
    <DrawerContent class="max-w-full overflow-hidden">
      <div class="p-5">
        <router-view />
      </div>
    </DrawerContent>
  </Drawer>
</template>
