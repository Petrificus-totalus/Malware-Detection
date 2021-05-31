<template>
  <div class="coff">
    <div class="item">
      文件生成时间(timestamp):
      <span>{{ coff.timestamp | timestamp2date }}</span>
    </div>
    <div class="item">
      运行CPU(machine): <span>{{ coff.machine }}</span>
    </div>
    <div class="item">
      文件属性(characteristics):
      <div v-for="(item, index) in coff.characteristics" :key="index">
        {{ item }} <span>{{ rela[item] }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    coff: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      rela: {
        RELOCS_STRIPPED: "重定位信息被移除",
        EXECUTABLE_IMAGE: "文件可执行",
        LINE_NUMS_STRIPPED: "行号被移除",
        LOCAL_SYMS_STRIPPED: "符号被移除",
        AGGRESIVE_WS_TRIM: "Agressively trim working set",
        LARGE_ADDRESS_AWARE: "程序能处理大于2G的地址",
        BYTES_REVERSED_LO: "保留的机器类型低位",
        CHARA_32BIT_MACHINE: "32位机器",
        DEBUG_STRIPPED: ".dbg文件的调试信息被移除",
        REMOVABLE_RUN_FROM_SWAP: "如果在移动介质中,拷到交换文件中运行",
        NET_RUN_FROM_SWAP: "如果在网络中,拷到交换文件中运行",
        SYSTEM: "系统文件",
        DLL: "文件是一个dll",
        UP_SYSTEM_ONLY: "文件只能运行在单处理器上",
        BYTES_REVERSED_HI: "保留的机器类型高位",
      },
    };
  },
};
</script>


<style scoped>
.item span {
  position: absolute;
  left: 50%;
}
.coff .item {
  position: relative;
  font-size: 16px;
  padding: 9px;
  border-bottom: 1px solid #f2f2f2;
}
.coff .item:hover {
  background-color: #f5f7fa;
}

.item > div {
  margin-top: 16px;
  margin-left: 20px;
}
</style>