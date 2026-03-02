<script setup lang="ts">
import type { CellValue } from "../types";
import { PLAYERS } from "../config";

interface Props {
  value: CellValue;
  disabled?: boolean;
}

defineProps<Props>();
const emit = defineEmits<{
  (e: "click"): void;
}>();
</script>

<template>
  <button
    @click="emit('click')"
    :disabled="disabled || !!value"
    class="relative flex items-center justify-center aspect-square w-full bg-brand-surface rounded-2xl border-2 border-brand-panel transition-all duration-300 group overflow-hidden"
    :class="[
      !value && !disabled
        ? 'hover:bg-brand-panel hover:scale-[1.02] active:scale-95 cursor-pointer'
        : 'cursor-default',
      value === PLAYERS.X_PLAYER ? 'text-player-x shadow-glow-x border-player-x/30' : '',
      value === PLAYERS.O_PLAYER ? 'text-player-o shadow-glow-o border-player-o/30' : '',
    ]"
  >
    <div
      v-if="value"
      class="absolute inset-0 opacity-10 animate-pulse"
      :class="value === PLAYERS.X_PLAYER ? 'bg-player-x' : 'bg-player-o'"
    ></div>

    <span
      class="text-4xl sm:text-5xl md:text-6xl font-black transition-transform duration-300 scale-110"
      :class="{ 'scale-100 opacity-100': value, 'opacity-0': !value }"
    >
      {{ value }}
    </span>
  </button>
</template>
