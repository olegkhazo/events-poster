import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useFilterDataStore = defineStore('filter-data-store', () => {
  const currentFilter = ref("");


  return { currentFilter };
});