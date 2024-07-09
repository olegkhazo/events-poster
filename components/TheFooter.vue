<template>
  <footer>
    <div class="content-wrapper">
      <span>© 2024 "אירועי ישראל" כל הזכויות שמורות.</span>
    </div>
  </footer>
</template>

<script setup></script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

footer {
  background-color: $white;
  box-shadow: 0px 30px 85px 0px rgba(0, 0, 0, 0.25);

  .content-wrapper {
    display: flex;
    padding: 20px 0 20px 0;
  }
}
</style>
