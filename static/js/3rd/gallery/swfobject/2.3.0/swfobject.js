define("gallery/swfobject/2.3.0/swfobject", [], function (e, t, n) {
    var r = function () {
        function L() {
            if (w || !document.getElementsByTagName("body")[0])return;
            try {
                var e, t = X("span");
                t.style.display = "none", e = f.getElementsByTagName("body")[0].appendChild(t), e.parentNode.removeChild(e), e = null, t = null
            } catch (n) {
                return
            }
            w = !0;
            var r = h.length;
            for (var i = 0; i < r; i++)h[i]()
        }

        function A(e) {
            w ? e() : h[h.length] = e
        }

        function O(t) {
            if (typeof a.addEventListener != e)a.addEventListener("load", t, !1); else if (typeof f.addEventListener != e)f.addEventListener("load", t, !1); else if (typeof a.attachEvent != e)$(a, "onload", t); else if (typeof a.onload == "function") {
                var n = a.onload;
                a.onload = function () {
                    n(), t()
                }
            } else a.onload = t
        }

        function M() {
            var n = f.getElementsByTagName("body")[0], r = X(t);
            r.setAttribute("style", "visibility: hidden;"), r.setAttribute("type", s);
            var i = n.appendChild(r);
            if (i) {
                var o = 0;
                (function u() {
                    if (typeof i.GetVariable != e)try {
                        var t = i.GetVariable("$version");
                        t && (t = t.split(" ")[1].split(","), C.pv = [V(t[0]), V(t[1]), V(t[2])])
                    } catch (s) {
                        C.pv = [8, 0, 0]
                    } else if (o < 10) {
                        o++, setTimeout(u, 10);
                        return
                    }
                    n.removeChild(r), i = null, _()
                })()
            } else _()
        }

        function _() {
            var t = p.length;
            if (t > 0)for (var n = 0; n < t; n++) {
                var r = p[n].id, i = p[n].callbackFn, s = {success: !1, id: r};
                if (C.pv[0] > 0) {
                    var o = W(r);
                    if (o)if (J(p[n].swfVersion) && !(C.wk && C.wk < 312))Q(r, !0), i && (s.success = !0, s.ref = D(r), s.id = r, i(s)); else if (p[n].expressInstall && P()) {
                        var u = {};
                        u.data = p[n].expressInstall, u.width = o.getAttribute("width") || "0", u.height = o.getAttribute("height") || "0", o.getAttribute("class") && (u.styleclass = o.getAttribute("class")), o.getAttribute("align") && (u.align = o.getAttribute("align"));
                        var a = {}, f = o.getElementsByTagName("param"), l = f.length;
                        for (var c = 0; c < l; c++)f[c].getAttribute("name").toLowerCase() != "movie" && (a[f[c].getAttribute("name")] = f[c].getAttribute("value"));
                        H(u, a, r, i)
                    } else B(o), i && i(s)
                } else {
                    Q(r, !0);
                    if (i) {
                        var h = D(r);
                        h && typeof h.SetVariable != e && (s.success = !0, s.ref = h, s.id = h.id), i(s)
                    }
                }
            }
        }

        function D(n) {
            var r = null, i = W(n);
            return i && i.nodeName.toUpperCase() === "OBJECT" && (typeof i.SetVariable !== e ? r = i : r = i.getElementsByTagName(t)[0] || i), r
        }

        function P() {
            return!E && J("6.0.65") && (C.win || C.mac) && !(C.wk && C.wk < 312)
        }

        function H(t, n, r, i) {
            var s = W(r);
            r = z(r), E = !0, y = i || null, b = {success: !1, id: r};
            if (s) {
                s.nodeName.toUpperCase() == "OBJECT" ? (m = j(s), g = null) : (m = s, g = r), t.id = o;
                if (typeof t.width == e || !/%$/.test(t.width) && V(t.width) < 310)t.width = "310";
                if (typeof t.height == e || !/%$/.test(t.height) && V(t.height) < 137)t.height = "137";
                f.title = f.title.slice(0, 47) + " - Flash Player Installation";
                var u = C.ie ? "ActiveX" : "PlugIn", l = "MMredirectURL=" + encodeURIComponent(a.location.toString().replace(/&/g, "%26")) + "&MMplayerType=" + u + "&MMdoctitle=" + f.title;
                typeof n.flashvars != e ? n.flashvars += "&" + l : n.flashvars = l;
                if (C.ie && s.readyState != 4) {
                    var c = X("div");
                    r += "SWFObjectNew", c.setAttribute("id", r), s.parentNode.insertBefore(c, s), s.style.display = "none", R(s)
                }
                I(t, n, r)
            }
        }

        function B(e) {
            if (C.ie && e.readyState != 4) {
                e.style.display = "none";
                var t = X("div");
                e.parentNode.insertBefore(t, e), t.parentNode.replaceChild(j(e), t), R(e)
            } else e.parentNode.replaceChild(j(e), e)
        }

        function j(e) {
            var n = X("div");
            if (C.win && C.ie)n.innerHTML = e.innerHTML; else {
                var r = e.getElementsByTagName(t)[0];
                if (r) {
                    var i = r.childNodes;
                    if (i) {
                        var s = i.length;
                        for (var o = 0; o < s; o++)(i[o].nodeType != 1 || i[o].nodeName != "PARAM") && i[o].nodeType != 8 && n.appendChild(i[o].cloneNode(!0))
                    }
                }
            }
            return n
        }

        function F(e, t) {
            var n = X("div");
            return n.innerHTML = "<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000'><param name='movie' value='" + e + "'>" + t + "</object>", n.firstChild
        }

        function I(n, r, i) {
            var o, u = W(i);
            i = z(i);
            if (C.wk && C.wk < 312)return o;
            if (u) {
                var a = C.ie ? X("div") : X(t), f, l, c;
                typeof n.id == e && (n.id = i);
                for (c in r)r.hasOwnProperty(c) && c.toLowerCase() !== "movie" && q(a, c, r[c]);
                C.ie && (a = F(n.data, a.innerHTML));
                for (f in n)n.hasOwnProperty(f) && (l = f.toLowerCase(), l === "styleclass" ? a.setAttribute("class", n[f]) : l !== "classid" && l !== "data" && a.setAttribute(f, n[f]));
                C.ie ? d[d.length] = n.id : (a.setAttribute("type", s), a.setAttribute("data", n.data)), u.parentNode.replaceChild(a, u), o = a
            }
            return o
        }

        function q(e, t, n) {
            var r = X("param");
            r.setAttribute("name", t), r.setAttribute("value", n), e.appendChild(r)
        }

        function R(e) {
            var t = W(e);
            t && t.nodeName.toUpperCase() == "OBJECT" && (C.ie ? (t.style.display = "none", function n() {
                if (t.readyState == 4) {
                    for (var e in t)typeof t[e] == "function" && (t[e] = null);
                    t.parentNode.removeChild(t)
                } else setTimeout(n, 10)
            }()) : t.parentNode.removeChild(t))
        }

        function U(e) {
            return e && e.nodeType && e.nodeType === 1
        }

        function z(e) {
            return U(e) ? e.id : e
        }

        function W(e) {
            if (U(e))return e;
            var t = null;
            try {
                t = f.getElementById(e)
            } catch (n) {
            }
            return t
        }

        function X(e) {
            return f.createElement(e)
        }

        function V(e) {
            return parseInt(e, 10)
        }

        function $(e, t, n) {
            e.attachEvent(t, n), v[v.length] = [e, t, n]
        }

        function J(e) {
            e += "";
            var t = C.pv, n = e.split(".");
            return n[0] = V(n[0]), n[1] = V(n[1]) || 0, n[2] = V(n[2]) || 0, t[0] > n[0] || t[0] == n[0] && t[1] > n[1] || t[0] == n[0] && t[1] == n[1] && t[2] >= n[2] ? !0 : !1
        }

        function K(t, n, r, i) {
            var s = f.getElementsByTagName("head")[0];
            if (!s)return;
            var o = typeof r == "string" ? r : "screen";
            i && (S = null, x = null);
            if (!S || x != o) {
                var u = X("style");
                u.setAttribute("type", "text/css"), u.setAttribute("media", o), S = s.appendChild(u), C.ie && typeof f.styleSheets != e && f.styleSheets.length > 0 && (S = f.styleSheets[f.styleSheets.length - 1]), x = o
            }
            S && (typeof S.addRule != e ? S.addRule(t, n) : typeof f.createTextNode != e && S.appendChild(f.createTextNode(t + " {" + n + "}")))
        }

        function Q(e, t) {
            if (!T)return;
            var n = t ? "visible" : "hidden", r = W(e);
            w && r ? r.style.visibility = n : typeof e == "string" && K("#" + e, "visibility:" + n)
        }

        function G(t) {
            var n = /[\\\"<>\.;]/, r = n.exec(t) != null;
            return r && typeof encodeURIComponent != e ? encodeURIComponent(t) : t
        }

        var e = "undefined", t = "object", n = "Shockwave Flash", i = "ShockwaveFlash.ShockwaveFlash", s = "application/x-shockwave-flash", o = "SWFObjectExprInst", u = "onreadystatechange", a = window, f = document, l = navigator, c = !1, h = [], p = [], d = [], v = [], m, g, y, b, w = !1, E = !1, S, x, T = !0, N = !1, C = function () {
            var r = typeof f.getElementById != e && typeof f.getElementsByTagName != e && typeof f.createElement != e, o = l.userAgent.toLowerCase(), u = l.platform.toLowerCase(), h = u ? /win/.test(u) : /win/.test(o), p = u ? /mac/.test(u) : /mac/.test(o), d = /webkit/.test(o) ? parseFloat(o.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : !1, v = l.appName === "Microsoft Internet Explorer", m = [0, 0, 0], g = null;
            if (typeof l.plugins != e && typeof l.plugins[n] == t)g = l.plugins[n].description, g && typeof l.mimeTypes != e && l.mimeTypes[s] && l.mimeTypes[s].enabledPlugin && (c = !0, v = !1, g = g.replace(/^.*\s+(\S+\s+\S+$)/, "$1"), m[0] = V(g.replace(/^(.*)\..*$/, "$1")), m[1] = V(g.replace(/^.*\.(.*)\s.*$/, "$1")), m[2] = /[a-zA-Z]/.test(g) ? V(g.replace(/^.*[a-zA-Z]+(.*)$/, "$1")) : 0); else if (typeof a.ActiveXObject != e)try {
                var y = new ActiveXObject(i);
                y && (g = y.GetVariable("$version"), g && (v = !0, g = g.split(" ")[1].split(","), m = [V(g[0]), V(g[1]), V(g[2])]))
            } catch (b) {
            }
            return{w3: r, pv: m, wk: d, ie: v, win: h, mac: p}
        }(), k = function () {
            if (!C.w3)return;
            (typeof f.readyState != e && f.readyState == "complete" || typeof f.readyState == e && (f.getElementsByTagName("body")[0] || f.body)) && L(), w || (typeof f.addEventListener != e && f.addEventListener("DOMContentLoaded", L, !1), C.ie && (f.attachEvent(u, function t() {
                f.readyState == "complete" && (f.detachEvent(u, t), L())
            }), a == top && function n() {
                if (w)return;
                try {
                    f.documentElement.doScroll("left")
                } catch (e) {
                    setTimeout(n, 0);
                    return
                }
                L()
            }()), C.wk && function r() {
                if (w)return;
                if (!/loaded|complete/.test(f.readyState)) {
                    setTimeout(r, 0);
                    return
                }
                L()
            }())
        }();
        h[0] = function () {
            c ? M() : _()
        };
        var Y = function () {
            C.ie && window.attachEvent("onunload", function () {
                var e = v.length;
                for (var t = 0; t < e; t++)v[t][0].detachEvent(v[t][1], v[t][2]);
                var n = d.length;
                for (var i = 0; i < n; i++)R(d[i]);
                for (var s in C)C[s] = null;
                C = null;
                for (var o in r)r[o] = null;
                r = null
            })
        }();
        return{registerObject: function (e, t, n, r) {
            if (C.w3 && e && t) {
                var i = {};
                i.id = e, i.swfVersion = t, i.expressInstall = n, i.callbackFn = r, p[p.length] = i, Q(e, !1)
            } else r && r({success: !1, id: e})
        }, getObjectById: function (e) {
            if (C.w3)return D(e)
        }, embedSWF: function (n, r, i, s, o, u, a, f, l, c) {
            var h = z(r), p = {success: !1, id: h};
            C.w3 && !(C.wk && C.wk < 312) && n && r && i && s && o ? (Q(h, !1), A(function () {
                i += "", s += "";
                var d = {};
                if (l && typeof l === t)for (var v in l)d[v] = l[v];
                d.data = n, d.width = i, d.height = s;
                var m = {};
                if (f && typeof f === t)for (var g in f)m[g] = f[g];
                if (a && typeof a === t)for (var y in a)if (a.hasOwnProperty(y)) {
                    var b = N ? encodeURIComponent(y) : y, w = N ? encodeURIComponent(a[y]) : a[y];
                    typeof m.flashvars != e ? m.flashvars += "&" + b + "=" + w : m.flashvars = b + "=" + w
                }
                if (J(o)) {
                    var E = I(d, m, r);
                    d.id == h && Q(h, !0), p.success = !0, p.ref = E, p.id = E.id
                } else {
                    if (u && P()) {
                        d.data = u, H(d, m, r, c);
                        return
                    }
                    Q(h, !0)
                }
                c && c(p)
            })) : c && c(p)
        }, switchOffAutoHideShow: function () {
            T = !1
        }, enableUriEncoding: function (t) {
            N = typeof t === e ? !0 : t
        }, ua: C, getFlashPlayerVersion: function () {
            return{major: C.pv[0], minor: C.pv[1], release: C.pv[2]}
        }, hasFlashPlayerVersion: J, createSWF: function (e, t, n) {
            return C.w3 ? I(e, t, n) : undefined
        }, showExpressInstall: function (e, t, n, r) {
            C.w3 && P() && H(e, t, n, r)
        }, removeSWF: function (e) {
            C.w3 && R(e)
        }, createCSS: function (e, t, n, r) {
            C.w3 && K(e, t, n, r)
        }, addDomLoadEvent: A, addLoadEvent: O, getQueryParamValue: function (e) {
            var t = f.location.search || f.location.hash;
            if (t) {
                /\?/.test(t) && (t = t.split("?")[1]);
                if (e == null)return G(t);
                var n = t.split("&");
                for (var r = 0; r < n.length; r++)if (n[r].substring(0, n[r].indexOf("=")) == e)return G(n[r].substring(n[r].indexOf("=") + 1))
            }
            return""
        }, expressInstallCallback: function () {
            if (E) {
                var e = W(o);
                e && m && (e.parentNode.replaceChild(m, e), g && (Q(g, !0), C.ie && (m.style.display = "block")), y && y(b)), E = !1
            }
        }, version: "2.3"}
    }();
    return r
});
