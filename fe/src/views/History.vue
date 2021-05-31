<template>
  <div class="history">
    <div class="left">
      <div class="del">
        <el-button
          @click="delall"
          :style="{ marginRight: '15px' }"
          type="danger"
          >清空 {{ total }} 条记录</el-button
        >
        <el-badge :value="count" class="item">
          <el-button @click="del" type="primary">删除已选</el-button>
        </el-badge>
      </div>

      <div class="cards">
        <HistoryCard
          v-for="item in fileList"
          :key="item.id"
          :info="item"
          @click.native="hancleClick(item.id)"
        ></HistoryCard>
      </div>
      <div class="pagination">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="page"
          :page-size="4"
          layout="total, prev, pager, next"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
    <div class="right">
      <div class="sort">
        <div class="status">
          <div class="statusText">软件种类:</div>
          <div class="statusSelect">
            <el-radio-group v-model="searchForm.status" fill="#4ec9b0">
              <el-radio label="">全部种类</el-radio>
              <el-radio label="safe">非恶意</el-radio>
              <el-radio label="unsafe">恶意</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="time">
          <div class="timeText">时间:</div>
          <div class="timeSelect">
            <el-radio-group v-model="searchForm.time">
              <el-radio label="timeDesc">最新</el-radio>
              <el-radio label="timeAsc">最旧</el-radio>
            </el-radio-group>
          </div>
        </div>

        <div class="count">
          <div class="countText">搜索数量:</div>
          <div class="countSelect">
            <el-radio-group v-model="searchForm.count">
              <el-radio label="countDesc">降序</el-radio>
              <el-radio label="countAsc">升序</el-radio>
            </el-radio-group>
          </div>
        </div>
      </div>

      <div class="dateSelector">
        <div class="input">
          <span class="timetxt">选择起始日期:</span>
          <div class="calendar">
            <el-date-picker
              value-format="timestamp"
              v-model="searchForm.date1"
              type="date"
              :clearable="false"
              placeholder="选择起始日期"
            >
            </el-date-picker>
          </div>
        </div>
        <div class="input" :style="{ marginBottom: '80px' }">
          <span class="timetxt">选择结束日期:</span>

          <div class="calendar">
            <el-date-picker
              value-format="timestamp"
              v-model="searchForm.date2"
              type="date"
              :clearable="false"
              placeholder="选择结束日期"
            >
            </el-date-picker>
          </div>
        </div>
      </div>

      <div class="input">
        <div class="input_txt">文件名:</div>
        <div>
          <el-input
            placeholder="请输入文件名"
            prefix-icon="el-icon-search"
            v-model="searchForm.filename"
          >
          </el-input>
        </div>
      </div>
      <div class="input">
        <div class="input_txt">md5:</div>
        <div>
          <el-input
            placeholder="请输入md5"
            prefix-icon="el-icon-search"
            v-model="searchForm.md5"
          >
          </el-input>
        </div>
      </div>

      <div class="drawerbtn">
        <el-button type="primary" @click="search">搜索</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";

import HistoryCard from "../components/HistoryCard.vue";
export default {
  async created() {
    this.email = this.$route.params.email;
    this.historySearch();
    document.title = "历史记录";
  },
  data() {
    return {
      total: 0,
      fileList: [],
      page: 1,
      email: "",
      csrf_token: "",
      searchForm: {
        status: "",
        time: "timeDesc",
        count: "countDesc",
        date1: new Date().valueOf() - 365 * 55 * 24 * 3600 * 1000,
        date2: new Date().valueOf(),
        filename: "",
        md5: "",
      },
    };
  },
  computed: {
    ...mapGetters(["count", "checked"]),
  },
  methods: {
    async historySearch() {
      await this.initCSRF();
      const datalist = {
        ...this.searchForm,
        csrf_token: this.csrf_token,
        page: this.page,
        email: this.email,
      };
      const { data } = await this.$http.post("/historySearch", datalist);

      this.fileList = data.fileList;
      this.total = data.total;
    },
    async search() {
      this.page = 1;
      await this.initCSRF();
      this.historySearch();
    },
    getCookie(name) {
      let r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
      return r ? r[1] : undefined;
    },
    async initCSRF() {
      await this.$http.get("/csrf");
      this.csrf_token = this.getCookie("csrf_token");
    },
    ...mapMutations(["reset"]),
    async del() {
      let res = await this.$confirm("确定删除已选记录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).catch(() => {});
      if (res) {
        await this.initCSRF();
        await this.$http.post("/dele", {
          deleteList: this.checked.join(","),
          csrf_token: this.csrf_token,
        });
        this.reset(); // 清空 vuex 中的 checked
        this.$message.success("删除成功");
        this.historySearch();
      } else {
        this.$message.info("已取消删除");
      }
    },
    async delall() {
      let res = await this.$confirm("确定清空所有记录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).catch(() => {});
      if (res) {
        await this.$http.get("/deleall");
        this.reset(); // 清空 vuex 中的 checked
        this.$message.success("清空成功");

        this.page = 1;
        this.fileList = [];
        this.total = 0;
      } else {
        this.$message.info("已取消删除");
      }
    },
    async handleCurrentChange(val) {
      this.page = val;
      this.historySearch();
    },
    hancleClick(id) {
      this.$router.push(`/result/${id}/id`);
    },
  },
  components: {
    HistoryCard,
  },
};
</script>
<style scoped>
.history {
  width: 100vw;
  height: 100%;
  display: flex;
}

.pagination {
  position: absolute;
  left: 50%;
  bottom: 70px;
  transform: translateX(-50%);
}
.left {
  padding-top: 25px;

  flex: 7;
  position: relative;
}
.right {
  padding-top: 30px;
  border-top: 5px solid #edf0f4;
  flex: 3;
  background-color: #fff;
}

.del {
  position: relative;
  right: -277px;
}

.sort {
  margin: 15px;
  background-color: #edf0f4;
  padding: 15px;
  margin-bottom: 80px;
  position: relative;
}

.sort::after {
  display: block;
  height: 2px;
  width: 100%;
  background-color: #edf0f4;
  content: "";
  position: absolute;
  top: 133%;
  left: 0;
}

.dateSelector::after {
  display: block;
  height: 2px;
  width: 100%;
  background-color: #edf0f4;
  content: "";
  position: absolute;
  margin: 0 15px;
  top: 125%;
  left: 0;
}

.sort > div {
  margin: 5px 0;
}
.input {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  margin: 15px 15px;
  background-color: #edf0f4;
  box-sizing: border-box;
}

.dateSelector {
  position: relative;
}

.input .timetxt {
  flex: 4;
}
.calendar {
  flex: 8;
}

.input div:nth-child(1) {
  flex: 2;
}

.input div:nth-child(2) {
  flex: 8;
}

.drawer {
  position: relative;
}
.drawerbtn {
  position: absolute;
  right: 20px;
  bottom: 40px;
}

.search {
  width: 100%;
  height: 100%;
  /* background-color: #b5daec; */
  padding-top: 80px;
  position: relative;
}

.status {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.time {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.count {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.options {
  position: absolute;
  top: 15px;
  right: 10px;
  display: flex;
  justify-content: space-between;
}
</style>
