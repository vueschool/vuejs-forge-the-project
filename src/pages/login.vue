<script setup lang="ts">
import { useAuthUserStore } from "@/stores/AuthUserStore";
const auth = useAuthUserStore();
auth.login();
</script>
<template>
  <div class="absolute top-0 left-0 bottom-0 right-0 bg-white"></div>
</template>
