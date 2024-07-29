<template>
  <div class="search-bar">
    <input
      v-bind="$attrs"
      :class="[
        hasError ? 'search-bar__error' : 'search-bar__active',
        $slots.icon ? 'pl-[60px]' : 'pl-5',
      ]"
      :value="value"
      @input="updateInput"
    />

    <div class="search-bar__icon">
      <slot name="icon" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { debounce } from 'lodash';

defineOptions({
  name: 'SearchBar',
});

const props = defineProps({
  value: {
    type: String,
    default: '',
  },
  hasError: {
    type: Boolean,
    default: false,
  },
  debounceTime: {
    type: Number,
    default: 500,
  },
});

const emit = defineEmits(['update:value']);

const handleInput = debounce((inputValue) => {
  emit('update:value', inputValue);
}, props.debounceTime);

function updateInput(event: any) {
  handleInput(event.currentTarget.value);
}
</script>

<style lang="scss">
.search-bar {
  @apply relative;

  > input {
    @apply w-full h-[74px] flex items-center pr-[20px] text-[20px] leading-[26px] font-medium text-title rounded-xl bg-gray shadow-lg;
  }

  &__icon {
    @apply absolute top-[26px] left-[27px] w-6 h-6 flex items-center justify-center;
  }

  &__active {
    &:focus-visible,
    &:active {
      @apply border border-solid border-primary outline outline-1 outline-primary;
    }
  }

  &__error {
    @apply border border-solid border-error outline outline-1 outline-error;
  }
}
</style>
