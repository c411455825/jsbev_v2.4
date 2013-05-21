<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%
System.out.println("__________________________________________________");
String theme = (String) request.getParameter("theme");
String x = (String) request.getParameter("x");
String y = (String) request.getParameter("y");
String z = (String) request.getParameter("z");
String layerType = (String) request.getParameter("layerType");
String url = (String) request.getParameter("url");
String mapCtrl = (String) request.getParameter("mapCtrl");
String bevCtrl = (String) request.getParameter("bevCtrl");
if(theme == null){
	theme = "cupertino";
}
if(x==""||x==null){
	x="0";
}
if(y==""||y==null){
	y="0";
}
if(z==""||z==null){
	z="0";
}
if(layerType==null)layerType="1";
if(mapCtrl==null)mapCtrl="";
if(bevCtrl==null)bevCtrl="1_2_3";
%>
<!DOCTYPE html>
<html>
<head>
    <title>supermap</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="demo/libs/SuperMap.Include.js"></script>
    <script src="common/js/jquery-1.8.2.js"></script>
    <script src="demo/js/templete1/sm_bev_main.js"></script>
    <!--
         //初始化bev框架，
        SuperMap.Bev.Main.init(function(){
                //页面代码需要放入其回调函数中


                //设置主题，支持的主题有base，black-tie，blitzer，cupertino，dark-hive
                //dot-luv，eggplant，excite-bike，flick，hot-sneaks，humanity，le-frog，mint-choc，overcast，pepper-grinder
                //redmond，smoothness，south-street，start，sunny，swanky-purse，trontastic，ui-darkness，ui-lightness，vader
                SuperMap.Bev.Theme.set("dot-luv");

                //your code
            });
    -->
    
    <jsp:include page="initMap.jsp"> 
		<jsp:param name="theme" value="<%=theme%>"/>
		<jsp:param name="x" value="<%=x%>"/> 
		<jsp:param name="y" value="<%=y%>"/> 
		<jsp:param name="z" value="<%=z%>"/> 
		<jsp:param name="layerType" value="<%=layerType%>"/>
		<jsp:param name="url" value="<%=url%>"/>
		<jsp:param name="mapCtrl" value="<%=mapCtrl%>"/>
	</jsp:include>
	<script>
        var myWidgetControl,myMenuPanel,myMeasure,myNavigation,myGeolocate,myDrawFeature;
        function initDemo(){
            myWidgetControl = new SuperMap.Bev.WidgetControl("#widgetControl");
            myMenuPanel = new SuperMap.Bev.MenuPanel({
                "body":$("#toolbar"),
                "tree":[
					<%if(bevCtrl.indexOf("0")<0){%>
                    {
                        "icon":SuperMap.Bev.Util.getImgPath("tool_20_20.png"),
                        "hover_icon":SuperMap.Bev.Util.getImgPath("h_tool_20_20.png"),
                        "title":"基本操作",
                        "menu":new SuperMap.Bev.Menu({
                            "body":null,
                            "tree":[
								<%if(bevCtrl.indexOf("1")>=0){%>
                                {
                                    "icon":SuperMap.Bev.Util.getImgPath("mesure_16_16.png"),
                                    "hover_icon":SuperMap.Bev.Util.getImgPath("h_mesure_16_16.png"),
                                    "text":"量&nbsp;&nbsp;&nbsp;&nbsp;算",
                                    "events":{
                                        "click":function () {
                                            if (!myMeasure) {//!myMeasure
                                                var dialog = new SuperMap.Bev.Dialog(null, {
                                                    "icon":SuperMap.Bev.Util.getImgPath("mesure_16_16.png"),
                                                    "text":"量&nbsp;&nbsp;&nbsp;&nbsp;算"
                                                });

                                                var contentBody = dialog.getContentBody();
                                                myMeasure = new SuperMap.Bev.Measure({
                                                    "body":contentBody,
                                                    "map":map
                                                });
                                                dialog.on("dialogclose", function () {
                                                    if (myMeasure) {
                                                        myMeasure.destroy();
                                                        myMeasure = null;
                                                    }
                                                })
												
												myWidgetControl.addWidget(dialog);
                                            }
                                        }
                                    }
                                }
								<%}%>
								<%if(bevCtrl.indexOf("1")>=0&&bevCtrl.indexOf("2")>=0){%>,<%}%>
								<%if(bevCtrl.indexOf("2")>=0){%>
                                {
                                    "icon":SuperMap.Bev.Util.getImgPath("geolocate_16_16.png"),
                                    "hover_icon":SuperMap.Bev.Util.getImgPath("h_geolocate_16_16.png"),
                                    "text":"定&nbsp;&nbsp;&nbsp;&nbsp;位",
                                    "events":{
                                        "click":function () {
											if (!myGeolocate) {
                                                var dialog = new SuperMap.Bev.Dialog(null, {
                                                    "icon":SuperMap.Bev.Util.getImgPath("geolocate_16_16.png"),
                                                    "text":"定&nbsp;&nbsp;&nbsp;&nbsp;位"
                                                });

                                                var contentBody = dialog.getContentBody();
                                                myGeolocate = new SuperMap.Bev.Geolocate({
                                                    "body":contentBody,
                                                    "map":map
                                                });
                                                dialog.on("dialogclose", function () {
                                                    if (myGeolocate) {
                                                        myGeolocate.destroy();
                                                        myGeolocate = null;
                                                    }
                                                })

                                                myWidgetControl.addWidget(dialog);
                                            }
                                        }
                                    }
                                }
								<%}%>
								<%if(bevCtrl.indexOf("2")>=0&&bevCtrl.indexOf("3")>=0){%>,<%}%>
								<%if(bevCtrl.indexOf("3")>=0){%>
                                {
                                    "icon":SuperMap.Bev.Util.getImgPath("draw_16_16.png"),
                                    "hover_icon":SuperMap.Bev.Util.getImgPath("h_draw_16_16.png"),
                                    "text":"绘&nbsp;&nbsp;&nbsp;&nbsp;制",
                                    "events":{
                                        "click":function () {
											if (!myDrawFeature) {
                                                var dialog = new SuperMap.Bev.Dialog(null, {
                                                    "icon":SuperMap.Bev.Util.getImgPath("draw_16_16.png"),
                                                    "text":"绘&nbsp;&nbsp;&nbsp;&nbsp;制"
                                                });

                                                var contentBody = dialog.getContentBody();
                                                myDrawFeature = new SuperMap.Bev.DrawFeature({
                                                    "body":contentBody,
                                                    "map":map
                                                });
                                                dialog.on("dialogclose", function () {
                                                    if (myDrawFeature) {
                                                        myDrawFeature.destroy();
                                                        myDrawFeature = null;
                                                    }
                                                })

                                                myWidgetControl.addWidget(dialog);
                                            }
                                        }
                                    }
                                }
								<%}%>
                            ]
                        })
                    }
					<%}%>
                ]
            });
        }

    </script>


