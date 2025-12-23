<script setup lang="ts">
import { ref } from 'vue'

const mobileMenuOpen = ref(false)
import ChessBoard from "../components/ChessBoard.vue";
import Coach from '@/components/Coach.vue';
import OpeningSelector from '@/components/OpeningSelector.vue';

</script>

<template>
  <main>
    <div class="">
      <div class="relative isolate px-5 lg:px-30">
        <div class="mx-auto sm:pt-48 lg:pt-10 content-center">
          <div class="">
            <div class="md:grid md:grid-cols-2 mt-4 md:gap-8">
              <OpeningSelector />
              <ChessBoard />
              <Coach />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
