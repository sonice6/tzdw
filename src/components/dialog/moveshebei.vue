<template>
  <div>
    <el-dialog
      title="批量移动设备"
      class="romveshebei"
      :show-close="true"
      :modal="false"
      :visible.sync="dialogTableVisible"
    >
      <div class="centitem">
        <!-- *************************************************************************************************************** -->
        <div class="left">
          <el-input placeholder="输入关键字进行查询" v-model="filterText">
          </el-input>

          <el-tree
            class="filter-tree"
            :data="data"
            :props="defaultProps"
            :default-expand-all="false"
            :filter-node-method="filterNode"
            ref="tree"
          >
          </el-tree>
        </div>
        <!-- *************************************************************************************************************** -->
        <div class="right">
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%;max-height='100%'"
            :border="false"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="25" align="center" />

            <el-table-column label="设备名称" align="center" width="110">
              <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>

            <el-table-column prop="name" label="设备类型" width="120" align="center" >
            </el-table-column>

            <!-- <el-table-column prop="  " label="设备坐标" align="center">
              <el-table-column prop="province" label="x坐标" width="130">
                <el-input
                  :disabled="true"
                  size="mini"
                  placeholder="119.93626946845802"
                  v-model="input4"
                >
                </el-input>
              </el-table-column>
              <el-table-column
                :disabled="true"
                prop="city"
                label="y坐标"
                width="130"
              >
                <el-input
                  :disabled="true"
                  size="mini"
                  placeholder="119.93626946845802"
                  v-model="input3"
                >
                </el-input>
              </el-table-column>
            </el-table-column> -->
              <el-table-column prop="province" label="x坐标" width="130" align="center" >
                <el-input
                  size="mini"
                  placeholder="119.93626946845802"
                  v-model="input4">
                </el-input>
              </el-table-column>
               <el-table-column
                :disabled="true"
                prop="city"
                label="y坐标"
                width="130"
                align="center"
              >
                <el-input
                  size="mini"
                  placeholder="119.93626946845802"
                  v-model="input3"
                >
                </el-input>
              </el-table-column>
            
            <el-table-column
              prop="operator"
              label="操作"
              width="125"
              align="center"
            >
              <el-button class="button" size="mini">点选坐标</el-button>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">

      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogTableVisible: false,
      filterText: "",
      // 树形
      data: [
        {
          label: "公共-检查井/工井",
          children: [
            {
              label: "工井1",
            },
          ],
        },
        {
          label: "公共-电缆管道",
          children: [
            {
              label: "电缆管道1",
            },
            {
              label: "电缆管道2",
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
      //表格
      tableData: [
        {
          date: "兴港路西001",
          name: "检查井（工井）",
        },
        {
          date: "兴港路西001",
          name: "检查井（工井）",
        },
        {
          date: "兴港路西001",
          name: "检查井（工井）",
        },
        {
          date: "兴港路西001",
          name: "检查井（工井）",
        },
        {
          date: "兴港路西001",
          name: "检查井（工井）",
        },
        {
          date: "兴港路西001",
          name: "检查井（工井）",
        },
        {
          date: "兴港路西001",
          name: "检查井（工井）",
        },
      ],
      multipleSelection: [],
      input4: "119.935802",
      input3: "32.845802",
    };
  },
  methods: {
    change(){
        this.dialogTableVisible = true
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    //表格
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
  watch: {
    dialogTableVisible(val) {
      // this.$refs.tree.filter(val);
      // console.log(val);
    },
  },
  created() {
    // Bus.$on("lsitId", (e) => {
    //   if (e == 2) {
    //     this.dialogTableVisible = !this.dialogTableVisible;
    //   } else {
    //     this.dialogTableVisible = false;
    //     return false;
    //   }
    // });
  },
};
</script>
<style lang="scss" scoped>
.button {
  background: #1e8b85;
  color: white !important;
}
.el-dialog {
  // width: 800px;
}
.coordinate {
  width: 100%;
  height: 100%;
  background: chocolate;
}
::v-deep.romveshebei {
  margin: 5% 0 0 10%;
  .el-dialog__header {
    background: #1e8b85;
    span,
    i {
      color: white;
    }
    text-align: left;
  }
  .el-dialog__body {
    padding: 10px 20px;
    .centitem {
      width: 100%;
      height: 500px;

      .left {
        height: 90%;
        width: 21.5%;
        float: left;
        box-sizing: border-box;
        border: 1px solid #999999;
        padding: 5px 10px;
        .scaher {
          width: 100%;
          height: 10%;
          background: chocolate;
        }
        .tree {
          width: 100%;
          height: 90%;
          background: chartreuse;
        }
      }
      .right {
        height: 90%;
        width: 78%;
        border: 1px solid #999999;
        box-sizing: border-box;
        // box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
        float: right;
      }
    }
  }
}
</style>