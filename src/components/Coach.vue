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
        <div class="grid grid-flow-row grid-rows-3">
          <div class="row-span-1">
            <p class="p-4 mb-10 bg-white text-gray-500 rounded-2xl" v-if="moves.activeOpening?.moves && moves.activeOpening?.moves[moves.movesCounter-1]">{{moves.activeOpening?.moves[moves.movesCounter-1]?.text || ""}}</p>
          </div>
          <div class="row-span-1 row-start-3">
            <p class="p-4 bg-white text-gray-500 rounded-2xl" v-if="moves.activeOpening?.moves">{{moves.activeOpening?.moves[moves.movesCounter]?.text || ""}}</p>
          </div>
        </div>
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
