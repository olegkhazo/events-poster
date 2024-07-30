<script setup>
const props = defineProps({
  singleEventData: Object,
});
</script>

<template>
  <div class="single-event">
    <NuxtLink
      :to="'/event-page/' + props.singleEventData.Position"
      class="single-event-link"
    >
      <div class="event-img">
        <NuxtImg
          v-if="props.singleEventData.image"
          :src="props.singleEventData.image"
          :alt="props.singleEventData.eventAltText"
        />
        <NuxtImg
          v-else
          src="https://www.jsconsulting.kz/assets/img/noImg.jpg"
          alt="image"
        />
      </div>
      <div class="event-description">
        <span v-if="props.singleEventData.eventDate" class="date">{{
          props.singleEventData.eventDate
        }}</span>
        <span v-if="props.singleEventData.eventTime" class="time">
          <NuxtImg src="/images/clock.png" alt="clock" />
          {{ props.singleEventData.eventTime }}
        </span>
        <span v-if="props.singleEventData.location" class="location">{{
          props.singleEventData.location
        }}</span>
        <span v-if="props.singleEventData.eventTitle" class="title">
          {{ props.singleEventData.eventTitle }}
        </span>
      </div>
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.single-event {
  width: 250px;
  border: 1px solid $gray-100;
  padding-bottom: 25px;
  cursor: pointer;

  &:hover {
    background-color: $blue-300;
  }

  @media (max-width: 768px) {
    width: 100%;
    background-color: $blue-300;
    border: none;
    padding-bottom: 0;
    margin-bottom: 0;
    border-bottom: 1px solid $gray-150;
    padding: 20px;
    padding: 20px 0;
  }

  .single-event-link {
    display: flex;
    flex-direction: column;
    width: 100%;

    @media (max-width: 768px) {
      flex-direction: row;
    }

    .event-img {
      max-width: 100%;

      @media (max-width: 768px) {
        max-width: 150px;
        margin-right: 20px;
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

      .date {
        color: $blue-200;
        font-weight: 500;

        @media (max-width: 768px) {
          font-size: 8px;
        }
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

      .location {
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
