<script setup>
import { useAuthStore } from "@/stores/useAuthStore";
const authManager = useAuthStore();

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
          <!-- <NuxtLink to="/"> האירועים הטובים ביותר </NuxtLink> -->
          <div class="logo-wrapper">
            <NuxtLink to="/">
              <NuxtImg src="/images/logo.svg" />
            </NuxtLink>
          </div>
        </div>

        <ul class="desktop-nav">
          <li>
            <NuxtLink
              v-if="authManager.loggedIn"
              class="nav-link"
              to="/admin-panel"
              >פאנל ניהול</NuxtLink
            >
          </li>
          <li><NuxtLink class="nav-link" to="/about-us">עלינו</NuxtLink></li>
          <li>
            <NuxtLink class="nav-link" to="/events">רשימת אירועים</NuxtLink>
          </li>
        </ul>

        <div class="nav-btn-wrapper">
          <NuxtLink class="create-event-link" to="/create-event"
            >צור אירוע</NuxtLink
          >
        </div>

        <NuxtImg
          v-if="!mobileMenuVisibility"
          src="/images/burger-menu.svg"
          class="menu-icon"
          @click="showHideMobileMenu"
        />
        <NuxtImg
          v-else
          name="close"
          src="/images/burger-menu.svg"
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
          <li><NuxtLink to="/events">רשימת אירועים</NuxtLink></li>
          <li>
            <NuxtLink to="/create-event" class="create-event-link"
              >צור אירוע</NuxtLink
            >
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

header {
  nav {
    padding: 30px 0;
    background-color: transparent;
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
      top: 90px;
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
      align-items: center;

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
        width: 15%;

        @media (max-width: 768px) {
          width: 70%;
        }

        .logo-wrapper {
          position: relative;
          width: 75px;

          img {
            width: 100%;
          }
        }
      }

      .desktop-nav {
        display: flex;
        width: 25%;
        justify-content: space-between;
        align-items: center;

        @media (max-width: 990px) {
          width: 25%;
        }

        @media (max-width: 768px) {
          display: none;
        }

        li {
          .nav-link {
            font-size: 14px;
            color: $white;
            font-weight: 600;
            &:hover {
              color: $purple;
            }
          }
        }
      }

      .nav-btn-wrapper {
        width: 25%;
        display: flex;
        justify-content: flex-end;

        @media (max-width: 768px) {
          display: none;
        }

        .create-event-link {
          background: linear-gradient(90deg, $blue 0%, $purple 100%);
          border: none;
          color: $white;
          font-weight: 300;
          padding: 19px 35px;
          border-radius: 100px;
          cursor: pointer;
          transition: transform 0.2s;
        }
      }
    }
  }
}
</style>
