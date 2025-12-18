<script setup lang="ts">
import * as openingsJson from '@/stores/openings.json';
import OpeningsDropdown from '@/components/OpeningsDropdown.vue';
import { useMovesStore } from '@/stores/moves.ts';

const openingsArr = openingsJson.default;
const moves = useMovesStore();
</script>

<template>
  <div class="w-full p-20">
    <OpeningsDropdown :moves="moves" :openings=openingsArr />
    <div class="grid grid-cols-4">
      <div class="col-span-1 coach"></div>
      <div class="col-span-3">
        <p class="pt-20" v-if="moves.activeOpening?.moves">{{moves.activeOpening?.moves[moves.movesCounter]?.text || ""}}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.coach {
  background-image: url("/Coach.PNG");
  background-position: center;
  background-size: 100%;
}
</style>
