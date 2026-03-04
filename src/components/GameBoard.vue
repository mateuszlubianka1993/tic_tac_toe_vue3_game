<script setup lang="ts">
import { useGame } from "../composables/useGame";
import Square from "./Square.vue";

const { board, makeMove, winner, isDraw, winningLine } = useGame();

const isGameOver = () => !!winner.value || isDraw.value;
</script>

<template>
  <section class="flex flex-col items-center gap-8">
    <div class="text-center h-12">
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="transform -translate-y-4 opacity-0"
        enter-to-class="transform translate-y-0 opacity-100"
      >
        <p v-if="winner" class="text-2xl font-bold text-accent-gold uppercase tracking-widest">
          Winner: {{ winner }}!
        </p>
        <p
          v-else-if="isDraw"
          class="text-2xl font-bold text-accent-silver uppercase tracking-widest"
        >
          It's a Draw!
        </p>
      </Transition>
    </div>

    <div
      class="grid grid-cols-3 grid-rows-3 gap-3 w-full max-w-87.5 sm:max-w-112.5 p-4 bg-brand-panel/30 rounded-3xl border border-brand-panel/50 backdrop-blur-sm"
    >
      <Square
        v-for="(cell, index) in board"
        :key="index"
        :value="cell"
        :disabled="isGameOver()"
        :is-winning-square="winningLine?.includes(index)"
        @click="makeMove(index)"
      />
    </div>
  </section>
</template>

<style scoped>
section {
  perspective: 1000px;
}
</style>
