<script setup lang="ts">
  import OpeningsDropdown from '@/components/OpeningsDropdown.vue';
  import FamilyDropdown from '@/components/FamilyDropdown.vue';
  import { useMovesStore } from '@/stores/moves.ts';
  const moves = useMovesStore()
</script>

<template>
  <div class="w-full border-2 rounded-2xl p-5 col-span-2 flex gap-4">
    <p class="">Select Opening Family: <FamilyDropdown /></p><p v-if="moves.activeFamily.index">Select Mainline: <OpeningsDropdown /></p>
  </div>
</template>

<style scoped>

</style>
