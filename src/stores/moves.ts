import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Opening } from '@/interfaces/OpeningInterface.ts';

export const useMovesStore = defineStore("moves", () => {
    const movesCounter = ref(0)
    const history = ref(['rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1']);
    const activeOpening = ref({})
    const activeFamily = ref({})

    const boardApi = ref(() => {})
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
        history.value = ['rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'];
    }

    function updateFamily (family: any) {
        movesCounter.value = 0;
        activeFamily.value = family;
        activeOpening.value = {};
    }

    function loadBoard (board: any) {
        boardApi.value = board;
    }

    function nextLine() {

    }

    function prevLine() {

    }

    return {
        history,
        makeMove,
        movesCounter,
        activeOpening,
        updateOpening,
        updateFamily,
        activeFamily,
        nextLine,
        prevLine,
        boardApi,
        loadBoard,
    };
});
