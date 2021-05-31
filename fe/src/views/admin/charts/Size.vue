<template>
  <div class="size">
    <div ref="chart" :style="{ width: '100%', height: '320px' }"></div>
  </div>
</template>

<script>
export default {
  name: "size",

  mounted() {
    this.drawLine();
  },
  methods: {
    async drawLine() {
      let myChart = this.$echarts.init(this.$refs.chart);
      const { data } = await this.$http.get("/sizeChart");

      let option = {
        title: {
          text: "文件大小分布图",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        grid: {
          top: "4%",
        },
        series: [
          {
            name: "文件大小",
            type: "pie",
            radius: "70%",
            data: data.datas.filter((item) => {
              return item.value > 0;
            }),
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      // 绘制图表
      myChart.setOption(option);
    },
  },
};
</script>

<style scoped>
.size {
  padding: 10px;
  box-sizing: border-box;
  width: 100%;
  background-color: #fff;
  margin-bottom: 20px;
  box-shadow: rgb(17 17 17 / 16%) 0px 4px 8px -3px;
}
</style>
