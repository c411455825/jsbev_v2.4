/**
 * Class: SuperMap.Bev.MenuPanel
 * 页头上放置菜单的标签。
 */
(function () {
    SuperMap.Bev.Class.create(
        "SuperMap.Bev.MenuPanel",
        {
            /**
             * APIProperty: tree
             * {Array} 目录结构
             *
             *(code)
             * "tree":[
             *     {
             *         "icon":"imagepath",
             *         "hover_icon":"imagepath",
             *         "title":"标题",
             *         "menu":new SuperMap.Bev.Menu()//$("<div>").html("this is a div")
             *      }
             * ]
             * (end)
             */
            tree:null,
            /**
             * APIProperty: body
             * {HTMLElement} 父容器
             */
            body:null,
            /**
             * Property: tabBody
             * {HTMLElement} tab按钮dom对象
             */
            tabBody:null,
            /**
             * Property: tab_array
             * {Array<Object>} 存储每个tab按钮相关信息的数组
             */
            tab_array:[],
            /**
             * Property: tabTimeout
             * {Object} 控制菜单延时显示隐藏
             */
            tabTimeout:{},
            /**
             * Constructor: SuperMap.Bev.MenuPanel
             * 实例化 MenuPanel 类。
             *
             * Parameters:
             * options - {Object} 参数
             *
             * Examples:
             * (code)
             * var  myMenuPanel = new SuperMap.Bev.MenuPanel({
             *     "body":$("#div"),
             *     "tree":[
             *          {
             *              "icon":"imagepath",
             *              "hover_icon":"imagepath"
             *              "title":"基本操作",
             *              "menu":new SuperMap.Bev.Menu()//$("<div>").html("this is a div")
             *          }
             *      ]
             * });
             * (end)
             */
            init:function (options) {
                for(var key in options){
                    this[key] = options[key];
                }
                var tab = this.createTab();
                tab&&tab.appendTo(this.body);
                this.bindEvents();
                $(window).resize();
            },
            /**
             * Method: createTab
             * 创建该控件的dom对象。
             */
            createTab:function () {
                var tab, ul, tree, para, li, li_a, li_div,li_icon,li_text;

                tree = this.tree;
                if(!tree||tree.length==0)return;
                this.tabBody = tab = $("<div class=\"sm_tabs\"></div>");
                ul = $("<ul class=\"sm_tabs_ul\"></ul>")
                    .appendTo(tab)
                    .css({
                        "padding":"0px",
                        "margin":"0px"
                    });
                $("<div style=\"display: none;\"><div id=\"tabs-1\"></div></div>").appendTo(tab);

                for (var i = 0; i < tree.length; i++) {
                    para = tree[i];

                    li = $("<li style=\"position: relative;\"></li>")
                        .css({
                            "padding":"0px",
                            "margin":"0px"
                        });
                    li_a = $("<a href=\"#tabs-1\"></a>")
                        .appendTo(li);
                    li_icon = $("<span class=\"tab_icon\" style=\"background: url(" + para.icon + ")\"></span>")
                        .appendTo(li_a);
                    li_text = $("<span class=\"tab_txt\">" + para.title + "</span>")
                        .appendTo(li_a);
                    li_div = $("<div style=\"position: absolute;left: 0px;top:46px;\"></div>")
                        .appendTo(li);

                    if (para.menu) {
                        if(para.menu.menuBody){
                            para.menu.menuBody.appendTo(li_div)
                                .css("display", "none");
                        }
                        else if(para.menu.appendTo){
                            para.menu.appendTo(li_div).css("display", "none");
                        }
                    }

                    li.appendTo(ul);

                    this.tab_array.push({
                        "li_a":li_a,
                        "menu":para.menu,
                        "li":li,
                        "li_icon":li_icon
                    });
                }

                tab.tabs();

                this.tab_array[0].li_a.parent().removeClass("ui-tabs-active ui-state-active").attr("aria-selected", "false").attr("tabindex", "-1");
                tab.css("border", "0px solid #000").css("background", "none");
                ul.css("border", "0px solid #000").css("background", "none");

                return tab;
            },
            /**
             * Method: bindEvents
             * 绑定事件。
             */
            bindEvents:function () {
                var tab_array = this.tab_array, tab, li_a, li, li_icon, me = this, timeoutId, menu, menuItms, menuItm;
                for (var i = 0; i < tab_array.length; i++) {
                    tab = tab_array[i];

                    li_a = tab.li_a;
                    li = tab.li;
                    li_icon = tab.li_icon
                    timeoutId = "tab_" + i + "_out";
                    menu = tab.menu;
                    li_a.mouseover(function (timeoutId, menu,i,li_icon) {
                        return function () {
                            if (!me.canelTimeout(timeoutId)) {
                                me.hideAllMenu();
                                if(menu){
                                    if(menu.menuBody){
                                        menu.menuBody.css("display", "block");
                                    }
                                    else{
                                        menu.css("display", "block");
                                    }
                                }
                                if(me.tree[i]&&me.tree[i].hover_icon){
                                    li_icon.css({
                                        "background":"url("+me.tree[i].hover_icon+")"
                                    });
                                }
                            }
                        }
                    }(timeoutId, menu,i,li_icon))
                        .mouseout(function (timeoutId, menu, li,i,li_icon) {
                        return function () {
                            log.print("step4 i is:" + i);
                            mouseout(timeoutId, menu, li, li_icon, i);
                        }
                    }(timeoutId, menu, li,i,li_icon))
                        .click(function (event) {
                            $(this).parent().removeClass("ui-state-active").removeClass("ui-state-focus");
                        });


                    this.addHoverCss([li_a, li, li_a.children()], li);

                    if(menu.getItems){
                        menuItms = menu.getItems();
                    }
                    else{
                        menuItms = [menu];
                    }

                    for (var j = 0; j < menuItms.length; j++) {
                        menuItm = menuItms[j];

                        menuItm.mouseover(function (timeoutId) {
                            return function () {
                                me.canelTimeout(timeoutId);
                            }
                        }(timeoutId)).mouseout(function (timeoutId, menu, li, i,li_icon) {
                            return function () {
                                mouseout(timeoutId, menu, li, li_icon, i);
                            }
                        }(timeoutId, menu, li,i,li_icon))
                            .click(function () {
                                return false;
                            });
                    }
                }

                function mouseout(timeoutId, menu, li, li_icon, i) {
                    log.print("step3 i is:" + i);
                    me.createTimeout(timeoutId, function (timeoutId, menu, li, li_icon, i) {
                        return function () {
                            if(menu){
                                if(menu.menuBody){
                                    menu.menuBody.css("display", "none");
                                }
                                else{
                                    menu.css("display", "none");
                                }
                            }
                            //menu && menu.menuBody.css("display", "none");
                            li.removeClass("ui-state-hover");
                            log.print("step2 i is:" + i);
                            if(me.tree[i]&&me.tree[i].hover_icon){
                                log.print("step1 i is:" + i);
                                li_icon.css({
                                    "background":"url("+me.tree[i].icon+")"
                                });
                            }
                        }
                    }(timeoutId, menu, li, li_icon, i));
                }
            },
            /**
             * Method: addHoverCss
             * 当时鼠标放到tab上时，改变tab的样式。
             */
            addHoverCss:function (doms, li) {
                for (var i = 0; i < doms.length; i++) {
                    doms[i].mouseout(function () {
                        li.addClass("ui-state-hover");
                    })
                }
            },
            /**
             * Method: canelTimeout
             * 注销延时。
             */
            canelTimeout:function (name) {
                if (this.tabTimeout[name]) {
                    window.clearTimeout(this.tabTimeout[name]);
                    this.tabTimeout[name] = null;
                    return true;
                }
                else {
                    return false;
                }
            },
            /**
             * Method: createTimeout
             * 创建延时，显示隐藏菜单和改变tab样式都会有延时。
             */
            createTimeout:function (name, callback) {
                var me = this;
                this.tabTimeout[name] = window.setTimeout(function (cb, name) {
                    return function () {
                        if (cb) {
                            cb();
                        }
                        me.tabTimeout[name] = null;
                    }
                }(callback, name), 300);
            },
            /**
             * Method: hideAllMenu
             * 隐藏所有菜单。
             */
            hideAllMenu:function () {
                var tbs = this.tab_array, menu;
                for (var i = 0; i < tbs.length; i++) {
                    menu = tbs[i].menu;
                    if(menu){
                        if(menu.menuBody){
                            menu.menuBody.css("display", "none");
                        }
                        else{
                            menu.css("display", "none");
                        }
                    }
                    //if (menu)menu.menuBody.css("display", "none");
                }
            }
        },
        null,                                        //父类
        false,                                       //是否是静态类
        [                                            //初始化该类之前需要加载的js文件
            "demo/js/ui/jquery.ui.widget.js",
            "demo/js/ui/jquery.ui.tabs.js"
        ]
    );
})()