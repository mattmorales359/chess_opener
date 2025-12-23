<script setup>
import Dropdown from '@/Components/Dropdown.vue'
import { useMovesStore } from '@/stores/moves.js'

const openingFamilies = {
  qgd: {
    label: "Queen's Gambit Declined (White)",
    lines: ["qgd_main_1", "qgd_main_2", "qgd_mistake_1", "qgd_practice_1"]
  },

  sic: {
    label: "Sicilian Defense (Black vs e4)",
    lines: [
      "sic_main_1",      // original Sicilian mainline
      "sic_mistake_1",   // original Sicilian common mistake line
      "sic_practice_1",  // your practice Scheveningen line
      "sic_main_2",      // new Richter-Rauzer style line
      "sic_main_3",      // new Najdorf-style line
      "sic_mistake_2"    // new “unstable central push” mistake line
    ]
  },

  kid: {
    label: "King's Indian Defense (Black)",
    lines: ["kid_main_1"]
  },

  london: {
    label: "London System (White)",
    lines: ["london_main_1"]
  },

  ruy: {
    label: "Ruy Lopez / Spanish (White)",
    lines: ["ruy_main_1"]
  },

  gambits: {
    label: "Gambits & Traps",
    lines: [
      "gambit_stafford_mateish",
      "gambit_stafford_solid",
      "gambit_bahr"
    ]
  },

  french: {
    label: "French Defense (Black vs e4)",
    lines: ["french_main_1", "french_main_2", "french_mistake_1"]
  },

  caro: {
    label: "Caro-Kann Defense (Black vs e4)",
    lines: ["caro_main_1", "caro_main_2", "caro_mistake_1"]
  },

  qga: {
    label: "Queen's Gambit Accepted (Black vs d4)",
    lines: ["qga_main_1", "qga_main_2", "qga_mistake_1"]
  },

  italian: {
    label: "Italian Game & Fried Liver (White)",
    lines: ["italian_main_1", "italian_fried_main_1"]
  },
  scotch: {
    label: "Scotch Game (White vs e5)",
    lines: ["scotch_main_1", "scotch_main_2", "scotch_mistake_1"]
  },
  fourknights: {
    label: "Four Knights Game (White vs e5)",
    lines: ["fourknights_main_1", "fourknights_main_2", "fourknights_mistake_1"]
  },

  scandi: {
    label: "Scandinavian Defense (Black vs e4)",
    lines: ["scandi_main_1", "scandi_main_2", "scandi_mistake_1"]
  },

  colle: {
    label: "Colle System (White)",
    lines: ["colle_main_1", "colle_main_2", "colle_mistake_1"]
  },

  slav: {
    label: "Slav Defense (Black vs d4)",
    lines: ["slav_main_1", "slav_main_2", "slav_mistake_1", "slav_practice_1"]
  },

  dutch: {
    label: "Dutch Defense (Black vs d4)",
    lines: ["dutch_main_1", "dutch_main_2", "dutch_mistake_1", "dutch_practice_1"]
  },

  benoni: {
    label: "Benoni Defense (Black vs d4)",
    lines: ["benoni_main_1", "benoni_main_2", "benoni_mistake_1", "benoni_practice_1"]
  },

  vienna: {
    label: "Vienna Game (White)",
    lines: ["vienna_main_1", "vienna_main_2", "vienna_mistake_1"]
  },

  kingsg: {
    label: "King's Gambit (White)",
    lines: ["kingsg_main_1", "kingsg_main_2", "kingsg_mistake_1"]
  },

  antisic_gprix: {
    label: "Anti-Sicilian – Grand Prix / Closed (White)",
    lines: ["antisic_gprix_main_1", "antisic_closed_main_1", "antisic_gprix_mistake_1"]
  }
};

const moves = useMovesStore();
const display = () => {
  console.log(moves.activeFamily);
  return moves.activeFamily.label;

}

const selectItem = (family, idx) => {
  family.index = idx;
  moves.updateFamily(family);
}

</script>
<template>
  <div class="w-100">
    <Dropdown align="right" width="48">
      <template #trigger>
        <span class="inline-flex rounded-md">
          <button type="button" class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none focus:bg-gray-50 active:bg-gray-50 transition ease-in-out duration-150 w-100">
              {{ display() || " -- -- "}}

              <svg class="ms-2 -me-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg"
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
            v-for="(opening, key) in openingFamilies"
            @click="selectItem(opening, key)"
        >
          {{opening.label}}
        </a>

      </template>
    </Dropdown>
  </div>
</template>
