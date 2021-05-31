<template>
  <div class="optional">
    <div class="item">
      用户子系统(subsystem): <span>{{ optional.subsystem }}</span>
    </div>
    <div class="item">
      幻数(magic): <span>{{ optional.magic }}</span>
    </div>
    <div class="item">
      自定义主版本号(major_image_version):
      <span>{{ optional.major_image_version }}</span>
    </div>
    <div class="item">
      自定义副版本号(minor_image_version):
      <span>{{ optional.minor_image_version }}</span>
    </div>
    <div class="item">
      连接器主版本号(major_linker_version):
      <span>{{ optional.major_linker_version }}</span>
    </div>
    <div class="item">
      连接器副版本号(minor_linker_version):
      <span>{{ optional.minor_linker_version }}</span>
    </div>
    <div class="item">
      所需操作系统主版本号(major_operating_system_version):
      <span>{{ optional.major_operating_system_version }}</span>
    </div>
    <div class="item">
      所需操作系统副版本号(minor_operating_system_version):
      <span>{{ optional.minor_operating_system_version }}</span>
    </div>
    <div class="item">
      所需子系统主版本号(major_subsystem_version):
      <span>{{ optional.major_subsystem_version }}</span>
    </div>
    <div class="item">
      所需子系统副版本号(minor_subsystem_version):<span>{{
        optional.minor_subsystem_version
      }}</span>
    </div>
    <div class="item">
      代码段总大小(sizeof_code): <span>{{ optional.sizeof_code }}</span>
    </div>
    <div class="item">
      头与节表总大小(sizeof_headers):
      <span>{{ optional.sizeof_headers }}</span>
    </div>
    <div class="item">
      进程堆初始提交虚存大小(sizeof_heap_commit):
      <span>{{ optional.sizeof_heap_commit }}</span>
    </div>
    <div>
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="dll_characteristics:" name="1">
          <div
            v-for="(item, index) in optional.dll_characteristics"
            :key="index"
          >
            {{ index + 1 }}.{{ item }}
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    optional: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      activeNames: ["1"],
    };
  },
  methods: {
    handleChange(val) {
      console.log(val);
    },
  },
};
</script>

<style scoped>
.item span {
  position: absolute;
  left: 50%;
}
.optional .item {
  position: relative;
  font-size: 13px;
  padding: 7px;
  border-bottom: 1px solid #f2f2f2;
}
.optional .item:hover {
  background-color: #f5f7fa;
}
</style>
