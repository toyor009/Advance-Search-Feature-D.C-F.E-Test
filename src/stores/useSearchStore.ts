import { ref, readonly } from 'vue';
import { defineStore } from 'pinia';

import type { AxiosResponse } from 'axios';
import type { SearchResult } from '@/types';

import ApiService from '@/services/ApiService';

export const useSearchStore = defineStore('search', () => {
  const resultItems = ref([] as Array<SearchResult>);

  const getSearchResult = async (
    searchText: string,
    noThrottle = true
  ): Promise<AxiosResponse> => {
    return new Promise((resolve, reject) => {
      ApiService.get(
        `https://frontend-test-api.digitalcreative.cn/?no-throttling=${noThrottle}&search=${searchText}`
      )

        .then((response: AxiosResponse<Array<SearchResult>>) => {
          resultItems.value = response.data;
          resolve(response);
        })
        .catch((error) => {
          resultItems.value = [];
          reject(error);
        });
    });
  };

  return { resultItems: readonly(resultItems), getSearchResult };
});
