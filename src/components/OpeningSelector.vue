<script setup lang="ts">
  import OpeningsDropdown from '@/components/OpeningsDropdown.vue';
  import FamilyDropdown from '@/components/FamilyDropdown.vue';

</script>

<template>
  <div class="w-full border-2 rounded-2xl p-5 col-span-2 flex gap-4">
    <p class="">Select Opening Family:</p><FamilyDropdown /> <OpeningsDropdown />
  </div>
</template>

<style scoped>

</style>
