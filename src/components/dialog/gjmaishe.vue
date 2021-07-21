<template>
  <div>
    <el-dialog
      :modal="false"
      title="添加工井"
      :visible.sync="dialogFormVisible"
      :show-close="false"
      class="addshebei"
    >
      <el-form :model="form">
        <el-form-item label="">
          <div class="titlename">设备名称</div>
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="suer">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        name:'',
      },
    };
  },
  methods: {
    change() {
      this.dialogFormVisible = true;
    },
    suer(){
      if( this.form.name != ''){
         this.$emit("pointgj", this.form)
        this.dialogFormVisible = false
      }else{
         this.$message.error('请填写设备名称');
      }
    }
  },
  watch:{
     dialogFormVisible: {   //更改显示状态初始化值
      handler(val) {
        if (val == true) {
          this.form = {
            name: "",
          };
        }
      },
      deep: false,
      immediate: false,
    },
  }
};
// <style scoped>
// /deep/.el-dialog__header {
//   background: #007471;
//   text-align: left;
// }
// /deep/.el-dialog__title {
//   color: #ffffff;
// }
// </style>
</script>
<style lang="scss" scoped>
.addshebei {
  margin-top: 5%;
  width: 890px;
  margin-left: 30%;
  ::v-deep .el-dialog__header {
    background-color: #1e8b85;
    padding: 13px 20px 10px;
    .el-dialog__title {
      color: white;
    }
    .el-dialog__close {
      color: white;
    }
  }
  .el-dialog__body {

    .el-form-item {
      margin-top: 1%;
      margin-bottom: 3px;
      width: 80%;
      padding-left: 5%;
      .el-form-item__label {
        // width: 30% !important;
        padding: 0 10px 0 0;
        font-size: 15px;
      }
      .el-form-item__content {
        // margin: 0 !important;
        width: 80%;
        .el-select {
          width: 90%;
        }
      }
      .el-input {
        width: 90%;
        .el-input__inner {
          border-radius: 0;
          border: 1px solid #b1b1b1;
          height: 30px;
        }
      }
    }
  }
  .dialog-footer {
    text-align: center;
    .el-button {
      background-color: #1e8b85;
      color: white;
    }
  }
}
.titlename{
  font-size: 18px;
}
</style>