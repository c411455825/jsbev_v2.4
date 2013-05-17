﻿/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Control.js
 */

/**
 * Class: SuperMap.Control.BZoom
 * 缩放类。
 * 用于缩放地图。默认情况下垂直显示在地图左上角。
 *
 * Inherits from:
 *  - <SuperMap.Control>
 */
SuperMap.Control.BZoom = SuperMap.Class(SuperMap.Control, {

    /**
     * APIProperty: zoomInIcon
     * {String}
     * 加号按钮图片的路径
     */
    zoomInIcon: null,

    /**
     * APIProperty: zoomOutIcon
     * {String}
     * 减号按钮图片的路径
     */
    zoomOutIcon: null,

    /**
     * APIProperty: position
     * {Object}
     * 控件的位置
     *
     * (code)
     * new SuperMap.Control.BZoom({
     *     "position":{
     *         "left":"10px",    //"right":"10px"
     *         "top":"10px"      //"bottom":"10px"
     *     }
     * });
     * (end)
     */
    position: null,

    /**
     * APIProperty: body
     * {DOMElement} 控件dom元素
     *
     */
    body:null,

    /**
     * Property: zoomInBtn
     * {HTMLElement}
     * 加号按钮
     */
    zoomInBtn: null,

    /**
     * Property: zoomOutBtn
     * {HTMLElement}
     * 减号按钮
     */
    zoomOutBtn: null,

    /**
     * Method: draw，创建缩放控件
     *
     * Returns:
     * {DOMElement} A reference to the DOMElement containing the zoom links.
     */
    draw: function() {
        this.zoomInIcon = SuperMap.Bev.Util.getImgPath("zoom-plus.png");
        this.zoomOutIcon = SuperMap.Bev.Util.getImgPath("zoom-minus.png");

        var div = SuperMap.Control.prototype.draw.apply(this,arguments),
            links = this.getOrCreateLinks(div),
            zoomIn = links.zoomIn,
            zoomOut = links.zoomOut,
            eventsInstance = this.map.events;

        var handler = function(me){
            return function(evt){
                me.buttonClick(evt);
            }
        }(this);
        SuperMap.Event.observe(zoomOut.parentNode, "mousedown", SuperMap.Function.bindAsEventListener(handler, zoomOut.parentNode));
        SuperMap.Event.observe(zoomOut.parentNode, "touchstart", SuperMap.Function.bindAsEventListener(handler, zoomOut.parentNode));

        this.zoomInLink = zoomIn;
        this.zoomOutLink = zoomOut;
        return div;
    },


    /**
     * Method: getOrCreateLinks 创建加减号按钮
     *
     * Parameters:
     * el - {DOMElement} 父容器
     *
     * Return:
     * {Object} Object with zoomIn and zoomOut properties referencing links.
     */
    getOrCreateLinks: function(el) {
        var b,s;
        b = this.body;
        if(!b){
            b = document.createElement("div");
            el.appendChild(b);
            s = b.style;
            if(this.position){
                for(var key in this.position){
                    s[key] = this.position[key];
                }
            }
            else{
                s.left = "10px";
                s.top = "10px";
            }
            s.position = "absolute";
            this.body = b;
        }
        if (!this.zoomInBtn) {
            this.zoomInBtn = this.createBtn(b,this.zoomInIcon,"smControlZoomIn");
        }
        SuperMap.Element.addClass(this.zoomInBtn, "smButton");
        if (!this.zoomOutBtn) {
            this.zoomOutBtn = this.createBtn(b,this.zoomOutIcon,"smControlZoomOut");
        }
        SuperMap.Element.addClass(this.zoomOutBtn, "smButton");
        return {
            zoomIn: this.zoomInBtn, zoomOut: this.zoomOutBtn
        };
    },

    /**
     * Method: createBtn 创建加减号按钮
     *
     * Parameters:
     * p - {DOMElement} 父容器
     * m - {String} 图片名称
     * c - {String} 样式名称
     *
     * Return:
     * {DOMElement} 创建好的按钮对象.
     */
    createBtn: function(p,m,c){//container imgName className
        var a,d = document,s;

        a = d.createElement("div");
        a.className = c;
        s = a.style;
        s.width = "27px";
        s.height = "27px";
        s.cursor = "pointer";
        p.appendChild(a);

        b = d.createElement("img");
        s = b.style;
        s.width = "27px";
        s.height = "27px";
        b.src = m;
        a.appendChild(b);

        return a;
    },

    /**
     * Method: onZoomClick
     * 当点击按钮时调用.
     */
    onZoomClick: function(evt) {
        var button = evt.buttonElement;
        if (button === this.zoomInLink) {
            this.map.zoomIn();
        } else if (button === this.zoomOutLink) {
            this.map.zoomOut();
        }
    },

    /**
     * Method: buttonClick
     * 处理鼠标事件.
     */
    buttonClick: function(evt) {
        var element = SuperMap.Event.element(evt);
        if (element && (SuperMap.Event.isLeftClick(evt) || !~evt.type.indexOf("mouse"))) {
            var button = this.getPressedButton(element);
            if (button) {
                var args = {buttonElement: button};
                this.onZoomClick(args);
            }
        }
    },

    /**
     * Method: getPressedButton
     * Get the pressed button, if any. Returns undefined if no button
     * was pressed.
     *
     * Arguments:
     * element - {DOMElement} The event target.
     *
     * Returns:
     * {DOMElement} The button element, or undefined.
     */
    getPressedButton: function(element) {
        var depth = 3, // limit the search depth
            button;
        do {
            if(SuperMap.Element.hasClass(element, "smButton")) {
                // hit!
                button = element;
                break;
            }
            element = element.parentNode;
        } while(--depth > 0 && element);
        return button;
    },



    /**
     * APIMethod: destroy
     * 销毁Zoom控件，释放相关资源。
     */
    destroy: function() {
        SuperMap.Event.stopObservingElement(this.zoomInLink);
        SuperMap.Event.stopObservingElement(this.zoomOutLink);
        delete this.zoomInLink;
        delete this.zoomOutLink;
        delete this.body;
        SuperMap.Control.prototype.destroy.apply(this);
    },

    CLASS_NAME: "SuperMap.Control.BZoom"
});