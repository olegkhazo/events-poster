<script setup>
const subscribeData = ref({
  name: "",
  phone: "",
  email: "",
});

const config = useRuntimeConfig();
const API_URL = config.public.API_URL;

const formButtonClicked = ref(false);

async function sendSubscribeData() {
  formButtonClicked.value = true;

  try {
    const { data: newSubscribeRequest, error } = await useFetch(
      `${API_URL}/create-subscribe`,
      {
        method: "POST",
        body: JSON.stringify(subscribeData.value),
        headers: { "Content-Type": "application/json" },
      }
    );

    if (newSubscribeRequest.value) {
      subscribeData.value = {};
      formButtonClicked.value = false;
    } else if (error.value) {
      console.log("something went wrong:", error.value);
    }
  } catch (err) {
    console.error("Error creating event:", err);
  }
}
</script>

<template>
  <footer>
    <div class="content-wrapper">
      <div class="main-footer-content">
        <div class="logo-social">
          <NuxtLink class="footer-logo" to="/">
            <NuxtImg src="/images/logo.svg" />
          </NuxtLink>
          <p>
            נסחו את המשימה והבינו איזה סוג אירוע תרצו לארגן, לכמה אנשים, האם יש
            לכם מגבלות תקציב, האם יש מדדי KPI ברורים, באיזו עיר יתקיים האירוע.
            החלט על המשימה העיקרית, זה יעזור לך בחיפוש שלך ויקל על תקשורת נוספת.
          </p>
          <div class="social-icons">
            <NuxtImg src="/images/whatsapp.png" />
            <NuxtImg src="/images/instagram.png" />
            <NuxtImg src="/images/facebook.png" />
          </div>
        </div>

        <div class="contacts">
          <p>צור קשר</p>
          <NuxtLink type="email"
            ><NuxtImg src="/images/envelope.svg" />האימייל שלנו
          </NuxtLink>
          <NuxtLink type="phone">
            <NuxtImg src="/images/phone.svg" />הטלפון שלנו</NuxtLink
          >
        </div>

        <div class="mobile-social-icons">
          <NuxtImg src="/images/whatsapp.png" />
          <NuxtImg src="/images/instagram.png" />
          <NuxtImg src="/images/facebook.png" />
        </div>

        <div class="subscribe-form">
          <p>הירשם לניוזלטר שלנו</p>
          <input
            v-model="subscribeData.name"
            type="text"
            placeholder="השם שלך"
          />
          <input
            v-model="subscribeData.phone"
            type="text"
            placeholder="הטלפון שלך"
          />
          <input
            v-model="subscribeData.email"
            type="text"
            placeholder="כתובת המייל שלך"
          />

          <NuxtLink
            class="subscribe-button"
            to="/create-event"
            @click="sendSubscribeData"
          >
            <NuxtImg src="/images/btn-envelope.svg" /> לשיר למעלה
          </NuxtLink>
        </div>
      </div>
      <div class="site-rights">
        <span> Pickevent </span>
        <span> © 2024 "אירועי ישראל" כל הזכויות שמורות. </span>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

footer {
  background-color: $black-1000;

  .content-wrapper {
    display: flex;
    flex-direction: column;
    color: $white;
    padding: 155px 0 55px 0;

    @media (max-width: 768px) {
      padding: 40px 0;
    }

    .main-footer-content {
      display: flex;
      justify-content: space-between;

      @media (max-width: 768px) {
        flex-direction: column;
      }

      .logo-social {
        width: 35%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        @media (max-width: 768px) {
          width: 100%;
        }

        .footer-logo {
          img {
            width: 155px;
          }
        }

        p {
          margin-bottom: 40px;

          @media (max-width: 768px) {
            margin-bottom: 20px;
            text-align: center;
          }
        }

        .social-icons {
          margin-top: 70px;

          @media (max-width: 768px) {
            display: none;
          }

          img {
            width: 30px;
            height: 30px;

            &:not(:first-child) {
              margin-right: 15px;
            }
          }
        }
      }

      .contacts {
        width: 30%;

        @media (max-width: 1024px) {
          width: 20%;
        }

        @media (max-width: 768px) {
          width: 30%;
          margin: 0 auto;
        }

        @media (max-width: 605px) {
          width: 37%;
          margin: 0 auto;
        }

        @media (max-width: 505px) {
          width: 50%;
          margin: 0 auto;
        }

        @media (max-width: 375px) {
          width: 55%;
          margin: 0 auto;
        }

        p {
          font-size: 24px;
          margin: 10px;
          margin-right: 0;
        }

        a {
          display: block;

          &:not(:first-child) {
            margin-top: 20px;
          }

          img {
            margin-left: 15px;
          }
        }
      }

      .mobile-social-icons {
        display: none;
        margin: 20px auto;

        @media (max-width: 768px) {
          display: block;
        }

        img {
          width: 55px;
          height: 55px;

          &:not(:first-child) {
            margin-right: 15px;
          }
        }
      }

      .subscribe-form {
        width: 25%;
        display: flex;
        flex-direction: column;

        @media (max-width: 1024px) {
          width: 35%;
        }

        @media (max-width: 768px) {
          width: 100%;
        }

        p {
          margin: 10px auto;
          font-size: 24px;

          @media (max-width: 768px) {
            font-size: 20px;
          }
        }

        input {
          border-radius: 100px;
          border: 1px solid $gray-paragraph;
          text-align: center;
          padding: 18px 0;
          background-color: $black-1000;
          color: $white;

          &:not(:first-child) {
            margin-top: 15px;
          }

          &::placeholder {
            color: $gray-paragraph;
          }
        }

        .subscribe-button {
          background: linear-gradient(90deg, $blue 0%, $purple 100%);
          margin-top: 15px;
          border: none;
          text-align: center;
          color: $white;
          font-weight: 300;
          padding: 19px 35px;
          border-radius: 100px;
          cursor: pointer;
          transition: transform 0.2s;

          img {
            width: 14px;
          }

          @media (max-width: 768px) {
            font-size: 8px;
          }
        }
      }
    }

    .site-rights {
      display: flex;
      color: $gray-paragraph;
      justify-content: space-between;
      border-top: 1px solid $gray-paragraph;
      margin-top: 15px;

      @media (max-width: 768px) {
        border: none;
        flex-direction: column-reverse;
      }

      span {
        margin-top: 20px;
      }
    }
  }
}
</style>
