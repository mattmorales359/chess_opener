<script setup lang="ts">
import { useMovesStore } from '@/stores/moves.ts';

const moves = useMovesStore ();

const getPlayer = ( move ) => {
  return move.by === 'opponent' ? 'Opponent' : 'You';
}
</script>

<template>
  <div class="w-full border-2 rounded-2xl px-5 pt-10 coach">
    <p class="w-full text-center text-2xl">Coach Matt</p>
    <div class="grid grid-cols-4 gap-15">
      <div class="col-span-1">
      </div>
      <div class="col-span-3 pt-4" v-if="moves?.activeOpening?.moves?.length && (moves.movesCounter < moves.activeOpening.moves.length)">
        <div class="row-span-1 row-start-3"
             v-if="moves.activeOpening?.moves && moves.activeOpening.moves[moves.movesCounter]">
          <span class=" text-white font-bold">{{
              getPlayer ( moves.activeOpening?.moves[ moves.movesCounter ] )
            }}:</span>
          <p class="p-4 bg-white text-gray-500 rounded-2xl">
            {{ moves.activeOpening?.moves[ moves.movesCounter ]?.text || "" }}</p>
        </div>
        <div class="grid grid-flow-row grid-rows-3" v-if="moves.activeOpening?.moves[moves.movesCounter - 1]">
          <div class="row-span-1">
            <span class="text-white font-bold">{{
                getPlayer ( moves.activeOpening?.moves[ moves.movesCounter - 1 ] )
              }}:</span>
            <p class="p-4 mb-10 bg-white text-gray-500 rounded-2xl">
              {{ moves.activeOpening?.moves[ moves.movesCounter - 1 ]?.text || "" }}</p>
          </div>
        </div>
      </div>
      <div class="grid grid-flow-row grid-rows-3 col-span-3 pt-4"
           v-if="moves?.activeOpening?.moves?.length && (moves.movesCounter >= moves.activeOpening.moves.length)">
        <div class="row-span-1">
          <p class="text-black font-bold p-4 bg-white text-gray-500 rounded-2xl">Play the rest of the game on your own and checkmate your opponent!</p>
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
