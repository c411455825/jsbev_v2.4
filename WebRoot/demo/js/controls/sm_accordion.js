/**
 * Class: SuperMap.Bev.Accordion
 * 手风琴控件。
 */
(function () {
    SuperMap.Bev.Class.create(
        "SuperMap.Bev.Accordion",
        {
            /**
             * APIProperty: body
             * {HTMLElement} 父容器
             */
            body:null,
            /**
             * APIProperty: html
             * {Array} html内容
             *
             *(code)
             *html:[
             *    {
             *        "title":"name1",
             *        "body":$("<p>this is a simple text;this is a simple text;this is a simple text;this is a simple text;this is a simple text;</p>")
             *    },
             *    {
             *        "title":"name2",
             *        "body":$("<p>this is a simple text;this is a simple text;this is a simple text;this is a simple text;this is a simple text;</p>")
             *    }
             *],
             * (end)
             */
            html:[
                {
                    "title":"name1",
                    "body":$("<p>this is a simple text;this is a simple text;this is a simple text;this is a simple text;this is a simple text;</p>")
                },
                {
                    "title":"name2",
                    "body":$("<p>this is a simple text;this is a simple text;this is a simple text;this is a simple text;this is a simple text;</p>")
                }
            ],
            /**
             * APIProperty: isRoundedCorner
             * {Boolean} 是否是圆角，默认为true
             */
            isRoundedCorner:true,
            /**
             * Constructor: SuperMap.Bev.Accordion
             * 实例化 Accordion 类。
             *
             * Parameters:
             * body - {HTMLElement} 父容器
             * config - {Array} 初始化参数
             *
             * Examples:
             * (code)
             * var myAccordion = new SuperMap.Bev.Accordion({
             *     "body":$("#divid"),
             *     "html":[
             *        {
             *            "title":"查询",
             *            "body":$("<p>this is a examples</p><br><p>this is a examples</p><br><p>this is a examples</p>")
             *        }
             *    ]
             * });
             * (end)
             */
            init:function (options) {
                for(var key in options){
                    this[key] = options[key];
                }
                this.create();
            },
            /**
             * Method: create
             * 创建该控件的dom对象。
             */
            create:function(){
                var c,c1, b,t=this;
                c = this.html;
                b = this.body;
                if(c){
                    b.empty();
                    for(var i=0;i< c.length;i++){
                        c1 = c[i];
                        $("<h3>")
                            .html(c1.title)
                            .appendTo(b);

                        $("<div>")
                            .append(c1.body)
                            .appendTo(b);
                    }
                }

                b.accordion();

                window.setTimeout(function(){
                    b.find("h3").next().css("height","auto");
                    if(!t.isRoundedCorner){
                        var css = {
                            "-moz-border-radius-topleft":"0px",
                            "-webkit-border-top-left-radius":"0px",
                            "-khtml-border-top-left-radius":"0px",
                            "border-top-left-radius":"0px",

                            "-moz-border-radius-topright":"0px",
                            "-webkit-border-top-right-radius":"0px",
                            "-khtml-border-top-right-radius":"0px",
                            "border-top-right-radius":"0px",

                            "-moz-border-radius-bottomleft":"0px",
                            "-webkit-border-bottom-left-radius":"0px",
                            "-khtml-border-bottom-left-radius":"0px",
                            "border-bottom-left-radius":"0px",

                            "-moz-border-radius-bottomright":"0px",
                            "-webkit-border-bottom-right-radius":"0px",
                            "-khtml-border-bottom-right-radius":"0px",
                            "border-bottom-right-radius":"0px"
                        };
                        b.find("div").css(css);
                        b.find("h3").css(css);
                    }
                },20);
            }
        },
        null,                        //父类
        false,                       //是否是静态类
        [                            //初始化该类之前需要加载的js文件
            "demo/js/ui/jquery.ui.widget.js",
            "demo/js/ui/jquery.ui.accordion.js"
        ]
    );
})();