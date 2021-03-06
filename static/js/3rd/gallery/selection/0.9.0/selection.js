define("gallery/selection/0.9.0/selection", [], function (e, t, n) {
    function s(e, t) {
        return this.element = e, this.cursor = function (e, n) {
            var r = this.element;
            if (typeof e == "undefined")return t ? l(r) : [r.selectionStart, r.selectionEnd];
            if (a(e)) {
                var i = e;
                e = i[0], n = i[1]
            }
            return typeof n == "undefined" && (n = e), t ? c(r, e, n) : r.setSelectionRange(e, n), this
        }, this
    }

    function o(e) {
        if (!e) {
            var t = r.getSelection();
            this.element = p(t), this.text = function () {
                return t.toString()
            }
        } else this.text = function () {
            return document.selection.createRange().text
        };
        return this
    }

    function l(e) {
        var t = document.selection.createRange(), n = 0;
        if (t && t.parentElement() === e) {
            var r, i, s = e.value.replace(/\r\n/g, "\n"), o = s.length, u = e.createTextRange();
            u.moveToBookmark(t.getBookmark());
            var a = e.createTextRange();
            return a.collapse(!1), u.compareEndPoints("StartToEnd", a) > -1 ? r = i = o : (r = -u.moveStart("character", -o), i = -u.moveEnd("character", -o)), i < r && (i = o), [r, i]
        }
        return[0, 0]
    }

    function c(e, t, n) {
        var r = e.createTextRange();
        r.move("character", t), r.moveEnd("character", n - t), r.select()
    }

    function h(e, t, n, r, i) {
        typeof t == "undefined" && (t = "");
        var s = e.element.value;
        return e.element.value = [s.slice(0, n), t, s.slice(r)].join(""), r = n + t.length, i === "left" ? e.cursor(n) : i === "right" ? e.cursor(r) : e.cursor(n, r), e
    }

    function p(e) {
        var t = null, n = e.anchorNode, r = e.focusNode;
        while (!t) {
            if (n.parentElement === r.parentElement) {
                t = r.parentElement;
                break
            }
            n = n.parentElement, r = r.parentElement
        }
        return t
    }

    var r = this, i = function (e) {
        e && e.length && (e = e[0]);
        if (e) {
            if (typeof e.selectionStart != "undefined")return new s(e);
            var t = e.tagName.toLowerCase()
        }
        if (!t || t !== "textarea" && t !== "input") {
            if (r.getSelection)return new o;
            if (document.selection)return new o(!0);
            throw"your browser is very weired"
        }
        return new s(e, !0)
    };
    i.version = "0.9.0", typeof n != "undefined" ? n.exports = i : r.selection = i, s.prototype.text = function (e, t) {
        var n = this.element, r = this.cursor();
        return typeof e == "undefined" ? n.value.slice(r[0], r[1]) : h(this, e, r[0], r[1], t)
    }, s.prototype.append = function (e, t) {
        var n = this.cursor()[1];
        return h(this, e, n, n, t)
    }, s.prototype.prepend = function (e, t) {
        var n = this.cursor()[0];
        return h(this, e, n, n, t)
    }, s.prototype.surround = function (e) {
        typeof e == "undefined" && (e = 1);
        var t = this.element.value, n = this.cursor(), r = t.slice(Math.max(0, n[0] - e), n[0]), i = t.slice(n[1], n[1] + e);
        return[r, i]
    }, s.prototype.line = function () {
        var e = this.element.value, t = this.cursor(), n = e.slice(0, t[0]).lastIndexOf("\n"), r = e.slice(t[1]).indexOf("\n"), i = n + 1;
        if (r === -1)return e.slice(i);
        var s = t[1] + r;
        return e.slice(i, s)
    };
    var u = Object.prototype.toString, a = Array.isArray;
    a || (a = function (e) {
        return u.call(e) === "[object Array]"
    });
    var f = function (e) {
        return u.call(e) === "[object Function]"
    }
});