</head>
<body onload="init()" style="position:absolute;width: 100%;height: 100%;overflow: hidden;">
    <div id="bev_body" style="position: absolute;width: 100%;height: 100%;overflow: hidden;">
		<div id="mapContainer"></div>
		<div id="head" class="background_1">
			<span id="logo" class="head_child"></span>
			<span id="toolbar" class="head_child"></span>
		</div>
		<div id="widgetControl"></div>
    </div>
</body>
<script type="text/javascript">
    (function(){//控制页面的自适应浏览器窗口大小
        var a = function(){
            var toolbar = $("#toolbar");
            var toolbarWidth = 0;
            if(toolbar){
                if(window.toolbarWidth){
                    toolbarWidth = window.toolbarWidth;
                }
                else{
                    toolbarWidth = SuperMap.Bev.Util.getSize(toolbar).w + 50;
                }
            }

            var logo = $("#logo");
            var logoWidth = 0;
            if(logo){
                if(window.logoWidth){
                    logoWidth = window.logoWidth;
                }
                else{
                    logoWidth = SuperMap.Bev.Util.getSize(logo).w + 10;
                }
            }

            var width = toolbarWidth + logoWidth;

            var b = document.body;
            var clientWidth = b.clientWidth;
            width += 10;
            if(clientWidth<width){
                $("#bev_body").css({
                    "width":width+"px"
                });
                $("body").css({
                    "overflow-x":"auto"
                })
            }
            else{
                $("#bev_body").css({
                    "width":"100%"
                });
                $("body").css({
                    "overflow-x":"hidden"
                });
            }
        }
        $(window).resize(a);
    })();
</script>
<script src="log.js"></script>
</html>
