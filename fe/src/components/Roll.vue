<template>
  <div class="roll">
    <Card
      v-for="(item, index) in infos"
      :key="item.filename"
      :info="item"
      class="card"
      :size="size === '600px' ? 'big' : 'small'"
      :style="{
        transform: `rotateY(${30 * (index + 1)}deg) translateZ(${size})`,
      }"
    ></Card>
  </div>
</template>

<script>
import Card from "./Card";
export default {
  components: {
    Card,
  },
  props: {
    infos: {
      type: Array,
      default: [],
    },
    size: {
      type: String,
      default: "600px",
    },
  },
};
</script>

<style scoped>
html {
  perspective: 3000px;
}
.roll {
  /* display: flex;
  justify-content: space-between; */
  width: 270px;
  height: 120px;

  margin: 0 auto;
  position: relative;
  transform-style: preserve-3d;
  transform-origin: center;
}

.card {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.8;
  transform-origin: center;
}

/* .roll .card:nth-child(1) {
  transform: rotateY(30deg);
}
.roll .card:nth-child(2) {
  transform: rotateY(60deg);
}
.roll .card:nth-child(3) {
  transform: rotateY(90deg);
}
.roll .card:nth-child(4) {
  transform: rotateY(120deg);
}
.roll .card:nth-child(5) {
  transform: rotateY(150deg);
}
.roll .card:nth-child(6) {
  transform: rotateY(180deg);
}
.roll .card:nth-child(7) {
  transform: rotateY(210deg);
}
.roll .card:nth-child(8) {
  transform: rotateY(240deg);
}
.roll .card:nth-child(9) {
  transform: rotateY(270deg);
}
.roll .card:nth-child(10) {
  transform: rotateY(300deg);
}
.roll .card:nth-child(11) {
  transform: rotateY(330deg);
}
.roll .card:nth-child(12) {
  transform: rotateY(360deg);
} */
</style>
