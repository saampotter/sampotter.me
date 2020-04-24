/*!
 * ScrollToPlugin 3.2.6
 * https://greensock.com
 *
 * @license Copyright 2020, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
 */

!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? e(exports)
    : "function" == typeof define && define.amd
    ? define(["exports"], e)
    : e(((t = t || self).window = t.window || {}));
})(this, function (t) {
  "use strict";
  function k() {
    return "undefined" != typeof window;
  }
  function l() {
    return e || (k() && (e = window.gsap) && e.registerPlugin && e);
  }
  function m(t) {
    return "string" == typeof t;
  }
  function n(t, e) {
    var o = "x" === e ? "Width" : "Height",
      n = "scroll" + o,
      r = "client" + o;
    return t === x || t === s || t === f
      ? Math.max(s[n], f[n]) - (x["inner" + o] || s[r] || f[r])
      : t[n] - t["offset" + o];
  }
  function o(t, e) {
    var o = "scroll" + ("x" === e ? "Left" : "Top");
    return (
      t === x &&
        (null != t.pageXOffset
          ? (o = "page" + e.toUpperCase() + "Offset")
          : (t = null != s[o] ? s : f)),
      function () {
        return t[o];
      }
    );
  }
  function p(t, e) {
    var n = a(t)[0].getBoundingClientRect(),
      r = !e || e === x || e === f,
      i = r
        ? {
            top:
              s.clientTop - (x.pageYOffset || s.scrollTop || f.scrollTop || 0),
            left:
              s.clientLeft -
              (x.pageXOffset || s.scrollLeft || f.scrollLeft || 0),
          }
        : e.getBoundingClientRect(),
      l = { x: n.left - i.left, y: n.top - i.top };
    return !r && e && ((l.x += o(e, "x")()), (l.y += o(e, "y")())), l;
  }
  function q(t, e, o, r) {
    return isNaN(t) || "object" == typeof t
      ? m(t) && "=" === t.charAt(1)
        ? parseFloat(t.substr(2)) * ("-" === t.charAt(0) ? -1 : 1) + r
        : "max" === t
        ? n(e, o)
        : Math.min(n(e, o), p(t, e)[o])
      : parseFloat(t);
  }
  function r() {
    (e = l()),
      k() &&
        e &&
        document.body &&
        ((x = window),
        (f = document.body),
        (s = document.documentElement),
        (a = e.utils.toArray),
        e.config({ autoKillThreshold: 7 }),
        (g = e.config()),
        (u = 1));
  }
  var e,
    u,
    x,
    s,
    f,
    a,
    g,
    i = {
      version: "3.2.6",
      name: "scrollTo",
      rawVars: 1,
      register: function register(t) {
        (e = t), r();
      },
      init: function init(t, e, n, i, l) {
        u || r();
        var s = this;
        (s.isWin = t === x),
          (s.target = t),
          (s.tween = n),
          "object" != typeof e
            ? m((e = { y: e }).y) &&
              "max" !== e.y &&
              "=" !== e.y.charAt(1) &&
              (e.x = e.y)
            : e.nodeType && (e = { y: e, x: e }),
          (s.vars = e),
          (s.autoKill = !!e.autoKill),
          (s.getX = o(t, "x")),
          (s.getY = o(t, "y")),
          (s.x = s.xPrev = s.getX()),
          (s.y = s.yPrev = s.getY()),
          null != e.x
            ? (s.add(
                s,
                "x",
                s.x,
                q(e.x, t, "x", s.x) - (e.offsetX || 0),
                i,
                l,
                Math.round
              ),
              s._props.push("scrollTo_x"))
            : (s.skipX = 1),
          null != e.y
            ? (s.add(
                s,
                "y",
                s.y,
                q(e.y, t, "y", s.y) - (e.offsetY || 0),
                i,
                l,
                Math.round
              ),
              s._props.push("scrollTo_y"))
            : (s.skipY = 1);
      },
      render: function render(t, e) {
        for (
          var o,
            r,
            i,
            l,
            s,
            u = e._pt,
            f = e.target,
            p = e.tween,
            a = e.autoKill,
            c = e.xPrev,
            y = e.yPrev,
            d = e.isWin;
          u;

        )
          u.r(t, u.d), (u = u._next);
        (o = d || !e.skipX ? e.getX() : c),
          (i = (r = d || !e.skipY ? e.getY() : y) - y),
          (l = o - c),
          (s = g.autoKillThreshold),
          e.x < 0 && (e.x = 0),
          e.y < 0 && (e.y = 0),
          a &&
            (!e.skipX && (s < l || l < -s) && o < n(f, "x") && (e.skipX = 1),
            !e.skipY && (s < i || i < -s) && r < n(f, "y") && (e.skipY = 1),
            e.skipX &&
              e.skipY &&
              (p.kill(),
              e.vars.onAutoKill &&
                e.vars.onAutoKill.apply(p, e.vars.onAutoKillParams || []))),
          d
            ? x.scrollTo(e.skipX ? o : e.x, e.skipY ? r : e.y)
            : (e.skipY || (f.scrollTop = e.y), e.skipX || (f.scrollLeft = e.x)),
          (e.xPrev = e.x),
          (e.yPrev = e.y);
      },
      kill: function kill(t) {
        var e = "scrollTo" === t;
        (!e && "scrollTo_x" !== t) || (this.skipX = 1),
          (!e && "scrollTo_y" !== t) || (this.skipY = 1);
      },
    };
  (i.max = n),
    (i.getOffset = p),
    (i.buildGetter = o),
    l() && e.registerPlugin(i),
    (t.ScrollToPlugin = i),
    (t.default = i);
  if (typeof window === "undefined" || window !== t) {
    Object.defineProperty(t, "__esModule", { value: !0 });
  } else {
    delete t.default;
  }
});
