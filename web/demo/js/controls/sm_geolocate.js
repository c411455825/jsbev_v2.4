/**
 * Class: SuperMap.Bev.Geolocate
 * 定位功能。
 */
(function () {
    SuperMap.Bev.Class.create(
        "SuperMap.Bev.Geolocate",
        {
            /**
             * APIProperty: body
             * {HTMLElement} 父容器
             */
            body:null,

            /**
             * APIProperty: map
             * {SuperMap.Map} map对象
             */
            map:null,

            /**
             * APIProperty: locationIcon
             * {String} 定位按钮图标路径
             */
            locationIcon:null,

            /**
             * APIProperty: h_locationIcon
             * {String} 定位按钮hover图标路径
             */
            h_locationIcon:null,

            /**
             * Property: locationIconOffsetX
             * {Number} 定位按钮图标x方向偏移量
             */
            //locationIconOffsetX:null,

            /**
             * Property: locationIconOffsetY
             * {Number} 定位按钮图标y方向偏移量
             */
            //locationIconOffsetY:null,

            /**
             * APIProperty: clearIcon
             * {String} 清除按钮图标路径
             */
            clearIcon:null,

            /**
             * APIProperty: h_clearIcon
             * {String} 清除按钮hover图标路径
             */
            h_clearIcon:null,

            /**
             * Property: clearIconOffsetX
             * {Number} 清除按钮图标x方向偏移量
             */
            //clearIconOffsetX:null,

            /**
             * Property: clearIconOffsetY
             * {Number} 清除按钮图标y方向偏移量
             */
            //clearIconOffsetY:null,

            /**
             * Property: geoMarker_bev
             * {SuperMap.Layer.Markers} 定位图标图层
             */
            geoMarker_bev:new SuperMap.Layer.Markers("geoMarker_bev"),

            /**
             * Property: geolocateControl
             * {Object} 地理定位控件
             */
            geolocateControl:null,

            /**
             * Constructor: SuperMap.Bev.Geolocate
             * 实例化 Geolocate 类。
             *
             * Parameters:
             * option - {Object} 参数对象
             *
             * Examples:
             * (code)
             *  myGeolocate = new SuperMap.Bev.Geolocate({
             *      "body":$("<div>"),  //{DOMElement} 页面上装载该控件的容器
             *      "map":map           //{SuperMap.Map} 地图对象。
             *  });
             * (end)
             */
            init:function (option) {
                this.locationIcon = SuperMap.Bev.Util.getImgPath("geolocate_16_16.png");
                this.h_locationIcon = SuperMap.Bev.Util.getImgPath("h_geolocate_16_16.png");
                this.clearIcon = SuperMap.Bev.Util.getImgPath("clear_16_16.png");
                this.h_clearIcon = SuperMap.Bev.Util.getImgPath("h_clear_16_16.png");

                for(var key in option){
                    this[key] = option[key];
                }

                this.map.addLayer(this.geoMarker_bev);
                this.create();
                this.createControl();
                this.map.addControl(this.geolocateControl);
            },

            /**
             * Method: create
             * 创建该控件的dom对象。
             */
            create:function () {
                var me = this,b1,b2;
                if(this.body){
                    b1 = $("<button>地理定位</button>").button({
                        icons:{
                            primary:"ui-icon-locked"
                        }
                    }).click(function () {
                            me.geolocateMe();
                        }).appendTo(this.body);

                    var btn = b1.button("option","buttonElement");
                    var icon = btn.children(".ui-icon");
                    if(this.locationIcon){
                        icon.css({
                            "background":"url("+this.locationIcon+")"
                        });
                    }

                    if(this.h_locationIcon){
                        b1.mouseover(function(icon){
                           return function(){
                               icon.css({
                                   "background":"url("+me.h_locationIcon+")"
                               });
                           }
                        }(icon))
                            .mouseout(function(icon){
                               return function(){
                                   icon.css({
                                       "background":"url("+me.locationIcon+")"
                                   });
                               }
                            }(icon));
                    }

                    b2 = $("<button>清除标记</button>").button({
                        icons:{
                            primary:"ui-icon-locked"
                        }
                    }).click(function () {
                            me.clearGeoMarkers();
                        }).appendTo(this.body);

                    var btn1 = b2.button("option","buttonElement");
                    var icon = btn1.children(".ui-icon");
                    if(this.clearIcon){
                        icon.css({
                            "background":"url("+this.clearIcon+")"
                        });
                    }

                    if(this.h_clearIcon){
                        b2.mouseover(function(icon){
                            return function(){
                                icon.css({
                                    "background":"url("+me.h_clearIcon+")"
                                });
                            }
                        }(icon))
                            .mouseout(function(icon){
                                 return function(){
                                     icon.css({
                                         "background":"url("+me.clearIcon+")"
                                     });
                                 }
                            }(icon));
                    }

                    window.setTimeout(function(){
                        btn&&btn[0].blur();
                    },30)
                }
            },

            /**
             * APIMethod: geolocateMe
             * 激活定位控件。
             */
            geolocateMe:function () {
                this.geolocateControl.deactivate();
                this.geolocateControl.activate();
            },

            /**
             * Method: createControl
             * 创建定位控件。
             */
            createControl:function () {
                var me = this;
                me.geolocateControl = new SuperMap.Control.Geolocate({
                    bind:false,
                    geolocationOptions:{
                        enableHighAccuracy:false,
                        maximumAge:0
                    },
                    eventListeners:{
                        "locationupdated":me.getGeolocationCompleted,
                        "locationfailed":me.getGeolocationFailed
                    }
                });
            },

            /**
             * Method: getGeolocationCompleted
             * 定位完成执行操作。
             */
            getGeolocationCompleted:function (event) {
                var lonLat = new SuperMap.LonLat(event.point.x, event.point.y);
                var size = new SuperMap.Size(44, 33),
                    offset = new SuperMap.Pixel(-(size.w / 2), -size.h),
                    icon = new SuperMap.Icon("demo/theme/images/marker.png", size, offset);
                this.map.getLayersByName("geoMarker_bev")[0].addMarker(new SuperMap.Marker(lonLat, icon));
                this.map.setCenter(lonLat);
            },

            /**
             * Method: getGeolocationFailed
             * 定位失败执行操作。
             */
            getGeolocationFailed:function (e) {
                alert("当前状态无法定位");
            },

            /**
             * APIMethod: destroy
             * 销毁。
             */
            destroy:function () {
                this.map.getLayersByName("geoMarker_bev")[0].clearMarkers();
                this.map.removeLayer(this.map.getLayersByName("geoMarker_bev")[0]);
                this.map.removeControl(this.geolocateControl);
            },

            /**
             * APIMethod: clearGeoMarkers
             * 清除定位标记。
             */
            clearGeoMarkers:function(){
                this.map.getLayersByName("geoMarker_bev")[0].clearMarkers();
                this.geolocateControl.deactivate();
            },

            /**
             * APIMethod: deactivate
             * 注销该控件。
             */
            deactivate:function () {
                this.geolocateControl.deactivate();
            }
        }
    );
})()