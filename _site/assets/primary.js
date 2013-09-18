/*! pstam-blog - v1.0 - 2013-09-02 */
/*
 * The original header remains the same above. From Paul Stamatiou, @Stammy,
 * http://paulstamatiou.com.
 *
 * Original file name "pstambuild-v9.js"
 *
 * Any changes will be referenced by comments below. Original copyright to Paul.
 */

(function(e, t) {
    function n() {}
    function r(e, t) {
        if (e) {
            "object" == typeof e && (e = [].slice.call(e));
            for (var n = 0, r = e.length; n < r; n++)
                t.call(e, e[n], n)
        }
    }
    function i(e, n) {
        var r = Object.prototype.toString.call(n).slice(8, -1);
        return n !== t && null !== n && r === e
    }
    function s(e) {
        return i("Function", e)
    }
    function o(e) {
        e = e || n, e._done || (e(), e._done = 1)
    }
    function u(e) {
        var t = {};
        if ("object" == typeof e)
            for (var n in e)
                e[n] && (t = {
                    name: n,
                    url: e[n]
                });
        else 
            t = e.split("/"), t = t[t.length-1], n = t.indexOf("?"), t = {
            name: -1 !== n ? t.substring(0, n): t,
            url: e
        };
        return (e = g[t.name]) && e.url === t.url ? e : g[t.name] = t
    }
    function a(e) {
        var e = e || g, t;
        for (t in e)
            if (e.hasOwnProperty(t) && e[t].state !== N)
                return !1;
        return !0
    }
    function f(e, t) {
        t = t || n, e.state === N ? t() : e.state === T ? S.ready(e.name, t) : e.state === x ? e.onpreload.push(function() {
            f(e, t)
        }) : (e.state = T, l(e, function() {
            e.state = N, t(), r(m[e.name], function(e) {
                o(e)
            }), w && a() && r(m.ALL, function(e) {
                o(e)
            })
        }))
    }
    function l(t, r) {
        var r = r || n, i;
        /\.css[^\.]*$/.test(t.url) ? (i = p.createElement("link"), i.type = "text/" + (t.type || "css"), i.rel = "stylesheet", i.href = t.url) : (i = p.createElement("script"), i.type = "text/" + (t.type || "javascript"), i.src = t.url), i.onload = i.onreadystatechange = function(t) {
            t = t || e.event;
            if ("load" === t.type || /loaded|complete/.test(i.readyState) && (!p.documentMode || 9 > p.documentMode))
                i.onload = i.onreadystatechange = i.onerror = null, r()
        }, i.onerror = function() {
            i.onload = i.onreadystatechange = i.onerror = null, r()
        }, i.async=!1, i.defer=!1;
        var s = p.head || p.getElementsByTagName("head")[0];
        s.insertBefore(i, s.lastChild)
    }
    function c() {
        p.body ? w || (w=!0, r(d, function(e) {
            o(e)
        })) : (e.clearTimeout(S.readyTimeout), S.readyTimeout = e.setTimeout(c, 50))
    }
    function h() {
        p.addEventListener ? (p.removeEventListener("DOMContentLoaded", h, !1), c()) : "complete" === p.readyState && (p.detachEvent("onreadystatechange", h), c())
    }
    var p = e.document, d = [], v = [], m = {}, g = {}, y = "async"in p.createElement("script") || "MozAppearance"in p.documentElement.style || e.opera, b, w, E = e.head_conf && e.head_conf.head || "head", S = e[E] = e[E] || function() {
        S.ready.apply(null, arguments)
    }, x = 1, T = 3, N = 4;
    S.load = y ? function() {
        var e = arguments, t = e[e.length-1], n = {};
        return s(t) || (t = null), r(e, function(r, i) {
            r !== t && (r = u(r), n[r.name] = r, f(r, t && i === e.length-2 ? function() {
                a(n) && o(t)
            } : null))
        }), S
    } : function() {
        var e = arguments, n = [].slice.call(e, 1), i = n[0];
        return b ? (i ? (r(n, function(e) {
            if (!s(e)) {
                var n = u(e);
                n.state === t && (n.state = x, n.onpreload = [], l({
                    url : n.url, type : "cache"
                }, function() {
                    n.state = 2, r(n.onpreload, function(e) {
                        e.call()
                    })
                }))
            }
        }), f(u(e[0]), s(i) ? i : function() {
            S.load.apply(null, n)
        })) : f(u(e[0])), S) : (v.push(function() {
            S.load.apply(null, e)
        }), S)
    }, S.js = S.load, S.test = function(e, t, r, s) {
        return e = "object" == typeof e ? e : {
            test: e,
            success: t ? i("Array", t) ? t: [t]: !1,
            failure: r ? i("Array", r) ? r: [r]: !1,
            callback: s || n
        }, (t=!!e.test) && e.success ? (e.success.push(e.callback), S.load.apply(null, e.success)) : !t && e.failure ? (e.failure.push(e.callback), S.load.apply(null, e.failure)) : s(), S
    }, S.ready = function(e, t) {
        if (e === p)
            return w ? o(t) : d.push(t), S;
        s(e) && (t = e, e = "ALL");
        if ("string" != typeof e ||!s(t))
            return S;
        var n = g[e];
        return n && n.state === N || "ALL" === e && a() && w ? (o(t), S) : ((n = m[e]) ? n.push(t) : m[e] = [t], S)
    }, S.ready(p, function() {
        a() && r(m.ALL, function(e) {
            o(e)
        }), S.feature && S.feature("domloaded", !0)
    });
    if ("complete" === p.readyState)
        c();
    else if (p.addEventListener)
        p.addEventListener("DOMContentLoaded", h, !1), e.addEventListener("load", c, !1);
    else {
        p.attachEvent("onreadystatechange", h), e.attachEvent("onload", c);
        var C=!1;
        try {
            C = null == e.frameElement && p.documentElement
        } catch (k) {}
        C && C.doScroll && function L() {
            if (!w) {
                try {
                    C.doScroll("left")
                } catch (t) {
                    e.clearTimeout(S.readyTimeout), S.readyTimeout = e.setTimeout(L, 50);
                    return 
                }
                c()
            }
        }()
    }
    setTimeout(function() {
        b=!0, r(v, function(e) {
            e()
        })
    }, 300)
})(window), function(e, t) {
    var n = e.jQuery || e.Cowboy || (e.Cowboy = {}), r;
    n.throttle = r = function(e, r, i, s) {
        function a() {
            function p() {
                u =+ (new Date), i.apply(n, l)
            }
            function v() {
                o = t
            }
            var n = this, a =+ (new Date) - u, l = arguments;
            s&&!o && p(), o && clearTimeout(o), s === t && a > e ? p() : r!==!0 && (o = setTimeout(s ? v : p, s === t ? e - a : e))
        }
        var o, u = 0;
        return typeof r != "boolean" && (s = i, i = r, r = t), n.guid && (a.guid = i.guid = i.guid || n.guid++), a
    }, n.debounce = function(e, n, i) {
        return i === t ? r(e, n, !1) : r(e, i, n!==!1)
    }
}(this), function(e) {
    function h() {
        r.setAttribute("content", o), u=!0
    }
    function p() {
        r.setAttribute("content", s), u=!1
    }
    function d(t) {
        c = t.accelerationIncludingGravity, a = Math.abs(c.x), f = Math.abs(c.y), l = Math.abs(c.z), (!e.orientation || e.orientation === 180) && (a > 7 || (l > 6 && f < 8 || l < 8 && f > 6) && a > 5) ? u && p() : u || h()
    }
    var t = navigator.userAgent;
    if (!(/iPhone|iPad|iPod/.test(navigator.platform) && /OS [1-5]_[0-9_]* like Mac OS X/i.test(t) && t.indexOf("AppleWebKit")>-1))
        return;
    var n = e.document;
    if (!n.querySelector)
        return;
    var r = n.querySelector("meta[name=viewport]"), i = r && r.getAttribute("content"), s = i + ",maximum-scale=1", o = i + ",maximum-scale=10", u=!0, a, f, l, c;
    if (!r)
        return;
    e.addEventListener("orientationchange", h, !1), e.addEventListener("devicemotion", d, !1)
}(this), this.Stammy = {}, $(function() {
    var e, t, n, r, i, s, o, u;
    navigator.userAgent.match(/(iPhone|iPod|iPad)/i) && head.js("http://turbo.paulstamatiou.com/assets/fastclick.min.js", function() {
        return window.addEventListener("load", function() {
            return new FastClick(document.body)
        }, !1)
    }), window.matchMedia("only screen and (min-width: 740px)").matches && $(window).scroll($.throttle(150, function() {
        return window.scrollY > 130 ? ($(".home").addClass("fixed"), $("#progress-bar-container").find(".stammy-bar").show()) : ($(".home").removeClass("fixed"), $("#progress-bar-container").find(".stammy-bar").hide())
    })), document.addEventListener("touchstart", function() {}, !1), $("pre").each(function(e) {
        var t, n;
        t = $(this).prop("scrollHeight");
        if (t > 250)
            return n = $("<div class='expand_code_wrap'><a href='javascript:void(0)' class='expand_code'>Expand Code</a></div>"), $(this).parent().prepend(n), n.data("scrollheight", t).next().css("max-height", "250px")
    }), $(".expand_code").length > 0 && $(".expand_code").on("click", function() {
        var e = this;
        return $(this).fadeOut(100, function() {
            var t;
            return t = $(e).parent().data("scrollheight") + 10, $(e).parent().next().animate({
                height: t,
                "max-height": t
            }, 150, function() {})
        })
    }), $("#tweet_compose_close").on("click", function(e) {
        return $("#tweet_it_bro").addClass("fallout")
    }), $("#post, #postex").length && (u = $("#tweet_it_bro"), t = function() {
        return u.fadeIn(), !function(e, t, n) {
            var r, i, s;
            i = void 0, r = e.getElementsByTagName(t)[0], s = /^http:/.test(e.location) ? "http" : "https";
            if (!e.getElementById(n))
                return i = e.createElement(t), i.id = n, i.src = s + "://platform.twitter.com/widgets.js", r.parentNode.insertBefore(i, r)
        }(document, "script", "twitter-wjs")
    }, o = function() {
        var e;
        e = $(window).scrollTop() / $(document).height() * 100;
        if (e > 50 && u.not(":visible"))
            return t();
        if (e < 35 && u.is(":visible"))
            return u.addClass("fallout").delay(500).queue(function(e) {
                return $(this).removeClass("fallout").hide(), e()
            })
    }, window.matchMedia("only screen and (min-width: 400px)").matches && ($(window).scroll($.throttle(250, o)), o())), e = function() {
        return this.wrap_el = $("#progress-bar-container"), this.wrap_el.append("<span class='stammy-bar'></span>"), this.bar_el = $("#progress-bar-container").find(".stammy-bar"), this.init()
    }, e.prototype.init = function() {
        var e, t, n = this;
        return this.calculate(), this.manualScroll(), e = $.throttle(50, function() {
            return n.calculate(), n.manualScroll()
        }), $(window).resize(e), t = $.throttle(50, function() {
            return n.manualScroll()
        }), $(window).scroll(t)
    }, e.prototype.manualScroll = function() {
        var e, t;
        return e = ($(window).height() + $(window).scrollTop()) / this._contentHeight, t = e * this._scrollBarMaxWidth, t > this._scrollBarMaxWidth-15 && (t = this._scrollBarMaxWidth), t < 0 && (t = 0), e > .97 ? this.bar_el.css("background", "blue") : e < .97 && this.bar_el.css("background", "red"), this.bar_el.stop().animate({
            width: t + "px"
        }, 100)
    }, e.prototype.calculate = function() {
        return this._scrollBarMaxWidth = $(window).width(), this._contentHeight = $("#site").offset().top + $("#site").height()
    }, $(window).bind("load", function() {
        if ($("#postex").hasClass("is-post"))
            return new e
    }), $("#search").on("click", function() {
        var e, t, n, r;
        return n = $("#st-search-input"), r = $("<div/>", {
            id: "st-results-container"
        }).prependTo("#site"), t = $("#searchbar").fadeIn(200), e = $("#headernav li").hide(), head.js("http://turbo.paulstamatiou.com/assets/pstamsearch-v2.js", function() {
            return n.swiftypeSearch({
                resultContainingElement: "#st-results-container",
                engineKey: "gRm246AMPjhYZctCaoch",
                top_pagination: !0,
                perPage: 15
            }), n.focus(), r.fadeIn()
        }), $(document).keyup(function(n) {
            if (n.keyCode === 27)
                return t.hide(), e.fadeIn(150), r.slideUp(150), history.pushState("", document.title, window.location.pathname + window.location.search)
        }), $("#st-close").on("click", function() {
            return t.hide(), e.fadeIn(150), r.slideUp(150), history.pushState("", document.title, window.location.pathname + window.location.search)
        }), n.keypress(function() {
            return $("#st-cancel").css("display", "inline-block").on("click", function() {
                return $(this).hide(), n.val("").focus(), r.empty(), history.pushState("", document.title, window.location.pathname + window.location.search)
            })
        })
    });
    if ($("#photo_blog").length)
        return n = "{{site.categories.photo.first.url}}", r = "{{site.categories.photo.last.url}}", i = $("#arrow_r").attr("href"), i === undefined && (i = r), s = $("#arrow_l").attr("href"), i === undefined && (i = n), $(window).resize($.throttle(100, function() {
        var e;
        if (700 > $(window).height()&&!(478 > $(window).height()))
            return 800 > $(window).width() ? $("#primary_img").css("max-height", "auto").css("max-width", "100%") : (e = $(window).height()-105, $("#primary_img").css("max-height", e + "px").css("width", "auto"))
    })).trigger("resize"), $("#primary_img").on("click", function() {
        return window.location = i
    }), $(document).on("keyup", function(e) {
        e.keyCode === 37 && (window.location = s);
        if (e.keyCode === 39)
            return window.location = i
    })
});

