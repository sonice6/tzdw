<template>
  <div class="Mapp">
    <el-collapse-transition>
      <div class="chooesclick" v-show="choestuc">
        <span class="chooestuc">选择图层</span><br />
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
          >全选</el-checkbox
        >
        <div style="margin: 15px 0"></div>

        <el-checkbox-group
          v-model="checkedCities"
          @change="handleCheckedCitiesChange"
        >
          <el-checkbox v-for="city in cities" :label="city" :key="city">{{
            city
          }}</el-checkbox>
        </el-checkbox-group>
      </div>
    </el-collapse-transition>

    <div id="map" />
    <div class="allchoos">
      <div class="ChanLay" @click="ditu">
        <img v-if="!ditushow" src="@/assets/img/gongju_bg_def.png" />
        <img v-if="ditushow" src="@/assets/img/gongju_bg_celect.png" />
      </div>
      <div class="choose" v-show="ditushow">
        <div @click="ChaLay('影像')">
          <img src="@/assets/img/yingxinag_pic.png" />
        </div>
        <div @click="ChaLay('地图')">
          <img src="@/assets/img/ditu_pic.png" />
        </div>
      </div>
    </div>
    <div class="toolbox">
      <div @click="toolbox">
        <img
          v-show="!this.toolstype"
          src="@/assets/img/gongjuxiang_btn_def.png"
        />
        <img
          v-show="this.toolstype"
          src="@/assets/img/gongjuxiang_btn_select.png"
        />
      </div>
      <div>
        <el-collapse-transition>
          <ul v-show="this.toolstype">
            <li><img src="../../assets/img/icon_gaoliang.png" /> 清除高亮</li>
            <li @click="outzoom">
              <img src="../../assets/img/icon_fangda.png" /> 地图放大
            </li>
            <li @click="inzoom">
              <img src="../../assets/img/icon_suoxiao.png" /> 地图缩小
            </li>
            <li @click="alltu">
              <img src="../../assets/img/icon_quantu.png" /> 全图
            </li>
            <li @click="celi">
              <img src="../../assets/img/icon_liangju.png" /> 量具
            </li>
            <li><img src="../../assets/img/icon_dayin.png" /> 区域打印</li>
            <li><img src="../../assets/img/icon_dingwei.png" />坐标定位</li>
            <li><img src="../../assets/img/icon_zhuanhuan.png" />坐标转换</li>
            <li @click="lineshow">
              <img src="../../assets/img/icon_tuceng.png" />图层控制
            </li>
            <li><img src="../../assets/img/icon_tuceng.png" />当前电缆</li>
            <li><img src="../../assets/img/icon_tuceng.png" />管道走向</li>
            <li><img src="../../assets/img/icon_tuceng.png" />截面归属</li>
          </ul>
        </el-collapse-transition>
      </div>
    </div>
    <div class="dws">
      <!-- <button @click="updateWms">刷新</button> -->
      <!-- <button @click="change('none')">无</button>
      <button @click="change('Point')">点</button>
      <button @click="change('LineString')">线</button>
      <button @click="change('Polygon')">面</button>
      <button @click="change('Circle')">圆</button>
      <br />
      <button @click="getRaduisFeature('none')">停止查询</button>
      <button @click="getRaduisFeature('Point')">查询点</button>
      <button @click="getRaduisFeature('LineString')">查询线</button>
      <button @click="getRaduisFeature('Polygon')">查询面</button>
      <button @click="getRaduisFeature('Circle')">查询埋设单元</button>
      <br />
      <button @click="getFeature">查询编辑要素</button>
      <br />
      <button @click="addMoveInteraction">拖拽要素</button>
      <br />
      <button @click="removeMoveInteraction">取消拖拽要素</button>-->
    </div>
  </div>
</template>

<script>
import "ol/ol.css";
import ol from "openlayers";
import { getArea, getLength } from "ol/sphere.js";
import { unByKey } from "ol/Observable.js";
import $ from "jquery";
// import Bus from "@/Bus/bus.js";
import MapReq from "@/api/mutually.js";
// import addPolygonVue from "../dialog/addPolygon.vue";
//地图方法
import MapMet from "../../assets/mapMethod/map.js";
//绘制
import Measure from "../../assets/mapMethod/measureArea.js";

