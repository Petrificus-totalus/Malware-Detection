<template>
  <el-tooltip
    class="item"
    effect="dark"
    content="点击查看详情"
    placement="bottom"
    :hide-after="500"
  >
    <div
      class="carditem"
      :style="{
        width: size === 'big' ? '305px' : '210px',
        height: size === 'big' ? '120px' : '70px',
      }"
      v-if="info"
      @click="handleClick(info)"
      :class="[info.status === 'safe' ? 'safe' : 'unsafe']"
    >
      <div
        class="name"
        :style="{ 'font-size': size === 'big' ? '24px' : '16px' }"
      >
        {{ info.filename }}
      </div>
      <div class="uploadtime" v-if="size === 'big'">
        上传时间: {{ info.time | dateFormat }}
      </div>
      <!-- <div>{{ info.user }}</div> -->
      <div class="count">
        <img class="hot" src="../assets/imgs/hot.png" alt="" />
        <div>{{ info.count }}</div>
      </div>
    </div>
  </el-tooltip>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: null,
    },
    size: {
      type: String,
      default: "big",
    },
  },
  methods: {
    handleClick(info) {
      this.$router.push(`/result/${info.md5}/md5`);
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.carditem {
  /* height: 120px; */
  box-shadow: 4px 4px 5px grey;
  color: aliceblue;
  transition: all 1s linear;
}
.carditem:hover {
  transform: scale(1.1);
  cursor: pointer;
}

.name {
  border-radius: 4px;
}
.safe .name {
  background-color: #1bbd30;
}
.unsafe .name {
  background-color: #ff6145;
}
.safe {
  background-color: rgb(19, 134, 82);
}

.uploadtime {
  margin-top: 20px;
  font-size: 18px;
}

.unsafe {
  background-color: rgb(207, 51, 51);
}

.hot {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}

.count {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  margin-top: 6px;
}
</style>
