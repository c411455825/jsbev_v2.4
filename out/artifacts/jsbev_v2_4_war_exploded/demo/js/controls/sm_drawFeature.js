/**
 * Class: SuperMap.Bev.DrawFeature
 * 绘制要素功能。
 */
(function () {
    SuperMap.Bev.Class.create(
        "SuperMap.Bev.DrawFeature",
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
             * APIProperty: pointIcon
             * {String} 绘制点按钮图标路径
             */
            pointIcon:null,

            /**
             * APIProperty: h_pointIcon
             * {String} 绘制点按钮hover图标路径
             */
            h_pointIcon:null,

            /**
             * Property: pointIconOffsetX
             * {Number} 绘制点按钮图标X偏移量
             */
            //pointIconOffsetX:null,

            /**
             * Property: pointIconOffsetY
             * {Number} 绘制点按钮图标Y偏移量
             */
            //pointIconOffsetY:null,

            /**
             * APIProperty: lineIcon
             * {String} 绘制线按钮图标路径
             */
            lineIcon:null,

            /**
             * APIProperty: h_lineIcon
             * {String} 绘制线按钮hover图标路径
             */
            h_lineIcon:null,

            /**
             * Property: lineIconOffsetX
             * {Number} 绘制线按钮图标X偏移量
             */
            //lineIconOffsetX:null,

            /**
             * Property: lineIconOffsetY
             * {Number} 绘制线按钮图标Y偏移量
             */
            //lineIconOffsetY:null,

            /**
             * APIProperty: areaIcon
             * {String} 绘制面按钮图标路径
             */
             areaIcon:null,

            /**
             * APIProperty: h_areaIcon
             * {String} 绘制面按钮hover图标路径
             */
            h_areaIcon:null,

            /**
             * Property: areaIconOffsetX
             * {Number} 绘制面按钮图标X偏移量
             */
            //areaIconOffsetX:null,

            /**
             * Property: areaIconOffsetY
             * {Number} 绘制面按钮图标Y偏移量
             */
            //areaIconOffsetY:null,

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
             * {Number} 清除按钮图标X偏移量
             */
            //clearIconOffsetX:null,

            /**
             * Property: clearIconOffsetY
             * {Number} 清除按钮图标Y偏移量
             */
            //clearIconOffsetY:null,

            /**
             * Property: geoMarker_bev
             * {SuperMap.Layer.Vector} 矢量要素图层
             */
            drFeVector_bev:new SuperMap.Layer.Vector("drFeVector_bev"),

            /**
             * Property: geolocateControl
             * {Object} 要素绘制控件
             */
            drawFeatureControls:null,

            /**
             * Constructor: SuperMap.Bev.DrawFeature
             * 实例化 DrawFeature 类。
             *
             * Parameters:
             * option - {Object} 参数对象
             *
             * Examples:
             * (code)
             *  myDrawFeature = new SuperMap.Bev.DrawFeature({
             *      "body":$("<div>"),        //{DOMElement} 页面上装载该控件的容器
             *      "map":map                 //{SuperMap.Map} 地图对象。
             *  });
             * (end)
             */
            init:function (option) {
                this.pointIcon = SuperMap.Bev.Util.getImgPath("drawpoint_16_16.png");
                this.lineIcon = SuperMap.Bev.Util.getImgPath("drawline_16_16.png");
                this.areaIcon = SuperMap.Bev.Util.getImgPath("drawarea_16_16.png");
                this.clearIcon = SuperMap.Bev.Util.getImgPath("clear_16_16.png");

                this.h_pointIcon = SuperMap.Bev.Util.getImgPath("h_drawpoint_16_16.png");
                this.h_lineIcon = SuperMap.Bev.Util.getImgPath("h_drawline_16_16.png");
                this.h_areaIcon = SuperMap.Bev.Util.getImgPath("h_drawarea_16_16.png");
                this.h_clearIcon = SuperMap.Bev.Util.getImgPath("h_clear_16_16.png");

                for(var key in option){
                    this[key] = option[key];
                }
                this.setMap(this.map);
                this.create();
                //this.createControl();
            },

            /**
             * APIMethod: setMap
             * 设置map参数
             */
            setMap:function(map){
                if(map){
                    this.map = map;
                    this.map.addLayer(this.drFeVector_bev);
                    this.createControl();
                }
            },

            /**
             * Method: create
             * 创建该控件的dom对象。
             */
            create:function () {
                var me = this,b1,b2,b3,b4;
                b1 = $("<button id='point'>绘制点</button>").button({
                    icons:{
                        primary:"ui-icon-locked"
                    }
                }).click(function (e) {
                        me.drawFeature(e);
                    }).appendTo(this.body);

                var btn1 = b1.button("option","buttonElement");
                var icon = btn1.children(".ui-icon");
                if(this.pointIcon){
                    icon.css({
                        "background":"url("+this.pointIcon+")"
                    });
                }
                if(this.h_pointIcon){
                    b1.mouseover(function(icon){
                        return function(){
                            icon.css({
                                "background":"url("+me.h_pointIcon+")"
                            });
                        }
                    }(icon))
                        .mouseout(function(icon){
                            return function(){
                                icon.css({
                                    "background":"url("+me.pointIcon+")"
                                });
                            }
                        }(icon));
                }

                b2 = $("<button id='line'>绘制线</button>").button({
                    icons:{
                        primary:"ui-icon-locked"
                    }
                }).click(function (e) {
                        me.drawFeature(e);
                    }).appendTo(this.body);

                var btn = b2.button("option","buttonElement");
                var icon = btn.children(".ui-icon");
                if(this.lineIcon){
                    icon.css({
                        "background":"url("+this.lineIcon+")"
                    });
                }

                if(this.h_lineIcon){
                    b2.mouseover(function(icon){
                        return function(){
                            icon.css({
                                "background":"url("+me.h_lineIcon+")"
                            });
                        }
                    }(icon))
                        .mouseout(function(icon){
                            return function(){
                                icon.css({
                                    "background":"url("+me.lineIcon+")"
                                });
                            }
                        }(icon));
                }

                b3 = $("<button id='polygon'>绘制面</button>").button({
                    icons:{
                        primary:"ui-icon-locked"
                    }
                }).click(function (e) {
                        me.drawFeature(e);
                    }).appendTo(this.body);

                var btn = b3.button("option","buttonElement");
                var icon = btn.children(".ui-icon");
                if(this.areaIcon){
                    icon.css({
                        "background":"url("+this.areaIcon+")"
                    });
                }

                if(this.h_areaIcon){
                    b3.mouseover(function(icon){
                        return function(){
                            icon.css({
                                "background":"url("+me.h_areaIcon+")"
                            });
                        }
                    }(icon))
                        .mouseout(function(icon){
                            return function(){
                                icon.css({
                                    "background":"url("+me.areaIcon+")"
                                });
                            }
                        }(icon));
                }

                b4 = $("<button id='clearFeatures'>清除绘制</button>").button({
                    icons:{
                        primary:"ui-icon-locked"
                    }
                }).click(function () {
                        me.clearFeatures();
                    }).appendTo(this.body);

                var btn = b4.button("option","buttonElement");
                var icon = btn.children(".ui-icon");
                if(this.clearIcon){
                    icon.css({
                        "background":"url("+this.clearIcon+")"
                    });
                }
                if(this.h_clearIcon){
                    b4.mouseover(function(icon){
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
                    if(btn1)btn1[0].blur();
                },30)
            },

            /**
             * Method: createControl
             * 创建绘制控件。
             */
            createControl:function () {
                var me = this;
                me.drawFeatureControls = {
                    point:new SuperMap.Control.DrawFeature(me.drFeVector_bev, SuperMap.Handler.Point, {featureAdded:this.featureAdded}),
                    line:new SuperMap.Control.DrawFeature(me.drFeVector_bev, SuperMap.Handler.Path, {featureAdded:this.featureAdded}),
                    polygon:new SuperMap.Control.DrawFeature(me.drFeVector_bev, SuperMap.Handler.Polygon, {featureAdded:this.featureAdded})
                };

                for (var key in me.drawFeatureControls) {
                    me.map.addControl(me.drawFeatureControls[key]);
                }
            },

            /**
             * Method: drawFeature
             * 激活绘制要素控件。
             */
            drawFeature:function (e) {
                var me = this;
                var value = e.currentTarget.id;
                for (key in me.drawFeatureControls) {
                    var control = me.drawFeatureControls[key];
                    if (value == key) {
                        control.activate();
                    } else {
                        control.deactivate();
                    }
                }
            },

            /**
             * Method: featureAdded
             * 要素添加后取消控件激活。
             */
            featureAdded:function () {
                this.deactivate();
            },

            /**
             * APIMethod: clearFeatures
             * 清除要素。
             */
            clearFeatures:function () {
                this.map.getLayersByName("drFeVector_bev")[0].removeAllFeatures();
            },
            /**
             * APIMethod: destroy
             * 在地图上移除控件。
             */
            destroy:function () {
                this.clearFeatures();
                for (var key in this.drawFeatureControls) {
                    var control = this.drawFeatureControls[key];
                    if (control.activate) {
                        control.deactivate();
                    }
                    this.map.removeControl(control);
                }
            },

            /**
             * APIMethod: deactivate
             * 注销该控件。
             */
            deactivate:function () {
                var me = this;
                for (var key in me.drawFeatureControls) {
                    if (me.drawFeatureControls[key].activate) {
                        me.drawFeatureControls[key].deactivate();
                    }
                }
            }
        }
    );
})()