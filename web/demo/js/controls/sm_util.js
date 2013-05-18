/**
 * Class: SuperMap.Bev.Util
 * 通用方法。
 */
(function () {
    SuperMap.Bev.Class.create(
        "SuperMap.Bev.Util",
        {
            init:function () {
            },
            /**
             * APIMethod: getSize
             * 获取dom元素的像素大小
             */
            getSize:function(dom){
                var a = dom.clone();

                a.css({
                    "left":"-5000px",
                    "position":"absolute"
                })
                    .appendTo($("body"));

                var w = a.width();
                var h = a.height();

                a.remove();

                return {"w":w,"h":h};
            },
            _imgName:[
                "tool_16_16.png",
                "tool_20_20.png",
                "clear_16_16.png",
                "clear_20_20.png",
                "draw_16_16.png",
                "draw_20_20.png",
                "drawarea_16_16.png",
                "drawarea_20_20.png",
                "drawline_16_16.png",
                "drawline_20_20.png",
                "drawpoint_16_16.png",
                "drawpoint_20_20.png",
                "geolocate_16_16.png",
                "geolocate_20_20.png",
                "measureArea_16_16.png",
                "measureArea_20_20.png",
                "measureDistance_16_16.png",
                "measureDistance_20_20.png",
                "mesure_16_16.png",
                "mesure_20_20.png",
                "resizemap.png",
                "zoomin_14_14.png",
                "zoomout_14_14.png"
            ],
            /**
             * APIMethod: getImgNames
             * 获取内置的图片名称数组
             */
            getImgNames:function(){
                return this._imgName;
            },
            /**
             * APIMethod: getImgPath
             * 根据图片名称获取图片路径
             */
            getImgPath:function(imgName){
                return "demo/img/" + SuperMap.Bev.Theme.themeName + "/" + imgName;
            }
        },
        null,                        //父类
        true,                       //是否是静态类
        null                        //初始化该类之前需要加载的js文件
    );
})();