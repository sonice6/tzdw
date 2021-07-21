<template>
  <div class="index">
    <hearter></hearter>
    <div class="center">
      <div class="cent_left">
        <CentLeft @lsitId="lsitId" @serial="serial"></CentLeft>
      </div>
      <div class="cent_right">
        <div class="cent_right_item">
          <Map
            ref="locationMap"
            v-if="Showserial"
            @jmtc="jmtc"
            :gjdataname="gjdataname"
            :formData="formData"
            :jmmbsl="jmmbsl"
            @jmszshow="jmszshow"
          ></Map>
          <!-- //批量移动设备 2-->
          <Removeshebei ref="Removeshebei"></Removeshebei>
          <!-- //选择埋设类型  3-->
          <Seletype
            ref="Seletype"
            @zhimai="zhimai"
            @maishegj="maishegj"
          ></Seletype>
          <!-- //添加埋设类型  3_1-->
          <Addtype ref="Addtype" @adddot="adddotOne"></Addtype>
          <!-- //添加工井  3_1-->
          <Addpoint ref="Addpoint" @pointgj="pointgj"></Addpoint>
          <!-- //添加截面  7777-->
          <AddPolygon ref="AddPolygon" @jmmb="jmdata"></AddPolygon>
          <!-- //截面模板管理 -->
          <PolygonSet ref="PolygonSet" @cancelms="cancelms"></PolygonSet>
          <!-- //数据同步 -->
          <DS v-if="!Showserial"></DS>
          <div class="Screens">
            <screen> </screen>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Bus from "@/Bus/bus.js";
