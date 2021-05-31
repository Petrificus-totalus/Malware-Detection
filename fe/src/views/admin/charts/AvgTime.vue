<template>
  <div class="avgtime">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span :style="{ fontSize: '20px' }">检测耗时统计图</span>
      </div>
      <div ref="avgtime" :style="{ width: '100%', height: '300px' }"></div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "avgtime",
  data() {
    return {};
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    async drawLine() {
      let myChart = this.$echarts.init(this.$refs.avgtime);
      const { data } = await this.$http.get("/avgtime");
      const xAxis = [
        "<1KB",
        "1KB-500KB",
        "500KB-1MB",
        "1MB-500MB",
        "500MB-1GB",
        ">1GB",
      ];
      let pe = [];
      let check = [];

      for (let item of data.data) {
        pe.push(item.pe);
        check.push(item.check);
      }

      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },

        grid: {
          top: "4%",
          left: "3%",
          right: "4%",
          bottom: "12%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: xAxis,
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "解析文件时间(百KB/ms)",
            type: "bar",
            barWidth: "30%",
            data: pe,
          },
          {
            name: "检测时间(百B/ms)",
            type: "bar",
            barWidth: "30%",
            data: check,
          },
        ],
      };
      myChart.setOption(option);
    },
  },
};
</script>

<style scoped>
.avgtime {
  box-sizing: border-box;
  width: 100%;
  background-color: #fff;
  margin-bottom: 20px;
  box-shadow: rgb(17 17 17 / 16%) 0px 4px 8px -3px;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
}
</style>
