<template>
  <div>
    <el-dialog
      :modal="false"
      title="添加截面"
      :visible.sync="dialogFormVisible"
      :show-close="true"
      class="addpoly"
    >
      <div class="number">
        <div class="title">横向管口数量：</div>
        <div class="jishu">
          <el-input-number
            v-model="form.numx"
            controls-position="right"
            @change="handleChange"
            :min="1"
            :max="6"
          ></el-input-number>
        </div>
      </div>

      <div class="number">
        <div class="title">纵向管口数量：</div>
        <div class="jishu">
          <el-input-number
            v-model="form.numy"
            controls-position="right"
            @change="handleChange"
            :min="1"
            :max="6"
          ></el-input-number>
        </div>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="suer">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import Bus from '../../Bus/bus.js'
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        numx: 1,
        numy: 1,
        gbzb:false,
      },
    };
  },
  methods: {
    change() {
      this.dialogFormVisible = true;
    },
    handleChange(value) {
      //   console.log(value);
    },
    suer() {
      this.form.gbzb = true
      this.$emit("jmmb", this.form);
      this.dialogFormVisible = false;
    },
  },
  watch: {
    // form: {
      dialogFormVisible(val) {
        if (val == true) {
          this.form = {
            numx: 3,
            numy: 3,
            gbzb:false,
          };
        }
        //  this.$emit("jmmb", this.form);
      },
    // },
  },
  created() {
    // this.$emit("jmmb", this.form)
    // Bus.$on('lsitId',(e)=>{
    //   if(e == 7 ){
    //     this.dialogFormVisible = !this.dialogFormVisible
    //   }else{
    //      this.dialogFormVisible  = false
    //     return false
    //   }
    // })
  },
};
</script>
<style lang="scss" scoped>
.addpoly {
  margin: 10vh auto;
  width: 1000px;
}
::v-deep .el-dialog__header {
  text-align: left;
  padding: 13px 20px 10px;
  background-color: #1e8b85;
  span {
    color: white;
  }
  button i {
    color: white;
  }
}
.number {
  height: 50px;
  // display: flex;
  // float: left;
  overflow: hidden;
  .title {
    width: 100px;
    margin-top: 10px;
    float: left;
  }
  .jishu {
    float: left;
  }
}
.dialog-footer {
  text-align: center;
  .el-button {
    background-color: #1e8b85;
    color: white;
  }
}
</style>