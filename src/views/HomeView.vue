<script setup lang="ts">
import { ref } from 'vue'

const mobileMenuOpen = ref(false)
import ChessBoard from "../components/ChessBoard.vue";
import Coach from '@/components/Coach.vue';
import OpeningSelector from '@/components/OpeningSelector.vue';

</script>

<template>
  <main>
    <div class="bg-gray-900">
      <div class="relative isolate px-6 lg:px-8">
        <div class="w-full mx-auto pt-32 sm:pt-48 lg:pt-10">
          <div class="w-full pt-20">
            <div class="w-full mb-4">
              <OpeningSelector />
            </div>
            <div class="h-2"></div>
            <div class="grid grid-cols-2 mt-4">
              <ChessBoard />
              <Coach />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
