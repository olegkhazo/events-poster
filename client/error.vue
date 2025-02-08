<script setup></script>

<template>
  <TheHeader />
  <div class="content-wrapper">
    <div class="error-page-content">
      <h1>Whoops</h1>
      <p>
        We seemed to have misplaced that page. You can navigate our site using
        the links below.
      </p>
      <div class="links-nav">
        <NuxtLink to="/">Home</NuxtLink>
      </div>
    </div>
    <div class="error-img-wrapper">
      <img
        src="https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGRvZ3xlbnwwfHwwfHx8MA%3D%3D"
        title="sad-dog"
      />
    </div>
  </div>
  <TheFooter />
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

header {
  background-color: $black-1000;
}

.content-wrapper {
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  min-height: 80vh;

  @media (max-width: 1070px) {
    flex-direction: column;
    align-items: center;
  }
  .error-page-content {
    width: 45%;

    @media (max-width: 1070px) {
      width: 70%;
      text-align: center;
    }

    @media (max-width: 768px) {
      width: 100%;
      text-align: start;
    }

    h1 {
      font-size: 50px;
      font-weight: 300;
      margin-bottom: 10px;
    }

    p {
      font-size: 20px;
      font-weight: 300;
      color: $gray-800;
    }

    .links-nav {
      display: flex;
      justify-content: space-between;

      @media (max-width: 768px) {
        flex-direction: column;
      }

      a {
        text-decoration: none;
        color: $blue;
        font-weight: 500;

        @media (max-width: 768px) {
          font-weight: 400;
          margin-bottom: 10px;
        }
      }
    }
  }

  .error-img-wrapper {
    width: 45%;
    display: flex;
    justify-content: flex-end;
    margin-top: 30px;

    @media (max-width: 1070px) {
      width: 100%;
      justify-content: center;
    }

    img {
      width: auto;
    }
  }
}
</style>
