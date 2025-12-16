import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Opening } from '@/interfaces/OpeningInterface.ts';

// Families group series into “levels”
const openingFamilies = {
    qgd: {
        label: "Queen's Gambit Declined (White)",
        lines: ["qg_main_1", "qg_main_2", "qg_mistake_1", "qg_practice_1"]
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

export const useMovesStore = defineStore("moves", () => {
    const movesCounter = ref(0)
    const history = ref(['rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1']);
    const activeOpening = ref(<Opening> {})
    function makeMove (move: any) {
        increment()
        history.value.push(move.after)
    }
    function increment() {
        movesCounter.value++;
    }

    function updateOpening (opening: Opening) {
        movesCounter.value = 0;
        activeOpening.value = opening;
        history.value = [];
    }


    return { history,  makeMove, movesCounter, activeOpening, updateOpening};
});
