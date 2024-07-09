<script setup>
import { filtersData } from "~/utils/filters-data";
import { useFilterDataStore } from "~/stores/filtersStore";

const { currentFilter } = storeToRefs(useFilterDataStore());

function updateCurrentFilter(newFilter) {
  currentFilter.value = newFilter;
}
</script>

<template>
  <div class="filter-wrapper">
    <div class="filters">
      <span
        v-for="filter in filtersData"
        :key="filter"
        class="single-filter"
        @click="updateCurrentFilter(filter)"
        :class="{ active: filter === currentFilter }"
        >{{ filter }}</span
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.filter-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 0;

  .filters {
    .single-filter {
      display: inline-block;
      padding: 5px 10px;
      cursor: pointer;
      box-sizing: border-box;
      border: 2px solid transparent;
      border-radius: 3px;

      &:hover {
        transition: border-color 0.6s ease;
        border: 2px solid $blue-200;
      }
    }

    .active {
      transition: border-color 0.6s ease;
      border: 2px solid $blue-200;
      color: $blue-200;
    }
  }
}
</style>
~/stores/filtersStore
