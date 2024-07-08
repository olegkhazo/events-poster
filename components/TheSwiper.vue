<script setup>
import { slidesData } from "~/utils/slides-data";

const currentIndex = ref(0);

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + slidesData.length) % slidesData.length;
};

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % slidesData.length;
};
</script>

<template>
  <div class="slider">
    <div class="slider-container">
      <div class="slide" v-for="(slide, index) in slidesData" :key="index" :class="{ active: index === currentIndex }">
        <div class="slide-content">
          <p>{{ slide.content }}</p>
        </div>
        <div class="slide-image">
          <img :src="slide.img" alt="Slide image" />
        </div>
      </div>
    </div>
    <button class="nav-button prev" @click="prevSlide">&gt;</button>
    <button class="nav-button next" @click="nextSlide">&lt;</button>
  </div>
</template>

<style scoped>
.slider {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.slider-container {
  display: flex;
  transition: transform 0.5s ease;
  transform: translateX(-100%);
  width: 100%;
}

.slide {
  display: flex;
  flex-shrink: 0;
  width: 100%;
  height: 100vh; /* Ensure it takes full height of the viewport */
  transition: opacity 0.5s ease;
  opacity: 0;
  position: absolute; /* Overlay slides */
}

.slide.active {
  opacity: 1;
  position: relative; /* Show the active slide */
}

.slide-content {
  width: 60%;
  padding: 20px;
  box-sizing: border-box;
}

.slide-image {
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
}

.slide-image img {
  max-width: 100%;
  height: auto;
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 10;
}

.nav-button.prev {
  left: 10px;
}

.nav-button.next {
  right: 10px;
}
</style>
