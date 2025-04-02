<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["hideSuccessWindow"]);

function closeWindow() {
  emit("hideSuccessWindow");
}
</script>

<template>
  <div class="request-sending-result">
    <div class="succesful-notification">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Eo_circle_green_checkmark.svg/1024px-Eo_circle_green_checkmark.svg.png"
        title="green-checkmark"
      />
    </div>
    <h3>{{ props.data.header }}</h3>
    <div class="success-buttons-wrapper">
      <NuxtLink class="light-gray-btn" to="/admin-panel">עמוד הבית</NuxtLink>
      <NuxtLink class="gray-btn" @click="closeWindow">
        הוסף אירוע נוסף
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.request-sending-result {
  border: 1px solid grey;
  background: white;
  width: 50%;
  border-radius: 20px;
  padding: 20px 30px 30px 30px;

  @media (max-width: 1010px) {
    width: 70%;
  }

  @media (max-width: 610px) {
    width: 95%;
  }

  .succesful-notification {
    display: flex;
    justify-content: center;

    img {
      width: 64px;
    }
  }

  h3 {
    font-size: 24px;
    margin-top: 0;
    font-weight: bold;
    text-align: center;

    @media (max-width: 834px) {
      font-size: 20px;
    }
  }

  .success-buttons-wrapper {
    display: flex;
    justify-content: space-around;

    @media (max-width: 427px) {
      flex-direction: column;

      .light-gray-btn {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
