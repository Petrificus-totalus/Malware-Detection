<template>
  <div class="register">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span :style="{ fontSize: '20px' }">用户注册数量统计图</span>

        <el-date-picker
          :style="{ float: 'right', padding: '-3px' }"
          v-model="datePicker"
          value-format="timestamp"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="changeDate"
        >
        </el-date-picker>
        <el-radio-group
          :style="{ float: 'right', padding: '3px 0', marginRight: '55px' }"
          v-model="searchForm.time"
          size="medium"
          @change="radioChange"
        >
          <el-radio-button label="日"></el-radio-button>
          <el-radio-button label="周"></el-radio-button>
          <el-radio-button label="月"></el-radio-button>
        </el-radio-group>
      </div>
      <div ref="registernum" :style="{ width: '100%', height: '300px' }"></div>
    </el-card>
  </div>
</template>

<script>
import { timestamp2date } from "../../../filters";
export default {
  name: "register",
  data() {
    return {
      datePicker: [
        new Date().valueOf() - 30 * 6 * 24 * 3600 * 1000,
        new Date().valueOf(),
      ],
      searchForm: {
        csrf_token: "",
        time: "周",
      },
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    radioChange(val) {
      this.drawLine();
    },
    async initCSRF() {
      await this.$http.get("/csrf");
      this.searchForm.csrf_token = this.getCookie("csrf_token");
    },
    getCookie(name) {
      let r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
      return r ? r[1] : undefined;
    },
    changeDate(val) {
      this.drawLine();
    },
    async drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(this.$refs.registernum);
      await this.initCSRF();
      const dataList = {
        ...this.searchForm,
        start: this.datePicker[0],
        end: this.datePicker[1],
      };
      const { data } = await this.$http.post("/registerNumChart", dataList);
      let res = data.data;
      if (this.searchForm.time === "日") {
        res = res.filter((item) => item.regnum > 0 || item.notregnum > 0);
      }
      let xAxis = [];
      let regdatas = [];
      let notregdatas = [];

      for (let item of res) {
        xAxis.push(item.time);
        xAxis = xAxis.map((item) => {
          var myDate = new Date(item);

          var year = myDate.getFullYear();
          var zero = function(value) {
            if (value < 10) {
              return "0" + value;
            }
            return value;
          };
          var month = zero(myDate.getMonth() + 1);
          var day = zero(myDate.getDate());

          return "Y-m-d".replace(/Y|m|d|H|i|s/gi, function(matches) {
            return {
              Y: year,
              m: month,
              d: day,
            }[matches];
          });
        });
        regdatas.push(item.regnum);
        notregdatas.push(item.notregnum);
      }

      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        dataZoom: [
          {
            type: "slider",
            show: true,
            // xAxisIndex: [0],
            // left: "9%",
            bottom: 5,
            start: 0,
            end: 100, //初始化滚动条
          },
        ],
        grid: {
          top: "2%",
          left: "3%",
          right: "4%",
          bottom: "12%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: xAxis.reverse(),
            axisTick: {
              alignWithLabel: true,
            },
            axisLabel: {
              //坐标轴刻度标签的相关设置。
              interval: 0,
              rotate: xAxis.length > 8 ? "90" : "",
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
            name: "注册用户数量",
            stack: "regchart",
            type: "bar",
            barWidth: xAxis.length > 8 ? "70%" : "30%",
            data: regdatas.reverse(),
          },
          {
            name: "未注册用户数量",
            stack: "regchart",
            type: "bar",
            barWidth: xAxis.length > 8 ? "70%" : "30%",
            data: notregdatas.reverse(),
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
.register {
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
