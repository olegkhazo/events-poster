<template>
  <div class="footer">
    <div class="footer-wrapper">
      <div class="footer-rights">
        <span> © 2024 "Israel events" All rights reserved. </span>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.footer {
  background-color: $white;
  box-shadow: 0px 30px 85px 0px rgba(0, 0, 0, 0.25);

  .footer-wrapper {
    .footer-rights {
      display: flex;
      justify-content: flex-end;
      width: 100%;
      padding: 20px 0 20px 0;
    }
  }
}
</style>
