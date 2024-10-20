<script setup>
const props = defineProps({
  eventId: {
    type: String,
    required: false,
    default: "",
  },
});

onMounted(() => {
  if (props.eventId) {
    getSingleEventData();
  }
});

import { useAuthStore } from "@/stores/useAuthStore";
const authManager = useAuthStore();

import { FORM_VALIDATION_PATTERNS } from "@/utils/constants";
import SuccessRequestWindow from "@/components/modals/SuccessWindow";

const showSuccessWindow = ref(false);
const successData = props.eventId
  ? {
      header: "Your event updated successfully!",
    }
  : {
      header: "Your event created successfully!",
    };

async function getSingleEventData() {
  console.log(props.eventId);

  if (props.eventId) {
    const { data: singleEvent, error } = await useFetch(
      `${API_URL}single-event/${props.eventId}`
    );

    if (singleEvent.value) {
      eventData.value = {
        event_title: singleEvent.value.event_title,
        event_description: singleEvent.value.event_description,
        location: singleEvent.value.location,
        event_page: singleEvent.value.event_page,
        event_date: singleEvent.value.event_date,
        event_time: singleEvent.value.event_time,
        event_image_url: singleEvent.value.event_image_url,
      };
    } else if (error.value) {
      // should to think how better to show errors
      console.log("something wrong:" + error.value);
    }
  }
}

function getErrorMessage(field) {
  const errorMessages = {
    event_title: "Enter valid event title.",
    event_description: "Enter valid event description.",
    location: "Enter valid event location.",
    event_page: "Enter valid URL address.",
    event_date: "הזן תאריך אירוע תקין.",
    event_time: "Enter valid event time. Format: 10:00 or 18:15.",
  };
  return errorMessages[field] || "Invalid input.";
}

function getPlaceholder(field) {
  const placeholders = {
    event_title: "Event title *",
    event_description: "Event description *",
    location: "Event location *",
    event_page: "Event URL *",
    event_date: "תאריך האירוע *",
    event_time: "Event time (10:00, 18:15 etc.) *",
    event_image_url: "Event image URL",
  };
  return placeholders[field] || "Enter value *";
}

const formButtonClicked = ref(false);

const eventData = ref({
  event_title: "",
  event_description: "",
  location: "",
  event_page: "",
  event_date: "",
  event_time: "",
  event_image_url: "",
  approved: "",
});

const validationRules = {
  event_title: "COMMON_NOT_EMPTY_PATTERN",
  event_description: "COMMON_NOT_EMPTY_PATTERN",
  location: "COMMON_NOT_EMPTY_PATTERN",
  event_page: "URL_PATTERN",
  event_date: "COMMON_NOT_EMPTY_PATTERN",
  event_time: "TIME_PATTERN",
};

const isFieldValid = (field) => {
  const patternKey = validationRules[field];
  const pattern = FORM_VALIDATION_PATTERNS[patternKey];

  if (!pattern) {
    console.error(`Validation pattern not found for field: ${field}`);
    return false;
  }

  const fieldValue = eventData.value[field];

  if (!fieldValue) {
    return false;
  }

  return pattern.test(fieldValue);
};

const isFormValid = computed(() => {
  return Object.keys(validationRules).every((field) => isFieldValid(field));
});

async function createEvent() {
  formButtonClicked.value = true;

  eventData.value.approved = authManager.loggedIn;

  if (isFormValid.value) {
    const { data: newEventrequest, error } = await useFetch(
      `${API_URL}create-event`,
      {
        method: "post",
        body: JSON.stringify(eventData.value),
      }
    );

    if (newEventrequest.value) {
      eventData.value = {};
      formButtonClicked.value = false;
      showSuccessWindow.value = true;
    } else if (error.value) {
      // should to think how better to show errors
      console.log("something wrong:" + error.value);
    }
  }
}

function hideSuccessWindow() {
  showSuccessWindow.value = false;
}
</script>

<template>
  <div class="content-wrapper">
    <div class="event-form" v-if="!showSuccessWindow">
      <div class="form-title">
        <h1 v-if="props.eventId">
          Edit event: <span>{{ eventData.event_title }}</span>
        </h1>
        <h1 v-else>Create event</h1>
      </div>

      <div class="event-form-content">
        <div v-for="field in Object.keys(validationRules)" :key="field">
          <span
            v-if="!isFieldValid(field) && formButtonClicked"
            class="input-error-notification"
            >{{ getErrorMessage(field) }}</span
          >
          <template v-if="field === 'event_description'">
            <textarea
              v-model="eventData[field]"
              :placeholder="getPlaceholder(field)"
              rows="5"
              class="textarea-input"
            ></textarea>
          </template>
          <template v-else>
            <input
              v-model="eventData[field]"
              :type="field === 'event_date' ? 'date' : 'text'"
              :placeholder="getPlaceholder(field)"
              :class="
                field === 'event_date' || field === 'event_time'
                  ? 'date-input'
                  : ''
              "
            />
          </template>
        </div>

        <div>
          <input
            v-model="eventData.event_image_url"
            type="text"
            :placeholder="getPlaceholder('event_image_url')"
            class="image-url-input"
          />
        </div>

        <button class="xl-green-btn" @click.prevent="createEvent">
          {{ props.eventId ? "Update event" : "Create event" }}
        </button>
      </div>
    </div>

    <SuccessRequestWindow
      v-else
      @hide-success-window="hideSuccessWindow"
      :data="successData"
    />
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.content-wrapper {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .event-form {
    margin: 60px 0;
    background-color: $white;
    padding: 20px 40px 10px 40px;
    border: 2px solid $gray-100;
    border-radius: 15px;
    text-align: center;
    width: 400px;

    @media (max-width: 768px) {
      margin: 80px auto;
      padding: 10px 30px 10px 30px;
      width: 65%;
    }

    @media (max-width: 460px) {
      width: 85%;
    }

    .form-title {
      h1 {
        font-size: 30px;
        line-height: 0;
        margin: 10px auto;
        font-weight: 300;

        @media (max-width: 768px) {
          font-size: 24px;
          margin: 20px auto 10px auto;
        }

        @media (max-width: 382px) {
          font-size: 22px;
        }

        span {
          font-weight: 500;
        }
      }
    }

    .event-form-content {
      padding-top: 30px;

      input,
      select,
      textarea {
        margin-bottom: 12px;
      }

      input {
        @media (max-width: 768px) {
          &::placeholder {
            font-size: 14px;
          }
        }
      }

      .input-error-notification {
        float: left;
      }
    }

    button {
      width: 100%;
      margin: 20px auto 20px auto;
    }

    .confirm-information {
      img {
        width: 60px;
        margin-top: 25px;
      }
    }
  }
}
</style>
