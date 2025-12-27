<script setup lang="ts">
  import OpeningsDropdown from '@/components/OpeningsDropdown.vue';
  import FamilyDropdown from '@/components/FamilyDropdown.vue';
  import { useMovesStore } from '@/stores/moves.ts';
  const moves = useMovesStore()
</script>

<template>
  <div class="w-full border-2 rounded-2xl p-5 col-span-2 gap-4 grid grid-cols-4">
    <div class="col-span-2 relative"><FamilyDropdown /></div>
    <div class="col-span-2 relative"  v-if="moves.activeFamily.index"><OpeningsDropdown/></div>
  </div>
</template>

<style scoped>

</style>
