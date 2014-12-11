define("gallery/ztree/3.5.14/ztree", ["$", "./ztree.css"], function (require, exports, module) {
    var jQuery = require("$");
    require("./ztree.css"), function ($) {
        var settings = {}, roots = {}, caches = {}, _consts = {className: {BUTTON: "button", LEVEL: "level", ICO_LOADING: "ico_loading", SWITCH: "switch"}, event: {NODECREATED: "ztree_nodeCreated", CLICK: "ztree_click", EXPAND: "ztree_expand", COLLAPSE: "ztree_collapse", ASYNC_SUCCESS: "ztree_async_success", ASYNC_ERROR: "ztree_async_error"}, id: {A: "_a", ICON: "_ico", SPAN: "_span", SWITCH: "_switch", UL: "_ul"}, line: {ROOT: "root", ROOTS: "roots", CENTER: "center", BOTTOM: "bottom", NOLINE: "noline", LINE: "line"}, folder: {OPEN: "open", CLOSE: "close", DOCU: "docu"}, node: {CURSELECTED: "curSelectedNode"}}, _setting = {treeId: "", treeObj: null, view: {addDiyDom: null, autoCancelSelected: !0, dblClickExpand: !0, expandSpeed: "fast", fontCss: {}, nameIsHTML: !1, selectedMulti: !0, showIcon: !0, showLine: !0, showTitle: !0}, data: {key: {children: "children", name: "name", title: "", url: "url"}, simpleData: {enable: !1, idKey: "id", pIdKey: "pId", rootPId: null}, keep: {parent: !1, leaf: !1}}, async: {enable: !1, contentType: "application/x-www-form-urlencoded", type: "post", dataType: "text", url: "", autoParam: [], otherParam: [], dataFilter: null}, callback: {beforeAsync: null, beforeClick: null, beforeDblClick: null, beforeRightClick: null, beforeMouseDown: null, beforeMouseUp: null, beforeExpand: null, beforeCollapse: null, beforeRemove: null, onAsyncError: null, onAsyncSuccess: null, onNodeCreated: null, onClick: null, onDblClick: null, onRightClick: null, onMouseDown: null, onMouseUp: null, onExpand: null, onCollapse: null, onRemove: null}}, _initRoot = function (a) {
            var b = data.getRoot(a);
            b || (b = {}, data.setRoot(a, b)), b[a.data.key.children] = [], b.expandTriggerFlag = !1, b.curSelectedList = [], b.noSelection = !0, b.createdNodes = [], b.zId = 0, b._ver = (new Date).getTime()
        }, _initCache = function (a) {
            var b = data.getCache(a);
            b || (b = {}, data.setCache(a, b)), b.nodes = [], b.doms = []
        }, _bindEvent = function (a) {
            var b = a.treeObj, c = consts.event;
            b.bind(c.NODECREATED, function (b, c, d) {
                tools.apply(a.callback.onNodeCreated, [b, c, d])
            }), b.bind(c.CLICK, function (b, c, d, e, f) {
                tools.apply(a.callback.onClick, [c, d, e, f])
            }), b.bind(c.EXPAND, function (b, c, d) {
                tools.apply(a.callback.onExpand, [b, c, d])
            }), b.bind(c.COLLAPSE, function (b, c, d) {
                tools.apply(a.callback.onCollapse, [b, c, d])
            }), b.bind(c.ASYNC_SUCCESS, function (b, c, d, e) {
                tools.apply(a.callback.onAsyncSuccess, [b, c, d, e])
            }), b.bind(c.ASYNC_ERROR, function (b, c, d, e, f, g) {
                tools.apply(a.callback.onAsyncError, [b, c, d, e, f, g])
            })
        }, _unbindEvent = function (a) {
            var b = a.treeObj, c = consts.event;
            b.unbind(c.NODECREATED).unbind(c.CLICK).unbind(c.EXPAND).unbind(c.COLLAPSE).unbind(c.ASYNC_SUCCESS).unbind(c.ASYNC_ERROR)
        }, _eventProxy = function (a) {
            var b = a.target, c = data.getSetting(a.data.treeId), d = "", e = null, f = "", g = "", h = null, i = null, j = null;
            if (tools.eqs(a.type, "mousedown") ? g = "mousedown" : tools.eqs(a.type, "mouseup") ? g = "mouseup" : tools.eqs(a.type, "contextmenu") ? g = "contextmenu" : tools.eqs(a.type, "click") ? tools.eqs(b.tagName, "span") && null !== b.getAttribute("treeNode" + consts.id.SWITCH) ? (d = tools.getNodeMainDom(b).id, f = "switchNode") : (j = tools.getMDom(c, b, [
                {tagName: "a", attrName: "treeNode" + consts.id.A}
            ]), j && (d = tools.getNodeMainDom(j).id, f = "clickNode")) : tools.eqs(a.type, "dblclick") && (g = "dblclick", j = tools.getMDom(c, b, [
                {tagName: "a", attrName: "treeNode" + consts.id.A}
            ]), j && (d = tools.getNodeMainDom(j).id, f = "switchNode")), g.length > 0 && 0 == d.length && (j = tools.getMDom(c, b, [
                {tagName: "a", attrName: "treeNode" + consts.id.A}
            ]), j && (d = tools.getNodeMainDom(j).id)), d.length > 0)switch (e = data.getNodeCache(c, d), f) {
                case"switchNode":
                    e.isParent ? tools.eqs(a.type, "click") || tools.eqs(a.type, "dblclick") && tools.apply(c.view.dblClickExpand, [c.treeId, e], c.view.dblClickExpand) ? h = handler.onSwitchNode : f = "" : f = "";
                    break;
                case"clickNode":
                    h = handler.onClickNode
            }
            switch (g) {
                case"mousedown":
                    i = handler.onZTreeMousedown;
                    break;
                case"mouseup":
                    i = handler.onZTreeMouseup;
                    break;
                case"dblclick":
                    i = handler.onZTreeDblclick;
                    break;
                case"contextmenu":
                    i = handler.onZTreeContextmenu
            }
            var k = {stop: !1, node: e, nodeEventType: f, nodeEventCallback: h, treeEventType: g, treeEventCallback: i};
            return k
        }, _initNode = function (a, b, c, d, e, f) {
            if (c) {
                var g = data.getRoot(a), h = a.data.key.children;
                c.level = b, c.tId = a.treeId + "_" + ++g.zId, c.parentTId = d ? d.tId : null, c[h] && c[h].length > 0 ? ("string" == typeof c.open && (c.open = tools.eqs(c.open, "true")), c.open = !!c.open, c.isParent = !0, c.zAsync = !0) : (c.open = !1, "string" == typeof c.isParent && (c.isParent = tools.eqs(c.isParent, "true")), c.isParent = !!c.isParent, c.zAsync = !c.isParent), c.isFirstNode = e, c.isLastNode = f, c.getParentNode = function () {
                    return data.getNodeCache(a, c.parentTId)
                }, c.getPreNode = function () {
                    return data.getPreNode(a, c)
                }, c.getNextNode = function () {
                    return data.getNextNode(a, c)
                }, c.isAjaxing = !1, data.fixPIdKeyValue(a, c)
            }
        }, _init = {bind: [_bindEvent], unbind: [_unbindEvent], caches: [_initCache], nodes: [_initNode], proxys: [_eventProxy], roots: [_initRoot], beforeA: [], afterA: [], innerBeforeA: [], innerAfterA: [], zTreeTools: []}, data = {addNodeCache: function (a, b) {
            data.getCache(a).nodes[data.getNodeCacheId(b.tId)] = b
        }, getNodeCacheId: function (a) {
            return a.substring(a.lastIndexOf("_") + 1)
        }, addAfterA: function (a) {
            _init.afterA.push(a)
        }, addBeforeA: function (a) {
            _init.beforeA.push(a)
        }, addInnerAfterA: function (a) {
            _init.innerAfterA.push(a)
        }, addInnerBeforeA: function (a) {
            _init.innerBeforeA.push(a)
        }, addInitBind: function (a) {
            _init.bind.push(a)
        }, addInitUnBind: function (a) {
            _init.unbind.push(a)
        }, addInitCache: function (a) {
            _init.caches.push(a)
        }, addInitNode: function (a) {
            _init.nodes.push(a)
        }, addInitProxy: function (a, b) {
            b ? _init.proxys.splice(0, 0, a) : _init.proxys.push(a)
        }, addInitRoot: function (a) {
            _init.roots.push(a)
        }, addNodesData: function (a, b, c) {
            var d = a.data.key.children;
            b[d] || (b[d] = []), b[d].length > 0 && (b[d][b[d].length - 1].isLastNode = !1, view.setNodeLineIcos(a, b[d][b[d].length - 1])), b.isParent = !0, b[d] = b[d].concat(c)
        }, addSelectedNode: function (a, b) {
            var c = data.getRoot(a);
            data.isSelectedNode(a, b) || c.curSelectedList.push(b)
        }, addCreatedNode: function (a, b) {
            if (a.callback.onNodeCreated || a.view.addDiyDom) {
                var c = data.getRoot(a);
                c.createdNodes.push(b)
            }
        }, addZTreeTools: function (a) {
            _init.zTreeTools.push(a)
        }, exSetting: function (a) {
            $.extend(!0, _setting, a)
        }, fixPIdKeyValue: function (a, b) {
            a.data.simpleData.enable && (b[a.data.simpleData.pIdKey] = b.parentTId ? b.getParentNode()[a.data.simpleData.idKey] : a.data.simpleData.rootPId)
        }, getAfterA: function () {
            for (var a = 0, b = _init.afterA.length; b > a; a++)_init.afterA[a].apply(this, arguments)
        }, getBeforeA: function () {
            for (var a = 0, b = _init.beforeA.length; b > a; a++)_init.beforeA[a].apply(this, arguments)
        }, getInnerAfterA: function () {
            for (var a = 0, b = _init.innerAfterA.length; b > a; a++)_init.innerAfterA[a].apply(this, arguments)
        }, getInnerBeforeA: function () {
            for (var a = 0, b = _init.innerBeforeA.length; b > a; a++)_init.innerBeforeA[a].apply(this, arguments)
        }, getCache: function (a) {
            return caches[a.treeId]
        }, getNextNode: function (a, b) {
            if (!b)return null;
            for (var c = a.data.key.children, d = b.parentTId ? b.getParentNode() : data.getRoot(a), e = 0, f = d[c].length - 1; f >= e; e++)if (d[c][e] === b)return e == f ? null : d[c][e + 1];
            return null
        }, getNodeByParam: function (a, b, c, d) {
            if (!b || !c)return null;
            for (var e = a.data.key.children, f = 0, g = b.length; g > f; f++) {
                if (b[f][c] == d)return b[f];
                var h = data.getNodeByParam(a, b[f][e], c, d);
                if (h)return h
            }
            return null
        }, getNodeCache: function (a, b) {
            if (!b)return null;
            var c = caches[a.treeId].nodes[data.getNodeCacheId(b)];
            return c ? c : null
        }, getNodeName: function (a, b) {
            var c = a.data.key.name;
            return"" + b[c]
        }, getNodeTitle: function (a, b) {
            var c = "" === a.data.key.title ? a.data.key.name : a.data.key.title;
            return"" + b[c]
        }, getNodes: function (a) {
            return data.getRoot(a)[a.data.key.children]
        }, getNodesByParam: function (a, b, c, d) {
            if (!b || !c)return[];
            for (var e = a.data.key.children, f = [], g = 0, h = b.length; h > g; g++)b[g][c] == d && f.push(b[g]), f = f.concat(data.getNodesByParam(a, b[g][e], c, d));
            return f
        }, getNodesByParamFuzzy: function (a, b, c, d) {
            if (!b || !c)return[];
            var e = a.data.key.children, f = [];
            d = d.toLowerCase();
            for (var g = 0, h = b.length; h > g; g++)"string" == typeof b[g][c] && b[g][c].toLowerCase().indexOf(d) > -1 && f.push(b[g]), f = f.concat(data.getNodesByParamFuzzy(a, b[g][e], c, d));
            return f
        }, getNodesByFilter: function (a, b, c, d, e) {
            if (!b)return d ? null : [];
            for (var f = a.data.key.children, g = d ? null : [], h = 0, i = b.length; i > h; h++) {
                if (tools.apply(c, [b[h], e], !1)) {
                    if (d)return b[h];
                    g.push(b[h])
                }
                var j = data.getNodesByFilter(a, b[h][f], c, d, e);
                if (d && j)return j;
                g = d ? j : g.concat(j)
            }
            return g
        }, getPreNode: function (a, b) {
            if (!b)return null;
            for (var c = a.data.key.children, d = b.parentTId ? b.getParentNode() : data.getRoot(a), e = 0, f = d[c].length; f > e; e++)if (d[c][e] === b)return 0 == e ? null : d[c][e - 1];
            return null
        }, getRoot: function (a) {
            return a ? roots[a.treeId] : null
        }, getRoots: function () {
            return roots
        }, getSetting: function (a) {
            return settings[a]
        }, getSettings: function () {
            return settings
        }, getZTreeTools: function (a) {
            var b = this.getRoot(this.getSetting(a));
            return b ? b.treeTools : null
        }, initCache: function () {
            for (var a = 0, b = _init.caches.length; b > a; a++)_init.caches[a].apply(this, arguments)
        }, initNode: function () {
            for (var a = 0, b = _init.nodes.length; b > a; a++)_init.nodes[a].apply(this, arguments)
        }, initRoot: function () {
            for (var a = 0, b = _init.roots.length; b > a; a++)_init.roots[a].apply(this, arguments)
        }, isSelectedNode: function (a, b) {
            for (var c = data.getRoot(a), d = 0, e = c.curSelectedList.length; e > d; d++)if (b === c.curSelectedList[d])return!0;
            return!1
        }, removeNodeCache: function (a, b) {
            var c = a.data.key.children;
            if (b[c])for (var d = 0, e = b[c].length; e > d; d++)arguments.callee(a, b[c][d]);
            data.getCache(a).nodes[data.getNodeCacheId(b.tId)] = null
        }, removeSelectedNode: function (a, b) {
            for (var c = data.getRoot(a), d = 0, e = c.curSelectedList.length; e > d; d++)b !== c.curSelectedList[d] && data.getNodeCache(a, c.curSelectedList[d].tId) || (c.curSelectedList.splice(d, 1), d--, e--)
        }, setCache: function (a, b) {
            caches[a.treeId] = b
        }, setRoot: function (a, b) {
            roots[a.treeId] = b
        }, setZTreeTools: function () {
            for (var a = 0, b = _init.zTreeTools.length; b > a; a++)_init.zTreeTools[a].apply(this, arguments)
        }, transformToArrayFormat: function (a, b) {
            if (!b)return[];
            var c = a.data.key.children, d = [];
            if (tools.isArray(b))for (var e = 0, f = b.length; f > e; e++)d.push(b[e]), b[e][c] && (d = d.concat(data.transformToArrayFormat(a, b[e][c]))); else d.push(b), b[c] && (d = d.concat(data.transformToArrayFormat(a, b[c])));
            return d
        }, transformTozTreeFormat: function (a, b) {
            var c, d, e = a.data.simpleData.idKey, f = a.data.simpleData.pIdKey, g = a.data.key.children;
            if (!e || "" == e || !b)return[];
            if (tools.isArray(b)) {
                var h = [], i = [];
                for (c = 0, d = b.length; d > c; c++)i[b[c][e]] = b[c];
                for (c = 0, d = b.length; d > c; c++)i[b[c][f]] && b[c][e] != b[c][f] ? (i[b[c][f]][g] || (i[b[c][f]][g] = []), i[b[c][f]][g].push(b[c])) : h.push(b[c]);
                return h
            }
            return[b]
        }}, event = {bindEvent: function () {
            for (var a = 0, b = _init.bind.length; b > a; a++)_init.bind[a].apply(this, arguments)
        }, unbindEvent: function () {
            for (var a = 0, b = _init.unbind.length; b > a; a++)_init.unbind[a].apply(this, arguments)
        }, bindTree: function (a) {
            var b = {treeId: a.treeId}, c = a.treeObj;
            c.bind("selectstart", function (a) {
                var b = a.originalEvent.srcElement.nodeName.toLowerCase();
                return"input" === b || "textarea" === b
            }).css({"-moz-user-select": "-moz-none"}), c.bind("click", b, event.proxy), c.bind("dblclick", b, event.proxy), c.bind("mouseover", b, event.proxy), c.bind("mouseout", b, event.proxy), c.bind("mousedown", b, event.proxy), c.bind("mouseup", b, event.proxy), c.bind("contextmenu", b, event.proxy)
        }, unbindTree: function (a) {
            var b = a.treeObj;
            b.unbind("click", event.proxy).unbind("dblclick", event.proxy).unbind("mouseover", event.proxy).unbind("mouseout", event.proxy).unbind("mousedown", event.proxy).unbind("mouseup", event.proxy).unbind("contextmenu", event.proxy)
        }, doProxy: function () {
            for (var a = [], b = 0, c = _init.proxys.length; c > b; b++) {
                var d = _init.proxys[b].apply(this, arguments);
                if (a.push(d), d.stop)break
            }
            return a
        }, proxy: function (a) {
            var b = data.getSetting(a.data.treeId);
            if (!tools.uCanDo(b, a))return!0;
            for (var c = event.doProxy(a), d = !0, e = !1, f = 0, g = c.length; g > f; f++) {
                var h = c[f];
                h.nodeEventCallback && (e = !0, d = h.nodeEventCallback.apply(h, [a, h.node]) && d), h.treeEventCallback && (e = !0, d = h.treeEventCallback.apply(h, [a, h.node]) && d)
            }
            return d
        }}, handler = {onSwitchNode: function (a, b) {
            var c = data.getSetting(a.data.treeId);
            if (b.open) {
                if (0 == tools.apply(c.callback.beforeCollapse, [c.treeId, b], !0))return!0;
                data.getRoot(c).expandTriggerFlag = !0, view.switchNode(c, b)
            } else {
                if (0 == tools.apply(c.callback.beforeExpand, [c.treeId, b], !0))return!0;
                data.getRoot(c).expandTriggerFlag = !0, view.switchNode(c, b)
            }
            return!0
        }, onClickNode: function (a, b) {
            var c = data.getSetting(a.data.treeId), d = c.view.autoCancelSelected && a.ctrlKey && data.isSelectedNode(c, b) ? 0 : c.view.autoCancelSelected && a.ctrlKey && c.view.selectedMulti ? 2 : 1;
            return 0 == tools.apply(c.callback.beforeClick, [c.treeId, b, d], !0) ? !0 : (0 === d ? view.cancelPreSelectedNode(c, b) : view.selectNode(c, b, 2 === d), c.treeObj.trigger(consts.event.CLICK, [a, c.treeId, b, d]), !0)
        }, onZTreeMousedown: function (a, b) {
            var c = data.getSetting(a.data.treeId);
            return tools.apply(c.callback.beforeMouseDown, [c.treeId, b], !0) && tools.apply(c.callback.onMouseDown, [a, c.treeId, b]), !0
        }, onZTreeMouseup: function (a, b) {
            var c = data.getSetting(a.data.treeId);
            return tools.apply(c.callback.beforeMouseUp, [c.treeId, b], !0) && tools.apply(c.callback.onMouseUp, [a, c.treeId, b]), !0
        }, onZTreeDblclick: function (a, b) {
            var c = data.getSetting(a.data.treeId);
            return tools.apply(c.callback.beforeDblClick, [c.treeId, b], !0) && tools.apply(c.callback.onDblClick, [a, c.treeId, b]), !0
        }, onZTreeContextmenu: function (a, b) {
            var c = data.getSetting(a.data.treeId);
            return tools.apply(c.callback.beforeRightClick, [c.treeId, b], !0) && tools.apply(c.callback.onRightClick, [a, c.treeId, b]), "function" != typeof c.callback.onRightClick
        }}, tools = {apply: function (a, b, c) {
            return"function" == typeof a ? a.apply(zt, b ? b : []) : c
        }, canAsync: function (a, b) {
            var c = a.data.key.children;
            return a.async.enable && b && b.isParent && !(b.zAsync || b[c] && b[c].length > 0)
        }, clone: function (a) {
            if (null === a)return null;
            var b = tools.isArray(a) ? [] : {};
            for (var c in a)b[c] = a[c]instanceof Date ? new Date(a[c].getTime()) : "object" == typeof a[c] ? arguments.callee(a[c]) : a[c];
            return b
        }, eqs: function (a, b) {
            return a.toLowerCase() === b.toLowerCase()
        }, isArray: function (a) {
            return"[object Array]" === Object.prototype.toString.apply(a)
        }, $: function (a, b, c) {
            return b && "string" != typeof b && (c = b, b = ""), "string" == typeof a ? $(a, c ? c.treeObj.get(0).ownerDocument : null) : $("#" + a.tId + b, c ? c.treeObj : null)
        }, getMDom: function (a, b, c) {
            if (!b)return null;
            for (; b && b.id !== a.treeId;) {
                for (var d = 0, e = c.length; b.tagName && e > d; d++)if (tools.eqs(b.tagName, c[d].tagName) && null !== b.getAttribute(c[d].attrName))return b;
                b = b.parentNode
            }
            return null
        }, getNodeMainDom: function (a) {
            return $(a).parent("li").get(0) || $(a).parentsUntil("li").parent().get(0)
        }, uCanDo: function () {
            return!0
        }}, view = {addNodes: function (a, b, c, d) {
            if (!a.data.keep.leaf || !b || b.isParent)if (tools.isArray(c) || (c = [c]), a.data.simpleData.enable && (c = data.transformTozTreeFormat(a, c)), b) {
                var e = $$(b, consts.id.SWITCH, a), f = $$(b, consts.id.ICON, a), g = $$(b, consts.id.UL, a);
                b.open || (view.replaceSwitchClass(b, e, consts.folder.CLOSE), view.replaceIcoClass(b, f, consts.folder.CLOSE), b.open = !1, g.css({display: "none"})), data.addNodesData(a, b, c), view.createNodes(a, b.level + 1, c, b), d || view.expandCollapseParentNode(a, b, !0)
            } else data.addNodesData(a, data.getRoot(a), c), view.createNodes(a, 0, c, null)
        }, appendNodes: function (a, b, c, d, e, f) {
            if (!c)return[];
            for (var g = [], h = a.data.key.children, i = 0, j = c.length; j > i; i++) {
                var k = c[i];
                if (e) {
                    var l = d ? d : data.getRoot(a), m = l[h], n = m.length == c.length && 0 == i, o = i == c.length - 1;
                    data.initNode(a, b, k, d, n, o, f), data.addNodeCache(a, k)
                }
                var p = [];
                k[h] && k[h].length > 0 && (p = view.appendNodes(a, b + 1, k[h], k, e, f && k.open)), f && (view.makeDOMNodeMainBefore(g, a, k), view.makeDOMNodeLine(g, a, k), data.getBeforeA(a, k, g), view.makeDOMNodeNameBefore(g, a, k), data.getInnerBeforeA(a, k, g), view.makeDOMNodeIcon(g, a, k), data.getInnerAfterA(a, k, g), view.makeDOMNodeNameAfter(g, a, k), data.getAfterA(a, k, g), k.isParent && k.open && view.makeUlHtml(a, k, g, p.join("")), view.makeDOMNodeMainAfter(g, a, k), data.addCreatedNode(a, k))
            }
            return g
        }, appendParentULDom: function (a, b) {
            var c = [], d = $$(b, a);
            !d.get(0) && b.parentTId && (view.appendParentULDom(a, b.getParentNode()), d = $$(b, a));
            var e = $$(b, consts.id.UL, a);
            e.get(0) && e.remove();
            var f = a.data.key.children, g = view.appendNodes(a, b.level + 1, b[f], b, !1, !0);
            view.makeUlHtml(a, b, c, g.join("")), d.append(c.join(""))
        }, asyncNode: function (setting, node, isSilent, callback) {
            var i, l;
            if (node && !node.isParent)return tools.apply(callback), !1;
            if (node && node.isAjaxing)return!1;
            if (0 == tools.apply(setting.callback.beforeAsync, [setting.treeId, node], !0))return tools.apply(callback), !1;
            if (node) {
                node.isAjaxing = !0;
                var icoObj = $$(node, consts.id.ICON, setting);
                icoObj.attr({style: "", "class": consts.className.BUTTON + " " + consts.className.ICO_LOADING})
            }
            var tmpParam = {};
            for (i = 0, l = setting.async.autoParam.length; node && l > i; i++) {
                var pKey = setting.async.autoParam[i].split("="), spKey = pKey;
                pKey.length > 1 && (spKey = pKey[1], pKey = pKey[0]), tmpParam[spKey] = node[pKey]
            }
            if (tools.isArray(setting.async.otherParam))for (i = 0, l = setting.async.otherParam.length; l > i; i += 2)tmpParam[setting.async.otherParam[i]] = setting.async.otherParam[i + 1]; else for (var p in setting.async.otherParam)tmpParam[p] = setting.async.otherParam[p];
            var _tmpV = data.getRoot(setting)._ver;
            return $.ajax({contentType: setting.async.contentType, type: setting.async.type, url: tools.apply(setting.async.url, [setting.treeId, node], setting.async.url), data: tmpParam, dataType: setting.async.dataType, success: function (msg) {
                if (_tmpV == data.getRoot(setting)._ver) {
                    var newNodes = [];
                    try {
                        newNodes = msg && 0 != msg.length ? "string" == typeof msg ? eval("(" + msg + ")") : msg : []
                    } catch (err) {
                        newNodes = msg
                    }
                    node && (node.isAjaxing = null, node.zAsync = !0), view.setNodeLineIcos(setting, node), newNodes && "" !== newNodes ? (newNodes = tools.apply(setting.async.dataFilter, [setting.treeId, node, newNodes], newNodes), view.addNodes(setting, node, newNodes ? tools.clone(newNodes) : [], !!isSilent)) : view.addNodes(setting, node, [], !!isSilent), setting.treeObj.trigger(consts.event.ASYNC_SUCCESS, [setting.treeId, node, msg]), tools.apply(callback)
                }
            }, error: function (a, b, c) {
                _tmpV == data.getRoot(setting)._ver && (node && (node.isAjaxing = null), view.setNodeLineIcos(setting, node), setting.treeObj.trigger(consts.event.ASYNC_ERROR, [setting.treeId, node, a, b, c]))
            }}), !0
        }, cancelPreSelectedNode: function (a, b) {
            for (var c = data.getRoot(a).curSelectedList, d = 0, e = c.length - 1; e >= d; e--)if ((!b || b === c[e]) && ($$(c[e], consts.id.A, a).removeClass(consts.node.CURSELECTED), b)) {
                data.removeSelectedNode(a, b);
                break
            }
            b || (data.getRoot(a).curSelectedList = [])
        }, createNodeCallback: function (a) {
            if (a.callback.onNodeCreated || a.view.addDiyDom)for (var b = data.getRoot(a); b.createdNodes.length > 0;) {
                var c = b.createdNodes.shift();
                tools.apply(a.view.addDiyDom, [a.treeId, c]), a.callback.onNodeCreated && a.treeObj.trigger(consts.event.NODECREATED, [a.treeId, c])
            }
        }, createNodes: function (a, b, c, d) {
            if (c && 0 != c.length) {
                var e = data.getRoot(a), f = a.data.key.children, g = !d || d.open || !!$$(d[f][0], a).get(0);
                e.createdNodes = [];
                var h = view.appendNodes(a, b, c, d, !0, g);
                if (d) {
                    var i = $$(d, consts.id.UL, a);
                    i.get(0) && i.append(h.join(""))
                } else a.treeObj.append(h.join(""));
                view.createNodeCallback(a)
            }
        }, destroy: function (a) {
            a && (data.initCache(a), data.initRoot(a), event.unbindTree(a), event.unbindEvent(a), a.treeObj.empty())
        }, expandCollapseNode: function (a, b, c, d, e) {
            var f = data.getRoot(a), g = a.data.key.children;
            if (!b)return tools.apply(e, []), void 0;
            if (f.expandTriggerFlag) {
                var h = e;
                e = function () {
                    h && h(), b.open ? a.treeObj.trigger(consts.event.EXPAND, [a.treeId, b]) : a.treeObj.trigger(consts.event.COLLAPSE, [a.treeId, b])
                }, f.expandTriggerFlag = !1
            }
            if (!b.open && b.isParent && (!$$(b, consts.id.UL, a).get(0) || b[g] && b[g].length > 0 && !$$(b[g][0], a).get(0)) && (view.appendParentULDom(a, b), view.createNodeCallback(a)), b.open == c)return tools.apply(e, []), void 0;
            var i = $$(b, consts.id.UL, a), j = $$(b, consts.id.SWITCH, a), k = $$(b, consts.id.ICON, a);
            b.isParent ? (b.open = !b.open, b.iconOpen && b.iconClose && k.attr("style", view.makeNodeIcoStyle(a, b)), b.open ? (view.replaceSwitchClass(b, j, consts.folder.OPEN), view.replaceIcoClass(b, k, consts.folder.OPEN), 0 == d || "" == a.view.expandSpeed ? (i.show(), tools.apply(e, [])) : b[g] && b[g].length > 0 ? i.slideDown(a.view.expandSpeed, e) : (i.show(), tools.apply(e, []))) : (view.replaceSwitchClass(b, j, consts.folder.CLOSE), view.replaceIcoClass(b, k, consts.folder.CLOSE), 0 != d && "" != a.view.expandSpeed && b[g] && b[g].length > 0 ? i.slideUp(a.view.expandSpeed, e) : (i.hide(), tools.apply(e, [])))) : tools.apply(e, [])
        }, expandCollapseParentNode: function (a, b, c, d, e) {
            if (b) {
                if (!b.parentTId)return view.expandCollapseNode(a, b, c, d, e), void 0;
                view.expandCollapseNode(a, b, c, d), b.parentTId && view.expandCollapseParentNode(a, b.getParentNode(), c, d, e)
            }
        }, expandCollapseSonNode: function (a, b, c, d, e) {
            var f = data.getRoot(a), g = a.data.key.children, h = b ? b[g] : f[g], i = b ? !1 : d, j = data.getRoot(a).expandTriggerFlag;
            if (data.getRoot(a).expandTriggerFlag = !1, h)for (var k = 0, l = h.length; l > k; k++)h[k] && view.expandCollapseSonNode(a, h[k], c, i);
            data.getRoot(a).expandTriggerFlag = j, view.expandCollapseNode(a, b, c, d, e)
        }, makeDOMNodeIcon: function (a, b, c) {
            var d = data.getNodeName(b, c), e = b.view.nameIsHTML ? d : d.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            a.push("<span id='", c.tId, consts.id.ICON, "' title='' treeNode", consts.id.ICON, " class='", view.makeNodeIcoClass(b, c), "' style='", view.makeNodeIcoStyle(b, c), "'></span><span id='", c.tId, consts.id.SPAN, "'>", e, "</span>")
        }, makeDOMNodeLine: function (a, b, c) {
            a.push("<span id='", c.tId, consts.id.SWITCH, "' title='' class='", view.makeNodeLineClass(b, c), "' treeNode", consts.id.SWITCH, "></span>")
        }, makeDOMNodeMainAfter: function (a) {
            a.push("</li>")
        }, makeDOMNodeMainBefore: function (a, b, c) {
            a.push("<li id='", c.tId, "' class='", consts.className.LEVEL, c.level, "' tabindex='0' hidefocus='true' treenode>")
        }, makeDOMNodeNameAfter: function (a) {
            a.push("</a>")
        }, makeDOMNodeNameBefore: function (a, b, c) {
            var d = data.getNodeTitle(b, c), e = view.makeNodeUrl(b, c), f = view.makeNodeFontCss(b, c), g = [];
            for (var h in f)g.push(h, ":", f[h], ";");
            a.push("<a id='", c.tId, consts.id.A, "' class='", consts.className.LEVEL, c.level, "' treeNode", consts.id.A, ' onclick="', c.click || "", '" ', null != e && e.length > 0 ? "href='" + e + "'" : "", " target='", view.makeNodeTarget(c), "' style='", g.join(""), "'"), tools.apply(b.view.showTitle, [b.treeId, c], b.view.showTitle) && d && a.push("title='", d.replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), "'"), a.push(">")
        }, makeNodeFontCss: function (a, b) {
            var c = tools.apply(a.view.fontCss, [a.treeId, b], a.view.fontCss);
            return c && "function" != typeof c ? c : {}
        }, makeNodeIcoClass: function (a, b) {
            var c = ["ico"];
            return b.isAjaxing || (c[0] = (b.iconSkin ? b.iconSkin + "_" : "") + c[0], b.isParent ? c.push(b.open ? consts.folder.OPEN : consts.folder.CLOSE) : c.push(consts.folder.DOCU)), consts.className.BUTTON + " " + c.join("_")
        }, makeNodeIcoStyle: function (a, b) {
            var c = [];
            if (!b.isAjaxing) {
                var d = b.isParent && b.iconOpen && b.iconClose ? b.open ? b.iconOpen : b.iconClose : b.icon;
                d && c.push("background:url(", d, ") 0 0 no-repeat;"), 0 != a.view.showIcon && tools.apply(a.view.showIcon, [a.treeId, b], !0) || c.push("width:0px;height:0px;")
            }
            return c.join("")
        }, makeNodeLineClass: function (a, b) {
            var c = [];
            return a.view.showLine ? 0 == b.level && b.isFirstNode && b.isLastNode ? c.push(consts.line.ROOT) : 0 == b.level && b.isFirstNode ? c.push(consts.line.ROOTS) : b.isLastNode ? c.push(consts.line.BOTTOM) : c.push(consts.line.CENTER) : c.push(consts.line.NOLINE), b.isParent ? c.push(b.open ? consts.folder.OPEN : consts.folder.CLOSE) : c.push(consts.folder.DOCU), view.makeNodeLineClassEx(b) + c.join("_")
        }, makeNodeLineClassEx: function (a) {
            return consts.className.BUTTON + " " + consts.className.LEVEL + a.level + " " + consts.className.SWITCH + " "
        }, makeNodeTarget: function (a) {
            return a.target || "_blank"
        }, makeNodeUrl: function (a, b) {
            var c = a.data.key.url;
            return b[c] ? b[c] : null
        }, makeUlHtml: function (a, b, c, d) {
            c.push("<ul id='", b.tId, consts.id.UL, "' class='", consts.className.LEVEL, b.level, " ", view.makeUlLineClass(a, b), "' style='display:", b.open ? "block" : "none", "'>"), c.push(d), c.push("</ul>")
        }, makeUlLineClass: function (a, b) {
            return a.view.showLine && !b.isLastNode ? consts.line.LINE : ""
        }, removeChildNodes: function (a, b) {
            if (b) {
                var c = a.data.key.children, d = b[c];
                if (d) {
                    for (var e = 0, f = d.length; f > e; e++)data.removeNodeCache(a, d[e]);
                    if (data.removeSelectedNode(a), delete b[c], a.data.keep.parent)$$(b, consts.id.UL, a).empty(); else {
                        b.isParent = !1, b.open = !1;
                        var g = $$(b, consts.id.SWITCH, a), h = $$(b, consts.id.ICON, a);
                        view.replaceSwitchClass(b, g, consts.folder.DOCU), view.replaceIcoClass(b, h, consts.folder.DOCU), $$(b, consts.id.UL, a).remove()
                    }
                }
            }
        }, setFirstNode: function (a, b) {
            var c = a.data.key.children, d = b[c].length;
            d > 0 && (b[c][0].isFirstNode = !0)
        }, setLastNode: function (a, b) {
            var c = a.data.key.children, d = b[c].length;
            d > 0 && (b[c][d - 1].isLastNode = !0)
        }, removeNode: function (a, b) {
            var c = data.getRoot(a), d = a.data.key.children, e = b.parentTId ? b.getParentNode() : c;
            if (b.isFirstNode = !1, b.isLastNode = !1, b.getPreNode = function () {
                return null
            }, b.getNextNode = function () {
                return null
            }, data.getNodeCache(a, b.tId)) {
                $$(b, a).remove(), data.removeNodeCache(a, b), data.removeSelectedNode(a, b);
                for (var f = 0, g = e[d].length; g > f; f++)if (e[d][f].tId == b.tId) {
                    e[d].splice(f, 1);
                    break
                }
                view.setFirstNode(a, e), view.setLastNode(a, e);
                var h, i, j, k = e[d].length;
                if (a.data.keep.parent || 0 != k) {
                    if (a.view.showLine && k > 0) {
                        var l = e[d][k - 1];
                        if (h = $$(l, consts.id.UL, a), i = $$(l, consts.id.SWITCH, a), j = $$(l, consts.id.ICON, a), e == c)if (1 == e[d].length)view.replaceSwitchClass(l, i, consts.line.ROOT); else {
                            var m = $$(e[d][0], consts.id.SWITCH, a);
                            view.replaceSwitchClass(e[d][0], m, consts.line.ROOTS), view.replaceSwitchClass(l, i, consts.line.BOTTOM)
                        } else view.replaceSwitchClass(l, i, consts.line.BOTTOM);
                        h.removeClass(consts.line.LINE)
                    }
                } else e.isParent = !1, e.open = !1, h = $$(e, consts.id.UL, a), i = $$(e, consts.id.SWITCH, a), j = $$(e, consts.id.ICON, a), view.replaceSwitchClass(e, i, consts.folder.DOCU), view.replaceIcoClass(e, j, consts.folder.DOCU), h.css("display", "none")
            }
        }, replaceIcoClass: function (a, b, c) {
            if (b && !a.isAjaxing) {
                var d = b.attr("class");
                if (void 0 != d) {
                    var e = d.split("_");
                    switch (c) {
                        case consts.folder.OPEN:
                        case consts.folder.CLOSE:
                        case consts.folder.DOCU:
                            e[e.length - 1] = c
                    }
                    b.attr("class", e.join("_"))
                }
            }
        }, replaceSwitchClass: function (a, b, c) {
            if (b) {
                var d = b.attr("class");
                if (void 0 != d) {
                    var e = d.split("_");
                    switch (c) {
                        case consts.line.ROOT:
                        case consts.line.ROOTS:
                        case consts.line.CENTER:
                        case consts.line.BOTTOM:
                        case consts.line.NOLINE:
                            e[0] = view.makeNodeLineClassEx(a) + c;
                            break;
                        case consts.folder.OPEN:
                        case consts.folder.CLOSE:
                        case consts.folder.DOCU:
                            e[1] = c
                    }
                    b.attr("class", e.join("_")), c !== consts.folder.DOCU ? b.removeAttr("disabled") : b.attr("disabled", "disabled")
                }
            }
        }, selectNode: function (a, b, c) {
            c || view.cancelPreSelectedNode(a), $$(b, consts.id.A, a).addClass(consts.node.CURSELECTED), data.addSelectedNode(a, b)
        }, setNodeFontCss: function (a, b) {
            var c = $$(b, consts.id.A, a), d = view.makeNodeFontCss(a, b);
            d && c.css(d)
        }, setNodeLineIcos: function (a, b) {
            if (b) {
                var c = $$(b, consts.id.SWITCH, a), d = $$(b, consts.id.UL, a), e = $$(b, consts.id.ICON, a), f = view.makeUlLineClass(a, b);
                0 == f.length ? d.removeClass(consts.line.LINE) : d.addClass(f), c.attr("class", view.makeNodeLineClass(a, b)), b.isParent ? c.removeAttr("disabled") : c.attr("disabled", "disabled"), e.removeAttr("style"), e.attr("style", view.makeNodeIcoStyle(a, b)), e.attr("class", view.makeNodeIcoClass(a, b))
            }
        }, setNodeName: function (a, b) {
            var c = data.getNodeTitle(a, b), d = $$(b, consts.id.SPAN, a);
            if (d.empty(), a.view.nameIsHTML ? d.html(data.getNodeName(a, b)) : d.text(data.getNodeName(a, b)), tools.apply(a.view.showTitle, [a.treeId, b], a.view.showTitle)) {
                var e = $$(b, consts.id.A, a);
                e.attr("title", c ? c : "")
            }
        }, setNodeTarget: function (a, b) {
            var c = $$(b, consts.id.A, a);
            c.attr("target", view.makeNodeTarget(b))
        }, setNodeUrl: function (a, b) {
            var c = $$(b, consts.id.A, a), d = view.makeNodeUrl(a, b);
            null == d || 0 == d.length ? c.removeAttr("href") : c.attr("href", d)
        }, switchNode: function (a, b) {
            if (b.open || !tools.canAsync(a, b))view.expandCollapseNode(a, b, !b.open); else if (a.async.enable) {
                if (!view.asyncNode(a, b))return view.expandCollapseNode(a, b, !b.open), void 0
            } else b && view.expandCollapseNode(a, b, !b.open)
        }};
        $.fn.zTree = {consts: _consts, _z: {tools: tools, view: view, event: event, data: data}, getZTreeObj: function (a) {
            var b = data.getZTreeTools(a);
            return b ? b : null
        }, destroy: function (a) {
            if (a && a.length > 0)view.destroy(data.getSetting(a)); else for (var b in settings)view.destroy(settings[b])
        }, init: function (a, b, c) {
            var d = tools.clone(_setting);
            $.extend(!0, d, b), d.treeId = a.attr("id"), d.treeObj = a, d.treeObj.empty(), settings[d.treeId] = d, "undefined" == typeof document.body.style.maxHeight && (d.view.expandSpeed = ""), data.initRoot(d);
            var e = data.getRoot(d), f = d.data.key.children;
            c = c ? tools.clone(tools.isArray(c) ? c : [c]) : [], e[f] = d.data.simpleData.enable ? data.transformTozTreeFormat(d, c) : c, data.initCache(d), event.unbindTree(d), event.bindTree(d), event.unbindEvent(d), event.bindEvent(d);
            var g = {setting: d, addNodes: function (a, b, c) {
                function e() {
                    view.addNodes(d, a, f, 1 == c)
                }

                if (!b)return null;
                if (a || (a = null), a && !a.isParent && d.data.keep.leaf)return null;
                var f = tools.clone(tools.isArray(b) ? b : [b]);
                return tools.canAsync(d, a) ? view.asyncNode(d, a, c, e) : e(), f
            }, cancelSelectedNode: function (a) {
                view.cancelPreSelectedNode(d, a)
            }, destroy: function () {
                view.destroy(d)
            }, expandAll: function (a) {
                return a = !!a, view.expandCollapseSonNode(d, null, a, !0), a
            }, expandNode: function (a, b, c, e, f) {
                if (!a || !a.isParent)return null;
                if (b !== !0 && b !== !1 && (b = !a.open), f = !!f, f && b && 0 == tools.apply(d.callback.beforeExpand, [d.treeId, a], !0))return null;
                if (f && !b && 0 == tools.apply(d.callback.beforeCollapse, [d.treeId, a], !0))return null;
                if (b && a.parentTId && view.expandCollapseParentNode(d, a.getParentNode(), b, !1), b === a.open && !c)return null;
                if (data.getRoot(d).expandTriggerFlag = f, !tools.canAsync(d, a) && c)view.expandCollapseSonNode(d, a, b, !0, function () {
                    if (e !== !1)try {
                        $$(a, d).focus().blur()
                    } catch (b) {
                    }
                }); else if (a.open = !b, view.switchNode(this.setting, a), e !== !1)try {
                    $$(a, d).focus().blur()
                } catch (g) {
                }
                return b
            }, getNodes: function () {
                return data.getNodes(d)
            }, getNodeByParam: function (a, b, c) {
                return a ? data.getNodeByParam(d, c ? c[d.data.key.children] : data.getNodes(d), a, b) : null
            }, getNodeByTId: function (a) {
                return data.getNodeCache(d, a)
            }, getNodesByParam: function (a, b, c) {
                return a ? data.getNodesByParam(d, c ? c[d.data.key.children] : data.getNodes(d), a, b) : null
            }, getNodesByParamFuzzy: function (a, b, c) {
                return a ? data.getNodesByParamFuzzy(d, c ? c[d.data.key.children] : data.getNodes(d), a, b) : null
            }, getNodesByFilter: function (a, b, c, e) {
                return b = !!b, a && "function" == typeof a ? data.getNodesByFilter(d, c ? c[d.data.key.children] : data.getNodes(d), a, b, e) : b ? null : []
            }, getNodeIndex: function (a) {
                if (!a)return null;
                for (var b = d.data.key.children, c = a.parentTId ? a.getParentNode() : data.getRoot(d), e = 0, f = c[b].length; f > e; e++)if (c[b][e] == a)return e;
                return-1
            }, getSelectedNodes: function () {
                for (var a = [], b = data.getRoot(d).curSelectedList, c = 0, e = b.length; e > c; c++)a.push(b[c]);
                return a
            }, isSelectedNode: function (a) {
                return data.isSelectedNode(d, a)
            }, reAsyncChildNodes: function (a, b, c) {
                if (this.setting.async.enable) {
                    var e = !a;
                    if (e && (a = data.getRoot(d)), "refresh" == b) {
                        for (var f = this.setting.data.key.children, g = 0, h = a[f] ? a[f].length : 0; h > g; g++)data.removeNodeCache(d, a[f][g]);
                        if (data.removeSelectedNode(d), a[f] = [], e)this.setting.treeObj.empty(); else {
                            var i = $$(a, consts.id.UL, d);
                            i.empty()
                        }
                    }
                    view.asyncNode(this.setting, e ? null : a, !!c)
                }
            }, refresh: function () {
                this.setting.treeObj.empty();
                var a = data.getRoot(d), b = a[d.data.key.children];
                data.initRoot(d), a[d.data.key.children] = b, data.initCache(d), view.createNodes(d, 0, a[d.data.key.children])
            }, removeChildNodes: function (a) {
                if (!a)return null;
                var b = d.data.key.children, c = a[b];
                return view.removeChildNodes(d, a), c ? c : null
            }, removeNode: function (a, b) {
                a && (b = !!b, b && 0 == tools.apply(d.callback.beforeRemove, [d.treeId, a], !0) || (view.removeNode(d, a), b && this.setting.treeObj.trigger(consts.event.REMOVE, [d.treeId, a])))
            }, selectNode: function (a, b) {
                if (a && tools.uCanDo(d)) {
                    if (b = d.view.selectedMulti && b, a.parentTId)view.expandCollapseParentNode(d, a.getParentNode(), !0, !1, function () {
                        try {
                            $$(a, d).focus().blur()
                        } catch (b) {
                        }
                    }); else try {
                        $$(a, d).focus().blur()
                    } catch (c) {
                    }
                    view.selectNode(d, a, b)
                }
            }, transformTozTreeNodes: function (a) {
                return data.transformTozTreeFormat(d, a)
            }, transformToArray: function (a) {
                return data.transformToArrayFormat(d, a)
            }, updateNode: function (a) {
                if (a) {
                    var b = $$(a, d);
                    b.get(0) && tools.uCanDo(d) && (view.setNodeName(d, a), view.setNodeTarget(d, a), view.setNodeUrl(d, a), view.setNodeLineIcos(d, a), view.setNodeFontCss(d, a))
                }
            }};
            return e.treeTools = g, data.setZTreeTools(d, g), e[f] && e[f].length > 0 ? view.createNodes(d, 0, e[f]) : d.async.enable && d.async.url && "" !== d.async.url && view.asyncNode(d), g
        }};
        var zt = $.fn.zTree, $$ = tools.$, consts = zt.consts
    }(jQuery), function (a) {
        var b = {event: {CHECK: "ztree_check"}, id: {CHECK: "_check"}, checkbox: {STYLE: "checkbox", DEFAULT: "chk", DISABLED: "disable", FALSE: "false", TRUE: "true", FULL: "full", PART: "part", FOCUS: "focus"}, radio: {STYLE: "radio", TYPE_ALL: "all", TYPE_LEVEL: "level"}}, c = {check: {enable: !1, autoCheckTrigger: !1, chkStyle: b.checkbox.STYLE, nocheckInherit: !1, chkDisabledInherit: !1, radioType: b.radio.TYPE_LEVEL, chkboxType: {Y: "ps", N: "ps"}}, data: {key: {checked: "checked"}}, callback: {beforeCheck: null, onCheck: null}}, d = function (a) {
            var b = v.getRoot(a);
            b.radioCheckedList = []
        }, e = function () {
        }, f = function (a) {
            var b = a.treeObj, c = t.event;
            b.bind(c.CHECK, function (b, c, d, e) {
                s.apply(a.callback.onCheck, [c ? c : b, d, e])
            })
        }, g = function (a) {
            var b = a.treeObj, c = t.event;
            b.unbind(c.CHECK)
        }, h = function (a) {
            var b = a.target, c = v.getSetting(a.data.treeId), d = "", e = null, f = "", g = "", h = null, i = null;
            if (s.eqs(a.type, "mouseover") ? c.check.enable && s.eqs(b.tagName, "span") && null !== b.getAttribute("treeNode" + t.id.CHECK) && (d = s.getNodeMainDom(b).id, f = "mouseoverCheck") : s.eqs(a.type, "mouseout") ? c.check.enable && s.eqs(b.tagName, "span") && null !== b.getAttribute("treeNode" + t.id.CHECK) && (d = s.getNodeMainDom(b).id, f = "mouseoutCheck") : s.eqs(a.type, "click") && c.check.enable && s.eqs(b.tagName, "span") && null !== b.getAttribute("treeNode" + t.id.CHECK) && (d = s.getNodeMainDom(b).id, f = "checkNode"), d.length > 0)switch (e = v.getNodeCache(c, d), f) {
                case"checkNode":
                    h = n.onCheckNode;
                    break;
                case"mouseoverCheck":
                    h = n.onMouseoverCheck;
                    break;
                case"mouseoutCheck":
                    h = n.onMouseoutCheck
            }
            var j = {stop: "checkNode" === f, node: e, nodeEventType: f, nodeEventCallback: h, treeEventType: g, treeEventCallback: i};
            return j
        }, i = function (a, b, c, d) {
            if (c) {
                var e = a.data.key.checked;
                if ("string" == typeof c[e] && (c[e] = s.eqs(c[e], "true")), c[e] = !!c[e], c.checkedOld = c[e], "string" == typeof c.nocheck && (c.nocheck = s.eqs(c.nocheck, "true")), c.nocheck = !!c.nocheck || a.check.nocheckInherit && d && !!d.nocheck, "string" == typeof c.chkDisabled && (c.chkDisabled = s.eqs(c.chkDisabled, "true")), c.chkDisabled = !!c.chkDisabled || a.check.chkDisabledInherit && d && !!d.chkDisabled, "string" == typeof c.halfCheck && (c.halfCheck = s.eqs(c.halfCheck, "true")), c.halfCheck = !!c.halfCheck, c.check_Child_State = -1, c.check_Focus = !1, c.getCheckStatus = function () {
                    return v.getCheckStatus(a, c)
                }, a.check.chkStyle == t.radio.STYLE && a.check.radioType == t.radio.TYPE_ALL && c[e]) {
                    var f = v.getRoot(a);
                    f.radioCheckedList.push(c)
                }
            }
        }, j = function (a, b, c) {
            a.data.key.checked, a.check.enable && (v.makeChkFlag(a, b), c.push("<span ID='", b.tId, t.id.CHECK, "' class='", u.makeChkClass(a, b), "' treeNode", t.id.CHECK, b.nocheck === !0 ? " style='display:none;'" : "", "></span>"))
        }, k = function (a, b) {
            b.checkNode = function (b, c, d, e) {
                var f = a.data.key.checked;
                if (b.chkDisabled !== !0 && (c !== !0 && c !== !1 && (c = !b[f]), e = !!e, (b[f] !== c || d) && (!e || 0 != s.apply(this.setting.callback.beforeCheck, [a.treeId, b], !0)) && s.uCanDo(this.setting) && a.check.enable && b.nocheck !== !0)) {
                    b[f] = c;
                    var g = w(b, t.id.CHECK, a);
                    (d || a.check.chkStyle === t.radio.STYLE) && u.checkNodeRelation(a, b), u.setChkClass(a, g, b), u.repairParentChkClassWithSelf(a, b), e && a.treeObj.trigger(t.event.CHECK, [null, a.treeId, b])
                }
            }, b.checkAllNodes = function (b) {
                u.repairAllChk(a, !!b)
            }, b.getCheckedNodes = function (b) {
                var c = a.data.key.children;
                return b = b !== !1, v.getTreeCheckedNodes(a, v.getRoot(a)[c], b)
            }, b.getChangeCheckedNodes = function () {
                var b = a.data.key.children;
                return v.getTreeChangeCheckedNodes(a, v.getRoot(a)[b])
            }, b.setChkDisabled = function (b, c, d, e) {
                c = !!c, d = !!d, e = !!e, u.repairSonChkDisabled(a, b, c, e), u.repairParentChkDisabled(a, b.getParentNode(), c, d)
            };
            var c = b.updateNode;
            b.updateNode = function (d, e) {
                if (c && c.apply(b, arguments), d && a.check.enable) {
                    var f = w(d, a);
                    if (f.get(0) && s.uCanDo(a)) {
                        var g = w(d, t.id.CHECK, a);
                        (1 == e || a.check.chkStyle === t.radio.STYLE) && u.checkNodeRelation(a, d), u.setChkClass(a, g, d), u.repairParentChkClassWithSelf(a, d)
                    }
                }
            }
        }, l = {getRadioCheckedList: function (a) {
            for (var b = v.getRoot(a).radioCheckedList, c = 0, d = b.length; d > c; c++)v.getNodeCache(a, b[c].tId) || (b.splice(c, 1), c--, d--);
            return b
        }, getCheckStatus: function (a, b) {
            if (!a.check.enable || b.nocheck || b.chkDisabled)return null;
            var c = a.data.key.checked, d = {checked: b[c], half: b.halfCheck ? b.halfCheck : a.check.chkStyle == t.radio.STYLE ? 2 === b.check_Child_State : b[c] ? b.check_Child_State > -1 && b.check_Child_State < 2 : b.check_Child_State > 0};
            return d
        }, getTreeCheckedNodes: function (a, b, c, d) {
            if (!b)return[];
            var e = a.data.key.children, f = a.data.key.checked, g = c && a.check.chkStyle == t.radio.STYLE && a.check.radioType == t.radio.TYPE_ALL;
            d = d ? d : [];
            for (var h = 0, i = b.length; i > h && (b[h].nocheck === !0 || b[h].chkDisabled === !0 || b[h][f] != c || (d.push(b[h]), !g)) && (v.getTreeCheckedNodes(a, b[h][e], c, d), !(g && d.length > 0)); h++);
            return d
        }, getTreeChangeCheckedNodes: function (a, b, c) {
            if (!b)return[];
            var d = a.data.key.children, e = a.data.key.checked;
            c = c ? c : [];
            for (var f = 0, g = b.length; g > f; f++)b[f].nocheck !== !0 && b[f].chkDisabled !== !0 && b[f][e] != b[f].checkedOld && c.push(b[f]), v.getTreeChangeCheckedNodes(a, b[f][d], c);
            return c
        }, makeChkFlag: function (a, b) {
            if (b) {
                var c = a.data.key.children, d = a.data.key.checked, e = -1;
                if (b[c])for (var f = 0, g = b[c].length; g > f; f++) {
                    var h = b[c][f], i = -1;
                    if (a.check.chkStyle == t.radio.STYLE) {
                        if (i = h.nocheck === !0 || h.chkDisabled === !0 ? h.check_Child_State : h.halfCheck === !0 ? 2 : h[d] ? 2 : h.check_Child_State > 0 ? 2 : 0, 2 == i) {
                            e = 2;
                            break
                        }
                        0 == i && (e = 0)
                    } else if (a.check.chkStyle == t.checkbox.STYLE) {
                        if (i = h.nocheck === !0 || h.chkDisabled === !0 ? h.check_Child_State : h.halfCheck === !0 ? 1 : h[d] ? -1 === h.check_Child_State || 2 === h.check_Child_State ? 2 : 1 : h.check_Child_State > 0 ? 1 : 0, 1 === i) {
                            e = 1;
                            break
                        }
                        if (2 === i && e > -1 && f > 0 && i !== e) {
                            e = 1;
                            break
                        }
                        if (2 === e && i > -1 && 2 > i) {
                            e = 1;
                            break
                        }
                        i > -1 && (e = i)
                    }
                }
                b.check_Child_State = e
            }
        }}, m = {}, n = {onCheckNode: function (a, b) {
            if (b.chkDisabled === !0)return!1;
            var c = v.getSetting(a.data.treeId), d = c.data.key.checked;
            if (0 == s.apply(c.callback.beforeCheck, [c.treeId, b], !0))return!0;
            b[d] = !b[d], u.checkNodeRelation(c, b);
            var e = w(b, t.id.CHECK, c);
            return u.setChkClass(c, e, b), u.repairParentChkClassWithSelf(c, b), c.treeObj.trigger(t.event.CHECK, [a, c.treeId, b]), !0
        }, onMouseoverCheck: function (a, b) {
            if (b.chkDisabled === !0)return!1;
            var c = v.getSetting(a.data.treeId), d = w(b, t.id.CHECK, c);
            return b.check_Focus = !0, u.setChkClass(c, d, b), !0
        }, onMouseoutCheck: function (a, b) {
            if (b.chkDisabled === !0)return!1;
            var c = v.getSetting(a.data.treeId), d = w(b, t.id.CHECK, c);
            return b.check_Focus = !1, u.setChkClass(c, d, b), !0
        }}, o = {}, p = {checkNodeRelation: function (a, b) {
            var c, d, e, f = a.data.key.children, g = a.data.key.checked, h = t.radio;
            if (a.check.chkStyle == h.STYLE) {
                var i = v.getRadioCheckedList(a);
                if (b[g])if (a.check.radioType == h.TYPE_ALL) {
                    for (d = i.length - 1; d >= 0; d--)c = i[d], c[g] = !1, i.splice(d, 1), u.setChkClass(a, w(c, t.id.CHECK, a), c), c.parentTId != b.parentTId && u.repairParentChkClassWithSelf(a, c);
                    i.push(b)
                } else {
                    var j = b.parentTId ? b.getParentNode() : v.getRoot(a);
                    for (d = 0, e = j[f].length; e > d; d++)c = j[f][d], c[g] && c != b && (c[g] = !1, u.setChkClass(a, w(c, t.id.CHECK, a), c))
                } else if (a.check.radioType == h.TYPE_ALL)for (d = 0, e = i.length; e > d; d++)if (b == i[d]) {
                    i.splice(d, 1);
                    break
                }
            } else b[g] && (!b[f] || 0 == b[f].length || a.check.chkboxType.Y.indexOf("s") > -1) && u.setSonNodeCheckBox(a, b, !0), b[g] || b[f] && 0 != b[f].length && !(a.check.chkboxType.N.indexOf("s") > -1) || u.setSonNodeCheckBox(a, b, !1), b[g] && a.check.chkboxType.Y.indexOf("p") > -1 && u.setParentNodeCheckBox(a, b, !0), !b[g] && a.check.chkboxType.N.indexOf("p") > -1 && u.setParentNodeCheckBox(a, b, !1)
        }, makeChkClass: function (a, b) {
            var c = a.data.key.checked, d = t.checkbox, e = t.radio, f = "";
            f = b.chkDisabled === !0 ? d.DISABLED : b.halfCheck ? d.PART : a.check.chkStyle == e.STYLE ? b.check_Child_State < 1 ? d.FULL : d.PART : b[c] ? 2 === b.check_Child_State || -1 === b.check_Child_State ? d.FULL : d.PART : b.check_Child_State < 1 ? d.FULL : d.PART;
            var g = a.check.chkStyle + "_" + (b[c] ? d.TRUE : d.FALSE) + "_" + f;
            return g = b.check_Focus && b.chkDisabled !== !0 ? g + "_" + d.FOCUS : g, t.className.BUTTON + " " + d.DEFAULT + " " + g
        }, repairAllChk: function (a, b) {
            if (a.check.enable && a.check.chkStyle === t.checkbox.STYLE)for (var c = a.data.key.checked, d = a.data.key.children, e = v.getRoot(a), f = 0, g = e[d].length; g > f; f++) {
                var h = e[d][f];
                h.nocheck !== !0 && h.chkDisabled !== !0 && (h[c] = b), u.setSonNodeCheckBox(a, h, b)
            }
        }, repairChkClass: function (a, b) {
            if (b && (v.makeChkFlag(a, b), b.nocheck !== !0)) {
                var c = w(b, t.id.CHECK, a);
                u.setChkClass(a, c, b)
            }
        }, repairParentChkClass: function (a, b) {
            if (b && b.parentTId) {
                var c = b.getParentNode();
                u.repairChkClass(a, c), u.repairParentChkClass(a, c)
            }
        }, repairParentChkClassWithSelf: function (a, b) {
            if (b) {
                var c = a.data.key.children;
                b[c] && b[c].length > 0 ? u.repairParentChkClass(a, b[c][0]) : u.repairParentChkClass(a, b)
            }
        }, repairSonChkDisabled: function (a, b, c, d) {
            if (b) {
                var e = a.data.key.children;
                if (b.chkDisabled != c && (b.chkDisabled = c), u.repairChkClass(a, b), b[e] && d)for (var f = 0, g = b[e].length; g > f; f++) {
                    var h = b[e][f];
                    u.repairSonChkDisabled(a, h, c, d)
                }
            }
        }, repairParentChkDisabled: function (a, b, c, d) {
            b && (b.chkDisabled != c && d && (b.chkDisabled = c), u.repairChkClass(a, b), u.repairParentChkDisabled(a, b.getParentNode(), c, d))
        }, setChkClass: function (a, b, c) {
            b && (c.nocheck === !0 ? b.hide() : b.show(), b.removeClass(), b.addClass(u.makeChkClass(a, c)))
        }, setParentNodeCheckBox: function (a, b, c, d) {
            var e = a.data.key.children, f = a.data.key.checked, g = w(b, t.id.CHECK, a);
            if (d || (d = b), v.makeChkFlag(a, b), b.nocheck !== !0 && b.chkDisabled !== !0 && (b[f] = c, u.setChkClass(a, g, b), a.check.autoCheckTrigger && b != d && a.treeObj.trigger(t.event.CHECK, [null, a.treeId, b])), b.parentTId) {
                var h = !0;
                if (!c)for (var i = b.getParentNode()[e], j = 0, k = i.length; k > j; j++)if (i[j].nocheck !== !0 && i[j].chkDisabled !== !0 && i[j][f] || (i[j].nocheck === !0 || i[j].chkDisabled === !0) && i[j].check_Child_State > 0) {
                    h = !1;
                    break
                }
                h && u.setParentNodeCheckBox(a, b.getParentNode(), c, d)
            }
        }, setSonNodeCheckBox: function (a, b, c, d) {
            if (b) {
                var e = a.data.key.children, f = a.data.key.checked, g = w(b, t.id.CHECK, a);
                d || (d = b);
                var h = !1;
                if (b[e])for (var i = 0, j = b[e].length; j > i && b.chkDisabled !== !0; i++) {
                    var k = b[e][i];
                    u.setSonNodeCheckBox(a, k, c, d), k.chkDisabled === !0 && (h = !0)
                }
                b != v.getRoot(a) && b.chkDisabled !== !0 && (h && b.nocheck !== !0 && v.makeChkFlag(a, b), b.nocheck !== !0 && b.chkDisabled !== !0 ? (b[f] = c, h || (b.check_Child_State = b[e] && b[e].length > 0 ? c ? 2 : 0 : -1)) : b.check_Child_State = -1, u.setChkClass(a, g, b), a.check.autoCheckTrigger && b != d && b.nocheck !== !0 && b.chkDisabled !== !0 && a.treeObj.trigger(t.event.CHECK, [null, a.treeId, b]))
            }
        }}, q = {tools: o, view: p, event: m, data: l};
        a.extend(!0, a.fn.zTree.consts, b), a.extend(!0, a.fn.zTree._z, q);
        var r = a.fn.zTree, s = r._z.tools, t = r.consts, u = r._z.view, v = r._z.data, w = (r._z.event, s.$);
        v.exSetting(c), v.addInitBind(f), v.addInitUnBind(g), v.addInitCache(e), v.addInitNode(i), v.addInitProxy(h, !0), v.addInitRoot(d), v.addBeforeA(j), v.addZTreeTools(k);
        var x = u.createNodes;
        u.createNodes = function (a, b, c, d) {
            x && x.apply(u, arguments), c && u.repairParentChkClassWithSelf(a, d)
        };
        var y = u.removeNode;
        u.removeNode = function (a, b) {
            var c = b.getParentNode();
            y && y.apply(u, arguments), b && c && (u.repairChkClass(a, c), u.repairParentChkClass(a, c))
        };
        var z = u.appendNodes;
        u.appendNodes = function (a, b, c, d) {
            var e = "";
            return z && (e = z.apply(u, arguments)), d && v.makeChkFlag(a, d), e
        }
    }(jQuery), function (a) {
        var b = {event: {DRAG: "ztree_drag", DROP: "ztree_drop", REMOVE: "ztree_remove", RENAME: "ztree_rename"}, id: {EDIT: "_edit", INPUT: "_input", REMOVE: "_remove"}, move: {TYPE_INNER: "inner", TYPE_PREV: "prev", TYPE_NEXT: "next"}, node: {CURSELECTED_EDIT: "curSelectedNode_Edit", TMPTARGET_TREE: "tmpTargetzTree", TMPTARGET_NODE: "tmpTargetNode"}}, c = {edit: {enable: !1, editNameSelectAll: !1, showRemoveBtn: !0, showRenameBtn: !0, removeTitle: "remove", renameTitle: "rename", drag: {autoExpandTrigger: !1, isCopy: !0, isMove: !0, prev: !0, next: !0, inner: !0, minMoveSize: 5, borderMax: 10, borderMin: -5, maxShowNodeNum: 5, autoOpenTime: 500}}, view: {addHoverDom: null, removeHoverDom: null}, callback: {beforeDrag: null, beforeDragOpen: null, beforeDrop: null, beforeEditName: null, beforeRename: null, onDrag: null, onDrop: null, onRename: null}}, d = function (a) {
            var b = u.getRoot(a), c = u.getRoots();
            b.curEditNode = null, b.curEditInput = null, b.curHoverNode = null, b.dragFlag = 0, b.dragNodeShowBefore = [], b.dragMaskList = new Array, c.showHoverDom = !0
        }, e = function () {
        }, f = function (a) {
            var b = a.treeObj, c = s.event;
            b.bind(c.RENAME, function (b, c, d, e) {
                r.apply(a.callback.onRename, [b, c, d, e])
            }), b.bind(c.REMOVE, function (b, c, d) {
                r.apply(a.callback.onRemove, [b, c, d])
            }), b.bind(c.DRAG, function (b, c, d, e) {
                r.apply(a.callback.onDrag, [c, d, e])
            }), b.bind(c.DROP, function (b, c, d, e, f, g, h) {
                r.apply(a.callback.onDrop, [c, d, e, f, g, h])
            })
        }, g = function (a) {
            var b = a.treeObj, c = s.event;
            b.unbind(c.RENAME), b.unbind(c.REMOVE), b.unbind(c.DRAG), b.unbind(c.DROP)
        }, h = function (a) {
            var b = a.target, c = u.getSetting(a.data.treeId), d = a.relatedTarget, e = "", f = null, g = "", h = "", i = null, j = null, k = null;
            if (r.eqs(a.type, "mouseover") ? (k = r.getMDom(c, b, [
                {tagName: "a", attrName: "treeNode" + s.id.A}
            ]), k && (e = r.getNodeMainDom(k).id, g = "hoverOverNode")) : r.eqs(a.type, "mouseout") ? (k = r.getMDom(c, d, [
                {tagName: "a", attrName: "treeNode" + s.id.A}
            ]), k || (e = "remove", g = "hoverOutNode")) : r.eqs(a.type, "mousedown") && (k = r.getMDom(c, b, [
                {tagName: "a", attrName: "treeNode" + s.id.A}
            ]), k && (e = r.getNodeMainDom(k).id, g = "mousedownNode")), e.length > 0)switch (f = u.getNodeCache(c, e), g) {
                case"mousedownNode":
                    i = m.onMousedownNode;
                    break;
                case"hoverOverNode":
                    i = m.onHoverOverNode;
                    break;
                case"hoverOutNode":
                    i = m.onHoverOutNode
            }
            var l = {stop: !1, node: f, nodeEventType: g, nodeEventCallback: i, treeEventType: h, treeEventCallback: j};
            return l
        }, i = function (a, b, c) {
            c && (c.isHover = !1, c.editNameFlag = !1)
        }, j = function (a, b) {
            b.cancelEditName = function (b) {
                var c = u.getRoot(a), d = a.data.key.name, e = c.curEditNode;
                c.curEditNode && t.cancelCurEditNode(a, b ? b : e[d])
            }, b.copyNode = function (b, c, d, e) {
                function f() {
                    t.addNodes(a, b, [g], e)
                }

                if (!c)return null;
                if (b && !b.isParent && a.data.keep.leaf && d === s.move.TYPE_INNER)return null;
                var g = r.clone(c);
                return b || (b = null, d = s.move.TYPE_INNER), d == s.move.TYPE_INNER ? r.canAsync(a, b) ? t.asyncNode(a, b, e, f) : f() : (t.addNodes(a, b.parentNode, [g], e), t.moveNode(a, b, g, d, !1, e)), g
            }, b.editName = function (b) {
                b && b.tId && b === u.getNodeCache(a, b.tId) && (b.parentTId && t.expandCollapseParentNode(a, b.getParentNode(), !0), t.editNode(a, b))
            }, b.moveNode = function (b, c, d, e) {
                function f() {
                    t.moveNode(a, b, c, d, !1, e)
                }

                return c ? b && !b.isParent && a.data.keep.leaf && d === s.move.TYPE_INNER ? null : b && (c.parentTId == b.tId && d == s.move.TYPE_INNER || v(c, a).find("#" + b.tId).length > 0) ? null : (b || (b = null), r.canAsync(a, b) && d === s.move.TYPE_INNER ? t.asyncNode(a, b, e, f) : f(), c) : c
            }, b.setEditable = function (b) {
                return a.edit.enable = b, this.refresh()
            }
        }, k = {setSonNodeLevel: function (a, b, c) {
            if (c) {
                var d = a.data.key.children;
                if (c.level = b ? b.level + 1 : 0, c[d])for (var e = 0, f = c[d].length; f > e; e++)c[d][e] && u.setSonNodeLevel(a, c, c[d][e])
            }
        }}, l = {}, m = {onHoverOverNode: function (a, b) {
            var c = u.getSetting(a.data.treeId), d = u.getRoot(c);
            d.curHoverNode != b && m.onHoverOutNode(a), d.curHoverNode = b, t.addHoverDom(c, b)
        }, onHoverOutNode: function (a) {
            var b = u.getSetting(a.data.treeId), c = u.getRoot(b);
            c.curHoverNode && !u.isSelectedNode(b, c.curHoverNode) && (t.removeTreeDom(b, c.curHoverNode), c.curHoverNode = null)
        }, onMousedownNode: function (c, d) {
            function e(c) {
                if (0 == k.dragFlag && Math.abs(I - c.clientX) < j.edit.drag.minMoveSize && Math.abs(J - c.clientY) < j.edit.drag.minMoveSize)return!0;
                var d, e, g, h, i, m = j.data.key.children;
                if (A.css("cursor", "pointer"), 0 == k.dragFlag) {
                    if (0 == r.apply(j.callback.beforeDrag, [j.treeId, o], !0))return f(c), !0;
                    for (d = 0, e = o.length; e > d; d++)0 == d && (k.dragNodeShowBefore = []), g = o[d], g.isParent && g.open ? (t.expandCollapseNode(j, g, !g.open), k.dragNodeShowBefore[g.tId] = !0) : k.dragNodeShowBefore[g.tId] = !1;
                    k.dragFlag = 1, l.showHoverDom = !1, r.showIfameMask(j, !0);
                    var n = !0, D = -1;
                    if (o.length > 1) {
                        var L = o[0].parentTId ? o[0].getParentNode()[m] : u.getNodes(j);
                        for (i = [], d = 0, e = L.length; e > d; d++)if (void 0 !== k.dragNodeShowBefore[L[d].tId] && (n && D > -1 && D + 1 !== d && (n = !1), i.push(L[d]), D = d), o.length === i.length) {
                            o = i;
                            break
                        }
                    }
                    for (n && (x = o[0].getPreNode(), y = o[o.length - 1].getNextNode()), p = v("<ul class='zTreeDragUL'></ul>", j), d = 0, e = o.length; e > d; d++)if (g = o[d], g.editNameFlag = !1, t.selectNode(j, g, d > 0), t.removeTreeDom(j, g), h = v("<li id='" + g.tId + "_tmp'></li>", j), h.append(v(g, s.id.A, j).clone()), h.css("padding", "0"), h.children("#" + g.tId + s.id.A).removeClass(s.node.CURSELECTED), p.append(h), d == j.edit.drag.maxShowNodeNum - 1) {
                        h = v("<li id='" + g.tId + "_moretmp'><a>  ...  </a></li>", j), p.append(h);
                        break
                    }
                    p.attr("id", o[0].tId + s.id.UL + "_tmp"), p.addClass(j.treeObj.attr("class")), p.appendTo(A), q = v("<span class='tmpzTreeMove_arrow'></span>", j), q.attr("id", "zTreeMove_arrow_tmp"), q.appendTo(A), j.treeObj.trigger(s.event.DRAG, [c, j.treeId, o])
                }
                if (1 == k.dragFlag) {
                    if (w && q.attr("id") == c.target.id && G && c.clientX + z.scrollLeft() + 2 > a("#" + G + s.id.A, w).offset().left) {
                        var M = a("#" + G + s.id.A, w);
                        c.target = M.length > 0 ? M.get(0) : c.target
                    } else w && (w.removeClass(s.node.TMPTARGET_TREE), G && a("#" + G + s.id.A, w).removeClass(s.node.TMPTARGET_NODE + "_" + s.move.TYPE_PREV).removeClass(s.node.TMPTARGET_NODE + "_" + b.move.TYPE_NEXT).removeClass(s.node.TMPTARGET_NODE + "_" + b.move.TYPE_INNER));
                    w = null, G = null, B = !1, C = j;
                    var N = u.getSettings();
                    for (var O in N)N[O].treeId && N[O].edit.enable && N[O].treeId != j.treeId && (c.target.id == N[O].treeId || a(c.target).parents("#" + N[O].treeId).length > 0) && (B = !0, C = N[O]);
                    var P = z.scrollTop(), Q = z.scrollLeft(), R = C.treeObj.offset(), S = C.treeObj.get(0).scrollHeight, T = C.treeObj.get(0).scrollWidth, U = c.clientY + P - R.top, V = C.treeObj.height() + R.top - c.clientY - P, W = c.clientX + Q - R.left, X = C.treeObj.width() + R.left - c.clientX - Q, Y = U < j.edit.drag.borderMax && U > j.edit.drag.borderMin, Z = V < j.edit.drag.borderMax && V > j.edit.drag.borderMin, $ = W < j.edit.drag.borderMax && W > j.edit.drag.borderMin, _ = X < j.edit.drag.borderMax && X > j.edit.drag.borderMin, ab = U > j.edit.drag.borderMin && V > j.edit.drag.borderMin && W > j.edit.drag.borderMin && X > j.edit.drag.borderMin, bb = Y && C.treeObj.scrollTop() <= 0, cb = Z && C.treeObj.scrollTop() + C.treeObj.height() + 10 >= S, db = $ && C.treeObj.scrollLeft() <= 0, eb = _ && C.treeObj.scrollLeft() + C.treeObj.width() + 10 >= T;
                    if (c.target.id && C.treeObj.find("#" + c.target.id).length > 0) {
                        for (var fb = c.target; fb && fb.tagName && !r.eqs(fb.tagName, "li") && fb.id != C.treeId;)fb = fb.parentNode;
                        var gb = !0;
                        for (d = 0, e = o.length; e > d; d++) {
                            if (g = o[d], fb.id === g.tId) {
                                gb = !1;
                                break
                            }
                            if (v(g, j).find("#" + fb.id).length > 0) {
                                gb = !1;
                                break
                            }
                        }
                        gb && c.target.id && (c.target.id == fb.id + s.id.A || a(c.target).parents("#" + fb.id + s.id.A).length > 0) && (w = a(fb), G = fb.id)
                    }
                    g = o[0], ab && (c.target.id == C.treeId || a(c.target).parents("#" + C.treeId).length > 0) && (!w && (c.target.id == C.treeId || bb || cb || db || eb) && (B || !B && g.parentTId) && (w = C.treeObj), Y ? C.treeObj.scrollTop(C.treeObj.scrollTop() - 10) : Z && C.treeObj.scrollTop(C.treeObj.scrollTop() + 10), $ ? C.treeObj.scrollLeft(C.treeObj.scrollLeft() - 10) : _ && C.treeObj.scrollLeft(C.treeObj.scrollLeft() + 10), w && w != C.treeObj && w.offset().left < C.treeObj.offset().left && C.treeObj.scrollLeft(C.treeObj.scrollLeft() + w.offset().left - C.treeObj.offset().left)), p.css({top: c.clientY + P + 3 + "px", left: c.clientX + Q + 3 + "px"});
                    var hb = 0, ib = 0;
                    if (w && w.attr("id") != C.treeId) {
                        var jb = null == G ? null : u.getNodeCache(C, G), kb = c.ctrlKey && j.edit.drag.isMove && j.edit.drag.isCopy || !j.edit.drag.isMove && j.edit.drag.isCopy, lb = !(!x || G !== x.tId), mb = !(!y || G !== y.tId), nb = g.parentTId && g.parentTId == G, ob = (kb || !mb) && r.apply(C.edit.drag.prev, [C.treeId, o, jb], !!C.edit.drag.prev), pb = (kb || !lb) && r.apply(C.edit.drag.next, [C.treeId, o, jb], !!C.edit.drag.next), qb = !(!kb && nb || C.data.keep.leaf && !jb.isParent || !r.apply(C.edit.drag.inner, [C.treeId, o, jb], !!C.edit.drag.inner));
                        if (ob || pb || qb) {
                            var rb = a("#" + G + s.id.A, w), sb = jb.isLastNode ? null : a("#" + jb.getNextNode().tId + s.id.A, w.next()), tb = rb.offset().top, ub = rb.offset().left, vb = ob ? qb ? .25 : pb ? .5 : 1 : -1, wb = pb ? qb ? .75 : ob ? .5 : 0 : -1, xb = (c.clientY + P - tb) / rb.height();
                            if ((1 == vb || vb >= xb && xb >= -.2) && ob ? (hb = 1 - q.width(), ib = tb - q.height() / 2, H = s.move.TYPE_PREV) : (0 == wb || xb >= wb && 1.2 >= xb) && pb ? (hb = 1 - q.width(), ib = null == sb || jb.isParent && jb.open ? tb + rb.height() - q.height() / 2 : sb.offset().top - q.height() / 2, H = s.move.TYPE_NEXT) : (hb = 5 - q.width(), ib = tb, H = s.move.TYPE_INNER), q.css({display: "block", top: ib + "px", left: ub + hb + "px"}), rb.addClass(s.node.TMPTARGET_NODE + "_" + H), (E != G || F != H) && (K = (new Date).getTime()), jb && jb.isParent && H == s.move.TYPE_INNER) {
                                var yb = !0;
                                window.zTreeMoveTimer && window.zTreeMoveTargetNodeTId !== jb.tId ? (clearTimeout(window.zTreeMoveTimer), window.zTreeMoveTargetNodeTId = null) : window.zTreeMoveTimer && window.zTreeMoveTargetNodeTId === jb.tId && (yb = !1), yb && (window.zTreeMoveTimer = setTimeout(function () {
                                    H == s.move.TYPE_INNER && jb && jb.isParent && !jb.open && (new Date).getTime() - K > C.edit.drag.autoOpenTime && r.apply(C.callback.beforeDragOpen, [C.treeId, jb], !0) && (t.switchNode(C, jb), C.edit.drag.autoExpandTrigger && C.treeObj.trigger(s.event.EXPAND, [C.treeId, jb]))
                                }, C.edit.drag.autoOpenTime + 50), window.zTreeMoveTargetNodeTId = jb.tId)
                            }
                        } else w = null, G = "", H = s.move.TYPE_INNER, q.css({display: "none"}), window.zTreeMoveTimer && (clearTimeout(window.zTreeMoveTimer), window.zTreeMoveTargetNodeTId = null)
                    } else H = s.move.TYPE_INNER, w && r.apply(C.edit.drag.inner, [C.treeId, o, null], !!C.edit.drag.inner) ? w.addClass(s.node.TMPTARGET_TREE) : w = null, q.css({display: "none"}), window.zTreeMoveTimer && (clearTimeout(window.zTreeMoveTimer), window.zTreeMoveTargetNodeTId = null);
                    E = G, F = H
                }
                return!1
            }

            function f(c) {
                function d() {
                    if (B) {
                        if (!n)for (var a = 0, b = o.length; b > a; a++)t.removeNode(j, o[a]);
                        if (H == s.move.TYPE_INNER)t.addNodes(C, x, y); else if (t.addNodes(C, x.getParentNode(), y), H == s.move.TYPE_PREV)for (a = 0, b = y.length; b > a; a++)t.moveNode(C, x, y[a], H, !1); else for (a = -1, b = y.length - 1; b > a; b--)t.moveNode(C, x, y[b], H, !1)
                    } else if (n && H == s.move.TYPE_INNER)t.addNodes(C, x, y); else if (n && t.addNodes(C, x.getParentNode(), y), H != s.move.TYPE_NEXT)for (a = 0, b = y.length; b > a; a++)t.moveNode(C, x, y[a], H, !1); else for (a = -1, b = y.length - 1; b > a; b--)t.moveNode(C, x, y[b], H, !1);
                    t.selectNodes(C, y), v(y[0], j).focus().blur(), j.treeObj.trigger(s.event.DROP, [c, C.treeId, y, x, H, n])
                }

                if (window.zTreeMoveTimer && (clearTimeout(window.zTreeMoveTimer), window.zTreeMoveTargetNodeTId = null), E = null, F = null, z.unbind("mousemove", e), z.unbind("mouseup", f), z.unbind("selectstart", g), A.css("cursor", "auto"), w && (w.removeClass(s.node.TMPTARGET_TREE), G && a("#" + G + s.id.A, w).removeClass(s.node.TMPTARGET_NODE + "_" + s.move.TYPE_PREV).removeClass(s.node.TMPTARGET_NODE + "_" + b.move.TYPE_NEXT).removeClass(s.node.TMPTARGET_NODE + "_" + b.move.TYPE_INNER)), r.showIfameMask(j, !1), l.showHoverDom = !0, 0 != k.dragFlag) {
                    k.dragFlag = 0;
                    var h, i, m;
                    for (h = 0, i = o.length; i > h; h++)m = o[h], m.isParent && k.dragNodeShowBefore[m.tId] && !m.open && (t.expandCollapseNode(j, m, !m.open), delete k.dragNodeShowBefore[m.tId]);
                    p && p.remove(), q && q.remove();
                    var n = c.ctrlKey && j.edit.drag.isMove && j.edit.drag.isCopy || !j.edit.drag.isMove && j.edit.drag.isCopy;
                    if (!n && w && G && o[0].parentTId && G == o[0].parentTId && H == s.move.TYPE_INNER && (w = null), w) {
                        var x = null == G ? null : u.getNodeCache(C, G);
                        if (0 == r.apply(j.callback.beforeDrop, [C.treeId, o, x, H, n], !0))return t.selectNodes(D, o), void 0;
                        var y = n ? r.clone(o) : o;
                        H == s.move.TYPE_INNER && r.canAsync(C, x) ? t.asyncNode(C, x, !1, d) : d()
                    } else t.selectNodes(D, o), j.treeObj.trigger(s.event.DROP, [c, j.treeId, o, null, null, null])
                }
            }

            function g() {
                return!1
            }

            var h, i, j = u.getSetting(c.data.treeId), k = u.getRoot(j), l = u.getRoots();
            if (2 == c.button || !j.edit.enable || !j.edit.drag.isCopy && !j.edit.drag.isMove)return!0;
            var m = c.target, n = u.getRoot(j).curSelectedList, o = [];
            if (u.isSelectedNode(j, d))for (h = 0, i = n.length; i > h; h++) {
                if (n[h].editNameFlag && r.eqs(m.tagName, "input") && null !== m.getAttribute("treeNode" + s.id.INPUT))return!0;
                if (o.push(n[h]), o[0].parentTId !== n[h].parentTId) {
                    o = [d];
                    break
                }
            } else o = [d];
            t.editNodeBlur = !0, t.cancelCurEditNode(j);
            var p, q, w, x, y, z = a(j.treeObj.get(0).ownerDocument), A = a(j.treeObj.get(0).ownerDocument.body), B = !1, C = j, D = j, E = null, F = null, G = null, H = s.move.TYPE_INNER, I = c.clientX, J = c.clientY, K = (new Date).getTime();
            return r.uCanDo(j) && z.bind("mousemove", e), z.bind("mouseup", f), z.bind("selectstart", g), c.preventDefault && c.preventDefault(), !0
        }}, n = {getAbs: function (a) {
            var b = a.getBoundingClientRect(), c = document.body.scrollTop + document.documentElement.scrollTop, d = document.body.scrollLeft + document.documentElement.scrollLeft;
            return[b.left + d, b.top + c]
        }, inputFocus: function (a) {
            a.get(0) && (a.focus(), r.setCursorPosition(a.get(0), a.val().length))
        }, inputSelect: function (a) {
            a.get(0) && (a.focus(), a.select())
        }, setCursorPosition: function (a, b) {
            if (a.setSelectionRange)a.focus(), a.setSelectionRange(b, b); else if (a.createTextRange) {
                var c = a.createTextRange();
                c.collapse(!0), c.moveEnd("character", b), c.moveStart("character", b), c.select()
            }
        }, showIfameMask: function (a, b) {
            for (var c = u.getRoot(a); c.dragMaskList.length > 0;)c.dragMaskList[0].remove(), c.dragMaskList.shift();
            if (b)for (var d = v("iframe", a), e = 0, f = d.length; f > e; e++) {
                var g = d.get(e), h = r.getAbs(g), i = v("<div id='zTreeMask_" + e + "' class='zTreeMask' style='top:" + h[1] + "px; left:" + h[0] + "px; width:" + g.offsetWidth + "px; height:" + g.offsetHeight + "px;'></div>", a);
                i.appendTo(v("body", a)), c.dragMaskList.push(i)
            }
        }}, o = {addEditBtn: function (a, b) {
            if (!(b.editNameFlag || v(b, s.id.EDIT, a).length > 0) && r.apply(a.edit.showRenameBtn, [a.treeId, b], a.edit.showRenameBtn)) {
                var c = v(b, s.id.A, a), d = "<span class='" + s.className.BUTTON + " edit' id='" + b.tId + s.id.EDIT + "' title='" + r.apply(a.edit.renameTitle, [a.treeId, b], a.edit.renameTitle) + "' treeNode" + s.id.EDIT + " style='display:none;'></span>";
                c.append(d), v(b, s.id.EDIT, a).bind("click", function () {
                    return r.uCanDo(a) && 0 != r.apply(a.callback.beforeEditName, [a.treeId, b], !0) ? (t.editNode(a, b), !1) : !1
                }).show()
            }
        }, addRemoveBtn: function (a, b) {
            if (!(b.editNameFlag || v(b, s.id.REMOVE, a).length > 0) && r.apply(a.edit.showRemoveBtn, [a.treeId, b], a.edit.showRemoveBtn)) {
                var c = v(b, s.id.A, a), d = "<span class='" + s.className.BUTTON + " remove' id='" + b.tId + s.id.REMOVE + "' title='" + r.apply(a.edit.removeTitle, [a.treeId, b], a.edit.removeTitle) + "' treeNode" + s.id.REMOVE + " style='display:none;'></span>";
                c.append(d), v(b, s.id.REMOVE, a).bind("click", function () {
                    return r.uCanDo(a) && 0 != r.apply(a.callback.beforeRemove, [a.treeId, b], !0) ? (t.removeNode(a, b), a.treeObj.trigger(s.event.REMOVE, [a.treeId, b]), !1) : !1
                }).bind("mousedown", function () {
                    return!0
                }).show()
            }
        }, addHoverDom: function (a, b) {
            u.getRoots().showHoverDom && (b.isHover = !0, a.edit.enable && (t.addEditBtn(a, b), t.addRemoveBtn(a, b)), r.apply(a.view.addHoverDom, [a.treeId, b]))
        }, cancelCurEditNode: function (a, b) {
            var c = u.getRoot(a), d = a.data.key.name, e = c.curEditNode;
            if (e) {
                var f = c.curEditInput, g = b ? b : f.val(), h = !!b;
                if (r.apply(a.callback.beforeRename, [a.treeId, e, g, h], !0) === !1)return!1;
                e[d] = g ? g : f.val(), a.treeObj.trigger(s.event.RENAME, [a.treeId, e, h]);
                var i = v(e, s.id.A, a);
                i.removeClass(s.node.CURSELECTED_EDIT), f.unbind(), t.setNodeName(a, e), e.editNameFlag = !1, c.curEditNode = null, c.curEditInput = null, t.selectNode(a, e, !1)
            }
            return c.noSelection = !0, !0
        }, editNode: function (a, b) {
            var c = u.getRoot(a);
            if (t.editNodeBlur = !1, u.isSelectedNode(a, b) && c.curEditNode == b && b.editNameFlag)return setTimeout(function () {
                r.inputFocus(c.curEditInput)
            }, 0), void 0;
            var d = a.data.key.name;
            b.editNameFlag = !0, t.removeTreeDom(a, b), t.cancelCurEditNode(a), t.selectNode(a, b, !1), v(b, s.id.SPAN, a).html("<input type=text class='rename' id='" + b.tId + s.id.INPUT + "' treeNode" + s.id.INPUT + " >");
            var e = v(b, s.id.INPUT, a);
            e.attr("value", b[d]), a.edit.editNameSelectAll ? r.inputSelect(e) : r.inputFocus(e), e.bind("blur", function () {
                t.editNodeBlur || t.cancelCurEditNode(a)
            }).bind("keydown", function (c) {
                "13" == c.keyCode ? (t.editNodeBlur = !0, t.cancelCurEditNode(a)) : "27" == c.keyCode && t.cancelCurEditNode(a, b[d])
            }).bind("click", function () {
                return!1
            }).bind("dblclick", function () {
                return!1
            }), v(b, s.id.A, a).addClass(s.node.CURSELECTED_EDIT), c.curEditInput = e, c.noSelection = !1, c.curEditNode = b
        }, moveNode: function (a, b, c, d, e, f) {
            var g = u.getRoot(a), h = a.data.key.children;
            if (b != c && (!a.data.keep.leaf || !b || b.isParent || d != s.move.TYPE_INNER)) {
                var i = c.parentTId ? c.getParentNode() : g, j = null === b || b == g;
                j && null === b && (b = g), j && (d = s.move.TYPE_INNER);
                var k = b.parentTId ? b.getParentNode() : g;
                d != s.move.TYPE_PREV && d != s.move.TYPE_NEXT && (d = s.move.TYPE_INNER), d == s.move.TYPE_INNER && (j ? c.parentTId = null : (b.isParent || (b.isParent = !0, b.open = !!b.open, t.setNodeLineIcos(a, b)), c.parentTId = b.tId));
                var l, m;
                if (j)l = a.treeObj, m = l; else {
                    if (f || d != s.move.TYPE_INNER ? f || t.expandCollapseNode(a, b.getParentNode(), !0, !1) : t.expandCollapseNode(a, b, !0, !1), l = v(b, a), m = v(b, s.id.UL, a), l.get(0) && !m.get(0)) {
                        var n = [];
                        t.makeUlHtml(a, b, n, ""), l.append(n.join(""))
                    }
                    m = v(b, s.id.UL, a)
                }
                var o = v(c, a);
                o.get(0) ? l.get(0) || o.remove() : o = t.appendNodes(a, c.level, [c], null, !1, !0).join(""), m.get(0) && d == s.move.TYPE_INNER ? m.append(o) : l.get(0) && d == s.move.TYPE_PREV ? l.before(o) : l.get(0) && d == s.move.TYPE_NEXT && l.after(o);
                var p, q, r = -1, w = 0, x = null, y = null, z = c.level;
                if (c.isFirstNode)r = 0, i[h].length > 1 && (x = i[h][1], x.isFirstNode = !0); else if (c.isLastNode)r = i[h].length - 1, x = i[h][r - 1], x.isLastNode = !0; else for (p = 0, q = i[h].length; q > p; p++)if (i[h][p].tId == c.tId) {
                    r = p;
                    break
                }
                if (r >= 0 && i[h].splice(r, 1), d != s.move.TYPE_INNER)for (p = 0, q = k[h].length; q > p; p++)k[h][p].tId == b.tId && (w = p);
                if (d == s.move.TYPE_INNER ? (b[h] || (b[h] = new Array), b[h].length > 0 && (y = b[h][b[h].length - 1], y.isLastNode = !1), b[h].splice(b[h].length, 0, c), c.isLastNode = !0, c.isFirstNode = 1 == b[h].length) : b.isFirstNode && d == s.move.TYPE_PREV ? (k[h].splice(w, 0, c), y = b, y.isFirstNode = !1, c.parentTId = b.parentTId, c.isFirstNode = !0, c.isLastNode = !1) : b.isLastNode && d == s.move.TYPE_NEXT ? (k[h].splice(w + 1, 0, c), y = b, y.isLastNode = !1, c.parentTId = b.parentTId, c.isFirstNode = !1, c.isLastNode = !0) : (d == s.move.TYPE_PREV ? k[h].splice(w, 0, c) : k[h].splice(w + 1, 0, c), c.parentTId = b.parentTId, c.isFirstNode = !1, c.isLastNode = !1), u.fixPIdKeyValue(a, c), u.setSonNodeLevel(a, c.getParentNode(), c), t.setNodeLineIcos(a, c), t.repairNodeLevelClass(a, c, z), !a.data.keep.parent && i[h].length < 1) {
                    i.isParent = !1, i.open = !1;
                    var A = v(i, s.id.UL, a), B = v(i, s.id.SWITCH, a), C = v(i, s.id.ICON, a);
                    t.replaceSwitchClass(i, B, s.folder.DOCU), t.replaceIcoClass(i, C, s.folder.DOCU), A.css("display", "none")
                } else x && t.setNodeLineIcos(a, x);
                y && t.setNodeLineIcos(a, y), a.check && a.check.enable && t.repairChkClass && (t.repairChkClass(a, i), t.repairParentChkClassWithSelf(a, i), i != c.parent && t.repairParentChkClassWithSelf(a, c)), f || t.expandCollapseParentNode(a, c.getParentNode(), !0, e)
            }
        }, removeEditBtn: function (a, b) {
            v(b, s.id.EDIT, a).unbind().remove()
        }, removeRemoveBtn: function (a, b) {
            v(b, s.id.REMOVE, a).unbind().remove()
        }, removeTreeDom: function (a, b) {
            b.isHover = !1, t.removeEditBtn(a, b), t.removeRemoveBtn(a, b), r.apply(a.view.removeHoverDom, [a.treeId, b])
        }, repairNodeLevelClass: function (a, b, c) {
            if (c !== b.level) {
                var d = v(b, a), e = v(b, s.id.A, a), f = v(b, s.id.UL, a), g = s.className.LEVEL + c, h = s.className.LEVEL + b.level;
                d.removeClass(g), d.addClass(h), e.removeClass(g), e.addClass(h), f.removeClass(g), f.addClass(h)
            }
        }, selectNodes: function (a, b) {
            for (var c = 0, d = b.length; d > c; c++)t.selectNode(a, b[c], c > 0)
        }}, p = {tools: n, view: o, event: l, data: k};
        a.extend(!0, a.fn.zTree.consts, b), a.extend(!0, a.fn.zTree._z, p);
        var q = a.fn.zTree, r = q._z.tools, s = q.consts, t = q._z.view, u = q._z.data, v = (q._z.event, r.$);
        u.exSetting(c), u.addInitBind(f), u.addInitUnBind(g), u.addInitCache(e), u.addInitNode(i), u.addInitProxy(h), u.addInitRoot(d), u.addZTreeTools(j);
        var w = t.cancelPreSelectedNode;
        t.cancelPreSelectedNode = function (a, b) {
            for (var c = u.getRoot(a).curSelectedList, d = 0, e = c.length; e > d && (b && b !== c[d] || (t.removeTreeDom(a, c[d]), !b)); d++);
            w && w.apply(t, arguments)
        };
        var x = t.createNodes;
        t.createNodes = function (a, b, c, d) {
            x && x.apply(t, arguments), c && t.repairParentChkClassWithSelf && t.repairParentChkClassWithSelf(a, d)
        };
        var y = t.makeNodeUrl;
        t.makeNodeUrl = function (a) {
            return a.edit.enable ? null : y.apply(t, arguments)
        };
        var z = t.removeNode;
        t.removeNode = function (a, b) {
            var c = u.getRoot(a);
            c.curEditNode === b && (c.curEditNode = null), z && z.apply(t, arguments)
        };
        var A = t.selectNode;
        t.selectNode = function (a, b) {
            var c = u.getRoot(a);
            return u.isSelectedNode(a, b) && c.curEditNode == b && b.editNameFlag ? !1 : (A && A.apply(t, arguments), t.addHoverDom(a, b), !0)
        };
        var B = r.uCanDo;
        r.uCanDo = function (a, b) {
            var c = u.getRoot(a);
            return b && (r.eqs(b.type, "mouseover") || r.eqs(b.type, "mouseout") || r.eqs(b.type, "mousedown") || r.eqs(b.type, "mouseup")) ? !0 : !c.curEditNode && (B ? B.apply(t, arguments) : !0)
        }
    }(jQuery)
}), define("gallery/ztree/3.5.14/ztree.css", [], function () {
    seajs.importStyle(".ztree *{padding:0;margin:0;font-size:12px;font-family:Verdana,Arial,Helvetica,AppleGothic,sans-serif}.ztree{margin:0;padding:5px;color:#333}.ztree li{padding:0;margin:0;list-style:none;line-height:14px;text-align:left;white-space:nowrap;outline:0}.ztree li ul{margin:0;padding:0 0 0 18px}.ztree li ul.line{background:url(https://i.alipayobjects.com/e/201303/2MFyKU1LW9.gif) 0 0 repeat-y}.ztree li a{padding:1px 3px 0 0;margin:0;cursor:pointer;height:17px;color:#333;background-color:transparent;text-decoration:none;vertical-align:top;display:inline-block}.ztree li a:hover{text-decoration:underline}.ztree li a.curSelectedNode{padding-top:0;background-color:#FFE6B0;color:#000;height:16px;border:1px #FFB951 solid;opacity:.8}.ztree li a.curSelectedNode_Edit{padding-top:0;background-color:#FFE6B0;color:#000;height:16px;border:1px #FFB951 solid;opacity:.8}.ztree li a.tmpTargetNode_inner{padding-top:0;background-color:#316AC5;color:#fff;height:16px;border:1px #316AC5 solid;opacity:.8;filter:alpha(opacity=80)}.ztree li a input.rename{height:14px;width:80px;padding:0;margin:0;font-size:12px;border:1px #7EC4CC solid;*border:0}.ztree li span{line-height:16px;margin-right:2px}.ztree li span.button{line-height:0;margin:0;width:16px;height:16px;display:inline-block;vertical-align:middle;border:0 none;cursor:pointer;outline:0;background-color:transparent;background-repeat:no-repeat;background-attachment:scroll;background-image:url(https://i.alipayobjects.com/e/201303/2MFzqnrx4P.png);*background-image:url(https://i.alipayobjects.com/e/201303/2MFzMNFUUn.gif)}.ztree li span.button.chk{width:13px;height:13px;margin:0 3px 0 0;cursor:auto}.ztree li span.button.chk.checkbox_false_full{background-position:0 0}.ztree li span.button.chk.checkbox_false_full_focus{background-position:0 -14px}.ztree li span.button.chk.checkbox_false_part{background-position:0 -28px}.ztree li span.button.chk.checkbox_false_part_focus{background-position:0 -42px}.ztree li span.button.chk.checkbox_false_disable{background-position:0 -56px}.ztree li span.button.chk.checkbox_true_full{background-position:-14px 0}.ztree li span.button.chk.checkbox_true_full_focus{background-position:-14px -14px}.ztree li span.button.chk.checkbox_true_part{background-position:-14px -28px}.ztree li span.button.chk.checkbox_true_part_focus{background-position:-14px -42px}.ztree li span.button.chk.checkbox_true_disable{background-position:-14px -56px}.ztree li span.button.chk.radio_false_full{background-position:-28px 0}.ztree li span.button.chk.radio_false_full_focus{background-position:-28px -14px}.ztree li span.button.chk.radio_false_part{background-position:-28px -28px}.ztree li span.button.chk.radio_false_part_focus{background-position:-28px -42px}.ztree li span.button.chk.radio_false_disable{background-position:-28px -56px}.ztree li span.button.chk.radio_true_full{background-position:-42px 0}.ztree li span.button.chk.radio_true_full_focus{background-position:-42px -14px}.ztree li span.button.chk.radio_true_part{background-position:-42px -28px}.ztree li span.button.chk.radio_true_part_focus{background-position:-42px -42px}.ztree li span.button.chk.radio_true_disable{background-position:-42px -56px}.ztree li span.button.switch{width:18px;height:18px}.ztree li span.button.root_open{background-position:-92px -54px}.ztree li span.button.root_close{background-position:-74px -54px}.ztree li span.button.roots_open{background-position:-92px 0}.ztree li span.button.roots_close{background-position:-74px 0}.ztree li span.button.center_open{background-position:-92px -18px}.ztree li span.button.center_close{background-position:-74px -18px}.ztree li span.button.bottom_open{background-position:-92px -36px}.ztree li span.button.bottom_close{background-position:-74px -36px}.ztree li span.button.noline_open{background-position:-92px -72px}.ztree li span.button.noline_close{background-position:-74px -72px}.ztree li span.button.root_docu{background:0}.ztree li span.button.roots_docu{background-position:-56px 0}.ztree li span.button.center_docu{background-position:-56px -18px}.ztree li span.button.bottom_docu{background-position:-56px -36px}.ztree li span.button.noline_docu{background:0}.ztree li span.button.ico_open{margin-right:2px;background-position:-110px -16px;vertical-align:top;*vertical-align:middle}.ztree li span.button.ico_close{margin-right:2px;background-position:-110px 0;vertical-align:top;*vertical-align:middle}.ztree li span.button.ico_docu{margin-right:2px;background-position:-110px -32px;vertical-align:top;*vertical-align:middle}.ztree li span.button.edit{margin-right:2px;background-position:-110px -48px;vertical-align:top;*vertical-align:middle}.ztree li span.button.remove{margin-right:2px;background-position:-110px -64px;vertical-align:top;*vertical-align:middle}.ztree li span.button.ico_loading{margin-right:2px;background:url(https://i.alipayobjects.com/e/201303/2MFyKU1LW9.gif) no-repeat scroll 0 0 transparent;vertical-align:top;*vertical-align:middle}ul.tmpTargetzTree{background-color:#FFE6B0;opacity:.8;filter:alpha(opacity=80)}span.tmpzTreeMove_arrow{width:16px;height:16px;display:inline-block;padding:0;margin:2px 0 0 1px;border:0 none;position:absolute;background-color:transparent;background-repeat:no-repeat;background-attachment:scroll;background-position:-110px -80px;background-image:url(./img/zTreeStandard.png);*background-image:url(./img/zTreeStandard.gif)}ul.ztree.zTreeDragUL{margin:0;padding:0;position:absolute;width:auto;height:auto;overflow:hidden;background-color:#cfcfcf;border:1px #00B83F dotted;opacity:.8;filter:alpha(opacity=80)}.zTreeMask{z-index:10000;background-color:#cfcfcf;opacity:0;filter:alpha(opacity=0);position:absolute}")
});