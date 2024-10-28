<script setup>
import { useAuthStore } from "@/stores/useAuthStore";
import SuccessRequestWindow from "@/components/modals/SuccessWindow";
import { FORM_VALIDATION_PATTERNS } from "@/utils/constants";
import Compressor from "compressorjs";

const props = defineProps({
  eventId: {
    type: String,
    required: false,
    default: "",
  },
});

const authManager = useAuthStore();

const showSuccessWindow = ref(false);
const successData = props.eventId
  ? {
      header: "Your event updated successfully!",
    }
  : {
      header: "Your event created successfully!",
    };

const formButtonClicked = ref(false);
const imageFile = ref(null);

const eventData = ref({
  event_title: "",
  event_description: "",
  location: "",
  event_page: "",
  event_date: "",
  event_time: "",
  phone: "",
  email: "",
  event_image_url: "",
  event_image_blob: "",
  approved: "",
});

const validationRules = {
  event_title: "COMMON_NOT_EMPTY_PATTERN",
  event_description: "COMMON_NOT_EMPTY_PATTERN",
  location: "COMMON_NOT_EMPTY_PATTERN",
  event_page: "URL_PATTERN",
  event_date: "COMMON_NOT_EMPTY_PATTERN",
  phone: "PHONE_PATTERN",
  email: "EMAIL_PATTERN",
  event_time: "TIME_PATTERN",
};

async function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

async function handleImageUpload(event) {
  imageFile.value = event.target.files[0];
  if (imageFile.value) {
    try {
      new Compressor(imageFile.value, {
        quality: 0.8,
        maxWidth: 800,
        maxHeight: 400,
        success(compressedResult) {
          fileToBase64(compressedResult).then((base64String) => {
            eventData.value.event_image_blob = base64String;
          });
        },
        error(err) {
          console.error("Error compressing image:", err);
        },
      });
    } catch (error) {
      console.error("Error converting image to base64:", error);
    }
  }
}

async function getSingleEventData() {
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
        phone: singleEvent.value.phone,
        email: singleEvent.value.email,
        event_image_url: singleEvent.value.event_image_url,
        event_image_blob: singleEvent.value.event_image_blob || "", // загружаем изображение как base64
      };
    } else if (error.value) {
      console.log("something went wrong:", error.value);
    }
  }
}

function getErrorMessage(field) {
  const errorMessages = {
    event_title: "Invalid title.",
    event_description: "Invalid description.",
    location: "Invalid location.",
    event_page: "Invalid URL.",
    event_date: "Invalid date.",
    phone: "Invalid phone number.",
    email: "Invalid email.",
    event_time: "Invalid time format.",
  };
  return errorMessages[field] || "Invalid input.";
}

function getPlaceholder(field) {
  const placeholders = {
    event_title: "Event title *",
    event_description: "Event description *",
    location: "Event location *",
    event_page: "Event URL *",
    event_date: "Event date*",
    phone: "Your phone number",
    email: "Your email",
    event_time: "Event time (10:00, 18:15 etc.) *",
    event_image_url: "Image url",
    event_image_blob: "Event image",
  };
  return placeholders[field] || "Enter value *";
}

const isFieldValid = (field) => {
  const patternKey = validationRules[field];
  const pattern = FORM_VALIDATION_PATTERNS[patternKey];
  const fieldValue = eventData.value[field];

  return pattern ? pattern.test(fieldValue) : false;
};

const isFormValid = computed(() => {
  return Object.keys(validationRules).every((field) => isFieldValid(field));
});

async function createEvent() {
  formButtonClicked.value = true;
  eventData.value.approved = authManager.loggedIn;

  if (isFormValid.value) {
    console.log("Size of image blob:", eventData.value.event_image_blob.length);
    if (!imageFile.value) {
      eventData.value.event_image_blob = "";
    }

    try {
      console.log(eventData.value);
      const { data: newEventRequest, error } = await useFetch(
        `${API_URL}create-event`,
        {
          method: "POST",
          body: JSON.stringify(eventData.value),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (newEventRequest.value) {
        eventData.value = {};
        formButtonClicked.value = false;
        showSuccessWindow.value = true;
      } else if (error.value) {
        console.log("something went wrong:", error.value);
      }
    } catch (err) {
      console.error("Error creating event:", err);
    }
  }
}

function hideSuccessWindow() {
  showSuccessWindow.value = false;
}

onMounted(() => {
  if (props.eventId) {
    getSingleEventData();
  }
});
</script>

<template>
  <div class="event-form-wrapper">
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
          >
            {{ getErrorMessage(field) }}
          </span>
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

        <div>
          <input type="file" @change="handleImageUpload" accept="image/*" />

          <div v-if="eventData.event_image_blob">
            <img
              :src="eventData.event_image_blob"
              alt="Event Image"
              style="max-width: 200px"
            />
          </div>
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

.event-form-wrapper {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .event-form {
    margin: 30px auto 60px auto;
    background-color: $white;
    padding: 20px 40px 10px 40px;
    border: 2px solid $gray-100;
    border-radius: 15px;
    text-align: center;
    width: 50%;

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
          height: 22px;
          font-weight: 500;
          overflow-wrap: break-word;
        }
      }
    }

    .event-form-content {
      padding-top: 10px;

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