//循环wms图层
// import WmsAllLayers from "../../assets/mapMethod/wmsLayers.js";
const cityOptions = [
  "电缆直埋",
  "电缆管道（管道）",
  "电缆管道（过路管道）",
  "顶管",
  "电缆沟",
  "电缆桥",
  "电缆隧道",
];
export default {
  props: {
    formData: {
      //添加类型
      type: Object,
      default() {
        return {};
      },
    },
    jmmbsl: {
      //截面模板
      type: Object,
      default() {
        // return {};
      },
    },
    gjdataname: {
      //截面模板
      type: Object,
      default() {
        // return {};
      },
    },
  },
  data() {
    return {
      checkAll: true,
      checkedCities: [
        "电缆直埋",
        "电缆管道（管道）",
        "电缆管道（过路管道）",
        "顶管",
        "电缆沟",
        "电缆桥",
        "电缆隧道",
      ],
      cities: cityOptions,
      isIndeterminate: false,
      wmstucen: [
        "ditu_dlsyd_info_point_Default", //红点点
        //   "ditu_dlgd_info_line_Default", //电缆管道
        "ditu_jm_foot_line_Default", //截面引脚

        "ditu_dljt_info_point_Default",
        "ditu_dld_info_line_Default",
        //   "ditu_dl_info_line_Default",

        //  "ditu_dlsd_info_line_Default",
        // "ditu_dlq_info_line_Default",
        //   "ditu_dlg_info_line_Default",

        //  "ditu_dgsb_info_line_Default",
        // "ditu_dlgd_info_line_Default",
        // "ditu_gdsb_info_line_Default",

        "ditu_zmsb_info_line_Default",
        "ditu_zmdy_info_polygon_Default",
        "ditu_jm_info_polygon_Default",
        "ditu_gj_info_point_Default",
      ],
      // centerDialogVisible: true,//确认弹窗
      choestuc: false, //切换

      ditushow: false, //图层切换
      toolstype: false, //工具箱
      map: null, //地图
      wmsLayer: {}, //矢量
      wmsSource: {}, //矢量图图层
      wxmap: {}, //卫星
      jiufengWMTS: {}, //2D
      drawLayer: {},
      appD: null,
      draw: null,
      modify: null,
      snap: null,
      typeSelected: "none", //地图绘画类型
      isGetRaduisFeature: "none", //查看类型
      dqhlinedata: null, //电气化线路图层
      //wms图层控制
      // wmslayershow:'ditu_Default',
      wmsShow: true,

      //修改工井
      gjrid: "",
      gjcoordinate: "",
      Movgjcoordinateid: "", //编辑节点储存id
      // changPoint:false,  //修改点
      //添加截面
      addPolygon: false,
      gdCoordinate: "", //管道坐标
      coordinate: "", // 空地坐标
      jmgdmc: "", //管道名称

      //删除工井
      delePoint: false,
      //节点编辑状态
      nodecomp: false,
      //绘制两端加点
      bothPoint: true,

      //电缆关联埋设
      dlglms: false,
      dldowngd: "dl", //查询完电缆，查询管道
      dlid: "", //电缆ID
      dldcoordinate: null, //电缆坐标
      gdID: "", //管道id
      mscoordinate: null, //管道坐标
      //取消电缆关联埋设
      canceldlglms: false, //取消关联埋设
      canceSBID: "", //设备ID
      //查看埋设刨面图
      maishepohtos: false,
      //test 电缆
      dltest: false,
      measureObj: null,
      //电气台账查看
      electrical: false,
    };
  },
  mounted() {
    //禁止右键
    document.oncontextmenu = function () {
      return false;
    };

    this.mapInitNoLayer(); //地图初始化

    this.addPop(); //点击web点击事件
    this.addline(); //工具图层
    this.addInteraction();
    this.moveendzoom(); //监听地图放缩大小监听
    this.dqhline(); //电气化线路
    window.updateWms = this.updateWms; //刷新注册到window
  },
  methods: {
    //全选图层
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
      if (this.checkedCities.length < 1) {
        for (var i = 0; i < this.wmstucen.length; i++) {
          this.wmsLayer[i].setVisible(false);
        }
      } else {
        for (var i = 0; i < this.wmstucen.length; i++) {
          this.wmsLayer[i].setVisible(true);
        }
      }
    },
    //单个图层
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
      // console.log(this.checkedCities,'2');
      // console.log(this.checkedCities.indexOf('电缆直埋'));

      if (this.checkedCities.indexOf("电缆直埋") == -1) {
        this.wmsLayer[12].setVisible(false);
      } else {
        this.wmsLayer[12].setVisible(true);
      }
      if (this.checkedCities.indexOf("电缆管道（管道）") == -1) {
        this.wmsLayer[1].setVisible(false);
      } else {
        this.wmsLayer[1].setVisible(true);
      }
      if (this.checkedCities.indexOf("电缆管道（过路管道）") == -1) {
        this.wmsLayer[0].setVisible(false);
      } else {
        this.wmsLayer[0].setVisible(true);
      }
      if (this.checkedCities.indexOf("顶管") == -1) {
        this.wmsLayer[9].setVisible(false);
      } else {
        this.wmsLayer[9].setVisible(true);
      }
      if (this.checkedCities.indexOf("电缆沟") == -1) {
        this.wmsLayer[8].setVisible(false);
      } else {
        this.wmsLayer[8].setVisible(true);
      }
      if (this.checkedCities.indexOf("电缆桥") == -1) {
        this.wmsLayer[7].setVisible(false);
      } else {
        this.wmsLayer[7].setVisible(true);
      }
      if (this.checkedCities.indexOf("电缆隧道") == -1) {
        this.wmsLayer[6].setVisible(false);
      } else {
        this.wmsLayer[6].setVisible(true);
      }

      // for(var i=0;i<this.checkedCities.length;i++){

      //   }
    },
    //测量
    celi() {
      console.log(this.map);
      Measure.initMeasure(this.map, "Polygon"); // Polygon/LineString
      console.log("测量");
    },
    // 查看全图
    alltu() {
      this.map.getView().setCenter([120.05242466926575, 32.461509704589844]);
      this.map.getView().setZoom(11);
      // //获取地图当前视图
      // var view = map.getView();
      // //指定要平移到的位置的坐标
      // var position = ol.proj.fromLonLat([120.0616192817688, 32.45738983154297]);
      // //重设地图中心点，实现平移
      // view.setCenter(position);
    },
    //图层控制
    lineshow() {
      // this.wmsLayer.setVisible(this.wmsShow = !this.wmsShow)
      this.choestuc = !this.choestuc;
      // WmsAllLayers.B(this)
    },
    dws() {
      // console.log('dws');
    },
    // 放大
    inzoom() {
      var view = this.map.getView();
      var zoom = view.getZoom();
      view.setZoom(zoom - 1);
    },
    // 缩小
    outzoom() {
      var view = this.map.getView();
      //获取地图当前缩放等级
      var zoom = view.getZoom();
      //每单击一次地图的缩放等级减一，以实现地图缩小
      view.setZoom(zoom + 1);
    },
    // change(e) {  //test类型
    //   this.typeSelected = e;
    // },
    //图层放缩回调
    moveendzoom() {
      var that = this;
      map.on("moveend", function (e) {
        var zoom = map.getView().getZoom(); //获取当前地图的缩放级别
        console.log(zoom);
        if (zoom >= 12) {
          console.log(that.electrical);
          // tianjinlayer.getSource().clear(); //控制地图图层不可见
        } else {
          console.log(that.electrical);
          //  addTianjinSource("./areajson/tianjin.geojson",tianjinlayer);   //重新加载地图图层
        }
      });
    },
    //地图初始化
    mapInitNoLayer() {
      //地图显示区域范围（默认给84坐标系最大范围）
      var tileExtent = [-180.0, -90.0, 180.0, 90.0];
      //地图范围
      var extent = [-180.0, -90.0, 180.0, 90.0];
      this.jiufengWMTS = new ol.layer.Tile({
        //平面
        source: new ol.source.XYZ({
          projection: "EPSG:4326",
          tileGrid: ol.tilegrid.createXYZ({ extent: extent }),
          tileUrlFunction: function (tileCoord, pixelRatio, proj) {
            return (
              "http://172.23.192.201:8089/YTGIS/tms/tz18dz/tz18dz/" +
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
      this.wxmap = new ol.layer.Tile({
        //卫星
        source: new ol.source.XYZ({
          projection: "EPSG:4326",
          tileGrid: ol.tilegrid.createXYZ({ extent: extent }),
          tileUrlFunction: function (tileCoord, pixelRatio, proj) {
            return (
              "http://172.23.192.201:8089/YTGIS/tms/tz18yx/tz18yx/" +
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
        visible: false,
      });
      //初始化地图对象
      this.map = new ol.Map({
        target: "map",
        // layers: [],
        layers: [this.jiufengWMTS, this.wxmap],
        view: new ol.View({
          projection: ol.proj.get("EPSG:4326"),
          extent: tileExtent,
          center: [119.953339, 32.466693],
          zoom: 14,
          minZoom: 12,
          maxZoom: 20,
        }),
        controls: ol.control.defaults({
          zoom: false,
          rotate: false,
          attribution: false,
        }),
      });
      window.map = this.map;

      this.wmsditu(); //wms图层

      // var context = new ol.overlay({
      //   element: document.getElementById("map")
      // })
      // this.map.addOverlay(context)
      this.contextmenu(this.map); //右键
    },
    //电气化线路图层
    dqhline() {
      var sourceData = new ol.source.ImageWMS({
        url: "http://fq2.gisserver.js.sgcc.com.cn:32080/gisserver/rest/gis/MapServer/export/json",
        serverType: "geoserver",
        imageLoadFunction: function (image, src) {
          var BBOX = map.getView().calculateExtent();
          var bboxstr = BBOX[0] + "," + BBOX[1] + "," + BBOX[2] + "," + BBOX[3];
          var url =
            "http://fq2.gisserver.js.sgcc.com.cn:32080/gisserver/rest/gis/MapServer/export/json/?mapId=110&format=png&layers=101000%2C102000%2C103000%2C110000%2C111000%2C112000%2C113000%2C114000%2C115000%2C116000%2C117000%2C118000%2C119000%2C120000%2C121000%2C130000%2C140000%2C150000%2C160000%2C170000%2C180000%2C201000%2C202000%2C203000%2C205000%2C206000%2C207000%2C209000%2C210000%2C220000%2C300000%2C301000%2C302000%2C303000%2C304000%2C305000%2C306000%2C307000%2C308000%2C309000%2C311000%2C312000%2C313000%2C314000%2C315000%2C316000%2C317000%2C318000%2C319000%2C320000%2C321000%2C322000%2C330000%2C333000%2C339000%2C340000%2C345000%2C350000%2C360000%2C361000%2C370000%2C390000%2C391000&layerDefs=&displaySchemaId=&mapScale=62.57017025265134&versionId=0&size=1500%2C851&bbox=" +
            bboxstr +
            "&position=front&updateInterval=150&opacity=1&visible=true&crossOrigin=true&attribute=null&interactive=false&alt=&name=dynamicLayer4&showRenderTime=false&params=%5Bobject%20Object%5D&maxZoom=undefined&minZoom=undefined&pane=overlayPane&nonBubblingEvents=&attribution=null";
          if (map.getView().getZoom() > 16) {
            $.ajax({
              url: url,
              dataType: "json",
              type: "get",
              async: true,
              success: function (res) {
                if (res.success) {
                  image.getImage().src =
                    "data:image/png;base64," + res.resultValue;
                }
              },
              error: function (e) {},
            });
          }
        },
      });
      this.dqhlinedata = new ol.layer.Image({
        source: sourceData,
      });

      this.map.addLayer(this.dqhlinedata);
    },
    //wms图层
    wmsditu() {
      // WmsAllLayers.ALLmws(this)
      // *************************************
      for (var i = 0; i < this.wmstucen.length; i++) {
        (this.wmsSource[i] = new ol.source.TileWMS({
          url: "http://172.23.192.201:8089/YTGIS/wms",
          params: {
            LAYERS: this.wmstucen[i],
            VERSION: "1.1.1",
          },
        })),
          (this.wmsLayer[i] = new ol.layer.Tile({
            zIndex: 9,
            source: this.wmsSource[i],
          }));
        this.map.addLayer(this.wmsLayer[i]);
        // this.wmsLayer[i].setVisible(false);
      }
      // *************************************
      // this.wmsLayer[1].setVisible(true)
      // console.log(this.wmsLayer);
      // ************************************************
      // wms矢量图层
      // (this.wmsSource = new ol.source.TileWMS({
      //   url: "http://172.23.192.201:8089/YTGIS/wms",
      //   params: {
      //     LAYERS: "ditu_Default",
      //     // LAYERS:this.wmslayershow,
      //     VERSION: "1.1.1",
      //   },
      //   // transition: 0,
      // })),
      //   //wms矢量图层
      //   (this.wmsLayer = new ol.layer.Tile({
      //     zIndex: 9,
      //     source: this.wmsSource,
      //   }));
      // this.map.addLayer(this.wmsLayer);
      // ************************************************
      // this.wmsLayer.setMap(this.map); //非托管层 显示最上面
      // this.wmsLayer.setVisible(false)
    },
    addPop() {
      //地图点击事件
      this.map.on("click", (evt) => {
        var coodinate = evt.coordinate;
        // console.log(coodinate);
        // 判断是否获取要素模式**************************************************************************查询要素*************
        if (this.isGetRaduisFeature != "none") {
          if (this.isGetRaduisFeature == "Point") {
            //查询点
            MapMet.QueryPoint(`${coodinate[0]},${coodinate[1]}`, this);
          } else if (this.isGetRaduisFeature == "LineString") {
            //查询线
            MapMet.QueryLine(`${coodinate[0]},${coodinate[1]}`, this);
          } else if (this.isGetRaduisFeature == "Polygon") {
            //查询截面
            MapMet.QueryPolygon(`${coodinate[0]},${coodinate[1]}`, this);
          } else if (this.isGetRaduisFeature == "Circle") {
            //查询埋设单元
            MapMet.QueryCircle(`${coodinate[0]},${coodinate[1]}`, this);
          }
        }
        //添加截面埋设单元
        if (this.addPolygon) {
          MapMet.addPolygon(`${coodinate[0]},${coodinate[1]}`, this);
          // console.log(`${coodinate[0]},${coodinate[1]}`);
        }
        //电气台账查看
        if (this.map.getView().getZoom() > 16) {
          // console.log("zoom");
          if (this.electrical) {
            console.log(coodinate);
          }
        }
      });
    },
    //新增点图层
    addline() {
      this.drawLayer.Point = new ol.layer.Vector({
        source: new ol.source.Vector(),
        style: new ol.style.Style({
          image: new ol.style.Icon({
            // anchor:[ 0.5,0.5], //点图片偏移量
            // anchor: markSettings.markAnchor, //点图片偏移量
            //   crossOrigin: 'anonymous',
            src: "http://172.23.192.201:8080/dist/a.png", // 图片路径
          }),
        }),
      });
      //新增线图层
      this.drawLayer.LineString = new ol.layer.Vector({
        source: new ol.source.Vector(),
        style: new ol.style.Style({
          // 设置线颜色\宽度
          stroke: new ol.style.Stroke({
            width: 3,
            color: "red",
          }),
        }),
      });
      //新增面图层
      this.drawLayer.Polygon = new ol.layer.Vector({
        source: new ol.source.Vector(),
        style: new ol.style.Style({
          // 设置线颜色\宽度
          stroke: new ol.style.Stroke({
            width: 3,
            color: "#119aff",
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
            color: "red",
          }),
          // 图形区域内颜色
          fill: new ol.style.Fill({
            color: "yellow",
          }),
        }),
      });
      for (let i in this.drawLayer) {
        this.map.addLayer(this.drawLayer[i]);
      }
    },
    //地图绘制            添加点线面
    addInteraction() {
      //地图绘制
      if (this.typeSelected !== "none") {
        this.draw = new ol.interaction.Draw({
          source: this.drawLayer[this.typeSelected].getSource(),
          type: this.typeSelected,
          stopClick: true, // 绘制时停止点击事件
        });
        this.modify = new ol.interaction.Modify({
          // 编辑工具
          source: this.drawLayer[this.typeSelected].getSource(),
        });
        map.addInteraction(this.modify);
        this.map.addInteraction(this.draw);
        this.snap = new ol.interaction.Snap({
          source: this.drawLayer[this.typeSelected].getSource(),
        });
        map.addInteraction(this.snap);
        //数据获取*********************************************************************
        this.draw.on("drawend", (e) => {
          if (e.feature != null) {
            // console.log(e.feature.getGeomet
            var data = [];
            var jm = [];
            //添加点**************************************************************************************添加点添加点添加点添点添加点************
            //外部js  加点
            if (this.typeSelected == "Point") {
              MapMet.addPoint(
                e.feature.getGeometry().getCoordinates().toString(),
                this
              );
            }

            if (this.typeSelected == "LineString") {
              // console.log('绘制线');
              MapMet.addLine(e.feature.getGeometry().getCoordinates(), this);
            }
            // 添加面*************************************************************************************添加面添加面添加面添加面加面*************
            if (this.typeSelected == "Polygon") {
              e.feature
                .getGeometry()
                .getCoordinates()[0]
                .forEach((element) => {
                  jm.push(element.toString().replace(",", " "));
                });
              var arr = [
                {
                  device_type: "dws_gis_jm_info_polygon",
                  list: [{ coordinate: jm.toString(), addFlag: "1" }],
                },
              ];
              MapReq.addPop({ jsonObj: arr }).then((res) => {
                this.updateWms();
              });
            }
          }
        });
      }
    },
    //刷新图层
    updateWms() {
      console.log("刷新");
      // for (let i in this.drawLayer) {
      //   this.map.removeLayer(this.drawLayer[i]);
      // }

      for (var i = 0; i < this.wmstucen.length; i++) {
        // console.log(this.wmstucen[i]);
        this.wmsSource[i].updateParams({
          LAYERS: this.wmstucen[i],
          VERSION: "1.1.1",
          s: new Date(),
        });
      }

      // ***********************************************
      // this.wmsSource.updateParams({
      //   LAYERS: "ditu_Default",
      //   VERSION: "1.1.1",
      //   s: new Date(),
      // });
      for (let i in this.drawLayer) {
        this.drawLayer[i].getSource().clear();
      }
      // ***********************************************
      //  this.drawLayer.Point.getSource().clear()
    },
    //停止绘制
    removeInteraction(a) {
      this.map.removeInteraction(this.draw);
    },
    //地图切换
    ditu() {
      this.ditushow = !this.ditushow;
    },
    //切换图层
    ChaLay(val) {
      this.stylemap = val;
      if (val == "影像") {
        this.jiufengWMTS.setVisible(false);
        this.wxmap.setVisible(true);
      } else {
        this.wxmap.setVisible(false);
        this.jiufengWMTS.setVisible(true);
      }
      this.ditushow = false; //地图切换菜单
    },
    // 工具箱
    toolbox() {
      this.toolstype = !this.toolstype;
      if (this.toolstype) {
      } else {
        this.choestuc = false;
      }
    },
    //获取要素信息状态
    getRaduisFeature(val) {
      this.isGetRaduisFeature = val;
    },
    //编辑完成获取数据*******************************************************************获取编辑后的数据*********************
    getFeature() {
      Object.values(this.drawLayer).forEach((element) => {
        let features = element.getSource().getFeatures();
        features.forEach((element1) => {
          this.gjcoordinate = element1.getGeometry().getCoordinates();
          this.Movgjcoordinateid = element1.c; //id
        });
      });
    },
    //拖动交互
    addMoveInteraction() {
      var app = {};
      /**
       * @constructor
       * @extends {ol.interaction.Pointer}
       */
      app.Drag = function () {
        ol.interaction.Pointer.call(this, {
          handleDownEvent: app.Drag.prototype.handleDownEvent,
          handleDragEvent: app.Drag.prototype.handleDragEvent,
          handleMoveEvent: app.Drag.prototype.handleMoveEvent,
          handleUpEvent: app.Drag.prototype.handleUpEvent,
        });
        /**
         * @type {ol.Pixel}
         * @private
         */
        this.coordinate_ = null;
        /**
         * @type {string|undefined}
         * @private
         */
        this.cursor_ = "pointer";
        /**
         * @type {ol.Feature}
         * @private
         */
        this.feature_ = null;
        /**
         * @type {string|undefined}
         * @private
         */
        this.previousCursor_ = undefined;
      };
      ol.inherits(app.Drag, ol.interaction.Pointer);
      /**
       * @param {ol.MapBrowserEvent} evt Map browser event.
       * @return {boolean} `true` to start the drag sequence.
       */
      app.Drag.prototype.handleDownEvent = function (evt) {
        var map = evt.map;
        var feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
          return feature;
        });

        if (feature) {
          this.coordinate_ = evt.coordinate;
          this.feature_ = feature;
        }

        return !!feature;
      };
      /**
       * @param {ol.MapBrowserEvent} evt Map browser event.
       */
      app.Drag.prototype.handleDragEvent = function (evt) {
        var deltaX = evt.coordinate[0] - this.coordinate_[0];
        var deltaY = evt.coordinate[1] - this.coordinate_[1];

        var geometry = this.feature_.getGeometry();
        geometry.translate(deltaX, deltaY);

        this.coordinate_[0] = evt.coordinate[0];
        this.coordinate_[1] = evt.coordinate[1];
      };
      /**
       * @param {ol.MapBrowserEvent} evt Event.
       */
      app.Drag.prototype.handleMoveEvent = function (evt) {
        if (this.cursor_) {
          var map = evt.map;
          var feature = map.forEachFeatureAtPixel(
            evt.pixel,
            function (feature) {
              return feature;
            }
          );
          var element = evt.map.getTargetElement();
          if (feature) {
            if (element.style.cursor != this.cursor_) {
              this.previousCursor_ = element.style.cursor;
              element.style.cursor = this.cursor_;
            }
          } else if (this.previousCursor_ !== undefined) {
            element.style.cursor = this.previousCursor_;
            this.previousCursor_ = undefined;
          }
        }
      };
      /**
       * @return {boolean} `false` to stop the drag sequence.
       */
      var that = this;
      app.Drag.prototype.handleUpEvent = function () {
        //拖动回调
        // console.log('拖动');************************************拖动完后触发******
        if (that.isGetRaduisFeature == "Point") {
          that.getFeature(); //获取移动数据
          //   console.log(this.gjcoordinate.toString().replace(","," "));
          //   console.log(this.gjrid);
          var arr = [
            {
              device_type: "dws_gis_gj_info_point",
              list: [
                {
                  rid: that.gjrid,
                  coordinate: that.gjcoordinate.toString().replace(",", " "),
                  addFlag: "2",
                },
              ],
            },
          ];
          MapReq.changedPoint({ jsonObj: arr }).then((res) => {
            // console.log(res.data.data.data.dws_gis_gj_info_point);
            if (res.data.data.data.dws_gis_gj_info_point.totalUpdated == "1") {
              that.$message({ message: "移动成功", type: "success" });
            }
            that.updateWms(); //刷新
            that.isGetRaduisFeature = "none";
          });
          //     // **************************************************右键修改点***********************
        }

        //移动设备编辑节点
        that.getFeature();
        // console.log(that.gjcoordinate);
        if (that.nodecomp) {
          MapMet.changedLinePoint(
            that.gjcoordinate,
            that.Movgjcoordinateid,
            that
          );
        }

        this.coordinate_ = null;
        this.feature_ = null;
        return false;
      };
      this.appD = new app.Drag();
      this.map.addInteraction(this.appD);
    },
    //取消拖动交互
    removeMoveInteraction() {
      this.map.removeInteraction(this.appD);
    },
    //鼠标右键*********************************************************右键*************
    contextmenu(map) {
      var that = this;
      $(map.getViewport()).on("contextmenu", function (event) {
        // var coordinate = map.getEventCoordinate(event.originalEvent)
        // context.setPosition(coordinate)
        // console.log(event.originalEvent);
        //  右键取消绘画
        // that.removeInteraction();
        //  that.updateWms(); //刷新
        //  console.log(event);
        //  that.centerDialogVisible = true
        // **************************************************右键修改点***********************
        // if (that.isGetRaduisFeature == "Point") {
        //   that.getFeature(); //获取移动数据
        //   // console.log(that.gjcoordinate.toString().replace(","," "));
        //   // console.log(that.gjrid);
        //   var arr = [{device_type: "dws_gis_gj_vo_point",list: [{rid: that.gjrid,coordinate: that.gjcoordinate.toString().replace(",", " "),addFlag: "2",},],},];
        //   MapReq.changedPoint({ jsonObj: arr }).then((res) => {
        //     if (res.data.data.data.dws_gis_gj_vo_point.totalUpdated == "1") {
        //       that.$message({ message: "移动成功", type: "success" });
        //     }

        //     that.isGetRaduisFeature = 'none'
        //   });
        //     // **************************************************右键修改点***********************
        // }
        //  else if (that.isGetRaduisFeature == "LineString") {
        //   // that.typeSelected = 'LineString'
        //   // console.log('LineString');
        // }
        //删除工井
        if (that.delePoint) {
          that.$message({ message: "停止删除", type: "success" });
          that.delePoint = false;
          that.isGetRaduisFeature = "none";
        }
      });
    },
  },
  watch: {
    //埋设方式传过来的数据
    formData: {
      handler(Data) {
        // console.log(Data);
        //值传给map.js
        MapMet.fromdatafun(Data); //传值给map.js
      },
      deep: true,
      immediate: false,
    },
    //截面传过来的数据
    jmmbsl: {
      handler(data) {
        // console.log(data,'截面');
        MapMet.jmfromdatafun(data); //传值给map.js
      },
      deep: true,
      immediate: false,
    },
    //工井传过来的数据
    gjdataname: {
      handler(data) {},
      deep: true,
      immediate: false,
    },
    //绘画类型 调用
    typeSelected(val) {
      this.removeInteraction(); //停止绘画
      this.addInteraction(); //地图绘画
    },
    // this.view.getZoom(){}
  },
  created() {
    // MapMet.somedata(this)
    // Bus.$on("lsitId", (e) => {
    // console.log(e);
    // if (e == 1) {
    //   //移动设备
    //   this.removeInteraction()
    //   this.typeSelected = 'none'
    //   this.isGetRaduisFeature = 'Point'
    //   this.addMoveInteraction()
    // }else if(e ==4 ){
    //   console.log('删除设备');
    //   this.isGetRaduisFeature = 'Point'
    //   //删除判断
    //   this.delePoint = true
    // }else if(e == 6){
    //   //节点编辑
    //   this.removeInteraction()
    //    this.updateWms() //刷新
    //    this.isGetRaduisFeature = 'LineString'
    //    this.removeMoveInteraction() //停止拖动
    //    this.nodecomp = true
    // }else if(e == 7){
    //   //添加截面
    //   //  this.removeInteraction()
    //    this.isGetRaduisFeature = 'LineString'
    //    this.addPolygon = true
    // }
    // });
  },
  beforeDestroy() {},
};
</script>
<style lang="scss" scoped>
.chooesclick {
  width: 180px;
  height: 300px;
  position: fixed;
  top: 30%;
  right: 11%;
  z-index: 999;
  background: rgb(255, 255, 255);
  .chooestuc {
    width: 100%;
    height: 35px;
    background: #007471;
    display: block;
    color: white;
    font-size: 18px;
    padding-top: 5px;
    box-sizing: border-box;
  }
  .el-checkbox-group {
    width: 50px;
    padding: 0 10px;
  }
  .el-checkbox {
    margin: 4px 0;
  }
}
.Mapp {
  width: 100%;
  height: 100%;
  position: relative;
  user-select: none;
}
#map {
  width: 100%;
  height: 100%;
}
.popup-content {
  width: 20px;
  height: 20px;
  /* background-image: url("../../assets/image/Nanjin/dot2.png"); */
  // background: brown;
  background-size: 100% 100%;
}
.allchoos {
  position: absolute;
  top: 1%;
  right: 5%;
}
.choose {
  position: absolute;
  top: 90%;
  right: -50%;
  width: 120px;
  height: 60px;
  background: rgb(255, 255, 255);
  border-radius: 5px;
  box-shadow: rgba(228, 223, 223, 0.5) 0 0 0 3px;
  display: flex;
  justify-content: space-between;
}
.choose div {
  width: 60px;
  height: 100%;
  float: left;
  box-sizing: border-box;
  padding: 5px;
  overflow: hidden;
  border-radius: 5%;
  cursor: pointer;
}
.choose div img {
  width: 100%;
  height: 100%;
}
.ChanLay {
  /* position: absolute;
  top: 3%;
  right: 5%; */
  width: 60px;
  height: 60px;
  cursor: pointer;
}
.ChanLay img {
  width: 100%;
  height: 100%;
}
.toolbox {
  position: absolute;
  top: 14.5%;
  right: 5%;
  // width: 60px;
  // height: 60px;
  // background: turquoise;
  div:nth-child(1) {
    width: 60px;
    height: 60px;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
    }
  }
  div:nth-child(2) {
    position: absolute;
    top: 87%;
    right: -25%;
    ul {
      width: 100px;
      // height: 100px;
      background: rgb(255, 255, 255);
      border-radius: 2%;
      margin: 0;
      padding: 8% 5%;
      box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.3);
      li {
        // background: white;
        width: 80%;
        height: 20px;
        margin: 5px 8px !important;
        font-size: 14px;
        text-align: left;
        list-style: none;
        color: #666666;
        margin: 0 auto;
        cursor: pointer;
        img {
          margin-right: 5px;
        }
      }
      li:hover {
        // background: #c6ebea;
      }
    }
  }
}
.dws {
  position: absolute;
  top: 20%;
  left: 0%;
  text-align: left;
  //  width: 100px;
  //  height: 50%;
}
.el-button--primary {
  background: #1e8b85;
}
.el-dialog__body {
  span {
    font-size: 18px;
    font-weight: 600;
    // text-align: center;
  }
  /**
  * 提示框的样式信息
  */
  .tooltip {
    position: relative;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    color: white;
    padding: 4px 8px;
    opacity: 0.7;
    white-space: nowrap;
  }

  .tooltip-measure {
    opacity: 1;
    font-weight: bold;
  }

  .tooltip-static {
    background-color: #ffffff;
    color: black;
    border: 1px solid white;
  }

  .tooltip-measure:before,
  .tooltip-static:before {
    border-top: 6px solid rgba(0, 0, 0, 0.5);
    border-right: 6px solid transparent;
    border-left: 6px solid transparent;
    content: "";
    position: absolute;
    bottom: -6px;
    margin-left: -7px;
    left: 50%;
  }

  .tooltip-static:before {
    border-top-color: #ffffff;
  }

  .popup-content {
    background: #fff;
    padding: 3px;
  }
  .ol-popup-closer {
    position: absolute;
    top: 2px;
    right: 8px;
  }
  .ol-popup-closer:after {
    content: "x";
    color: #fff;
  }
}
</style>