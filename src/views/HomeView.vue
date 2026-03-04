<script setup lang="ts">
import { useGame } from "../composables/useGame";
const { scores } = useGame();
</script>

<template>
  <div class="flex flex-col items-center gap-16 text-center">
    <header>
      <h1 class="text-6xl sm:text-7xl font-black text-white tracking-tighter uppercase italic">
        Tic Tac <span class="text-player-x">Toe</span>
      </h1>
      <p class="text-accent-silver mt-4 tracking-[0.3em] uppercase text-xs font-bold">
        Vue 3 & Tailwind v4
      </p>
    </header>

    <div class="flex flex-col items-center gap-12 text-center">
      <div
        class="grid grid-cols-3 gap-8 p-6 bg-brand-panel/20 rounded-3xl border border-brand-panel/30 backdrop-blur-sm"
      >
        <div>
          <p class="text-player-x font-black text-2xl">{{ scores.X }}</p>
          <p class="text-accent-silver text-[10px] uppercase tracking-tighter">X Wins</p>
        </div>
        <div class="border-x border-brand-panel/50 px-8">
          <p class="text-white font-black text-2xl">{{ scores.draws }}</p>
          <p class="text-accent-silver text-[10px] uppercase tracking-tighter">Draws</p>
        </div>
        <div>
          <p class="text-player-o font-black text-2xl">{{ scores.O }}</p>
          <p class="text-accent-silver text-[10px] uppercase tracking-tighter">O Wins</p>
        </div>
      </div>
    </div>

    <nav class="flex flex-col w-full max-w-64 gap-6">
      <RouterLink
        to="/game"
        class="group relative px-8 py-5 bg-player-o text-brand-dark font-black text-center rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-glow-o"
      >
        START NEW GAME
      </RouterLink>

      <button
        disabled
        class="px-8 py-5 border-2 border-brand-panel text-brand-panel font-black rounded-2xl cursor-not-allowed opacity-40 uppercase text-sm tracking-widest"
      >
        History (Soon)
      </button>
    </nav>
  </div>
</template>
