<script setup>
definePageMeta({
  layout: "admin-panel",
});

import { useAuthStore } from "@/stores/useAuthStore";
const authManager = useAuthStore();
const { userInfo } = storeToRefs(authManager);

const dataGeted = ref(false);
const isLoading = ref(true);

//fetching all requests
const { data: allEvents, error } = await useFetch(`${API_URL}all-events`);

onMounted(() => {
  if (userInfo.value.role !== "admin") {
    navigateTo("my-requests");
  }

  if (allEvents.value) {
    dataGeted.value = true;
  } else if (error.value) {
    // should to think how better to show errors
    console.error("something wrong:" + error.value);
  }

  isLoading.value = false;
});

async function deleteEvent(id) {
  console.log(id);
  const { data: deleteEvent, error } = await useFetch(
    `${API_URL}delete-event/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!error.value) {
    allEvents.value = allEvents.value.filter((event) => event._id !== id);
  } else {
    console.log("Error deleting user:", error.value);
  }
}
</script>

<template>
  <div class="admin-content-wrapper">
    <h1>All Events</h1>

    <div v-if="isLoading" class="loading-state">
      <p>Loading suggestions...</p>
    </div>

    <table v-else-if="dataGeted && !isLoading">
      <thead>
        <tr>
          <th>Title</th>
          <th>Location</th>
          <th>Description</th>
          <th>Event Page</th>
          <th>Date</th>
          <th>Time</th>
          <th>Approved</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="single-request-row"
          v-for="event in allEvents"
          id="tbody"
          :key="event._id"
        >
          <td>{{ event.event_title }}</td>
          <td>{{ event.location }}</td>
          <td>{{ event.event_description }}</td>
          <td>
            <NuxtLink :to="event.event_page" target="blank">{{
              event.event_page
            }}</NuxtLink>
          </td>
          <td>{{ event.event_date }}</td>
          <td>{{ event.event_time }}</td>
          <td>
            <span v-if="event.approved" class="approved-status">Yes</span>
            <span v-else class="unapproved-status">No</span>
          </td>
          <td class="action">
            <div class="action-buttons-wrapper">
              <NuxtImg
                src="/images/pencil.svg"
                @click="approveEvent(event._id)"
                alt="approve"
              />

              <NuxtImg
                src="/images/trash.svg"
                @click="deleteEvent(event._id)"
                alt="approve"
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-else class="no-db-entries-block">
      <p>It seems you haven't any unapproved events yet</p>
      <NuxtLink to="/admin-panel/all-events" class="yellow-btn"
        >Check all events</NuxtLink
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.admin-content-wrapper {
  width: 100%;
  padding: 0 10px;
  display: flex;
  flex-direction: column;

  @media (max-width: 834px) {
    margin: 20px 0 150px 0;
  }

  h1 {
    font-size: 30px;
    font-weight: 500;

    @media (max-width: 834px) {
      font-size: 25px;
    }

    @media (max-width: 382px) {
      font-size: 22px;
    }
  }

  .no-db-entries-block {
    text-align: center;
    margin-top: 20vh;

    p {
      font-weight: 300;
      font-size: 22px;
    }
  }

  table {
    width: inherit;
    border-collapse: collapse;

    thead {
      background-color: $gray-850;

      tr:first-child th:first-child {
        border-top-right-radius: 5px;
      }

      tr:first-child th:last-child {
        border-top-left-radius: 5px;
      }

      th {
        color: white;
        padding: 5px;
        background-color: $gray-850;
        text-align: left;
      }
    }

    tbody {
      background-color: $white;
      tr {
        td {
          padding: 5px;
          border: 1px solid $gray-850;

          a {
            color: $blue-100;
            font-weight: 300;
          }
        }

        .action {
          padding: 8px;

          .action-buttons-wrapper {
            display: flex;
            justify-content: space-between;

            img {
              width: 18px;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
</style>
