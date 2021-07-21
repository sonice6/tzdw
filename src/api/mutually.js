import axios from "./axios"
import qs from "qs";
//     //电缆
let MapReq = {
    // *******************************************************************添加点线面圆***************************
    addPop: (info) => {
        return axios({
            method: "post",
            url: "http://172.23.192.201:8150/device/operateDevice ",
            data: info
        })
    },

    //******************添加截面获取数据**************************************************************************
    addjm: (info) => {
        return axios({
            method: "post",
            url: "http://172.23.192.201:8150/device/getJmTemp ",
            data: info
        })
    },



    // *******************************************************************查询获取******************************

    // 获取要素工井信息
    getRaduisFeaturePoint: (info) => {
        return axios({
            method: "post",
            // url: '/api/device/getRaduisFeature',
            url: 'http://172.23.192.201:8150/device/getRaduisFeature',
            data: {
                'coordinate': info,
                "raduis": "0.001",
                "layer": "glens_gis_gj_info_point"
            }
        })
    },
    // 获取要素管道信息
    getRaduisFeature: (info) => {
        return axios({
            method: "post",
            url: " http://172.23.192.201:8150/device/getRaduisFeature",
            data: {
                'coordinate': info,
                "raduis": "0.001",
                "layer": "glens_gis_zmsb_info_line"
            }
        })
    },
    // 获取要电缆道信息
    getDLRaduisFeature: (info) => {
        return axios({
            method: "post",
            url: " http://172.23.192.201:8150/device/getRaduisFeature",
            data: {
                'coordinate': info,
                "raduis": "0.001",
                "layer": "glens_gis_dld_info_line"
            }
        })
    },
    //查询截面信息
    getjiemhzhi: (sbid) => {
        return axios({
            method: "get",
            url: 'http://172.23.192.201:8150/device/getMsSectionInfo?sbid=' + sbid
        })
    },

    // 获取要素截面信息
    getRaduisFeatureJm: (info) => {
        return axios({
            method: "post",
            url: " http://172.23.192.201:8150/device/getRaduisFeature",
            data: {
                'coordinate': info,
                "raduis": "0.001",
                "layer": "glens_gis_jm_info_polygon"
                // "layer": "glens_gis_zmdy_info_polygon"
            }
        })
    },
    // 获取要素截埋设单元信息***********圆*******
    getRaduisFeaturemsdy: (info) => {
        return axios({
            method: "post",
            url: " http://172.23.192.201:8150/device/getRaduisFeature",
            data: {
                'coordinate': info,
                "raduis": "0.0002",
                "layer": "glens_gis_zmdy_info_polygon"
            }
        })
    },
    // ************************************************************************修改********************************
    // 修改工井
    changedPoint(info) {
        return axios({
            method: "post",
            url: " http://172.23.192.201:8150/device/operateDevice",
            data: info
        })
    },
    // 修改工井
    guanlmais(info) {
        return axios({
            method: "post",
            url: " http://172.23.192.201:8150/device/operateDevice",
            data: info
        })
    },
    //编辑节点


}
export default MapReq