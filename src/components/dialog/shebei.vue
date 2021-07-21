<template>
  <div>
    <el-dialog
      title="选择埋设类型"
      :show-close="false"
      :modal="false"
      :visible.sync="dialogFormVisible"
    >
      <div class="cent_choos">
        <el-button @click="maishe">埋设类设备</el-button
        ><el-button @click="gjmaishe">其他类设备</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import Bus from "@/Bus/bus.js";
export default {
  data() {
    return {
      dialogFormVisible: false,
    };
  },
  methods: {
    maishe() {
      // Bus.$emit("maishe");
      this.dialogFormVisible = false;
      this.$emit('zhimai')
    },
    gjmaishe(){
      this.$emit('maishegj')
      this.dialogFormVisible = false;
    },
    change(){
       this.dialogFormVisible = true;
    }
  },
  created() {
    // Bus.$on("lsitId", (e) => {
    //   if(e == 3 ){
    //     this.dialogFormVisible = true;
    //   }else{
    //     return false
    //   }
    // });
  },
};
</script>
<style lang="scss" scoped>
.el-dialog__wrapper {
  width: 800px;
  margin-left: 6.2%;
  margin-top: 90px;
  ::v-deep .el-dialog__header {
    background: #1E8B85;
    text-align: left;
    span{
    color: white;
    line-height: 5px;
    }
  }
}
.el-button{
  background:#1E8B85;
  color: white;
}
</style>

