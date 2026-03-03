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
