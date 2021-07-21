import ol from "openlayers";
// var wmstucen = ['ditu_Default']
// line
// point
var wmstucen = ['ditu_dlgd_info_line_Default','ditu_dlsyd_info_point_Default','ditu_jm_foot_line_Default','ditu_dljt_info_point_Default','ditu_dld_info_line_Default','ditu_dl_info_line_Default','ditu_dlsd_info_line_Default','ditu_dlq_info_line_Default','ditu_dlg_info_line_Default','ditu_dgsb_info_line_Default','ditu_glgd_info_line_Default','ditu_gdsb_info_line_Default','ditu_zmsb_info_line_Default','ditu_zmdy_info_polygon_Default','ditu_jm_info_polygon_Default','ditu_gj_info_point_Default']

let allwms = {
    ALLmws:(that)=>{
        for(var i=0;i<wmstucen.length;i++){

      (that.wmsSource[i] = new ol.source.TileWMS({
        url: "http://192.168.0.66:8089/YTGIS/wms",
        params: {
          LAYERS: wmstucen[i],
          VERSION: "1.1.1",
        },
      })),
      
        (that.wmsLayer = new ol.layer.Tile({
          zIndex: 9,
          source: that.wmsSource[i],
        }));
        that.map.addLayer(that.wmsLayer);


        }
    },
    B:(that)=>{
        that.wmsLayer.setVisible(false)
    },
    C:(that)=>{
        that.wmsLayer.setVisible(true)
    }
}
export default allwms