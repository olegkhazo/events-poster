<script setup>
const props = defineProps({
  singleDataEvents: Object,
});
</script>

<template>
  <div class="event-list">
    <div
      v-for="event in props.singleDataEvents"
      :key="event"
      class="single-event"
    >
      <div class="event-img">
        <NuxtImg :src="event.img" alt="event img" />
      </div>
      <div class="event-description">
        <span class="time">
          <NuxtImg src="/images/clock.png" alt="clock" /> {{ event.time }}</span
        >
        <span class="title">{{ event.event }}</span>

        <span class="description">{{ event.description }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.event-list {
  .single-event {
    display: flex;
    border-bottom: 1px solid $gray-150;
    padding: 20px;

    @media (max-width: 768px) {
      padding: 20px 0;
    }

    .event-img {
      max-width: 150px;

      @media (max-width: 768px) {
        max-width: 120px;
      }

      img {
        width: 100%;
        height: auto;
      }
    }

    .event-description {
      margin-right: 20px;

      span {
        display: block;
      }

      .time {
        color: $blue-200;
        font-weight: 300;

        @media (max-width: 768px) {
          font-size: 8px;
        }

        img {
          width: 10px;

          @media (max-width: 768px) {
            width: 8px;
          }
        }
      }

      .title {
        font-size: 16px;
        font-weight: 600;

        @media (max-width: 768px) {
          font-size: 14px;
          font-weight: 500;
        }
      }

      .description {
        margin-top: 10px;
        font-size: 12px;

        @media (max-width: 768px) {
          font-size: 10px;
          font-weight: 300;
        }
      }
    }
  }
}
</style>
