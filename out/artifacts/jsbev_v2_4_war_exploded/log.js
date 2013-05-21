function Log(id){
  var t = this;
  t.body = null;
  t.show = true;
  t.init = function(id){
    t.create(id);
  }
  t.clear = function(){
    t.body.innerHTML = "";
  }
  t.create = function(id){
      var e1,e2,d=document,s;
    
      //e1 = d.getElementById(id);
      e1 = d.body;
      t.body=e2 = t.dom("div",null,e1);
      s = e2.style;
      s.position = "absolute";
      s.width = "300px";
      s.height = "400px";
      s.bottom="30px";
      s.right="10px";
      s.overflow = "scroll";
      s.background = "#fff";
      s.zIndex = 99999;
      
      e2 = t.dom("input",null,e1,"clear");
      e2.setAttribute("type","button");
      //e2.type="button";
      e2.onclick = t.clear;
      e2.value = "clear";
      s = e2.style;
      s.position = "absolute";
      s.zIndex = 999999;
      s.bottom="0px";
      s.right="10px";
      s.width = "30px";
      s.background = "#f00";
      
      e2 = t.dom("input",null,e1,"hide");
      e2.setAttribute("type","button");
      //e2.type="button";
      e2.onclick = t.hide;
      e2.value = "hide";
      s = e2.style;
      s.position = "absolute";
      s.zIndex = 999999;
      s.bottom="0px";
      s.right="40px";
      s.width = "30px";
      s.background = "#f00";
      
      e2 = t.dom("input",null,e1,"show");
      e2.setAttribute("type","button");
      //e2.type="button";
      e2.onclick = t.show;
      e2.value = "show";
      s = e2.style;
      s.position = "absolute";
      s.zIndex = 999999;
      s.bottom="0px";
      s.right="70px";
      s.width = "30px";
      s.background = "#f00";
  }
  t.print = function(txt,color){
      if(!t.show){
	  return;
      }
      var e;
    
      //e = t.dom("div",null,t.body,txt);
      //if(color)e.style.color = color;
      $(t.body).prepend("<div style=\"color:"+color+"\">"+txt+"</div>");
  }
  t.dom = function(tag,id,p,txt,className){
      var a;
      a = document.createElement(tag);
      if(id)a.id = id;
      if(tag=="input"){
          if(txt)a.value = txt;
      }
      else{
          if(txt)a.innerHTML = txt;
      }
      if(className)a.className = className;
      if(p){
	//$(p).prepend("<b>Hello world!</b>");
	p.appendChild(a);
      }
      return a;
  }
  t.hide = function(){
    t.body.style.display = "none";
    t.show = false;
  }
  t.show = function(){
    //autoPan();
    t.body.style.display = "block";
    t.show = true;
    layer.zoomDuration = 0;
//    window.plugins.localstoragemanager.savedb("", "get", 0, 2, 2,
//	function(){},
//	function(e){//errorfunction
//	}
//    );
  }
  t.init(id);
}
var log = new Log("map");