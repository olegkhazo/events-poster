<script setup></script>

<template>
  <footer>
    <div class="content-wrapper">
      <span class="social-wrapper">
        <ul>
          <li>
            <NuxtLink to="#">
              <NuxtImg src="/images/instagram.png" />
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="#">
              <NuxtImg src="/images/whatsapp.png" />
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="#">
              <NuxtImg src="/images/facebook.png" />
            </NuxtLink>
          </li>
        </ul>
      </span>
      <span class="copyright-info"
        >© 2024 "אירועי ישראל" כל הזכויות שמורות.</span
      >
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

footer {
  background-color: $white;
  box-shadow: 0px 30px 85px 0px rgba(0, 0, 0, 0.25);

  .content-wrapper {
    display: flex;
    padding: 20px 0 20px 0;

    @media (max-width: 425px) {
      flex-direction: column;
    }

    .social-wrapper {
      ul {
        width: 120px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
    }

    .copyright-info {
      @media (max-width: 425px) {
        margin-top: 10px;
      }
    }
  }
}
</style>
