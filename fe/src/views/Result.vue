<template>
  <div>
    <div class="resHeader">
      <img @click="goBack" src="../assets/imgs/back.png" alt="" /><span
        @click="goBack"
        class="back"
        >返回</span
      ><span class="title">检测结果</span>
    </div>
    <!-- <el-page-header @back="goBack" content="检测结果页面"> </el-page-header> -->
    <div v-if="result" class="results">
      <div class="words">
        <img :src="require(`../assets/imgs/${result.status}.png`)" alt="" />

        <div class="necessary">
          <div>md5:{{ result.md5 }}</div>
          <div>文件名称:{{ result.filename }}</div>
          <div>文件大小:{{ result.filesize | byteFormat }}</div>
          <div>上传者:{{ result.user }}</div>
        </div>
        <div class="unnecessry">
          <div>上传时间:{{ result.time | dateFormat }}</div>
          <div>总热度:{{ result.count }}</div>
          <div v-if="result.currentcount">
            当前热度:{{ result.currentcount }}
          </div>

          <div v-if="result.exist">exist:{{ result.exist }}</div>
          <div v-if="result.pe_time">petime:{{ result.pe_time }}</div>
          <div v-if="result.check_time">checktime:{{ result.check_time }}</div>
        </div>
      </div>

      <div class="tabs">
        <el-tabs
          v-model="activeName"
          type="border-card"
          @tab-click="handleClick"
        >
          <el-tab-pane label="DOS头" name="DOS头"
            ><Coff :coff="coff"
          /></el-tab-pane>
          <el-tab-pane label="OPTIONAL头" name="OPTIONAL头"
            ><Optional :optional="optional"
          /></el-tab-pane>
          <el-tab-pane label="imports" name="imports"
            ><Imports :imports="imports"
          /></el-tab-pane>
          <el-tab-pane label="sections" name="sections"
            ><Sections :sections="sections"
          /></el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import Coff from "./details/Coff";
import Sections from "./details/Sections";
import Optional from "./details/Optional";
import Imports from "./details/Imports";

export default {
  async created() {
    document.title = "结果";
    const { idORmd5, key } = this.$route.params;
    const { data } = await this.$http.get(`/searchfile${idORmd5}/${key}`);
    this.result = data;
    this.coff = data.coff || {};
    this.optional = data.optional || {};
    this.imports = data.imports || [];
    this.sections = data.sections || [];
  },
  data() {
    return {
      result: null,
      activeName: "DOS头",
      coff: {},
      optional: {},
      imports: [],
      sections: [],
    };
  },
  methods: {
    goBack() {
      this.$router.back(-1);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
  components: {
    Coff,
    Sections,
    Optional,
    Imports,
  },
};
</script>

<style scoped>
.resHeader {
  position: relative;
  height: 50px;
  display: flex;
  align-items: center;
  box-shadow: rgb(17 17 17 / 16%) 0px 4px 8px -3px;
  margin-bottom: 15px;
}
.words {
  display: flex;
  justify-content: space-between;
}

.resHeader img {
  display: inline-block;
  width: 30px;
  height: 30px;
}

.resHeader img:hover,
.resHeader .back:hover {
  cursor: pointer;
}

.resHeader .back {
  /* margin: 20px 0; */
  /* padding: 5px; */
  position: relative;
}
.resHeader .back::after {
  content: "";
  position: absolute;
  width: 3px;
  height: 90%;
  background-color: #000;
  left: 45px;
  top: 50%;
  transform: translateY(-50%);
}

.title {
  position: absolute;
  font-size: 24px;
  left: 50%;
  transform: translateX(-50%);
}

.results {
  width: 86vw;
  margin: 0 auto;
  /* height: calc(100vh - 50px); */
  /* background-color: rgb(237, 240, 244); */
}
</style>
