/**
 * Class: SuperMap.Bev.Menu
 * 菜单控件。
 */
(function () {
    SuperMap.Bev.Class.create(
        "SuperMap.Bev.Menu",
        {
            /**
             * APIProperty: body
             * {HTMLElement} 父容器
             */
            body:null,
            /**
             * APIProperty: tree
             * {Array} 目录结构
             *
             *(code)
             * "tree":[
             *     {
             *          "icon":"imagePath",
             *          "hover_icon":"imagePath"
             *          "text":"标题",
             *          "events":{
             *              "click":function(){},
             *              "mouseover":function(){},
             *              "mouseout":function(){}
             *          }
             *      }
             *  ]
             * (end)
             */
            tree:[
                {
                    "icon":"",
                    "text":"test",
                    "events":{
                        "click":null,
                        "mouseover":null,
                        "mouseout":null
                    }
                }
            ],
            /**
             * APIProperty: menuBody
             * {HTMLElement} 内容区域
             */
            menuBody:null,
            itemArray:[],
            /**
             * Constructor: SuperMap.Bev.Menu
             * 实例化 Menu 类。
             *
             * Parameters:
             * options {Object} 初始化需要的参数
             *
             * Examples:
             * (code)
             * var myMenu = new SuperMap.Bev.Menu({
             *     "body":$("#id"),
             *     "tree":[
             *          {
             *              "icon":"imagePath",
             *              "hover_icon":"imagePath"
             *              "text":"量&nbsp;&nbsp;&nbsp;&nbsp;算",
             *              "events":{
             *                  "click":function(){}
             *              }
             *          }
             *      ]
             * });
             * (end)
             */
            init:function (options) {
                for(var key in options){
                   this[key] = options[key];
                }
                var ul;

                this.menuBody = ul = this.createMenu();
                if (this.body)ul.appendTo(this.body);

                this.bindEvents();
            },
            /**
             * Method: createMenu
             * 创建该控件的dom对象。
             */
            createMenu:function () {
                var ul, li,li_icon,li_text, tree = this.tree, para, itemArr = [], itm;

                ul = $("<ul class=\"sm_menu\"></ul>");
                for (var i = 0; i < tree.length; i++) {
                    para = tree[i];
                    li = $("<li class=\"sm_menu_li\"><a href=\"#\"></a></li>")
                        .appendTo(ul);
                    li_icon = $("<span class=\"icon16_16\" style=\"background: url(" + para.icon + ")\"></span>")
                        .appendTo(li.find("a"));
                    li_text = $("<span class=\"menu_txt\">" + para.text + "</span>")
                        .appendTo(li.find("a"));
                    itemArr.push({
                        "li":li,
                        "li_icon":li_icon
                    })
                    li.children("a").css({"border":"0px solid #fff"});
                }
                this.itemArray = itemArr;

                ul.menu();

                for (var i = 0; i < itemArr.length; i++) {
                    itm = itemArr[i];

                    itm.li.css({
                        "margin":0,
                        "padding":0,
                        "float":"none"
                    });
                    itm.li.children().css({
                        "margin":0,
                        "padding":"5px 0px 0px 0px",
                        "float":"none",
//                        "color":"#2779AA",
                        "cursor":"pointer"
                    });
                }

                return ul;
            },
            /**
             * Method: bindEvents
             * 绑定事件。
             */
            bindEvents:function () {
                var itmArr = this.itemArray, itm, me=this,trrArr = this.tree, eventArr;

                for (var i = 0; i < itmArr.length; i++) {
                    itm = itmArr[i].li;
                    eventArr = trrArr[i].events;
                    if (eventArr.click) {
                        itm.click(function (ck) {
                            return function () {
                                ck();
                                return false;
                            }
                        }(eventArr.click));
                    }
                    if (eventArr.mouseover||trrArr[i].hover_icon) {
                        itm.mouseover(function (mo,i) {
                            return function () {
                                if(mo)mo();
                                log.print("menu over");
                                if(me.tree[i]&&me.tree[i].hover_icon){
                                     me.itemArray[i].li_icon.css({
                                         "background":"url("+me.tree[i].hover_icon+")"
                                     });
                                }
                            }
                        }(eventArr.mouseover,i))
                    }
                    if (eventArr.mouseout||trrArr[i].hover_icon) {
                        itm.mouseout(function (mo,i) {
                            return function () {
                                if(mo)mo();
                                if(me.tree[i]&&me.tree[i].hover_icon){
                                    me.itemArray[i].li_icon.css({
                                        "background":"url("+me.tree[i].icon+")"
                                    });
                                }
                            }
                        }(eventArr.mouseout,i))
                    }
                }
            },
            /**
             * Method: getItems
             * 获取菜单中的栏目组成的数组。
             *
             * Returns:
             * {Array<HTMLElement>}  返回 Dom 对象数组。
             */
            getItems:function () {
                var itms = [], itmArr = this.itemArray;

                for (var i = 0; i < itmArr.length; i++) {
                    itms.push(itmArr[i].li);
                }

                return itms;
            }
        },
        null,                        //父类
        false,                       //是否是静态类
        [                            //初始化该类之前需要加载的js文件
            "demo/js/ui/jquery.ui.widget.js",
            "demo/js/ui/jquery.ui.position.js",
            "demo/js/ui/jquery.ui.menu.js"
        ]
    );
})();