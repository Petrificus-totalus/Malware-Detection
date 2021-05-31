<template>
  <div class="imports">
    <el-collapse v-model="activeNames" accordion @change="handleChange">
      <el-collapse-item
        v-for="(item, index) in datas"
        :key="index"
        :title="item.name.toUpperCase()"
        :name="index"
      >
        <div class="contents">
          <div v-for="(item1, index1) in item.data" :key="index1">
            <div>{{ item1 }}</div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  props: {
    imports: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      activeNames: [],
    };
  },
  computed: {
    datas() {
      return this.imports.filter((item) => {
        return item.data.length > 0;
      });
    },
  },
  methods: {
    handleChange() {},
  },
};
</script>


<style scoped>
.contents {
  display: flex;
  flex-wrap: wrap;
}
.contents div {
  padding: 2px;
}
</style>