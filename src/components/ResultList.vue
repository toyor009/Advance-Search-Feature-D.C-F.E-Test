<template>
  <div class="result-list">
    <ul v-if="resultItems.length" class="result-list__items">
      <ResultItem
        v-for="(item, index) in resultItems"
        :key="`${item.title}-${index}`"
        :item="item"
        :class="isLoading && 'opacity-30'"
      />
    </ul>

    <div
      v-if="!isLoading && !resultItems.length"
      class="w-full flex items-center justify-center py-10 h-[300px]"
    >
      <img src="/src/assets/images/empty.png" alt="Empty" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { SearchResult } from '@/types';

import ResultItem from '@components/ResultItem.vue';

defineOptions({ name: 'ResultList' });

const props = defineProps({
  resultItems: {
    type: Array as PropType<Array<SearchResult>>,
    default: () => [],
  },

  isLoading: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss">
.result-list {
  @apply pl-4 pr-2 relative overflow-y-hidden;

  &__items {
    @apply min-h-[120px] max-h-[350px] overflow-auto;
    -webkit-overflow-scrolling: auto;

    &::-webkit-scrollbar {
      @apply block w-2;
    }

    &::-webkit-scrollbar-track {
      @apply rounded-[20px] border border-solid border-[#f0efef];
    }

    &::-webkit-scrollbar-thumb {
      @apply bg-[#ccc] rounded-[20px];
    }

    &::-webkit-scrollbar-thumb:hover {
      @apply bg-[#a8a8a8];
    }
  }
}
</style>
