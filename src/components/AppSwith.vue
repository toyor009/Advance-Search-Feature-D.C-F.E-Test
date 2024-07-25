<template>
  <label class="switch">
    <input
      type="checkbox"
      class="opacity-0 w-0 h-0"
      :checked="value"
      @input="updateInput"
    />
    <span class="switch__slider"></span>
  </label>
</template>

<script setup lang="ts">
defineOptions({ name: 'AppSwith' });

const props = defineProps({
  value: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:value']);

function updateInput(event: any) {
  emit('update:value', event.target.checked);
}
</script>

<style lang="scss">
.switch {
  @apply relative inline-block w-[52px] h-[30px];

  > input {
    &:checked + .switch__slider {
      @apply bg-primary;
    }

    &:focus + .switch__slider {
      box-shadow: 0 0 1px #6833ff;
    }

    &:checked + .switch__slider:before {
      -webkit-transform: translateX(26px);
      -ms-transform: translateX(26px);
      transform: translateX(26px);
    }
  }

  &__slider {
    @apply absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-[#ccc] rounded-[34px];
    -webkit-transition: 0.4s;
    transition: 0.4s;

    &:before {
      @apply absolute h-[24px] w-[24px] left-0 bottom-1 bg-white rounded-[50%];
      content: '';
      -webkit-transition: 0.4s;
      transition: 0.4s;
    }
  }
}
</style>
