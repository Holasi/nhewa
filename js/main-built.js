/**
 * @license almond 0.2.9 Copyright (c) 2011-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */
/*!
 *  howler.js v1.1.25
 *  howlerjs.com
 *
 *  (c) 2013-2014, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */
(function() {
    var e = document.getElementById("gameCanvas"),
        t = e.getContext("2d");
    t.save(), t.fillStyle = "#000000", t.fillRect(0, 0, e.width, e.height), t.restore(), t.save(), t.font = "30px Arial", t.fillStyle = "#ffffff", t.textAlign = "center", t.textBaseline = "middle", t.fillText("Loading", e.width / 2, e.height / 2), t.restore();
    var n, r, i;
    (function(e) {
        function v(e, t) {
            return h.call(e, t)
        }

        function m(e, t) {
            var n, r, i, s, o, u, a, f, c, h, p, v = t && t.split("/"),
                m = l.map,
                g = m && m["*"] || {};
            if (e && e.charAt(0) === ".")
                if (t) {
                    v = v.slice(0, v.length - 1), e = e.split("/"), o = e.length - 1, l.nodeIdCompat && d.test(e[o]) && (e[o] = e[o].replace(d, "")), e = v.concat(e);
                    for (c = 0; c < e.length; c += 1) {
                        p = e[c];
                        if (p === ".") e.splice(c, 1), c -= 1;
                        else if (p === "..") {
                            if (c === 1 && (e[2] === ".." || e[0] === "..")) break;
                            c > 0 && (e.splice(c - 1, 2), c -= 2)
                        }
                    }
                    e = e.join("/")
                } else e.indexOf("./") === 0 && (e = e.substring(2));
            if ((v || g) && m) {
                n = e.split("/");
                for (c = n.length; c > 0; c -= 1) {
                    r = n.slice(0, c).join("/");
                    if (v)
                        for (h = v.length; h > 0; h -= 1) {
                            i = m[v.slice(0, h).join("/")];
                            if (i) {
                                i = i[r];
                                if (i) {
                                    s = i, u = c;
                                    break
                                }
                            }
                        }
                    if (s) break;
                    !a && g && g[r] && (a = g[r], f = c)
                }!s && a && (s = a, u = f), s && (n.splice(0, u, s), e = n.join("/"))
            }
            return e
        }

        function g(t, n) {
            return function() {
                return s.apply(e, p.call(arguments, 0).concat([t, n]))
            }
        }

        function y(e) {
            return function(t) {
                return m(t, e)
            }
        }

        function b(e) {
            return function(t) {
                a[e] = t
            }
        }

        function w(n) {
            if (v(f, n)) {
                var r = f[n];
                delete f[n], c[n] = !0, t.apply(e, r)
            }
            if (!v(a, n) && !v(c, n)) throw new Error("No " + n);
            return a[n]
        }

        function E(e) {
            var t, n = e ? e.indexOf("!") : -1;
            return n > -1 && (t = e.substring(0, n), e = e.substring(n + 1, e.length)), [t, e]
        }

        function S(e) {
            return function() {
                return l && l.config && l.config[e] || {}
            }
        }
        var t, s, o, u, a = {},
            f = {},
            l = {},
            c = {},
            h = Object.prototype.hasOwnProperty,
            p = [].slice,
            d = /\.js$/;
        o = function(e, t) {
            var n, r = E(e),
                i = r[0];
            return e = r[1], i && (i = m(i, t), n = w(i)), i ? n && n.normalize ? e = n.normalize(e, y(t)) : e = m(e, t) : (e = m(e, t), r = E(e), i = r[0], e = r[1], i && (n = w(i))), {
                f: i ? i + "!" + e : e,
                n: e,
                pr: i,
                p: n
            }
        }, u = {
            require: function(e) {
                return g(e)
            },
            exports: function(e) {
                var t = a[e];
                return typeof t != "undefined" ? t : a[e] = {}
            },
            module: function(e) {
                return {
                    id: e,
                    uri: "",
                    exports: a[e],
                    config: S(e)
                }
            }
        }, t = function(t, n, r, i) {
            var s, l, h, p, d, m = [],
                y = typeof r,
                E;
            i = i || t;
            if (y === "undefined" || y === "function") {
                n = !n.length && r.length ? ["require", "exports", "module"] : n;
                for (d = 0; d < n.length; d += 1) {
                    p = o(n[d], i), l = p.f;
                    if (l === "require") m[d] = u.require(t);
                    else if (l === "exports") m[d] = u.exports(t), E = !0;
                    else if (l === "module") s = m[d] = u.module(t);
                    else if (v(a, l) || v(f, l) || v(c, l)) m[d] = w(l);
                    else {
                        if (!p.p) throw new Error(t + " missing " + l);
                        p.p.load(p.n, g(i, !0), b(l), {}), m[d] = a[l]
                    }
                }
                h = r ? r.apply(a[t], m) : undefined;
                if (t)
                    if (s && s.exports !== e && s.exports !== a[t]) a[t] = s.exports;
                    else if (h !== e || !E) a[t] = h
            } else t && (a[t] = r)
        }, n = r = s = function(n, r, i, a, f) {
            if (typeof n == "string") return u[n] ? u[n](r) : w(o(n, r).f);
            if (!n.splice) {
                l = n, l.deps && s(l.deps, l.callback);
                if (!r) return;
                r.splice ? (n = r, r = i, i = null) : n = e
            }
            return r = r || function() {}, typeof i == "function" && (i = a, a = f), a ? t(e, n, r, i) : setTimeout(function() {
                t(e, n, r, i)
            }, 4), s
        }, s.config = function(e) {
            return s(e)
        }, n._defined = a, i = function(e, t, n) {
            t.splice || (n = t, t = []), !v(a, e) && !v(f, e) && (f[e] = [e, t, n])
        }, i.amd = {
            jQuery: !0
        }
    })(), i("requireLib", function() {}), i("j13e/utils/J13Polyfills", ["require", "exports", "module"], function(e, t, n) {
            (function() {
                Function.prototype.bind || (Function.prototype.bind = function(e) {
                    if (typeof this != "function") throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
                    var t = this;
                    return function() {
                        return t.apply(e, arguments)
                    }
                })
            })(),
            function() {
                var e = 0,
                    t = ["webkit", "moz"],
                    n;
                for (n = 0; n < t.length && !window.requestAnimationFrame; ++n) window.requestAnimationFrame = window[t[n] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[t[n] + "CancelAnimationFrame"] || window[t[n] + "CancelRequestAnimationFrame"];
                window.requestAnimationFrame || (window.requestAnimationFrame = function(t, n) {
                    var r = (new Date).getTime(),
                        i = Math.max(0, 16 - (r - e)),
                        s = window.setTimeout(function() {
                            t(r + i)
                        }, i);
                    return e = r + i, s
                }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(e) {
                    clearTimeout(e)
                })
            }(), Array.isArray || (Array.isArray = function(e) {
                return Object.prototype.toString.call(e) === "[object Array]"
            }), Array.prototype.forEach || (Array.prototype.forEach = function(e, t) {
                if (this === undefined || this === null) throw new TypeError;
                var n = this,
                    r = n.length >>> 0;
                if (typeof e != "function") throw new TypeError;
                var i;
                for (i = 0; i < r; i++) n[i] !== undefined && e.call(t, n[i], i, n)
            }), Array.prototype.every || (Array.prototype.every = function(e, t) {
                if (this === undefined || this === null) throw new TypeError;
                var n = this,
                    r = n.length >>> 0,
                    i;
                if (typeof e != "function") throw new TypeError;
                for (i = 0; i < r; i++)
                    if (n[i] !== undefined && !e.call(t, n[i], i, n)) return !1;
                return !0
            }), Object.keys || (Object.keys = function() {
                var e = Object.prototype.hasOwnProperty,
                    t = !{
                        toString: null
                    }.propertyIsEnumerable("toString"),
                    n = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"],
                    r = n.length;
                return function(i) {
                    if (typeof i == "object" || typeof i == "function" && i !== null) {
                        var s = [],
                            o, u;
                        for (o in i) e.call(i, o) && s.push(o);
                        if (t)
                            for (u = 0; u < r; u++) e.call(i, n[u]) && s.push(n[u]);
                        return s
                    }
                    throw new TypeError("Object.keys called on non-object")
                }
            }()), typeof Object.create != "function" && (Object.create = function(e, t) {
                function n() {}
                n.prototype = e;
                if (t && typeof t == "object") {
                    var r;
                    for (r in t) t.hasOwnProperty(r) && (n[r] = t[r])
                }
                return new n
            });
            if (typeof Object.getPrototypeOf != "function") {
                var r = "__proto__";
                typeof "test" [r] == "object" ? Object.getPrototypeOf = function(e) {
                    return e[r]
                }: Object.getPrototypeOf = function(e) {
                    return e.constructor.prototype
                }
            }
        }), i("j13e/main", ["./utils/J13Polyfills"], function(e) {
            return {
                status: "rawr"
            }
        }), i("j13e", ["j13e/main"], function(e) {
            return e
        }), i("j13e/math/J13Vec2", ["require", "exports", "module"], function(e, t, n) {
            function r(e, t) {
                this.x = e || 0, this.y = t || 0
            }
            return r.prototype = {
                abs: function() {
                    this.x < 0 && (this.x = -this.x), this.y < 0 && (this.y = -this.y)
                },
                add: function(e) {
                    this.x += e.x, this.y += e.y
                },
                subtract: function(e) {
                    this.x -= e.x, this.y -= e.y
                },
                multiply: function(e) {
                    this.x *= e, this.y *= e
                },
                mulM: function(e) {
                    var t = this.x;
                    this.x = e.col1.x * t + e.col2.x * this.y, this.y = e.col1.y * t + e.col2.y * this.y
                },
                mulTM: function(e) {},
                crossVF: function(e) {
                    var t = this.x;
                    this.x = e * this.y, this.y = -e * t
                },
                crossFV: function(e) {
                    var t = this.x;
                    this.x = -e * this.y, this.y = e * t
                },
                min: function(e) {
                    this.x = this.x < e.x ? this.x : e.x, this.y = this.y < e.y ? this.y : e.y
                },
                max: function(e) {
                    this.x = this.x > e.x ? this.x : e.x, this.y = this.y > e.y ? this.y : e.y
                },
                length: function() {
                    return Math.sqrt(this.x * this.x + this.y * this.y)
                },
                lengthSquared: function() {
                    return this.x * this.x + this.y * this.y
                },
                normalize: function() {
                    var e = Math.sqrt(this.x * this.x + this.y * this.y),
                        t;
                    return e < Number.MIN_VALUE ? 0 : (t = 1 / e, this.x *= t, this.y *= t, e)
                },
                copy: function() {
                    return new r(this.x, this.y)
                },
                setZero: function() {
                    this.x = 0, this.y = 0
                },
                getNegative: function() {
                    return new r(-this.x, -this.y)
                },
                negativeSelf: function() {
                    this.x = -this.x, this.y = -this.y
                },
                set: function(e, t) {
                    typeof e == "number" && typeof t == "number" ? (this.x = e, this.y = t) : e && e.hasOwnProperty("x") && e.hasOwnProperty("y") && (this.x = e.x, this.y = e.y)
                },
                setAngle: function(e) {
                    this.x = Math.cos(e), this.y = Math.sin(e)
                }
            }, r
        }), i("j13e/math/J13Math", ["require", "exports", "module", "./J13Vec2"], function(e, t, n) {
            var r = e("./J13Vec2"),
                i = {};
            return i.clamp = function(e, t, n) {
                return t < e ? e : t > n ? n : t
            }, i.dot = function(e, t) {
                return e.x * t.x + e.y * t.y
            }, i.crossVV = function(e, t) {
                return e.x * t.y - e.y * t.x
            }, i.crossVF = function(e, t) {
                var n = new r(t * e.y, -t * e.x);
                return n
            }, i.crossFV = function(e, t) {
                var n = new r(-e * t.y, e * t.x);
                return n
            }, i.mulMV = function(e, t) {
                var n = new r(e.col1.x * t.x + e.col2.x * t.y, e.col1.y * t.x + e.col2.y * t.y);
                return n
            }, i.distance = function(e, t) {
                var n = e.x - t.x,
                    r = e.y - t.y;
                return Math.sqrt(n * n + r * r)
            }, i.distanceSquared = function(e, t) {
                var n = e.x - t.x,
                    r = e.y - t.y;
                return n * n + r * r
            }, i.intersectCircCirc = function(e, t, n, r, i, s) {
                return (e - r) * (e - r) + (t - i) * (t - i) < (n + s) * (n + s)
            }, i.intersectRectCirc = function(e, t, n, r, i, s, o) {
                var u = Math.abs(i - e),
                    a = Math.abs(s - t);
                return u > n / 2 + o ? !1 : a > n / 2 + o ? !1 : u <= n / 2 ? !0 : a <= r / 2 ? !0 : (u - n / 2) * (u - n / 2) + (a - r / 2) * (a - r / 2) <= o * o
            }, i.intersectRectRect = function(e, t, n, r, i, s, o, u) {
                return Math.abs(e - i) * 2 < n + o && Math.abs(t - s) * 2 < r + u
            }, i
        }), i("j13e/math/J13Rect", ["require", "exports", "module", "./J13Vec2", "./J13Math"], function(e, t, n) {
            function s(e) {
                var t = e || {};
                this.left = t.left || 0, this.top = t.top || 0, this.right = t.right || 0, this.bottom = t.bottom || 0, t.hasOwnProperty("x") && (this.left = t.x), t.hasOwnProperty("y") && (this.top = t.y), t.hasOwnProperty("width") && (this.right = this.left + t.width), t.hasOwnProperty("height") && (this.bottom = this.top + t.height), this.checkDimensions()
            }
            var r = e("./J13Vec2"),
                i = e("./J13Math");
            return s.doRectsIntersect = function(e, t) {
                return i.intersectRectRect(e.getCenterX(), e.getCenterY(), e.getWidth(), e.getHeight(), t.getCenterX(), t.getCenterY(), t.getWidth(), t.getHeight())
            }, s.combine = function(e, t) {
                var n = new s;
                return n.combine(e, t), n
            }, s.isJ13Rect = function(e, t) {
                var n;
                if (!e) return !1;
                for (n in s.IDENTITY)
                    if (s.IDENTITY.hasOwnProperty(n) && !e.hasOwnProperty(n)) return !1;
                if (t)
                    for (n in s.prototype)
                        if (s.prototype.hasOwnProperty(n) && !e.hasOwnProperty(n)) return !1;
                return !0
            }, s.canBeJ13Rect = function(e) {
                var t = e || {};
                return (t.hasOwnProperty("x") || t.hasOwnProperty("left")) && (t.hasOwnProperty("y") || t.hasOwnProperty("top")) && (t.hasOwnProperty("width") || t.hasOwnProperty("right")) && (t.hasOwnProperty("height") || t.hasOwnProperty("bottom")) ? !0 : !1
            }, s.prototype = {
                getCenter: function() {
                    return new r(this.getCenterX(), this.getCenterY())
                },
                getCenterX: function() {
                    return (this.left + this.right) / 2
                },
                getCenterY: function() {
                    return (this.top + this.bottom) / 2
                },
                setX: function(e) {
                    var t = this.getWidth();
                    this.left = e, this.right = e + t
                },
                setY: function(e) {
                    var t = this.getHeight();
                    this.top = e, this.bottom = e + t
                },
                setPosition: function(e, t) {
                    this.setX(e), this.setY(t)
                },
                checkDimensions: function() {
                    var e;
                    this.left > this.right && (e = this.left, this.left = this.right, this.right = e), this.top > this.bottom && (e = this.top, this.top = this.bottom, this.bottom = e)
                },
                translate: function(e, t) {
                    this.translateX(e), this.translateY(t)
                },
                translateX: function(e) {
                    this.left += e, this.right += e
                },
                translateY: function(e) {
                    this.top += e, this.bottom += e
                },
                getWidth: function() {
                    return this.right - this.left
                },
                getHeight: function() {
                    return this.bottom - this.top
                },
                setWidth: function(e) {
                    this.right = this.left + e
                },
                setHeight: function(e) {
                    this.bottom = this.top + e
                },
                containsPoint: function(e, t) {
                    return e >= this.left && e < this.right && t >= this.top && t < this.bottom
                },
                intersectsRect: function(e) {
                    return s.doRectsIntersect(this, e)
                },
                copy: function() {
                    return new s({
                        left: this.left,
                        top: this.top,
                        right: this.right,
                        bottom: this.bottom
                    })
                },
                contains: function(e) {
                    return this.left <= e.left && this.top <= e.top && e.right <= this.right && e.bottom <= this.bottom
                },
                combine: function(e, t) {
                    this.left = Math.min(e.left, t.left), this.top = Math.min(e.top, t.top), this.right = Math.max(e.right, t.right), this.bottom = Math.max(e.bottom, t.bottom)
                }
            }, s.IDENTITY = new s, s
        }), i("src/Resources", ["require", "exports", "module", "j13e/math/J13Rect"], function(e, t, n) {
            var r = e("j13e/math/J13Rect"),
                i = {
                    kikEnabled: !1,
                    loadedImages: {},
                    images: {
                        title: "imgs/Title.png",
                        playButton: "imgs/Button-play.png",
                        grasslandBg: "imgs/Background.png",
                        track1: "imgs/Tracks.png",
                        car1: "imgs/Car1.png",
                        car2: "imgs/Car2.png",
                        car3: "imgs/Car3.png",
                        rider: "imgs/Rider.png",
                        kikButton: "imgs/Button-kik.png",
                        leaderboardButton: "imgs/Button-leaderboard.png",
                        volume: "imgs/volume.png"
                    },
                    soundNames: {
                        crash1: "crash1",
                        crash2: "crash2",
                        rev: "rev",
                        skid: "skid",
                        score: "score"
                    },
                    sounds: {
                        crash1: {
                            urls: ["sounds/crash1.mp3", "sounds/crash1.ogg", "sounds/crash1.wav"],
                            volume: .8
                        },
                        crash2: {
                            urls: ["sounds/crash2.mp3", "sounds/crash2.ogg", "sounds/crash2.wav"],
                            volume: .8
                        },
                        rev: {
                            urls: ["sounds/rev.mp3", "sounds/rev.ogg", "sounds/rev.wav"],
                            volume: .5,
                            loop: !0
                        },
                        skid: {
                            urls: ["sounds/skid.mp3", "sounds/skid.ogg", "sounds/skid.wav"],
                            volume: .8
                        },
                        score: {
                            urls: ["sounds/score.mp3", "sounds/score.ogg", "sounds/score.wav"],
                            volume: .5
                        }
                    },
                    spriteSheets: {},
                    spriteMaps: {
                        volume: {
                            image: "volume",
                            main: {
                                frameMap: {
                                    off: new r({
                                        x: 0,
                                        y: 0,
                                        width: 60,
                                        height: 60
                                    }),
                                    on: new r({
                                        x: 60,
                                        y: 0,
                                        width: 60,
                                        height: 60
                                    })
                                },
                                destRect: new r({
                                    width: 60,
                                    height: 60
                                })
                            }
                        }
                    },
                    loadedPatterns: {},
                    patterns: {},
                    gameStates: {
                        init: "init",
                        preload: "preload",
                        mainMenu: "mainmenu",
                        intro: "intro",
                        level: "level",
                        paused: "paused",
                        gameOver: "gameover",
                        hiScore: "hiscore",
                        appCache: "appcache"
                    },
                    anims: {},
                    buttons: {
                        start: "start",
                        hiScore: "hiscore",
                        kik: "kik",
                        menu: "menu",
                        retry: "retry",
                        version: "version",
                        rank: "rank",
                        volume: "volume"
                    },
                    events: {
                        gameInitted: "gameinitted"
                    }
                };
            return i
        }), i("src/utils/Common", ["require", "exports", "module"], function(e, t, n) {
            var r = {};
            return r.clamp = function(e, t, n) {
                return t > n ? n : t < e ? e : t
            }, r.rangedRandom = function(e, t) {
                var n, r;
                return e < t ? (n = e, r = t) : (n = t, r = e), n + Math.random() * (r - n)
            }, r.objectToParamString = function(e) {
                var t, n = [];
                for (t in e) e.hasOwnProperty(t) && n.push(t + "=" + e[t]);
                return n.join("&")
            }, r.paramStringToObject = function(e) {
                var t = {},
                    n, r, i, s, o, u;
                if (e && typeof e == "string" && e.length > 1) {
                    n = e, n[0] === "?" && (n = n.substr(1)), r = n.split("&");
                    for (i = 0; i < r.length; i += 1) s = r[i].split("=", 2), s.length === 2 ? (o = s[0], u = s[1], o && u && (t[o] = u)) : s.length === 1 && (t[s[0]] = null)
                }
                return t
            }, r
        }), i("cocoonjs/CocoonInclude", ["require", "exports", "module"], function(e, t, n) {
            return null
        }), i("src/Settings", ["require", "exports", "module", "cocoonjs/CocoonInclude", "src/utils/Common"], function(e, t, n) {
            var r = e("cocoonjs/CocoonInclude"),
                i = e("src/utils/Common"),
                s = i.paramStringToObject(window.location.search),
                o = {
                    gaId: "UA-55436928-1",
                    gmapiId: "dontcollide",
                    gmgaId: "dontcollide",
                    highScoreCookieSettings: {
                        name: "gmdontcollide_hsl",
                        expires: 63072e3
                    },
                    cocoon: r ? !0 : !1,
                    kik: s.hasOwnProperty("kiktest") ? !0 : window.kik && window.kik.enabled ? !0 : !1,
                    inAppGames: s.hasOwnProperty("inappgames") || s.utm_source === "ubersocialios" && s.utm_medium === "inapp",
                    width: 720,
                    height: 480,
                    outputWidth: 720,
                    outputHeight: 480,
                    hiScore: {
                        minScore: 1,
                        maxEntries: 1
                    }
                };
            return o
        }), i("j13e/utils/J13Utils", ["require", "exports", "module"], function(e, t, n) {
            var r = {},
                i = window.Node,
                s = window.HTMLElement,
                o = window.navigator;
            r.nativeTypes = ["Boolean", "Number", "String", "Function", "Array", "Date", "RegExp", "Object"], r.class2type = {},
                function() {
                    var e;
                    for (e = 0; e < r.nativeTypes.length; e += 1) r.class2type["[object " + r.nativeTypes[e] + "]"] = r.nativeTypes[e].toLowerCase()
                }(), r.isNode = function(e) {
                    return typeof i == "object" ? e instanceof i : e && typeof e == "object" && typeof e.nodeType == "number" && typeof e.nodeName == "string"
                }, r.isElement = function(e) {
                    return typeof s == "object" ? e instanceof s : e && typeof e == "object" && e !== null && e.nodeType === 1 && typeof e.nodeName == "string"
                }, r.isArray = Array.isArray || function(e) {
                    return r.getType(e) === "array"
                }, r.getType = function(e) {
                    return e === null ? String(e) : r.class2type[window.toString.call(e)] || "object"
                }, r.isNativeObject = function(e) {
                    var t = e;
                    return typeof e != "object" || e === null ? !1 : function() {
                        do t = Object.getPrototypeOf(t); while (t);
                        return Object.getPrototypeOf(e) === t
                    }()
                }, r.makeUnselectable = function(e, t) {
                    if (e) {
                        e.nodeType === 1 && e.setAttribute("unselectable", "on");
                        if (t) {
                            var n = e.firstChild;
                            while (n) r.makeUnselectable(n, t), n = n.nextSibling
                        }
                    }
                }, r.addClass = function(e, t) {
                    var n = e.hasOwnProperty("className"),
                        r = n ? e.className : e.getAttribute("class"),
                        i = [],
                        s, o = typeof t == "string",
                        u = typeof t == "object" && typeof t.length == "number",
                        a = u ? t : [t],
                        f;
                    typeof r == "string" && r.length > 0 && (i = r.split(" "));
                    for (f = 0; f < a.length; f += 1) s = a[f], i.indexOf(s) === -1 && i.push(s);
                    n ? e.className = i.join(" ") : e.setAttribute("class", i.join(" "))
                }, r.removeClass = function(e, t) {
                    var n = e.hasOwnProperty("className"),
                        r = n ? e.className : e.getAttribute("class"),
                        i = [],
                        s, o = typeof t == "string",
                        u = typeof t == "object" && typeof t.length == "number",
                        a = u ? t : [t],
                        f, l;
                    typeof r == "string" && r.length > 0 && (i = r.split(" "));
                    for (f = 0; f < a.length; f += 1) s = a[f], l = i.indexOf(s), l !== -1 && i.splice(l, 1);
                    n ? e.className = i.join(" ") : e.setAttribute("class", i.join(" "))
                }, r.hasClass = function(e, t) {
                    var n, r = [];
                    return e.getAttribute ? (n = e.hasOwnProperty("className") ? e.className : e.getAttribute("class"), typeof n == "string" && n.length > 0 && (r = n.split(" ")), r.indexOf(t) !== -1) : !1
                }, r.extendObj = function(e, t, n) {
                    var i, s, o = r.cloneObject(t, n);
                    for (i in e) e.hasOwnProperty(i) && (n && o.hasOwnProperty(i) && typeof o[i] == "object" && typeof e[i] == "object" && (o[i] = r.extendObj(e[i], o[i], n)), o.hasOwnProperty(i) || (r.isNativeObject(e[i]) ? e[i] ? o[i] = r.cloneObject(e[i], n) : o[i] = null : o[i] = e[i]));
                    return o
                }, r.cloneObject = function(e, t) {
                    var n, i;
                    if (typeof e == "string") n = e;
                    else {
                        n = {};
                        for (i in e) e.hasOwnProperty(i) && (t && typeof e[i] == "object" ? n[i] = r.cloneObject(e[i], t) : n[i] = e[i])
                    }
                    return n
                }, r.inherit = function() {
                    var e, t, n = null,
                        r;
                    for (e = 0; e < arguments.length; e += 1) {
                        r = null, arguments[e] && (typeof arguments[e] == "function" ? r = new arguments[e] : typeof arguments[e] == "object" && (r = arguments[e]));
                        if (r)
                            if (!n) n = r;
                            else
                                for (t in r) r.hasOwnProperty(t) && (n[t] = r[t])
                    }
                    return n
                };
            var u = {
                Android: function() {
                    return o.userAgent.match(/Android/i)
                },
                FirefoxOS: function() {
                    return o.userAgent.indexOf("Android") === -1 && o.userAgent.indexOf("Firefox") >= 0 && o.userAgent.indexOf("Mobile") >= 0
                },
                BlackBerry: function() {
                    return o.userAgent.match(/BlackBerry/i)
                },
                iOS: function() {
                    return o.userAgent.match(/iPhone|iPad|iPod/i)
                },
                iPod: function() {
                    return o.userAgent.match(/iPod/i)
                },
                iPhone: function() {
                    return o.userAgent.match(/iPhone/i)
                },
                iPad: function() {
                    return o.userAgent.match(/iPad/i)
                },
                Opera: function() {
                    return o.userAgent.match(/Opera Mini/i)
                },
                Windows: function() {
                    return o.userAgent.match(/IEMobile/i)
                },
                any: function() {
                    return u.Android() || u.BlackBerry() || u.iOS() || u.Opera() || u.Windows() || u.FirefoxOS()
                },
                Safari: function() {
                    return u.iOS() && !u.ChromeIOS() && o.userAgent.match(/AppleWebKit/i)
                },
                iPhoneSafari: function() {
                    return (u.iPhone() || u.iPod()) && !u.ChromeIOS() && o.userAgent.match(/AppleWebKit/i)
                },
                ChromeIOS: function() {
                    return u.iOS() && o.userAgent.match("CriOS")
                },
                ChromeAndroid: function() {
                    return o.userAgent.match(/Android.+Chrome|CrMo/i)
                }
            };
            return r.isMobile = u, r.addOnClick = function(e, t, n) {
                e.onclick = t, n && e.addEventListener("touchstart", function(e) {
                    return e.currentTarget.onclick(e), e.preventDefault(), e.stopPropagation(), !1
                }, !1)
            }, r.hexToRGB = function(e) {
                var t = e.replace("#", ""),
                    n = parseInt(t.slice(0, 2), 16),
                    r = parseInt(t.slice(2, 4), 16),
                    i = parseInt(t.slice(4, 6), 16);
                return {
                    r: n,
                    g: r,
                    b: i
                }
            }, r.rgbToHex = function(e, t, n) {
                var r = -1,
                    i = -1,
                    s = -1;
                typeof e == "number" && typeof t == "number" && typeof n == "number" ? (r = e, i = t, s = n) : e && typeof e == "object" && (e.hasOwnProperty("r") ? r = e.r : e.hasOwnProperty("red") && (r = e.red), e.hasOwnProperty("g") ? i = e.g : e.hasOwnProperty("green") && (i = e.green), e.hasOwnProperty("b") ? s = e.b : e.hasOwnProperty("blue") && (s = e.blue));
                if (r !== -1 && i !== -1 && s !== -1) {
                    var o = r.toString(16);
                    o.length < 2 && (o = "0" + o);
                    var u = i.toString(16);
                    u.length < 2 && (u = "0" + u);
                    var a = s.toString(16);
                    return a.length < 2 && (a = "0" + a), o + u + a
                }
                return "000000"
            }, r.getColorType = function(e) {
                if (e[0] === "#" || e.length === 6) return "hex";
                var t = e.indexOf("(");
                return t !== -1 ? e.substring(0, t).trim().toLowerCase() : null
            }, r.getRGBFromRGBString = function(e) {
                var t = e.indexOf("("),
                    n = e.indexOf(")"),
                    r = e.substring(t + 1, n),
                    i = r.split(","),
                    s = e.substring(0, t).trim().toLowerCase();
                return s === "rgb" ? {
                    r: parseInt(i[0].trim(), 10),
                    g: parseInt(i[1].trim(), 10),
                    b: parseInt(i[2].trim(), 10),
                    type: s
                } : s === "rgba" ? {
                    r: parseInt(i[0].trim(), 10),
                    g: parseInt(i[1].trim(), 10),
                    b: parseInt(i[2].trim(), 10),
                    a: parseInt(i[3].trim(), 10),
                    type: s
                } : s === "argb" ? {
                    a: parseInt(i[0].trim(), 10),
                    r: parseInt(i[1].trim(), 10),
                    g: parseInt(i[2].trim(), 10),
                    b: parseInt(i[3].trim(), 10),
                    type: s
                } : null
            }, r.getRGBFromColorString = function(e) {
                var t = r.getColorType(e);
                if (t === "hex") {
                    var n = r.hexToRGB(e);
                    return n.type = t, n
                }
                return r.getRGBFromRGBString(e)
            }, r.getColorStringFromRGB = function(e, t, n, i, s) {
                return s === "hex" ? "#" + r.rgbToHex(e, t, n) : s === "rgb" ? "rgb(" + e + "," + t + "," + n + ")" : s === "rgba" ? "rgba(" + e + "," + t + "," + n + "," + i + ")" : s === "argb" ? "argb(" + i + "," + e + "," + t + "," + n + ")" : null
            }, r
        }), i("j13e/utils/J13DOM", ["require", "exports", "module", "./J13Utils"], function(e, t, n) {
            function i() {
                var e = {};
                this.get = function(t) {
                    return e[t] || (e[t] = document.getElementById(t)), e[t]
                }, this.create = function(e, t, n) {
                    var i = document.createElement(e);
                    return i.hasOwnProperty("id") ? i.id = t : i.setAttribute("id", t), r.addClass(i, n), i
                }
            }
            var r = e("./J13Utils");
            return new i
        }), i("src/efs/Ef", ["require", "exports", "module", "j13e/utils/J13Utils"], function(e, t, n) {
            function i(e) {
                var t = e || {};
                this.game = t.game || null, this.shouldShowFunction = t.shouldShowFunction || function() {
                    return !1
                }, this.enabled = t.hasOwnProperty("enabled") ? t.enabled : !0, this.platforms = t.platforms || i.platforms.DESKTOP | i.platforms.MOBILE | i.platforms.TABLET, this.adInterval = t.adInterval || 1, this.initted = !1, this.started = !1
            }
            var r = e("j13e/utils/J13Utils");
            return i.platforms = {
                DESKTOP: 1,
                MOBILE: 2,
                TABLET: 4
            }, i.getCurrentPlatform = function() {
                if (!r.isMobile.any()) return i.platforms.DESKTOP;
                var e = window.innerWidth || document.documentElement.clientWidth;
                return e >= 768 ? i.platforms.TABLET : i.platforms.MOBILE
            }, i.prototype = {
                init: function() {
                    this.enabled && (this.initted = !0)
                },
                start: function() {
                    this.enabled && (this.started = !0)
                },
                rotate: function() {},
                show: function() {},
                hide: function() {},
                showContainer: function() {},
                hideContainer: function() {},
                shouldShow: function(e) {
                    return this.initted && this.enabled ? this.shouldShowFunction(e || this.adInterval) : !1
                }
            }, i
        }), i("src/efs/EfInits", ["require", "exports", "module"], function(e, t, n) {
            return []
        }), i("src/efs/EfCocoon", ["require", "exports", "module", "./Ef", "./EfInits", "j13e/utils/J13DOM", "j13e/utils/J13Utils", "cocoonjs/CocoonInclude"], function(e, t, n) {
            function a(e) {
                var t = e || {};
                r.call(this, e), this.hasCocoonJS = u && u.Ad ? !0 : !1, this.hasCocoonJS || (this.enabled = !1), a.adsToInitialize.push(this)
            }
            var r = e("./Ef"),
                i = e("./EfInits"),
                s = e("j13e/utils/J13DOM"),
                o = e("j13e/utils/J13Utils"),
                u = e("cocoonjs/CocoonInclude");
            return a.adsToInitialize = [], a.cocoonAdInit = function(e) {
                if (u && u.Ad && a.adsToInitialize.length > 0) {
                    var t = !1;
                    a.adsToInitialize.forEach(function(e) {
                        e.enabled && (t = !0), e.init()
                    }), t && (u.Ad.onFullScreenShown.addEventListener(function() {
                        console.log("fullscreen shown"), u.Ad.refreshFullScreen()
                    }), u.Ad.onFullScreenHidden.addEventListener(function() {
                        console.log("fullscreen hidden"), e.hideInterstitial()
                    }), u.Ad.onFullScreenReady.addEventListener(function() {
                        console.log("fullscreen ready"), a.adsToInitialize.forEach(function(e) {
                            e.start()
                        })
                    }), setTimeout(function() {
                        u.Ad.preloadFullScreen()
                    }, 1e3))
                }
            }, a.prototype = o.inherit(new r, {
                start: function() {
                    this.initted && !this.started && this.canRun() && r.prototype.start.call(this)
                },
                rotate: function() {},
                show: function() {
                    this.initted && this.canRun() && u.Ad.showFullScreen()
                },
                hide: function() {},
                shouldShow: function(e) {
                    return this.started && this.canRun() ? r.prototype.shouldShow.call(this, e) : !1
                },
                canRun: function() {
                    return this.enabled && this.hasCocoonJS
                }
            }), i.push(a.cocoonAdInit), a
        }), i("src/efs/EfGoogleTag", ["require", "exports", "module", "./Ef", "./EfInits", "j13e/utils/J13DOM", "j13e/utils/J13Utils", "src/Settings"], function(e, t, n) {
            function a(e) {
                var t = e || {};
                r.call(this, e), this.adSlot = null, this.unitName = t.unitName || null, this.size = t.size || null, this.divId = t.divId || null, this.containerDivId = t.containerDivId || null, this.hasGoogleTag = !1, this.started = !1, window.googletag ? this.hasGoogleTag = !0 : this.enabled = !1, a.slotsToDefine.push(this)
            }
            var r = e("./Ef"),
                i = e("./EfInits"),
                s = e("j13e/utils/J13DOM"),
                o = e("j13e/utils/J13Utils"),
                u = e("src/Settings");
            return a.slotsToDefine = [], a.googletagInit = function() {
                window.googletag = window.googletag || {}, window.googletag.cmd = window.googletag.cmd || [], window.googletag.cmd.push(function() {
                    var e, t, n = r.getCurrentPlatform(),
                        i = !1;
                    for (e = 0; e < a.slotsToDefine.length; e += 1) t = a.slotsToDefine[e], t && (t.platforms & n) > 0 && t.enabled && t.unitName && t.size && t.divId && (t.adSlot = window.googletag.defineSlot(t.unitName, t.size, t.divId).addService(window.googletag.pubads()), t.init(), i = !0);
                    i && (window.googletag.pubads().enableSingleRequest(), window.googletag.enableServices())
                })
            }, a.prototype = o.inherit(new r, {
                start: function() {
                    if (this.initted && !this.started && this.canRun()) {
                        r.prototype.start.call(this);
                        var e = this.divId;
                        window.googletag.cmd.push(function() {
                            window.googletag.display(e)
                        })
                    }
                },
                rotate: function() {
                    if (this.initted && this.canRun()) {
                        var e = !1;
                        this.started || (this.start(), e = !0);
                        if (!e) {
                            var t = this.adSlot;
                            window.googletag.cmd.push(function() {
                                window.googletag.pubads().refresh([t])
                            })
                        }
                    }
                },
                show: function() {
                    this.initted && this.canRun() && (s.get(this.divId).style.width = this.size[0] + "px", s.get(this.divId).style.height = this.size[1] + "px", o.addClass(s.get(this.divId), "show"))
                },
                hide: function() {
                    this.initted && this.canRun() && o.removeClass(s.get(this.divId), "show")
                },
                showContainer: function() {
                    this.initted && this.containerDivId && s.get(this.containerDivId) && this.canRun() && o.addClass(s.get(this.containerDivId), "show")
                },
                hideContainer: function() {
                    this.initted && this.containerDivId && s.get(this.containerDivId) && this.canRun() && o.removeClass(s.get(this.containerDivId), "show")
                },
                shouldShow: function(e) {
                    return this.canRun() ? r.prototype.shouldShow.call(this, e) : !1
                },
                canRun: function() {
                    return this.enabled && this.hasGoogleTag && this.unitName && this.size && this.divId && s.get(this.divId)
                }
            }), i.push(a.googletagInit), a
        }), i("src/efs/EfLeadBolt", ["require", "exports", "module", "./Ef", "./EfInits", "j13e/utils/J13DOM", "j13e/utils/J13Utils"], function(e, t, n) {
            function u(e) {
                var t = e || {};
                r.call(this, e), this.url = t.url || null, this.divId = t.divId || null, this.size = t.size || null, this.type = t.type || null, u.adsToInitialize.push(this)
            }
            var r = e("./Ef"),
                i = e("./EfInits"),
                s = e("j13e/utils/J13DOM"),
                o = e("j13e/utils/J13Utils");
            return u.types = {
                banner: "banner",
                iframe: "iframe"
            }, u.adsToInitialize = [], u.adsInit = function(e) {
                u.adsToInitialize.forEach(function(e) {
                    e && e.enabled && e.divId && e.type && (e.type === u.types.iframe && e.url && e.size || e.type === u.types.banner) && e.init()
                })
            }, u.prototype = o.inherit(new r, {
                start: function() {
                    if (this.initted && !this.started && this.canRun()) {
                        if (this.type === u.types.iframe) {
                            var e = s.get(this.divId);
                            if (e) {
                                var t = s.create("iframe", "meow");
                                t.src = this.url, t.style.width = this.size[0] + "px", t.style.height = this.size[1] + "px", t.style.margin = "0 0", t.setAttribute("frameborder", "0"), t.setAttribute("allowtransparency", "true"), t.setAttribute("scrolling", "no"), e.appendChild(t)
                            }
                        }
                        r.prototype.start.call(this)
                    }
                },
                rotate: function() {},
                show: function() {
                    if (this.initted && this.canRun()) {
                        var e = s.get(this.divId),
                            t = !1;
                        e && (this.started || (this.start(), t = !0), o.addClass(e, "show"))
                    }
                },
                hide: function() {
                    if (this.initted && this.canRun()) {
                        var e = s.get(this.divId);
                        e && o.removeClass(e, "show")
                    }
                },
                shouldShow: function(e) {
                    return this.initted && this.canRun() ? r.prototype.shouldShow.call(this, e) : !1
                },
                canRun: function() {
                    return this.enabled && this.divId && this.type
                }
            }), i.push(u.adsInit), u
        }), i("src/efs/EfInApp", ["require", "exports", "module", "./Ef", "j13e/utils/J13DOM", "j13e/utils/J13Utils", "./EfInits"], function(e, t, n) {
            function u(e) {
                var t = e || {};
                r.call(this, e), u.adsToInitialize.push(this)
            }
            var r = e("./Ef"),
                i = e("j13e/utils/J13DOM"),
                s = e("j13e/utils/J13Utils"),
                o = e("./EfInits");
            return u.adsToInitialize = [], u.inAppGamesInit = function(e) {
                window.G = window.G || {};
                if (window.G.initAds) {
                    var t = !1;
                    u.adsToInitialize.forEach(function(e) {
                        e.enabled && (t = !0), e.adInterval = window.G.adInterval || e.adInterval, e.init()
                    }), window.G.initAds()
                }
            }, u.prototype = s.inherit(new r, {
                init: function() {
                    r.prototype.init.call(this), this.start()
                },
                start: function() {
                    this.initted && !this.started && this.canRun() && r.prototype.start.call(this)
                },
                rotate: function() {},
                show: function() { /* this.initted&&this.canRun()&&window.G.showAd() */ },
                hide: function() {},
                shouldShow: function(e) {
                    return this.started && this.canRun() ? r.prototype.shouldShow.call(this, e) : !1
                },
                canRun: function() {
                    return this.enabled && window.G.hasOwnProperty("initAds") && window.G.hasOwnProperty("showAd")
                }
            }), o.push(u.inAppGamesInit), u
        }), i("src/efs/InterstitialEfs", ["require", "exports", "module", "./Ef", "./EfCocoon", "./EfGoogleTag", "./EfLeadBolt", "./EfInApp"], function(e, t, n) {
            var r = e("./Ef"),
                i = e("./EfCocoon"),
                s = e("./EfGoogleTag"),
                o = e("./EfLeadBolt"),
                u = e("./EfInApp"),
                a = {
                    getInAppAds: function(e) {
                        return [new u({
                            game: e,
                            adInterval: 1,
                            shouldShowFunction: function(t) {
                                return e.getNumPlays() > 1 && e.getNumPlays() % t === 0
                            },
                            enabled: !1
                        })]
                    },
                    getNativeAds: function(e) {
                        return [new i({
                            game: e,
                            adInterval: 1,
                            shouldShowFunction: function(t) {
                                return e.getNumPlays() > 1 && e.getNumPlays() % t === 0
                            },
                            enabled: !1
                        })]
                    },
                    getWebAds: function(e) {
                        return [new s({
                            game: e,
                            adInterval: 2,
                            shouldShowFunction: function(t) {
                                return e.getNumPlays() > 1 && e.getNumPlays() % t === 0
                            },
                            platforms: r.platforms.TABLET,
                            unitName: "/20973361/game16_iPad_300x600",
                            size: [300, 600],
                            divId: "div-gpt-ad",
                            enabled: !0
                        }), new s({
                            game: e,
                            adInterval: 2,
                            shouldShowFunction: function(t) {
                                return e.getNumPlays() > 1 && e.getNumPlays() % t === 0
                            },
                            platforms: r.platforms.DESKTOP,
                            unitName: "/20973361/game16_desktop_300x600",
                            size: [300, 600],
                            divId: "div-gpt-ad",
                            enabled: !0
                        }), new s({
                            game: e,
                            adInterval: 2,
                            shouldShowFunction: function(t) {
                                return e.getNumPlays() > 1 && e.getNumPlays() % t === 0
                            },
                            platforms: r.platforms.MOBILE,
                            unitName: "/20973361/game16_mobile_300x250",
                            size: [300, 250],
                            divId: "div-gpt-ad",
                            enabled: !0
                        })]
                    }
                };
            return a
        }), i("j13e/utils/J13Event", ["require", "exports", "module"], function(e, t, n) {
            function r(e) {
                var t = e || {};
                this.name = t.name, this.source = t.source, this.data = t.data
            }
            return r
        }), i("j13e/utils/J13EventDispatcher", ["require", "exports", "module", "./J13Event"], function(e, t, n) {
            function i(e) {
                this.eventMap = {}
            }
            var r = e("./J13Event");
            return i.prototype = {
                addListener: function(e, t) {
                    if (e && t) {
                        this.eventMap[e] || (this.eventMap[e] = []);
                        if (this.eventMap[e].indexOf(t) === -1) return this.eventMap[e].push(t), !0
                    }
                    return !1
                },
                removeListener: function(e, t) {
                    if (e && t && this.eventMap[e]) {
                        var n = this.eventMap[e].indexOf(t);
                        if (n !== -1) return this.eventMap[e].splice(n, 1), !0
                    }
                    return !1
                },
                removeAllListeners: function(e) {
                    if (e)
                        while (this.eventMap[e].length > 0) this.eventMap[e].pop();
                    else this.eventMap = {}
                },
                dispatch: function(e, t) {
                    if (e && this.eventMap[e]) {
                        var n;
                        for (n = 0; n < this.eventMap[e].length; n += 1) this.eventMap[e][n](new r({
                            source: this,
                            data: t,
                            name: e
                        }))
                    }
                }
            }, i
        }), i("src/efs/EfManager", ["require", "exports", "module", "./Ef", "./EfGoogleTag", "./EfCocoon", "./EfInApp", "./EfInits", "j13e/utils/J13Utils", "j13e/utils/J13EventDispatcher"], function(e, t, n) {
            function l(e) {
                var t = e || {};
                this.interstitialScreen = t.interstitialScreen, this.interstitialClose = t.interstitialClose, this.gameOverAdScreen = t.gameOverAdScreen, this.interstitialAds = t.interstitialAds || [], this.currentInterstitialAd = null, this.gameOverAds = t.gameOverAds || [], this.currentGameOverAd = null, this.lastGameOverAdRotate = 0, this.enabled = !0, this.interestitialHideCallback = null, this.gameOverHideCallback = null, this.game = t.game || null, this.events = l.events, this.desktopPage = !1, this.init()
            }
            var r = e("./Ef"),
                i = e("./EfGoogleTag"),
                s = e("./EfCocoon"),
                o = e("./EfInApp"),
                u = e("./EfInits"),
                a = e("j13e/utils/J13Utils"),
                f = e("j13e/utils/J13EventDispatcher");
            return l.GAMEOVERROTATEDELAY = 3e4, l.events = {
                INTERSTITIALREFRESHED: "interstitialrefreshed",
                INTERSTITIALSHOWN: "interstitialshown",
                INTERSTITIALHIDDEN: "interstitialhidden",
                GAMEOVERADREFRESHED: "gameoveradrefreshed",
                GAMEOVERADSHOWN: "gameoveradshown",
                GAMEOVERADHIDDEN: "gameoveradhidden"
            }, l.prototype = a.inherit(new f, {
                init: function() {
                    var e, t = this;
                    this.interstitialScreen && a.addOnClick(this.interstitialScreen, function(e) {
                        var n = e.target;
                        do e.currentTarget === n ? (t.hideInterstitial(), n = null) : a.hasClass(n, "dismissableArea") ? n = n.parentNode : n = null; while (n)
                    }, !0), this.interstitialClose && a.addOnClick(this.interstitialClose, this.hideInterstitial.bind(this), !0), u.forEach(function(e) {
                        typeof e == "function" && e(t)
                    })
                },
                setGame: function(e) {
                    var t;
                    this.game = e;
                    for (t = 0; t < this.interstitialAds.length; t += 1) this.interstitialAds[t].game = e;
                    for (t = 0; t < this.gameOverAds.length; t += 1) this.gameOverAds[t].game = e
                },
                isInterstitialShowing: function() {
                    return this.enabled && this.interstitialScreen ? a.hasClass(this.interstitialScreen, "show") : !1
                },
                refreshInterstitial: function() {
                    if (this.enabled) {
                        var e = this.getInterstitialAd();
                        e && (e.rotate(), this.dispatch(l.events.INTERSTITIALREFRESHED, {
                            ad: e
                        }))
                    }
                },
                showInterstitial: function(e) {
                    this.enabled && (this.interestitialHideCallback = e, this.currentInterstitialAd && this.currentInterstitialAd.show(), this.interstitialScreen && a.addClass(this.interstitialScreen, "show"), this.dispatch(l.events.INTERSTITIALSHOWN, {
                        ad: this.currentInterstitialAd
                    }))
                },
                hideInterstitial: function() {
                    this.interstitialScreen && a.removeClass(this.interstitialScreen, "show"), this.currentInterstitialAd && this.currentInterstitialAd.hide(), this.interestitialHideCallback && (this.interestitialHideCallback(), this.interestitialHideCallback = null), this.dispatch(l.events.INTERSTITIALHIDDEN, {
                        ad: this.currentInterstitialAd
                    })
                },
                shouldShowInterstitial: function() {
                    if (this.enabled) {
                        var e = this.getInterstitialAd();
                        return e ? e.shouldShow() : !1
                    }
                    return !1
                },
                getInterstitialAd: function() {
                    if (this.enabled && !this.currentInterstitialAd) {
                        var e, t = r.getCurrentPlatform();
                        for (e = 0; e < this.interstitialAds.length && !this.currentInterstitialAd; e += 1) this.interstitialAds[e].shouldShow() && (this.interstitialAds[e].platforms & t) > 0 && (this.currentInterstitialAd = this.interstitialAds[e])
                    }
                    return this.currentInterstitialAd
                },
                isGameOverAdShowing: function() {
                    return this.enabled && this.gameOverAdScreen ? a.hasClass(this.gameOverAdScreen, "show") : !1
                },
                refreshGameOverAd: function() {
                    if (this.enabled) {
                        var e = (new Date).getTime(),
                            t = this.getGameOverAd();
                        t && e - this.lastGameOverAdRotate >= l.GAMEOVERROTATEDELAY && (t.rotate(), this.lastGameOverAdRotate = e, this.dispatch(l.events.GAMEOVERADREFRESHED, {
                            ad: t
                        }))
                    }
                },
                showGameOverAd: function(e) {
                    this.enabled && this.gameOverAdScreen && (this.gameOverHideCallback = e, a.addClass(this.gameOverAdScreen, "show"), this.dispatch(l.events.GAMEOVERADSHOWN, {
                        ad: this.currentGameOverAd
                    }))
                },
                hideGameOverAd: function() {
                    this.gameOverAdScreen && a.removeClass(this.gameOverAdScreen, "show"), this.gameOverHideCallback && (this.gameOverHideCallback(), this.gameOverHideCallback = null), this.dispatch(l.events.GAMEOVERADHIDDEN, {
                        ad: this.currentGameOverAd
                    })
                },
                shouldShowGameOverAd: function() {
                    if (this.enabled) {
                        var e = this.getGameOverAd();
                        return e ? e.shouldShow() : !1
                    }
                    return !1
                },
                getGameOverAd: function() {
                    if (this.enabled && !this.currentGameOverAd) {
                        var e, t = r.getCurrentPlatform();
                        for (e = 0; e < this.gameOverAds.length && !this.currentGameOverAd; e += 1) this.gameOverAds[e].shouldShow() && (this.gameOverAds[e].platforms & t) > 0 && (this.currentGameOverAd = this.gameOverAds[e], this.currentGameOverAd.show())
                    }
                    return this.currentGameOverAd
                }
            }), l
        }), i("j13e/display/J13ButtonManager", ["require", "exports", "module", "../utils/J13Utils", "../utils/J13EventDispatcher"], function(e, t, n) {
            function s(e) {
                var t = e || {};
                i.call(this, e);
                var n, r = t.buttons || [];
                this.buttons = [], this.downedButton = null, this.hoveredButton = null;
                for (n = 0; n < r.length; n += 1) this.addButton(r[n])
            }
            var r = e("../utils/J13Utils"),
                i = e("../utils/J13EventDispatcher");
            return s.events = {
                DOWN: "down",
                UP: "up",
                HOVERIN: "hoverin",
                HOVEROUT: "hoverout",
                MOVE: "move",
                CLICK: "click"
            }, s.prototype = r.inherit(new i, {
                events: s.events,
                addButton: function(e) {
                    return this.buttons.indexOf(e) === -1 ? (this.buttons.push(e), !0) : !1
                },
                removeButton: function(e) {
                    var t = this.buttons.indexOf(e);
                    return t !== -1 ? (this.buttons.splice(t, 1), !0) : !1
                },
                onDown: function(e) {
                    if (!this.downedButton) {
                        var t = e.data.scaledX,
                            n = e.data.scaledY;
                        this.downedButton = this.getButtonFromCoords(t, n), this.downedButton && (this.hoveredButton = null, this.downedButton.down(e), this.dispatch(s.events.DOWN, {
                            button: this.downedButton
                        }))
                    }
                },
                onMove: function(e) {
                    var t = e.data.scaledX,
                        n = e.data.scaledY,
                        r;
                    this.downedButton ? this.downedButton.isUp() && this.downedButton.contains(t, n) ? this.downedButton.down(e) : this.downedButton.isDown() && !this.downedButton.contains(t, n) && this.downedButton.up(e) : this.hoveredButton ? this.hoveredButton.contains(t, n) || (this.hoveredButton.hoverOut(e), this.dispatch(s.events.HOVEROUT, {
                        button: this.hoveredButton
                    }), this.hoveredButton = null) : (r = this.getButtonFromCoords(t, n), r && (this.hoveredButton = r, r.hover(e), this.dispatch(s.events.HOVERIN, {
                        button: this.hoveredButton
                    })))
                },
                onUp: function(e) {
                    this.downedButton && (this.downedButton.isDown() && (this.downedButton.click(e), this.dispatch(s.events.CLICK, {
                        button: this.downedButton
                    })), this.downedButton.up(e), this.dispatch(s.events.UP, {
                        button: this.downedButton
                    }), this.downedButton = null)
                },
                getButtonFromCoords: function(e, t) {
                    var n;
                    for (n = this.buttons.length - 1; n >= 0; n -= 1)
                        if (this.buttons[n].isEnabled() && this.buttons[n].isButtonVisibleOnStage() && this.buttons[n].contains(e, t)) return this.buttons[n];
                    return null
                }
            }), s
        }), i("j13e/anim/J13Anim", ["require", "exports", "module"], function(e, t, n) {
            function r(e) {
                var t = e || {};
                this.id = t.id || "anim-" + r.IDPOOL++, this.manager = t.manager, this.startValue = t.startValue || 0, this.endValue = t.endValue || 0, this.timeFunction = t.timeFunction || r.easingFunctions.linear, this.startCallback = t.startCallback || null, this.stepCallback = t.stepCallback || null, this.endCallback = t.endCallback || null, this.duration = t.hasOwnProperty("duration") ? t.duration : 0, this.iterations = t.hasOwnProperty("iterations") ? t.iterations : 1, this.data = t.data || null, this.useLogicTime = t.useLogicTime || !1, this.restartRequested = !1, this.prepared = !1, this.startTime = -1, this.endTime = -1, this.iterationsPlayed = 0
            }
            return r.IDPOOL = 0, r.easingFunctions = {
                linear: function(e) {
                    return e
                },
                easeInQuad: function(e) {
                    return e * e
                },
                easeOutQuad: function(e) {
                    return e * (2 - e)
                },
                easeInOutQuad: function(e) {
                    return e < .5 ? 2 * e * e : -1 + (4 - 2 * e) * e
                },
                easeInCubic: function(e) {
                    return e * e * e
                },
                easeOutCubic: function(e) {
                    return --e * e * e + 1
                },
                easeInOutCubic: function(e) {
                    return e < .5 ? 4 * e * e * e : (e - 1) * (2 * e - 2) * (2 * e - 2) + 1
                },
                easeInQuart: function(e) {
                    return e * e * e * e
                },
                easeOutQuart: function(e) {
                    return 1 - --e * e * e * e
                },
                easeInOutQuart: function(e) {
                    return e < .5 ? 8 * e * e * e * e : 1 - 8 * --e * e * e * e
                },
                easeInQuint: function(e) {
                    return e * e * e * e * e
                },
                easeOutQuint: function(e) {
                    return 1 + --e * e * e * e * e
                },
                easeInOutQuint: function(e) {
                    return e < .5 ? 16 * e * e * e * e * e : 1 + 16 * --e * e * e * e * e
                }
            }, r.iterationConstants = r.iterationCount = {
                one: 1,
                infinite: 0
            }, r.prototype = {
                recalculateDuration: function() {},
                requestRestart: function() {
                    this.restartRequested = !0
                },
                preStart: function() {
                    this.prepared = !1, this.startTime = -1, this.endTime = -1, this.iterationsPlayed === -1 && (this.iterationsPlayed = 0), this.restartRequested = !1, this.recalculateDuration()
                },
                start: function(e, t) {
                    this.prepared = !0, this.startTime = this.useLogicTime ? t : e, this.endTime = this.startTime + this.duration, this.restartRequested = !1, this.iterationsPlayed += 1, this.startCallback && this.startCallback(this.startValue, 0, 0, this.data)
                },
                step: function(e, t) {
                    var n = this.useLogicTime ? t : e,
                        r = (n - this.startTime) / this.duration;
                    r > 1 ? r = 1 : r < 0 && (r = 0);
                    var i = this.timeFunction(r),
                        s = this.startValue + (this.endValue - this.startValue) * i;
                    this.stepCallback && this.stepCallback(s, i, r, this.data)
                },
                end: function() {
                    this.prepared = !1, this.startTime = -1, this.endTime = -1, this.endCallback && this.endCallback(this.endValue, 1, 1, this.data)
                },
                stop: function() {
                    this.prepared = !1, this.startTime = -1, this.endTime = -1, this.iterationsPlayed = -1
                },
                shouldBeAnimating: function(e, t) {
                    return this.useLogicTime ? t >= this.startTime && t < this.endTime : e >= this.startTime && e < this.endTime
                },
                shouldBeDone: function(e, t) {
                    return this.useLogicTime ? t >= this.endTime : e >= this.endTime
                }
            }, r
        }), i("j13e/anim/J13AnimSequence", ["require", "exports", "module", "../utils/J13Utils", "./J13Anim"], function(e, t, n) {
            function s(e) {
                var t = e || {},
                    n = 0,
                    r;
                i.call(this, e), this.anims = t.anims || [], this.overrideUseLogicTime = t.overrideUseLogicTime || !1, this.recalculateDuration(), this.currentIndex = this.anims.length
            }
            var r = e("../utils/J13Utils"),
                i = e("./J13Anim");
            return s.prototype = r.inherit(new i, {
                recalculateDuration: function() {
                    var e = 0,
                        t;
                    for (t = 0; t < this.anims.length; t += 1) e += this.anims[t].duration;
                    this.duration = e
                },
                preStart: function() {
                    var e;
                    for (e = 0; e < this.anims.length; e += 1) this.anims[e].data || (this.anims[e].data = this.data), this.anims[e].preStart();
                    i.prototype.preStart.call(this)
                },
                start: function(e, t) {
                    var n = 0,
                        r, s;
                    this.currentIndex = 0, i.prototype.start.call(this, e, t);
                    for (r = 0; r < this.anims.length; r += 1) {
                        s = this.anims[r];
                        var o;
                        this.overrideUseLogicTime ? (o = this.useLogicTime ? t : e, s.useLogicTime = this.useLogicTime) : o = s.useLogicTime ? t : e, s.startTime = o + n, s.endTime = s.startTime + s.duration, n += s.duration
                    }
                },
                step: function(e, t) {
                    i.prototype.step.call(this, e, t);
                    if (this.currentIndex < this.anims.length) {
                        var n, r;
                        do n = this.anims[this.currentIndex], r = !1, n && (n.prepared || n.start(n.startTime, n.startTime), n.shouldBeAnimating(e, t) ? (n.step(e, t), r = !1) : n.shouldBeDone(e, t) && (n.step(e, t), n.end(), this.currentIndex += 1, r = !0)); while (r)
                    }
                },
                end: function() {
                    i.prototype.end.call(this), this.currentIndex = this.anims.length
                },
                stop: function() {
                    i.prototype.stop.call(this), this.currentIndex = this.anims.length;
                    var e;
                    for (e = 0; e < this.anims.length; e += 1) this.anims[e].stop()
                }
            }), s
        }), i("src/utils/GameStateManager", ["require", "exports", "module", "j13e/utils/J13Utils", "j13e/anim/J13Anim", "j13e/anim/J13AnimSequence", "j13e/utils/J13EventDispatcher"], function(e, t, n) {
            function u(e) {
                var t = e || {};
                this.game = t.game || null, this.animManager = t.animManager || null, this.states = {}, this.currentState = null, this.oldState = null, this.newState = null, this.transitioning = !1, this.queue = [], t.states && (Array.isArray(t.states) ? t.states.forEach(function(e) {
                    this.states[e.id] = e
                }, this) : r.isNativeObject(t.states) && Object.keys(t.states).forEach(function(e) {
                    this.states[e] = t.states[e]
                }, this)), t.startState && this.toState(t.startState)
            }
            var r = e("j13e/utils/J13Utils"),
                i = e("j13e/anim/J13Anim"),
                s = e("j13e/anim/J13AnimSequence"),
                o = e("j13e/utils/J13EventDispatcher");
            return u.events = {
                stateChanged: "statechanged",
                transitionStarted: "transitionstarted",
                transitionEnded: "transitionended"
            }, u.prototype = r.inherit(new o, {
                events: u.events,
                getCurrentStateId: function() {
                    return this.currentState ? this.currentState.id : null
                },
                addState: function(e, t) {
                    t || (t = e.id), this.states[t] = e
                },
                removeState: function(e) {
                    var t = typeof e == "string" ? e : e.id;
                    t && delete this.states[t]
                },
                toState: function(e, t, n, r) {
                    if (this.transitioning && r) this.queue.push({
                        stateOrId: e,
                        data: t,
                        noAnim: n
                    });
                    else {
                        var o = typeof e == "string" ? this.states[e] : e,
                            a = [];
                        this.transitioning = !0, this.dispatch(u.events.transitionStarted, {
                            oldState: this.currentState,
                            newState: o
                        }), a.push(new i({
                            duration: 0,
                            startCallback: function() {
                                this.newState = o, this.newState && this.newState.preStart(this.game, t), this.currentState && this.currentState.preEnd(this.game, t)
                            }.bind(this)
                        })), this.currentState && this.currentState.endAnim && a.push(this.currentState.endAnim), a.push(new i({
                            duration: 0,
                            startCallback: function() {
                                this.oldState = this.currentState, this.currentState = this.newState, this.newState = null, this.dispatch(u.events.stateChanged, {
                                    newState: this.currentState,
                                    oldState: this.oldState,
                                    stateData: t
                                }), this.oldState && this.oldState.end(this.game, t), this.currentState && this.currentState.start(this.game, t)
                            }.bind(this)
                        })), o && o.startAnim && a.push(o.startAnim), a.push(new i({
                            duration: 0,
                            startCallback: function() {
                                this.currentState && this.currentState.postStart(this.game, t), this.oldState && this.oldState.postEnd(this.game, t);
                                var e = this.oldState;
                                this.oldState = null, this.transitioning = !1, this.dispatch(u.events.transitionEnded, {
                                    oldState: e,
                                    newState: this.currentState
                                });
                                if (this.queue.length > 0) {
                                    var n = this.queue.shift();
                                    this.toState(n.stateOrId, n.data, n.noAnim)
                                }
                            }.bind(this)
                        }));
                        if (this.animManager && !n) {
                            var f = new s({
                                anims: a
                            });
                            this.animManager.startAnim(f)
                        } else a.forEach(function(e) {
                            e.startCallback(e.startValue, 0, 0), e.stepCallback(e.startValue, 0, 0), e.stepCallback(e.endValue, 1, 1), e.endCallback(e.endValue, 1, 1)
                        })
                    }
                }
            }), u
        }), i("src/utils/Scouter", ["require", "exports", "module", "src/Resources", "src/utils/Common", "src/Settings", "src/Game", "src/efs/EfManager", "j13e/utils/J13Utils", "j13e/display/J13ButtonManager", "src/utils/GameStateManager"], function(e, t, n) {
            function c(e) {
                var t = e || {};
                this.game = t.game || null, this.pageObj = {
                    page: s.cocoon ? "/native" : location.pathname,
                    title: document.title
                }, this.platform = c.web, this.debugTrace = t.debugTrace || !1, this.sendToGA = t.hasOwnProperty("sendToGA") ? t.sendToGA : !0, this.init()
            }
            var r = e("src/Resources"),
                i = e("src/utils/Common"),
                s = e("src/Settings"),
                o = e("src/Game"),
                u = e("src/efs/EfManager"),
                a = e("j13e/utils/J13Utils"),
                f = e("j13e/display/J13ButtonManager"),
                l = e("src/utils/GameStateManager");
            return c.platforms = {
                kik: "kik",
                web: "web",
                "native": "native"
            }, c.prototype = {
                init: function() {
                    this.game.addListener(r.events.gameInitted, this.gameInitted.bind(this)), this.game.engine.buttonManager.addListener(f.events.CLICK, this.onButtonClick.bind(this)), r.adManager.addListener(u.events.INTERSTITIALSHOWN, this.onAdShow.bind(this)), r.adManager.addListener(u.events.INTERSTITIALHIDDEN, this.onAdClose.bind(this)), r.gsm.addListener(l.events.stateChanged, this.onStateChange.bind(this))
                },
                gameInitted: function(e) {
                    var t = {},
                        n = !1,
                        r, o = this.game.initialUrlQuery,
                        u = i.paramStringToObject(window.location.hash.replace("#", ""));
                    s.kik && (t.kik = !0, n = !0);
                    for (r in o) o.hasOwnProperty(r) && (t[r] = o[r], n = !0);
                    for (r in u)
                        if (u.hasOwnProperty(r)) switch (r) {
                            case "utm_source":
                            case "utm_medium":
                            case "utm_term":
                            case "utm_content":
                            case "utm_campaign":
                                t[r] = u[r], n = !0
                        }
                        n && this.gaSetCurrentPage((s.cocoon ? "/native?" : "/?") + i.objectToParamString(t), document.title), this.gaPageView(), s.kik ? this.platform = c.platforms.kik : o.native === "true" || o.native === "1" || s.cocoon ? this.platform = c.platforms.native : this.platform = c.platforms.web
                },
                onButtonClick: function(e) {
                    if (e && e.data && e.data.button && e.data.button.getId()) {
                        var t = "gameevent",
                            n = "button-clicked-" + this.platform,
                            i = null;
                        switch (e.data.button.getId()) {
                            case r.buttons.start:
                                i = "button-play";
                                break;
                            case r.buttons.retry:
                                i = "button-retry";
                                break;
                            case r.buttons.hiScore:
                                i = "button-hi-score";
                                break;
                            case r.buttons.menu:
                                i = "button-menu";
                                break;
                            case r.buttons.kik:
                                i = "button-kik-share";
                                break;
                            case r.buttons.version:
                                i = "button-version";
                                break;
                            case r.buttons.volume:
                                i = "button-volume";
                                break;
                            case r.buttons.rank:
                                i = "button-rank"
                        }
                        n && i && (i += "-" + this.platform, this.gaEvent(t, n, i))
                    }
                },
                onAdShow: function(e) {
                    if (e.data && e.data.ad) {
                        var t = "gameevent",
                            n = "ad-" + this.platform,
                            r = "ad-show-" + this.platform;
                        this.gaEvent(t, n, r)
                    }
                },
                onAdClose: function(e) {
                    if (e.data && e.data.ad) {
                        var t = "gameevent",
                            n = "ad-" + this.platform,
                            r = "ad-close-" + this.platform;
                        this.gaEvent(t, n, r)
                    }
                },
                onStateChange: function(e) {
                    if (e && e.data && e.data.newState && e.data.newState.id) {
                        var t = "gameevent",
                            n = null,
                            i = null,
                            s = null;
                        e.data.newState.id === r.gameStates.hiScore && (n = "gameover-" + this.platform, i = "gameover-score-" + this.game.playScreen.getScore() + "-" + this.platform, window.gmga && window.gmga("gamedone")), n && this.gaEvent(t, n, i, s)
                    }
                },
                sendGameOver: function() {
                    var e = "gameevent",
                        t = null,
                        n = null,
                        r = null;
                    t = "gameover-" + this.platform, n = "gameover-bounces-" + this.game.playScreen.playScreen.getScore() + "-" + this.platform, window.gmga && window.gmga("gamedone"), t && this.gaEvent(e, t, n, r)
                },
                gaSend: function(e) {
                    window.ga && (this.sendToGA && window.ga("send", e), this.debugTrace && console.log("gaevent:", e))
                },
                gaEvent: function(e, t, n, r) {
                    window.ga && (this.sendToGA && window.ga("send", "event", e, t, n, r), this.debugTrace && console.log("gaevent:", "event", e, t, n, r))
                },
                gaNonInteractionEvent: function(e, t, n, r) {
                    var i = {
                        hitType: "event",
                        eventCategory: e,
                        eventAction: t,
                        eventLabel: n,
                        eventValue: r,
                        nonInteraction: 1
                    };
                    this.gaSend(i)
                },
                gaPageView: function(e) {
                    if (window.ga) {
                        var t = e ? a.extendObj(this.pageObj, e) : this.pageObj;
                        this.sendToGA && window.ga("send", "pageview", t), this.debugTrace && console.log("gaevent:", "pageview", t)
                    }
                },
                gaSetCurrentPage: function(e, t) {
                    this.pageObj = {
                        page: e,
                        title: t
                    }, this.gaSet(this.pageObj)
                },
                gaSet: function(e) {
                    window.ga && (this.sendToGA && window.ga("set", e), this.debugTrace && console.log("gaevent:", "set", e))
                }
            }, c
        }), i("src/utils/GameState", ["require", "exports", "module"], function(e, t, n) {
            function r(e) {
                var t = e || {};
                this.id = t.id || null, this.preStart = t.preStart || function() {}, this.startAnim = t.startAnim || null, this.start = t.start || function() {}, this.postStart = t.postStart || function() {}, this.preEnd = t.preEnd || function() {}, this.endAnim = t.endAnim || null, this.end = t.end || function() {}, this.postEnd = t.postEnd || function() {}
            }
            return r
        }), i("src/utils/Updatable", ["require", "exports", "module"], function(e, t, n) {
            function r(e) {}
            return r.prototype = {
                update: function(e, t, n, r) {}
            }, r
        }), i("j13e/display/J13DisplayItem", ["require", "exports", "module", "../utils/J13Utils", "../utils/J13EventDispatcher"], function(e, t, n) {
            function o(e) {
                var t = e || {};
                i.call(this, e), this.parent = null, this.x = t.x || 0, this.y = t.y || 0, this.anchorX = t.anchorX || 0, this.anchorY = t.anchorY || 0, this.scaleX = t.hasOwnProperty("scaleX") ? t.scaleX : 1, this.scaleY = t.hasOwnProperty("scaleY") ? t.scaleY : 1, this.angle = t.angle || 0, this.opacity = t.hasOwnProperty("opacity") ? t.opacity : 1, this.visible = t.hasOwnProperty("visible") ? t.visible : !0, t.hasOwnProperty("scale") && (this.scaleX = this.scaleY = t.scale), this.interpolated = t.interpolated || !1, this.interpolateFullAngle = t.hasOwnProperty("interpolateFullAngle") ? t.interpolateFullAngle : !0, this.prevProps = {
                    x: this.x,
                    y: this.y,
                    anchorX: this.anchorX,
                    anchorY: this.anchorY,
                    scaleX: this.scaleX,
                    scaleY: this.scaleY,
                    angle: this.angle,
                    opacity: this.opacity
                }, this.curProps = r.cloneObject(this.prevProps), this.addListener(o.events.added, this.onSelfAdded)
            }
            var r = e("../utils/J13Utils"),
                i = e("../utils/J13EventDispatcher"),
                s = Math.PI * 2;
            return o.events = {
                addedToStage: "addedtostage",
                removedFromStage: "removedfromstage",
                added: "added",
                removed: "removed"
            }, o.prototype = r.inherit(new i, {
                events: o.events,
                onSelfAdded: function(e) {
                    e.source.interpolated && e.source.updatePreviousProperties()
                },
                skipInterpolation: function() {
                    this.updatePreviousProperties()
                },
                updatePreviousProperties: function() {
                    var e = this.prevProps;
                    this.prevProps = this.curProps, this.curProps = e, this.curProps.x = this.x, this.curProps.y = this.y, this.curProps.anchorX = this.anchorX, this.curProps.anchorY = this.anchorY, this.curProps.scaleX = this.scaleX, this.curProps.scaleY = this.scaleY, this.curProps.angle = this.angle, this.curProps.opacity = this.opacity
                },
                stageRender: function(e, t, n, r) {
                    this.interpolated && r.interpolation === 0 && this.updatePreviousProperties(), this.visible && this.opacity > 0 && (this.preRender(e, t, n, r), this.render(e, t, n, r), this.postRender(e, t, n, r))
                },
                preRender: function(e, t, n, r) {
                    var i = r.canvasContext;
                    i.save();
                    if (this.interpolated) {
                        var o = this.prevProps.opacity + (this.opacity - this.prevProps.opacity) * r.interpolation;
                        o < 1 && (i.globalAlpha = i.globalAlpha * o), i.translate(this.prevProps.x + (this.x - this.prevProps.x) * r.interpolation, this.prevProps.y + (this.y - this.prevProps.y) * r.interpolation);
                        if (this.interpolateFullAngle) i.rotate(this.prevProps.angle + (this.angle - this.prevProps.angle) * r.interpolation);
                        else {
                            var u = this.prevProps.angle,
                                a = this.angle % s;
                            while (a - u > Math.PI) a -= s;
                            while (a - u <= -Math.PI) a += s;
                            i.rotate(u + (a - u) * r.interpolation)
                        }
                        i.scale(this.prevProps.scaleX + (this.scaleX - this.prevProps.scaleX) * r.interpolation, this.prevProps.scaleY + (this.scaleY - this.prevProps.scaleY) * r.interpolation), i.translate(-(this.prevProps.anchorX + (this.anchorX - this.prevProps.anchorX) * r.interpolation), -(this.prevProps.anchorY + (this.anchorY - this.prevProps.anchorY) * r.interpolation))
                    } else this.opacity < 1 && (i.globalAlpha = i.globalAlpha * this.opacity), i.translate(this.x, this.y), i.rotate(this.angle), i.scale(this.scaleX, this.scaleY), i.translate(-this.anchorX, -this.anchorY)
                },
                render: function(e, t, n, r) {},
                postRender: function(e, t, n, r) {
                    var i = r.canvasContext;
                    i.restore()
                },
                dispatchAddedToStage: function(e) {
                    this.dispatch(o.events.addedToStage, {
                        stage: e
                    })
                },
                dispatchRemovedFromStage: function(e) {
                    this.dispatch(o.events.removedFromStage, {
                        stage: e
                    })
                },
                getStageX: function() {
                    return this.parent ? this.parent.getStageX() + this.x - this.anchorX : this.x - this.anchorX
                },
                getStageY: function() {
                    return this.parent ? this.parent.getStageY() + this.y - this.anchorY : this.y - this.anchorY
                },
                isOnStage: function() {
                    return this.parent ? this.parent.isOnStage() : !1
                },
                isVisibleOnStage: function() {
                    return this.parent ? this.visible && this.parent.isVisibleOnStage() : !1
                }
            }), o
        }), i("j13e/display/J13DisplayItemContainer", ["require", "exports", "module", "./J13DisplayItem", "../utils/J13Utils"], function(e, t, n) {
            function s(e) {
                var t = e || {};
                r.call(this, e), this.children = []
            }
            var r = e("./J13DisplayItem"),
                i = e("../utils/J13Utils");
            return s.events = {
                childAdded: "childadded",
                childRemoved: "childremoved",
                anyChildAdded: "anychildadded",
                anyChildRemoved: "anychildremoved"
            }, s.prototype = i.inherit(new r, {
                events: i.extendObj(r.prototype.events, s.events),
                render: function(e, t, n, r) {
                    var i = -1;
                    while (++i < this.children.length) this.children[i].stageRender(e, t, n, r)
                },
                addChild: function(e) {
                    return this.children.indexOf(e) === -1 ? (e.parent = this, this.children.push(e), e.dispatch(r.events.added, {
                        parent: this
                    }), this.dispatch(s.events.childAdded, {
                        child: e
                    }), this.dispatchAnyChildAdded(e), !0) : !1
                },
                addChildAt: function(e, t) {
                    var n = this.children.indexOf(e);
                    return n !== -1 && this.children.splice(n, 1), t >= this.children.length ? (e.parent = this, this.children.push(e)) : this.children.splice(t, 0, e), n === -1 && (e.dispatch(r.events.added, {
                        parent: this
                    }), this.dispatch(s.events.childAdded, {
                        child: e
                    }), this.dispatchAnyChildAdded(e)), this.children.length
                },
                removeChild: function(e) {
                    var t = this.children.indexOf(e);
                    return t !== -1 ? (e.parent = null, this.children.splice(t, 1), e.dispatch(r.events.removed, {
                        parent: this
                    }), this.dispatch(s.events.childRemoved, {
                        child: e
                    }), this.dispatchAnyChildRemoved(e), !0) : !1
                },
                removeChildAt: function(e) {
                    if (e < this.children.length) {
                        var t = this.children[e];
                        return t.parent = null, this.children.splice(e, 1), t.dispatch(r.events.removed, {
                            parent: this
                        }), this.dispatch(s.events.childRemoved, {
                            child: t
                        }), this.dispatchAnyChildRemoved(t), t
                    }
                    return null
                },
                getAllChildren: function() {
                    var e = [],
                        t;
                    for (t = 0; t < this.children.length; t += 1) e.push(this.children[t]), this.children[t].getAllChildren && (e = e.concat(this.children[t].getAllChildren()));
                    return e
                },
                dispatchAddedToStage: function(e) {
                    var t;
                    for (t = 0; t < this.children.length; t += 1) this.children[t].dispatchAddedToStage(e);
                    r.prototype.dispatchAddedToStage.call(this, e)
                },
                dispatchRemovedFromStage: function(e) {
                    var t;
                    for (t = 0; t < this.children.length; t += 1) this.children[t].dispatchRemovedFromStage(e);
                    r.prototype.dispatchRemovedFromStage.call(this, e)
                },
                dispatchAnyChildAdded: function(e) {
                    this.dispatch(s.events.anyChildAdded, {
                        child: e
                    }), this.parent && this.parent.dispatchAnyChildAdded(e)
                },
                dispatchAnyChildRemoved: function(e) {
                    this.dispatch(s.events.anyChildRemoved, {
                        child: e
                    }), this.parent && this.parent.dispatchAnyChildRemoved(e)
                }
            }), s
        }), i("j13e/display/J13DisplayLayer", ["require", "exports", "module", "./J13DisplayItemContainer", "../utils/J13Utils"], function(e, t, n) {
            function s(e) {
                var t = e || {};
                r.call(this, e)
            }
            var r = e("./J13DisplayItemContainer"),
                i = e("../utils/J13Utils");
            return s.prototype = i.inherit(new r, {
                preRender: function(e, t, n, r) {},
                postRender: function(e, t, n, r) {}
            }), s
        }), i("src/screens/Screen", ["require", "exports", "module", "src/Settings", "src/utils/Updatable", "j13e/utils/J13Utils", "j13e/display/J13DisplayLayer"], function(e, t, n) {
            function u(e) {
                var t = e || {};
                o.call(this, e), this.visible = t.visible || !1, this.game = t.game || null, this.width = t.width || r.width, this.height = t.height || r.height
            }
            var r = e("src/Settings"),
                i = e("src/utils/Updatable"),
                s = e("j13e/utils/J13Utils"),
                o = e("j13e/display/J13DisplayLayer");
            return u.prototype = s.inherit(new o, i.prototype, {
                update: function(e, t, n, r) {},
                show: function(e) {
                    this.visible = !0
                },
                hide: function(e) {
                    this.visible = !1
                }
            }), u
        }), i("j13e/display/J13DisplayDrawOptions", ["require", "exports", "module", "../utils/J13Utils"], function(e, t, n) {
            function i(e) {
                var t = e || {};
                this.fillStyle = t.fillStyle || null, this.strokeStyle = t.strokeStyle || null, this.lineCap = t.lineCap || null, this.lineJoin = t.lineJoin || null, this.lineWidth = t.hasOwnProperty("lineWidth") ? t.lineWidth : null, this.shadowColor = t.shadowColor || null, this.shadowBlur = t.hasOwnProperty("shadowBlur") ? t.shadowBlur : null, this.shadowOffsetX = t.hasOwnProperty("shadowOffsetX") ? t.shadowOffsetX : null, this.shadowOffsetY = t.hasOwnProperty("shadowOffsetY") ? t.shadowOffsetY : null, this.miterLimit = t.hasOwnProperty("miterLimit") ? t.miterLimit : null, this.postPathOptions = r.extendObj({
                    x: null,
                    y: null,
                    anchorX: null,
                    anchorY: null,
                    angle: null,
                    scaleX: null,
                    scaleY: null
                }, t.postPathOptions || {}), t.postPathOptions && t.postPathOptions.hasOwnProperty("scale") && (this.postPathOptions.scaleX = this.postPathOptions.scaleY = t.postPathOptions.scale)
            }
            var r = e("../utils/J13Utils");
            return i.drawFlags = {
                OUTLINE_BEHIND: 1,
                FILL: 2,
                OUTLINE_FRONT: 4
            }, i.prototype = {
                drawFlags: i.drawFlags,
                applyOptions: function(e) {
                    this.fillStyle !== null && (e.fillStyle = this.fillStyle), this.strokeStyle !== null && (e.strokeStyle = this.strokeStyle), this.lineCap !== null && (e.lineCap = this.lineCap), this.lineJoin !== null && (e.lineJoin = this.lineJoin), this.lineWidth !== null && (e.lineWidth = this.lineWidth), this.shadowColor !== null && (e.shadowColor = this.shadowColor), this.shadowBlur !== null && (e.shadowBlur = this.shadowBlur), this.shadowOffsetX !== null && (e.shadowOffsetX = this.shadowOffsetX), this.shadowOffsetY !== null && (e.shadowOffsetY = this.shadowOffsetY), this.miterLimit !== null && (e.miterLimit = this.miterLimit)
                },
                applyPostPathOptions: function(e) {
                    this.postPathOptions.x !== null && e.translate(this.postPathOptions.x, 0), this.postPathOptions.y !== null && e.translate(0, this.postPathOptions.y), this.postPathOptions.anchorX !== null && e.translate(this.postPathOptions.anchorX, 0), this.postPathOptions.anchorY !== null && e.translate(0, this.postPathOptions.anchorY), this.postPathOptions.angle !== null && e.rotate(this.postPathOptions.angle), this.postPathOptions.scaleX !== null && e.scale(this.postPathOptions.scaleX, 1), this.postPathOptions.scaleY !== null && e.scale(1, this.postPathOptions.scaleY), this.postPathOptions.anchorX !== null && e.translate(-this.postPathOptions.anchorX, 0), this.postPathOptions.anchorY !== null && e.translate(0, -this.postPathOptions.anchorY)
                }
            }, i
        }), i("j13e/display/J13DisplayRect", ["require", "exports", "module", "../math/J13Rect", "./J13DisplayDrawOptions", "./J13DisplayItem", "../utils/J13Utils"], function(e, t, n) {
            function u(e) {
                var t = e || {};
                s.call(this, e), this.rect = t.rect || new r(t), this.rect && !r.isJ13Rect(this.rect, !0) && r.canBeJ13Rect(this.rect) && (this.rect = new r(this.rect)), this.drawOptions = t.drawOptions || new i(e), this.drawFlags = t.drawFlags || i.drawFlags.FILL
            }
            var r = e("../math/J13Rect"),
                i = e("./J13DisplayDrawOptions"),
                s = e("./J13DisplayItem"),
                o = e("../utils/J13Utils");
            return u.prototype = o.inherit(new s, {
                render: function(e, t, n, r) {
                    var s = r.canvasContext;
                    this.drawOptions.applyOptions(s), s.beginPath(), s.rect(this.rect.left, this.rect.top, this.rect.getWidth(), this.rect.getHeight()), s.closePath(), this.drawOptions.applyPostPathOptions(s), (this.drawFlags & i.drawFlags.OUTLINE_BEHIND) > 0 && s.stroke(), (this.drawFlags & i.drawFlags.FILL) > 0 && s.fill(), (this.drawFlags & i.drawFlags.OUTLINE_FRONT) > 0 && s.stroke()
                }
            }), u
        }), i("j13e/display/J13DisplayCircle", ["require", "exports", "module", "../utils/J13Utils", "./J13DisplayItem", "./J13DisplayDrawOptions"], function(e, t, n) {
            function o(e) {
                var t = e || {};
                i.call(this, e), this.radius = t.radius || 5, this.startAngle = t.hasOwnProperty("startAngle") ? t.startAngle : 0, this.endAngle = t.hasOwnProperty("endAngle") ? t.endAngle : 2 * Math.PI, this.counterclockwise = t.hasOwnProperty("counterclockwise") ? t.counterclockwise : !1, this.closeLoop = t.hasOwnProperty("closeLoop") ? t.closeLoop : !0, t.hasOwnProperty("ccw") && (this.counterclockwise = t.ccw), this.drawOptions = t.drawOptions || new s(e), this.drawFlags = t.drawFlags || s.drawFlags.FILL
            }
            var r = e("../utils/J13Utils"),
                i = e("./J13DisplayItem"),
                s = e("./J13DisplayDrawOptions");
            return o.prototype = r.inherit(new i, {
                render: function(e, t, n, r) {
                    var i = r.canvasContext;
                    this.drawOptions.applyOptions(i), i.beginPath(), i.arc(0, 0, this.radius, this.startAngle, this.endAngle, this.counterclockwise), this.closeLoop && i.closePath(), this.drawOptions.applyPostPathOptions(i), (this.drawFlags & s.drawFlags.OUTLINE_BEHIND) > 0 && i.stroke(), (this.drawFlags & s.drawFlags.FILL) > 0 && i.fill(), (this.drawFlags & s.drawFlags.OUTLINE_FRONT) > 0 && i.stroke(), this.closeLoop || i.closePath()
                }
            }), o
        }), i("j13e/display/J13DisplayText", ["require", "exports", "module", "./J13DisplayDrawOptions", "../utils/J13Utils", "./J13DisplayItem", "../utils/J13DOM"], function(e, t, n) {
            function u(e) {
                var t = e || {};
                s.call(this, e), this.drawOptions = t.drawOptions || new r(e), this.drawFlags = t.drawFlags || r.drawFlags.FILL, this.textAlign = t.textAlign || "left", this.textBaseline = t.textBaseline || "top", this.text = t.text || "", this.font = t.font || null
            }
            var r = e("./J13DisplayDrawOptions"),
                i = e("../utils/J13Utils"),
                s = e("./J13DisplayItem"),
                o = e("../utils/J13DOM");
            return u.textMeasureCanvas = null, u.prototype = i.inherit(new s, {
                render: function(e, t, n, i) {
                    var s = i.canvasContext;
                    this.font && (s.font = this.font), this.drawOptions.applyOptions(s), s.textAlign = this.textAlign, s.textBaseline = this.textBaseline, (this.drawFlags & r.drawFlags.OUTLINE_BEHIND) > 0 && s.strokeText(this.text, 0, 0), (this.drawFlags & r.drawFlags.FILL) > 0 && s.fillText(this.text, 0, 0), (this.drawFlags & r.drawFlags.OUTLINE_FRONT) > 0 && s.strokeText(this.text, 0, 0)
                },
                getTextWidth: function() {
                    u.textMeasureCanvas === null && (u.textMeasureCanvas = o.create("canvas"), u.textMeasureCanvas.width = 1, u.textMeasureCanvas.height = 1);
                    var e = u.textMeasureCanvas,
                        t = e.getContext("2d");
                    return t.font = this.font, t.measureText(this.text).width
                }
            }), u
        }), i("src/screens/PreloadScreen", ["require", "exports", "module", "src/Resources", "./Screen", "j13e/utils/J13Utils", "j13e/math/J13Rect", "j13e/anim/J13Anim", "j13e/display/J13DisplayRect", "j13e/display/J13DisplayCircle", "j13e/display/J13DisplayDrawOptions", "j13e/display/J13DisplayText"], function(e, t, n) {
            function h(e) {
                var t = e || {};
                i.call(this, e), this.prefix = t.prefix || "", this.suffix = t.suffix || "", this.bg = new a({
                    rect: new o({
                        width: this.width,
                        height: this.height
                    }),
                    fillStyle: "#006600"
                }), this.addChild(this.bg), this.bar1 = new f({
                    x: this.width / 2,
                    y: this.height / 2,
                    radius: 150,
                    drawFlags: l.drawFlags.OUTLINE_FRONT,
                    strokeStyle: "#3a3a3a",
                    lineWidth: 20,
                    lineCap: "square",
                    startAngle: -Math.PI / 2,
                    endAngle: -Math.PI / 2,
                    closeLoop: !1,
                    shadowColor: "#222222",
                    shadowBlur: 10
                }), this.addChild(this.bar1), this.bar2 = new f({
                    x: this.width / 2,
                    y: this.height / 2,
                    radius: 130,
                    drawFlags: l.drawFlags.OUTLINE_FRONT,
                    strokeStyle: "#996633",
                    lineWidth: 20,
                    lineCap: "square",
                    startAngle: -Math.PI / 2,
                    endAngle: -Math.PI / 2,
                    closeLoop: !1
                }), this.addChild(this.bar2), this.preloadText = new c({
                    font: "30px Arial",
                    fillStyle: "#ffffff",
                    text: "Loading..",
                    textBaseline: "middle",
                    textAlign: "center",
                    x: this.width / 2,
                    y: this.height / 2,
                    shadowColor: "#000000",
                    shadowBlur: 10
                }), this.addChild(this.preloadText), this.shakeAnim = new u({
                    startValue: 50,
                    endValue: 0,
                    duration: 500,
                    stepCallback: function(e) {
                        var t = Math.random() * Math.PI * 2,
                            n = Math.cos(t) * e,
                            r = Math.sin(t) * e;
                        this.bg.anchorX = n, this.bg.anchorY = r, this.bar1.anchorX = n, this.bar1.anchorY = r, this.bar2.anchorX = n, this.bar2.anchorY = r, this.preloadText.anchorX = n, this.preloadText.anchorY = r
                    }.bind(this),
                    endCallback: function(e) {
                        var t = e,
                            n = e;
                        this.bg.anchorX = t, this.bg.anchorY = n, this.bar1.anchorX = t, this.bar1.anchorY = n, this.bar2.anchorX = t, this.bar2.anchorY = n, this.preloadText.anchorX = t, this.preloadText.anchorY = n
                    }.bind(this)
                })
            }
            var r = e("src/Resources"),
                i = e("./Screen"),
                s = e("j13e/utils/J13Utils"),
                o = e("j13e/math/J13Rect"),
                u = e("j13e/anim/J13Anim"),
                a = e("j13e/display/J13DisplayRect"),
                f = e("j13e/display/J13DisplayCircle"),
                l = e("j13e/display/J13DisplayDrawOptions"),
                c = e("j13e/display/J13DisplayText");
            return h.prototype = s.inherit(new i, {
                setBar: function(e) {
                    var t = e * Math.PI * 2 - Math.PI / 2;
                    this.bar1.endAngle = t, this.bar2.endAngle = t
                },
                setText: function(e, t) {
                    this.preloadText.text = e
                },
                setPrefix: function(e) {
                    this.prefix = e
                },
                setSuffix: function(e) {
                    this.suffix = e
                },
                setPercent: function(e, t) {
                    this.preloadText.text = this.prefix + Math.floor(e) + "%" + this.suffix, this.setBar(e / 100)
                },
                playFullyLoadedAnim: function() {
                    this.setPercent(100, !0), r.animManager.startAnim(this.shakeAnim)
                }
            }), h
        }), i("src/screens/scenes/levelparts/LevelConstants", ["require", "exports", "module"], function(e, t, n) {
            var r = {};
            return r.directions = {
                backward: 1,
                forward: 2
            }, r.lanes = {
                inner: 1,
                outer: 2
            }, r.events = {
                lap: "lap",
                collided: "collided"
            }, r.levelStates = {
                idle: 1,
                playing: 2,
                finished: 3
            }, r
        }), i("j13e/math/J13Circ", ["require", "exports", "module", "./J13Vec2", "./J13Math"], function(e, t, n) {
            function s(e, t, n) {
                this.x = e || 0, this.y = t || 0, this.radius = n || 0
            }
            var r = e("./J13Vec2"),
                i = e("./J13Math");
            return s.prototype = {
                getRadiusSquared: function() {
                    return this.radius * this.radius
                },
                getCenter: function() {
                    return new r(this.x, this.y)
                },
                intersectsCirc: function(e) {
                    return i.intersectCircCirc(this.x, this.y, this.radius, e.x, e.y, e.radius)
                },
                intersectsRect: function(e) {
                    return i.intersectRectCirc(e.getCenterX(), e.getCenterY(), e.getWidth(), e.getHeight(), this.x, this.y, this.radius)
                }
            }, s
        }), i("src/screens/scenes/levelparts/Participant", ["require", "exports", "module", "src/utils/Updatable", "./LevelConstants", "j13e/math/J13Vec2", "j13e/math/J13Circ", "j13e/display/J13DisplayItem", "j13e/utils/J13Utils"], function(e, t, n) {
            function f(e) {
                var t = e || {};
                u.call(this, a.extendObj({
                    interpolated: !0,
                    interpolateFullAngle: !1
                }, t)), this.track = t.track || null, this.linearPosition = t.linearPosition || 0, this.direction = t.direction || i.directions.forward, this.lane = t.lane || i.lanes.inner, this.speed = t.speed || f.speed, this.switchLaneSpeed = t.switchLaneSpeed || f.switchLaneSpeed, this.velocity = 0, this.accel = 0, this.targetVelocity = 0, this.stoppingBehavior = t.stoppingBehavior || null, this.displayItem = t.displayItem || null, this.hitCirc = t.hitCirc || new o(0, 0, t.radius || 0), this.position = new s, this.sectorIndex = 0, this.sector = null, this.laneRatio = this.lane === i.lanes.inner ? 1 : -1, this.cacheObj = {
                    linearPosition: this.linearPosition,
                    sector: this.sector,
                    sectorIndex: this.sectorIndex,
                    position: this.position
                }, this.state = f.states.idle
            }
            var r = e("src/utils/Updatable"),
                i = e("./LevelConstants"),
                s = e("j13e/math/J13Vec2"),
                o = e("j13e/math/J13Circ"),
                u = e("j13e/display/J13DisplayItem"),
                a = e("j13e/utils/J13Utils");
            return f.accel = 500, f.speed = 200, f.switchLaneSpeed = 20, f.states = {
                idle: 1,
                moving: 2,
                collided: 3,
                stopped: 4
            }, f.prototype = a.inherit(Object.create(u.prototype), r.prototype, {
                setTargetVelocity: function(e) {
                    this.targetVelocity = e
                },
                start: function() {
                    this.state === f.states.idle && (this.targetVelocity = this.direction === i.directions.forward ? this.speed : -this.speed, this.state = f.states.moving)
                },
                stop: function() {
                    this.state === f.states.moving && (this.stoppingBehavior && this.stoppingBehavior.startStopping(this), this.state = f.states.stopped)
                },
                isStopped: function() {
                    return this.state === f.states.collided || this.state === f.states.stopped
                },
                startCollision: function() {
                    this.state === f.states.moving && (this.targetVelocity = 0, this.velocity = 0, this.switchLaneSpeed = 0, this.state = f.states.collided)
                },
                switchLanes: function() {
                    this.lane = this.lane === i.lanes.inner ? i.lanes.outer : i.lanes.inner
                },
                render: function(e, t, n, r) {
                    this.displayItem && this.displayItem.render(e, t, n, r)
                },
                updateLaneRatio: function(e, t, n, r) {
                    this.lane === i.lanes.inner && this.laneRatio < 1 ? (this.laneRatio += this.switchLaneSpeed * t, this.laneRatio > 1 && (this.laneRatio = 1)) : this.lane === i.lanes.outer && this.laneRatio > -1 && (this.laneRatio -= this.switchLaneSpeed * t, this.laneRatio < -1 && (this.laneRatio = -1))
                },
                updatePositionOnTrack: function() {
                    this.cacheObj = this.track.getPositionInTrack(this.linearPosition, this.sectorIndex, this.direction, this.cacheObj), this.linearPosition = this.cacheObj.linearPosition, this.sectorIndex = this.cacheObj.sectorIndex, this.sector = this.cacheObj.sector, this.position = this.cacheObj.position;
                    var e = 1;
                    this.x = this.position.x + this.sector.perpendicular.x * this.track.laneHalfWidth * this.laneRatio * e, this.y = this.position.y + this.sector.perpendicular.y * this.track.laneHalfWidth * this.laneRatio * e, this.angle = Math.atan2(this.sector.direction.y, this.sector.direction.x)
                },
                updateHitCirc: function() {
                    this.hitCirc.x = this.x, this.hitCirc.y = this.y
                },
                forceUpdatePosition: function() {
                    this.updatePositionOnTrack(), this.updateHitCirc()
                },
                update: function(e, t, n, r) {
                    this.state === f.states.moving ? (this.velocity += this.accel * t, Math.abs(this.velocity - this.targetVelocity) < this.accel * t ? (this.velocity = this.targetVelocity, this.accel = 0) : Math.abs(this.velocity - this.targetVelocity) > this.accel * t && (this.accel = this.targetVelocity > this.velocity ? f.accel : -f.accel), this.linearPosition += this.velocity * t, this.updateLaneRatio(e, t, n, r), this.updatePositionOnTrack(), this.updateHitCirc()) : this.state === f.states.stopped && this.stoppingBehavior && this.stoppingBehavior.update(this, e, t, n, r)
                }
            }), f
        }), i("src/screens/scenes/levelparts/LapBlock", ["require", "exports", "module"], function(e, t, n) {
            function r(e) {
                var t = e || {};
                this.lap = t.lap || 0, this.startOfLapBlockChange = t.startOfLapBlockChange || function(e) {}, this.firstQuarterLapChange = t.firstQuarterLapChange || function(e) {}, this.secondQuarterLapChange = t.secondQuarterLapChange || function(e) {}, this.thirdQuarterLapChange = t.thirdQuarterLapChange || function(e) {}, this.firstQuarterLapChangePerEnemy = t.firstQuarterLapChangePerEnemy || function(e, t) {}, this.secondQuarterLapChangePerEnemy = t.secondQuarterLapChangePerEnemy || function(e, t) {}, this.thirdQuarterLapChangePerEnemy = t.thirdQuarterLapChangePerEnemy || function(e, t) {}
            }
            return r
        }), i("src/screens/scenes/Scene", ["require", "exports", "module", "src/Settings", "src/utils/Updatable", "j13e/utils/J13Utils", "j13e/display/J13DisplayItemContainer"], function(e, t, n) {
            function u(e) {
                var t = e || {};
                o.call(this, e), this.game = t.game || null, this.width = t.width || r.width, this.height = t.height || r.height
            }
            var r = e("src/Settings"),
                i = e("src/utils/Updatable"),
                s = e("j13e/utils/J13Utils"),
                o = e("j13e/display/J13DisplayItemContainer");
            return u.prototype = s.inherit(new o, i.prototype, {
                update: function(e, t, n, r) {},
                show: function(e) {
                    this.visible = !0
                },
                hide: function(e) {
                    this.visible = !1
                }
            }), u
        }), i("j13e/display/J13DisplayImg", ["require", "exports", "module", "./J13DisplayItem", "../math/J13Rect", "../utils/J13Utils"], function(e, t, n) {
            function o(e) {
                var t = e || {};
                r.call(this, e), this.image = t.image || t.img || null, this.sourceRect = t.sourceRect || null, this.destRect = t.destRect || null, this.sourceRect && !i.isJ13Rect(this.sourceRect, !0) && i.canBeJ13Rect(this.sourceRect) && (this.sourceRect = new i(this.sourceRect)), this.destRect && !i.isJ13Rect(this.destRect, !0) && i.canBeJ13Rect(this.destRect) && (this.destRect = new i(this.destRect)), !this.sourceRect && this.image && (this.sourceRect = new i({
                    left: 0,
                    top: 0,
                    right: this.image.width,
                    bottom: this.image.height
                })), !this.destRect && this.image && (this.destRect = this.sourceRect.copy())
            }
            var r = e("./J13DisplayItem"),
                i = e("../math/J13Rect"),
                s = e("../utils/J13Utils");
            return o.prototype = s.inherit(new r, {
                render: function(e, t, n, r) {
                    var i = r.canvasContext;
                    i.drawImage(this.image, this.sourceRect.left, this.sourceRect.top, this.sourceRect.getWidth(), this.sourceRect.getHeight(), this.destRect.left, this.destRect.top, this.destRect.getWidth(), this.destRect.getHeight())
                },
                setSourceRectFromImage: function(e) {
                    this.sourceRect.setPosition(0, 0), this.sourceRect.setWidth(e.width), this.sourceRect.setHeight(e.height)
                },
                setDestRectFromImage: function(e) {
                    this.destRect.setPosition(0, 0), this.destRect.setWidth(e.width), this.destRect.setHeight(e.height)
                }
            }), o
        }), i("src/utils/ExtDisplayCanvas", ["require", "exports", "module", "j13e/utils/J13DOM", "j13e/utils/J13Utils", "j13e/display/J13DisplayImg", "j13e/display/J13DisplayItemContainer"], function(e, t, n) {
            function u(e) {
                var t = e || {};
                o.call(this, e), this.width = t.width || 0, this.height = t.height || 0, this.extCanvas = r.create("canvas"), this.extCanvas.width = this.width, this.extCanvas.height = this.height, this.extContext = this.extCanvas.getContext("2d"), this.renderContext = {
                    canvas: this.extCanvas,
                    canvasContext: this.extContext
                }, this.displayImg = new s({
                    image: this.extCanvas
                })
            }
            var r = e("j13e/utils/J13DOM"),
                i = e("j13e/utils/J13Utils"),
                s = e("j13e/display/J13DisplayImg"),
                o = e("j13e/display/J13DisplayItemContainer");
            return u.prototype = i.inherit(Object.create(o.prototype), {
                updateCanvas: function(e, t, n, r) {
                    this.extCanvas.width = this.extCanvas.width, this.extContext.clearRect(0, 0, this.width, this.height), o.prototype.render.call(this, e, t, n, this.renderContext)
                },
                render: function(e, t, n, r) {
                    this.displayImg.stageRender(e, t, n, r)
                }
            }), u
        }), i("j13e/anim/J13AnimGroup", ["require", "exports", "module", "./J13Anim", "../utils/J13Utils"], function(e, t, n) {
            function s(e) {
                var t = e || {},
                    n, i = 0,
                    s;
                r.call(this, e), this.anims = t.anims || [], this.applyDuration = t.hasOwnProperty("applyDuration") || -1, this.overrideUseLogicTime = t.overrideUseLogicTime || !1, this.recalculateDuration()
            }
            var r = e("./J13Anim"),
                i = e("../utils/J13Utils");
            return s.prototype = i.inherit(new r, {
                recalculateDuration: function() {
                    var e = 0,
                        t, n;
                    if (this.applyDuration !== -1) {
                        this.duration = this.applyDuration;
                        for (t = 0; t < this.anims.length; t += 1) this.anims[t].duration = this.duration
                    } else {
                        for (t = 0; t < this.anims.length; t += 1) n = this.anims[t], n.duration > e && (e = n.duration);
                        this.duration = e
                    }
                },
                preStart: function() {
                    var e;
                    for (e = 0; e < this.anims.length; e += 1) this.anims[e].data || (this.anims[e].data = this.data), this.anims[e].preStart();
                    r.prototype.preStart.call(this)
                },
                start: function(e, t) {
                    var n;
                    r.prototype.start.call(this, e, t);
                    for (n = 0; n < this.anims.length; n += 1) this.overrideUseLogicTime && (this.anims[n].useLogicTime = this.useLogicTime), this.anims[n].start(e, t)
                },
                step: function(e, t) {
                    var n;
                    r.prototype.step.call(this, e, t);
                    for (n = 0; n < this.anims.length; n += 1)
                        if (this.anims[n].prepared) {
                            var i = this.anims[n];
                            i.shouldBeAnimating(e, t) ? i.step(e, t) : i.shouldBeDone(e, t) && (i.step(e, t), i.end())
                        }
                },
                end: function() {
                    var e;
                    r.prototype.end.call(this);
                    for (e = 0; e < this.anims.length; e += 1) this.anims[e].prepared && this.anims[e].end()
                },
                stop: function() {
                    var e;
                    r.prototype.stop.call(this);
                    for (e = 0; e < this.anims.length; e += 1) this.anims[e].stop()
                }
            }), s
        }), i("src/screens/scenes/BaseLevelScene", ["require", "exports", "module", "src/Resources", "./Scene", "./levelparts/LevelConstants", "src/utils/ExtDisplayCanvas", "j13e/anim/J13Anim", "j13e/anim/J13AnimSequence", "j13e/anim/J13AnimGroup", "j13e/display/J13DisplayImg", "j13e/display/J13DisplayLayer", "j13e/utils/J13Utils"], function(e, t, n) {
            function p(e) {
                var t = e || {};
                i.call(this, e), this.bgImage = t.bgImage || null, this.player = t.player || null, this.trackEnemies = t.trackEnemies || [], this.laps = 0, this.lapBlock = t.lapBlock || null, this.getLapBlock = t.getLapBlock || function() {}, this.trackImage = t.trackImage || null, this.track = t.track || null, this.collisionEffect = t.collisionEffect || null, this.collisionEnabled = t.hasOwnProperty("collisionEnabled") ? t.collisionEnabled : !0, this.revPlaying = !1, this.canvasBg = new o({
                    width: this.width,
                    height: this.height
                }), this.addChild(this.canvasBg), this.canvasBg.addChild(new l({
                    image: this.bgImage
                })), this.trackDisplayImage = new l({
                    x: 0,
                    y: 0,
                    image: this.trackImage
                }), this.canvasBg.addChild(this.trackDisplayImage), this.canvasBg.updateCanvas(), this.participantLayer = new c, this.addChild(this.participantLayer), this.collisionEffectLayer = new c({
                    visible: !1
                }), this.addChild(this.collisionEffectLayer), this.tutorialText = t.tutorialText || null, this.tutorialTextDismissAnim = t.tutorialTextDismissAnim || null, this.tutorialText && (this.addChild(this.tutorialText), this.tutorialTextDismissAnim && r.animManager.startAnim(this.tutorialTextDismissAnim)), this.scoreText = t.scoreText || null, this.scoreText && this.addChild(this.scoreText), this.hiScoreScene = t.hiScoreScene || null, this.hiScoreScene && this.addChild(this.hiScoreScene), this.shakeAnim = new u({
                    startValue: 50,
                    endValue: 0,
                    duration: 500,
                    stepCallback: function(e) {
                        var t = Math.random() * Math.PI * 2;
                        this.anchorX = Math.cos(t) * e, this.anchorY = Math.sin(t) * e
                    }.bind(this),
                    endCallback: function(e) {
                        this.anchorX = e, this.anchorY = e
                    }
                }), this.state = s.levelStates.idle
            }
            var r = e("src/Resources"),
                i = e("./Scene"),
                s = e("./levelparts/LevelConstants"),
                o = e("src/utils/ExtDisplayCanvas"),
                u = e("j13e/anim/J13Anim"),
                a = e("j13e/anim/J13AnimSequence"),
                f = e("j13e/anim/J13AnimGroup"),
                l = e("j13e/display/J13DisplayImg"),
                c = e("j13e/display/J13DisplayLayer"),
                h = e("j13e/utils/J13Utils");
            return p.prototype = h.inherit(new i, {
                showHiScore: function(e) {
                    this.hiScoreScene && this.hiScoreScene.show(e)
                },
                updateScoreText: function(e) {
                    this.scoreText && (this.scoreText.text = e.toString())
                },
                initParticipants: function() {
                    this.player.track = this.track, this.player.forceUpdatePosition(), this.trackEnemies.forEach(function(e) {
                        e.track = this.track, e.forceUpdatePosition(), this.participantLayer.addChild(e)
                    }, this), this.participantLayer.addChild(this.player)
                },
                start: function() {
                    this.state = s.levelStates.playing, this.player.start(), this.trackEnemies.forEach(function(e) {
                        e.start()
                    }, this), r.soundManager.play(r.soundNames.rev), this.revPlaying = !0
                },
                stop: function() {
                    this.collisionEffect && (this.collisionEffect.stop(), this.removeChild(this.collisionEffect)), r.soundManager.stop(r.soundNames.rev), this.revPlaying = !1
                },
                switchLanes: function() {
                    this.state === s.levelStates.playing && this.player.switchLanes()
                },
                update: function(e, t, n, i) {
                    if (this.state !== s.levelStates.idle) {
                        var o, u, a, f, l, c = !1,
                            h = 0;
                        this.lapBlock || (this.lapBlock = this.getLapBlock(this.laps)), this.player && (a = this.player.linearPosition, this.player.update(e, t, n, i));
                        for (o = 0; o < this.trackEnemies.length; o += 1) {
                            u = this.trackEnemies[o];
                            if (this.state === s.levelStates.finished && !u.isStopped()) {
                                var p = o > 0 ? o - 1 : this.trackEnemies.length - 1,
                                    d = this.trackEnemies[p];
                                if (d.isStopped()) {
                                    var v = d.linearPosition - u.linearPosition;
                                    u.direction === s.directions.forward && v < 0 ? v += this.track.length : u.direction === s.directions.backward && v > 0 && (v -= this.track.length), Math.abs(v) < 113 && (u.stop(), c = !0)
                                }
                            }
                            l = u.linearPosition, o === 0 && (f = this.trackEnemies[0].linearPosition), u.update(e, t, n, i), o === 0 && this.lapBlock && (this.track.length / 4 < f && this.track.length / 4 > u.linearPosition ? this.lapBlock.firstQuarterLapChange(this.trackEnemies) : this.track.length / 2 < f && this.track.length / 2 > u.linearPosition ? this.lapBlock.secondQuarterLapChange(this.trackEnemies) : this.track.length - this.track.length / 4 < f && this.track.length - this.track.length / 4 > u.linearPosition && this.lapBlock.thirdQuarterLapChange(this.trackEnemies)), this.collisionEnabled && this.player && this.state === s.levelStates.playing && this.player.hitCirc.intersectsCirc(u.hitCirc) && (this.player.startCollision(), u.startCollision(), r.animManager.startAnim(this.shakeAnim), r.soundManager.play(Math.random() < .5 ? r.soundNames.crash1 : r.soundNames.crash2), this.collisionEffect && (this.collisionEffectLayer.visible = !0, this.collisionEffectLayer.addChild(this.collisionEffect), this.collisionEffect.collisionAt((this.player.x + u.x) / 2, (this.player.y + u.y) / 2)), this.state = s.levelStates.finished, this.dispatch(s.events.collided)), this.lapBlock && (this.track.length / 4 < l && this.track.length / 4 > u.linearPosition ? this.lapBlock.firstQuarterLapChangePerEnemy(u, this.trackEnemies) : this.track.length / 2 < l && this.track.length / 2 > u.linearPosition ? this.lapBlock.secondQuarterLapChangePerEnemy(u, this.trackEnemies) : this.track.length - this.track.length / 4 < l && this.track.length - this.track.length / 4 > u.linearPosition && this.lapBlock.thirdQuarterLapChangePerEnemy(u, this.trackEnemies)), u.isStopped() || (h += 1)
                        }
                        c && r.soundManager.play(r.soundNames.skid), this.revPlaying && h === 0 && (r.soundManager.stop(r.soundNames.rev), this.revPlaying = !1);
                        if (this.state === s.levelStates.playing) {
                            var m = !1;
                            this.player && (this.player.direction === s.directions.forward && this.player.linearPosition < a ? (m = !0, this.laps += 1, this.dispatch(s.events.lap)) : this.player.direction === s.directions.backward && this.player.linearPosition > a && (m = !0, this.laps += 1, this.dispatch(s.events.lap)));
                            if (m) {
                                var g = this.getLapBlock(this.laps);
                                g && (this.lapBlock = g, this.lapBlock.startOfLapBlockChange(this.trackEnemies))
                            }
                        }
                    }
                }
            }), p
        }), i("j13e/display/J13DisplayPath", ["require", "exports", "module", "./J13DisplayItem", "./J13DisplayDrawOptions", "../utils/J13Utils"], function(e, t, n) {
            function o(e) {
                var t = e || {};
                r.call(this, e), this.closeLoop = t.hasOwnProperty("closeLoop") ? t.closeLoop : !0, this.points = t.points || [], this.drawOptions = t.drawOptions || new i(e), this.drawFlags = t.drawFlags || i.drawFlags.FILL
            }
            var r = e("./J13DisplayItem"),
                i = e("./J13DisplayDrawOptions"),
                s = e("../utils/J13Utils");
            return o.types = {
                quadraticCurveTo: "quadraticcurveto",
                bezierCurveTo: "beziercurveto",
                arc: "arc",
                arcTo: "arcto",
                lineTo: "lineto"
            }, o.prototype = s.inherit(new r, {
                render: function(e, t, n, r) {
                    var s = r.canvasContext,
                        u;
                    this.drawOptions.applyOptions(s), s.beginPath();
                    for (u = 0; u < this.points.length; u += 1) {
                        var a = this.points[u],
                            f = a.type || o.types.lineTo;
                        if (u === 0) s.moveTo(a.x, a.y);
                        else switch (f) {
                            case o.types.arcTo:
                                s.arcTo(a.x1, a.y1, a.x2, a.y2, a.radius);
                                break;
                            case o.types.arc:
                                s.arc(a.x, a.y, a.radius, a.startAngle, a.endAngle, a.ccw || !1);
                                break;
                            case o.types.quadraticCurveTo:
                                s.quadraticCurveTo(a.cx, a.cy, a.x, a.y);
                                break;
                            case o.types.bezierCurveTo:
                                s.bezierCurveTo(a.x1, a.y1, a.x2, a.y2, a.x, a.y);
                                break;
                            case o.types.lineTo:
                                s.lineTo(a.x, a.y);
                                break;
                            default:
                                s.lineTo(a.x, a.y)
                        }
                    }
                    this.closeLoop && s.closePath(), this.drawOptions.applyPostPathOptions(s), (this.drawFlags & i.drawFlags.OUTLINE_BEHIND) > 0 && s.stroke(), (this.drawFlags & i.drawFlags.FILL) > 0 && s.fill(), (this.drawFlags & i.drawFlags.OUTLINE_FRONT) > 0 && s.stroke(), this.closeLoop || s.closePath()
                }
            }), o
        }), i("j13e/math/J13Mat22", ["require", "exports", "module", "./J13Vec2"], function(e, t, n) {
            function i() {
                this.col1 = new r(1, 0), this.col2 = new r(0, 1)
            }
            var r = e("./J13Vec2");
            return i.prototype = {
                addM: function(e) {
                    this.col1.x += e.col1.x, this.col1.y += e.col1.y, this.col2.x += e.col2.x, this.col2.y += e.col2.y
                },
                getAngle: function() {
                    return Math.atan2(this.col1.y, this.col1.x)
                },
                getInverse: function(e) {
                    e || (e = new i);
                    var t = this.col1.x,
                        n = this.col2.x,
                        r = this.col1.y,
                        s = this.col2.y,
                        o = t * s - n * r;
                    o !== 0 && (o = 1 / o), e.col1.x = o * s, e.col2.x = -o * n, e.col1.y = -o * r, e.col2.y = o * t
                },
                solve: function(e, t, n) {
                    e || (e = new r);
                    var i = this.col1.x,
                        s = this.col2.x,
                        o = this.col1.y,
                        u = this.col2.y,
                        a = i * u - s * o;
                    return a !== 0 && (a = 1 / a), e.x = a * (u * t - s * n), e.y = a * (i * n - o * t), e
                },
                abs: function() {
                    this.col1.abs(), this.col2.abs()
                },
                setIdentity: function() {
                    this.col1.x = 1, this.col2.x = 0, this.col1.y = 0, this.col2.y = 1
                },
                setZero: function() {
                    this.col1.x = 0, this.col2.x = 0, this.col1.y = 0, this.col2.y = 0
                },
                set: function(e, t) {
                    typeof e == "number" ? this.setAngle(e) : e && e.hasOwnProperty("col1") && e.hasOwnProperty("col2") ? this.setM(e) : e && t && e.hasOwnProperty("x") && e.hasOwnProperty("y") && t.hasOwnProperty("x") && t.hasOwnProperty("y") && this.setVV(e, t)
                },
                setVV: function(e, t) {
                    this.col1.set(e), this.col2.set(t)
                },
                setAngle: function(e) {
                    var t = Math.cos(e),
                        n = Math.sin(e);
                    this.col1.x = t, this.col2.x = -n, this.col1.y = n, this.col2.y = t
                },
                setM: function(e) {
                    this.col1.set(e.col1), this.col2.set(e.col2)
                },
                copy: function() {
                    var e = new i;
                    return e.set(this), e
                }
            }, i
        }), i("src/screens/scenes/levelparts/Sector", ["require", "exports", "module", "j13e/math/J13Vec2", "j13e/math/J13Mat22"], function(e, t, n) {
            function o(e, t, n, i) {
                this.min = e, this.max = t, this.minPoint = n, this.maxPoint = i, this.length = this.max - this.min, this.direction = new r(this.maxPoint.x - this.minPoint.x, this.maxPoint.y - this.minPoint.y), this.direction.normalize(), this.perpendicular = this.direction.copy(), this.perpendicular.mulM(s)
            }
            var r = e("j13e/math/J13Vec2"),
                i = e("j13e/math/J13Mat22"),
                s = new i;
            return s.setAngle(Math.PI / 2), o.prototype = {
                contains: function(e) {
                    return e >= this.min && e < this.max
                },
                getPosition: function(e, t) {
                    t || (t = new r);
                    var n = (e - this.min) / this.length;
                    return t.x = this.minPoint.x + this.direction.x * this.length * n, t.y = this.minPoint.y + this.direction.y * this.length * n, t
                }
            }, o
        }), i("src/screens/scenes/levelparts/Track", ["require", "exports", "module", "./Sector", "./LevelConstants", "j13e/math/J13Math"], function(e, t, n) {
            function o(e) {
                var t = e || {};
                this.points = t.points, this.laneHalfWidth = t.laneHalfWidth, this.sectors = [], this.length = 0, this.calculateSectors()
            }
            var r = e("./Sector"),
                i = e("./LevelConstants"),
                s = e("j13e/math/J13Math");
            return o.prototype = {
                calculateSectors: function() {
                    this.sectors = [];
                    var e = 0,
                        t = null;
                    this.points.forEach(function(n) {
                        if (t) {
                            var i = s.distance(t, n);
                            this.sectors.push(new r(e, e + i, t, n)), e += i
                        }
                        t = n
                    }, this);
                    if (t && this.points[0] && t !== this.points[0]) {
                        var n = this.points[0],
                            i = s.distance(t, n);
                        this.sectors.push(new r(e, e + i, t, n)), e += i
                    }
                    this.length = e
                },
                getPositionInTrack: function(e, t, n, r) {
                    r || (r = {});
                    var s, o = 0,
                        u = null,
                        a = -1,
                        f = e,
                        l = (n || i.directions.forward) === i.directions.forward ? 1 : -1;
                    for (s = t || 0; o < this.sectors.length && !u; s += l, o += 1) s < 0 ? (f += this.sectors[this.sectors.length - 1].max, s = this.sectors.length - 1) : s >= this.sectors.length && (f -= this.sectors[this.sectors.length - 1].max, s = 0), this.sectors[s].contains(f) && (u = this.sectors[s], a = s);
                    return u ? (r.linearPosition = f, r.sector = u, r.sectorIndex = a, r.position = u.getPosition(f, r.position), r) : null
                }
            }, o
        }), i("src/screens/scenes/levels/MainMenuLevel", ["require", "exports", "module", "src/Resources", "../levelparts/Participant", "../levelparts/LevelConstants", "../levelparts/LapBlock", "../BaseLevelScene", "j13e/anim/J13Anim", "j13e/anim/J13AnimSequence", "j13e/display/J13DisplayPath", "j13e/display/J13DisplayText", "j13e/display/J13DisplayImg", "j13e/display/J13DisplayDrawOptions", "../levelparts/Track", "j13e/utils/J13Utils"], function(e, t, n) {
            function m(e) {
                var t = e || {},
                    n = [],
                    f;
                n.push({
                    x: 360,
                    y: 381
                });
                for (f = Math.PI / 2; f <= 3 * Math.PI / 2; f += Math.PI / 32) n.push({
                    x: Math.cos(f) * 140 + 211,
                    y: Math.sin(f) * 140 + 241
                });
                for (f = -Math.PI / 2; f <= Math.PI / 2; f += Math.PI / 32) n.push({
                    x: Math.cos(f) * 140 + 509,
                    y: Math.sin(f) * 140 + 241
                });
                var l = new d({
                        points: n,
                        laneHalfWidth: 11
                    }),
                    c = new i({
                        displayItem: new h({
                            image: r.loadedImages[r.images.rider]
                        }),
                        anchorX: r.loadedImages[r.images.rider].width / 2,
                        anchorY: r.loadedImages[r.images.rider].height / 2,
                        speed: 375,
                        radius: 9,
                        visible: !1
                    }),
                    p = [new i({
                        displayItem: new h({
                            image: r.loadedImages[r.images.car1]
                        }),
                        anchorX: r.loadedImages[r.images.car1].width / 2,
                        anchorY: r.loadedImages[r.images.car1].height / 2,
                        speed: 375,
                        direction: s.directions.backward,
                        lane: s.lanes.outer,
                        linearPosition: -120,
                        radius: 9,
                        switchLaneSpeed: 8
                    }), new i({
                        displayItem: new h({
                            image: r.loadedImages[r.images.car2]
                        }),
                        anchorX: r.loadedImages[r.images.car2].width / 2,
                        anchorY: r.loadedImages[r.images.car2].height / 2,
                        speed: 375,
                        direction: s.directions.backward,
                        lane: s.lanes.outer,
                        linearPosition: -60,
                        radius: 9,
                        switchLaneSpeed: 8
                    }), new i({
                        displayItem: new h({
                            image: r.loadedImages[r.images.car3]
                        }),
                        anchorX: r.loadedImages[r.images.car3].width / 2,
                        anchorY: r.loadedImages[r.images.car3].height / 2,
                        speed: 375,
                        direction: s.directions.backward,
                        lane: s.lanes.outer,
                        linearPosition: 0,
                        radius: 9,
                        switchLaneSpeed: 8
                    })],
                    m = s.lanes.outer,
                    g = new o({
                        lap: 0,
                        startOfLapBlockChange: function(e) {},
                        firstQuarterLapChange: function(e) {
                            m = Math.random() < .5 ? s.lanes.inner : s.lanes.outer
                        },
                        firstQuarterLapChangePerEnemy: function(e) {
                            e.lane = m
                        },
                        secondQuarterLapChange: function(e) {},
                        thirdQuarterLapChange: function(e) {
                            m = Math.random() < .5 ? s.lanes.inner : s.lanes.outer
                        },
                        thirdQuarterLapChangePerEnemy: function(e) {
                            e.lane = m
                        }
                    }),
                    y = new o({
                        lap: 0,
                        startOfLapBlockChange: function(e) {
                            var t;
                            for (t = 1; t < e.length; t += 1) r.animManager.startAnim(new a({
                                useLogicTime: !0,
                                startValue: e[t].targetVelocity - 150 * t,
                                endValue: e[t].targetVelocity,
                                duration: 1e3,
                                startCallback: e[t].setTargetVelocity.bind(e[t]),
                                endCallback: e[t].setTargetVelocity.bind(e[t])
                            }))
                        },
                        firstQuarterLapChange: function(e) {
                            m = Math.random() < .5 ? s.lanes.inner : s.lanes.outer
                        },
                        firstQuarterLapChangePerEnemy: function(e) {
                            e.lane = m
                        },
                        secondQuarterLapChange: function(e) {},
                        thirdQuarterLapChange: function(e) {
                            m = Math.random() < .5 ? s.lanes.inner : s.lanes.outer
                        },
                        thirdQuarterLapChangePerEnemy: function(e) {
                            e.lane = m
                        }
                    }),
                    b = new o({
                        lap: 0,
                        startOfLapBlockChange: function(e) {
                            var t;
                            for (t = 1; t < e.length; t += 1) r.animManager.startAnim(new a({
                                useLogicTime: !0,
                                startValue: e[t].targetVelocity + 150 * t,
                                endValue: e[t].targetVelocity,
                                duration: 1e3,
                                startCallback: e[t].setTargetVelocity.bind(e[t]),
                                endCallback: e[t].setTargetVelocity.bind(e[t])
                            }))
                        },
                        firstQuarterLapChange: function(e) {
                            var t;
                            for (t = 0; t < e.length; t += 1) {
                                var n = Math.random() < .5 ? s.lanes.inner : s.lanes.outer;
                                e[t].lane = n
                            }
                        },
                        secondQuarterLapChange: function(e) {},
                        thirdQuarterLapChange: function(e) {
                            var t;
                            for (t = 0; t < p.length; t += 1) {
                                var n = Math.random() < .5 ? s.lanes.inner : s.lanes.outer;
                                p[t].lane = n
                            }
                        }
                    });
                u.call(this, v.extendObj({
                    bgImage: r.loadedImages[r.images.grasslandBg],
                    trackImage: r.loadedImages[r.images.track1],
                    track: l,
                    player: c,
                    trackEnemies: p,
                    getLapBlock: function(e) {
                        if (e === 0) return g;
                        if (e % 2 === 0) {
                            var t = Math.floor(e / 2);
                            return t % 2 === 0 ? y : b
                        }
                        return null
                    },
                    collisionEnabled: !1
                }, t))
            }
            var r = e("src/Resources"),
                i = e("../levelparts/Participant"),
                s = e("../levelparts/LevelConstants"),
                o = e("../levelparts/LapBlock"),
                u = e("../BaseLevelScene"),
                a = e("j13e/anim/J13Anim"),
                f = e("j13e/anim/J13AnimSequence"),
                l = e("j13e/display/J13DisplayPath"),
                c = e("j13e/display/J13DisplayText"),
                h = e("j13e/display/J13DisplayImg"),
                p = e("j13e/display/J13DisplayDrawOptions"),
                d = e("../levelparts/Track"),
                v = e("j13e/utils/J13Utils");
            return m.prototype = v.inherit(Object.create(u.prototype), {}), m
        }), i("j13e/display/J13Buttonable", ["require", "exports", "module"], function(e, t, n) {
            function r(e) {}
            return r.isButton = function(e) {
                var t;
                if (!e) return !1;
                for (t in r.prototype)
                    if (r.prototype.hasOwnProperty(t) && !e[t]) return !1;
                return !0
            }, r.events = {
                CLICK: "click",
                DOWN: "down",
                UP: "up",
                HOVER: "hover",
                HOVEROUT: "hoverout",
                STATECHANGE: "statechange"
            }, r.prototype = {
                events: r.events,
                getId: function() {
                    throw new Error("getId function must be overridden")
                },
                setWidth: function(e) {
                    throw new Error("setWidth function must be overridden")
                },
                getWidth: function() {
                    throw new Error("getWidth function must be overridden")
                },
                setHeight: function(e) {
                    throw new Error("setHeight function must be overridden")
                },
                getHeight: function() {
                    throw new Error("getHeight function must be overridden")
                },
                click: function(e) {
                    throw new Error("click function must be overridden")
                },
                down: function(e) {
                    throw new Error("down function must be overridden")
                },
                up: function(e) {
                    throw new Error("up function must be overridden")
                },
                hover: function(e) {
                    throw new Error("hover function must be overridden")
                },
                hoverOut: function(e) {
                    throw new Error("hoverOut function must be overridden")
                },
                setEnabled: function(e) {
                    throw new Error("setEnabled function must be overridden")
                },
                isEnabled: function() {
                    throw new Error("isEnabled function must be overridden")
                },
                isUp: function() {
                    throw new Error("isUp function must be overridden")
                },
                isDown: function() {
                    throw new Error("isDown function must be overridden")
                },
                contains: function(e, t) {
                    throw new Error("contains function must be overridden")
                },
                isButtonVisibleOnStage: function() {
                    throw new Error("isButtonVisibleOnStage function must be overridden")
                }
            }, r
        }), i("j13e/display/J13DisplayButton", ["require", "exports", "module", "../utils/J13Utils", "./J13DisplayItem", "./J13Buttonable"], function(e, t, n) {
            function o(e) {
                var t = e || {};
                i.call(this, e), this.displayItem = t.displayItem || this, this.id = t.id || "button-" + o.IDPOOL++, this.state = o.states.UP, this.width = t.width || 0, this.height = t.height || 0, this._enabled = t.hasOwnProperty("enabled") ? t.enabled : !0, t.clickFunction && this.displayItem.addListener(s.events.CLICK, t.clickFunction)
            }
            var r = e("../utils/J13Utils"),
                i = e("./J13DisplayItem"),
                s = e("./J13Buttonable");
            return o.IDPOOL = 0, o.states = {
                UP: "up",
                DOWN: "down",
                HOVER: "hover",
                DISABLED: "disabled"
            }, o.events = r.extendObj(s.prototype.events, {
                STATECHANGE: "statechange"
            }), o.prototype = r.inherit(new i, s.prototype, {
                events: r.extendObj(i.prototype.events, o.events),
                states: o.states,
                getId: function() {
                    return this.id
                },
                click: function(e) {
                    this._enabled && this.displayItem.dispatch(s.events.CLICK, {
                        originalEvent: e
                    })
                },
                down: function(e) {
                    this._enabled && (this.setState(o.states.DOWN), this.displayItem.dispatch(s.events.DOWN, {
                        originalEvent: e
                    }))
                },
                up: function(e) {
                    this._enabled && (this.setState(o.states.UP), this.displayItem.dispatch(s.events.UP, {
                        originalEvent: e
                    }))
                },
                hover: function(e) {
                    this._enabled && (this.setState(o.states.HOVER), this.displayItem.dispatch(s.events.HOVER, {
                        originalEvent: e
                    }))
                },
                hoverOut: function(e) {
                    this._enabled && (this.setState(o.states.UP), this.displayItem.dispatch(s.events.HOVEROUT, {
                        originalEvent: e
                    }))
                },
                setState: function(e) {
                    this.state = e, this.displayItem.dispatch(o.events.STATECHANGE, {
                        state: this.state
                    })
                },
                setEnabled: function(e) {
                    this._enabled = e, this._enabled ? this.setState(o.states.UP) : this.setState(o.states.DISABLED)
                },
                isEnabled: function() {
                    return this._enabled
                },
                isUp: function() {
                    return this.state === o.states.UP
                },
                isDown: function() {
                    return this.state === o.states.DOWN
                },
                contains: function(e, t) {
                    var n = this.getStageX(),
                        r = this.getStageY();
                    return e >= n && e < n + this.width && t >= r && t < r + this.height
                },
                isButtonVisibleOnStage: function() {
                    return this.isVisibleOnStage()
                },
                setWidth: function(e) {
                    this.width = e
                },
                getWidth: function() {
                    return this.width
                },
                setHeight: function(e) {
                    this.height = e
                },
                getHeight: function() {
                    return this.height
                }
            }), o
        }), i("j13e/display/J13DisplaySprite", ["require", "exports", "module", "../utils/J13Utils", "./J13DisplayImg", "../math/J13Rect"], function(e, t, n) {
            function o(e) {
                this.copyFromOptions(e)
            }
            var r = e("../utils/J13Utils"),
                i = e("./J13DisplayImg"),
                s = e("../math/J13Rect");
            return o.prototype = r.inherit(new i, {
                setFrameId: function(e) {
                    var t = this.frameMap[e];
                    t ? (this.currentFrameId = e, this.sourceRect = t) : console.error("J13DisplaySprite: invalid frame ID.")
                },
                copy: function() {
                    var e = r.cloneObject(this.options),
                        t;
                    if (e.frameMap)
                        for (t in e.frameMap) e.frameMap.hasOwnProperty(t) && (e.frameMap[t] = e.frameMap[t].copy());
                    else e.rect && (e.rect = e.rect.copy());
                    return new o(e)
                },
                copyFromOptions: function(e) {
                    var t = e || {};
                    i.call(this, e), this.options = e, this.frameMap = t.frameMap || null, this.currentFrameId = t.startFrameId || t.currentFrameId || null;
                    if (this.frameMap)
                        if (this.currentFrameId) this.setFrameId(this.currentFrameId);
                        else {
                            var n;
                            for (n in this.frameMap)
                                if (this.frameMap.hasOwnProperty(n)) {
                                    this.setFrameId(n);
                                    break
                                }
                        } else t.rect && (this.sourceRect = t.rect, this.sourceRect && !s.isJ13Rect(this.sourceRect, !0) && s.canBeJ13Rect(this.sourceRect) && (this.sourceRect = new s(this.sourceRect)));
                    t.destRect || (this.destRect = this.sourceRect.copy())
                }
            }), o
        }), i("j13e/display/J13DisplaySpriteButton", ["require", "exports", "module", "./J13DisplayButton", "./J13Buttonable", "./J13DisplaySprite", "../utils/J13Utils"], function(e, t, n) {
            function u(e) {
                var t = e || {};
                s.call(this, e), this.button = new r(o.extendObj(t, {
                    displayItem: this
                })), t.hasOwnProperty("width") ? this.button.width = t.width : this.button.width = this.destRect.getWidth(), t.hasOwnProperty("height") ? this.button.height = t.height : this.button.height = this.destRect.getHeight(), this.width = this.button.width, this.height = this.button.height, this.addListener(r.events.STATECHANGE, this.onStateChange.bind(this))
            }
            var r = e("./J13DisplayButton"),
                i = e("./J13Buttonable"),
                s = e("./J13DisplaySprite"),
                o = e("../utils/J13Utils");
            return u.prototype = o.inherit(Object.create(s.prototype), i.prototype, {
                events: o.extendObj(s.prototype.events, i.prototype.events),
                onStateChange: function(e) {
                    if (this.frameMap) switch (e.data.state) {
                        case r.states.UP:
                            this.frameMap.hasOwnProperty("up") && this.setFrameId("up");
                            break;
                        case r.states.DOWN:
                            this.frameMap.hasOwnProperty("down") && this.setFrameId("down");
                            break;
                        case r.states.HOVER:
                            this.frameMap.hasOwnProperty("hover") && this.setFrameId("hover");
                            break;
                        case r.states.DISABLED:
                            this.frameMap.hasOwnProperty("disabled") && this.setFrameId("disabled")
                    }
                },
                getId: function() {
                    return this.button.id
                },
                click: function(e) {
                    this.button.click(e)
                },
                down: function(e) {
                    this.button.down(e)
                },
                up: function(e) {
                    this.button.up(e)
                },
                hover: function(e) {
                    this.button.hover(e)
                },
                hoverOut: function(e) {
                    this.button.hoverOut(e)
                },
                setEnabled: function(e) {
                    this.button.setEnabled(e)
                },
                isEnabled: function() {
                    return this.button.isEnabled()
                },
                isUp: function() {
                    return this.button.isUp()
                },
                isDown: function() {
                    return this.button.isDown()
                },
                getWidth: function() {
                    return this.button.getWidth()
                },
                setWidth: function(e) {
                    return this.button.setWidth(e)
                },
                getHeight: function() {
                    return this.button.getHeight()
                },
                setHeight: function(e) {
                    return this.button.setHeight(e)
                },
                contains: function(e, t) {
                    var n = this.getStageX(),
                        r = this.getStageY();
                    return e >= n && e < n + this.getWidth() && t >= r && t < r + this.getHeight()
                },
                isButtonVisibleOnStage: function() {
                    return this.isVisibleOnStage()
                }
            }), u
        }), i("src/screens/gui/VolumeButton", ["require", "exports", "module", "src/Resources", "j13e/utils/J13Utils", "j13e/display/J13DisplaySpriteButton"], function(e, t, n) {
            function o(e) {
                var t = e || {};
                s.call(this, i.extendObj(r.spriteSheets.volume.getSprite("main").options, t)), this.addListener(this.events.CLICK, this.toggle.bind(this))
            }
            var r = e("src/Resources"),
                i = e("j13e/utils/J13Utils"),
                s = e("j13e/display/J13DisplaySpriteButton");
            return o.prototype = i.inherit(Object.create(s.prototype), {
                toggle: function(e) {
                    r.soundManager.toggleMute(), this.updateIcon()
                },
                updateIcon: function() {
                    r.soundManager.isMuted() ? this.setFrameId("off") : this.setFrameId("on")
                }
            }), o
        }), i("j13e/display/J13DisplayImgButton", ["require", "exports", "module", "./J13Buttonable", "./J13DisplayButton", "./J13DisplayImg", "../utils/J13Utils"], function(e, t, n) {
            function u(e) {
                var t = e || {};
                s.call(this, e), this.button = new i(o.extendObj(t, {
                    displayItem: this
                })), this.upImage = t.upImage || this.image || null, this.downImage = t.downImage || null, this.hoverImage = t.hoverImage || null, this.disabledImage = t.disabledImage || null, t.hasOwnProperty("width") ? this.button.width = t.width : this.button.width = this.destRect.getWidth(), t.hasOwnProperty("height") ? this.button.height = t.height : this.button.height = this.destRect.getHeight(), this.width = this.button.width, this.height = this.button.height, this.addListener(i.events.STATECHANGE, this.onStateChange.bind(this))
            }
            var r = e("./J13Buttonable"),
                i = e("./J13DisplayButton"),
                s = e("./J13DisplayImg"),
                o = e("../utils/J13Utils");
            return u.prototype = o.inherit(Object.create(s.prototype), r.prototype, {
                events: o.extendObj(s.prototype.events, r.prototype.events),
                onStateChange: function(e) {
                    switch (e.data.state) {
                        case i.states.UP:
                            this.upImage && (this.image = this.upImage, this.setSourceRectFromImage(this.image), this.setDestRectFromImage(this.image));
                            break;
                        case i.states.DOWN:
                            this.downImage && (this.image = this.downImage, this.setSourceRectFromImage(this.image), this.setDestRectFromImage(this.image));
                            break;
                        case i.states.HOVER:
                            this.hoverImage && (this.image = this.hoverImage, this.setSourceRectFromImage(this.image), this.setDestRectFromImage(this.image));
                            break;
                        case i.states.DISABLED:
                            this.disabledImage && (this.image = this.disabledImage, this.setSourceRectFromImage(this.image), this.setDestRectFromImage(this.image))
                    }
                },
                getId: function() {
                    return this.button.id
                },
                click: function(e) {
                    this.button.click(e)
                },
                down: function(e) {
                    this.button.down(e)
                },
                up: function(e) {
                    this.button.up(e)
                },
                hover: function(e) {
                    this.button.hover(e)
                },
                hoverOut: function(e) {
                    this.button.hoverOut(e)
                },
                setEnabled: function(e) {
                    this.button.setEnabled(e)
                },
                isEnabled: function() {
                    return this.button.isEnabled()
                },
                isUp: function() {
                    return this.button.isUp()
                },
                isDown: function() {
                    return this.button.isDown()
                },
                getWidth: function() {
                    return this.button.getWidth()
                },
                setWidth: function(e) {
                    return this.button.setWidth(e)
                },
                getHeight: function() {
                    return this.button.getHeight()
                },
                setHeight: function(e) {
                    return this.button.setHeight(e)
                },
                contains: function(e, t) {
                    var n = this.getStageX(),
                        r = this.getStageY();
                    return e >= n && e < n + this.getWidth() && t >= r && t < r + this.getHeight()
                },
                isButtonVisibleOnStage: function() {
                    return this.isVisibleOnStage()
                }
            }), u
        }), i("j13e/display/J13DisplayContainerButton", ["require", "exports", "module", "./J13DisplayItemContainer", "./J13DisplayButton", "./J13Buttonable", "../utils/J13Utils"], function(e, t, n) {
            function u(e) {
                var t = e || {};
                r.call(this, e), this.button = new i(o.extendObj(t, {
                    displayItem: this
                })), this.width = this.button.getWidth(), this.height = this.button.getHeight()
            }
            var r = e("./J13DisplayItemContainer"),
                i = e("./J13DisplayButton"),
                s = e("./J13Buttonable"),
                o = e("../utils/J13Utils");
            return u.prototype = o.inherit(Object.create(r.prototype), s.prototype, {
                events: o.extendObj(r.prototype.events, s.prototype.events),
                getId: function() {
                    return this.button.id
                },
                click: function(e) {
                    this.button.click(e)
                },
                down: function(e) {
                    this.button.down(e)
                },
                up: function(e) {
                    this.button.up(e)
                },
                hover: function(e) {
                    this.button.hover(e)
                },
                hoverOut: function(e) {
                    this.button.hoverOut(e)
                },
                setEnabled: function(e) {
                    this.button.setEnabled(e)
                },
                isEnabled: function() {
                    return this.button.isEnabled()
                },
                isUp: function() {
                    return this.button.isUp()
                },
                isDown: function() {
                    return this.button.isDown()
                },
                getWidth: function() {
                    return this.button.getWidth()
                },
                setWidth: function(e) {
                    return this.button.setWidth(e)
                },
                getHeight: function() {
                    return this.button.getHeight()
                },
                setHeight: function(e) {
                    return this.button.setHeight(e)
                },
                contains: function(e, t) {
                    var n = this.getStageX(),
                        r = this.getStageY();
                    return e >= n && e < n + this.getWidth() && t >= r && t < r + this.getHeight()
                },
                isButtonVisibleOnStage: function() {
                    return this.isVisibleOnStage()
                }
            }), u
        }), i("src/screens/MainMenuScreen", ["require", "exports", "module", "src/Resources", "./Screen", "./scenes/levelparts/LevelConstants", "./scenes/levels/MainMenuLevel", "./gui/VolumeButton", "j13e/math/J13Rect", "j13e/utils/J13Utils", "j13e/anim/J13Anim", "j13e/display/J13DisplayImg", "j13e/display/J13DisplayImgButton", "j13e/display/J13DisplayItemContainer", "j13e/display/J13DisplayContainerButton", "j13e/display/J13DisplayRect", "j13e/display/J13DisplayLayer", "j13e/display/J13DisplayText"], function(e, t, n) {
            function y(e) {
                var t = e || {};
                i.call(this, e), this.level = null, this.levelLayer = new m, this.addChild(this.levelLayer), this.title = new c({
                    x: this.width / 2 - r.loadedImages[r.images.title].width / 2,
                    y: 41,
                    image: r.loadedImages[r.images.title]
                }), this.addChild(this.title);
                var n = this.startButton = new h({
                    id: r.buttons.start,
                    x: this.width / 2 - r.loadedImages[r.images.playButton].width / 2,
                    y: 184,
                    image: r.loadedImages[r.images.playButton],
                    clickFunction: function() {
                        r.gsm.transitioning || r.gsm.toState(r.gameStates.level, {
                            reset: !0
                        })
                    }
                });
                n.addListener(n.events.DOWN, this.onButtonDown), n.addListener(n.events.UP, this.onButtonUp), n.addListener(n.events.CLICK, this.onButtonClick), this.addChild(n);
                var s = this.volumeButton = new u({
                    id: r.buttons.volume,
                    x: this.width - 70,
                    y: 10
                });
                s.addListener(n.events.DOWN, this.onButtonDown), s.addListener(n.events.UP, this.onButtonUp), s.addListener(n.events.CLICK, this.onButtonClick), this.addChild(s);
                var o = new p({
                    x: 0,
                    y: this.height - 30,
                    opacity: 0
                });
                this.addChild(o), o.addChild(new v({
                    rect: new a({
                        width: this.width,
                        height: 30
                    }),
                    fillStyle: "#000000"
                })), o.addChild(new g({
                    x: 5,
                    y: 0,
                    font: "25px Arial",
                    fillStyle: "#ffffff",
                    text: window.gameVersion || "o.O",
                    textAlign: "left",
                    textBaseline: "top"
                }));
                var f = new d({
                    id: r.buttons.version,
                    x: 0,
                    y: 0,
                    width: s.x,
                    height: 90,
                    clickFunction: function() {
                        r.animManager.startAnim(new l({
                            startValue: 1,
                            endValue: 0,
                            duration: 1e3,
                            stepCallback: function(e) {
                                o.opacity = e
                            }
                        }))
                    }
                });
                this.addChild(f)
            }
            var r = e("src/Resources"),
                i = e("./Screen"),
                s = e("./scenes/levelparts/LevelConstants"),
                o = e("./scenes/levels/MainMenuLevel"),
                u = e("./gui/VolumeButton"),
                a = e("j13e/math/J13Rect"),
                f = e("j13e/utils/J13Utils"),
                l = e("j13e/anim/J13Anim"),
                c = e("j13e/display/J13DisplayImg"),
                h = e("j13e/display/J13DisplayImgButton"),
                p = e("j13e/display/J13DisplayItemContainer"),
                d = e("j13e/display/J13DisplayContainerButton"),
                v = e("j13e/display/J13DisplayRect"),
                m = e("j13e/display/J13DisplayLayer"),
                g = e("j13e/display/J13DisplayText");
            return y.prototype = f.inherit(new i, {
                onButtonHover: function(e) {},
                onButtonHoverOut: function(e) {},
                onButtonDown: function(e) {
                    e.source.opacity = .5
                },
                onButtonUp: function(e) {
                    e.source.opacity = 1
                },
                onButtonClick: function(e) {
                    r.soundManager.play(r.soundNames.score)
                },
                update: function(e, t, n, r) {
                    this.level && this.level.update(e, t, n, r)
                },
                clearLevel: function() {
                    this.level && (this.level.removeAllListeners(), this.level.stop(), this.levelLayer.removeChild(this.level), this.level = null)
                },
                show: function(e) {
                    this.clearLevel(), this.level = new o({
                        game: this
                    }), this.levelLayer.addChild(this.level), this.level.initParticipants(), this.level.start(), this.volumeButton.updateIcon(), i.prototype.show.call(this, e)
                },
                hide: function(e) {
                    this.clearLevel(), i.prototype.hide.call(this, e)
                }
            }), y
        }), i("src/screens/scenes/TutScene", ["require", "exports", "module", "src/Resources", "./Scene", "j13e/anim/J13Anim", "j13e/anim/J13AnimSequence", "j13e/anim/J13AnimGroup", "j13e/display/J13DisplayImg", "j13e/utils/J13Utils"], function(e, t, n) {
            function l(e) {
                var t = e || {};
                i.call(this, e);
                var n = r.loadedImages[r.images.arrow],
                    u = r.loadedImages[r.images.flappyArrow],
                    f = r.loadedImages[r.images.flappyGrey],
                    l = r.loadedImages[r.images.flappyMotion],
                    c = this.tutBird = new a({
                        img: f,
                        anchorX: f.width / 2,
                        anchorY: f.height / 2,
                        scale: .6,
                        x: this.width / 2,
                        y: 300
                    });
                this.addChild(c);
                var h = this.flappyArrowLeft = new a({
                    img: u,
                    scale: .75,
                    anchorX: 80,
                    anchorY: 0,
                    x: this.width / 2,
                    y: 210
                });
                this.addChild(h);
                var p = this.flappyArrowRight = new a({
                    img: u,
                    scaleX: -0.75,
                    scaleY: .75,
                    anchorX: 80,
                    anchorY: 0,
                    x: this.width / 2,
                    y: 210
                });
                this.addChild(p);
                var d = this.leftArrow = new a({
                    img: n,
                    scale: .15,
                    x: this.width / 2,
                    y: 304,
                    anchorX: 350,
                    anchorY: n.height / 2
                });
                this.addChild(d);
                var v = this.rightArrow = new a({
                    img: n,
                    scaleX: -0.15,
                    scaleY: .15,
                    x: this.width / 2,
                    y: 304,
                    anchorX: 350,
                    anchorY: n.height / 2
                });
                this.addChild(v);
                var m = this.flappyMotion = new a({
                    img: l,
                    scale: .6,
                    x: this.width / 2,
                    y: 330,
                    anchorX: l.width / 2,
                    anchorY: 0
                });
                this.addChild(m), this.tutAnim = new o({
                    iterations: s.iterationCount.infinite,
                    anims: [new s({
                        duration: 250,
                        startCallback: function() {
                            d.anchorX = v.anchorX = 370
                        }
                    }), new s({
                        duration: 250,
                        startCallback: function() {
                            d.anchorX = v.anchorX = 350
                        }
                    })]
                })
            }
            var r = e("src/Resources"),
                i = e("./Scene"),
                s = e("j13e/anim/J13Anim"),
                o = e("j13e/anim/J13AnimSequence"),
                u = e("j13e/anim/J13AnimGroup"),
                a = e("j13e/display/J13DisplayImg"),
                f = e("j13e/utils/J13Utils");
            return l.prototype = f.inherit(new i, {
                show: function(e) {
                    this.opacity = 1, r.animManager.restartAnim(this.tutAnim), i.prototype.show.call(this, e)
                },
                hide: function(e) {
                    var t = this;
                    r.animManager.startAnim(new s({
                        startValue: 1,
                        endValue: 0,
                        duration: 500,
                        stepCallback: function(e) {
                            t.opacity = e
                        },
                        endCallback: function() {
                            r.animManager.stopAnim(t.tutAnim), i.prototype.hide.call(t, e)
                        }
                    }))
                }
            }), l
        }), i("j13e/utils/J13CookieJar", ["require", "exports", "module"], function(e, t, n) {
            function r(e) {
                this.cookieMap = this.parseCookies()
            }
            return r.prototype = {
                getCookie: function(e, t, n) {
                    return this.cookieMap[e] ? this.cookieMap[e] : (n && this.setCookie(e, t, n), t)
                },
                setCookie: function(e, t, n) {
                    var r = new Date;
                    r.setSeconds(r.getSeconds() + n), document.cookie = e + "=" + t + "; expires=" + r.toUTCString(), this.cookieMap[e] = t
                },
                parseCookies: function() {
                    return document.cookie.split(";").map(function(e) {
                        return e.trim().split("=")
                    }).reduce(function(e, t) {
                        return e[t[0]] = t[1], e
                    }, {})
                }
            }, new r
        }), i("src/utils/PersistentStorage", ["require", "exports", "module", "j13e/utils/J13CookieJar"], function(e, t, n) {
            function i(e) {
                var t = e || {};
                this.defaultExpireSeconds = t.hasOwnProperty("defaultExpireSeconds") ? t.defaultExpireSeconds : i.DEFAULT_EXPIRE_SECONDS
            }
            var r = e("j13e/utils/J13CookieJar");
            return i.DEFAULT_EXPIRE_SECONDS = 86400, i.prototype = {
                set: function(e, t, n) {
                    var i = !1;
                    if (window.localStorage) try {
                        window.localStorage.setItem(e, t)
                    } catch (s) {
                        i = !0
                    } else i = !0;
                    i && r.setCookie(e, t, n || this.defaultExpireSeconds)
                },
                get: function(e, t, n) {
                    var i = !1,
                        s = null;
                    if (window.localStorage) try {
                        s = window.localStorage.getItem(e), i = s !== null && s !== undefined
                    } catch (o) {
                        i = !1
                    } else i = !1;
                    return i || (s = r.getCookie(e, t, n || this.defaultExpireSeconds), i = !0), s
                }
            }, new i
        }), i("src/utils/HiScoreManager", ["require", "exports", "module", "./PersistentStorage"], function(e, t, n) {
            function i(e) {
                var t = e || {};
                this.cookieSettings = {
                    name: t.cookieSettings && t.cookieSettings.name ? t.cookieSettings.name : i.cookieSettings.NAME,
                    expires: t.cookieSettings && t.cookieSettings.hasOwnProperty("expires") ? t.cookieSettings.expires : i.cookieSettings.EXPIRES
                }, this.minScore = t.hasOwnProperty("minScore") ? t.minScore : 0, this.maxEntries = t.hasOwnProperty("maxEntries") ? t.maxEntries : i.MAX_ENTRIES, this.order = t.order || i.DESC;
                var n = r.get(this.cookieSettings.name, '{"entries":[]}', this.cookieSettings.expires),
                    s = null;
                try {
                    s = JSON.parse(n)
                } catch (o) {
                    s = null
                }
                this.entries = s && s.entries ? s.entries : []
            }
            var r = e("./PersistentStorage");
            return i.MAX_ENTRIES = 10, i.cookieSettings = {
                NAME: "gmendlessgunner_hsl",
                EXPIRES: 63072e3
            }, i.order = {
                ASC: "asc",
                DESC: "desc"
            }, i.prototype = {
                addScore: function(e, t, n) {
                    var s = !1,
                        o = !1,
                        u = this.order;
                    this.entries.every(function(n, r, a) {
                        if (u === i.order.DESC && t >= n.score || u === i.order.ASC && t <= n.score) a.splice(r, 0, {
                            time: e,
                            score: t
                        }), r === 0 && (o = !0), s = !0;
                        return !s
                    }), !s && this.entries.length < this.maxEntries && this.entries.push({
                        time: e,
                        score: t
                    });
                    while (this.entries.length > this.maxEntries) this.entries.pop();
                    if (!n) {
                        var a = JSON.stringify({
                            entries: this.entries
                        });
                        r.set(this.cookieSettings.name, a, this.cookieSettings.expires)
                    }
                    return o
                }
            }, i
        }), i("j13e/display/J13DisplayRoundedRect", ["require", "exports", "module", "./J13DisplayRect", "../utils/J13Utils", "./J13DisplayDrawOptions"], function(e, t, n) {
            function o(e) {
                var t = e || {};
                r.call(this, e), this.tlRadius = t.tlRadius || t.topLeftRadius || 0, this.trRadius = t.trRadius || t.topRightRadius || 0, this.blRadius = t.blRadius || t.bottomLeftRadius || 0, this.brRadius = t.brRadius || t.bottomRightRadius || 0, t.hasOwnProperty("r") ? this.setRadius(t.r) : t.hasOwnProperty("radius") && this.setRadius(t.radius)
            }
            var r = e("./J13DisplayRect"),
                i = e("../utils/J13Utils"),
                s = e("./J13DisplayDrawOptions");
            return o.prototype = i.inherit(new r, {
                setRadius: function(e) {
                    this.tlRadius = this.trRadius = this.blRadius = this.brRadius = e
                },
                render: function(e, t, n, r) {
                    var i = r.canvasContext;
                    this.drawOptions.applyOptions(i), i.beginPath(), i.moveTo(this.rect.left + this.tlRadius, this.rect.top), i.lineTo(this.rect.right - this.trRadius, this.rect.top), i.arc(this.rect.right - this.trRadius, this.rect.top + this.trRadius, this.trRadius, 1.5 * Math.PI, 2 * Math.PI), i.lineTo(this.rect.right, this.rect.bottom - this.brRadius), i.arc(this.rect.right - this.brRadius, this.rect.bottom - this.brRadius, this.brRadius, 0, .5 * Math.PI), i.lineTo(this.rect.left + this.blRadius, this.rect.bottom), i.arc(this.rect.left + this.blRadius, this.rect.bottom - this.blRadius, this.blRadius, .5 * Math.PI, Math.PI), i.lineTo(this.rect.left, this.rect.top + this.tlRadius), i.arc(this.rect.left + this.tlRadius, this.rect.top + this.tlRadius, this.tlRadius, Math.PI, 1.5 * Math.PI), i.closePath(), this.drawOptions.applyPostPathOptions(i), (this.drawFlags & s.drawFlags.OUTLINE_BEHIND) > 0 && i.stroke(), (this.drawFlags & s.drawFlags.FILL) > 0 && i.fill(), (this.drawFlags & s.drawFlags.OUTLINE_FRONT) > 0 && i.stroke()
                }
            }), o
        }), i("src/screens/scenes/HiScoreScene", ["require", "exports", "module", "src/Resources", "src/Settings", "src/utils/HiScoreManager", "./Scene", "../gui/VolumeButton", "j13e/utils/J13Utils", "j13e/display/J13DisplayText", "j13e/display/J13DisplayItemContainer", "j13e/display/J13DisplayDrawOptions", "j13e/display/J13DisplayImg", "j13e/display/J13DisplayImgButton", "j13e/display/J13DisplaySpriteButton", "j13e/math/J13Rect", "j13e/display/J13DisplayRoundedRect", "j13e/anim/J13Anim", "j13e/anim/J13AnimSequence", "j13e/anim/J13AnimGroup", "j13e/display/J13DisplayRect"], function(e, t, n) {
            function E(e) {
                var t = e || {},
                    n = this;
                o.call(this, e), this.levelName = t.levelName || null, this.visible = t.visible || !1, this.width = t.width || 0, this.height = t.height || 0, this.opacity = 1, this.hiScoreManager = this.game.hiScoreManager, this.scoreText = t.scoreText || null, this.retryButton = new p({
                    id: r.buttons.retry,
                    x: t.retryButton.x,
                    y: t.retryButton.y,
                    anchorX: t.retryButton.image.width / 2,
                    anchorY: t.retryButton.image.height / 2,
                    img: t.retryButton.image,
                    clickFunction: function() {
                        r.gsm.transitioning || r.gsm.toState(r.gameStates.level, {
                            reset: !0
                        })
                    }
                }), this.addChild(this.retryButton), this.retryButton.addListener(this.retryButton.events.UP, this.onButtonUp), this.retryButton.addListener(this.retryButton.events.DOWN, this.onButtonDown), this.retryButton.addListener(this.retryButton.events.HOVER, this.onButtonHover), this.retryButton.addListener(this.retryButton.events.HOVEROUT, this.onButtonHoverOut), this.retryButton.addListener(this.retryButton.events.CLICK, this.onButtonClick), this.rankButton = new p({
                    id: r.buttons.rank,
                    img: t.rankButton.image,
                    x: t.rankButton.x,
                    y: t.rankButton.y,
                    anchorX: t.rankButton.image.width / 2,
                    anchorY: t.rankButton.image.height / 2,
                    clickFunction: this.showGmapiLeaderboard.bind(this)
                }), /*this.addChild(this.rankButton),*/ this.rankButton.addListener(this.rankButton.events.UP, this.onButtonUp), this.rankButton.addListener(this.rankButton.events.DOWN, this.onButtonDown), this.rankButton.addListener(this.rankButton.events.HOVER, this.onButtonHover), this.rankButton.addListener(this.rankButton.events.HOVEROUT, this.onButtonHoverOut), this.rankButton.addListener(this.rankButton.events.CLICK, this.onButtonClick), this.kikButton = new p({
                    id: r.buttons.kik,
                    img: t.kikButton.image,
                    clickFunction: this.game.kikShare.bind(this.game),
                    visible: i.kik,
                    x: t.kikButton.x,
                    y: t.kikButton.y,
                    anchorX: t.kikButton.image.width / 2,
                    anchorY: t.kikButton.image.height / 2
                }), this.addChild(this.kikButton), this.kikButton.addListener(this.kikButton.events.UP, this.onButtonUp), this.kikButton.addListener(this.kikButton.events.DOWN, this.onButtonDown), this.kikButton.addListener(this.kikButton.events.HOVER, this.onButtonHover), this.kikButton.addListener(this.kikButton.events.HOVEROUT, this.onButtonHoverOut), this.kikButton.addListener(this.kikButton.events.CLICK, this.onButtonClick), this.volumeButton = new u({
                    id: r.buttons.volume,
                    x: t.volumeButton.x,
                    y: t.volumeButton.y
                }), this.addChild(this.volumeButton), this.volumeButton.addListener(this.volumeButton.events.UP, this.onButtonUp), this.volumeButton.addListener(this.volumeButton.events.DOWN, this.onButtonDown), this.volumeButton.addListener(this.volumeButton.events.HOVER, this.onButtonHover), this.volumeButton.addListener(this.volumeButton.events.HOVEROUT, this.onButtonHoverOut), this.volumeButton.addListener(this.volumeButton.events.CLICK, this.onButtonClick);
                var s = new g({
                    startValue: 0,
                    endValue: 1,
                    duration: 500,
                    startCallback: function() {
                        this.visible = !0
                    }.bind(this),
                    stepCallback: function(e) {
                        this.opacity = e
                    }.bind(this)
                });
                this.scoreText && t.scoreTextPositionOnShow ? this.showAnim = new y({
                    anims: [new b({
                        anims: [new g({
                            startValue: this.scoreText.x,
                            endValue: t.scoreTextPositionOnShow.x,
                            timeFunction: g.easingFunctions.easeInOutCubic,
                            duration: 500,
                            stepCallback: function(e) {
                                this.x = e
                            }.bind(this.scoreText)
                        }), new g({
                            startValue: this.scoreText.y,
                            endValue: t.scoreTextPositionOnShow.y,
                            timeFunction: g.easingFunctions.easeInOutCubic,
                            duration: 500,
                            stepCallback: function(e) {
                                this.y = e
                            }.bind(this.scoreText)
                        })]
                    }), s]
                }) : this.showAnim = s
            }
            var r = e("src/Resources"),
                i = e("src/Settings"),
                s = e("src/utils/HiScoreManager"),
                o = e("./Scene"),
                u = e("../gui/VolumeButton"),
                a = e("j13e/utils/J13Utils"),
                f = e("j13e/display/J13DisplayText"),
                l = e("j13e/display/J13DisplayItemContainer"),
                c = e("j13e/display/J13DisplayDrawOptions"),
                h = e("j13e/display/J13DisplayImg"),
                p = e("j13e/display/J13DisplayImgButton"),
                d = e("j13e/display/J13DisplaySpriteButton"),
                v = e("j13e/math/J13Rect"),
                m = e("j13e/display/J13DisplayRoundedRect"),
                g = e("j13e/anim/J13Anim"),
                y = e("j13e/anim/J13AnimSequence"),
                b = e("j13e/anim/J13AnimGroup"),
                w = e("j13e/display/J13DisplayRect");
            return E.DEFAULT_BUTTON_SPACING = 50, E.MIN_SCORE = 2, E.prototype = a.inherit(new o, {
                onButtonHover: function(e) {},
                onButtonHoverOut: function(e) {},
                onButtonDown: function(e) {
                    e.source.opacity = .5
                },
                onButtonUp: function(e) {
                    e.source.opacity = 1
                },
                onButtonClick: function(e) {
                    r.soundManager.play(r.soundNames.score)
                },
                showGmapiLeaderboard: function() {
                    if (window.gmapi) {
                        var e = this.levelName;
                        window.gmapi(function(t) {
                            t.game.leaderboard.show({
                                levelName: e
                            })
                        })
                    }
                },
                updateHiScoreList: function(e) {
                    var t = !1,
                        n = (new Date).getTime();
                    if (e && e >= this.hiScoreManager.minScore) {
                        this.hiScoreManager.addScore(n, e);
                        var r = this.levelName;
                        window.gmapi && window.gmapi(function(t) { /*t.game.leaderboard.sendScore(e,{levelName:r})*/ })
                    }
                    this.scoreText.text = e.toString()
                },
                show: function(e, t) {
                    this.volumeButton.updateIcon(), e && e.hasOwnProperty("score") && this.updateHiScoreList(e.score), this.showAnim.endCallback = e && e.callback ? e.callback : function() {}, r.animManager.restartAnim(this.showAnim)
                },
                hide: function() {
                    this.visible = !1, this.y = -this.height
                }
            }), E
        }), i("j13e/anim/J13AnimColor", ["require", "exports", "module", "./J13Anim", "../utils/J13Utils"], function(e, t, n) {
            function s(e) {
                var t = e || {};
                r.call(this, e), this.startColorObj = null, this.endColorObj = null, this.colorType = null
            }
            var r = e("./J13Anim"),
                i = e("../utils/J13Utils");
            return s.prototype = i.inherit(new r, {
                preStart: function() {
                    this.startColorObj = i.getRGBFromColorString(this.startValue), this.startColorObj.hasOwnProperty("a") || (this.startColorObj.a = 1), this.endColorObj = i.getRGBFromColorString(this.endValue), this.endColorObj.hasOwnProperty("a") || (this.endColorObj.a = 1), this.colorType = this.endColorObj.type, r.prototype.preStart.call(this)
                },
                step: function(e, t) {
                    var n = this.useLogicTime ? t : e,
                        r = (n - this.startTime) / this.duration;
                    r > 1 ? r = 1 : r < 0 && (r = 0);
                    var s = this.timeFunction(r),
                        o = Math.floor(this.startColorObj.r + (this.endColorObj.r - this.startColorObj.r) * s),
                        u = Math.floor(this.startColorObj.g + (this.endColorObj.g - this.startColorObj.g) * s),
                        a = Math.floor(this.startColorObj.b + (this.endColorObj.b - this.startColorObj.b) * s),
                        f = this.startColorObj.a + (this.endColorObj.a - this.startColorObj.a) * s,
                        l = i.getColorStringFromRGB(o, u, a, f, this.colorType);
                    this.stepCallback && this.stepCallback(l, s, r, this.data)
                },
                end: function() {
                    this.startColorObj = null, this.endColorObj = null, this.colorType = null, r.prototype.end.call(this)
                },
                stop: function() {
                    this.startColorObj = null, this.endColorObj = null, this.colorType = null, r.prototype.end.call(this)
                }
            }), s
        }), i("j13e/anim/J13AnimFactory", ["require", "exports", "module", "../utils/J13Utils", "./J13Anim", "./J13AnimColor", "./J13AnimGroup", "./J13AnimSequence"], function(e, t, n) {
            var r = e("../utils/J13Utils"),
                i = e("./J13Anim"),
                s = e("./J13AnimColor"),
                o = e("./J13AnimGroup"),
                u = e("./J13AnimSequence"),
                a = {},
                f = {
                    anim: "anim",
                    color: "color",
                    group: "group",
                    sequence: "sequence"
                };
            return a.animTypes = f, a.easingFunctions = i.easingFunctions, a.iterationConstants = i.iterationConstants, a.createAnimFromObject = function(e) {
                if (e) {
                    if (Array.isArray(e)) {
                        var t = [];
                        return e.forEach(function(e) {
                            t.push(a.createAnimFromObject(e))
                        }), new u({
                            anims: t
                        })
                    }
                    var n = null;
                    e.animType ? n = e.animType : e.anims ? n = f.sequence : typeof e.startValue == "string" && r.getColorType(e.startValue) ? n = f.color : n = f.anim;
                    switch (n) {
                        case f.anim:
                            return new i(e);
                        case f.color:
                            return new s(e);
                        case f.group:
                            var l = [];
                            return e.anims.forEach(function(e) {
                                l.push(a.createAnimFromObject(e))
                            }), e = r.cloneObject(e), e.anims = l, new o(e);
                        case f.sequence:
                            var c = [];
                            return e.anims.forEach(function(e) {
                                c.push(a.createAnimFromObject(e))
                            }), e = r.cloneObject(e), e.anims = c, new u(e)
                    }
                }
                return null
            }, a
        }), i("src/screens/scenes/levelparts/CollisionEffect", ["require", "exports", "module", "j13e/utils/J13Utils", "j13e/display/J13DisplayItemContainer"], function(e, t, n) {
            function s(e) {
                i.call(this, e)
            }
            var r = e("j13e/utils/J13Utils"),
                i = e("j13e/display/J13DisplayItemContainer");
            return s.prototype = r.inherit(Object.create(i.prototype), {
                start: function() {},
                stop: function() {},
                collisionAt: function(e, t) {
                    this.x = e, this.y = t, this.start()
                }
            }), s
        }), i("src/screens/scenes/levelparts/CarBikeCollisionEffect", ["require", "exports", "module", "src/Resources", "j13e/utils/J13Utils", "j13e/math/J13Rect", "j13e/anim/J13AnimFactory", "j13e/display/J13DisplayRoundedRect", "j13e/display/J13DisplayCircle", "./CollisionEffect"], function(e, t, n) {
            function l(e) {
                var t = e || {};
                f.call(this, e);
                var n = t.exlosionCircleNum || 5,
                    i = [],
                    a;
                for (a = 0; a < n; a += 1) {
                    var l = Math.random() * Math.PI * 2,
                        c = {
                            x: Math.cos(l),
                            y: Math.sin(l)
                        },
                        h = 8 + Math.random() * 4,
                        p = {
                            effect: this,
                            shape: null,
                            startPos: {
                                x: c.x * 2,
                                y: c.y * 2
                            },
                            direction: c,
                            endLength: h
                        },
                        d = Math.random() * 150 + 375;
                    i.push({
                        data: p,
                        animType: o.animTypes.group,
                        startCallback: this.explosionShapeAnimsStartCallback,
                        endCallback: this.explosionShapeAnimsEndCallback,
                        anims: [{
                            startValue: "#ffff00",
                            endValue: "#999999",
                            duration: d,
                            stepCallback: this.explosionShapeAnimColorChange
                        }, {
                            startValue: 1,
                            endValue: 0,
                            duration: d,
                            stepCallback: this.explosionShapeAnimOpacityChange
                        }, {
                            startValue: 0,
                            endValue: 1,
                            duration: d,
                            stepCallback: this.explosionShapeAnimPositionChange
                        }, {
                            startValue: 10,
                            endValue: 75,
                            duration: d,
                            stepCallback: this.explosionShapeAnimSizeChange
                        }]
                    })
                }
                this.explosionAnim = o.createAnimFromObject({
                    animType: o.animTypes.group,
                    anims: i
                });
                var v = 4e3;
                this.smokeAnimOpts = {
                    animType: o.animTypes.group,
                    startCallback: function(e, t, n, r) {
                        r.shape = new u({
                            x: Math.random() * 15 - 8,
                            radius: 5,
                            fillStyle: "#ff0000",
                            opacity: 1,
                            rect: new s
                        }), r.effect.addChildAt(r.shape, 0), r.effect.smokeAnims.push(this)
                    },
                    endCallback: function(e, t, n, r) {
                        r.effect.removeChild(r.shape), r.effect.smokeAnims.splice(r.effect.smokeAnims.indexOf(this), 1)
                    },
                    anims: [{
                        data: null,
                        startValue: 0,
                        endValue: -75,
                        duration: v,
                        timeFunction: o.easingFunctions.easeInCubic,
                        stepCallback: function(e, t, n, r) {
                            r.shape.y = e
                        }
                    }, {
                        data: null,
                        startValue: 1,
                        endValue: 0,
                        duration: v,
                        timeFunction: o.easingFunctions.easeInQuint,
                        stepCallback: function(e, t, n, r) {
                            r.shape.opacity = e
                        }
                    }, {
                        data: null,
                        startValue: "#ff5800",
                        endValue: "#000000",
                        duration: v,
                        timeFunction: o.easingFunctions.easeInCubic,
                        stepCallback: function(e, t, n, r) {
                            r.shape.drawOptions.fillStyle = e
                        }
                    }, {
                        data: null,
                        startValue: 15,
                        endValue: 50,
                        duration: v,
                        timeFunction: o.easingFunctions.easeInCubic,
                        stepCallback: function(e, t, n, r) {
                            r.shape.rect.setWidth(e), r.shape.rect.setHeight(e), r.shape.rect.setPosition(-e / 2, -e / 2)
                        }
                    }]
                }, this.smokeAnims = [], this.smokeGenerator = o.createAnimFromObject({
                    iterations: o.iterationConstants.infinite,
                    duration: 250,
                    startCallback: function() {
                        var e = {
                            effect: this,
                            shape: null
                        };
                        this.smokeAnimOpts.data = e, r.animManager.startAnim(o.createAnimFromObject(this.smokeAnimOpts))
                    }.bind(this)
                })
            }
            var r = e("src/Resources"),
                i = e("j13e/utils/J13Utils"),
                s = e("j13e/math/J13Rect"),
                o = e("j13e/anim/J13AnimFactory"),
                u = e("j13e/display/J13DisplayRoundedRect"),
                a = e("j13e/display/J13DisplayCircle"),
                f = e("./CollisionEffect");
            return l.prototype = i.inherit(Object.create(f.prototype), {
                explosionShapeAnimsStartCallback: function(e, t, n, r) {
                    r.shape = new u({
                        radius: 20,
                        fillStyle: "#ffff00",
                        opacity: 1,
                        rect: new s
                    }), r.effect.addChild(r.shape)
                },
                explosionShapeAnimsEndCallback: function(e, t, n, r) {
                    r.effect.removeChild(r.shape)
                },
                explosionShapeAnimColorChange: function(e, t, n, r) {
                    r.shape.drawOptions.fillStyle = e
                },
                explosionShapeAnimOpacityChange: function(e, t, n, r) {
                    r.shape.opacity = e
                },
                explosionShapeAnimPositionChange: function(e, t, n, r) {
                    r.shape.x = r.startPos.x + r.direction.x * r.endLength * e, r.shape.y = r.startPos.y + r.direction.y * r.endLength * e
                },
                explosionShapeAnimSizeChange: function(e, t, n, r) {
                    r.shape.rect.setWidth(e), r.shape.rect.setHeight(e), r.shape.rect.setPosition(-e / 2, -e / 2)
                },
                start: function() {
                    r.animManager.startAnim(this.explosionAnim), r.animManager.startAnim(this.smokeGenerator)
                },
                stop: function() {
                    r.animManager.stopAnim(this.explosionAnim), r.animManager.stopAnim(this.smokeGenerator)
                }
            }), l
        }), i("src/screens/scenes/levelparts/StoppingBehavior", ["require", "exports", "module", "j13e/utils/J13Utils"], function(e, t, n) {
            function i(e) {
                var t = e || {};
                this.state = i.states.idle
            }
            var r = e("j13e/utils/J13Utils");
            return i.states = {
                idle: 1,
                stopping: 2,
                stopped: 3
            }, i.prototype = {
                startStopping: function(e) {
                    this.state = i.states.stopping
                },
                stopStopping: function(e) {
                    this.state = i.states.stopped
                },
                update: function(e, t, n, r, i) {},
                isStopped: function() {
                    return this.state === i.states.stopped
                },
                isStopping: function() {
                    return this.state === i.states.stopping
                }
            }, i
        }), i("src/screens/scenes/levelparts/CarStoppingBehavior", ["require", "exports", "module", "j13e/utils/J13Utils", "j13e/math/J13Vec2", "./StoppingBehavior"], function(e, t, n) {
            function o(e) {
                var t = e || {};
                s.call(this, e), this.stoppingAccel = 1125, this.stoppingVelocityVec = new i, this.stoppingAngleVec = Math.PI * 2, this.stoppingAngleAccel = -Math.PI * 6, this.targetVelocity = 0
            }
            var r = e("j13e/utils/J13Utils"),
                i = e("j13e/math/J13Vec2"),
                s = e("./StoppingBehavior");
            return o.prototype = r.inherit(Object.create(s.prototype), {
                startStopping: function(e) {
                    this.targetVelocity = e.targetVelocity = 0, e.switchLaneSpeed = 0, this.stoppingVelocityVec.setAngle(e.angle), this.stoppingVelocityVec.multiply(e.velocity);
                    var t = Math.random() < .5 ? -1 : 1;
                    this.stoppingAngleVec *= t, this.stoppingAngleAccel *= t, s.prototype.startStopping.call(this, e)
                },
                update: function(e, t, n, r, i) {
                    this.state === s.states.stopping && (this.stoppingAngleVec += this.stoppingAngleAccel * n, e.angle += this.stoppingAngleVec * n, e.velocity += e.accel * n, Math.abs(this.stoppingAngleVec) < Math.abs(this.stoppingAngleAccel * n) && (this.stoppingAngleVec = 0, this.stoppingAngleAccel = 0), Math.abs(e.velocity - this.targetVelocity) < Math.abs(e.accel * n) ? (e.velocity = this.targetVelocity, e.accel = 0) : Math.abs(e.velocity - this.targetVelocity) > Math.abs(e.accel * n) && (e.accel = this.targetVelocity > e.velocity ? this.stoppingAccel : -this.stoppingAccel), this.stoppingVelocityVec.setAngle(e.angle), this.stoppingVelocityVec.multiply(e.velocity), e.x += this.stoppingVelocityVec.x * n, e.y += this.stoppingVelocityVec.y * n)
                }
            }), o
        }), i("src/screens/scenes/levels/GrassTrackLevel1", ["require", "exports", "module", "src/Settings", "src/Resources", "../levelparts/Participant", "../levelparts/LevelConstants", "../levelparts/LapBlock", "../levelparts/CarBikeCollisionEffect", "../levelparts/CarStoppingBehavior", "../BaseLevelScene", "../HiScoreScene", "j13e/anim/J13Anim", "j13e/anim/J13AnimSequence", "j13e/display/J13DisplayPath", "j13e/display/J13DisplayText", "j13e/display/J13DisplayImg", "j13e/display/J13DisplayDrawOptions", "../levelparts/Track", "j13e/utils/J13Utils"], function(e, t, n) {
            function w(e) {
                var t = e || {},
                    n = [],
                    d;
                n.push({
                    x: 360,
                    y: 381
                });
                for (d = Math.PI / 2; d <= 3 * Math.PI / 2; d += Math.PI / 32) n.push({
                    x: Math.cos(d) * 140 + 211,
                    y: Math.sin(d) * 140 + 241
                });
                for (d = -Math.PI / 2; d <= Math.PI / 2; d += Math.PI / 32) n.push({
                    x: Math.cos(d) * 140 + 509,
                    y: Math.sin(d) * 140 + 241
                });
                var w = new y({
                        points: n,
                        laneHalfWidth: 11
                    }),
                    E = new s({
                        displayItem: new m({
                            image: i.loadedImages[i.images.rider]
                        }),
                        anchorX: i.loadedImages[i.images.rider].width / 2,
                        anchorY: i.loadedImages[i.images.rider].height / 2,
                        speed: 375,
                        radius: 9
                    }),
                    x = [new s({
                        displayItem: new m({
                            image: i.loadedImages[i.images.car1]
                        }),
                        anchorX: i.loadedImages[i.images.car1].width / 2,
                        anchorY: i.loadedImages[i.images.car1].height / 2,
                        speed: 375,
                        direction: o.directions.backward,
                        lane: o.lanes.outer,
                        linearPosition: -120,
                        radius: 9,
                        switchLaneSpeed: 8,
                        stoppingBehavior: new f
                    }), new s({
                        displayItem: new m({
                            image: i.loadedImages[i.images.car2]
                        }),
                        anchorX: i.loadedImages[i.images.car2].width / 2,
                        anchorY: i.loadedImages[i.images.car2].height / 2,
                        speed: 375,
                        direction: o.directions.backward,
                        lane: o.lanes.outer,
                        linearPosition: -60,
                        radius: 9,
                        switchLaneSpeed: 8,
                        stoppingBehavior: new f
                    }), new s({
                        displayItem: new m({
                            image: i.loadedImages[i.images.car3]
                        }),
                        anchorX: i.loadedImages[i.images.car3].width / 2,
                        anchorY: i.loadedImages[i.images.car3].height / 2,
                        speed: 375,
                        direction: o.directions.backward,
                        lane: o.lanes.outer,
                        linearPosition: 0,
                        radius: 9,
                        switchLaneSpeed: 8,
                        stoppingBehavior: new f
                    })],
                    T = o.lanes.outer,
                    N = [new u({
                        lap: 0,
                        startOfLapBlockChange: function(e) {},
                        firstQuarterLapChange: function(e) {
                            T = Math.random() < .5 ? o.lanes.inner : o.lanes.outer
                        },
                        firstQuarterLapChangePerEnemy: function(e, t) {
                            e.lane = T
                        },
                        secondQuarterLapChange: function(e) {},
                        thirdQuarterLapChange: function(e) {
                            T = Math.random() < .5 ? o.lanes.inner : o.lanes.outer
                        },
                        thirdQuarterLapChangePerEnemy: function(e, t) {
                            e.lane = T
                        }
                    }), new u({
                        lap: 4,
                        startOfLapBlockChange: function(e) {
                            var t = e[e.length - 1];
                            i.animManager.startAnim(new h({
                                useLogicTime: !0,
                                startValue: t.targetVelocity + 150,
                                endValue: t.targetVelocity,
                                duration: 1e3,
                                startCallback: t.setTargetVelocity.bind(t),
                                endCallback: t.setTargetVelocity.bind(t)
                            }))
                        },
                        firstQuarterLapChange: function(e) {
                            T = Math.random() < .5 ? o.lanes.inner : o.lanes.outer, e[e.length - 1].lane = Math.random() < .5 ? o.lanes.inner : o.lanes.outer
                        },
                        firstQuarterLapChangePerEnemy: function(e, t) {
                            e !== t[t.length - 1] && (e.lane = T)
                        },
                        secondQuarterLapChange: function(e) {},
                        thirdQuarterLapChange: function(e) {
                            T = Math.random() < .5 ? o.lanes.inner : o.lanes.outer, x[x.length - 1].lane = Math.random() < .5 ? o.lanes.inner : o.lanes.outer
                        },
                        thirdQuarterLapChangePerEnemy: function(e, t) {
                            e !== t[t.length - 1] && (e.lane = T)
                        }
                    }), new u({
                        lap: 8,
                        startOfLapBlockChange: function(e) {
                            var t = e[e.length - 1];
                            i.animManager.startAnim(new h({
                                useLogicTime: !0,
                                startValue: t.targetVelocity - 150,
                                endValue: t.targetVelocity,
                                duration: 1e3,
                                startCallback: t.setTargetVelocity.bind(t),
                                endCallback: t.setTargetVelocity.bind(t)
                            }))
                        },
                        firstQuarterLapChange: function(e) {
                            T = Math.random() < .5 ? o.lanes.inner : o.lanes.outer
                        },
                        firstQuarterLapChangePerEnemy: function(e) {
                            e.lane = T
                        },
                        secondQuarterLapChange: function(e) {},
                        thirdQuarterLapChange: function(e) {
                            T = Math.random() < .5 ? o.lanes.inner : o.lanes.outer
                        },
                        thirdQuarterLapChangePerEnemy: function(e) {
                            e.lane = T
                        }
                    }), new u({
                        lap: 12,
                        startOfLapBlockChange: function(e) {
                            var t;
                            for (t = 1; t < e.length; t += 1) {
                                var n = e[t];
                                i.animManager.startAnim(new h({
                                    useLogicTime: !0,
                                    startValue: n.targetVelocity + 150,
                                    endValue: n.targetVelocity,
                                    duration: 1e3,
                                    startCallback: n.setTargetVelocity.bind(n),
                                    endCallback: n.setTargetVelocity.bind(n)
                                }))
                            }
                        },
                        firstQuarterLapChange: function(e) {
                            T = Math.random() < .5 ? o.lanes.inner : o.lanes.outer, e[0].lane = Math.random() < .5 ? o.lanes.inner : o.lanes.outer
                        },
                        firstQuarterLapChangePerEnemy: function(e, t) {
                            e !== t[0] && (e.lane = T)
                        },
                        secondQuarterLapChange: function(e) {},
                        thirdQuarterLapChange: function(e) {
                            T = Math.random() < .5 ? o.lanes.inner : o.lanes.outer, x[0].lane = Math.random() < .5 ? o.lanes.inner : o.lanes.outer
                        },
                        thirdQuarterLapChangePerEnemy: function(e, t) {
                            e !== t[0] && (e.lane = T)
                        }
                    }), new u({
                        lap: 16,
                        startOfLapBlockChange: function(e) {
                            var t;
                            for (t = 1; t < e.length; t += 1) {
                                var n = e[t];
                                i.animManager.startAnim(new h({
                                    useLogicTime: !0,
                                    startValue: n.targetVelocity - 150,
                                    endValue: n.targetVelocity,
                                    duration: 1e3,
                                    startCallback: n.setTargetVelocity.bind(n),
                                    endCallback: n.setTargetVelocity.bind(n)
                                }))
                            }
                        },
                        firstQuarterLapChange: function(e) {
                            T = Math.random() < .5 ? o.lanes.inner : o.lanes.outer
                        },
                        firstQuarterLapChangePerEnemy: function(e) {
                            e.lane = T
                        },
                        secondQuarterLapChange: function(e) {},
                        thirdQuarterLapChange: function(e) {
                            T = Math.random() < .5 ? o.lanes.inner : o.lanes.outer
                        },
                        thirdQuarterLapChangePerEnemy: function(e) {
                            e.lane = T
                        }
                    })],
                    C = new u({
                        lap: 20,
                        startOfLapBlockChange: function(e) {
                            var t;
                            for (t = 1; t < e.length; t += 1) i.animManager.startAnim(new h({
                                useLogicTime: !0,
                                startValue: e[t].targetVelocity + 150 * t,
                                endValue: e[t].targetVelocity,
                                duration: 1e3,
                                startCallback: e[t].setTargetVelocity.bind(e[t]),
                                endCallback: e[t].setTargetVelocity.bind(e[t])
                            }))
                        },
                        firstQuarterLapChange: function(e) {
                            var t;
                            for (t = 0; t < e.length; t += 1) {
                                var n = Math.random() < .5 ? o.lanes.inner : o.lanes.outer;
                                e[t].lane = n
                            }
                        },
                        secondQuarterLapChange: function(e) {},
                        thirdQuarterLapChange: function(e) {
                            var t;
                            for (t = 0; t < x.length; t += 1) {
                                var n = Math.random() < .5 ? o.lanes.inner : o.lanes.outer;
                                x[t].lane = n
                            }
                        }
                    }),
                    k = new u({
                        lap: 20,
                        startOfLapBlockChange: function(e) {
                            var t;
                            for (t = 1; t < e.length; t += 1) i.animManager.startAnim(new h({
                                useLogicTime: !0,
                                startValue: e[t].targetVelocity - 150 * t,
                                endValue: e[t].targetVelocity,
                                duration: 1e3,
                                startCallback: e[t].setTargetVelocity.bind(e[t]),
                                endCallback: e[t].setTargetVelocity.bind(e[t])
                            }))
                        },
                        firstQuarterLapChange: function(e) {
                            T = Math.random() < .5 ? o.lanes.inner : o.lanes.outer
                        },
                        firstQuarterLapChangePerEnemy: function(e) {
                            e.lane = T
                        },
                        secondQuarterLapChange: function(e) {},
                        thirdQuarterLapChange: function(e) {
                            T = Math.random() < .5 ? o.lanes.inner : o.lanes.outer
                        },
                        thirdQuarterLapChangePerEnemy: function(e) {
                            e.lane = T
                        }
                    }),
                    L = new v({
                        x: 360,
                        y: 240,
                        text: "0",
                        textAlign: "center",
                        textBaseline: "middle",
                        font: "54px Arial",
                        fillStyle: "#ffffff",
                        drawFlags: g.drawFlags.FILL
                    }),
                    A = new a,
                    O = new c({
                        game: t.game,
                        levelName: "grasstracklevel1",
                        scoreText: L,
                        scoreTextPositionOnShow: {
                            x: r.kik ? 360 : 540,
                            y: r.kik ? 40 : 240
                        },
                        retryButton: {
                            x: 360,
                            y: 240,
                            image: i.loadedImages[i.images.playButton]
                        },
                        rankButton: {
                            x: 169,
                            y: 240,
                            image: i.loadedImages[i.images.leaderboardButton]
                        },
                        kikButton: {
                            x: 551,
                            y: 240,
                            image: i.loadedImages[i.images.kikButton]
                        },
                        volumeButton: {
                            x: 650,
                            y: 10
                        }
                    }),
                    M = null,
                    _ = null;
                M = new v({
                    text: (b.isMobile.any() ? "Tap" : "Click") + " to switch lanes!",
                    font: "26px arial",
                    fillStyle: "#ffffff",
                    x: this.width / 2,
                    y: 180,
                    textAlign: "center",
                    textBaseline: "middle"
                }), _ = new p({
                    anims: [new h({
                        duration: 3e3
                    }), new h({
                        duration: 500,
                        timeFunction: h.easingFunctions.easeInCubic,
                        startValue: M.y,
                        endValue: -50,
                        stepCallback: function(e) {
                            M.y = e
                        },
                        endCallback: function() {
                            M.visible = !1
                        }
                    })]
                }), l.call(this, b.extendObj({
                    bgImage: i.loadedImages[i.images.grasslandBg],
                    trackImage: i.loadedImages[i.images.track1],
                    track: w,
                    player: E,
                    trackEnemies: x,
                    getLapBlock: function(e) {
                        var t;
                        if (e < 20) {
                            for (t = 0; t < N.length; t += 1)
                                if (N[t].lap === e) return N[t]
                        } else if (e % 4 === 0) {
                            var n = Math.floor((e - 20) / 4);
                            return n % 2 === 0 ? C : k
                        }
                        return null
                    },
                    scoreText: L,
                    collisionEffect: A,
                    hiScoreScene: O,
                    tutorialText: M,
                    tutorialTextDismissAnim: _
                }, t))
            }
            var r = e("src/Settings"),
                i = e("src/Resources"),
                s = e("../levelparts/Participant"),
                o = e("../levelparts/LevelConstants"),
                u = e("../levelparts/LapBlock"),
                a = e("../levelparts/CarBikeCollisionEffect"),
                f = e("../levelparts/CarStoppingBehavior"),
                l = e("../BaseLevelScene"),
                c = e("../HiScoreScene"),
                h = e("j13e/anim/J13Anim"),
                p = e("j13e/anim/J13AnimSequence"),
                d = e("j13e/display/J13DisplayPath"),
                v = e("j13e/display/J13DisplayText"),
                m = e("j13e/display/J13DisplayImg"),
                g = e("j13e/display/J13DisplayDrawOptions"),
                y = e("../levelparts/Track"),
                b = e("j13e/utils/J13Utils");
            return w.prototype = b.inherit(Object.create(l.prototype), {}), w
        }), i("src/screens/PlayScreen", ["require", "exports", "module", "src/Resources", "./Screen", "./scenes/levelparts/LevelConstants", "./scenes/TutScene", "./scenes/HiScoreScene", "./scenes/levels/GrassTrackLevel1", "j13e/math/J13Rect", "j13e/utils/J13Utils", "j13e/anim/J13Anim", "j13e/display/J13DisplayImg", "j13e/display/J13DisplayRect", "j13e/display/J13DisplayText", "j13e/display/J13DisplayLayer", "j13e/display/J13DisplaySpriteButton", "j13e/display/J13DisplayItemContainer", "j13e/display/J13DisplayContainerButton"], function(e, t, n) {
            function b(e) {
                var t = e || {},
                    n = this;
                i.call(this, e), this.numPlays = 0, this.score = 0, this.level = null, this.levelLayer = new v, this.addChild(this.levelLayer), this.state = b.states.idle, r.gsm.addListener(r.gsm.events.stateChanged, this.onGameStateChange.bind(this)), r.mouseManager.addListener(r.mouseManager.events.DOWN, this.onMouseDown.bind(this)), r.keyboardManager.addListener(r.keyboardManager.events.DOWN, this.onKeyDown.bind(this))
            }
            var r = e("src/Resources"),
                i = e("./Screen"),
                s = e("./scenes/levelparts/LevelConstants"),
                o = e("./scenes/TutScene"),
                u = e("./scenes/HiScoreScene"),
                a = e("./scenes/levels/GrassTrackLevel1"),
                f = e("j13e/math/J13Rect"),
                l = e("j13e/utils/J13Utils"),
                c = e("j13e/anim/J13Anim"),
                h = e("j13e/display/J13DisplayImg"),
                p = e("j13e/display/J13DisplayRect"),
                d = e("j13e/display/J13DisplayText"),
                v = e("j13e/display/J13DisplayLayer"),
                m = e("j13e/display/J13DisplaySpriteButton"),
                g = e("j13e/display/J13DisplayItemContainer"),
                y = e("j13e/display/J13DisplayContainerButton");
            return b.states = {
                idle: 1,
                tutorial: 2,
                playing: 3,
                levelFinished: 4
            }, b.prototype = l.inherit(new i, {
                getScore: function() {
                    return this.score
                },
                onButtonHover: function(e) {
                    e.source.anchorY = 3
                },
                onButtonHoverOut: function(e) {
                    e.source.anchorY = 0
                },
                onButtonDown: function(e) {
                    e.source.anchorY = -2
                },
                onButtonUp: function(e) {
                    e.source.anchorY = 0
                },
                onLap: function(e) {
                    r.soundManager.play(r.soundNames.score), this.score += 1, this.level && this.level.updateScoreText(this.score)
                },
                onCollided: function(e) {
                    r.gsm.toState(r.gameStates.gameOver)
                },
                updateScoreText: function(e) {
                    this.scoreText.text = this.score.toString(), e || r.animManager.restartAnim(this.scoreAnim)
                },
                onGameStateChange: function(e) {
                    e.data.newState.id === r.gameStates.hiScore && this.level && this.level.showHiScore({
                        score: this.score
                    })
                },
                onLevelFinished: function(e) {
                    this.state = b.states.levelFinished, r.gsm.toState(r.gameStates.gameOver, {
                        score: this.score
                    })
                },
                onMouseDown: function(e) {
                    r.gsm.getCurrentStateId() === r.gameStates.level && this.level && this.level.switchLanes()
                },
                onKeyDown: function(e) {},
                volumeButtonCallback: function(e) {
                    r.soundManager.toggleMute(), r.soundManager.isMuted() || r.soundManager.play(r.soundNames.flap), this.updateVolumeButton()
                },
                updateVolumeButton: function() {
                    r.soundManager.isMuted() ? this.volumeButton.setFrameId("off") : this.volumeButton.setFrameId("on")
                },
                update: function(e, t, n, r) {
                    this.level && this.level.update(e, t, n, r)
                },
                show: function(e) {
                    e && e.hasOwnProperty("reset") && this.reset(), i.prototype.show.call(this, e)
                },
                hide: function(e) {
                    this.level && (this.level.removeAllListeners(), this.level.stop(), this.levelLayer.removeChild(this.level), this.level = null), i.prototype.hide.call(this, e)
                },
                reset: function() {
                    this.numPlays += 1, this.score = 0, this.level && (this.level.removeAllListeners(), this.level.stop(), this.levelLayer.removeChild(this.level)), this.level = new a({
                        game: this.game
                    }), this.level.addListener(s.events.collided, this.onCollided.bind(this)), this.level.addListener(s.events.lap, this.onLap.bind(this)), this.levelLayer.addChild(this.level), this.level.initParticipants(), this.level.start()
                }
            }), b
        }), i("j13e/utils/J13Loader", ["require", "exports", "module", "./J13Utils", "./J13EventDispatcher"], function(e, t, n) {
            function s(e) {
                var t = e || {};
                i.call(this, e), this.loaded = 0, this.total = 0, this.errors = 0, this.includeInPreload = t.hasOwnProperty("includeInPreload") ? t.includeInPreload : !1, this.strictLoad = t.hasOwnProperty("strictLoad") ? t.strictLoad : !0, this.state = s.states.idle
            }
            var r = e("./J13Utils"),
                i = e("./J13EventDispatcher");
            return s.states = {
                idle: 1,
                loading: 2,
                loaded: 3
            }, s.events = {
                load: "load",
                allLoad: "allload",
                error: "error"
            }, s.prototype = r.inherit(new i, {
                states: s.states,
                events: s.events,
                startLoading: function() {
                    this.changeToLoadingState()
                },
                onLoad: function(e) {
                    this.loaded += 1, this.dispatch(this.events.load, {
                        loaded: this.strictLoad ? this.loaded : this.loaded + this.errors,
                        total: this.total,
                        errors: this.errors,
                        originalEvent: e
                    }), (this.strictLoad && this.loaded >= this.total || !this.strictLoad && this.loaded + this.errors >= this.total) && this.onAllLoad(e)
                },
                onError: function(e) {
                    this.dispatch(this.events.error, {
                        loaded: this.strictLoad ? this.loaded : this.loaded + this.errors,
                        total: this.total,
                        errors: this.errors,
                        originalEvent: e
                    })
                },
                onAllLoad: function(e) {
                    this.changeToLoadedState(), this.dispatch(this.events.allLoad, {
                        loaded: this.strictLoad ? this.loaded : this.loaded + this.errors,
                        total: this.total,
                        errors: this.errors,
                        originalEvent: e
                    })
                },
                changeToLoadingState: function() {
                    this.state = s.states.loading
                },
                changeToLoadedState: function() {
                    this.state = s.states.loaded
                },
                isFullyLoaded: function() {
                    return this.state === s.states.loaded
                }
            }), s
        }),
        function() {
            var e = {},
                t = null,
                n = !0,
                r = !1;
            try {
                typeof AudioContext != "undefined" ? t = new AudioContext : typeof webkitAudioContext != "undefined" ? t = new webkitAudioContext : n = !1
            } catch (s) {
                n = !1
            }
            if (!n)
                if (typeof Audio != "undefined") try {
                    new Audio
                } catch (s) {
                    r = !0
                } else r = !0;
            if (n) {
                var o = typeof t.createGain == "undefined" ? t.createGainNode() : t.createGain();
                o.gain.value = 1, o.connect(t.destination)
            }
            var u = function(e) {
                this._volume = 1, this._muted = !1, this.usingWebAudio = n, this.ctx = t, this.noAudio = r, this._howls = [], this._codecs = e, this.iOSAutoEnable = !0
            };
            u.prototype = {
                volume: function(e) {
                    var t = this;
                    e = parseFloat(e);
                    if (e >= 0 && e <= 1) {
                        t._volume = e, n && (o.gain.value = e);
                        for (var r in t._howls)
                            if (t._howls.hasOwnProperty(r) && t._howls[r]._webAudio === !1)
                                for (var i = 0; i < t._howls[r]._audioNode.length; i++) t._howls[r]._audioNode[i].volume = t._howls[r]._volume * t._volume;
                        return t
                    }
                    return n ? o.gain.value : t._volume
                },
                mute: function() {
                    return this._setMuted(!0), this
                },
                unmute: function() {
                    return this._setMuted(!1), this
                },
                _setMuted: function(e) {
                    var t = this;
                    t._muted = e, n && (o.gain.value = e ? 0 : t._volume);
                    for (var r in t._howls)
                        if (t._howls.hasOwnProperty(r) && t._howls[r]._webAudio === !1)
                            for (var i = 0; i < t._howls[r]._audioNode.length; i++) t._howls[r]._audioNode[i].muted = e
                },
                codecs: function(e) {
                    return this._codecs[e]
                },
                _enableiOSAudio: function() {
                    var e = this;
                    if (t && (e._iOSEnabled || !/iPhone|iPad|iPod/i.test(navigator.userAgent))) return;
                    e._iOSEnabled = !1;
                    var n = function() {
                        var r = t.createBuffer(1, 1, 22050),
                            i = t.createBufferSource();
                        i.buffer = r, i.connect(t.destination), typeof i.start == "undefined" ? i.noteOn(0) : i.start(0), setTimeout(function() {
                            if (i.playbackState === i.PLAYING_STATE || i.playbackState === i.FINISHED_STATE) e._iOSEnabled = !0, e.iOSAutoEnable = !1, window.removeEventListener("touchstart", n, !1)
                        }, 0)
                    };
                    return window.addEventListener("touchstart", n, !1), e
                }
            };
            var a = null,
                f = {};
            r || (a = new Audio, f = {
                mp3: !!a.canPlayType("audio/mpeg;").replace(/^no$/, ""),
                opus: !!a.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ""),
                ogg: !!a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
                wav: !!a.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""),
                aac: !!a.canPlayType("audio/aac;").replace(/^no$/, ""),
                m4a: !!(a.canPlayType("audio/x-m4a;") || a.canPlayType("audio/m4a;") || a.canPlayType("audio/aac;")).replace(/^no$/, ""),
                mp4: !!(a.canPlayType("audio/x-mp4;") || a.canPlayType("audio/mp4;") || a.canPlayType("audio/aac;")).replace(/^no$/, ""),
                weba: !!a.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")
            });
            var l = new u(f),
                c = function(e) {
                    var r = this;
                    r._autoplay = e.autoplay || !1, r._buffer = e.buffer || !1, r._duration = e.duration || 0, r._format = e.format || null, r._loop = e.loop || !1, r._loaded = !1, r._sprite = e.sprite || {}, r._src = e.src || "", r._pos3d = e.pos3d || [0, 0, -0.5], r._volume = e.volume !== undefined ? e.volume : 1, r._urls = e.urls || [], r._rate = e.rate || 1, r._model = e.model || null, r._onload = [e.onload || function() {}], r._onloaderror = [e.onloaderror || function() {}], r._onend = [e.onend || function() {}], r._onpause = [e.onpause || function() {}], r._onplay = [e.onplay || function() {}], r._onendTimer = [], r._webAudio = n && !r._buffer, r._audioNode = [], r._webAudio && r._setupAudioNode(), typeof t != "undefined" && t && l.iOSAutoEnable && l._enableiOSAudio(), l._howls.push(r), r.load()
                };
            c.prototype = {
                load: function() {
                    var e = this,
                        t = null;
                    if (r) {
                        e.on("loaderror");
                        return
                    }
                    for (var n = 0; n < e._urls.length; n++) {
                        var i, s;
                        if (e._format) i = e._format;
                        else {
                            s = e._urls[n], i = /^data:audio\/([^;,]+);/i.exec(s), i || (i = /\.([^.]+)$/.exec(s.split("?", 1)[0]));
                            if (!i) {
                                e.on("loaderror");
                                return
                            }
                            i = i[1].toLowerCase()
                        }
                        if (f[i]) {
                            t = e._urls[n];
                            break
                        }
                    }
                    if (!t) {
                        e.on("loaderror");
                        return
                    }
                    e._src = t;
                    if (e._webAudio) h(e, t);
                    else {
                        var o = new Audio;
                        o.addEventListener("error", function() {
                            o.error && o.error.code === 4 && (u.noAudio = !0), e.on("loaderror", {
                                type: o.error ? o.error.code : 0
                            })
                        }, !1), e._audioNode.push(o), o.src = t, o._pos = 0, o.preload = "auto", o.volume = l._muted ? 0 : e._volume * l.volume();
                        var a = function() {
                            e._duration = Math.ceil(o.duration * 10) / 10, Object.getOwnPropertyNames(e._sprite).length === 0 && (e._sprite = {
                                _default: [0, e._duration * 1e3]
                            }), e._loaded || (e._loaded = !0, e.on("load")), e._autoplay && e.play(), o.removeEventListener("canplaythrough", a, !1)
                        };
                        o.addEventListener("canplaythrough", a, !1), o.load()
                    }
                    return e
                },
                urls: function(e) {
                    var t = this;
                    return e ? (t.stop(), t._urls = typeof e == "string" ? [e] : e, t._loaded = !1, t.load(), t) : t._urls
                },
                play: function(e, n) {
                    var r = this;
                    typeof e == "function" && (n = e);
                    if (!e || typeof e == "function") e = "_default";
                    return r._loaded ? r._sprite[e] ? (r._inactiveNode(function(i) {
                        i._sprite = e;
                        var s = i._pos > 0 ? i._pos : r._sprite[e][0] / 1e3,
                            o = 0;
                        r._webAudio ? (o = r._sprite[e][1] / 1e3 - i._pos, i._pos > 0 && (s = r._sprite[e][0] / 1e3 + s)) : o = r._sprite[e][1] / 1e3 - (s - r._sprite[e][0] / 1e3);
                        var u = !!r._loop || !!r._sprite[e][2],
                            a = typeof n == "string" ? n : Math.round(Date.now() * Math.random()) + "",
                            f;
                        (function() {
                            var t = {
                                id: a,
                                sprite: e,
                                loop: u
                            };
                            f = setTimeout(function() {
                                !r._webAudio && u && r.stop(t.id).play(e, t.id), r._webAudio && !u && (r._nodeById(t.id).paused = !0, r._nodeById(t.id)._pos = 0, r._clearEndTimer(t.id)), !r._webAudio && !u && r.stop(t.id), r.on("end", a)
                            }, o * 1e3), r._onendTimer.push({
                                timer: f,
                                id: t.id
                            })
                        })();
                        if (r._webAudio) {
                            var c = r._sprite[e][0] / 1e3,
                                h = r._sprite[e][1] / 1e3;
                            i.id = a, i.paused = !1, v(r, [u, c, h], a), r._playStart = t.currentTime, i.gain.value = r._volume, typeof i.bufferSource.start == "undefined" ? i.bufferSource.noteGrainOn(0, s, o) : i.bufferSource.start(0, s, o)
                        } else {
                            if (!(i.readyState === 4 || !i.readyState && navigator.isCocoonJS)) return r._clearEndTimer(a),
                                function() {
                                    var t = r,
                                        s = e,
                                        o = n,
                                        u = i,
                                        a = function() {
                                            t.play(s, o), u.removeEventListener("canplaythrough", a, !1)
                                        };
                                    u.addEventListener("canplaythrough", a, !1)
                                }(), r;
                            i.readyState = 4, i.id = a, i.currentTime = s, i.muted = l._muted || i.muted, i.volume = r._volume * l.volume(), setTimeout(function() {
                                i.play()
                            }, 0)
                        }
                        return r.on("play"), typeof n == "function" && n(a), r
                    }), r) : (typeof n == "function" && n(), r) : (r.on("load", function() {
                        r.play(e, n)
                    }), r)
                },
                pause: function(e) {
                    var t = this;
                    if (!t._loaded) return t.on("play", function() {
                        t.pause(e)
                    }), t;
                    t._clearEndTimer(e);
                    var n = e ? t._nodeById(e) : t._activeNode();
                    if (n) {
                        n._pos = t.pos(null, e);
                        if (t._webAudio) {
                            if (!n.bufferSource || n.paused) return t;
                            n.paused = !0, typeof n.bufferSource.stop == "undefined" ? n.bufferSource.noteOff(0) : n.bufferSource.stop(0)
                        } else n.pause()
                    }
                    return t.on("pause"), t
                },
                stop: function(e) {
                    var t = this;
                    if (!t._loaded) return t.on("play", function() {
                        t.stop(e)
                    }), t;
                    t._clearEndTimer(e);
                    var n = e ? t._nodeById(e) : t._activeNode();
                    if (n) {
                        n._pos = 0;
                        if (t._webAudio) {
                            if (!n.bufferSource || n.paused) return t;
                            n.paused = !0, typeof n.bufferSource.stop == "undefined" ? n.bufferSource.noteOff(0) : n.bufferSource.stop(0)
                        } else isNaN(n.duration) || (n.pause(), n.currentTime = 0)
                    }
                    return t
                },
                mute: function(e) {
                    var t = this;
                    if (!t._loaded) return t.on("play", function() {
                        t.mute(e)
                    }), t;
                    var n = e ? t._nodeById(e) : t._activeNode();
                    return n && (t._webAudio ? n.gain.value = 0 : n.muted = !0), t
                },
                unmute: function(e) {
                    var t = this;
                    if (!t._loaded) return t.on("play", function() {
                        t.unmute(e)
                    }), t;
                    var n = e ? t._nodeById(e) : t._activeNode();
                    return n && (t._webAudio ? n.gain.value = t._volume : n.muted = !1), t
                },
                volume: function(e, t) {
                    var n = this;
                    e = parseFloat(e);
                    if (e >= 0 && e <= 1) {
                        n._volume = e;
                        if (!n._loaded) return n.on("play", function() {
                            n.volume(e, t)
                        }), n;
                        var r = t ? n._nodeById(t) : n._activeNode();
                        return r && (n._webAudio ? r.gain.value = e : r.volume = e * l.volume()), n
                    }
                    return n._volume
                },
                loop: function(e) {
                    var t = this;
                    return typeof e == "boolean" ? (t._loop = e, t) : t._loop
                },
                sprite: function(e) {
                    var t = this;
                    return typeof e == "object" ? (t._sprite = e, t) : t._sprite
                },
                pos: function(e, n) {
                    var r = this;
                    if (!r._loaded) return r.on("load", function() {
                        r.pos(e)
                    }), typeof e == "number" ? r : r._pos || 0;
                    e = parseFloat(e);
                    var i = n ? r._nodeById(n) : r._activeNode();
                    if (i) return e >= 0 ? (r.pause(n), i._pos = e, r.play(i._sprite, n), r) : r._webAudio ? i._pos + (t.currentTime - r._playStart) : i.currentTime;
                    if (e >= 0) return r;
                    for (var s = 0; s < r._audioNode.length; s++)
                        if (r._audioNode[s].paused && r._audioNode[s].readyState === 4) return r._webAudio ? r._audioNode[s]._pos : r._audioNode[s].currentTime
                },
                pos3d: function(e, t, n, r) {
                    var i = this;
                    t = typeof t == "undefined" || !t ? 0 : t, n = typeof n == "undefined" || !n ? -0.5 : n;
                    if (!i._loaded) return i.on("play", function() {
                        i.pos3d(e, t, n, r)
                    }), i;
                    if (e >= 0 || e < 0) {
                        if (i._webAudio) {
                            var s = r ? i._nodeById(r) : i._activeNode();
                            s && (i._pos3d = [e, t, n], s.panner.setPosition(e, t, n), s.panner.panningModel = i._model || "HRTF")
                        }
                        return i
                    }
                    return i._pos3d
                },
                fade: function(e, t, n, r, i) {
                    var s = this,
                        o = Math.abs(e - t),
                        u = e > t ? "down" : "up",
                        a = o / .01,
                        f = n / a;
                    if (!s._loaded) return s.on("load", function() {
                        s.fade(e, t, n, r, i)
                    }), s;
                    s.volume(e, i);
                    for (var l = 1; l <= a; l++)(function() {
                        var e = s._volume + (u === "up" ? .01 : -0.01) * l,
                            n = Math.round(1e3 * e) / 1e3,
                            o = t;
                        setTimeout(function() {
                            s.volume(n, i), n === o && r && r()
                        }, f * l)
                    })()
                },
                fadeIn: function(e, t, n) {
                    return this.volume(0).play().fade(0, e, t, n)
                },
                fadeOut: function(e, t, n, r) {
                    var i = this;
                    return i.fade(i._volume, e, t, function() {
                        n && n(), i.pause(r), i.on("end")
                    }, r)
                },
                _nodeById: function(e) {
                    var t = this,
                        n = t._audioNode[0];
                    for (var r = 0; r < t._audioNode.length; r++)
                        if (t._audioNode[r].id === e) {
                            n = t._audioNode[r];
                            break
                        }
                    return n
                },
                _activeNode: function() {
                    var e = this,
                        t = null;
                    for (var n = 0; n < e._audioNode.length; n++)
                        if (!e._audioNode[n].paused) {
                            t = e._audioNode[n];
                            break
                        }
                    return e._drainPool(), t
                },
                _inactiveNode: function(e) {
                    var t = this,
                        n = null;
                    for (var r = 0; r < t._audioNode.length; r++)
                        if (t._audioNode[r].paused && t._audioNode[r].readyState === 4) {
                            e(t._audioNode[r]), n = !0;
                            break
                        }
                    t._drainPool();
                    if (n) return;
                    var i;
                    if (t._webAudio) i = t._setupAudioNode(), e(i);
                    else {
                        t.load(), i = t._audioNode[t._audioNode.length - 1];
                        var s = navigator.isCocoonJS ? "canplaythrough" : "loadedmetadata",
                            o = function() {
                                i.removeEventListener(s, o, !1), e(i)
                            };
                        i.addEventListener(s, o, !1)
                    }
                },
                _drainPool: function() {
                    var e = this,
                        t = 0,
                        n;
                    for (n = 0; n < e._audioNode.length; n++) e._audioNode[n].paused && t++;
                    for (n = e._audioNode.length - 1; n >= 0; n--) {
                        if (t <= 5) break;
                        e._audioNode[n].paused && (e._webAudio && e._audioNode[n].disconnect(0), t--, e._audioNode.splice(n, 1))
                    }
                },
                _clearEndTimer: function(e) {
                    var t = this,
                        n = 0;
                    for (var r = 0; r < t._onendTimer.length; r++)
                        if (t._onendTimer[r].id === e) {
                            n = r;
                            break
                        }
                    var i = t._onendTimer[n];
                    i && (clearTimeout(i.timer), t._onendTimer.splice(n, 1))
                },
                _setupAudioNode: function() {
                    var e = this,
                        n = e._audioNode,
                        r = e._audioNode.length;
                    return n[r] = typeof t.createGain == "undefined" ? t.createGainNode() : t.createGain(), n[r].gain.value = e._volume, n[r].paused = !0, n[r]._pos = 0, n[r].readyState = 4, n[r].connect(o), n[r].panner = t.createPanner(), n[r].panner.panningModel = e._model || "equalpower", n[r].panner.setPosition(e._pos3d[0], e._pos3d[1], e._pos3d[2]), n[r].panner.connect(n[r]), n[r]
                },
                on: function(e, t) {
                    var n = this,
                        r = n["_on" + e];
                    if (typeof t == "function") r.push(t);
                    else
                        for (var i = 0; i < r.length; i++) t ? r[i].call(n, t) : r[i].call(n);
                    return n
                },
                off: function(e, t) {
                    var n = this,
                        r = n["_on" + e],
                        i = t ? t.toString() : null;
                    if (i) {
                        for (var s = 0; s < r.length; s++)
                            if (i === r[s].toString()) {
                                r.splice(s, 1);
                                break
                            }
                    } else n["_on" + e] = [];
                    return n
                },
                unload: function() {
                    var t = this,
                        n = t._audioNode;
                    for (var r = 0; r < t._audioNode.length; r++) n[r].paused || (t.stop(n[r].id), t.on("end", n[r].id)), t._webAudio ? n[r].disconnect(0) : n[r].src = "";
                    for (r = 0; r < t._onendTimer.length; r++) clearTimeout(t._onendTimer[r].timer);
                    var i = l._howls.indexOf(t);
                    i !== null && i >= 0 && l._howls.splice(i, 1), delete e[t._src], t = null
                }
            };
            if (n) var h = function(t, n) {
                    if (n in e) {
                        t._duration = e[n].duration, d(t);
                        return
                    }
                    if (/^data:[^;]+;base64,/.test(n)) {
                        var r = atob(n.split(",")[1]),
                            i = new Uint8Array(r.length);
                        for (var s = 0; s < r.length; ++s) i[s] = r.charCodeAt(s);
                        p(i.buffer, t, n)
                    } else {
                        var o = new XMLHttpRequest;
                        o.open("GET", n, !0), o.responseType = "arraybuffer", o.onload = function() {
                            p(o.response, t, n)
                        }, o.onerror = function() {
                            t._webAudio && (t._buffer = !0, t._webAudio = !1, t._audioNode = [], delete t._gainNode, delete e[n], t.load())
                        };
                        try {
                            o.send()
                        } catch (u) {
                            o.onerror()
                        }
                    }
                },
                p = function(n, r, i) {
                    t.decodeAudioData(n, function(t) {
                        t && (e[i] = t, d(r, t))
                    }, function(e) {
                        r.on("loaderror")
                    })
                },
                d = function(e, t) {
                    e._duration = t ? t.duration : e._duration, Object.getOwnPropertyNames(e._sprite).length === 0 && (e._sprite = {
                        _default: [0, e._duration * 1e3]
                    }), e._loaded || (e._loaded = !0, e.on("load")), e._autoplay && e.play()
                },
                v = function(n, r, i) {
                    var s = n._nodeById(i);
                    s.bufferSource = t.createBufferSource(), s.bufferSource.buffer = e[n._src], s.bufferSource.connect(s.panner), s.bufferSource.loop = r[0], r[0] && (s.bufferSource.loopStart = r[1], s.bufferSource.loopEnd = r[1] + r[2]), s.bufferSource.playbackRate.value = n._rate
                };
            typeof i == "function" && i.amd && i("howler/howler", [], function() {
                return {
                    Howler: l,
                    Howl: c
                }
            }), typeof exports != "undefined" && (exports.Howler = l, exports.Howl = c), typeof window != "undefined" && (window.Howler = l, window.Howl = c)
        }(), i("src/utils/SoundManager", ["require", "exports", "module", "j13e/utils/J13Loader", "j13e/utils/J13Utils", "howler/howler", "src/utils/PersistentStorage"], function(e, t, n) {
            function u(e) {
                var t = e || {};
                r.call(this, e), this.soundsToLoad = t.sounds || {}, this.sounds = {};
                var n = o.get("sounds", "on", 31536e3);
                n === "on" ? this.unmute() : this.mute()
            }
            var r = e("j13e/utils/J13Loader"),
                i = e("j13e/utils/J13Utils"),
                s = e("howler/howler"),
                o = e("src/utils/PersistentStorage");
            return u.prototype = i.inherit(new r, {
                startLoading: function() {
                    var e, t = this.onLoad.bind(this),
                        n = this.onError.bind(this),
                        r = [];
                    for (e in this.soundsToLoad) this.soundsToLoad.hasOwnProperty(e) && (this.sounds[e] = new s.Howl(i.extendObj(this.soundsToLoad[e], {
                        onload: t,
                        onloaderror: n
                    })), this.total += 1);
                    this.total === 0 && this.onAllLoad()
                },
                get: function(e) {
                    return this.sounds[e]
                },
                play: function(e, t) {
                    var n = this.sounds[e];
                    return n && n.play(t), n
                },
                replay: function(e, t) {
                    var n = this.sounds[e];
                    return n && (n.stop(t), n.play()), n
                },
                stop: function(e, t) {
                    var n = this.sounds[e];
                    return n && n.stop(t), n
                },
                mute: function(e) {
                    return e || o.set("sounds", "off", 31536e3), s.Howler.mute()
                },
                unmute: function(e) {
                    return e || o.set("sounds", "on", 31536e3), s.Howler.unmute()
                },
                isMuted: function() {
                    return s.Howler._muted
                },
                toggleMute: function(e) {
                    return this.isMuted() ? this.unmute(e) : this.mute(e), this.isMuted()
                }
            }), u
        }), i("j13e/display/J13SpriteSheet", ["require", "exports", "module", "../utils/J13Utils", "../math/J13Rect", "./J13DisplaySprite"], function(e, t, n) {
            function o(e) {
                var t = e || {};
                this.image = t.image || null;
                if (!this.image) throw new Error("J13SpriteSheet: invalid image.");
                this.spriteMap = t.spriteMap || {}, this.sprites = {}
            }
            var r = e("../utils/J13Utils"),
                i = e("../math/J13Rect"),
                s = e("./J13DisplaySprite");
            return o.createIdFromRect = function(e) {
                var t = {
                    left: e.left,
                    top: e.top,
                    right: e.right,
                    bottom: e.bottom
                };
                return r.objectToParamString(t)
            }, o.createIdFromFrameMap = function(e) {
                var t = [],
                    n;
                for (n in e) e.hasOwnProperty(n) && t.push(n);
                return t.join(",")
            }, o.isFrameMap = function(e) {
                var t;
                if (!e) return !1;
                for (t in e)
                    if (e.hasOwnProperty(t) && !i.isJ13Rect(e[t])) return !1;
                return !0
            }, o.prototype = {
                getSprite: function(e, t) {
                    var n = null,
                        u, a = typeof e == "string",
                        f = i.isJ13Rect(e, !0),
                        l = o.isFrameMap(e);
                    return a ? u = e : f ? u = o.createIdFromRect(e) : l && (u = o.createIdFromFrameMap(e)), n = this.sprites[u], n || (a ? (n = new s(r.inherit(this.spriteMap[u], {
                        image: this.image
                    })), this.sprites[u] = n) : f ? (n = new s({
                        image: this.image,
                        rect: e
                    }), this.sprites[u] = n) : l && (n = new s({
                        image: this.image,
                        frameMap: e
                    }), this.sprites[u] = n)), n && !t && (n = n.copy()), n
                }
            }, o
        }), i("j13e/utils/J13SpriteMapper", ["require", "exports", "module", "./J13Utils", "./J13Loader", "../display/J13SpriteSheet"], function(e, t, n) {
            function o(e) {
                var t = e || {};
                i.call(this, e), this.spriteSheets = {}, this.spriteMapsObj = t.spriteMaps || {}, this.imgs = t.imgs || null, this.imageManager = t.imageManager || null
            }
            var r = e("./J13Utils"),
                i = e("./J13Loader"),
                s = e("../display/J13SpriteSheet");
            return o.prototype = r.inherit(Object.create(i.prototype), {
                startLoading: function() {
                    i.prototype.startLoading.call(this);
                    var e;
                    for (e in this.spriteMapsObj) this.spriteMapsObj.hasOwnProperty(e) && (this.spriteSheets[e] = null, this.total += 1);
                    this.total === 0 ? this.onAllLoad() : this.imgs ? this.processSpriteMaps() : this.imageManager ? this.imageManager.isFullyLoaded() ? (this.imgs = this.imageManager.imgs, this.processSpriteMaps()) : this.imageManager.addListener(i.events.allLoad, this.onImageManagerAllLoad.bind(this)) : console.warn("J13SpriteMapper: no imgs object or an image manager to get images from.")
                },
                onImageManagerAllLoad: function(e) {
                    this.imgs = e.source.imgs, this.processSpriteMaps()
                },
                processSpriteMaps: function() {
                    if (this.imgs) {
                        var e;
                        for (e in this.spriteMapsObj)
                            if (this.spriteMapsObj.hasOwnProperty(e)) {
                                var t = this.spriteMapsObj[e],
                                    n = t.image || t.img;
                                n && this.imgs[n] && (this.spriteSheets[e] = new s({
                                    image: this.imageManager.get(n),
                                    spriteMap: t
                                }), this.onLoad(this.spriteSheets[e]))
                            }
                    } else console.warn("J13SpriteMapper: no imgs object to process sprite maps.")
                },
                get: function(e) {
                    return this.spriteSheets[e]
                }
            }), o
        }), i("j13e/utils/J13PatternManager", ["require", "exports", "module", "./J13Utils", "./J13Loader"], function(e, t, n) {
            function s(e) {
                var t = e || {};
                i.call(this, e), this.canvas = t.canvas || null, this.canvasContext = t.canvasContext || null, this.imgs = t.imgs || null, this.imageManager = t.imageManager || null, this.patterns = {}, this.patternsObj = t.patterns || {}, !this.canvasContext && this.canvas && (this.canvasContext = this.canvas.getContext("2d")), this.canvasContext || console.warn("J13PatternManager: canvas or canvas context is required (must be the same canvas it will be rendered on).")
            }
            var r = e("./J13Utils"),
                i = e("./J13Loader");
            return s.prototype = r.inherit(Object.create(i.prototype), {
                startLoading: function() {
                    i.prototype.startLoading.call(this);
                    if (this.canvasContext) {
                        var e;
                        for (e in this.patternsObj) this.patternsObj.hasOwnProperty(e) && (this.patterns[e] = null, this.total += 1);
                        this.total === 0 ? this.onAllLoad() : this.imgs ? this.processPatterns() : this.imageManager ? this.imageManager.isFullyLoaded() ? (this.imgs = this.imageManager.imgs, this.processPatterns()) : this.imageManager.addListener(i.events.allLoad, this.onImageManagerAllLoad.bind(this)) : console.warn("J13PatternManager: no imgs object or an image manager to get images from.")
                    } else this.onAllLoad()
                },
                onImageManagerAllLoad: function(e) {
                    this.imgs = e.source.imgs, this.processPatterns()
                },
                processPatterns: function() {
                    if (this.imgs) {
                        var e;
                        for (e in this.patternsObj)
                            if (this.patternsObj.hasOwnProperty(e)) {
                                var t = this.patternsObj[e],
                                    n = t.image || t.img;
                                n && this.imgs[n] && (this.patterns[e] = this.canvasContext.createPattern(this.imgs[n], t.repetition || "repeat"), this.onLoad(this.patterns[e]))
                            }
                    } else console.warn("J13PatternManager: no imgs object to process patterns.")
                },
                get: function(e) {
                    return this.patterns[e]
                }
            }), s
        }), i("j13e/utils/J13DebugManager", ["require", "exports", "module", "./J13Utils"], function(e, t, n) {
            function i(e) {
                var t = e || {};
                this.debugContainer = t.debugContainer || document.body || document.getElementsByTagName("body")[0], this.lastFrameCapture = 0, this.lastFrameCaptureTime = 0, this.output = null, this.frameCounter = null, this.frameCount = 0, this.renderFrameCount = 0, this.lastRenderFrameCapture = 0, this.logicFrameCount = 0, this.lastLogicFrameCapture = 0, this.setupDone = !1, this.enabled = t.hasOwnProperty("enabled") ? t.enabled : !1
            }
            var r = e("./J13Utils");
            return i.prototype = {
                setup: function() {
                    this.setupDone || (this.output = document.createElement("div"), this.output.hasOwnProperty("id") ? this.output.id = "debugOutput" : this.output.setAttribute("id", "debugOutput"), r.addClass(this.output, "debugOutput"), this.output.style.position = "absolute", this.output.style.top = "0", this.output.style.left = "0", this.output.style.backgroundColor = "rgba(255, 255, 255, 0.8)", this.output.style.color = "#000000", this.output.style.padding = "3px", this.output.style.zIndex = Math.pow(2, 32) - 1, this.debugContainer.appendChild(this.output), this.frameCounter = document.createElement("div"), this.frameCounter.hasOwnProperty("id") ? this.frameCounter.id = "frameCounter" : this.frameCounter.setAttribute("id", "frameCounter"), r.addClass(this.frameCounter, "frameCounter"), this.frameCounter.style.position = "absolute", this.frameCounter.style.bottom = "0", this.frameCounter.style.left = "0", this.frameCounter.style.backgroundColor = "rgba(255, 255, 255, 0.8)", this.frameCounter.style.color = "#000000", this.frameCounter.style.padding = "3px", this.frameCounter.style.textAlign = "left", this.frameCounter.style.zIndex = Math.pow(2, 32) - 1, this.debugContainer.appendChild(this.frameCounter), this.setupDone = !0)
                },
                update: function(e, t, n, r) {
                    if (this.enabled) {
                        this.setupDone || this.setup();
                        if (n - this.lastFrameCaptureTime >= 1e3) {
                            var i = this.frameCount - this.lastFrameCapture,
                                s = this.renderFrameCount - this.lastRenderFrameCapture,
                                o = this.logicFrameCount - this.lastLogicFrameCapture,
                                u = n - this.lastFrameCaptureTime;
                            this.frameCounter.innerHTML = "FPS-count: " + Math.round(i / (u / 1e3)) + "<br />FPS-time: " + Math.round(1e3 / e) + "<br />FPS-render: " + Math.round(s / (u / 1e3)) + "<br />FPS-logic: " + Math.round(o / (u / 1e3)), this.lastFrameCapture = this.frameCount, this.lastRenderFrameCapture = this.renderFrameCount, this.lastLogicFrameCapture = this.logicFrameCount, this.lastFrameCaptureTime = n
                        }
                    }
                    this.frameCount += 1
                },
                updateRenderFrameCount: function() {
                    this.renderFrameCount += 1
                },
                updateLogicFrameCount: function() {
                    this.logicFrameCount += 1
                }
            }, i
        }), i("j13e/anim/J13AnimManager", ["require", "exports", "module", "./J13Anim", "../utils/J13Utils", "../utils/J13EventDispatcher"], function(e, t, n) {
            function o(e) {
                var t = e || {},
                    n;
                s.call(this, e), this.anims = {};
                if (t.anims)
                    for (n in t.anims) t.anims.hasOwnProperty(n) && (this.anims[n] = t.anims[n], this.anims[n].manager = this);
                this.activeAnims = [], this.animIndexesToRemove = [], this.animsToStart = []
            }
            var r = e("./J13Anim"),
                i = e("../utils/J13Utils"),
                s = e("../utils/J13EventDispatcher");
            return o.prototype = i.inherit(new s, {
                addAnim: function(e) {
                    this.anims[e.id] = e, e.manager = this
                },
                removeAnim: function(e) {
                    var t = this.anims[typeof e == "string" ? e : e.id];
                    t && (this.anims[t.id] = undefined, t.manager = null)
                },
                update: function(e, t, n, i) {
                    var s;
                    if (this.animIndexesToRemove.length > 1) {
                        this.animIndexesToRemove.sort(function(e, t) {
                            return e - t
                        });
                        var o = -1;
                        for (s = this.animIndexesToRemove.length - 1; s >= 0; s -= 1) {
                            var u = this.animIndexesToRemove[s];
                            o === -1 ? o = u : o === u ? this.animIndexesToRemove.splice(s, 1) : o = u
                        }
                    }
                    while (this.animIndexesToRemove.length > 0) var a = this.activeAnims.splice(this.animIndexesToRemove.pop(), 1);
                    while (this.animsToStart.length > 0) this.activeAnims.push(this.animsToStart.shift());
                    if (this.activeAnims.length > 0) {
                        var f, l, c = i.fixedLogicTime;
                        for (s = 0; s < this.activeAnims.length; s += 1) l = this.activeAnims[s], l.restartRequested && l.preStart(), l.prepared || l.start(n, c), l.shouldBeAnimating(n, c) ? l.step(n, c) : l.shouldBeDone(n, c) && (l.step(n, c), l.end(), l.iterations === r.iterationCount.infinite || l.iterationsPlayed < l.iterations ? l.requestRestart() : (l.iterationsPlayed = -1, this.animIndexesToRemove.push(s)))
                    }
                },
                createAnim: function(e) {
                    var t = new r(i.extendObj(e, {
                        manager: this
                    }))
                },
                getAnim: function(e) {
                    return this.anims[e]
                },
                startAnimById: function(e) {
                    this.startAnim(this.anims[e])
                },
                startAnim: function(e) {
                    e.manager = this, e.preStart(), this.animsToStart.push(e)
                },
                stopAnimById: function(e) {
                    this.stopAnim(this.anims[e])
                },
                stopAnim: function(e) {
                    var t = this.activeAnims.indexOf(e);
                    e.stop(), t !== -1 ? this.animIndexesToRemove.push(t) : (t = this.animsToStart.indexOf(e), t !== -1 && this.animsToStart.splice(t, 1))
                },
                restartAnimById: function(e) {
                    this.restartAnim(this.anims[e])
                },
                restartAnim: function(e) {
                    var t = this.activeAnims.indexOf(e);
                    t !== -1 ? e.requestRestart() : this.startAnim(e)
                }
            }), o
        }), i("j13e/utils/J13AppCacheManager", ["require", "exports", "module", "./J13Utils", "./J13EventDispatcher"], function(e, t, n) {
            function s(e) {
                var t = e || {};
                i.call(this, e), this.appCache = t.appCache, this.reloadOnNewUpdate = t.reloadOnNewUpdate, this.finished = !1
            }
            var r = e("./J13Utils"),
                i = e("./J13EventDispatcher");
            return s.events = {
                CHECKING: "checking",
                LOADNORMALLY: "loadnormally",
                UPDATINGCACHE: "updatingcache",
                UPDATEPROGRESS: "updateprogress",
                UPDATEREADY: "updateready"
            }, s.prototype = r.inherit(new i, {
                events: s.events,
                init: function() {
                    if (this.appCache)
                        if (this.appCache.status === this.appCache.UNCACHED) this.loadNormally();
                        else switch (this.appCache.status) {
                            case this.appCache.IDLE:
                            case this.appCache.DOWNLOADING:
                            case this.appCache.CHECKING:
                                this.appCache.addEventListener("checking", this.checking.bind(this), !1), this.appCache.addEventListener("noupdate", this.loadNormally.bind(this), !1), this.appCache.addEventListener("obsolete", this.loadNormally.bind(this), !1), this.appCache.addEventListener("error", this.loadNormally.bind(this), !1), this.appCache.addEventListener("cached", this.loadNormally.bind(this), !1), this.appCache.addEventListener("downloading", this.updatingCache.bind(this), !1), this.appCache.addEventListener("progress", this.updateProgress.bind(this), !1), this.appCache.addEventListener("updateready", this.updateReady.bind(this), !1);
                                try {
                                    this.appCache.update()
                                } catch (e) {
                                    this.loadNormally()
                                }
                                break;
                            case this.appCache.UPDATEREADY:
                                this.updateReady();
                                break;
                            case this.appCache.OBSOLETE:
                                this.loadNormally()
                        } else this.loadNormally()
                },
                checking: function(e) {
                    this.finished || this.dispatch(this.events.CHECKING, {
                        appCache: this.appCache,
                        originalEvent: e
                    })
                },
                loadNormally: function(e) {
                    this.finished || (this.finished = !0, this.dispatch(this.events.LOADNORMALLY, {
                        appCache: this.appCache,
                        originalEvent: e
                    }))
                },
                updateProgress: function(e) {
                    this.finished || this.dispatch(this.events.UPDATEPROGRESS, {
                        appCache: this.appCache,
                        originalEvent: e,
                        lengthComputable: e.lengthComputable,
                        total: e.total,
                        loaded: e.loaded
                    })
                },
                updatingCache: function(e) {
                    this.finished || this.dispatch(this.events.UPDATINGCACHE, {
                        appCache: this.appCache,
                        originalEvent: e
                    })
                },
                updateReady: function(e) {
                    if (!this.finished) {
                        this.finished = !0, this.dispatch(this.events.UPDATEREADY, {
                            appCache: this.appCache,
                            originalEvent: e
                        });
                        try {
                            this.appCache.swapCache()
                        } catch (t) {}
                        this.reloadOnNewUpdate && location.reload()
                    }
                }
            }), s
        }), i("j13e/display/J13DisplayStage", ["require", "exports", "module", "./J13DisplayItemContainer", "../utils/J13Utils"], function(e, t, n) {
            function s(e) {
                var t = e || {};
                r.call(this, e), this.engine = t.engine || null, this.mainStage = t.mainStage || !1, this.addListener(r.events.childAdded, this.onAnyChildAdded.bind(this)), this.addListener(r.events.childRemoved, this.onAnyChildRemoved.bind(this))
            }
            var r = e("./J13DisplayItemContainer"),
                i = e("../utils/J13Utils");
            return s.events = {}, s.prototype = i.inherit(new r, {
                events: i.extendObj(r.prototype.events, s.events),
                onAnyChildAdded: function(e) {
                    var t = e.data.child;
                    t.dispatchAddedToStage(this)
                },
                onAnyChildRemoved: function(e) {
                    var t = e.data.child;
                    t.dispatchRemovedFromStage(this)
                },
                isOnStage: function() {
                    return this.parent ? this.parent.isOnStage() : this.mainStage
                },
                isVisibleOnStage: function() {
                    return this.parent ? this.visible && this.parent.isVisibleOnStage() : this.mainStage
                }
            }), s
        }), i("j13e/input/J13KeyboardManager", ["require", "exports", "module", "../utils/J13EventDispatcher", "../utils/J13Utils"], function(e, t, n) {
            function s(e) {
                var t = e || {};
                this.keyMap = {}, this.keys = s.keys, window.addEventListener("keydown", this.keyDown.bind(this), !1), window.addEventListener("keyup", this.keyUp.bind(this), !1), window.addEventListener("keypress", this.keyPress.bind(this), !1)
            }
            var r = e("../utils/J13EventDispatcher"),
                i = e("../utils/J13Utils");
            return s.events = {
                DOWN: "down",
                UP: "up",
                PRESS: "press"
            }, s.keys = {
                ENTER: 8,
                SHIFT: 16,
                CTRL: 17,
                ALT: 18,
                TAB: 9,
                BACKSPACE: 8,
                SPACE: 32,
                CAPSLOCK: 20,
                ESCAPE: 27,
                ";": 186,
                SEMICOLON: 186,
                "=": 187,
                EQUALS: 187,
                ",": 188,
                COMMA: 188,
                "-": 189,
                DASH: 189,
                ".": 190,
                PERIOD: 190,
                "/": 191,
                FORWARDSLASH: 191,
                "`": 192,
                GRAVEACCENT: 192,
                "[": 219,
                OPENBRACKET: 219,
                "\\": 220,
                BACKSLASH: 220,
                "]": 221,
                CLOSEBRACKET: 221,
                "'": 222,
                SINGLEQUOTE: 222,
                NUMPAD0: 96,
                NUMPAD1: 97,
                NUMPAD2: 98,
                NUMPAD3: 99,
                NUMPAD4: 100,
                NUMPAD5: 101,
                NUMPAD6: 102,
                NUMPAD7: 103,
                NUMPAD8: 104,
                NUMPAD9: 105,
                MULTIPLY: 106,
                ADD: 107,
                SUBTRACT: 109,
                DECIMALPOINT: 110,
                DIVIDE: 111,
                0: 48,
                ZERO: 48,
                1: 49,
                ONE: 49,
                2: 50,
                TWO: 50,
                3: 51,
                THREE: 51,
                4: 52,
                FOUR: 52,
                5: 53,
                FIVE: 53,
                6: 54,
                SIX: 54,
                7: 55,
                SEVEN: 55,
                8: 56,
                EIGHT: 56,
                9: 57,
                NINE: 57,
                A: 65,
                B: 66,
                C: 67,
                D: 68,
                E: 69,
                F: 70,
                G: 71,
                H: 72,
                I: 73,
                J: 74,
                K: 75,
                L: 76,
                M: 77,
                N: 78,
                O: 79,
                P: 80,
                Q: 81,
                R: 82,
                S: 83,
                T: 84,
                U: 85,
                V: 86,
                W: 87,
                X: 88,
                Y: 89,
                Z: 90,
                ARROWLEFT: 37,
                ARROWUP: 38,
                ARROWRIGHT: 39,
                ARROWDOWN: 40
            }, s.prototype = i.inherit(new r, {
                events: s.events,
                keys: s.keys,
                keyDown: function(e) {
                    this.keyMap[e.keyCode] || (this.keyMap[e.keyCode] = !0, this.dispatch(this.events.DOWN, {
                        keyCode: e.keyCode,
                        keyMap: this.keyMap,
                        originalEvent: e
                    }))
                },
                keyUp: function(e) {
                    this.keyMap[e.keyCode] && (this.keyMap[e.keyCode] = !1, this.dispatch(this.events.UP, {
                        keyCode: e.keyCode,
                        keyMap: this.keyMap,
                        originalEvent: e
                    }))
                },
                keyPress: function(e) {
                    this.dispatch(this.events.PRESS, {
                        keyCode: e.keyCode,
                        keyMap: this.keyMap,
                        originalEvent: e
                    })
                },
                isKeyDown: function(e) {
                    return this.keyMap[e] || !1
                },
                isKeyUp: function(e) {
                    return !this.keyMap[e]
                }
            }), s
        }), i("j13e/input/J13MouseManager", ["require", "exports", "module", "../utils/J13Utils", "../utils/J13EventDispatcher"], function(e, t, n) {
            function s(e) {
                var t = e || {};
                this.element = t.element, this.element.addEventListener("mousedown", this.mouseDown.bind(this), !1), this.element.addEventListener("mousemove", this.mouseMove.bind(this), !1), this.element.addEventListener("mouseup", this.mouseUp.bind(this), !1), this.element.addEventListener("click", this.mouseClick.bind(this), !1), this.element.addEventListener("touchstart", this.touchStart.bind(this), !1), this.element.addEventListener("touchmove", this.touchMove.bind(this), !1), this.element.addEventListener("touchend", this.touchEnd.bind(this), !1), this.enableMouseInputs = !0, this.enableTouchInputs = !0, this.numTouch = 0, this.skipMouseDown = 0, this.skipMouseUp = 0, this.skipMouseClicks = 0, this.mouseX = 0, this.mouseY = 0, this.scaledMouseX = 0, this.scaledMouseY = 0, this.scaleX = 1, this.scaleY = 1, this.zealousTouchDetect = t.hasOwnProperty("zealousTouchDetect") ? t.zealousTouchDetect : !1, this.touchDetected = !1
            }
            var r = e("../utils/J13Utils"),
                i = e("../utils/J13EventDispatcher");
            return s.events = {
                DOWN: "down",
                MOVE: "move",
                UP: "up",
                CLICK: "click",
                MOUSEDOWN: "mousedown",
                MOUSEMOVE: "mousemove",
                MOUSEUP: "mouseup",
                MOUSECLICK: "mouseclick",
                TOUCHSTART: "touchstart",
                TOUCHMOVE: "touchmove",
                TOUCHEND: "touchend"
            }, s.prototype = r.inherit(new i, {
                events: s.events,
                resize: function(e) {},
                resetSkips: function() {
                    this.skipMouseDown = 0, this.skipMouseUp = 0
                },
                updateMousePos: function(e) {
                    var t = e.target.getBoundingClientRect(),
                        n = t.left,
                        r = t.top,
                        i = 0,
                        s = 0;
                    switch (e.type) {
                        case "touchstart":
                        case "touchmove":
                        case "touchend":
                            i = e.changedTouches[0].pageX, s = e.changedTouches[0].pageY;
                            break;
                        case "mousedown":
                        case "mousemove":
                        case "mouseup":
                        case "click":
                            i = e.pageX, s = e.pageY
                    }
                    i -= n, s -= r, this.mouseX = i, this.mouseY = s, this.scaledMouseX = Math.round(i * this.scaleX), this.scaledMouseY = Math.round(s * this.scaleY)
                },
                mouseDown: function(e) {
                    e.preventDefault(), e.stopPropagation(), this.enableMouseInputs && (this.updateMousePos(e), this.dispatch(this.events.MOUSEDOWN, {
                        originalEvent: e,
                        x: this.mouseX,
                        y: this.mouseY,
                        scaledX: this.scaledMouseX,
                        scaledY: this.scaledMouseY
                    }), this.skipMouseDown > 0 ? this.skipMouseDown -= 1 : this.dispatch(this.events.DOWN, {
                        originalEvent: e,
                        x: this.mouseX,
                        y: this.mouseY,
                        scaledX: this.scaledMouseX,
                        scaledY: this.scaledMouseY
                    }))
                },
                mouseMove: function(e) {
                    e.preventDefault(), e.stopPropagation(), this.enableMouseInputs && (this.updateMousePos(e), this.dispatch(this.events.MOUSEMOVE, {
                        originalEvent: e,
                        x: this.mouseX,
                        y: this.mouseY,
                        scaledX: this.scaledMouseX,
                        scaledY: this.scaledMouseY
                    }), this.numTouch === 0 && this.dispatch(this.events.MOVE, {
                        originalEvent: e,
                        x: this.mouseX,
                        y: this.mouseY,
                        scaledX: this.scaledMouseX,
                        scaledY: this.scaledMouseY
                    }))
                },
                mouseUp: function(e) {
                    e.preventDefault(), e.stopPropagation(), this.enableMouseInputs && (this.updateMousePos(e), this.dispatch(this.events.MOUSEUP, {
                        originalEvent: e,
                        x: this.mouseX,
                        y: this.mouseY,
                        scaledX: this.scaledMouseX,
                        scaledY: this.scaledMouseY
                    }), this.skipMouseUp > 0 ? this.skipMouseUp -= 1 : this.dispatch(this.events.UP, {
                        originalEvent: e,
                        x: this.mouseX,
                        y: this.mouseY,
                        scaledX: this.scaledMouseX,
                        scaledY: this.scaledMouseY
                    }))
                },
                mouseClick: function(e) {
                    e.preventDefault(), e.stopPropagation(), this.enableMouseInputs && (this.updateMousePos(e), this.dispatch(this.events.MOUSECLICK, {
                        originalEvent: e,
                        x: this.mouseX,
                        y: this.mouseY,
                        scaledX: this.scaledMouseX,
                        scaledY: this.scaledMouseY
                    }), this.skipMouseClicks > 0 ? this.skipMouseClicks -= 1 : this.numTouch === 0 && this.dispatch(this.events.CLICK, {
                        originalEvent: e,
                        x: this.mouseX,
                        y: this.mouseY,
                        scaledX: this.scaledMouseX,
                        scaledY: this.scaledMouseY
                    }))
                },
                touchStart: function(e) {
                    e.preventDefault(), e.stopPropagation(), this.enableTouchInputs && (this.updateMousePos(e), this.numTouch += 1, this.skipMouseDown += 1, this.touchDetected = !0, this.skipMouseClicks += 1, this.zealousTouchDetect && (this.enableMouseInputs = !1), this.dispatch(this.events.TOUCHSTART, {
                        originalEvent: e,
                        x: this.mouseX,
                        y: this.mouseY,
                        scaledX: this.scaledMouseX,
                        scaledY: this.scaledMouseY
                    }), this.dispatch(this.events.DOWN, {
                        originalEvent: e,
                        x: this.mouseX,
                        y: this.mouseY,
                        scaledX: this.scaledMouseX,
                        scaledY: this.scaledMouseY
                    }))
                },
                touchMove: function(e) {
                    e.preventDefault(), e.stopPropagation(), this.enableTouchInputs && (this.updateMousePos(e), this.dispatch(this.events.TOUCHMOVE, {
                        originalEvent: e,
                        x: this.mouseX,
                        y: this.mouseY,
                        scaledX: this.scaledMouseX,
                        scaledY: this.scaledMouseY
                    }), this.dispatch(this.events.MOVE, {
                        originalEvent: e,
                        x: this.mouseX,
                        y: this.mouseY,
                        scaledX: this.scaledMouseX,
                        scaledY: this.scaledMouseY
                    }))
                },
                touchEnd: function(e) {
                    e.preventDefault(), e.stopPropagation(), this.enableTouchInputs && (this.updateMousePos(e), this.numTouch -= 1, this.skipMouseUp += 1, this.dispatch(this.events.TOUCHEND, {
                        originalEvent: e,
                        x: this.mouseX,
                        y: this.mouseY,
                        scaledX: this.scaledMouseX,
                        scaledY: this.scaledMouseY
                    }), this.dispatch(this.events.UP, {
                        originalEvent: e,
                        x: this.mouseX,
                        y: this.mouseY,
                        scaledX: this.scaledMouseX,
                        scaledY: this.scaledMouseY
                    }))
                }
            }), s
        }), i("j13e/J13E", ["require", "exports", "module", "./utils/J13Polyfills", "./utils/J13DebugManager", "./anim/J13AnimManager", "./utils/J13AppCacheManager", "./utils/J13CookieJar", "./display/J13DisplayStage", "./display/J13ButtonManager", "./input/J13KeyboardManager", "./input/J13MouseManager", "./utils/J13EventDispatcher", "./display/J13DisplayItemContainer", "./display/J13Buttonable", "./math/J13Math", "./utils/J13Utils"], function(e, t, n) {
            function g(e) {
                var t = e || {};
                h.call(this, e), this.initted = !1, this.started = !1, this.canvas = null, this.canvasContext = null, this.canvasContainer = null, this.looping = !1, this.logicLoopEnabled = !1, this.renderLoopEnabled = !1, this.animationFrameId = -1, this.lastMainLoopTime = 0, this.lastLogicLoopTime = 0, this.fixedAccumulator = 0, this.frameCount = 0, this.fixedLogicTime = 0, this.globalFont = t.globalFont || "30px Arial", this.backgroundFillStyle = t.backgroundFillStyle || "#ffffff", this.minFrameDelay = t.minFrameDelay || g.DEFAULTS.MINFRAMEDELAY, this.maxFrameDelay = t.maxFrameDelay || g.DEFAULTS.MAXFRAMEDELAY, this.fixedLogicDTM = t.fixedLogicDTM || t.fixedDTM || g.DEFAULTS.FIXEDLOGICDTM, this.fixedLogicDTS = this.fixedLogicDTM / 1e3, this.fixedDTM = t.fixedDTM || g.DEFAULTS.FIXEDDTM, this.fixedDTS = this.fixedDTM / 1e3, this.maxCycles = t.maxCycles || g.DEFAULTS.MAXCYCLES, this.autoStartPreload = t.hasOwnProperty("autoStartPreload") ? t.autoStartPreload : !1, this.loaders = [], t.canvas ? this.canvas = t.canvas : t.canvasId && (this.canvas = document.getElementById(t.canvasId)), t.canvasContainer ? this.canvasContainer = t.canvasContainer : t.canvasContainerId && (this.canvasContainer = document.getElementById(t.canvasContainerId)), this.debugManager = new i({
                    debugContainer: t.debugContainer || t.canvasContainer || null,
                    enabled: t.debug || !1
                }), this.animManager = new s({}), this.useAppCache = t.hasOwnProperty("useAppCache") ? t.useAppCache : !1, this.appCacheManager = null, this.useAppCache && (this.appCacheManager = new o({
                    appCache: window.applicationCache,
                    reloadOnNewUpdate: t.hasOwnProperty("reloadOnNewUpdate") ? t.reloadOnNewUpdate : !1
                }));
                if (!this.canvas) throw new Error("canvas or canvasId needs to be defined.");
                this.canvasContext = this.canvas.getContext("2d"), this.cookieJar = u, this.bindedMainLoop = this.mainLoop.bind(this), this.requestMainLoop = function() {
                    window.requestAnimationFrame(this.bindedMainLoop)
                }.bind(this), this.stage = new a({
                    engine: this,
                    mainStage: !0
                }), this.buttonManager = new f, this.keyboardManager = new l, this.mouseManager = new c({
                    element: t.mouseManagerTarget || this.canvas
                }), this.engineContext = {
                    dtm: 0,
                    dts: 0,
                    time: 0,
                    fixedDTM: this.fixedDTM,
                    fixedDTS: this.fixedDTS,
                    fixedLogicDTM: this.fixedLogicDTM,
                    fixedLogicDTS: this.fixedLogicDTS,
                    fixedAccumulator: 0,
                    fixedLogicTime: this.fixedLogicTime,
                    canvas: this.canvas,
                    canvasContext: this.canvasContext,
                    initted: !1,
                    started: !1,
                    stage: this.stage,
                    engine: this,
                    interpolation: 0
                }, this.init()
            }
            var r = e("./utils/J13Polyfills"),
                i = e("./utils/J13DebugManager"),
                s = e("./anim/J13AnimManager"),
                o = e("./utils/J13AppCacheManager"),
                u = e("./utils/J13CookieJar"),
                a = e("./display/J13DisplayStage"),
                f = e("./display/J13ButtonManager"),
                l = e("./input/J13KeyboardManager"),
                c = e("./input/J13MouseManager"),
                h = e("./utils/J13EventDispatcher"),
                p = e("./display/J13DisplayItemContainer"),
                d = e("./display/J13Buttonable"),
                v = e("./math/J13Math"),
                m = e("./utils/J13Utils");
            return g.DEFAULTS = {
                MINFRAMEDELAY: Math.floor(1e3 / 60),
                MAXFRAMEDELAY: Math.floor(200),
                FIXEDDTM: Math.floor(1e3 / 60),
                MAXCYCLES: 5,
                FIXEDLOGICDTM: Math.floor(1e3 / 60)
            }, g.events = {
                initted: "initted",
                preloadStarted: "preloadstarted",
                preloadProgress: "preloadprogress",
                preloadComplete: "preloadcomplete",
                started: "started",
                enterLogicLoop: "enterlogicloop",
                exitLogicLoop: "exitlogicloop",
                enterRenderLoop: "enterrenderloop",
                exitRenderLoop: "exitrenderloop",
                enterMainLoop: "entermainloop",
                exitMainLoop: "exitmainloop"
            }, g.preloadType = {
                assets: "assets",
                appCache: "appcache"
            }, g.prototype = m.inherit(new h, {
                events: g.events,
                init: function() {
                    this.initted || (this.initted = !0, this.engineContext.initted = this.initted, this.stage.addListener(p.events.anyChildAdded, function(e) {
                        e.data && e.data.child && this.checkToAddButtons(e.data.child)
                    }.bind(this)), this.stage.addListener(p.events.anyChildRemoved, function(e) {
                        e.data && e.data.child && this.checkToRemoveButtons(e.data.child)
                    }.bind(this)), this.mouseManager.addListener(c.events.DOWN, this.buttonManager.onDown.bind(this.buttonManager)), this.mouseManager.addListener(c.events.UP, this.buttonManager.onUp.bind(this.buttonManager)), this.mouseManager.addListener(c.events.MOVE, this.buttonManager.onMove.bind(this.buttonManager)), this.canvasContext.font = this.globalFont, this.dispatch(this.events.initted), this.preStart())
                },
                checkToAddButtons: function(e) {
                    if (d.isButton(e)) this.buttonManager.addButton(e);
                    else if (e.getAllChildren) {
                        var t = e.getAllChildren(),
                            n;
                        for (n = 0; n < t.length; n += 1) d.isButton(t[n]) && this.buttonManager.addButton(t[n])
                    }
                },
                checkToRemoveButtons: function(e) {
                    if (d.isButton(e)) this.buttonManager.removeButton(e);
                    else if (e.getAllChildren) {
                        var t = e.getAllChildren(),
                            n;
                        for (n = 0; n < t.length; n += 1) d.isButton(t[n]) && this.buttonManager.removeButton(t[n])
                    }
                },
                addLoader: function(e) {
                    this.loaders.push(e)
                },
                startPreload: function() {
                    this.appCacheManager ? this.startAppCachePreload() : this.startAssetsPreload()
                },
                startAppCachePreload: function() {
                    this.appCacheManager.addListener(this.appCacheManager.events.CHECKING, this.checkingAppCachePreload.bind(this)), this.appCacheManager.addListener(this.appCacheManager.events.LOADNORMALLY, this.startAssetsPreload.bind(this)), this.appCacheManager.addListener(this.appCacheManager.events.UPDATEPROGRESS, this.progressAppCachePreload.bind(this)), this.appCacheManager.addListener(this.appCacheManager.events.UPDATEREADY, this.completeAppCachePreload.bind(this)), this.dispatch(g.events.preloadStarted, {
                        preloadType: g.preloadType.appCache
                    }), this.appCacheManager.init()
                },
                checkingAppCachePreload: function(e) {},
                progressAppCachePreload: function(e) {
                    this.dispatch(g.events.preloadProgress, {
                        preloadType: g.preloadType.appCache,
                        lengthComputable: e.data.lengthComputable,
                        total: e.data.total,
                        loaded: e.data.loaded
                    })
                },
                completeAppCachePreload: function(e) {
                    this.dispatch(g.events.preloadComplete, {
                        preloadType: g.preloadType.appCache
                    })
                },
                startAssetsPreload: function() {
                    var e, t = 0;
                    for (e = 0; e < this.loaders.length; e += 1) this.loaders[e].includeInPreload && (this.loaders[e].addListener(this.loaders[e].events.load, this.progressAssetsPreload.bind(this)), this.loaders[e].addListener(this.loaders[e].events.allLoad, this.checkLoaderAssetsPreload.bind(this)), t += 1);
                    this.dispatch(this.events.preloadStarted, {
                        preloadType: g.preloadType.assets
                    });
                    for (e = 0; e < this.loaders.length; e += 1) this.loaders[e].startLoading();
                    t === 0 && this.completeAssetsPreload()
                },
                progressAssetsPreload: function(e) {
                    var t = 0,
                        n = 0,
                        r = 0,
                        i;
                    for (i = 0; i < this.loaders.length; i += 1) this.loaders[i].includeInPreload && (n += this.loaders[i].total, t += this.loaders[i].loaded, r += this.loaders[i].errors);
                    this.dispatch(this.events.preloadProgress, {
                        total: n,
                        loaded: t,
                        errors: r,
                        preloadType: g.preloadType.assets
                    })
                },
                checkLoaderAssetsPreload: function(e) {
                    var t = 0,
                        n, r = 0;
                    this.loaders.forEach(function(e) {
                        e.includeInPreload && (r += 1, e.isFullyLoaded() && (t += 1))
                    }), t >= r && this.completeAssetsPreload()
                },
                completeAssetsPreload: function() {
                    this.dispatch(this.events.preloadComplete, {
                        preloadType: g.preloadType.assets
                    }), this.start()
                },
                preStart: function() {
                    this.logicLoopEnabled = !0, this.renderLoopEnabled = !0, this.startMainLoop(), this.autoStartPreload && this.startPreload()
                },
                start: function() {
                    this.started || (this.started = !0, this.engineContext.started = this.started, this.dispatch(this.events.started))
                },
                startMainLoop: function() {
                    this.looping = !0, this.animationFrameId = window.requestAnimationFrame(this.bindedMainLoop)
                },
                stopMainLoop: function() {
                    this.looping = !1, window.cancelAnimationFrame(this.animationFrameId)
                },
                restartMainLoop: function() {
                    this.stopMainLoop(), this.startMainLoop()
                },
                calculateInterpolation: function(e, t, n) {
                    return v.clamp(0, (e - t) / n, 1)
                },
                mainLoop: function(e) {
                    var t = e,
                        n, r, i;
                    this.dispatch(this.events.enterMainLoop), this.looping ? this.animationFrameId = window.requestAnimationFrame(this.bindedMainLoop) : window.cancelAnimationFrame(this.animationFrameId), n = t - this.lastMainLoopTime, n < this.minFrameDelay && (n = this.minFrameDelay), n > this.maxFrameDelay && (n = this.maxFrameDelay), r = n / 1e3, this.engineContext.dtm = n, this.engineContext.dts = r, this.engineContext.time = t;
                    if (this.logicLoopEnabled) {
                        this.fixedAccumulator += n;
                        for (i = 0; this.fixedAccumulator >= this.fixedLogicDTM && i < this.maxCycles; i += 1) this.engineContext.fixedAccumulator = this.fixedAccumulator, this.logicLoop(this.fixedLogicDTM, this.fixedLogicDTS, t, this.engineContext), this.fixedAccumulator -= this.fixedLogicDTM, this.lastLogicLoopTime = t, this.fixedLogicTime += this.fixedLogicDTM, this.engineContext.fixedLogicTime = this.fixedLogicTime
                    }
                    this.engineContext.interpolation = this.calculateInterpolation(t, this.lastLogicLoopTime, this.fixedLogicDTM), this.animManager.update(n, r, t, this.engineContext), this.renderLoopEnabled && this.renderLoop(n, r, t, this.engineContext), this.debugManager.update(n, r, t, this.engineContext), this.frameCount += 1, this.lastMainLoopTime = t, this.dispatch(this.events.exitMainLoop)
                },
                logicLoop: function(e, t, n, r) {
                    this.dispatch(this.events.enterLogicLoop, r), this.dispatch(this.events.exitLogicLoop, r), this.debugManager.updateLogicFrameCount()
                },
                renderLoop: function(e, t, n, r) {
                    var i = r.canvas,
                        s = r.canvasContext;
                    this.dispatch(this.events.enterRenderLoop, r), s.save(), s.fillStyle = this.backgroundFillStyle, s.fillRect(0, 0, i.width, i.height), s.restore(), this.stage.stageRender(e, t, n, r), this.dispatch(this.events.exitRenderLoop, r), this.debugManager.updateRenderFrameCount()
                }
            }), g
        }), i("j13e/utils/J13Img", ["require", "exports", "module"], function(e, t, n) {
            function r(e) {
                var t = new Image;
                return t.preSrc = e, t.onload = r.imgOnLoad, t.onerror = r.imgOnError, t.alreadyLoaded = !1, t.load = function(e, t) {
                    this.onLoadFunction = e, this.onErrorFunction = t, this.src = this.preSrc, this.complete && !this.alreadyLoaded && (this.alreadyLoaded = !0, this.onLoadFunction(this))
                }, t
            }
            return r.imgOnLoad = function(e) {
                !this.alreadyLoaded && this.onLoadFunction && (this.alreadyLoaded = !0, this.onLoadFunction(this))
            }, r.imgOnError = function(e) {
                this.onErrorFunction && this.onErrorFunction(this)
            }, r
        }), i("j13e/utils/J13ImageManager", ["require", "exports", "module", "./J13Loader", "./J13Utils", "./J13Img"], function(e, t, n) {
            function o(e) {
                var t = e || {};
                r.call(this, e), this.imgs = {}, this.imgListObj = t.images || t.imgs
            }
            var r = e("./J13Loader"),
                i = e("./J13Utils"),
                s = e("./J13Img");
            return o.prototype = i.inherit(Object.create(r.prototype), {
                startLoading: function() {
                    r.prototype.startLoading.call(this);
                    var e, t = this.onLoad.bind(this),
                        n = this.onError.bind(this),
                        i = [];
                    for (e in this.imgListObj) this.imgListObj.hasOwnProperty(e) && (this.imgs[e] = this.imgs[this.imgListObj[e]] = new s(this.imgListObj[e]), this.total += 1, this.imgs[e].imgName = e, i.push(this.imgs[e].load.bind(this.imgs[e])));
                    this.total === 0 ? this.onAllLoad() : i.forEach(function(e) {
                        e(t, n)
                    })
                },
                get: function(e) {
                    return this.imgs[e]
                }
            }), o
        }), i("src/Game", ["require", "exports", "module", "./Resources", "./utils/Common", "./Settings", "j13e/utils/J13DOM", "cocoonjs/CocoonInclude", "./efs/InterstitialEfs", "./efs/EfManager", "./utils/Scouter", "./utils/GameState", "./utils/GameStateManager", "./screens/PreloadScreen", "./screens/MainMenuScreen", "./screens/PlayScreen", "./utils/SoundManager", "./utils/HiScoreManager", "j13e/utils/J13SpriteMapper", "j13e/utils/J13PatternManager", "j13e/J13E", "j13e/anim/J13Anim", "j13e/utils/J13AppCacheManager", "j13e/display/J13SpriteSheet", "j13e/display/J13DisplayItemContainer", "j13e/display/J13DisplayLayer", "j13e/display/J13DisplayText", "j13e/display/J13DisplayRect", "j13e/math/J13Rect", "j13e/utils/J13ImageManager", "j13e/utils/J13Utils", "j13e/utils/J13EventDispatcher"], function(e, t, n) {
            function _(e) {
                M.call(this, e), this.initialUrlQuery = i.paramStringToObject(window.location.search), this.canvas = o.get("gameCanvas"), this.canvasCon = o.get("gameCanvasCon") || document.body || document.getElementsByTagName("body")[0], O.makeUnselectable(this.canvasCon, !0), this.canvas || (s.cocoon ? (this.canvas = u.App.createScreenCanvas(), this.canvas.style.cssText = "idtkscale:ScaleToFill;") : this.canvas = o.create("canvas", "gameCanvas"), this.canvas.width = s.width, this.canvas.height = s.height, this.canvasCon && this.canvasCon.appendChild(this.canvas)), this.engine = new w({
                    canvas: this.canvas,
                    canvasContainer: this.canvasCon,
                    backgroundFillStyle: "#000000",
                    debug: this.initialUrlQuery.hasOwnProperty("fps"),
                    debugContainer: s.cocoon ? null : o.get("centerDiv"),
                    useAppCache: !0,
                    reloadOnNewUpdate: !0,
                    fixedLogicDTM: Math.floor(1e3 / 30)
                }), this.engine.engineContext.game = this, this.stage = this.engine.stage, this.lastLogicTime = 0, this.hiScoreManager = new g({
                    cookieSettings: s.highScoreCookieSettings,
                    order: g.order.DESC,
                    maxEntries: s.hiScore.maxEntries,
                    minScore: s.hiScore.minScore
                }), r.soundManager = new m({
                    sounds: r.sounds
                }), r.animManager = this.engine.animManager, r.imgManager = new A({
                    images: r.images,
                    includeInPreload: !0
                }), r.loadedImages = r.imgManager.imgs, r.patternManager = new b({
                    patterns: r.patterns,
                    imageManager: r.imgManager,
                    canvas: this.canvas,
                    includeInPreload: !0
                }), r.loadedPatterns = r.patternManager.patterns, r.spriteMapper = new y({
                    spriteMaps: r.spriteMaps,
                    imageManager: r.imgManager,
                    includeInPreload: !0
                }), r.spriteSheets = r.spriteMapper.spriteSheets, r.mouseManager = this.engine.mouseManager, r.keyboardManager = this.engine.keyboardManager, r.mouseManager.zealousTouchDetect = !0, r.mouseManager.addListener(r.mouseManager.events.DOWN, function(e) {
                    (new Date).getTime() - this.lastLogicTime >= 1e3 && this.engine.restartMainLoop()
                }.bind(this)), this.stage.anchorX = s.width / 2, this.stage.anchorY = s.height / 2, this.stage.scaleX = s.outputWidth / s.width, this.stage.scaleY = s.outputHeight / s.height, this.stage.x = s.outputWidth / 2, this.stage.y = s.outputHeight / 2, this.canvas.width = s.outputWidth, this.canvas.height = s.outputHeight;
                var t = this;
                window.addEventListener("resize", this.onResize.bind(this), !1), window.addEventListener("orientationchange", this.onOrientationChange.bind(this), !1), this.introPlayed = !1, s.cocoon && (u.App.setAppShouldFinishCallback(function() {
                    return !0
                }), u.App.setPreferredOrientation(u.App.Orientations.PORTRAIT));
                if (s.kik) {
                    var n = window.kik;
                    n && n.browser && n.browser.setOrientationLock && n.browser.setOrientationLock("landscape"), n && n.browser && n.browser.on && (n.browser.on("background", function() {
                        this.engine.stopMainLoop()
                    }.bind(this)), n.browser.on("foreground", function() {
                        this.engine.restartMainLoop()
                    }.bind(this))), n && n.browser && n.browser.statusBar && n.browser.statusBar(!1)
                }
                var l = null;
                s.inAppGames ? l = {
                    interstitialAds: a.getInAppAds(this)
                } : s.cocoon ? l = {
                    interstitialAds: a.getNativeAds(this)
                } : l = {
                    interstitialScreen: o.get("adInterstitialScreen"),
                    interstitialClose: o.get("adInterstitialClose"),
                    interstitialAds: a.getWebAds(this)
                }, this.adManager = r.adManager = new f(l), this.init()
            }
            var r = e("./Resources"),
                i = e("./utils/Common"),
                s = e("./Settings"),
                o = e("j13e/utils/J13DOM"),
                u = e("cocoonjs/CocoonInclude"),
                a = e("./efs/InterstitialEfs"),
                f = e("./efs/EfManager"),
                l = e("./utils/Scouter"),
                c = e("./utils/GameState"),
                h = e("./utils/GameStateManager"),
                p = e("./screens/PreloadScreen"),
                d = e("./screens/MainMenuScreen"),
                v = e("./screens/PlayScreen"),
                m = e("./utils/SoundManager"),
                g = e("./utils/HiScoreManager"),
                y = e("j13e/utils/J13SpriteMapper"),
                b = e("j13e/utils/J13PatternManager"),
                w = e("j13e/J13E"),
                E = e("j13e/anim/J13Anim"),
                S = e("j13e/utils/J13AppCacheManager"),
                x = e("j13e/display/J13SpriteSheet"),
                T = e("j13e/display/J13DisplayItemContainer"),
                N = e("j13e/display/J13DisplayLayer"),
                C = e("j13e/display/J13DisplayText"),
                k = e("j13e/display/J13DisplayRect"),
                L = e("j13e/math/J13Rect"),
                A = e("j13e/utils/J13ImageManager"),
                O = e("j13e/utils/J13Utils"),
                M = e("j13e/utils/J13EventDispatcher");
            return _.prototype = O.inherit(new M, {
                init: function() {
                    this.initScreen = new N({
                        game: this,
                        width: s.width,
                        height: s.height,
                        visible: !0
                    }), this.stage.addChild(this.initScreen), this.preloadScreen = new p({
                        width: s.width,
                        height: s.height
                    }), this.stage.addChild(this.preloadScreen), this.copyrightText = new C({
                        text: "",
                        font: "12px Arial",
                        fillStyle: "#ffffff",
                        opacity: 1,
                        textAlign: "center",
                        textBaseline: "bottom",
                        x: s.width / 2,
                        y: s.height - 5
                    }), this.stage.addChild(this.copyrightText);
                    var e = this;
                    this.gsm = new h({
                        game: this,
                        animManager: r.animManager,
                        states: [new c({
                            id: r.gameStates.init,
                            start: function(e, t) {
                                e.initScreen.visible = !0
                            },
                            end: function(e, t) {
                                e.initScreen.visible = !1
                            }
                        }), new c({
                            id: r.gameStates.appCache,
                            start: function(e, t) {
                                e.preloadScreen.show()
                            },
                            end: function(e, t) {
                                e.preloadScreen.hide()
                            }
                        }), new c({
                            id: r.gameStates.preload,
                            start: function(e, t) {
                                e.preloadScreen.show()
                            },
                            end: function(e, t) {
                                e.preloadScreen.hide()
                            },
                            endAnim: this.createFadeOutTransition()
                        }), new c({
                            id: r.gameStates.mainMenu,
                            startAnim: this.createFadeInTransition(),
                            start: function(e, t) {
                                e.mainMenuScreen.show()
                            },
                            end: function(e, t) {
                                e.mainMenuScreen.hide()
                            },
                            endAnim: this.createFadeOutTransition()
                        }), new c({
                            id: r.gameStates.level,
                            startAnim: this.createFadeInTransition(),
                            start: function(e, t) {
                                e.playScreen.show(t), e.copyrightText.opacity = .5, window.crossPromo && window.crossPromo.hide && window.crossPromo.hide()
                            },
                            end: function(e, t) {
                                window.crossPromo && window.crossPromo.show && window.crossPromo.show()
                            }
                        }), new c({
                            id: r.gameStates.gameOver,
                            start: function(e, t) {
                                e.copyrightText.opacity = 1, e.adManager.shouldShowInterstitial() && e.adManager.refreshInterstitial(), setTimeout(function() {
                                    r.gsm.toState(r.gameStates.hiScore, t)//, window.location.href="objc://"+"gameOver:/0" // by michae alert("game over")
                                }, 500)
                            },
                            end: function(e, t) {}
                        }), new c({
                            id: r.gameStates.hiScore,
                            start: function(e, t) {
                                r.soundManager.play(r.soundNames.menu), e.adManager.shouldShowInterstitial() && (window.crossPromo && window.crossPromo.hide && window.crossPromo.hide(), e.adManager.showInterstitial(function() {
                                    window.crossPromo && window.crossPromo.show && window.crossPromo.show()
                                }))
                            },
                            end: function(e, t) {
                                e.playScreen.hide(t)
                            },
                            endAnim: this.createFadeOutTransition()
                        })],
                        startState: r.gameStates.init
                    }), r.gsm = this.gsm, this.onResize(), this.engine.addLoader(r.imgManager), this.engine.addLoader(r.patternManager), this.engine.addLoader(r.spriteMapper), this.engine.addLoader(r.soundManager), this.engine.addListener(w.events.enterLogicLoop, this.logicLoop.bind(this)), this.engine.addListener(w.events.enterRenderLoop, this.enterRenderLoop.bind(this)), this.engine.addListener(w.events.exitRenderLoop, this.exitRenderLoop.bind(this)), this.engine.addListener(w.events.preloadStarted, this.preloadStarted.bind(this)), this.engine.addListener(w.events.preloadProgress, this.preloadProgress.bind(this)), this.engine.addListener(w.events.preloadComplete, this.preloadComplete.bind(this)), this.engine.addListener(w.events.started, this.start.bind(this)), r.scouter = new l({
                        game: this,
                        sendToGA: !0,
                        debugTrace: !1
                    }), this.onResize(), this.dispatch(r.events.gameInitted), this.engine.startPreload()
                },
                preloadStarted: function(e) {
                    e.data.preloadType === w.preloadType.appCache ? (this.gsm.toState(r.gameStates.appCache), this.preloadScreen.setText("Checking...", !1)) : (this.gsm.toState(r.gameStates.preload), this.preloadScreen.setText("Loading...", !1))
                },
                preloadProgress: function(e) {
                    var t = e.data.loaded,
                        n = e.data.total,
                        r = t / n,
                        i = r * 100;
                    this.preloadScreen.setPrefix((e.data.preloadType === w.preloadType.appCache ? "Updating..." : "Loading...") + "("), this.preloadScreen.setSuffix(")"), this.preloadScreen.setPercent(i, !0)
                },
                preloadComplete: function(e) {
                    e.data.preloadType === w.preloadType.appCache ? this.preloadScreen.setText("Reloading...", !0) : (this.preloadScreen.playFullyLoadedAnim(), this.preloadScreen.setText("Launching...", !0))
                },
                onResize: function(e) {
                    this.autoResizeCanvas(), setTimeout(this.autoResizeCanvas.bind(this), 500)
                },
                onOrientationChange: function(e) {
                    this.onResize(e)
                },
                autoResizeCanvas: function() {
                    var e, t, n, i, u, a, f, l, c, h;
                    if (!s.cocoon && this.canvasCon) {
                        var p = window.getComputedStyle(o.get("mainCon"));
                        e = parseInt(p.width, 10), t = parseInt(p.height, 10), n = s.width / s.height, i = e / t, u = s.outputWidth, a = s.outputHeight, O.isMobile.any() ? (f = c = e, l = h = t) : (f = 0, c = e, l = 0, h = t);
                        if (i > n) {
                            if (h < s.outputHeight || l > s.outputHeight) a = t, u = Math.floor(n * a)
                        } else if (c < s.outputWidth || f > s.outputWidth) u = e, a = Math.floor(u / n);
                        this.canvasCon.style.width = u + "px", this.canvasCon.style.height = a + "px", r.mouseManager.scaleX = r.mouseManager.scaleY = s.outputWidth / u
                    }
                },
                createFadeOutTransition: function() {
                    var e = this;
                    return new E({
                        startValue: 0,
                        endValue: 1,
                        duration: 500,
                        startCallback: function() {
                            e.transitionOverlay.visible = !0, e.transitionOverlay.opacity = 0
                        },
                        stepCallback: function(t) {
                            e.transitionOverlay.opacity = t
                        }
                    })
                },
                createFadeInTransition: function() {
                    var e = this;
                    return new E({
                        startValue: 1,
                        endValue: 0,
                        duration: 500,
                        startCallback: function() {
                            e.transitionOverlay.visible = !0, e.transitionOverlay.opacity = 1
                        },
                        stepCallback: function(t) {
                            e.transitionOverlay.opacity = t
                        },
                        endCallback: function() {
                            e.transitionOverlay.visible = !1, e.transitionOverlay.opacity = 0
                        }
                    })
                },
                start: function(e) {
                    this.mainMenuScreen = new d({
                        game: this,
                        width: s.width,
                        height: s.height
                    }), this.stage.addChild(this.mainMenuScreen), this.playScreen = new v({
                        game: this,
                        width: s.width,
                        height: s.height
                    }), this.stage.addChild(this.playScreen), this.stage.removeChild(this.copyrightText), this.stage.addChild(this.copyrightText), this.transitionOverlay = new k({
                        rect: new L({
                            width: s.width,
                            height: s.height
                        }),
                        fillStyle: "#000000",
                        visible: !1,
                        opacity: 0
                    }), this.stage.addChild(this.transitionOverlay), this.gsm.toState(r.gameStates.mainMenu, {
                        reset: !0
                    })
                },
                openMenu: function(e) {
                    this.gsm.getCurrentStateId() !== r.gameStates.mainMenu && this.gsm.toState(r.gameStates.mainMenu)
                },
                logicLoop: function(e) {
                    var t = e.data,
                        n = t.fixedLogicDTM,
                        r = t.fixedLogicDTS,
                        i = t.time,
                        s, o = (new Date).getTime();
                    t.started && (this.mainMenuScreen.visible ? this.mainMenuScreen.update(n, r, i, t) : this.playScreen.visible && this.playScreen.update(n, r, i, t));
                    var u = (new Date).getTime(),
                        a = u - o;
                    this.lastLogicTime = (new Date).getTime()
                },
                enterRenderLoop: function(e) {
                    this.debugRenderStartTime = (new Date).getTime()
                },
                exitRenderLoop: function(e) {
                    this.debugRenderEndTime = (new Date).getTime();
                    var t = this.debugRenderEndTime - this.debugRenderEndTime
                },
                getNumPlays: function() {
                    return this.playScreen.numPlays
                },
                kikShare: function(e) {
                    if (window.cards && window.cards.kik) {
                        var t = this.playScreen.getScore();
                        window.kik.send({
                            title: "I got " + t + " laps on Don't Collide!",
                            text: "Do you think you can lap more?",
                            pic: "/imgs/favicon-96.png",
                            data: {
                                score: t,
                                date: Date.now()
                            }
                        })
                    }
                },
                trace: function(e) {
                    this.engine.debugManager && this.engine.debugManager.output && (this.engine.debugManager.output.innerHTML = e || "")
                }
            }), _
        }), i("src/analytics", ["require", "src/Settings", "cocoonjs/CocoonInclude"], function(e) {
            var t = e("src/Settings"),
                n = e("cocoonjs/CocoonInclude");
            return function() {
                if (!t.cocoon)(function(e, t, n, r, i, s, o) {
                    e.GoogleAnalyticsObject = i, e[i] = e[i] || function() {
                        (e[i].q = e[i].q || []).push(arguments)
                    }, e[i].l = 1 * new Date, s = t.createElement(n), o = t.getElementsByTagName(n)[0], s.async = 1, s.src = r, o.parentNode.insertBefore(s, o)
                })(window, document, "script", "//www.google-analytics.com/analytics.js", "ga");
                else if (!window.cordova) {
                    var e = !1,
                        r = [],
                        i = function(e) {
                            console.log("Sending " + e + " to the Webview"), n.App.forwardAsync(e)
                        },
                        s = function() {
                            var e;
                            while (e = r.shift()) i(e)
                        },
                        o = function(t) {
                            r.push(t), e && s()
                        };
                    window.gaInterfaceIsReady = function() {
                        n.App.forwardAsync("CocoonJS.App.show(0, 0, " + window.innerWidth * window.devicePixelRatio + "," + window.innerHeight * window.devicePixelRatio + ");", function() {
                            e = !0, s()
                        })
                    }, console.log("Creating GAI interface"), n.App.loadInTheWebView("http://more.gamemix.com/cocoonoverlay.html?currentGame=undeadescape"), window.ga = function() {
                        var e = "";
                        for (var t = 0; t < arguments.length; t++) t > 0 && (e += ","), e += JSON.stringify(arguments[t]);
                        var n = "window.ga(" + e + ")";
                        o(n)
                    }
                }
                ga("require", "displayfeatures"), ga("create", t.gaId),
                    function(e, t, n, r, i) {
                        e.GameMixGA = i, e[i] = e[i] || function(t) {
                            e[i].q = e[i].q || [], e[i].q.push(t)
                        }, e[i]({
                            gmgaDomain: r
                        });
                        var s = t.createElement(n),
                            o = t.getElementsByTagName(n)[0];
                        s.type = "text/javascript", s.async = !0, s.src = r + "/client/gmga.js", o.parentNode.insertBefore(s, o)
                    }(window, document, "script", "http://gmga.gamemix.com", "gmga"), gmga(t.gmgaId)
            }(), !0
        }), i("src/gmapi", ["require", "exports", "module", "src/Settings"], function(e, t, n) {
            var r = e("src/Settings");
            return function(e, t, n, r, i) {
                    e.GameMixAPIName = i, e[i] = e[i] || function(t) {
                        e[i].q = e[i].q || [], e[i].q.push(t)
                    }, e[i]({
                        apiDomain: r
                    });
                    var s = t.createElement(n),
                        o = t.getElementsByTagName(n)[0];
                    s.type = "text/javascript", s.async = !0, s.src = r + "/v1/gm.js", o.parentNode.insertBefore(s, o)
                }(window, document, "script", "http://gmapi.gamemix.com", "gmapi"), window.gmapi && window.gmapi(r.gmapiId),
                function() {
                    window.gmapi && window.gmapi.apply(this, arguments)
                }
        }),
        function() {
            r.config({
                baseUrl: "js/lib",
                packages: ["j13e"],
                paths: {
                    src: "../src",
                    cocoonjs: "nococoonjs"
                },
                urlArgs: "t=" + Date.now()
            }), r(["require", "j13e", "src/Game", "cocoonjs/CocoonInclude", "src/analytics", "src/gmapi"], function(e) {
                var t = e("src/Game"),
                    n = new t
            })
        }(), i("../main", function() {})
})();