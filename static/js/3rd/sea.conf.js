/**
 * 扩展String，添加endWith方法
 * @param oString
 * @returns {boolean}
 */
String.prototype.endWith = function (oString) {
    var reg = new RegExp(oString + "$");
    return   reg.test(this);
};


/**
 * 扩展String，添加startWith方法
 * @param str
 * @returns {boolean}
 */
String.prototype.startWith = function (str) {
    if (str == null || str == "" || this.length == 0 || str.length > this.length)
        return false;
    if (this.substr(0, str.length) == str)
        return true; else
        return false;
    return true;
};


/**
 * 防止XFS（ Cross Frame Script 跨框架脚本）攻击
 *
 * 其本质就是防止被iframe
 */
if (self != top) {
    top.location = self.location;
}

/**
 * 获取当前JS文件所在文件夹的URL地址
 *
 */
function folderUrl() {
    var base = document.scripts;
    base = base[base.length - 1].src.substring(0, base[base.length - 1].src.lastIndexOf("/") + 1);
    return base;
}

/**
 * 实现收银台的弹窗
 * @param url
 */
function openCashierDeskWindow(url) {
    if (window.name != "云浩收银台") {
        var newWindow = open(url, "云浩收银台", "menubar=no,location=no,toolbar=no,status=yes,resizable=yes, width = " + screen.width + ", height = " + screen.height);
        newWindow.focus();
    } else {
        location.replace(url);
    }
}

/**
 * 获取页面内最大的z-index值
 * @returns {number}
 */
function getMaxZIndex() {
    var divs = document.getElementsByTagName("div");
    for (var i = 0, max = 0; i < divs.length; i++) {
        max = Math.max(max, divs[i].style.zIndex || 0);
    }
    return max;
}
/**
 * 获取页面内最大的z-index值
 * @returns {number}
 */
function getMaxZIndex() {
    var divs = document.getElementsByTagName("div");
    for (var i = 0, max = 0; i < divs.length; i++) {
        max = Math.max(max, divs[i].style.zIndex || 0);
    }
    return max;
}

/**
 * 简化的四舍五入操作
 *
 * @param {}
 *            value 要进行四舍五入的数据
 * @param {}
 *            decimals 精确的小数位数
 * @return {}
 */
function round(value, decimals) {
    try {
        var d = Math.pow(10, decimals);
        return Math.round(eval(value) * d) / d;
    } catch (err) {
        return 0;
    }
}

/**
 * 配置SeaJS的别名
 */
