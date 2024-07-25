<script setup>
const mobileMenuVisibility = ref(false);

function showHideMobileMenu() {
  mobileMenuVisibility.value = mobileMenuVisibility.value === false;
}

function hideMobileMenu() {
  mobileMenuVisibility.value = false;
}
</script>

<template>
  <header>
    <nav>
      <div class="content-wrapper">
        <div class="logo">
          <NuxtLink to="/"> האירועים הטובים ביותר </NuxtLink>
        </div>
        <ul class="desktop-nav">
          <li><NuxtLink to="/about-us">עלינו</NuxtLink></li>
          <li><NuxtLink to="#">רשימת אירועים</NuxtLink></li>
        </ul>

        <NuxtImg
          v-if="!mobileMenuVisibility"
          src="/images/menu_black_36dp.svg"
          class="menu-icon"
          @click="showHideMobileMenu"
        />
        <NuxtImg
          v-else
          name="close"
          src="/images/close_black_36dp.svg"
          class="menu-icon"
          @click="showHideMobileMenu"
        />
      </div>

      <div
        class="hidden-mobile-nav"
        :class="{ 'mobile-menu': mobileMenuVisibility }"
      >
        <ul @click="hideMobileMenu">
          <li><NuxtLink to="/about-us">עלינו</NuxtLink></li>
          <li><NuxtLink to="#">רשימת אירועים</NuxtLink></li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

header {
  nav {
    height: 63px;
    background-color: $white;
    box-shadow: 0px -13px 33px rgba(0, 0, 0, 0.25);
    display: flex;
    align-items: center;

    .hidden-mobile-nav {
      display: none;
    }

    .mobile-menu {
      z-index: 5;
      display: block;
      position: absolute;
      background-color: $white;
      top: 65px;
      width: 100%;
      border: 1px solid $white;
      box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.05);

      ul {
        flex-direction: column;
        padding-inline-start: 15px;
        padding-bottom: 15px;

        li {
          padding: 10px 0;
        }
      }
    }

    .content-wrapper {
      justify-content: flex-start;

      @media (max-width: 768px) {
        justify-content: space-between;
      }

      .menu-icon {
        width: 38px;
        display: none;
        cursor: pointer;

        @media (max-width: 768px) {
          display: block;
        }
      }

      .logo {
        width: 20%;
        font-size: 16px;
        font-weight: 600;

        @media (max-width: 990px) {
          width: 25%;
        }

        @media (max-width: 768px) {
          width: 70%;
        }
      }

      .desktop-nav {
        display: flex;
        width: 15%;
        justify-content: space-between;

        @media (max-width: 990px) {
          width: 25%;
        }

        @media (max-width: 768px) {
          display: none;
        }

        li {
          a {
            font-size: 15px;
            font-weight: 500;

            &:hover {
              color: $blue-200;
            }
          }
        }
      }
    }
  }
}
</style>
