<template>
  <div>
    <el-dialog
      :modal="false"
      title="添加埋设类设备"
      :visible.sync="dialogFormVisible"
      class="addshebei"
    >
      <!-- ************************************** -->
      <el-form :model="form">
        <div class="tips">
          <div>埋设方式</div>
          <div><div></div></div>
        </div>
        <el-form-item label="埋设方式" :label-width="formLabelWidth">
          <el-select class="sele" v-model="form.region" placeholder="">
            <el-option
              v-for="item in select_option"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
              <span style="">
                <img
                  :src="
                    require('@/assets/img/anthoer/dianlan_' +
                      item.value +
                      '.png')
                  "
                />
              </span>
              <span style="margin-left: 15px">{{ item.name }}</span>
            </el-option>
            <!-- <el-option label="公共-电缆直埋" value="电缆直埋"></el-option>
            <el-option label="公共-电缆管道（管道）" value="电缆管道（管道）"></el-option>
            <el-option label="公共-电缆管道（过路管道）" value="电缆管道（过路管道）"></el-option>
            <el-option label="公共-顶管" value="顶管"></el-option>
            <el-option label="公共-电缆沟" value="电缆沟"></el-option>
            <el-option label="公共-电缆桥" value="电缆桥"></el-option>
            <el-option label="公共-电缆隧道" value="电缆隧道"></el-option> -->
          </el-select>
        </el-form-item>
        <div class="tips">
          <div>埋设参数设置</div>
          <div><div></div></div>
        </div>
        <el-form-item label="设备名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>

        <div class="chickbos">
          <el-checkbox-group v-model="form.checkList">
            <!-- <el-checkbox label="两端添加电缆井"></el-checkbox><br /><br />
            <el-checkbox label="（已有工井）从一端添加电缆通道"></el-checkbox> -->
            <el-radio v-model="form.radio" label="2">两端添加电缆井</el-radio
            ><br />
            <el-radio v-model="form.radio" label="1"
              >（已有工井）从一端添加电缆通道</el-radio
            >
          </el-checkbox-group>
        </div>

        <div class="tips">
          <div>电缆井命名</div>
          <div><div></div></div>
        </div>
        <el-form-item label="编号前缀" :label-width="formLabelWidth">
          <el-input
            v-model="form.bianhaoname"
            autocomplete="off"
          ></el-input> </el-form-item
        ><el-form-item label="起始编号" :label-width="formLabelWidth">
          <el-input
            v-model="form.starname"
            autocomplete="off"
          ></el-input> </el-form-item
        ><el-form-item label="编号后缀" :label-width="formLabelWidth">
          <el-input v-model="form.lastname" autocomplete="off"></el-input>
        </el-form-item>

        <!-- <div class="bosdot">
          <el-checkbox-group v-model="form.checkList">
            <el-checkbox label="添加电缆井"></el-checkbox>
          </el-checkbox-group>
        </div> -->
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="suer">确 定</el-button>
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
      form: {
        name: "",     //设备名称
        bianhaoname: "",  //编号前缀
        starname: "",   //开始名称
        lastname: "",   //结尾名称
        region: "1",   //线段类型
        radio: "", //工井选择
      },
      formLabelWidth: "22%",
      select_option: [
        { name: "公共-电缆直埋", value: "1" },
        { name: "公共-电缆管道（管道）", value: "2" },
        { name: "公共-电缆管道（过路管道）", value: "3" },
        { name: "公共-顶管", value: "4" },
        { name: "公共-电缆沟", value: "5" },
        { name: "公共-电缆桥", value: "6" },
        { name: "公共-电缆隧道", value: "7" },
      ],
    };
  },
  methods: {
    suer() {
      if(this.form.name != ''){
         if(this.form.radio != ''){
           if(this.form.starname == ''||this.form.bianhaoname == ''||this.form.lastname == '' ){
             this.$message.error('请填写完整工井名称')
           }else{
             this.dialogFormVisible = false;
             this.$emit("adddot", this.form)
           }
           }else{
             this.dialogFormVisible = false;
             this.$emit("adddot", this.form)
           }
         }else{
           this.$message.error('请填写电缆名称')
       }
    },
    change(){
       this.dialogFormVisible = true;
    }
  },
  created() {
    // Bus.$on("maishe", () => {
    //   this.dialogFormVisible = true;
    // });
  },
  // foreDestroy(){
  //   this.radio = ''
  // },
  watch: {
    dialogFormVisible: {   //更改显示状态初始化值
      handler(val) {
        if (val == true) {
          this.form = {
            name: "",
            bianhaoname: "",
            starname: "",
            lastname: "",
            region: "1",
            resource: "",
      
            radio: "", //工井选择
          };
          // this.$emit("adddot", this.form);
        }
      },
      deep: false,
      immediate: false,
    },
    // form: {
    //   handler(newDate, oldData) {
    //     console.log(newDate);
    //   },
    //   deep: true,
    //   immediate: false,
    // },
  },
};
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
    .tips {
      width: 90%;
      height: 5%;
      display: flex;
      div {
        color: #1e8b85;
        font-size: 14px;
      }
      // div:nth-child(1){
      //     // width: 15%;
      // }
      div:nth-child(2) {
        flex: 1;
        div {
          height: 50%;
          width: 100%;
          border-bottom: 2px #1e8b85 solid;
        }
      }
    }
    .el-form-item {
      margin-top: 1%;
      margin-bottom: 3px;
      width: 80%;
      padding-left: 5%;
      .el-form-item__label {
        width: 30% !important;
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
    .sele {
      .el-input {
        width: 100%;
      }
    }
    .chickbos {
      margin: 5px 0 10px 5px;
      padding-left: 10%;
      text-align: left;
    }
    .bosdot {
      width: 30%;
      margin-left: 45px;
      float: left;
    }
    .el-checkbox__input.is-checked + .el-checkbox__label {
      color: #1e8b85;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner,
    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
      background-color: #1e8b85;
      border-color: #1e8b85;
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
.el-select-dropdown__item.selected {
  color: #1e8b85;
}

</style>
<style scoped>
/deep/.el-checkbox__input.is-checked + .el-checkbox__label {
  color: #1e8b85;
}
/deep/.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #1e8b85;
}
/deep/.el-checkbox__input.is-focus .el-checkbox__inner {
  border-color: #1e8b85;
}
/deep/.el-select .el-input.is-focus .el-input__inner {
  border-color: #1e8b85;
}
/deep/.el-radio__input.is-checked .el-radio__inner , .el-radio__input.is-checked+.el-radio__label{
   background: #1e8b85;
   color: #1e8b85;
}
/deep/.el-radio__input.is-checked+.el-radio__label{
   color: #1e8b85;
}
</style>