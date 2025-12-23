<script setup lang="ts">

  import { useMovesStore } from '@/stores/moves.ts';
  import OpeningsDropdown from '@/components/OpeningsDropdown.vue';

  const moves = useMovesStore()

  function prevLine () {
    moves.prevLine()
  }

  function nextLine () {
    moves.nextLine()
  }
</script>

<template>
  <div class="w-200">
    <a @click="prevLine">Prev Line</a>
    <a @click="nextLine">Next Line</a>
    <OpeningsDropdown />
  </div>
</template>

<style scoped>

</style>
