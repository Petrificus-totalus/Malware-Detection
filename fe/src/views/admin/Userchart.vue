<template>
  <div class="charts">
    <Register />
    <UploadNum />
  </div>
</template>

<script>
import Register from "./charts/Register";
import UploadNum from "./charts/UploadNum";

export default {
  name: "hello",
  components: {
    Register,
    UploadNum,
  },
};
</script>

<style scoped>
.charts {
  margin: 0 auto;
  width: 1000px;

  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
