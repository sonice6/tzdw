<template>
  <div class="menu">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-submenu index="1_1">
        <template slot="title">
          <div>
            <img
              v-show="firmenu"
              src="@/assets/img/centleft/tuxingbianji _icon_select.png"
            />
            <img
              v-show="!firmenu"
              src="@/assets/img/centleft/tuxingbianji _icon_def.png"
            />
            <span :class="this.firmenuN">图形编辑</span>
          </div>
        </template>
        <el-menu-item-group>
          <el-menu-item
            :index="String(item.id)"
            v-for="item in this.menu"
            :key="item.id"
            @click="menuClick(item.id)"
            >■&ensp;&emsp;{{ item.name }}</el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="1_2" class="twoMenu">
        <template slot="title">
          <div class="twoMenu">
            <div>
              <img
                v-show="!twomenu"
                src="@/assets/img/centleft/shuju_icon_def.png"
              />
              <img
                v-show="twomenu"
                src="@/assets/img/centleft/shuju_icon_select.png"
              />
              <span slot="title" class="twoList" :class="this.twomenuN"
                >数据同步</span
              >
            </div>
          </div>
        </template>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import Bus from "@/Bus/bus.js";
export default {
  data() {
    return {
      menu: [
        { id: 1, name: "移动设备" },
        { id: 2, name: "批量移动设备" },
        { id: 3, name: "添加设备" },
        { id: 4, name: "删除设备" },
        { id: 5, name: "批量删除设备" },
        { id: 14, name: "电气台账查看" },
        { id: 6, name: "节点编辑" },
        { id: 7, name: "添加截面" },
        { id: 8, name: "截面模板管理" },
        { id: 9, name: "电缆关联埋设" },
        { id: 10, name: "取消电缆关联埋设" },
        { id: 11, name: "入沟提交" },
        { id: 12, name: "埋设剖面图" },
        { id: 13, name: "埋设电缆" },
      ],
      firmenu: false,
      twomenu: false,
      firmenuN: "",
      twomenuN: "",
    };
  },
  created() {
    // this.$parent.getNum();
  },
  watch: {},
  methods: {
    //主节点
    handleOpen(index) {
      if (index == 1) {
        this.firmenu = true;
        this.twomenu = false;
        this.firmenuN = "firmenuN";
        this.twomenuN = "";
      } else {
        this.twomenuN = "firmenuN";
        this.firmenu = false;
        this.firmenuN = "";
        this.twomenu = true;
        // Bus.$emit("serial", index);
      }
      this.$emit("serial", index);
    },
    handleClose(index) {
      if (index == 1) {
        return;
      }
      this.twomenuN = "firmenuN";
      this.firmenu = false;
      this.firmenuN = "";
      this.twomenu = true;
      // Bus.$emit("serial", index);
      this.$emit("serial", index);
      // console.log(index);
    },

    menuClick(index) {
      // Bus.$emit("lsitId", index);
      this.$emit("lsitId", index);
      // this.$store.commit("changeMuen",index)
      // console.log(index)
      this.firmenu = true;
      this.firmenuN = "firmenuN";
      this.twomenu = false;
      this.twomenuN = "";
      // Bus.$emit("serial", index); //地图显隐
      this.$emit("serial", index);
    },
  },
};
</script>

<style>
.menu {
  box-sizing: border-box;
  width: 100%;
  min-width: 100px;
  height: 100%;
  padding: 10px 0 0 0;
}
.el-menu {
  border-right: solid 0px #e6e6e6;
}
.el-menu-vertical-demo li {
  padding: 0 5px 0 5px;
}
.el-menu-item {
  padding-left: 52px;
  font-size: 14px;
  color: #989898;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.el-submenu__title {
  text-align: left;
}
.el-submenu__title span {
  font-weight: 550;
  font-size: 18px;
  color: #989898;
  margin-left: 10px;
}
.el-submenu__title:hover {
  background-color: #cee2e5;
  border-radius: 6 px;
}
.el-menu-item:focus,
.el-menu-item:hover {
  background-color: #cee2e5;
}
.el-submenu .el-menu-item {
  min-width: 100px;
}
.el-menu-item.is-active {
  color: #1e8b85;
  padding: 0 5px 0 5px;
}
.menuitem {
  padding: 0 5px;
}
.twoList {
  font-weight: 550;
  font-size: 18px;
  margin-left: 10px;
}
.firmenuN {
  color: #1e8b85 !important;
}
.twoMenu i {
  display: none;
}
</style>