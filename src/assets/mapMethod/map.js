import MapReq from "../../api/mutually"
import ol from "openlayers";
var fromdata = {}   //添加信息
var jmfromdata = {}   //截面模板
var sgebeijiemian = {} //电缆埋设选择埋设点
var topPoint = {} //在已有的电上加线 一端拓扑
var changePoint = {} //移动线段 两端的坐标

let map = {
  fromdatafun: (data) => {    //埋设添加信息
    fromdata = data
    console.log(fromdata);
  },
  jmfromdatafun: (data) => {  //模板信息
    jmfromdata = data
    // console.log(jmfromdata.numx,jmfromdata.numy,jmfromdata.gbzb);
  },
  somedata: (that) => {
    // that.glens()
    // console.log(fromdata,'js')
  },
  //添加点**********************************************************************
  addPoint: (zb, that) => {
    // console.log(data.bianhaoname);
    //  console.log(that.gjdataname.name,'gj');
    var arr = [{ device_type: "glens_gis_gj_info_point", list: [{ coordinate: zb, addFlag: "1", sbmc: that.gjdataname.name, updateFlag: '0' }] }]
    MapReq.addPop({ jsonObj: arr }).then((res) => {
      that.updateWms()
      that.typeSelected = 'none'
    });
  },
  //添加线 ***************************************************************************
  addLine: (zb, that) => {
    var data = []
    for (var i = 0; i < zb.length; i++) {
      var eventItem = zb[i];
      data.push(eventItem.toString().replace(",", " "));
    }
    //添加埋设线型类型
    if (fromdata.region == 1) {   //电缆直埋   
      if (fromdata.radio == '') {
        var arr = [{ device_type: "glens_gis_zmsb_info_line", list: [{ coordinate: data.toString(), addFlag: "1", sbmc: fromdata.name, updateFlag: '0' }] }]
        MapReq.addPop({ jsonObj: arr }).then((res) => {
          that.updateWms();
          that.typeSelected = 'none'
        });
      } else if (fromdata.radio == '1') {
        var bothlist = []
        data.forEach((item, i) => {
          if (i == 0) {
            bothlist.push({ sbmc: topPoint.features[0].properties.SBMC, coordinate: topPoint.features[0].geometry.coordinates.toString(), addFlag: "1", updateFlag: "0" })
          } else {
            bothlist.push({ sbmc: fromdata.bianhaoname + fromdata.starname + i + fromdata.lastname, coordinate: item.toString(), addFlag: "1", updateFlag: "0" })
          }
        })
        var listtop = []
        for (var i = 0; i <= data.length - 2; i++) {
          if (i == 0) {
            listtop.push({ sbmc: fromdata.name + (i), coordinate: (topPoint.features[0].geometry.coordinates.toString().replace(',', ' ') + ',' + data[i + 1]), topuRelation: [{ msmc: fromdata.name + (i), sbmc: topPoint.features[0].properties.SBMC, terminals: '1', gjid: topPoint.features[0].properties.SBID, layer: "glens_gis_gj_info_point" }, { msmc: fromdata.name + (i), sbmc: fromdata.bianhaoname + fromdata.starname + (i + 1) + fromdata.lastname, terminals: '2', layer: "glens_gis_gj_info_point" }], addFlag: "1", updateFlag: "0" })
          } else {
            listtop.push({ sbmc: fromdata.name + (i), coordinate: (data[i] + ',' + data[i + 1]), topuRelation: [{ msmc: fromdata.name + (i), sbmc: fromdata.bianhaoname + fromdata.starname + (i) + fromdata.lastname, terminals: '1', layer: "glens_gis_gj_info_point" }, { msmc: fromdata.name + (i), sbmc: fromdata.bianhaoname + fromdata.starname + (i + 1) + fromdata.lastname, terminals: '2', layer: "glens_gis_gj_info_point" }], addFlag: "1", updateFlag: "0" })
          }
        }
        var topconcern = [
          {
            device_type: "glens_gis_gj_info_point",
            list: bothlist
          },
          {
            device_type: "glens_gis_zmsb_info_line",
            list: listtop
          }
        ]
        MapReq.addPop({ jsonObj: topconcern }).then((res) => {
          that.updateWms();
          that.typeSelected = 'none'
        });
      } if (fromdata.radio == '2') {
        var bothlist = []
        data.forEach((item, i) => {
          bothlist.push({ sbmc: fromdata.bianhaoname + fromdata.starname + i + fromdata.lastname, coordinate: item.toString(), addFlag: "1", updateFlag: "0" })
        })
        var listtop = []
        for (var i = 0; i <= data.length - 2; i++) {
          listtop.push({ sbmc: fromdata.name + (i), coordinate: (data[i] + ',' + data[i + 1]), topuRelation: [{ msmc: fromdata.name + (i), sbmc: fromdata.bianhaoname + fromdata.starname + (i) + fromdata.lastname, terminals: '1', layer: "glens_gis_gj_info_point" }, { msmc: fromdata.name + (i), sbmc: fromdata.bianhaoname + fromdata.starname + (i + 1) + fromdata.lastname, terminals: '2', layer: "glens_gis_gj_info_point" }], addFlag: "1", updateFlag: "0" })
        }
        var topconcern = [
          {
            device_type: "glens_gis_gj_info_point",
            list: bothlist
          },
          {
            device_type: "glens_gis_zmsb_info_line",
            list: listtop
          }
        ]
        MapReq.addPop({ jsonObj: topconcern }).then((res) => {
          that.updateWms();
          that.typeSelected = 'none'
        });
      }
    } else if (fromdata.region == 2) {
      //***********只添加管道********************************************************
      if (fromdata.radio == '') {
        var arr = [{ device_type: "glens_gis_gdsb_info_line", list: [{ coordinate: data.toString(), addFlag: "1", sbmc: fromdata.name, updateFlag: '0' }], },];
        MapReq.addPop({ jsonObj: arr }).then((res) => {
          that.updateWms();
          that.typeSelected = 'none'
        });
      } else if (fromdata.radio == '1') {
        var bothlist = []
        data.forEach((item, i) => {
          if (i == 0) {
            bothlist.push({ sbmc: topPoint.features[0].properties.SBMC, coordinate: topPoint.features[0].geometry.coordinates.toString(), addFlag: "1", updateFlag: "0" })
          } else {
            bothlist.push({ sbmc: fromdata.bianhaoname + fromdata.starname + i + fromdata.lastname, coordinate: item.toString(), addFlag: "1", updateFlag: "0" })
          }
        })
        var listtop = []
        for (var i = 0; i <= data.length - 2; i++) {
          if (i == 0) {
            listtop.push({ sbmc: fromdata.name + (i), coordinate: (topPoint.features[0].geometry.coordinates.toString().replace(',', ' ') + ',' + data[i + 1]), topuRelation: [{ msmc: fromdata.name + (i), sbmc: topPoint.features[0].properties.SBMC, terminals: '1', gjid: topPoint.features[0].properties.SBID, layer: "glens_gis_gj_info_point" }, { msmc: fromdata.name + (i), sbmc: fromdata.bianhaoname + fromdata.starname + (i + 1) + fromdata.lastname, terminals: '2', layer: "glens_gis_gj_info_point" }], addFlag: "1", updateFlag: "0" })
          } else {
            listtop.push({ sbmc: fromdata.name + (i), coordinate: (data[i] + ',' + data[i + 1]), topuRelation: [{ msmc: fromdata.name + (i), sbmc: fromdata.bianhaoname + fromdata.starname + (i) + fromdata.lastname, terminals: '1', layer: "glens_gis_gj_info_point" }, { msmc: fromdata.name + (i), sbmc: fromdata.bianhaoname + fromdata.starname + (i + 1) + fromdata.lastname, terminals: '2', layer: "glens_gis_gj_info_point" }], addFlag: "1", updateFlag: "0" })
          }
        }
        var topconcern = [
          {
            device_type: "glens_gis_gj_info_point",
            list: bothlist
          },
          {
            device_type: "glens_gis_gdsb_info_line",
            list: listtop
          }
        ]
        MapReq.addPop({ jsonObj: topconcern }).then((res) => {
          that.updateWms();
          that.typeSelected = 'none'
        });
      } else if (fromdata.radio == '2') { //两端添加工井
        var bothlist = []
        data.forEach((item, i) => {
          bothlist.push({ sbmc: fromdata.bianhaoname + fromdata.starname + i + fromdata.lastname, coordinate: item.toString(), addFlag: "1", updateFlag: "0" })
        })
        var listtop = []
        for (var i = 0; i <= data.length - 2; i++) {
          listtop.push({ sbmc: fromdata.name + (i), coordinate: (data[i] + ',' + data[i + 1]), topuRelation: [{ msmc: fromdata.name + (i), sbmc: fromdata.bianhaoname + fromdata.starname + (i) + fromdata.lastname, terminals: '1', layer: "glens_gis_gj_info_point" }, { msmc: fromdata.name + (i), sbmc: fromdata.bianhaoname + fromdata.starname + (i + 1) + fromdata.lastname, terminals: '2', layer: "glens_gis_gj_info_point" }], addFlag: "1", updateFlag: "0" })
        }
        var topconcern = [
          {
            device_type: "glens_gis_gj_info_point",
            list: bothlist
          },
          {
            device_type: "glens_gis_gdsb_info_line",
            list: listtop
          }
        ]
        MapReq.addPop({ jsonObj: topconcern }).then((res) => {
          that.updateWms();
          that.typeSelected = 'none'
        });
      }
    } else if (fromdata.region == 3) {  //图层有问题***************************
      if (fromdata.radio == '') {
        var arr = [{ device_type: "glens_gis_dlgd_info_line", list: [{ coordinate: data.toString(), addFlag: "1", sbmc: fromdata.name, updateFlag: '0' }], },];
        MapReq.addPop({ jsonObj: arr }).then((res) => {
          that.updateWms();
          that.typeSelected = 'none'
        });
      } else if (fromdata.radio == '1') {
        var bothlist = []
        data.forEach((item, i) => {
          if (i == 0) {
            bothlist.push({ sbmc: topPoint.features[0].properties.SBMC, coordinate: topPoint.features[0].geometry.coordinates.toString(), addFlag: "1", updateFlag: "0" })
          } else {
            bothlist.push({ sbmc: fromdata.bianhaoname + fromdata.starname + i + fromdata.lastname, coordinate: item.toString(), addFlag: "1", updateFlag: "0" })
          }
        })
        var listtop = []
        for (var i = 0; i <= data.length - 2; i++) {
          if (i == 0) {
            listtop.push({ sbmc: fromdata.name + (i), coordinate: (topPoint.features[0].geometry.coordinates.toString().replace(',', ' ') + ',' + data[i + 1]), topuRelation: [{ msmc: fromdata.name + (i), sbmc: topPoint.features[0].properties.SBMC, terminals: '1', gjid: topPoint.features[0].properties.SBID, layer: "glens_gis_dljt_info_point" }, { msmc: fromdata.name + (i), sbmc: fromdata.bianhaoname + fromdata.starname + (i + 1) + fromdata.lastname, terminals: '2', layer: "glens_gis_dljt_info_point" }], addFlag: "1", updateFlag: "0" })
          } else {
            listtop.push({ sbmc: fromdata.name + (i), coordinate: (data[i] + ',' + data[i + 1]), topuRelation: [{ msmc: fromdata.name + (i), sbmc: fromdata.bianhaoname + fromdata.starname + (i) + fromdata.lastname, terminals: '1', layer: "glens_gis_dljt_info_point" }, { msmc: fromdata.name + (i), sbmc: fromdata.bianhaoname + fromdata.starname + (i + 1) + fromdata.lastname, terminals: '2', layer: "glens_gis_dljt_info_point" }], addFlag: "1", updateFlag: "0" })
          }
        }
        var topconcern = [
          {
            device_type: "glens_gis_dljt_info_point",
            list: bothlist
          },
          {
            device_type: "glens_gis_dlgd_info_line",
            list: listtop
          }
        ]
        MapReq.addPop({ jsonObj: topconcern }).then((res) => {
          that.updateWms();
          that.typeSelected = 'none'
        });
      } else if (fromdata.radio == '2') { //两端添加工井
        var bothlist = []
        data.forEach((item, i) => {
          bothlist.push({ sbmc: fromdata.bianhaoname + fromdata.starname + i + fromdata.lastname, coordinate: item.toString(), addFlag: "1", updateFlag: "0" })
        })
        var listtop = []
        for (var i = 0; i <= data.length - 2; i++) {
          listtop.push({ sbmc: fromdata.name + (i), coordinate: (data[i] + ',' + data[i + 1]), topuRelation: [{ msmc: fromdata.name + (i), sbmc: fromdata.bianhaoname + fromdata.starname + (i) + fromdata.lastname, terminals: '1', layer: "glens_gis_gj_info_point" }, { msmc: fromdata.name + (i), sbmc: fromdata.bianhaoname + fromdata.starname + (i + 1) + fromdata.lastname, terminals: '2', layer: "glens_gis_gj_info_point" }], addFlag: "1", updateFlag: "0" })
        }
        var topconcern = [
          {
            device_type: "glens_gis_gj_info_point",
            list: bothlist
          },
          {
            device_type: "glens_gis_dlgd_info_line",
            list: listtop
          }
        ]
        MapReq.addPop({ jsonObj: topconcern }).then((res) => {
          that.updateWms();
          that.typeSelected = 'none'
        });
      }
    } else if (fromdata.region == 4) {
      if (fromdata.radio == '') {
        var arr = [{ device_type: "glens_gis_dgsb_info_line", list: [{ coordinate: data.toString(), addFlag: "1", sbmc: fromdata.name, updateFlag: '0' }], },];
        MapReq.addPop({ jsonObj: arr }).then((res) => {
          that.updateWms();
          that.typeSelected = 'none'
        });
      } else if (fromdata.radio == '1') {
        var bothlist = []
        data.forEach((item, i) => {
          if (i == 0) {
            bothlist.push({ sbmc: topPoint.features[0].properties.SBMC, coordinate: topPoint.features[0].geometry.coordinates.toString(), addFlag: "1", updateFlag: "0" })
          } else {
            bothlist.push({ sbmc: fromdata.bianhaoname + fromdata.starname + i + fromdata.lastname, coordinate: item.toString(), addFlag: "1", updateFlag: "0" })
          }
        })
        var listtop = []
        for (var i = 0; i <= data.length - 2; i++) {
          if (i == 0) {
            listtop.push({ sbmc: fromdata.name + (i), coordinate: (topPoint.features[0].geometry.coordinates.toString().replace(',', ' ') + ',' + data[i + 1]), topuRelation: [{ msmc: fromdata.name + (i), sbmc: topPoint.features[0].properties.SBMC, terminals: '1', gjid: topPoint.features[0].properties.SBID, layer: "glens_gis_gj_info_point" }, { msmc: fromdata.name + (i), sbmc: fromdata.bianhaoname + fromdata.starname + (i + 1) + fromdata.lastname, terminals: '2', layer: "glens_gis_gj_info_point" }], addFlag: "1", updateFlag: "0" })
          } else {
            listtop.push({ sbmc: fromdata.name + (i), coordinate: (data[i] + ',' + data[i + 1]), topuRelation: [{ msmc: fromdata.name + (i), sbmc: fromdata.bianhaoname + fromdata.starname + (i) + fromdata.lastname, terminals: '1', layer: "glens_gis_gj_info_point" }, { msmc: fromdata.name + (i), sbmc: fromdata.bianhaoname + fromdata.starname + (i + 1) + fromdata.lastname, terminals: '2', layer: "glens_gis_gj_info_point" }], addFlag: "1", updateFlag: "0" })
          }
        }
        var topconcern = [
          {
            device_type: "glens_gis_gj_info_point",
            list: bothlist
          },
          {
            device_type: "glens_gis_dgsb_info_line",
            list: listtop
          }
        ]
        MapReq.addPop({ jsonObj: topconcern }).then((res) => {
          that.updateWms();
          that.typeSelected = 'none'
        });
      } else if (fromdata.radio == '2') { //两端添加工井
        var bothlist = []
        data.forEach((item, i) => {
          bothlist.push({ sbmc: fromdata.bianhaoname + fromdata.starname + i + fromdata.lastname, coordinate: item.toString(), addFlag: "1", updateFlag: "0" })
        })
        var listtop = []
        for (var i = 0; i <= data.length - 2; i++) {
          listtop.push({ sbmc: fromdata.name + (i), coordinate: (data[i] + ',' + data[i + 1]), topuRelation: [{ msmc: fromdata.name + (i), sbmc: fromdata.bianhaoname + fromdata.starname + (i) + fromdata.lastname, terminals: '1', layer: "glens_gis_gj_info_point" }, { msmc: fromdata.name + (i), sbmc: fromdata.bianhaoname + fromdata.starname + (i + 1) + fromdata.lastname, terminals: '2', layer: "glens_gis_gj_info_point" }], addFlag: "1", updateFlag: "0" })
        }
        var topconcern = [
          {
            device_type: "glens_gis_gj_info_point",
            list: bothlist
          },
          {
            device_type: "glens_gis_dgsb_info_line",
            list: listtop
          }
        ]
        MapReq.addPop({ jsonObj: topconcern }).then((res) => {
          that.updateWms();
          that.typeSelected = 'none'
        });
      }
    } else if (fromdata.region == 5) {
      if (fromdata.radio == '') {
        var arr = [{ device_type: "glens_gis_dlg_info_line", list: [{ coordinate: data.toString(), addFlag: "1", sbmc: fromdata.name, updateFlag: '0' }], },];
        MapReq.addPop({ jsonObj: arr }).then((res) => {
          that.updateWms();
          that.typeSelected = 'none'
        });
      } else if (fromdata.radio == '1') {
        var bothlist = []
        data.forEach((item, i) => {
          if (i == 0) {
            bothlist.push({ sbmc: topPoint.features[0].properties.SBMC, coordinate: topPoint.features[0].geometry.coordinates.toString(), addFlag: "1", updateFlag: "0" })
          } else {
            bothlist.push({ sbmc: fromdata.bianhaoname + fromdata.starname + i + fromdata.lastname, coordinate: item.toString(), addFlag: "1", updateFlag: "0" })
          }
        })
        var listtop = []
        for (var i = 0; i <= data.length - 2; i++) {
          if (i == 0) {
            listtop.push({ sbmc: fromdata.name + (i), coordinate: (topPoint.features[0].geometry.coordinates.toString().replace(',', ' ') + ',' + data[i + 1]), topuRelation: [{ msmc: fromdata.name + (i), sbmc: topPoint.features[0].properties.SBMC, terminals: '1', gjid: topPoint.features[0].properties.SBID, layer: "glens_gis_gj_info_point" }, { msmc: fromdata.name + (i), sbmc: fromdata.bianhaoname + fromdata.starname + (i + 1) + fromdata.lastname, terminals: '2', layer: "glens_gis_gj_info_point" }], addFlag: "1", updateFlag: "0" })
          } else {
            listtop.push({ sbmc: fromdata.name + (i), coordinate: (data[i] + ',' + data[i + 1]), topuRelation: [{ msmc: fromdata.name + (i), sbmc: fromdata.bianhaoname + fromdata.starname + (i) + fromdata.lastname, terminals: '1', layer: "glens_gis_gj_info_point" }, { msmc: fromdata.name + (i), sbmc: fromdata.bianhaoname + fromdata.starname + (i + 1) + fromdata.lastname, terminals: '2', layer: "glens_gis_gj_info_point" }], addFlag: "1", updateFlag: "0" })
          }
        }
        var topconcern = [
          {
            device_type: "glens_gis_gj_info_point",
            list: bothlist
          },
          {
            device_type: "glens_gis_dlg_info_line",
            list: listtop
          }
        ]
        MapReq.addPop({ jsonObj: topconcern }).then((res) => {
          that.updateWms();
          that.typeSelected = 'none'
        });
      } else if (fromdata.radio == '2') { //两端添加工井
        var bothlist = []
        data.forEach((item, i) => {
          bothlist.push({ sbmc: fromdata.bianhaoname + fromdata.starname + i + fromdata.lastname, coordinate: item.toString(), addFlag: "1", updateFlag: "0" })
        })
        var listtop = []
        for (var i = 0; i <= data.length - 2; i++) {
          listtop.push({ sbmc: fromdata.name + (i), coordinate: (data[i] + ',' + data[i + 1]), topuRelation: [{ msmc: fromdata.name + (i), sbmc: fromdata.bianhaoname + fromdata.starname + (i) + fromdata.lastname, terminals: '1', layer: "glens_gis_gj_info_point" }, { msmc: fromdata.name + (i), sbmc: fromdata.bianhaoname + fromdata.starname + (i + 1) + fromdata.lastname, terminals: '2', layer: "glens_gis_gj_info_point" }], addFlag: "1", updateFlag: "0" })
        }
        var topconcern = [
          {
            device_type: "glens_gis_gj_info_point",
            list: bothlist
          },
          {
            device_type: "glens_gis_dlg_info_line",
            list: listtop
          }
        ]
        MapReq.addPop({ jsonObj: topconcern }).then((res) => {
          that.updateWms();
          that.typeSelected = 'none'
        });
      }
    } else if (fromdata.region == 6) {
      if (fromdata.radio == '') {
        var arr = [{ device_type: "glens_gis_dlq_info_line", list: [{ coordinate: data.toString(), addFlag: "1", sbmc: fromdata.name, updateFlag: '0' }], },];
        MapReq.addPop({ jsonObj: arr }).then((res) => {
          that.updateWms();
          that.typeSelected = 'none'
        });
      } else if (fromdata.radio == '1') {
        var bothlist = []
        data.forEach((item, i) => {
          if (i == 0) {
            bothlist.push({ sbmc: topPoint.features[0].properties.SBMC, coordinate: topPoint.features[0].geometry.coordinates.toString(), addFlag: "1", updateFlag: "0" })
          } else {
            bothlist.push({ sbmc: fromdata.bianhaoname + fromdata.starname + i + fromdata.lastname, coordinate: item.toString(), addFlag: "1", updateFlag: "0" })
          }
        })
        var listtop = []
        for (var i = 0; i <= data.length - 2; i++) {
          if (i == 0) {
            listtop.push({ sbmc: fromdata.name + (i), coordinate: (topPoint.features[0].geometry.coordinates.toString().replace(',', ' ') + ',' + data[i + 1]), topuRelation: [{ msmc: fromdata.name + (i), sbmc: topPoint.features[0].properties.SBMC, terminals: '1', gjid: topPoint.features[0].properties.SBID, layer: "glens_gis_gj_info_point" }, { msmc: fromdata.name + (i), sbmc: fromdata.bianhaoname + fromdata.starname + (i + 1) + fromdata.lastname, terminals: '2', layer: "glens_gis_gj_info_point" }], addFlag: "1", updateFlag: "0" })
          } else {
            listtop.push({ sbmc: fromdata.name + (i), coordinate: (data[i] + ',' + data[i + 1]), topuRelation: [{ msmc: fromdata.name + (i), sbmc: fromdata.bianhaoname + fromdata.starname + (i) + fromdata.lastname, terminals: '1', layer: "glens_gis_gj_info_point" }, { msmc: fromdata.name + (i), sbmc: fromdata.bianhaoname + fromdata.starname + (i + 1) + fromdata.lastname, terminals: '2', layer: "glens_gis_gj_info_point" }], addFlag: "1", updateFlag: "0" })
          }
        }
        var topconcern = [
          {
            device_type: "glens_gis_gj_info_point",
            list: bothlist
          },
          {
            device_type: "glens_gis_dlq_info_line",
            list: listtop
          }
        ]
        MapReq.addPop({ jsonObj: topconcern }).then((res) => {
          that.updateWms();
          that.typeSelected = 'none'
        });
      } else if (fromdata.radio == '2') { //两端添加工井
        var bothlist = []
        data.forEach((item, i) => {
          bothlist.push({ sbmc: fromdata.bianhaoname + fromdata.starname + i + fromdata.lastname, coordinate: item.toString(), addFlag: "1", updateFlag: "0" })
        })
        var listtop = []
        for (var i = 0; i <= data.length - 2; i++) {
          listtop.push({ sbmc: fromdata.name + (i), coordinate: (data[i] + ',' + data[i + 1]), topuRelation: [{ msmc: fromdata.name + (i), sbmc: fromdata.bianhaoname + fromdata.starname + (i) + fromdata.lastname, terminals: '1', layer: "glens_gis_gj_info_point" }, { msmc: fromdata.name + (i), sbmc: fromdata.bianhaoname + fromdata.starname + (i + 1) + fromdata.lastname, terminals: '2', layer: "glens_gis_gj_info_point" }], addFlag: "1", updateFlag: "0" })
        }
        var topconcern = [
          {
            device_type: "glens_gis_gj_info_point",
            list: bothlist
          },
          {
            device_type: "glens_gis_dlq_info_line",
            list: listtop
          }
        ]
        MapReq.addPop({ jsonObj: topconcern }).then((res) => {
        });
      }
    } else if (fromdata.region == 7) {
      if (fromdata.radio == '') {
        var arr = [{ device_type: "glens_gis_dlsd_info_line", list: [{ coordinate: data.toString(), addFlag: "1", sbmc: fromdata.name, updateFlag: '0' }], },];
        MapReq.addPop({ jsonObj: arr }).then((res) => {
          that.updateWms();
          that.typeSelected = 'none'
        });
      } else if (fromdata.radio == '1') {
        var bothlist = []
        data.forEach((item, i) => {
          if (i == 0) {
            bothlist.push({ sbmc: topPoint.features[0].properties.SBMC, coordinate: topPoint.features[0].geometry.coordinates.toString(), addFlag: "1", updateFlag: "0" })
          } else {
            bothlist.push({ sbmc: fromdata.bianhaoname + fromdata.starname + i + fromdata.lastname, coordinate: item.toString(), addFlag: "1", updateFlag: "0" })
          }
        })
        var listtop = []
        for (var i = 0; i <= data.length - 2; i++) {
          if (i == 0) {
            listtop.push({ sbmc: fromdata.name + (i), coordinate: (topPoint.features[0].geometry.coordinates.toString().replace(',', ' ') + ',' + data[i + 1]), topuRelation: [{ msmc: fromdata.name + (i), sbmc: topPoint.features[0].properties.SBMC, terminals: '1', gjid: topPoint.features[0].properties.SBID, layer: "glens_gis_gj_info_point" }, { msmc: fromdata.name + (i), sbmc: fromdata.bianhaoname + fromdata.starname + (i + 1) + fromdata.lastname, terminals: '2', layer: "glens_gis_gj_info_point" }], addFlag: "1", updateFlag: "0" })
          } else {
            listtop.push({ sbmc: fromdata.name + (i), coordinate: (data[i] + ',' + data[i + 1]), topuRelation: [{ msmc: fromdata.name + (i), sbmc: fromdata.bianhaoname + fromdata.starname + (i) + fromdata.lastname, terminals: '1', layer: "glens_gis_gj_info_point" }, { msmc: fromdata.name + (i), sbmc: fromdata.bianhaoname + fromdata.starname + (i + 1) + fromdata.lastname, terminals: '2', layer: "glens_gis_gj_info_point" }], addFlag: "1", updateFlag: "0" })
          }
        }
        var topconcern = [
          {
            device_type: "glens_gis_gj_info_point",
            list: bothlist
          },
          {
            device_type: "glens_gis_dlsd_info_line",
            list: listtop
          }
        ]
        MapReq.addPop({ jsonObj: topconcern }).then((res) => {
          that.updateWms();
          that.typeSelected = 'none'
        });
      } else if (fromdata.radio == '2') { //两端添加工井
        var bothlist = []
        data.forEach((item, i) => {
          bothlist.push({ sbmc: fromdata.bianhaoname + fromdata.starname + i + fromdata.lastname, coordinate: item.toString(), addFlag: "1", updateFlag: "0" })
        })
        var listtop = []
        for (var i = 0; i <= data.length - 2; i++) {
          listtop.push({ sbmc: fromdata.name + (i), coordinate: (data[i] + ',' + data[i + 1]), topuRelation: [{ msmc: fromdata.name + (i), sbmc: fromdata.bianhaoname + fromdata.starname + (i) + fromdata.lastname, terminals: '1', layer: "glens_gis_gj_info_point" }, { msmc: fromdata.name + (i), sbmc: fromdata.bianhaoname + fromdata.starname + (i + 1) + fromdata.lastname, terminals: '2', layer: "glens_gis_gj_info_point" }], addFlag: "1", updateFlag: "0" })
        }
        var topconcern = [
          {
            device_type: "glens_gis_gj_info_point",
            list: bothlist
          },
          {
            device_type: "glens_gis_dlsd_info_line",
            list: listtop
          }
        ]
        MapReq.addPop({ jsonObj: topconcern }).then((res) => {
          that.updateWms();
          that.typeSelected = 'none'
        });
      }
    }
    //test 电缆
    if (that.dltest) {
      // var arr = [{device_type: "glens_gis_dld_info_line",list: [{ coordinate: data.toString(), addFlag: "1",sbmc:fromdata.name,updateFlag:'0'}],},];
      // MapReq.addPop({ jsonObj: arr }).then((res) => {
      //   that.updateWms();
      //   that.typeSelected = 'none'
      //   that.dltest = false
      // });

      var bothlist = []
      data.forEach((item, i) => {
        bothlist.push({ sbmc: i + 'dl', coordinate: item.toString(), addFlag: "1", updateFlag: "0" })
      })
      var listtop = []
      for (var i = 0; i <= data.length - 2; i++) {
        listtop.push({ sbmc: i + 'dl', coordinate: (data[i] + ',' + data[i + 1]), topuRelation: [{ msmc: i + 'dl', sbmc: i + 'dld', terminals: '1', layer: "glens_gis_gj_info_point" }, { msmc: i + 'dl', sbmc: (i + 1) + 'dld', terminals: '2', layer: "glens_gis_gj_info_point" }], addFlag: "1", updateFlag: "0" })
      }
      var topconcern = [
        {
          device_type: "glens_gis_dljt_info_point",
          list: bothlist
        },
        {
          device_type: "glens_gis_dld_info_line",
          list: listtop
        }
      ]
      MapReq.addPop({ jsonObj: topconcern }).then((res) => {
        that.updateWms();
        that.typeSelected = 'none'
        that.dltest = false
      });
    }
    // that.updateWms();
    // that.typeSelected = 'none'
    that.isGetRaduisFeature = 'none'
    fromdata = {}
  },
  //添加截面和埋设单元******************************************************************
  addPolygon: (zb, that) => {
    //请求查看线
    MapReq.getRaduisFeature(zb).then((res) => {
      let data = res.data.data.data
      if (data.features.length > 0) {
        // console.log(data.features[0].properties.SBID);
        that.jmgdmc = data.features[0].properties.SBID
        //查到线
        that.gdCoordinate = zb.toString(); //获取管道添加的点
        MapReq.getjiemhzhi(that.jmgdmc).then((res) => {
          console.log(res.data.data.data.jm.features.length);   //判断是否有截面
          if (res.data.data.data.jm.features.length > 0) {
            that.$message('该设备已添加截面')
            that.addPolygon = false     //退出添加截面
            console.log('已有');
          } else {
            that.$emit('jmtc')
          }
        })
      } else {
        //未查到
        if (that.jmmbsl.gbzb) {
          that.coordinate = zb.toString(); //获取添加截面的位置
        } else {
          that.$message('点击坐标有误，请重新选择')
          that.addPolygon = false     //退出添加截面

        }
      }
      //判断条件
      if (that.addPolygon && that.gdCoordinate != "" && that.coordinate != "") {
        var pamers = {
          gdCoordinate: that.gdCoordinate,
          coordinate: that.coordinate,
          specs: that.jmmbsl.numx + '#' + that.jmmbsl.numy,
          distance: "0.0015",
          radius: "50",
        };
        MapReq.addjm(pamers).then((res) => {  //添加的埋设单元圆

          let data = res.data.data.data;    //获取面，圆，线参数

          var jm = { device_type: "glens_gis_jm_info_polygon", list: [{ coordinate: data.jm, addFlag: "1", sbmc: 'jiemian', ssms: that.jmgdmc }] };
          var jm_foot = { device_type: "glens_gis_jm_foot_line", list: [{ coordinate: data.hmFooter, addFlag: "1" }] };
          var zm_list = [];

          for (var i = 0; i < data.msdy.length; i++) {
            zm_list.push({
              coordinate: data.msdy[i].toString(),
              zmdyoid: "1",
              addFlag: "1",
              sbmc: "msdy" + i
            });
          }
          var zmdy = { device_type: "glens_gis_zmdy_info_polygon", list: zm_list };
          var json = { jsonObj: [jm, jm_foot, zmdy] }
          MapReq.addPop(json).then((res) => {
            that.updateWms()
            that.jmgdmc = ''
          });
          //  添加的引脚线



          // var hmFooterarr = [
          //   {
          //     device_type: "glens_gis_jm_foot_line",
          //     list: [{ coordinate: data.hmFooter, addFlag: "1" }],
          //   },
          // ];




          // MapReq.addPop({ jsonObj: hmFooterarr }).then((res) => {});
          // // 添加圆
          // var list = [];
          // for (var i = 0; i < data.msdy.length; i++) {
          //   list.push({
          //     coordinate: data.msdy[i],
          //     zmdyoid: "1",
          //     addFlag: "1",
          //     sbcm:i
          //   });
          // }


          // var Circlelist = [
          //   { device_type: "glens_gis_zmdy_info_polygon", list: list },
          // ];
          // MapReq.addPop({ jsonObj: Circlelist }).then((res) => {
          //   that.updateWms()
          //   });
        })
        that.addPolygon = false
      }
    })
  },
  //查询点*****************************************************************************
  QueryPoint: (zb, that) => {
    console.log(zb);
    MapReq.getRaduisFeaturePoint(zb).then((res) => {
      let data = res.data.data.data
      if (data.features.length > 0) {
        //获取rid****************
        that.gjrid = data.features[0].properties.rid
        //已有的一端加线，获取已有的点信息
        topPoint = data
        //  console.log(topPoint);
        //  console.log(data.features[0].properties.rid,'js');
        data.features.forEach((element) => {
          new ol.format.GeoJSON().readFeatures(element).forEach((element1) => {
            that.drawLayer["Point"].getSource().addFeature(element1);
          });
        });

        if (that.delePoint) {  //删除点
          var delePoint = [
            {
              device_type: "glens_gis_gj_info_point",
              list: [{ rid: that.gjrid, addFlag: "3" }],
            },
          ];
          MapReq.addPop({ jsonObj: delePoint }).then((res) => {
            if (
              res.data.data.data.glens_gis_gj_info_point.totalDeleted == "1") {
              that.$message({ message: "删除成功", type: "success" });
              that.delePoint = false
              that.isGetRaduisFeature == "none"
            }
            // that.updateWms();
          });
          that.updateWms();
        }
        //判断只加一条线
        if (fromdata.radio == '1') {
          that.typeSelected = 'LineString'
        }
      } else {
        that.$message({ message: '请选择端点', type: 'warning' });
        fromdata = {}
      }
    })
  },
  //查询线*****************************************************************************
  QueryLine: (zb, that) => {
    if (that.dlglms) {  //添加电联关联埋设
      if (that.dldowngd == 'dl') {
        MapReq.getDLRaduisFeature(zb).then((res) => {
          let data = res.data.data.data
          if (data.features.length > 0) {
            data.features.forEach((element) => {
              new ol.format.GeoJSON().readFeatures(element).forEach((element1) => {
                that.drawLayer["LineString"].getSource().addFeature(element1)
              })
            })
            that.dlid = data.features[0].properties.SBID
            sgebeijiemian.dlid = data.features[0].properties.SBID //****电缆设备名称
            // console.log(data.features[0].geometry.coordinates[0],'电缆坐标');//
            var dldata = []
            for (var i = 0; i < data.features[0].geometry.coordinates[0].length; i++) {
              var eventItem = data.features[0].geometry.coordinates[0][i];
              dldata.push(eventItem.toString().replace(",", " "));
            }
            that.dldcoordinate = dldata.toString()
            sgebeijiemian.dldcoordinate = dldata.toString() // ******************电缆坐标***********************
            // console.log(that.dldcoordinate,'电缆坐标');
            // console.log(that.dlid,'电缆id');
            that.dldowngd = 'gd'   //查询管道
            // that.$parent.jmszshow()
            // console.log(data.features[0].properties.SBID,'电缆');
          } else {
            that.$message({ message: '未查询到电缆信息', type: 'warning' });
          }
        })
      }
      if (that.dldowngd == 'gd') {
        // console.log('查询管道');
        MapReq.getRaduisFeature(zb).then((res) => {
          let data = res.data.data.data
          if (data.features.length > 0) {
            data.features.forEach((element) => {
              new ol.format.GeoJSON().readFeatures(element).forEach((element1) => {
                that.drawLayer["LineString"].getSource().addFeature(element1)
              })
            })
            that.gdID = data.features[0].properties.SBID
            sgebeijiemian.gdID = data.features[0].properties.SBID   //*********管道设备名称*********/

            var gddata = []
            for (var i = 0; i < data.features[0].geometry.coordinates[0].length; i++) {
              var eventItem = data.features[0].geometry.coordinates[0][i];
              gddata.push(eventItem.toString().replace(",", " "));
            }
            that.mscoordinate = gddata.toString()
            sgebeijiemian.mscoordinate = gddata.toString() //********管道坐标************** */
            // console.log(that.gdID,'管道ID');
            // console.log(that.mscoordinate,'电缆坐标');
            ////////电缆信息截面查询

            MapReq.getjiemhzhi(data.features[0].properties.SBID).then((res) => {
              // console.log(res.data.data.data);
              // that.$emit("jmszshow",res.data.data.data)
              // console.log(res.data.data.data.jm.features);
              if (res.data.data.data.jm.features.length < 1) {
                that.$message('请先添加截面')
                window.updateWms()
                that.isGetRaduisFeature = 'none'
                that.dlglms = false     //取消关联埋设
                that.dldowngd = 'dl'   //先查询电缆
              } else {
                that.$emit("jmszshow", res.data.data.data)
              }
            })
          } else {
            that.isGetRaduisFeature = 'none'
            that.dlglms = false     //取消关联埋设
            that.dldowngd = 'dl'   //先查询电缆
            that.$message({ message: '未查询到管道信息', type: 'warning' });
          }
        })
      }
    }
    //取消电缆关联埋设
    if (that.canceldlglms) {
      // console.log('获取关联埋设'); 
      MapReq.getDLRaduisFeature(zb).then((res) => {
        let data = res.data.data.data
        if (data.features.length > 0) {
          data.features.forEach((element) => {
            new ol.format.GeoJSON().readFeatures(element).forEach((element1) => {
              that.drawLayer["LineString"].getSource().addFeature(element1)
            })
          })
          that.canceSBID = data.features[0].properties.SBID
          // console.log(that.canceSBID);
          MapReq.addPop({ jsonObj: [{ device_type: "cancel_dl_threading", list: [], dldId: that.canceSBID }] }).then((res) => {
            that.updateWms()
            that.canceldlglms = false
            that.isGetRaduisFeature = 'none'
            console.log('取消关联埋设');
          })
        } else {
          that.canceldlglms = false
          that.$message({ message: '未查询到信息', type: 'warning' });
        }
      })
    }
    if (that.maishepohtos) {  //查看剖面图
      MapReq.getRaduisFeature(zb).then((res) => {  //查询管道信息
        let data = res.data.data.data
        if (data.features.length > 0) {
          data.features.forEach((element) => {
            new ol.format.GeoJSON().readFeatures(element).forEach((element1) => {
              that.drawLayer["LineString"].getSource().addFeature(element1)
            })
          })
        }
        //  console.log(data.features[0].properties.SBID,'设备ID');
        MapReq.getjiemhzhi(data.features[0].properties.SBID).then((res) => {
          if (res.data.data.data.jm.features.length < 1) {
            that.$message('该设备未添加截面')
            window.updateWms()
            that.isGetRaduisFeature = 'none'
            that.maishepohtos = false //退出
          } else {
            that.$emit("jmszshow", res.data.data.data)
          }
        })
      })

    }  //查看埋设刨面图  ------------------------
    //点击线，查看两端点
    if (that.nodecomp) {
      MapReq.getRaduisFeature(zb).then((res) => {    ///查询的线,修改两端的点
        let data = res.data.data.data
        changePoint.linerid = data.features[0].properties.rid  //修改节点，线的rid
        if (data.features.length > 0) {
          // 获取线段两端坐标
          changePoint.zb1 = []
          changePoint.zb2 = []
          changePoint.zb1.push(data.features[0].geometry.coordinates[0][0])
          changePoint.zb2.push(data.features[0].geometry.coordinates[0][1])
          MapReq.getRaduisFeaturePoint(data.features[0].geometry.coordinates[0][0].toString()).then((res) => {  //查询的点
            let data = res.data.data.data
            // console.log(data.features[0].properties.rid,'rid');
            if (data.features.length > 0) {
              if (data.features.length > 0) {
                changePoint.zb1.push(data.features[0].properties.rid)
              }
              data.features.forEach((element) => {
                changePoint.zb1.push(element.id)
                new ol.format.GeoJSON().readFeatures(element).forEach((element1) => {
                  that.drawLayer["Point"].getSource().addFeature(element1);
                });
              });
            }
          })
          MapReq.getRaduisFeaturePoint(data.features[0].geometry.coordinates[0][1].toString()).then((res) => {  //查询的点
            let data = res.data.data.data
            if (data.features.length > 0) {
              if (data.features.length > 0) {
                changePoint.zb2.push(data.features[0].properties.rid)
              }
              data.features.forEach((element) => {
                changePoint.zb2.push(element.id)
                new ol.format.GeoJSON().readFeatures(element).forEach((element1) => {
                  that.drawLayer["Point"].getSource().addFeature(element1);
                });
              });
            }
          })
        } else {
          that.$message('未查询到设备')
        }
      })
    }
  },
  //查询截面*****************************************************************************
  QueryPolygon: (zb, that) => {
    MapReq.getRaduisFeatureJm(zb).then((res) => {
      let data = res.data.data.data
      if (data.features.length > 0) {
        data.features.forEach((element) => {
          new ol.format.GeoJSON().readFeatures(element).forEach((element1) => {
            that.drawLayer["Polygon"].getSource().addFeature(element1)
          })
        })
      } else {
        that.$message({ message: '未查询到信息', type: 'warning' });
      }
    })
  },
  //查询埋设单元*************************************************************************
  QueryCircle: (zb, that) => {
    MapReq.getRaduisFeaturemsdy(zb).then((res) => {
      let data = res.data.data.data
      if (data.features.length > 0) {
        data.features.forEach((element) => {
          new ol.format.GeoJSON().readFeatures(element).forEach((element1) => {
            that.drawLayer["NewCircle"].getSource().addFeature(element1)
          })
        })
        sgebeijiemian.dlsydsbmc = data.features[0].properties.SBMC   //电缆埋设选择的单元
        sgebeijiemian.dlsydzb = zb   //电缆埋设选择的单元
      } else {
        that.$message({ message: '未查询到单元信息', type: 'warning' });
      }
    })
  },

  changedLinePoint(zb, id, that) {   //修改节点，线线
    if (changePoint.zb2[2] == id) {
      // console.log(changePoint.zb2[1]);
      var arr = [{ device_type: "glens_gis_zmsb_info_line", list: [{ coordinate: changePoint.zb1[0].toString().replace(",", " ") + ',' + zb.toString().replace(",", " "), addFlag: "2", rid: changePoint.linerid, updateFlag: '0' }], },];
      var changePoineArr = [{ device_type: "glens_gis_gj_info_point", list: [{ rid: changePoint.zb2[1], coordinate: zb.toString(), addFlag: "2", },], },];
    } else {
      // console.log(zb,'移动后1');
      var arr = [{ device_type: "glens_gis_zmsb_info_line", list: [{ coordinate: changePoint.zb2[0].toString().replace(",", " ") + ',' + zb.toString().replace(",", " "), addFlag: "2", rid: changePoint.linerid, updateFlag: '0' }], },];
      var changePoineArr = [{ device_type: "glens_gis_gj_info_point", list: [{ rid: changePoint.zb1[1], coordinate: zb.toString(), addFlag: "2", },], },];
    }
    MapReq.addPop({ jsonObj: arr }).then((res) => {
      MapReq.addPop({ jsonObj: changePoineArr }).then((res) => {
        that.updateWms()
        that.isGetRaduisFeature = 'none'
        that.nodecomp = false   //退出节点编辑
      })
    })

  },
  //确定按钮  关联埋设
  suerglms(that) {
    var glms = [
      { device_type: "glens_gis_dlsyd_info_point", list: [{ sbmc: sgebeijiemian.dlsydsbmc, coordinate: sgebeijiemian.dlsydzb, addFlag: '1', updateFlag: '0' }] }, { device_type: "add_dl_threading", list: [{ dldId: sgebeijiemian.dlid, dldcoordinate: sgebeijiemian.dldcoordinate, msId: sgebeijiemian.gdID, mscoordinate: sgebeijiemian.mscoordinate, addFlag: '1', updateFlag: '0' }] }];

    // console.log(sgebeijiemian,'电缆段id');
    MapReq.guanlmais({ jsonObj: glms }).then((res) => {
      sgebeijiemian = {}      //清空埋设数据
      window.updateWms()
    })
  },
  //埋设电缆取消按钮
  cencalglms(that) {
    sgebeijiemian = {}      //清空埋设数据
    that.updateWms()
    window.updateWms()
  }
}
export default map;