define("gallery/mathjs/0.9.0/math", [], function (e, n, t) {
    (function () {
        function r(e) {
            return e instanceof Boolean || "boolean" == typeof e
        }

        function i(e, n) {
            if (!(this instanceof i))throw new SyntaxError("Complex constructor must be called with the new operator");
            if (null != e && !w(e) || null != n && !w(n))throw new TypeError("Two numbers expected in Complex constructor");
            this.re = e || 0, this.im = n || 0
        }

        function a(e) {
            if (!(this instanceof a))throw new SyntaxError("Matrix constructor must be called with the new operator");
            if (e instanceof a || e instanceof y)this._data = e.toArray(); else if (e instanceof Array)this._data = e; else {
                if (null != e)throw new TypeError("Unsupported type of data (" + rn["typeof"](e) + ")");
                this._data = []
            }
            this._size = an.size(this._data)
        }

        function o(e, n) {
            return an.validateIndex(n, e.length), e[n - 1]
        }

        function s(e, n) {
            return n.forEach(function (n) {
                e = o(e, n)
            }), rn.clone(e)
        }

        function f(e, n) {
            var t = n[0];
            return t.map ? t.map(function (n) {
                return o(e, n)
            }) : [o(e, t)]
        }

        function u(e, n) {
            var t = n[0], r = n[1];
            if (t.map)return r.map ? t.map(function (n) {
                var t = o(e, n);
                return r.map(function (e) {
                    return o(t, e)
                })
            }) : t.map(function (n) {
                return[o(o(e, n), r)]
            });
            if (r.map) {
                var i = o(e, t);
                return[r.map(function (e) {
                    return o(i, e)
                })]
            }
            return[
                [o(o(e, t), r)]
            ]
        }

        function c(e, n, t) {
            var r = t == n.length - 1, i = n[t], a = function (i) {
                var a = o(e, i);
                return r ? a : c(a, n, t + 1)
            };
            return i.map ? i.map(a) : [a(i)]
        }

        function l(e, n, t) {
            if (an.validateIndex(n), t instanceof Array)throw new TypeError("Dimension mismatch, value expected instead of array");
            e[n - 1] = t
        }

        function h(e, n, t, r) {
            var i = !1;
            t.length > n.length && (i = !0);
            for (var a = 0; t.length > a; a++) {
                var o = t[a];
                an.validateIndex(o), (null == n[a] || o > n[a]) && (n[a] = o, i = !0)
            }
            i && an.resize(e, n, 0);
            var s = n.length;
            t.forEach(function (n, t) {
                s - 1 > t ? e = e[n - 1] : e[n - 1] = r
            })
        }

        function p(e, n, t, r) {
            var i = t[0];
            an.validateIndex(i), i > n[0] && (an.resize(e, [i], 0), n[0] = i), e[i - 1] = r
        }

        function m(e, n, t, r) {
            var i = t[0], a = t[1];
            an.validateIndex(i), an.validateIndex(a);
            var o = !1;
            i > (n[0] || 0) && (n[0] = i, o = !0), a > (n[1] || 0) && (n[1] = a, o = !0), o && an.resize(e, n, 0), e[i - 1][a - 1] = r
        }

        function v(e, n, t, r, i) {
            var a = r == t.length - 1, o = t[r], s = function (o, s) {
                if (a)l(e, o, i[s]), o > (n[r] || 0) && (n[r] = o); else {
                    var f = e[o - 1];
                    f instanceof Array || (e[o - 1] = f = [f]), o > (n[r] || 0) && (n[r] = o), v(f, n, t, r + 1, i[s])
                }
            };
            if (o.map) {
                var f = o.size && o.size() || o.length;
                if (f != i.length)throw new RangeError("Dimensions mismatch (" + f + " != " + i.length + ")");
                o.map(s)
            } else s(o, 0)
        }

        function g(e) {
            for (var n = 0, t = e.length; t > n; n++) {
                var r = e[n];
                r instanceof Array ? g(r) : void 0 == r && (e[n] = 0)
            }
        }

        function w(e) {
            return e instanceof Number || "number" == typeof e
        }

        function d(e) {
            return e == Math.round(e)
        }

        function y(e, n, t) {
            if (!(this instanceof y))throw new SyntaxError("Range constructor must be called with the new operator");
            if (null != e && !w(e))throw new TypeError("Parameter start must be a number");
            if (null != t && !w(t))throw new TypeError("Parameter end must be a number");
            if (null != n && !w(n))throw new TypeError("Parameter step must be a number");
            this.start = null != e ? e : 0, this.end = null != t ? t : 0, this.step = null != n ? n : 1
        }

        function E(e, n) {
            var t = rn.type.Selector, r = Array.prototype.slice;
            t.prototype[e] = "function" == typeof n ? function () {
                var e = [this.value].concat(r.call(arguments, 0));
                return new t(n.apply(this, e))
            } : new t(n)
        }

        function x(e) {
            return e instanceof String || "string" == typeof e
        }

        function N(e, n) {
            if (!(this instanceof N))throw Error("Unit constructor must be called with the new operator");
            if (null != e && !w(e))throw new TypeError("First parameter in Unit constructor must be a number");
            if (null != n && !x(n))throw new TypeError("Second parameter in Unit constructor must be a string");
            if (null != n) {
                var t = O(n);
                if (!t)throw new SyntaxError('String "' + n + '" is no unit');
                this.unit = t.unit, this.prefix = t.prefix
            } else this.unit = N.UNIT_NONE, this.prefix = N.PREFIX_NONE;
            null != e ? (this.value = this._normalize(e), this.fixPrefix = !1) : (this.value = null, this.fixPrefix = !0)
        }

        function O(e) {
            for (var n = N.UNITS, t = 0, r = n.length; r > t; t++) {
                var i = n[t];
                if (an.endsWith(e, i.name)) {
                    var a = e.length - i.name.length, o = e.substring(0, a), s = i.prefixes[o];
                    if (void 0 !== s)return{unit: i, prefix: s}
                }
            }
            return null
        }

        function b(e, n) {
            var t = void 0;
            if (2 == arguments.length) {
                var r = rn["typeof"](n);
                t = "Function " + e + "(" + r + ") not supported"
            } else if (arguments.length > 2) {
                for (var i = [], a = 1; arguments.length > a; a++)i.push(rn["typeof"](arguments[a]));
                t = "Function " + e + "(" + i.join(", ") + ") not supported"
            } else t = "Unsupported parameter in function " + e;
            return new TypeError(t)
        }

        function M(e, n, t, r) {
            var i = "Wrong number of arguments in function " + e + " (" + n + " provided, " + t + (void 0 != r ? "-" + r : "") + " expected)";
            return new SyntaxError(i)
        }

        function A() {
        }

        function S(e) {
            this.value = e
        }

        function T(e, n, t) {
            this.name = e, this.fn = n, this.params = t
        }

        function U(e, n) {
            this.name = e, this.scope = n
        }

        function R(e, n, t) {
            if (this.object = e, this.params = n, this.paramScopes = t, this.hasContextParams = !1, n)for (var r = {type: rn.type.SymbolNode, properties: {name: "end"}}, i = 0, a = n.length; a > i; i++)if (n[i].find(r).length > 0) {
                this.hasContextParams = !0;
                break
            }
        }

        function z(e) {
            this.nodes = e || []
        }

        function L() {
            this.params = [], this.visible = []
        }

        function _(e, n, t) {
            this.name = e, this.expr = n, this.scope = t
        }

        function I(e, n, t, r, i) {
            this.name = e, this.params = n, this.paramScopes = t, this.expr = r, this.scope = i, this.hasContextParams = !1;
            for (var a = {type: rn.type.SymbolNode, properties: {name: "end"}}, o = 0, s = n.length; s > o; o++)if (n[o].find(a).length > 0) {
                this.hasContextParams = !0;
                break
            }
        }

        function q(e, n, t, r, i) {
            this.name = e, this.variables = n, this.scope = i, this.fn = function () {
                var i = n ? n.length : 0;
                if (arguments.length != i)throw M(e, arguments.length, i);
                for (var a = 0; i > a; a++)r.set(n[a], arguments[a]);
                return t.eval()
            }, this.fn.toString = function () {
                return e + "(" + n.join(", ") + ")"
            }
        }

        function P() {
            this.idMax = -1, this.updateSeq = 0, this.scope = new rn.expr.Scope, this.nodes = {}, this.firstNode = void 0, this.lastNode = void 0
        }

        function B(e, n) {
            var t = n.re * n.re + n.im * n.im;
            return new i((e.re * n.re + e.im * n.im) / t, (e.im * n.re - e.re * n.im) / t)
        }

        function C(e, n) {
            if (n > 0)return e > 0 ? e % n : 0 == e ? 0 : e - n * Math.floor(e / n);
            if (0 == n)return e;
            throw Error("Cannot calculate mod for a negative divisor")
        }

        function G(e, n) {
            return new i(e.re * n.re - e.im * n.im, e.re * n.im + e.im * n.re)
        }

        function F(e, n) {
            var t = rn.log(e), r = rn.multiply(t, n);
            return rn.exp(r)
        }

        function V(e, n) {
            if (n) {
                var t = Math.pow(10, n);
                return Math.round(e * t) / t
            }
            return Math.round(e)
        }

        function j(e) {
            if (e instanceof Array || e instanceof a || e instanceof y) {
                for (var n = e.valueOf(), t = "[", r = n.length, i = 0; r > i; i++)0 != i && (t += ", "), t += j(n[i]);
                return t += "]"
            }
            return w(e) ? an.formatNumber(e) : "" + e
        }

        function D(e, n, t, r) {
            if (t > r) {
                if (e.length != n.length)throw Error("Dimensions mismatch (" + e.length + " != " + n.length + ")");
                for (var i = [], a = 0; e.length > a; a++)i[a] = D(e[a], n[a], t, r + 1);
                return i
            }
            return e.concat(n)
        }

        function H(e, n, t) {
            var r = rn.multiply, i = rn.subtract;
            if (1 == n)return e[0][0];
            if (2 == n)return i(r(e[0][0], e[1][1]), r(e[1][0], e[0][1]));
            for (var a = 1, o = 0, s = 0; n > s && !(o >= t); s++) {
                for (var f = s; 0 == e[f][o];)if (f++, f == n && (f = s, o++, o == t))return an.deepEqual(e, rn.eye(n).valueOf()) ? rn.round(a, 6) : 0;
                if (f != s) {
                    for (var u = 0; t > u; u++) {
                        var c = e[f][u];
                        e[f][u] = e[s][u], e[s][u] = c
                    }
                    a *= -1
                }
                for (var l = e[s][o], u = 0; t > u; u++)e[s][u] = e[s][u] / l;
                a *= l;
                for (var h = 0; n > h; h++)if (h != s)for (var p = e[h][o], u = 0; t > u; u++)e[h][u] = e[h][u] - e[s][u] * p;
                o++
            }
            return an.deepEqual(e, rn.eye(n).valueOf()) ? rn.round(a, 6) : 0
        }

        function k(e, n, t) {
            var r, i, a, o, s, f = rn.add, u = rn.unaryminus, c = rn.multiply, l = rn.divide;
            if (1 == n) {
                if (o = e[0][0], 0 == o)throw Error("Cannot calculate inverse, determinant is zero");
                return[
                    [l(1, o)]
                ]
            }
            if (2 == n) {
                var h = rn.det(e);
                if (0 == h)throw Error("Cannot calculate inverse, determinant is zero");
                return[
                    [l(e[1][1], h), l(u(e[0][1]), h)],
                    [l(u(e[1][0]), h), l(e[0][0], h)]
                ]
            }
            var p = e.concat();
            for (r = 0; n > r; r++)p[r] = p[r].concat();
            for (var m = rn.eye(n).valueOf(), v = 0; t > v; v++) {
                for (r = v; n > r && 0 == p[r][v];)r++;
                if (r == n || 0 == p[r][v])throw Error("Cannot calculate inverse, determinant is zero");
                r != v && (s = p[v], p[v] = p[r], p[r] = s, s = m[v], m[v] = m[r], m[r] = s);
                var g = p[v], w = m[v];
                for (r = 0; n > r; r++) {
                    var d = p[r], y = m[r];
                    if (r != v) {
                        if (0 != d[v]) {
                            for (a = l(u(d[v]), g[v]), i = v; t > i; i++)d[i] = f(d[i], c(a, g[i]));
                            for (i = 0; t > i; i++)y[i] = f(y[i], c(a, w[i]))
                        }
                    } else {
                        for (a = g[v], i = v; t > i; i++)d[i] = l(d[i], a);
                        for (i = 0; t > i; i++)y[i] = l(y[i], a)
                    }
                }
            }
            return m
        }

        function Y(e) {
            if (1 == e.length)return Y(e[0]);
            for (var n = 0, t = e.length; t > n; n++) {
                var r = e[n];
                r instanceof Array && (e[n] = Y(r))
            }
            return e
        }

        function W(e, n) {
            var t, r;
            return e instanceof Array || e instanceof y ? (t = rn.matrix(e), r = t.get(n), r.valueOf()) : e instanceof a ? e.get(n) : x(e) ? K(e, n) : (t = rn.matrix([e]), r = t.get(n), r.valueOf())
        }

        function K(e, n) {
            var t, r;
            if (n = n.valueOf(), 1 != n.length)throw new RangeError("Dimension mismatch (" + n.length + " != 1)");
            n instanceof Array && (n = n[0]), n = n.valueOf(), n instanceof Array || (n = [n]);
            var i = "", a = e.length;
            for (t = 0, r = n.length; r > t; t++) {
                var o = n[t];
                an.validateIndex(o, a), i += e.charAt(o - 1)
            }
            return i
        }

        function Z(e, n, t) {
            if (e instanceof Array || e instanceof y) {
                var r = rn.matrix(rn.clone(e));
                return r.set(n, t), r.valueOf()
            }
            return e instanceof a ? e.clone().set(n, t) : x(e) ? X(e, n, t) : (r = rn.matrix([e]), r.set(n, t), r.isScalar() ? r.toScalar() : r.valueOf())
        }

        function X(e, n, t) {
            var r, i;
            if (n = n.valueOf(), 1 != n.length)throw new RangeError("Dimension mismatch (" + n.length + " != 1)");
            if (n instanceof Array && (n = n[0]), n = n.valueOf(), n instanceof Array || (n = [n]), n.length != t.length)throw new RangeError("Dimension mismatch (" + n.length + " != " + t.length + ")");
            var a = e.length, o = [];
            for (r = 0; a > r; r++)o[r] = e.charAt(r);
            for (r = 0, i = n.length; i > r; r++) {
                var s = n[r];
                an.validateIndex(s), o[s - 1] = t.charAt(r)
            }
            if (o.length > a)for (r = a - 1, i = o.length; i > r; r++)o[r] || (o[r] = " ");
            return o.join("")
        }

        function Q(e) {
            for (var n = rn.larger, t = e[0], r = 1, i = e.length; i > r; r++) {
                var a = e[r];
                n(a, t) && (t = a)
            }
            return t
        }

        function J(e, n, t) {
            for (var r = rn.larger, i = [], a = 0; t > a; a++) {
                for (var o = e[0][a], s = 1; n > s; s++) {
                    var f = e[s][a];
                    r(f, o) && (o = f)
                }
                i[a] = o
            }
            return i
        }

        function $(e) {
            for (var n = rn.smaller, t = e[0], r = 1, i = e.length; i > r; r++) {
                var a = e[r];
                n(a, t) && (t = a)
            }
            return t
        }

        function en(e, n, t) {
            for (var r = rn.smaller, i = [], a = 0; t > a; a++) {
                for (var o = e[0][a], s = 1; n > s; s++) {
                    var f = e[s][a];
                    r(f, o) && (o = f)
                }
                i[a] = o
            }
            return i
        }

        function nn(e, n, t) {
            (t.override || void 0 === rn[e]) && (rn[e] = t.wrap && "function" == typeof n ? function () {
                for (var e = [], t = 0, r = arguments.length; r > t; t++)e[t] = arguments[t].valueOf();
                return n.apply(rn, e)
            } : n, E(e, n))
        }

        function tn(e) {
            return"function" == typeof e || w(e) || x(e) || e instanceof i || e instanceof N
        }

        var rn = {type: {}, expr: {node: {}}, options: {precision: 5}};
        t !== void 0 && t.exports !== void 0 && (t.exports = rn), n !== void 0 && (n = rn), e !== void 0 && "undefined" != typeof define && define(function () {
            return rn
        }), "undefined" != typeof window && (window.math = rn);
        var an = function () {
            function e(n) {
                if (n instanceof Array) {
                    var t = n.length;
                    if (t) {
                        var r = e(n[0]);
                        return 0 == r[0] ? [0].concat(r) : [t].concat(r)
                    }
                    return[t]
                }
                return[]
            }

            function n(e, t, r) {
                var i, a = e.length;
                if (a != t[r])throw new RangeError("Dimension mismatch (" + a + " != " + t[r] + ")");
                if (t.length - 1 > r) {
                    var o = r + 1;
                    for (i = 0; a > i; i++) {
                        var s = e[i];
                        if (!(s instanceof Array))throw new RangeError("Dimension mismatch (" + (t.length - 1) + " < " + t.length + ")");
                        n(e[i], t, o)
                    }
                } else for (i = 0; a > i; i++)if (e[i]instanceof Array)throw new RangeError("Dimension mismatch (" + (t.length + 1) + " > " + t.length + ")")
            }

            function t(e, n, r) {
                if (n.length - 1 > r) {
                    var i = e[0];
                    if (1 != e.length || !(i instanceof Array))throw new RangeError("Dimension mismatch (" + e.length + " > 0)");
                    t(i, n, r + 1)
                } else if (e.length)throw new RangeError("Dimension mismatch (" + e.length + " > 0)")
            }

            function r(e, n, t, i) {
                if (!(e instanceof Array))throw new TypeError("Array expected");
                var a = e.length, o = n[t];
                if (a != o) {
                    if (o > e.length)for (var s = e.length; o > s; s++)e[s] = i ? rn.clone(i) : 0; else e.length = n[t];
                    a = e.length
                }
                if (n.length - 1 > t) {
                    var f = t + 1;
                    for (s = 0; a > s; s++)u = e[s], u instanceof Array || (u = [u], e[s] = u), r(u, n, f, i)
                } else for (s = 0; a > s; s++) {
                    for (var u = e[s]; u instanceof Array;)u = u[0];
                    e[s] = u
                }
            }

            var i = {};
            i.formatNumber = function (e, n) {
                if (1 / 0 === e)return"Infinity";
                if (e === -1 / 0)return"-Infinity";
                if (0 / 0 === e)return"NaN";
                var t = Math.abs(e);
                if (t > .001 && 1e5 > t || 0 == t)return i.toPrecision(e, n);
                var r = Math.round(Math.log(t) / Math.LN10), a = e / Math.pow(10, r);
                return i.toPrecision(a, n) + "e" + r
            }, i.toPrecision = function (e, n) {
                return e.toPrecision(n).replace(o, function (e, n, t) {
                    return e.substring(0, e.length - (n.length ? 0 : 1) - t.length)
                })
            };
            var o = /\.(\d*?)(0+)$/g;
            return i.formatArray = function (e) {
                if (e instanceof Array) {
                    for (var n = "[", t = e.length, r = 0; t > r; r++)0 != r && (n += ", "), n += i.formatArray(e[r]);
                    return n += "]"
                }
                return rn.format(e)
            }, i.formatArray2d = function (e) {
                var n = "[", t = i.size(e);
                if (2 != t.length)throw new RangeError("Array must be two dimensional (size: " + i.formatArray(t) + ")");
                for (var r = t[0], a = t[1], o = 0; r > o; o++) {
                    0 != o && (n += "; ");
                    for (var s = e[o], f = 0; a > f; f++) {
                        0 != f && (n += ", ");
                        var u = s[f];
                        void 0 != u && (n += rn.format(u))
                    }
                }
                return n += "]"
            }, i.argsToArray = function (e) {
                var n;
                if (0 == e.length)n = []; else if (1 == e.length)n = e[0], n instanceof a && (n = n.toVector()), n instanceof y && (n = n.valueOf()), n instanceof Array || (n = [n]); else {
                    n = [];
                    for (var t = 0; e.length > t; t++)n[t] = e[t]
                }
                return n
            }, i.endsWith = function (e, n) {
                var t = e.length - n.length, r = e.length;
                return e.substring(t, r) === n
            }, i.extend = function (e, n) {
                for (var t in n)n.hasOwnProperty(t) && (e[t] = n[t]);
                return e
            }, i.randomUUID = function () {
                var e = function () {
                    return Math.floor(65536 * Math.random()).toString(16)
                };
                return e() + e() + "-" + e() + "-" + e() + "-" + e() + "-" + e() + e() + e()
            }, i.map = function (e, n) {
                if (e instanceof Array || e instanceof a || e instanceof y)return e.map(function (e) {
                    return n(e)
                });
                throw new TypeError("Array expected")
            }, i.map2 = function (e, n, t) {
                var r, o, s;
                if (e instanceof a || n instanceof a)return new a(i.map2(e.valueOf(), n.valueOf(), t));
                if (e instanceof y || n instanceof y)return i.map2(e.valueOf(), n.valueOf(), t);
                if (e instanceof Array)if (n instanceof Array) {
                    if (e.length != n.length)throw new RangeError("Dimension mismatch (" + e.length + " != " + n.length + ")");
                    for (r = [], o = e.length, s = 0; o > s; s++)r[s] = t(e[s], n[s])
                } else for (r = [], o = e.length, s = 0; o > s; s++)r[s] = t(e[s], n); else if (n instanceof Array)for (r = [], o = n.length, s = 0; o > s; s++)r[s] = t(e, n[s]); else r = t(e, n);
                return r
            }, i.forEach = function (e, n) {
                if (e instanceof Array)e.forEach(n); else for (var t in e)e.hasOwnProperty(t) && n(e[t], t, e)
            }, i.mapObject = function (e, n) {
                var t = {};
                for (var r in e)e.hasOwnProperty(r) && (t[r] = n(e[r]));
                return t
            }, i.deepEqual = function (e, n) {
                var t, r, a;
                if (e instanceof Array) {
                    if (!(n instanceof Array))return!1;
                    for (r = 0, a = e.length; a > r; r++)if (!i.deepEqual(e[r], n[r]))return!1;
                    return!0
                }
                if (e instanceof Object) {
                    if (n instanceof Array || !(n instanceof Object))return!1;
                    for (t in e)if (e.hasOwnProperty(t) && !i.deepEqual(e[t], n[t]))return!1;
                    for (t in n)if (n.hasOwnProperty(t) && !i.deepEqual(e[t], n[t]))return!1;
                    return!0
                }
                return e.valueOf() == n.valueOf()
            }, i.size = function (n) {
                var t = e(n);
                return i.validate(n, t), t
            }, i.validate = function (e, r) {
                var a = 0 == r.length;
                if (a) {
                    if (e instanceof Array)throw new RangeError("Dimension mismatch (" + e.length + " != 0)")
                } else {
                    var o = -1 != r.indexOf(0);
                    o ? (r.forEach(function (e) {
                        if (0 != e)throw new RangeError("Invalid size, all dimensions must be either zero or non-zero (size: " + i.formatArray(r) + ")")
                    }), t(e, r, 0)) : n(e, r, 0)
                }
            }, i.validateIndex = function (e, n) {
                if (!w(e) || !d(e))throw new TypeError("Index must be an integer (value: " + e + ")");
                if (1 > e)throw new RangeError("Index out of range (" + e + " < 1)");
                if (n && e > n)throw new RangeError("Index out of range (" + e + " > " + n + ")")
            }, i.resize = function (e, n, t) {
                if (!(n instanceof Array))throw new TypeError("Size must be an array (size is " + rn["typeof"](n) + ")");
                n.forEach(function (e) {
                    if (!w(e) || !d(e) || 0 > e)throw new TypeError("Invalid size, must contain positive integers (size: " + i.formatArray(n) + ")")
                });
                var a = -1 != n.indexOf(0);
                a && n.forEach(function (e) {
                    if (0 != e)throw new RangeError("Invalid size, all dimensions must be either zero or non-zero (size: " + i.formatArray(n) + ")")
                }), r(e, n, 0, t)
            }, i
        }();
        rn.type.Complex = i, function () {
            function e() {
                for (; " " == c || "	" == c;)r()
            }

            function n(e) {
                return e >= "0" && "9" >= e || "." == e
            }

            function t(e) {
                return e >= "0" && "9" >= e
            }

            function r() {
                u++, c = f.charAt(u)
            }

            function a(e) {
                u = e, c = f.charAt(u)
            }

            function o() {
                var e, i = "";
                if (e = u, "+" == c ? r() : "-" == c && (i += c, r()), !n(c))return a(e), null;
                if ("." == c) {
                    if (i += c, r(), !t(c))return a(e), null
                } else {
                    for (; t(c);)i += c, r();
                    "." == c && (i += c, r())
                }
                for (; t(c);)i += c, r();
                if ("E" == c || "e" == c) {
                    if (i += c, r(), ("+" == c || "-" == c) && (i += c, r()), !t(c))return a(e), null;
                    for (; t(c);)i += c, r()
                }
                return i
            }

            function s() {
                var e = f.charAt(u + 1);
                if ("I" == c || "i" == c)return r(), "1";
                if (!("+" != c && "-" != c || "I" != e && "i" != e)) {
                    var n = "+" == c ? "1" : "-1";
                    return r(), r(), n
                }
                return null
            }

            var f, u, c;
            i.parse = function (n) {
                if (f = n, u = -1, c = "", !x(f))return null;
                r(), e();
                var t = o();
                if (t) {
                    if ("I" == c || "i" == c)return r(), e(), c ? null : new i(0, Number(t));
                    e();
                    var a = c;
                    if ("+" != a && "-" != a)return e(), c ? null : new i(Number(t), 0);
                    r(), e();
                    var l = o();
                    if (l) {
                        if ("I" != c && "i" != c)return null;
                        r()
                    } else if (l = s(), !l)return null;
                    return"-" == a && (l = "-" == l[0] ? "+" + l.substring(1) : "-" + l), r(), e(), c ? null : new i(Number(t), Number(l))
                }
                return(t = s()) ? (e(), c ? null : new i(0, Number(t))) : null
            }
        }(), i.prototype.clone = function () {
            return new i(this.re, this.im)
        }, i.prototype.toString = function () {
            var e = "", n = an.formatNumber(this.re, rn.options.precision), t = an.formatNumber(this.im, rn.options.precision);
            return e = 0 == this.im ? n : 0 == this.re ? 1 == this.im ? "i" : -1 == this.im ? "-i" : t + "i" : this.im > 0 ? 1 == this.im ? n + " + i" : n + " + " + t + "i" : -1 == this.im ? n + " - i" : n + " - " + an.formatNumber(Math.abs(this.im), rn.options.precision) + "i"
        }, rn.type.Matrix = a, a.prototype.get = function (e) {
            var n;
            if (e instanceof a)n = 1 == e.size().length || !e.size().some(function (e) {
                return 1 != e
            }), e = e.valueOf(); else {
                if (!(e instanceof Array))throw new TypeError("Invalid index");
                n = !e.some(function (e) {
                    var n = rn.size(e);
                    return 0 != n.length && n != [1]
                })
            }
            if (e.length != this._size.length)throw new RangeError("Dimension mismatch (" + e.length + " != " + this._size.length + ")");
            if (n)switch (e.length) {
                case 1:
                    return o(this._data, e[0]);
                case 2:
                    return o(o(this._data, e[0]), e[1]);
                default:
                    return s(this._data, e)
            } else switch (e.length) {
                case 1:
                    return new a(f(this._data, e));
                case 2:
                    return new a(u(this._data, e));
                default:
                    return new a(c(this._data, e, 0))
            }
        }, a.prototype.set = function (e, n) {
            var t;
            if (e instanceof a)t = 1 == e.size().length || !e.size().some(function (e) {
                return 1 != e
            }), e = e.valueOf(); else {
                if (!(e instanceof Array))throw new TypeError("Invalid index");
                t = !e.some(function (e) {
                    var n = rn.size(e);
                    return 0 != n.length && n != [1]
                })
            }
            if ((n instanceof a || n instanceof y) && (n = n.valueOf()), e.length < this._size.length)throw new RangeError("Dimension mismatch (" + e.length + " != " + this._size.length + ")");
            if (t) {
                if (0 != rn.size(n).length)throw new TypeError("Scalar value expected");
                switch (e.length) {
                    case 1:
                        p(this._data, this._size, e, n);
                        break;
                    case 2:
                        m(this._data, this._size, e, n);
                        break;
                    default:
                        h(this._data, this._size, e, n)
                }
            } else {
                var r = this._size.concat();
                v(this._data, r, e, 0, n), an.deepEqual(this._size, r) || (g(this._data), this.resize(r))
            }
            return this
        }, a.prototype.resize = function (e, n) {
            an.resize(this._data, e, n), this._size = rn.clone(e)
        }, a.prototype.clone = function () {
            var e = new a;
            return e._data = rn.clone(this._data), e._size = rn.clone(this._size), e
        }, a.prototype.size = function () {
            return this._size
        }, a.prototype.map = function (e) {
            var n = this, t = new a, r = [], i = function (t, a) {
                return t instanceof Array ? t.map(function (e, n) {
                    return r[a] = n + 1, i(e, a + 1)
                }) : e(t, r, n)
            };
            return t._data = i(this._data, 0), t._size = rn.clone(this._size), t
        }, a.prototype.forEach = function (e) {
            var n = this, t = [], r = function (i, a) {
                i instanceof Array ? i.forEach(function (e, n) {
                    t[a] = n + 1, r(e, a + 1)
                }) : e(i, t, n)
            };
            r(this._data, 0)
        }, a.prototype.toScalar = function () {
            for (var e = this._data; e instanceof Array && 1 == e.length;)e = e[0];
            return e instanceof Array ? null : rn.clone(e)
        }, a.prototype.isScalar = function () {
            return this._size.every(function (e) {
                return 1 >= e
            })
        }, a.prototype.toVector = function () {
            var e = 0, n = void 0, t = [];
            if (this._size.forEach(function (r, i) {
                r > 1 && (e++, n = i), t[i] = 0
            }), 0 == e) {
                var r = this.toScalar();
                return r ? [r] : []
            }
            if (1 == e) {
                var i = [], a = function (e) {
                    e instanceof Array ? e.forEach(a) : i.push(e)
                };
                return a(this._data), i
            }
            return null
        }, a.prototype.isVector = function () {
            var e = 0;
            return this._size.forEach(function (n) {
                n > 1 && e++
            }), 1 >= e
        }, a.prototype.toArray = function () {
            return rn.clone(this._data)
        }, a.prototype.valueOf = function () {
            return this._data
        }, a.prototype.toString = function () {
            return rn.format(this._data)
        }, rn.type.Range = y, y.parse = function (e) {
            if (!x(e))return null;
            var n = e.split(":"), t = n.map(function (e) {
                return Number(e)
            }), r = t.some(function (e) {
                return isNaN(e)
            });
            if (r)return null;
            switch (t.length) {
                case 2:
                    return new y(t[0], 1, t[1]);
                case 3:
                    return new y(t[0], t[1], t[2]);
                default:
                    return null
            }
        }, y.prototype.clone = function () {
            return new y(this.start, this.step, this.end)
        }, y.prototype.size = function () {
            var e = 0, n = Number(this.start), t = Number(this.step), r = Number(this.end), i = r - n;
            return rn.sign(t) == rn.sign(i) ? e = Math.floor(i / t) + 1 : 0 == i && (e = 1), isNaN(e) && (e = 0), [e]
        }, y.prototype.forEach = function (e) {
            var n = Number(this.start), t = Number(this.step), r = Number(this.end), i = 0;
            if (t > 0)for (; r >= n;)e(n, i, this), n += t, i++; else if (0 > t)for (; n >= r;)e(n, i, this), n += t, i++
        }, y.prototype.map = function (e) {
            var n = [];
            return this.forEach(function (t, r, i) {
                n[r] = e(t, r, i)
            }), n
        }, y.prototype.toMatrix = function () {
            return new a(this.toArray())
        }, y.prototype.toArray = function () {
            var e = [];
            return this.forEach(function (n, t) {
                e[t] = n
            }), e
        }, y.prototype.toVector = y.prototype.toArray, y.prototype.isVector = function () {
            return!0
        }, y.prototype.toScalar = function () {
            var e = this.toArray();
            return 1 == e.length ? e[0] : null
        }, y.prototype.isScalar = function () {
            return 1 == this.size()[0]
        }, y.prototype.valueOf = function () {
            return this.toArray()
        }, y.prototype.toString = function () {
            var e = rn.format(Number(this.start));
            return 1 != this.step && (e += ":" + rn.format(Number(this.step))), e += ":" + rn.format(Number(this.end))
        }, rn.type.Selector = function (e) {
            if (!(this instanceof rn.type.Selector))throw new SyntaxError("Selector constructor must be called with the new operator");
            this.value = e instanceof rn.type.Selector ? e.value : e || void 0
        }, rn.type.Selector.prototype = {done: function () {
            return this.value
        }, get: function (e) {
            var n = this.value;
            if (!n)throw Error("Selector value is undefined");
            return new rn.type.Selector(rn.subset(n, e))
        }, set: function (e, n) {
            var t = this.value;
            if (!t)throw Error("Selector value is undefined");
            return new rn.type.Selector(rn.subset(t, e, n))
        }, valueOf: function () {
            return this.value
        }, toString: function () {
            return rn.format(this.value)
        }}, rn.type.Unit = N, function () {
            function e() {
                for (; " " == u || "	" == u;)r()
            }

            function n(e) {
                return e >= "0" && "9" >= e || "." == e
            }

            function t(e) {
                return e >= "0" && "9" >= e
            }

            function r() {
                f++, u = s.charAt(f)
            }

            function i(e) {
                f = e, u = s.charAt(f)
            }

            function a() {
                var e, a = "";
                if (e = f, "+" == u ? r() : "-" == u && (a += u, r()), !n(u))return i(e), null;
                if ("." == u) {
                    if (a += u, r(), !t(u))return i(e), null
                } else {
                    for (; t(u);)a += u, r();
                    "." == u && (a += u, r())
                }
                for (; t(u);)a += u, r();
                if ("E" == u || "e" == u) {
                    if (a += u, r(), ("+" == u || "-" == u) && (a += u, r()), !t(u))return i(e), null;
                    for (; t(u);)a += u, r()
                }
                return a
            }

            function o() {
                var n = "";
                for (e(); u && " " != u && "	" != u;)n += u, r();
                return n || null
            }

            var s, f, u;
            N.parse = function (n) {
                if (s = n, f = -1, u = "", !x(s))return null;
                r(), e();
                var t, i = a();
                return i ? (t = o(), r(), e(), u ? null : i && t ? new N(Number(i), t) : null) : (t = o(), r(), e(), u ? null : new N(null, t))
            }
        }(), N.prototype.clone = function () {
            var e = new N;
            for (var n in this)this.hasOwnProperty(n) && (e[n] = this[n]);
            return e
        }, N.prototype._normalize = function (e) {
            return(e + this.unit.offset) * this.unit.value * this.prefix.value
        }, N.prototype._unnormalize = function (e, n) {
            return void 0 == n ? e / this.unit.value / this.prefix.value - this.unit.offset : e / this.unit.value / n - this.unit.offset
        }, N.isPlainUnit = function (e) {
            return null != O(e)
        }, N.prototype.hasBase = function (e) {
            return void 0 === this.unit.base ? void 0 === e : this.unit.base === e
        }, N.prototype.equalBase = function (e) {
            return this.unit.base === e.unit.base
        }, N.prototype.equals = function (e) {
            return this.equalBase(e) && this.value == e.value
        }, N.prototype["in"] = function (e) {
            var n;
            if (x(e)) {
                if (n = new N(null, e), !this.equalBase(n))throw Error("Units do not match");
                return n.value = this.value, n
            }
            if (e instanceof N) {
                if (!this.equalBase(e))throw Error("Units do not match");
                if (null != e.value)throw Error("Cannot convert to a unit with a value");
                if (null == e.unit)throw Error("Unit expected on the right hand side of function in");
                return n = e.clone(), n.value = this.value, n.fixPrefix = !0, n
            }
            throw Error("String or Unit expected as parameter")
        }, N.prototype.toNumber = function (e) {
            var n = this["in"](e), t = this.fixPrefix ? n._bestPrefix() : n.prefix;
            return n._unnormalize(n.value, t.value)
        }, N.prototype.toString = function () {
            var e, n;
            if (this.fixPrefix)e = this._unnormalize(this.value), n = null != this.value ? an.formatNumber(e, rn.options.precision) + " " : "", n += this.prefix.name + this.unit.name; else {
                var t = this._bestPrefix();
                e = this._unnormalize(this.value, t.value), n = null != this.value ? an.formatNumber(e, rn.options.precision) + " " : "", n += t.name + this.unit.name
            }
            return n
        }, N.prototype._bestPrefix = function () {
            var e = Math.abs(this.value / this.unit.value), n = N.PREFIX_NONE, t = Math.abs(Math.log(e / n.value) / Math.LN10 - 1.2), r = this.unit.prefixes;
            for (var i in r)if (r.hasOwnProperty(i)) {
                var a = r[i];
                if (a.scientific) {
                    var o = Math.abs(Math.log(e / a.value) / Math.LN10 - 1.2);
                    t > o && (n = a, t = o)
                }
            }
            return n
        }, N.PREFIXES = {NONE: {"": {name: "", value: 1, scientific: !0}}, SHORT: {"": {name: "", value: 1, scientific: !0}, da: {name: "da", value: 10, scientific: !1}, h: {name: "h", value: 100, scientific: !1}, k: {name: "k", value: 1e3, scientific: !0}, M: {name: "M", value: 1e6, scientific: !0}, G: {name: "G", value: 1e9, scientific: !0}, T: {name: "T", value: 1e12, scientific: !0}, P: {name: "P", value: 1e15, scientific: !0}, E: {name: "E", value: 1e18, scientific: !0}, Z: {name: "Z", value: 1e21, scientific: !0}, Y: {name: "Y", value: 1e24, scientific: !0}, d: {name: "d", value: .1, scientific: !1}, c: {name: "c", value: .01, scientific: !1}, m: {name: "m", value: .001, scientific: !0}, u: {name: "u", value: 1e-6, scientific: !0}, n: {name: "n", value: 1e-9, scientific: !0}, p: {name: "p", value: 1e-12, scientific: !0}, f: {name: "f", value: 1e-15, scientific: !0}, a: {name: "a", value: 1e-18, scientific: !0}, z: {name: "z", value: 1e-21, scientific: !0}, y: {name: "y", value: 1e-24, scientific: !0}}, LONG: {"": {name: "", value: 1, scientific: !0}, deca: {name: "deca", value: 10, scientific: !1}, hecto: {name: "hecto", value: 100, scientific: !1}, kilo: {name: "kilo", value: 1e3, scientific: !0}, mega: {name: "mega", value: 1e6, scientific: !0}, giga: {name: "giga", value: 1e9, scientific: !0}, tera: {name: "tera", value: 1e12, scientific: !0}, peta: {name: "peta", value: 1e15, scientific: !0}, exa: {name: "exa", value: 1e18, scientific: !0}, zetta: {name: "zetta", value: 1e21, scientific: !0}, yotta: {name: "yotta", value: 1e24, scientific: !0}, deci: {name: "deci", value: .1, scientific: !1}, centi: {name: "centi", value: .01, scientific: !1}, milli: {name: "milli", value: .001, scientific: !0}, micro: {name: "micro", value: 1e-6, scientific: !0}, nano: {name: "nano", value: 1e-9, scientific: !0}, pico: {name: "pico", value: 1e-12, scientific: !0}, femto: {name: "femto", value: 1e-15, scientific: !0}, atto: {name: "atto", value: 1e-18, scientific: !0}, zepto: {name: "zepto", value: 1e-21, scientific: !0}, yocto: {name: "yocto", value: 1e-24, scientific: !0}}, BINARY_SHORT: {"": {name: "", value: 1, scientific: !0}, k: {name: "k", value: 1024, scientific: !0}, M: {name: "M", value: Math.pow(1024, 2), scientific: !0}, G: {name: "G", value: Math.pow(1024, 3), scientific: !0}, T: {name: "T", value: Math.pow(1024, 4), scientific: !0}, P: {name: "P", value: Math.pow(1024, 5), scientific: !0}, E: {name: "E", value: Math.pow(1024, 6), scientific: !0}, Z: {name: "Z", value: Math.pow(1024, 7), scientific: !0}, Y: {name: "Y", value: Math.pow(1024, 8), scientific: !0}, Ki: {name: "Ki", value: 1024, scientific: !0}, Mi: {name: "Mi", value: Math.pow(1024, 2), scientific: !0}, Gi: {name: "Gi", value: Math.pow(1024, 3), scientific: !0}, Ti: {name: "Ti", value: Math.pow(1024, 4), scientific: !0}, Pi: {name: "Pi", value: Math.pow(1024, 5), scientific: !0}, Ei: {name: "Ei", value: Math.pow(1024, 6), scientific: !0}, Zi: {name: "Zi", value: Math.pow(1024, 7), scientific: !0}, Yi: {name: "Yi", value: Math.pow(1024, 8), scientific: !0}}, BINARY_LONG: {"": {name: "", value: 1, scientific: !0}, kilo: {name: "kilo", value: 1024, scientific: !0}, mega: {name: "mega", value: Math.pow(1024, 2), scientific: !0}, giga: {name: "giga", value: Math.pow(1024, 3), scientific: !0}, tera: {name: "tera", value: Math.pow(1024, 4), scientific: !0}, peta: {name: "peta", value: Math.pow(1024, 5), scientific: !0}, exa: {name: "exa", value: Math.pow(1024, 6), scientific: !0}, zetta: {name: "zetta", value: Math.pow(1024, 7), scientific: !0}, yotta: {name: "yotta", value: Math.pow(1024, 8), scientific: !0}, kibi: {name: "kibi", value: 1024, scientific: !0}, mebi: {name: "mebi", value: Math.pow(1024, 2), scientific: !0}, gibi: {name: "gibi", value: Math.pow(1024, 3), scientific: !0}, tebi: {name: "tebi", value: Math.pow(1024, 4), scientific: !0}, pebi: {name: "pebi", value: Math.pow(1024, 5), scientific: !0}, exi: {name: "exi", value: Math.pow(1024, 6), scientific: !0}, zebi: {name: "zebi", value: Math.pow(1024, 7), scientific: !0}, yobi: {name: "yobi", value: Math.pow(1024, 8), scientific: !0}}}, N.PREFIX_NONE = {name: "", value: 1, scientific: !0}, N.BASE_UNITS = {NONE: {}, LENGTH: {}, MASS: {}, TIME: {}, CURRENT: {}, TEMPERATURE: {}, LUMINOUS_INTENSITY: {}, AMOUNT_OF_SUBSTANCE: {}, FORCE: {}, SURFACE: {}, VOLUME: {}, ANGLE: {}, BIT: {}};
        var on = N.BASE_UNITS, sn = N.PREFIXES;
        N.BASE_UNIT_NONE = {}, N.UNIT_NONE = {name: "", base: N.BASE_UNIT_NONE, value: 1, offset: 0}, N.UNITS = [
            {name: "meter", base: on.LENGTH, prefixes: sn.LONG, value: 1, offset: 0},
            {name: "inch", base: on.LENGTH, prefixes: sn.NONE, value: .0254, offset: 0},
            {name: "foot", base: on.LENGTH, prefixes: sn.NONE, value: .3048, offset: 0},
            {name: "yard", base: on.LENGTH, prefixes: sn.NONE, value: .9144, offset: 0},
            {name: "mile", base: on.LENGTH, prefixes: sn.NONE, value: 1609.344, offset: 0},
            {name: "link", base: on.LENGTH, prefixes: sn.NONE, value: .201168, offset: 0},
            {name: "rod", base: on.LENGTH, prefixes: sn.NONE, value: 5.02921, offset: 0},
            {name: "chain", base: on.LENGTH, prefixes: sn.NONE, value: 20.1168, offset: 0},
            {name: "angstrom", base: on.LENGTH, prefixes: sn.NONE, value: 1e-10, offset: 0},
            {name: "m", base: on.LENGTH, prefixes: sn.SHORT, value: 1, offset: 0},
            {name: "ft", base: on.LENGTH, prefixes: sn.NONE, value: .3048, offset: 0},
            {name: "yd", base: on.LENGTH, prefixes: sn.NONE, value: .9144, offset: 0},
            {name: "mi", base: on.LENGTH, prefixes: sn.NONE, value: 1609.344, offset: 0},
            {name: "li", base: on.LENGTH, prefixes: sn.NONE, value: .201168, offset: 0},
            {name: "rd", base: on.LENGTH, prefixes: sn.NONE, value: 5.02921, offset: 0},
            {name: "ch", base: on.LENGTH, prefixes: sn.NONE, value: 20.1168, offset: 0},
            {name: "mil", base: on.LENGTH, prefixes: sn.NONE, value: 254e-7, offset: 0},
            {name: "m2", base: on.SURFACE, prefixes: sn.SHORT, value: 1, offset: 0},
            {name: "sqin", base: on.SURFACE, prefixes: sn.NONE, value: 64516e-8, offset: 0},
            {name: "sqft", base: on.SURFACE, prefixes: sn.NONE, value: .09290304, offset: 0},
            {name: "sqyd", base: on.SURFACE, prefixes: sn.NONE, value: .83612736, offset: 0},
            {name: "sqmi", base: on.SURFACE, prefixes: sn.NONE, value: 2589988.110336, offset: 0},
            {name: "sqrd", base: on.SURFACE, prefixes: sn.NONE, value: 25.29295, offset: 0},
            {name: "sqch", base: on.SURFACE, prefixes: sn.NONE, value: 404.6873, offset: 0},
            {name: "sqmil", base: on.SURFACE, prefixes: sn.NONE, value: 6.4516e-10, offset: 0},
            {name: "m3", base: on.VOLUME, prefixes: sn.SHORT, value: 1, offset: 0},
            {name: "L", base: on.VOLUME, prefixes: sn.SHORT, value: .001, offset: 0},
            {name: "litre", base: on.VOLUME, prefixes: sn.LONG, value: .001, offset: 0},
            {name: "cuin", base: on.VOLUME, prefixes: sn.NONE, value: 16387064e-12, offset: 0},
            {name: "cuft", base: on.VOLUME, prefixes: sn.NONE, value: .028316846592, offset: 0},
            {name: "cuyd", base: on.VOLUME, prefixes: sn.NONE, value: .764554857984, offset: 0},
            {name: "teaspoon", base: on.VOLUME, prefixes: sn.NONE, value: 5e-6, offset: 0},
            {name: "tablespoon", base: on.VOLUME, prefixes: sn.NONE, value: 15e-6, offset: 0},
            {name: "minim", base: on.VOLUME, prefixes: sn.NONE, value: 6.161152e-8, offset: 0},
            {name: "fluiddram", base: on.VOLUME, prefixes: sn.NONE, value: 36966911e-13, offset: 0},
            {name: "fluidounce", base: on.VOLUME, prefixes: sn.NONE, value: 2957353e-11, offset: 0},
            {name: "gill", base: on.VOLUME, prefixes: sn.NONE, value: .0001182941, offset: 0},
            {name: "cup", base: on.VOLUME, prefixes: sn.NONE, value: .0002365882, offset: 0},
            {name: "pint", base: on.VOLUME, prefixes: sn.NONE, value: .0004731765, offset: 0},
            {name: "quart", base: on.VOLUME, prefixes: sn.NONE, value: .0009463529, offset: 0},
            {name: "gallon", base: on.VOLUME, prefixes: sn.NONE, value: .003785412, offset: 0},
            {name: "beerbarrel", base: on.VOLUME, prefixes: sn.NONE, value: .1173478, offset: 0},
            {name: "oilbarrel", base: on.VOLUME, prefixes: sn.NONE, value: .1589873, offset: 0},
            {name: "hogshead", base: on.VOLUME, prefixes: sn.NONE, value: .238481, offset: 0},
            {name: "fldr", base: on.VOLUME, prefixes: sn.NONE, value: 36966911e-13, offset: 0},
            {name: "floz", base: on.VOLUME, prefixes: sn.NONE, value: 2957353e-11, offset: 0},
            {name: "gi", base: on.VOLUME, prefixes: sn.NONE, value: .0001182941, offset: 0},
            {name: "cp", base: on.VOLUME, prefixes: sn.NONE, value: .0002365882, offset: 0},
            {name: "pt", base: on.VOLUME, prefixes: sn.NONE, value: .0004731765, offset: 0},
            {name: "qt", base: on.VOLUME, prefixes: sn.NONE, value: .0009463529, offset: 0},
            {name: "gal", base: on.VOLUME, prefixes: sn.NONE, value: .003785412, offset: 0},
            {name: "bbl", base: on.VOLUME, prefixes: sn.NONE, value: .1173478, offset: 0},
            {name: "obl", base: on.VOLUME, prefixes: sn.NONE, value: .1589873, offset: 0},
            {name: "g", base: on.MASS, prefixes: sn.SHORT, value: .001, offset: 0},
            {name: "gram", base: on.MASS, prefixes: sn.LONG, value: .001, offset: 0},
            {name: "ton", base: on.MASS, prefixes: sn.SHORT, value: 907.18474, offset: 0},
            {name: "tonne", base: on.MASS, prefixes: sn.SHORT, value: 1e3, offset: 0},
            {name: "grain", base: on.MASS, prefixes: sn.NONE, value: 6479891e-11, offset: 0},
            {name: "dram", base: on.MASS, prefixes: sn.NONE, value: .0017718451953125, offset: 0},
            {name: "ounce", base: on.MASS, prefixes: sn.NONE, value: .028349523125, offset: 0},
            {name: "poundmass", base: on.MASS, prefixes: sn.NONE, value: .45359237, offset: 0},
            {name: "hundredweight", base: on.MASS, prefixes: sn.NONE, value: 45.359237, offset: 0},
            {name: "stick", base: on.MASS, prefixes: sn.NONE, value: .115, offset: 0},
            {name: "gr", base: on.MASS, prefixes: sn.NONE, value: 6479891e-11, offset: 0},
            {name: "dr", base: on.MASS, prefixes: sn.NONE, value: .0017718451953125, offset: 0},
            {name: "oz", base: on.MASS, prefixes: sn.NONE, value: .028349523125, offset: 0},
            {name: "lbm", base: on.MASS, prefixes: sn.NONE, value: .45359237, offset: 0},
            {name: "cwt", base: on.MASS, prefixes: sn.NONE, value: 45.359237, offset: 0},
            {name: "s", base: on.TIME, prefixes: sn.SHORT, value: 1, offset: 0},
            {name: "min", base: on.TIME, prefixes: sn.NONE, value: 60, offset: 0},
            {name: "h", base: on.TIME, prefixes: sn.NONE, value: 3600, offset: 0},
            {name: "seconds", base: on.TIME, prefixes: sn.LONG, value: 1, offset: 0},
            {name: "second", base: on.TIME, prefixes: sn.LONG, value: 1, offset: 0},
            {name: "sec", base: on.TIME, prefixes: sn.LONG, value: 1, offset: 0},
            {name: "minutes", base: on.TIME, prefixes: sn.NONE, value: 60, offset: 0},
            {name: "minute", base: on.TIME, prefixes: sn.NONE, value: 60, offset: 0},
            {name: "hours", base: on.TIME, prefixes: sn.NONE, value: 3600, offset: 0},
            {name: "hour", base: on.TIME, prefixes: sn.NONE, value: 3600, offset: 0},
            {name: "day", base: on.TIME, prefixes: sn.NONE, value: 86400, offset: 0},
            {name: "days", base: on.TIME, prefixes: sn.NONE, value: 86400, offset: 0},
            {name: "rad", base: on.ANGLE, prefixes: sn.NONE, value: 1, offset: 0},
            {name: "deg", base: on.ANGLE, prefixes: sn.NONE, value: .017453292519943295, offset: 0},
            {name: "grad", base: on.ANGLE, prefixes: sn.NONE, value: .015707963267948967, offset: 0},
            {name: "cycle", base: on.ANGLE, prefixes: sn.NONE, value: 6.283185307179586, offset: 0},
            {name: "A", base: on.CURRENT, prefixes: sn.SHORT, value: 1, offset: 0},
            {name: "ampere", base: on.CURRENT, prefixes: sn.LONG, value: 1, offset: 0},
            {name: "K", base: on.TEMPERATURE, prefixes: sn.NONE, value: 1, offset: 0},
            {name: "degC", base: on.TEMPERATURE, prefixes: sn.NONE, value: 1, offset: 273.15},
            {name: "degF", base: on.TEMPERATURE, prefixes: sn.NONE, value: 1 / 1.8, offset: 459.67},
            {name: "degR", base: on.TEMPERATURE, prefixes: sn.NONE, value: 1 / 1.8, offset: 0},
            {name: "kelvin", base: on.TEMPERATURE, prefixes: sn.NONE, value: 1, offset: 0},
            {name: "celsius", base: on.TEMPERATURE, prefixes: sn.NONE, value: 1, offset: 273.15},
            {name: "fahrenheit", base: on.TEMPERATURE, prefixes: sn.NONE, value: 1 / 1.8, offset: 459.67},
            {name: "rankine", base: on.TEMPERATURE, prefixes: sn.NONE, value: 1 / 1.8, offset: 0},
            {name: "mol", base: on.AMOUNT_OF_SUBSTANCE, prefixes: sn.NONE, value: 1, offset: 0},
            {name: "mole", base: on.AMOUNT_OF_SUBSTANCE, prefixes: sn.NONE, value: 1, offset: 0},
            {name: "cd", base: on.LUMINOUS_INTENSITY, prefixes: sn.NONE, value: 1, offset: 0},
            {name: "candela", base: on.LUMINOUS_INTENSITY, prefixes: sn.NONE, value: 1, offset: 0},
            {name: "N", base: on.FORCE, prefixes: sn.SHORT, value: 1, offset: 0},
            {name: "newton", base: on.FORCE, prefixes: sn.LONG, value: 1, offset: 0},
            {name: "lbf", base: on.FORCE, prefixes: sn.NONE, value: 4.4482216152605, offset: 0},
            {name: "poundforce", base: on.FORCE, prefixes: sn.NONE, value: 4.4482216152605, offset: 0},
            {name: "b", base: on.BIT, prefixes: sn.BINARY_SHORT, value: 1, offset: 0},
            {name: "bits", base: on.BIT, prefixes: sn.BINARY_LONG, value: 1, offset: 0},
            {name: "B", base: on.BIT, prefixes: sn.BINARY_SHORT, value: 8, offset: 0},
            {name: "bytes", base: on.BIT, prefixes: sn.BINARY_LONG, value: 8, offset: 0}
        ], rn.E = Math.E, rn.LN2 = Math.LN2, rn.LN10 = Math.LN10, rn.LOG2E = Math.LOG2E, rn.LOG10E = Math.LOG10E, rn.PI = Math.PI, rn.SQRT1_2 = Math.SQRT1_2, rn.SQRT2 = Math.SQRT2, rn.I = new i(0, 1), rn.pi = rn.PI, rn.e = rn.E, rn.i = rn.I, rn.expr.node.Node = A, A.prototype.eval = function () {
            throw Error("Cannot evaluate a Node interface")
        }, A.prototype.find = function (e) {
            return this.match(e) ? [this] : []
        }, A.prototype.match = function (e) {
            var n = !0;
            if (e && (!e.type || this instanceof e.type || (n = !1), n && e.properties))for (var t in e.properties)if (e.properties.hasOwnProperty(t) && this[t] != e.properties[t]) {
                n = !1;
                break
            }
            return n
        }, A.prototype.toString = function () {
            return""
        }, S.prototype = new A, rn.expr.node.ConstantNode = S, S.prototype.eval = function () {
            return this.value
        }, S.prototype.toString = function () {
            return rn.format(this.value || null)
        }, T.prototype = new A, rn.expr.node.OperatorNode = T, T.prototype.eval = function () {
            return this.fn.apply(this, this.params.map(function (e) {
                return e.eval()
            }))
        }, T.prototype.find = function (e) {
            var n = [];
            this.match(e) && n.push(this);
            var t = this.params;
            if (t)for (var r = 0, i = t.length; i > r; r++)n = n.concat(t[r].find(e));
            return n
        }, T.prototype.toString = function () {
            var e = this.params;
            if (this.fn === rn.unaryminus)return"-" + ("" + e[0]);
            switch (e.length) {
                case 1:
                    return"" + e[0] + this.name;
                case 2:
                    var n = "" + e[0];
                    e[0]instanceof T && (n = "(" + n + ")");
                    var t = "" + e[1];
                    return e[1]instanceof T && (t = "(" + t + ")"), n + " " + this.name + " " + t;
                default:
                    return this.name + "(" + this.params.join(", ") + ")"
            }
        }, U.prototype = new A, rn.expr.node.SymbolNode = U, U.prototype.eval = function () {
            var e = this.scope.get(this.name);
            if (void 0 === e)throw Error("Undefined symbol " + this.name);
            return e
        }, U.prototype.toString = function () {
            return this.name
        }, R.prototype = new A, rn.expr.node.ParamsNode = R, R.prototype.eval = function () {
            var e, n, t = this.object;
            if (void 0 == t)throw Error("Node undefined");
            var r = t.eval();
            if (this.hasContextParams) {
                var i, a = this.paramScopes;
                if (i = r.size ? r.size() : void 0 !== r.length ? [r.length] : [], a && i)for (e = 0, n = this.params.length; n > e; e++) {
                    var o = a[e];
                    o && o.set("end", i[e])
                }
            }
            var s = this.params, f = [];
            for (e = 0, n = this.params.length; n > e; e++)f[e] = s[e].eval();
            return"function" == typeof r ? r.apply(this, f) : rn.subset(r, f)
        }, R.prototype.find = function (e) {
            var n = [];
            this.match(e) && n.push(this), this.object && (n = n.concat(this.object.find(e)));
            var t = this.params;
            if (t)for (var r = 0, i = t.length; i > r; r++)n = n.concat(t[r].find(e));
            return n
        }, R.prototype.toString = function () {
            var e = this.object ? "" + this.object : "";
            return this.params && (e += "(" + this.params.join(", ") + ")"), e
        }, z.prototype = new A, rn.expr.node.MatrixNode = z, function () {
            function e(e) {
                for (var n = [], t = e.length, r = 0; t > r; r++) {
                    for (var i = e[r], o = i.length, s = null, f = null, u = 0; o > u; u++) {
                        var c, l = rn.clone(i[u]);
                        if (l instanceof a) {
                            if (c = l.size(), l = l.valueOf(), 1 == c.length)l = [l], c = [1, c[0]]; else if (c.length > 2)throw Error("Cannot merge a multi dimensional matrix")
                        } else l instanceof y ? (l = [l.valueOf()], c = [1, l[0].length]) : l instanceof Array ? (c = [1, l.length], l = [l]) : (c = [1, 1], l = [
                            [l]
                        ]);
                        if (null == s)s = l, f = c[0]; else {
                            if (c[0] != f)throw Error("Dimension mismatch (" + c[0] + " != " + f + ")");
                            for (var h = 0; f > h; h++)s[h] = s[h].concat(l[h])
                        }
                    }
                    n = n.concat(s)
                }
                return n
            }

            z.prototype.eval = function () {
                for (var n = this.nodes, t = [], r = !1, i = 0, o = n.length; o > i; i++) {
                    for (var s = n[i], f = [], u = 0, c = s.length; c > u; u++) {
                        var l = s[u].eval();
                        (l instanceof a || l instanceof y || l instanceof Array) && (r = !0), f[u] = l
                    }
                    t[i] = f
                }
                return r && (t = e(t)), new a(t)
            }, z.prototype.find = function (e) {
                var n = [];
                this.match(e) && n.push(this);
                for (var t = this.nodes, r = 0, i = t.length; i > r; r++)for (var a = t[r], o = 0, s = a.length; s > o; o++)n = n.concat(a[o].find(e));
                return n
            }, z.prototype.toString = function () {
                return an.formatArray(this.nodes)
            }
        }(), L.prototype = new A, rn.expr.node.BlockNode = L, L.prototype.add = function (e, n) {
            var t = this.params.length;
            this.params[t] = e, this.visible[t] = void 0 != n ? n : !0
        }, L.prototype.eval = function () {
            for (var e = [], n = 0, t = this.params.length; t > n; n++) {
                var r = this.params[n].eval();
                this.visible[n] && e.push(r)
            }
            return e
        }, L.prototype.find = function (e) {
            var n = [];
            this.match(e) && n.push(this);
            var t = this.params;
            if (t)for (var r = 0, i = t.length; i > r; r++)n = n.concat(t[r].find(e));
            return n
        }, L.prototype.toString = function () {
            for (var e = [], n = 0, t = this.params.length; t > n; n++)this.visible[n] && e.push("\n  " + ("" + this.params[n]));
            return"[" + e.join(",") + "\n]"
        }, _.prototype = new A, rn.expr.node.AssignmentNode = _, _.prototype.eval = function () {
            if (void 0 === this.expr)throw Error("Undefined symbol " + this.name);
            var e = this.expr.eval();
            return this.scope.set(this.name, e), e
        }, _.prototype.find = function (e) {
            var n = [];
            return this.match(e) && n.push(this), this.expr && (n = n.concat(this.expr.find(e))), n
        }, _.prototype.toString = function () {
            return this.name + " = " + ("" + this.expr)
        }, I.prototype = new A, rn.expr.node.UpdateNode = I, I.prototype.eval = function () {
            if (void 0 === this.expr)throw Error("Undefined symbol " + this.name);
            var e;
            this.params;
            var n = this.scope.get(this.name);
            if (void 0 == n)throw Error("Undefined symbol " + this.name);
            if (this.hasContextParams) {
                var t, r = this.paramScopes;
                if (t = n.size ? n.size() : void 0 !== n.length ? [n.length] : [], r && t)for (var i = 0, a = this.params.length; a > i; i++) {
                    var o = r[i];
                    o && o.set("end", t[i])
                }
            }
            var s = [];
            this.params.forEach(function (e) {
                s.push(e.eval())
            });
            var f = this.expr.eval();
            return e = rn.subset(n, s, f), this.scope.set(this.name, e), e
        }, I.prototype.find = function (e) {
            var n = [];
            this.match(e) && n.push(this);
            var t = this.params;
            if (t)for (var r = 0, i = t.length; i > r; r++)n = n.concat(t[r].find(e));
            return this.expr && (n = n.concat(this.expr.find(e))), n
        }, I.prototype.toString = function () {
            var e = "";
            return e += this.name, this.params && this.params.length && (e += "(" + this.params.join(", ") + ")"), e += " = ", e += "" + this.expr
        }, q.prototype = new A, rn.expr.node.FunctionNode = q, q.prototype.eval = function () {
            return this.scope.set(this.name, this.fn), this.fn
        }, q.prototype.find = function (e) {
            var n = [];
            return this.match(e) && n.push(this), this.expr && (n = n.concat(this.expr.find(e))), n
        }, q.prototype.toString = function () {
            return"" + this.fn
        }, rn.expr.Scope = function () {
            if (this.parentScope = null, this.subScopes = null, this.symbols = {}, this.cache = {}, arguments.length > 0) {
                var e = arguments[0];
                e instanceof rn.expr.Scope ? this.parentScope = e : e instanceof Object && (this.symbols = e)
            }
            if (arguments.length > 1) {
                var n = arguments[1];
                n instanceof Object && (this.symbols = n)
            }
        }, rn.expr.Scope.prototype = {createSubScope: function () {
            var e = new rn.expr.Scope(this);
            return this.subScopes || (this.subScopes = []), this.subScopes.push(e), e
        }, get: function (e) {
            var n;
            if (n = this.symbols[e], void 0 !== n)return n;
            var t = this.cache[e];
            if (t)return t[e];
            for (var r = this.parentScope; r;) {
                if (n = r.symbols[e], void 0 !== n)return this.cache[e] = r.symbols, n;
                r = r.parentScope
            }
            return n = rn[e], void 0 !== n ? (this.cache[e] = rn, n) : N.isPlainUnit(e) ? (n = new N(null, e), this.cache[e] = {}, this.cache[e][e] = n, n) : void 0
        }, has: function (e) {
            return void 0 !== this.symbols[e]
        }, set: function (e, n) {
            return this.symbols[e] = n
        }, remove: function (e) {
            delete this.symbols[e]
        }, clear: function () {
            var e = this.symbols;
            for (var n in e)e.hasOwnProperty(n) && delete e[n];
            if (this.subScopes)for (var t = this.subScopes, r = 0, i = t.length; i > r; r++)t[r].clear();
            this.clearCache()
        }, clearCache: function () {
            this.cache = {}
        }}, rn.expr.Parser = function () {
            if (!(this instanceof rn.expr.Parser))throw new SyntaxError("Parser constructor must be called with the new operator");
            this.scope = new rn.expr.Scope
        }, rn.expr.Parser.prototype.parse = function (e) {
            return rn.parse(e, this.scope)
        }, rn.expr.Parser.prototype.eval = function (e) {
            var n = rn.parse(e, this.scope);
            return n.eval()
        }, rn.expr.Parser.prototype.get = function (e) {
            return this.scope.get(e)
        }, rn.expr.Parser.prototype.set = function (e, n) {
            this.scope.set(e, n)
        }, rn.expr.Parser.prototype.remove = function (e) {
            this.scope.remove(e)
        }, rn.expr.Parser.prototype.clear = function () {
            this.scope.clear()
        }, rn.expr.Expression = function (e) {
            this.id = e.id, this.scope = e.scope, this.nextNode = e.nextNode, this.previousNode = e.previousNode, this.updateSeq = 0, this.node = void 0, this.symbols = {}, this.assignments = {}, this.updates = {}, this.result = void 0, this.setExpr(e.expression)
        }, rn.expr.Expression.prototype.setExpr = function (e) {
            this.expression = e || "", this.scope.clear(), this._parse(), this._analyse()
        }, rn.expr.Expression.prototype.getExpr = function () {
            return this.expression
        }, rn.expr.Expression.prototype.getResult = function () {
            return this.result
        }, rn.expr.Expression.prototype._parse = function () {
            try {
                this.node = rn.parse(this.expression, this.scope)
            } catch (e) {
                var n = "Error: " + ((e.message || e) + "");
                this.node = new S(n)
            }
        }, rn.expr.Expression.prototype._analyse = function () {
            var e, n, t;
            if (this.node) {
                var r = this.node.find({type: rn.expr.node.SymbolNode});
                for (this.symbols = {}, e = 0, n = r.length; n > e; e++)t = r[e], this.symbols[t.name] = t;
                var i = this.node.find({type: rn.expr.node.AssignmentNode});
                for (this.assignments = {}, e = 0, n = i.length; n > e; e++)t = i[e], this.assignments[t.name] = t;
                var a = this.node.find({type: rn.expr.node.UpdateNode});
                for (this.updates = {}, e = 0, n = a.length; n > e; e++)t = a[e], this.updates[t.name] = t
            }
        }, rn.expr.Expression.prototype.eval = function () {
            try {
                this.scope.clear(), this.result = this.node.eval()
            } catch (e) {
                this.scope.clear(), this.result = "Error: " + ((e.message || e) + "")
            }
            return this.result
        }, rn.expr.Workspace = P, P.prototype.clear = function () {
            this.nodes = {}, this.firstNode = void 0, this.lastNode = void 0
        }, P.prototype.append = function (e) {
            var n = this._getNewId(), t = this.lastNode ? this.lastNode.scope : this.scope, r = new rn.expr.Scope(t), i = new rn.expr.Expression({id: n, expression: e, scope: r, nextNode: void 0, previousNode: this.lastNode});
            return this.nodes[n] = i, this.firstNode || (this.firstNode = i), this.lastNode && (this.lastNode.nextNode = i), this.lastNode = i, this._update([n]), n
        }, P.prototype.insertBefore = function (e, n) {
            var t = this.nodes[n];
            if (!t)throw new RangeError('Node with id "' + n + '" not found');
            var r = t.previousNode, i = this._getNewId(), a = r ? r.scope : this.scope, o = new rn.expr.Scope(a), s = new rn.expr.Expression({id: i, expression: e, scope: o, nextNode: t, previousNode: r});
            this.nodes[i] = s, r ? r.nextNode = s : this.firstNode = s, t.previousNode = s, t.scope.parentScope = s.scope;
            var f = this.getDependencies(i);
            return-1 == f.indexOf(i) && f.unshift(i), this._update(f), i
        }, P.prototype.insertAfter = function (e, n) {
            var t = this.nodes[n];
            if (!t)throw new RangeError('Node with id "' + n + '" not found');
            var r = t.nextNode;
            return r ? this.insertBefore(e, r.id) : this.append(e)
        }, P.prototype.remove = function (e) {
            var n = this.nodes[e];
            if (!n)throw new RangeError('Node with id "' + e + '" not found');
            var t = this.getDependencies(e), r = n.previousNode, i = n.nextNode;
            r ? r.nextNode = i : this.firstNode = i, i ? i.previousNode = r : this.lastNode = r;
            var a = r ? r.scope : this.scope;
            i && (i.scope.parentScope = a), delete this.nodes[e], this._update(t)
        }, P.prototype.replace = function (e, n) {
            var t = this.nodes[n];
            if (!t)throw new RangeError('Node with id "' + n + '" not found');
            var r = [n];
            P._merge(r, this.getDependencies(n)), t.setExpr(e), P._merge(r, this.getDependencies(n)), this._update(r)
        }, P._merge = function (e, n) {
            for (var t = 0, r = n.length; r > t; t++) {
                var i = n[t];
                -1 == e.indexOf(i) && e.push(i)
            }
        }, P.prototype.getDependencies = function (e) {
            var n, t = this.nodes[e], r = [], i = {};
            if (!t)throw new RangeError('Node with id "' + e + '" not found');
            var a = function (e, n) {
                var t, r = e.assignments, a = e.updates;
                for (t in r)r.hasOwnProperty(t) && (i[t] = n);
                for (t in a)a.hasOwnProperty(t) && (i[t] = n)
            };
            for (a(t, !0), t = t.nextNode; t;) {
                var o = t.symbols, s = !1;
                for (n in o)if (o.hasOwnProperty(n) && 1 == i[n]) {
                    s = !0;
                    break
                }
                s ? (a(t, !0), r.push(t.id)) : a(t, !1), t = t.nextNode
            }
            return r
        }, P.prototype.getExpr = function (e) {
            var n = this.nodes[e];
            if (!n)throw new RangeError('Node with id "' + e + '" not found');
            return n.getExpr()
        }, P.prototype.getResult = function (e) {
            var n = this.nodes[e];
            if (!n)throw new RangeError('Node with id "' + e + '" not found');
            return n.getResult()
        }, P.prototype._update = function (e) {
            this.updateSeq++;
            for (var n = this.updateSeq, t = this.nodes, r = 0, i = e.length; i > r; r++) {
                var a = e[r], o = t[a];
                o && (o.eval(), o.updateSeq = n)
            }
        }, P.prototype.getChanges = function (e) {
            var n = [], t = this.firstNode;
            for (e = e || 0; t;)t.updateSeq > e && n.push(t.id), t = t.nextNode;
            return{ids: n, updateSeq: this.updateSeq}
        }, P.prototype._getNewId = function () {
            return this.idMax++, this.idMax
        }, P.prototype.toString = function () {
            return JSON.stringify(this.toJSON())
        }, P.prototype.toJSON = function () {
            for (var e = [], n = this.firstNode; n;) {
                var t = {id: n.id, expression: n.expression, dependencies: this.getDependencies(n.id)};
                try {
                    t.result = n.getResult()
                } catch (r) {
                    t.result = "Error: " + ((r.message || r) + "")
                }
                e.push(t), n = n.nextNode
            }
            return e
        }, rn.abs = function (e) {
            if (1 != arguments.length)throw M("abs", arguments.length, 1);
            if (w(e))return Math.abs(e);
            if (e instanceof i)return Math.sqrt(e.re * e.re + e.im * e.im);
            if (e instanceof Array || e instanceof a)return an.map(e, rn.abs);
            if (e.valueOf() !== e)return rn.abs(e.valueOf());
            throw b("abs", e)
        }, rn.add = function (e, n) {
            if (2 != arguments.length)throw M("add", arguments.length, 2);
            if (w(e)) {
                if (w(n))return e + n;
                if (n instanceof i)return new i(e + n.re, n.im)
            } else if (e instanceof i) {
                if (w(n))return new i(e.re + n, e.im);
                if (n instanceof i)return new i(e.re + n.re, e.im + n.im)
            } else if (e instanceof N && n instanceof N) {
                if (!e.equalBase(n))throw Error("Units do not match");
                if (null == e.value)throw Error("Unit on left hand side of operator + has an undefined value");
                if (null == n.value)throw Error("Unit on right hand side of operator + has an undefined value");
                var t = e.clone();
                return t.value += n.value, t.fixPrefix = !1, t
            }
            if (x(e) || x(n))return e + n;
            if (e instanceof Array || e instanceof a || n instanceof Array || n instanceof a)return an.map2(e, n, rn.add);
            if (e.valueOf() !== e || n.valueOf() !== n)return rn.add(e.valueOf(), n.valueOf());
            throw b("add", e, n)
        }, rn.ceil = function (e) {
            if (1 != arguments.length)throw M("ceil", arguments.length, 1);
            if (w(e))return Math.ceil(e);
            if (e instanceof i)return new i(Math.ceil(e.re), Math.ceil(e.im));
            if (e instanceof Array || e instanceof a)return an.map(e, rn.ceil);
            if (e.valueOf() !== e)return rn.ceil(e.valueOf());
            throw b("ceil", e)
        }, rn.cube = function (e) {
            if (1 != arguments.length)throw M("cube", arguments.length, 1);
            if (w(e))return e * e * e;
            if (e instanceof i)return rn.multiply(rn.multiply(e, e), e);
            if (e instanceof Array || e instanceof a)return an.map(e, rn.cube);
            if (e.valueOf() !== e)return rn.cube(e.valueOf());
            throw b("cube", e)
        }, rn.divide = function (e, n) {
            if (2 != arguments.length)throw M("divide", arguments.length, 2);
            if (w(e)) {
                if (w(n))return e / n;
                if (n instanceof i)return B(new i(e, 0), n)
            }
            if (e instanceof i) {
                if (w(n))return B(e, new i(n, 0));
                if (n instanceof i)return B(e, n)
            }
            if (e instanceof N && w(n)) {
                var t = e.clone();
                return t.value /= n, t
            }
            if (e instanceof Array || e instanceof a)return n instanceof Array || n instanceof a ? rn.multiply(e, rn.inv(n)) : an.map2(e, n, rn.divide);
            if (n instanceof Array || n instanceof a)return rn.multiply(e, rn.inv(n));
            if (e.valueOf() !== e || n.valueOf() !== n)return rn.divide(e.valueOf(), n.valueOf());
            throw b("divide", e, n)
        }, rn.equal = function fn(e, n) {
            if (2 != arguments.length)throw M("equal", arguments.length, 2);
            if (w(e)) {
                if (w(n))return e == n;
                if (n instanceof i)return e == n.re && 0 == n.im
            }
            if (e instanceof i) {
                if (w(n))return e.re == n && 0 == e.im;
                if (n instanceof i)return e.re == n.re && e.im == n.im
            }
            if (e instanceof N && n instanceof N) {
                if (!e.equalBase(n))throw Error("Cannot compare units with different base");
                return e.value == n.value
            }
            if (x(e) || x(n))return e == n;
            if (e instanceof Array || e instanceof a || n instanceof Array || n instanceof a)return an.map2(e, n, rn.equal);
            if (e.valueOf() !== e || n.valueOf() !== n)return fn(e.valueOf(), n.valueOf());
            throw b("equal", e, n)
        }, rn.exp = function (e) {
            if (1 != arguments.length)throw M("exp", arguments.length, 1);
            if (w(e))return Math.exp(e);
            if (e instanceof i) {
                var n = Math.exp(e.re);
                return new i(n * Math.cos(e.im), n * Math.sin(e.im))
            }
            if (e instanceof Array || e instanceof a)return an.map(e, rn.exp);
            if (e.valueOf() !== e)return rn.exp(e.valueOf());
            throw b("exp", e)
        },rn.fix = function (e) {
            if (1 != arguments.length)throw M("fix", arguments.length, 1);
            if (w(e))return e > 0 ? Math.floor(e) : Math.ceil(e);
            if (e instanceof i)return new i(e.re > 0 ? Math.floor(e.re) : Math.ceil(e.re), e.im > 0 ? Math.floor(e.im) : Math.ceil(e.im));
            if (e instanceof Array || e instanceof a)return an.map(e, rn.fix);
            if (e.valueOf() !== e)return rn.fix(e.valueOf());
            throw b("fix", e)
        },rn.floor = function (e) {
            if (1 != arguments.length)throw M("floor", arguments.length, 1);
            if (w(e))return Math.floor(e);
            if (e instanceof i)return new i(Math.floor(e.re), Math.floor(e.im));
            if (e instanceof Array || e instanceof a)return an.map(e, rn.floor);
            if (e.valueOf() !== e)return rn.floor(e.valueOf());
            throw b("floor", e)
        },rn.gcd = function () {
            var e, n = arguments[0], t = arguments[1];
            if (2 == arguments.length) {
                if (w(n) && w(t)) {
                    if (!d(n) || !d(t))throw Error("Parameters in function gcd must be integer numbers");
                    for (; 0 != t;)e = t, t = n % e, n = e;
                    return Math.abs(n)
                }
                if (n instanceof Array || n instanceof a || t instanceof Array || t instanceof a)return an.map2(n, t, rn.gcd);
                if (n.valueOf() !== n || t.valueOf() !== t)return rn.gcd(n.valueOf(), t.valueOf());
                throw b("gcd", n, t)
            }
            if (arguments.length > 2) {
                for (var r = 1; arguments.length > r; r++)n = rn.gcd(n, arguments[r]);
                return n
            }
            throw new SyntaxError("Function gcd expects two or more arguments")
        },rn.larger = function (e, n) {
            if (2 != arguments.length)throw M("larger", arguments.length, 2);
            if (w(e)) {
                if (w(n))return e > n;
                if (n instanceof i)return e > rn.abs(n)
            }
            if (e instanceof i) {
                if (w(n))return rn.abs(e) > n;
                if (n instanceof i)return rn.abs(e) > rn.abs(n)
            }
            if (e instanceof N && n instanceof N) {
                if (!e.equalBase(n))throw Error("Cannot compare units with different base");
                return e.value > n.value
            }
            if (x(e) || x(n))return e > n;
            if (e instanceof Array || e instanceof a || n instanceof Array || n instanceof a)return an.map2(e, n, rn.larger);
            if (e.valueOf() !== e || n.valueOf() !== n)return rn.larger(e.valueOf(), n.valueOf());
            throw b("larger", e, n)
        },rn.largereq = function (e, n) {
            if (2 != arguments.length)throw M("largereq", arguments.length, 2);
            if (w(e)) {
                if (w(n))return e >= n;
                if (n instanceof i)return e >= rn.abs(n)
            }
            if (e instanceof i) {
                if (w(n))return rn.abs(e) >= n;
                if (n instanceof i)return rn.abs(e) >= rn.abs(n)
            }
            if (e instanceof N && n instanceof N) {
                if (!e.equalBase(n))throw Error("Cannot compare units with different base");
                return e.value >= n.value
            }
            if (x(e) || x(n))return e >= n;
            if (e instanceof Array || e instanceof a || n instanceof Array || n instanceof a)return an.map2(e, n, rn.largereq);
            if (e.valueOf() !== e || n.valueOf() !== n)return rn.largereq(e.valueOf(), n.valueOf());
            throw b("largereq", e, n)
        },rn.lcm = function () {
            var e, n = arguments[0], t = arguments[1];
            if (2 == arguments.length) {
                if (w(n) && w(t)) {
                    if (!d(n) || !d(t))throw Error("Parameters in function lcm must be integer numbers");
                    for (var r = n * t; 0 != t;)e = t, t = n % e, n = e;
                    return Math.abs(r / n)
                }
                if (n instanceof Array || n instanceof a || t instanceof Array || t instanceof a)return an.map2(n, t, rn.lcm);
                if (n.valueOf() !== n || t.valueOf() !== t)return rn.lcm(n.valueOf(), t.valueOf());
                throw b("lcm", n, t)
            }
            if (arguments.length > 2) {
                for (var i = 1; arguments.length > i; i++)n = rn.lcm(n, arguments[i]);
                return n
            }
            throw new SyntaxError("Function lcm expects two or more arguments")
        },rn.log = function (e, n) {
            if (1 == arguments.length) {
                if (w(e))return e >= 0 ? Math.log(e) : rn.log(new i(e, 0));
                if (e instanceof i)return new i(Math.log(Math.sqrt(e.re * e.re + e.im * e.im)), Math.atan2(e.im, e.re));
                if (e instanceof Array || e instanceof a)return an.map(e, rn.log);
                if (e.valueOf() !== e)return rn.log(e.valueOf());
                throw b("log", e)
            }
            if (2 == arguments.length)return rn.divide(rn.log(e), rn.log(n));
            throw M("log", arguments.length, 1, 2)
        },rn.log10 = function (e) {
            if (1 != arguments.length)throw M("log10", arguments.length, 1);
            if (w(e))return e >= 0 ? Math.log(e) / Math.LN10 : rn.log10(new i(e, 0));
            if (e instanceof i)return new i(Math.log(Math.sqrt(e.re * e.re + e.im * e.im)) / Math.LN10, Math.atan2(e.im, e.re) / Math.LN10);
            if (e instanceof Array || e instanceof a)return an.map(e, rn.log10);
            if (e.valueOf() !== e)return rn.log10(e.valueOf());
            throw b("log10", e)
        },rn.mod = function (e, n) {
            if (2 != arguments.length)throw M("mod", arguments.length, 2);
            if (w(e) && w(n))return C(e, n);
            if (e instanceof Array || e instanceof a || n instanceof Array || n instanceof a)return an.map2(e, n, rn.mod);
            if (e.valueOf() !== e || n.valueOf() !== n)return rn.mod(e.valueOf(), n.valueOf());
            throw b("mod", e, n)
        },rn.multiply = function (e, n) {
            if (2 != arguments.length)throw M("multiply", arguments.length, 2);
            if (w(e)) {
                if (w(n))return e * n;
                if (n instanceof i)return G(new i(e, 0), n);
                if (n instanceof N)return o = n.clone(), o.value *= e, o
            } else if (e instanceof i) {
                if (w(n))return G(e, new i(n, 0));
                if (n instanceof i)return G(e, n)
            } else if (e instanceof N) {
                if (w(n))return o = e.clone(), o.value *= n, o
            } else {
                if (e instanceof Array) {
                    if (n instanceof Array) {
                        var t = an.size(e), r = an.size(n);
                        if (2 != t.length)throw Error("Can only multiply a 2 dimensional matrix (A has " + t.length + " dimensions)");
                        if (2 != r.length)throw Error("Can only multiply a 2 dimensional matrix (B has " + r.length + " dimensions)");
                        if (t[1] != r[0])throw new RangeError("Dimensions mismatch in multiplication. Columns of A must match rows of B (A is " + t[0] + "x" + t[1] + ", B is " + r[0] + "x" + r[1] + ", " + r[1] + " != " + r[0] + ")");
                        for (var o = [], s = t[0], f = r[1], u = t[1], c = rn.multiply, l = rn.add, h = 0; s > h; h++) {
                            o[h] = [];
                            for (var p = 0; f > p; p++) {
                                for (var m = null, v = 0; u > v; v++) {
                                    var g = c(e[h][v], n[v][p]);
                                    m = null == m ? g : l(m, g)
                                }
                                o[h][p] = m
                            }
                        }
                        return o
                    }
                    return n instanceof a ? new a(rn.multiply(e.valueOf(), n.valueOf())) : an.map2(e, n, rn.multiply)
                }
                if (e instanceof a)return new a(rn.multiply(e.valueOf(), n.valueOf()))
            }
            if (n instanceof Array)return an.map2(e, n, rn.multiply);
            if (n instanceof a)return new a(rn.multiply(e.valueOf(), n.valueOf()));
            if (e.valueOf() !== e || n.valueOf() !== n)return rn.multiply(e.valueOf(), n.valueOf());
            throw b("multiply", e, n)
        },rn.pow = function (e, n) {
            if (2 != arguments.length)throw M("pow", arguments.length, 2);
            if (w(e)) {
                if (w(n))return d(n) || e >= 0 ? Math.pow(e, n) : F(new i(e, 0), new i(n, 0));
                if (n instanceof i)return F(new i(e, 0), n)
            } else if (e instanceof i) {
                if (w(n))return F(e, new i(n, 0));
                if (n instanceof i)return F(e, n)
            } else {
                if (e instanceof Array) {
                    if (!w(n) || !d(n) || 0 > n)throw new TypeError("For A^b, b must be a positive integer (value is " + n + ")");
                    var t = an.size(e);
                    if (2 != t.length)throw Error("For A^b, A must be 2 dimensional (A has " + t.length + " dimensions)");
                    if (t[0] != t[1])throw Error("For A^b, A must be square (size is " + t[0] + "x" + t[1] + ")");
                    if (0 == n)return rn.eye(t[0]);
                    for (var r = e, o = 1; n > o; o++)r = rn.multiply(e, r);
                    return r
                }
                if (e instanceof a)return new a(rn.pow(e.valueOf(), n))
            }
            if (e.valueOf() !== e || n.valueOf() !== n)return rn.pow(e.valueOf(), n.valueOf());
            throw b("pow", e, n)
        },rn.round = function (e, n) {
            if (1 != arguments.length && 2 != arguments.length)throw M("round", arguments.length, 1, 2);
            if (void 0 == n) {
                if (w(e))return Math.round(e);
                if (e instanceof i)return new i(Math.round(e.re), Math.round(e.im));
                if (e instanceof Array || e instanceof a)return an.map(e, rn.round);
                if (e.valueOf() !== e)return rn.round(e.valueOf());
                throw b("round", e)
            }
            if (!w(n))throw new TypeError("Number of decimals in function round must be an integer");
            if (n !== Math.round(n))throw new TypeError("Number of decimals in function round must be integer");
            if (0 > n || n > 9)throw Error("Number of decimals in function round must be in te range of 0-9");
            if (w(e))return V(e, n);
            if (e instanceof i)return new i(V(e.re, n), V(e.im, n));
            if (e instanceof Array || e instanceof a || n instanceof Array || n instanceof a)return an.map2(e, n, rn.round);
            if (e.valueOf() !== e || n.valueOf() !== n)return rn.round(e.valueOf(), n.valueOf());
            throw b("round", e, n)
        },rn.sign = function (e) {
            if (1 != arguments.length)throw M("sign", arguments.length, 1);
            if (w(e)) {
                var n;
                return n = e > 0 ? 1 : 0 > e ? -1 : 0
            }
            if (e instanceof i) {
                var t = Math.sqrt(e.re * e.re + e.im * e.im);
                return new i(e.re / t, e.im / t)
            }
            if (e instanceof Array || e instanceof a)return an.map(e, rn.sign);
            if (e.valueOf() !== e)return rn.sign(e.valueOf());
            throw b("sign", e)
        },rn.smaller = function (e, n) {
            if (2 != arguments.length)throw M("smaller", arguments.length, 2);
            if (w(e)) {
                if (w(n))return n > e;
                if (n instanceof i)return rn.abs(n) > e
            }
            if (e instanceof i) {
                if (w(n))return n > rn.abs(e);
                if (n instanceof i)return rn.abs(e) < rn.abs(n)
            }
            if (e instanceof N && n instanceof N) {
                if (!e.equalBase(n))throw Error("Cannot compare units with different base");
                return e.value < n.value
            }
            if (x(e) || x(n))return n > e;
            if (e instanceof Array || e instanceof a || n instanceof Array || n instanceof a)return an.map2(e, n, rn.smaller);
            if (e.valueOf() !== e || n.valueOf() !== n)return rn.smaller(e.valueOf(), n.valueOf());
            throw b("smaller", e, n)
        },rn.smallereq = function (e, n) {
            if (2 != arguments.length)throw M("smallereq", arguments.length, 2);
            if (w(e)) {
                if (w(n))return n >= e;
                if (n instanceof i)return rn.abs(n) >= e
            }
            if (e instanceof i) {
                if (w(n))return n >= rn.abs(e);
                if (n instanceof i)return rn.abs(e) <= rn.abs(n)
            }
            if (e instanceof N && n instanceof N) {
                if (!e.equalBase(n))throw Error("Cannot compare units with different base");
                return e.value <= n.value
            }
            if (x(e) || x(n))return n >= e;
            if (e instanceof Array || e instanceof a || n instanceof Array || n instanceof a)return an.map2(e, n, rn.smallereq);
            if (e.valueOf() !== e || n.valueOf() !== n)return rn.smallereq(e.valueOf(), n.valueOf());
            throw b("smallereq", e, n)
        },rn.sqrt = function (e) {
            if (1 != arguments.length)throw M("sqrt", arguments.length, 1);
            if (w(e))return e >= 0 ? Math.sqrt(e) : rn.sqrt(new i(e, 0));
            if (e instanceof i) {
                var n = Math.sqrt(e.re * e.re + e.im * e.im);
                return e.im >= 0 ? new i(.5 * Math.sqrt(2 * (n + e.re)), .5 * Math.sqrt(2 * (n - e.re))) : new i(.5 * Math.sqrt(2 * (n + e.re)), -.5 * Math.sqrt(2 * (n - e.re)))
            }
            if (e instanceof Array || e instanceof a)return an.map(e, rn.sqrt);
            if (e.valueOf() !== e)return rn.sqrt(e.valueOf());
            throw b("sqrt", e)
        },rn.square = function (e) {
            if (1 != arguments.length)throw M("square", arguments.length, 1);
            if (w(e))return e * e;
            if (e instanceof i)return rn.multiply(e, e);
            if (e instanceof Array || e instanceof a)return an.map(e, rn.square);
            if (e.valueOf() !== e)return rn.square(e.valueOf());
            throw b("square", e)
        },rn.subtract = function (e, n) {
            if (2 != arguments.length)throw M("subtract", arguments.length, 2);
            if (w(e)) {
                if (w(n))return e - n;
                if (n instanceof i)return new i(e - n.re, -n.im)
            } else if (e instanceof i) {
                if (w(n))return new i(e.re - n, e.im);
                if (n instanceof i)return new i(e.re - n.re, e.im - n.im)
            } else if (e instanceof N && n instanceof N) {
                if (!e.equalBase(n))throw Error("Units do not match");
                if (null == e.value)throw Error("Unit on left hand side of operator - has an undefined value");
                if (null == n.value)throw Error("Unit on right hand side of operator - has an undefined value");
                var t = e.clone();
                return t.value -= n.value, t.fixPrefix = !1, t
            }
            if (e instanceof Array || e instanceof a || n instanceof Array || n instanceof a)return an.map2(e, n, rn.subtract);
            if (e.valueOf() !== e || n.valueOf() !== n)return rn.subtract(e.valueOf(), n.valueOf());
            throw b("subtract", e, n)
        },rn.unaryminus = function (e) {
            if (1 != arguments.length)throw M("unaryminus", arguments.length, 1);
            if (w(e))return-e;
            if (e instanceof i)return new i(-e.re, -e.im);
            if (e instanceof N) {
                var n = e.clone();
                return n.value = -e.value, n
            }
            if (e instanceof Array || e instanceof a)return an.map(e, rn.unaryminus);
            if (e.valueOf() !== e)return rn.unaryminus(e.valueOf());
            throw b("unaryminus", e)
        },rn.unequal = function (e, n) {
            if (2 != arguments.length)throw M("unequal", arguments.length, 2);
            if (w(e)) {
                if (w(n))return e != n;
                if (n instanceof i)return e != n.re || 0 != n.im
            }
            if (e instanceof i) {
                if (w(n))return e.re != n || 0 != e.im;
                if (n instanceof i)return e.re != n.re || e.im != n.im
            }
            if (e instanceof N && n instanceof N) {
                if (!e.equalBase(n))throw Error("Cannot compare units with different base");
                return e.value != n.value
            }
            if (x(e) || x(n))return e != n;
            if (e instanceof Array || e instanceof a || n instanceof Array || n instanceof a)return an.map2(e, n, rn.unequal);
            if (e.valueOf() !== e || n.valueOf() !== n)return rn.unequal(e.valueOf(), n.valueOf());
            throw b("unequal", e, n)
        },rn.xgcd = function un(e, n) {
            if (2 == arguments.length) {
                if (w(e) && w(n)) {
                    if (!d(e) || !d(n))throw Error("Parameters in function xgcd must be integer numbers");
                    if (0 == n)return[e, 1, 0];
                    var t = un(n, e % n), r = t[0], i = t[1], a = t[2];
                    return[r, a, i - a * Math.floor(e / n)]
                }
                throw b("xgcd", e, n)
            }
            throw new SyntaxError("Function xgcd expects two arguments")
        },rn.arg = function (e) {
            if (1 != arguments.length)throw M("arg", arguments.length, 1);
            return w(e) ? Math.atan2(0, e) : e instanceof i ? Math.atan2(e.im, e.re) : e instanceof Array || e instanceof a ? an.map(e, rn.arg) : e.valueOf() !== e ? rn.arg(e.valueOf()) : rn.atan2(0, e)
        },rn.conj = function (e) {
            if (1 != arguments.length)throw M("conj", arguments.length, 1);
            return w(e) ? e : e instanceof i ? new i(e.re, -e.im) : e instanceof Array || e instanceof a ? an.map(e, rn.conj) : e.valueOf() !== e ? rn.conj(e.valueOf()) : cn(e)
        },rn.im = function (e) {
            if (1 != arguments.length)throw M("im", arguments.length, 1);
            return w(e) ? 0 : e instanceof i ? e.im : e instanceof Array || e instanceof a ? an.map(e, rn.im) : e.valueOf() !== e ? rn.im(e.valueOf()) : 0
        },rn.re = function (e) {
            if (1 != arguments.length)throw M("re", arguments.length, 1);
            return w(e) ? e : e instanceof i ? e.re : e instanceof Array || e instanceof a ? an.map(e, rn.re) : e.valueOf() !== e ? rn.re(e.valueOf()) : rn.clone(e)
        },rn.complex = function () {
            switch (arguments.length) {
                case 0:
                    return new i(0, 0);
                case 1:
                    var e = arguments[0];
                    if (e instanceof i)return e.clone();
                    if (x(e)) {
                        var n = i.parse(e);
                        if (n)return n;
                        throw new SyntaxError('String "' + e + '" is no valid complex number')
                    }
                    throw new TypeError("Two numbers or a single string expected in function complex");
                case 2:
                    return new i(arguments[0], arguments[1]);
                default:
                    throw M("complex", arguments.length, 0, 2)
            }
        },rn.matrix = function (e) {
            if (arguments.length > 1)throw M("matrix", arguments.length, 0, 1);
            return new a(e)
        },rn.number = function (e) {
            switch (arguments.length) {
                case 0:
                    return 0;
                case 1:
                    var n = Number(e);
                    if (isNaN(n) && (n = Number(e.valueOf())), isNaN(n))throw new SyntaxError("" + e + " is no valid number");
                    return n;
                default:
                    throw M("number", arguments.length, 0, 1)
            }
        },rn.parser = function () {
            return new rn.expr.Parser
        },rn.range = function (e) {
            switch (arguments.length) {
                case 1:
                    if (e instanceof y)return e.clone();
                    if (x(e)) {
                        var n = y.parse(e);
                        if (n)return n;
                        throw new SyntaxError('String "' + n + '" is no valid range')
                    }
                    throw new TypeError("Two or three numbers or a single string expected in function range");
                case 2:
                    return new y(arguments[0], null, arguments[1]);
                case 3:
                    return new y(arguments[0], arguments[1], arguments[2]);
                default:
                    throw M("range", arguments.length, 2, 3)
            }
        },rn.string = function (e) {
            switch (arguments.length) {
                case 0:
                    return"";
                case 1:
                    return j(e);
                default:
                    throw M("string", arguments.length, 0, 1)
            }
        },rn.unit = function () {
            switch (arguments.length) {
                case 1:
                    var e = arguments[0];
                    if (e instanceof N)return e.clone();
                    if (x(e)) {
                        if (N.isPlainUnit(e))return new N(null, e);
                        var n = N.parse(e);
                        if (n)return n;
                        throw new SyntaxError('String "' + e + '" is no valid unit')
                    }
                    throw new TypeError("A string or a number and string expected in function unit");
                case 2:
                    return new N(arguments[0], arguments[1]);
                default:
                    throw M("unit", arguments.length, 1, 2)
            }
        },rn.workspace = function () {
            return new rn.expr.Workspace
        },rn.concat = function () {
            var e, n, t = arguments.length, r = -1, i = !1, o = [];
            for (e = 0; t > e; e++) {
                var s = arguments[e];
                if (s instanceof a && (i = !0), e == t - 1 && w(s)) {
                    if (n = r, r = s, !d(r) || 1 > r)throw new TypeError("Dimension number must be a positive integer (dim = " + r + ")");
                    if (e > 0 && r > n)throw new RangeError("Dimension out of range (" + r + " > " + n + ")")
                } else {
                    if (!(s instanceof Array || s instanceof a))throw b("concat", s);
                    var f = rn.clone(s.valueOf()), u = rn.size(s);
                    if (o[e] = f, n = r, r = u.length, e > 0 && r != n)throw new RangeError("Dimension mismatch (" + n + " != " + r + ")")
                }
            }
            if (0 == o.length)throw new SyntaxError("At least one matrix expected");
            for (var c = o.shift(); o.length;)c = D(c, o.shift(), r - 1, 0);
            return i ? new a(c) : c
        },rn.det = function (e) {
            if (1 != arguments.length)throw M("det", arguments.length, 1);
            var n = rn.size(e);
            switch (n.length) {
                case 0:
                    return rn.clone(e);
                case 1:
                    if (1 == n[0])return rn.clone(e.valueOf()[0]);
                    throw new RangeError("Matrix must be square (size: " + rn.format(n) + ")");
                case 2:
                    var t = n[0], r = n[1];
                    if (t == r)return H(e.valueOf(), t, r);
                    throw new RangeError("Matrix must be square (size: " + rn.format(n) + ")");
                default:
                    throw new RangeError("Matrix must be two dimensional (size: " + rn.format(n) + ")")
            }
        },rn.diag = function (e, n) {
            var t, r, i, o;
            if (1 != arguments.length && 2 != arguments.length)throw M("diag", arguments.length, 1, 2);
            if (n) {
                if (!w(n) || !d(n))throw new TypeError("Second parameter in function diag must be an integer")
            } else n = 0;
            var s = n > 0 ? n : 0, f = 0 > n ? -n : 0;
            e instanceof a || e instanceof y || (e = new a(e));
            var u;
            switch (e.isVector() ? (e = e.toVector(), u = [e.length]) : u = e.size(), u.length) {
                case 1:
                    r = e.valueOf();
                    var c = new a;
                    for (c.resize([r.length + f, r.length + s]), t = c.valueOf(), o = r.length, i = 0; o > i; i++)t[i + f][i + s] = rn.clone(r[i]);
                    return c;
                case 2:
                    for (r = [], t = e.valueOf(), o = Math.min(u[0] - f, u[1] - s), i = 0; o > i; i++)r[i] = rn.clone(t[i + f][i + s]);
                    return new a(r);
                default:
                    throw new RangeError("Matrix for function diag must be 2 dimensional")
            }
        },rn.eye = function () {
            var e = an.argsToArray(arguments);
            if (0 == e.length)e = [1, 1]; else if (1 == e.length)e[1] = e[0]; else if (e.length > 2)throw M("eye", e.length, 0, 2);
            var n = e[0], t = e[1];
            if (!w(n) || !d(n) || 1 > n)throw Error("Parameters in function eye must be positive integers");
            if (t && (!w(t) || !d(t) || 1 > t))throw Error("Parameters in function eye must be positive integers");
            var r = new a;
            r.resize(e);
            for (var i = rn.min(e), o = r.valueOf(), s = 0; i > s; s++)o[s][s] = 1;
            return r
        },rn.inv = function (e) {
            if (1 != arguments.length)throw M("inv", arguments.length, 1);
            var n = rn.size(e);
            switch (n.length) {
                case 0:
                    return rn.divide(1, e);
                case 1:
                    if (1 == n[0])return e instanceof a ? new a([rn.divide(1, e.valueOf()[0])]) : [rn.divide(1, e[0])];
                    throw new RangeError("Matrix must be square (size: " + rn.format(n) + ")");
                case 2:
                    var t = n[0], r = n[1];
                    if (t == r)return e instanceof a ? new a(k(e.valueOf(), t, r)) : k(e, t, r);
                    throw new RangeError("Matrix must be square (size: " + rn.format(n) + ")");
                default:
                    throw new RangeError("Matrix must be two dimensional (size: " + rn.format(n) + ")")
            }
        },rn.ones = function () {
            var e = an.argsToArray(arguments);
            0 == e.length ? e = [1, 1] : 1 == e.length && (e[1] = e[0]);
            var n = new a, t = 1;
            return n.resize(e, t), n
        },rn.size = function (e) {
            if (1 != arguments.length)throw M("size", arguments.length, 1);
            if (w(e) || e instanceof i || e instanceof N || null == e)return[];
            if (x(e))return[e.length];
            if (e instanceof Array)return an.size(e);
            if (e instanceof a)return e.size();
            if (e.valueOf() !== e)return rn.size(e.valueOf());
            throw b("size", e)
        },rn.squeeze = function (e) {
            if (1 != arguments.length)throw M("squeeze", arguments.length, 1);
            return e instanceof Array ? Y(rn.clone(e)) : e instanceof a ? Y(e.toArray()) : e.valueOf()instanceof Array ? Y(rn.clone(e.valueOf())) : rn.clone(e)
        },rn.subset = function () {
            switch (arguments.length) {
                case 2:
                    return W(arguments[0], arguments[1]);
                case 3:
                    return Z(arguments[0], arguments[1], arguments[2]);
                default:
                    throw M("subset", arguments.length, 2, 3)
            }
        },rn.transpose = function (e) {
            if (1 != arguments.length)throw M("transpose", arguments.length, 1);
            var n = rn.size(e);
            switch (n.length) {
                case 0:
                    return rn.clone(e);
                case 1:
                    return rn.clone(e);
                case 2:
                    for (var t, r = n[1], i = n[0], o = e instanceof a, s = e.valueOf(), f = [], u = rn.clone, c = 0; r > c; c++) {
                        t = f[c] = [];
                        for (var l = 0; i > l; l++)t[l] = u(s[l][c])
                    }
                    return 0 == i && (f[0] = []), o ? new a(f) : f;
                default:
                    throw new RangeError("Matrix must be two dimensional (size: " + rn.format(n) + ")")
            }
        },rn.zeros = function () {
            var e = an.argsToArray(arguments);
            0 == e.length ? e = [1, 1] : 1 == e.length && (e[1] = e[0]);
            var n = new a;
            return n.resize(e), n
        },rn.factorial = function (e) {
            if (1 != arguments.length)throw M("factorial", arguments.length, 1);
            if (w(e)) {
                if (!d(e) || 0 > e)throw new TypeError("Positive integer value expected in function factorial");
                var n = e, t = n;
                for (n--; n > 1;)t *= n, n--;
                return 0 == t && (t = 1), t
            }
            if (e instanceof Array || e instanceof a)return an.map(e, rn.factorial);
            if (e.valueOf() !== e)return rn.factorial(e.valueOf());
            throw b("factorial", e)
        },rn.random = function () {
            if (0 != arguments.length)throw M("random", arguments.length, 0);
            return Math.random()
        },rn.max = function (e) {
            if (0 == arguments.length)throw Error("Function max requires one or more parameters (0 provided)");
            if (e instanceof Array || e instanceof a || e instanceof y) {
                if (arguments.length > 1)throw Error("Wrong number of parameters (1 matrix or multiple scalars expected)");
                var n = rn.size(e);
                if (1 == n.length) {
                    if (0 == e.length)throw Error("Cannot calculate max of an empty vector");
                    return Q(e.valueOf())
                }
                if (2 == n.length) {
                    if (0 == n[0] || 0 == n[1])throw Error("Cannot calculate max of an empty matrix");
                    if (e instanceof Array)return J(e, n[0], n[1]);
                    if (e instanceof a || e instanceof y)return new a(J(e.valueOf(), n[0], n[1]));
                    throw b("max", e)
                }
                throw new RangeError("Cannot calculate max for multi dimensional matrix")
            }
            return Q(arguments)
        },rn.min = function (e) {
            if (0 == arguments.length)throw Error("Function min requires one or more parameters (0 provided)");
            if (e instanceof Array || e instanceof a || e instanceof y) {
                if (arguments.length > 1)throw Error("Wrong number of parameters (1 matrix or multiple scalars expected)");
                var n = rn.size(e);
                if (1 == n.length) {
                    if (0 == e.length)throw Error("Cannot calculate min of an empty vector");
                    return $(e.valueOf())
                }
                if (2 == n.length) {
                    if (0 == n[0] || 0 == n[1])throw Error("Cannot calculate min of an empty matrix");
                    if (e instanceof Array)return en(e, n[0], n[1]);
                    if (e instanceof a || e instanceof y)return new a(en(e.valueOf(), n[0], n[1]));
                    throw b("min", e)
                }
                throw new RangeError("Cannot calculate min for multi dimensional matrix")
            }
            return $(arguments)
        },rn.acos = function (e) {
            if (1 != arguments.length)throw M("acos", arguments.length, 1);
            if (w(e))return e >= -1 && 1 >= e ? Math.acos(e) : rn.acos(new i(e, 0));
            if (e instanceof i) {
                var n = new i(e.im * e.im - e.re * e.re + 1, -2 * e.re * e.im), t = rn.sqrt(n), r = new i(t.re - e.im, t.im + e.re), o = rn.log(r);
                return new i(1.5707963267948966 - o.im, o.re)
            }
            if (e instanceof Array || e instanceof a)return an.map(e, rn.acos);
            if (e.valueOf() !== e)return rn.acos(e.valueOf());
            throw b("acos", e)
        },rn.asin = function (e) {
            if (1 != arguments.length)throw M("asin", arguments.length, 1);
            if (w(e))return e >= -1 && 1 >= e ? Math.asin(e) : rn.asin(new i(e, 0));
            if (e instanceof i) {
                var n = e.re, t = e.im, r = new i(t * t - n * n + 1, -2 * n * t), o = rn.sqrt(r), s = new i(o.re - t, o.im + n), f = rn.log(s);
                return new i(f.im, -f.re)
            }
            if (e instanceof Array || e instanceof a)return an.map(e, rn.asin);
            if (e.valueOf() !== e)return rn.asin(e.valueOf());
            throw b("asin", e)
        },rn.atan = function (e) {
            if (1 != arguments.length)throw M("atan", arguments.length, 1);
            if (w(e))return Math.atan(e);
            if (e instanceof i) {
                var n = e.re, t = e.im, r = n * n + (1 - t) * (1 - t), o = new i((1 - t * t - n * n) / r, -2 * n / r), s = rn.log(o);
                return new i(-.5 * s.im, .5 * s.re)
            }
            if (e instanceof Array || e instanceof a)return an.map(e, rn.atan);
            if (e.valueOf() !== e)return rn.atan(e.valueOf());
            throw b("atan", e)
        },rn.atan2 = function (e, n) {
            if (2 != arguments.length)throw M("atan2", arguments.length, 2);
            if (w(e)) {
                if (w(n))return Math.atan2(e, n)
            } else if (e instanceof i && w(n))return Math.atan2(e.re, n);
            if (e instanceof Array || e instanceof a || n instanceof Array || n instanceof a)return an.map2(e, n, rn.atan2);
            if (n.valueOf() !== n || e.valueOf() !== e)return rn.atan2(e.valueOf(), n.valueOf());
            throw b("atan2", e, n)
        },rn.cos = function (e) {
            if (1 != arguments.length)throw M("cos", arguments.length, 1);
            if (w(e))return Math.cos(e);
            if (e instanceof i)return new i(.5 * Math.cos(e.re) * (Math.exp(-e.im) + Math.exp(e.im)), .5 * Math.sin(e.re) * (Math.exp(-e.im) - Math.exp(e.im)));
            if (e instanceof N) {
                if (!e.hasBase(N.BASE_UNITS.ANGLE))throw new TypeError("Unit in function cos is no angle");
                return Math.cos(e.value)
            }
            if (e instanceof Array || e instanceof a)return an.map(e, rn.cos);
            if (e.valueOf() !== e)return rn.cos(e.valueOf());
            throw b("cos", e)
        },rn.cot = function (e) {
            if (1 != arguments.length)throw M("cot", arguments.length, 1);
            if (w(e))return 1 / Math.tan(e);
            if (e instanceof i) {
                var n = Math.exp(-4 * e.im) - 2 * Math.exp(-2 * e.im) * Math.cos(2 * e.re) + 1;
                return new i(2 * Math.exp(-2 * e.im) * Math.sin(2 * e.re) / n, (Math.exp(-4 * e.im) - 1) / n)
            }
            if (e instanceof N) {
                if (!e.hasBase(N.BASE_UNITS.ANGLE))throw new TypeError("Unit in function cot is no angle");
                return 1 / Math.tan(e.value)
            }
            if (e instanceof Array || e instanceof a)return an.map(e, rn.cot);
            if (e.valueOf() !== e)return rn.cot(e.valueOf());
            throw b("cot", e)
        },rn.csc = function (e) {
            if (1 != arguments.length)throw M("csc", arguments.length, 1);
            if (w(e))return 1 / Math.sin(e);
            if (e instanceof i) {
                var n = .25 * (Math.exp(-2 * e.im) + Math.exp(2 * e.im)) - .5 * Math.cos(2 * e.re);
                return new i(.5 * Math.sin(e.re) * (Math.exp(-e.im) + Math.exp(e.im)) / n, .5 * Math.cos(e.re) * (Math.exp(-e.im) - Math.exp(e.im)) / n)
            }
            if (e instanceof N) {
                if (!e.hasBase(N.BASE_UNITS.ANGLE))throw new TypeError("Unit in function csc is no angle");
                return 1 / Math.sin(e.value)
            }
            if (e instanceof Array || e instanceof a)return an.map(e, rn.csc);
            if (e.valueOf() !== e)return rn.csc(e.valueOf());
            throw b("csc", e)
        },rn.sec = function (e) {
            if (1 != arguments.length)throw M("sec", arguments.length, 1);
            if (w(e))return 1 / Math.cos(e);
            if (e instanceof i) {
                var n = .25 * (Math.exp(-2 * e.im) + Math.exp(2 * e.im)) + .5 * Math.cos(2 * e.re);
                return new i(.5 * Math.cos(e.re) * (Math.exp(-e.im) + Math.exp(e.im)) / n, .5 * Math.sin(e.re) * (Math.exp(e.im) - Math.exp(-e.im)) / n)
            }
            if (e instanceof N) {
                if (!e.hasBase(N.BASE_UNITS.ANGLE))throw new TypeError("Unit in function sec is no angle");
                return 1 / Math.cos(e.value)
            }
            if (e instanceof Array || e instanceof a)return an.map(e, rn.sec);
            if (e.valueOf() !== e)return rn.sec(e.valueOf());
            throw b("sec", e)
        },rn.sin = function (e) {
            if (1 != arguments.length)throw M("sin", arguments.length, 1);
            if (w(e))return Math.sin(e);
            if (e instanceof i)return new i(.5 * Math.sin(e.re) * (Math.exp(-e.im) + Math.exp(e.im)), .5 * Math.cos(e.re) * (Math.exp(e.im) - Math.exp(-e.im)));
            if (e instanceof N) {
                if (!e.hasBase(N.BASE_UNITS.ANGLE))throw new TypeError("Unit in function cos is no angle");
                return Math.sin(e.value)
            }
            if (e instanceof Array || e instanceof a)return an.map(e, rn.sin);
            if (e.valueOf() !== e)return rn.sin(e.valueOf());
            throw b("sin", e)
        },rn.tan = function (e) {
            if (1 != arguments.length)throw M("tan", arguments.length, 1);
            if (w(e))return Math.tan(e);
            if (e instanceof i) {
                var n = Math.exp(-4 * e.im) + 2 * Math.exp(-2 * e.im) * Math.cos(2 * e.re) + 1;
                return new i(2 * Math.exp(-2 * e.im) * Math.sin(2 * e.re) / n, (1 - Math.exp(-4 * e.im)) / n)
            }
            if (e instanceof N) {
                if (!e.hasBase(N.BASE_UNITS.ANGLE))throw new TypeError("Unit in function tan is no angle");
                return Math.tan(e.value)
            }
            if (e instanceof Array || e instanceof a)return an.map(e, rn.tan);
            if (e.valueOf() !== e)return rn.tan(e.valueOf());
            throw b("tan", e)
        },rn["in"] = function (e, n) {
            if (2 != arguments.length)throw M("in", arguments.length, 2);
            if (e instanceof N && (n instanceof N || x(n)))return e["in"](n);
            if (e instanceof Array || e instanceof a || n instanceof Array || n instanceof a)return an.map2(e, n, rn["in"]);
            if (e.valueOf() !== e || n.valueOf() !== n)return rn["in"](e.valueOf(), n.valueOf());
            throw b("in", e, n)
        },rn.clone = function cn(e) {
            if (1 != arguments.length)throw M("clone", arguments.length, 1);
            if (null == e)return e;
            if ("function" == typeof e.clone)return e.clone();
            if (w(e) || x(e) || r(e))return e;
            if (e instanceof Array) {
                var n = rn.clone;
                return e.map(function (e) {
                    return n(e)
                })
            }
            if (e instanceof Object)return an.mapObject(e, rn.clone);
            throw b("clone", e)
        },rn.eval = function (e, n) {
            if (1 != arguments.length && 2 != arguments.length)throw M("eval", arguments.length, 1, 2);
            var t;
            if (t = n ? n instanceof rn.expr.Scope ? n : new rn.expr.Scope(n) : new rn.expr.Scope, x(e)) {
                var r = rn.parse(e, t);
                return r.eval()
            }
            if (e instanceof Array || e instanceof a)return an.map(e, function (e) {
                var n = rn.parse(e, t);
                return n.eval()
            });
            throw new TypeError("String or matrix expected")
        },rn.format = function (e, n) {
            var t = arguments.length;
            if (1 != t && 2 != t)throw M("format", t, 1, 2);
            if (1 == t) {
                var r = arguments[0];
                return w(r) ? an.formatNumber(r, rn.options.precision) : r instanceof Array ? an.formatArray(r) : x(r) ? '"' + r + '"' : r instanceof Object ? "" + r : r + ""
            }
            if (!x(e))throw new TypeError("String expected as first parameter in function format");
            if (!(n instanceof Object))throw new TypeError("Object expected as first parameter in function format");
            return e.replace(/\$([\w\.]+)/g, function (e, t) {
                for (var r = t.split("."), i = n[r.shift()]; r.length && void 0 != i;) {
                    var a = r.shift();
                    i = a ? i[a] : i + "."
                }
                return void 0 != i ? i : e
            })
        },rn["import"] = function (n, t) {
            var r, i = {override: !1, wrap: !0};
            if (t && t instanceof Object && an.extend(i, t), x(n)) {
                if (void 0 === e)throw Error("Cannot load file: require not available.");
                var a = e(n);
                rn["import"](a)
            } else if (tn(n)) {
                if (r = n.name, !r)throw Error("Cannot import an unnamed function or object");
                (i.override || void 0 === rn[r]) && nn(r, n, i)
            } else if (n instanceof Object)for (r in n)if (n.hasOwnProperty(r)) {
                var o = n[r];
                tn(o) ? nn(r, o, i) : rn["import"](o)
            }
        },function () {
            function e() {
                J++, $ = Q.charAt(J)
            }

            function n() {
                J = 0, $ = Q.charAt(0)
            }

            function t() {
                for (nn = X.NULL, en = ""; " " == $ || "	" == $;)e();
                if ("#" == $)for (; "\n" != $ && "" != $;)e();
                if ("" == $)return nn = X.DELIMITER, void 0;
                if ("!" == $)return nn = X.DELIMITER, en += $, e(), "=" == $ && (en += $, e()), void 0;
                if ("-" == $ || "," == $ || "(" == $ || ")" == $ || "[" == $ || "]" == $ || '"' == $ || "'" == $ || "\n" == $ || ";" == $ || ":" == $)return nn = X.DELIMITER, en += $, e(), void 0;
                if (r($))for (nn = X.DELIMITER; r($);)en += $, e(); else if (s($)) {
                    if (nn = X.NUMBER, "." == $)en += $, e(), f($) || (nn = X.UNKNOWN); else {
                        for (; f($);)en += $, e();
                        "." == $ && (en += $, e())
                    }
                    for (; f($);)en += $, e();
                    if ("E" == $ || "e" == $)for (en += $, e(), ("+" == $ || "-" == $) && (en += $, e()), f($) || (nn = X.UNKNOWN); f($);)en += $, e()
                } else {
                    if (!o($)) {
                        for (nn = X.UNKNOWN; "" != $;)en += $, e();
                        throw W('Syntax error in part "' + en + '"')
                    }
                    for (nn = X.SYMBOL; o($) || f($);)en += $, e()
                }
            }

            function r(e) {
                return"&" == e || "|" == e || "<" == e || ">" == e || "=" == e || "+" == e || "/" == e || "*" == e || "%" == e || "^" == e || "," == e || ";" == e || "\n" == e || "!" == e || "'" == e
            }

            function o(e) {
                return e >= "a" && "z" >= e || e >= "A" && "Z" >= e || "_" == e
            }

            function s(e) {
                return e >= "0" && "9" >= e || "." == e
            }

            function f(e) {
                return e >= "0" && "9" >= e
            }

            function u(e) {
                n(), t();
                var r;
                if (r = "" == en ? new S(void 0) : c(e), "" != en)throw nn == X.DELIMITER ? Z("Unknown operator " + en) : W('Unexpected part "' + en + '"');
                return r
            }

            function c(e) {
                var n, r, i;
                for ("\n" != en && ";" != en && "" != en && (n = l(e)); "\n" == en || ";" == en;)r || (r = new L, n && (i = ";" != en, r.add(n, i))), t(), "\n" != en && ";" != en && "" != en && (n = l(e), i = ";" != en, r.add(n, i));
                return r ? r : (n || (n = l(e)), n)
            }

            function l(e) {
                var n = h(e), t = "ans";
                return new _(t, n, e)
            }

            function h(e) {
                if (nn == X.SYMBOL && "function" == en) {
                    if (t(), nn != X.SYMBOL)throw W("Function name expected");
                    var n = en;
                    if (t(), "(" != en)throw W("Opening parenthesis ( expected");
                    for (var r = e.createSubScope(), i = []; ;) {
                        if (t(), nn != X.SYMBOL)throw W("Variable name expected");
                        if (i.push(en), t(), "," != en) {
                            if (")" == en)break;
                            throw W('Comma , or closing parenthesis ) expected"')
                        }
                    }
                    if (t(), "=" != en)throw W("Equal sign = expected");
                    t();
                    var a = p(r);
                    return new q(n, i, a, r, e)
                }
                return p(e)
            }

            function p(e) {
                var n, r, i, a, o = m(e);
                if ("=" == en) {
                    if (o instanceof U)return t(), n = o.name, r = null, a = p(e), new _(n, a, e);
                    if (o instanceof R && o.object instanceof U)return t(), n = o.object.name, r = o.params, i = o.paramScopes, a = p(e), new I(n, r, i, a, e);
                    throw W("Symbol expected at the left hand side of assignment operator =")
                }
                return o
            }

            function m(e) {
                var n, r, i, a = [];
                if (n = ":" == en ? new S(1) : v(e), ":" == en) {
                    for (a.push(n); ":" == en;)t(), ")" == en || "," == en || "" == en ? a.push(new U("end", e)) : a.push(v(e));
                    a.length && (r = "range", i = rn.range, n = new T(r, i, a))
                }
                return n
            }

            function v(e) {
                var n, r, i, a, o;
                for (n = g(e), r = {"in": "in"}; void 0 !== r[en];)i = en, a = rn[r[i]], t(), o = [n, g(e)], n = new T(i, a, o);
                return n
            }

            function g(e) {
                var n = w(e);
                return n
            }

            function w(e) {
                var n, r, i, a, o;
                for (n = d(e), r = {"==": "equal", "!=": "unequal", "<": "smaller", ">": "larger", "<=": "smallereq", ">=": "largereq"}; void 0 !== r[en];)i = en, a = rn[r[i]], t(), o = [n, d(e)], n = new T(i, a, o);
                return n
            }

            function d(e) {
                var n, r, i, a, o;
                for (n = y(e), r = {"+": "add", "-": "subtract"}; void 0 !== r[en];)i = en, a = rn[r[i]], t(), o = [n, y(e)], n = new T(i, a, o);
                return n
            }

            function y(e) {
                var n, r, i, a, o;
                for (n = E(e), r = {"*": "multiply", "/": "divide", "%": "mod", mod: "mod"}; void 0 !== r[en];)i = en, a = rn[r[i]], t(), o = [n, E(e)], n = new T(i, a, o);
                return n
            }

            function E(e) {
                var n, r, i;
                return"-" == en ? (n = en, r = rn.unaryminus, t(), i = [O(e)], new T(n, r, i)) : O(e)
            }

            function O(e) {
                var n, r, i, a, o, s;
                for (i = [b(e)]; "^" == en;)t(), i.push(b(e));
                for (n = i.pop(); i.length;)r = i.pop(), a = "^", o = rn.pow, s = [r, n], n = new T(a, o, s);
                return n
            }

            function b(e) {
                var n, r, i, a;
                for (n = A(e); "!" == en;)r = en, i = rn.factorial, t(), a = [n], n = new T(r, i, a);
                return n
            }

            function A(e) {
                var n, r, i, a;
                for (n = P(e); "'" == en;)r = en, i = rn.transpose, t(), a = [n], n = new T(r, i, a);
                return n
            }

            function P(e) {
                return B(e)
            }

            function B(e) {
                var n, r;
                return nn == X.SYMBOL ? (r = en, t(), n = new U(r, e), C(e, n)) : G(e)
            }

            function C(e, n) {
                for (var r, i, a; "(" == en;) {
                    if (r = [], i = [], t(), ")" != en)for (a = e.createSubScope(), i.push(a), r.push(m(a)); "," == en;)t(), a = e.createSubScope(), i.push(a), r.push(m(a));
                    if (")" != en)throw W("Parenthesis ) missing");
                    t(), n = new R(n, r, i)
                }
                return n
            }

            function G(n) {
                var r, i, a;
                if ('"' == en) {
                    for (i = "", a = ""; "" != $ && ('"' != $ || "\\" == a);)i += $, a = $, e();
                    if (t(), '"' != en)throw W('End of string " missing');
                    return t(), r = new S(i), r = C(n, r)
                }
                return F(n)
            }

            function F(e) {
                var n, r, i, a, o, s;
                if ("[" == en) {
                    for (t(); "\n" == en;)t();
                    if ("]" != en) {
                        for (r = [], i = 0, a = 0, r[0] = [p(e)]; "," == en || ";" == en;) {
                            for ("," == en ? a++ : (i++, a = 0, r[i] = []), t(); "\n" == en;)t();
                            for (r[i][a] = p(e); "\n" == en;)t()
                        }
                        for (o = r.length, s = r.length > 0 ? r[0].length : 0, i = 1; o > i; i++)if (r[i].length != s)throw Z("Number of columns must match (" + r[i].length + " != " + s + ")");
                        if ("]" != en)throw W("End of matrix ] missing");
                        t(), n = new z(r)
                    } else t(), n = new z([
                        []
                    ]);
                    return n = C(e, n)
                }
                return V(e)
            }

            function V(e) {
                var n, r, a;
                if (nn == X.NUMBER) {
                    if (a = "." == en ? 0 : Number(en), t(), nn == X.SYMBOL) {
                        if ("i" == en || "I" == en)return r = new i(0, a), t(), new S(r);
                        if (N.isPlainUnit(en))return r = new N(a, en), t(), new S(r);
                        throw K('Unknown unit "' + en + '"')
                    }
                    return n = new S(a), n = C(e, n)
                }
                return j(e)
            }

            function j(e) {
                var n;
                if ("(" == en) {
                    if (t(), n = p(e), ")" != en)throw W("Parenthesis ) expected");
                    return t(), n = C(e, n)
                }
                return D(e)
            }

            function D() {
                throw"" == en ? W("Unexpected end of expression") : W("Value expected")
            }

            function H() {
                return void 0
            }

            function k() {
                return J - en.length + 1
            }

            function Y(e) {
                var n = H(), t = k();
                return void 0 === n ? void 0 === t ? e : e + " (char " + t + ")" : e + " (line " + n + ", char " + t + ")"
            }

            function W(e) {
                return new SyntaxError(Y(e))
            }

            function K(e) {
                return new TypeError(Y(e))
            }

            function Z(e) {
                return Error(Y(e))
            }

            rn.parse = function (e, n) {
                if (1 != arguments.length && 2 != arguments.length)throw M("parse", arguments.length, 1, 2);
                var t;
                if (t = n ? n instanceof rn.expr.Scope ? n : new rn.expr.Scope(n) : new rn.expr.Scope, x(e))return Q = e || "", u(t);
                if (e instanceof Array || e instanceof a)return an.map(e, function (e) {
                    return Q = e || "", u(t)
                });
                throw new TypeError("String or matrix expected")
            };
            var X = {NULL: 0, DELIMITER: 1, NUMBER: 2, SYMBOL: 3, UNKNOWN: 4}, Q = "", J = 0, $ = "", en = "", nn = X.NULL
        }(),rn.select = function (e) {
            return new rn.type.Selector(e)
        },rn["typeof"] = function (e) {
            if (1 != arguments.length)throw M("typeof", arguments.length, 1);
            var n, t = typeof e;
            if ("object" == t) {
                if (null == e)return"null";
                if (e instanceof Boolean)return"boolean";
                if (e instanceof Number)return"number";
                if (e instanceof String)return"string";
                if (e instanceof Array)return"array";
                if (e instanceof Date)return"date";
                if (e.constructor) {
                    for (n in rn)if (rn.hasOwnProperty(n) && e.constructor == rn[n])return n.toLowerCase();
                    for (n in rn.type)if (rn.type.hasOwnProperty(n) && e.constructor == rn.type[n])return n.toLowerCase();
                    if (e.constructor.name)return e.constructor.name.toLowerCase()
                }
            }
            return t
        },Array.prototype.indexOf || (Array.prototype.indexOf = function (e) {
            for (var n = 0; this.length > n; n++)if (this[n] == e)return n;
            return-1
        }),Array.prototype.forEach || (Array.prototype.forEach = function (e, n) {
            for (var t = 0, r = this.length; r > t; ++t)e.call(n || this, this[t], t, this)
        }),Array.prototype.map || (Array.prototype.map = function (e, n) {
            var t, r, i;
            if (null == this)throw new TypeError(" this is null or not defined");
            var a = Object(this), o = a.length >>> 0;
            if ("function" != typeof e)throw new TypeError(e + " is not a function");
            for (n && (t = n), r = Array(o), i = 0; o > i;) {
                var s, f;
                i in a && (s = a[i], f = e.call(t, s, i, a), r[i] = f), i++
            }
            return r
        }),Array.prototype.every || (Array.prototype.every = function (e) {
            "use strict";
            if (null == this)throw new TypeError;
            var n = Object(this), t = n.length >>> 0;
            if ("function" != typeof e)throw new TypeError;
            for (var r = arguments[1], i = 0; t > i; i++)if (i in n && !e.call(r, n[i], i, n))return!1;
            return!0
        }),Array.prototype.some || (Array.prototype.some = function (e) {
            "use strict";
            if (null == this)throw new TypeError;
            var n = Object(this), t = n.length >>> 0;
            if ("function" != typeof e)throw new TypeError;
            for (var r = arguments[1], i = 0; t > i; i++)if (i in n && e.call(r, n[i], i, n))return!0;
            return!1
        }),Function.prototype.bind || (Function.prototype.bind = function (e) {
            if ("function" != typeof this)throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
            var n = Array.prototype.slice.call(arguments, 1), t = this, r = function () {
            }, i = function () {
                return t.apply(this instanceof r && e ? this : e, n.concat(Array.prototype.slice.call(arguments)))
            };
            return r.prototype = this.prototype, i.prototype = new r, i
        });
        for (var ln in rn)rn.hasOwnProperty(ln) && ln && E(ln, rn[ln])
    })()
});
