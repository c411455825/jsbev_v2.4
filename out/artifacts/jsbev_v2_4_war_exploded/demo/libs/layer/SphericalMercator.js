SuperMap.Layer.SphericalMercator={getExtent:function(){var a=null;if(this.sphericalMercator){a=this.map.calculateBounds()}else{a=SuperMap.Layer.FixedZoomLevels.prototype.getExtent.apply(this)}return a},getLonLatFromViewPortPx:function(a){return SuperMap.Layer.prototype.getLonLatFromViewPortPx.apply(this,arguments)},getViewPortPxFromLonLat:function(a){return SuperMap.Layer.prototype.getViewPortPxFromLonLat.apply(this,arguments)},initMercatorParameters:function(){this.RESOLUTIONS=[];var a=156543.03390625;for(var b=0;b<=this.MAX_ZOOM_LEVEL;++b){this.RESOLUTIONS[b]=a/Math.pow(2,b)}this.units="m";this.projection=this.projection||"EPSG:900913"},forwardMercator:function(c,b){var a=c*20037508.34/180;var d=Math.log(Math.tan((90+b)*Math.PI/360))/(Math.PI/180);d=d*20037508.34/180;return new SuperMap.LonLat(a,d)},inverseMercator:function(a,d){var c=(a/20037508.34)*180;var b=(d/20037508.34)*180;b=180/Math.PI*(2*Math.atan(Math.exp(b*Math.PI/180))-Math.PI/2);return new SuperMap.LonLat(c,b)},projectForward:function(a){var b=SuperMap.Layer.SphericalMercator.forwardMercator(a.x,a.y);a.x=b.lon;a.y=b.lat;return a},projectInverse:function(a){var b=SuperMap.Layer.SphericalMercator.inverseMercator(a.x,a.y);a.x=b.lon;a.y=b.lat;return a}};(function(){var a=["EPSG:900913","EPSG:3857","EPSG:102113","EPSG:102100"];var k=SuperMap.Projection.addTransform;var e=SuperMap.Layer.SphericalMercator;var h=SuperMap.Projection.nullTransform;var d,f,b,g,c;for(d=0,f=a.length;d<f;++d){b=a[d];k("EPSG:4326",b,e.projectForward);k(b,"EPSG:4326",e.projectInverse);for(c=d+1;c<f;++c){g=a[c];k(b,g,h);k(g,b,h)}}})();