seajs.config({
    alias: {

        // jQuery
        "$": "gallery/jquery/1.10.2/jquery",
        "jquery": "gallery/jquery/1.10.2/jquery",


        // jQuery的插件系列
        "$.form": 'gallery/jquery.form/3.43.0/jquery.form',
        "$.validation": "gallery/jquery.validation/1.11.1/jquery.validation",
        "$.dialog": "gallery/jquery.artdialog/5.0.3/jquery.artdialog",
        "$.spell": "gallery/jquery.spell/1.0.0/jquery.spell",
        "$.mask": "gallery/jquery.loadmask/0.4.0/jquery.loadmask",
        "$.Jcrop": "gallery/jquery.Jcrop/0.9.12/jquery.Jcrop",


        // Arale提供的系列组件和一些依赖关系
        "autocomplete": "arale/autocomplete/1.2.2/autocomplete",
        "calendar": "arale/calendar/0.9.0/calendar",
        "dialog": "arale/dialog/1.1.2/dialog",
        "confirmbox": "arale/dialog/1.1.2/confirmbox",
        "base": "arale/base/1.1.1/base",
        "class": "arale/class/1.1.0/class",
        "cookie": "arale/cookie/1.0.2/cookie",
        "detector": "arale/detector/1.1.3/detector",
        "easing": "arale/easing/1.0.0/easing",
        "events": "arale/events/1.1.0/events",
        "iframe-shim": "arale/iframe-shim/1.0.2/iframe-shim",
        "messenger": "arale/messenger/1.0.2/messenger",
        "overlay": "arale/overlay/1.1.1/overlay",
        "placeholder": "arale/placeholder/1.0.1/placeholder",
        "popup": "arale/popup/1.1.1/popup",
        "position": "arale/position/1.0.1/position",
        "select": "arale/select/0.9.7/select",
        "sticky": "arale/sticky/1.3.1/sticky",
        "switchable": "arale/switchable/1.0.1/switchable",
        "tabs": "arale/switchable/1.0.1/tabs",
        "templatable": "arale/templatable/0.9.1/templatable",
        "tip": "arale/tip/1.1.3/tip",
        "upload": "arale/upload/1.0.0/upload",
        "validator": "arale/validator/0.9.6/validator",
        "widget": "arale/widget/1.1.1/widget",


        // 其他第三方工具库
        "expect": "gallery/expect/0.2.0/expect",
        "handlebars": "gallery/handlebars/1.0.2/handlebars",
        "moment": "gallery/moment/2.4.0/moment",
        "selection": "gallery/selection/0.9.0/selection",
        "stickytable": "gallery/stickytable/0.1.0/stickytable",
        "jsuri": "gallery/jsuri/1.2.2/jsuri",
        "highcharts": 'gallery/highcharts/3.0.3/highcharts',
        "ztree": "gallery/ztree/3.5.14/ztree",
        "keymaster": "gallery/keymaster/1.0.2/keymaster",
        "md5": "gallery/MD5/md5.min.js",
        "xheditor": "gallery/xheditor/1.1.14/xheditor",

        // bootstrap
        "bootstrap": "gallery/bootstrap/3.2.0/bootstrap",

        // 云浩的Tree
        "tree": 'yunti/tree/0.1.1/tree'


    }
});

// //////////////////////////
//		
// 全局通用的JS操作就放在这里，须注意依赖关系
//
// //////////////////////////
seajs.use(['$', 'validator', 'moment', 'cookie', 'jsuri'], function ($, Validator, moment, Cookie, Uri) {
    $(function () {

        // 实现其他信息的按钮，打开或关闭其他信息的字段
        $("#otherBtn").click(function () {
            $("#otherFields").toggleClass("fn-hide");
            $(this).toggleClass("gray");
        });


        // 屏蔽浏览器的退格键
        $(document).keydown(function (e) {
            if (e.keyCode != 8) {// 如果不是退格键
                return;
            }
            var dom = e.srcElement || e.target;
            var tagName = dom.tagName.toUpperCase();
            if (tagName == 'INPUT' || tagName == 'TEXTAREA') {
                if (dom.readOnly || dom.disabled) { // 如果是被禁用的输入框，也要拦截
                    e.preventDefault();
                }
            } else { // 如果不是输入框，直接拦截
                e.preventDefault();
            }
        });


        // 实现点击文本框时自动全选，失去焦点前再点则不再全选。
        $(document).on('click', 'input', function () {
            var input = $(this);
            if (input.attr('selectedOnClick')) {
                return;
            }
            input.attr('selectedOnClick', true);
            setTimeout(function () {
                input.select();
            }, 10);
        }).on('blur', 'input', function () {
            $(this).removeAttr('selectedOnClick');
        });


        // 实现tipbox和tiptext的关闭按钮功能
        $('.ui-tiptext-close').click(function () {
            var tip = $(this).parent(), id = tip.attr('id');
            tip.remove();
            if (typeof(id) != 'undefined' && id.length > 0) {
                var cookieName = 'tip_' + id;
                Cookie.set(cookieName, parseInt((Cookie.get(cookieName) || 0)) + 1, {expires: 5, path: '/'});
            }
        });


        // 报表查询的日期间隔，不超过45天
        Validator.addRule('45day', function (options) {
            var start = $(options.target).attr('value');
            var end = options.element.attr('value');
            var days = moment(end, "YYYY-MM-DD").diff(moment(start, 'YYYY-MM-DD'), 'days');
            return days > -45 && days < 45;
        }, '起止日期间隔不能超过45天');

    });
});