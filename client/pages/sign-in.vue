<script setup>
useHead({
  title: "Pickevent - Sign in",
  meta: [
    {
      name: "Sign-in page",
      content: "Pickevent sign-in page",
    },
  ],
});

import { validateFormField } from "@/utils/index";
import { useAuthStore } from "~/stores/useAuthStore";

const authManager = useAuthStore();
const formButtonClicked = ref(false);

const backendErrors = ref({
  email: "",
  password: "",
  general: "",
});

const signInCreds = ref({
  email: "",
  password: "",
});

const isEmailValid = computed(() => {
  return validateFormField(signInCreds.value.email, "EMAIL_PATTERN");
});

const isPasswordValid = computed(() => {
  return validateFormField(signInCreds.value.password, "PASSWORD_PATTERN");
});

async function signIn() {
  formButtonClicked.value = true;
  backendErrors.value = { email: "", password: "", general: "" };

  if (isEmailValid.value && isPasswordValid.value) {
    const loginResponse = await authManager.login(signInCreds.value);

    if (loginResponse && loginResponse.success) {
      console.log("Log in successfull, creds:" + signInCreds.value);
      navigateTo("/");
    } else {
      backendErrors.value.general = "הכניסה נכשלה. אנא בדוק את האישורים שלך.";
      console.error("Login error:", loginResponse.error);
    }
  }
}
</script>

<template>
  <div class="content-wrapper">
    <div class="form-wrapper">
      <h1>התחבר</h1>
      <div class="sign-in-field-section">
        <span
          v-if="!isEmailValid && formButtonClicked"
          class="input-error-notification"
        >
          נא להזין כתובת אימייל חוקית.
        </span>
        <span v-if="backendErrors.email" class="input-error-notification">
          {{ backendErrors.email }}
        </span>
        <input
          id="email"
          v-model="signInCreds.email"
          type="email"
          name="email"
          placeholder="כתובת אימייל *"
        />

        <span
          v-if="!isPasswordValid && formButtonClicked"
          class="input-error-notification"
        >
          נא להזין סיסמה חוקית.
        </span>
        <span v-if="backendErrors.password" class="input-error-notification">
          {{ backendErrors.password }}
        </span>
        <input
          id="password"
          v-model="signInCreds.password"
          type="password"
          name="password"
          placeholder="סִיסמָה *"
        />
        <span v-if="backendErrors.general" class="input-error-notification">
          {{ backendErrors.general }}
        </span>

        <button class="xl-green-btn" @click="signIn">היכנס</button>
      </div>
      <p>
        אין לך חשבון "Pickevent"?
        <NuxtLink to="/sign-up">הירשם</NuxtLink>
      </p>
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

    .sign-in-field-section {
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
}
</style>
