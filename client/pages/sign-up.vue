<script setup>
useHead({
  title: "Pickevent - event service registration",
  meta: [
    {
      name: "Event service registration",
      content: "Registration on pickevent, all type of events in one place",
    },
  ],
});

import { API_URL } from "@/utils/constants";
import { validateFormField } from "@/utils/index";

const formButtonClicked = ref(false);
const userCredentialsSentSuccessful = ref(false);

const userCreds = ref({
  first_name: "",
  last_name: "",
  email: "",
  password: "",
});

// VALIDATION
const isFirstNameValid = computed(() => {
  return validateFormField(
    userCreds.value.first_name,
    "COMMON_NOT_EMPTY_PATTERN"
  );
});

const isLastNameValid = computed(() => {
  return validateFormField(
    userCreds.value.last_name,
    "COMMON_NOT_EMPTY_PATTERN"
  );
});

const isEmailValid = computed(() => {
  return validateFormField(userCreds.value.email, "EMAIL_PATTERN");
});

const isPasswordValid = computed(() => {
  return validateFormField(userCreds.value.password, "PASSWORD_PATTERN");
});

function registerUser() {
  formButtonClicked.value = true;
  if (isFirstNameValid.value && isEmailValid.value && isPasswordValid.value) {
    createRequestToRegistrationApi();
  }
}

async function createRequestToRegistrationApi() {
  const { data: newUserCreating, error } = await useFetch(`${API_URL}sign-up`, {
    method: "post",
    body: JSON.stringify(userCreds.value),
  });

  if (newUserCreating.value) {
    console.log("Sign-up went successfully");
    userCredentialsSentSuccessful.value = true;
  } else if (error.value) {
    // should to think how better to show errors
    console.log("something really wrong:" + error.value);
  }
}
</script>

<template>
  <div class="content-wrapper">
    <div class="form-wrapper">
      <h1>הירשם</h1>

      <div
        v-if="!userCredentialsSentSuccessful"
        class="registration-form-fields-section"
      >
        <span
          v-if="!isFirstNameValid && formButtonClicked"
          class="input-error-notification"
          >נא להזין שם חוקי.</span
        >
        <input
          id="first-name"
          v-model="userCreds.first_name"
          type="text"
          placeholder="שֵׁם *"
        />

        <span
          v-if="!isLastNameValid && formButtonClicked"
          class="input-error-notification"
          >נא להזין שם משפחה חוקי.</span
        >
        <input
          id="last-name"
          v-model="userCreds.last_name"
          type="text"
          placeholder="שֵׁם מִשׁפָּחָה *"
        />

        <span
          v-if="!isEmailValid && formButtonClicked"
          class="input-error-notification"
        >
          נא להזין כתובת אימייל חוקית.
        </span>
        <input
          id="email"
          v-model="userCreds.email"
          type="email"
          name="email"
          placeholder="אֶלֶקטרוֹנִי *"
        />

        <span
          v-if="!isPasswordValid && formButtonClicked"
          class="input-error-notification"
        >
          נא להזין סיסמה חוקית.
        </span>
        <input
          id="password"
          v-model="userCreds.password"
          type="password"
          name="password"
          placeholder="סיסמה (8 תווים או יותר) *"
        />

        <button class="blue-btn" @click="registerUser()">
          צור את החשבון שלי
        </button>
        <p>כבר יש לך חשבון? <NuxtLink to="/sign-in">התחבר</NuxtLink></p>
      </div>

      <div v-else class="confirm-information">
        <NuxtImg
          src="https://i.ibb.co/6HY86R7/checkmark.png"
          title="green-checkmark"
        />
        <h3>מזל טוב, יצרת חשבון.</h3>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.content-wrapper {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .form-wrapper {
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
    }

    .registration-form-fields-section {
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
      margin: 10px auto 0 auto;
    }

    .confirm-information {
      img {
        width: 60px;
        margin-top: 25px;
      }
    }
  }

  p {
    margin-top: 20px;

    @media (max-width: 768px) {
      margin-top: 20px;
    }
    a {
      text-decoration: none;
      color: $blue;
      font-weight: 600;
    }
  }
}
</style>
