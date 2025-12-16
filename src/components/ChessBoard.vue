<script setup lang="ts">
  import { onMounted, reactive, ref } from 'vue';
  import {
    TheChessboard,
    type BoardConfig,
    type BoardApi,
    type MoveableColor,
    type MoveEvent,
  } from 'vue3-chessboard';
  import 'vue3-chessboard/style.css';
  import OpeningsDropdown from '@/components/OpeningsDropdown.vue';
  import * as openingJSON from '@/stores/openings.json'
  import { useMovesStore } from '@/stores/moves'

  const openingsArr = openingJSON.default
  let boardApi: BoardApi | undefined;
  const boardConfig: BoardConfig = reactive({
    fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', // the position to start from as a string
    orientation: 'white', // the orientation of the board
    turnColor: 'white', // the color which starts the game
    coordinates: true, // enable or disable board coordinates
    autoCastle: false, // simplify castling move
    viewOnly: false, // allow or disallow moves on the board
    disableContextMenu: false, // enable/ disable the context menu
    addPieceZIndex: false,
    blockTouchScroll: false,
    highlight: {
      lastMove: true, // highlight the last move on the board
      check: true, // highlight king in check
    },
    animation: { // modify piece animations
      enabled: true,
      duration: 200,
    },
    lastMove: undefined, // this should not be modified
    movable: {
      free: false, // set to true any move is allowed, if false only legal moves
      color: 'white',
      showDests: true,
      //dests: possibleMovesWhite,
      events: {},
      rookCastle: true,
    },
    premovable: {
      enabled: true,
      showDests: true,
      castle: true,
      events: {},
    },
    predroppable: {
      enabled: false,
      events: {},
    },
    draggable: {
      enabled: true,
      distance: 3,
      autoDistance: true,
      showGhost: true,
      deleteOnDropOff: false,
    },
    selectable: {
      enabled: true,
    },
    events: {
      change: () => {
        // called after the situation changes on the board
        //console.log('Something changed!');
      },
      move: (from, to, capture) => {
        // the move function fires after each move on the board, you can access the values from, to, and capture
        // use @move event to access values from the board api. The move function is executed before the state is updated in the board.
        //console.log(from, to, capture);
      },
      select(key) {
        // called when a square is selected
        // the param key is the square being selected: e.g. d2 or e2...
        //console.log(key);
      },
    },
    drawable: {
      enabled: true,
      visible: true,
      defaultSnapToValidMove: true,
      eraseOnClick: true,
      shapes: [],
      autoShapes: [],
      brushes: {
        green: { key: 'g', color: '#15781B', opacity: 1, lineWidth: 10 },
        red: { key: 'r', color: '#882020', opacity: 1, lineWidth: 10 },
        blue: { key: 'b', color: '#003088', opacity: 1, lineWidth: 10 },
        yellow: { key: 'y', color: '#e68f00', opacity: 1, lineWidth: 10 },
        paleBlue: { key: 'pb', color: '#003088', opacity: 0.4, lineWidth: 15 },
        paleGreen: { key: 'pg', color: '#15781B', opacity: 0.4, lineWidth: 15 },
        paleRed: { key: 'pr', color: '#882020', opacity: 0.4, lineWidth: 15 },
        paleGrey: {
          key: 'pgr',
          color: '#4a4a4a',
          opacity: 0.35,
          lineWidth: 15,
        },
      },
    },
  })

  const moves = useMovesStore();

  onMounted(() => {
    //console.log(boardApi?.getBoardPosition());
  });

  function getMoveFromUCI () {
    const uci = moves.activeOpening.moves[moves.movesCounter].uci
    return {
      to : uci.substring(2,4),
      from: uci.substring(0,2)
    }
  }

  function handleMove(move: MoveEvent) {
    console.log(moves.movesCounter, moves.activeOpening.moves.length)
    if(moves.movesCounter >= (moves.activeOpening.moves.length - 1)) {
      return
    }
    const {from, to} = getMoveFromUCI();
    if(from === move.from && to === move.to) {
      moves.makeMove(move);
      const {from, to} = getMoveFromUCI();
      boardApi?.drawMove(from, to, 'red')
    } else {
      setTimeout(() => {
        boardApi?.undoLastMove();
        boardApi?.drawMove(from, to, 'red')
      })
    }
  }

  function selectOpening(opening:any) {
    moves.updateOpening(opening.value);
    const { from, to } = getMoveFromUCI();
    boardApi?.drawMove(from, to, 'red')
  }
</script>

<template>
  <div class="grid grid-cols-2 w-screen">
    <div class="w-full p-20 content-center">
      <div class="grid grid-cols-4">
        <button
            class="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            @click="boardApi?.toggleOrientation()">
          Toggle orientation
        </button>
        <button
            @click="boardApi?.resetBoard()"
            class="mx-3 rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >Reset</button>
        <button
            @click="boardApi?.undoLastMove()"
            class="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >Undo</button>
        <button
            @click="boardApi?.toggleMoves()"
            class="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >Threats</button>
      </div>
      <div class="content-center">
        <TheChessboard
            :board-config="boardConfig"
            @board-created="(api) => (boardApi = api)"
            @move="handleMove"
            reactive-config
        />
      </div>
    </div>
    <div class="w-full p-20">
      <OpeningsDropdown :openings=openingsArr @select-opening="selectOpening"/>
      <p class="pt-20" v-if="moves.activeOpening.moves">{{moves.activeOpening?.moves[moves.movesCounter]?.text || ""}}</p>
    </div>
  </div>
</template>

<style scoped>
@media (orientation: landscape) {
  .main-wrap {
    width: 500px !important;
    margin-inline: auto;
    max-width: 700px;
  }
}
</style>
