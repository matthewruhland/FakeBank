(function () {
    /*
     Copyright (c) 2018 Glance Networks, Inc.
    */
    var l;
    window.GLANCE = window.GLANCE || {};
    window.GLANCE.VERSION = "4.6.0.16";
    window.GLANCE.PATCH = "";
    var m = navigator.userAgent.toLowerCase(),
        q = m.match(/(edge)[\s\/:]([\w\d\.]+)?/) || m.match(/(opera|ie|firefox|chrome|version)[\s\/:]([\w\d\.]+)?.*?(safari|version[\s\/:]([\w\d\.]+)|$)/) || m.match(/(rv):([\w\d\.]+)/) || [null, "unknown", 0];
    "rv" === q[1] && (q[1] = "ie");
    void 0 === l && (l = function (a) {
        return JSON.stringify(a)
    });

    function t(a, d, c) {
        window.addEventListener(a, d, c)
    }

    function u(a, d, c) {
        var e = {};
        e[d] = c;
        a.postMessage(e, "*")
    }

    function w(a, d) {
        window.addEventListener("message", function (c) {
            var e;
            if ("string" === typeof c.data) try {
                e = JSON.parse(c.data)
            } catch (z) {
                return !1
            } else e = c.data;
            void 0 !== e[a] && d(c.source, e[a])
        })
    }
    window.Sarissa && Sarissa._SARISSA_IS_IE && new window.XMLHttpRequest;

    function y(a, d) {
        this.name = a;
        var c;
        if (!(c = d)) {
            var e = new A(window);
            c = e.b.location.hostname;
            for (e = e.b;
                "" === c && e.parent !== e;) c = e.parent.location.hostname, e = e.parent;
            c = B(c)
        }
        this.domain = c
    }
    y.prototype.g = function () {
        var a = this.get();
        return a ? JSON.parse(a) : null
    };
    y.prototype.get = function () {
        return this.c() ? unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(this.name).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1")) : null
    };
    y.prototype.f = function () {
        var a = new Date;
        a.setDate(a.getDate() - 1);
        document.cookie = escape(this.name) + "=; expires=" + a.toGMTString() + "; domain=" + this.domain + "; path=/"
    };
    y.prototype.c = function () {
        return (new RegExp("(?:^|;\\s*)" + escape(this.name).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie)
    };

    function F(a) {
        this.name = a
    }
    F.prototype.g = function () {
        if (!this.c()) return null;
        var a = localStorage.getItem(this.name);
        return JSON.parse(a)
    };
    F.prototype.get = function () {
        return this.c() ? localStorage.getItem(this.name) : null
    };
    F.prototype.f = function () {
        localStorage.removeItem(this.name);
        localStorage.removeItem(this.name + "_exp")
    };
    F.prototype.c = function () {
        var a = localStorage.getItem(this.name + "_exp");
        if (!a) return !1;
        a = new Date(a);
        return a < new Date ? (this.f(), !1) : !0
    };

    function G(a, d) {
        this.a = [new y(a, d), new F(a)]
    }
    G.prototype.g = function () {
        return this.a[0].g() || this.a[1].g()
    };
    G.prototype.get = function () {
        return this.a[0].get() || this.a[1].get()
    };
    G.prototype.f = function () {
        this.a[0].f();
        this.a[1].f()
    };
    G.prototype.c = function () {
        return this.a[0].c() || this.a[1].c()
    };

    function A(a) {
        this.a = a.document;
        this.b = a;
        var d = [
            ["hidden", "visibilitychange"],
            ["mozHidden", "mozvisibilitychange"],
            ["webkitHidden", "webkitvisibilitychange"],
            ["msHidden", "msvisibilitychange"],
            ["oHidden", "ovisibilitychange"]
        ];
        for (a = 0; a < d.length && !(d[a][0] in document); a++);
    }

    function B(a) {
        var d = new RegExp(/^(?:[a-z]{1,5}:\/\/|)([^\:\?\/]*)/),
            c = a.match(/^\d+\.\d+.\d+.\d+$/),
            d = d.exec(a);
        if (c) return a;
        if (null === d || 2 !== d.length) return "about:" !== a && H("ERR_DOMAINPARSE: " + a), null;
        c = d[1].split(".");
        return 1 === c.length ? (H("ERR_DOMAINPARSE: " + a), null) : 2 === c.length ? c.join(".") : 3 === c.length ? c.slice(1).join(".") : 4 >= c[c.length - 2].length ? c.slice(c.length - 3).join(".") : c.slice(c.length - 2).join(".")
    }
    A.prototype.getElementsByTagName = function (a) {
        return this.a.getElementsByTagName(a)
    };

    function I(a, d, c) {
        var e = a.a.createElement("script");
        c && e.addEventListener("load", c);
        e.setAttribute("type", "text/javascript");
        e.setAttribute("charset", "UTF-8");
        for (c = 0; c < d.length; c++) e.setAttribute(d[c][0], d[c][1]);
        a.a.head.appendChild(e)
    }
    A.prototype.head = function () {
        return void 0 !== this.a.head ? this.a.head : this.getElementsByTagName("head")[0]
    };

    function J(a, d) {
        a.b.addEventListener && (document.readyState.match(/complete/) ? d() : (a.b.addEventListener("load", d), a.a.addEventListener("DOMContentLoaded", d, !1)))
    }
    A.prototype.addEventListener = function (a, d, c) {
        this.a.addEventListener(a, d, c)
    };
    A.prototype.removeEventListener = function (a, d, c) {
        this.a.removeEventListener(a, d, c)
    };

    function H(a) {
        window.console && window.console.log && window.console.log(a)
    }

    function K() {
        this.listeners = this.a = {}
    };

    function L(a, d) {
        var c;
        a && (c = c || Object.keys(a), c.forEach(function (c) {
            void 0 !== a[c] && (d[c] = a[c])
        }))
    }

    function P(a) {
        var d = {};
        if (!a) return d;
        var c = 0;
        for (a = a.attributes; c < a.length; c++) {
            var e = a[c].nodeName.match(/data-(.*)/);
            e && 2 === e.length && (d[e[1]] = a[c].nodeValue)
        }
        return d
    }

    function Q() {
        var a = window.GLANCE_COBROWSE ? window.GLANCE_COBROWSE : {},
            d = document.getElementById("glance-cobrowse"),
            c = P(document.getElementById("cobrowsescript")),
            d = P(d);
        L(c, a);
        L(d, a);
        return a
    };
    var R = ["4", "6", "0", "16"].slice(0, 3).join(".") + "M";

    function S() {
        this.a = document.getElementById("cobrowsescript") || document.getElementById("glance-cobrowse");
        if (null !== this.a) {
            var a = Q();
            L(a, this);
            var d = /\/\/(.*)\//.exec("string" === typeof this.a.src ? this.a.src : a.scriptserver + "/");
            this.i = d && 2 === d.length ? d[1] : "www.glancecdn.net/cobrowse";
            this.i = this.i.replace("/js", "");
            d = (a.oninit || "").split(":");
            this.j = a.groupid || this.a.getAttribute("groupid");
            this.A = a.ws || this.a.getAttribute("ws") || "www.glance.net";
            this.A.match("\\.glance\\.net$");
            this.w = a.ui;
            this.b = {
                h: d[0],
                B: d[1]
            };
            this.v = a.site || this.a.getAttribute("site") || "production";
            this.o = JSON.parse(a.inputevents || "{}");
            this.s = a.presence;
            if (!this.j) throw Error("data-groupid missing");
            a = a.additionalgroupids || "";
            this.l = [this.j].concat(a ? a.split(",") : []);
            this.l = this.l.map(function (a) {
                if (!parseInt(a)) throw Error("data-groupid invalid: " + a);
                return parseInt(a)
            });
            if (!/staging|production/i.test(this.v)) throw Error("data-site invalid");
        }
    };
    window.GLANCE = window.GLANCE || {};
    window.GLANCE.Cobrowse = window.GLANCE.Cobrowse || {};

    function T() {
        function a() {
            if (g.b.h) {
                var a = new G("glance_ssn_info");
                a.g() && ("abandonsession" === g.b.h ? a.f() : "continuesession" === g.b.h && g.b.B !== a.g().ssnid && a.f())
            }
        }

        function d(a) {
            function c(a, c, d) {
                return function (f) {
                    if (f.keyCode === c && f[a + "Key"] && (f = d.match(/showButton|toggleButton|showTerms/) ? "VisitorUI" : "Visitor", !M(f, d))) window.GLANCE.Cobrowse[f][d]()
                }
            }
            for (var d in a)
                if (a.hasOwnProperty(d)) {
                    var f = d.match(/(ctrl|alt|shift)-(\d*)/);
                    !f || 3 > f.length || t("keydown", c(f[1], parseInt(f[2]), a[d]), !0)
                }
        }

        function c() {
            var a =
                document.body;

            function c(a) {
                return function (c) {
                    var d = a.match(/showButton|toggleButton|showTerms/) ? "VisitorUI" : "Visitor";
                    c.stopPropagation();
                    c.preventDefault();
                    if (!M(d, a)) h[d][a]()
                }
            } ["glance_button", "data-glancebutton"].forEach(function (d) {
                for (var f = a.querySelectorAll("[" + d + "]"), e = 0; f && e < f.length; e++) {
                    var C = f[e].getAttribute(d);
                    "start" === C && (C = "startSession");
                    f[e].addEventListener("click", c(C))
                }
            })
        }

        function e() {
            return h.Visitor
        }

        function z(a, c) {
            h[c][a] = function (d) {
                n(function () {
                    h[c][a](d)
                }, c)
            }
        }

        function M(a,
            c) {
            if (!p) return !1;
            u(window.top, "forwardevent", {
                namespace: a,
                funcname: c
            });
            return !0
        }

        function n(a, c) {
            c = c || "Visitor";
            if (r.a.getElementById(("glance_" + c).toLowerCase())) h[c].loaded ? a && a() : a && H("SCRIPT_NOT_LOADED:" + c);
            else if (a && (N._onload[c] = a), p || "Visitor" !== c || g.w || n(null, "VisitorUI"), I(r, [
                    ["id", ("glance_" + c).toLowerCase()],
                    ["src", D + "/GlanceCobrowse" + c + "_" + E + ".js"]
                ]), "Visitor" === c) {
                var d, f = document.getElementsByTagName("iframe");
                for (d = 0; d < f.length; d++) f[d].contentWindow && u(f[d].contentWindow, "glance_load", {
                    m: !0
                })
            }
        }
        if (window.localStorage && window.XMLHttpRequest && window.atob) {
            if (!window.addEventListener) return null;
            var p = window.parent !== window,
                r = new A(window),
                O = !1,
                g = new S,
                E = R,
                h = window.GLANCE.Cobrowse,
                D = "//" + g.i + "/js";
            p || a();
            var v = new K;
            if (h.Loader) H("ERR_DUP_SCRIPTS");
            else {
                var N = {
                    load: function (a) {
                        n(a)
                    },
                    loadScript: function (a, c) {
                        I(r, [
                            ["src", D + "/" + a + "_" + E + ".js"]
                        ], c)
                    },
                    _eventListeners: v,
                    _onload: {},
                    _origpath: window.location.pathname
                };
                w("glance_load", function (a, c) {
                    a !== window.parent && a.parent !== window ? H("UNTRUSTED_LOAD_MSG") :
                        (c.m && n(), c.u && null !== r.a.getElementById("glance_visitor") && u(a, "glance_load", {
                            m: !0
                        }))
                });
                p && u(window.parent, "glance_load", {
                    u: !0
                });
                window.addEventListener("message", function (a) {
                    if ("string" !== typeof a.data) {
                        if (e().loaded) return !0;
                        a.data.glance_invoke && (a.data.origin = a.origin, n(function () {
                            window.postMessage(a.data, window.location.href)
                        }))
                    }
                });
                t("focus", function () {
                    if (e().loaded) return !0;
                    e().inSession() && n()
                });
                h.Visitor = {
                    loaded: !1,
                    inSession: function () {
                        return (new G("glance_ssn_info")).c()
                    },
                    addEventListener: function (a,
                        c) {
                        v.a[a] = v.a[a] || [];
                        v.a[a].push(c)
                    },
                    removeEventListener: function (a, c) {
                        var d, e = v.a[a];
                        void 0 !== e && (d = e.indexOf(c), 0 <= d && e.splice(d, 1))
                    }
                };
                var x = ["showButton", "toggleButton", "showTerms", "setStyle"];
                p || (h.VisitorUI = {}, x.forEach(function (a) {
                    z(a, "VisitorUI")
                }));
                x = x.concat(["startSession", "setStartParams"]);
                x.forEach(function (a) {
                    z(a, "Visitor")
                });
                h.Loader = N;
                p || !(e().inSession() || 0 < window.location.href.indexOf("GlanceSession=1") || "continuesession" === g.b.h) || n();
            }
            document.getElementById("cobrowsescript") || document.getElementById("glance-cobrowse") ? T() : (H("LOADER_PAGE_NOT_READY"), J(new A(window), T));
        }
    }
}).call(window);