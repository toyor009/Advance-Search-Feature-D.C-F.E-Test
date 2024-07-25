<template>
  <main class="flex justify-center mt-[100px]">
    <div class="bg-white pt-4 rounded-[20px] w-full lg:w-[690px] shadow-2xl">
      <div class="px-4">
        <!-- Search Input Field -->
        <SearchBar
          placeholder="Search technologies we use at DC..."
          :has-error="errorOccured"
          v-model:value="searchText"
        >
          <template #icon>
            <img src="/src/assets/icons/search.svg" alt="Search" />
          </template>
        </SearchBar>
      </div>

      <!-- Tags -->
      <div class="my-5 px-4 flex flex-wrap gap-4 items-end">
        <TagItem
          v-for="(tag, index) in tagList"
          :key="`${tag}-${index}`"
          :label="tag"
          :theme="isActiveTag(tag) ? 'primary' : 'plain'"
          @selected="handleTagSelection"
        />
      </div>

      <div
        ref="mainContentEl"
        class="result-list-el relative h-[200px] overflow-hidden"
      >
        <!-- Loader -->
        <Loader v-if="isLoading" class="absolute top-[20%] left-[40%]" />

        <!-- Error Display -->
        <ErrorImage v-else-if="errorOccured" class="h-[300px]" />

        <!-- Result List -->
        <div v-else ref="resultListEl">
          <ResultList :is-loading="isLoading" :result-items="searchResult" />
        </div>
      </div>

      <div
        class="mt-2 px-4 py-4 border-t border-solid border-[#f2f4f8] flex justify-between"
      >
        <!-- Status Message -->
        <p
          class="text-[16px] leading-5 font-semibold"
          :class="errorOccured ? 'text-error' : 'text-paragraph'"
        >
          {{ statusMessage }}
        </p>

        <!-- Throttle Toggle -->
        <div class="flex flex-col items-center">
          <span class="text-paragraph font-medium"> No throttling? </span>
          <AppSwith v-model:value="noThrottle" />
        </div>
      </div>
    </div>
  </main>

  <AppLogo class="absolute bottom-4 right-4" />
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue';

import { useSearchStore } from '@/stores/useSearchStore';

import type { SearchResult } from '@/types';

import AppLogo from '@components/AppLogo.vue';
import Loader from '@/components/AppLoader.vue';
import SearchBar from '@/components/SearchBar.vue';
import AppSwith from '@components/AppSwith.vue';
import TagItem from '@components/TagItem.vue';
import ResultList from '@components/ResultList.vue';
import ErrorImage from '@components/ErrorImage.vue';

const searchText = ref('');
const selectedTag = ref('');
const noThrottle = ref(true);

const tagList = ['Langauges', 'Build', 'Design', 'Cloud'];

const mainContentEl = ref<HTMLHtmlElement>();
const resultListEl = ref<HTMLHtmlElement>();

const isLoading = ref(true);
const errorOccured = ref(false);
const errorMessage = ref('');

const searchStore = useSearchStore();

const searchResult = computed(
  () => searchStore.resultItems as Array<SearchResult>
);

const statusMessage = computed(() => {
  if (isLoading.value) return 'Searching...';

  if (errorOccured.value) {
    return errorMessage.value;
  }

  const { length } = searchResult.value;

  if (!length) return 'No result';

  return `${length} ${length > 1 ? 'results' : 'result'}`;
});

const handleTagSelection = (tagLabel: string) => {
  if (isActiveTag(tagLabel)) {
    selectedTag.value = '';
    searchText.value = '';
    return;
  }

  selectedTag.value = tagLabel;
  searchText.value = tagLabel;
};

const isActiveTag = (tag: string) => {
  const tagLabel = tag.toLowerCase();
  return (
    selectedTag.value.toLowerCase() === tagLabel ||
    searchText.value.toLowerCase() === tagLabel
  );
};

const setResultListHeight = (height = 0) => {
  const mainContent = mainContentEl.value;
  const listEl = resultListEl.value;

  if (!mainContent) return;
  if (height) {
    mainContent.style.height = `${height}px`;
    return;
  }

  if (!listEl) return;
  mainContent.style.height = `${listEl.scrollHeight}px`;
};

const handleSearchChange = () => {
  if (selectedTag.value.toLowerCase() !== searchText.value.toLowerCase()) {
    selectedTag.value = '';
  }

  fetchSearchResult();
};

const fetchSearchResult = async () => {
  setResultListHeight();

  errorOccured.value = false;
  isLoading.value = true;
  errorMessage.value = '';

  try {
    await searchStore.getSearchResult(searchText.value, noThrottle.value);
    if (!searchResult.value.length) setResultListHeight(300);
  } catch (error: any) {
    setResultListHeight(300);
    errorOccured.value = true;

    if (error.code === 'ECONNABORTED') {
      errorMessage.value = 'The request timed out';
    } else {
      errorMessage.value =
        'Something went wrong, but this is not your falut :)';
    }
  } finally {
    isLoading.value = false;
    nextTick(() => setResultListHeight());
  }
};

watch(searchText, () => handleSearchChange(), { immediate: true });
</script>

<style lang="scss">
.result-list-el {
  transition: height 0.5s ease;
}
</style>