import hearter from "../components/module/header.vue";
import CentLeft from "../components/module/cent_left.vue";
import Map from "../components/part/map.vue";
import DS from "../components/part/Synchronism.vue";
//查询框
import screen from "../components/part/screen.vue";
// 弹窗
import Seletype from "../components/dialog/shebei.vue";
import Addtype from "../components/dialog/addtype.vue";
import Addpoint from "../components/dialog/gjmaishe.vue";
import AddPolygon from "../components/dialog/addPolygon.vue"; //截面添加
import PolygonSet from "../components/dialog/littleMap/littleMap.vue"; //截面模板
//2批量移动设备
import Removeshebei from "../components/dialog/moveshebei.vue";
export default {
  components: {
    hearter,
    CentLeft,
    Map,
    DS,
    Seletype,
    Addtype,
    screen,
    AddPolygon,
    Removeshebei,
    Addpoint,
    PolygonSet,
  },
  data() {
    return {
      datainex: 1,
      Showserial: true,
      formData: {}, //设备类型设置
      jmmbsl: {}, //截面模板
      // ditushow: false,
      gjdataname: {},
    };
  },
  created() {},
  methods: {
    getNum() {
      // console.log("方法");
    },
    jmdata(data) {
      //截面模板
      this.$refs.locationMap.typeSelected = "none"; //初始化
      this.jmmbsl = data;
      this.$refs.locationMap.addPolygon = true; //添加截面
    },
    jmtc() {
      // console.log(this.jmmbsl);
      this.$refs.AddPolygon.change(); //截面添加弹窗
    },
    adddotOne(data) {
      this.formData = data;
      if (this.formData.radio == 1) {
        this.$refs.locationMap.isGetRaduisFeature = "Point"; //查询点
      } else {
        this.$refs.locationMap.typeSelected = "LineString"; //绘制线
      }
      // console.log(data, "from");
    },
    zhimai() {
      //选择埋设类型弹出设备埋设
      this.$refs.Addtype.change();
    },
    maishegj() {
      //只添加工井
      // console.log('只添加工井');
      this.$refs.Addpoint.change();
    },
    pointgj(data) {
      // console.log(111);
      this.gjdataname = data;
      this.$refs.locationMap.typeSelected = "Point";
    },
    jmszshow(data) {
      this.$refs.PolygonSet.change(data);
    },
    cancelms() {
      //取消埋设，改变状态
      this.$refs.locationMap.dlglms = false;
      this.$refs.locationMap.isGetRaduisFeature = "none";
    },
    serial(index) {
      //地图显示切换
      if (index == "1_2") {
        this.Showserial = false;
      } else {
        this.Showserial = true;
      }
    },
    lsitId(data) {
      // console.log(data, "菜单");
      // this.formData = null,                                //清空from数据
      // this.jmmbsl = null,                                //清空截面from数据
      // 初始化
      this.$refs.locationMap.isGetRaduisFeature = "none"; //查询为空
      this.$refs.locationMap.delePoint = false; //删除为false
      this.$refs.locationMap.removeInteraction(); //停止绘制
      this.$refs.locationMap.typeSelected = "none"; //绘画为none
      this.$refs.locationMap.addPolygon = false; //添加截面为false
      this.$refs.locationMap.maishepohtos = false; //查询管道,刨面图
      this.$refs.locationMap.electrical = false; //电气台账查看
      // *******
      if (data === 1) {
        //移动设备
        this.$refs.locationMap.addMoveInteraction(); //拖动设备
        this.$refs.locationMap.isGetRaduisFeature = "Point"; //查询为Point
      } else if (data === 2) {
        //批量移动
        this.$refs.Removeshebei.change();
      } else if (data === 3) {
        //添加设备
        this.$refs.Seletype.change();
        // this.$refs.Addtype.change()
      } else if (data === 4) {
        //删除设备
        this.$refs.locationMap.isGetRaduisFeature = "Point";
        //删除判断
        this.$refs.locationMap.delePoint = true;
      } else if (data == 6) {
        //结点编辑
        this.$refs.locationMap.isGetRaduisFeature = "LineString"; //查询线
        this.$refs.locationMap.addMoveInteraction(); //拖动设备
        this.$refs.locationMap.nodecomp = true;
      } else if (data === 7) {
        //弹窗选规格
        //  this.removeInteraction()
        //  this.$refs.locationMap.isGetRaduisFeature = 'LineString'
        this.$refs.locationMap.addPolygon = true;
      } else if (data == 9) {
        //电缆关联埋设
        this.$refs.locationMap.dlglms = true; //电缆关联埋设状态
        this.$refs.locationMap.isGetRaduisFeature = "LineString"; //查询为LineString
        this.$refs.locationMap.dldowngd = "dl"; //查询为LineString
      } else if (data == 10) {
        //取消关联埋设
        this.$refs.locationMap.canceldlglms = true; //取消电缆关联埋设状态
        this.$refs.locationMap.isGetRaduisFeature = "LineString"; //查询为LineString
        this.$refs.locationMap.dlglms = false; //电缆关联埋设状态
      } else if (data == 12) {
        //埋设刨面图
        this.$refs.locationMap.isGetRaduisFeature = "LineString";
        this.$refs.locationMap.maishepohtos = true; //查询管道.刨面图
      } else if (data == 13) {
        //test 电缆
        this.$refs.locationMap.typeSelected = "LineString";
        this.$refs.locationMap.dltest = true;
      } else if (data == 14) {
        //电气台账查看
        this.$refs.locationMap.electrical = !this.$refs.locationMap.electrical; //电气台账查看
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.index {
  width: 100%;
  height: 100%;
  user-select: none;
}
.center {
  width: 100%;
  height: calc(100vh - 100px);
  .cent_left {
    width: 16%;
    height: 100%;
    float: left;
    background: white;
  }
  .cent_right {
    //   position: relative;
    width: 84%;
    height: 100%;
    float: right;
    padding-left: 10px;
    box-sizing: border-box;
    background: #007471;
    .cent_right_item {
      background: white;
      overflow: hidden;
      width: 100%;
      height: 100%;
      position: relative;
      .Screens {
        position: absolute;
        top: 3%;
        left: 7%;
      }
    }
  }
}
</style>