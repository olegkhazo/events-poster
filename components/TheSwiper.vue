<script setup>
import { slidesData } from "~/utils/slides-data";

const currentIndex = ref(0);
const isMobile = ref(false);

const checkIsMobile = () => {
  isMobile.value = window.innerWidth < 768;
};

const prevSlide = () => {
  currentIndex.value =
    (currentIndex.value - 1 + slidesData.length) % slidesData.length;
};

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % slidesData.length;
};

onMounted(() => {
  checkIsMobile();
  window.addEventListener("resize", checkIsMobile);
});
</script>

<template>
  <div class="slider">
    <div class="slider-container">
      <div
        class="slide"
        v-for="(slide, index) in slidesData"
        :key="index"
        :class="{ active: index === currentIndex }"
        :style="isMobile ? { backgroundImage: `url(${slide.img})` } : {}"
      >
        <div class="slide-content">
          <h2>{{ slide.title }}</h2>
          <p>{{ slide.content }}</p>
        </div>
        <div class="slide-image" v-if="!isMobile">
          <NuxtImg :src="slide.img" alt="Slide image" />
        </div>
      </div>
    </div>
    <button class="nav-button prev" @click="prevSlide">&gt;</button>
    <button class="nav-button next" @click="nextSlide">&lt;</button>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.slider {
  position: relative;
  width: 100%;
  overflow: hidden;
  margin-top: 40px;
  border: 1px solid $gray-100;
  padding: 20px 0;

  @media (max-width: 767px) {
    padding: 0;
  }

  .slider-container {
    display: flex;
    transition: transform 0.5s ease;
    width: 100%;
    height: 250px;

    .slide {
      display: flex;
      flex-direction: row-reverse;
      justify-content: space-around;
      flex-shrink: 0;
      width: 100%;
      opacity: 0;
      transition: opacity 0.5s ease;
      position: absolute;
      background-size: cover;
      background-position: center;

      @media (max-width: 767px) {
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: white;
        text-align: center;
        background-color: rgba(0, 0, 0, 0.5);

        &::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.6);
          z-index: 0;
        }
      }

      .slide-content {
        width: 50%;
        box-sizing: border-box;
        z-index: 1;

        @media (max-width: 767px) {
          width: 70%;
          z-index: 1;
        }
      }

      .slide-image {
        width: 30%;
        display: flex;
        align-items: center;
        justify-content: center;

        @media (max-width: 767px) {
          display: none;
        }
      }

      .slide-image img {
        width: 100%;
        height: auto;
        object-fit: contain;
      }
    }

    .slide.active {
      opacity: 1;
      position: relative;
    }
  }

  .nav-button {
    position: absolute;
    font-size: 20px;
    top: 50%;
    transform: translateY(-50%);
    color: $blue-200;
    border: none;
    padding: 10px;
    cursor: pointer;
    z-index: 4;
    background: none;

    &:hover {
      background-color: $blue;
      border-radius: 50%;
      color: $white;
      padding: 5px 10px;
    }
  }

  .nav-button.prev {
    left: 10px;
  }

  .nav-button.next {
    right: 10px;
  }
}
</style>
