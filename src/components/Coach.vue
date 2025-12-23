<script setup lang="ts">
import { useMovesStore } from '@/stores/moves.ts';
const moves = useMovesStore();
</script>

<template>
  <div class="w-full border-2 rounded-2xl px-5 pt-10 coach">
    <p class="w-full text-center text-2xl">Coach Matt</p>
    <div class="grid grid-cols-4 gap-15">
      <div class="col-span-1">
      </div>
      <div class="col-span-3 pt-4">
        <p class="p-4 bg-white text-gray-500 rounded-2xl" v-if="moves.activeOpening?.moves">{{moves.activeOpening?.moves[moves.movesCounter]?.text || ""}}</p>
      </div>
    </div>

  </div>
</template>

<style scoped>
.coach {
  background-image: url("/Coach.PNG");
  background-position: 40px 40px;
  background-repeat: no-repeat;
  background-size: 20%;
}
</style>
