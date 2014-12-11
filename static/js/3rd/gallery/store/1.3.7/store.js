define("gallery/store/1.3.7/store", [], function (e, t, r) {
    (function () {
        function e() {
            try {
                return c in a && a[c]
            } catch (e) {
                return!1
            }
        }

        function t(e) {
            return function () {
                var t = Array.prototype.slice.call(arguments, 0);
                t.unshift(i), f.appendChild(i), i.addBehavior("#default#userData"), i.load(c);
                var r = e.apply(o, t);
                return f.removeChild(i), r
            }
        }

        function n(e) {
            return e.replace(v, "___")
        }

        var i, o = {}, a = window, u = a.document, c = "localStorage", l = "__storejs__";
        if (o.disabled = !1, o.set = function () {
        }, o.get = function () {
        }, o.remove = function () {
        }, o.clear = function () {
        }, o.transact = function (e, t, r) {
            var n = o.get(e);
            null == r && (r = t, t = null), n === void 0 && (n = t || {}), r(n), o.set(e, n)
        }, o.getAll = function () {
        }, o.serialize = function (e) {
            return JSON.stringify(e)
        }, o.deserialize = function (e) {
            if ("string" != typeof e)return void 0;
            try {
                return JSON.parse(e)
            } catch (t) {
                return e || void 0
            }
        }, e())i = a[c], o.set = function (e, t) {
            return void 0 === t ? o.remove(e) : (i.setItem(e, o.serialize(t)), t)
        }, o.get = function (e) {
            return o.deserialize(i.getItem(e))
        }, o.remove = function (e) {
            i.removeItem(e)
        }, o.clear = function () {
            i.clear()
        }, o.getAll = function () {
            for (var e = {}, t = 0; i.length > t; ++t) {
                var r = i.key(t);
                e[r] = o.get(r)
            }
            return e
        }; else if (u.documentElement.addBehavior) {
            var f, d;
            try {
                d = new ActiveXObject("htmlfile"), d.open(), d.write('<script>document.w=window</script><iframe src="/favicon.ico"></frame>'), d.close(), f = d.w.frames[0].document, i = f.createElement("div")
            } catch (s) {
                i = u.createElement("div"), f = u.body
            }
            var v = RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g");
            o.set = t(function (e, t, r) {
                return t = n(t), void 0 === r ? o.remove(t) : (e.setAttribute(t, o.serialize(r)), e.save(c), r)
            }), o.get = t(function (e, t) {
                return t = n(t), o.deserialize(e.getAttribute(t))
            }), o.remove = t(function (e, t) {
                t = n(t), e.removeAttribute(t), e.save(c)
            }), o.clear = t(function (e) {
                var t = e.XMLDocument.documentElement.attributes;
                e.load(c);
                for (var r, n = 0; r = t[n]; n++)e.removeAttribute(r.name);
                e.save(c)
            }), o.getAll = t(function (e) {
                for (var t, r = e.XMLDocument.documentElement.attributes, i = {}, a = 0; t = r[a]; ++a) {
                    var u = n(t.name);
                    i[t.name] = o.deserialize(e.getAttribute(u))
                }
                return i
            })
        }
        try {
            o.set(l, l), o.get(l) != l && (o.disabled = !0), o.remove(l)
        } catch (s) {
            o.disabled = !0
        }
        o.enabled = !o.disabled, r !== void 0 && "function" != typeof r ? r.exports = o : "function" == typeof define && define.amd ? define(o) : this.store = o
    })()
});
