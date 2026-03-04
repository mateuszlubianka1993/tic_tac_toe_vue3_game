<script setup lang="ts">
import { onMounted } from "vue";
import GameBoard from "../components/GameBoard.vue";
import { useGame } from "../composables/useGame";
import { ROUTES } from "../config";

const { resetGame, winner, isDraw } = useGame();

onMounted(() => {
  if (winner.value || isDraw.value) {
    resetGame();
  }
});
</script>

<template>
  <div class="w-full max-w-112.5 mx-auto flex flex-col items-center gap-6 animate-fade-in">
    <RouterLink
      :to="ROUTES.HOME_PAGE"
      class="self-start text-accent-silver hover:text-player-o transition-colors duration-300 text-sm font-bold flex items-center gap-2"
    >
      <span>←</span> BACK TO MENU
    </RouterLink>

    <GameBoard class="w-full" />

    <button
      @click="resetGame"
      class="w-full py-4 border-2 border-brand-panel text-accent-silver font-black rounded-2xl hover:border-player-x hover:text-player-x transition-all duration-300 active:scale-95 uppercase tracking-widest text-sm"
    >
      RESET ARENA
    </button>
  </div>
</template>
