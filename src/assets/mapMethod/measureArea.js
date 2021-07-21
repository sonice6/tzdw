import ol from "openlayers";

export default {
    initMeasure(map, type) {
        var source = new ol.source.Vector();
        var vector;
        var sketch;
        var helpTooltipElement;
        var helpTooltip;
        var measureTooltipElement;
        var measureTooltip;
        var wgs84Sphere = new ol.Sphere(6378137);
        var continuePolygonMsg = '继续点击绘制多边形';
        var continueLineMsg = '继续点击绘制线';

        vector = new ol.layer.Vector({
            id: 'lineAndArea',
            source: source,
            style: new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(255,255,255,0.2)'
                }),
                stroke: new ol.style.Stroke({
                    color: 'red',
                    width: 2
                }),
                image: new ol.style.Circle({
                    radius: 5,
                    stroke: new ol.style.Stroke({
                        color: 'rgba(0,0,0,0.7)'
                    }),
                    fill: new ol.style.Fill({
                        color: 'rgba(255,255,255,0.2)'
                    })
                })
            }),
        });
        map.addLayer(vector);

        // //清楚测量
        // var claerceli = function () {
        //     map.removeLayer(vector)
        // }
        var pointerMoveHandler = function (evt) {
            if (evt.dragging) {
                return;
            }
            /** @type {string} */
            var helpMsg = '请点击开始绘制';

            if (sketch) {
                var geom = sketch.getGeometry();
                if (geom instanceof ol.geom.Polygon) {
                    helpMsg = continuePolygonMsg;
                } else if (geom instanceof ol.geom.LineString) {
                    helpMsg = continueLineMsg;
                }
            }
            helpTooltipElement.innerHTML = helpMsg;
            helpTooltip.setPosition(evt.coordinate);
            helpTooltipElement.classList.remove('hidden');
        };
        var draw;  //格式化测量长度
        var formatLength = function (line) {
            //定义长度变量
            var length;
            //如果大地测量复选框被勾选，则计算球面距离
            //获取坐标串
            var coordinates = line.getCoordinates();
            //初始长度为0
            length = 0;
            //获取源数据的坐标系
            var sourceProj = map.getView().getProjection();
            //进行点的坐标转换
            for (var i = 0; i < coordinates.length - 1; i++) {
                //第一个点
                var c1 = ol.proj.transform(coordinates[i], sourceProj, 'EPSG:4326');
                //第二个点
                var c2 = ol.proj.transform(coordinates[i + 1], sourceProj, 'EPSG:4326');
                //获取转换后的球面距离
                //Returns the distance from c1 to c2 using the haversine formula.
                length += wgs84Sphere.haversineDistance(c1, c2);
            }
            //定义输出变量
            var output;
            //如果长度大于1000，则使用km单位，否则使用m单位
            if (length > 1000) {
                output = (Math.round(length / 1000 * 100) / 100) + ' ' + 'km'; //换算成KM单位
            } else {
                output = (Math.round(length * 100) / 100) + ' ' + 'm'; //m为单位
            }
            return output;
        };
        //格式化测量面积
        var formatArea = function (polygon) {
            //定义面积变量
            var area;
            //获取初始坐标系
            var sourceProj = map.getView().getProjection();
            var geom = polygon.clone().transform(sourceProj, 'EPSG:4326');
            //获取多边形的坐标系
            var coordinates = geom.getLinearRing(0).getCoordinates();
            //获取球面面积
            area = Math.abs(wgs84Sphere.geodesicArea(coordinates));
            //定义输出变量
            var output;
            //当面积大于10000时，转换为平方千米，否则为平方米
            if (area > 10000) {
                output = (Math.round(area / 1000000 * 100) / 100) + ' ' + 'km<sup>2</sup>';
            } else {
                output = (Math.round(area * 100) / 100) + ' ' + 'm<sup>2</sup>';
            }
            return output;
        };
        function addInteraction(map, measureType) {
            draw = new ol.interaction.Draw({
                source: source,
                type: measureType,
                style: new ol.style.Style({
                    fill: new ol.style.Fill({
                        color: 'rgba(255,255,255,0.2)'
                    }),
                    stroke: new ol.style.Stroke({
                        color: 'rgba(0,0,0,0.5)',
                        lineDash: [10, 10],
                        width: 2
                    }),
                    image: new ol.style.Circle({
                        radius: 5,
                        stroke: new ol.style.Stroke({
                            color: 'rgba(0,0,0,0.7)'
                        }),
                        fill: new ol.style.Fill({
                            color: 'rgba(255,255,255,0.2)'
                        })
                    })
                })
            });
            map.addInteraction(draw);
            createMeasureTooltip();
            createHelpTooltip();
            var listener;
            draw.on('drawstart',
                function (evt) {
                    sketch = evt.feature;
                    var tooltipCoord = evt.coordinate;
                    listener = sketch.getGeometry().on('change', function (evt) {
                        var geom = evt.target;
                        var output;
                        if (geom instanceof ol.geom.Polygon) {
                            output = formatArea(geom);
                            tooltipCoord = geom.getInteriorPoint().getCoordinates();
                        } else if (geom instanceof ol.geom.LineString) {
                            output = formatLength(geom);
                            tooltipCoord = geom.getLastCoordinate();
                        }
                        measureTooltipElement.innerHTML = output;
                        measureTooltip.setPosition(tooltipCoord);
                    });
                }, this);

            draw.on('drawend',
                function () {
                    measureTooltipElement.className = 'tooltip tooltip-static';
                    measureTooltip.setOffset([0, -7]);
                    // unset sketch
                    sketch = null;
                    // unset tooltip so that a new one can be created
                    measureTooltipElement = null;
                    createMeasureTooltip();
                    ol.Observable.unByKey(listener);
                    map.un('pointermove', pointerMoveHandler);
                    map.removeInteraction(draw);
                    helpTooltipElement.classList.add('hidden');
                    map.removeOverlay(helpTooltip);
                }, this);
            map.on('pointermove', pointerMoveHandler);
            map.getViewport().addEventListener('mouseout', function () {
                helpTooltipElement.classList.add('hidden');
            });
        }
        function createHelpTooltip() {
            if (helpTooltipElement) {
                helpTooltipElement.parentNode.removeChild(helpTooltipElement);
            }
            helpTooltipElement = document.createElement('div');
            helpTooltipElement.className = 'tooltip hidden';
            helpTooltip = new ol.Overlay({
                element: helpTooltipElement,
                offset: [15, 0],
                positioning: 'center-left'
            });
            map.addOverlay(helpTooltip);
        }
        function createMeasureTooltip() {
            if (measureTooltipElement) {
                measureTooltipElement.parentNode.removeChild(measureTooltipElement);
            }
            measureTooltipElement = document.createElement('div');
            measureTooltipElement.className = 'tooltip tooltip-measure';
            measureTooltip = new ol.Overlay({
                element: measureTooltipElement,
                offset: [0, -15],
                positioning: 'bottom-center'
            });
            map.addOverlay(measureTooltip);
        }

        function AddInteraction(measureType) {
            addInteraction(map, measureType);
        }

        function Clear() {
            map.getOverlays().clear();
            vector.getSource().clear();

        }

        if (vector.getSource()) {
            Clear()
        }
        AddInteraction(type)

    }
}

