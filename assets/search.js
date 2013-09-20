(function(e, t, n) {
    "$:nomunge";
    function f(e) {
        e = e || location.href;
        var t = e.indexOf("#");
        return t===-1 ? "#" : e.substr(t)
    }
    var r = "hashchange", i = document, s, o = e.event.special, u = i.documentMode, a = "on" + r in t && (u === n || u > 7);
    e.fn[r] = function(e) {
        return e ? this.bind(r, e) : this.trigger(r)
    }, e.fn[r].delay = 50, o[r] = e.extend(o[r], {
        setup: function() {
            if (a)
                return !1;
            e(s.start)
        },
        teardown: function() {
            if (a)
                return !1;
            e(s.stop)
        }
    }), s = function() {
        function p() {
            var n = f(), i = h(u);
            n !== u ? (c(u = n, i), e(t).trigger(r)) : i !== u && (location.href = location.href.replace(/#.*/, "") + i), o = setTimeout(p, e.fn[r].delay)
        }
        var s = {}, o, u = f(), l = function(e) {
            return e
        }, c = l, h = l;
        return s.start = function() {
            o || p()
        }, s.stop = function() {
            o && clearTimeout(o), o = n
        }, t.attachEvent&&!t.addEventListener&&!a && function() {
            var t, n;
            s.start = function() {
                t || (n = e.fn[r].src, n = n && n + f(), t = e('<iframe tabindex="-1" title="empty"/>').hide().one("load", function() {
                    n || c(f()), p()
                }).attr("src", n || "javascript:0").insertAfter("body")[0].contentWindow, i.onpropertychange = function() {
                    try {
                        event.propertyName === "title" && (t.document.title = i.title)
                    } catch (e) {}
                })
            }, s.stop = l, h = function() {
                return f(t.location.href)
            }, c = function(n, s) {
                var o = t.document, u = e.fn[r].domain;
                n !== s && (o.title = i.title, o.open(), u && o.write('<script>document.domain="' + u + '"</script>'), o.close(), t.location.hash = n)
            }
        }(), s
    }()
})(jQuery, this), function(e) {
    function s(e) {
        return String(e).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    }
    var t = function(e) {
        var t, n, r = {};
        if (e === "")
            return {};
        for (t = 0; t < e.length; t += 1)
            n = e[t].split("="), n.length === 2 && (r[n[0]] = decodeURIComponent(n[1].replace(/\+/g, " ")));
        return r
    };
    e.queryParams = function() {
        return t(window.location.search.substr(1).split("&"))
    }, e.hashParams = function() {
        return t(window.location.hash.substr(1).split("&"))
    }, window.Swiftype = window.Swiftype || {}, Swiftype.root_url = Swiftype.root_url || "https://api.swiftype.com", Swiftype.pingUrl = function(e, t) {
        var n = new Image;
        return n.onload = n.onerror = t, n.src = e, setTimeout(t, 350), !1
    }, Swiftype.pingSearchResultClick = function(t, n, r) {
        var i = {
            t: (new Date).getTime(),
            engine_key: t,
            doc_id: n,
            q: Swiftype.currentQuery
        }, s = Swiftype.root_url + "/api/v1/public/analytics/pc?" + e.param(i);
        Swiftype.pingUrl(s, r)
    }, e.fn.swiftypeSearch = function(t) {
        var t = e.extend({}, e.fn.swiftypeSearch.defaults, t);
        return this.each(function() {
            var r = e(this), i = e.meta ? e.extend({}, t, r.data()): t;
            r.data("swiftype-config", i), r.selectedCallback = function(t) {
                return function(n) {
                    var r = e(this);
                    n.preventDefault(), Swiftype.pingSearchResultClick(i.engineKey, t.id, function() {
                        window.location = r.attr("href")
                    })
                }
            }, r.registerResult = function(t, n) {
                t.data("swiftype-item", n), e("a", t).click(r.selectedCallback(n))
            }, r.getContentCache = function() {
                return e("#" + u)
            };
            var s = e(i.resultContainingElement), o = s.html(), u = "st-content-cache", a = r.getContentCache(), f = function(e, t) {
                location.hash = "stq=" + encodeURIComponent(e) + "&stp=" + t
            }, l = function(t, n) {
                function f(e) {
                    if (e !== undefined) {
                        var t = e;
                        return typeof t == "function" && (t = t.call()), t
                    }
                    return undefined
                }
                n = e.extend({
                    page: 1
                }, n);
                var r = {};
                a.length || (s.after("<div id='" + u + "' style='display: none;'></div>"), a.html(o).hide()), i.loadingFunction(t, s), Swiftype.currentQuery = t, r.q = t, r.engine_key = i.engineKey, r.page = n.page, r.per_page = i.perPage, r.search_fields = f(i.searchFields), r.fetch_fields = f(i.fetchFields), r.filters = f(i.filters), r.document_types = f(i.documentTypes), r.functional_boosts = f(i.functionalBoosts), r.sort_field = f(i.sortField), r.sort_direction = f(i.sortDirection), e.getJSON(Swiftype.root_url + "/api/v1/public/engines/search.json?callback=?", r).success(h)
            };
            e(window).hashchange(function() {
                var t = e.hashParams();
                if (t.stq)
                    l(t.stq, {
                        page: t.stp
                    });
                else {
                    var n = r.getContentCache();
                    n.length && (s.html(n.html()), n.remove())
                }
            });
            var c = r.parents("form");
            c && c.bind("submit", function(e) {
                e.preventDefault();
                var t = r.val();
                f(t, 1)
            }), e(document).on("click", "[data-hash][data-page]", function(t) {
                t.preventDefault();
                var n = e(this);
                f(e.hashParams().stq, n.data("page"))
            });
            var h = function(t) {
                s.html(""), r.getContext().config.top_pagination && n(r.getContext(), t.info);
                var o = e("<div class='st-results-wrap'></div>").appendTo(r.getContext().resultContainer);
                t.info.page.total_result_count === 0 && o.addClass("no-results").html("Oops, we can't find <mark>" + t.info.page.query + "</mark>!<br/> Have you <a href='/posts'>browsed the archives</a>?"), typeof i.preRenderFunction == "function" && i.preRenderFunction.call(r, t), e.each(t.records, function(t, n) {
                    e.each(n, function(n, s) {
                        r.registerResult(e(i.renderFunction(t, s)).appendTo(o), s)
                    })
                }), r.getContext().config.bottom_pagination && n(r.getContext(), t.info)
            };
            r.getContext = function() {
                return {
                    config: i,
                    resultContainer: s,
                    registerResult: r.registerResult
                }
            }, e(window).hashchange()
        })
    };
    var n = function(t, n) {
        var i, s =- 1;
        e.each(n, function(e, t) {
            t.num_pages > s && (i = e, s = t.num_pages)
        });
        var o = n[i].current_page, u = n[i].num_pages;
        e(r(i, o, u)).appendTo(t.resultContainer)
    }, r = function(e, t, n) {
        var r = '<div class="st-page">', i, s;
        return t != 1 && (i = t-1, r = r + '<a href="#" class="st-prev" data-hash="true" data-page="' + i + '"><i></i>Previous</a>'), t < n && (s = t + 1, r = r + '<a href="#" class="st-next" data-hash="true" data-page="' + s + '">Next<i></i></a>'), r += "</div>", r
    }, i = function(t) {
        return e.trim(t).toLowerCase()
    }, o = function(e, t) {
        return '<div class="st-result"><h3 class="title"><a href="' + t.url + '" class="st-search-result-link">' + s(t.title) + "</a></h3></div>"
    }, u = function(e, t) {
        t.html('<p class="st-loading-message">Searching...</p>')
    };
    e.fn.swiftypeSearch.defaults = {
        attachTo: undefined,
        documentTypes: undefined,
        filters: undefined,
        engineKey: undefined,
        searchFields: undefined,
        functionalBoosts: undefined,
        sortField: undefined,
        sortDirection: undefined,
        fetchFields: undefined,
        preRenderFunction: undefined,
        loadingFunction: u,
        renderFunction: o,
        perPage: 10,
        bottom_pagination: !0,
        top_pagination: !1,
        no_results_text: "Oops, we couldn't find what you were looking for."
    }
}(jQuery);

