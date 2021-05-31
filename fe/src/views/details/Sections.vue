<template>
  <div class="sections">
    <el-collapse v-model="activeNames" accordion @change="handleChange">
      <el-collapse-item
        v-for="(item, index) in sections"
        :key="index"
        :title="item.name"
        :name="index"
      >
        <div class="contents">
          <div>
            size: <span> {{ item.size | byteFormat }}</span>
          </div>
          <div>
            vsize:<span>{{ item.vsize | byteFormat }}</span>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  props: {
    sections: {
      type: Array,
      default: [],
    },
  },
  methods: {
    handleChange() {},
  },
  data() {
    return {
      activeNames: ["1"],
    };
  },
};
</script>

<style scoped>
.contents span {
  margin-left: 20px;
}
</style>
