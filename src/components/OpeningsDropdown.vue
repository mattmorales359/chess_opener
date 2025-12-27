<script setup>
import Dropdown from '@/Components/Dropdown.vue'
import { useMovesStore } from '@/stores/moves.js'
import * as openingsJson from '@/stores/openings.json'

const openings = openingsJson.default;
const moves = useMovesStore();
const display = () => {
  return moves.activeOpening.label;
}

const selectItem = (opening, key) => {
  opening.value.key = opening.key;
  moves.updateOpening(opening.value);
}

const filterOpenings = () => {
  return openings.filter((item) => {
    return item.key.includes(moves.activeFamily.index)
  })
}

</script>
<template>
  <div class="relative h-7 flex">
    <p class="w-40">
      <a
        href="#"
        class="text-white w-50 ">Previous Line</a>
    </p>
    <p class="w-40">
      <a
        href="#"
        class="text-white w-50">Next Line</a>
    </p>
  </div>
  <div>
    <Dropdown align="left" width="48">
      <template #trigger>
        <span class="inline-flex rounded-md">
          <button type="button" class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none focus:bg-gray-50 active:bg-gray-50 transition ease-in-out duration-150">
              {{ display() || "-- --"}}

              <svg class="ms-2 -me-0.5 h-4 w-4 right-0" xmlns="http://www.w3.org/2000/svg"
                   fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
              </svg>
          </button>
      </span>
      </template>

      <template #content>
        <a
            href="#"
            class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
            v-for="(opening) in filterOpenings()"
            @click="selectItem(opening)"
        >
          {{opening.value.label}}
        </a>
      </template>
    </Dropdown>
  </div>
</template>
