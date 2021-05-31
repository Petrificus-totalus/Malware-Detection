<template>
  <el-tooltip
    class="item"
    effect="dark"
    content="点击查看详情"
    placement="left"
    :hide-after="500"
  >
    <div
      class="carditem"
      v-if="info"
      :class="[info.status === 'safe' ? 'safe' : 'unsafe']"
    >
      <div class="name">{{ info.filename }}</div>

      <!-- <div>{{ info.md5 }}</div> -->
      <div class="time">{{ info.time | dateFormat }}</div>
      <!-- <div>{{ info.user }}</div> -->
      <div class="size">
        <div class="txt">文件大小</div>
        <div>{{ info.filesize | byteFormat }}</div>
      </div>
      <div class="count">
        <div>
          <div class="txt">搜索数变化</div>
        </div>
        <div>{{ info.count }} <span>--></span> {{ info.allcount }}</div>
      </div>

      <div class="check">
        <el-checkbox
          v-model="isChecked"
          @click.native.prevent="click(info.id, $event)"
        ></el-checkbox>
      </div>
    </div>
  </el-tooltip>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
  props: {
    info: {
      type: Object,
      default: null,
    },
  },

  computed: {
    isChecked() {
      return this.$store.getters.isChecked(this.info.id);
    },
  },
  methods: {
    ...mapMutations(["handleSingle"]),
    click(id, e) {
      this.handleSingle(id);
      e.stopPropagation();
    },
  },
};
</script>

<style scoped>
.carditem {
  width: 80%;
  height: 120px;
  margin: 20px auto;
  border-radius: 5px;
  box-shadow: 4px 4px 5px grey;
  transition: all 0.3s linear;
  position: relative;
}
.carditem:hover {
  transform: scale(1.05);
  cursor: pointer;
}

.carditem:hover .check {
  transform: scale(2.2) translateX(-7px);
}

.safe {
  background-color: rgb(19, 134, 82);
  color: #fff;
}

.unsafe {
  background-color: rgb(207, 51, 51);
  color: #fff;
}

.check {
  transition: all 0.2s linear;
  transform: scale(2.2);
  position: absolute;
  top: 50px;
  right: 30px;
}

.count {
  position: absolute;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50%;
  border-top: none;
  border-bottom: none;
  top: 25%;
  left: 75%;
  border-radius: 4px;
  font-size: 20px;
  box-shadow: 0 0 10px rgb(199, 199, 199);
}

.count span {
  position: relative;
  top: -2px;
}
.txt {
  font-size: 14px;
  margin-bottom: 2px;
}
.safe .count,
.safe .size,
.safe .name {
  background-color: #1bbd30;
}

.unsafe .count,
.unsafe .size,
.unsafe .name {
  background-color: #ff6145;
}
.size {
  border-radius: 4px;

  position: absolute;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50%;
  /* border: 1px solid #fff; */
  border-top: none;
  border-bottom: none;
  top: 25%;
  left: 45%;
  font-size: 20px;
  box-shadow: 0 0 10px rgb(199, 199, 199);
}

.name {
  position: absolute;
  font-size: 26px;
  top: 10px;
  left: 10px;
  padding: 3px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgb(199, 199, 199);
}
.time {
  position: absolute;
  /* font-size: 26px; */
  bottom: 10px;
  left: 15px;

  /* background-color: rgb(35, 114, 15); */
}
</style>
