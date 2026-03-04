<script setup lang="ts">
import { useGame } from "../composables/useGame";
import { ROUTES } from "../config";

const { scores, history, resetScores } = useGame();
</script>

<template>
  <div class="w-full max-w-112.5 mx-auto flex flex-col gap-8 animate-fade-in">
    <RouterLink
      :to="ROUTES.HOME_PAGE"
      class="text-accent-silver hover:text-white flex items-center gap-2"
    >
      ← MENU
    </RouterLink>

    <h2 class="text-3xl font-black italic uppercase text-white">Match History</h2>

    <div class="grid grid-cols-2 gap-4">
      <div class="p-4 bg-brand-panel/10 border border-brand-panel/30 rounded-2xl text-center">
        <p class="text-xs text-accent-silver uppercase">Total Games</p>
        <p class="text-2xl font-black text-white">{{ scores.total }}</p>
      </div>
      <div class="p-4 bg-brand-panel/10 border border-brand-panel/30 rounded-2xl text-center">
        <p class="text-xs text-accent-silver uppercase">Draw Rate</p>
        <p class="text-2xl font-black text-white">
          {{ scores.total ? Math.round((scores.draws / scores.total) * 100) : 0 }}%
        </p>
      </div>
    </div>

    <div class="flex flex-col gap-3 overflow-y-auto max-h-96 pr-2 custom-scrollbar">
      <div
        v-for="match in history"
        :key="match.id"
        class="flex items-center justify-between p-4 bg-brand-panel/20 rounded-xl border-l-4"
        :class="
          match.winner === 'X'
            ? 'border-player-x'
            : match.winner === 'O'
              ? 'border-player-o'
              : 'border-accent-silver'
        "
      >
        <div>
          <p
            class="font-black"
            :class="
              match.winner === 'Draw' ? 'text-white' : 'text-player-' + match.winner.toLowerCase()
            "
          >
            {{ match.winner === "Draw" ? "DRAW" : match.winner + " WON" }}
          </p>
          <p class="text-[10px] text-accent-silver uppercase italic">{{ match.date }}</p>
        </div>
        <div class="text-right">
          <p class="text-xs text-white font-bold">{{ match.movesCount }} moves</p>
        </div>
      </div>
    </div>

    <button
      @click="resetScores"
      class="w-full py-3 text-xs font-bold text-red-400 border border-red-400/30 rounded-xl hover:bg-red-400/10 transition-colors"
    >
      CLEAR ALL HISTORY
    </button>
  </div>
</template>
