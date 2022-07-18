<script setup lang="ts">
import { useAuthUserStore } from "./stores/AuthUserStore";

const authUserStore = useAuthUserStore();
authUserStore.initUser();
</script>

<template>
  <TheNavbar />
  <TheDrawer />
  <TheAlerts />
</template>
