<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const currentIndex = ref(0);
const isMobile = ref(false);
const config = useRuntimeConfig();
const API_URL = config.public.API_URL;

const { data: banners } = await useFetch(`${API_URL}/all-banners`);

let intervalId = null;

const checkIsMobile = () => {
  isMobile.value = window.innerWidth < 1280;
};

const prevSlide = () => {
  currentIndex.value =
    (currentIndex.value - 1 + (banners?.value?.length || 0)) %
    (banners?.value?.length || 1);
};

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % (banners?.value?.length || 1);
};

const startAutoSlide = () => {
  intervalId = setInterval(nextSlide, 3000);
};

const stopAutoSlide = () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
};

onMounted(() => {
  checkIsMobile();
  window.addEventListener("resize", checkIsMobile);

  if (banners?.value?.length > 1) {
    startAutoSlide();
  }
});

onUnmounted(() => {
  stopAutoSlide();
  window.removeEventListener("resize", checkIsMobile);
});
</script>

<template>
  <div class="slider">
    <div class="slider-container" v-if="banners && banners.length">
      <div
        class="slide"
        :style="{
          backgroundImage: `url(${banners[currentIndex]?.img})`,
        }"
      >
        <TheHeader />
        <div class="slide-content">
          <div class="left-switch">
            <img
              src="/images/right-arrow.svg"
              @click="prevSlide"
              alt="right-arrow"
            />
          </div>
          <div class="banner-text">
            <h2>{{ banners[currentIndex].title }}</h2>
            <hr />
            <p>{{ banners[currentIndex].description }}</p>
            <div class="nav-btn-wrapper">
              <NuxtLink
                v-if="banners[currentIndex].link"
                class="create-event-link"
                :to="banners[currentIndex].link"
                :target="blank"
              >
                צפו בלוח הזמנים
              </NuxtLink>
            </div>
          </div>
          <div class="right-switch">
            <img
              src="/images/left-arrow.svg"
              @click="nextSlide"
              alt="left-arrow"
            />
          </div>
        </div>

        <div class="filter-social">
          <div class="filter-block">
            <TheFilter />
          </div>
          <div class="social-icons">
            <!-- <img src="/images/whatsapp.png" />-->
            <a href="https://www.instagram.com/pickevent0/" target="_blank"><img src="/images/instagram.png" /></a>
            <a href="https://www.facebook.com/groups/ashdodfun" target="_blank"><img src="/images/facebook.png" /></a>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="loading">Loading banners...</div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.slider {
  background-color: $black;
  position: relative;

  .slider-container {
    height: inherit;

    .slide {
      position: relative;
      display: flex;
      flex-direction: column;
      background-size: cover;
      background-position: center;
      width: 100%;
      height: inherit;

      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        z-index: 1;
      }

      .slide-content,
      .filter-social {
        position: relative;
        z-index: 2;
      }

      @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: white;
        text-align: center;
      }

      .slide-content {
        width: 60%;
        margin: 30px 0;
        display: flex;
        justify-content: space-between;
        z-index: 1;

        @media (max-width: 768px) {
          width: 100%;
          margin-top: 0;
        }

        .banner-text {
          max-height: 350px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;

          h2 {
            color: $white;
            font-size: 76px;
            margin: 0;
            line-height: 1;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 20ch;

            @media (max-width: 768px) {
              font-size: 40px;
            }
          }

          hr {
            height: 5px;
            background: linear-gradient(90deg, $blue 0%, $purple 100%);
            border-radius: 10px;
            border: none;
            margin-top: 1px;

            @media (max-width: 768px) {
              display: none;
            }
          }

          p {
            color: $white;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 60ch;

            @media (max-width: 768px) {
              margin-top: 15px;
              font-size: 32px;
            }
          }

          .nav-btn-wrapper {
            margin: 40px 0 100px 0;

            .create-event-link {
              background: linear-gradient(90deg, $blue 0%, $purple 100%);
              border: none;
              color: $white;
              font-weight: 300;
              padding: 19px 35px;
              border-radius: 100px;
              cursor: pointer;
              transition: transform 0.2s;

              @media (max-width: 768px) {
                font-size: 30px;
              }
            }
          }
        }

        .left-switch,
        .right-switch {
          img {
            margin: 100px 20px 0 20px;
            cursor: pointer;

            @media (max-width: 1280px) {
              margin: 100px 40px 0 40px;
            }

            @media (max-width: 768px) {
              margin: 30px 20px 0 20px;
            }
          }
        }
      }
    }

    .filter-social {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;

      @media (max-width: 1280px) {
        flex-direction: column-reverse;
      }

      .filter-block {
        width: 100%;
        border-radius: 40px 0 0 0;
        background-color: $pink;
        z-index: 3;

        @media (max-width: 1280px) {
          width: 100%;
          border-radius: 0;
        }
      }

      .social-icons {
        display: flex;
        width: 35%;
        padding-right: 5%;

        @media (max-width: 1280px) {
          width: 100%;
          padding: 0 70% 40px 0;
        }

        @media (max-width: 768px) {
          display: none;
        }

        img {
          width: 55px;
          height: 55px;
          margin-left: 20px;
        }
      }
    }
  }
}
</style>
