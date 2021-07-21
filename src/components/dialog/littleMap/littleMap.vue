<template>
  <div class="littleMapppp" v-show="liMap">
    <div class="titletext">
      <span class="choess">请选择埋设单元</span>
    </div>
      <div id="littMap" />
      <div class="footer">
        <el-button class="butc" @click="cencal">取 消</el-button>
        <el-button class="buts" type="primary" @click="suer"
          >确 定</el-button
        >
      </div>
  </div>
</template>

<script>
import ol from "openlayers";
// import $ from "jquery";
import "ol/ol.css";
import MapMet from '../../../assets/mapMethod/map.js'
export default {
  data() {
    return {
      liMap: true,
      map: null, //地图
      xxs: {}, //2D
      snap: null,
      draw: null,
      modify: null,
      drawLayer: {},
      typeSelected: "none", //地图绘画类型
      isGetRaduisFeature: "Circle", //查看类型

      //接收截面信息
      Polygondata:{},
    };
  },
  created(){
    //  this.liMap = false
  },
  mounted() {
    this.$nextTick(() => {
      this.liMap = false
      this.mapInitNoLayer(); //地图初始化
      this.addPop(); //点击web点击事件
      this.addline(); //工具图层
      this.addInteraction();
    });
  },
  methods: {
    change(data){
      this.liMap = true
      this.Polygondata = data
      // console.log(data,'页面绘制');
    },
    suer(){
      MapMet.suerglms(this)
      this.liMap = false
    },
    cencal(){
      MapMet.cencalglms(this)
      this.liMap = false
      this.$emit('cancelms')
    },
    mapInitNoLayer() {
      //地图初始化
      //地图显示区域范围（默认给84坐标系最大范围）
      // var tileExtent = [-180.0, -90.0, 180.0, 90.0];
      //地图范围
      var extent = [-180.0, -90.0, 180.0, 90.0];
      this.xxs = new ol.layer.Tile({
        //平面
        source: new ol.source.XYZ({
          projection: "EPSG:4326",
          tileGrid: ol.tilegrid.createXYZ({ extent: extent }),
          tileUrlFunction: function (tileCoord, pixelRatio, proj) {
            return (
              "http://192.168.0.66:8089/YTGIS/tms/tz18dz/tz18dz/" +
              "/" +
              (tileCoord[0] - 1) +
              "/" +
              tileCoord[1] +
              "/" +
              (Math.pow(2, tileCoord[0] - 1) + tileCoord[2]) +
              ".PNG"
            );
          },
        }),
      });
      //初始化地图对象
      this.map = new ol.Map({
        target: "littMap",
        layers: [],
        // layers: [this.xxs],
        view: new ol.View({
          projection: ol.proj.get("EPSG:4326"),
          // extent: tileExtent,
          center: [119.953339, 32.466693],
          zoom: 14,
          minZoom: 15.5,
          maxZoom: 15.5,
        }),
        controls: ol.control.defaults({
          zoom: false,
          rotate: false,
          attribution: false,
        }),
      });
    },
    addPop() {
      this.map.on("click", (evt) => {
        var coodinate = evt.coordinate;
        // console.log(coodinate);
      if(this.isGetRaduisFeature == 'Circle')
        MapMet.QueryCircle(`${coodinate[0]},${coodinate[1]}`,this)
      });
    },
    //新增点图层
    addline() {
      //新增面图层
      this.drawLayer.Polygon = new ol.layer.Vector({
        source: new ol.source.Vector(),
        style: new ol.style.Style({
          // 设置线颜色\宽度
          stroke: new ol.style.Stroke({
            width: 3,
            color: "rgba(27,97,93)",
          }),
          // 图形区域内颜色
          fill: new ol.style.Fill({
            color: "rgba(255,255,255,0.5)",
          }),
        }),
      });
      //新增面图层
      this.drawLayer.Circle = new ol.layer.Vector({
        source: new ol.source.Vector(),
        style: new ol.style.Style({
          // 设置线颜色\宽度
          stroke: new ol.style.Stroke({
            width: 1,
            color: "rgba(58,144,139)",
          }),
          // 图形区域内颜色
          fill: new ol.style.Fill({
            color: 'rgba(255,255,255,0.5)',
          }),
        }),
      });

      this.drawLayer.NewCircle = new ol.layer.Vector({
        source: new ol.source.Vector(),
        style: new ol.style.Style({
          // 设置线颜色\宽度
          stroke: new ol.style.Stroke({
            width: 1,
            color:"rgb(30,139,133)"
          }),
          // 图形区域内颜色
          fill: new ol.style.Fill({
            color: 'rgb(30,139,133)',
          }),
        }),
      });
      for (let i in this.drawLayer) {
        this.map.addLayer(this.drawLayer[i]);
      }
    },
    //地图绘制           
    addInteraction() {
      if (this.typeSelected !== "none") {
        
        this.draw = new ol.interaction.Draw({
            source: this.drawLayer[this.typeSelected].getSource(),
            type: this.typeSelected,
            // 绘制时停止点击事件
            stopClick: true,
          });
          // 编辑工具
          this.modify = new ol.interaction.Modify({
            source: this.drawLayer[this.typeSelected].getSource(),
          });
          map.addInteraction(this.modify);
          this.map.addInteraction(this.draw);
          this.snap = new ol.interaction.Snap({
            source: this.drawLayer[this.typeSelected].getSource(),
          });
          this.map.addInteraction(this.snap);
      }
    },
    //刷新图层
    updateWms() {
      // 刷新wms
      // console.log('刷新');
      for (let i in this.drawLayer) {
        this.drawLayer[i].getSource().clear();
      }
    },
    //截面
    addjm(data){
       data.features.forEach((element) => {
                new ol.format.GeoJSON().readFeatures(element).forEach((element1) => {
                    this.drawLayer["Polygon"].getSource().addFeature(element1)
                    // console.log('截面');
                })
              })
    },
    //埋设单元
    addCir(data){
        data.features.forEach((element) => {
              new ol.format.GeoJSON().readFeatures(element).forEach((element1) => {
                  this.drawLayer["Circle"].getSource().addFeature(element1)
                  // console.log('埋设单元');
              })
            })
    }
  },
  watch:{
    Polygondata:{
      handler(data){
        this.addjm(data.jm)
        this.addCir(data.msdy)
        var centzb = data.jm.features[0].geometry.coordinates[0][0]
        this.map.getView().setCenter([(centzb[0][0] + centzb[3][0])/2 ,(centzb[0][1] + centzb[1][1])/2 ])
      },
      deep:true,
      immediate:false
    }
  }
};
</script>

<style lang="scss" scoped>
.littleMapppp{
  width: 350px;
  height: 300px;
  position: fixed;
  top: 30%;
  left: 45%;
  z-index: 999;
  // background: rgb(119, 111, 111);
  background: white;
  box-sizing: border-box;
  box-shadow: 0px 3px 3px rgba(117, 117, 117, 0.274);
}
.titletext{
  height: 45px;
  background: #1E8B85;
  padding: 10px 5px 5px 5px;
  
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  span{
    color: white;
    font-size: 18px;
    font-weight: 600;
  }
}
.footer{
  height: 55px;
  padding:0 50px;
  box-sizing: border-box;
  background: rgb(252, 252, 252);
  .butc{
    float: left;
  }
  .buts{
    float: right;
  }
  .el-button--primary{
    background: #1E8B85;
  }
}

#littMap {
  width: 100%;
  height: 200px;
  //   background: burlywood;
}
</style>