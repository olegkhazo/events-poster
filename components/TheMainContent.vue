<script setup></script>

<template>
  <main>
    <h1>Main Content</h1>
  </main>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

main {
  width: 68%;
  background-color: $gray-300;

  .mains-header {
    background-color: $gray-800;
    padding-left: 15px;

    h1 {
      color: $white;
    }
  }
}
</style>
