<script setup lang="ts">
import { onMounted, reactive, watch } from 'vue';
  import {
    TheChessboard,
    type BoardConfig,
    type BoardApi,
    type MoveEvent,
  } from 'vue3-chessboard';
  import 'vue3-chessboard/style.css';
  import { useMovesStore } from '@/stores/moves'
  import * as openingsJson from '@/stores/openings.json'

  const openings = openingsJson.default;
  let boardApi: BoardApi | undefined;
  const boardConfig: BoardConfig = reactive({
    fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', // the position to start from as a string
    orientation: 'white', // the orientation of the board
    turnColor: 'white', // the color which starts the game
    coordinates: true, // enable or disable board coordinates
    autoCastle: true, // simplify castling move
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
      // change: () => {
      //   // called after the situation changes on the board
      //   //console.log('Something changed!');
      // },
      // move: (from, to, capture) => {
      //   // the move function fires after each move on the board, you can access the values from, to, and capture
      //   // use @move event to access values from the board api. The move function is executed before the state is updated in the board.
      //   //console.log(from, to, capture);
      // },
      // select(key) {
      //   // called when a square is selected
      //   // the param key is the square being selected: e.g. d2 or e2...
      //   //console.log(key);
      // },
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

onMounted(() => {
    //console.log(boardApi?.getBoardPosition());
  });

  const moves = useMovesStore();

  function getMoveFromUCI () {
    const uci = moves.activeOpening.moves[moves.movesCounter].uci
    return {
      to : uci.substring(2,4),
      from: uci.substring(0,2)
    }
  }

  function handleMove(move: MoveEvent) {
    if(moves.movesCounter >= (moves.activeOpening.moves.length - 1)) {
      return
    }
    const {from, to} = getMoveFromUCI();
    if(from === move.from && to === move.to) {
      moves.makeMove(move);
      const {from, to} = getMoveFromUCI();
      boardApi?.drawMove(from, to, 'red')

      if(boardApi?.getTurnColor() !== moves.activeOpening.userColor) {
        setTimeout(() => {
          boardApi?.move({from, to});
        }, 2000)
      }
    } else {
      setTimeout(() => {
        boardApi?.undoLastMove();
        boardApi?.drawMove(from, to, 'red')
      })
    }
  }


  //this automates setting board up when line changes
  watch(() => moves.activeOpening.key, () => {
      if(moves.activeOpening.key === undefined) return;
      boardApi?.resetBoard ();
      boardConfig.orientation = moves.activeOpening.userColor
      const { from, to } = getMoveFromUCI ();
      setTimeout ( () => {
        boardApi?.drawMove ( from, to, 'red' );
        setTimeout(() => {
          if(moves.activeOpening.userColor === 'black') {
            boardApi?.move({from, to});
          }
        }, 2000)
      })
  })


  //this automates selecting first mainline when family changes
  watch(() => moves.activeFamily, () => {
    if(moves.activeFamily.label !== undefined) {
      var activeOpenings = openings.filter((item) => {
        return item.key.includes(moves.activeFamily.index)
      })
      if(activeOpenings.length > 0){
        activeOpenings[0].value.key = activeOpenings[0].key
        moves.updateOpening(activeOpenings[0].value)
      }
    }
  })
</script>

<template>
  <div class="w-full border-2 rounded-2xl p-5 pt-10">
    <TheChessboard
        :board-config="boardConfig"
        @board-created="(api) => (boardApi = api)"
        @move="handleMove"
        reactive-config
    />
    <div class="grid grid-cols-4 pt-4">
      <button
          class="rounded-md  px-3.5 py-2.5 text-sm font-semibold  text-white shadow-xs cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          @click="boardApi?.toggleOrientation()">
        Toggle orientation
      </button>
      <button
          @click="boardApi?.resetBoard()"
          class="mx-3 rounded-md  px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
      >Reset</button>
      <button
          @click="boardApi?.undoLastMove()"
          class="rounded-md  px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
      >Undo</button>
      <button
          @click="boardApi?.toggleMoves()"
          class="rounded-md  px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:border-gray-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
      >Threats</button>
    </div>
  </div>
</template>

<style scoped>
@media (orientation: landscape) {
  .main-wrap {
    margin-inline: auto;
    max-width: 80%;
  }
}
</style>
