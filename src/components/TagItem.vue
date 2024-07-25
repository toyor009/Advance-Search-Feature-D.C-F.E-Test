<template>
  <div
    class="itag-item"
    :class="theme"
    tabindex="0"
    @click="handleSelection(label)"
    @keydown.enter="handleSelection(label)"
  >
    <slot name="icon">
      <img
        v-if="theme === 'plain'"
        src="/src/assets/icons/tag-primary.svg"
        alt="Tag"
      />
      <img
        v-if="theme === 'primary'"
        src="/src/assets/icons/tag-white.svg"
        alt="Tag"
      />
    </slot>

    <span> {{ label }} </span>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

import type { TagTheme } from '@/types';

defineOptions({
  name: 'TagItem',
});

const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  theme: {
    type: String as PropType<TagTheme>,
    default: 'plain',
  },
});

const emit = defineEmits<{
  (event: 'selected', tagLabel: string): void;
}>();

const handleSelection = (tagLabel: string) => {
  emit('selected', tagLabel);
};
</script>

<style lang="scss">
.itag-item {
  @apply h-8 w-fit gap-2 px-4 cursor-pointer flex items-center justify-center rounded-[200px] text-[14px] leading-[18px] font-medium;

  &:focus-visible {
    @apply outline outline-1 outline-primary;
  }

  &.plain {
    @apply bg-gray text-primary;
  }

  &.primary {
    @apply bg-primary text-white;
  }
}
</style>
