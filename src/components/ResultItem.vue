<template>
  <li class="h-[100px] hover:bg-gray rounded-xl p-3">
    <a
      v-if="item"
      :href="item.url"
      tabindex="0"
      target="_blank"
      class="item-link"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <img :src="item.image" alt="Logo" class="w-[76px] h-[76px]" />
      <div class="flex flex-col flex-1">
        <h3 class="text-title text-[20px] leading-[26px] font-medium">
          {{ item.title }}
        </h3>
        <p class="text-paragraph text-[16px] leading-5 mt-1">
          {{ item.description }}
        </p>
      </div>

      <img v-show="isHovered" src="/src/assets/icons/link-nav.svg" alt="Link" />
    </a>
  </li>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import type { PropType } from 'vue';
import type { SearchResult } from '@/types';

defineOptions({
  name: 'ResultItem',
});

const props = defineProps({
  item: {
    type: Object as PropType<SearchResult>,
    required: true,
  },
});

const isHovered = ref(false);
</script>

<style lang="scss">
.item-link {
  @apply flex gap-3 items-center;

  &:focus-visible {
    @apply outline outline-1 outline-primary;
  }
}
</style>
