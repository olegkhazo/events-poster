<script setup>
const props = defineProps({
  singleDataEvents: Object,
});

import { useCurrentEventStore } from "~/stores/currentEventStore";
const { currentEvent } = storeToRefs(useCurrentEventStore());

function recordEventToStore(event) {
  currentEvent.value = event;

  // Get the site from which we will get data for the event additional page
  if (currentEvent.value.event_page.includes("mishkan-ashdod")) {
    currentEvent.value.site_donor = "mishkanAshdod";
  } else if (currentEvent.value.event_page.includes("mevalim")) {
    currentEvent.value.site_donor = "mevalim";
  } else if (currentEvent.value.event_page.includes("smarticket")) {
    currentEvent.value.site_donor = "smarticket";
  } else {
    currentEvent.value.site_donor = "custom-event";
  }
}
</script>

<template>
  <div class="event-list">
    <div
      v-for="event in props.singleDataEvents"
      :key="event"
      class="single-event"
    >
      <div class="single-event-wrapper">
        <!--<div class="event-img">
          <img
            v-if="
              event.event_image_blob ||
              (event.event_image_url &&
                !event.event_image_url.includes('no_pic.png'))
            "
            :src="event.event_image_blob || event.event_image_url"
            :alt="event.eventAltText"
          />
          <img
            v-else
            src="/images/about-us-block/openair.png"
            alt="Fallback Image"
          />
        </div>-->
        
        <div class="event-data">
          <div v-if="event.event_title" class="data-point data-point-title">
            {{ event.event_title }}
          </div>
          <div v-if="event.event_date" class="data-point">
            <div class="data-img">
              <img src="/images/event-card/calendar.svg" alt="calendar" />
            </div>
            <span class="point-text">
              {{ event.event_date }}
            </span>
          </div>

          <div v-if="event.event_time" class="data-point">
            <div class="data-img">
              <img src="/images/event-card/clock.svg" alt="clock" />
            </div>
            <span class="point-text">
              {{ event.event_time }}
            </span>
          </div>

          <div v-if="event.location" class="data-point">
            <div class="data-img">
              <img src="/images/event-card/geo.svg" alt="geo" />
            </div>
            <span class="point-text">
              {{ event.location }}
            </span>
          </div>

          
        </div>
      </div>
      <div class="btn-wrapper">
        <NuxtLink :to="event.event_page" class="purple-button" target="_blank"
          >לרכישה</NuxtLink
        >

        <NuxtLink
          @click="recordEventToStore(event)"
          :to="'/event-page/' + event._id"
          class="white-button"
          >מידע נוסף</NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.event-list {
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin: 60px auto;
  flex-wrap: wrap;

  @media (max-width: 1080px) {
    margin: 30px auto;
    flex-direction: column;
  }

  .single-event {
    width: 30%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 40px;
    border: #e5d7f3;
    border-style: groove;
    border-radius: 2%;
    padding: 10px;
    border-width: 3px;
    //text-align: center;

    @media (max-width: 1080px) {
      width: 90%;
      margin: 20px auto;
    }

    .single-event-wrapper {
      display: flex;

      .event-img {
        img {
          width: 200px;
          height: 200px;
          border-radius: 10px;
        }
      }
      .data-point-title{
        font-weight: 600;
      }
      .event-data {
        margin-right: 20px;
        display: flex;
        flex-direction: column;

        .data-point {
          display: flex;
          align-items: flex-start;

          &:not(:first-child) {
            margin-top: 10px;
          }

          .data-img {
            display: flex;
            width: 16px;

            img {
              width: 16px;
            }
          }

          .point-text {
            margin-right: 10px;
            font-size: 20px;
            //font-weight: 600;

            @media (max-width: 1220px) {
              font-size: 15px;
            }

            @media (max-width: 394px) {
              font-size: 15px;
            }
          }
        }
      }
    }
  }

  .btn-wrapper {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;

    @media (max-width: 1080px) {
      justify-content: center;
    }

    @media (max-width: 394px) {
      justify-content: space-between;
    }

    .purple-button,
    .white-button {
      width: 48%;
      font-weight: 500;
      font-size: 18px;
      padding: 8px 0;
      cursor: pointer;
      border-radius: 100px;
      text-align: center;

      @media (max-width: 1440px) {
        padding: 10px 0;
      }

      @media (max-width: 1080px) {
        width: auto;
        padding: 10px 55px;
      }

      @media (max-width: 394px) {
        padding: 12px 0;
        width: 48%;
      }
    }

    .purple-button {
      background: linear-gradient(90deg, $blue 0%, $purple 100%);
      border: none;
      color: $white;
      transition: transform 0.2s;
    }

    .white-button {
      background: $white;
      margin-right: 10px;
      border: 1px solid $black-1000;
      color: $black-1000;
      transition: transform 0.2s;
    }
  }
}
</style>
