<script setup></script>

<template>
  <div class="all-events-wrapper">
    <TheFilter />
    <div class="events-block">
      <SingleEventComponent />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.all-events-wrapper {
  min-height: 60vh;
  margin: 20px auto 100px auto;
  display: flex;
  flex-direction: column;
  width: 90%;

  .events-block {
    display: flex;
    margin-top: 20px;
    flex-wrap: wrap;
    justify-content: space-between;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  }
}
</style>
