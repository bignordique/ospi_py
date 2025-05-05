!(function (e, t) {
    "object" == typeof module && "object" == typeof module.exports
        ? (module.exports = e.document
              ? t(e, !0)
              : function (e) {
                    if (e.document) return t(e);
                    throw new Error("jQuery requires a window with a document");
                })
        : t(e);
})("undefined" != typeof window ? window : this, function (f, P) {
    function $(e, t) {
        return t.toUpperCase();
    }
    var e = [],
        d = e.slice,
        R = e.concat,
        W = e.push,
        o = e.indexOf,
        n = {},
        B = n.toString,
        H = n.hasOwnProperty,
        m = {},
        g = f.document,
        t = "2.1.1",
        S = function (e, t) {
            return new S.fn.init(e, t);
        },
        U = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        V = /^-ms-/,
        q = /-([\da-z])/gi;
    function F(e) {
        var t = e.length,
            n = S.type(e);
        return "function" !== n && !S.isWindow(e) && (!(1 !== e.nodeType || !t) || "array" === n || 0 === t || ("number" == typeof t && 0 < t && t - 1 in e));
    }
    (S.fn = S.prototype = {
        jquery: t,
        constructor: S,
        selector: "",
        length: 0,
        toArray: function () {
            return d.call(this);
        },
        get: function (e) {
            return null != e ? (e < 0 ? this[e + this.length] : this[e]) : d.call(this);
        },
        pushStack: function (e) {
            e = S.merge(this.constructor(), e);
            return (e.prevObject = this), (e.context = this.context), e;
        },
        each: function (e, t) {
            return S.each(this, e, t);
        },
        map: function (n) {
            return this.pushStack(
                S.map(this, function (e, t) {
                    return n.call(e, t, e);
                })
            );
        },
        slice: function () {
            return this.pushStack(d.apply(this, arguments));
        },
        first: function () {
            return this.eq(0);
        },
        last: function () {
            return this.eq(-1);
        },
        eq: function (e) {
            var t = this.length,
                e = +e + (e < 0 ? t : 0);
            return this.pushStack(0 <= e && e < t ? [this[e]] : []);
        },
        end: function () {
            return this.prevObject || this.constructor(null);
        },
        push: W,
        sort: e.sort,
        splice: e.splice,
    }),
        (S.extend = S.fn.extend = function () {
            var e,
                t,
                n,
                i,
                o,
                a = arguments[0] || {},
                s = 1,
                r = arguments.length,
                l = !1;
            for ("boolean" == typeof a && ((l = a), (a = arguments[s] || {}), s++), "object" == typeof a || S.isFunction(a) || (a = {}), s === r && ((a = this), s--); s < r; s++)
                if (null != (e = arguments[s]))
                    for (t in e)
                        (o = a[t]),
                            (n = e[t]),
                            a !== n && (l && n && (S.isPlainObject(n) || (i = S.isArray(n))) ? ((o = i ? ((i = !1), o && S.isArray(o) ? o : []) : o && S.isPlainObject(o) ? o : {}), (a[t] = S.extend(l, o, n))) : void 0 !== n && (a[t] = n));
            return a;
        }),
        S.extend({
            expando: "jQuery" + (t + Math.random()).replace(/\D/g, ""),
            isReady: !0,
            error: function (e) {
                throw new Error(e);
            },
            noop: function () {},
            isFunction: function (e) {
                return "function" === S.type(e);
            },
            isArray: Array.isArray,
            isWindow: function (e) {
                return null != e && e === e.window;
            },
            isNumeric: function (e) {
                return !S.isArray(e) && 0 <= e - parseFloat(e);
            },
            isPlainObject: function (e) {
                return !("object" !== S.type(e) || e.nodeType || S.isWindow(e) || (e.constructor && !H.call(e.constructor.prototype, "isPrototypeOf")));
            },
            isEmptyObject: function (e) {
                for (var t in e) return !1;
                return !0;
            },
            type: function (e) {
                return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? n[B.call(e)] || "object" : typeof e;
            },
            globalEval: function (e) {
                var t,
                    n = eval;
                (e = S.trim(e)) && (1 === e.indexOf("use strict") ? (((t = g.createElement("script")).text = e), g.head.appendChild(t).parentNode.removeChild(t)) : n(e));
            },
            camelCase: function (e) {
                return e.replace(V, "ms-").replace(q, $);
            },
            nodeName: function (e, t) {
                return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
            },
            each: function (e, t, n) {
                var i,
                    o = 0,
                    a = e.length,
                    s = F(e);
                if (n) {
                    if (s) for (; o < a && !1 !== (i = t.apply(e[o], n)); o++);
                    else for (o in e) if (((i = t.apply(e[o], n)), !1 === i)) break;
                } else if (s) for (; o < a && !1 !== (i = t.call(e[o], o, e[o])); o++);
                else for (o in e) if (((i = t.call(e[o], o, e[o])), !1 === i)) break;
                return e;
            },
            trim: function (e) {
                return null == e ? "" : (e + "").replace(U, "");
            },
            makeArray: function (e, t) {
                t = t || [];
                return null != e && (F(Object(e)) ? S.merge(t, "string" == typeof e ? [e] : e) : W.call(t, e)), t;
            },
            inArray: function (e, t, n) {
                return null == t ? -1 : o.call(t, e, n);
            },
            merge: function (e, t) {
                for (var n = +t.length, i = 0, o = e.length; i < n; i++) e[o++] = t[i];
                return (e.length = o), e;
            },
            grep: function (e, t, n) {
                for (var i = [], o = 0, a = e.length, s = !n; o < a; o++) !t(e[o], o) != s && i.push(e[o]);
                return i;
            },
            map: function (e, t, n) {
                var i,
                    o = 0,
                    a = e.length,
                    s = [];
                if (F(e)) for (; o < a; o++) null != (i = t(e[o], o, n)) && s.push(i);
                else for (o in e) (i = t(e[o], o, n)), null != i && s.push(i);
                return R.apply([], s);
            },
            guid: 1,
            proxy: function (e, t) {
                var n, i;
                return (
                    "string" == typeof t && ((i = e[t]), (t = e), (e = i)),
                    S.isFunction(e)
                        ? ((n = d.call(arguments, 2)),
                          ((i = function () {
                              return e.apply(t || this, n.concat(d.call(arguments)));
                          }).guid = e.guid = e.guid || S.guid++),
                          i)
                        : void 0
                );
            },
            now: Date.now,
            support: m,
        }),
        S.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (e, t) {
            n["[object " + t + "]"] = t.toLowerCase();
        });
    var e = (function (P) {
            function u(e, t, n) {
                var i = "0x" + t - 65536;
                return i != i || n ? t : i < 0 ? String.fromCharCode(65536 + i) : String.fromCharCode((i >> 10) | 55296, (1023 & i) | 56320);
            }
            var e,
                p,
                w,
                a,
                $,
                h,
                R,
                W,
                S,
                c,
                d,
                f,
                k,
                t,
                m,
                g,
                i,
                o,
                v,
                y = "sizzle" + -new Date(),
                b = P.document,
                T = 0,
                B = 0,
                H = ce(),
                U = ce(),
                V = ce(),
                q = function (e, t) {
                    return e === t && (d = !0), 0;
                },
                n = "undefined",
                F = {}.hasOwnProperty,
                s = [],
                z = s.pop,
                G = s.push,
                x = s.push,
                Y = s.slice,
                _ =
                    s.indexOf ||
                    function (e) {
                        for (var t = 0, n = this.length; t < n; t++) if (this[t] === e) return t;
                        return -1;
                    },
                J = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                r = "[\\x20\\t\\r\\n\\f]",
                l = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                X = l.replace("w", "w#"),
                K = "\\[" + r + "*(" + l + ")(?:" + r + "*([*^$|!~]?=)" + r + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + X + "))|)" + r + "*\\]",
                Q = ":(" + l + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + K + ")*)|.*)\\)|)",
                C = new RegExp("^" + r + "+|((?:^|[^\\\\])(?:\\\\.)*)" + r + "+$", "g"),
                Z = new RegExp("^" + r + "*," + r + "*"),
                ee = new RegExp("^" + r + "*([>+~]|" + r + ")" + r + "*"),
                te = new RegExp("=" + r + "*([^\\]'\"]*?)" + r + "*\\]", "g"),
                ne = new RegExp(Q),
                ie = new RegExp("^" + X + "$"),
                D = {
                    ID: new RegExp("^#(" + l + ")"),
                    CLASS: new RegExp("^\\.(" + l + ")"),
                    TAG: new RegExp("^(" + l.replace("w", "w*") + ")"),
                    ATTR: new RegExp("^" + K),
                    PSEUDO: new RegExp("^" + Q),
                    CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + r + "*(even|odd|(([+-]|)(\\d*)n|)" + r + "*(?:([+-]|)" + r + "*(\\d+)|))" + r + "*\\)|)", "i"),
                    bool: new RegExp("^(?:" + J + ")$", "i"),
                    needsContext: new RegExp("^" + r + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + r + "*((?:-\\d)?\\d*)" + r + "*\\)|)(?=[^-]|$)", "i"),
                },
                oe = /^(?:input|select|textarea|button)$/i,
                ae = /^h\d$/i,
                O = /^[^{]+\{\s*\[native \w/,
                se = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                re = /[+~]/,
                le = /'|\\/g,
                I = new RegExp("\\\\([\\da-f]{1,6}" + r + "?|(" + r + ")|.)", "ig");
            try {
                x.apply((s = Y.call(b.childNodes)), b.childNodes), s[b.childNodes.length].nodeType;
            } catch (e) {
                x = {
                    apply: s.length
                        ? function (e, t) {
                              G.apply(e, Y.call(t));
                          }
                        : function (e, t) {
                              for (var n = e.length, i = 0; (e[n++] = t[i++]); );
                              e.length = n - 1;
                          },
                };
            }
            function E(e, t, n, i) {
                var o, a, s, r, l, c, d;
                if (((t ? t.ownerDocument || t : b) !== k && f(t), (n = n || []), !e || "string" != typeof e)) return n;
                if (1 !== (o = (t = t || k).nodeType) && 9 !== o) return [];
                if (m && !i) {
                    if ((c = se.exec(e)))
                        if ((d = c[1])) {
                            if (9 === o) {
                                if (!(r = t.getElementById(d)) || !r.parentNode) return n;
                                if (r.id === d) return n.push(r), n;
                            } else if (t.ownerDocument && (r = t.ownerDocument.getElementById(d)) && v(t, r) && r.id === d) return n.push(r), n;
                        } else {
                            if (c[2]) return x.apply(n, t.getElementsByTagName(e)), n;
                            if ((d = c[3]) && p.getElementsByClassName && t.getElementsByClassName) return x.apply(n, t.getElementsByClassName(d)), n;
                        }
                    if (p.qsa && (!g || !g.test(e))) {
                        if (((l = r = y), (c = t), (d = 9 === o && e), 1 === o && "object" !== t.nodeName.toLowerCase())) {
                            for (s = h(e), (r = t.getAttribute("id")) ? (l = r.replace(le, "\\$&")) : t.setAttribute("id", l), l = "[id='" + l + "'] ", a = s.length; a--; ) s[a] = l + L(s[a]);
                            (c = (re.test(e) && pe(t.parentNode)) || t), (d = s.join(","));
                        }
                        if (d)
                            try {
                                return x.apply(n, c.querySelectorAll(d)), n;
                            } catch (e) {
                            } finally {
                                r || t.removeAttribute("id");
                            }
                    }
                }
                return W(e.replace(C, "$1"), t, n, i);
            }
            function ce() {
                var n = [];
                function i(e, t) {
                    return n.push(e + " ") > w.cacheLength && delete i[n.shift()], (i[e + " "] = t);
                }
                return i;
            }
            function M(e) {
                return (e[y] = !0), e;
            }
            function A(e) {
                var t = k.createElement("div");
                try {
                    return !!e(t);
                } catch (e) {
                    return !1;
                } finally {
                    t.parentNode && t.parentNode.removeChild(t);
                }
            }
            function de(e, t) {
                for (var n = e.split("|"), i = e.length; i--; ) w.attrHandle[n[i]] = t;
            }
            function ue(e, t) {
                var n = t && e,
                    i = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || 1 << 31) - (~e.sourceIndex || 1 << 31);
                if (i) return i;
                if (n) for (; (n = n.nextSibling); ) if (n === t) return -1;
                return e ? 1 : -1;
            }
            function N(s) {
                return M(function (a) {
                    return (
                        (a = +a),
                        M(function (e, t) {
                            for (var n, i = s([], e.length, a), o = i.length; o--; ) e[(n = i[o])] && (e[n] = !(t[n] = e[n]));
                        })
                    );
                });
            }
            function pe(e) {
                return e && typeof e.getElementsByTagName !== n && e;
            }
            for (e in ((p = E.support = {}),
            ($ = E.isXML = function (e) {
                e = e && (e.ownerDocument || e).documentElement;
                return !!e && "HTML" !== e.nodeName;
            }),
            (f = E.setDocument = function (e) {
                var l = e ? e.ownerDocument || e : b,
                    e = l.defaultView;
                return l !== k && 9 === l.nodeType && l.documentElement
                    ? ((t = (k = l).documentElement),
                      (m = !$(l)),
                      e &&
                          e !== e.top &&
                          (e.addEventListener
                              ? e.addEventListener(
                                    "unload",
                                    function () {
                                        f();
                                    },
                                    !1
                                )
                              : e.attachEvent &&
                                e.attachEvent("onunload", function () {
                                    f();
                                })),
                      (p.attributes = A(function (e) {
                          return (e.className = "i"), !e.getAttribute("className");
                      })),
                      (p.getElementsByTagName = A(function (e) {
                          return e.appendChild(l.createComment("")), !e.getElementsByTagName("*").length;
                      })),
                      (p.getElementsByClassName =
                          O.test(l.getElementsByClassName) &&
                          A(function (e) {
                              return (e.innerHTML = "<div class='a'></div><div class='a i'></div>"), (e.firstChild.className = "i"), 2 === e.getElementsByClassName("i").length;
                          })),
                      (p.getById = A(function (e) {
                          return (t.appendChild(e).id = y), !l.getElementsByName || !l.getElementsByName(y).length;
                      })),
                      p.getById
                          ? ((w.find.ID = function (e, t) {
                                if (typeof t.getElementById !== n && m) return (t = t.getElementById(e)) && t.parentNode ? [t] : [];
                            }),
                            (w.filter.ID = function (e) {
                                var t = e.replace(I, u);
                                return function (e) {
                                    return e.getAttribute("id") === t;
                                };
                            }))
                          : (delete w.find.ID,
                            (w.filter.ID = function (e) {
                                var t = e.replace(I, u);
                                return function (e) {
                                    e = typeof e.getAttributeNode !== n && e.getAttributeNode("id");
                                    return e && e.value === t;
                                };
                            })),
                      (w.find.TAG = p.getElementsByTagName
                          ? function (e, t) {
                                return typeof t.getElementsByTagName !== n ? t.getElementsByTagName(e) : void 0;
                            }
                          : function (e, t) {
                                var n,
                                    i = [],
                                    o = 0,
                                    a = t.getElementsByTagName(e);
                                if ("*" !== e) return a;
                                for (; (n = a[o++]); ) 1 === n.nodeType && i.push(n);
                                return i;
                            }),
                      (w.find.CLASS =
                          p.getElementsByClassName &&
                          function (e, t) {
                              return typeof t.getElementsByClassName !== n && m ? t.getElementsByClassName(e) : void 0;
                          }),
                      (i = []),
                      (g = []),
                      (p.qsa = O.test(l.querySelectorAll)) &&
                          (A(function (e) {
                              (e.innerHTML = "<select msallowclip=''><option selected=''></option></select>"),
                                  e.querySelectorAll("[msallowclip^='']").length && g.push("[*^$]=" + r + "*(?:''|\"\")"),
                                  e.querySelectorAll("[selected]").length || g.push("\\[" + r + "*(?:value|" + J + ")"),
                                  e.querySelectorAll(":checked").length || g.push(":checked");
                          }),
                          A(function (e) {
                              var t = l.createElement("input");
                              t.setAttribute("type", "hidden"),
                                  e.appendChild(t).setAttribute("name", "D"),
                                  e.querySelectorAll("[name=d]").length && g.push("name" + r + "*[*^$|!~]?="),
                                  e.querySelectorAll(":enabled").length || g.push(":enabled", ":disabled"),
                                  e.querySelectorAll("*,:x"),
                                  g.push(",.*:");
                          })),
                      (p.matchesSelector = O.test((o = t.matches || t.webkitMatchesSelector || t.mozMatchesSelector || t.oMatchesSelector || t.msMatchesSelector))) &&
                          A(function (e) {
                              (p.disconnectedMatch = o.call(e, "div")), o.call(e, "[s!='']:x"), i.push("!=", Q);
                          }),
                      (g = g.length && new RegExp(g.join("|"))),
                      (i = i.length && new RegExp(i.join("|"))),
                      (e = O.test(t.compareDocumentPosition)),
                      (v =
                          e || O.test(t.contains)
                              ? function (e, t) {
                                    var n = 9 === e.nodeType ? e.documentElement : e,
                                        t = t && t.parentNode;
                                    return e === t || !(!t || 1 !== t.nodeType || !(n.contains ? n.contains(t) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(t)));
                                }
                              : function (e, t) {
                                    if (t) for (; (t = t.parentNode); ) if (t === e) return !0;
                                    return !1;
                                }),
                      (q = e
                          ? function (e, t) {
                                var n;
                                return e === t
                                    ? ((d = !0), 0)
                                    : (n = !e.compareDocumentPosition - !t.compareDocumentPosition) ||
                                          (1 & (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || (!p.sortDetached && t.compareDocumentPosition(e) === n)
                                              ? e === l || (e.ownerDocument === b && v(b, e))
                                                  ? -1
                                                  : t === l || (t.ownerDocument === b && v(b, t))
                                                  ? 1
                                                  : c
                                                  ? _.call(c, e) - _.call(c, t)
                                                  : 0
                                              : 4 & n
                                              ? -1
                                              : 1);
                            }
                          : function (e, t) {
                                if (e === t) return (d = !0), 0;
                                var n,
                                    i = 0,
                                    o = e.parentNode,
                                    a = t.parentNode,
                                    s = [e],
                                    r = [t];
                                if (!o || !a) return e === l ? -1 : t === l ? 1 : o ? -1 : a ? 1 : c ? _.call(c, e) - _.call(c, t) : 0;
                                if (o === a) return ue(e, t);
                                for (n = e; (n = n.parentNode); ) s.unshift(n);
                                for (n = t; (n = n.parentNode); ) r.unshift(n);
                                for (; s[i] === r[i]; ) i++;
                                return i ? ue(s[i], r[i]) : s[i] === b ? -1 : r[i] === b ? 1 : 0;
                            }),
                      l)
                    : k;
            }),
            (E.matches = function (e, t) {
                return E(e, null, null, t);
            }),
            (E.matchesSelector = function (e, t) {
                if (((e.ownerDocument || e) !== k && f(e), (t = t.replace(te, "='$1']")), !(!p.matchesSelector || !m || (i && i.test(t)) || (g && g.test(t)))))
                    try {
                        var n = o.call(e, t);
                        if (n || p.disconnectedMatch || (e.document && 11 !== e.document.nodeType)) return n;
                    } catch (e) {}
                return 0 < E(t, k, null, [e]).length;
            }),
            (E.contains = function (e, t) {
                return (e.ownerDocument || e) !== k && f(e), v(e, t);
            }),
            (E.attr = function (e, t) {
                (e.ownerDocument || e) !== k && f(e);
                var n = w.attrHandle[t.toLowerCase()],
                    n = n && F.call(w.attrHandle, t.toLowerCase()) ? n(e, t, !m) : void 0;
                return void 0 !== n ? n : p.attributes || !m ? e.getAttribute(t) : (n = e.getAttributeNode(t)) && n.specified ? n.value : null;
            }),
            (E.error = function (e) {
                throw new Error("Syntax error, unrecognized expression: " + e);
            }),
            (E.uniqueSort = function (e) {
                var t,
                    n = [],
                    i = 0,
                    o = 0;
                if (((d = !p.detectDuplicates), (c = !p.sortStable && e.slice(0)), e.sort(q), d)) {
                    for (; (t = e[o++]); ) t === e[o] && (i = n.push(o));
                    for (; i--; ) e.splice(n[i], 1);
                }
                return (c = null), e;
            }),
            (a = E.getText = function (e) {
                var t,
                    n = "",
                    i = 0,
                    o = e.nodeType;
                if (o) {
                    if (1 === o || 9 === o || 11 === o) {
                        if ("string" == typeof e.textContent) return e.textContent;
                        for (e = e.firstChild; e; e = e.nextSibling) n += a(e);
                    } else if (3 === o || 4 === o) return e.nodeValue;
                } else for (; (t = e[i++]); ) n += a(t);
                return n;
            }),
            ((w = E.selectors = {
                cacheLength: 50,
                createPseudo: M,
                match: D,
                attrHandle: {},
                find: {},
                relative: { ">": { dir: "parentNode", first: !0 }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: !0 }, "~": { dir: "previousSibling" } },
                preFilter: {
                    ATTR: function (e) {
                        return (e[1] = e[1].replace(I, u)), (e[3] = (e[3] || e[4] || e[5] || "").replace(I, u)), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4);
                    },
                    CHILD: function (e) {
                        return (
                            (e[1] = e[1].toLowerCase()),
                            "nth" === e[1].slice(0, 3) ? (e[3] || E.error(e[0]), (e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3]))), (e[5] = +(e[7] + e[8] || "odd" === e[3]))) : e[3] && E.error(e[0]),
                            e
                        );
                    },
                    PSEUDO: function (e) {
                        var t,
                            n = !e[6] && e[2];
                        return D.CHILD.test(e[0])
                            ? null
                            : (e[3] ? (e[2] = e[4] || e[5] || "") : n && ne.test(n) && (t = (t = h(n, !0)) && n.indexOf(")", n.length - t) - n.length) && ((e[0] = e[0].slice(0, t)), (e[2] = n.slice(0, t))), e.slice(0, 3));
                    },
                },
                filter: {
                    TAG: function (e) {
                        var t = e.replace(I, u).toLowerCase();
                        return "*" === e
                            ? function () {
                                  return !0;
                              }
                            : function (e) {
                                  return e.nodeName && e.nodeName.toLowerCase() === t;
                              };
                    },
                    CLASS: function (e) {
                        var t = H[e + " "];
                        return (
                            t ||
                            ((t = new RegExp("(^|" + r + ")" + e + "(" + r + "|$)")) &&
                                H(e, function (e) {
                                    return t.test(("string" == typeof e.className && e.className) || (typeof e.getAttribute !== n && e.getAttribute("class")) || "");
                                }))
                        );
                    },
                    ATTR: function (t, n, i) {
                        return function (e) {
                            e = E.attr(e, t);
                            return null == e
                                ? "!=" === n
                                : !n ||
                                      ((e += ""),
                                      "=" === n
                                          ? e === i
                                          : "!=" === n
                                          ? e !== i
                                          : "^=" === n
                                          ? i && 0 === e.indexOf(i)
                                          : "*=" === n
                                          ? i && -1 < e.indexOf(i)
                                          : "$=" === n
                                          ? i && e.slice(-i.length) === i
                                          : "~=" === n
                                          ? -1 < (" " + e + " ").indexOf(i)
                                          : "|=" === n && (e === i || e.slice(0, i.length + 1) === i + "-"));
                        };
                    },
                    CHILD: function (h, e, t, f, m) {
                        var g = "nth" !== h.slice(0, 3),
                            v = "last" !== h.slice(-4),
                            b = "of-type" === e;
                        return 1 === f && 0 === m
                            ? function (e) {
                                  return !!e.parentNode;
                              }
                            : function (e, t, n) {
                                  var i,
                                      o,
                                      a,
                                      s,
                                      r,
                                      l,
                                      c = g != v ? "nextSibling" : "previousSibling",
                                      d = e.parentNode,
                                      u = b && e.nodeName.toLowerCase(),
                                      p = !n && !b;
                                  if (d) {
                                      if (g) {
                                          for (; c; ) {
                                              for (a = e; (a = a[c]); ) if (b ? a.nodeName.toLowerCase() === u : 1 === a.nodeType) return !1;
                                              l = c = "only" === h && !l && "nextSibling";
                                          }
                                          return !0;
                                      }
                                      if (((l = [v ? d.firstChild : d.lastChild]), v && p)) {
                                          for (r = (i = (o = d[y] || (d[y] = {}))[h] || [])[0] === T && i[1], s = i[0] === T && i[2], a = r && d.childNodes[r]; (a = (++r && a && a[c]) || ((s = r = 0), l.pop())); )
                                              if (1 === a.nodeType && ++s && a === e) {
                                                  o[h] = [T, r, s];
                                                  break;
                                              }
                                      } else if (p && (i = (e[y] || (e[y] = {}))[h]) && i[0] === T) s = i[1];
                                      else for (; (a = (++r && a && a[c]) || ((s = r = 0), l.pop())) && ((b ? a.nodeName.toLowerCase() !== u : 1 !== a.nodeType) || !++s || (p && ((a[y] || (a[y] = {}))[h] = [T, s]), a !== e)); );
                                      return (s -= m) === f || (s % f == 0 && 0 <= s / f);
                                  }
                              };
                    },
                    PSEUDO: function (e, a) {
                        var t,
                            s = w.pseudos[e] || w.setFilters[e.toLowerCase()] || E.error("unsupported pseudo: " + e);
                        return s[y]
                            ? s(a)
                            : 1 < s.length
                            ? ((t = [e, e, "", a]),
                              w.setFilters.hasOwnProperty(e.toLowerCase())
                                  ? M(function (e, t) {
                                        for (var n, i = s(e, a), o = i.length; o--; ) e[(n = _.call(e, i[o]))] = !(t[n] = i[o]);
                                    })
                                  : function (e) {
                                        return s(e, 0, t);
                                    })
                            : s;
                    },
                },
                pseudos: {
                    not: M(function (e) {
                        var i = [],
                            o = [],
                            r = R(e.replace(C, "$1"));
                        return r[y]
                            ? M(function (e, t, n, i) {
                                  for (var o, a = r(e, null, i, []), s = e.length; s--; ) (o = a[s]) && (e[s] = !(t[s] = o));
                              })
                            : function (e, t, n) {
                                  return (i[0] = e), r(i, null, n, o), !o.pop();
                              };
                    }),
                    has: M(function (t) {
                        return function (e) {
                            return 0 < E(t, e).length;
                        };
                    }),
                    contains: M(function (t) {
                        return function (e) {
                            return -1 < (e.textContent || e.innerText || a(e)).indexOf(t);
                        };
                    }),
                    lang: M(function (n) {
                        return (
                            ie.test(n || "") || E.error("unsupported lang: " + n),
                            (n = n.replace(I, u).toLowerCase()),
                            function (e) {
                                var t;
                                do {
                                    if ((t = m ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang"))) return (t = t.toLowerCase()) === n || 0 === t.indexOf(n + "-");
                                } while ((e = e.parentNode) && 1 === e.nodeType);
                                return !1;
                            }
                        );
                    }),
                    target: function (e) {
                        var t = P.location && P.location.hash;
                        return t && t.slice(1) === e.id;
                    },
                    root: function (e) {
                        return e === t;
                    },
                    focus: function (e) {
                        return e === k.activeElement && (!k.hasFocus || k.hasFocus()) && !!(e.type || e.href || ~e.tabIndex);
                    },
                    enabled: function (e) {
                        return !1 === e.disabled;
                    },
                    disabled: function (e) {
                        return !0 === e.disabled;
                    },
                    checked: function (e) {
                        var t = e.nodeName.toLowerCase();
                        return ("input" === t && !!e.checked) || ("option" === t && !!e.selected);
                    },
                    selected: function (e) {
                        return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected;
                    },
                    empty: function (e) {
                        for (e = e.firstChild; e; e = e.nextSibling) if (e.nodeType < 6) return !1;
                        return !0;
                    },
                    parent: function (e) {
                        return !w.pseudos.empty(e);
                    },
                    header: function (e) {
                        return ae.test(e.nodeName);
                    },
                    input: function (e) {
                        return oe.test(e.nodeName);
                    },
                    button: function (e) {
                        var t = e.nodeName.toLowerCase();
                        return ("input" === t && "button" === e.type) || "button" === t;
                    },
                    text: function (e) {
                        return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (e = e.getAttribute("type")) || "text" === e.toLowerCase());
                    },
                    first: N(function () {
                        return [0];
                    }),
                    last: N(function (e, t) {
                        return [t - 1];
                    }),
                    eq: N(function (e, t, n) {
                        return [n < 0 ? n + t : n];
                    }),
                    even: N(function (e, t) {
                        for (var n = 0; n < t; n += 2) e.push(n);
                        return e;
                    }),
                    odd: N(function (e, t) {
                        for (var n = 1; n < t; n += 2) e.push(n);
                        return e;
                    }),
                    lt: N(function (e, t, n) {
                        for (var i = n < 0 ? n + t : n; 0 <= --i; ) e.push(i);
                        return e;
                    }),
                    gt: N(function (e, t, n) {
                        for (var i = n < 0 ? n + t : n; ++i < t; ) e.push(i);
                        return e;
                    }),
                },
            }).pseudos.nth = w.pseudos.eq),
            { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }))
                w.pseudos[e] = (function (t) {
                    return function (e) {
                        return "input" === e.nodeName.toLowerCase() && e.type === t;
                    };
                })(e);
            for (e in { submit: !0, reset: !0 })
                w.pseudos[e] = (function (n) {
                    return function (e) {
                        var t = e.nodeName.toLowerCase();
                        return ("input" === t || "button" === t) && e.type === n;
                    };
                })(e);
            function he() {}
            function L(e) {
                for (var t = 0, n = e.length, i = ""; t < n; t++) i += e[t].value;
                return i;
            }
            function fe(s, e, t) {
                var r = e.dir,
                    l = t && "parentNode" === r,
                    c = B++;
                return e.first
                    ? function (e, t, n) {
                          for (; (e = e[r]); ) if (1 === e.nodeType || l) return s(e, t, n);
                      }
                    : function (e, t, n) {
                          var i,
                              o,
                              a = [T, c];
                          if (n) {
                              for (; (e = e[r]); ) if ((1 === e.nodeType || l) && s(e, t, n)) return !0;
                          } else
                              for (; (e = e[r]); )
                                  if (1 === e.nodeType || l) {
                                      if ((i = (o = e[y] || (e[y] = {}))[r]) && i[0] === T && i[1] === c) return (a[2] = i[2]);
                                      if (((o[r] = a)[2] = s(e, t, n))) return !0;
                                  }
                      };
            }
            function me(o) {
                return 1 < o.length
                    ? function (e, t, n) {
                          for (var i = o.length; i--; ) if (!o[i](e, t, n)) return !1;
                          return !0;
                      }
                    : o[0];
            }
            function j(e, t, n, i, o) {
                for (var a, s = [], r = 0, l = e.length, c = null != t; r < l; r++) (a = e[r]) && (!n || n(a, i, o)) && (s.push(a), c) && t.push(r);
                return s;
            }
            function ge(h, f, m, g, v, e) {
                return (
                    g && !g[y] && (g = ge(g)),
                    v && !v[y] && (v = ge(v, e)),
                    M(function (e, t, n, i) {
                        var o,
                            a,
                            s,
                            r = [],
                            l = [],
                            c = t.length,
                            d =
                                e ||
                                (function (e, t, n) {
                                    for (var i = 0, o = t.length; i < o; i++) E(e, t[i], n);
                                    return n;
                                })(f || "*", n.nodeType ? [n] : n, []),
                            u = !h || (!e && f) ? d : j(d, r, h, n, i),
                            p = m ? (v || (e ? h : c || g) ? [] : t) : u;
                        if ((m && m(u, p, n, i), g)) for (o = j(p, l), g(o, [], n, i), a = o.length; a--; ) (s = o[a]) && (p[l[a]] = !(u[l[a]] = s));
                        if (e) {
                            if (v || h) {
                                if (v) {
                                    for (o = [], a = p.length; a--; ) (s = p[a]) && o.push((u[a] = s));
                                    v(null, (p = []), o, i);
                                }
                                for (a = p.length; a--; ) (s = p[a]) && -1 < (o = v ? _.call(e, s) : r[a]) && (e[o] = !(t[o] = s));
                            }
                        } else (p = j(p === t ? p.splice(c, p.length) : p)), v ? v(null, t, p, i) : x.apply(t, p);
                    })
                );
            }
            function ve(g, v) {
                function e(e, t, n, i, o) {
                    var a,
                        s,
                        r,
                        l = 0,
                        c = "0",
                        d = e && [],
                        u = [],
                        p = S,
                        h = e || (y && w.find.TAG("*", o)),
                        f = (T += null == p ? 1 : Math.random() || 0.1),
                        m = h.length;
                    for (o && (S = t !== k && t); c !== m && null != (a = h[c]); c++) {
                        if (y && a) {
                            for (s = 0; (r = g[s++]); )
                                if (r(a, t, n)) {
                                    i.push(a);
                                    break;
                                }
                            o && (T = f);
                        }
                        b && ((a = !r && a) && l--, e) && d.push(a);
                    }
                    if (((l += c), b && c !== l)) {
                        for (s = 0; (r = v[s++]); ) r(d, u, t, n);
                        if (e) {
                            if (0 < l) for (; c--; ) d[c] || u[c] || (u[c] = z.call(i));
                            u = j(u);
                        }
                        x.apply(i, u), o && !e && 0 < u.length && 1 < l + v.length && E.uniqueSort(i);
                    }
                    return o && ((T = f), (S = p)), d;
                }
                var b = 0 < v.length,
                    y = 0 < g.length;
                return b ? M(e) : e;
            }
            return (
                (he.prototype = w.filters = w.pseudos),
                (w.setFilters = new he()),
                (h = E.tokenize = function (e, t) {
                    var n,
                        i,
                        o,
                        a,
                        s,
                        r,
                        l,
                        c = U[e + " "];
                    if (c) return t ? 0 : c.slice(0);
                    for (s = e, r = [], l = w.preFilter; s; ) {
                        for (a in ((n && !(i = Z.exec(s))) || (i && (s = s.slice(i[0].length) || s), r.push((o = []))),
                        (n = !1),
                        (i = ee.exec(s)) && ((n = i.shift()), o.push({ value: n, type: i[0].replace(C, " ") }), (s = s.slice(n.length))),
                        w.filter))
                            !(i = D[a].exec(s)) || (l[a] && !(i = l[a](i))) || ((n = i.shift()), o.push({ value: n, type: a, matches: i }), (s = s.slice(n.length)));
                        if (!n) break;
                    }
                    return t ? s.length : s ? E.error(e) : U(e, r).slice(0);
                }),
                (R = E.compile = function (e, t) {
                    var n,
                        i = [],
                        o = [],
                        a = V[e + " "];
                    if (!a) {
                        for (n = (t = t || h(e)).length; n--; )
                            ((a = (function e(t) {
                                for (
                                    var i,
                                        n,
                                        o,
                                        a = t.length,
                                        s = w.relative[t[0].type],
                                        r = s || w.relative[" "],
                                        l = s ? 1 : 0,
                                        c = fe(
                                            function (e) {
                                                return e === i;
                                            },
                                            r,
                                            !0
                                        ),
                                        d = fe(
                                            function (e) {
                                                return -1 < _.call(i, e);
                                            },
                                            r,
                                            !0
                                        ),
                                        u = [
                                            function (e, t, n) {
                                                return (!s && (n || t !== S)) || ((i = t).nodeType ? c : d)(e, t, n);
                                            },
                                        ];
                                    l < a;
                                    l++
                                )
                                    if ((n = w.relative[t[l].type])) u = [fe(me(u), n)];
                                    else {
                                        if ((n = w.filter[t[l].type].apply(null, t[l].matches))[y]) {
                                            for (o = ++l; o < a && !w.relative[t[o].type]; o++);
                                            return ge(
                                                1 < l && me(u),
                                                1 < l && L(t.slice(0, l - 1).concat({ value: " " === t[l - 2].type ? "*" : "" })).replace(C, "$1"),
                                                n,
                                                l < o && e(t.slice(l, o)),
                                                o < a && e((t = t.slice(o))),
                                                o < a && L(t)
                                            );
                                        }
                                        u.push(n);
                                    }
                                return me(u);
                            })(t[n]))[y]
                                ? i
                                : o
                            ).push(a);
                        (a = V(e, ve(o, i))).selector = e;
                    }
                    return a;
                }),
                (W = E.select = function (e, t, n, i) {
                    var o,
                        a,
                        s,
                        r,
                        l,
                        c = "function" == typeof e && e,
                        d = !i && h((e = c.selector || e));
                    if (((n = n || []), 1 === d.length)) {
                        if (2 < (a = d[0] = d[0].slice(0)).length && "ID" === (s = a[0]).type && p.getById && 9 === t.nodeType && m && w.relative[a[1].type]) {
                            if (!(t = (w.find.ID(s.matches[0].replace(I, u), t) || [])[0])) return n;
                            c && (t = t.parentNode), (e = e.slice(a.shift().value.length));
                        }
                        for (o = D.needsContext.test(e) ? 0 : a.length; o-- && ((s = a[o]), !w.relative[(r = s.type)]); )
                            if ((l = w.find[r]) && (i = l(s.matches[0].replace(I, u), (re.test(a[0].type) && pe(t.parentNode)) || t))) {
                                if ((a.splice(o, 1), (e = i.length && L(a)))) break;
                                return x.apply(n, i), n;
                            }
                    }
                    return (c || R(e, d))(i, t, !m, n, (re.test(e) && pe(t.parentNode)) || t), n;
                }),
                (p.sortStable = y.split("").sort(q).join("") === y),
                (p.detectDuplicates = !!d),
                f(),
                (p.sortDetached = A(function (e) {
                    return 1 & e.compareDocumentPosition(k.createElement("div"));
                })),
                A(function (e) {
                    return (e.innerHTML = "<a href='#'></a>"), "#" === e.firstChild.getAttribute("href");
                }) ||
                    de("type|href|height|width", function (e, t, n) {
                        return n ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2);
                    }),
                (p.attributes &&
                    A(function (e) {
                        return (e.innerHTML = "<input/>"), e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value");
                    })) ||
                    de("value", function (e, t, n) {
                        return n || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue;
                    }),
                A(function (e) {
                    return null == e.getAttribute("disabled");
                }) ||
                    de(J, function (e, t, n) {
                        return n ? void 0 : !0 === e[t] ? t.toLowerCase() : (n = e.getAttributeNode(t)) && n.specified ? n.value : null;
                    }),
                E
            );
        })(f),
        z = ((S.find = e), (S.expr = e.selectors), (S.expr[":"] = S.expr.pseudos), (S.unique = e.uniqueSort), (S.text = e.getText), (S.isXMLDoc = e.isXML), (S.contains = e.contains), S.expr.match.needsContext),
        G = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        Y = /^.[^:#\[\.,]*$/;
    function J(e, n, i) {
        if (S.isFunction(n))
            return S.grep(e, function (e, t) {
                return !!n.call(e, t, e) !== i;
            });
        if (n.nodeType)
            return S.grep(e, function (e) {
                return (e === n) !== i;
            });
        if ("string" == typeof n) {
            if (Y.test(n)) return S.filter(n, e, i);
            n = S.filter(n, e);
        }
        return S.grep(e, function (e) {
            return 0 <= o.call(n, e) !== i;
        });
    }
    (S.filter = function (e, t, n) {
        var i = t[0];
        return (
            n && (e = ":not(" + e + ")"),
            1 === t.length && 1 === i.nodeType
                ? S.find.matchesSelector(i, e)
                    ? [i]
                    : []
                : S.find.matches(
                      e,
                      S.grep(t, function (e) {
                          return 1 === e.nodeType;
                      })
                  )
        );
    }),
        S.fn.extend({
            find: function (e) {
                var t,
                    n = this.length,
                    i = [],
                    o = this;
                if ("string" != typeof e)
                    return this.pushStack(
                        S(e).filter(function () {
                            for (t = 0; t < n; t++) if (S.contains(o[t], this)) return !0;
                        })
                    );
                for (t = 0; t < n; t++) S.find(e, o[t], i);
                return ((i = this.pushStack(1 < n ? S.unique(i) : i)).selector = this.selector ? this.selector + " " + e : e), i;
            },
            filter: function (e) {
                return this.pushStack(J(this, e || [], !1));
            },
            not: function (e) {
                return this.pushStack(J(this, e || [], !0));
            },
            is: function (e) {
                return !!J(this, "string" == typeof e && z.test(e) ? S(e) : e || [], !1).length;
            },
        });
    var a,
        X = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        K =
            (((S.fn.init = function (e, t) {
                var n, i;
                if (e) {
                    if ("string" != typeof e)
                        return e.nodeType
                            ? ((this.context = this[0] = e), (this.length = 1), this)
                            : S.isFunction(e)
                            ? void 0 !== a.ready
                                ? a.ready(e)
                                : e(S)
                            : (void 0 !== e.selector && ((this.selector = e.selector), (this.context = e.context)), S.makeArray(e, this));
                    if (!(n = "<" === e[0] && ">" === e[e.length - 1] && 3 <= e.length ? [null, e, null] : X.exec(e)) || (!n[1] && t)) return (!t || t.jquery ? t || a : this.constructor(t)).find(e);
                    if (n[1]) {
                        if (((t = t instanceof S ? t[0] : t), S.merge(this, S.parseHTML(n[1], t && t.nodeType ? t.ownerDocument || t : g, !0)), G.test(n[1]) && S.isPlainObject(t)))
                            for (n in t) S.isFunction(this[n]) ? this[n](t[n]) : this.attr(n, t[n]);
                    } else (i = g.getElementById(n[2])) && i.parentNode && ((this.length = 1), (this[0] = i)), (this.context = g), (this.selector = e);
                }
                return this;
            }).prototype = S.fn),
            (a = S(g)),
            /^(?:parents|prev(?:Until|All))/),
        Q = { children: !0, contents: !0, next: !0, prev: !0 };
    function Z(e, t) {
        for (; (e = e[t]) && 1 !== e.nodeType; );
        return e;
    }
    S.extend({
        dir: function (e, t, n) {
            for (var i = [], o = void 0 !== n; (e = e[t]) && 9 !== e.nodeType; )
                if (1 === e.nodeType) {
                    if (o && S(e).is(n)) break;
                    i.push(e);
                }
            return i;
        },
        sibling: function (e, t) {
            for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
            return n;
        },
    }),
        S.fn.extend({
            has: function (e) {
                var t = S(e, this),
                    n = t.length;
                return this.filter(function () {
                    for (var e = 0; e < n; e++) if (S.contains(this, t[e])) return !0;
                });
            },
            closest: function (e, t) {
                for (var n, i = 0, o = this.length, a = [], s = z.test(e) || "string" != typeof e ? S(e, t || this.context) : 0; i < o; i++)
                    for (n = this[i]; n && n !== t; n = n.parentNode)
                        if (n.nodeType < 11 && (s ? -1 < s.index(n) : 1 === n.nodeType && S.find.matchesSelector(n, e))) {
                            a.push(n);
                            break;
                        }
                return this.pushStack(1 < a.length ? S.unique(a) : a);
            },
            index: function (e) {
                return e ? ("string" == typeof e ? o.call(S(e), this[0]) : o.call(this, e.jquery ? e[0] : e)) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
            },
            add: function (e, t) {
                return this.pushStack(S.unique(S.merge(this.get(), S(e, t))));
            },
            addBack: function (e) {
                return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
            },
        }),
        S.each(
            {
                parent: function (e) {
                    e = e.parentNode;
                    return e && 11 !== e.nodeType ? e : null;
                },
                parents: function (e) {
                    return S.dir(e, "parentNode");
                },
                parentsUntil: function (e, t, n) {
                    return S.dir(e, "parentNode", n);
                },
                next: function (e) {
                    return Z(e, "nextSibling");
                },
                prev: function (e) {
                    return Z(e, "previousSibling");
                },
                nextAll: function (e) {
                    return S.dir(e, "nextSibling");
                },
                prevAll: function (e) {
                    return S.dir(e, "previousSibling");
                },
                nextUntil: function (e, t, n) {
                    return S.dir(e, "nextSibling", n);
                },
                prevUntil: function (e, t, n) {
                    return S.dir(e, "previousSibling", n);
                },
                siblings: function (e) {
                    return S.sibling((e.parentNode || {}).firstChild, e);
                },
                children: function (e) {
                    return S.sibling(e.firstChild);
                },
                contents: function (e) {
                    return e.contentDocument || S.merge([], e.childNodes);
                },
            },
            function (i, o) {
                S.fn[i] = function (e, t) {
                    var n = S.map(this, o, e);
                    return (t = "Until" !== i.slice(-5) ? e : t) && "string" == typeof t && (n = S.filter(t, n)), 1 < this.length && (Q[i] || S.unique(n), K.test(i)) && n.reverse(), this.pushStack(n);
                };
            }
        );
    var i,
        k = /\S+/g,
        ee = {};
    function s() {
        g.removeEventListener("DOMContentLoaded", s, !1), f.removeEventListener("load", s, !1), S.ready();
    }
    (S.Callbacks = function (o) {
        var e, n;
        o =
            "string" == typeof o
                ? ee[o] ||
                  ((n = ee[(e = o)] = {}),
                  S.each(e.match(k) || [], function (e, t) {
                      n[t] = !0;
                  }),
                  n)
                : S.extend({}, o);
        function i(e) {
            for (t = o.memory && e, a = !0, c = r || 0, r = 0, l = d.length, s = !0; d && c < l; c++)
                if (!1 === d[c].apply(e[0], e[1]) && o.stopOnFalse) {
                    t = !1;
                    break;
                }
            (s = !1), d && (u ? u.length && i(u.shift()) : t ? (d = []) : p.disable());
        }
        var t,
            a,
            s,
            r,
            l,
            c,
            d = [],
            u = !o.once && [],
            p = {
                add: function () {
                    var e;
                    return (
                        d &&
                            ((e = d.length),
                            (function i(e) {
                                S.each(e, function (e, t) {
                                    var n = S.type(t);
                                    "function" === n ? (o.unique && p.has(t)) || d.push(t) : t && t.length && "string" !== n && i(t);
                                });
                            })(arguments),
                            s ? (l = d.length) : t && ((r = e), i(t))),
                        this
                    );
                },
                remove: function () {
                    return (
                        d &&
                            S.each(arguments, function (e, t) {
                                for (var n; -1 < (n = S.inArray(t, d, n)); ) d.splice(n, 1), s && (n <= l && l--, n <= c) && c--;
                            }),
                        this
                    );
                },
                has: function (e) {
                    return e ? -1 < S.inArray(e, d) : !(!d || !d.length);
                },
                empty: function () {
                    return (d = []), (l = 0), this;
                },
                disable: function () {
                    return (d = u = t = void 0), this;
                },
                disabled: function () {
                    return !d;
                },
                lock: function () {
                    return (u = void 0), t || p.disable(), this;
                },
                locked: function () {
                    return !u;
                },
                fireWith: function (e, t) {
                    return !d || (a && !u) || ((t = [e, (t = t || []).slice ? t.slice() : t]), s ? u.push(t) : i(t)), this;
                },
                fire: function () {
                    return p.fireWith(this, arguments), this;
                },
                fired: function () {
                    return !!a;
                },
            };
        return p;
    }),
        S.extend({
            Deferred: function (e) {
                var a = [
                        ["resolve", "done", S.Callbacks("once memory"), "resolved"],
                        ["reject", "fail", S.Callbacks("once memory"), "rejected"],
                        ["notify", "progress", S.Callbacks("memory")],
                    ],
                    o = "pending",
                    s = {
                        state: function () {
                            return o;
                        },
                        always: function () {
                            return r.done(arguments).fail(arguments), this;
                        },
                        then: function () {
                            var o = arguments;
                            return S.Deferred(function (i) {
                                S.each(a, function (e, t) {
                                    var n = S.isFunction(o[e]) && o[e];
                                    r[t[1]](function () {
                                        var e = n && n.apply(this, arguments);
                                        e && S.isFunction(e.promise) ? e.promise().done(i.resolve).fail(i.reject).progress(i.notify) : i[t[0] + "With"](this === s ? i.promise() : this, n ? [e] : arguments);
                                    });
                                }),
                                    (o = null);
                            }).promise();
                        },
                        promise: function (e) {
                            return null != e ? S.extend(e, s) : s;
                        },
                    },
                    r = {};
                return (
                    (s.pipe = s.then),
                    S.each(a, function (e, t) {
                        var n = t[2],
                            i = t[3];
                        (s[t[1]] = n.add),
                            i &&
                                n.add(
                                    function () {
                                        o = i;
                                    },
                                    a[1 ^ e][2].disable,
                                    a[2][2].lock
                                ),
                            (r[t[0]] = function () {
                                return r[t[0] + "With"](this === r ? s : this, arguments), this;
                            }),
                            (r[t[0] + "With"] = n.fireWith);
                    }),
                    s.promise(r),
                    e && e.call(r, r),
                    r
                );
            },
            when: function (e) {
                function t(t, n, i) {
                    return function (e) {
                        (n[t] = this), (i[t] = 1 < arguments.length ? d.call(arguments) : e), i === o ? c.notifyWith(n, i) : --l || c.resolveWith(n, i);
                    };
                }
                var o,
                    n,
                    i,
                    a = 0,
                    s = d.call(arguments),
                    r = s.length,
                    l = 1 !== r || (e && S.isFunction(e.promise)) ? r : 0,
                    c = 1 === l ? e : S.Deferred();
                if (1 < r) for (o = new Array(r), n = new Array(r), i = new Array(r); a < r; a++) s[a] && S.isFunction(s[a].promise) ? s[a].promise().done(t(a, i, s)).fail(c.reject).progress(t(a, n, o)) : --l;
                return l || c.resolveWith(i, s), c.promise();
            },
        }),
        (S.fn.ready = function (e) {
            return S.ready.promise().done(e), this;
        }),
        S.extend({
            isReady: !1,
            readyWait: 1,
            holdReady: function (e) {
                e ? S.readyWait++ : S.ready(!0);
            },
            ready: function (e) {
                (!0 === e ? --S.readyWait : S.isReady) || ((S.isReady = !0) !== e && 0 < --S.readyWait) || (i.resolveWith(g, [S]), S.fn.triggerHandler && (S(g).triggerHandler("ready"), S(g).off("ready")));
            },
        }),
        (S.ready.promise = function (e) {
            return i || ((i = S.Deferred()), "complete" === g.readyState ? setTimeout(S.ready) : (g.addEventListener("DOMContentLoaded", s, !1), f.addEventListener("load", s, !1))), i.promise(e);
        }),
        S.ready.promise();
    var r = (S.access = function (e, t, n, i, o, a, s) {
        var r = 0,
            l = e.length,
            c = null == n;
        if ("object" === S.type(n)) for (r in ((o = !0), n)) S.access(e, t, r, n[r], !0, a, s);
        else if (
            void 0 !== i &&
            ((o = !0),
            S.isFunction(i) || (s = !0),
            (t = c
                ? s
                    ? (t.call(e, i), null)
                    : ((c = t),
                      function (e, t, n) {
                          return c.call(S(e), n);
                      })
                : t))
        )
            for (; r < l; r++) t(e[r], n, s ? i : i.call(e[r], r, t(e[r], n)));
        return o ? e : c ? t.call(e) : l ? t(e[0], n) : a;
    });
    function l() {
        Object.defineProperty((this.cache = {}), 0, {
            get: function () {
                return {};
            },
        }),
            (this.expando = S.expando + Math.random());
    }
    (S.acceptData = function (e) {
        return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType;
    }),
        (l.uid = 1),
        (l.accepts = S.acceptData),
        (l.prototype = {
            key: function (t) {
                if (!l.accepts(t)) return 0;
                var n = {},
                    i = t[this.expando];
                if (!i) {
                    i = l.uid++;
                    try {
                        (n[this.expando] = { value: i }), Object.defineProperties(t, n);
                    } catch (e) {
                        (n[this.expando] = i), S.extend(t, n);
                    }
                }
                return this.cache[i] || (this.cache[i] = {}), i;
            },
            set: function (e, t, n) {
                var i,
                    e = this.key(e),
                    o = this.cache[e];
                if ("string" == typeof t) o[t] = n;
                else if (S.isEmptyObject(o)) S.extend(this.cache[e], t);
                else for (i in t) o[i] = t[i];
                return o;
            },
            get: function (e, t) {
                e = this.cache[this.key(e)];
                return void 0 === t ? e : e[t];
            },
            access: function (e, t, n) {
                var i;
                return void 0 === t || (t && "string" == typeof t && void 0 === n) ? (void 0 !== (i = this.get(e, t)) ? i : this.get(e, S.camelCase(t))) : (this.set(e, t, n), void 0 !== n ? n : t);
            },
            remove: function (e, t) {
                var n,
                    i,
                    e = this.key(e),
                    o = this.cache[e];
                if (void 0 === t) this.cache[e] = {};
                else {
                    n = (i = S.isArray(t) ? t.concat(t.map(S.camelCase)) : ((e = S.camelCase(t)), t in o ? [t, e] : (i = e) in o ? [i] : i.match(k) || [])).length;
                    for (; n--; ) delete o[i[n]];
                }
            },
            hasData: function (e) {
                return !S.isEmptyObject(this.cache[e[this.expando]] || {});
            },
            discard: function (e) {
                e[this.expando] && delete this.cache[e[this.expando]];
            },
        });
    var v = new l(),
        c = new l(),
        te = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        ne = /([A-Z])/g;
    function ie(e, t, n) {
        var i;
        if (void 0 === n && 1 === e.nodeType)
            if (((i = "data-" + t.replace(ne, "-$1").toLowerCase()), "string" == typeof (n = e.getAttribute(i)))) {
                try {
                    n = "true" === n || ("false" !== n && ("null" === n ? null : +n + "" === n ? +n : te.test(n) ? S.parseJSON(n) : n));
                } catch (e) {}
                c.set(e, t, n);
            } else n = void 0;
        return n;
    }
    S.extend({
        hasData: function (e) {
            return c.hasData(e) || v.hasData(e);
        },
        data: function (e, t, n) {
            return c.access(e, t, n);
        },
        removeData: function (e, t) {
            c.remove(e, t);
        },
        _data: function (e, t, n) {
            return v.access(e, t, n);
        },
        _removeData: function (e, t) {
            v.remove(e, t);
        },
    }),
        S.fn.extend({
            data: function (i, e) {
                var t,
                    n,
                    o,
                    a = this[0],
                    s = a && a.attributes;
                if (void 0 !== i)
                    return "object" == typeof i
                        ? this.each(function () {
                              c.set(this, i);
                          })
                        : r(
                              this,
                              function (t) {
                                  var e,
                                      n = S.camelCase(i);
                                  if (a && void 0 === t) return void 0 !== (e = c.get(a, i)) || void 0 !== (e = c.get(a, n)) || void 0 !== (e = ie(a, n, void 0)) ? e : void 0;
                                  this.each(function () {
                                      var e = c.get(this, n);
                                      c.set(this, n, t), -1 !== i.indexOf("-") && void 0 !== e && c.set(this, i, t);
                                  });
                              },
                              null,
                              e,
                              1 < arguments.length,
                              null,
                              !0
                          );
                if (this.length && ((o = c.get(a)), 1 === a.nodeType) && !v.get(a, "hasDataAttrs")) {
                    for (t = s.length; t--; ) s[t] && 0 === (n = s[t].name).indexOf("data-") && ((n = S.camelCase(n.slice(5))), ie(a, n, o[n]));
                    v.set(a, "hasDataAttrs", !0);
                }
                return o;
            },
            removeData: function (e) {
                return this.each(function () {
                    c.remove(this, e);
                });
            },
        }),
        S.extend({
            queue: function (e, t, n) {
                var i;
                return e ? ((i = v.get(e, (t = (t || "fx") + "queue"))), n && (!i || S.isArray(n) ? (i = v.access(e, t, S.makeArray(n))) : i.push(n)), i || []) : void 0;
            },
            dequeue: function (e, t) {
                t = t || "fx";
                var n = S.queue(e, t),
                    i = n.length,
                    o = n.shift(),
                    a = S._queueHooks(e, t);
                "inprogress" === o && ((o = n.shift()), i--),
                    o &&
                        ("fx" === t && n.unshift("inprogress"),
                        delete a.stop,
                        o.call(
                            e,
                            function () {
                                S.dequeue(e, t);
                            },
                            a
                        )),
                    !i && a && a.empty.fire();
            },
            _queueHooks: function (e, t) {
                var n = t + "queueHooks";
                return (
                    v.get(e, n) ||
                    v.access(e, n, {
                        empty: S.Callbacks("once memory").add(function () {
                            v.remove(e, [t + "queue", n]);
                        }),
                    })
                );
            },
        }),
        S.fn.extend({
            queue: function (t, n) {
                var e = 2;
                return (
                    "string" != typeof t && ((n = t), (t = "fx"), e--),
                    arguments.length < e
                        ? S.queue(this[0], t)
                        : void 0 === n
                        ? this
                        : this.each(function () {
                              var e = S.queue(this, t, n);
                              S._queueHooks(this, t), "fx" === t && "inprogress" !== e[0] && S.dequeue(this, t);
                          })
                );
            },
            dequeue: function (e) {
                return this.each(function () {
                    S.dequeue(this, e);
                });
            },
            clearQueue: function (e) {
                return this.queue(e || "fx", []);
            },
            promise: function (e, t) {
                function n() {
                    --o || a.resolveWith(s, [s]);
                }
                var i,
                    o = 1,
                    a = S.Deferred(),
                    s = this,
                    r = this.length;
                for ("string" != typeof e && ((t = e), (e = void 0)), e = e || "fx"; r--; ) (i = v.get(s[r], e + "queueHooks")) && i.empty && (o++, i.empty.add(n));
                return n(), a.promise(t);
            },
        });
    function b(e, t) {
        return "none" === S.css((e = t || e), "display") || !S.contains(e.ownerDocument, e);
    }
    var t = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        u = ["Top", "Right", "Bottom", "Left"],
        oe = /^(?:checkbox|radio)$/i,
        y =
            ((e = g.createDocumentFragment().appendChild(g.createElement("div"))),
            (E = g.createElement("input")).setAttribute("type", "radio"),
            E.setAttribute("checked", "checked"),
            E.setAttribute("name", "t"),
            e.appendChild(E),
            (m.checkClone = e.cloneNode(!0).cloneNode(!0).lastChild.checked),
            (e.innerHTML = "<textarea>x</textarea>"),
            (m.noCloneChecked = !!e.cloneNode(!0).lastChild.defaultValue),
            "undefined"),
        ae = ((m.focusinBubbles = "onfocusin" in f), /^key/),
        se = /^(?:mouse|pointer|contextmenu)|click/,
        re = /^(?:focusinfocus|focusoutblur)$/,
        le = /^([^.]*)(?:\.(.+)|)$/;
    function p() {
        return !0;
    }
    function h() {
        return !1;
    }
    function ce() {
        try {
            return g.activeElement;
        } catch (e) {}
    }
    (S.event = {
        global: {},
        add: function (t, e, n, i, o) {
            var a,
                s,
                r,
                l,
                c,
                d,
                u,
                p,
                h,
                f = v.get(t);
            if (f)
                for (
                    n.handler && ((n = (a = n).handler), (o = a.selector)),
                        n.guid || (n.guid = S.guid++),
                        r = (r = f.events) || (f.events = {}),
                        s =
                            (s = f.handle) ||
                            (f.handle = function (e) {
                                return typeof S != y && S.event.triggered !== e.type ? S.event.dispatch.apply(t, arguments) : void 0;
                            }),
                        l = (e = (e || "").match(k) || [""]).length;
                    l--;

                )
                    (u = h = (p = le.exec(e[l]) || [])[1]),
                        (p = (p[2] || "").split(".").sort()),
                        u &&
                            ((c = S.event.special[u] || {}),
                            (u = (o ? c.delegateType : c.bindType) || u),
                            (c = S.event.special[u] || {}),
                            (h = S.extend({ type: u, origType: h, data: i, handler: n, guid: n.guid, selector: o, needsContext: o && S.expr.match.needsContext.test(o), namespace: p.join(".") }, a)),
                            (d = r[u]) || (((d = r[u] = []).delegateCount = 0), c.setup && !1 !== c.setup.call(t, i, p, s)) || (t.addEventListener && t.addEventListener(u, s, !1)),
                            c.add && (c.add.call(t, h), h.handler.guid || (h.handler.guid = n.guid)),
                            o ? d.splice(d.delegateCount++, 0, h) : d.push(h),
                            (S.event.global[u] = !0));
        },
        remove: function (e, t, n, i, o) {
            var a,
                s,
                r,
                l,
                c,
                d,
                u,
                p,
                h,
                f,
                m,
                g = v.hasData(e) && v.get(e);
            if (g && (l = g.events)) {
                for (c = (t = (t || "").match(k) || [""]).length; c--; )
                    if (((h = m = (r = le.exec(t[c]) || [])[1]), (f = (r[2] || "").split(".").sort()), h)) {
                        for (u = S.event.special[h] || {}, p = l[(h = (i ? u.delegateType : u.bindType) || h)] || [], r = r[2] && new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)"), s = a = p.length; a--; )
                            (d = p[a]),
                                (!o && m !== d.origType) ||
                                    (n && n.guid !== d.guid) ||
                                    (r && !r.test(d.namespace)) ||
                                    (i && i !== d.selector && ("**" !== i || !d.selector)) ||
                                    (p.splice(a, 1), d.selector && p.delegateCount--, u.remove && u.remove.call(e, d));
                        s && !p.length && ((u.teardown && !1 !== u.teardown.call(e, f, g.handle)) || S.removeEvent(e, h, g.handle), delete l[h]);
                    } else for (h in l) S.event.remove(e, h + t[c], n, i, !0);
                S.isEmptyObject(l) && (delete g.handle, v.remove(e, "events"));
            }
        },
        trigger: function (e, t, n, i) {
            var o,
                a,
                s,
                r,
                l,
                c,
                d = [n || g],
                u = H.call(e, "type") ? e.type : e,
                p = H.call(e, "namespace") ? e.namespace.split(".") : [],
                h = (a = n = n || g);
            if (
                3 !== n.nodeType &&
                8 !== n.nodeType &&
                !re.test(u + S.event.triggered) &&
                (0 <= u.indexOf(".") && ((u = (p = u.split(".")).shift()), p.sort()),
                (r = u.indexOf(":") < 0 && "on" + u),
                ((e = e[S.expando] ? e : new S.Event(u, "object" == typeof e && e)).isTrigger = i ? 2 : 3),
                (e.namespace = p.join(".")),
                (e.namespace_re = e.namespace ? new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)") : null),
                (e.result = void 0),
                e.target || (e.target = n),
                (t = null == t ? [e] : S.makeArray(t, [e])),
                (c = S.event.special[u] || {}),
                i || !c.trigger || !1 !== c.trigger.apply(n, t))
            ) {
                if (!i && !c.noBubble && !S.isWindow(n)) {
                    for (s = c.delegateType || u, re.test(s + u) || (h = h.parentNode); h; h = h.parentNode) d.push(h), (a = h);
                    a === (n.ownerDocument || g) && d.push(a.defaultView || a.parentWindow || f);
                }
                for (o = 0; (h = d[o++]) && !e.isPropagationStopped(); )
                    (e.type = 1 < o ? s : c.bindType || u),
                        (l = (v.get(h, "events") || {})[e.type] && v.get(h, "handle")) && l.apply(h, t),
                        (l = r && h[r]) && l.apply && S.acceptData(h) && ((e.result = l.apply(h, t)), !1 === e.result) && e.preventDefault();
                return (
                    (e.type = u),
                    i ||
                        e.isDefaultPrevented() ||
                        (c._default && !1 !== c._default.apply(d.pop(), t)) ||
                        !S.acceptData(n) ||
                        (r && S.isFunction(n[u]) && !S.isWindow(n) && ((a = n[r]) && (n[r] = null), n[(S.event.triggered = u)](), (S.event.triggered = void 0), a) && (n[r] = a)),
                    e.result
                );
            }
        },
        dispatch: function (e) {
            e = S.event.fix(e);
            var t,
                n,
                i,
                o,
                a,
                s = d.call(arguments),
                r = (v.get(this, "events") || {})[e.type] || [],
                l = S.event.special[e.type] || {};
            if ((((s[0] = e).delegateTarget = this), !l.preDispatch || !1 !== l.preDispatch.call(this, e))) {
                for (a = S.event.handlers.call(this, e, r), t = 0; (i = a[t++]) && !e.isPropagationStopped(); )
                    for (e.currentTarget = i.elem, n = 0; (o = i.handlers[n++]) && !e.isImmediatePropagationStopped(); )
                        (e.namespace_re && !e.namespace_re.test(o.namespace)) ||
                            ((e.handleObj = o), (e.data = o.data), void 0 === (o = ((S.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, s))) ||
                            !1 !== (e.result = o) ||
                            (e.preventDefault(), e.stopPropagation());
                return l.postDispatch && l.postDispatch.call(this, e), e.result;
            }
        },
        handlers: function (e, t) {
            var n,
                i,
                o,
                a,
                s = [],
                r = t.delegateCount,
                l = e.target;
            if (r && l.nodeType && (!e.button || "click" !== e.type))
                for (; l !== this; l = l.parentNode || this)
                    if (!0 !== l.disabled || "click" !== e.type) {
                        for (i = [], n = 0; n < r; n++) void 0 === i[(o = (a = t[n]).selector + " ")] && (i[o] = a.needsContext ? 0 <= S(o, this).index(l) : S.find(o, this, null, [l]).length), i[o] && i.push(a);
                        i.length && s.push({ elem: l, handlers: i });
                    }
            return r < t.length && s.push({ elem: this, handlers: t.slice(r) }), s;
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function (e, t) {
                return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e;
            },
        },
        mouseHooks: {
            props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function (e, t) {
                var n,
                    i,
                    o = t.button;
                return (
                    null == e.pageX &&
                        null != t.clientX &&
                        ((n = (i = e.target.ownerDocument || g).documentElement),
                        (i = i.body),
                        (e.pageX = t.clientX + ((n && n.scrollLeft) || (i && i.scrollLeft) || 0) - ((n && n.clientLeft) || (i && i.clientLeft) || 0)),
                        (e.pageY = t.clientY + ((n && n.scrollTop) || (i && i.scrollTop) || 0) - ((n && n.clientTop) || (i && i.clientTop) || 0))),
                    e.which || void 0 === o || (e.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0),
                    e
                );
            },
        },
        fix: function (e) {
            if (e[S.expando]) return e;
            var t,
                n,
                i,
                o = e.type,
                a = e,
                s = this.fixHooks[o];
            for (s || (this.fixHooks[o] = s = se.test(o) ? this.mouseHooks : ae.test(o) ? this.keyHooks : {}), i = s.props ? this.props.concat(s.props) : this.props, e = new S.Event(a), t = i.length; t--; ) e[(n = i[t])] = a[n];
            return e.target || (e.target = g), 3 === e.target.nodeType && (e.target = e.target.parentNode), s.filter ? s.filter(e, a) : e;
        },
        special: {
            load: { noBubble: !0 },
            focus: {
                trigger: function () {
                    return this !== ce() && this.focus ? (this.focus(), !1) : void 0;
                },
                delegateType: "focusin",
            },
            blur: {
                trigger: function () {
                    return this === ce() && this.blur ? (this.blur(), !1) : void 0;
                },
                delegateType: "focusout",
            },
            click: {
                trigger: function () {
                    return "checkbox" === this.type && this.click && S.nodeName(this, "input") ? (this.click(), !1) : void 0;
                },
                _default: function (e) {
                    return S.nodeName(e.target, "a");
                },
            },
            beforeunload: {
                postDispatch: function (e) {
                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result);
                },
            },
        },
        simulate: function (e, t, n, i) {
            e = S.extend(new S.Event(), n, { type: e, isSimulated: !0, originalEvent: {} });
            i ? S.event.trigger(e, null, t) : S.event.dispatch.call(t, e), e.isDefaultPrevented() && n.preventDefault();
        },
    }),
        (S.removeEvent = function (e, t, n) {
            e.removeEventListener && e.removeEventListener(t, n, !1);
        }),
        (S.Event = function (e, t) {
            return this instanceof S.Event
                ? (e && e.type ? ((this.originalEvent = e), (this.type = e.type), (this.isDefaultPrevented = e.defaultPrevented || (void 0 === e.defaultPrevented && !1 === e.returnValue) ? p : h)) : (this.type = e),
                  t && S.extend(this, t),
                  (this.timeStamp = (e && e.timeStamp) || S.now()),
                  void (this[S.expando] = !0))
                : new S.Event(e, t);
        }),
        (S.Event.prototype = {
            isDefaultPrevented: h,
            isPropagationStopped: h,
            isImmediatePropagationStopped: h,
            preventDefault: function () {
                var e = this.originalEvent;
                (this.isDefaultPrevented = p), e && e.preventDefault && e.preventDefault();
            },
            stopPropagation: function () {
                var e = this.originalEvent;
                (this.isPropagationStopped = p), e && e.stopPropagation && e.stopPropagation();
            },
            stopImmediatePropagation: function () {
                var e = this.originalEvent;
                (this.isImmediatePropagationStopped = p), e && e.stopImmediatePropagation && e.stopImmediatePropagation(), this.stopPropagation();
            },
        }),
        S.each({ mouseenter: "mouseover", mouseleave: "mouseout", pointerenter: "pointerover", pointerleave: "pointerout" }, function (e, o) {
            S.event.special[e] = {
                delegateType: o,
                bindType: o,
                handle: function (e) {
                    var t,
                        n = e.relatedTarget,
                        i = e.handleObj;
                    return (n && (n === this || S.contains(this, n))) || ((e.type = i.origType), (t = i.handler.apply(this, arguments)), (e.type = o)), t;
                },
            };
        }),
        m.focusinBubbles ||
            S.each({ focus: "focusin", blur: "focusout" }, function (n, i) {
                function o(e) {
                    S.event.simulate(i, e.target, S.event.fix(e), !0);
                }
                S.event.special[i] = {
                    setup: function () {
                        var e = this.ownerDocument || this,
                            t = v.access(e, i);
                        t || e.addEventListener(n, o, !0), v.access(e, i, (t || 0) + 1);
                    },
                    teardown: function () {
                        var e = this.ownerDocument || this,
                            t = v.access(e, i) - 1;
                        t ? v.access(e, i, t) : (e.removeEventListener(n, o, !0), v.remove(e, i));
                    },
                };
            }),
        S.fn.extend({
            on: function (e, t, n, i, o) {
                var a, s;
                if ("object" == typeof e) {
                    for (s in ("string" != typeof t && ((n = n || t), (t = void 0)), e)) this.on(s, t, n, e[s], o);
                    return this;
                }
                if ((null == n && null == i ? ((i = t), (n = t = void 0)) : null == i && ("string" == typeof t ? ((i = n), (n = void 0)) : ((i = n), (n = t), (t = void 0))), !1 === i)) i = h;
                else if (!i) return this;
                return (
                    1 === o &&
                        ((a = i),
                        ((i = function (e) {
                            return S().off(e), a.apply(this, arguments);
                        }).guid = a.guid || (a.guid = S.guid++))),
                    this.each(function () {
                        S.event.add(this, e, i, n, t);
                    })
                );
            },
            one: function (e, t, n, i) {
                return this.on(e, t, n, i, 1);
            },
            off: function (e, t, n) {
                var i, o;
                if (e && e.preventDefault && e.handleObj) (i = e.handleObj), S(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler);
                else {
                    if ("object" != typeof e)
                        return (
                            (!1 !== t && "function" != typeof t) || ((n = t), (t = void 0)),
                            !1 === n && (n = h),
                            this.each(function () {
                                S.event.remove(this, e, n, t);
                            })
                        );
                    for (o in e) this.off(o, t, e[o]);
                }
                return this;
            },
            trigger: function (e, t) {
                return this.each(function () {
                    S.event.trigger(e, t, this);
                });
            },
            triggerHandler: function (e, t) {
                var n = this[0];
                return n ? S.event.trigger(e, t, n, !0) : void 0;
            },
        });
    var de = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        ue = /<([\w:]+)/,
        pe = /<|&#?\w+;/,
        he = /<(?:script|style|link)/i,
        fe = /checked\s*(?:[^=]|=\s*.checked.)/i,
        me = /^$|\/(?:java|ecma)script/i,
        ge = /^true\/(.*)/,
        ve = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        w = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""],
        };
    function be(e, t) {
        return S.nodeName(e, "table") && S.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e;
    }
    function ye(e) {
        return (e.type = (null !== e.getAttribute("type")) + "/" + e.type), e;
    }
    function we(e) {
        var t = ge.exec(e.type);
        return t ? (e.type = t[1]) : e.removeAttribute("type"), e;
    }
    function Se(e, t) {
        for (var n = 0, i = e.length; n < i; n++) v.set(e[n], "globalEval", !t || v.get(t[n], "globalEval"));
    }
    function ke(e, t) {
        var n, i, o, a, s, r;
        if (1 === t.nodeType) {
            if (v.hasData(e) && ((a = v.access(e)), (s = v.set(t, a)), (r = a.events))) for (o in (delete s.handle, (s.events = {}), r)) for (n = 0, i = r[o].length; n < i; n++) S.event.add(t, o, r[o][n]);
            c.hasData(e) && ((a = c.access(e)), (s = S.extend({}, a)), c.set(t, s));
        }
    }
    function T(e, t) {
        var n = e.getElementsByTagName ? e.getElementsByTagName(t || "*") : e.querySelectorAll ? e.querySelectorAll(t || "*") : [];
        return void 0 === t || (t && S.nodeName(e, t)) ? S.merge([e], n) : n;
    }
    (w.optgroup = w.option),
        (w.tbody = w.tfoot = w.colgroup = w.caption = w.thead),
        (w.th = w.td),
        S.extend({
            clone: function (e, t, n) {
                var i,
                    o,
                    a,
                    s,
                    r,
                    l,
                    c,
                    d = e.cloneNode(!0),
                    u = S.contains(e.ownerDocument, e);
                if (!(m.noCloneChecked || (1 !== e.nodeType && 11 !== e.nodeType) || S.isXMLDoc(e)))
                    for (s = T(d), i = 0, o = (a = T(e)).length; i < o; i++)
                        (r = a[i]), (l = s[i]), (c = void 0), "input" === (c = l.nodeName.toLowerCase()) && oe.test(r.type) ? (l.checked = r.checked) : ("input" !== c && "textarea" !== c) || (l.defaultValue = r.defaultValue);
                if (t)
                    if (n) for (a = a || T(e), s = s || T(d), i = 0, o = a.length; i < o; i++) ke(a[i], s[i]);
                    else ke(e, d);
                return 0 < (s = T(d, "script")).length && Se(s, !u && T(e, "script")), d;
            },
            buildFragment: function (e, t, n, i) {
                for (var o, a, s, r, l, c = t.createDocumentFragment(), d = [], u = 0, p = e.length; u < p; u++)
                    if ((o = e[u]) || 0 === o)
                        if ("object" === S.type(o)) S.merge(d, o.nodeType ? [o] : o);
                        else if (pe.test(o)) {
                            for (a = a || c.appendChild(t.createElement("div")), s = (ue.exec(o) || ["", ""])[1].toLowerCase(), a.innerHTML = (s = w[s] || w._default)[1] + o.replace(de, "<$1></$2>") + s[2], l = s[0]; l--; ) a = a.lastChild;
                            S.merge(d, a.childNodes), ((a = c.firstChild).textContent = "");
                        } else d.push(t.createTextNode(o));
                for (c.textContent = "", u = 0; (o = d[u++]); )
                    if ((!i || -1 === S.inArray(o, i)) && ((r = S.contains(o.ownerDocument, o)), (a = T(c.appendChild(o), "script")), r && Se(a), n)) for (l = 0; (o = a[l++]); ) me.test(o.type || "") && n.push(o);
                return c;
            },
            cleanData: function (e) {
                for (var t, n, i, o, a = S.event.special, s = 0; void 0 !== (n = e[s]); s++) {
                    if (S.acceptData(n) && (o = n[v.expando]) && (t = v.cache[o])) {
                        if (t.events) for (i in t.events) a[i] ? S.event.remove(n, i) : S.removeEvent(n, i, t.handle);
                        v.cache[o] && delete v.cache[o];
                    }
                    delete c.cache[n[c.expando]];
                }
            },
        }),
        S.fn.extend({
            text: function (e) {
                return r(
                    this,
                    function (e) {
                        return void 0 === e
                            ? S.text(this)
                            : this.empty().each(function () {
                                  (1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType) || (this.textContent = e);
                              });
                    },
                    null,
                    e,
                    arguments.length
                );
            },
            append: function () {
                return this.domManip(arguments, function (e) {
                    (1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType) || be(this, e).appendChild(e);
                });
            },
            prepend: function () {
                return this.domManip(arguments, function (e) {
                    var t;
                    (1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType) || (t = be(this, e)).insertBefore(e, t.firstChild);
                });
            },
            before: function () {
                return this.domManip(arguments, function (e) {
                    this.parentNode && this.parentNode.insertBefore(e, this);
                });
            },
            after: function () {
                return this.domManip(arguments, function (e) {
                    this.parentNode && this.parentNode.insertBefore(e, this.nextSibling);
                });
            },
            remove: function (e, t) {
                for (var n, i = e ? S.filter(e, this) : this, o = 0; null != (n = i[o]); o++)
                    t || 1 !== n.nodeType || S.cleanData(T(n)), n.parentNode && (t && S.contains(n.ownerDocument, n) && Se(T(n, "script")), n.parentNode.removeChild(n));
                return this;
            },
            empty: function () {
                for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (S.cleanData(T(e, !1)), (e.textContent = ""));
                return this;
            },
            clone: function (e, t) {
                return (
                    (e = null != e && e),
                    (t = null == t ? e : t),
                    this.map(function () {
                        return S.clone(this, e, t);
                    })
                );
            },
            html: function (e) {
                return r(
                    this,
                    function (e) {
                        var t = this[0] || {},
                            n = 0,
                            i = this.length;
                        if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                        if ("string" == typeof e && !he.test(e) && !w[(ue.exec(e) || ["", ""])[1].toLowerCase()]) {
                            e = e.replace(de, "<$1></$2>");
                            try {
                                for (; n < i; n++) 1 === (t = this[n] || {}).nodeType && (S.cleanData(T(t, !1)), (t.innerHTML = e));
                                t = 0;
                            } catch (e) {}
                        }
                        t && this.empty().append(e);
                    },
                    null,
                    e,
                    arguments.length
                );
            },
            replaceWith: function () {
                var t = arguments[0];
                return (
                    this.domManip(arguments, function (e) {
                        (t = this.parentNode), S.cleanData(T(this)), t && t.replaceChild(e, this);
                    }),
                    t && (t.length || t.nodeType) ? this : this.remove()
                );
            },
            detach: function (e) {
                return this.remove(e, !0);
            },
            domManip: function (n, i) {
                n = R.apply([], n);
                var e,
                    t,
                    o,
                    a,
                    s,
                    r,
                    l = 0,
                    c = this.length,
                    d = this,
                    u = c - 1,
                    p = n[0],
                    h = S.isFunction(p);
                if (h || (1 < c && "string" == typeof p && !m.checkClone && fe.test(p)))
                    return this.each(function (e) {
                        var t = d.eq(e);
                        h && (n[0] = p.call(this, e, t.html())), t.domManip(n, i);
                    });
                if (c && ((t = (e = S.buildFragment(n, this[0].ownerDocument, !1, this)).firstChild), 1 === e.childNodes.length && (e = t), t)) {
                    for (a = (o = S.map(T(e, "script"), ye)).length; l < c; l++) (s = e), l !== u && ((s = S.clone(s, !0, !0)), a) && S.merge(o, T(s, "script")), i.call(this[l], s, l);
                    if (a)
                        for (r = o[o.length - 1].ownerDocument, S.map(o, we), l = 0; l < a; l++)
                            (s = o[l]), me.test(s.type || "") && !v.access(s, "globalEval") && S.contains(r, s) && (s.src ? S._evalUrl && S._evalUrl(s.src) : S.globalEval(s.textContent.replace(ve, "")));
                }
                return this;
            },
        }),
        S.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function (e, s) {
            S.fn[e] = function (e) {
                for (var t, n = [], i = S(e), o = i.length - 1, a = 0; a <= o; a++) (t = a === o ? this : this.clone(!0)), S(i[a])[s](t), W.apply(n, t.get());
                return this.pushStack(n);
            };
        });
    var Te,
        xe = {};
    function _e(e, t) {
        (e = S(t.createElement(e)).appendTo(t.body)), (t = f.getDefaultComputedStyle && (t = f.getDefaultComputedStyle(e[0])) ? t.display : S.css(e[0], "display"));
        return e.detach(), t;
    }
    function Ce(e) {
        var t = g,
            n = xe[e];
        return (
            n || (("none" !== (n = _e(e, t)) && n) || ((t = (Te = (Te || S("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement))[0].contentDocument).write(), t.close(), (n = _e(e, t)), Te.detach()), (xe[e] = n)), n
        );
    }
    function De(e) {
        return e.ownerDocument.defaultView.getComputedStyle(e, null);
    }
    var Oe,
        Ie,
        x,
        _,
        C,
        Ee = /^margin/,
        Me = new RegExp("^(" + t + ")(?!px)[a-z%]+$", "i");
    function D(e, t, n) {
        var i,
            o,
            a = e.style;
        return (
            (n = n || De(e)) && (o = n.getPropertyValue(t) || n[t]),
            n &&
                ("" !== o || S.contains(e.ownerDocument, e) || (o = S.style(e, t)), Me.test(o)) &&
                Ee.test(t) &&
                ((e = a.width), (t = a.minWidth), (i = a.maxWidth), (a.minWidth = a.maxWidth = a.width = o), (o = n.width), (a.width = e), (a.minWidth = t), (a.maxWidth = i)),
            void 0 !== o ? o + "" : o
        );
    }
    function Ae(e, t) {
        return {
            get: function () {
                return e() ? void delete this.get : (this.get = t).apply(this, arguments);
            },
        };
    }
    function Ne() {
        (C.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute"), (C.innerHTML = ""), x.appendChild(_);
        var e = f.getComputedStyle(C, null);
        (Oe = "1%" !== e.top), (Ie = "4px" === e.width), x.removeChild(_);
    }
    (x = g.documentElement),
        (_ = g.createElement("div")),
        (C = g.createElement("div")).style &&
            ((C.style.backgroundClip = "content-box"),
            (C.cloneNode(!0).style.backgroundClip = ""),
            (m.clearCloneStyle = "content-box" === C.style.backgroundClip),
            (_.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute"),
            _.appendChild(C),
            f.getComputedStyle) &&
            S.extend(m, {
                pixelPosition: function () {
                    return Ne(), Oe;
                },
                boxSizingReliable: function () {
                    return null == Ie && Ne(), Ie;
                },
                reliableMarginRight: function () {
                    var e = C.appendChild(g.createElement("div"));
                    return (
                        (e.style.cssText = C.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0"),
                        (e.style.marginRight = e.style.width = "0"),
                        (C.style.width = "1px"),
                        x.appendChild(_),
                        (e = !parseFloat(f.getComputedStyle(e, null).marginRight)),
                        x.removeChild(_),
                        e
                    );
                },
            }),
        (S.swap = function (e, t, n, i) {
            var o,
                a = {};
            for (o in t) (a[o] = e.style[o]), (e.style[o] = t[o]);
            for (o in ((n = n.apply(e, i || [])), t)) e.style[o] = a[o];
            return n;
        });
    var Le = /^(none|table(?!-c[ea]).+)/,
        je = new RegExp("^(" + t + ")(.*)$", "i"),
        Pe = new RegExp("^([+-])=(" + t + ")", "i"),
        $e = { position: "absolute", visibility: "hidden", display: "block" },
        Re = { letterSpacing: "0", fontWeight: "400" },
        We = ["Webkit", "O", "Moz", "ms"];
    function Be(e, t) {
        if (t in e) return t;
        for (var n = t[0].toUpperCase() + t.slice(1), i = t, o = We.length; o--; ) if ((t = We[o] + n) in e) return t;
        return i;
    }
    function He(e, t, n) {
        var i = je.exec(t);
        return i ? Math.max(0, i[1] - (n || 0)) + (i[2] || "px") : t;
    }
    function Ue(e, t, n, i, o) {
        for (var a = n === (i ? "border" : "content") ? 4 : "width" === t ? 1 : 0, s = 0; a < 4; a += 2)
            "margin" === n && (s += S.css(e, n + u[a], !0, o)),
                i
                    ? ("content" === n && (s -= S.css(e, "padding" + u[a], !0, o)), "margin" !== n && (s -= S.css(e, "border" + u[a] + "Width", !0, o)))
                    : ((s += S.css(e, "padding" + u[a], !0, o)), "padding" !== n && (s += S.css(e, "border" + u[a] + "Width", !0, o)));
        return s;
    }
    function Ve(e, t, n) {
        var i = !0,
            o = "width" === t ? e.offsetWidth : e.offsetHeight,
            a = De(e),
            s = "border-box" === S.css(e, "boxSizing", !1, a);
        if (o <= 0 || null == o) {
            if ((((o = D(e, t, a)) < 0 || null == o) && (o = e.style[t]), Me.test(o))) return o;
            (i = s && (m.boxSizingReliable() || o === e.style[t])), (o = parseFloat(o) || 0);
        }
        return o + Ue(e, t, n || (s ? "border" : "content"), i, a) + "px";
    }
    function qe(e, t) {
        for (var n, i, o, a = [], s = 0, r = e.length; s < r; s++)
            (i = e[s]).style &&
                ((a[s] = v.get(i, "olddisplay")),
                (n = i.style.display),
                t
                    ? (a[s] || "none" !== n || (i.style.display = ""), "" === i.style.display && b(i) && (a[s] = v.access(i, "olddisplay", Ce(i.nodeName))))
                    : ((o = b(i)), ("none" === n && o) || v.set(i, "olddisplay", o ? n : S.css(i, "display"))));
        for (s = 0; s < r; s++) !(i = e[s]).style || (t && "none" !== i.style.display && "" !== i.style.display) || (i.style.display = t ? a[s] || "" : "none");
        return e;
    }
    function O(e, t, n, i, o) {
        return new O.prototype.init(e, t, n, i, o);
    }
    S.extend({
        cssHooks: {
            opacity: {
                get: function (e, t) {
                    if (t) return "" === (t = D(e, "opacity")) ? "1" : t;
                },
            },
        },
        cssNumber: { columnCount: !0, fillOpacity: !0, flexGrow: !0, flexShrink: !0, fontWeight: !0, lineHeight: !0, opacity: !0, order: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0 },
        cssProps: { float: "cssFloat" },
        style: function (e, t, n, i) {
            var o, a, s, r, l;
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style)
                return (
                    (r = S.camelCase(t)),
                    (l = e.style),
                    (t = S.cssProps[r] || (S.cssProps[r] = Be(l, r))),
                    (s = S.cssHooks[t] || S.cssHooks[r]),
                    void 0 === n
                        ? s && "get" in s && void 0 !== (o = s.get(e, !1, i))
                            ? o
                            : l[t]
                        : ("string" === (a = typeof n) && (o = Pe.exec(n)) && ((n = (o[1] + 1) * o[2] + parseFloat(S.css(e, t))), (a = "number")),
                          void (
                              null != n &&
                              n == n &&
                              ("number" !== a || S.cssNumber[r] || (n += "px"), m.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"), (s && "set" in s && void 0 === (n = s.set(e, n, i))) || (l[t] = n))
                          ))
                );
        },
        css: function (e, t, n, i) {
            var o,
                a = S.camelCase(t);
            return (
                (t = S.cssProps[a] || (S.cssProps[a] = Be(e.style, a))),
                "normal" === (o = void 0 === (o = (a = S.cssHooks[t] || S.cssHooks[a]) && "get" in a ? a.get(e, !0, n) : o) ? D(e, t, i) : o) && t in Re && (o = Re[t]),
                ("" === n || n) && ((a = parseFloat(o)), !0 === n || S.isNumeric(a)) ? a || 0 : o
            );
        },
    }),
        S.each(["height", "width"], function (e, o) {
            S.cssHooks[o] = {
                get: function (e, t, n) {
                    return t
                        ? Le.test(S.css(e, "display")) && 0 === e.offsetWidth
                            ? S.swap(e, $e, function () {
                                  return Ve(e, o, n);
                              })
                            : Ve(e, o, n)
                        : void 0;
                },
                set: function (e, t, n) {
                    var i = n && De(e);
                    return He(0, t, n ? Ue(e, o, n, "border-box" === S.css(e, "boxSizing", !1, i), i) : 0);
                },
            };
        }),
        (S.cssHooks.marginRight = Ae(m.reliableMarginRight, function (e, t) {
            return t ? S.swap(e, { display: "inline-block" }, D, [e, "marginRight"]) : void 0;
        })),
        S.each({ margin: "", padding: "", border: "Width" }, function (o, a) {
            (S.cssHooks[o + a] = {
                expand: function (e) {
                    for (var t = 0, n = {}, i = "string" == typeof e ? e.split(" ") : [e]; t < 4; t++) n[o + u[t] + a] = i[t] || i[t - 2] || i[0];
                    return n;
                },
            }),
                Ee.test(o) || (S.cssHooks[o + a].set = He);
        }),
        S.fn.extend({
            css: function (e, t) {
                return r(
                    this,
                    function (e, t, n) {
                        var i,
                            o,
                            a = {},
                            s = 0;
                        if (S.isArray(t)) {
                            for (i = De(e), o = t.length; s < o; s++) a[t[s]] = S.css(e, t[s], !1, i);
                            return a;
                        }
                        return void 0 !== n ? S.style(e, t, n) : S.css(e, t);
                    },
                    e,
                    t,
                    1 < arguments.length
                );
            },
            show: function () {
                return qe(this, !0);
            },
            hide: function () {
                return qe(this);
            },
            toggle: function (e) {
                return "boolean" == typeof e
                    ? e
                        ? this.show()
                        : this.hide()
                    : this.each(function () {
                          b(this) ? S(this).show() : S(this).hide();
                      });
            },
        }),
        (((S.Tween = O).prototype = {
            constructor: O,
            init: function (e, t, n, i, o, a) {
                (this.elem = e), (this.prop = n), (this.easing = o || "swing"), (this.options = t), (this.start = this.now = this.cur()), (this.end = i), (this.unit = a || (S.cssNumber[n] ? "" : "px"));
            },
            cur: function () {
                var e = O.propHooks[this.prop];
                return (e && e.get ? e : O.propHooks._default).get(this);
            },
            run: function (e) {
                var t = O.propHooks[this.prop];
                return (
                    (this.pos = e = this.options.duration ? S.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e),
                    (this.now = (this.end - this.start) * e + this.start),
                    this.options.step && this.options.step.call(this.elem, this.now, this),
                    (t && t.set ? t : O.propHooks._default).set(this),
                    this
                );
            },
        }).init.prototype = O.prototype),
        ((O.propHooks = {
            _default: {
                get: function (e) {
                    var t;
                    return null == e.elem[e.prop] || (e.elem.style && null != e.elem.style[e.prop]) ? ((t = S.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0) : e.elem[e.prop];
                },
                set: function (e) {
                    S.fx.step[e.prop] ? S.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[S.cssProps[e.prop]] || S.cssHooks[e.prop]) ? S.style(e.elem, e.prop, e.now + e.unit) : (e.elem[e.prop] = e.now);
                },
            },
        }).scrollTop = O.propHooks.scrollLeft = {
            set: function (e) {
                e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
            },
        }),
        (S.easing = {
            linear: function (e) {
                return e;
            },
            swing: function (e) {
                return 0.5 - Math.cos(e * Math.PI) / 2;
            },
        }),
        (S.fx = O.prototype.init),
        (S.fx.step = {});
    var I,
        Fe,
        E,
        ze = /^(?:toggle|show|hide)$/,
        Ge = new RegExp("^(?:([+-])=|)(" + t + ")([a-z%]*)$", "i"),
        Ye = /queueHooks$/,
        Je = [
            function (t, e, n) {
                var i,
                    o,
                    a,
                    s,
                    r,
                    l,
                    c,
                    d = this,
                    u = {},
                    p = t.style,
                    h = t.nodeType && b(t),
                    f = v.get(t, "fxshow");
                for (i in (n.queue ||
                    (null == (r = S._queueHooks(t, "fx")).unqueued &&
                        ((r.unqueued = 0),
                        (l = r.empty.fire),
                        (r.empty.fire = function () {
                            r.unqueued || l();
                        })),
                    r.unqueued++,
                    d.always(function () {
                        d.always(function () {
                            r.unqueued--, S.queue(t, "fx").length || r.empty.fire();
                        });
                    })),
                1 === t.nodeType &&
                    ("height" in e || "width" in e) &&
                    ((n.overflow = [p.overflow, p.overflowX, p.overflowY]), (c = S.css(t, "display")), "inline" === ("none" === c ? v.get(t, "olddisplay") || Ce(t.nodeName) : c)) &&
                    "none" === S.css(t, "float") &&
                    (p.display = "inline-block"),
                n.overflow &&
                    ((p.overflow = "hidden"),
                    d.always(function () {
                        (p.overflow = n.overflow[0]), (p.overflowX = n.overflow[1]), (p.overflowY = n.overflow[2]);
                    })),
                e))
                    if (((o = e[i]), ze.exec(o))) {
                        if ((delete e[i], (a = a || "toggle" === o), o === (h ? "hide" : "show"))) {
                            if ("show" !== o || !f || void 0 === f[i]) continue;
                            h = !0;
                        }
                        u[i] = (f && f[i]) || S.style(t, i);
                    } else c = void 0;
                if (S.isEmptyObject(u)) "inline" === ("none" === c ? Ce(t.nodeName) : c) && (p.display = c);
                else
                    for (i in (f ? "hidden" in f && (h = f.hidden) : (f = v.access(t, "fxshow", {})),
                    a && (f.hidden = !h),
                    h
                        ? S(t).show()
                        : d.done(function () {
                              S(t).hide();
                          }),
                    d.done(function () {
                        for (var e in (v.remove(t, "fxshow"), u)) S.style(t, e, u[e]);
                    }),
                    u))
                        (s = Qe(h ? f[i] : 0, i, d)), i in f || ((f[i] = s.start), h && ((s.end = s.start), (s.start = "width" === i || "height" === i ? 1 : 0)));
            },
        ],
        M = {
            "*": [
                function (e, t) {
                    var n = this.createTween(e, t),
                        i = n.cur(),
                        t = Ge.exec(t),
                        o = (t && t[3]) || (S.cssNumber[e] ? "" : "px"),
                        a = (S.cssNumber[e] || ("px" !== o && +i)) && Ge.exec(S.css(n.elem, e)),
                        s = 1,
                        r = 20;
                    if (a && a[3] !== o) for (o = o || a[3], t = t || [], a = +i || 1; S.style(n.elem, e, (a /= s = s || ".5") + o), s !== (s = n.cur() / i) && 1 !== s && --r; );
                    return t && ((a = n.start = +a || +i || 0), (n.unit = o), (n.end = t[1] ? a + (t[1] + 1) * t[2] : +t[2])), n;
                },
            ],
        };
    function Xe() {
        return (
            setTimeout(function () {
                I = void 0;
            }),
            (I = S.now())
        );
    }
    function Ke(e, t) {
        var n,
            i = 0,
            o = { height: e };
        for (t = t ? 1 : 0; i < 4; i += 2 - t) o["margin" + (n = u[i])] = o["padding" + n] = e;
        return t && (o.opacity = o.width = e), o;
    }
    function Qe(e, t, n) {
        for (var i, o = (M[t] || []).concat(M["*"]), a = 0, s = o.length; a < s; a++) if ((i = o[a].call(n, t, e))) return i;
    }
    function Ze(o, e, t) {
        var n,
            a,
            i,
            s,
            r,
            l,
            c,
            d = 0,
            u = Je.length,
            p = S.Deferred().always(function () {
                delete h.elem;
            }),
            h = function () {
                if (a) return !1;
                for (var e = I || Xe(), e = Math.max(0, f.startTime + f.duration - e), t = 1 - (e / f.duration || 0), n = 0, i = f.tweens.length; n < i; n++) f.tweens[n].run(t);
                return p.notifyWith(o, [f, t, e]), t < 1 && i ? e : (p.resolveWith(o, [f]), !1);
            },
            f = p.promise({
                elem: o,
                props: S.extend({}, e),
                opts: S.extend(!0, { specialEasing: {} }, t),
                originalProperties: e,
                originalOptions: t,
                startTime: I || Xe(),
                duration: t.duration,
                tweens: [],
                createTween: function (e, t) {
                    t = S.Tween(o, f.opts, e, t, f.opts.specialEasing[e] || f.opts.easing);
                    return f.tweens.push(t), t;
                },
                stop: function (e) {
                    var t = 0,
                        n = e ? f.tweens.length : 0;
                    if (!a) {
                        for (a = !0; t < n; t++) f.tweens[t].run(1);
                        e ? p.resolveWith(o, [f, e]) : p.rejectWith(o, [f, e]);
                    }
                    return this;
                },
            }),
            m = f.props,
            g = m,
            v = f.opts.specialEasing;
        for (i in g)
            if (((s = S.camelCase(i)), (r = v[s]), (l = g[i]), S.isArray(l) && ((r = l[1]), (l = g[i] = l[0])), i !== s && ((g[s] = l), delete g[i]), (c = S.cssHooks[s]), c && "expand" in c))
                for (i in ((l = c.expand(l)), delete g[s], l)) i in g || ((g[i] = l[i]), (v[i] = r));
            else v[s] = r;
        for (; d < u; d++) if ((n = Je[d].call(f, o, m, f.opts))) return n;
        return (
            S.map(m, Qe, f),
            S.isFunction(f.opts.start) && f.opts.start.call(o, f),
            S.fx.timer(S.extend(h, { elem: o, anim: f, queue: f.opts.queue })),
            f.progress(f.opts.progress).done(f.opts.done, f.opts.complete).fail(f.opts.fail).always(f.opts.always)
        );
    }
    (S.Animation = S.extend(Ze, {
        tweener: function (e, t) {
            for (var n, i = 0, o = (e = S.isFunction(e) ? ((t = e), ["*"]) : e.split(" ")).length; i < o; i++) (n = e[i]), (M[n] = M[n] || []), M[n].unshift(t);
        },
        prefilter: function (e, t) {
            t ? Je.unshift(e) : Je.push(e);
        },
    })),
        (S.speed = function (e, t, n) {
            var i = e && "object" == typeof e ? S.extend({}, e) : { complete: n || (!n && t) || (S.isFunction(e) && e), duration: e, easing: (n && t) || (t && !S.isFunction(t) && t) };
            return (
                (i.duration = S.fx.off ? 0 : "number" == typeof i.duration ? i.duration : i.duration in S.fx.speeds ? S.fx.speeds[i.duration] : S.fx.speeds._default),
                (null != i.queue && !0 !== i.queue) || (i.queue = "fx"),
                (i.old = i.complete),
                (i.complete = function () {
                    S.isFunction(i.old) && i.old.call(this), i.queue && S.dequeue(this, i.queue);
                }),
                i
            );
        }),
        S.fn.extend({
            fadeTo: function (e, t, n, i) {
                return this.filter(b).css("opacity", 0).show().end().animate({ opacity: t }, e, n, i);
            },
            animate: function (t, e, n, i) {
                function o() {
                    var e = Ze(this, S.extend({}, t), s);
                    (a || v.get(this, "finish")) && e.stop(!0);
                }
                var a = S.isEmptyObject(t),
                    s = S.speed(e, n, i);
                return (o.finish = o), a || !1 === s.queue ? this.each(o) : this.queue(s.queue, o);
            },
            stop: function (o, e, a) {
                function s(e) {
                    var t = e.stop;
                    delete e.stop, t(a);
                }
                return (
                    "string" != typeof o && ((a = e), (e = o), (o = void 0)),
                    e && !1 !== o && this.queue(o || "fx", []),
                    this.each(function () {
                        var e = !0,
                            t = null != o && o + "queueHooks",
                            n = S.timers,
                            i = v.get(this);
                        if (t) i[t] && i[t].stop && s(i[t]);
                        else for (t in i) i[t] && i[t].stop && Ye.test(t) && s(i[t]);
                        for (t = n.length; t--; ) n[t].elem !== this || (null != o && n[t].queue !== o) || (n[t].anim.stop(a), (e = !1), n.splice(t, 1));
                        (!e && a) || S.dequeue(this, o);
                    })
                );
            },
            finish: function (s) {
                return (
                    !1 !== s && (s = s || "fx"),
                    this.each(function () {
                        var e,
                            t = v.get(this),
                            n = t[s + "queue"],
                            i = t[s + "queueHooks"],
                            o = S.timers,
                            a = n ? n.length : 0;
                        for (t.finish = !0, S.queue(this, s, []), i && i.stop && i.stop.call(this, !0), e = o.length; e--; ) o[e].elem === this && o[e].queue === s && (o[e].anim.stop(!0), o.splice(e, 1));
                        for (e = 0; e < a; e++) n[e] && n[e].finish && n[e].finish.call(this);
                        delete t.finish;
                    })
                );
            },
        }),
        S.each(["toggle", "show", "hide"], function (e, i) {
            var o = S.fn[i];
            S.fn[i] = function (e, t, n) {
                return null == e || "boolean" == typeof e ? o.apply(this, arguments) : this.animate(Ke(i, !0), e, t, n);
            };
        }),
        S.each({ slideDown: Ke("show"), slideUp: Ke("hide"), slideToggle: Ke("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle" } }, function (e, i) {
            S.fn[e] = function (e, t, n) {
                return this.animate(i, e, t, n);
            };
        }),
        (S.timers = []),
        (S.fx.tick = function () {
            var e,
                t = 0,
                n = S.timers;
            for (I = S.now(); t < n.length; t++) (e = n[t])() || n[t] !== e || n.splice(t--, 1);
            n.length || S.fx.stop(), (I = void 0);
        }),
        (S.fx.timer = function (e) {
            S.timers.push(e), e() ? S.fx.start() : S.timers.pop();
        }),
        (S.fx.interval = 13),
        (S.fx.start = function () {
            Fe = Fe || setInterval(S.fx.tick, S.fx.interval);
        }),
        (S.fx.stop = function () {
            clearInterval(Fe), (Fe = null);
        }),
        (S.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
        (S.fn.delay = function (i, e) {
            return (
                (i = (S.fx && S.fx.speeds[i]) || i),
                this.queue((e = e || "fx"), function (e, t) {
                    var n = setTimeout(e, i);
                    t.stop = function () {
                        clearTimeout(n);
                    };
                })
            );
        }),
        (E = g.createElement("input")),
        (e = g.createElement("select")),
        (t = e.appendChild(g.createElement("option"))),
        (E.type = "checkbox"),
        (m.checkOn = "" !== E.value),
        (m.optSelected = t.selected),
        (e.disabled = !0),
        (m.optDisabled = !t.disabled),
        ((E = g.createElement("input")).value = "t"),
        (E.type = "radio"),
        (m.radioValue = "t" === E.value);
    var et,
        A = S.expr.attrHandle,
        tt =
            (S.fn.extend({
                attr: function (e, t) {
                    return r(this, S.attr, e, t, 1 < arguments.length);
                },
                removeAttr: function (e) {
                    return this.each(function () {
                        S.removeAttr(this, e);
                    });
                },
            }),
            S.extend({
                attr: function (e, t, n) {
                    var i,
                        o,
                        a = e.nodeType;
                    if (e && 3 !== a && 8 !== a && 2 !== a)
                        return typeof e.getAttribute == y
                            ? S.prop(e, t, n)
                            : ((1 === a && S.isXMLDoc(e)) || ((t = t.toLowerCase()), (i = S.attrHooks[t] || (S.expr.match.bool.test(t) ? et : void 0))),
                              void 0 === n
                                  ? !(i && "get" in i && null !== (o = i.get(e, t))) && null == (o = S.find.attr(e, t))
                                      ? void 0
                                      : o
                                  : null !== n
                                  ? i && "set" in i && void 0 !== (o = i.set(e, n, t))
                                      ? o
                                      : (e.setAttribute(t, n + ""), n)
                                  : void S.removeAttr(e, t));
                },
                removeAttr: function (e, t) {
                    var n,
                        i,
                        o = 0,
                        a = t && t.match(k);
                    if (a && 1 === e.nodeType) for (; (n = a[o++]); ) (i = S.propFix[n] || n), S.expr.match.bool.test(n) && (e[i] = !1), e.removeAttribute(n);
                },
                attrHooks: {
                    type: {
                        set: function (e, t) {
                            var n;
                            if (!m.radioValue && "radio" === t && S.nodeName(e, "input")) return (n = e.value), e.setAttribute("type", t), n && (e.value = n), t;
                        },
                    },
                },
            }),
            (et = {
                set: function (e, t, n) {
                    return !1 === t ? S.removeAttr(e, n) : e.setAttribute(n, n), n;
                },
            }),
            S.each(S.expr.match.bool.source.match(/\w+/g), function (e, t) {
                var a = A[t] || S.find.attr;
                A[t] = function (e, t, n) {
                    var i, o;
                    return n || ((o = A[t]), (A[t] = i), (i = null != a(e, t, n) ? t.toLowerCase() : null), (A[t] = o)), i;
                };
            }),
            /^(?:input|select|textarea|button)$/i),
        nt =
            (S.fn.extend({
                prop: function (e, t) {
                    return r(this, S.prop, e, t, 1 < arguments.length);
                },
                removeProp: function (e) {
                    return this.each(function () {
                        delete this[S.propFix[e] || e];
                    });
                },
            }),
            S.extend({
                propFix: { for: "htmlFor", class: "className" },
                prop: function (e, t, n) {
                    var i,
                        o,
                        a = e.nodeType;
                    if (e && 3 !== a && 8 !== a && 2 !== a)
                        return (
                            (1 !== a || !S.isXMLDoc(e)) && ((t = S.propFix[t] || t), (o = S.propHooks[t])),
                            void 0 !== n ? (o && "set" in o && void 0 !== (i = o.set(e, n, t)) ? i : (e[t] = n)) : o && "get" in o && null !== (i = o.get(e, t)) ? i : e[t]
                        );
                },
                propHooks: {
                    tabIndex: {
                        get: function (e) {
                            return e.hasAttribute("tabindex") || tt.test(e.nodeName) || e.href ? e.tabIndex : -1;
                        },
                    },
                },
            }),
            m.optSelected ||
                (S.propHooks.selected = {
                    get: function (e) {
                        e = e.parentNode;
                        return e && e.parentNode && e.parentNode.selectedIndex, null;
                    },
                }),
            S.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
                S.propFix[this.toLowerCase()] = this;
            }),
            /[\t\r\n\f]/g),
        it =
            (S.fn.extend({
                addClass: function (t) {
                    var e,
                        n,
                        i,
                        o,
                        a,
                        s,
                        r = "string" == typeof t && t,
                        l = 0,
                        c = this.length;
                    if (S.isFunction(t))
                        return this.each(function (e) {
                            S(this).addClass(t.call(this, e, this.className));
                        });
                    if (r)
                        for (e = (t || "").match(k) || []; l < c; l++)
                            if ((i = 1 === (n = this[l]).nodeType && (n.className ? (" " + n.className + " ").replace(nt, " ") : " "))) {
                                for (a = 0; (o = e[a++]); ) i.indexOf(" " + o + " ") < 0 && (i += o + " ");
                                (s = S.trim(i)), n.className !== s && (n.className = s);
                            }
                    return this;
                },
                removeClass: function (t) {
                    var e,
                        n,
                        i,
                        o,
                        a,
                        s,
                        r = 0 === arguments.length || ("string" == typeof t && t),
                        l = 0,
                        c = this.length;
                    if (S.isFunction(t))
                        return this.each(function (e) {
                            S(this).removeClass(t.call(this, e, this.className));
                        });
                    if (r)
                        for (e = (t || "").match(k) || []; l < c; l++)
                            if ((i = 1 === (n = this[l]).nodeType && (n.className ? (" " + n.className + " ").replace(nt, " ") : ""))) {
                                for (a = 0; (o = e[a++]); ) for (; 0 <= i.indexOf(" " + o + " "); ) i = i.replace(" " + o + " ", " ");
                                (s = t ? S.trim(i) : ""), n.className !== s && (n.className = s);
                            }
                    return this;
                },
                toggleClass: function (o, t) {
                    var a = typeof o;
                    return "boolean" == typeof t && "string" == a
                        ? t
                            ? this.addClass(o)
                            : this.removeClass(o)
                        : this.each(
                              S.isFunction(o)
                                  ? function (e) {
                                        S(this).toggleClass(o.call(this, e, this.className, t), t);
                                    }
                                  : function () {
                                        if ("string" == a) for (var e, t = 0, n = S(this), i = o.match(k) || []; (e = i[t++]); ) n.hasClass(e) ? n.removeClass(e) : n.addClass(e);
                                        else (a != y && "boolean" != a) || (this.className && v.set(this, "__className__", this.className), (this.className = (!this.className && !1 !== o && v.get(this, "__className__")) || ""));
                                    }
                          );
                },
                hasClass: function (e) {
                    for (var t = " " + e + " ", n = 0, i = this.length; n < i; n++) if (1 === this[n].nodeType && 0 <= (" " + this[n].className + " ").replace(nt, " ").indexOf(t)) return !0;
                    return !1;
                },
            }),
            /\r/g),
        ot =
            (S.fn.extend({
                val: function (t) {
                    var n,
                        e,
                        i,
                        o = this[0];
                    return arguments.length
                        ? ((i = S.isFunction(t)),
                          this.each(function (e) {
                              1 === this.nodeType &&
                                  (null == (e = i ? t.call(this, e, S(this).val()) : t)
                                      ? (e = "")
                                      : "number" == typeof e
                                      ? (e += "")
                                      : S.isArray(e) &&
                                        (e = S.map(e, function (e) {
                                            return null == e ? "" : e + "";
                                        })),
                                  ((n = S.valHooks[this.type] || S.valHooks[this.nodeName.toLowerCase()]) && "set" in n && void 0 !== n.set(this, e, "value")) || (this.value = e));
                          }))
                        : o
                        ? (n = S.valHooks[o.type] || S.valHooks[o.nodeName.toLowerCase()]) && "get" in n && void 0 !== (e = n.get(o, "value"))
                            ? e
                            : "string" == typeof (e = o.value)
                            ? e.replace(it, "")
                            : null == e
                            ? ""
                            : e
                        : void 0;
                },
            }),
            S.extend({
                valHooks: {
                    option: {
                        get: function (e) {
                            var t = S.find.attr(e, "value");
                            return null != t ? t : S.trim(S.text(e));
                        },
                    },
                    select: {
                        get: function (e) {
                            for (var t, n = e.options, i = e.selectedIndex, o = "select-one" === e.type || i < 0, a = o ? null : [], s = o ? i + 1 : n.length, r = i < 0 ? s : o ? i : 0; r < s; r++)
                                if (!((!(t = n[r]).selected && r !== i) || (m.optDisabled ? t.disabled : null !== t.getAttribute("disabled")) || (t.parentNode.disabled && S.nodeName(t.parentNode, "optgroup")))) {
                                    if (((t = S(t).val()), o)) return t;
                                    a.push(t);
                                }
                            return a;
                        },
                        set: function (e, t) {
                            for (var n, i, o = e.options, a = S.makeArray(t), s = o.length; s--; ) ((i = o[s]).selected = 0 <= S.inArray(i.value, a)) && (n = !0);
                            return n || (e.selectedIndex = -1), a;
                        },
                    },
                },
            }),
            S.each(["radio", "checkbox"], function () {
                (S.valHooks[this] = {
                    set: function (e, t) {
                        return S.isArray(t) ? (e.checked = 0 <= S.inArray(S(e).val(), t)) : void 0;
                    },
                }),
                    m.checkOn ||
                        (S.valHooks[this].get = function (e) {
                            return null === e.getAttribute("value") ? "on" : e.value;
                        });
            }),
            S.each(
                "blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),
                function (e, n) {
                    S.fn[n] = function (e, t) {
                        return 0 < arguments.length ? this.on(n, null, e, t) : this.trigger(n);
                    };
                }
            ),
            S.fn.extend({
                hover: function (e, t) {
                    return this.mouseenter(e).mouseleave(t || e);
                },
                bind: function (e, t, n) {
                    return this.on(e, null, t, n);
                },
                unbind: function (e, t) {
                    return this.off(e, null, t);
                },
                delegate: function (e, t, n, i) {
                    return this.on(t, e, n, i);
                },
                undelegate: function (e, t, n) {
                    return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n);
                },
            }),
            S.now()),
        at = /\?/;
    (S.parseJSON = function (e) {
        return JSON.parse(e + "");
    }),
        (S.parseXML = function (e) {
            var t;
            if (!e || "string" != typeof e) return null;
            try {
                t = new DOMParser().parseFromString(e, "text/xml");
            } catch (e) {
                t = void 0;
            }
            return (t && !t.getElementsByTagName("parsererror").length) || S.error("Invalid XML: " + e), t;
        });
    var N,
        L,
        st = /#.*$/,
        rt = /([?&])_=[^&]*/,
        lt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        ct = /^(?:GET|HEAD)$/,
        dt = /^\/\//,
        ut = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
        pt = {},
        ht = {},
        ft = "*/".concat("*");
    try {
        L = location.href;
    } catch (e) {
        ((L = g.createElement("a")).href = ""), (L = L.href);
    }
    function mt(a) {
        return function (e, t) {
            "string" != typeof e && ((t = e), (e = "*"));
            var n,
                i = 0,
                o = e.toLowerCase().match(k) || [];
            if (S.isFunction(t)) for (; (n = o[i++]); ) "+" === n[0] ? ((n = n.slice(1) || "*"), (a[n] = a[n] || []).unshift(t)) : (a[n] = a[n] || []).push(t);
        };
    }
    function gt(t, i, o, a) {
        var s = {},
            r = t === ht;
        function l(e) {
            var n;
            return (
                (s[e] = !0),
                S.each(t[e] || [], function (e, t) {
                    t = t(i, o, a);
                    return "string" != typeof t || r || s[t] ? (r ? !(n = t) : void 0) : (i.dataTypes.unshift(t), l(t), !1);
                }),
                n
            );
        }
        return l(i.dataTypes[0]) || (!s["*"] && l("*"));
    }
    function vt(e, t) {
        var n,
            i,
            o = S.ajaxSettings.flatOptions || {};
        for (n in t) void 0 !== t[n] && ((o[n] ? e : (i = i || {}))[n] = t[n]);
        return i && S.extend(!0, e, i), e;
    }
    (N = ut.exec(L.toLowerCase()) || []),
        S.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: L,
                type: "GET",
                isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(N[1]),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: { "*": ft, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript" },
                contents: { xml: /xml/, html: /html/, json: /json/ },
                responseFields: { xml: "responseXML", text: "responseText", json: "responseJSON" },
                converters: { "* text": String, "text html": !0, "text json": S.parseJSON, "text xml": S.parseXML },
                flatOptions: { url: !0, context: !0 },
            },
            ajaxSetup: function (e, t) {
                return t ? vt(vt(e, S.ajaxSettings), t) : vt(S.ajaxSettings, e);
            },
            ajaxPrefilter: mt(pt),
            ajaxTransport: mt(ht),
            ajax: function (e, t) {
                "object" == typeof e && ((t = e), (e = void 0));
                var l,
                    c,
                    d,
                    n,
                    u,
                    p,
                    i,
                    h = S.ajaxSetup({}, (t = t || {})),
                    f = h.context || h,
                    m = h.context && (f.nodeType || f.jquery) ? S(f) : S.event,
                    g = S.Deferred(),
                    v = S.Callbacks("once memory"),
                    b = h.statusCode || {},
                    o = {},
                    a = {},
                    y = 0,
                    s = "canceled",
                    w = {
                        readyState: 0,
                        getResponseHeader: function (e) {
                            var t;
                            if (2 === y) {
                                if (!n) for (n = {}; (t = lt.exec(d)); ) n[t[1].toLowerCase()] = t[2];
                                t = n[e.toLowerCase()];
                            }
                            return null == t ? null : t;
                        },
                        getAllResponseHeaders: function () {
                            return 2 === y ? d : null;
                        },
                        setRequestHeader: function (e, t) {
                            var n = e.toLowerCase();
                            return y || ((e = a[n] = a[n] || e), (o[e] = t)), this;
                        },
                        overrideMimeType: function (e) {
                            return y || (h.mimeType = e), this;
                        },
                        statusCode: function (e) {
                            if (e)
                                if (y < 2) for (var t in e) b[t] = [b[t], e[t]];
                                else w.always(e[w.status]);
                            return this;
                        },
                        abort: function (e) {
                            e = e || s;
                            return l && l.abort(e), r(0, e), this;
                        },
                    };
                if (
                    ((g.promise(w).complete = v.add),
                    (w.success = w.done),
                    (w.error = w.fail),
                    (h.url = ((e || h.url || L) + "").replace(st, "").replace(dt, N[1] + "//")),
                    (h.type = t.method || t.type || h.method || h.type),
                    (h.dataTypes = S.trim(h.dataType || "*")
                        .toLowerCase()
                        .match(k) || [""]),
                    null == h.crossDomain && ((e = ut.exec(h.url.toLowerCase())), (h.crossDomain = !(!e || (e[1] === N[1] && e[2] === N[2] && (e[3] || ("http:" === e[1] ? "80" : "443")) === (N[3] || ("http:" === N[1] ? "80" : "443")))))),
                    h.data && h.processData && "string" != typeof h.data && (h.data = S.param(h.data, h.traditional)),
                    gt(pt, h, t, w),
                    2 !== y)
                ) {
                    for (i in ((p = h.global) && 0 == S.active++ && S.event.trigger("ajaxStart"),
                    (h.type = h.type.toUpperCase()),
                    (h.hasContent = !ct.test(h.type)),
                    (c = h.url),
                    h.hasContent || (h.data && ((c = h.url += (at.test(c) ? "&" : "?") + h.data), delete h.data), !1 === h.cache && (h.url = rt.test(c) ? c.replace(rt, "$1_=" + ot++) : c + (at.test(c) ? "&" : "?") + "_=" + ot++)),
                    h.ifModified && (S.lastModified[c] && w.setRequestHeader("If-Modified-Since", S.lastModified[c]), S.etag[c]) && w.setRequestHeader("If-None-Match", S.etag[c]),
                    ((h.data && h.hasContent && !1 !== h.contentType) || t.contentType) && w.setRequestHeader("Content-Type", h.contentType),
                    w.setRequestHeader("Accept", h.dataTypes[0] && h.accepts[h.dataTypes[0]] ? h.accepts[h.dataTypes[0]] + ("*" !== h.dataTypes[0] ? ", " + ft + "; q=0.01" : "") : h.accepts["*"]),
                    h.headers))
                        w.setRequestHeader(i, h.headers[i]);
                    if (h.beforeSend && (!1 === h.beforeSend.call(f, w, h) || 2 === y)) return w.abort();
                    for (i in ((s = "abort"), { success: 1, error: 1, complete: 1 })) w[i](h[i]);
                    if ((l = gt(ht, h, t, w))) {
                        (w.readyState = 1),
                            p && m.trigger("ajaxSend", [w, h]),
                            h.async &&
                                0 < h.timeout &&
                                (u = setTimeout(function () {
                                    w.abort("timeout");
                                }, h.timeout));
                        try {
                            (y = 1), l.send(o, r);
                        } catch (e) {
                            if (!(y < 2)) throw e;
                            r(-1, e);
                        }
                    } else r(-1, "No Transport");
                }
                return w;
                function r(e, t, n, i) {
                    var o,
                        a,
                        s,
                        r = t;
                    2 !== y &&
                        ((y = 2),
                        u && clearTimeout(u),
                        (l = void 0),
                        (d = i || ""),
                        (w.readyState = 0 < e ? 4 : 0),
                        (i = (200 <= e && e < 300) || 304 === e),
                        n &&
                            (s = (function (e, t, n) {
                                for (var i, o, a, s, r = e.contents, l = e.dataTypes; "*" === l[0]; ) l.shift(), void 0 === i && (i = e.mimeType || t.getResponseHeader("Content-Type"));
                                if (i)
                                    for (o in r)
                                        if (r[o] && r[o].test(i)) {
                                            l.unshift(o);
                                            break;
                                        }
                                if (l[0] in n) a = l[0];
                                else {
                                    for (o in n) {
                                        if (!l[0] || e.converters[o + " " + l[0]]) {
                                            a = o;
                                            break;
                                        }
                                        s = s || o;
                                    }
                                    a = a || s;
                                }
                                return a ? (a !== l[0] && l.unshift(a), n[a]) : void 0;
                            })(h, w, n)),
                        (s = (function (e, t, n, i) {
                            var o,
                                a,
                                s,
                                r,
                                l,
                                c = {},
                                d = e.dataTypes.slice();
                            if (d[1]) for (s in e.converters) c[s.toLowerCase()] = e.converters[s];
                            for (a = d.shift(); a; )
                                if ((e.responseFields[a] && (n[e.responseFields[a]] = t), !l && i && e.dataFilter && (t = e.dataFilter(t, e.dataType)), (l = a), (a = d.shift())))
                                    if ("*" === a) a = l;
                                    else if ("*" !== l && l !== a) {
                                        if (!(s = c[l + " " + a] || c["* " + a]))
                                            for (o in c)
                                                if (((r = o.split(" ")), r[1] === a && (s = c[l + " " + r[0]] || c["* " + r[0]]))) {
                                                    !0 === s ? (s = c[o]) : !0 !== c[o] && ((a = r[0]), d.unshift(r[1]));
                                                    break;
                                                }
                                        if (!0 !== s)
                                            if (s && e.throws) t = s(t);
                                            else
                                                try {
                                                    t = s(t);
                                                } catch (e) {
                                                    return { state: "parsererror", error: s ? e : "No conversion from " + l + " to " + a };
                                                }
                                    }
                            return { state: "success", data: t };
                        })(h, s, w, i)),
                        i
                            ? (h.ifModified && ((n = w.getResponseHeader("Last-Modified")) && (S.lastModified[c] = n), (n = w.getResponseHeader("etag"))) && (S.etag[c] = n),
                              204 === e || "HEAD" === h.type ? (r = "nocontent") : 304 === e ? (r = "notmodified") : ((r = s.state), (o = s.data), (i = !(a = s.error))))
                            : ((a = r), (e || !r) && ((r = "error"), e < 0) && (e = 0)),
                        (w.status = e),
                        (w.statusText = (t || r) + ""),
                        i ? g.resolveWith(f, [o, r, w]) : g.rejectWith(f, [w, r, a]),
                        w.statusCode(b),
                        (b = void 0),
                        p && m.trigger(i ? "ajaxSuccess" : "ajaxError", [w, h, i ? o : a]),
                        v.fireWith(f, [w, r]),
                        p) &&
                        (m.trigger("ajaxComplete", [w, h]), --S.active || S.event.trigger("ajaxStop"));
                }
            },
            getJSON: function (e, t, n) {
                return S.get(e, t, n, "json");
            },
            getScript: function (e, t) {
                return S.get(e, void 0, t, "script");
            },
        }),
        S.each(["get", "post"], function (e, o) {
            S[o] = function (e, t, n, i) {
                return S.isFunction(t) && ((i = i || n), (n = t), (t = void 0)), S.ajax({ url: e, type: o, dataType: i, data: t, success: n });
            };
        }),
        S.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
            S.fn[t] = function (e) {
                return this.on(t, e);
            };
        }),
        (S._evalUrl = function (e) {
            return S.ajax({ url: e, type: "GET", dataType: "script", async: !1, global: !1, throws: !0 });
        }),
        S.fn.extend({
            wrapAll: function (t) {
                var e;
                return S.isFunction(t)
                    ? this.each(function (e) {
                          S(this).wrapAll(t.call(this, e));
                      })
                    : (this[0] &&
                          ((e = S(t, this[0].ownerDocument).eq(0).clone(!0)),
                          this[0].parentNode && e.insertBefore(this[0]),
                          e
                              .map(function () {
                                  for (var e = this; e.firstElementChild; ) e = e.firstElementChild;
                                  return e;
                              })
                              .append(this)),
                      this);
            },
            wrapInner: function (n) {
                return this.each(
                    S.isFunction(n)
                        ? function (e) {
                              S(this).wrapInner(n.call(this, e));
                          }
                        : function () {
                              var e = S(this),
                                  t = e.contents();
                              t.length ? t.wrapAll(n) : e.append(n);
                          }
                );
            },
            wrap: function (t) {
                var n = S.isFunction(t);
                return this.each(function (e) {
                    S(this).wrapAll(n ? t.call(this, e) : t);
                });
            },
            unwrap: function () {
                return this.parent()
                    .each(function () {
                        S.nodeName(this, "body") || S(this).replaceWith(this.childNodes);
                    })
                    .end();
            },
        }),
        (S.expr.filters.hidden = function (e) {
            return e.offsetWidth <= 0 && e.offsetHeight <= 0;
        }),
        (S.expr.filters.visible = function (e) {
            return !S.expr.filters.hidden(e);
        });
    var bt = /%20/g,
        yt = /\[\]$/,
        wt = /\r?\n/g,
        St = /^(?:submit|button|image|reset|file)$/i,
        kt = /^(?:input|select|textarea|keygen)/i;
    (S.param = function (e, t) {
        function n(e, t) {
            (t = S.isFunction(t) ? t() : null == t ? "" : t), (o[o.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t));
        }
        var i,
            o = [];
        if ((void 0 === t && (t = S.ajaxSettings && S.ajaxSettings.traditional), S.isArray(e) || (e.jquery && !S.isPlainObject(e))))
            S.each(e, function () {
                n(this.name, this.value);
            });
        else
            for (i in e)
                !(function n(i, e, o, a) {
                    if (S.isArray(e))
                        S.each(e, function (e, t) {
                            o || yt.test(i) ? a(i, t) : n(i + "[" + ("object" == typeof t ? e : "") + "]", t, o, a);
                        });
                    else if (o || "object" !== S.type(e)) a(i, e);
                    else for (var t in e) n(i + "[" + t + "]", e[t], o, a);
                })(i, e[i], t, n);
        return o.join("&").replace(bt, "+");
    }),
        S.fn.extend({
            serialize: function () {
                return S.param(this.serializeArray());
            },
            serializeArray: function () {
                return this.map(function () {
                    var e = S.prop(this, "elements");
                    return e ? S.makeArray(e) : this;
                })
                    .filter(function () {
                        var e = this.type;
                        return this.name && !S(this).is(":disabled") && kt.test(this.nodeName) && !St.test(e) && (this.checked || !oe.test(e));
                    })
                    .map(function (e, t) {
                        var n = S(this).val();
                        return null == n
                            ? null
                            : S.isArray(n)
                            ? S.map(n, function (e) {
                                  return { name: t.name, value: e.replace(wt, "\r\n") };
                              })
                            : { name: t.name, value: n.replace(wt, "\r\n") };
                    })
                    .get();
            },
        }),
        (S.ajaxSettings.xhr = function () {
            try {
                return new XMLHttpRequest();
            } catch (e) {}
        });
    var Tt = 0,
        xt = {},
        _t = { 0: 200, 1223: 204 },
        j = S.ajaxSettings.xhr(),
        Ct =
            (f.ActiveXObject &&
                S(f).on("unload", function () {
                    for (var e in xt) xt[e]();
                }),
            (m.cors = !!j && "withCredentials" in j),
            (m.ajax = j = !!j),
            S.ajaxTransport(function (a) {
                var s;
                return m.cors || (j && !a.crossDomain)
                    ? {
                          send: function (e, t) {
                              var n,
                                  i = a.xhr(),
                                  o = ++Tt;
                              if ((i.open(a.type, a.url, a.async, a.username, a.password), a.xhrFields)) for (n in a.xhrFields) i[n] = a.xhrFields[n];
                              for (n in (a.mimeType && i.overrideMimeType && i.overrideMimeType(a.mimeType), a.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest"), e)) i.setRequestHeader(n, e[n]);
                              (s = function (e) {
                                  return function () {
                                      s &&
                                          (delete xt[o],
                                          (s = i.onload = i.onerror = null),
                                          "abort" === e
                                              ? i.abort()
                                              : "error" === e
                                              ? t(i.status, i.statusText)
                                              : t(_t[i.status] || i.status, i.statusText, "string" == typeof i.responseText ? { text: i.responseText } : void 0, i.getAllResponseHeaders()));
                                  };
                              }),
                                  (i.onload = s()),
                                  (i.onerror = s("error")),
                                  (s = xt[o] = s("abort"));
                              try {
                                  i.send((a.hasContent && a.data) || null);
                              } catch (e) {
                                  if (s) throw e;
                              }
                          },
                          abort: function () {
                              s && s();
                          },
                      }
                    : void 0;
            }),
            S.ajaxSetup({
                accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" },
                contents: { script: /(?:java|ecma)script/ },
                converters: {
                    "text script": function (e) {
                        return S.globalEval(e), e;
                    },
                },
            }),
            S.ajaxPrefilter("script", function (e) {
                void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET");
            }),
            S.ajaxTransport("script", function (n) {
                var i, o;
                if (n.crossDomain)
                    return {
                        send: function (e, t) {
                            (i = S("<script>")
                                .prop({ async: !0, charset: n.scriptCharset, src: n.url })
                                .on(
                                    "load error",
                                    (o = function (e) {
                                        i.remove(), (o = null), e && t("error" === e.type ? 404 : 200, e.type);
                                    })
                                )),
                                g.head.appendChild(i[0]);
                        },
                        abort: function () {
                            o && o();
                        },
                    };
            }),
            []),
        Dt = /(=)\?(?=&|$)|\?\?/,
        Ot =
            (S.ajaxSetup({
                jsonp: "callback",
                jsonpCallback: function () {
                    var e = Ct.pop() || S.expando + "_" + ot++;
                    return (this[e] = !0), e;
                },
            }),
            S.ajaxPrefilter("json jsonp", function (e, t, n) {
                var i,
                    o,
                    a,
                    s = !1 !== e.jsonp && (Dt.test(e.url) ? "url" : "string" == typeof e.data && !(e.contentType || "").indexOf("application/x-www-form-urlencoded") && Dt.test(e.data) && "data");
                return s || "jsonp" === e.dataTypes[0]
                    ? ((i = e.jsonpCallback = S.isFunction(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback),
                      s ? (e[s] = e[s].replace(Dt, "$1" + i)) : !1 !== e.jsonp && (e.url += (at.test(e.url) ? "&" : "?") + e.jsonp + "=" + i),
                      (e.converters["script json"] = function () {
                          return a || S.error(i + " was not called"), a[0];
                      }),
                      (e.dataTypes[0] = "json"),
                      (o = f[i]),
                      (f[i] = function () {
                          a = arguments;
                      }),
                      n.always(function () {
                          (f[i] = o), e[i] && ((e.jsonpCallback = t.jsonpCallback), Ct.push(i)), a && S.isFunction(o) && o(a[0]), (a = o = void 0);
                      }),
                      "script")
                    : void 0;
            }),
            (S.parseHTML = function (e, t, n) {
                if (!e || "string" != typeof e) return null;
                "boolean" == typeof t && ((n = t), (t = !1)), (t = t || g);
                var i = G.exec(e),
                    n = !n && [];
                return i ? [t.createElement(i[1])] : ((i = S.buildFragment([e], t, n)), n && n.length && S(n).remove(), S.merge([], i.childNodes));
            }),
            S.fn.load),
        It =
            ((S.fn.load = function (e, t, n) {
                var i, o, a, s, r;
                return "string" != typeof e && Ot
                    ? Ot.apply(this, arguments)
                    : ((s = this),
                      0 <= (r = e.indexOf(" ")) && ((i = S.trim(e.slice(r))), (e = e.slice(0, r))),
                      S.isFunction(t) ? ((n = t), (t = void 0)) : t && "object" == typeof t && (o = "POST"),
                      0 < s.length &&
                          S.ajax({ url: e, type: o, dataType: "html", data: t })
                              .done(function (e) {
                                  (a = arguments), s.html(i ? S("<div>").append(S.parseHTML(e)).find(i) : e);
                              })
                              .complete(
                                  n &&
                                      function (e, t) {
                                          s.each(n, a || [e.responseText, t, e]);
                                      }
                              ),
                      this);
            }),
            (S.expr.filters.animated = function (t) {
                return S.grep(S.timers, function (e) {
                    return t === e.elem;
                }).length;
            }),
            f.document.documentElement);
    function Et(e) {
        return S.isWindow(e) ? e : 9 === e.nodeType && e.defaultView;
    }
    (S.offset = {
        setOffset: function (e, t, n) {
            var i,
                o,
                a,
                s,
                r = S.css(e, "position"),
                l = S(e),
                c = {};
            "static" === r && (e.style.position = "relative"),
                (a = l.offset()),
                (i = S.css(e, "top")),
                (s = S.css(e, "left")),
                (r = ("absolute" === r || "fixed" === r) && -1 < (i + s).indexOf("auto") ? ((o = (r = l.position()).top), r.left) : ((o = parseFloat(i) || 0), parseFloat(s) || 0)),
                null != (t = S.isFunction(t) ? t.call(e, n, a) : t).top && (c.top = t.top - a.top + o),
                null != t.left && (c.left = t.left - a.left + r),
                "using" in t ? t.using.call(e, c) : l.css(c);
        },
    }),
        S.fn.extend({
            offset: function (t) {
                var e, n, i, o;
                return arguments.length
                    ? void 0 === t
                        ? this
                        : this.each(function (e) {
                              S.offset.setOffset(this, t, e);
                          })
                    : ((i = { top: 0, left: 0 }),
                      (o = (n = this[0]) && n.ownerDocument)
                          ? ((e = o.documentElement),
                            S.contains(e, n) ? (typeof n.getBoundingClientRect != y && (i = n.getBoundingClientRect()), (n = Et(o)), { top: i.top + n.pageYOffset - e.clientTop, left: i.left + n.pageXOffset - e.clientLeft }) : i)
                          : void 0);
            },
            position: function () {
                var e, t, n, i;
                if (this[0])
                    return (
                        (n = this[0]),
                        (i = { top: 0, left: 0 }),
                        "fixed" === S.css(n, "position")
                            ? (t = n.getBoundingClientRect())
                            : ((e = this.offsetParent()), (t = this.offset()), ((i = S.nodeName(e[0], "html") ? i : e.offset()).top += S.css(e[0], "borderTopWidth", !0)), (i.left += S.css(e[0], "borderLeftWidth", !0))),
                        { top: t.top - i.top - S.css(n, "marginTop", !0), left: t.left - i.left - S.css(n, "marginLeft", !0) }
                    );
            },
            offsetParent: function () {
                return this.map(function () {
                    for (var e = this.offsetParent || It; e && !S.nodeName(e, "html") && "static" === S.css(e, "position"); ) e = e.offsetParent;
                    return e || It;
                });
            },
        }),
        S.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (t, o) {
            var a = "pageYOffset" === o;
            S.fn[t] = function (e) {
                return r(
                    this,
                    function (e, t, n) {
                        var i = Et(e);
                        return void 0 === n ? (i ? i[o] : e[t]) : void (i ? i.scrollTo(a ? f.pageXOffset : n, a ? n : f.pageYOffset) : (e[t] = n));
                    },
                    t,
                    e,
                    arguments.length,
                    null
                );
            };
        }),
        S.each(["top", "left"], function (e, n) {
            S.cssHooks[n] = Ae(m.pixelPosition, function (e, t) {
                return t ? ((t = D(e, n)), Me.test(t) ? S(e).position()[n] + "px" : t) : void 0;
            });
        }),
        S.each({ Height: "height", Width: "width" }, function (a, s) {
            S.each({ padding: "inner" + a, content: s, "": "outer" + a }, function (i, e) {
                S.fn[e] = function (e, t) {
                    var n = arguments.length && (i || "boolean" != typeof e),
                        o = i || (!0 === e || !0 === t ? "margin" : "border");
                    return r(
                        this,
                        function (e, t, n) {
                            var i;
                            return S.isWindow(e)
                                ? e.document.documentElement["client" + a]
                                : 9 === e.nodeType
                                ? ((i = e.documentElement), Math.max(e.body["scroll" + a], i["scroll" + a], e.body["offset" + a], i["offset" + a], i["client" + a]))
                                : void 0 === n
                                ? S.css(e, t, o)
                                : S.style(e, t, n, o);
                        },
                        s,
                        n ? e : void 0,
                        n,
                        null
                    );
                };
            });
        }),
        (S.fn.size = function () {
            return this.length;
        }),
        (S.fn.andSelf = S.fn.addBack),
        "function" == typeof define &&
            define.amd &&
            define("jquery", [], function () {
                return S;
            });
    var Mt = f.jQuery,
        At = f.$;
    return (
        (S.noConflict = function (e) {
            return f.$ === S && (f.$ = At), e && f.jQuery === S && (f.jQuery = Mt), S;
        }),
        typeof P == y && (f.jQuery = f.$ = S),
        S
    );
});
var DEFAULT_WEATHER_SERVER_URL = "https://weather.opensprinkler.com",
    WEATHER_SERVER_URL = DEFAULT_WEATHER_SERVER_URL,
    isAndroid = /Android|\bSilk\b/.test(navigator.userAgent),
    isiOS = /iP(ad|hone|od)/.test(navigator.userAgent),
    isFireFox = /Firefox/.test(navigator.userAgent),
    isOSXApp = window.cordova && "ios" === window.cordova.platformId && "MacIntel" === navigator.platform,
    isFileCapable = !isiOS && !isAndroid && !isOSXApp && window.FileReader,
    isTouchCapable = "ontouchstart" in window || "onmsgesturechange" in window,
    isMetric = -1 === ["US", "BM", "PW"].indexOf(navigator.languages[0].split("-")[1]),
    groupView = !1,
    storage = {
        get: function (e, t) {
            t = t || function () {};
            var n,
                i = {};
            for (n in (e = "string" == typeof e ? [e] : e)) e.hasOwnProperty(n) && (i[e[n]] = localStorage.getItem(e[n]));
            t(i);
        },
        set: function (e, t) {
            if (((t = t || function () {}), "object" == typeof e)) for (var n in e) e.hasOwnProperty(n) && localStorage.setItem(n, e[n]);
            t(!0);
        },
        remove: function (e, t) {
            for (var n in ((t = t || function () {}), (e = "string" == typeof e ? [e] : e))) e.hasOwnProperty(n) && localStorage.removeItem(e[n]);
            t(!0);
        },
    },
    regex = { gps: /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/ },
    statusBarPrimary = isAndroid ? "#121212" : "#1D1D1D",
    statusBarOverlay = isAndroid ? "#151515" : "#202020",
    retryCount = 2,
    controller = {},
    switching = !1,
    currentCoordinates = [0, 0],
    pageHistoryCount = -1,
    goingBack = !1,
    keyIndex = {
        tz: 1,
        ntp: 2,
        dhcp: 3,
        ip1: 4,
        ip2: 5,
        ip3: 6,
        ip4: 7,
        gw1: 8,
        gw2: 9,
        gw3: 10,
        gw4: 11,
        hp0: 12,
        hp1: 13,
        ar: 14,
        ext: 15,
        seq: 16,
        sdt: 17,
        mas: 18,
        mton: 19,
        mtof: 20,
        urs: 21,
        rso: 22,
        wl: 23,
        den: 24,
        ipas: 25,
        devid: 26,
        con: 27,
        lit: 28,
        dim: 29,
        bst: 30,
        uwt: 31,
        ntp1: 32,
        ntp2: 33,
        ntp3: 34,
        ntp4: 35,
        lg: 36,
        mas2: 37,
        mton2: 38,
        mtof2: 39,
        fpr0: 41,
        fpr1: 42,
        re: 43,
        dns1: 44,
        dns2: 45,
        dns3: 46,
        dns4: 47,
        sar: 48,
        ife: 49,
        sn1t: 50,
        sn1o: 51,
        sn2t: 52,
        sn2o: 53,
        sn1on: 54,
        sn1of: 55,
        sn2on: 56,
        sn2of: 57,
        subn1: 58,
        subn2: 59,
        subn3: 60,
        subn4: 61,
    },
    dialog = { REMOVE_STATION: 1 },
    popupData = { shift: void 0 },
    MANUAL_STATION_PID = 99,
    MASTER_STATION_1 = 1,
    MASTER_STATION_2 = 2,
    IGNORE_SENSOR_1 = 1,
    IGNORE_SENSOR_2 = 2,
    NUM_SEQ_GROUPS = 4,
    PARALLEL_GROUP_NAME = "P",
    PARALLEL_GID_VALUE = 255,
    MASTER_GROUP_NAME = "M",
    MASTER_GID_VALUE = 254,
    notifications = [],
    timers = {},
    curr183,
    currToken,
    currIp,
    currPrefix,
    currAuth,
    currPass,
    currAuthUser,
    currAuthPass,
    currLocal,
    currLang,
    language,
    deviceip,
    errorTimeout,
    weather,
    openPanel;



function initApp() {
    updateLang(),
        currLocal || $.ajaxSetup({ timeout: 1e4 }),
        isAndroid
            ? (insertStyle(".ui-toolbar-back-btn{display:none!important}"),
              $(this).ajaxStart(function () {
                  try {
                      navigator.app.clearCache();
                  } catch (e) {}
              }))
            : isFireFox
            ? $.ajaxSetup({
                  xhr: function () {
                      return new window.XMLHttpRequest({ mozSystem: !0 });
                  },
              })
            : $.ajaxSetup({ cache: !1 }),
        ($.mobile.defaultPageTransition = isAndroid ? "fade" : "slide"),
        ($.mobile.hoverDelay = 0),
        ($.mobile.activeBtnClass = "activeButton"),
        $.mobile.document.on("click", ".iab", function () {
            var e = isOSXApp ? "_system" : "_blank",
                t = $(this);
            return (
                window.open(
                    this.href,
                    e,
                    "location=" +
                        (isAndroid ? "yes" : "no") +
                        ",enableViewportScale=" +
                        (t.hasClass("iabNoScale") ? "no" : "yes") +
                        ",toolbar=yes,toolbarposition=top,toolbarcolor=" +
                        statusBarPrimary +
                        ",closebuttoncaption=" +
                        (t.hasClass("iabNoScale") ? _("Back") : _("Done"))
                ),
                setTimeout(function () {
                    t.removeClass("ui-btn-active");
                }, 100),
                !1
            );
        }),
        $.mobile.document.on("click", ".ui-select .ui-btn", function () {
            var e = $(this),
                t = e.attr("id").replace("-button", "-listbox"),
                n = $("#" + t);
            return (
                n.popup("destroy").detach().addClass("ui-page-theme-a"),
                $.mobile.pageContainer.append(n),
                n.popup({ history: !1, positionTo: e, overlayTheme: "b" }).popup("open"),
                e.off("click").on("click", function () {
                    n.popup("open");
                }),
                !1
            );
        }),
        $.mobile.document.on("swiperight swipeleft", ".ui-page", function (e) {
            var t = $(".ui-page-active");
            "INPUT" === e.target.tagName || "TEXTAREA" === e.target.tagName || "open" === t.jqmData("panel") || t.find(".ui-popup-active").length || ("swiperight" === e.type ? openPanel : showNotifications)();
        }),
        $.widget("mobile.collapsible", $.mobile.collapsible, {
            _handleExpandCollapse: function (e) {
                this._trigger("before" + (e ? "collapse" : "expand")) && this._superApply(arguments);
            },
        }),
        $("#site-selector").on("change", function () {
            updateSite($(this).val());
        }),
        $("#footer-menu").on("click", function () {
            showHomeMenu(this);
        }),
        $("#header,#footer").toolbar(),
        FastClick.attach(document.body),
        updateTimers(),
        $.mobile.document.on("keydown", function (e) {
            var t,
                n,
                i = $(e.target).prop("tagName");
            "INPUT" !== i &&
                "TEXTAREA" !== i &&
                ((i = e.keyCode),
                (t = e.altKey),
                (n = $("#mainMenu-popup").hasClass("ui-popup-active")),
                77 === i
                    ? 0 < $("#mainMenu").length
                        ? $("#mainMenu").popup("close")
                        : showHomeMenu()
                    : (n || t) && 80 === i
                    ? (e.preventDefault(), changePage("#programs"))
                    : (n || t) && 79 === i
                    ? (e.preventDefault(), changePage("#os-options"))
                    : (n || t) && 86 === i
                    ? (e.preventDefault(), changePage("#preview"))
                    : (n || t) && 76 === i
                    ? (e.preventDefault(), changePage("#logs"))
                    : (n || t) && 82 === i
                    ? (e.preventDefault(), changePage("#runonce"))
                    : (n || t) && 85 === i
                    ? (e.preventDefault(), showPause())
                    : (n || t) && 68 === i && (e.preventDefault(), showRainDelay()));
        }),
        bindPanel(),
        currLocal || void 0 !== window.cordova || updateDeviceIP(),
//        cloudSync(),
        
        setTimeout(function () {
            checkConfigured(!0), fetchLocal();
        }, 200);
}
function flipSwitched() {
    var e, t, n, i;
    switching ||
        ((e = $(this)),
        (t = e.attr("id")),
        (n = e.is(":checked")),
        (i = "mmm" === t ? "mm" : t),
        (i = sendToOS(n ? "/cv?pw=&" + i + "=1" : "/cv?pw=&" + i + "=0")),
        $.when(i).then(
            function () {
                refreshStatus(), "mmm" === t && $("#mm_list .green").removeClass("green"), checkStatus();
            },
            function () {
                (switching = !0),
                    setTimeout(function () {
                        switching = !1;
                    }, 200),
                    e.prop("checked", !n).flipswitch("refresh");
            }
        ));
}
function sendToOS(n, e) {
    (n = n.replace("pw=", "pw=" + encodeURIComponent(currPass))), (e = e || "text");
    var t = /\/(?:cv|cs|cr|cp|uwa|dp|co|cl|cu|up|cm)/.exec(n),
        i = t ? "change" : "default",
        t = t && checkOSVersion(300),
        o = t ? n.split("?")[0] : n,
        o = {
            url: currToken ? "https://cloud.openthings.io/forward/v1/" + currToken + o : currPrefix + currIp + o,
            type: t ? "POST" : "GET",
            data: t ? getUrlVars(n) : null,
            dataType: e,
            shouldRetry: function (e, t) {
                return !((0 === e.status && "abort" === e.statusText) || retryCount < t) || ($.ajaxq.abort(i), !1);
            },
        };
    return (
        currAuth &&
            $.extend(o, {
                beforeSend: function (e) {
                    e.setRequestHeader("Authorization", "Basic " + btoa(currAuthUser + ":" + currAuthPass));
                },
            }),
        curr183 && $.extend(o, { cache: "true" }),
        $.ajaxq(i, o).then(
            function (t) {
                if ("string" == typeof t)
                    try {
                        t = $.parseJSON(t);
                    } catch (e) {
                        return t;
                    }
                return "object" != typeof t || "number" != typeof t.result || 1 === t.result
                    ? t
                    : 2 === t.result
                    ? (/\/(?:cv|cs|cr|cp|uwa|dp|co|cl|cu|up|cm)/.exec(n) && showerror(_("Check device password and try again.")), $.Deferred().reject({ status: 401 }))
                    : 32 === t.result
                    ? $.Deferred().reject({ status: 404 })
                    : /\/(?:cv|cs|cr|cp|uwa|dp|co|cl|cu|up|cm)/.exec(n)
                    ? (48 === t.result ? showerror(_("The selected station is already running or is scheduled to run.")) : showerror(_("Please check input and try again.")), $.Deferred().reject(t))
                    : void 0;
            },
            function (e) {
                ("timeout" !== e.statusText && 0 !== e.status) || !/\/(?:cv|cs|cr|cp|uwa|dp|co|cl|cu|cm)/.exec(n)
                    ? 401 === e.status && showerror(_("Check device password and try again."))
                    : showerror(_("Connection timed-out. Please try again."));
            }
        )
    );
}
function networkFail() {
    changeStatus(0, "red", "<p class='running-text center'>" + _("Network Error") + "</p>", function () {
        showLoading("#weather,#footer-running"), refreshStatus(), updateWeather();
    });
}
function newLoad() {
    var i = $("#site-selector").val(),
        e = "<div class='logo'></div><h1 style='padding-top:5px'>" + _("Connecting to") + " " + i + "</h1><p class='cancel tight center inline-icon'><span class='btn-no-border ui-btn ui-icon-delete ui-btn-icon-notext'></span>Cancel</p>";
    $.mobile.loading("show", { html: currLocal ? "<h1>" + _("Loading") + "</h1>" : e, textVisible: !0, theme: "b" }),
        $(".ui-loader")
            .css({ "box-shadow": "none", "margin-top": "-4em" })
            .find(".cancel")
            .one("click", function () {
                $.ajaxq.abort("default"), changePage("#site-control", { transition: "none" });
            }),
        (controller = {}),
        clearNotifications(),
        (timers = {}),
        $.ajaxq.abort("default"),
        updateController(
            function () {
                var e = $(".weatherAdjust"),
                    t = $(".changePassword");
                $.mobile.loading("hide"),
                    checkURLandUpdateWeather(),
                    checkOSVersion(210) ? e.css("display", "") : e.hide(),
                    isOSPi() || checkOSVersion(208) ? t.css("display", "") : t.hide(),
                    currLocal ? $("#info-list").find("li[data-role='list-divider']").text(_("Information")) : ($("#info-list").find("li[data-role='list-divider']").text(i), (document.title = "OpenSprinkler - " + i)),
                    checkFirmwareUpdate(),
                    detectUnusedExpansionBoards(),
                    checkOSVersion(213) && 255 !== controller.options.hwv && fixPasswordHash(i),
                    currLocal || "number" != typeof controller.settings.eip || checkPublicAccess(controller.settings.eip),
                    updateLoginButtons(),
                    isOSPi() && showUnifiedFirmwareNotification(),
                    controller.options.firstRun ? showGuidedSetup() : goHome(!0);
            },
            function (e) {
                $.ajaxq.abort("default"), (controller = {}), $.mobile.loading("hide");
                function t() {
                    currLocal
                        ? storage.remove(["sites"], function () {
                              window.location.reload();
                          })
                        : "site-control" === $(".ui-page-active").attr("id")
                        ? n()
                        : ($.mobile.document.one("pageshow", n), changePage("#site-control", { transition: "none" }));
                }
                var n = function () {
                    showerror(_("Unable to connect to") + " " + i, 3500);
                };
                "object" == typeof e && 401 === e.status ? ($(".ui-popup-active").find("[data-role='popup']").popup("close"), changePassword({ fixIncorrect: !0, name: i, callback: newLoad, cancel: t })) : t();
            }
        );
}



function updateController(e, n) {
    (e = e || function () {}), (n = n || function () {});
    function i() {
        $("html").trigger("datarefresh"), checkStatus(), e();
    }
    isControllerConnected() && checkOSVersion(216)
        ? sendToOS("/ja?pw=", "json").then(function (e) {
              var t;
              (void 0 === e || $.isEmptyObject(e) ? n : ((t = controller.special), ((controller = e).special = t), 
                                                         (controller.acvolts = controller.status.acvolts), (controller.ospitemp = controller.status.ospitemp),
                                                         (controller.status = controller.status.sn), 
                                                          i))();
          }, n)
        : $.when(updateControllerPrograms(), updateControllerStations(), updateControllerOptions(), updateControllerStatus(), updateControllerSettings()).then(i, n);
}
function updateControllerPrograms(r) {
    return (
        (r = r || function () {}),
/*        !0 === curr183
            ? sendToOS("/gp?d=0").done(function (e) {
                  for (var t, n, i = e.match(/(nprogs|nboards|mnp)=[\w|\d|.\"]+/g), o = /pd=\[\];(.*);/.exec(e), a = {}, s = 0; s < i.length; s++) "" !== i[s] && (a[(t = i[s].split("="))[0]] = parseInt(t[1]));
                  if (((a.pd = []), null !== o)) for (o = o[1].split(";"), s = 0; s < o.length; s++) (n = (n = (n = o[s].split("="))[1].replace("[", "")).replace("]", "")), (a.pd[s] = parseIntArray(n.split(",")));
                  (controller.programs = a), r();
              })
            : */sendToOS("/jp?pw=", "json").done(function (e) {
                  (controller.programs = e), r();
              })
    );
}
function updateControllerStations(i) {
    return (
        (i = i || function () {}),
 /*       !0 === curr183
            ? sendToOS("/vs").done(function (e) {
                  var t = /snames=\[(.*?)\];/.exec(e),
                      e = e.match(/(?:masop|mo)\s?[=|:]\s?\[(.*?)\]/);
                  (t = t[1].split(",")).pop();
                  for (var n = 0; n < t.length; n++) t[n] = t[n].replace(/'/g, "");
                  (e = parseIntArray(e[1].split(","))), (controller.stations = { snames: t, masop: e, maxlen: t.length }), i();
              }) 
            : */ sendToOS("/jn?pw=", "json").done(function (e) {
                  (controller.stations = e), i();
              })
    );
}
function updateControllerOptions(r) {
    return (
        (r = r || function () {}),
        !0 === curr183
            ? sendToOS("/vo").done(function (e) {
                  var t,
                      n,
                      i = {};
                  if (e.match(/var sd\s*=/)) {
                      for (var o = /(tz|htp|htp2|nbrd|seq|sdt|mas|mton|mtoff|urs|rst|wl|ipas)\s?[=|:]\s?([\w|\d|.\"]+)/gm; null !== (a = o.exec(e)); ) i[a[1].replace("nbrd", "ext").replace("mtoff", "mtof")] = +a[2];
                      i.ext--, (i.fwv = "1.8.3-ospi");
                  } else {
                      var a,
                          s = [1, 2, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 25, 26];
                      for (a = (a = /var opts=\[(.*)\];/.exec(e))[1].replace(/"/g, "").split(","), t = 0; t < a.length - 1; t += 4) (n = +a[t + 3]), -1 !== $.inArray(n, s) && (i[keyIndex[n]] = +a[t + 2]);
                      i.fwv = 183;
                  }
                  (controller.options = i), r();
              })
            : sendToOS("/jo?pw=", "json").done(function (e) {
                  (controller.options = e), r();
              })
    );
}
function updateControllerStatus(t) {
    return (
        (t = t || function () {}),
 /*       !0 === curr183
            ? sendToOS("/sn0").then(
                  function (e) {
                      e = parseIntArray((e = e.toString().match(/\d+/))[0].split(""));
                      (controller.status = e), t();
                  },
                  function () {
                      controller.status = [];
                  }
              )
            : */sendToOS("/js?pw=", "json").then(
                  function (e) {
                      (controller.status = e.sn),
                      (controller.ospitemp = e.ospitemp),
                      (controller.acvolts = e.acvolts),
                      (controller.fuse = e.fuse)
                       t();
                  },
                  function () {
                      controller.status = [];
                  }
              )
    );
}
function updateControllerSettings(e) {
    return (
        (e = e || function () {}),
        !0 === curr183
            ? sendToOS("").then(
                  function (e) {
                      for (
                          var t,
                              n = /(ver|devt|nbrd|tz|en|rd|rs|mm|rdst|urs)\s?[=|:]\s?([\w|\d|.\"]+)/gm,
                              i = e.match(/loc\s?[=|:]\s?[\"|'](.*)[\"|']/),
                              o = e.match(/lrun=\[(.*)\]/),
                              a = e.match(/ps=\[(.*)\];/),
                              s = {},
                              r = (a = a[1].split("],[")).length - 1;
                          0 <= r;
                          r--
                      )
                          a[r] = parseIntArray(a[r].replace(/\[|\]/g, "").split(","));
                      for (; null !== (t = n.exec(e)); ) s[t[1]] = +t[2];
                      (s.loc = i[1]), (s.ps = a), (s.lrun = parseIntArray(o[1].split(","))), (controller.settings = s);
                  },
                  function () {
                      if (controller.settings && controller.stations) {
                          for (var e = [], t = 0; t < controller.stations.maxlen; t++) e.push([0, 0]);
                          controller.settings.ps = e;
                      }
                  }
              )
            : sendToOS("/jc?pw=").then(
                  function (t) {
                      if ("object" != typeof t)
                          try {
                              t = JSON.parse(t);
                          } catch (e) {
                              var n = /,"wto":\{.*?\}/,
                                  i = t.match(n);
                              t = t.replace(n, "");
                              try {
                                  (t = JSON.parse(t)), handleCorruptedWeatherOptions(i);
                              } catch (e) {
                                  return !1;
                              }
                          }
                      void 0 === t.lrun && (t.lrun = [0, 0, 0, 0]), t.loc.match(regex.gps) && ((n = t.loc.split(",")), (currentCoordinates = [parseFloat(n[0]), parseFloat(n[1])])), (controller.settings = t), e();
                  },
                  function () {
                      if (controller.settings && controller.stations) {
                          for (var e = [], t = 0; t < controller.stations.maxlen; t++) e.push([0, 0]);
                          controller.settings.ps = e;
                      }
                  }
              )
    );
}
function updateControllerStationSpecial(t) {
    return (
        (t = t || function () {}),
        sendToOS("/je?pw=", "json").then(
            function (e) {
                (controller.special = e), t();
            },
            function () {
                controller.special = {};
            }
        )
    );
}
function checkConfigured(o) {
    storage.get(["sites", "current_site", "cloudToken"], function (e) {
        var t = e.sites,
            n = e.current_site,
            t = parseSites(t),
            i = Object.keys(t);
        i.length
            ? null !== n && n in t
                ? (updateSiteList(i, n),
                  (currToken = t[n].os_token),
                  (currIp = t[n].os_ip),
                  (currPass = t[n].os_pw),
                  (currPrefix = void 0 !== t[n].ssl && "1" === t[n].ssl ? "https://" : "http://"),
                  void 0 !== t[n].auth_user && void 0 !== t[n].auth_pw ? ((currAuth = !0), (currAuthUser = t[n].auth_user), (currAuthPass = t[n].auth_pw)) : (currAuth = !1),
                  (curr183 = !!t[n].is183),
                  newLoad())
                : ($.mobile.loading("hide"), changePage("#site-control", { transition: o ? "none" : void 0 }))
            : o && (void 0 === e.cloudToken || null === e.cloudToken ? changePage("#start", { transition: "none" }) : changePage("#site-control", { transition: "none" }));
    });
}
function fixPasswordHash(i) {
    storage.get(["sites"], function (e) {
        var t,
            n = parseSites(e.sites);
        isMD5(currPass) ||
            ((t = md5(currPass)),
            sendToOS("/sp?pw=&npw=" + encodeURIComponent(t) + "&cpw=" + encodeURIComponent(t), "json").done(function (e) {
                e = e.result;
                if (!e || 1 < e) return !1;
                (n[i].os_pw = currPass = t), storage.set({ sites: JSON.stringify(n) }, cloudSaveSites);
            }));
    });
}
function submitNewUser(s, r) {
    document.activeElement.blur(), $.mobile.loading("show");
    function n(e, t) {
        var n, i, o, a;
        $.mobile.loading("hide"),
            (("string" == typeof e && e.match(/var (en|sd)\s*=/)) || ("number" == typeof e.fwv && 203 === e.fwv)) && (n = !0),
            void 0 !== e.fwv || !0 === n
                ? ((i = $("#os_name").val()),
                  (o = $("#os_pw").val()),
                  (a = $("#save_pw").is(":checked")),
                  "" === i && (i = "Site " + (Object.keys(t).length + 1)),
                  (t[i] = {}),
                  (t[i].os_token = currToken = c),
                  (t[i].os_ip = currIp = l),
                  "number" == typeof e.fwv && 213 <= e.fwv && "number" == typeof e.wl && (o = md5(o)),
                  (t[i].os_pw = a ? o : ""),
                  (currPass = o),
                  (currPrefix = s ? ((t[i].ssl = "1"), "https://") : "http://"),
                  r ? ((t[i].auth_user = $("#os_auth_user").val()), (t[i].auth_pw = $("#os_auth_pw").val()), (currAuth = !0), (currAuthUser = t[i].auth_user), (currAuthPass = t[i].auth_pw)) : (currAuth = !1),
                  !0 === n && ((t[i].is183 = "1"), (curr183 = !0)),
                  $("#os_name,#os_ip,#os_pw,#os_auth_user,#os_auth_pw,#os_token").val(""),
                  storage.set({ sites: JSON.stringify(t), current_site: i }, function () {
                      cloudSaveSites(), updateSiteList(Object.keys(t), i), newLoad();
                  }))
                : showerror(_("Check IP/Port and try again."));
    }
    function t(e) {
        r || 401 !== e.status ? (s ? ($.mobile.loading("hide"), showerror(_("Check IP/Port and try again."))) : submitNewUser(!0)) : i();
    }
    function i() {
        var e;
        $("#addnew-auth").length
            ? submitNewUser(s, !0)
            : ($.mobile.loading("hide"),
              (e = $(
                  "<div class='ui-content' id='addnew-auth'><form method='post' novalidate><p class='center smaller'>" +
                      _("Authorization Required") +
                      "</p><label for='os_auth_user'>" +
                      _("Username:") +
                      "</label><input autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' type='text' name='os_auth_user' id='os_auth_user'><label for='os_auth_pw'>" +
                      _("Password:") +
                      "</label><input type='password' name='os_auth_pw' id='os_auth_pw'><input type='submit' value='" +
                      _("Submit") +
                      "'></form></div>"
              ).enhanceWithin()).on("submit", "form", function () {
                  return submitNewUser(s, !0), !1;
              }),
              $("#addnew-content").hide(),
              $("#addnew").append(e).popup("reposition", { positionTo: "window" }));
    }
    function o() {
        return btoa($("#os_auth_user").val() + ":" + $("#os_auth_pw").val());
    }
    var a,
        e = $(".connection-type input[type='radio']:checked").val(),
        l = $.mobile.path.parseUrl($("#os_ip").val()).hrefNoHash.replace(/https?:\/\//, ""),
        c = "token" === e ? $("#os_token").val() : null;
    l || c
        ? c && 32 !== c.length
            ? showerror(_("OpenThings Token must be 32 characters long."))
            : !0 !== r && $("#os_useauth").is(":checked")
            ? i()
            : (!0 === $("#os_usessl").is(":checked") && (s = !0),
              (a = s ? "https://" : "http://"),
              r && ($("#addnew-auth").hide(), $("#addnew-content").show(), $("#addnew").popup("reposition", { positionTo: "window" })),
              (e = "/jo?pw=" + md5($("#os_pw").val())),
              (e = c ? "https://cloud.openthings.io/forward/v1/" + c + e : a + l + e),
              $.ajax({
                  url: e,
                  type: "GET",
                  dataType: "json",
                  timeout: 1e4,
                  global: !1,
                  beforeSend: function (e) {
                      !c && r && e.setRequestHeader("Authorization", "Basic " + o());
                  },
                  error: function (e) {
                      r || 401 !== e.status
                          ? $.ajax({
                                url: c ? "https://cloud.openthings.io/forward/v1/" + c : a + l,
                                type: "GET",
                                dataType: "text",
                                timeout: 1e4,
                                global: !1,
                                cache: !0,
                                beforeSend: function (e) {
                                    !c && r && e.setRequestHeader("Authorization", "Basic " + o());
                                },
                                success: function (t) {
                                    storage.get("sites", function (e) {
                                        e = parseSites(e.sites);
                                        n(t, e);
                                    });
                                },
                                error: t,
                            })
                          : i();
                  },
                  success: function (t) {
                      storage.get("sites", function (e) {
                          e = parseSites(e.sites);
                          n(t, e);
                      });
                  },
              }))
        : showerror(_("An IP address or token is required to continue."));
}
function parseSites(e) {
    return null == e ? {} : JSON.parse(e);
}
function showSiteSelect(e) {
    $("#site-select").popup("destroy").remove();
    var t = $(
        "<div data-role='popup' id='site-select' data-theme='a' data-overlay-theme='b'><div data-role='header' data-theme='b'><h1>" +
            _("Select Site") +
            "</h1></div><div class='ui-content'><ul data-role='none' class='ui-listview ui-corner-all ui-shadow'></ul></div></div>"
    );
    e && t.find("ul").html(e),
        t
            .one("popupafterclose", function () {
                $(this).popup("destroy").remove();
            })
            .popup({ history: !1, positionTo: "window" })
            .enhanceWithin()
            .popup("open");
}
function showAddNew(e, t) {
    $("#addnew").popup("destroy").remove();
    var n = !!e,
        i = $(
            "<div data-role='popup' id='addnew' data-theme='a' data-overlay-theme='b'><div data-role='header' data-theme='b'><h1>" +
                _("New Device") +
                "</h1></div><div class='ui-content' id='addnew-content'><form method='post' novalidate>" +
                (n ? "" : "<p class='center smaller'>" + _("Note: The name is used to identify the OpenSprinkler within the app. OpenSprinkler IP can be either an IP or hostname. You can also specify a port by using IP:Port") + "</p>") +
                "<label for='os_name'>" +
                _("Open Sprinkler Name:") +
                "</label><input autocorrect='off' spellcheck='false' type='text' name='os_name' id='os_name' placeholder='Home'>" +
                (n
                    ? ""
                    : "<div class='ui-field-contain'><fieldset data-role='controlgroup' class='ui-mini center connection-type' data-type='horizontal'><legend class='left'>" +
                      _("Connection Type") +
                      ":</legend><input class='noselect' type='radio' name='connectionType' id='type-direct' value='ip' checked='checked'><label for='type-direct'>" +
                      _("Direct") +
                      "</label><input class='noselect' type='radio' name='connectionType' id='type-token' value='token'><label for='type-token'>" +
                      _("OpenThings Cloud") +
                      "</label></fieldset></div><label class='ip-field' for='os_ip'>" +
                      _("Open Sprinkler IP:") +
                      "</label>") +
                "<input data-wrapper-class='ip-field' " +
                (n ? "data-role='none' style='display:none' " : "") +
                "autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' type='url' pattern='' name='os_ip' id='os_ip' value='" +
                (n ? e : "") +
                "' placeholder='home.dyndns.org'><label class='token-field' for='os_token' style='display: none'>" +
                _("OpenThings Token") +
                ":</label><input data-wrapper-class='token-field hidden' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' type='text' pattern='' name='os_token' id='os_token' value='' placeholder='" +
                _("OpenThings Token") +
                "'><label for='os_pw'>" +
                _("Open Sprinkler Password:") +
                "</label><input type='password' name='os_pw' id='os_pw' value=''><label for='save_pw'>" +
                _("Save Password") +
                "</label><input type='checkbox' data-wrapper-class='save_pw' name='save_pw' id='save_pw' data-mini='true' checked='checked'>" +
                (n
                    ? ""
                    : "<div data-theme='a' data-mini='true' data-role='collapsible' class='advanced-options'><h4>" +
                      _("Advanced") +
                      "</h4><fieldset data-role='controlgroup' data-type='horizontal' data-mini='true' class='center'><input type='checkbox' name='os_usessl' id='os_usessl'><label for='os_usessl'>" +
                      _("Use SSL") +
                      "</label><input type='checkbox' name='os_useauth' id='os_useauth'><label for='os_useauth'>" +
                      _("Use Auth") +
                      "</label></fieldset></div>") +
                "<input type='submit' data-theme='b' value='" +
                _("Submit") +
                "'></form></div></div>"
        );
    return (
        i.find("form").on("submit", function () {
            return submitNewUser(), !1;
        }),
        i
            .one("popupafterclose", function () {
                $(this).popup("destroy").remove();
            })
            .popup({ history: !1, positionTo: "window" })
            .enhanceWithin(),
        t
            ? $(".ui-popup-active")
                  .children()
                  .first()
                  .one("popupafterclose", function () {
                      i.popup("open");
                  })
                  .popup("close")
            : i.popup("open"),
        fixInputClick(i),
        i.find(".ui-collapsible-heading-toggle").on("click", function () {
            var e = $(this).parents(".ui-collapsible").hasClass("ui-collapsible-collapsed"),
                t = $(".ui-page-active"),
                n = parseInt(t.css("min-height"));
            e ? t.css("min-height", n + 65 + "px") : t.css("min-height", n - 65 + "px"), i.popup("reposition", { positionTo: "window" });
        }),
        i.find(".connection-type input[type='radio']").on("change", function () {
            var e = "token" === this.value ? "ip" : "token";
            i.find("." + e + "-field").hide(),
                i
                    .find("." + this.value + "-field")
                    .removeClass("hidden")
                    .show(),
                i.find(".advanced-options").toggle("ip" === this.value);
        }),
        !1
    );
}
"serviceWorker" in navigator &&
    window.addEventListener("load", function () {
        navigator.serviceWorker.register("/sw.js");
    }),
    isOSXApp && document.documentElement.classList.add("macos"),
    $(document)
        .one("deviceready", function () {
            window.cordova && window.cordova.InAppBrowser && (window.open = window.cordova.InAppBrowser.open);
            try {
                StatusBar.overlaysWebView(!1),
                    StatusBar.styleLightContent(),
                    StatusBar.backgroundColorByHexString(statusBarPrimary),
                    $.mobile.window.on("statusTap", function () {
                        $("body, html").animate({ scrollTop: 0 }, 700);
                    });
            } catch (e) {}
            setTimeout(function () {
                try {
                    navigator.splashscreen.hide();
                } catch (e) {}
            }, 500),
                $.mobile.document.on("backbutton", function () {
                    return checkChangesBeforeBack(), !1;
                }),
                updateDeviceIP(),
                isiOS &&
                    ThreeDeeTouch.isAvailable(function (e) {
                        e &&
                            (ThreeDeeTouch.enableLinkPreview(),
                            ThreeDeeTouch.configureQuickActions([
                                { type: "sites", title: _("Manage Sites"), iconType: "Location" },
                                { type: "addprogram", title: _("Add Program"), iconType: "Add" },
                                { type: "stopall", title: _("Stop All Stations"), iconType: "Pause" },
                            ]),
                            (ThreeDeeTouch.onHomeIconPressed = function (e) {
                                "sites" === e.type ? changePage("#site-control") : "addprogram" === e.type ? changePage("#addprogram") : "stopall" === e.type && stopAllStations();
                            }));
                    });
        })
        .one("mobileinit", function () {
            ($.support.cors = !0), ($.mobile.allowCrossDomainPages = !0), loadLocalSettings();
        })
        .on("pagebeforechange", function (e, t) {
            var n = t.toPage,
                i = $(".ui-page-active");
            "string" != typeof t.toPage ||
                ((n = $.mobile.path.parseUrl(n).hash), 0 < i.length && n === "#" + i.attr("id")) ||
                ("popup" === t.options.role || $(".ui-popup-active").length || $.mobile.silentScroll(0),
                "#programs" === n
                    ? getPrograms(t.options.programToExpand)
                    : "#addprogram" === n
                    ? addProgram(t.options.copyID)
                    : "#manual" === n
                    ? getManual()
                    : "#about" === n
                    ? showAbout()
                    : "#runonce" === n
                    ? getRunonce()
                    : "#os-options" === n
                    ? showOptions(t.options.expandItem)
                    : "#preview" === n
                    ? getPreview()
                    : "#logs" === n
                    ? getLogs()
                    : "#forecast" === n
                    ? showForecast()
                    : "#loadingPage" === n
                    ? checkConfigured(!0)
                    : "#start" === n
                    ? showStart()
                    : "#site-control" === n
                    ? showSites()
                    : "#sprinklers" === n &&
                      (0 === $(n).length
                          ? showHome(t.options.firstLoad)
                          : $(n).one("pageshow", function () {
                                refreshStatus();
                            })));
        })
        .on("resume", function () {
            void 0 !== currIp && (cloudSync(), showLoading("#weather,#footer-running"), updateController(updateWeather, networkFail));
        }) 
        .on("pause", function () {})
        .on("pagebeforeshow", function (e) {
            var t = "#" + e.target.id;
            "#start" == t || "#loadingPage" == t ? $("#header,#footer,#footer-menu").hide() : $("#header,#footer,#footer-menu").show(),
                storage.get("showDisabled", function (e) {
                    e.showDisabled && "true" === e.showDisabled ? $(t).addClass("show-hidden").find(".station-hidden").show() : $(t).removeClass("show-hidden").find(".station-hidden").hide();
                });
        })
        .on("pageshow", function (e) {
            var t,
                n,
                e = "#" + e.target.id,
                i = $(e);
            goingBack ? (goingBack = !1) : pageHistoryCount++,
                fixInputClick(i),
                isControllerConnected() &&
                    "#site-control" != e &&
                    "#start" != e &&
                    "#loadingPage" != e &&
                    ((t = setInterval(function () {
                        refreshStatus();
                    }, 5e3)),
                    checkOSVersion(216) || (n = setInterval(refreshData, 2e4)),
                    i.one("pagehide", function () {
                        clearInterval(t), clearInterval(n);
                    }));
        })
        .on("popupafteropen", function () {
            if ($(".ui-overlay-b:not(.ui-screen-hidden)").length)
                try {
                    StatusBar.backgroundColorByHexString(statusBarOverlay);
                } catch (e) {}
        })
        .on("popupafterclose", function () {
            $(".ui-page-active").children().add("#sprinklers-settings").removeClass("blur-filter");
            try {
                StatusBar.backgroundColorByHexString(statusBarPrimary);
            } catch (e) {}
        })
        .on("popupbeforeposition", function () {
            $(".ui-page-active").children().add("#sprinklers-settings").addClass("blur-filter");
        })
        .on("popupbeforeposition", "#localization", checkCurrLang)
        .one("pagebeforeshow", "#loadingPage", initApp);
var showSites = (function () {
    function t() {
        function t() {
            e.eq(0).hide(), $("#header").show(), $("#footer, #footer-menu").hide();
        }
        o.hasClass("ui-page-active")
            ? t()
            : o.one("pagebeforeshow", function (e) {
                  e.stopImmediatePropagation(), t();
              }),
            o.on("swiperight swipeleft", function (e) {
                e.stopImmediatePropagation();
            }),
            (document.title = "OpenSprinkler");
    }
    var m,
        e,
        i,
        o = $("<div data-role='page' id='site-control'><div class='ui-content'></div></div>"),
        n = $(
            "<div data-role='popup' id='addsite' data-theme='b'><ul data-role='listview'><li data-icon='false'><a href='#' id='site-add-scan'>" +
                _("Scan For Device") +
                "</a></li><li data-icon='false'><a href='#' id='site-add-manual'>" +
                _("Manually Add Device") +
                "</a></li></ul></div>"
        );
    function g() {
        storage.get(["sites", "current_site", "cloudToken"], function (p) {
            if (((m = parseSites(p.sites)), $.isEmptyObject(m))) {
                if ("string" != typeof p.cloudToken) return void changePage("#start");
                t(), o.find(".ui-content").html("<p class='center'>" + _("Please add a site by tapping the 'Add' button in the top right corner.") + "</p>");
            } else {
                var h = "<div data-role='collapsible-set'>",
                    f = [],
                    n = 0;
                (i = Object.keys(m).length),
                    (isControllerConnected() && i && p.current_site in m) || t(),
                    (m = sortObj(m)),
                    $.each(m, function (e, t) {
                        f.push(e),
                            (e = htmlEscape(e)),
                            (h +=
                                "<fieldset " +
                                (1 === i ? "data-collapsed='false'" : "") +
                                " id='site-" +
                                n +
                                "' data-role='collapsible'><h3><a class='ui-btn ui-btn-corner-all connectnow yellow' data-site='" +
                                n +
                                "' href='#'>" +
                                _("connect") +
                                "</a>" +
                                e +
                                "</h3><form data-site='" +
                                n +
                                "' novalidate><div class='ui-field-contain'><label for='cnm-" +
                                n +
                                "'>" +
                                _("Change Name") +
                                "</label><input id='cnm-" +
                                n +
                                "' type='text' value='" +
                                e +
                                "'></div>" +
                                (t.os_token
                                    ? ""
                                    : "<div class='ui-field-contain'><label for='cip-" +
                                      n +
                                      "'>" +
                                      _("Change IP") +
                                      "</label><input id='cip-" +
                                      n +
                                      "' type='url' value='" +
                                      t.os_ip +
                                      "' autocomplete='off' autocorrect='off' autocapitalize='off' pattern='' spellcheck='false'></div>") +
                                (t.os_token
                                    ? "<div class='ui-field-contain'><label for='ctoken-" +
                                      n +
                                      "'>" +
                                      _("Change Token") +
                                      "</label><input id='ctoken-" +
                                      n +
                                      "' type='text' value='" +
                                      t.os_token +
                                      "' autocomplete='off' autocorrect='off' autocapitalize='off' pattern='' spellcheck='false'></div>"
                                    : "") +
                                "<div class='ui-field-contain'><label for='cpw-" +
                                n +
                                "'>" +
                                _("Change Password") +
                                "</label><input id='cpw-" +
                                n +
                                "' type='password'></div>" +
                                (t.os_token
                                    ? ""
                                    : "<fieldset data-mini='true' data-role='collapsible'><h3><span style='line-height:23px'>" +
                                      _("Advanced") +
                                      "</span><button data-helptext='" +
                                      _("These options are only for an OpenSprinkler behind a proxy capable of SSL and/or Basic Authentication.") +
                                      "' class='collapsible-button-right help-icon btn-no-border ui-btn ui-icon-info ui-btn-icon-notext'></button></h3><label for='usessl-" +
                                      n +
                                      "'><input data-mini='true' type='checkbox' id='usessl-" +
                                      n +
                                      "' name='usessl-" +
                                      n +
                                      "'" +
                                      (void 0 !== t.ssl && "1" === t.ssl ? " checked='checked'" : "") +
                                      ">" +
                                      _("Use SSL") +
                                      "</label><label for='useauth-" +
                                      n +
                                      "'><input class='useauth' data-user='" +
                                      t.auth_user +
                                      "' data-pw='" +
                                      t.auth_pw +
                                      "' data-mini='true' type='checkbox' id='useauth-" +
                                      n +
                                      "' name='useauth-" +
                                      n +
                                      "'" +
                                      (void 0 !== t.auth_user && void 0 !== t.auth_pw ? " checked='checked'" : "") +
                                      ">" +
                                      _("Use Auth") +
                                      "</label></fieldset>") +
                                "<input class='submit' type='submit' value='" +
                                _("Save Changes to") +
                                " " +
                                e +
                                "'><a data-role='button' class='deletesite' data-site='" +
                                n +
                                "' href='#' data-theme='b'>" +
                                _("Delete") +
                                " " +
                                e +
                                "</a></form></fieldset>"),
                            testSite(t, n, function (e, t) {
                                o.find("#site-" + e + " .connectnow")
                                    .removeClass("yellow")
                                    .addClass(t ? "green" : "red");
                            }),
                            n++;
                    }),
                    (h = $(h + "</div>")).find("form").one("change input", function () {
                        $(this).find(".submit").addClass("hasChanges");
                    }),
                    h.find(".connectnow").on("click", function () {
                        return updateSite(f[$(this).data("site")]), !1;
                    }),
                    h.find(".help-icon").on("click", showHelpText),
                    h.find(".useauth").on("change", function () {
                        var e,
                            t,
                            n = $(this);
                        n.is(":checked")
                            ? ((e = $(
                                  "<div data-role='popup' data-theme='a'><form method='post' class='ui-content' novalidate><label for='auth_user'>" +
                                      _("Username:") +
                                      "</label><input autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' type='text' name='auth_user' id='auth_user'><label for='auth_pw'>" +
                                      _("Password:") +
                                      "</label><input type='password' name='auth_pw' id='auth_pw'><input type='submit' class='submit' value='" +
                                      _("Submit") +
                                      "'></form></div>"
                              ).enhanceWithin()),
                              (t = !1),
                              e.find(".submit").on("click", function () {
                                  return n.data({ user: e.find("#auth_user").val(), pw: e.find("#auth_pw").val() }), (t = !0), e.popup("close"), !1;
                              }),
                              e.one("popupafterclose", function () {
                                  t || n.attr("checked", !1).checkboxradio("refresh");
                              }),
                              openPopup(e))
                            : n.data({ user: "", pw: "" });
                    }),
                    h.find("form").on("submit", function () {
                        var e = $(this),
                            t = e.data("site"),
                            n = f[t],
                            i = h.find("#cip-" + t).val(),
                            o = h.find("#cpw-" + t).val(),
                            a = h.find("#cnm-" + t).val(),
                            s = h.find("#useauth-" + t).is(":checked"),
                            r = h.find("#usessl-" + t).is(":checked") ? "1" : void 0,
                            l = h.find("#useauth-" + t).data("user"),
                            t = h.find("#useauth-" + t).data("pw"),
                            c = ("" !== i && i !== m[n].os_ip) || r !== m[n].ssl || l !== m[n].auth_user || t !== m[n].auth_pw,
                            d = n === p.current_site,
                            u = "" !== a && a !== n;
                        return (
                            e.find(".submit").removeClass("hasChanges"),
                            s ? ((m[n].auth_user = l), (m[n].auth_pw = t)) : (delete m[n].auth_user, delete m[n].auth_pw),
                            "1" === r ? (m[n].ssl = r) : delete m[n].ssl,
                            "" !== i && i !== m[n].os_ip && (m[n].os_ip = i),
                            "" !== o && o !== m[n].os_pw && (isMD5(m[n].os_pw) && (o = md5(o)), (m[n].os_pw = o)),
                            u && ((m[a] = m[n]), delete m[n], (n = a), d && (storage.set({ current_site: n }), (p.current_site = n)), updateSiteList(Object.keys(m), p.current_site)),
                            storage.set({ sites: JSON.stringify(m) }, cloudSaveSites),
                            showerror(_("Site updated successfully")),
                            n === p.current_site && ("" !== o && (currPass = o), c) && checkConfigured(),
                            u && !e.find(".submit").hasClass("preventUpdate") && g(),
                            !1
                        );
                    }),
                    h.find(".deletesite").on("click", function () {
                        var e = f[$(this).data("site")];
                        return (
                            areYouSure(_("Are you sure you want to delete ") + e + "?", "", function () {
                                $("#site-selector").val() === e && t(),
                                    delete m[e],
                                    storage.set({ sites: JSON.stringify(m) }, function () {
                                        return (
                                            cloudSaveSites(),
                                            updateSiteList(Object.keys(m), p.current_site),
                                            $.isEmptyObject(m)
                                                ? storage.get("cloudToken", function () {
                                                      (null !== p.cloudToken && void 0 !== p.cloudToken) || ((currPass = currIp = ""), changePage("#start"));
                                                  })
                                                : (g(), showerror(_("Site deleted successfully"))),
                                            !1
                                        );
                                    });
                            }),
                            !1
                        );
                    }),
                    o.find(".ui-content").html(h.enhanceWithin());
            }
            "string" == typeof p.cloudToken && o.find(".ui-content").prepend(addSyncStatus(p.cloudToken));
        });
    }
    return (
        n.find("#site-add-scan").on("click", function () {
            return n.popup("close"), startScan(), !1;
        }),
        n.find("#site-add-manual").on("click", function () {
            return showAddNew(!1, !0), !1;
        }),
        o.on("pagehide", function () {
            n.popup("destroy").detach(), o.detach();
        }),
        $("html").on("siterefresh", function () {
            o.hasClass("ui-page-active") && g();
        }),
        function () {
            (e = changeHeader({
                title: _("Manage Sites"),
                animate: !!isControllerConnected(),
                leftBtn: {
                    icon: "carat-l",
                    text: _("Back"),
                    class: "ui-toolbar-back-btn",
                    on: function () {
                        o.find(".hasChanges").addClass("preventUpdate"), checkChangesBeforeBack();
                    },
                },
                rightBtn: {
                    icon: "plus",
                    text: _("Add"),
                    on: function () {
                        void 0 === deviceip ? showAddNew() : n.popup("open").popup("reposition", { positionTo: e.eq(2) });
                    },
                },
            })),
                g(),
                $.mobile.pageContainer.append(n),
                n.popup({ history: !1, positionTo: e.eq(2) }).enhanceWithin(),
                $("#site-control").remove(),
                $.mobile.pageContainer.append(o);
        }
    );
})();
function addSyncStatus(e) {
    e = $(
        "<div class='ui-bar smaller ui-bar-a ui-corner-all logged-in-alert'><div class='inline ui-btn ui-icon-recycle btn-no-border ui-btn-icon-notext ui-mini'></div><div class='inline syncStatus'>" +
            _("Synced with OpenSprinkler.com") +
            " (" +
            getTokenUser(e) +
            ")</div><div class='inline ui-btn ui-icon-delete btn-no-border ui-btn-icon-notext ui-mini logout'></div></div>"
    );
    return (
        e.find(".logout").on("click", logout),
        e.find(".ui-icon-recycle").on("click", function () {
            var e = $(this);
            e.addClass("spin"),
                cloudSync(function () {
                    e.removeClass("spin");
                });
        }),
        e
    );
}
function testSite(t, e, n) {
    var i = "/jo?pw=" + encodeURIComponent(t.os_pw),
        i = t.os_token ? "https://cloud.openthings.io/forward/v1/" + t.os_token + i : ("1" === t.ssl ? "https://" : "http://") + t.os_ip + i;
    $.ajax({
        url: i,
        type: "GET",
        dataType: "json",
        beforeSend: function (e) {
            void 0 !== t.auth_user && void 0 !== t.auth_pw && e.setRequestHeader("Authorization", "Basic " + btoa(t.auth_user + ":" + t.auth_pw));
        },
    }).then(
        function () {
            n(e, !0);
        },
        function () {
            n(e, !1);
        }
    );
}
function updateSiteList(e, t) {
    var n = "",
        i = $("#site-selector");
    $.each(e, function () {
        n += "<option " + (this.toString() === t ? "selected " : "") + "value='" + htmlEscape(this) + "'>" + this + "</option>";
    }),
        $("#info-list").find("li[data-role='list-divider']").text(t),
        i.html(n),
        i.parent().parent().hasClass("ui-select") && i.selectmenu("refresh");
}
function updateSite(t) {
    storage.get("sites", function (e) {
        e = parseSites(e.sites);
        t in e &&
            closePanel(function () {
                storage.set({ current_site: t }, checkConfigured);
            });
    });
}
function findLocalSiteName(e, t) {
    for (var n in e) if (e.hasOwnProperty(n) && -1 !== currIp.indexOf(e[n].os_ip)) return void t(n);
    t(!1);
}
function updateDeviceIP(t) {
    function n(e) {
        (deviceip = e), "function" == typeof t && t(e);
    }
    var i;
    try {
        networkinterface.getWiFiIPAddress(function (e) {
            (i = e.ip), n(i);
        });
    } catch (e) {
        findRouter(function (e, t) {
            n(e ? t : void 0);
        });
    }
}
function isLocalIP(e) {
    e = parseIntArray(e.split("."));
    return 10 === e[0] || 127 === e[0] || (172 === e[0] && 17 < e[1] && e[1] < 32) || (192 === e[0] && 168 === e[1]);
}
function startScan(e, t) {
    var n,
        i,
        o,
        a,
        s,
        r,
        l,
        c,
        d = deviceip.split("."),
        u = 1,
        p = 0,
        h = "",
        f = "",
        m = [],
        g = !1;
    for (
        t = t || 0,
            e = "number" == typeof e ? e : 80,
            storage.get("sites", function (e) {
                var t,
                    n = parseSites(e.sites);
                for (t in n) n.hasOwnProperty(t) && m.push(n[t].os_ip);
            }),
            i = function () {
                u++;
            },
            o = function (e) {
                u++;
                var t,
                    n = $.mobile.path.parseUrl(this.url).authority;
                if (-1 === $.inArray(n, m)) {
                    if ("text" === this.dataType) {
                        if (!(t = e.match(/var\s*ver=(\d+)/))) return;
                        t = t[1];
                    } else {
                        if (!e.hasOwnProperty("fwv")) return;
                        t = e.fwv;
                    }
                    p++, (h += "<li><a class='ui-btn ui-btn-icon-right ui-icon-carat-r' href='#' data-ip='" + n + "'>" + n + "<p>" + _("Firmware") + ": " + getOSVersion(t) + "</p></a></li>");
                }
            },
            s = function () {
                if (!0 === g) return $.mobile.loading("hide"), clearInterval(r), !1;
                245 === u &&
                    ($.mobile.loading("hide"),
                    clearInterval(r),
                    p
                        ? ((h = $(h)).find("a").on("click", function () {
                              return addFound($(this).data("ip")), !1;
                          }),
                          showSiteSelect(h))
                        : 0 === t
                        ? startScan(8080, 1)
                        : 1 === t
                        ? startScan(80, 2)
                        : 2 === t
                        ? startScan(8080, 3)
                        : showerror(_("No new devices were detected on your network")));
            },
            d.pop(),
            a = d.join("."),
            0 === t ? (c = _("Scanning for OpenSprinkler")) : 1 === t ? (c = _("Scanning for OpenSprinkler Pi")) : 2 === t ? (c = _("Scanning for OpenSprinkler (1.8.3)")) : 3 === t && (c = _("Scanning for OpenSprinkler Pi (1.8.3)")),
            $.mobile.loading("show", { html: "<h1>" + c + "</h1><p class='cancel tight center inline-icon'><span class='btn-no-border ui-btn ui-icon-delete ui-btn-icon-notext'></span>" + _("Cancel") + "</p>", textVisible: !0, theme: "b" }),
            $(".ui-loader")
                .find(".cancel")
                .one("click", function () {
                    g = !0;
                }),
            n = 1;
        n <= 244;
        n++
    )
        (d = a + "." + n), (l = t < 2 ? ((f = "/jo"), "json") : "text"), $.ajax({ url: "http://" + d + (e && 80 !== e ? ":" + e : "") + f, type: "GET", dataType: l, timeout: 6e3, global: !1, error: i, success: o });
    r = setInterval(s, 200);
}
function findRouter(e) {
    e = e || function () {};
    function t(e, t) {
        s++, !0 === e && (i = t);
    }
    for (
        var n,
            i,
            o = [
                "192.168.1.1",
                "10.0.1.1",
                "192.168.1.220",
                "192.168.2.1",
                "10.1.1.1",
                "192.168.11.1",
                "192.168.0.1",
                "192.168.0.30",
                "192.168.0.50",
                "192.168.10.1",
                "192.168.20.1",
                "192.168.30.1",
                "192.168.62.1",
                "192.168.102.1",
                "192.168.1.254",
                "192.168.0.227",
                "10.0.0.138",
                "192.168.123.254",
                "192.168.4.1",
                "10.0.0.2",
                "10.0.2.1",
                "10.0.3.1",
                "10.0.4.1",
                "10.0.5.1",
            ],
            a = o.length,
            s = 0,
            r = 0;
        r < a;
        r++
    )
        "string" != typeof i && ping(o[r], t);
    n = setInterval(function () {
        (s !== a && "string" != typeof i) || (clearInterval(n), "string" == typeof i ? e(!0, i) : e(!1));
    }, 50);
}
function ping(t, n) {
    (n = n || function () {}),
        (t && "" !== t) || n(!1),
        $.ajax({ url: "http://" + t, type: "GET", timeout: 6e3, global: !1 }).then(
            function () {
                n(!0, t);
            },
            function (e) {
                "timeout" === e.statusText ? n(!1) : n(!0, t);
            }
        );
}
function addFound(e) {
    $("#site-select")
        .one("popupafterclose", function () {
            showAddNew(e);
        })
        .popup("close");
}
function showZimmermanAdjustmentOptions(t, n) {
    $(".ui-popup-active").find("[data-role='popup']").popup("close");
    function i(e, t) {
        var e = a.find(".inputs input").eq(e),
            n = parseInt(e.val());
        (-1 === t && 0 === n) || (1 === t && 100 === n) || e.val(n + t);
    }
    var e = $.extend({}, { h: 100, t: 100, r: 100, bh: 30, bt: 70, br: 0 }, unescapeJSON(t.value)),
        o = checkOSVersion(2162),
        a =
            (isMetric && ((e.bt = Math.round(((5 * (e.bt - 32)) / 9) * 10) / 10), (e.br = Math.round(25.4 * e.br * 10) / 10)),
            $(
                "<div data-role='popup' data-theme='a' id='adjustmentOptions'><div data-role='header' data-theme='b'><h1>" +
                    _("Weather Adjustment Options") +
                    "</h1></div><div class='ui-content'><p class='rain-desc center smaller'>" +
                    _("Set the baseline weather conditions for your location. ") +
                    _("The Zimmerman method will adjust the watering duration based on differences from this reference point.") +
                    "</p><div class='ui-grid-b'><div class='ui-block-a'><label class='center'>" +
                    _("Temp") +
                    (isMetric ? " &#176;C" : " &#176;F") +
                    "</label><input data-wrapper-class='pad_buttons' class='bt' type='number' " +
                    (isMetric ? "min='-20' max='50'" : "min='0' max='120'") +
                    " value='" +
                    e.bt +
                    (o ? "'>" : "' disabled='disabled'>") +
                    "</div><div class='ui-block-b'><label class='center'>" +
                    _("Rain") +
                    (isMetric ? " mm" : ' "') +
                    "</label><input data-wrapper-class='pad_buttons' class='br' type='number' " +
                    (isMetric ? "min='0' max='25' step='0.1'" : "min='0' max='1' step='0.01'") +
                    " value='" +
                    e.br +
                    (o ? "'>" : "' disabled='disabled'>") +
                    "</div><div class='ui-block-c'><label class='center'>" +
                    _("Humidity") +
                    " %</label><input data-wrapper-class='pad_buttons' class='bh' type='number'  min='0' max='100' value='" +
                    e.bh +
                    (o ? "'>" : "' disabled='disabled'>") +
                    "</div></div><p class='rain-desc center smaller'>" +
                    _("Set the sensitivity of the watering adjustment to changes in each of the above weather conditions.") +
                    "</p><span><fieldset class='ui-grid-b incr'><div class='ui-block-a'><a href='#' data-role='button' data-mini='true' data-corners='true' data-icon='plus' data-iconpos='bottom'></a></div><div class='ui-block-b'><a href='#' data-role='button' data-mini='true' data-corners='true' data-icon='plus' data-iconpos='bottom'></a></div><div class='ui-block-c'><a href='#' data-role='button' data-mini='true' data-corners='true' data-icon='plus' data-iconpos='bottom'></a></div></fieldset><div class='ui-grid-b inputs'><div class='ui-block-a'><input data-wrapper-class='pad_buttons' class='t' type='number' min='0' max='100' value='" +
                    e.t +
                    "'></div><div class='ui-block-b'><input data-wrapper-class='pad_buttons' class='r' type='number'  min='0' max='100' value='" +
                    e.r +
                    "'></div><div class='ui-block-c'><input data-wrapper-class='pad_buttons' class='h' type='number'  min='0' max='100' value='" +
                    e.h +
                    "'></div></div><fieldset class='ui-grid-b decr'><div class='ui-block-a'><a href='#' data-role='button' data-mini='true' data-corners='true' data-icon='minus' data-iconpos='bottom'></a></div><div class='ui-block-b'><a href='#' data-role='button' data-mini='true' data-corners='true' data-icon='minus' data-iconpos='bottom'></a></div><div class='ui-block-c'><a href='#' data-role='button' data-mini='true' data-corners='true' data-icon='minus' data-iconpos='bottom'></a></div></fieldset></span><button class='submit' data-theme='b'>" +
                    _("Submit") +
                    "</button></div></div>"
            ));
    a.find(".submit").on("click", function () {
        var e = { h: parseInt(a.find(".h").val()), t: parseInt(a.find(".t").val()), r: parseInt(a.find(".r").val()) };
        return (
            o &&
                ($.extend(e, { bh: parseInt(a.find(".bh").val()), bt: parseFloat(a.find(".bt").val()), br: parseFloat(a.find(".br").val()) }), isMetric) &&
                ((e.bt = Math.round(100 * ((9 * e.bt) / 5 + 32)) / 100), (e.br = Math.round((e.br / 25.4) * 1e3) / 1e3)),
            t && (t.value = escapeJSON(e)),
            n(),
            a.popup("close"),
            !1
        );
    }),
        a
            .on("focus", "input[type='number']", function () {
                this.value = "";
            })
            .on("blur", "input[type='number']", function () {
                var e = parseFloat(this.min),
                    t = parseFloat(this.max);
                "" === this.value && (this.value = "0"), (this.value < e || this.value > t) && (this.value = this.value < e ? e : t);
            }),
        holdButton(a.find(".incr").children(), function (e) {
            e = $(e.currentTarget).index();
            return i(e, 1), !1;
        }),
        holdButton(a.find(".decr").children(), function (e) {
            e = $(e.currentTarget).index();
            return i(e, -1), !1;
        }),
        $("#adjustmentOptions").remove(),
        a.css("max-width", "380px"),
        openPopup(a, { positionTo: "window" });
}
function showAutoRainDelayAdjustmentOptions(e, t) {
    $(".ui-popup-active").find("[data-role='popup']").popup("close");
    function n(e) {
        var t = o.find("#delay_duration"),
            n = parseInt(t.val());
        (-1 === e && 0 === n) || (1 === e && 8760 === n) || t.val(n + e);
    }
    var i = $.extend({}, { d: 24 }, unescapeJSON(e.value)),
        o = $(
            "<div data-role='popup' data-theme='a' id='adjustmentOptions'><div data-role='header' data-theme='b'><h1>" +
                _("Weather Adjustment Options") +
                "</h1></div><div class='ui-content'><p class='rain-desc center smaller'>" +
                _("If the weather reports any condition suggesting rain, a rain delay is automatically issued using the below set delay duration.") +
                "</p><label class='center' for='delay_duration'>" +
                _("Delay Duration (hours)") +
                "</label><div class='input_with_buttons'><button class='decr ui-btn ui-btn-icon-notext ui-icon-carat-l btn-no-border'></button><input id='delay_duration' type='number' pattern='[0-9]*' value='" +
                i.d +
                "'><button class='incr ui-btn ui-btn-icon-notext ui-icon-carat-r btn-no-border'></button></div><button class='submit' data-theme='b'>" +
                _("Submit") +
                "</button></div></div>"
        );
    o.find(".submit").on("click", function () {
        return (i = { d: parseInt(o.find("#delay_duration").val()) }), e && (e.value = escapeJSON(i)), t(), o.popup("close"), !1;
    }),
        o
            .on("focus", "input[type='number']", function () {
                this.value = "";
            })
            .on("blur", "input[type='number']", function () {
                ("" === this.value || parseInt(this.value) < 0) && (this.value = "0");
            }),
        holdButton(o.find(".incr"), function () {
            return n(1), !1;
        }),
        holdButton(o.find(".decr"), function () {
            return n(-1), !1;
        }),
        $("#adjustmentOptions").remove(),
        o.css("max-width", "380px"),
        openPopup(o, { positionTo: "window" });
}
function showMonthlyAdjustmentOptions(n, i) {
    $(".ui-popup-active").find("[data-role='popup']").popup("close");
    var o = $.extend({}, { scales: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100] }, unescapeJSON(n.value)),
        a = $(
            "<div data-role='popup' data-theme='a' id='adjustmentOptions'><div data-role='header' data-theme='b'><h1>" +
                _("Weather Adjustment Options") +
                "</h1></div><div class='ui-content'><p class='rain-desc center smaller'>" +
                _("Input Monthly Watering Percentage Values") +
                "</p><div class='ui-grid-c'><div class='ui-block-a'><label class='center'>" +
                _("Jan") +
                "</label><input data-wrapper-class='pad_buttons' class='sc0' type='number' min=0 max=250 value=" +
                o.scales[0] +
                "></div><div class='ui-block-b'><label class='center'>" +
                _("Feb") +
                "</label><input data-wrapper-class='pad_buttons' class='sc1' type='number' min=0 max=250 value=" +
                o.scales[1] +
                "></div><div class='ui-block-c'><label class='center'>" +
                _("Mar") +
                "</label><input data-wrapper-class='pad_buttons' class='sc2' type='number' min=0 max=250 value=" +
                o.scales[2] +
                "></div><div class='ui-block-d'><label class='center'>" +
                _("Apr") +
                "</label><input data-wrapper-class='pad_buttons' class='sc3' type='number' min=0 max=250 value=" +
                o.scales[3] +
                "></div></div><div class='ui-grid-c'><div class='ui-block-a'><label class='center'>" +
                _("May") +
                "</label><input data-wrapper-class='pad_buttons' class='sc4' type='number' min=0 max=250 value=" +
                o.scales[4] +
                "></div><div class='ui-block-b'><label class='center'>" +
                _("Jun") +
                "</label><input data-wrapper-class='pad_buttons' class='sc5' type='number' min=0 max=250 value=" +
                o.scales[5] +
                "></div><div class='ui-block-c'><label class='center'>" +
                _("Jul") +
                "</label><input data-wrapper-class='pad_buttons' class='sc6' type='number' min=0 max=250 value=" +
                o.scales[6] +
                "></div><div class='ui-block-d'><label class='center'>" +
                _("Aug") +
                "</label><input data-wrapper-class='pad_buttons' class='sc7' type='number' min=0 max=250 value=" +
                o.scales[7] +
                "></div></div><div class='ui-grid-c'><div class='ui-block-a'><label class='center'>" +
                _("Sep") +
                "</label><input data-wrapper-class='pad_buttons' class='sc8' type='number' min=0 max=250 value=" +
                o.scales[8] +
                "></div><div class='ui-block-b'><label class='center'>" +
                _("Oct") +
                "</label><input data-wrapper-class='pad_buttons' class='sc9' type='number' min=0 max=250 value=" +
                o.scales[9] +
                "></div><div class='ui-block-c'><label class='center'>" +
                _("Nov") +
                "</label><input data-wrapper-class='pad_buttons' class='sc10' type='number' min=0 max=250 value=" +
                o.scales[10] +
                "></div><div class='ui-block-d'><label class='center'>" +
                _("Dec") +
                "</label><input data-wrapper-class='pad_buttons' class='sc11' type='number' min=0 max=250 value=" +
                o.scales[11] +
                "></div></div><button class='submit' data-theme='b'>" +
                _("Submit") +
                "</button></div></div>"
        );
    a.find(".submit").on("click", function () {
        for (var e = [], t = 0; t < 12; t++) (e[t] = parseInt(a.find(".sc" + t).val())), e[t] < 0 && (e[t] = 0), 250 < e[t] && (e[t] = 250);
        return (o = { scales: e }), n && (n.value = escapeJSON(o)), i(), a.popup("close"), !1;
    }),
        a
            .on("focus", "input[type='number']", function () {
                this.value = "";
            })
            .on("blur", "input[type='number']", function () {
                ("" === this.value || parseInt(this.value) < 0) && (this.value = "0");
            }),
        $("#adjustmentOptions").remove(),
        a.css("max-width", "380px"),
        openPopup(a, { positionTo: "window" });
}
function validateWULocation(e, t) {
    (controller.settings.wto && "string" == typeof controller.settings.wto.key && "" !== controller.settings.wto.key) || t(!1),
        $.ajax({ url: "https://api.weather.com/v2/pws/observations/hourly/7day?stationId=" + e + "&format=json&units=e&apiKey=" + controller.settings.wto.key, cache: !0 })
            .done(function (e) {
                !e || e.errors ? t(!1) : t(!0);
            })
            .fail(function () {
                t(!1);
            });
}
function showEToAdjustmentOptions(e, t) {
    $(".ui-popup-active").find("[data-role='popup']").popup("close");
    var n = $.extend({}, { baseETo: 0, elevation: 600 }, unescapeJSON(e.value)),
        i =
            (isMetric && ((n.baseETo = Math.round(25.4 * n.baseETo * 10) / 10), (n.elevation = Math.round(n.elevation / 3.28))),
            $(
                "<div data-role='popup' data-theme='a' id='adjustmentOptions'><div data-role='header' data-theme='b'><h1>" +
                    _("Weather Adjustment Options") +
                    "</h1></div><div class='ui-content'><p class='rain-desc center smaller'>" +
                    _("Set the baseline potential evapotranspiration (ETo) and elevation for your location. ") +
                    _("The ETo adjustment method will adjust the watering duration based on the difference between the baseline ETo and the current ETo.") +
                    "</p><div class='ui-grid-a'><div class='ui-block-a'><label class='center'>" +
                    _("Baseline ETo") +
                    (isMetric ? " (mm" : "(in") +
                    "/day)</label><input data-wrapper-class='pad_buttons' class='baseline-ETo' type='number' min='0' " +
                    (isMetric ? "max='25' step='0.1'" : "max='1' step='0.01'") +
                    " value='" +
                    n.baseETo +
                    "'></div><div class='ui-block-b'><label class='center'>" +
                    _("Elevation") +
                    (isMetric ? " (m)" : " (ft)") +
                    "</label><input data-wrapper-class='pad_buttons' class='elevation' type='number' step='1'" +
                    (isMetric ? "min='-400' max='9000'" : "min='-1400' max='30000'") +
                    " value='" +
                    n.elevation +
                    "'></div></div><button class='detect-baseline-eto'>" +
                    _("Detect baseline ETo") +
                    "</button><button class='submit' data-theme='b'>" +
                    _("Submit") +
                    "</button></div></div>"
            ));
    i.find(".submit").on("click", function () {
        return (
            (n = { baseETo: parseFloat(i.find(".baseline-ETo").val()), elevation: parseInt(i.find(".elevation").val()) }),
            isMetric && ((n.baseETo = Math.round((n.baseETo / 25.4) * 100) / 100), (n.elevation = Math.round(3.28 * n.elevation))),
            e && (e.value = escapeJSON(n)),
            t(),
            i.popup("close"),
            !1
        );
    }),
        i.find(".detect-baseline-eto").on("click", function () {
            var e = $(".detect-baseline-eto").html();
            return (
                showLoading(".detect-baseline-eto"),
                $.ajax({
                    url: WEATHER_SERVER_URL + "/baselineETo?loc=" + encodeURIComponent(controller.settings.loc),
                    contentType: "application/json; charset=utf-8",
                    success: function (e) {
                        e = e.eto;
                        isMetric && (e = Math.round(25.4 * e * 100) / 100), $(".baseline-ETo").val(e), window.alert("Detected baseline ETo for configured location is " + e + (isMetric ? "mm" : "in") + "/day");
                    },
                    error: function (e, t) {
                        e = "Unable to detect baseline ETo: " + (e.status ? e.responseText + "(" + e.status + ")" : t);
                        window.alert(e), window.console.error(e);
                    },
                    complete: function () {
                        $(".detect-baseline-eto").html(e);
                    },
                }),
                !1
            );
        }),
        i
            .on("focus", "input[type='number']", function () {
                this.value = "";
            })
            .on("blur", "input[type='number']", function () {
                var e = parseFloat(this.min),
                    t = parseFloat(this.max);
                "" === this.value && (this.value = "0"), (this.value < e || this.value > t) && (this.value = this.value < e ? e : t);
            }),
        $("#adjustmentOptions").remove(),
        i.css("max-width", "380px"),
        openPopup(i, { positionTo: "window" });
}
function formatTemp(e) {
    return (e = isMetric ? Math.round((5 / 9) * (e - 32) * 10) / 10 + " &#176;C" : Math.round(10 * e) / 10 + " &#176;F");
}
function formatPrecip(e) {
    return (e = isMetric ? Math.round(25.4 * e * 10) / 10 + " mm" : Math.round(100 * e) / 100 + " in");
}
function formatHumidity(e) {
    return Math.round(e) + " %";
}
function formatSpeed(e) {
    return (e = isMetric ? Math.round(1.6 * e * 10) / 10 + " km/h" : Math.round(10 * e) / 10 + " mph");
}
function hideWeather() {
    $("#weather").empty().parents(".info-card").addClass("noweather");
}
function finishWeatherUpdate() {
    updateWeatherBox(), $.mobile.document.trigger("weatherUpdateComplete");
}
function updateWeather() {
    var e = new Date().getTime();
    if (weather && weather.providedLocation === controller.settings.loc && e - weather.lastUpdated < 36e4) finishWeatherUpdate();
    else {
        if (localStorage.weatherData)
            try {
                var t = JSON.parse(localStorage.weatherData);
                if (t.providedLocation === controller.settings.loc && e - t.lastUpdated < 36e4) return (weather = t), void finishWeatherUpdate();
            } catch (e) {}
        (weather = void 0),
            "" === controller.settings.loc
                ? hideWeather()
                : (showLoading("#weather"),
                  $.ajax({
                      url: WEATHER_SERVER_URL + "/weatherData?loc=" + encodeURIComponent(controller.settings.loc),
                      contentType: "application/json; charset=utf-8",
                      success: function (e) {
                          ("object" != typeof e
                              ? hideWeather
                              : ((currentCoordinates = e.location), ((weather = e).lastUpdated = new Date().getTime()), (e.providedLocation = controller.settings.loc), (localStorage.weatherData = JSON.stringify(e)), finishWeatherUpdate))();
                      },
                  }));
    }
}
function checkURLandUpdateWeather() {
    function t(e) {
        (WEATHER_SERVER_URL = e ? currPrefix + e : DEFAULT_WEATHER_SERVER_URL), updateWeather();
    }
    return controller.settings.wsp
        ? "weather.opensprinkler.com" === controller.settings.wsp
            ? void t()
            : void t(controller.settings.wsp)
        : $.get(currPrefix + currIp + "/su").then(function (e) {
              e = e.match(/value="([\w|:|/|.]+)" name=wsp/);
              t(e ? e[1] : void 0);
          });
}
function updateWeatherBox() {
    $("#weather")
        .html(
            (controller.settings.rd ? "<div class='rain-delay red'><span class='icon ui-icon-alert'></span>Rain Delay<span class='time'>" + dateToString(new Date(1e3 * controller.settings.rdst), void 0, !0) + "</span></div>" : "") +
                "<div title='" +
                weather.description +
                "' class='wicon'><img src='https://openweathermap.org/img/w/" +
                weather.icon +
                ".png'></div><div class='inline tight'>" +
                formatTemp(weather.temp) +
                "</div><br><div class='inline location tight'>" +
                _("Current Weather") +
                "</div>" +
                ("object" == typeof weather.alert ? "<div><button class='tight help-icon btn-no-border ui-btn ui-icon-alert ui-btn-icon-notext ui-corner-all'></button>" + weather.alert.type + "</div>" : "")
        )
        .off("click")
        .on("click", function (e) {
            e = $(e.target);
            return (
                e.hasClass("rain-delay") || e.parents(".rain-delay").length
                    ? areYouSure(_("Do you want to turn off rain delay?"), "", function () {
                          showLoading("#weather"),
                              sendToOS("/cv?pw=&rd=0").done(function () {
                                  updateController(updateWeather);
                              });
                      })
                    : changePage("#forecast"),
                !1
            );
        })
        .parents(".info-card")
        .removeClass("noweather");
}
function coordsToLocation(e, t, a, s) {
    (s = s || e + "," + t),
        $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + e + "," + t + "&key=AIzaSyDaT_HTZwFojXmvYIhwWudK00vFXzMmOKc&result_type=locality|sublocality|administrative_area_level_1|country", function (e) {
            if (0 === e.results.length) a(s);
            else {
                (e = e.results), (s = e[0].formatted_address);
                var t,
                    n = !1;
                for (t in e)
                    if (e.hasOwnProperty(t) && (-1 < $.inArray("locality", e[t].types) || -1 < $.inArray("sublocality", e[t].types) || -1 < $.inArray("postal_code", e[t].types) || -1 < $.inArray("street_address", e[t].types))) {
                        n = !0;
                        break;
                    }
                if (!1 === n) a(s);
                else {
                    var i = "",
                        o = "",
                        n = !1;
                    for (t in (e = e[t].address_components))
                        e.hasOwnProperty(t) &&
                            !n &&
                            ("" === (i = "" === i && -1 < $.inArray("locality", e[t].types) ? e[t].long_name + ", " + i : i) && -1 < $.inArray("sublocality", e[t].types) && (i = e[t].long_name + ", " + i),
                            -1 < $.inArray("administrative_area_level_1", e[t].types) && ((i += e[t].long_name), (n = !0)),
                            -1 < $.inArray("country", e[t].types)) &&
                            (o = e[t].long_name);
                    n || (i += o), a(i);
                }
            }
        });
}
function getSunTimes(e) {
    e = e || new Date(1e3 * controller.settings.devt);
    var e = SunCalc.getTimes(e, currentCoordinates[0], currentCoordinates[1]),
        t = e.sunrise,
        e = e.sunset,
        n = getTimezoneOffset();
    return t.setUTCMinutes(t.getUTCMinutes() + n), e.setUTCMinutes(e.getUTCMinutes() + n), [(t = 60 * t.getUTCHours() + t.getUTCMinutes()), (e = 60 * e.getUTCHours() + e.getUTCMinutes())];
}
function makeAttribution(e) {
    if ("string" != typeof e) return "";
    var t = "<div class='weatherAttribution'>";
    switch (e) {
        case "Apple":
            t += _("Powered by Apple");
            break;
        case "DarkSky":
        case "DS":
            t += "<a href='https://darksky.net/poweredby/' target='_blank'>" + _("Powered by Dark Sky") + "</a>";
            break;
        case "OWM":
            t += "<a href='https://openweathermap.org/' target='_blank'>" + _("Powered by OpenWeather") + "</a>";
            break;
        case "WUnderground":
        case "WU":
            t += "<a href='https://wunderground.com/' target='_blank'>" + _("Powered by Weather Underground") + "</a>";
            break;
        case "local":
            t += _("Powered by your Local PWS");
            break;
        case "Manual":
            t += _("Using manual watering");
            break;
        default:
            t += _("Unrecognised weather provider");
    }
    return t + "</div>";
}
function showForecast() {
    var e = $("<div data-role='page' id='forecast'><div class='ui-content' role='main'><ul data-role='listview' data-inset='true'>" + makeForecast() + "</ul>" + makeAttribution(weather.wp || weather.weatherProvider) + "</div></div>");
    changeHeader({
        title: _("Forecast"),
        leftBtn: { icon: "carat-l", text: _("Back"), class: "ui-toolbar-back-btn", on: goBack },
        rightBtn: {
            icon: "refresh",
            text: _("Refresh"),
            on: function () {
                $.mobile.loading("show"),
                    $.mobile.document.one("weatherUpdateComplete", function () {
                        $.mobile.loading("hide");
                    }),
                    updateWeather();
            },
        },
    }),
        e.one("pagehide", function () {
            e.remove();
        }),
        e.find(".alert").on("click", function () {
            openPopup(
                $(
                    "<div data-role='popup' data-theme='a'><div data-role='header' data-theme='b'><h1>" +
                        weather.alert.name +
                        "</h1></div><div class='ui-content'><span style='white-space: pre-wrap'>" +
                        $.trim(weather.alert.message) +
                        "</span></div></div>"
                )
            );
        }),
        $("#forecast").remove(),
        $.mobile.pageContainer.append(e);
}
function makeForecast() {
    var e,
        t,
        n,
        i = "",
        o = controller.settings.sunrise || getSunTimes()[0],
        a = controller.settings.sunset || getSunTimes()[1],
        s = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    for (
        i +=
            "<li data-icon='false' class='center'><div>" +
            _("Now") +
            "</div><br><div title='" +
            weather.description +
            "' class='wicon'><img src='https://openweathermap.org/img/w/" +
            weather.icon +
            ".png'></div><span>" +
            formatTemp(weather.temp) +
            "</span><br><span>" +
            _("Sunrise") +
            "</span><span>: " +
            pad(parseInt(o / 60) % 24) +
            ":" +
            pad(o % 60) +
            "</span> <span>" +
            _("Sunset") +
            "</span><span>: " +
            pad(parseInt(a / 60) % 24) +
            ":" +
            pad(a % 60) +
            "</span></li>",
            e = 1;
        e < weather.forecast.length;
        e++
    )
        (o = (n = getSunTimes((t = new Date(1e3 * weather.forecast[e].date))))[0]),
            (a = n[1]),
            (i +=
                "<li data-icon='false' class='center'><div>" +
                t.toLocaleDateString() +
                "</div><br><div title='" +
                weather.forecast[e].description +
                "' class='wicon'><img src='https://openweathermap.org/img/w/" +
                weather.forecast[e].icon +
                ".png'></div><span>" +
                _(s[t.getDay()]) +
                "</span><br><span>" +
                _("Low") +
                "</span><span>: " +
                formatTemp(weather.forecast[e].temp_min) +
                "  </span><span>" +
                _("High") +
                "</span><span>: " +
                formatTemp(weather.forecast[e].temp_max) +
                "</span><br><span>" +
                _("Sunrise") +
                "</span><span>: " +
                pad(parseInt(o / 60) % 24) +
                ":" +
                pad(o % 60) +
                "</span> <span>" +
                _("Sunset") +
                "</span><span>: " +
                pad(parseInt(a / 60) % 24) +
                ":" +
                pad(a % 60) +
                "</span></li>");
    return i;
}
function overlayMap(n) {
    $("#location-list").popup("destroy").remove(), $.mobile.loading("show"), (n = n || function () {});
    function i(t) {
        function n(e) {
            clearTimeout(i), $.mobile.loading("hide"), e || showerror(_("Unable to retrieve your current location")), t(e);
        }
        var i;
        t =
            t ||
            function (e) {
                e && s.get(0).contentWindow.postMessage({ type: "currentLocation", payload: { lat: e.coords.latitude, lon: e.coords.longitude } }, "*");
            };
        try {
            (i = setTimeout(function () {
                $.mobile.loading("show", { html: "<div class='logo'></div><h1 style='padding-top:5px'>" + _("Attempting to retrieve your current location") + "</h1></p>", textVisible: !0, theme: "b" });
            }, 100)),
                navigator.geolocation.getCurrentPosition(
                    function (e) {
                        clearTimeout(i), n(e);
                    },
                    function () {
                        n(!1);
                    },
                    { timeout: 1e4 }
                );
        } catch (e) {
            n(!1);
        }
    }
    function o(e, t) {
        var n = $("#wtkey").val();
        "" !== n &&
            $.ajax({ url: "https://api.weather.com/v3/location/near?format=json&product=pws&apiKey=" + n + "&geocode=" + encodeURIComponent(e) + "," + encodeURIComponent(t), cache: !0 }).done(function (n) {
                var i = [];
                n.location.stationId.forEach(function (e, t) {
                    i.push({ id: e, lat: n.location.latitude[t], lon: n.location.longitude[t], message: n.location.stationId[t] });
                }),
                    0 < i.length && ((i = encodeURIComponent(JSON.stringify(i))), s.get(0).contentWindow.postMessage({ type: "pwsData", payload: i }, "*"));
            });
    }
    var a = $(
            "<div data-role='popup' id='location-list' data-theme='a' style='background-color:rgb(229, 227, 223);'><a href='#' data-rel='back' class='ui-btn ui-corner-all ui-shadow ui-btn-b ui-icon-delete ui-btn-icon-notext ui-btn-right'>" +
                _("Close") +
                "</a><iframe style='border:none' src='" +
                getAppURLPath() +
                "map.html' width='100%' height='100%' seamless=''></iframe></div>"
        ),
        s = a.find("iframe"),
        e = $("#loc").val(),
        t = { lat: (e.match(regex.gps) ? e.split(",") : currentCoordinates)[0], lon: (e.match(regex.gps) ? e.split(",") : currentCoordinates)[1] },
        r = !1;
    $.mobile.window.off("message onmessage").on("message onmessage", function (e) {
        var t,
            e = e.originalEvent.data;
        void 0 !== e.WS
            ? ((t = e.WS.split(",")), n(1 < t.length ? t : e.WS, e.station), (r = !0), a.popup("destroy").remove())
            : !0 === e.loaded
            ? $.mobile.loading("hide")
            : "object" == typeof e.location
            ? o(e.location[0], e.location[1])
            : !0 === e.dismissKeyboard
            ? document.activeElement.blur()
            : !0 === e.getLocation && i();
    }),
        s.one("load", function () {
            0 === t.lat && 0 === t.lon && i(), this.contentWindow.postMessage({ type: "startLocation", payload: { start: t } }, "*");
        }),
        a.one("popupafterclose", function () {
            !1 === r && n(!1);
        }),
        openPopup(a, {
            beforeposition: function () {
                a.css({ width: window.innerWidth - 36, height: window.innerHeight - 28 });
            },
            x: 0,
            y: 0,
        }),
        o(t.lat, t.lon);
}
var rebootReasons = {
        0: _("None"),
        1: _("Factory Reset"),
        2: _("Reset Button"),
        3: _("WiFi Change"),
        4: _("Web Request"),
        5: _("Web Request"),
        6: _("WiFi Configure"),
        7: _("Firmware Update"),
        8: _("Weather Failure"),
        9: _("Network Failure"),
        10: _("Clock Update"),
        99: _("Power On"),
    },
    weatherErrors = {
        "-4": _("Empty Response"),
        "-3": _("Timed Out"),
        "-2": _("Connection Failed"),
        "-1": _("No Response"),
        0: _("Success"),
        1: _("Weather Data Error"),
        10: _("Building Weather History"),
        11: _("Weather Provider Response Incomplete"),
        12: _("Weather Provider Request Failed"),
        2: _("Location Error"),
        20: _("Location Request Error"),
        21: _("Location Not Found"),
        22: _("Invalid Location Format"),
        3: _("PWS Error"),
        30: _("Invalid WUnderground PWS"),
        31: _("Invalid WUnderground Key"),
        32: _("WUnderground Authentication Error"),
        33: _("Unsupported WUnderground Method"),
        34: _("No WUnderground PWS Provided"),
        4: _("Adjustment Method Error"),
        40: _("Unsupported Adjustment Method"),
        41: _("No Adjustment Method Provided"),
        5: _("Adjustment Options Error"),
        50: _("Corrupt Adjustment Options"),
        51: _("Missing Adjustment Option"),
        99: _("Unexpected Error"),
    };
function getRebootReason(e) {
    return e in rebootReasons ? rebootReasons[e] : _("Unrecognised") + " (" + e + ")";
}
function getWeatherError(e) {
    var t = Math.floor(e / 10);
    return e in weatherErrors ? weatherErrors[e] : e <= 59 && 10 <= e && t in weatherErrors ? weatherErrors[t] : _("Unrecognised") + " (" + e + ")";
}
function getWeatherStatus(e) {
    return e < 0 ? "<font class='debugWUError'>" + _("Offline") + "</font>" : 0 < e ? "<font class='debugWUError'>" + _("Error") + "</font>" : "<font class='debugWUOK'>" + _("Online") + "</font>";
}
function getWiFiRating(e) {
    return _(e < -80 ? "Unuseable" : e < -70 ? "Poor" : e < -60 ? "Fair" : e < -50 ? "Good" : "Excellent");
}
function debugWU() {
    var e = "<div data-role='popup' id='debugWU' class='ui-content ui-page-theme-a'>";
    return (
        (e +=
            "<div class='debugWUHeading'>System Status</div><table class='debugWUTable'>" +
            ("number" == typeof controller.settings.lupt ? "<tr><td>" + _("Last Reboot") + "</td><td>" + (controller.settings.lupt < 1e3 ? "--" : dateToString(new Date(1e3 * controller.settings.lupt), null, 2)) + "</td></tr>" : "") +
            ("number" == typeof controller.settings.lrbtc ? "<tr><td>" + _("Reboot Reason") + "</td><td>" + getRebootReason(controller.settings.lrbtc) + "</td></tr>" : "") +
            ("number" == typeof controller.settings.RSSI ? "<tr><td>" + _("WiFi Strength") + "</td><td>" + getWiFiRating(controller.settings.RSSI) + "</td></tr>" : "") +
            ("number" == typeof controller.settings.wterr ? "<tr><td>" + _("Weather Service") + "</td><td>" + getWeatherStatus(controller.settings.wterr) + "</td></tr>" : "") +
            "</table><div class='debugWUHeading'>Watering Level</div><table class='debugWUTable'>" +
            (void 0 !== controller.options.uwt ? "<tr><td>" + _("Method") + "</td><td>" + getAdjustmentMethod(controller.options.uwt).name + "</td></tr>" : "") +
            (void 0 !== controller.options.wl ? "<tr><td>" + _("Watering Level") + "</td><td>" + controller.options.wl + " %</td></tr>" : "") +
            ("number" == typeof controller.settings.lswc
                ? "<tr><td>" + _("Last Updated") + "</td><td>" + (0 === controller.settings.lswc ? _("Never") : humaniseDuration(1e3 * controller.settings.devt, 1e3 * controller.settings.lswc)) + "</td></tr>"
                : "") +
            "</table><div class='debugWUHeading'>Weather Service Details</div><div class='debugWUScrollable'><table class='debugWUTable'>"),
        "object" == typeof controller.settings.wtdata &&
            0 < Object.keys(controller.settings.wtdata).length &&
            (e +=
                (void 0 !== controller.settings.wtdata.h ? "<tr><td>" + _("Mean Humidity") + "</td><td>" + formatHumidity(controller.settings.wtdata.h) + "</td></tr>" : "") +
                (void 0 !== controller.settings.wtdata.t ? "<tr><td>" + _("Mean Temp") + "</td><td>" + formatTemp(controller.settings.wtdata.t) + "</td></tr>" : "") +
                (void 0 !== controller.settings.wtdata.p ? "<tr><td>" + _("Total Rain") + "</td><td>" + formatPrecip(controller.settings.wtdata.p) + "</td></tr>" : "") +
                (void 0 !== controller.settings.wtdata.eto ? "<tr><td>" + _("ETo") + "</td><td>" + formatPrecip(controller.settings.wtdata.eto) + "</td></tr>" : "") +
                (void 0 !== controller.settings.wtdata.radiation ? "<tr><td>" + _("Mean Radiation") + "</td><td>" + controller.settings.wtdata.radiation + " kWh/m2</td></tr>" : "") +
                (void 0 !== controller.settings.wtdata.minT ? "<tr><td>" + _("Min Temp") + "</td><td>" + formatTemp(controller.settings.wtdata.minT) + "</td></tr>" : "") +
                (void 0 !== controller.settings.wtdata.maxT ? "<tr><td>" + _("Max Temp") + "</td><td>" + formatTemp(controller.settings.wtdata.maxT) + "</td></tr>" : "") +
                (void 0 !== controller.settings.wtdata.minH ? "<tr><td>" + _("Min Humidity") + "</td><td>" + formatHumidity(controller.settings.wtdata.minH) + "</td></tr>" : "") +
                (void 0 !== controller.settings.wtdata.maxH ? "<tr><td>" + _("Max Humidity") + "</td><td>" + formatHumidity(controller.settings.wtdata.maxH) + "</td></tr>" : "") +
                (void 0 !== controller.settings.wtdata.wind ? "<tr><td>" + _("Mean Wind") + "</td><td>" + formatSpeed(controller.settings.wtdata.wind) + "</td></tr>" : "")),
        (e =
            (e += "number" == typeof controller.settings.lwc ? "<tr><td>" + _("Last Request") + "</td><td>" + dateToString(new Date(1e3 * controller.settings.lwc), null, 2) + "</td></tr>" : "") +
            ("number" == typeof controller.settings.wterr ? "<tr><td>" + _("Last Response") + "</td><td>" + getWeatherError(controller.settings.wterr) + "</td></tr>" : "") +
            "</table></div>"),
        "number" == typeof controller.settings.otcs && (e += "<div class='debugWUHeading'>Integrations</div><table class='debugWUTable'><tr><td>OpenThings Cloud</td><td>" + resolveOTCStatus(controller.settings.otcs) + "</td></tr></table>"),
        !controller.settings.wtdata ||
            ("string" != typeof controller.settings.wtdata.wp && "string" != typeof controller.settings.wtdata.weatherProvider) ||
            (e = (e += "<hr>") + makeAttribution(controller.settings.wtdata.wp || controller.settings.wtdata.weatherProvider)),
        (e += "</div>"),
        openPopup($(e)),
        !1
    );
}
function resolveOTCStatus(e) {
    switch (e) {
        case 0:
            return "Not Enabled";
        case 1:
            return "Connecting...";
        case 2:
            return "<font class='debugWUError'>Disconnected</font>";
        case 3:
            return "<font class='debugWUOK'>Connected</font>";
    }
}
function showRainDelay() {
    $(".ui-popup-active").find("[data-role='popup']").popup("close"),
        showDurationBox({
            title: _("Change Rain Delay"),
            callback: raindelay,
            label: _("Duration"),
            maximum: 31536e3,
            granularity: 2,
            preventCompression: !0,
            incrementalUpdate: !1,
            updateOnChange: !1,
            helptext: _("Enable manual rain delay by entering a value into the input below. To turn off a currently enabled rain delay use a value of 0."),
        });
}
function showPause() {
    StationQueue.isPaused()
        ? areYouSure(_("Do you want to resume program operation?"), "", function () {
              sendToOS("/pq?pw=");
          })
        : showDurationBox({
              title: "Pause Station Runs",
              incrementalUpdate: !1,
              maximum: 65535,
              callback: function (e) {
                  sendToOS("/pq?dur=" + e + "&pw=");
              },
          });
}
function getAdjustmentMethod(e) {
    var t = [
        { name: _("Manual"), id: 0 },
        { name: "Zimmerman", id: 1 },
        { name: _("Auto Rain Delay"), id: 2, minVersion: 216 },
        { name: "ETo", id: 3, minVersion: 216 },
        { name: "Monthly", id: 4, minVersion: 220 },
    ];
    return void 0 === e ? t : t[-129 & e];
}
function getCurrentAdjustmentMethodId() {
    return -129 & controller.options.uwt;
}
function getRestriction(e) {
    return [
        { isCurrent: 0, name: _("None") },
        { isCurrent: !!((controller.options.uwt >> 7) & 1), name: _("California Restriction") },
    ][e];
}
function setRestriction(e, t) {
    return (t = t || -129 & controller.options.uwt), 1 === e && (t |= 128), t;
}
function testAPIKey(e, t) {
    $.ajax({ url: "https://api.weather.com/v2/pws/observations/current?stationId=KMAHANOV10&format=json&units=m&apiKey=" + e, cache: !0 })
        .done(function (e) {
            e.errors ? t(!1) : t(!0);
        })
        .fail(function () {
            t(!1);
        });
}
function bindPanel() {
    function n() {
        return controller && controller.settings && controller.settings.en && 1 === controller.settings.en ? _("Disable") : _("Enable");
    }
    var t,
        i,
        e = $("#sprinklers-settings");
    e.enhanceWithin().panel().removeClass("hidden").panel("option", "classes.modal", "needsclick ui-panel-dismiss"),
        e.find("a[href='#site-control']").on("click", function () {
            return changePage("#site-control"), !1;
        }),
        e.find("a[href='#about']").on("click", function () {
            return changePage("#about"), !1;
        }),
        e.find(".cloud-login").on("click", function () {
            return requestCloudAuth(), !1;
        }),
        e.find("a[href='#debugWU']").on("click", debugWU),
        e.find("a[href='#localization']").on("click", languageSelect),
        e.find(".export_config").on("click", function () {
            return (
                "object" != typeof controller.stations.stn_spe ||
                "object" == typeof controller.special ||
                controller.stations.stn_spe.every(function (e) {
                    return 0 === e;
                })
                    ? getExportMethod()
                    : updateControllerStationSpecial(getExportMethod),
                !1
            );
        }),
        e.find(".import_config").on("click", function () {
            return (
                storage.get("backup", function (e) {
                    getImportMethod(e.backup);
                }),
                !1
            );
        }),
        e
            .find(".toggleOperation")
            .on("click", function () {
                var e = $(this),
                    t = 1 - controller.settings.en;
                return (
                    areYouSure(_("Are you sure you want to") + " " + n().toLowerCase() + " " + _("operation?"), "", function () {
                        sendToOS("/cv?pw=&en=" + t).done(function () {
                            $.when(updateControllerSettings(), updateControllerStatus()).done(function () {
                                checkStatus(), e.find("span:first").html(n()).attr("data-translate", n());
                            });
                        });
                    }),
                    !1
                );
            })
            .find("span:first")
            .html(n())
            .attr("data-translate", n()),
        e.find(".reboot-os").on("click", function () {
            return (
                areYouSure(_("Are you sure you want to reboot OpenSprinkler?"), "", function () {
                    $.mobile.loading("show"),
                        sendToOS("/cv?pw=&rbt=1").done(function () {
                            $.mobile.loading("hide"), showerror(_("OpenSprinkler is rebooting now"));
                        });
                }),
                !1
            );
        }),
        e.find(".changePassword > a").on("click", changePassword),
        e.find("#downgradeui").on("click", function () {
            return (
                areYouSure(_("Are you sure you want to downgrade the UI?"), "", function () {
                    var e = "http://rayshobby.net/scripts/java/svc" + getOSVersion();
                    sendToOS("/cu?jsp=" + encodeURIComponent(e) + "&pw=").done(function () {
                        storage.remove(["sites", "current_site", "lang", "provider", "wapikey", "runonce"]), location.reload();
                    });
                }),
                !1
            );
        }),
        e.find("#logout").on("click", function () {
            return logout(), !1;
        }),
        (t = $("#sprinklers-settings")),
        (i = function () {
            var e = controller && controller.settings && controller.settings.en && 1 === controller.settings.en ? _("Disable") : _("Enable");
            t.find(".toggleOperation span:first").html(e).attr("data-translate", e);
        }),
        $("html").on("datarefresh", i),
        (openPanel = function () {
            var e = $(".ui-page-active").attr("id");
            "start" !== e && "loadingPage" !== e && isControllerConnected() && 1 === $(".ui-page-active").length && (i(), t.panel("open"));
        });
}
function showOptions(e) {
    function t(e, t, n) {
        return (
            "<div class='ui-field-contain'><fieldset data-role='controlgroup' class='ui-mini center sensor-options' data-type='horizontal'><legend class='left'>" +
            _("Sensor") +
            (n ? " " + n + " " : " ") +
            _("Type") +
            "</legend><input class='noselect' type='radio' name='o" +
            e +
            "' id='o" +
            e +
            "-none' value='0'" +
            (0 === t ? " checked='checked'" : "") +
            "><label for='o" +
            e +
            "-none'>" +
            _("None") +
            "</label><input class='noselect' type='radio' name='o" +
            e +
            "' id='o" +
            e +
            "-rain' value='1'" +
            (1 === t ? " checked='checked'" : "") +
            "><label for='o" +
            e +
            "-rain'>" +
            _("Rain") +
            "</label>" +
            (52 === e ? "" : "<input class='noselect' type='radio' name='o" + e + "' id='o" + e + "-flow' value='2'" + (2 === t ? " checked='checked'" : "") + "><label for='o" + e + "-flow'>" + _("Flow") + "</label>") +
            (checkOSVersion(219) ? "<input class='noselect' type='radio' name='o" + e + "' id='o" + e + "-soil' value='3'" + (3 === t ? " checked='checked'" : "") + "><label for='o" + e + "-soil'>" + _("Soil") + "</label>" : "") +
            (checkOSVersion(217)
                ? "<input class='noselect' type='radio' name='o" + e + "' id='o" + e + "-program' value='240'" + (240 === t ? " checked='checked'" : "") + "><label for='o" + e + "-program'>" + _("Program Switch") + "</label>"
                : "") +
            "</fieldset></div>"
        );
    }
    function n() {
        var a,
            s = {},
            r = !1,
            l = isOSPi(),
            e = d.eq(2);
        e.prop("disabled", !0),
            c.find(".submit").removeClass("hasChanges"),
            c
                .find("#os-options-list")
                .find(":input,button")
                .filter(":not(.noselect)")
                .each(function () {
                    var e,
                        t = $(this),
                        n = t.attr("id"),
                        i = t.val();
                    if (!n || (!i && "" !== i)) return !0;
                    switch (n) {
                        case "o1":
                            var o = i.split(":");
                            (o[0] = parseInt(o[0], 10)), (o[1] = parseInt(o[1], 10)), (o[1] = ((o[1] / 15) >> 0) / 4), (o[0] = o[0] + (0 <= o[0] ? o[1] : -o[1])), (i = (4 * (o[0] + 12)) >> 0);
                            break;
                        case "datetime":
                            o = new Date(1e3 * i);
                            return (s.tyy = o.getUTCFullYear()), (s.tmm = o.getUTCMonth()), (s.tdd = o.getUTCDate()), (s.thh = o.getUTCHours()), (s.tmi = o.getUTCMinutes()), (s.ttt = Math.round(o.getTime() / 1e3)), !0;
                        case "ip_addr":
                            return "0.0.0.0" === (e = i.split(".")) ? (showerror(_("A valid IP address is required when DHCP is not used")), !(r = !0)) : ((s.o4 = e[0]), (s.o5 = e[1]), (s.o6 = e[2]), (s.o7 = e[3]), !0);
                        case "subnet":
                            return "0.0.0.0" === (e = i.split(".")) ? (showerror(_("A valid subnet address is required when DHCP is not used")), !(r = !0)) : ((s.o58 = e[0]), (s.o59 = e[1]), (s.o60 = e[2]), (s.o61 = e[3]), !0);
                        case "gateway":
                            return "0.0.0.0" === (e = i.split(".")) ? (showerror(_("A valid gateway address is required when DHCP is not used")), !(r = !0)) : ((s.o8 = e[0]), (s.o9 = e[1]), (s.o10 = e[2]), (s.o11 = e[3]), !0);
                        case "dns":
                            return "0.0.0.0" === (e = i.split(".")) ? (showerror(_("A valid DNS address is required when DHCP is not used")), !(r = !0)) : ((s.o44 = e[0]), (s.o45 = e[1]), (s.o46 = e[2]), (s.o47 = e[3]), !0);
                        case "ntp_addr":
                            return (e = i.split(".")), (s.o32 = e[0]), (s.o33 = e[1]), (s.o34 = e[2]), (s.o35 = e[3]), !0;
                        case "wtkey":
                            return !0;
                        case "wto":
                            if (((i = escapeJSON($.extend({}, unescapeJSON(i), { key: c.find("#wtkey").val() }))), escapeJSON(controller.settings.wto) === i)) return !0;
                            break;
                        case "mqtt":
                            if (escapeJSON(controller.settings.mqtt) === i) return !0;
                            break;
                        case "otc":
                            if (escapeJSON(controller.settings.otc) === i) return !0;
                            break;
                        case "isMetric":
                            return (isMetric = t.is(":checked")), storage.set({ isMetric: isMetric }), !0;
                        case "groupView":
                            return (groupView = t.is(":checked")), storage.set({ groupView: groupView }), !0;
                        case "o12":
                            return l || ((s.o12 = 255 & i), (s.o13 = (i >> 8) & 255)), !0;
                        case "o31":
                            if (3 === parseInt(i) && !unescapeJSON($("#wto")[0].value).baseETo) return showerror(_("You must specify a baseline ETo adjustment method option to use the ET adjustment method.")), !(r = !0);
                            o = c.find("#weatherRestriction");
                            o.length && (i = setRestriction(parseInt(o.val()), i));
                            break;
                        case "o18":
                        case "o37":
                            parseInt(i) > 8 * (parseInt(c.find("#o15").val()) + 1) && (i = 0);
                            break;
                        case "o41":
                            return "gallon" === c.find("#o41-units").val() && (i *= 3.78541), (s.o41 = (100 * i) & 255), (s.o42 = ((100 * i) >> 8) & 255), !0;
                        case "o2":
                        case "o3":
                        case "o14":
                        case "o16":
                        case "o21":
                        case "o22":
                        case "o25":
                        case "o36":
                        case "o48":
                        case "o50":
                        case "o51":
                        case "o52":
                        case "o53":
                            if (((i = t.is(":checked") ? 1 : 0), checkOSVersion(219) || i)) break;
                            return !0;
                    }
                    l &&
                        (n =
                            "loc" === n || "lg" === n
                                ? "o" + n
                                : ((a = /\d+/.exec(n)),
                                  "o" +
                                      Object.keys(keyIndex).find(function (e) {
                                          return keyIndex[e] === a;
                                      }))),
                        !0 === checkOSVersion(208) && "loc" === n && (i = i.replace(/\s/g, "_")),
                        (s[n] = i);
                }),
            r
                ? (e.prop("disabled", !1), c.find(".submit").addClass("hasChanges"))
                : (void 0 !== controller.options.fpr0 &&
                      (void 0 !== controller.options.urs
                          ? (s.o21 = c.find("input[name='o21'][type='radio']:checked").val())
                          : (void 0 !== controller.options.sn1t && (s.o50 = c.find("input[name='o50'][type='radio']:checked").val()), void 0 !== controller.options.sn2t && (s.o52 = c.find("input[name='o52'][type='radio']:checked").val()))),
                  (s = transformKeys(s)),
                  $.mobile.loading("show"),
                  sendToOS("/co?pw=&" + $.param(s))
                      .done(function () {
                          $.mobile.document.one("pageshow", function () {
                              showerror(_("Settings have been saved"));
                          }),
                              goBack(),
                              updateController(updateWeather);
                      })
                      .fail(function () {
                          e.prop("disabled", !1), c.find(".submit").addClass("hasChanges");
                      }));
    }
    var i,
        o,
        a,
        s,
        r,
        l = "",
        c = $("<div data-role='page' id='os-options'><div class='ui-content' role='main'><div data-role='collapsibleset' id='os-options-list'></div><a class='submit preventBack' style='display:none'></a></div></div>"),
        d = changeHeader({ title: _("Edit Options"), leftBtn: { icon: "carat-l", text: _("Back"), class: "ui-toolbar-back-btn", on: checkChangesBeforeBack }, rightBtn: { icon: "check", text: _("Submit"), class: "submit", on: n } });
    if (
        (c.find(".submit").on("click", n),
        (l = "<fieldset data-role='collapsible'" + ("string" != typeof e || "system" === e ? " data-collapsed='false'" : "") + "><legend>" + _("System") + "</legend>"),
        void 0 !== controller.options.ntp &&
            (l +=
                "<div class='ui-field-contain datetime-input'><label for='datetime'>" +
                _("Device Time") +
                "</label><button " +
                (controller.options.ntp ? "disabled " : "") +
                "data-mini='true' id='datetime' value='" +
                (controller.settings.devt + 60 * new Date(1e3 * controller.settings.devt).getTimezoneOffset()) +
                "'>" +
                dateToString(new Date(1e3 * controller.settings.devt)).slice(0, -3) +
                "</button></div>"),
        !isOSPi() && void 0 !== controller.options.tz)
    ) {
        for (
            i = [
                "-12:00",
                "-11:30",
                "-11:00",
                "-10:00",
                "-09:30",
                "-09:00",
                "-08:30",
                "-08:00",
                "-07:00",
                "-06:00",
                "-05:00",
                "-04:30",
                "-04:00",
                "-03:30",
                "-03:00",
                "-02:30",
                "-02:00",
                "+00:00",
                "+01:00",
                "+02:00",
                "+03:00",
                "+03:30",
                "+04:00",
                "+04:30",
                "+05:00",
                "+05:30",
                "+05:45",
                "+06:00",
                "+06:30",
                "+07:00",
                "+08:00",
                "+08:45",
                "+09:00",
                "+09:30",
                "+10:00",
                "+10:30",
                "+11:00",
                "+11:30",
                "+12:00",
                "+12:45",
                "+13:00",
                "+13:45",
                "+14:00",
            ],
                o = (0 <= (o = controller.options.tz - 48) ? "+" : "-") + pad((Math.abs(o) / 4) >> 0) + ":" + ((((Math.abs(o) % 4) * 15) / 10) >> 0) + (((Math.abs(o) % 4) * 15) % 10),
                l += "<div class='ui-field-contain'><label for='o1' class='select'>" + _("Timezone") + "</label><select " + (checkOSVersion(210) && "object" == typeof weather ? "disabled='disabled' " : "") + "data-mini='true' id='o1'>",
                a = 0;
            a < i.length;
            a++
        )
            l += "<option " + (i[a] === o ? "selected" : "") + " value='" + i[a] + "'>" + i[a] + "</option>";
        l += "</select></div>";
    }
    if (
        ((l +=
            "<div class='ui-field-contain'><label for='loc'>" +
            _("Location") +
            "</label><button data-mini='true' id='loc' value='" +
            ("''" === controller.settings.loc.trim() ? _("Not specified") : controller.settings.loc) +
            "'><span>" +
            controller.settings.loc +
            "</span><a class='ui-btn btn-no-border ui-btn-icon-notext ui-icon-delete ui-btn-corner-all clear-loc'></a></button></div>"),
        void 0 !== controller.options.lg && (l += "<label for='o36'><input data-mini='true' id='o36' type='checkbox' " + (1 === controller.options.lg ? "checked='checked'" : "") + ">" + _("Enable Logging") + "</label>"),
        (l += "<label for='isMetric'><input data-mini='true' id='isMetric' type='checkbox' " + (isMetric ? "checked='checked'" : "") + ">" + _("Use Metric") + "</label>"),
        Supported.groups() && (l += "<label for='groupView'><input data-mini='true' id='groupView' type='checkbox' " + (groupView ? "checked='checked'" : "") + ">" + _("Order Stations by Groups") + "</label>"),
        (l += "</fieldset><fieldset data-role='collapsible'" + ("string" == typeof e && "master" === e ? " data-collapsed='false'" : "") + "><legend>" + _("Configure Master") + "</legend>"),
        void 0 !== controller.options.mas)
    ) {
        for (
            l +=
                "<div class='ui-field-contain ui-field-no-border'><label for='o18' class='select'>" +
                _("Master Station") +
                " " +
                (void 0 !== controller.options.mas2 ? "1" : "") +
                "</label><select data-mini='true' id='o18'><option value='0'>" +
                _("None") +
                "</option>",
                a = 0;
            a < controller.stations.snames.length && ((l += "<option " + (1 === Station.isMaster(a) ? "selected" : "") + " value='" + (a + 1) + "'>" + controller.stations.snames[a] + "</option>"), checkOSVersion(214) || 7 !== a);
            a++
        );
        (l += "</select></div>"),
            void 0 !== controller.options.mton &&
                (l +=
                    "<div " +
                    (0 === controller.options.mas ? "style='display:none' " : "") +
                    "class='ui-field-no-border ui-field-contain duration-field'><label for='o19'>" +
                    _("Master On Adjustment") +
                    "</label><button data-mini='true' id='o19' value='" +
                    controller.options.mton +
                    "'>" +
                    controller.options.mton +
                    "s</button></div>"),
            void 0 !== controller.options.mtof &&
                (l +=
                    "<div " +
                    (0 === controller.options.mas ? "style='display:none' " : "") +
                    "class='ui-field-no-border ui-field-contain duration-field'><label for='o20'>" +
                    _("Master Off Adjustment") +
                    "</label><button data-mini='true' id='o20' value='" +
                    controller.options.mtof +
                    "'>" +
                    controller.options.mtof +
                    "s</button></div>");
    }
    if (void 0 !== controller.options.mas2) {
        for (
            l =
                (l += "<hr style='width:95%' class='content-divider'>") +
                ("<div class='ui-field-contain ui-field-no-border'><label for='o37' class='select'>" + _("Master Station") + " 2</label><select data-mini='true' id='o37'><option value='0'>" + _("None") + "</option>"),
                a = 0;
            a < controller.stations.snames.length && ((l += "<option " + (2 === Station.isMaster(a) ? "selected" : "") + " value='" + (a + 1) + "'>" + controller.stations.snames[a] + "</option>"), checkOSVersion(214) || 7 !== a);
            a++
        );
        (l += "</select></div>"),
            void 0 !== controller.options.mton2 &&
                (l +=
                    "<div " +
                    (0 === controller.options.mas2 ? "style='display:none' " : "") +
                    "class='ui-field-no-border ui-field-contain duration-field'><label for='o38'>" +
                    _("Master On Adjustment") +
                    "</label><button data-mini='true' id='o38' value='" +
                    controller.options.mton2 +
                    "'>" +
                    controller.options.mton2 +
                    "s</button></div>"),
            void 0 !== controller.options.mtof2 &&
                (l +=
                    "<div " +
                    (0 === controller.options.mas2 ? "style='display:none' " : "") +
                    "class='ui-field-no-border ui-field-contain duration-field'><label for='o39'>" +
                    _("Master Off Adjustment") +
                    "</label><button data-mini='true' id='o39' value='" +
                    controller.options.mtof2 +
                    "'>" +
                    controller.options.mtof2 +
                    "s</button></div>");
    }
    if (((l += "</fieldset><fieldset data-role='collapsible'" + ("string" == typeof e && "station" === e ? " data-collapsed='false'" : "") + "><legend>" + _("Station Handling") + "</legend>"), void 0 !== controller.options.ext)) {
        for (
            l +=
                "<div class='ui-field-contain'><label for='o15' class='select'>" +
                _("Number of Stations") +
                ("number" == typeof controller.options.dexp && controller.options.dexp < 255 && 0 <= controller.options.dexp ? " <span class='nobr'>(" + (8 * controller.options.dexp + 8) + " " + _("available") + ")</span>" : "") +
                "</label><select data-mini='true' id='o15'>",
                a = 0;
            a <= (controller.options.mexp || 5);
            a++
        )
            l += "<option " + (controller.options.ext === a ? "selected" : "") + " value='" + a + "'>" + (8 * a + 8) + " " + _("stations") + "</option>";
        l += "</select></div>";
    }
    if (
        (void 0 !== controller.options.sdt &&
            (l +=
                "<div class='ui-field-contain duration-field'><label for='o17'>" +
                _("Station Delay") +
                "</label><button data-mini='true' id='o17' value='" +
                controller.options.sdt +
                "'>" +
                dhms2str(sec2dhms(controller.options.sdt)) +
                "</button></div>"),
        (l +=
            "<label for='showDisabled'><input data-mini='true' class='noselect' id='showDisabled' type='checkbox' " +
            ("true" === localStorage.showDisabled ? "checked='checked'" : "") +
            ">" +
            _("Show Disabled") +
            " " +
            _("(Changes Auto-Saved)") +
            "</label>"),
        void 0 !== controller.options.seq && (l += "<label for='o16'><input data-mini='true' id='o16' type='checkbox' " + (1 === controller.options.seq ? "checked='checked'" : "") + ">" + _("Sequential") + "</label>"),
        (l += "</fieldset><fieldset data-role='collapsible'" + ("string" == typeof e && "weather" === e ? " data-collapsed='false'" : "") + "><legend>" + _("Weather and Sensors") + "</legend>"),
        void 0 !== controller.options.uwt)
    ) {
        for (
            l +=
                "<div class='ui-field-contain'><label for='o31' class='select'>" +
                _("Weather Adjustment Method") +
                "<button data-helptext='" +
                _("Weather adjustment uses DarkSky data in conjunction with the selected method to adjust the watering percentage.") +
                "' class='help-icon btn-no-border ui-btn ui-icon-info ui-btn-icon-notext'></button></label><select data-mini='true' id='o31'>",
                a = 0;
            a < getAdjustmentMethod().length;
            a++
        ) {
            var u = getAdjustmentMethod()[a];
            (u.minVersion && !checkOSVersion(u.minVersion)) || (l += "<option " + (u.id === getCurrentAdjustmentMethodId() ? "selected" : "") + " value='" + a + "'>" + u.name + "</option>");
        }
        if (
            ((l += "</select></div>"),
            "object" == typeof controller.settings.wto &&
                (l +=
                    "<div class='ui-field-contain" +
                    (0 === getCurrentAdjustmentMethodId() ? " hidden" : "") +
                    "'><label for='wto'>" +
                    _("Adjustment Method Options") +
                    "</label><button data-mini='true' id='wto' value='" +
                    escapeJSON(controller.settings.wto) +
                    "'>" +
                    _("Tap to Configure") +
                    "</button></div>"),
            checkOSVersion(214))
        ) {
            for (
                l +=
                    "<div class='ui-field-contain'><label for='weatherRestriction' class='select'>" +
                    _("Weather-Based Restrictions") +
                    "<button data-helptext='" +
                    _("Prevents watering when the selected restriction is met.") +
                    "' class='help-icon btn-no-border ui-btn ui-icon-info ui-btn-icon-notext'></button></label><select data-mini='true' class='noselect' id='weatherRestriction'>",
                    a = 0;
                a < 2;
                a++
            ) {
                var p = getRestriction(a);
                l += "<option " + (!0 === p.isCurrent ? "selected" : "") + " value='" + a + "'>" + p.name + "</option>";
            }
            l += "</select></div>";
        }
    }
    void 0 !== controller.options.wl &&
        (l +=
            "<div class='ui-field-contain duration-field'><label for='o23'>" +
            _("% Watering") +
            "<button data-helptext='" +
            _("The watering percentage scales station run times by the set value.") +
            "' class='help-icon btn-no-border ui-btn ui-icon-info ui-btn-icon-notext'></button></label><button " +
            (controller.options.uwt && 0 < getCurrentAdjustmentMethodId() ? "disabled='disabled' " : "") +
            "data-mini='true' id='o23' value='" +
            controller.options.wl +
            "'>" +
            controller.options.wl +
            "%</button></div>"),
        (void 0 === controller.options.urs && void 0 === controller.options.sn1t) ||
            (void 0 !== controller.options.fpr0
                ? (l += void 0 !== controller.options.urs ? t(keyIndex.urs, controller.options.urs) : void 0 !== controller.options.sn1t ? t(keyIndex.sn1t, controller.options.sn1t, 1) : "")
                : (l += "<label for='o21'><input data-mini='true' id='o21' type='checkbox' " + (1 === controller.options.urs ? "checked='checked'" : "") + ">" + _("Use Rain Sensor") + "</label>")),
        void 0 !== controller.options.rso &&
            (l +=
                "<label for='o22'><input " +
                (1 === controller.options.urs || 240 === controller.options.urs ? "" : "data-wrapper-class='hidden' ") +
                "data-mini='true' id='o22' type='checkbox' " +
                (1 === controller.options.rso ? "checked='checked'" : "") +
                ">" +
                _("Normally Open") +
                "</label>"),
        void 0 !== controller.options.sn1o &&
            (l +=
                "<label for='o51'><input " +
                (1 === controller.options.sn1t || 3 === controller.options.sn1t || 240 === controller.options.sn1t ? "" : "data-wrapper-class='hidden' ") +
                "data-mini='true' id='o51' type='checkbox' " +
                (1 === controller.options.sn1o ? "checked='checked'" : "") +
                ">" +
                _("Normally Open") +
                "</label>"),
        void 0 !== controller.options.fpr0 &&
            (l +=
                "<div class='ui-field-contain" +
                (2 === controller.options.urs || 2 === controller.options.sn1t ? "" : " hidden") +
                "'><label for='o41'>" +
                _("Flow Pulse Rate") +
                "</label><table><tr style='width:100%;vertical-align: top;'><td style='width:100%'><div class='ui-input-text controlgroup-textinput ui-btn ui-body-inherit ui-corner-all ui-mini ui-shadow-inset ui-input-has-clear'><input data-role='none' data-mini='true' type='number' pattern='^[-+]?[0-9]*.?[0-9]*$' id='o41' value='" +
                (256 * controller.options.fpr1 + controller.options.fpr0) / 100 +
                "'></div></td><td class='tight-select'><select id='o41-units' class='noselect' data-mini='true'><option selected='selected' value='liter'>L/pulse</option><option value='gallon'>Gal/pulse</option></select></td></tr></table></div>"),
        void 0 !== controller.options.sn1on &&
            (l +=
                "<div class='" +
                (1 === controller.options.sn1t || 3 === controller.options.sn1t ? "" : "hidden ") +
                "ui-field-no-border ui-field-contain duration-field'><label for='o54'>" +
                _("Sensor 1 Delayed On Time") +
                "</label><button data-mini='true' id='o54' value='" +
                controller.options.sn1on +
                "'>" +
                controller.options.sn1on +
                "m</button></div>"),
        void 0 !== controller.options.sn1of &&
            (l +=
                "<div class='" +
                (1 === controller.options.sn1t || 3 === controller.options.sn1t ? "" : "hidden ") +
                "ui-field-no-border ui-field-contain duration-field'><label for='o55'>" +
                _("Sensor 1 Delayed Off Time") +
                "</label><button data-mini='true' id='o55' value='" +
                controller.options.sn1of +
                "'>" +
                controller.options.sn1of +
                "m</button></div>"),
        checkOSVersion(217) &&
            (l +=
                "<label id='prgswitch' class='center smaller" +
                (240 === controller.options.urs || 240 === controller.options.sn1t || 240 === controller.options.sn2t ? "" : " hidden") +
                "'>" +
                _("When using program switch, a switch is connected to the sensor port to trigger Program 1 every time the switch is pressed for at least 1 second.") +
                "</label>"),
        void 0 !== controller.options.sn2t && checkOSVersion(219) && (l += t(keyIndex.sn2t, controller.options.sn2t, 2)),
        void 0 !== controller.options.sn2o &&
            (l +=
                "<label for='o53'><input " +
                (1 === controller.options.sn2t || 3 === controller.options.sn2t || 240 === controller.options.sn2t ? "" : "data-wrapper-class='hidden' ") +
                "data-mini='true' id='o53' type='checkbox' " +
                (1 === controller.options.sn2o ? "checked='checked'" : "") +
                ">" +
                _("Normally Open") +
                "</label>"),
        void 0 !== controller.options.sn2on &&
            (l +=
                "<div class='" +
                (1 === controller.options.sn2t || 3 === controller.options.sn2t ? "" : "hidden ") +
                "ui-field-no-border ui-field-contain duration-field'><label for='o56'>" +
                _("Sensor 2 Delayed On Time") +
                "</label><button data-mini='true' id='o56' value='" +
                controller.options.sn2on +
                "'>" +
                controller.options.sn2on +
                "m</button></div>"),
        void 0 !== controller.options.sn2of &&
            (l +=
                "<div class='" +
                (1 === controller.options.sn2t || 3 === controller.options.sn2t ? "" : "hidden ") +
                "ui-field-no-border ui-field-contain duration-field'><label for='o57'>" +
                _("Sensor 2 Delayed Off Time") +
                "</label><button data-mini='true' id='o57' value='" +
                controller.options.sn2of +
                "'>" +
                controller.options.sn2of +
                "m</button></div>"),
        void 0 !== controller.options.sn2t &&
            (l +=
                "<label id='prgswitch-2' class='center smaller" +
                (240 === controller.options.urs || 240 === controller.options.sn1t || 240 === controller.options.sn2t ? "" : " hidden") +
                "'>" +
                _("When using program switch, a switch is connected to the sensor port to trigger Program 2 every time the switch is pressed for at least 1 second.") +
                "</label>"),
        (void 0 === controller.settings.ifkey && void 0 === controller.settings.mqtt && void 0 === controller.settings.otc) ||
            ((l += "</fieldset><fieldset data-role='collapsible'" + ("string" == typeof e && "integrations" === e ? " data-collapsed='false'" : "") + "><legend>" + _("Integrations") + "</legend>"),
            void 0 !== controller.settings.otc &&
                (l +=
                    "<div class='ui-field-contain'><label for='otc'>" +
                    _("OTC") +
                    "<button style='display:inline-block;' data-helptext='" +
                    _("OpenThings Cloud (OTC) allows remote access using OTC Token .") +
                    "' class='help-icon btn-no-border ui-btn ui-icon-info ui-btn-icon-notext'></button></label><button data-mini='true' id='otc' value='" +
                    escapeJSON(controller.settings.otc) +
                    "'>" +
                    _("Tap to Configure") +
                    "</button></div>"),
            void 0 !== controller.settings.mqtt &&
                (l +=
                    "<div class='ui-field-contain'><label for='mqtt'>" +
                    _("MQTT") +
                    "<button style='display:inline-block;' data-helptext='" +
                    _("OpenSprinkler can send notifications to an MQTT broker at a specified host and port.") +
                    "' class='help-icon btn-no-border ui-btn ui-icon-info ui-btn-icon-notext'></button></label><button data-mini='true' id='mqtt' value='" +
                    escapeJSON(controller.settings.mqtt) +
                    "'>" +
                    _("Tap to Configure") +
                    "</button></div>"),
            void 0 !== controller.settings.ifkey &&
                (l =
                    (l +=
                        "<div class='ui-field-contain'><label for='ifkey'>" +
                        _("IFTTT Key") +
                        "<button data-helptext='" +
                        _("To enable IFTTT, a Webhooks key is required which can be obtained from https://ifttt.com") +
                        "' class='help-icon btn-no-border ui-btn ui-icon-info ui-btn-icon-notext'></button></label><input autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' data-mini='true' type='text' id='ifkey' value='" +
                        controller.settings.ifkey +
                        "'></div>") +
                    "<div class='ui-field-contain'><label for='o49'>" +
                    _("IFTTT Events") +
                    "<button data-helptext='" +
                    _("Select which events to send to IFTTT for use in recipes.") +
                    "' class='help-icon btn-no-border ui-btn ui-icon-info ui-btn-icon-notext'></button></label><button data-mini='true' id='o49' value='" +
                    controller.options.ife +
                    "'>" +
                    _("Configure Events") +
                    "</button></div>"),
            void 0 !== controller.settings.dname &&
                (l +=
                    "<div class='ui-field-contain'><label for='dname'>" +
                    _("Device Name") +
                    "<button data-helptext='" +
                    _("Device name is attached to all IFTTT notifications to help distinguish multiple devices") +
                    "' class='help-icon btn-no-border ui-btn ui-icon-info ui-btn-icon-notext'></button></label><input autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' data-mini='true' type='text' id='dname' value=\"" +
                    controller.settings.dname +
                    '"></div>')),
        (l += "</fieldset><fieldset class='full-width-slider' data-role='collapsible'" + ("string" == typeof e && "lcd" === e ? " data-collapsed='false'" : "") + "><legend>" + _("LCD Screen") + "</legend>"),
        void 0 !== controller.options.con &&
            (l += "<div class='ui-field-contain'><label for='o27'>" + _("Contrast") + "</label><input type='range' id='o27' min='0' max='255' step='10' data-highlight='true' value='" + controller.options.con + "'></div>"),
        void 0 !== controller.options.lit &&
            (l += "<div class='ui-field-contain'><label for='o28'>" + _("Brightness") + "</label><input type='range' id='o28' min='0' max='255' step='10' data-highlight='true' value='" + controller.options.lit + "'></div>"),
        void 0 !== controller.options.dim &&
            (l += "<div class='ui-field-contain'><label for='o29'>" + _("Idle Brightness") + "</label><input type='range' id='o29' min='0' max='255' step='10' data-highlight='true' value='" + controller.options.dim + "'></div>"),
        (l += "</fieldset><fieldset data-role='collapsible' data-theme='b'" + ("string" == typeof e && "advanced" === e ? " data-collapsed='false'" : "") + "><legend>" + _("Advanced") + "</legend>"),
        checkOSVersion(219) &&
            void 0 !== controller.options.uwt &&
            "object" == typeof controller.settings.wto &&
            (l +=
                "<div class='ui-field-contain'><label for='wtkey'>" +
                _("Wunderground Key").replace("Wunderground", "Wunder&shy;ground") +
                "<button data-helptext='" +
                _("We use DarkSky normally however with a user provided API key the weather source will switch to Weather Underground.") +
                "' class='help-icon btn-no-border ui-btn ui-icon-info ui-btn-icon-notext'></button></label><table><tr style='width:100%;vertical-align: top;'><td style='width:100%'><div class='" +
                (controller.settings.wto.key && "" !== controller.settings.wto.key ? "green " : "") +
                "ui-input-text controlgroup-textinput ui-btn ui-body-inherit ui-corner-all ui-mini ui-shadow-inset ui-input-has-clear'><input data-role='none' data-mini='true' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' type='text' id='wtkey' value='" +
                (controller.settings.wto.key || "") +
                "'><a href='#' tabindex='-1' aria-hidden='true' data-helptext='" +
                _("An invalid API key has been detected.") +
                "' class='hidden help-icon ui-input-clear ui-btn ui-icon-alert ui-btn-icon-notext ui-corner-all'></a></div></td><td><button class='noselect' data-mini='true' id='verify-api'>" +
                _("Verify") +
                "</button></td></tr></table></div>"),
        void 0 !== controller.options.hp0 &&
            (l +=
                "<div class='ui-field-contain'><label for='o12'>" +
                _("HTTP Port (restart required)") +
                "</label><input data-mini='true' type='number' pattern='[0-9]*' id='o12' value='" +
                (256 * controller.options.hp1 + controller.options.hp0) +
                "'></div>"),
        void 0 !== controller.options.devid &&
            (l +=
                "<div class='ui-field-contain'><label for='o26'>" +
                _("Device ID (restart required)") +
                "<button data-helptext='" +
                _("Device ID modifies the last byte of the MAC address.") +
                "' class='help-icon btn-no-border ui-btn ui-icon-info ui-btn-icon-notext'></button></label><input data-mini='true' type='number' pattern='[0-9]*' max='255' id='o26' value='" +
                controller.options.devid +
                "'></div>"),
        void 0 !== controller.options.rlp
            ? (l +=
                  "<div class='ui-field-contain duration-field'><label for='o30'>" +
                  _("Relay Pulse") +
                  "<button data-helptext='" +
                  _("Relay pulsing is used for special situations where rapid pulsing is needed in the output with a range from 1 to 2000 milliseconds. A zero value disables the pulsing option.") +
                  "' class='help-icon btn-no-border ui-btn ui-icon-info ui-btn-icon-notext'></button></label><button data-mini='true' id='o30' value='" +
                  controller.options.rlp +
                  "'>" +
                  controller.options.rlp +
                  "ms</button></div>")
            : !0 !== checkOSVersion(215) &&
              void 0 !== controller.options.bst &&
              (l +=
                  "<div class='ui-field-contain duration-field'><label for='o30'>" +
                  _("Boost Time") +
                  "<button data-helptext='" +
                  _("Boost time changes how long the boost converter is activated with a range from 0 to 1000 milliseconds.") +
                  "' class='help-icon btn-no-border ui-btn ui-icon-info ui-btn-icon-notext'></button></label><button data-mini='true' id='o30' value='" +
                  controller.options.bst +
                  "'>" +
                  controller.options.bst +
                  "ms</button></div>"),
        void 0 !== controller.options.ntp &&
            checkOSVersion(210) &&
            ((s = [controller.options.ntp1, controller.options.ntp2, controller.options.ntp3, controller.options.ntp4].join(".")),
            (l +=
                "<div class='" +
                (1 === controller.options.ntp ? "" : "hidden ") +
                "ui-field-contain duration-field'><label for='ntp_addr'>" +
                _("NTP IP Address") +
                "</label><button data-mini='true' id='ntp_addr' value='" +
                s +
                "'>" +
                s +
                "</button></div>")),
        void 0 !== controller.options.dhcp &&
            checkOSVersion(210) &&
            ((s = [controller.options.ip1, controller.options.ip2, controller.options.ip3, controller.options.ip4].join(".")),
            (r = [controller.options.gw1, controller.options.gw2, controller.options.gw3, controller.options.gw4].join(".")),
            (l =
                (l +=
                    "<div class='" +
                    (1 === controller.options.dhcp ? "hidden " : "") +
                    "ui-field-contain duration-field'><label for='ip_addr'>" +
                    _("IP Address") +
                    "</label><button data-mini='true' id='ip_addr' value='" +
                    s +
                    "'>" +
                    s +
                    "</button></div>") +
                "<div class='" +
                (1 === controller.options.dhcp ? "hidden " : "") +
                "ui-field-contain duration-field'><label for='gateway'>" +
                _("Gateway Address") +
                "</label><button data-mini='true' id='gateway' value='" +
                r +
                "'>" +
                r +
                "</button></div>"),
            void 0 !== controller.options.subn1 &&
                ((s = [controller.options.subn1, controller.options.subn2, controller.options.subn3, controller.options.subn4].join(".")),
                (l +=
                    "<div class='" +
                    (1 === controller.options.dhcp ? "hidden " : "") +
                    "ui-field-contain duration-field'><label for='subnet'>" +
                    _("Subnet Mask") +
                    "</label><button data-mini='true' id='subnet' value='" +
                    s +
                    "'>" +
                    s +
                    "</button></div>")),
            void 0 !== controller.options.dns1 &&
                ((r = [controller.options.dns1, controller.options.dns2, controller.options.dns3, controller.options.dns4].join(".")),
                (l +=
                    "<div class='" +
                    (1 === controller.options.dhcp ? "hidden " : "") +
                    "ui-field-contain duration-field'><label for='dns'>" +
                    _("DNS Address") +
                    "</label><button data-mini='true' id='dns' value='" +
                    r +
                    "'>" +
                    r +
                    "</button></div>")),
            (l += "<label for='o3'><input data-mini='true' id='o3' type='checkbox' " + (1 === controller.options.dhcp ? "checked='checked'" : "") + ">" + _("Use DHCP (restart required)") + "</label>")),
        void 0 !== controller.options.ntp && (l += "<label for='o2'><input data-mini='true' id='o2' type='checkbox' " + (1 === controller.options.ntp ? "checked='checked'" : "") + ">" + _("NTP Sync") + "</label>"),
        void 0 !== controller.options.ar && (l += "<label for='o14'><input data-mini='true' id='o14' type='checkbox' " + (1 === controller.options.ar ? "checked='checked'" : "") + ">" + _("Auto Reconnect") + "</label>"),
        void 0 !== controller.options.ipas && (l += "<label for='o25'><input data-mini='true' id='o25' type='checkbox' " + (1 === controller.options.ipas ? "checked='checked'" : "") + ">" + _("Ignore Password") + "</label>"),
        void 0 !== controller.options.sar && (l += "<label for='o48'><input data-mini='true' id='o48' type='checkbox' " + (1 === controller.options.sar ? "checked='checked'" : "") + ">" + _("Special Station Auto-Refresh") + "</label>"),
        (l =
            (l =
                (l =
                    (l =
                        (l += "</fieldset><fieldset data-role='collapsible' data-theme='b'" + ("string" == typeof e && "reset" === e ? " data-collapsed='false'" : "") + "><legend>" + _("Reset") + "</legend>") +
                        "<button data-mini='true' class='center-div reset-log'>" +
                        _("Clear Log Data") +
                        "</button>") +
                    "<button data-mini='true' class='center-div reset-options'>" +
                    _("Reset All Options") +
                    "</button>") +
                "<button data-mini='true' class='center-div reset-programs'>" +
                _("Delete All Programs") +
                "</button>") +
            "<button data-mini='true' class='center-div reset-stations'>" +
            _("Reset Station Attributes") +
            "</button>"),
        30 <= controller.options.hwv && controller.options.hwv < 40 && (l += "<hr class='divider'><button data-mini='true' class='center-div reset-wireless'>" + _("Reset Wireless Settings") + "</button>"),
        (l += "</fieldset>"),
        c
            .find("#os-options-list")
            .html(l)
            .one("change input", ":not(.noselect)", function () {
                d.eq(2).prop("disabled", !1), c.find(".submit").addClass("hasChanges");
            })
            .find("fieldset")
            .each(function () {
                var e = $(this);
                1 === e.children().length && e.remove();
            }),
        c.find(".clear-loc").on("click", function (e) {
            e.stopImmediatePropagation(),
                areYouSure(_("Are you sure you want to clear the current location?"), "", function () {
                    c.find("#loc").val("''").removeClass("green").find("span").text(_("Not specified")), c.find("#o1").selectmenu("enable"), d.eq(2).prop("disabled", !1), c.find(".submit").addClass("hasChanges");
                });
        }),
        c.find("#showDisabled").on("change", function () {
            return storage.set({ showDisabled: this.checked }), !1;
        }),
        c.find("#loc").on("click", function () {
            var i = $(this);
            i.prop("disabled", !0),
                overlayMap(function (e, t) {
                    var n;
                    !1 === e
                        ? "" === i.val() && (i.removeClass("green"), c.find("#o1").selectmenu("enable"))
                        : (checkOSVersion(210) && c.find("#o1").selectmenu("disable"),
                          "string" == typeof e
                              ? i.val(e).find("span").text(e)
                              : ((e[0] = parseFloat(e[0]).toFixed(5)),
                                (e[1] = parseFloat(e[1]).toFixed(5)),
                                "string" == typeof t &&
                                    validateWULocation(t, function (e) {
                                        e ? i.addClass("green") : i.removeClass("green");
                                    }),
                                (n = c.find("#wto")) && void 0 !== n.val() && n.val(escapeJSON($.extend({}, unescapeJSON(n.val()), { pws: t || "" }))),
                                i.val(e),
                                coordsToLocation(e[0], e[1], function (e) {
                                    i.find("span").text(e);
                                })),
                          d.eq(2).prop("disabled", !1),
                          c.find(".submit").addClass("hasChanges")),
                        i.prop("disabled", !1);
                });
        }),
        c.find("#wto").on("click", function () {
            function e() {
                (t.value = escapeJSON($.extend({}, unescapeJSON(t.value), i))), d.eq(2).prop("disabled", !1), c.find(".submit").addClass("hasChanges");
            }
            var t = this,
                n = unescapeJSON(this.value),
                i = { pws: n.pws, key: n.key },
                n = parseInt(c.find("#o31").val());
            1 === n ? showZimmermanAdjustmentOptions(this, e) : 2 === n ? showAutoRainDelayAdjustmentOptions(this, e) : 3 === n ? showEToAdjustmentOptions(this, e) : 4 === n && showMonthlyAdjustmentOptions(this, e);
        }),
        c.find(".reset-log").on("click", clearLogs),
        c.find(".reset-programs").on("click", clearPrograms),
        c.find(".reset-options").on("click", function () {
            resetAllOptions(function () {
                $.mobile.document.one("pageshow", function () {
                    showerror(_("Settings have been saved"));
                }),
                    goBack();
            });
        }),
        c.find(".reset-stations").on("click", function () {
            var e,
                t = "";
            if (Supported.groups()) for (e = 0; e < controller.stations.snames.length; e++) t += "g" + e + "=0&";
            if (void 0 !== controller.options.mas) for (e = 0; e < controller.settings.nbrd; e++) t += "m" + e + "=255&";
            if (void 0 !== controller.options.mas2) for (e = 0; e < controller.settings.nbrd; e++) t += "n" + e + "=0&";
            if ("object" == typeof controller.stations.ignore_rain) for (e = 0; e < controller.settings.nbrd; e++) t += "i" + e + "=0&";
            if ("object" == typeof controller.stations.ignore_sn1) for (e = 0; e < controller.settings.nbrd; e++) t += "j" + e + "=0&";
            if ("object" == typeof controller.stations.ignore_sn2) for (e = 0; e < controller.settings.nbrd; e++) t += "k" + e + "=0&";
            if ("object" == typeof controller.stations.act_relay) for (e = 0; e < controller.settings.nbrd; e++) t += "a" + e + "=0&";
            if ("object" == typeof controller.stations.stn_dis) for (e = 0; e < controller.settings.nbrd; e++) t += "d" + e + "=0&";
            if ("object" == typeof controller.stations.stn_seq) for (e = 0; e < controller.settings.nbrd; e++) t += "q" + e + "=255&";
            if ("object" == typeof controller.stations.stn_spe) for (e = 0; e < controller.settings.nbrd; e++) t += "p" + e + "=0&";
            areYouSure(_("Are you sure you want to reset station attributes?"), _("This will reset all station attributes"), function () {
                $.mobile.loading("show"),
                    storage.get(["sites", "current_site"], function (e) {
                        var t = parseSites(e.sites);
                        (t[e.current_site].notes = {}), (t[e.current_site].images = {}), (t[e.current_site].lastRunTime = {}), storage.set({ sites: JSON.stringify(t) }, cloudSaveSites);
                    }),
                    sendToOS("/cs?pw=&" + t).done(function () {
                        showerror(_("Stations have been updated")), updateController();
                    });
            });
        }),
        c.find(".reset-wireless").on("click", function () {
            areYouSure(_("Are you sure you want to reset the wireless settings?"), _("This will delete the stored SSID/password for your wireless network and return the device to access point mode"), function () {
                sendToOS("/cv?pw=&ap=1").done(function () {
                    $.mobile.document.one("pageshow", function () {
                        showerror(_("Wireless settings have been reset. Please follow the OpenSprinkler user manual on restoring connectivity."));
                    }),
                        goBack();
                });
            });
        }),
        c.find("#o3").on("change", function () {
            var e = $(this).is(":checked"),
                t = c.find("#ip_addr,#gateway,#dns,#subnet").parents(".ui-field-contain");
            e ? t.addClass("hidden") : t.removeClass("hidden");
        }),
        c.find(".sensor-options input[type='radio']").on("change", function () {
            var e = this.value,
                t = parseInt(this.id.match(/o(\d+)/)[1], 10);
            "2" === e ? c.find("#o41").parents(".ui-field-contain").removeClass("hidden") : (21 !== t && 50 !== t) || c.find("#o41").parents(".ui-field-contain").addClass("hidden"),
                "1" === e || "3" === e || "240" === e
                    ? c
                          .find("#o" + (t + 1))
                          .parent()
                          .removeClass("hidden")
                    : c
                          .find("#o" + (t + 1))
                          .parent()
                          .addClass("hidden"),
                "240" === $("input[name='o21'][type='radio']:checked").val() || "240" === $("input[name='o50'][type='radio']:checked").val() ? c.find("#prgswitch").removeClass("hidden") : c.find("#prgswitch").addClass("hidden"),
                "240" === $("input[name='o52'][type='radio']:checked").val() ? c.find("#prgswitch-2").removeClass("hidden") : c.find("#prgswitch-2").addClass("hidden"),
                "1" === e || "3" === e
                    ? c
                          .find("#o" + (t + 4) + ",#o" + (t + 5))
                          .parent()
                          .removeClass("hidden")
                    : c
                          .find("#o" + (t + 4) + ",#o" + (t + 5))
                          .parent()
                          .addClass("hidden");
        }),
        c.find("#o21").on("change", function () {
            c.find("#o22").parent().toggleClass("hidden", $(this).is(":checked"));
        }),
        c.find("#verify-api").on("click", function () {
            var t = c.find("#wtkey"),
                n = $(this);
            n.prop("disabled", !0),
                testAPIKey(t.val(), function (e) {
                    !0 === e ? (t.parent().find(".ui-icon-alert").hide(), t.parent().removeClass("red").addClass("green")) : (t.parent().find(".ui-icon-alert").removeClass("hidden").show(), t.parent().removeClass("green").addClass("red")),
                        n.prop("disabled", !1);
                });
        }),
        c.find(".help-icon").on("click", showHelpText),
        c.find(".duration-field button:not(.help-icon)").on("click", function () {
            var e,
                t = $(this),
                n = t.attr("id"),
                i = c.find("label[for='" + n + "']").text(),
                o = t.parent().find(".help-icon").data("helptext"),
                a = 240;
            return (
                d.eq(2).prop("disabled", !1),
                c.find(".submit").addClass("hasChanges"),
                "ip_addr" === n || "gateway" === n || "dns" === n || "ntp_addr" === n || "subnet" === n
                    ? showIPRequest({
                          title: i,
                          ip: t.val().split("."),
                          callback: function (e) {
                              t.val(e.join(".")).text(e.join("."));
                          },
                      })
                    : "o19" === n || "o38" === n
                    ? showSingleDurationInput({
                          data: t.val(),
                          title: i,
                          callback: function (e) {
                              t.val(e).text(e + "s");
                          },
                          label: _("Seconds"),
                          maximum: checkOSVersion(220) ? 600 : 60,
                          minimum: checkOSVersion(220) ? -600 : 0,
                          helptext: o,
                      })
                    : "o30" === n
                    ? showSingleDurationInput({
                          data: t.val(),
                          title: i,
                          callback: function (e) {
                              t.val(e).text(e + "ms");
                          },
                          label: _("Milliseconds"),
                          maximum: 2e3,
                          helptext: o,
                      })
                    : "o20" === n || "o39" === n
                    ? showSingleDurationInput({
                          data: t.val(),
                          title: i,
                          callback: function (e) {
                              t.val(e).text(e + "s");
                          },
                          label: _("Seconds"),
                          maximum: checkOSVersion(220) ? 600 : 0,
                          minimum: checkOSVersion(220) ? -600 : -60,
                          helptext: o,
                      })
                    : "o23" === n
                    ? showSingleDurationInput({
                          data: t.val(),
                          title: i,
                          callback: function (e) {
                              t.val(e).text(e + "%");
                          },
                          label: _("% Watering"),
                          maximum: 250,
                          helptext: o,
                      })
                    : "o17" === n
                    ? ((e = 0),
                      checkOSVersion(210) && (a = checkOSVersion(214) ? 57600 : 64800),
                      checkOSVersion(211) && ((e = -3540), (a = 3540)),
                      checkOSVersion(217) && ((e = -600), (a = 600)),
                      showSingleDurationInput({
                          data: t.val(),
                          title: i,
                          label: _("Seconds"),
                          callback: function (e) {
                              t.val(e), t.text(dhms2str(sec2dhms(e)));
                          },
                          maximum: a,
                          minimum: e,
                      }))
                    : ("o54" !== n && "o55" !== n && "o56" !== n && "o57" !== n) ||
                      showSingleDurationInput({
                          data: t.val(),
                          title: i,
                          callback: function (e) {
                              t.val(e).text(e + "m");
                          },
                          label: _("Minutes"),
                          maximum: 240,
                          minimum: 0,
                          helptext: o,
                      }),
                !1
            );
        }),
        c.find("#o2").on("change", function () {
            var e = $(this).is(":checked");
            c.find(".datetime-input button").prop("disabled", e), c.find("#ntp_addr").parents(".ui-field-contain").toggleClass("hidden", !e);
        }),
        c.find("#o18,#o37").on("change", function () {
            c
                .find("#o19,#o20")
                .parents(".ui-field-contain")
                .toggle(0 !== parseInt(c.find("#o18").val())),
                void 0 !== controller.options.mas2 &&
                    c
                        .find("#o38,#o39")
                        .parents(".ui-field-contain")
                        .toggle(0 !== parseInt(c.find("#o37").val()));
        }),
        c.find("#o31").on("change", function () {
            c.find("#o23").prop("disabled", 0 !== parseInt(this.value)),
                c
                    .find("#wto")
                    .click()
                    .parents(".ui-field-contain")
                    .toggleClass("hidden", 0 === parseInt(this.value));
        }),
        c.find("#wtkey").on("change input", function () {
            c.find("#wtkey").siblings(".help-icon").hide(), c.find("#wtkey").parent().removeClass("red green");
        }),
        c.find("#o49").on("click", function () {
            var e = {
                    program: _("Program Start"),
                    sensor1: _("Sensor 1 Update"),
                    flow: _("Flow Sensor Update"),
                    weather: _("Weather Adjustment Update"),
                    reboot: _("Controller Reboot"),
                    run: _("Station Run"),
                    sensor2: _("Sensor 2 Update"),
                    rain: _("Rain Delay Update"),
                },
                t = this,
                n = parseInt(t.value),
                i = "",
                o = 0,
                a = 0,
                s =
                    ($.each(e, function (e, t) {
                        (i += "<label for='ifttt-" + e + "'><input class='needsclick' data-iconpos='right' id='ifttt-" + e + "' type='checkbox' " + (getBitFromByte(n, o) ? "checked='checked'" : "") + ">" + t + "</label>"), o++;
                    }),
                    $(
                        "<div data-role='popup' data-theme='a'><div data-role='controlgroup' data-mini='true' class='tight'><div class='ui-bar ui-bar-a'>" +
                            _("Select IFTTT Events") +
                            "</div>" +
                            i +
                            "<input data-wrapper-class='attrib-submit' class='submit' data-theme='b' type='submit' value='" +
                            _("Submit") +
                            "' /></div></div>"
                    ));
            s.find(".submit").on("click", function () {
                (o = 0),
                    $.each(e, function (e) {
                        (a |= s.find("#ifttt-" + e).is(":checked") << o), o++;
                    }),
                    s.popup("close"),
                    n !== a && ((t.value = a), d.eq(2).prop("disabled", !1), c.find(".submit").addClass("hasChanges"));
            }),
                openPopup(s);
        }),
        c.find("#mqtt").on("click", function () {
            var t = this,
                n = t.value,
                e = $.extend({}, { en: 0, host: "server", port: 1883, user: "", pass: "" }, unescapeJSON(n)),
                i =
                    ($(".ui-popup-active").find("[data-role='popup']").popup("close"),
                    $(
                        "<div data-role='popup' data-theme='a' id='mqttSettings'><div data-role='header' data-theme='b'><h1>" +
                            _("MQTT Settings") +
                            "</h1></div><div class='ui-content'><label for='enable'>" +
                            _("Enable") +
                            "</label><input class='needsclick mqtt_enable' data-mini='true' data-iconpos='right' id='enable' type='checkbox' " +
                            (e.en ? "checked='checked'" : "") +
                            "><div class='ui-body'><div class='ui-grid-a' style='display:table;'><div class='ui-block-a' style='width:40%'><label for='server' style='padding-top:10px'>" +
                            _("Broker/Server") +
                            "</label></div><div class='ui-block-b' style='width:60%'><input class='mqtt-input' type='text' id='server' data-mini='true' maxlength='50' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false'" +
                            (e.en ? "" : "disabled='disabled'") +
                            " placeholder='" +
                            _("broker/server") +
                            "' value='" +
                            e.host +
                            "' required /></div><div class='ui-block-a' style='width:40%'><label for='port' style='padding-top:10px'>" +
                            _("Port") +
                            "</label></div><div class='ui-block-b' style='width:60%'><input class='mqtt-input' type='number' id='port' data-mini='true' pattern='[0-9]*' min='0' max='65535'" +
                            (e.en ? "" : "disabled='disabled'") +
                            " placeholder='1883' value='" +
                            e.port +
                            "' required /></div><div class='ui-block-a' style='width:40%'><label for='username' style='padding-top:10px'>" +
                            _("Username") +
                            "</label></div><div class='ui-block-b' style='width:60%'><input class='mqtt-input' type='text' id='username' data-mini='true' maxlength='32' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false'" +
                            (e.en ? "" : "disabled='disabled'") +
                            " placeholder='" +
                            _("username (optional)") +
                            "' value='" +
                            e.user +
                            "' required /></div><div class='ui-block-a' style='width:40%'><label for='password' style='padding-top:10px'>" +
                            _("Password") +
                            "</label></div><div class='ui-block-b' style='width:60%'><input class='mqtt-input' type='password' id='password' data-mini='true' maxlength='32' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false'" +
                            (e.en ? "" : "disabled='disabled'") +
                            " placeholder='" +
                            _("password (optional)") +
                            "' value='" +
                            e.pass +
                            "' required /></div></div></div><button class='submit' data-theme='b'>" +
                            _("Submit") +
                            "</button></div></div>"
                    ));
            i.find("#enable").on("change", function () {
                this.checked ? i.find(".mqtt-input").textinput("enable") : i.find(".mqtt-input").textinput("disable");
            }),
                i.find(".submit").on("click", function () {
                    var e = { en: i.find("#enable").prop("checked") ? 1 : 0, host: i.find("#server").val(), port: parseInt(i.find("#port").val()), user: i.find("#username").val(), pass: i.find("#password").val() };
                    i.popup("close"), n !== escapeJSON(e) && ((t.value = escapeJSON(e)), d.eq(2).prop("disabled", !1), c.find(".submit").addClass("hasChanges"));
                }),
                i.css("max-width", "380px"),
                openPopup(i, { positionTo: "window" });
        }),
        c.find("#otc").on("click", function () {
            var t = this,
                n = t.value,
                e = $.extend({}, { en: 0, token: "", server: "ws.cloud.openthings.io", port: 80 }, unescapeJSON(n)),
                i =
                    ($(".ui-popup-active").find("[data-role='popup']").popup("close"),
                    $(
                        "<div data-role='popup' data-theme='a' id='otcSettings'><div data-role='header' data-theme='b'><h1>" +
                            _("OpenThings Cloud (OTC) Settings") +
                            "</h1></div><div class='ui-content'><label for='enable'>" +
                            _("Enable") +
                            "</label><input class='needsclick otc_enable' data-mini='true' data-iconpos='right' id='enable' type='checkbox' " +
                            (e.en ? "checked='checked'" : "") +
                            "><div class='ui-body'><div class='ui-grid-a' style='display:table;'><div class='ui-block-a' style='width:25%'><label for='token' style='padding-top:10px'>" +
                            _("Token") +
                            "</label></div><div class='ui-block-b' style='width:75%'><input class='otc-input' type='text' id='token' data-mini='true' maxlength='36' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false'" +
                            (e.en ? "" : "disabled='disabled'") +
                            " placeholder='" +
                            _("token") +
                            "' value='" +
                            e.token +
                            "' required /></div><div class='ui-block-a' style='width:25%'><label for='server' style='padding-top:10px'>" +
                            _("Server") +
                            "</label></div><div class='ui-block-b' style='width:75%'><input class='otc-input' type='text' id='server' data-mini='true' maxlength='50' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false'" +
                            (e.en ? "" : "disabled='disabled'") +
                            " placeholder='" +
                            _("server") +
                            "' value='" +
                            e.server +
                            "' required /></div><div class='ui-block-a' style='width:25%'><label for='port' style='padding-top:10px'>" +
                            _("Port") +
                            "</label></div><div class='ui-block-b' style='width:75%'><input class='otc-input' type='number' id='port' data-mini='true' pattern='[0-9]*' min='0' max='65535'" +
                            (e.en ? "" : "disabled='disabled'") +
                            " placeholder='80' value='" +
                            e.port +
                            "' required /></div></div></div><button class='submit' data-theme='b'>" +
                            _("Submit") +
                            "</button></div></div>"
                    ));
            i.find("#enable").on("change", function () {
                this.checked ? i.find(".otc-input").textinput("enable") : i.find(".otc-input").textinput("disable");
            }),
                i.find(".submit").on("click", function () {
                    var e;
                    i.find("#enable").prop("checked") && 32 !== i.find("#token").val().length
                        ? showerror(_("OpenThings Token must be 32 characters long."))
                        : ((e = { en: i.find("#enable").prop("checked") ? 1 : 0, token: i.find("#token").val(), server: i.find("#server").val(), port: parseInt(i.find("#port").val()) }),
                          i.popup("close"),
                          n !== escapeJSON(e) && ((t.value = escapeJSON(e)), d.eq(2).prop("disabled", !1), c.find(".submit").addClass("hasChanges")));
                }),
                i.css("max-width", "380px"),
                openPopup(i, { positionTo: "window" });
        }),
        c.find(".datetime-input").on("click", function () {
            var t = $(this).find("button");
            if (!t.prop("disabled"))
                return (
                    d.eq(2).prop("disabled", !1),
                    c.find(".submit").addClass("hasChanges"),
                    showDateTimeInput(t.val(), function (e) {
                        t.text(dateToString(e).slice(0, -3)).val(Math.round(e.getTime() / 1e3));
                    }),
                    !1
                );
        }),
        c.one("pagehide", function () {
            c.remove();
        }),
        d.eq(2).prop("disabled", !0),
        $("#os-options").remove(),
        $.mobile.pageContainer.append(c);
}
var showHomeMenu = (function () {
        var t, n, i, o;
        return function (e) {
            (e = e instanceof $ ? e : $(e)),
                $(".ui-popup-active").find("[data-role='popup']").popup("close"),
                (t = $(".ui-page-active")),
                (n = t.attr("id")),
                (i = t.hasClass("show-hidden")),
                (o = $(
                    "<div data-role='popup' data-theme='a' id='mainMenu'><ul data-role='listview' data-inset='true' data-corners='false'><li data-role='list-divider'>" +
                        _("Information") +
                        "</li><li><a href='#preview' class='squeeze'>" +
                        _("Preview Programs") +
                        "</a></li>" +
                        (checkOSVersion(206) || checkOSPiVersion("1.9") ? "<li><a href='#logs'>" + _("View Logs") + "</a></li>" : "") +
                        "<li data-role='list-divider'>" +
                        _("Programs and Settings") +
                        "</li><li><a href='#raindelay'>" +
                        _("Change Rain Delay") +
                        "</a></li>" +
                        (Supported.pausing()
                            ? StationQueue.isPaused()
                                ? "<li><a href='#globalpause'>" + _("Resume Station Runs") + "</a></li>"
                                : -1 <= StationQueue.isActive()
                                ? "<li><a href='#globalpause'>" + _("Pause Station Runs") + "</a></li>"
                                : ""
                            : "") +
                        "<li><a href='#runonce'>" +
                        _("Run-Once Program") +
                        "</a></li><li><a href='#programs'>" +
                        _("Edit Programs") +
                        "</a></li><li><a href='#os-options'>" +
                        _("Edit Options") +
                        "</a></li>" +
                        (checkOSVersion(210) ? "" : "<li><a href='#manual'>" + _("Manual Control") + "</a></li>") +
                        ("sprinklers" === n || "runonce" === n || "programs" === n || "manual" === n || "addprogram" === n
                            ? "</ul><div class='ui-grid-a ui-mini tight'><div class='ui-block-a'><a class='ui-btn tight' href='#show-hidden'>" +
                              _(i ? "Hide" : "Show") +
                              " " +
                              _("Disabled") +
                              "</a></div><div class='ui-block-b'><a class='ui-btn red tight' href='#stop-all'>" +
                              _("Stop All Stations") +
                              "</a></div></div>"
                            : "<li><a class='ui-btn red' href='#stop-all'>" + _("Stop All Stations") + "</a></li></ul>") +
                        "</div>"
                )).on("click", "a", function () {
                    var e = $(this).attr("href");
                    return (
                        o.popup("close"),
                        "#stop-all" === e
                            ? stopAllStations()
                            : "#show-hidden" === e
                            ? i
                                ? ($(".station-hidden").hide(), t.removeClass("show-hidden"))
                                : ($(".station-hidden").show(), t.addClass("show-hidden"))
                            : "#raindelay" === e
                            ? showRainDelay()
                            : "#globalpause" === e
                            ? showPause()
                            : checkChanges(function () {
                                  changePage(e);
                              }),
                        !1
                    );
                }),
                $("#mainMenu").remove(),
                o.one("popupafterclose", function () {
                    e.show();
                }),
                openPopup(o, { positionTo: e }),
                e.hide();
        };
    })(),
    showHome = (function () {
        function d(e) {
            var t = Station.getName(e),
                n = 0 < Station.getPID(e),
                i = Station.isRunning(e),
                o = n ? pidname(Station.getPID(e)) : "",
                a = Station.getRemainingRuntime(e),
                s = Supported.pausing() && StationQueue.isPaused(),
                r = !!v[g].images[e];
            Station.getStatus(e) && 0 < a && y(e, a),
                (f =
                    (f =
                        (f =
                            (f = f + ("<div data-station='" + e + "' class='ui-corner-all card" + (Station.isDisabled(e) ? " station-hidden' style='display:none" : "")) + "'><div class='ui-body ui-body-a center'>") +
                            "<img src='" +
                            (r ? "data:image/jpeg;base64," + v[g].images[e] : getAppURLPath() + "img/placeholder.png") +
                            "' />") +
                        "<p class='station-name center inline-icon' id='station_" +
                        e +
                        "'>" +
                        t +
                        "</p><span class='btn-no-border ui-btn ui-btn-icon-notext ui-corner-all card-icon station-status " +
                        (i ? "on" : n ? "wait" : "off") +
                        "'></span>") +
                    "<span class='btn-no-border ui-btn ui-btn-icon-notext ui-icon-wifi card-icon special-station " +
                    (Station.isSpecial(e) ? "" : "hidden") +
                    "'></span>"),
                Supported.groups() && (f += "<span class='btn-no-border ui-btn card-icon station-gid " + (Station.isMaster(e) ? "hidden" : "") + "'>" + mapGIDValueToName(Station.getGIDValue(e)) + "</span>"),
                (f +=
                    "<span class='btn-no-border ui-btn " +
                    (Station.isMaster(e) ? "ui-icon-master" : "ui-icon-gear") +
                    " card-icon ui-btn-icon-notext station-settings' data-station='" +
                    e +
                    "' id='attrib-" +
                    e +
                    "' " +
                    (Supported.master(MASTER_STATION_1) ? "data-um='" + StationAttribute.getMasterOperation(e, MASTER_STATION_1) + "' " : "") +
                    (Supported.master(MASTER_STATION_2) ? "data-um2='" + StationAttribute.getMasterOperation(e, MASTER_STATION_2) + "' " : "") +
                    (Supported.ignoreRain() ? "data-ir='" + StationAttribute.getIgnoreRain(e) + "' " : "") +
                    (Supported.ignoreSensor(IGNORE_SENSOR_1) ? "data-sn1='" + StationAttribute.getIgnoreSensor(e, IGNORE_SENSOR_1) + "' " : "") +
                    (Supported.ignoreSensor(IGNORE_SENSOR_2) ? "data-sn2='" + StationAttribute.getIgnoreSensor(e, IGNORE_SENSOR_2) + "' " : "") +
                    (Supported.actRelay() ? "data-ar='" + StationAttribute.getActRelay(e) + "' " : "") +
                    (Supported.disabled() ? "data-sd='" + StationAttribute.getDisabled(e) + "' " : "") +
                    (Supported.sequential() ? "data-us='" + StationAttribute.getSequential(e) + "' " : "") +
                    (Supported.special() ? "data-hs='" + StationAttribute.getSpecial(e) + "' " : "") +
                    (Supported.groups() ? "data-gid='" + Station.getGIDValue(e) + "' " : "") +
                    "></span>"),
                Station.isMaster(e) ||
                    ((n || i) &&
                        ((f += "<p class='rem center'>" + (i ? _("Running") + " " + o : _("Scheduled") + " " + (Station.getStartTime(e) ? _("for") + " " + dateToString(new Date(1e3 * Station.getStartTime(e))) : o))),
                        0 < a && (f += " <span id=" + (s ? "'pause" : "'countdown-") + e + "' class='nobr'>(" + sec2hms(a) + " " + _("remaining") + ")</span>"),
                        (f += "</p>"))),
                (f += "</div><hr style='display:none' class='content-divider'" + (Supported.groups() ? "divider-gid=" + Station.getGIDValue(e) : "") + "></div>");
        }
        function e() {
            $("#stn_attrib").popup("destroy").remove();
            var r = $(this),
                c = r.data("station"),
                l = r.siblings("[id='station_" + c + "']"),
                d = function () {
                    var e = p.find("#http-server").val() + "," + p.find("#http-port").val() + "," + p.find("#http-on").val() + "," + p.find("#http-off").val(),
                        e = encodeURIComponent(e).length;
                    p.find("#character-count").text(240 - e),
                        240 < e
                            ? (p.find(".attrib-submit").addClass("ui-disabled"), p.find("#character-tracking").addClass("red-text bold"))
                            : (p.find(".attrib-submit").removeClass("ui-disabled"), p.find("#character-tracking").removeClass("red-text bold"));
                },
                u = function (e) {
                    var t = parseInt(p.find("#hs").val());
                    if ((r.data("hs", t), 1 === t)) r.data("specialData", p.find("#rf-code").val());
                    else if (2 === t) {
                        for (var n = p.find("#remote-address").val().split("."), i = parseInt(p.find("#remote-port").val()) || 80, o = (p.find("#remote-station").val() || 1) - 1, a = "", s = 0; s < 4; s++)
                            a += pad(parseInt(n[s]).toString(16));
                        if (((a = (a += (i < 256 ? "00" : "") + pad(i.toString(16))) + pad(o.toString(16))), !0 !== e))
                            return (
                                $.mobile.loading("show"),
                                p.find(".attrib-submit").addClass("ui-disabled"),
                                void verifyRemoteStation(a, function (e) {
                                    var t, n;
                                    !0 === e
                                        ? u(!0)
                                        : (!1 === e || -1 === e
                                              ? (t = _("Unable to reach the remote station."))
                                              : -2 === e
                                              ? (t = _("Password on remote controller does not match the password on this controller."))
                                              : -3 === e && (t = _("Remote controller is not configured as an extender. Would you like to do this now?")),
                                          p.one("popupafterclose", function () {
                                              $.mobile.loading("hide"), n.css("opacity", "");
                                          }),
                                          $.mobile.loading("show", {
                                              html: "<h1>" + t + "</h1><button class='ui-btn cancel'>" + _("Cancel") + "</button><button class='ui-btn continue'>" + _("Continue") + "</button>",
                                              textVisible: !0,
                                              theme: "b",
                                          }),
                                          (n = $(".ui-loader")).css("opacity", ".96"),
                                          n.find(".cancel").one("click", function () {
                                              $.mobile.loading("hide"), n.css("opacity", "");
                                          }),
                                          n.find(".continue").one("click", function () {
                                              $.mobile.loading("hide"), n.css("opacity", ""), -3 === e && convertRemoteToExtender(a), u(!0);
                                          }),
                                          p.find(".attrib-submit").removeClass("ui-disabled"));
                                })
                            );
                        r.data("specialData", a);
                    } else
                        3 === t
                            ? ((i = pad(p.find("#gpio-pin").val() || "05")), (i += p.find("#active-state").val() || "1"), r.data("specialData", i))
                            : 4 === t && ((o = p.find("#http-server").val()), (o = (o = (o += "," + p.find("#http-port").val()) + "," + p.find("#http-on").val()) + "," + p.find("#http-off").val()), r.data("specialData", o));
                    r.data("um", p.find("#um").is(":checked") ? 1 : 0),
                        r.data("um2", p.find("#um2").is(":checked") ? 1 : 0),
                        r.data("ir", p.find("#ir").is(":checked") ? 1 : 0),
                        r.data("sn1", p.find("#sn1").is(":checked") ? 1 : 0),
                        r.data("sn2", p.find("#sn2").is(":checked") ? 1 : 0),
                        r.data("ar", p.find("#ar").is(":checked") ? 1 : 0),
                        r.data("sd", p.find("#sd").is(":checked") ? 1 : 0),
                        r.data("us", p.find("#us").is(":checked") ? 1 : 0),
                        l.html(p.find("#stn-name").val());
                    e = p.find("span.seqgrp").text();
                    r.attr("data-gid", mapGIDNameToValue(e)), (v[g].notes[c] = p.find("#stn-notes").val()), storage.set({ sites: JSON.stringify(v) }, cloudSaveSites), w(c), p.popup("destroy").remove();
                },
                p = "<div data-overlay-theme='b' data-role='popup' data-theme='a' id='stn_attrib'><fieldset style='margin:0' data-mini='true' data-corners='false' data-role='controlgroup'><form><div id='station-tabs'>";
            if ("number" != typeof c) return !1;
            if (
                (Supported.special() && (p += "<ul class='tabs'><li class='current' data-tab='tab-basic'>" + _("Basic") + "</li><li data-tab='tab-advanced'>" + _("Advanced") + "</li></ul>"),
                (p =
                    (p =
                        (p += "<div id='tab-basic' class='tab-content current'>") +
                        ("<div class='ui-bar-a ui-bar'>" + _("Station Name") + ":</div><input class='bold center' data-corners='false' data-wrapper-class='tight stn-name ui-btn' id='stn-name' type='text' value=\"" + l.text() + '">')) +
                    ("<button class='changeBackground'>" + ("string" != typeof v[g].images[c] ? _("Add") : _("Change")) + " " + _("Image") + "</button>")),
                Station.isMaster(c) ||
                    (Supported.master(MASTER_STATION_1) &&
                        (p +=
                            "<label for='um'><input class='needsclick' data-iconpos='right' id='um' type='checkbox' " +
                            (1 === r.data("um") ? "checked='checked'" : "") +
                            ">" +
                            _("Use Master") +
                            " " +
                            (Supported.master(MASTER_STATION_2) ? "1" : "") +
                            "</label>"),
                    Supported.master(MASTER_STATION_2) &&
                        (p += "<label for='um2'><input class='needsclick' data-iconpos='right' id='um2' type='checkbox' " + (1 === r.data("um2") ? "checked='checked'" : "") + ">" + _("Use Master") + " 2</label>"),
                    Supported.ignoreRain() && (p += "<label for='ir'><input class='needsclick' data-iconpos='right' id='ir' type='checkbox' " + (1 === r.data("ir") ? "checked='checked'" : "") + ">" + _("Ignore Rain") + "</label>"),
                    Supported.ignoreSensor(IGNORE_SENSOR_1) &&
                        (p += "<label for='sn1'><input class='needsclick' data-iconpos='right' id='sn1' type='checkbox' " + (1 === r.data("sn1") ? "checked='checked'" : "") + ">" + _("Ignore Sensor 1") + "</label>"),
                    Supported.ignoreSensor(IGNORE_SENSOR_2) &&
                        (p += "<label for='sn2'><input class='needsclick' data-iconpos='right' id='sn2' type='checkbox' " + (1 === r.data("sn2") ? "checked='checked'" : "") + ">" + _("Ignore Sensor 2") + "</label>"),
                    Supported.actRelay() && (p += "<label for='ar'><input class='needsclick' data-iconpos='right' id='ar' type='checkbox' " + (1 === r.data("ar") ? "checked='checked'" : "") + ">" + _("Activate Relay") + "</label>"),
                    Supported.disabled() && (p += "<label for='sd'><input class='needsclick' data-iconpos='right' id='sd' type='checkbox' " + (1 === r.data("sd") ? "checked='checked'" : "") + ">" + _("Disable") + "</label>"),
                    Supported.sequential() &&
                        !Supported.groups() &&
                        (p += "<label for='us'><input class='needsclick' data-iconpos='right' id='us' type='checkbox' " + (1 === r.data("us") ? "checked='checked'" : "") + ">" + _("Sequential") + "</label>")),
                (p =
                    (p += "<div class='ui-bar-a ui-bar'>" + _("Station Notes") + ":</div><textarea data-corners='false' class='tight stn-notes' id='stn-notes'>" + (v[g].notes[c] || "") + "</textarea>") +
                    "</div>" +
                    "<div id='tab-advanced' class='tab-content'>"),
                Supported.groups() &&
                    !Station.isMaster(c) &&
                    (p +=
                        "<div class='ui-bar-a ui-bar seq-container'>" +
                        _("Sequential Group") +
                        ":</div><select id='gid' class='seqgrp' data-mini='true'></select><div><p id='prohibit-change' class='center hidden' style='color: #ff0033;'>Changing group designation is prohibited while station is running</p></div>"),
                Supported.special() &&
                    (p +=
                        "<div class='ui-bar-a ui-bar'>" +
                        _("Station Type") +
                        ":</div><select data-mini='true' id='hs'" +
                        (Station.isSpecial(c) ? " class='ui-disabled'" : "") +
                        "><option data-hs='0' value='0'" +
                        (Station.isSpecial(c) ? "" : "selected") +
                        ">" +
                        _("Standard") +
                        "</option><option data-hs='1' value='1'>" +
                        _("RF") +
                        "</option><option data-hs='2' value='2'>" +
                        _("Remote") +
                        "</option><option data-hs='3' value='3'" +
                        (checkOSVersion(217) && ((void 0 !== controller.settings.gpio && 0 < controller.settings.gpio.length) || "OSPi" === getHWVersion() || "2.3" === getHWVersion()) ? ">" : " disabled>") +
                        _("GPIO") +
                        "</option><option data-hs='4' value='4'" +
                        (checkOSVersion(217) ? ">" : " disabled>") +
                        _("HTTP") +
                        "</option></select><div id='specialOpts'></div>"),
                (p = (p += "</div>") + ("<input data-wrapper-class='attrib-submit' data-theme='b' type='submit' value='" + _("Submit") + "' /></form></fieldset></div>")),
                (p = $(p)
                    .enhanceWithin()
                    .on("submit", "form", function () {
                        return u(c), !1;
                    })),
                Supported.groups())
            ) {
                var e = p.find("select.seqgrp"),
                    t = p.find("span.seqgrp"),
                    n = Station.getGIDValue(c),
                    i = Station.isRunning(c),
                    o = p.find("p#prohibit-change");
                i ? (e.addClass("ui-state-disabled"), o.removeClass("hidden")) : (e.removeClass("ui-state-disabled"), o.addClass("hidden"));
                for (var a = 0; a <= NUM_SEQ_GROUPS; a++) {
                    var s = mapIndexToGIDValue(a),
                        h = mapGIDValueToName(s),
                        f = $("<option data-gid='" + s + "' value='" + s + "'>" + _(h) + "</option>");
                    s === n ? (f.prop("selected", !0), t.text(h)) : f.prop("selected", !1), e.append(f);
                }
            }
            p.find("ul.tabs li").click(function () {
                var e = $(this).attr("data-tab");
                $("ul.tabs li").removeClass("current"), $(".tab-content").removeClass("current"), $(this).addClass("current"), $("#" + e).addClass("current");
            }),
                p.find("#hs").on("change", function () {
                    var e = parseInt($(this).val()),
                        t = p.find("#specialOpts"),
                        n = controller.special && controller.special.hasOwnProperty(c) ? controller.special[c].sd : "",
                        i = controller.special && controller.special.hasOwnProperty(c) ? controller.special[c].st : 0;
                    if ((t.empty(), 0 === e)) t.append("<p class='special-desc center small'>" + _("Select the station type using the dropdown selector above and configure the station properties.") + "</p>").enhanceWithin();
                    else if (1 === e)
                        (n = i === e ? n : "0000000000000000"),
                            t
                                .append(
                                    "<div class='ui-bar-a ui-bar'>" + _("RF Code") + ":</div><input class='center' data-corners='false' data-wrapper-class='tight ui-btn stn-name' id='rf-code' required='true' type='text' value='" + n + "'>"
                                )
                                .enhanceWithin();
                    else if (2 === e)
                        (n = parseRemoteStationData(i === e ? n : "00000000005000")),
                            t
                                .append(
                                    "<div class='ui-bar-a ui-bar'>" +
                                        _("Remote Address") +
                                        ":</div><input class='center' data-corners='false' data-wrapper-class='tight ui-btn stn-name' id='remote-address' required='true' type='text' pattern='^(?:[0-9]{1,3}.){3}[0-9]{1,3}$' value='" +
                                        n.ip +
                                        "'><div class='ui-bar-a ui-bar'>" +
                                        _("Remote Port") +
                                        ":</div><input class='center' data-corners='false' data-wrapper-class='tight ui-btn stn-name' id='remote-port' required='true' type='number' placeholder='80' min='0' max='65535' value='" +
                                        n.port +
                                        "'><div class='ui-bar-a ui-bar'>" +
                                        _("Remote Station (index)") +
                                        ":</div><input class='center' data-corners='false' data-wrapper-class='tight ui-btn stn-name' id='remote-station' required='true' type='number' min='1' max='200' placeholder='1' value='" +
                                        (n.station + 1) +
                                        "'>"
                                )
                                .enhanceWithin();
                    else if (3 === e) {
                        var o = 5,
                            a = 1,
                            s = [];
                        if (
                            (controller.settings.gpio
                                ? (s = controller.settings.gpio)
                                : "OSPi" === getHWVersion()
                                ? (s = [5, 6, 7, 8, 9, 10, 11, 12, 13, 16, 18, 19, 20, 21, 23, 24, 25, 26])
                                : "2.3" === getHWVersion() && (s = [2, 10, 12, 13, 14, 15, 18, 19]),
                            i === e && ((n = n.split("")), (o = parseInt(n[0] + n[1])), (a = parseInt(n[2]))),
                            s.length)
                        ) {
                            for (var r = "<div class='ui-bar-a ui-bar'>" + _("GPIO Pin") + ":</div><select class='center' data-corners='false' data-wrapper-class='tight ui-btn stn-name' id='gpio-pin'>", l = 0; l < s.length; l++)
                                r += "<option value='" + s[l] + "' " + (s[l] === o ? "selected='selected'" : "") + ">" + s[l];
                            r += "</select>";
                        } else r = "";
                        (r +=
                            "<div class='ui-bar-a ui-bar'>" +
                            _("Active State") +
                            ":</div><select class='center' data-corners='false' data-wrapper-class='tight ui-btn stn-name' id='active-state'><option value='1' " +
                            (1 === a ? "selected='selected'" : "") +
                            ">" +
                            _("HIGH") +
                            "<option value='0' " +
                            (0 === a ? "selected='selected'" : "") +
                            ">" +
                            _("LOW") +
                            "</select>"),
                            t.append(r).enhanceWithin();
                    } else
                        4 === e &&
                            ((n = i === e ? n.split(",") : ["server", "80", "On", "Off"]),
                            t
                                .append(
                                    "<div class='ui-bar-a ui-bar'>" +
                                        _("Server Name") +
                                        ":</div><input class='center  validate-length' data-corners='false' data-wrapper-class='tight ui-btn stn-name' id='http-server' required='true' type='text' value='" +
                                        n[0] +
                                        "'><div class='ui-bar-a ui-bar'>" +
                                        _("Server Port") +
                                        ":</div><input class='center  validate-length' data-corners='false' data-wrapper-class='tight ui-btn stn-name' id='http-port' required='true' type='number' min='0' max='65535' value='" +
                                        parseInt(n[1]) +
                                        "'><div class='ui-bar-a ui-bar'>" +
                                        _("On Command") +
                                        ":</div><input class='center validate-length' data-corners='false' data-wrapper-class='tight ui-btn stn-name' id='http-on' required='true' type='text' value='" +
                                        n[2] +
                                        "'><div class='ui-bar-a ui-bar'>" +
                                        _("Off Command") +
                                        ":</div><input class='center validate-length' data-corners='false' data-wrapper-class='tight ui-btn stn-name' id='http-off' required='true' type='text' value='" +
                                        n[3] +
                                        "'><div class='center smaller' id='character-tracking' style='color:#999;'><p>" +
                                        _("Note: There is a limit on the number of character used to configure this station type.") +
                                        "</p><span>" +
                                        _("Characters remaining") +
                                        ": </span><span id='character-count'>placeholder</span></div>"
                                )
                                .enhanceWithin(),
                            d(),
                            $(".validate-length").on("input", d));
                    return !1;
                }),
                Station.isSpecial(c)
                    ? updateControllerStationSpecial(function () {
                          p
                              .find("#hs")
                              .removeClass("ui-disabled")
                              .find("option[data-hs='" + controller.special[c].st + "']")
                              .prop("selected", !0),
                              p.find("#hs").change();
                      })
                    : (p.find("#hs").removeClass("ui-disabled"), p.find("option[data-hs='0']").prop("selected", !0), p.find("#hs").change()),
                p.find(".changeBackground").on("click", function (e) {
                    e.preventDefault();
                    var t = this;
                    getPicture(function (e) {
                        (v[g].images[c] = e), storage.set({ sites: JSON.stringify(v) }, cloudSaveSites), S(), (t.innerHTML = _("Change") + " " + _("Image"));
                    });
                }),
                $.mobile.pageContainer.append(p),
                (i = { history: !1 }),
                isiOS ? ((o = getPageTop()), (i.x = o.x), (i.y = o.y)) : (i.positionTo = "window"),
                p.popup(i).popup("open");
        }
        function u() {
            timers.clock = {
                val: controller.settings.devt,
                update: function () {
                    b.find("#clock-s").text(dateToString(new Date(1e3 * this.val), null, 1));
                },
            };
        }
        function p() {
            var e = b.find("#os-stations-list"),
                t = e.children(),
                n = groupView ? i : o;
            t.sort(n).detach().appendTo(e), (Supported.groups() && groupView ? a : s)(e, t);
        }
        function h(t) {
            (t = t || function () {}),
                (g = m.val()),
                storage.get("sites", function (e) {
                    "object" != typeof (v = parseSites(e.sites))[g].images || $.isEmptyObject(v[g].images) ? ((v[g].images = {}), b.removeClass("has-images")) : b.addClass("has-images"),
                        "object" != typeof v[g].notes && (v[g].notes = {}),
                        "object" != typeof v[g].lastRunTime && (v[g].lastRunTime = {}),
                        t();
                });
        }
        var f,
            m,
            g,
            n,
            v,
            b = $(
                "<div data-role='page' id='sprinklers'><div class='ui-panel-wrapper'><div class='ui-content' role='main'><div class='ui-grid-a ui-body ui-corner-all info-card noweather'><div class='ui-block-a'><div id='weather' class='pointer'></div></div><div class='ui-block-b center home-info pointer'><div class='sitename bold'></div><div id='clock-s' class='nobr'></div>" +
                    _("Water Level") +
                    ": <span class='waterlevel'></span>%</div></div><div id='os-stations-list' class='card-group center'></div></div></div></div>"
            ),
            y = function (e, t) {
                timers["station-" + e] = {
                    val: t,
                    station: e,
                    update: function () {
                        b.find("#countdown-" + e).text("(" + sec2hms(this.val) + " " + _("remaining") + ")");
                    },
                    done: function () {
                        b.find("#countdown-" + e)
                            .parent("p")
                            .empty()
                            .siblings(".station-status")
                            .removeClass("on")
                            .addClass("off");
                    },
                };
            },
            w = function (e) {
                for (var t, n, i, o, a = !0 === checkOSVersion(208), s = {}, r = {}, l = {}, c = {}, d = {}, u = {}, p = {}, h = {}, f = {}, m = {}, g = 0; g < controller.settings.nbrd; g++)
                    for (
                        Supported.master(MASTER_STATION_1) && (s["m" + g] = 0),
                            Supported.master(MASTER_STATION_2) && (r["n" + g] = 0),
                            Supported.sequential() && (l["q" + g] = 0),
                            Supported.special() && (c["p" + g] = 0),
                            Supported.ignoreRain() && (d["i" + g] = 0),
                            Supported.ignoreSensor(IGNORE_SENSOR_1) && (u["j" + g] = 0),
                            Supported.ignoreSensor(IGNORE_SENSOR_2) && (p["k" + g] = 0),
                            Supported.actRelay() && (h["a" + g] = 0),
                            Supported.disabled() && (f["d" + g] = 0),
                            o = 0;
                        o < 8;
                        o++
                    )
                        (t = b.find("#attrib-" + (n = 8 * g + o))),
                            Supported.master(MASTER_STATION_1) && (s["m" + g] = s["m" + g] + (t.data("um") << o)),
                            Supported.master(MASTER_STATION_2) && (r["n" + g] = r["n" + g] + (t.data("um2") << o)),
                            Supported.sequential() && (l["q" + g] = l["q" + g] + (t.data("us") << o)),
                            Supported.special() && (c["p" + g] = c["p" + g] + ((t.data("hs") ? 1 : 0) << o)),
                            Supported.ignoreRain() && (d["i" + g] = d["i" + g] + (t.data("ir") << o)),
                            Supported.ignoreSensor(IGNORE_SENSOR_1) && (u["j" + g] = u["j" + g] + (t.data("sn1") << o)),
                            Supported.ignoreSensor(IGNORE_SENSOR_2) && (p["k" + g] = p["k" + g] + (t.data("sn2") << o)),
                            Supported.actRelay() && (h["a" + g] = h["a" + g] + (t.data("ar") << o)),
                            Supported.disabled() && (f["d" + g] = f["d" + g] + (t.data("sd") << o)),
                            n === e &&
                                ((m["s" + n] = a
                                    ? b
                                          .find("#station_" + n)
                                          .text()
                                          .replace(/\s/g, "_")
                                    : b.find("#station_" + n).text()),
                                Supported.special() && t.data("hs") && ((c.st = t.data("hs")), (c.sd = t.data("specialData")), (c.sid = e)),
                                Supported.groups()) &&
                                (i = t.attr("data-gid"));
                $.mobile.loading("show"),
                    sendToOS(
                        "/cs?pw=&" +
                            $.param(m) +
                            (Supported.master(MASTER_STATION_1) ? "&" + $.param(s) : "") +
                            (Supported.master(MASTER_STATION_2) ? "&" + $.param(r) : "") +
                            (Supported.sequential() ? "&" + $.param(l) : "") +
                            (Supported.special() ? "&" + $.param(c) : "") +
                            (Supported.ignoreRain() ? "&" + $.param(d) : "") +
                            (Supported.ignoreSensor(IGNORE_SENSOR_1) ? "&" + $.param(u) : "") +
                            (Supported.ignoreSensor(IGNORE_SENSOR_2) ? "&" + $.param(p) : "") +
                            (Supported.actRelay() ? "&" + $.param(h) : "") +
                            (Supported.disabled() ? "&" + $.param(f) : "") +
                            (Supported.groups() ? "&g" + e + "=" + i : "")
                    ).done(function () {
                        showerror(_("Stations have been updated")),
                            updateController(function () {
                                $("html").trigger("datarefresh");
                            });
                    });
            },
            i = function (e, t) {
                var e = $(e),
                    t = $(t),
                    n = Card.getSID(e),
                    i = Card.getSID(t),
                    o = 0 < Station.isMaster(n) ? 1 : 0,
                    a = 0 < Station.isMaster(i) ? 1 : 0;
                return a < o
                    ? -1
                    : o < a
                    ? 1
                    : (o = Station.getGIDValue(Card.getSID(e))) < (a = Station.getGIDValue(Card.getSID(t)))
                    ? -1
                    : a < o
                    ? 1
                    : ((e = Station.getStatus(n)), (t = Station.getStatus(i)) < e ? -1 : e < t ? 1 : n < i ? -1 : i < n ? 1 : 0);
            },
            o = function (e, t) {
                var e = $(e),
                    t = $(t),
                    e = Card.getSID(e),
                    t = Card.getSID(t),
                    n = Station.getStatus(e),
                    i = Station.getStatus(t);
                return i < n ? -1 : n < i ? 1 : e < t ? -1 : t < e ? 1 : 0;
            },
            a = function (e, t) {
                for (var n, i, o, a, s = 0; s < e.children().length; s++) (n = CardList.getCardByIndex(t, s)), Card.setGroupLabel(n, Card.getGIDName(n));
                for (s = 0; s < e.children().length - 1; s++)
                    (n = CardList.getCardByIndex(t, s)),
                        (i = CardList.getCardByIndex(t, s + 1)),
                        (o = Card.getDivider(n)),
                        (a = Card.getGroupLabel(n)),
                        Card.isMasterStation(n) ? (Card.isMasterStation(i) ? o.hide() : o.show(), a.addClass("hidden")) : Station.getGIDValue(Card.getSID(n)) !== Station.getGIDValue(Card.getSID(i)) ? o.show() : o.hide();
                Card.getDivider(i).show(), Card.setGroupLabel(i, Card.getGIDName(i));
            },
            s = function (e, t) {
                for (var n, i, o, a, s = 0; s < e.children().length - 1; s++)
                    (n = CardList.getCardByIndex(t, s)),
                        (i = CardList.getCardByIndex(t, s + 1)),
                        (o = Card.getDivider(n)).hide(),
                        Card.setGroupLabel(n, mapGIDValueToName(Station.getGIDValue(Card.getSID(n)))),
                        void 0 !== (a = Card.getGroupLabel(n)) && Card.isMasterStation(n) && a.addClass("hidden"),
                        Station.isRunning(Card.getSID(n)) && !Station.isRunning(Card.getSID(i)) && o.show();
                Card.getDivider(i).hide(), Card.setGroupLabel(i, mapGIDValueToName(Station.getGIDValue(s))), void 0 !== (a = Card.getGroupLabel(i)) && Card.isMasterStation(i) && a.addClass("hidden");
            },
            S = function () {
                var e,
                    t,
                    n,
                    i,
                    o,
                    a,
                    s,
                    r = b.find("#os-stations-list"),
                    l = r.children();
                if (b.hasClass("ui-page-active")) {
                    u(),
                        h(),
                        b.find(".waterlevel").text(controller.options.wl),
                        b.find(".sitename").text(m.val()),
                        CardList.getAllCards(l)
                            .filter(function (e, t) {
                                return parseInt($(t).data("station"), 10) >= controller.stations.snames.length;
                            })
                            .remove();
                    for (var c = 0; c < controller.stations.snames.length; c++)
                        (e = 0 < Station.getPID(c)),
                            (t = 0 < Station.getStatus(c)),
                            (n = e ? pidname(Station.getPID(c)) : ""),
                            (i = Station.getRemainingRuntime(c)),
                            (o = StationQueue.isPaused()),
                            (s = !!v[g].images[c]),
                            (a = CardList.getCardBySID(l, c)),
                            Card.getDivider(a),
                            0 === a.length
                                ? ((f = ""), d(c), r.append(f))
                                : (a.find(".ui-body > img").attr("src", s ? "data:image/jpeg;base64," + v[g].images[c] : getAppURLPath() + "img/placeholder.png"),
                                  Station.isDisabled(c) ? (b.hasClass("show-hidden") || a.hide(), a.addClass("station-hidden")) : a.show().removeClass("station-hidden"),
                                  a.find("#station_" + c).text(controller.stations.snames[c]),
                                  a
                                      .find(".special-station")
                                      .removeClass("hidden")
                                      .addClass(Station.isSpecial(c) ? "" : "hidden"),
                                  a
                                      .find(".station-status")
                                      .removeClass("on off wait")
                                      .addClass(t ? "on" : e ? "wait" : "off"),
                                  Station.isMaster(c) ? a.find(".station-settings").removeClass("ui-icon-gear").addClass("ui-icon-master") : a.find(".station-settings").removeClass("ui-icon-master").addClass("ui-icon-gear"),
                                  a
                                      .find(".station-settings")
                                      .data({
                                          um: Supported.master(MASTER_STATION_1) ? StationAttribute.getMasterOperation(c, MASTER_STATION_1) : void 0,
                                          um2: Supported.master(MASTER_STATION_2) ? StationAttribute.getMasterOperation(c, MASTER_STATION_2) : void 0,
                                          ir: Supported.ignoreRain() ? StationAttribute.getIgnoreRain(c) : void 0,
                                          sn1: Supported.ignoreSensor(IGNORE_SENSOR_1) ? StationAttribute.getIgnoreSensor(c, IGNORE_SENSOR_1) : void 0,
                                          sn2: Supported.ignoreSensor(IGNORE_SENSOR_2) ? StationAttribute.getIgnoreSensor(c, IGNORE_SENSOR_2) : void 0,
                                          ar: Supported.actRelay() ? StationAttribute.getActRelay(c) : void 0,
                                          sd: Supported.disabled() ? StationAttribute.getDisabled(c) : void 0,
                                          us: Supported.sequential() ? StationAttribute.getSequential(c) : void 0,
                                          hs: Supported.special() ? StationAttribute.getSpecial(c) : void 0,
                                          gid: Supported.groups() ? Station.getGIDValue(c) : void 0,
                                      }),
                                  Station.isMaster(c) || (!e && !t)
                                      ? a.find(".rem").remove()
                                      : ((s = t ? _("Running") + " " + n : _("Scheduled") + " " + (Station.getStartTime(c) ? _("for") + " " + dateToString(new Date(1e3 * Station.getStartTime(c))) : n)),
                                        0 < i && ((s += " <span id=" + (o ? "'pause" : "'countdown-") + c + "' class='nobr'>(" + sec2hms(i) + " " + _("remaining") + ")</span>"), controller.status[c]) && y(c, i),
                                        0 === a.find(".rem").length ? a.find(".ui-body").append("<p class='rem center'>" + s + "</p>") : a.find(".rem").html(s)));
                    p();
                }
            };
        return (
            b.one("pageshow", function () {
                $("html").on("datarefresh", S);
            }),
            function (t) {
                if (!isControllerConnected()) return !1;
                (f = ""),
                    (m = $("#site-selector")),
                    h(function () {
                        for (n = 0; n < controller.stations.snames.length; n++) d(n);
                        b.find("#os-stations-list").html(f), p();
                    }),
                    b.find(".sitename").toggleClass("hidden", !!currLocal).text(m.val()),
                    b.find(".waterlevel").text(controller.options.wl),
                    u(),
                    b.on("click", ".station-settings", e),
                    b.on("click", ".home-info", function () {
                        return changePage("#os-options", { expandItem: "weather" }), !1;
                    }),
                    b
                        .on("click", ".card", function () {
                            if (!checkOSVersion(210)) return !1;
                            var e,
                                t = $(this),
                                n = Card.getSID(t),
                                i = Card.getGIDValue(t),
                                o = Station.getStatus(n),
                                a = Station.getName(n),
                                s = {};
                            if (Station.isMaster(n)) return !1;
                            if (((s.type = dialog.REMOVE_STATION), (s.station = n), (s.gid = i), o)) e = _("Do you want to stop the selected station?");
                            else {
                                if (!t.find("span.nobr").length)
                                    return void showDurationBox({
                                        title: a,
                                        incrementalUpdate: !1,
                                        maximum: 65535,
                                        seconds: 0 < v[g].lastRunTime[n] ? v[g].lastRunTime[n] : 0,
                                        helptext: _("Enter a duration to manually run ") + a,
                                        callback: function (e) {
                                            sendToOS("/cm?sid=" + n + "&en=1&t=" + e + "&pw=", "json").done(function () {
                                                Station.setPID(n, MANUAL_STATION_PID),
                                                    Station.setRemainingRuntime(n, e),
                                                    refreshStatus(),
                                                    showerror(_("Station has been queued")),
                                                    (v[g].lastRunTime[n] = e),
                                                    storage.set({ sites: JSON.stringify(v) }, cloudSaveSites);
                                            });
                                        },
                                    });
                                e = _("Do you want to unschedule the selected station?");
                            }
                            areYouSure(
                                e,
                                Station.getName(n),
                                function () {
                                    var e = !0 === popupData.shift ? 1 : 0;
                                    sendToOS("/cm?sid=" + n + "&ssta=" + e + "&en=0&pw=").done(function () {
                                        Station.setPID(n, 0), Station.setRemainingRuntime(n, 0), Station.setStatus(n, 0), delete timers["station-" + n], refreshStatus(), showerror(_("Station has been stopped"));
                                    });
                                },
                                null,
                                s
                            );
                        })
                        .on("click", "img", function () {
                            var e = $(this),
                                t = e.parents(".card").data("station");
                            return (
                                -1 !== e.attr("src").indexOf("data:image/jpeg;base64")
                                    ? areYouSure(_("Do you want to delete the current image?"), "", function () {
                                          delete v[g].images[t], storage.set({ sites: JSON.stringify(v) }, cloudSaveSites), S();
                                      })
                                    : getPicture(function (e) {
                                          (v[g].images[t] = e), storage.set({ sites: JSON.stringify(v) }, cloudSaveSites), S();
                                      }),
                                !1
                            );
                        })
                        .on({
                            pagebeforeshow: function () {
                                var e = changeHeader({
                                    class: "logo",
                                    leftBtn: {
                                        icon: "bullets",
                                        on: function () {
                                            return openPanel(), !1;
                                        },
                                    },
                                    rightBtn: {
                                        icon: "bell",
                                        class: "notifications",
                                        text: "<span class='notificationCount ui-li-count ui-btn-corner-all'>" + notifications.length + "</span>",
                                        on: function () {
                                            return showNotifications(), !1;
                                        },
                                    },
                                    animate: !t,
                                });
                                0 === notifications.length && $(e[2]).hide();
                            },
                        }),
                    $("#sprinklers").remove(),
                    $.mobile.pageContainer.append(b),
                    $.isEmptyObject(weather) || updateWeatherBox();
            }
        );
    })(),
    showStart = (function () {
        var e = $(
                "<div data-role='page' id='start'><ul data-role='none' id='welcome_list' class='ui-listview ui-listview-inset ui-corner-all'><li><div class='logo' id='welcome_logo'></div></li><li class='ui-li-static ui-body-inherit ui-first-child ui-last-child ui-li-separate'><p class='rain-desc'>" +
                    _("Welcome to the OpenSprinkler application. This app only works with the OpenSprinkler controller which must be installed and setup on your home network.") +
                    "</p><a class='iab iabNoScale ui-btn ui-mini center' target='_blank' href='https://opensprinkler.com/product/opensprinkler/'>" +
                    _("Purchase OpenSprinkler") +
                    "</a></li><li class='ui-first-child ui-last-child'><a href='#' class='ui-btn center cloud-login'>" +
                    _("OpenSprinkler.com Login") +
                    "</a></li><hr class='content-divider'><li id='auto-scan' class='ui-first-child'><a href='#' class='ui-btn ui-btn-icon-right ui-icon-carat-r'>" +
                    _("Scan For Device") +
                    "</a></li><li class='ui-first-child ui-last-child'><a class='ui-btn ui-btn-icon-right ui-icon-carat-r' data-rel='popup' href='#addnew'>" +
                    _("Add Controller") +
                    "</a></li></ul></div>"
            ),
            t = function () {
                i.addClass("ui-first-child").find("a.ui-btn").text(_("Add Controller")), n.hide();
            },
            n = e.find("#auto-scan"),
            i = n.next();
        return (
            e
                .find("#auto-scan")
                .find("a")
                .on("click", function () {
                    return startScan(), !1;
                }),
            e.find("a[href='#addnew']").on("click", function () {
                showAddNew();
            }),
            e.find(".cloud-login").on("click", function () {
                return requestCloudAuth(), !1;
            }),
            e.on("pagehide", function () {
                e.detach();
            }),
            function () {
                if (isControllerConnected()) return !1;
                $("#start").remove(),
                    $.mobile.pageContainer.append(e),
                    updateDeviceIP(function (e) {
                        void 0 !== e && isLocalIP(e) ? (i.removeClass("ui-first-child").find("a.ui-btn").text(_("Manually Add Device")), n.show()) : t();
                    });
            }
        );
    })();
function showGuidedSetup() {}
function parseRemoteStationData(e) {
    e = e.split("");
    for (var t, n = [], i = {}, o = 0; o < 8; o++) (t = parseInt(e[o] + e[o + 1], 16) || 0), n.push(t), o++;
    return (i.ip = n.join(".")), (i.port = parseInt(e[8] + e[9] + e[10] + e[11], 16)), (i.station = parseInt(e[12] + e[13], 16)), i;
}
function verifyRemoteStation(e, t) {
    (e = parseRemoteStationData(e)),
        $.ajax({ url: "http://" + e.ip + ":" + e.port + "/jo?pw=" + encodeURIComponent(currPass), type: "GET", dataType: "json" }).then(
            function (e) {
                "object" == typeof e && e.hasOwnProperty("fwv") ? (1 === Object.keys(e).length ? t(-2) : e.hasOwnProperty("re") && 0 !== e.re ? t(!0) : t(-3)) : t(-1);
            },
            function () {
                t(!1);
            }
        );
}
function convertRemoteToExtender(e) {
    (e = parseRemoteStationData(e)), $.ajax({ url: "http://" + e.ip + ":" + e.port + "/cv?re=1&pw=" + encodeURIComponent(currPass), type: "GET", dataType: "json" });
}
function refreshStatus(e) {
    var t;
    isControllerConnected() &&
        ((e = e || function () {}),
        (t = function () {
            $("html").trigger("datarefresh"), checkStatus(), e();
        }),
        checkOSVersion(216) ? updateController(t, networkFail) : $.when(updateControllerStatus(), updateControllerSettings(), updateControllerOptions()).then(t, networkFail));
}
function refreshData() {
    isControllerConnected() && (checkOSVersion(216) ? updateController(null, networkFail) : $.when(updateControllerPrograms(), updateControllerStations()).fail(networkFail));
}
function changeStatus(e, t, n, i) {
    var o = $("#footer-running"),
        a = "";
    (i = i || function () {}),
        1 < e &&
            (timers.statusbar = {
                val: e,
                type: "statusbar",
                update: function () {
                    $("#countdown").text("(" + sec2hms(this.val) + " " + _("remaining") + ")");
                },
            }),
 /*       isControllerConnected() && void 0 !== controller.settings.curr && (a += _("Current") + ": " + controller.settings.curr + " mA "), */
        !isControllerConnected() ||
            (2 !== controller.options.urs && 2 !== controller.options.sn1t) ||
            void 0 === controller.settings.flcrt ||
            void 0 === controller.settings.flwrt ||
            (a += "<span style='padding-left:5px'>" + _("Flow") + ": " + (flowCountToVolume(controller.settings.flcrt) / (controller.settings.flwrt / 60)).toFixed(2) + " L/min</span>"),
        (a = "" !== a ? n + "<p class='running-text smaller center'>" + a + "</p>" : n),
        o.removeClass().addClass(t).html(a).off("click").on("click", i);
}
function checkStatus() {
    var e, t, n, i, o, a, s;
    var ac = controller.acvolts == "undefined" ? "" : "\u26A1" + controller.acvolts,
        temp = controller.ospitemp == "undefined" ? "" : +controller.ospitemp + "\xB0";
    if (isControllerConnected())
/*        if (1 === controller.options.re)
            changeStatus(0, "red", "<p class='running-text center pointer'>" + _("Configured as Extender") + "</p>", function () {
                areYouSure(_("Do you wish to disable extender mode?"), "", function () {
                    showLoading("#footer-running"),
                        sendToOS("/cv?pw=&re=0").done(function () {
                            updateController();
                        });
                });
            });
        else */if (controller.settings.en)
            if (controller.settings.pq)
                (n = "<p class='running-text center pointer'>" + _("Stations Currently Paused")),
                    controller.settings.pt && (n += " <span id='countdown' class='nobr'>(" + sec2hms(controller.settings.pt) + " " + _("remaining") + ")</span>"),
                    changeStatus(controller.settings.pt || 0, "yellow", (n += "</p>"), function () {
                        areYouSure(_("Do you want to resume station operation?"), "", function () {
                            showLoading("#footer-running"),
                                sendToOS("/pq?pw=&dur=0").done(function () {
                                    setTimeout(refreshStatus, 1e3);
                                });
                        });
                    });
            else {
                for (e = {}, a = 0; a < controller.status.length; a++) controller.status[a] && !Station.isMaster(a) && (e[a] = controller.status[a]);
                if (2 <= Object.keys(e).length) {
                    for (a in ((t = 0), e)) e.hasOwnProperty(a) && t < (o = Station.getRemainingRuntime(a)) && (t = o);
                    (s = Object.keys(e)[0]),
                        (n = "<div><div class='running-icon'></div><div class='running-text pointer'>"),
                        (n += pidname(Station.getPID(s)) + " " + _("is running on") + " " + Object.keys(e).length + " " + _("stations") + " "),
                        0 < t && (n += "<span id='countdown' class='nobr'>(" + sec2hms(t) + " " + _("remaining") + ")</span>"),
                        changeStatus(t, "green", (n += "</div></div>"), goHome);
                } else {
                    for (i = !1, a = 0; a < controller.stations.snames.length; a++)
                        if (controller.settings.ps[a] && Station.getPID(a) && Station.getStatus(a) && !Station.isMaster(a)) {
                            (i = !0),
                                (n = "<div><div class='running-icon'></div><div class='running-text pointer'>"),
                                (n += pidname(Station.getPID(a)) + " " + _("is running on station") + " <span class='nobr'>" + Station.getName(a) + "</span> "),
                                0 < Station.getRemainingRuntime(a) && (n += "<span id='countdown' class='nobr'>(" + sec2hms(Station.getRemainingRuntime(a)) + " " + _("remaining") + ")</span>"),
                                (n += "</div></div>");
                            break;
                        }
                    i
                        ? changeStatus(Station.getRemainingRuntime(a), "green", n, goHome)
                        : controller.settings.rd
                        ? changeStatus(0, "red", "<p class='running-text center pointer'>" + _("Rain delay until") + " " + dateToString(new Date(1e3 * controller.settings.rdst)) + "</p>", function () {
                              areYouSure(_("Do you want to turn off rain delay?"), "", function () {
                                  showLoading("#footer-running"),
                                      sendToOS("/cv?pw=&rd=0").done(function () {
                                          refreshStatus(updateWeather);
                                      });
                              });
                          })
                        : 1 === controller.options.urs && 1 === controller.settings.rs
                        ? changeStatus(0, "red", "<p class='running-text center'>" + _("Rain detected") + "</p>")
                        : 1 === controller.settings.sn1
                        ? changeStatus(0, "red", "<p class='running-text center'>Sensor 1 (" + (3 === controller.options.sn1t ? _("Soil") : _("Rain")) + _(") Activated") + "</p>")
                        : 1 === controller.settings.sn2
                        ? changeStatus(0, "red", "<p class='running-text center'>Sensor 2 (" + (3 === controller.options.sn2t ? _("Soil") : _("Rain")) + _(") Activated") + "</p>")
                        : 1 === controller.settings.mm
                        ? changeStatus(0, "red", "<p class='running-text center pointer'>" + _("Manual mode enabled") + "</p>", function () {
                              areYouSure(_("Do you want to turn off manual mode?"), "", function () {
                                  showLoading("#footer-running"),
                                      sendToOS("/cv?pw=&mm=0").done(function () {
                                          updateController();
                                      });
                              });
                          })
                        : changeStatus(
                              0,
                              "transparent",
                              0 !== (s = controller.settings.lrun[2])
                                  ? "<p class='running-text smaller center pointer'>" +
                                        pidname(controller.settings.lrun[1]) +
                                        " " +
                                        _("last ran station") +
                                        " " +
                                        controller.stations.snames[controller.settings.lrun[0]] +
                                        " " +
                                        _("for") +
                                        " " +
                                        ((s / 60) >> 0) +
                                        "m " +
                                        (s % 60) +
                                        "s " +
                                        _("on") +
                                        " " +
                                        dateToString(new Date(1e3 * (controller.settings.lrun[3] - s))) +
                                        "</p>"
                                  : "<p class='running-text smaller center pointer'>" + _(ac+ " " + temp + " " +"System Idle") + "</p>",
                              goHome
                          );
                }
            }
        else
            changeStatus(0, "red", "<p class='running-text center pointer'>" + _("System Disabled") + "</p>", function () {
                areYouSure(_("Do you want to re-enable system operation?"), "", function () {
                    showLoading("#footer-running"),
                        sendToOS("/cv?pw=&en=1").done(function () {
                            updateController();
                        });
                });
            });
    else changeStatus(0, "transparent", "<p class='running-text smaller'></p>");
}
function calculateTotalRunningTime(n) {
    var i = controller.options.sdt;
    if (Supported.groups()) {
        var o = new Array(NUM_SEQ_GROUPS).fill(0),
            a = 0,
            e = 0;
        $.each(controller.stations.snames, function (e) {
            var t = n[e],
                e = Station.getGIDValue(e);
            0 < t && (e !== PARALLEL_GID_VALUE ? (o[e] += t + i) : a < t && (a = t));
        });
        for (var t = 0; t < NUM_SEQ_GROUPS; t++) o[t] > i && (o[t] -= i), o[t] > e && (e = o[t]);
        return Math.max(e, a);
    }
    return (
        (a = o = 0),
        $.each(controller.stations.snames, function (e) {
            var t = n[e];
            0 < t && (Station.isSequential(e) ? (o += t + i) : a < t && (a = t));
        }),
        i < o && (o -= i),
        Math.max(o, a)
    );
}
function updateTimers() {
    var i = new Date().getTime();
    setInterval(function () {
        if (!isControllerConnected()) return !1;
        var e = new Date().getTime(),
            t = e - i;
        if ((2e3 < t && (checkStatus(), refreshStatus()), (i = e), !$.isEmptyObject(timers)))
            for (var n in timers)
                timers.hasOwnProperty(n) &&
                    (timers[n].val <= 0
                        ? ("statusbar" === n && (showLoading("#footer-running"), refreshStatus()), "function" == typeof timers[n].done && timers[n].done(), delete timers[n])
                        : "clock" === n
                        ? (++timers[n].val, timers[n].update())
                        : ("statusbar" !== n && "number" != typeof timers[n].station) || (--timers[n].val, timers[n].update()));
    }, 1e3);
}
function removeStationTimers() {
    for (var e in timers) timers.hasOwnProperty(e) && "clock" !== e && delete timers[e];
}
var getManual = (function () {
        function e() {
            var e, t, n, i;
            return (
                controller.settings.mm
                    ? ((n = (e = $(this)).closest("li")),
                      (n = (t = a.index(n)) + 1),
                      (i = r.val()),
                      e.hasClass("yellow") ||
                          ((o = controller.status[t]
                              ? checkOSPiVersion("2.1")
                                  ? "/sn?sid=" + n + "&set_to=0&pw="
                                  : "/sn" + n + "=0"
                              : checkOSPiVersion("2.1")
                              ? "/sn?sid=" + n + "&set_to=1&set_time=" + i + "&pw="
                              : "/sn" + n + "=1&t=" + i),
                          e.removeClass("green").addClass("yellow"),
                          e.html("<p class='ui-icon ui-icon-loading mini-load'></p>"),
                          sendToOS(o).always(function () {
                              setTimeout(s, 1e3, t);
                          })))
                    : showerror(_("Manual mode is not enabled. Please enable manual mode then try again.")),
                !1
            );
        }
        var o,
            t,
            a,
            i = $(
                "<div data-role='page' id='manual'><div class='ui-content' role='main'><p class='center'>" +
                    _("With manual mode turned on, tap a station to toggle it.") +
                    "</p><fieldset data-role='collapsible' data-collapsed='false' data-mini='true'><legend>" +
                    _("Options") +
                    "</legend><div class='ui-field-contain'><label for='mmm'><b>" +
                    _("Manual Mode") +
                    "</b></label><input type='checkbox' data-on-text='On' data-off-text='Off' data-role='flipswitch' name='mmm' id='mmm'></div><p class='rain-desc smaller center' style='padding-top:5px'>" +
                    _("Station timer prevents a station from running indefinitely and will automatically turn it off after the set duration (or when toggled off)") +
                    "</p><div class='ui-field-contain duration-input'><label for='auto-off'><b>" +
                    _("Station Timer") +
                    "</b></label><button data-mini='true' name='auto-off' id='auto-off' value='3600'>1h</button></div></fieldset><div id='manual-station-list'></div></div></div>"
            ),
            s = function (t) {
                updateControllerStatus().done(function () {
                    var e = a.eq(t).find("a");
                    controller.options.mas && (controller.status[controller.options.mas - 1] ? a.eq(controller.options.mas - 1).addClass("green") : a.eq(controller.options.mas - 1).removeClass("green")),
                        e.text(controller.stations.snames[t]),
                        controller.status[t] ? e.removeClass("yellow").addClass("green") : e.removeClass("green yellow");
                });
            },
            r = i.find("#auto-off");
        return (
            i.on("pagehide", function () {
                i.detach();
            }),
            storage.get("autoOff", function (e) {
                e.autoOff && (r.val(e.autoOff), r.text(dhms2str(sec2dhms(e.autoOff))));
            }),
            r.on("click", function () {
                var t = $(this),
                    e = i.find("label[for='" + t.attr("id") + "']").text();
                return (
                    showDurationBox({
                        seconds: t.val(),
                        title: e,
                        callback: function (e) {
                            t.val(e), t.text(dhms2str(sec2dhms(e))), storage.set({ autoOff: e });
                        },
                        maximum: 32768,
                    }),
                    !1
                );
            }),
            i.find("#mmm").on("change", flipSwitched),
            function () {
                var n = "<li data-role='list-divider' data-theme='a'>" + _("Sprinkler Stations") + "</li>";
                i.find("#mmm").prop("checked", !!controller.settings.mm),
                    $.each(controller.stations.snames, function (e, t) {
                        Station.isMaster(e)
                            ? (n += "<li data-icon='false' class='center" + (controller.status[e] ? " green" : "") + (Station.isDisabled(e) ? " station-hidden' style='display:none" : "") + "'>" + t + " (" + _("Master") + ")</li>")
                            : (n += "<li data-icon='false'><a class='mm_station center" + (controller.status[e] ? " green" : "") + (Station.isDisabled(e) ? " station-hidden' style='display:none" : "") + "'>" + t + "</a></li>");
                    }),
                    (t = $("<ul data-role='listview' data-inset='true' id='mm_list'>" + n + "</ul>")),
                    (a = t.children("li").slice(1)),
                    t.find(".mm_station").on("vclick", e),
                    i.find("#manual-station-list").html(t).enhanceWithin(),
                    changeHeader({ title: _("Manual Control"), leftBtn: { icon: "carat-l", text: _("Back"), class: "ui-toolbar-back-btn", on: goBack } }),
                    $("#manual").remove(),
                    $.mobile.pageContainer.append(i);
            }
        );
    })(),
    getRunonce = (function () {
        function i(e) {
            (c.l = e), $("<option value='l' selected='selected'>" + _("Last Used Program") + "</option>").insertAfter(h.find("#rprog").find("option[value='t']")), f(e);
        }
        function o() {
            return h.find("[id^='zone-']").val(0).text("0s").removeClass("green"), !1;
        }
        var a,
            s,
            r,
            l,
            c,
            d,
            u,
            p,
            h = $("<div data-role='page' id='runonce'><div class='ui-content' role='main' id='runonce_list'></div></div>"),
            f = function (n) {
                h.find("[id^='zone-']").each(function (e, t) {
                    Station.isMaster(e) || ((t = $(t)).val(n[e]).text(getDurationText(n[e])), 0 < n[e] ? t.addClass("green") : t.removeClass("green"));
                });
            };
        return (
            h.on("pagehide", function () {
                h.detach();
            }),
            function () {
                if (((s = "<p class='center'>" + _("Zero value excludes the station from the run-once program.") + "</p>"), (l = []), controller.programs.pd.length))
                    for (d = 0; d < controller.programs.pd.length; d++) {
                        u = readProgram(controller.programs.pd[d]);
                        var e = [];
                        if (checkOSVersion(210)) e = u.stations;
                        else {
                            var t = u.stations.split("");
                            for (a = 0; a < controller.stations.snames.length; a++) e.push(parseInt(t[a]) ? u.duration : 0);
                        }
                        l.push(e);
                    }
                for (
                    c = l, r = "<select data-mini='true' name='rprog' id='rprog'><option value='t'>" + _("Test All Stations") + "</option><option value='s' selected='selected'>" + _("Quick Programs") + "</option>", a = 0;
                    a < l.length;
                    a++
                )
                    (p = checkOSVersion(210) ? controller.programs.pd[a][5] : _("Program") + " " + (a + 1)), (r += "<option value='" + a + "'>" + p + "</option>");
                if (
                    ((s += (r += "</select>") + "<form>"),
                    $.each(controller.stations.snames, function (e, t) {
                        Station.isMaster(e)
                            ? (s +=
                                  "<div class='ui-field-contain duration-input" +
                                  (Station.isDisabled(e) ? " station-hidden' style='display:none" : "") +
                                  "'><label for='zone-" +
                                  e +
                                  "'>" +
                                  t +
                                  ":</label><button disabled='true' data-mini='true' name='zone-" +
                                  e +
                                  "' id='zone-" +
                                  e +
                                  "' value='0'>Master</button></div>")
                            : (s +=
                                  "<div class='ui-field-contain duration-input" +
                                  (Station.isDisabled(e) ? " station-hidden' style='display:none" : "") +
                                  "'><label for='zone-" +
                                  e +
                                  "'>" +
                                  t +
                                  ":</label><button data-mini='true' name='zone-" +
                                  e +
                                  "' id='zone-" +
                                  e +
                                  "' value='0'>0s</button></div>");
                    }),
                    (s += "</form><a class='ui-btn ui-corner-all ui-shadow rsubmit' href='#'>" + _("Submit") + "</a><a class='ui-btn ui-btn-b ui-corner-all ui-shadow rreset' href='#'>" + _("Reset") + "</a>"),
                    h.find(".ui-content").html(s).enhanceWithin(),
                    "object" == typeof controller.settings.rodur)
                ) {
                    var n = 0;
                    for (a = 0; a < controller.settings.rodur.length; a++) n += controller.settings.rodur[a];
                    0 !== n && i(controller.settings.rodur);
                } else
                    storage.get("runonce", function (e) {
                        (e = e.runonce) && ((e = JSON.parse(e)), i(e));
                    });
                h.find("#rprog").on("change", function () {
                    var e = $(this).val();
                    "s" === e
                        ? o()
                        : "t" === e
                        ? f(
                              Array.apply(null, Array(controller.stations.snames.length)).map(function () {
                                  return 60;
                              })
                          )
                        : void 0 !== c[e] && f(c[e]);
                }),
                    h.on("click", ".rsubmit", submitRunonce).on("click", ".rreset", o),
                    h.find("[id^='zone-']").on("click", function () {
                        var t = $(this),
                            e = h
                                .find("label[for='" + t.attr("id") + "']")
                                .text()
                                .slice(0, -1);
                        return (
                            showDurationBox({
                                seconds: t.val(),
                                title: e,
                                callback: function (e) {
                                    t.val(e), t.text(getDurationText(e)), 0 < e ? t.addClass("green") : t.removeClass("green");
                                },
                                maximum: 65535,
                                showSun: !!checkOSVersion(214),
                            }),
                            !1
                        );
                    }),
                    changeHeader({ title: _("Run-Once"), leftBtn: { icon: "carat-l", text: _("Back"), class: "ui-toolbar-back-btn", on: goBack }, rightBtn: { icon: "check", text: _("Submit"), on: submitRunonce } }),
                    $("#runonce").remove(),
                    $.mobile.pageContainer.append(h);
            }
        );
    })();
function submitRunonce(e) {
    e instanceof Array ||
        ((e = []),
        $("#runonce")
            .find("[id^='zone-']")
            .each(function () {
                e.push(parseInt(this.value) || 0);
            }),
        e.push(0));
    function t() {
        $.mobile.loading("show"),
            storage.set({ runonce: JSON.stringify(e) }),
            sendToOS("/cr?pw=&t=" + JSON.stringify(e)).done(function () {
                $.mobile.loading("hide"),
                    $.mobile.document.one("pageshow", function () {
                        showerror(_("Run-once program has been scheduled"));
                    }),
                    refreshStatus(),
                    goBack();
            });
    }
    var n = StationQueue.isActive();
    -1 !== n
        ? areYouSure(_("Do you want to stop the currently running program?"), pidname(Station.getPID(n)), function () {
              $.mobile.loading("show"), stopStations(t);
          })
        : t();
}
var getPreview = (function () {
    var R,
        a,
        W,
        s,
        r,
        h,
        l,
        B,
        H,
        u,
        e,
        i,
        c,
        d,
        p,
        U,
        V,
        q,
        f = $(
            "<div data-role='page' id='preview'><div class='ui-content' role='main'><div id='preview_header' class='input_with_buttons'><button class='preview-minus ui-btn ui-btn-icon-notext ui-icon-carat-l btn-no-border'></button><input class='center' type='date' name='preview_date' id='preview_date'><button class='preview-plus ui-btn ui-btn-icon-notext ui-icon-carat-r btn-no-border'></button></div><div id='timeline'></div><div data-role='controlgroup' data-type='horizontal' id='timeline-navigation'><a class='ui-btn ui-corner-all ui-icon-plus ui-btn-icon-notext btn-no-border' title='" +
                _("Zoom in") +
                "'></a><a class='ui-btn ui-corner-all ui-icon-minus ui-btn-icon-notext btn-no-border' title='" +
                _("Zoom out") +
                "'></a><a class='ui-btn ui-corner-all ui-icon-carat-l ui-btn-icon-notext btn-no-border' title='" +
                _("Move left") +
                "'></a><a class='ui-btn ui-corner-all ui-icon-carat-r ui-btn-icon-notext btn-no-border' title='" +
                _("Move right") +
                "'></a></div></div></div>"
        ),
        m = f.find("#timeline"),
        g = f.find("#timeline-navigation");
    return (
        f.find("#preview_date").on("change", function () {
            (c = this.value.split("-")), (d = new Date(c[0], c[1] - 1, c[2])), i();
        }),
        f.one("pagebeforeshow", function () {
            holdButton(f.find(".preview-plus"), function () {
                e(1);
            }),
                holdButton(f.find(".preview-minus"), function () {
                    e(-1);
                });
        }),
        f.on({
            pagehide: function () {
                f.detach();
            },
            pageshow: function () {
                i();
            },
        }),
        (a = function (e, t, P) {
            R = [];
            var n,
                i,
                o,
                a = Math.floor(controller.settings.devt / 86400),
                s = 0,
                r = Date.UTC(P, e - 1, t, 0, 0, 0, 0),
                l = (r / 1e3 / 3600 / 24) >> 0,
                c = 8 * controller.settings.nbrd,
                d = new Array(c),
                u = new Array(c),
                p = new Array(c),
                h = new Array(c),
                f = [],
                m = new Array(c),
                g = 0,
                v = 0,
                b = new Array(NUM_SEQ_GROUPS);
            for (M = 0; M < c; M++) (d[M] = -1), (u[M] = 0), (p[M] = 0), (h[M] = 0), (m[M] = 255);
            for (o = 0; o < NUM_SEQ_GROUPS; o++) b[o] = 0;
            do {
                for (var y, w, S, k = 0, T = 0, x = 0; x < controller.programs.pd.length; x++)
                    if (((n = controller.programs.pd[x]), W(n, s, r, l, a)))
                        for (M = 0; M < c; M++) {
                            var _,
                                C = M >> 3,
                                D = M % 8;
                            Station.isMaster(M) ||
                                (U
                                    ? controller.stations.stn_dis[C] & (1 << D) ||
                                      (n[4][M] &&
                                          0 === p[M] &&
                                          (_ = 0) <
                                              (_ =
                                                  2 & n[0] && ((0 < controller.options.uwt && l === a) || 0 === controller.options.uwt)
                                                      ? ((getStationDuration(n[4][M], r) * controller.options.wl) / 100) >> 0
                                                      : getStationDuration(n[4][M], r)) &&
                                          (q ? f.length < c && f.push({ st: -1, dur: _, sid: M, pid: x + 1, gid: controller.stations.stn_grp ? controller.stations.stn_grp[M] : -1, pl: 1 }) : ((p[M] = _), (u[M] = x + 1)), (T = 1)))
                                    : n[7 + C] & (1 << D) && ((p[M] = ((n[6] * controller.options.wl) / 100) >> 0), (u[M] = x + 1), (T = 1)));
                        }
                if (T) {
                    var O = 60 * s,
                        I = O,
                        E = new Array(NUM_SEQ_GROUPS);
                    if (V) {
                        for (O < v && (I = v + controller.options.sdt), o = 0; o < NUM_SEQ_GROUPS; o++) (E[o] = O), b[o] > O && (E[o] = b[o] + controller.options.sdt);
                        if (q)
                            for (i = 0; i < f.length; i++)
                                0 <= (w = f[i]).st ||
                                    0 === w.dur ||
                                    ((A = (M = w.sid) >> 3),
                                    (N = 7 & M),
                                    -1 === w.gid
                                        ? controller.stations.stn_seq[A] & (1 << N)
                                            ? ((w.st = I), (I = (I += w.dur) + controller.options.sdt))
                                            : ((w.st = O), O++)
                                        : w.gid !== PARALLEL_GID_VALUE
                                        ? ((w.st = E[w.gid]), (E[w.gid] += w.dur), (E[w.gid] += controller.options.sdt))
                                        : ((w.st = O), O++),
                                    (k = 1));
                        else
                            for (M = 0; M < c; M++)
                                (A = M >> 3),
                                    (N = 7 & M),
                                    0 === p[M] || 0 <= d[M] || (controller.stations.stn_seq[A] & (1 << N) ? ((d[M] = I), (I += p[M]), (p[M] = I), (I += controller.options.sdt)) : ((d[M] = O), (p[M] = O + p[M])), (k = h[M] = 1));
                    } else if ((U && controller.options.seq && O < g && (O = g + controller.options.sdt), controller.options.seq))
                        for (M = 0; M < 8 * controller.settings.nbrd; M++) 0 !== p[M] && 0 !== u[M] && ((d[M] = O), (O += p[M]), (p[M] = O), (O += controller.options.sdt), (k = 1));
                    else for (M = 0; M < 8 * controller.settings.nbrd; M++) 0 !== p[M] && 0 !== u[M] && ((d[M] = O), (p[M] = O + p[M]), (k = 1));
                }
                if (q) {
                    for (i = 0; i < f.length; i++) ((S = m[(M = (w = f[i]).sid)]) < 255 && f[S].st < w.st) || (m[M] = i);
                    for (H(60 * s, f, m, r), s++, M = 0; M < 8 * controller.settings.nbrd; M++)
                        255 !== (S = m[M]) && 0 <= (w = f[S]).st && 60 * s >= w.st + w.dur && (S < (y = f.length) - 1 && ((f[S] = f[y - 1]), m[f[S].sid] === y - 1) && (m[f[S].sid] = S), f.pop(), (m[M] = 255));
                    for (o = v = 0; o < NUM_SEQ_GROUPS; o++) v[o] = 0;
                    for (i = 0; i < f.length; i++) {
                        var M,
                            A = (M = (w = f[i]).sid) >> 3,
                            N = 7 & M,
                            L = w.st + w.dur;
                        -1 === w.gid ? controller.stations.stn_seq[A] & (1 << N) && v < L && (v = L) : w.gid !== PARALLEL_GID_VALUE && L > b[w.gid] && (b[w.gid] = L);
                    }
                } else if (k)
                    if (V) for (v = B(60 * s, d, u, p, h, r), s++, M = 0; M < 8 * controller.settings.nbrd; M++) 0 < u[M] && 60 * s >= p[M] && ((d[M] = -1), (u[M] = 0), (p[M] = 0), (h[M] = 0));
                    else if (U) for (g = B(60 * s, d, u, p, h, r), s++, M = 0; M < 8 * controller.settings.nbrd; M++) (d[M] = -1), (u[M] = 0), (p[M] = 0);
                    else {
                        var j = (B(60 * s, d, u, p, h, r) / 60) >> 0;
                        for (controller.options.seq && s !== j ? (s = j) : s++, M = 0; M < 8 * controller.settings.nbrd; M++) (d[M] = -1), (u[M] = 0), (p[M] = 0);
                    }
                else if ((s++, V)) for (M = 0; M < 8 * controller.settings.nbrd; M++) 0 < u[M] && 60 * s >= p[M] && ((d[M] = -1), (u[M] = 0), (p[M] = 0), (h[M] = 0));
            } while (s < 1440);
        }),
        (H = function (e, t, n, i) {
            for (var o = 0; o < 8 * controller.settings.nbrd; o++) {
                var a,
                    s,
                    r,
                    l = n[o];
                255 !== l &&
                    (l = t[l]).pl &&
                    ((a = void 0 !== controller.options.mas2),
                    (s = controller.stations.masop[o >> 3] & (1 << o % 8)),
                    (r = a && controller.stations.masop2[o >> 3] & (1 << o % 8)),
                    Station.isMaster(o) ||
                        (0 < controller.options.mas &&
                            s &&
                            R.push({ start: l.st + controller.options.mton, end: l.st + l.dur + controller.options.mtof, content: "", className: "master", shortname: "M" + (a ? "1" : ""), group: "Master", station: o }),
                        a &&
                            0 < controller.options.mas2 &&
                            r &&
                            R.push({ start: l.st + controller.options.mton2, end: l.st + l.dur + controller.options.mtof2, content: "", className: "master", shortname: "M2", group: "Master 2", station: o })),
                    u(o, l.st, l.pid, l.st + l.dur, i),
                    (l.pl = 0));
            }
        }),
        (B = function (e, t, n, i, o, a) {
            for (var s, r, l, c = e, d = 0; d < 8 * controller.settings.nbrd; d++)
                n[d] &&
                    (V
                        ? o[d] &&
                          ((s = void 0 !== controller.options.mas2),
                          (r = controller.stations.masop[d >> 3] & (1 << d % 8)),
                          (l = s && controller.stations.masop2[d >> 3] & (1 << d % 8)),
                          Station.isMaster(d) ||
                              (0 < controller.options.mas &&
                                  r &&
                                  R.push({ start: t[d] + controller.options.mton, end: i[d] + controller.options.mtof, content: "", className: "master", shortname: "M" + (s ? "1" : ""), group: "Master", station: d }),
                              s &&
                                  0 < controller.options.mas2 &&
                                  l &&
                                  R.push({ start: t[d] + controller.options.mton2, end: i[d] + controller.options.mtof2, content: "", className: "master", shortname: "M2", group: "Master 2", station: d })),
                          u(d, t[d], n[d], i[d], a),
                          (o[d] = 0),
                          controller.stations.stn_seq[d >> 3] & (1 << (7 & d))) &&
                          (c = c > i[d] ? c : i[d])
                        : 1 === controller.options.seq
                        ? (Station.isMaster(d) &&
                              controller.stations.masop[d >> 3] & (1 << d % 8) &&
                              R.push({ start: t[d] + controller.options.mton, end: i[d] + controller.options.mtof, content: "", className: "master", shortname: "M", group: "Master", station: d }),
                          u(d, t[d], n[d], i[d], a),
                          (c = i[d]))
                        : (u(d, e, n[d], i[d], a), Station.isMaster(d) && controller.stations.masop[d >> 3] & (1 << d % 8) && (c = c > i[d] ? c : i[d])));
            return V || (0 === controller.options.seq && 0 < controller.options.mas && R.push({ start: e, end: c, content: "", className: "master", shortname: "M", group: "Master", station: d })), c;
        }),
        (u = function (e, t, n, i, o) {
            var a = "program-" + ((n + 3) % 4),
                s = "P" + n;
            ((0 !== controller.settings.rd && o + t + 900 * (controller.options.tz - 48) <= 1e3 * controller.settings.rdst) || (1 === controller.options.urs && 1 === controller.settings.rs)) &&
                "object" == typeof controller.stations.ignore_rain &&
                0 == (controller.stations.ignore_rain[(e / 8) >> 0] & (1 << e % 8)) &&
                (a = "delayed"),
                checkOSVersion(210) && (s = controller.programs.pd[n - 1][5]),
                R.push({ start: t, end: i, className: a, content: s, pid: n - 1, shortname: "S" + (e + 1), group: controller.stations.snames[e], station: e });
        }),
        (W = function (e, t, n, i, o) {
            return (q ? l : U ? r : s)(e, t, n, i, o);
        }),
        (s = function (e, t, n, i, o) {
            if (0 === e[0]) return 0;
            if (128 & e[1] && 1 < e[2]) {
                var a = e[2];
                if (i % a != (o + (127 & e[1])) % a) return 0;
            } else {
                (i = new Date(n)), (o = (i.getUTCDay() + 6) % 7);
                if (0 == (e[1] & (1 << o))) return 0;
                a = i.getUTCDate();
                if (128 & e[1] && 0 === e[2] && a % 2 != 0) return 0;
                if (128 & e[1] && 1 === e[2] && (31 === a || (29 === a && 1 === i.getUTCMonth()) || a % 2 != 1)) return 0;
            }
            return !(t < e[3] || t > e[4] || (isOSPi() && t >= e[4])) && 0 !== e[5] && (((t - e[3]) / e[5]) >> 0) * e[5] == t - e[3] ? 1 : 0;
        }),
        (h = function (e, t, n, i) {
            var o = (e[0] >> 2) & 3,
                a = (e[0] >> 4) & 3,
                t = new Date(t),
                s = t.getUTCDate(),
                r = t.getUTCMonth() + 1,
                l = e[6];
            if ("object" == typeof l && l[0]) {
                r = (r << 5) + s;
                if (l[1] <= l[2]) {
                    if (r < l[1] || r > l[2]) return 0;
                } else if (r > l[2] && r < l[1]) return 0;
            }
            if (3 == a) {
                r = e[2];
                if (n % r != (i + e[1]) % r) return 0;
            } else {
                if (0 != a) return 0;
                l = (t.getUTCDay() + 6) % 7;
                if (0 == (e[1] & (1 << l))) return 0;
            }
            if (2 == o) {
                if (s % 2 != 0) return 0;
            } else if (1 == o && (31 === s || (29 === s && 1 === t.getUTCMonth()) || s % 2 != 1)) return 0;
            return 1;
        }),
        (r = function (e, t, n, i, o) {
            var a = 1 & e[0],
                s = (e[0] >> 6) & 1,
                r = new Date(n);
            if (0 != a && h(e, n, i, o))
                if (0 == s) {
                    (a = getStartTime(e[3][0], r)), (n = e[3][1]), (i = e[3][2]);
                    if (t < a) return 0;
                    if (0 === n) return t === a ? 1 : 0;
                    if (0 === i) return 0;
                    o = Math.round((t - a) / i);
                    if (o * i == t - a && o <= n) return 1;
                } else for (var l = e[3], c = 0; c < 4; c++) if (t === getStartTime(l[c], r)) return 1;
            return 0;
        }),
        (l = function (e, t, n, i, o) {
            var a = 1 & e[0],
                s = (e[0] >> 6) & 1,
                r = new Date(n);
            if (0 == a) return 0;
            var l,
                a = getStartTime(e[3][0], r),
                c = e[3][1],
                d = e[3][2];
            if (h(e, n, i, o)) {
                if (0 != s) {
                    for (var u = e[3], p = 0; p < 4; p++) if (t === getStartTime(u[p], r)) return 1;
                    return 0;
                }
                if (t === a) return 1;
                if (a < t && d && (l = Math.round((t - a) / d)) * d == t - a && l <= c) return 1;
            }
            return !s && d && h(e, n - 864e5, i - 1, o) && (l = Math.round((t - a + 1440) / d)) * d == t - a + 1440 && l <= c ? 1 : 0;
        }),
        (e = function (e) {
            d.setDate(d.getDate() + e);
            var e = pad(d.getMonth() + 1),
                t = pad(d.getDate()),
                n = d.getFullYear();
            (c = [n, e, t]), f.find("#preview_date").val(c.join("-")), i();
        }),
        (i = function () {
            var n, t, e, i, o;
            a(c[1], c[2], c[0]),
                g.hide(),
                R.length
                    ? (R.sort(sortByStation),
                      (n = []),
                      (t = new Date(c[0], c[1] - 1, c[2], 24)),
                      $.each(R, function () {
                          var e = this.start + this.end;
                          (this.start = new Date(c[0], c[1] - 1, c[2], 0, 0, this.start)),
                              86400 < e
                                  ? ((e = Math.floor(this.end / 86400)), (this.end = new Date(c[0], c[1] - 1, parseInt(c[2]) + e, 0, 0, this.end % 86400)), (t = t > this.end ? t : this.end))
                                  : (this.end = new Date(c[0], c[1] - 1, c[2], 0, 0, this.end)),
                              (n[this.group] = this.shortname);
                      }),
                      (o = {
                          width: "100%",
                          editable: !1,
                          axisOnTop: !0,
                          eventMargin: 10,
                          eventMarginAxis: 0,
                          min: new Date(c[0], c[1] - 1, c[2], 0),
                          max: t,
                          selectable: !0,
                          showMajorLabels: !1,
                          zoomMax: 864e5,
                          zoomMin: 36e5,
                          groupsChangeable: !1,
                          showNavigation: !1,
                          groupsOrder: "none",
                          groupMinHeight: 20,
                      }),
                      (e = function () {
                          i.redraw();
                      }),
                      (i = new links.Timeline(m[0], o)),
                      (o = new Date(p)).setMinutes(o.getMinutes() + o.getTimezoneOffset()),
                      i.setCurrentTime(o),
                      links.events.addListener(i, "select", function () {
                          var e = i.getSelection();
                          e.length && void 0 !== e[0].row && changePage("#programs", { programToExpand: parseInt(i.getItem(e[0].row).pid) });
                      }),
                      $.mobile.window.on("resize", e),
                      f.one("pagehide", function () {
                          $.mobile.window.off("resize", e);
                      }),
                      i.draw(R),
                      f.find(".timeline-groups-text").each(function () {
                          var e = $(this),
                              t = n[e.text()];
                          e.attr("data-shortname", t);
                      }),
                      f
                          .find(".timeline-groups-axis")
                          .children()
                          .first()
                          .html("<div class='timeline-axis-text center dayofweek' data-shortname='" + getDayName(d, "short") + "'>" + getDayName(d) + "</div>"),
                      isAndroid
                          ? (g
                                .find(".ui-icon-plus")
                                .off("click")
                                .on("click", function () {
                                    return i.zoom(0.4), !1;
                                }),
                            g
                                .find(".ui-icon-minus")
                                .off("click")
                                .on("click", function () {
                                    return i.zoom(-0.4), !1;
                                }),
                            g
                                .find(".ui-icon-carat-l")
                                .off("click")
                                .on("click", function () {
                                    return i.move(-0.2), !1;
                                }),
                            g
                                .find(".ui-icon-carat-r")
                                .off("click")
                                .on("click", function () {
                                    return i.move(0.2), !1;
                                }),
                            g.show())
                          : g.hide(),
                      m.on("swiperight swipeleft", function (e) {
                          e.stopImmediatePropagation();
                      }))
                    : f.find("#timeline").html("<p align='center'>" + _("No stations set to run on this day.") + "</p>");
        }),
        function () {
            (U = checkOSVersion(210)),
                (V = checkOSVersion(211)),
                (q = checkOSVersion(216)),
                "" === f.find("#preview_date").val() && ((p = new Date(1e3 * controller.settings.devt)), (c = p.toISOString().slice(0, 10).split("-")), (d = new Date(c[0], c[1] - 1, c[2])), f.find("#preview_date").val(c.join("-"))),
                changeHeader({ title: _("Program Preview"), leftBtn: { icon: "carat-l", text: _("Back"), class: "ui-toolbar-back-btn", on: goBack } }),
                $("#preview").remove(),
                $.mobile.pageContainer.append(f);
        }
    );
})();
function getStationDuration(e, t) {
    return checkOSVersion(214) && ((t = getSunTimes(t)), 65535 === e ? (e = 60 * (t[0] + 1440 - t[1])) : 65534 === e && (e = 60 * (t[1] - t[0]))), e;
}
var getLogs = (function () {
    function a(e, t, n) {
        if ("object" != typeof e || e.length < 1 || (e.result && 32 === e.result)) $.mobile.loading("hide"), k();
        else {
            try {
                d = JSON.parse(d.replace(/,\s*inf/g, ""));
            } catch (e) {
                d = [];
            }
            (b = e), (c = $.isEmptyObject(t) ? [] : t), (d = $.isEmptyObject(n) ? [] : n), i(), exportObj(".export_logs", b), $.mobile.loading("hide");
        }
    }
    function r() {
        if (b.length < 1) k();
        else {
            g.show(), f.show();
            var e,
                t,
                n,
                i = h.find("input:radio[name='table-group']:checked").val(),
                o = y("table", i),
                a = o[0],
                o = w(o[1]),
                s = [],
                r = o[0],
                l = o[1],
                o = o[2],
                c = "<table><thead><tr><th data-priority='1'>" + _("Runtime") + "</th><th data-priority='2'>" + ("station" === i ? _("Date/Time") : _("Time") + "</th><th>" + _("Station")) + "</th></tr></thead><tbody>",
                o = S(o) + "<div data-role='collapsible-set' data-inset='true' data-theme='b' data-collapsed-icon='arrow-d' data-expanded-icon='arrow-u'>",
                d = 0;
            for (e in a)
                if (a.hasOwnProperty(e) && 0 !== (t = a[e].length)) {
                    for (
                        s[d] =
                            "<div data-role='collapsible' data-collapsed='true'><h2>" +
                            (checkOSVersion(210) && "day" === i ? "<a class='ui-btn red ui-btn-corner-all delete-day day-" + e + "'>" + _("delete") + "</a>" : "") +
                            "<div class='ui-btn-up-c ui-btn-corner-all custom-count-pos'>" +
                            t +
                            " " +
                            _(1 === t ? "run" : "runs") +
                            "</div>" +
                            ("station" === i ? m[e] : dateToString(new Date(1e3 * e * 60 * 60 * 24)).slice(0, -9)) +
                            "</h2>",
                            r[e] && (s[d] += "<span style='border:none' class='" + (100 !== r[e] ? (r[e] < 100 ? "green " : "red ") : "") + "ui-body ui-body-a'>" + _("Average") + " " + _("Water Level") + ": " + r[e] + "%</span>"),
                            l[e] && (s[d] += "<span style='border:none' class='ui-body ui-body-a'>" + _("Total Water Used") + ": " + l[e] + " L</span>"),
                            s[d] += c,
                            n = 0;
                        n < a[e].length;
                        n++
                    ) {
                        var u = new Date(a[e][n][0]);
                        s[d] += "<tr><td>" + a[e][n][1] + "</td><td>" + ("station" === i ? dateToString(u, !1) : pad(u.getHours()) + ":" + pad(u.getMinutes()) + ":" + pad(u.getSeconds()) + "</td><td>" + m[a[e][n][2]]) + "</td></tr>";
                    }
                    (s[d] += "</tbody></table></div>"), d++;
                }
            "day" === i && s.reverse(),
                v.collapsible("collapse"),
                f.html(o + s.join("") + "</div>").enhanceWithin(),
                f.find(".delete-day").on("click", function () {
                    var e, t;
                    return (
                        $.each(this.className.split(" "), function () {
                            if (0 === this.indexOf("day-")) return (e = this.split("day-")[1]), !1;
                        }),
                        (t = dateToString(new Date(1e3 * e * 60 * 60 * 24)).slice(0, -9)),
                        areYouSure(_("Are you sure you want to ") + _("delete") + " " + t + "?", "", function () {
                            $.mobile.loading("show"),
                                sendToOS("/dl?pw=&day=" + e).done(function () {
                                    p(), showerror(t + " " + _("deleted"));
                                });
                        }),
                        !1
                    );
                }),
                fixInputClick(f);
        }
    }
    function s() {
        $.mobile.loading("hide"), g.empty().hide(), f.show().html(_("Error retrieving log data. Please refresh to try again."));
    }
    function l() {
        return "start=" + u().start.getTime() / 1e3 + "&end=" + (u().end.getTime() / 1e3 + 86340);
    }
    function p() {
        var e,
            t,
            n,
            i = u().end.getTime() / 1e3,
            o = u().start.getTime() / 1e3;
        i < o
            ? (k(), showerror(_("Start time cannot be greater than end time")))
            : ((e = 0),
              $.mobile.loading("show"),
              3154e4 < i - o &&
                  (showerror(_("The requested time span exceeds the maximum of 1 year and has been adjusted"), 3500),
                  (i = u().start).setFullYear(i.getFullYear() + 1),
                  $("#log_end").val(i.getFullYear() + "-" + pad(i.getMonth() + 1) + "-" + pad(i.getDate())),
                  (e = 500)),
              (t = $.Deferred().resolve()),
              (n = $.Deferred().resolve()),
              checkOSVersion(211) && (t = sendToOS("/jl?pw=&type=wl&" + l(), "json")),
              checkOSVersion(216) && (n = sendToOS("/jl?pw=&type=fl&" + l())),
              setTimeout(function () {
                  $.when(sendToOS("/jl?pw=&" + l(), "json"), t, n).then(a, s);
              }, e));
    }
    var m,
        e,
        t,
        h = $(
            "<div data-role='page' id='logs'><div class='ui-content' role='main'><fieldset data-role='controlgroup' data-type='horizontal' data-mini='true' class='log_type'><input data-mini='true' type='radio' name='log_type' id='log_timeline' value='timeline'><label for='log_timeline'>" +
                _("Timeline") +
                "</label><input data-mini='true' type='radio' name='log_type' id='log_table' value='table'><label for='log_table'>" +
                _("Table") +
                "</label></fieldset><fieldset data-role='collapsible' data-mini='true' id='log_options' class='center'><legend>" +
                _("Options") +
                "</legend><fieldset data-role='controlgroup' data-type='horizontal' id='table_sort'><p class='tight'>" +
                _("Grouping:") +
                "</p><input data-mini='true' type='radio' name='table-group' id='table-sort-day' value='day' checked='checked'><label for='table-sort-day'>" +
                _("Day") +
                "</label><input data-mini='true' type='radio' name='table-group' id='table-sort-station' value='station'><label for='table-sort-station'>" +
                _("Station") +
                "</label></fieldset><div class='ui-field-contain'><label for='log_start'>" +
                _("Start:") +
                "</label><input data-mini='true' type='date' id='log_start'><label for='log_end'>" +
                _("End:") +
                "</label><input data-mini='true' type='date' id='log_end'></div><a data-role='button' data-icon='action' class='export_logs' href='#' data-mini='true'>" +
                _("Export") +
                "</a><a data-role='button' class='red clear_logs' href='#' data-mini='true' data-icon='alert'>" +
                _("Clear Logs") +
                "</a></fieldset><div id='logs_list' class='center'></div></div></div>"
        ),
        f = h.find("#logs_list"),
        g = h.find("#table_sort"),
        v = h.find("#log_options"),
        b = [],
        c = [],
        d = [],
        y = function (u, p) {
            var h = [],
                f = { totalRuntime: 0, totalCount: 0 };
            if ("table" === u && "station" === p) for (t = 0; t < m.length; t++) h[t] = [];
            return (
                $.each(b, function () {
                    var e = this[1],
                        t = parseInt(this[2]),
                        n = (t < 0 && (t += 65536), new Date(parseInt(1e3 * this[3]) - 1e3 * t)),
                        i = new Date(n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate(), n.getUTCHours(), n.getUTCMinutes(), n.getUTCSeconds());
                    if ("string" == typeof e)
                        if ("rd" === e) e = m.length - 1;
                        else if ("s1" === e) e = m.length - 3;
                        else {
                            if ("s2" !== e && "rs" !== e) return;
                            e = m.length - 2;
                        }
                    else if ("number" == typeof e) {
                        if (e > m.length - 2 || Station.isMaster(e)) return;
                        (f.totalRuntime += t), f.totalCount++;
                    }
                    if ("table" === u)
                        switch (p) {
                            case "station":
                                h[e].push([i, dhms2str(sec2dhms(t))]);
                                break;
                            case "day":
                                var o = Math.floor(n.getTime() / 1e3 / 60 / 60 / 24),
                                    a = [i, dhms2str(sec2dhms(t)), e];
                                "object" != typeof h[o] ? (h[o] = [a]) : h[o].push(a);
                        }
                    else if ("timeline" === u) {
                        var s,
                            r,
                            l,
                            c,
                            d = parseInt(this[0]);
                        if ("rs" === this[1]) (s = "delayed"), (l = r = _("Rain Sensor")), (c = _("RS"));
                        else if ("rd" === this[1]) (s = "delayed"), (l = r = _("Rain Delay")), (c = _("RD"));
                        else if ("s1" === this[1]) (s = "delayed"), (l = r = 3 === controller.options.sn1t ? _("Soil Sensor") : _("Rain Sensor")), (c = _("SEN1"));
                        else if ("s2" === this[1]) (s = "delayed"), (l = r = 3 === controller.options.sn2t ? _("Soil Sensor") : _("Rain Sensor")), (c = _("SEN2"));
                        else {
                            if (0 === d) return;
                            (s = "program-" + ((d + 3) % 4)), (r = pidname(d)), (l = controller.stations.snames[e]), (c = "S" + (e + 1));
                        }
                        h.push({ start: i, end: new Date(i.getTime() + 1e3 * t), className: s, content: r, pid: d - 1, shortname: c, group: l, station: e });
                    }
                }),
                "timeline" === u && h.sort(sortByStation),
                [h, f]
            );
        },
        w = function (n, i) {
            var e = [],
                o = [];
            return (
                c.length &&
                    ((n.avgWaterLevel = 0),
                    $.each(c, function () {
                        (e[Math.floor(this[3] / 60 / 60 / 24)] = this[2]), (n.avgWaterLevel += this[2]);
                    }),
                    (n.avgWaterLevel = parseFloat((n.avgWaterLevel / c.length).toFixed(2)))),
                d.length &&
                    ((n.totalVolume = 0),
                    $.each(d, function () {
                        var e,
 //                           t = flowCountToVolume(this[0]);
                        t = flowCountToVolume(this[4]);
                        "timeline" === i
                            ? ((e = new Date(parseInt(1e3 * this[3]))),
                              (e = new Date(e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate(), e.getUTCHours(), e.getUTCMinutes(), e.getUTCSeconds())),
                              o.push({ start: new Date(e.getTime() - parseInt(1e3 * this[2])), end: e, className: "", content: t + " L", shortname: _("FS"), group: _("Flow Sensor") }))
                            : ((e = Math.floor(this[3] / 60 / 60 / 24)), (o[e] = o[e] ? o[e] + t : t)),
                            (n.totalVolume += t);
                    })),
                [e, o, n]
            );
        },
        i = function () {
            var e, t, n, i, o, a, s;
            h.find("#log_table").prop("checked")
                ? r()
                : h.find("#log_timeline").prop("checked") &&
                  (b.length < 1
                      ? k()
                      : (g.hide(),
                        f.show(),
                        v.collapsible("collapse"),
                        (e = y("timeline")),
                        (t = w(e[1], "timeline")),
                        (e = e[0].concat(t[1])),
                        (t = t[2]),
                        (n = {
                            width: "100%",
                            editable: !1,
                            axisOnTop: !0,
                            eventMargin: 10,
                            eventMarginAxis: 0,
                            min: u().start,
                            max: new Date(u().end.getTime() + 8634e4),
                            selectable: !1,
                            showMajorLabels: !1,
                            groupsChangeable: !1,
                            showNavigation: !1,
                            groupsOrder: "none",
                            groupMinHeight: 20,
                            zoomMin: 6e4,
                        }),
                        (i = function () {
                            s.redraw();
                        }),
                        (o = function () {
                            $.mobile.window.off("resize", i);
                        }),
                        (a = []),
                        f.on("swiperight swipeleft", function (e) {
                            e.stopImmediatePropagation();
                        }),
                        $.each(e, function () {
                            a[this.group] = this.shortname;
                        }),
                        (s = new links.Timeline(f.get(0), n)),
                        $.mobile.window.on("resize", i),
                        h.one("pagehide", o),
                        h.find("input:radio[name='log_type']").one("change", o),
                        s.draw(e),
                        f.find(".timeline-groups-text").each(function () {
                            this.setAttribute("data-shortname", a[this.textContent]);
                        }),
                        f.prepend(S(t))));
        },
        S = function (e) {
            var t;
            return 0 === e.totalCount || 0 === e.totalRuntime
                ? ""
                : ((t = void 0 !== e.avgWaterLevel),
                  "<div class='ui-body-a smaller' id='logs_summary'><div><span class='bold'>" +
                      _("Total Station Events") +
                      "</span>: " +
                      e.totalCount +
                      "</div><div><span class='bold'>" +
                      _("Total Runtime") +
                      "</span>: " +
                      dhms2str(sec2dhms(e.totalRuntime)) +
                      "</div>" +
                      (t
                          ? "<div><span class='bold'>" +
                            _("Average") +
                            " " +
                            _("Water Level") +
                            "</span>: <span class='" +
                            (100 !== e.avgWaterLevel ? (e.avgWaterLevel < 100 ? "green-text" : "red-text") : "") +
                            "'>" +
                            e.avgWaterLevel +
                            "%</span></div>"
                          : "") +
                      (void 0 !== e.totalVolume && 0 < e.totalVolume
                          ? "<div><span class='bold'>" +
                            _("Total Water Used") +
                            "</span>: " +
                            e.totalVolume +
//                            " L" +
                            " G" +
                            (t && e.avgWaterLevel < 100 ? " (<span class='green-text'>" + (e.totalVolume - e.totalVolume * (e.avgWaterLevel / 100)).toFixed(2) + "L saved</span>)" : "") +
                            "</div>"
                          : "") +
                      "</div>");
        },
        k = function () {
            (b = []), v.collapsible("expand"), g.hide(), f.show().html(_("No entries found in the selected date range"));
        },
        u = function () {
            var e = o.val().split("-"),
                t = T.val().split("-");
            return { start: new Date(e[0], e[1] - 1, e[2]), end: new Date(t[0], t[1] - 1, t[2]) };
        },
        n = window.innerWidth < 640,
        o = h.find("#log_start"),
        T = h.find("#log_end");
    return (
        h.find(".clear_logs").on("click", function () {
            return clearLogs(p), !1;
        }),
        isiOS
            ? o.add(T).on("blur", function () {
                  h.hasClass("ui-page-active") && p();
              })
            : o.add(T).change(function () {
                  clearTimeout(e), (e = setTimeout(p, 1e3));
              }),
        g.find("input[name='table-group']").change(function () {
            r();
        }),
        h.find("input:radio[name='log_type']").change(i),
        h.on({
            pagehide: function () {
                h.detach();
            },
            pageshow: p,
        }),
        h.find("#log_timeline").prop("checked", !n),
        h.find("#log_table").prop("checked", n),
        function () {
            var e = checkOSVersion(219) ? [3 === controller.options.sn1t ? _("Soil Sensor") : _("Rain Sensor"), 3 === controller.options.sn2t ? _("Soil Sensor") : _("Rain Sensor"), _("Rain Delay")] : [_("Rain Sensor"), _("Rain Delay")];
            (m = $.merge($.merge([], controller.stations.snames), e)),
                h.find(".clear_logs").toggleClass("hidden", !isOSPi() && !checkOSVersion(210)),
                ("" !== o.val() && "" !== T.val()) || ((e = new Date(1e3 * controller.settings.devt)), o.val(new Date(e.getTime() - 6048e5).toISOString().slice(0, 10)), T.val(e.toISOString().slice(0, 10))),
                changeHeader({ title: _("Logs"), leftBtn: { icon: "carat-l", text: _("Back"), class: "ui-toolbar-back-btn", on: goBack }, rightBtn: { icon: "refresh", text: _("Refresh"), on: p } }),
                $("#logs").remove(),
                $.mobile.pageContainer.append(h);
        }
    );
})();
function clearLogs(t) {
    areYouSure(_("Are you sure you want to clear ALL your log data?"), "", function () {
        var e = isOSPi() ? "/cl?pw=" : "/dl?pw=&day=all";
        $.mobile.loading("show"),
            sendToOS(e).done(function () {
                "function" == typeof t && t(), showerror(_("Logs have been cleared"));
            });
    });
}
function clearPrograms(e) {
    areYouSure(_("Are you sure you want to delete ALL programs?"), "", function () {
        $.mobile.loading("show"),
            sendToOS("/dp?pw=&pid=-1").done(function () {
                "function" == typeof e && e(), showerror(_("Programs have been deleted"));
            });
    });
}
function resetAllOptions(t) {
    areYouSure(_("Are you sure you want to delete all settings and return to the default settings?"), "", function () {
        var e = isOSPi()
            ? "otz=32&ontp=1&onbrd=0&osdt=0&omas=0&omton=0&omtoff=0&orst=1&owl=100&orlp=0&ouwt=0&olg=1&oloc=Boston,MA"
            : ((e =
                  "o2=1&o3=1&o12=80&o13=0&o15=0&o17=0&o18=0&o19=0&o20=0&o22=1&o23=100&o26=0&o27=110&o28=100&o29=15&o30=320&o31=0&o36=1&o37=0&o38=0&o39=0&o41=100&o42=0&o43=0&o44=8&o45=8&o46=8&o47=8&o48=0&o49=0&o50=0&o51=1&o52=0&o53=1&o54=0&o55=0&o56=0&o57=0&"),
              checkOSVersion(2199) ? (e += "o32=0&o33=0&o34=0&o35=0&") : (e += "o32=216&o33=239&o34=35&o35=12&"),
              transformKeysinString((e += "loc=Boston,MA&wto=%22key%22%3A%22%22")));
        sendToOS("/co?pw=&" + e).done(function () {
            "function" == typeof t && t(), updateController(updateWeather);
        });
    });
}
var getPrograms = (function () {
    var t,
        n = $("<div data-role='page' id='programs'><div class='ui-content' role='main' id='programs_list'></div></div>");
    function i() {
        var e = $(makeAllPrograms());
        e.find("[id^=program-]").on({
            collapsiblecollapse: function () {
                $(this).find(".ui-collapsible-content").empty();
            },
            collapsiblebeforecollapse: function (e) {
                var t = $(this),
                    n = t.find(".hasChanges");
                n.length &&
                    (areYouSure(
                        _("Do you want to save your changes?"),
                        "",
                        function () {
                            n.removeClass("hasChanges").click(), t.collapsible("collapse");
                        },
                        function () {
                            n.removeClass("hasChanges"), t.collapsible("collapse");
                        }
                    ),
                    e.preventDefault());
            },
            collapsibleexpand: function () {
                expandProgram($(this));
            },
        }),
            checkOSVersion(210) &&
                e
                    .find(".move-up")
                    .removeClass("hidden")
                    .on("click", function () {
                        var e = $(this).parents("fieldset"),
                            e = parseInt(e.attr("id").split("-")[1]);
                        return (
                            $.mobile.loading("show"),
                            sendToOS("/up?pw=&pid=" + e).done(function () {
                                updateControllerPrograms(function () {
                                    $.mobile.loading("hide"), n.trigger("programrefresh");
                                });
                            }),
                            !1
                        );
                    }),
            e.find(".program-copy").on("click", function () {
                return changePage("#addprogram", { copyID: parseInt($(this).parents("fieldset").attr("id").split("-")[1]) }), !1;
            }),
            n.find("#programs_list").html(e.enhanceWithin());
    }
    return (
        n
            .on("programrefresh", i)
            .on("pagehide", function () {
                n.detach();
            })
            .on("pagebeforeshow", function () {
                updateProgramHeader(),
                    "number" == typeof (t = "number" != typeof t && 1 === controller.programs.pd.length ? 0 : t) && (n.find("fieldset[data-collapsed='false']").collapsible("collapse"), $("#program-" + t).collapsible("expand"));
            }),
        function (e) {
            (t = e),
                changeHeader({
                    title: _("Programs"),
                    leftBtn: { icon: "carat-l", text: _("Back"), class: "ui-toolbar-back-btn", on: checkChangesBeforeBack },
                    rightBtn: {
                        icon: "plus",
                        text: _("Add"),
                        on: function () {
                            checkChanges(function () {
                                changePage("#addprogram");
                            });
                        },
                    },
                }),
                i(),
                $("#programs").remove(),
                $.mobile.pageContainer.append(n);
        }
    );
})();
function expandProgram(t) {
    var o = parseInt(t.attr("id").split("-")[1]);
    t
        .find(".ui-collapsible-content")
        .html(makeProgram(o))
        .enhanceWithin()
        .on("change input click", function (e) {
            ("click" === e.type && "BUTTON" !== e.target.tagName) || ($(this).off("change input click"), t.find("[id^='submit-']").addClass("hasChanges"));
        }),
        t.find("[id^='submit-']").on("click", function () {
            return submitProgram(o), !1;
        }),
        t.find("[id^='delete-']").on("click", function () {
            return deleteProgram(o), !1;
        }),
        t.find("[id^='run-']").on("click", function () {
            return (
                areYouSure(_("Are you sure you want to start " + (checkOSVersion(210) ? controller.programs.pd[o][5] : "Program " + o) + " now?"), "", function () {
                    function t() {
                        n.push(0), submitRunonce(n);
                    }
                    var n = [];
                    if (checkOSVersion(210)) {
                        if (((n = controller.programs.pd[o][4]), (controller.programs.pd[o][0] >> 1) & 1))
                            return (
                                areYouSure(
                                    _("Do you wish to apply the current watering level?"),
                                    "",
                                    function () {
                                        for (var e = n.length - 1; 0 <= e; e--) n[e] = parseInt(n[e] * (controller.options.wl / 100));
                                        t();
                                    },
                                    t
                                ),
                                !1
                            );
                    } else {
                        var e = parseInt($("#duration-" + o).val()),
                            i = $("[id^='station_'][id$='-" + o + "']");
                        $.each(i, function () {
                            $(this).is(":checked") ? n.push(e) : n.push(0);
                        });
                    }
                    t();
                }),
                !1
            );
        });
}
function readProgram(e) {
    return (checkOSVersion(210) ? readProgram21 : readProgram183)(e);
}
function readProgram183(e) {
    var t = e[1],
        n = e[2],
        i = !1,
        o = !1,
        a = !1,
        s = "",
        r = "",
        l = {};
    l.en = e[0];
    for (var c = 0; c < controller.programs.nboards; c++) for (var d = e[7 + c], u = 0; u < 8; u++) r += d & (1 << u) ? "1" : "0";
    if (((l.stations = r), (l.duration = e[6]), (l.start = e[3]), (l.end = e[4]), (l.interval = e[5]), 128 & t && 1 < n)) (s = [n, 127 & t]), (a = !0);
    else {
        for (var p = 0; p < 7; p++) s += t & (1 << p) ? "1" : "0";
        128 & t && 0 === n && (i = !0), 128 & t && 1 === n && (o = !0);
    }
    return (l.days = s), (l.is_even = i), (l.is_odd = o), (l.is_interval = a), l;
}
function readProgram21(e) {
    var t = e[1],
        n = e[2],
        i = (e[0] >> 2) & 3,
        o = (e[0] >> 4) & 3,
        a = (e[0] >> 6) & 1,
        s = "",
        r = { repeat: 0, interval: 0 };
    if (
        ((r.en = (e[0] >> 0) & 1),
        (r.weather = (e[0] >> 1) & 1),
        (r.is_even = 2 == i),
        (r.is_odd = 1 == i),
        (r.is_interval = 3 == o),
        (r.stations = e[4]),
        (r.name = e[5]),
        0 == a ? ((r.start = e[3][0]), (r.repeat = e[3][1]), (r.interval = e[3][2])) : 1 == a && (r.start = e[3]),
        3 == o)
    )
        s = [n, t];
    else if (0 == o) for (var l = 0; l < 7; l++) s += t & (1 << l) ? "1" : "0";
    return (r.days = s), r;
}
function getStartTime(e, t) {
    var n = 2047 & e,
        i = 0,
        t = getSunTimes(t);
    if (!(e < 0)) {
        if ((e >> 13) & 1) i = 1;
        else if (1 & !(e >> 14)) return e;
        (e >> 12) & 1 && (n = -n), (e = t[i]), (e += n) < 0 ? (e = 0) : 1440 < e && (e = 1440);
    }
    return e;
}
function readStartTime(e) {
    var t = 2047 & e,
        n = _("Sunrise");
    if ((e >> 13) & 1) n = _("Sunset");
    else if (1 & !(e >> 14)) return minutesToTime(e);
    return n + (0 !== (t = (e >> 12) & 1 ? -t : t) ? (0 < t ? "+" : "") + dhms2str(sec2dhms(60 * t)) : "");
}
function pidname(e) {
    var t = _("Program") + " " + e;
    return 255 === e || 99 === e ? (t = _("Manual program")) : 254 === e || 98 === e ? (t = _("Run-once program")) : checkOSVersion(210) && e <= controller.programs.pd.length && (t = controller.programs.pd[e - 1][5]), t;
}
function updateProgramHeader() {
    $("#programs_list")
        .find("[id^=program-]")
        .each(function (e, t) {
            t = $(t).find(".ui-collapsible-heading-toggle");
            (checkOSVersion(210) ? 1 & controller.programs.pd[e][0] : controller.programs.pd[e][0]) ? t.removeClass("red") : t.addClass("red");
        });
}
function makeAllPrograms() {
    if (0 === controller.programs.pd.length) return "<p class='center'>" + _("You have no programs currently added. Tap the Add button on the top right corner to get started.") + "</p>";
    for (var e, t = "<p class='center'>" + _("Click any program below to expand/edit. Be sure to save changes.") + "</p><div data-role='collapsible-set'>", n = 0; n < controller.programs.pd.length; n++)
        (e = _("Program") + " " + (n + 1)),
            checkOSVersion(210) && (e = controller.programs.pd[n][5]),
            (t =
                t +
                ("<fieldset id='program-" +
                    n +
                    "' data-role='collapsible'><h3><a " +
                    (0 < n ? "" : "style='visibility:hidden' ") +
                    "class='hidden ui-btn ui-btn-icon-notext ui-icon-arrow-u ui-btn-corner-all move-up'></a><a class='ui-btn ui-btn-corner-all program-copy'>" +
                    _("copy")) +
                "</a><span class='program-name'>" +
                e +
                "</span></h3></fieldset>");
    return t + "</div>";
}
function makeProgram(e, t) {
    return (checkOSVersion(210) ? makeProgram21 : makeProgram183)(e, t);
}
function makeProgram183(e, t) {
    var n,
        i,
        o,
        a,
        s,
        r = [_("Monday"), _("Tuesday"), _("Wednesday"), _("Thursday"), _("Friday"), _("Saturday"), _("Sunday")],
        l = "",
        c = t ? "new" : e,
        d = "new" === e ? { en: 0, weather: 0, is_interval: 0, is_even: 0, is_odd: 0, duration: 0, interval: 0, start: 0, end: 0, days: [0, 0] } : readProgram(controller.programs.pd[e]);
    if ("string" == typeof d.days) for (i = (n = d.days.split("")).length; i--; ) n[i] = 0 | n[i];
    else n = [0, 0, 0, 0, 0, 0, 0];
    if (void 0 !== d.stations) for (i = (a = d.stations.split("")).length - 1; 0 <= i; i--) a[i] = 0 | a[i];
    for (
        l =
            (l =
                (l =
                    (l =
                        (l =
                            (l =
                                (l =
                                    (l =
                                        (l =
                                            l +
                                            ("<label for='en-" + c + "'><input data-mini='true' type='checkbox' " + (d.en || "new" === e ? "checked='checked'" : "") + " name='en-" + c + "' id='en-" + c + "'>" + _("Enabled") + "</label>") +
                                            "<fieldset data-role='controlgroup' data-type='horizontal' class='center'>") +
                                        ("<input data-mini='true' type='radio' name='rad_days-" +
                                            c +
                                            "' id='days_week-" +
                                            c +
                                            "' value='days_week-" +
                                            c +
                                            "' " +
                                            (d.is_interval ? "" : "checked='checked'") +
                                            "><label for='days_week-" +
                                            c +
                                            "'>" +
                                            _("Weekly") +
                                            "</label>")) +
                                    ("<input data-mini='true' type='radio' name='rad_days-" +
                                        c +
                                        "' id='days_n-" +
                                        c +
                                        "' value='days_n-" +
                                        c +
                                        "' " +
                                        (d.is_interval ? "checked='checked'" : "") +
                                        "><label for='days_n-" +
                                        c +
                                        "'>" +
                                        _("Interval") +
                                        "</label>")) +
                                ("</fieldset><div id='input_days_week-" + c + "' " + (d.is_interval ? "style='display:none'" : "") + ">")) +
                            ("<div class='center'><p class='tight'>" + _("Restrictions") + "</p><select data-inline='true' data-iconpos='left' data-mini='true' id='days_rst-" + c + "'>")) +
                        ("<option value='none' " + (d.is_even || d.is_odd ? "" : "selected='selected'") + ">" + _("None") + "</option>")) +
                    ("<option value='odd' " + (!d.is_even && d.is_odd ? "selected='selected'" : "") + ">" + _("Odd Days Only") + "</option>")) +
                ("<option value='even' " + (!d.is_odd && d.is_even ? "selected='selected'" : "") + ">" + _("Even Days Only") + "</option>") +
                "</select></div>") +
            ("<div class='center'><p class='tight'>" +
                _("Days of the Week") +
                "</p><select " +
                (560 < $.mobile.window.width() ? "data-inline='true' " : "") +
                "data-iconpos='left' data-mini='true' multiple='multiple' data-native-menu='false' id='d-" +
                c +
                "'><option>" +
                _("Choose day(s)") +
                "</option>"),
            o = 0;
        o < r.length;
        o++
    )
        l += "<option " + (!d.is_interval && n[o] ? "selected='selected'" : "") + " value='" + o + "'>" + r[o] + "</option>";
    for (
        l =
            (l =
                (l =
                    (l = l + "</select></div></div>" + ("<div " + (d.is_interval ? "" : "style='display:none'") + " id='input_days_n-" + c + "' class='ui-grid-a'>")) +
                    ("<div class='ui-block-a'><label class='center' for='every-" +
                        c +
                        "'>" +
                        _("Interval (Days)") +
                        "</label><input data-wrapper-class='pad_buttons' data-mini='true' type='number' name='every-" +
                        c +
                        "' pattern='[0-9]*' id='every-" +
                        c +
                        "' value='" +
                        d.days[0] +
                        "'></div>")) +
                ("<div class='ui-block-b'><label class='center' for='starting-" +
                    c +
                    "'>" +
                    _("Starting In") +
                    "</label><input data-wrapper-class='pad_buttons' data-mini='true' type='number' name='starting-" +
                    c +
                    "' pattern='[0-9]*' id='starting-" +
                    c +
                    "' value='" +
                    d.days[1] +
                    "'></div>") +
                "</div>") +
            ("<fieldset data-role='controlgroup'><legend>" + _("Stations:") + "</legend>"),
            o = 0;
        o < controller.stations.snames.length;
        o++
    )
        l +=
            "<label for='station_" +
            o +
            "-" +
            c +
            "'><input " +
            (Station.isDisabled(o) ? "data-wrapper-class='station-hidden hidden' " : "") +
            "data-mini='true' type='checkbox' " +
            (void 0 !== a && a[o] ? "checked='checked'" : "") +
            " name='station_" +
            o +
            "-" +
            c +
            "' id='station_" +
            o +
            "-" +
            c +
            "'>" +
            controller.stations.snames[o] +
            "</label>";
    return (
        (l =
            (l =
                (l =
                    (l =
                        (l =
                            (l =
                                (l =
                                    (l =
                                        (l = l + "</fieldset>" + "<fieldset data-role='controlgroup' data-type='horizontal' class='center'>") +
                                        ("<button class='ui-btn ui-mini' name='s_checkall-" + c + "' id='s_checkall-" + c + "'>" + _("Check All") + "</button>")) +
                                    ("<button class='ui-btn ui-mini' name='s_uncheckall-" + c + "' id='s_uncheckall-" + c + "'>" + _("Uncheck All") + "</button>")) +
                                "</fieldset>" +
                                "<div class='ui-grid-a'>") +
                            ("<div class='ui-block-a'><label class='center' for='start-" +
                                c +
                                "'>" +
                                _("Start Time") +
                                "</label><button class='timefield pad_buttons' data-mini='true' id='start-" +
                                c +
                                "' value='" +
                                d.start +
                                "'>" +
                                minutesToTime(d.start) +
                                "</button></div>")) +
                        ("<div class='ui-block-b'><label class='center' for='end-" +
                            c +
                            "'>" +
                            _("End Time") +
                            "</label><button class='timefield pad_buttons' data-mini='true' id='end-" +
                            c +
                            "' value='" +
                            d.end +
                            "'>" +
                            minutesToTime(d.end) +
                            "</button></div>")) +
                    "</div>" +
                    "<div class='ui-grid-a'>") +
                ("<div class='ui-block-a'><label class='pad_buttons center' for='duration-" +
                    c +
                    "'>" +
                    _("Station Duration") +
                    "</label><button class='pad_buttons' data-mini='true' name='duration-" +
                    c +
                    "' id='duration-" +
                    c +
                    "' value='" +
                    d.duration +
                    "'>" +
                    dhms2str(sec2dhms(d.duration)) +
                    "</button></div>")) +
            ("<div class='ui-block-b'><label class='pad_buttons center' for='interval-" +
                c +
                "'>" +
                _("Program Interval") +
                "</label><button class='pad_buttons' data-mini='true' name='interval-" +
                c +
                "' id='interval-" +
                c +
                "' value='" +
                60 * d.interval +
                "'>" +
                dhms2str(sec2dhms(60 * d.interval)) +
                "</button></div>") +
            "</div>"),
        !0 === t || "new" === e
            ? (l += "<input data-mini='true' data-icon='check' type='submit' data-theme='b' name='submit-" + c + "' id='submit-" + c + "' value='" + _("Save New Program") + "'>")
            : (l =
                  (l =
                      (l += "<button data-mini='true' data-icon='check' data-theme='b' name='submit-" + c + "' id='submit-" + c + "'>" + _("Save Changes to Program") + " " + (e + 1) + "</button>") +
                      "<button data-mini='true' data-icon='arrow-r' name='run-" +
                      c +
                      "' id='run-" +
                      c +
                      "'>" +
                      _("Run Program") +
                      " " +
                      (e + 1) +
                      "</button>") +
                  "<button data-mini='true' data-icon='delete' class='red bold' data-theme='b' name='delete-" +
                  c +
                  "' id='delete-" +
                  c +
                  "'>" +
                  _("Delete Program") +
                  " " +
                  (e + 1) +
                  "</button>"),
        (s = $(l)).find("input[name^='rad_days']").on("change", function () {
            var e = $(this).val().split("-")[0],
                t = "n" === (e = e.split("_")[1]) ? "week" : "n";
            $("#input_days_" + e + "-" + c).show(), $("#input_days_" + t + "-" + c).hide();
        }),
        s.find("[id^='duration-'],[id^='interval-']").on("click", function () {
            var t = $(this),
                e = t.attr("id").match("interval") ? 1 : 0,
                n = s.find("label[for='" + t.attr("id") + "']").text();
            showDurationBox({
                seconds: t.val(),
                title: n,
                callback: function (e) {
                    t.val(e), t.text(dhms2str(sec2dhms(e)));
                },
                maximum: e ? 86340 : 65535,
                granularity: e,
            });
        }),
        s.find(".timefield").on("click", function () {
            var t = $(this),
                e = s.find("label[for='" + t.attr("id") + "']").text();
            showTimeInput({
                minutes: t.val(),
                title: e,
                callback: function (e) {
                    t.val(e), t.text(minutesToTime(e));
                },
            });
        }),
        s.find("[id^='s_checkall-']").on("click", function () {
            return (
                s
                    .find("[id^='station_'][id$='-" + c + "']")
                    .prop("checked", !0)
                    .checkboxradio("refresh"),
                !1
            );
        }),
        s.find("[id^='s_uncheckall-']").on("click", function () {
            return (
                s
                    .find("[id^='station_'][id$='-" + c + "']")
                    .prop("checked", !1)
                    .checkboxradio("refresh"),
                !1
            );
        }),
        fixInputClick(s),
        s
    );
}
function makeProgram21(e, t) {
    var n,
        i,
        o,
        a,
        s,
        r,
        l,
        c,
        d = [_("Monday"), _("Tuesday"), _("Wednesday"), _("Thursday"), _("Friday"), _("Saturday"), _("Sunday")],
        u = "",
        p = t ? "new" : e,
        h = "new" === e ? { name: "", en: 0, weather: 0, is_interval: 0, is_even: 0, is_odd: 0, interval: 0, start: 0, days: [0, 0], repeat: 0, stations: [] } : readProgram(controller.programs.pd[e]);
    if ("string" == typeof h.days) for (i = (n = h.days.split("")).length; i--; ) n[i] = 0 | n[i];
    else n = [0, 0, 0, 0, 0, 0, 0];
    for (
        a = "object" == typeof h.start ? h.start : [h.start, -1, -1, -1],
            u =
                (u =
                    (u =
                        (u = (u += "<div style='margin-top:5px' class='ui-corner-all'>") + ("<div class='ui-bar ui-bar-a'><h3>" + _("Basic Settings") + "</h3></div>") + "<div class='ui-body ui-body-a center'>") +
                        ("<label for='name-" +
                            p +
                            "'>" +
                            _("Program Name") +
                            "</label><input data-mini='true' type='text' name='name-" +
                            p +
                            "' id='name-" +
                            p +
                            "' maxlength='" +
                            controller.programs.pnsize +
                            "' placeholder='" +
                            _("Program") +
                            " " +
                            (controller.programs.pd.length + 1) +
                            "' value=\"" +
                            h.name +
                            '">')) +
                    ("<label for='en-" + p + "'><input data-mini='true' type='checkbox' " + (h.en || "new" === e ? "checked='checked'" : "") + " name='en-" + p + "' id='en-" + p + "'>" + _("Enabled") + "</label>")) +
                ("<label for='uwt-" + p + "'><input data-mini='true' type='checkbox' " + (h.weather ? "checked='checked'" : "") + " name='uwt-" + p + "' id='uwt-" + p + "'>" + _("Use Weather Adjustment") + "</label>"),
            Supported.dateRange() &&
                ((l = Program.getDateRangeStart(p)),
                (c = Program.getDateRangeEnd(p)),
                (u =
                    (u =
                        (u +=
                            "<label for='use-dr-" +
                            p +
                            "'><input data-mini='true' type='checkbox' " +
                            (Program.isDateRangeEnabled(p) ? "checked='checked'" : "") +
                            " name='use-dr-" +
                            p +
                            "' id='use-dr-" +
                            p +
                            "'>" +
                            _("Enable Date Range") +
                            "</label>") +
                        "<div id='date-range-options-" +
                        p +
                        "'" +
                        (Program.isDateRangeEnabled(p) ? "" : "style='display:none'") +
                        ">") +
                    "<div class='ui-grid-a' style=''><div class='ui-block-a drfrom'><label class='center' for='from-dr-" +
                    p +
                    "'>" +
                    _("From (mm/dd)") +
                    "</label><div class='dr-input'><input type='text' placeholder='MM/DD' id='from-dr-" +
                    p +
                    "' value=" +
                    decodeDate(l) +
                    "></input></div></div><div class='ui-block-b drto'><label class='center' for='to-dr-" +
                    p +
                    "'>" +
                    _("To (mm/dd)") +
                    "</label><div class='dr-input'><input type='text' placeholder='MM/DD' id='to-dr-" +
                    p +
                    "' value=" +
                    decodeDate(c) +
                    "></input></div></div></div></div>")),
            u =
                (u =
                    (u =
                        (u =
                            (u =
                                (u =
                                    (u =
                                        (u +=
                                            "<label class='center' for='start_1-" +
                                            p +
                                            "'>" +
                                            _("Start Time") +
                                            "</label><button class='timefield' data-mini='true' id='start_1-" +
                                            p +
                                            "' value='" +
                                            a[0] +
                                            "'>" +
                                            readStartTime(a[0]) +
                                            "</button>") +
                                        "</div></div></div></div>" +
                                        "<div style='margin-top:10px' class='ui-corner-all'>") +
                                    ("<div class='ui-bar ui-bar-a'><h3>" + _("Program Type") + "</h3></div>")) +
                                "<div class='ui-body ui-body-a'>" +
                                "<fieldset data-role='controlgroup' data-type='horizontal' class='center'>") +
                            ("<input data-mini='true' type='radio' name='rad_days-" +
                                p +
                                "' id='days_week-" +
                                p +
                                "' value='days_week-" +
                                p +
                                "' " +
                                (h.is_interval ? "" : "checked='checked'") +
                                "><label for='days_week-" +
                                p +
                                "'>" +
                                _("Weekly") +
                                "</label>")) +
                        ("<input data-mini='true' type='radio' name='rad_days-" +
                            p +
                            "' id='days_n-" +
                            p +
                            "' value='days_n-" +
                            p +
                            "' " +
                            (h.is_interval ? "checked='checked'" : "") +
                            "><label for='days_n-" +
                            p +
                            "'>" +
                            _("Interval") +
                            "</label>")) +
                    "</fieldset>" +
                    ("<div id='input_days_week-" + p + "' " + (h.is_interval ? "style='display:none'" : "") + ">")) +
                ("<div class='center'><p class='tight'>" +
                    _("Days of the Week") +
                    "</p><select " +
                    (560 < $.mobile.window.width() ? "data-inline='true' " : "") +
                    "data-iconpos='left' data-mini='true' multiple='multiple' data-native-menu='false' id='d-" +
                    p +
                    "'><option>" +
                    _("Choose day(s)") +
                    "</option>"),
            m = 0;
        m < d.length;
        m++
    )
        u += "<option " + (!h.is_interval && n[m] ? "selected='selected'" : "") + " value='" + m + "'>" + d[m] + "</option>";
    u =
        (u =
            (u =
                (u =
                    (u =
                        (u =
                            (u =
                                (u = u + "</select></div></div><div " + (h.is_interval ? "" : "style='display:none'") + " id='input_days_n-" + p + "' class='ui-grid-a'>") +
                                "<div class='ui-block-a'><label class='center' for='every-" +
                                p +
                                "'>" +
                                _("Interval (Days)") +
                                "</label><input data-wrapper-class='pad_buttons' data-mini='true' type='number' name='every-" +
                                p +
                                "' pattern='[0-9]*' id='every-" +
                                p +
                                "' value='" +
                                h.days[0] +
                                "'></div>") +
                            "<div class='ui-block-b'><label class='center' for='starting-" +
                            p +
                            "'>" +
                            _("Starting In") +
                            "</label><input data-wrapper-class='pad_buttons' data-mini='true' type='number' name='starting-" +
                            p +
                            "' pattern='[0-9]*' id='starting-" +
                            p +
                            "' value='" +
                            h.days[1] +
                            "'></div></div>") +
                        "<div class='center'><p class='tight'>" +
                        _("Restrictions") +
                        "</p><select data-inline='true' data-iconpos='left' data-mini='true' id='days_rst-" +
                        p +
                        "'>") +
                    "<option value='none' " +
                    (h.is_even || h.is_odd ? "" : "selected='selected'") +
                    ">" +
                    _("None") +
                    "</option>") +
                "<option value='odd' " +
                (!h.is_even && h.is_odd ? "selected='selected'" : "") +
                ">" +
                _("Odd Days Only") +
                "</option>") +
            "<option value='even' " +
            (!h.is_odd && h.is_even ? "selected='selected'" : "") +
            ">" +
            _("Even Days Only") +
            "</option></select></div></div></div><div style='margin-top:10px' class='ui-corner-all'>") +
        "<div class='ui-bar ui-bar-a'><h3>" +
        _("Stations") +
        "</h3></div><div class='ui-body ui-body-a'>";
    for (var f = $("#programs").hasClass("show-hidden") ? "" : "' style='display:none", m = 0; m < controller.stations.snames.length; m++)
        Station.isMaster(m)
            ? (u +=
                  "<div class='ui-field-contain duration-input" +
                  (Station.isDisabled(m) ? " station-hidden" + f : "") +
                  "'><label for='station_" +
                  m +
                  "-" +
                  p +
                  "'>" +
                  controller.stations.snames[m] +
                  ":</label><button disabled='true' data-mini='true' name='station_" +
                  m +
                  "-" +
                  p +
                  "' id='station_" +
                  m +
                  "-" +
                  p +
                  "' value='0'>" +
                  _("Master") +
                  "</button></div>")
            : ((s = h.stations[m] || 0),
              (u +=
                  "<div class='ui-field-contain duration-input" +
                  (Station.isDisabled(m) ? " station-hidden" + f : "") +
                  "'><label for='station_" +
                  m +
                  "-" +
                  p +
                  "'>" +
                  controller.stations.snames[m] +
                  ":</label><button " +
                  (0 < s ? "class='green' " : "") +
                  "data-mini='true' name='station_" +
                  m +
                  "-" +
                  p +
                  "' id='station_" +
                  m +
                  "-" +
                  p +
                  "' value='" +
                  s +
                  "'>" +
                  getDurationText(s) +
                  "</button></div>"));
    for (
        u =
            (u =
                (u =
                    (u =
                        (u =
                            (u =
                                (u =
                                    (u = (u = u + "</div></div>" + "<div style='margin-top:10px' class='ui-corner-all'>") + ("<div class='ui-bar ui-bar-a'><h3>" + _("Additional Start Times") + "</h3></div>")) +
                                    "<div class='ui-body ui-body-a'>" +
                                    "<fieldset data-role='controlgroup' data-type='horizontal' class='center'>") +
                                ("<input data-mini='true' type='radio' name='stype-" +
                                    p +
                                    "' id='stype_repeat-" +
                                    p +
                                    "' value='stype_repeat-" +
                                    p +
                                    "' " +
                                    ("object" == typeof h.start ? "" : "checked='checked'") +
                                    "><label for='stype_repeat-" +
                                    p +
                                    "'>" +
                                    _("Repeating") +
                                    "</label>")) +
                            ("<input data-mini='true' type='radio' name='stype-" +
                                p +
                                "' id='stype_set-" +
                                p +
                                "' value='stype_set-" +
                                p +
                                "' " +
                                ("object" == typeof h.start ? "checked='checked'" : "") +
                                "><label for='stype_set-" +
                                p +
                                "'>" +
                                _("Fixed") +
                                "</label>") +
                            "</fieldset>") +
                        ("<div " + ("object" == typeof h.start ? "style='display:none'" : "") + " id='input_stype_repeat-" + p + "'>") +
                        "<div class='ui-grid-a'>") +
                    ("<div class='ui-block-a'><label class='pad_buttons center' for='interval-" +
                        p +
                        "'>" +
                        _("Repeat Every") +
                        "</label><button class='pad_buttons' data-mini='true' name='interval-" +
                        p +
                        "' id='interval-" +
                        p +
                        "' value='" +
                        60 * h.interval +
                        "'>" +
                        dhms2str(sec2dhms(60 * h.interval)) +
                        "</button></div>")) +
                ("<div class='ui-block-b'><label class='pad_buttons center' for='repeat-" +
                    p +
                    "'>" +
                    _("Repeat Count") +
                    "</label><button class='pad_buttons' data-mini='true' name='repeat-" +
                    p +
                    "' id='repeat-" +
                    p +
                    "' value='" +
                    h.repeat +
                    "'>" +
                    h.repeat +
                    "</button></div>") +
                "</div></div>") +
            ("<table style='width:100%;" + ("object" == typeof h.start ? "" : "display:none") + "' id='input_stype_set-" + p + "'><tr><th class='center'>" + _("Enable") + "</th><th>" + _("Start Time") + "</th></tr>"),
            m = 1;
        m < 4;
        m++
    )
        u =
            (u +=
                "<tr><td data-role='controlgroup' data-type='horizontal' class='use_master center'><label for='ust_" +
                (m + 1) +
                "'><input id='ust_" +
                (m + 1) +
                "' type='checkbox' " +
                ((r = -1 === a[m]) ? "" : "checked='checked'") +
                "></label></td>") +
            "<td><button class='timefield' data-mini='true' type='time' id='start_" +
            (m + 1) +
            "-" +
            p +
            "' value='" +
            (r ? 0 : a[m]) +
            "'>" +
            readStartTime(r ? 0 : a[m]) +
            "</button></td></tr>";
    return (
        (u = u + "</table>" + "</div></div>"),
        !0 === t || "new" === e
            ? (u += "<button data-mini='true' data-icon='check' data-theme='b' id='submit-" + p + "'>" + _("Save New Program") + "</button>")
            : (u =
                  (u =
                      (u += "<button data-mini='true' data-icon='check' data-theme='b' id='submit-" + p + "'>" + _("Save Changes to") + " <span class='program-name'>" + h.name + "</span></button>") +
                      "<button data-mini='true' data-icon='arrow-r' id='run-" +
                      p +
                      "'>" +
                      _("Run") +
                      " <span class='program-name'>" +
                      h.name +
                      "</span></button>") +
                  "<button data-mini='true' data-icon='delete' class='bold red' data-theme='b' id='delete-" +
                  p +
                  "'>" +
                  _("Delete") +
                  " <span class='program-name'>" +
                  h.name +
                  "</span></button>"),
        (o = $(u)).find("input[name^='rad_days'],input[name^='stype']").on("change", function () {
            var e = $(this).val().split("-")[0].split("_");
            $("[id^='input_" + e[0] + "_']").hide(), $("#input_" + e[0] + "_" + e[1] + "-" + p).show();
        }),
        Supported.dateRange() &&
            o.find("#use-dr-" + p).on("click", function () {
                o.find("#date-range-options-" + p).toggle();
            }),
        o.find("[id^='interval-']").on("click", function () {
            var t = $(this),
                e = o.find("label[for='" + t.attr("id") + "']").text();
            showDurationBox({
                seconds: t.val(),
                title: e,
                callback: function (e) {
                    t.val(e), t.text(dhms2str(sec2dhms(e)));
                },
                maximum: 86340,
                granularity: 1,
                preventCompression: !0,
            });
        }),
        o.find(".timefield").on("click", function () {
            var t = $(this);
            showTimeInput({
                minutes: t.val(),
                title: _("Start Time"),
                showSun: !!checkOSVersion(213),
                callback: function (e) {
                    t.val(e), t.text(readStartTime(e));
                },
            });
        }),
        o.find("[id^='repeat-']").on("click", function () {
            var t = $(this),
                e = o.find("label[for='" + t.attr("id") + "']").text();
            showSingleDurationInput({
                data: t.val(),
                title: e,
                label: _("Repeat Count"),
                callback: function (e) {
                    t.val(e).text(e);
                },
                maximum: 1440,
            });
        }),
        o.find("[id^=station_]").on("click", function () {
            var t = $(this),
                e = controller.stations.snames[t.attr("id").split("_")[1].split("-")[0]];
            showDurationBox({
                seconds: t.val(),
                title: e,
                callback: function (e) {
                    t.val(e).addClass("green"), t.text(getDurationText(e)), 0 === e && t.removeClass("green");
                },
                maximum: 65535,
                showSun: !!checkOSVersion(214),
            });
        }),
        fixInputClick(o),
        o
    );
}
function addProgram(e) {
    e = 0 <= e ? e : "new";
    var t = $("<div data-role='page' id='addprogram'><div class='ui-content' role='main' id='newprogram'><fieldset id='program-new'></fieldset></div></div>"),
        n = changeHeader({
            title: _("Add Program"),
            leftBtn: { icon: "carat-l", text: _("Back"), class: "ui-toolbar-back-btn", on: checkChangesBeforeBack },
            rightBtn: {
                icon: "check",
                text: _("Submit"),
                on: function () {
                    return submitProgram("new"), !1;
                },
            },
        });
    t
        .find("#program-new")
        .html(makeProgram(e, !0))
        .one("change input", function () {
            n.eq(2).prop("disabled", !1).addClass("hasChanges");
        }),
        t.find("[id^='submit-']").on("click", function () {
            return submitProgram("new"), !1;
        }),
        t.one("pagehide", function () {
            t.remove();
        }),
        "string" == typeof e && n.eq(2).prop("disabled", !0),
        $("#addprogram").remove(),
        $.mobile.pageContainer.append(t);
}
function deleteProgram(e) {
    var t = pidname(parseInt(e) + 1);
    areYouSure(_("Are you sure you want to delete program") + " " + t + "?", "", function () {
        $.mobile.loading("show"),
            sendToOS("/dp?pw=&pid=" + e).done(function () {
                $.mobile.loading("hide"),
                    updateControllerPrograms(function () {
                        $("#programs").trigger("programrefresh"), showerror(_("Program") + " " + t + " " + _("deleted"));
                    });
            });
    });
}
function submitProgram(e) {
    $("#program-" + e)
        .find(".hasChanges")
        .removeClass("hasChanges"),
        (checkOSVersion(210) ? submitProgram21 : submitProgram183)(e);
}
function submitProgram183(e) {
    var t,
        n,
        i,
        o = [],
        a = [0, 0],
        s = 0,
        r = $("#en-" + e).is(":checked") ? 1 : 0;
    if (((o[0] = r), $("#days_week-" + e).is(":checked"))) {
        for (t = null === (t = $("#d-" + e).val()) ? [] : parseIntArray(t), n = 0; n < 7; n++) -1 !== $.inArray(n, t) && (a[0] |= 1 << n);
        if (0 === a[0]) return void showerror(_("Error: You have not selected any days of the week."));
        "odd" === $("#days_rst-" + e).val() ? ((a[0] |= 128), (a[1] = 1)) : "even" === $("#days_rst-" + e).val() && ((a[0] |= 128), (a[1] = 0));
    } else if ($("#days_n-" + e).is(":checked")) {
        if (((a[1] = parseInt($("#every-" + e).val(), 10)), !(2 <= a[1] && a[1] <= 128))) return void showerror(_("Error: Interval days must be between 2 and 128."));
        if (((a[0] = parseInt($("#starting-" + e).val(), 10)), !(0 <= a[0] && a[0] < a[1]))) return void showerror(_("Error: Starting in days wrong."));
        a[0] |= 128;
    }
    if (((o[1] = a[0]), (o[2] = a[1]), (o[3] = parseInt($("#start-" + e).val())), (o[4] = parseInt($("#end-" + e).val())), o[3] > o[4])) showerror(_("Error: Start time must be prior to end time."));
    else {
        o[5] = parseInt($("#interval-" + e).val() / 60);
        for (var l = $("[id^=station_][id$=-" + e + "]").length / 8, c = ((o[6] = parseInt($("#duration-" + e).val())), [0]), d = 0; d < l; d++)
            for (i = c[d] = 0; i < 8; i++) $("#station_" + (8 * d + i) + "-" + e).is(":checked") && ((c[d] |= 1 << i), (s = 1));
        (o = JSON.stringify(o.concat(c))),
            0 === s
                ? showerror(_("Error: You have not selected any stations."))
                : ($.mobile.loading("show"),
                  "new" === e
                      ? sendToOS("/cp?pw=&pid=-1&v=" + o).done(function () {
                            $.mobile.loading("hide"),
                                updateControllerPrograms(function () {
                                    $.mobile.document.one("pageshow", function () {
                                        showerror(_("Program added successfully"));
                                    }),
                                        goBack();
                                });
                        })
                      : sendToOS("/cp?pw=&pid=" + e + "&v=" + o).done(function () {
                            $.mobile.loading("hide"),
                                updateControllerPrograms(function () {
                                    updateProgramHeader();
                                }),
                                showerror(_("Program has been updated"));
                        }));
    }
}
function submitProgram21(e, t) {
    var n,
        i,
        o,
        a = [],
        s = [0, 0],
        r = [0, 0, 0, 0],
        l = 0,
        c = $("#en-" + e).is(":checked") ? 1 : 0,
        d = $("#uwt-" + e).is(":checked") ? 1 : 0,
        u = 0,
        p = checkOSVersion(2199) ? 1 : 2,
        u = u | (c << 0) | (d << 1);
    if (("odd" === $("#days_rst-" + e).val() ? (u |= 4) : "even" === $("#days_rst-" + e).val() && (u |= 8), $("#days_n-" + e).is(":checked"))) {
        if (((u |= 48), (s[1] = parseInt($("#every-" + e).val(), 10)), !(p <= s[1] && s[1] <= 128))) return void showerror(_("Error: Interval days must be between " + p + " and 128."));
        if (((s[0] = parseInt($("#starting-" + e).val(), 10)), !(0 <= s[0] && s[0] < s[1]))) return void showerror(_("Error: Starting in days wrong."));
    } else if ($("#days_week-" + e).is(":checked")) {
        for (u |= 0, n = null === (n = $("#d-" + e).val()) ? [] : parseIntArray(n), i = 0; i < 7; i++) -1 !== $.inArray(i, n) && (s[0] |= 1 << i);
        if (0 === s[0]) return void showerror(_("Error: You have not selected any days of the week."));
    }
    $("#stype_repeat-" + e).is(":checked")
        ? ((u |= 0), (r[0] = parseInt($("#start_1-" + e).val())), (r[1] = parseInt($("#repeat-" + e).val())), (r[2] = parseInt($("#interval-" + e).val() / 60)))
        : $("#stype_set-" + e).is(":checked") &&
          ((u |= 64),
          $("[id^='start_'][id$='-" + e + "']").each(function (e, t) {
              t = parseInt(t.value);
              ("number" != typeof t || (0 < e && !$("#ust_" + (e + 1)).is(":checked"))) && (t = -1), (r[e] = t);
          }));
    var c = $("[id^=station_][id$=-" + e + "]"),
        h = [];
    if (
        (c.each(function () {
            var e = parseInt(this.value);
            0 < parseInt(e) && (l = 1), h.push(e);
        }),
        (a[0] = u),
        (a[1] = s[0]),
        (a[2] = s[1]),
        (a[3] = r),
        (a[4] = h),
        (o = $("#name-" + e).val()),
        (d = ""),
        Supported.dateRange())
    ) {
        var p = $("#use-dr-" + e).is(":checked"),
            c = $("#from-dr-" + e).val(),
            f = $("#to-dr-" + e).val();
        if (!isValidDateRange(c, f)) return void showerror(_("Error: date range is malformed"));
        (d = "&endr=" + (p ? 1 : 0) + "&from=" + encodeDate(c) + "&to=" + encodeDate(f)), (a[0] |= p ? 128 : 0);
    }
    if (((c = "&v=" + JSON.stringify(a) + "&name=" + encodeURIComponent(o)), 0 === l)) showerror(_("Error: You have not selected any stations."));
    else {
        if (!t && $("#stype_repeat-" + e).is(":checked") && 0 < r[1]) {
            (f = calculateTotalRunningTime(h)), (p = 60 * r[2]);
            if (p < f)
                return void areYouSure(_("Warning: The repeat interval (" + p + " sec) is less than the program run time (" + f + " sec)."), _("Do you want to continue?"), function () {
                    submitProgram21(e, !0);
                });
        }
        t || 3 != ((u >> 4) & 3) || 1 & s[1] || !(0 < ((u >> 2) & 3))
            ? ($.mobile.loading("show"),
              "new" === e
                  ? sendToOS("/cp?pw=&pid=-1" + c + d).done(function () {
                        $.mobile.loading("hide"),
                            updateControllerPrograms(function () {
                                $.mobile.document.one("pageshow", function () {
                                    showerror(_("Program added successfully"));
                                }),
                                    goBack();
                            });
                    })
                  : sendToOS("/cp?pw=&pid=" + e + c + d).done(function () {
                        $.mobile.loading("hide"),
                            updateControllerPrograms(function () {
                                updateProgramHeader(),
                                    $("#program-" + e)
                                        .find(".program-name")
                                        .text(o);
                            }),
                            showerror(_("Program has been updated"));
                    }))
            : areYouSure(_("Warning: The use of odd/even restrictions with the selected interval day may result in the program not running at all."), _("Do you want to continue?"), function () {
                  submitProgram21(e, !0);
              });
    }
}
function raindelay(e) {
    return (
        $.mobile.loading("show"),
        sendToOS("/cv?pw=&rd=" + e / 3600).done(function () {
            $.mobile.loading("hide"), showLoading("#footer-running"), refreshStatus(updateWeather), showerror(_("Rain delay has been successfully set"));
        }),
        !1
    );
}
function getExportMethod() {
    var e = $(
            "<div data-role='popup' data-theme='a'><div class='ui-bar ui-bar-a'>" +
                _("Select Export Method") +
                "</div><div data-role='controlgroup' class='tight'><a class='ui-btn hidden fileMethod'>" +
                _("File") +
                "</a><a class='ui-btn pasteMethod'>" +
                _("Email") +
                "</a><a class='ui-btn localMethod'>" +
                _("Internal (within app)") +
                "</a></div></div>"
        ),
        t = encodeURIComponent(JSON.stringify(controller)),
        n = "OpenSprinkler Data Export on " + dateToString(new Date()),
        i =
            (isFileCapable &&
                e
                    .find(".fileMethod")
                    .removeClass("hidden")
                    .attr({ href: "data:text/json;charset=utf-8," + t, download: "backup-" + new Date().toLocaleDateString().replace(/\//g, "-") + ".json" })
                    .on("click", function () {
                        e.popup("close");
                    }),
            "mailto:?subject=" + encodeURIComponent(n) + "&body=" + t);
    e
        .find(".pasteMethod")
        .attr("href", i)
        .on("click", function () {
            window.open(i, isOSXApp ? "_system" : void 0), e.popup("close");
        }),
        e.find(".localMethod").on("click", function () {
            e.popup("close"),
                storage.set({ backup: JSON.stringify(controller) }, function () {
                    showerror(_("Backup saved on this device"));
                });
        }),
        openPopup(e, { positionTo: $("#sprinklers-settings").find(".export_config") });
}
function getImportMethod(e) {
    function t() {
        var t = $(
                "<div data-role='popup' data-theme='a' id='paste_config'><p class='ui-bar'><textarea class='textarea' rows='10' placeholder='" +
                    _("Paste your backup here") +
                    "'></textarea><button data-mini='true' data-theme='b'>" +
                    _("Import") +
                    "</button></p></div>"
            ),
            e = $.mobile.window.width();
        t.find("button").on("click", function () {
            var e = t.find("textarea").val();
            if ("" !== e)
                try {
                    (e = JSON.parse($.trim(e).replace(/“|”|″/g, '"'))), t.popup("close"), importConfig(e);
                } catch (e) {
                    t.find("textarea").val(""), showerror(_("Unable to read the configuration file. Please check the file and try again."));
                }
        }),
            t.css("width", 600 < e ? 0.4 * e + "px" : "100%"),
            openPopup(t);
    }
    var n = $(
        "<div data-role='popup' data-theme='a'><div class='ui-bar ui-bar-a'>" +
            _("Select Import Method") +
            "</div><div data-role='controlgroup' class='tight'><button class='hidden fileMethod'>" +
            _("File") +
            "</button><button class='pasteMethod'>" +
            _("Email (copy/paste)") +
            "</button><button class='hidden localMethod'>" +
            _("Internal (within app)") +
            "</button></div></div>"
    );
    if (isFileCapable)
        n.find(".fileMethod")
            .removeClass("hidden")
            .on("click", function () {
                n.popup("close");
                var e = $("<input type='file' id='configInput' data-role='none' style='visibility:hidden;position:absolute;top:-50px;left:-50px'/>").on("change", function () {
                    var e = this.files[0],
                        t = new FileReader();
                    "object" == typeof e &&
                        ((t.onload = function (e) {
                            try {
                                importConfig(JSON.parse($.trim(e.target.result)));
                            } catch (e) {
                                showerror(_("Unable to read the configuration file. Please check the file and try again."));
                            }
                        }),
                        t.readAsText(e));
                });
                return e.appendTo("#sprinklers-settings"), e.click(), !1;
            });
    else if (!e) return void t();
    n.find(".pasteMethod").on("click", function () {
        return n.popup("close"), t(), !1;
    }),
        e &&
            n
                .find(".localMethod")
                .removeClass("hidden")
                .on("click", function () {
                    return n.popup("close"), importConfig(JSON.parse(e)), !1;
                }),
        openPopup(n, { positionTo: $("#sprinklers-settings").find(".import_config") });
}
function importConfig(p) {
    var e = "";
    "object" == typeof p && p.settings
        ? (((!checkOSVersion(210) || "object" != typeof p.options || (p.options.hp0 === controller.options.hp0 && p.options.hp1 === controller.options.hp1)) &&
              p.options.dhcp === controller.options.dhcp &&
              p.options.devid === controller.options.devid) ||
              (e = _("Warning: Network changes will be made and the device may no longer be accessible from this address.")),
          areYouSure(_("Are you sure you want to restore the configuration?"), e, function () {
              $.mobile.loading("show");
              function e(e) {
                  return keyIndex[e] === i;
              }
              var t,
                  n,
                  i,
                  o,
                  a,
                  s = "/cs?pw=",
                  r = "/co?pw=",
                  l = Math.ceil(p.stations.snames.length / 16),
                  c = new Array(l).fill("/cs?pw="),
                  d = isOSPi();
              for (t in p.options)
                  p.options.hasOwnProperty(t) &&
                      keyIndex.hasOwnProperty(t) &&
                      ((i = keyIndex[t]),
                      (-1 !== $.inArray(i, [2, 14, 16, 21, 22, 25, 36]) && 0 === p.options[t]) ||
                          (3 === i
                              ? checkOSVersion(210) && 1 === controller.options.dhcp && (r += "&o3=1")
                              : (d && void 0 === (i = Object.keys(keyIndex).find(e))) || ((o = !0 === checkOSVersion(208) && "string" == typeof p.options[t] ? p.options[t].replace(/\s/g, "_") : p.options[t]), (r += "&o" + i + "=" + o))));
              for (
                  !d && "number" == typeof p.options.fwv && p.options.fwv < 211 && checkOSVersion(211) && (r += "&o36=1"),
                      "object" == typeof p.settings.wto && checkOSVersion(215) && (r += "&wto=" + escapeJSON(p.settings.wto)),
                      "string" == typeof p.settings.ifkey && checkOSVersion(217) && (r += "&ifkey=" + p.settings.ifkey),
                      "string" == typeof p.settings.dname && checkOSVersion(2191) && (r += "&dname=" + p.settings.dname),
                      "object" == typeof p.settings.mqtt && checkOSVersion(2191) && (r += "&mqtt=" + escapeJSON(p.settings.mqtt)),
                      "object" == typeof p.settings.otc && checkOSVersion(2191) && (r += "&otc=" + escapeJSON(p.settings.otc)),
                      r += "&" + (d ? "o" : "") + "loc=" + p.settings.loc,
                      n = 0;
                  n < l;
                  n++
              )
                  for (t = 16 * n; t < 16 * (n + 1) && t < p.stations.snames.length; t++) (a = !0 === checkOSVersion(208) ? p.stations.snames[t].replace(/\s/g, "_") : p.stations.snames[t]), (c[n] += "&s" + t + "=" + encodeURIComponent(a));
              for (t = 0; t < p.stations.masop.length; t++) s += "&m" + t + "=" + p.stations.masop[t];
              if ("object" == typeof p.stations.masop2) for (t = 0; t < p.stations.masop2.length; t++) s += "&n" + t + "=" + p.stations.masop2[t];
              if ("object" == typeof p.stations.ignore_rain) for (t = 0; t < p.stations.ignore_rain.length; t++) s += "&i" + t + "=" + p.stations.ignore_rain[t];
              if ("object" == typeof p.stations.ignore_sn1) for (t = 0; t < p.stations.ignore_sn1.length; t++) s += "&j" + t + "=" + p.stations.ignore_sn1[t];
              if ("object" == typeof p.stations.ignore_sn2) for (t = 0; t < p.stations.ignore_sn2.length; t++) s += "&k" + t + "=" + p.stations.ignore_sn2[t];
              if ("object" == typeof p.stations.stn_dis) for (t = 0; t < p.stations.stn_dis.length; t++) s += "&d" + t + "=" + p.stations.stn_dis[t];
              if ("object" == typeof p.stations.stn_spe) for (t = 0; t < p.stations.stn_spe.length; t++) s += "&p" + t + "=" + p.stations.stn_spe[t];
              if ("object" == typeof p.stations.stn_seq) for (t = 0; t < p.stations.stn_seq.length; t++) s += "&q" + t + "=" + p.stations.stn_seq[t];
              else if (!d && "number" == typeof p.options.fwv && p.options.fwv < 211 && !checkOSVersion(211)) for (var u = 0; u < p.settings.nbrd; u++) s += "&q" + u + "=" + (1 === p.options.seq ? 255 : 0);
              if ("object" == typeof p.stations.act_relay) for (t = 0; t < p.stations.act_relay.length; t++) s += "&a" + t + "=" + p.stations.act_relay[t];
              (p.special = p.special || {}),
                  $.when(
                      sendToOS(transformKeysinString(r)),
                      sendToOS(s),
                      sendToOS("/dp?pw=&pid=-1"),
                      $.each(c, function (e, t) {
                          sendToOS(t);
                      }),
                      $.each(p.programs.pd, function (e, t) {
                          var n = "";
                          if (d && "number" == typeof p.options.fwv && 210 <= p.options.fwv) return showerror(_("Program data is newer than the device firmware and cannot be imported")), !1;
                          if (!d && "number" == typeof p.options.fwv && 210 <= p.options.fwv && !checkOSVersion(210)) return showerror(_("Program data is newer than the device firmware and cannot be imported")), !1;
                          if (
                              (!d && "number" == typeof p.options.fwv && 210 <= p.options.fwv && checkOSVersion(210) && ((n = "&name=" + t[5]), (t = t.slice(0, 5))),
                              !d && "number" == typeof p.options.fwv && p.options.fwv < 210 && checkOSVersion(210))
                          ) {
                              var i,
                                  o,
                                  a,
                                  s = readProgram183(t),
                                  r = t.length - 7,
                                  l = [],
                                  c = 0;
                              for (c |= s.en << 0, s.is_even ? (c |= 8) : s.is_odd ? (c |= 4) : (c |= 0), s.is_interval ? (c |= 48) : (c |= 0), t[0] = c |= 0, o = 0; o < r; o++)
                                  for (i = t[7 + o], a = 0; a < 8; a++) l.push(i & (1 << a) ? s.duration : 0);
                              (t[3] = [s.start, parseInt((s.end - s.start) / s.interval), s.interval, 0]), (t[4] = l), (t = t.slice(0, 5)), (n = "&name=" + _("Program") + " " + (e + 1));
                          }
                          sendToOS("/cp?pw=&pid=-1&v=" + JSON.stringify(t) + n);
                      }),
                      $.each(p.special, function (e, t) {
                          checkOSVersion(216) && sendToOS("/cs?pw=&sid=" + e + "&st=" + t.st + "&sd=" + encodeURIComponent(t.sd));
                      })
                  ).then(
                      function () {
                          setTimeout(function () {
                              updateController(
                                  function () {
                                      $.mobile.loading("hide"), showerror(_("Backup restored to your device")), updateWeather(), goHome(!0);
                                  },
                                  function () {
                                      $.mobile.loading("hide"), networkFail();
                                  }
                              );
                          }, 1500);
                      },
                      function () {
                          $.mobile.loading("hide"), showerror(_("Unable to import configuration."));
                      }
                  );
          }))
        : showerror(_("Invalid configuration"));
}
var showAbout = (function () {
    var e,
        t = $(
            "<div data-role='page' id='about'><div class='ui-content' role='main'><ul data-role='listview' data-inset='true'><li><p>" +
                _("User manual for OpenSprinkler is available at") +
                " <a class='iab' target='_blank' href='https://openthings.freshdesk.com/support/solutions/folders/5000147083'>https://support.openthings.io</a></p></li></ul><ul data-role='listview' data-inset='true'><li><p>" +
                _("This is open source software: source code and changelog for this application can be found at") +
                " <a class='iab squeeze' target='_blank' href='https://github.com/OpenSprinkler/OpenSprinkler-App/'>https://github.com/OpenSprinkler/OpenSprinkler-App/</a></p><p>" +
                _("Language localization is crowdsourced using Transifex available at") +
                " <a class='iab squeeze' target='_blank' href='https://www.transifex.com/albahra/opensprinkler/'>https://www.transifex.com/albahra/opensprinkler/</a></p><p>" +
                _("Open source attributions") +
                ": <a class='iab iabNoScale squeeze' target='_blank' href='https://github.com/OpenSprinkler/OpenSprinkler-App/wiki/List-of-Integrated-Libraries'>https://github.com/OpenSprinkler/OpenSprinkler-App/wiki/List-of-Integrated-Libraries</a></p></li></ul><p class='smaller'>" +
                _("App Version") +
                ": 2.3.3<br>" +
                _("Firmware") +
                ": <span class='firmware'></span><br><span class='hardwareLabel'>" +
                _("Hardware Version") +
                ":</span> <span class='hardware'></span></p></div></div>"
        );
    return function () {
        (e = void 0 === controller.options.hwv),
            t
                .find(".hardware")
                .toggleClass("hidden", e)
                .text(getHWVersion() + getHWType()),
            t.find(".hardwareLabel").toggleClass("hidden", e),
            t.find(".firmware").text(getOSVersion() + getOSMinorVersion()),
            t.one("pagehide", function () {
                t.detach();
            }),
            changeHeader({ title: _("About"), leftBtn: { icon: "carat-l", text: _("Back"), class: "ui-toolbar-back-btn", on: goBack } }),
            $("#about").remove(),
            $.mobile.pageContainer.append(t);
    };
})();
function stopStations(e) {
    $.mobile.loading("show"),
        sendToOS("/cv?pw=&rsn=1").done(function () {
            setTimeout(function () {
                $.mobile.loading("hide"), e();
            }, 1e3);
        });
}
function flowCountToVolume(e) {
    return parseFloat(((e * ((controller.options.fpr1 << 8) + controller.options.fpr0)) / 100).toFixed(2));
}
function isOSPi() {
    return !(!controller || "object" != typeof controller.options || "string" != typeof controller.options.fwv || -1 === controller.options.fwv.search(/ospi/i));
}
function checkPW(e, t) {
    e = "/sp?pw=" + encodeURIComponent(e) + "&npw=" + encodeURIComponent(e) + "&cpw=" + encodeURIComponent(e);
    $.ajax({ url: currToken ? "https://cloud.openthings.io/forward/v1/" + currToken + e : currPrefix + currIp + e, cache: !1, crossDomain: !0, type: "GET" }).then(
        function (e) {
            e = e.result;
            t(!(void 0 === e || 1 < e));
        },
        function () {
            t(!1);
        }
    );
}
function changePassword(o) {
    o = $.extend({}, { fixIncorrect: !1, name: "", callback: function () {}, cancel: function () {} }, o);
    var t = isOSPi(),
        n = !1,
        a = $(
            "<div data-role='popup' class='modal' id='changePassword' data-theme='a' data-overlay-theme='b'><ul data-role='listview' data-inset='true'>" +
                (!0 === o.fixIncorrect ? "" : "<li data-role='list-divider'>" + _("Change Password") + "</li>") +
                "<li>" +
                (!0 === o.fixIncorrect ? "<p class='rain-desc red-text bold'>" + _("Incorrect password for ") + o.name + ". " + _("Please re-enter password to try again.") + "</p>" : "") +
                "<form method='post' novalidate><label for='npw'>" +
                (!0 === o.fixIncorrect ? _("Password:") : _("New Password") + ":") +
                "</label><input type='password' name='npw' id='npw' value=''" +
                (t ? "" : " maxlength='32'") +
                ">" +
                (!0 === o.fixIncorrect ? "" : "<label for='cpw'>" + _("Confirm New Password") + ":</label><input type='password' name='cpw' id='cpw' value=''" + (t ? "" : " maxlength='32'") + ">") +
                (!0 === o.fixIncorrect ? "<label for='save_pw'>" + _("Save Password") + "</label><input type='checkbox' data-wrapper-class='save_pw' name='save_pw' id='save_pw' data-mini='true'>" : "") +
                "<input type='submit' value='" +
                _("Submit") +
                "'></form></li></ul></div>"
        );
    a.find("form").on("submit", function () {
        var i = a.find("#npw").val(),
            e = a.find("#cpw").val();
        return (
            !0 === o.fixIncorrect
                ? ((n = !0),
                  storage.get(["sites"], function (e) {
                      function t(e) {
                          (currPass = e), (n[o.name].os_pw = a.find("#save_pw").is(":checked") ? e : ""), storage.set({ sites: JSON.stringify(n) }, cloudSaveSites), a.popup("close"), o.callback();
                      }
                      var n = parseSites(e.sites);
                      checkPW(md5(i), function (e) {
                          t(!0 === e ? md5(i) : i);
                      });
                  }))
                : i !== e
                ? showerror(_("The passwords don't match. Please try again."))
                : "" === i
                ? showerror(_("Password cannot be empty"))
                : (!t && 32 < i.length && showerror(_("Password cannot be longer than 32 characters")),
                  checkOSVersion(213) && ((i = md5(i)), (e = md5(e))),
                  $.mobile.loading("show"),
                  sendToOS("/sp?pw=&npw=" + encodeURIComponent(i) + "&cpw=" + encodeURIComponent(e), "json").done(function (e) {
                      e = e.result;
                      !e || 1 < e
                          ? showerror(_(2 === e ? "Please check the current device password is correct then try again" : "Unable to change password. Please try again."))
                          : (storage.get(["sites", "current_site"], function (e) {
                                var t = parseSites(e.sites);
                                (t[e.current_site].os_pw = i), (currPass = i), storage.set({ sites: JSON.stringify(t) }, cloudSaveSites);
                            }),
                            $.mobile.loading("hide"),
                            a.popup("close"),
                            showerror(_("Password changed successfully")));
                  })),
            !1
        );
    }),
        a
            .one("popupafterclose", function () {
                document.activeElement.blur(), a.remove(), o.fixIncorrect && !n && o.cancel();
            })
            .popup()
            .enhanceWithin(),
        o.fixIncorrect
            ? storage.get(["sites", "current_site"], function (e) {
                  var t = parseSites(e.sites),
                      n = e.current_site,
                      i = md5(t[n].os_pw);
                  isMD5(t[n].os_pw)
                      ? a.popup("open")
                      : ((e = "/jc?pw=" + i),
                        $.ajax({ url: currToken ? "https://cloud.openthings.io/forward/v1/" + currToken + e : currPrefix + currIp + e, type: "GET", dataType: "json" }).then(
                            function () {
                                (t[n].os_pw = currPass = i), storage.set({ sites: JSON.stringify(t) }, cloudSaveSites), o.callback();
                            },
                            function () {
                                a.popup("open");
                            }
                        ));
              })
            : a.popup("open");
}
function requestCloudAuth(e) {
    e = e || function () {};
    var t = $(
            "<div data-role='popup' class='modal' id='requestCloudAuth' data-theme='a'><ul data-role='listview' data-inset='true'><li data-role='list-divider'>" +
                _("OpenSprinkler.com Login") +
                "</li><li><p class='rain-desc tight'>" +
                _("Use your OpenSprinkler.com login and password to securely sync sites between all your devices.") +
                "<br><br>" +
                _("Don't have an account?") +
                " <a href='https://opensprinkler.com/my-account/' class='iab'>" +
                _("Register here") +
                "</a></p></li><li><form method='post' novalidate><label for='cloudUser'>" +
                _("Username:") +
                "</label><input type='text' name='cloudUser' id='cloudUser' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false'><label for='cloudPass'>" +
                _("Password:") +
                "</label><input type='password' name='cloudPass' id='cloudPass'><input type='submit' value='" +
                _("Submit") +
                "'></form></li></ul></div>"
        ),
        n = !1;
    t.find("form").on("submit", function () {
        return (
            $.mobile.loading("show"),
            cloudLogin(t.find("#cloudUser").val(), t.find("#cloudPass").val(), function (e) {
                !1 === e ? showerror(_("Invalid username/password combination. Please try again.")) : ($.mobile.loading("hide"), (n = !0), t.popup("close"));
            }),
            !1
        );
    }),
        t.one("popupafterclose", function () {
            e(n), n && cloudSyncStart();
        }),
        openPopup(t);
}
/*
function cloudLogin(e, t, n) {
    (n = n || function () {}),
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "https://opensprinkler.com/wp-admin/admin-ajax.php",
            data: { action: "ajaxLogin", username: e, password: t },
            success: function (e) {
                "string" == typeof e.token && storage.set({ cloudToken: e.token, cloudDataToken: sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(t)) }), n(e.loggedin);
            },
            fail: function () {
                n(!1);
            },
        });
}
*/
/*
function cloudSaveSites(t) {
    "function" != typeof t && (t = function () {}),
        console.log(currIp, currPrefix)
        storage.get(["cloudToken", "cloudDataToken", "sites"], function (e) {
            null === e.cloudToken || void 0 === e.cloudToken
                ? t(!1)
                : $.ajax({
                      type: "POST",
                      dataType: "json",
                      url: "https://opensprinkler.com/wp-admin/admin-ajax.php",
                      data: { action: "saveSites", token: e.cloudToken, sites: encodeURIComponent(JSON.stringify(sjcl.encrypt(e.cloudDataToken, e.sites))) },
                      success: function (e) {
                          !1 === e.success ? ("BAD_TOKEN" === e.message && handleExpiredLogin(), t(!1, e.message)) : (storage.set({ cloudToken: e.token }), t(e.success));
                      },
                      fail: function () {
                          t(!1);
                      },
                  });
        });
}
*/
function cloudSaveSites(t) {
    "function" != typeof t && (t = function () {}),
    mytime = new Date().getTime().toString(),
    storage.get(["sites"], function (e) {
        $.ajax({
            type: "POST",
            dataType: "text",
            url: currPrefix+currIp+"/cx?pw="+currPass+"&local&_="+mytime,
            data: JSON.stringify({notes:JSON.parse(e.sites).Local.notes,images:JSON.parse(e.sites).Local.images}),
            success: function (e) {t(!0)},
            fail: function () {t(!1)},
        });
    });
}

function fetchLocal() {
    mytime = new Date().getTime().toString();
    url = currPrefix+currIp+"/jx?pw="+currPass+"&local&_="+mytime;
    $.get(url,
        function(data){
            storage.get(["sites"], function(e){
                sites = (JSON.parse(e.sites)),
                sites.Local.notes = data.notes,
                sites.Local.images = data.images,
                storage.set({sites: JSON.stringify(sites)})
            })
        })
}

function cloudGetSites(i) {
    (i = i || function () {}),
        storage.get(["cloudToken", "cloudDataToken"], function (n) {
            void 0 === n.cloudToken || null === n.cloudToken
                ? i(!1)
                : void 0 === n.cloudDataToken || null === n.cloudDataToken
                ? (handleInvalidDataToken(), i(!1))
                : $.ajax({
                      type: "POST",
                      dataType: "json",
                      url: "https://opensprinkler.com/wp-admin/admin-ajax.php",
                      data: { action: "getSites", token: n.cloudToken },
                      success: function (e) {
                          if (!1 === e.success || "" === e.sites) "BAD_TOKEN" === e.message && handleExpiredLogin(), i(!1, e.message);
                          else {
                              var t;
                              storage.set({ cloudToken: e.token });
                              try {
                                  t = sjcl.decrypt(n.cloudDataToken, e.sites);
                              } catch (e) {
                                  "ccm: tag doesn't match" === e.message && handleInvalidDataToken(), i(!1);
                              }
                              try {
                                  i(JSON.parse(t));
                              } catch (e) {
                                  i(!1);
                              }
                          }
                      },
                      fail: function () {
                          i(!1);
                      },
                  });
        });
}
function cloudSyncStart() {
    cloudGetSites(function (i) {
        var o = $(".ui-page-active").attr("id");
        "start" === o
            ? (0 < Object.keys(i).length && storage.set({ sites: JSON.stringify(i) }), changePage("#site-control"))
            : (updateLoginButtons(),
              storage.get("sites", function (t) {
                  var e, n;
                  JSON.stringify(i) !== t.sites &&
                      ((t.sites = parseSites(t.sites)),
                      currLocal
                          ? findLocalSiteName(i, function (e) {
                                !1 === e
                                    ? areYouSure(
                                          _("Do you wish to add this location to your cloud synced site list?"),
                                          _("This site is not found in the currently synced site list but may be added now."),
                                          function () {
                                              (i[currIp] = t.sites.Local), storage.set({ sites: JSON.stringify(i) }, cloudSaveSites), storage.set({ current_site: currIp }), updateSiteList(Object.keys(i), currIp);
                                          },
                                          function () {
                                              storage.remove("cloudToken", updateLoginButtons);
                                          }
                                      )
                                    : (storage.set({ sites: JSON.stringify(i) }, cloudSaveSites), storage.set({ current_site: e }), updateSiteList(Object.keys(i), e));
                            })
                          : 0 < Object.keys(i).length
                          ? ((e = $(
                                "<div data-role='popup' data-theme='a' data-overlay-theme='b'><div class='ui-bar ui-bar-a'>" +
                                    _("Select Merge Method") +
                                    "</div><div data-role='controlgroup' class='tight'><button class='merge'>" +
                                    _("Merge") +
                                    "</button><button class='replaceLocal'>" +
                                    _("Replace local with cloud") +
                                    "</button><button class='replaceCloud'>" +
                                    _("Replace cloud with local") +
                                    "</button></div></div>"
                            )),
                            (n = function () {
                                storage.set({ sites: JSON.stringify(i) }, cloudSaveSites), e.popup("close"), "site-control" === o && changePage("#site-control");
                            }),
                            e.find(".merge").on("click", function () {
                                (i = $.extend({}, t.sites, i)), n();
                            }),
                            e.find(".replaceLocal").on("click", function () {
                                n();
                            }),
                            e.find(".replaceCloud").on("click", function () {
                                (i = t.sites), n();
                            }),
                            e
                                .one("popupafterclose", function () {
                                    e.popup("destroy").remove();
                                })
                                .popup({ history: !1, positionTo: "window" })
                                .enhanceWithin()
                                .popup("open"))
                          : cloudSaveSites());
              }));
    });
}
function cloudSync(n) {
    "function" != typeof n && (n = function () {}),
        storage.get(["cloudToken", "current_site"], function (t) {
            "string" == typeof t.cloudToken &&
                cloudGetSites(function (e) {
                    !1 !== e &&
                        storage.set({ sites: JSON.stringify(e) }, function () {
                            updateSiteList(Object.keys(e), t.current_site), n(), $("html").trigger("siterefresh");
                        });
                });
        });
}
var corruptionNotificationShown = !1;
function handleCorruptedWeatherOptions(n) {
    corruptionNotificationShown ||
        (addNotification({
            title: _("Weather Options have Corrupted"),
            desc: _("Click here to retrieve the partial weather option data"),
            on: function () {
                var e = $(this).parent(),
                    t = $(
                        "<div data-role='popup' data-theme='a' class='modal ui-content' id='weatherOptionCorruption'><h3 class='center'>" +
                            _("Weather option data has corrupted") +
                            "</h3><h5 class='center'>" +
                            _("Please note this may indicate other data corruption as well, please verify all settings.") +
                            "</h5><h6 class='center'>" +
                            _("Below is the corrupt data which could not be parsed but may be useful for restoration.") +
                            "</h6><code>" +
                            n[0].substr(7) +
                            "</code><a class='ui-btn ui-corner-all ui-shadow red reset-options' style='width:80%;margin:5px auto;' href='#'>" +
                            _("Reset All Options") +
                            "</a><a class='ui-btn ui-corner-all ui-shadow submit' style='width:80%;margin:5px auto;' href='#'>" +
                            _("Dismiss") +
                            "</a></div>"
                    );
                return (
                    t.find(".submit").on("click", function () {
                        return removeNotification(e), t.popup("close"), !1;
                    }),
                    t.find(".reset-options").on("click", function () {
                        return (
                            removeNotification(e),
                            t.popup("close"),
                            resetAllOptions(function () {
                                showerror(_("Settings have been saved"));
                            }),
                            !1
                        );
                    }),
                    openPopup(t),
                    !1
                );
            },
        }),
        (corruptionNotificationShown = !0));
}
function handleExpiredLogin() {
    storage.remove(["cloudToken"], updateLoginButtons),
        addNotification({
            title: _("OpenSprinkler.com Login Expired"),
            desc: _("Click here to re-login to OpenSprinkler.com"),
            on: function () {
                var t = $(this).parent();
                return (
                    requestCloudAuth(function (e) {
                        removeNotification(t), !0 === e && (updateLoginButtons(), cloudSync());
                    }),
                    !1
                );
            },
        });
}
function handleInvalidDataToken() {
    storage.remove(["cloudDataToken"]),
        addNotification({
            title: _("Unable to read cloud data"),
            desc: _("Click here to enter a valid password to decrypt the data"),
            on: function () {
                var e = $(this).parent(),
                    t = $(
                        "<div data-role='popup' data-theme='a' class='modal ui-content' id='dataPassword'><p class='tight rain-desc'>" +
                            _("Please enter your OpenSprinkler.com password. If you have recently changed your password, you may need to enter your previous password to decrypt the data.") +
                            "</p><form><input type='password' id='dataPasswordInput' name='dataPasswordInput' placeholder='" +
                            _("Password") +
                            "' /><input type='submit' data-theme='b' value='" +
                            _("Submit") +
                            "' /></form></div>"
                    ),
                    n = !1;
                return (
                    t.find("form").on("submit", function () {
                        return (
                            removeNotification(e),
                            (n = !0),
                            storage.set({ cloudDataToken: sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(t.find("#dataPasswordInput").val())) }, function () {
                                t.popup("close");
                            }),
                            !1
                        );
                    }),
                    t.one("popupafterclose", function () {
                        !0 === n && cloudSync();
                    }),
                    openPopup(t),
                    !1
                );
            },
        });
}
function getTokenUser(e) {
    return atob(e).split("|")[0];
}
function detectUnusedExpansionBoards() {
    "number" == typeof controller.options.dexp &&
        controller.options.dexp < 255 &&
        0 <= controller.options.dexp &&
        controller.options.ext < controller.options.dexp &&
        addNotification({
            title: _("Unused Expanders Detected"),
            desc: _("Click here to enable all connected stations."),
            on: function () {
                return removeNotification($(this).parent()), changePage("#os-options", { expandItem: "station" }), !1;
            },
        });
}
function showUnifiedFirmwareNotification() {
    isOSPi() &&
        storage.get("ignoreUnifiedFirmware", function (e) {
            "1" !== e.ignoreUnifiedFirmware &&
                addNotification({
                    title: _("Unified firmware is now available"),
                    desc: _("Click here for more details"),
                    on: function () {
                        return (
                            window.open(
                                "https://openthings.freshdesk.com/support/solutions/articles/5000631599",
                                "_blank",
                                "location=" + (isAndroid ? "yes" : "no") + ",enableViewportScale=yes,toolbarposition=top,closebuttoncaption=" + _("Back")
                            ),
                            !1
                        );
                    },
                    off: function () {
                        return storage.set({ ignoreUnifiedFirmware: "1" }), !0;
                    },
                });
        });
}
function intToIP(e) {
    return ((e >> 24) & 255) + "." + ((e >> 16) & 255) + "." + ((e >> 8) & 255) + "." + (255 & e);
}
function checkPublicAccess(e) {
    var t, n;
    0 === e ||
        currToken ||
        ((e = intToIP(e)),
        (t = currIp.match(/.*:(\d+)/)),
        (n = function () {
            storage.get("ignoreRemoteFailed", function (e) {
                "1" !== e.ignoreRemoteFailed &&
                    addNotification({
                        title: _("Remote access is not enabled"),
                        desc: _("Click here to troubleshoot remote access issues"),
                        on: function () {
                            return (
                                window.open(
                                    "https://openthings.freshdesk.com/support/solutions/articles/5000569763",
                                    "_blank",
                                    "location=" + (isAndroid ? "yes" : "no") + ",enableViewportScale=yes,toolbarposition=top,closebuttoncaption=" + _("Back")
                                ),
                                !1
                            );
                        },
                        off: function () {
                            return storage.set({ ignoreRemoteFailed: "1" }), !0;
                        },
                    });
            });
        }),
        e !== currIp &&
            !isLocalIP(e) &&
            isLocalIP(currIp) &&
            ((t = t ? parseInt(t[1]) : 80),
            $.ajax({ url: currPrefix + e + ":" + t + "/jo?pw=" + currPass, global: !1, dataType: "json", type: "GET" }).then(function (e) {
                ("object" != typeof e || !e.hasOwnProperty("fwv") || e.fwv !== controller.options.fwv || (checkOSVersion(214) && controller.options.ip4 !== e.ip4)) && n();
            }, n)));
}
function logout(e) {
    "function" != typeof e && (e = function () {}),
        areYouSure(_("Are you sure you want to logout?"), "", function () {
            currLocal
                ? storage.remove(["sites", "current_site", "lang", "provider", "wapikey", "runonce", "cloudToken"], function () {
                      location.reload();
                  })
                : storage.remove(["cloudToken"], function () {
                      updateLoginButtons(), e();
                  });
        });
}
function updateLoginButtons() {
    var i = $(".ui-page-active");
    storage.get("cloudToken", function (e) {
        var t = $(".login-button"),
            n = $(".logout-button");
        null === e.cloudToken || void 0 === e.cloudToken
            ? (t.removeClass("hidden"), currLocal || n.addClass("hidden"), n.find("a").text(_("Logout")), "site-control" === i.attr("id") && i.find(".logged-in-alert").remove())
            : (n
                  .removeClass("hidden")
                  .find("a")
                  .text(_("Logout") + " (" + getTokenUser(e.cloudToken) + ")"),
              t.addClass("hidden"),
              "site-control" === i.attr("id") && 0 === i.find(".logged-in-alert").length && i.find(".ui-content").prepend(addSyncStatus(e.cloudToken)));
    });
}
function addNotification(e) {
    notifications.push(e), updateNotificationBadge();
    var t = $("#notificationPanel");
    t.hasClass("ui-panel-open") && t.find("ul").append(createNotificationItem(e)).listview("refresh");
}
function updateNotificationBadge() {
    var e = notifications.length,
        t = $("#header");
    0 === e ? t.find(".notifications").hide() : (t.find(".notifications").show(), t.find(".notificationCount").text(e));
}
function createNotificationItem(e) {
    var t = $("<li><a class='primary' href='#'><h2>" + e.title + "</h2>" + (e.desc ? "<p>" + e.desc + "</p>" : "") + "</a><a class='ui-btn ui-btn-icon-notext ui-icon-delete'></a></li>");
    return (
        t.find(".primary").on("click", e.on),
        t.find(".ui-icon-delete").on("click", function () {
            removeNotification($(this).parent());
        }),
        t
    );
}
function showNotifications() {
    if (0 !== notifications.length) {
        for (
            var e = $("#notificationPanel"),
                t = $("#footer-menu"),
                n = [
                    $("<li data-role='list-divider'>" + _("Notifications") + "<button class='ui-btn ui-btn-icon-notext ui-icon-delete btn-no-border clear-all delete'></button></li>").on("click", ".clear-all", function () {
                        var e = $(this);
                        e.hasClass("clear")
                            ? clearNotifications()
                            : (e.removeClass("delete ui-btn-icon-notext ui-icon-delete").addClass("clear").text(_("Clear")),
                              setTimeout(function () {
                                  $.mobile.document.one("click", function () {
                                      e.removeClass("clear").addClass("delete ui-btn-icon-notext ui-icon-delete").text("");
                                  });
                              }, 1));
                    }),
                ],
                i = notifications.length - 1;
            0 <= i;
            i--
        )
            n.push(createNotificationItem(notifications[i]));
        e.find("ul").replaceWith($("<ul/>").append(n).listview()),
            e.on("panelbeforeclose", function () {
                t.removeClass("moveLeft");
            }),
            e.panel().panel("option", "classes.modal", "needsclick ui-panel-dismiss"),
            t.addClass("moveLeft"),
            e.panel("open");
    }
}
function clearNotifications() {
    var e = $("#notificationPanel");
    (notifications = []), updateNotificationBadge(), e.find("ul").empty(), e.hasClass("ui-panel-open") && e.panel("close");
}
function removeNotification(e) {
    var t = $("#notificationPanel"),
        n = notifications[e.index() - 1].off;
    ("function" != typeof n || n()) && (notifications.remove(e.index() - 1), e.remove(), updateNotificationBadge(), 0 === notifications.length) && t.hasClass("ui-panel-open") && t.panel("close");
}
function checkFirmwareUpdate() {
    checkOSVersion(200) &&
        ("3.0" === getHWVersion() || isOSPi()) &&
        $.getJSON("https://api.github.com/repos/opensprinkler/opensprinkler-firmware/releases").done(function (o) {
            controller.options.fwv < o[0].tag_name &&
                storage.get("updateDismiss", function (e) {
                    (!e.updateDismiss || e.updateDismiss < o[0].tag_name) &&
                        addNotification({
                            title: _("Firmware update available"),
                            on: function () {
                                var e = $(this).parent(),
                                    t = 30 === controller.options.hwv || (63 < controller.options.hwv && checkOSVersion(216)),
                                    n = o[0].html_url,
                                    i = $(
                                        "<div data-role='popup' class='modal' data-theme='a'><h3 class='center' style='margin-bottom:0'>" +
                                            _("Latest") +
                                            " " +
                                            _("Firmware") +
                                            ": " +
                                            o[0].name +
                                            "</h3><h5 class='center' style='margin:0'>" +
                                            _("This Controller") +
                                            ": " +
                                            getOSVersion() +
                                            getOSMinorVersion() +
                                            "</h5><a class='iab ui-btn ui-corner-all ui-shadow' style='width:80%;margin:5px auto;' target='_blank' href='" +
                                            n +
                                            "'>" +
                                            _("View Changelog") +
                                            "</a><a class='guide ui-btn ui-corner-all ui-shadow' style='width:80%;margin:5px auto;' href='#'>" +
                                            _("Update Guide") +
                                            "</a>" +
                                            (t ? "<a class='update ui-btn ui-corner-all ui-shadow' style='width:80%;margin:5px auto;' href='#'>" + _("Update Now") + "</a>" : "") +
                                            "<a class='dismiss ui-btn ui-btn-b ui-corner-all ui-shadow' style='width:80%;margin:5px auto;' href='#'>" +
                                            _("Dismiss") +
                                            "</a></div>"
                                    );
                                i.find(".update").on("click", function () {
                                    30 === controller.options.hwv
                                        ? $("<a class='hidden iab' href='" + currPrefix + currIp + "/update'></a>")
                                              .appendTo(i)
                                              .click()
                                        : sendToOS("/cv?pw=&update=1", "json").then(
                                              function () {
                                                  showerror(_("Update successful")), i.find(".dismiss").click();
                                              },
                                              function () {
                                                  $.mobile.loading("show", {
                                                      html:
                                                          "<div class='center'>" +
                                                          _("Update did not complete.") +
                                                          "<br><a class='iab ui-btn' href='https://openthings.freshdesk.com/support/solutions/articles/5000631599-installing-and-updating-the-unified-firmware#upgrade'>" +
                                                          _("Update Guide") +
                                                          "</a></div>",
                                                      textVisible: !0,
                                                      theme: "b",
                                                  }),
                                                      setTimeout(function () {
                                                          $.mobile.loading("hide");
                                                      }, 3e3);
                                              }
                                          );
                                }),
                                    i.find(".guide").on("click", function () {
                                        var e =
                                            63 < controller.options.hwv
                                                ? "https://openthings.freshdesk.com/support/solutions/articles/5000631599-installing-and-updating-the-unified-firmware#upgrade"
                                                : "https://openthings.freshdesk.com/support/solutions/articles/5000381694-opensprinkler-firmware-update-guide";
                                        $("<a class='hidden iab' href='" + e + "'></a>")
                                            .appendTo(i)
                                            .click();
                                    }),
                                    i.find(".dismiss").one("click", function () {
                                        return storage.set({ updateDismiss: o[0].tag_name }), i.popup("close"), removeNotification(e), !1;
                                    }),
                                    openPopup(i);
                            },
                        });
                });
        });
}
function stopAllStations() {
    if (!isControllerConnected()) return !1;
    areYouSure(_("Are you sure you want to stop all stations?"), "", function () {
        $.mobile.loading("show"),
            sendToOS("/cv?pw=&rsn=1").done(function () {
                $.mobile.loading("hide"), removeStationTimers(), refreshStatus(), showerror(_("All stations have been stopped"));
            });
    });
}
function checkOSPiVersion(e) {
    var t;
    return !!isOSPi() && ((t = controller.options.fwv.split("-")[0]) === e || versionCompare((t = t.split(".")), (e = e.split("."))));
}
function checkOSVersion(e) {
    var t = controller.options.fwv;
    if (1e3 <= e) {
        if (isNaN(controller.options.fwm)) return !1;
        t = 10 * t + controller.options.fwm;
    }
    return !isOSPi() && (e === t || versionCompare(t.toString().split(""), e.toString().split("")));
}
function versionCompare(e, t) {
    for (var n, i = Math.max(e.length, t.length); e.length < i; ) e.push(0);
    for (; t.length < i; ) t.push(0);
    for (var o = 0; o < i && 0 === (n = Math.max(-1, Math.min(1, e[o] - t[o]))); o++);
    return (n = -1 === n ? !1 : n);
}
function getOSVersion(e) {
    return "string" == typeof (e = e || "object" != typeof controller.options ? e : controller.options.fwv) && -1 !== e.search(/ospi/i) ? e : ((e / 100) >> 0) + "." + (((e / 10) >> 0) % 10) + "." + (e % 10);
}
function getOSMinorVersion() {
    return !isOSPi() && "object" == typeof controller.options && "number" == typeof controller.options.fwm && 0 < controller.options.fwm ? " (" + controller.options.fwm + ")" : "";
}
function getHWVersion(e) {
    if (!e) {
        if ("object" != typeof controller.options || void 0 === controller.options.hwv) return !1;
        e = controller.options.hwv;
    }
    return "string" == typeof e ? e : 64 === e ? "OSPi" : 128 === e ? "OSBo" : 192 === e ? "Linux" : 255 === e ? "Demo" : (((e / 10) >> 0) % 10) + "." + (e % 10);
}
function getHWType() {
    return isOSPi() || "number" != typeof controller.options.hwt || 0 === controller.options.hwt
        ? ""
        : 172 === controller.options.hwt
        ? " - AC"
        : 220 === controller.options.hwt
        ? " - DC"
        : 26 === controller.options.hwt
        ? " - Latching"
        : "";
}
function areYouSure(e, t, n, i, o) {
    $("#sure").popup("destroy").remove(), (n = n || function () {}), (i = i || function () {});
    var a = 0,
        s =
            ("object" == typeof o && (a = o.type === dialog.REMOVE_STATION && Groups.canShift(o.gid) && Station.isSequential(o.station)),
            $(
                "<div data-role='popup' data-theme='a' id='sure'><h3 class='sure-1 center'>" +
                    e +
                    "</h3><p class='sure-2 center'>" +
                    t +
                    "</p><a class='sure-do ui-btn ui-btn-b ui-corner-all ui-shadow' href='#'>" +
                    _("Yes") +
                    "</a><a class='sure-dont ui-btn ui-corner-all ui-shadow' href='#'>" +
                    _("No") +
                    "</a>" +
                    (a ? "<label><input id='shift-sta' type='checkbox'>Move up remaining stations in the same sequential group?</label>" : "") +
                    "</div>"
            ));
    s.find(".sure-do").one("click.sure", function () {
        return s.popup("close"), n(), !1;
    }),
        s.find(".sure-dont").one("click.sure", function () {
            return s.popup("close"), i(), !1;
        }),
        openPopup(s);
}
function showIPRequest(i) {
    function t(e, t) {
        var e = a.find(".inputs input").eq(e),
            n = parseInt(e.val());
        (-1 === t && 0 === n) || (1 === t && 255 <= n) || (e.val(n + t), i.callback(o()));
    }
    function o() {
        return $.makeArray(
            a.find(".ip_addr").map(function () {
                return parseInt($(this).val());
            })
        );
    }
    var e = { title: _("Enter IP Address"), ip: [0, 0, 0, 0], showBack: !0, callback: function () {} },
        a =
            ((i = $.extend({}, e, i)),
            $("#ipInput").popup("destroy").remove(),
            $(
                "<div data-role='popup' id='ipInput' data-theme='a'><div data-role='header' data-theme='b'><h1>" +
                    i.title +
                    "</h1></div><div class='ui-content'><span><fieldset class='ui-grid-c incr'><div class='ui-block-a'><a href='#' data-role='button' data-mini='true' data-corners='true' data-icon='plus' data-iconpos='bottom'></a></div><div class='ui-block-b'><a href='#' data-role='button' data-mini='true' data-corners='true' data-icon='plus' data-iconpos='bottom'></a></div><div class='ui-block-c'><a href='#' data-role='button' data-mini='true' data-corners='true' data-icon='plus' data-iconpos='bottom'></a></div><div class='ui-block-d'><a href='#' data-role='button' data-mini='true' data-corners='true' data-icon='plus' data-iconpos='bottom'></a></div></fieldset><div class='ui-grid-c inputs'><div class='ui-block-a'><input data-wrapper-class='pad_buttons' class='ip_addr' type='number' pattern='[0-9]*' max='255' value='" +
                    i.ip[0] +
                    "'></div><div class='ui-block-b'><input data-wrapper-class='pad_buttons' class='ip_addr' type='number' pattern='[0-9]*' max='255' value='" +
                    i.ip[1] +
                    "'></div><div class='ui-block-c'><input data-wrapper-class='pad_buttons' class='ip_addr' type='number' pattern='[0-9]*' max='255' value='" +
                    i.ip[2] +
                    "'></div><div class='ui-block-d'><input data-wrapper-class='pad_buttons' class='ip_addr' type='number' pattern='[0-9]*' max='255' value='" +
                    i.ip[3] +
                    "'></div></div><fieldset class='ui-grid-c decr'><div class='ui-block-a'><a href='#' data-role='button' data-mini='true' data-corners='true' data-icon='minus' data-iconpos='bottom'></a></div><div class='ui-block-b'><a href='#' data-role='button' data-mini='true' data-corners='true' data-icon='minus' data-iconpos='bottom'></a></div><div class='ui-block-c'><a href='#' data-role='button' data-mini='true' data-corners='true' data-icon='minus' data-iconpos='bottom'></a></div><div class='ui-block-d'><a href='#' data-role='button' data-mini='true' data-corners='true' data-icon='minus' data-iconpos='bottom'></a></div></fieldset></span>" +
                    (i.showBack ? "<button class='submit' data-theme='b'>" + _("Submit") + "</button>" : "") +
                    "</div></div>"
            ));
    a.find("button.submit").on("click", function () {
        i.callback(o()), a.popup("destroy").remove();
    }),
        a
            .on("focus", "input[type='number']", function () {
                this.value = "";
            })
            .on("blur", "input[type='number']", function () {
                "" === this.value && (this.value = "0");
            }),
        holdButton(a.find(".incr").children(), function (e) {
            e = $(e.currentTarget).index();
            return t(e, 1), !1;
        }),
        holdButton(a.find(".decr").children(), function (e) {
            e = $(e.currentTarget).index();
            return t(e, -1), !1;
        }),
        a.css("max-width", "350px").one("popupafterclose", function () {
            i.callback(o());
        }),
        openPopup(a);
}
function showDurationBox(a) {
    var e = { seconds: 0, title: _("Duration"), granularity: 0, preventCompression: !1, incrementalUpdate: !0, showBack: !0, showSun: !1, minimum: 0, callback: function () {} },
        t = 0,
        n =
            ((a = $.extend({}, e, a)),
            $("#durationBox").popup("destroy").remove(),
            (a.seconds = parseInt(a.seconds)),
            65535 === a.seconds ? ((t = 1), (a.seconds = 0)) : 65534 === a.seconds && ((t = 2), (a.seconds = 0)),
            checkOSVersion(217) && (a.preventCompression = !0),
            ["days", "hours", "minutes", "seconds"]),
        i = [_("Days"), _("Hours"), _("Minutes"), _("Seconds")],
        s = [86400, 3600, 60, 1],
        r = [0, 23, 59, 59],
        o = 4 - a.granularity,
        l = 0,
        c = sec2dhms(a.seconds);
    if ((!a.preventCompression && checkOSVersion(210) && 64800 < a.maximum && (a.maximum = checkOSVersion(214) ? 57600 : 64800), a.maximum))
        for (v = s.length - 1; 0 <= v; v--)
            if (a.maximum < s[v]) {
                (l = v + 1), (o = s.length - l - a.granularity);
                break;
            }
    function d(e, t) {
        var n = g.find(".inputs input").eq(e),
            i = e + l,
            o = parseInt(n.val());
        n.prop("disabled") ||
            (-1 === t && (u() <= a.minimum || o <= 0)) ||
            (1 === t && u() + s[i] > a.maximum) ||
            (0 !== r[i] && 0 !== e && Math.abs(o) >= r[i] && (n.val(0), (n = g.find(".inputs input").eq(e - 1)), (o = parseInt(n.val()))),
            n.val(o + t),
            a.incrementalUpdate && a.callback(u()),
            !a.preventCompression &&
                checkOSVersion(210) &&
                ((i = 1 === t)
                    ? (60 <= u() && p("seconds", i), 10800 <= u() && p("minutes", i))
                    : -1 === t && (u() <= -60 ? p("seconds", !i) : u() <= -10800 ? p("minutes", !i) : u() < 60 ? p("seconds", i) : u() < 10800 && p("minutes", i))));
    }
    function u() {
        var e = g.find(".useSun").find("button.ui-btn-active");
        return 1 === e.length
            ? parseInt(e.val())
            : dhms2sec({ days: parseInt(g.find(".days").val()) || 0, hours: parseInt(g.find(".hours").val()) || 0, minutes: parseInt(g.find(".minutes").val()) || 0, seconds: parseInt(g.find(".seconds").val()) || 0 });
    }
    function p(e, t) {
        g.find("." + e)
            .toggleClass("ui-state-disabled", t)
            .prop("disabled", t)
            .val(function () {
                return t ? 0 : this.value;
            })
            .parent(".ui-input-text")
            .toggleClass("ui-state-disabled", t);
    }
    for (
        var h = "<fieldset class='ui-grid-" + String.fromCharCode(95 + o) + " incr'>",
            f = "<div class='ui-grid-" + String.fromCharCode(95 + o) + " inputs'>",
            m = "<fieldset class='ui-grid-" + String.fromCharCode(95 + o) + " decr'>",
            g = $(
                "<div data-role='popup' id='durationBox' data-theme='a'><div data-role='header' data-theme='b'><h1>" +
                    a.title +
                    "</h1></div><div class='ui-content'>" +
                    (a.helptext ? "<p class='rain-desc center smaller'>" + a.helptext + "</p>" : "") +
                    "<span></span>" +
                    (a.showSun
                        ? "<div class='ui-grid-a useSun'><div class='ui-block-a'><button value='65534' class='ui-mini ui-btn rise " +
                          (2 === t ? "ui-btn-active" : "") +
                          "'>" +
                          _("Sunrise to Sunset") +
                          "</button></div><div class='ui-block-b'><button value='65535' class='ui-mini ui-btn set " +
                          (1 === t ? "ui-btn-active" : "") +
                          "'>" +
                          _("Sunset to Sunrise") +
                          "</button></div></div>"
                        : "") +
                    (a.showBack ? "<button class='submit' data-theme='b'>" + _("Submit") + "</button>" : "") +
                    "</div></div>"
            ),
            v = l;
        v < s.length - a.granularity;
        v++
    )
        (h += "<div " + (1 < o ? "class='ui-block-" + String.fromCharCode(97 + v - l) + "'" : "") + "><a href='#' data-role='button' data-mini='true' data-corners='true' data-icon='plus' data-iconpos='bottom'></a></div>"),
            (f +=
                "<div " +
                (1 < o ? "class='ui-block-" + String.fromCharCode(97 + v - l) + "'" : "") +
                "><label class='center'>" +
                _(i[v]) +
                "</label><input data-wrapper-class='pad_buttons' class='" +
                n[v] +
                "' type='number' pattern='[0-9]*' value='" +
                c[n[v]] +
                "'></div>"),
            (m += "<div " + (1 < o ? "class='ui-block-" + String.fromCharCode(97 + v - l) + "'" : "") + "><a href='#' data-role='button' data-mini='true' data-corners='true' data-icon='minus' data-iconpos='bottom'></a></div>");
    (h += "</fieldset>"),
        (f += "</div>"),
        (m += "</fieldset>"),
        g.find("span").prepend(h + f + m),
        g.find("button.submit").on("click", function () {
            a.callback(u()), g.popup("destroy").remove();
        }),
        !a.preventCompression && checkOSVersion(210) && (a.seconds <= -60 && p("seconds", !0), a.seconds <= -10800 && p("minutes", !0), 60 <= a.seconds && p("seconds", !0), 10800 <= a.seconds) && p("minutes", !0),
        g
            .on("focus", "input[type='number']", function () {
                this.value = "";
            })
            .on("blur", "input[type='number']", function () {
                "" === this.value && (this.value = "0");
            }),
        holdButton(g.find(".incr").children(), function (e) {
            e = $(e.currentTarget).index();
            return d(e, 1), !1;
        }),
        holdButton(g.find(".decr").children(), function (e) {
            e = $(e.currentTarget).index();
            return d(e, -1), !1;
        }),
        a.showSun &&
            g.find(".useSun").on("click", "button", function () {
                var e = $(this),
                    t = g.find(".useSun").find("button").not(e),
                    n = g.find("span").find(".ui-btn,input");
                t.removeClass("ui-btn-active"),
                    e.hasClass("ui-btn-active") ? (e.removeClass("ui-btn-active"), n.prop("disabled", !1).removeClass("ui-disabled")) : (e.addClass("ui-btn-active"), n.prop("disabled", !0).addClass("ui-disabled")),
                    a.incrementalUpdate && a.callback(u());
            }),
        g
            .css("max-width", "350px")
            .one("popupafteropen", function () {
                0 !== t && g.find("span").find(".ui-btn,input").prop("disabled", !0).addClass("ui-disabled");
            })
            .one("popupafterclose", function () {
                a.incrementalUpdate && a.callback(u());
            }),
        openPopup(g);
}
function showSingleDurationInput(n) {
    $("#singleDuration").popup("destroy").remove();
    function i(e) {
        n.callback(parseInt(e).clamp(n.minimum, n.maximum));
    }
    function e(e) {
        var t = parseInt(a.val());
        (-1 === e && t === n.minimum) || (1 === e && t === n.maximum) || (a.val(t + e), n.updateOnChange && i(t + e));
    }
    var t = { data: 0, title: _("Duration"), minimum: 0, label: "", updateOnChange: !0, showBack: !0, callback: function () {} },
        o =
            ((n = $.extend({}, t, n)),
            $(
                "<div data-role='popup' id='singleDuration' data-theme='a'><div data-role='header' data-theme='b'><h1>" +
                    n.title +
                    "</h1></div><div class='ui-content'>" +
                    (n.helptext ? "<p class='rain-desc center smaller'>" + n.helptext + "</p>" : "") +
                    "<label class='center'>" +
                    n.label +
                    "</label><div class='input_with_buttons'><button class='decr ui-btn ui-btn-icon-notext ui-icon-carat-l btn-no-border'></button><input type='number' pattern='[0-9]*' value='" +
                    n.data +
                    "'><button class='incr ui-btn ui-btn-icon-notext ui-icon-carat-r btn-no-border'></button></div>" +
                    (n.updateOnChange && !n.showBack ? "" : "<input type='submit' data-theme='b' value='" + _("Submit") + "'>") +
                    "</div></div>"
            )),
        a = o.find("input");
    holdButton(o.find(".incr"), function () {
        return e(1), !1;
    }),
        holdButton(o.find(".decr"), function () {
            return e(-1), !1;
        }),
        o
            .find("input[type='number']")
            .on("focus", function () {
                this.value = "";
            })
            .on("blur", function () {
                "" === this.value && (this.value = "0");
            }),
        o.find("input[type='submit']").on("click", function () {
            i(a.val()), o.popup("destroy").remove();
        }),
        o.one("popupafterclose", function () {
            n.updateOnChange && i(a.val());
        }),
        openPopup(o);
}
function showDateTimeInput(a, n) {
    $("#datetimeInput").popup("destroy").remove(), a instanceof Date || (a = new Date(1e3 * a)).setMinutes(a.getMinutes() - a.getTimezoneOffset()), (n = n || function () {});
    function s(e, t) {
        a["setUTC" + e](a["getUTC" + e]() + t), n(new Date(a.getTime())), i();
    }
    var r = ["Month", "Date", "FullYear", "Hours", "Minutes"],
        l = [_("Jan"), _("Feb"), _("Mar"), _("Apr"), _("May"), _("Jun"), _("Jul"), _("Aug"), _("Sep"), _("Oct"), _("Nov"), _("Dec")],
        c = $("<div data-role='popup' id='datetimeInput' data-theme='a'><div data-role='header' data-theme='b'><h1>" + _("Enter Date/Time") + "</h1></div><div class='ui-content'></div></div>"),
        i = function () {
            for (var e, t = "<fieldset class='ui-grid-d incr'>", n = "<div class='ui-grid-d inputs'>", i = "<fieldset class='ui-grid-d decr'>", o = 0; o < 5; o++)
                (e = a["getUTC" + r[o]]()),
                    (e =
                        "Month" === r[o]
                            ? "<p class='center'>" + l[e] + "</p>"
                            : "Date" === r[o]
                            ? "<p class='center'>" + e + ",</p>"
                            : "Hours" === r[o]
                            ? "<p style='width:90%;display:inline-block' class='center'>" + e + "</p><p style='display:inline-block'>:</p>"
                            : "<p class='center'>" + e + "</p>"),
                    (t += "<div class='ui-block-" + String.fromCharCode(97 + o) + "'><a href='#' data-role='button' data-mini='true' data-corners='true' data-icon='plus' data-iconpos='bottom'></a></div>"),
                    (n += "<div id='" + r[o] + "' class='ui-block-" + String.fromCharCode(97 + o) + "'>" + e + "</div>"),
                    (i += "<div class='ui-block-" + String.fromCharCode(97 + o) + "'><a href='#' data-role='button' data-mini='true' data-corners='true' data-icon='minus' data-iconpos='bottom'></a></div>");
            (t += "</fieldset>"),
                (n += "</div>"),
                (i += "</fieldset>"),
                c
                    .find(".ui-content")
                    .html("<span>" + t + n + i + "</span>")
                    .enhanceWithin(),
                c
                    .find(".incr")
                    .children()
                    .on("vclick", function () {
                        var e = $(this).index();
                        return s(c.find(".inputs").children().eq(e).attr("id"), 1), !1;
                    }),
                c
                    .find(".decr")
                    .children()
                    .on("vclick", function () {
                        var e = $(this).index();
                        return s(c.find(".inputs").children().eq(e).attr("id"), -1), !1;
                    });
        };
    i(),
        c.css("width", "280px").one("popupafterclose", function () {
            n(a);
        }),
        openPopup(c);
}
function showTimeInput(l) {
    function c() {
        return _(u ? "PM" : "AM");
    }
    function n(e, t) {
        if (0 === e || 1 === e) {
            var n,
                i,
                o = d() + t * (0 === e ? 60 : 1),
                a = p.find(".inputs input").eq(e),
                s = a.hasClass("hour"),
                r = parseInt(a.val());
            if (1 === t) s && ((isMetric && 24 <= r) || (!isMetric && 12 <= r)) && (r = 0), !s && 59 <= r && ((r = -1), (n = p.find(".hour")), (i = parseInt(n.val())), isMetric || n.val((i = 12 === i ? 0 : i) + 1));
            else if (s && r <= 1) r = 13;
            else if (!s && r <= 0) return;
            ((!u && 719 < o) || (u && o < 721) || (u && 1439 < o) || (!u && -1 === t && o < 0)) && ((u = !u), p.find(".period").text(c())), (r = s ? r + t : pad(r + t)), a.val(r);
        } else 2 === e && ((u = !u), p.find(".period").text(c()));
        l.incrementalUpdate && l.callback(d());
    }
    function d() {
        var e,
            t,
            n = p.find(".useSun").find("button.ui-btn-active");
        return 1 === n.length
            ? ((e = 0), (t = parseInt(p.find(".offsetInput input").val())), n.hasClass("rise") ? (0 <= t ? (e = t) : ((e = -t), (e |= 4096)), (e |= 16384)) : (0 <= t ? (e = t) : ((e = -t), (e |= 4096)), (e |= 8192)), e)
            : ((n = parseInt(p.find(".hour").val())), 60 * (n = isMetric || (u && 12 !== n && (n += 12), u) || 12 !== n ? n : 0) + parseInt(p.find(".minute").val()));
    }
    var i,
        e,
        t = { minutes: 0, title: _("Time"), incrementalUpdate: !0, showBack: !0, showSun: !1, callback: function () {} },
        t = ((l = $.extend({}, t, l)), $("#timeInput").popup("destroy").remove(), 2047 & l.minutes),
        o = 0,
        u = ((l.minutes >> 12) & 1 && (t = -t), (l.minutes >> 14) & 1 ? (o = 1) : (l.minutes >> 13) & 1 && (o = 2), 719 < l.minutes),
        p = $(
            "<div data-role='popup' id='timeInput' data-theme='a'><div data-role='header' data-theme='b'><h1>" +
                l.title +
                "</h1></div><div class='ui-content'>" +
                (l.helptext ? "<p class='pad-top rain-desc center smaller'>" + l.helptext + "</p>" : "") +
                "<span><fieldset class='ui-grid-" +
                (isMetric ? "a" : "b") +
                " incr'><div class='ui-block-a'><a href='#' data-role='button' data-mini='true' data-corners='true' data-icon='plus' data-iconpos='bottom'></a></div><div class='ui-block-b'><a href='#' data-role='button' data-mini='true' data-corners='true' data-icon='plus' data-iconpos='bottom'></a></div>" +
                (isMetric ? "" : "<div class='ui-block-c'><a href='#' data-role='button' data-mini='true' data-corners='true' data-icon='plus' data-iconpos='bottom'></a></div>") +
                "</fieldset><div class='ui-grid-" +
                (isMetric ? "a" : "b") +
                " inputs'><div class='ui-block-a'><input data-wrapper-class='pad_buttons' class='hour dontPad' type='number' pattern='[0-9]*' value='" +
                (isMetric ? pad(((l.minutes / 60) >> 0) % 24) + "'>" : (parseInt(l.minutes / 60) % 12 == 0 ? 12 : parseInt(l.minutes / 60) % 12) + "'>") +
                "</div><div class='ui-block-b'><input data-wrapper-class='pad_buttons' class='minute' type='number' pattern='[0-9]*' value='" +
                pad(l.minutes % 60) +
                "'></div>" +
                (isMetric ? "" : "<div class='ui-block-c'><p class='center period'>" + c() + "</p></div>") +
                "</div><fieldset class='ui-grid-" +
                (isMetric ? "a" : "b") +
                " decr'><div class='ui-block-a'><a href='#' data-role='button' data-mini='true' data-corners='true' data-icon='minus' data-iconpos='bottom'></a></div><div class='ui-block-b'><a href='#' data-role='button' data-mini='true' data-corners='true' data-icon='minus' data-iconpos='bottom'></a></div>" +
                (isMetric ? "" : "<div class='ui-block-c'><a href='#' data-role='button' data-mini='true' data-corners='true' data-icon='minus' data-iconpos='bottom'></a></div>") +
                "</fieldset></span>" +
                (l.showSun
                    ? "<div class='ui-grid-a useSun'><div class='ui-block-a'><button class='ui-mini ui-btn rise " +
                      (1 === o ? "ui-btn-active" : "") +
                      "'>" +
                      _("Use Sunrise") +
                      "</button></div><div class='ui-block-b'><button class='ui-mini ui-btn set " +
                      (2 === o ? "ui-btn-active" : "") +
                      "'>" +
                      _("Use Sunset") +
                      "</button></div></div><div class='offsetInput'" +
                      (0 === o ? " style='display: none;'" : "") +
                      "><h5 class='center tight'>" +
                      _("Offset (minutes)") +
                      "</h5><div class='input_with_buttons'><button class='decr ui-btn ui-btn-icon-notext ui-icon-carat-l btn-no-border'></button><input class='dontPad' type='number' pattern='[0-9]*' value='" +
                      t +
                      "'><button class='incr ui-btn ui-btn-icon-notext ui-icon-carat-r btn-no-border'></button></div></div>"
                    : "") +
                (l.showBack ? "<button class='submit' data-theme='b'>" + _("Submit") + "</button>" : "") +
                "</div></div>"
        );
    p.find("button.submit").on("click", function () {
        l.callback(d()), p.popup("destroy").remove();
    }),
        p
            .on("focus", "input[type='number']", function (e) {
                e.target.value = "";
            })
            .on("blur", "input[type='number']", function (e) {
                var t = parseInt(e.target.value) || 0;
                e.target.value = $(e.target).hasClass("dontPad") ? t : pad(t);
            }),
        holdButton(p.find(".incr").children(), function (e) {
            var e = $(e.currentTarget),
                t = e.index();
            return 0 === e.find(".ui-disabled").length && n(t, 1), !1;
        }),
        holdButton(p.find(".decr").children(), function (e) {
            var e = $(e.currentTarget),
                t = e.index();
            return 0 === e.find(".ui-disabled").length && n(t, -1), !1;
        }),
        l.showSun &&
            (p.find(".useSun").on("click", "button", function () {
                var e = $(this),
                    t = p.find(".useSun").find("button").not(e),
                    n = p.find(".offsetInput"),
                    i = p.find("span").find(".ui-btn,input,p");
                t.removeClass("ui-btn-active"),
                    e.hasClass("ui-btn-active")
                        ? (e.removeClass("ui-btn-active"), n.slideUp(), i.prop("disabled", !1).removeClass("ui-disabled"))
                        : (e.addClass("ui-btn-active"), n.slideDown(), i.prop("disabled", !0).addClass("ui-disabled")),
                    l.incrementalUpdate && l.callback(d());
            }),
            (i = p.find(".offsetInput").find("input")),
            (e = function (e) {
                var t = parseInt(i.val());
                (-1 === e && -240 === t) || (1 === e && 240 === t) || (i.val(t + e), l.incrementalUpdate && l.callback(d()));
            }),
            i
                .on("focus", function () {
                    this.value = "";
                })
                .on("blur", function () {
                    "" === this.value ? (this.value = "0") : 240 < this.value ? (this.value = "240") : this.value < -240 && (this.value = "-240");
                }),
            holdButton(p.find(".offsetInput").find(".incr"), function () {
                return e(1), !1;
            }),
            holdButton(p.find(".offsetInput").find(".decr"), function () {
                return e(-1), !1;
            })),
        p
            .css("max-width", "350px")
            .one("popupafteropen", function () {
                0 !== o && p.find("span").find(".ui-btn,input,p").prop("disabled", !0).addClass("ui-disabled");
            })
            .one("popupafterclose", function () {
                l.incrementalUpdate && l.callback(d());
            }),
        openPopup(p);
}
function showHelpText(e) {
    e.stopImmediatePropagation();
    var e = $(this),
        t = e.data("helptext");
    return openPopup($("<div data-role='popup' data-theme='a'><p>" + t + "</p></div>"), { positionTo: e }), !1;
}
function changePage(e, t) {
    (t = t || {}),
        0 !== e.indexOf("#") && (e = "#" + e),
        closePanel(function () {
            $.mobile.pageContainer.pagecontainer("change", e, t);
        });
}
function openPopup(t, e) {
    (e = $.extend({}, { history: !1, positionTo: "window", overlayTheme: "b" }, e)),
        $.mobile.pageContainer.append(t),
        t
            .one("popupafterclose", function () {
                var e = $("#shift-sta").is(":checked");
                void 0 !== e && (popupData.shift = e), t.popup("destroy").remove();
            })
            .popup(e)
            .enhanceWithin(),
        t.popup("open");
}
function closePanel(e) {
    var t = $(".ui-panel-open");
    0 < t.length
        ? (t.one("panelclose", function () {
              e();
          }),
          t.panel("close"))
        : e();
}
function changeHeader(e) {
    var t = $("#header"),
        n =
            ("" === (e = $.extend(!0, {}, { title: "", class: "", animate: !0, leftBtn: { icon: "", class: "", text: "", on: function () {} }, rightBtn: { icon: "", class: "", text: "", on: function () {} } }, e)).title &&
                "" === e.class &&
                (e.class = "logo"),
            $(
                "<button data-icon='" +
                    e.leftBtn.icon +
                    "' " +
                    ("" === e.leftBtn.text ? "data-iconpos='notext' " : "") +
                    "class='ui-btn-left " +
                    e.leftBtn.class +
                    "'>" +
                    e.leftBtn.text +
                    "</button><h3 class='" +
                    e.class +
                    "'>" +
                    e.title +
                    "</h3><button data-icon='" +
                    e.rightBtn.icon +
                    "' " +
                    ("" === e.rightBtn.text ? "data-iconpos='notext' " : "") +
                    "class='ui-btn-right " +
                    e.rightBtn.class +
                    "'>" +
                    e.rightBtn.text +
                    "</button>"
            )),
        i = e.animate ? "fast" : 0;
    return (
        t
            .children()
            .stop()
            .fadeOut(i, function () {
                t.html(n).toolbar(t.hasClass("ui-header") ? "refresh" : null), t.find(".ui-btn-left").on("click", e.leftBtn.on), t.find(".ui-btn-right").on("click", e.rightBtn.on);
            })
            .fadeIn(i),
        n
    );
}
function getPageTop() {
    var e = $.mobile.window;
    return { x: (e[0].innerWidth || e.width()) / 2 + e.scrollLeft(), y: e.scrollTop() + 22.5 };
}
function showLoading(e) {
    (e = "string" == typeof e ? $(e) : e).off("click").html("<p class='ui-icon ui-icon-loading mini-load'></p>");
    e = e.filter("#footer-running");
    1 === e.length && e.find(".mini-load").addClass("bottom");
}
function getPicture(o) {
    var a = $("<input style='display: none' type='file' accept='image/*' />")
        .insertAfter("body")
        .on("change", function (e) {
            var t = new FileReader();
            (t.onload = function (e) {
                var i = new Image();
                (i.onload = function () {
                    var e = document.createElement("canvas"),
                        t = i.width,
                        n = i.height,
                        t =
                            (n < t ? 200 < t && ((n *= 200 / t), (t = 200)) : 200 < n && ((t *= 200 / n), (n = 200)),
                            (e.width = t),
                            (e.height = n),
                            e.getContext("2d").drawImage(i, 0, 0, t, n),
                            e.toDataURL("image/jpeg", 0.5).replace("data:image/jpeg;base64,", ""));
                    a.remove(), o(t);
                }),
                    (i.src = e.target.result);
            }),
                t.readAsDataURL(e.target.files[0]);
        });
    a.get(0).click();
}
function goHome(e) {
    "sprinklers" !== $(".ui-page-active").attr("id") &&
        ($.mobile.document.one("pageshow", function () {
            delete $.mobile.navigate.history.getActive().transition;
        }),
        changePage("#sprinklers", !0 === e ? { firstLoad: !0, showLoading: !1, transition: "none" } : { reverse: !0 }));
}
function goBack() {
    var e = $(".ui-page-active");
    if (1 === e.length) {
        var t = "site-control" === (e = e.attr("id")) && !isControllerConnected(),
            n = $(".ui-popup-active");
        if (n.length) n.find("[data-role='popup']").popup("close");
        else if ("sprinklers" === e || "start" === e || t)
            try {
                navigator.app.exitApp();
            } catch (e) {}
        else 0 < pageHistoryCount && pageHistoryCount--, 0 === pageHistoryCount ? navigator.app.exitApp() : ((goingBack = !0), $.mobile.back());
    }
}
function checkChangesBeforeBack() {
    checkChanges(goBack);
}
function checkChanges(e) {
    var t = $(".ui-page-active").find(".hasChanges");
    if (((e = e || function () {}), 0 !== t.length))
        return (
            areYouSure(
                _("Do you want to save your changes?"),
                "",
                function () {
                    t.click(), t.hasClass("preventBack") || e();
                },
                e
            ),
            !1
        );
    e();
}
function showerror(e, t) {
    (t = t || 2500),
        clearTimeout(errorTimeout),
        $.mobile.loading("show", { text: e, textVisible: !0, textonly: !0, theme: "b" }),
        (errorTimeout = setTimeout(function () {
            $.mobile.loading("hide");
        }, t));
}
function loadLocalSettings() {
    storage.get("isMetric", function (e) {
        switch (e.isMetric) {
            case "true":
                isMetric = !0;
                break;
            case "false":
                isMetric = !1;
        }
    }),
        storage.get("groupView", function (e) {
            switch (e.groupView) {
                case "true":
                    groupView = !0;
                    break;
                case "false":
                    groupView = !1;
            }
        });
}
function fixInputClick(e) {
    FastClick.notNeeded(document.body) ||
        (e.find("input[type='checkbox']:not([data-role='flipswitch']),.ui-select > .ui-btn").addClass("needsclick"),
        e.find(".ui-collapsible-heading-toggle").on("click", function () {
            var e = $(this);
            setTimeout(function () {
                e.removeClass("ui-btn-active");
            }, 100);
        }));
}
function holdButton(e, t) {
    var n;
    e.on(isTouchCapable ? "tap" : "click", t)
        .on("taphold", function (e) {
            n = setInterval(function () {
                t(e);
            }, 100);
        })
        .on("vmouseup vmouseout vmousecancel touchend", function () {
            clearInterval(n);
        })
        .on("touchmove", function (e) {
            e.preventDefault();
        });
}
function insertStyle(e) {
    var t = document.createElement("style");
    (t.innerHTML = e), document.head.appendChild(t);
}
function parseIntArray(e) {
    for (var t = 0; t < e.length; t++) e[t] = +e[t];
    return e;
}
function getDurationText(e) {
    return 65535 === e ? _("Sunset to Sunrise") : 65534 === e ? _("Sunrise to Sunset") : dhms2str(sec2dhms(e));
}
function sec2hms(e) {
    var t = "",
        n = Math.max(0, parseInt(e / 3600) % 24),
        i = Math.max(0, parseInt(e / 60) % 60),
        e = e % 60;
    return n && (t += pad(n) + ":"), t + pad(i) + ":" + pad(e);
}
function sec2dhms(e) {
    var t = e < 0 ? -1 : 1;
    return (
        (e = Math.abs(e)),
        { days: Math.max(0, parseInt(e / 86400)) * t, hours: Math.max(0, parseInt((e % 86400) / 3600)) * t, minutes: Math.max(0, parseInt(((e % 86400) % 3600) / 60)) * t, seconds: Math.max(0, parseInt(((e % 86400) % 3600) % 60)) * t }
    );
}
function dhms2str(e) {
    var t = "";
    return e.days && (t += e.days + _("d") + " "), e.hours && (t += e.hours + _("h") + " "), e.minutes && (t += e.minutes + _("m") + " "), e.seconds && (t += e.seconds + _("s") + " "), (t = "" === t ? "0" + _("s") : t).trim();
}
function dhms2sec(e) {
    return parseInt(86400 * e.days + 3600 * e.hours + 60 * e.minutes + e.seconds);
}
function isControllerConnected() {
    return !(
        (!currIp && !currToken) ||
        $.isEmptyObject(controller) ||
        $.isEmptyObject(controller.options) ||
        $.isEmptyObject(controller.programs) ||
        $.isEmptyObject(controller.settings) ||
        $.isEmptyObject(controller.status) ||
        $.isEmptyObject(controller.stations)
    );
}
function exportObj(e, t, n) {
    var i;
    (t = encodeURIComponent(JSON.stringify(t))),
        isFileCapable
            ? $(e).attr({ href: "data:text/json;charset=utf-8," + t, download: "backup-" + new Date().toLocaleDateString().replace(/\//g, "-") + ".json" })
            : ((n = n || "OpenSprinkler Data Export on " + dateToString(new Date())),
              (i = "mailto:?subject=" + encodeURIComponent(n) + "&body=" + t),
              $(e)
                  .attr("href", i)
                  .on("click", function () {
                      window.open(i);
                  }));
}
function sortObj(n, e) {
    var t,
        i = [];
    for (t in n) n.hasOwnProperty(t) && i.push(t);
    "function" == typeof e
        ? i.sort(e)
        : "value" === e
        ? i.sort(function (e, t) {
              (e = n[e]), (t = n[t]);
              return e < t ? -1 : t < e ? 1 : 0;
          })
        : i.sort();
    for (var o = {}, a = 0; a < i.length; a++) o[i[a]] = n[i[a]];
    return o;
}
function getDayName(e, t) {
    var n = [_("Sunday"), _("Monday"), _("Tuesday"), _("Wednesday"), _("Thursday"), _("Friday"), _("Saturday")],
        i = [_("Sun"), _("Mon"), _("Tue"), _("Wed"), _("Thu"), _("Fri"), _("Sat")];
    return ("short" === t ? i : n)[e.getDay()];
}
function pad(e) {
    e = String(e);
    return (e = 1 === e.length ? "0" + e : e);
}
function htmlEscape(e) {
    return String(e).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function _(e) {
    return ("object" == typeof language && language.hasOwnProperty(e) && language[e]) || e;
}
function setLang() {
    $("[data-translate]").text(function () {
        var e = $(this),
            t = e.data("translate");
        if (!e.is("input[type='submit']")) return _(t);
        e.val(_(t)), 0 < e.parent("div.ui-btn").length && e.button("refresh");
    }),
        $(".ui-toolbar-back-btn").text(_("Back")),
        checkCurrLang();
}
function updateLang(e) {
    (language = {}),
        void 0 === e
            ? storage.get("lang", function (e) {
                  updateLang((e.lang || navigator.language || navigator.browserLanguage || navigator.systemLanguage || navigator.userLanguage || "en").substring(0, 2));
              })
            : (storage.set({ lang: e }),
              "en" === (currLang = e)
                  ? setLang()
                  : $.getJSON(getAppURLPath() + "locale/" + e + ".js", function (e) {
                        (language = e.messages), setLang();
                    }).fail(setLang));
}
function languageSelect() {
    $("#localization").popup("destroy").remove();
    var n =
        "<div data-role='popup' data-theme='a' id='localization' data-corners='false'><ul data-inset='true' data-role='listview' id='lang' data-corners='false'><li data-role='list-divider' data-theme='b' class='center' data-translate='Localization'>" +
        _("Localization") +
        "</li>";
    return (
        $.each(
            {
                af: "Afrikaans",
                am: "Amharic",
                bg: "Bulgarian",
                zh: "Chinese",
                hr: "Croatian",
                cs: "Czech",
                nl: "Dutch",
                en: "English",
                et: "Estonian",
                pes: "Farsi",
                fr: "French",
                de: "German",
                el: "Greek",
                he: "Hebrew",
                hu: "Hungarian",
                is: "Icelandic",
                it: "Italian",
                lv: "Latvian",
                mn: "Mongolian",
                no: "Norwegian",
                pl: "Polish",
                pt: "Portuguese",
                ru: "Russian",
                sk: "Slovak",
                sl: "Slovenian",
                es: "Spanish",
                ta: "Tamil",
                th: "Thai",
                tr: "Turkish",
                sv: "Swedish",
                ro: "Romanian",
            },
            function (e, t) {
                n += "<li><a href='#' data-lang-code='" + e + "'><span data-translate='" + t + "'>" + _(t) + "</span> (" + e.toUpperCase() + ")</a></li>";
            }
        ),
        (n += "</ul></div>"),
        (n = $(n)).find("a").on("click", function () {
            updateLang($(this).data("lang-code"));
        }),
        openPopup(n),
        !1
    );
}
function checkCurrLang() {
    storage.get("lang", function (t) {
        var e = $("#localization");
        e.find("a").each(function () {
            var e = $(this);
            e.data("lang-code") === t.lang ? e.removeClass("ui-icon-carat-r").addClass("ui-icon-check") : e.removeClass("ui-icon-check").addClass("ui-icon-carat-r");
        }),
            e.find("li.ui-last-child").removeClass("ui-last-child");
    });
}
function getAppURLPath() {
    return currLocal ? $.mobile.path.parseUrl($("head").find("script[src$='app.js']").attr("src")).hrefNoHash.slice(0, -9) : "";
}
function getUrlVars(e) {
    for (var t, n = {}, i = e.slice(e.indexOf("?") + 1).split("&"), o = 0; o < i.length; o++) n[(t = i[o].split("="))[0]] = decodeURIComponent(t[1].replace(/\+/g, "%20"));
    return n;
}
function escapeJSON(e) {
    return JSON.stringify(e).replace(/\{|\}/g, "");
}
function unescapeJSON(e) {
    return JSON.parse("{" + e + "}");
}
function isMD5(e) {
    return /^[a-f0-9]{32}$/i.test(e);
}
function sortByStation(e, t) {
    return e.station < t.station ? -1 : e.station > t.station ? 1 : 0;
}
function minutesToTime(e) {
    var t = 719 < e ? "PM" : "AM",
        n = parseInt(e / 60) % 12;
    return 0 === n && (n = 12), isMetric ? pad(((e / 60) >> 0) % 24) + ":" + pad(e % 60) : n + ":" + pad(e % 60) + " " + t;
}
function getBitFromByte(e, t) {
    return 0 != (e & (1 << t));
}
function getTimezoneOffset() {
    var e = controller.options.tz - 48,
        t = 0 <= e ? 1 : -1;
    return (60 * ((Math.abs(e) / 4) >> 0) + ((((Math.abs(e) % 4) * 15) / 10) >> 0) + (((Math.abs(e) % 4) * 15) % 10)) * t;
}
function humaniseDuration(e, t) {
    var n,
        t = Math.floor((t - e) / 1e3),
        e = 0 < t;
    return (t = Math.abs(t)) < 10
        ? _("Just Now")
        : ((t = _(
              1 <= (n = Math.floor(t / 31536e3))
                  ? 1 < n
                      ? "years"
                      : "year"
                  : 1 <= (n = Math.floor(t / 2592e3))
                  ? 1 < n
                      ? "months"
                      : "month"
                  : 1 <= (n = Math.floor(t / 86400))
                  ? 1 < n
                      ? "days"
                      : "day"
                  : 1 <= (n = Math.floor(t / 3600))
                  ? 1 < n
                      ? "hours"
                      : "hour"
                  : 1 <= (n = Math.floor(t / 60))
                  ? 1 < n
                      ? "minutes"
                      : "minute"
                  : 1 < (n = t)
                  ? "seconds"
                  : "second"
          )),
          e ? _("In") + " " + n + " " + t : n + " " + t + " " + _("ago"));
}
function dateToString(e, t, n) {
    var i = [_("Sun"), _("Mon"), _("Tue"), _("Wed"), _("Thu"), _("Fri"), _("Sat")],
        o = [_("Jan"), _("Feb"), _("Mar"), _("Apr"), _("May"), _("Jun"), _("Jul"), _("Aug"), _("Sep"), _("Oct"), _("Nov"), _("Dec")];
    return 0 === e.getTime()
        ? "--"
        : (!1 !== t && e.setMinutes(e.getMinutes() + e.getTimezoneOffset()),
          "de" === currLang
              ? pad(e.getDate()) + "." + pad(e.getMonth() + 1) + "." + e.getFullYear() + " " + pad(e.getHours()) + ":" + pad(e.getMinutes()) + ":" + pad(e.getSeconds())
              : 1 === n
              ? o[e.getMonth()] + " " + pad(e.getDate()) + ", " + e.getFullYear() + " " + pad(e.getHours()) + ":" + pad(e.getMinutes()) + ":" + pad(e.getSeconds())
              : 2 === n
              ? o[e.getMonth()] + " " + pad(e.getDate()) + ", " + pad(e.getHours()) + ":" + pad(e.getMinutes()) + ":" + pad(e.getSeconds())
              : i[e.getDay()] + ", " + pad(e.getDate()) + " " + o[e.getMonth()] + " " + e.getFullYear() + " " + pad(e.getHours()) + ":" + pad(e.getMinutes()) + ":" + pad(e.getSeconds()));
}
function transformKeys(n) {
    var i;
    return checkOSVersion(219)
        ? ((i = {}),
          Object.keys(n).forEach(function (e) {
              var t = e.match(/^o(\d+)$/);
              t && t[1]
                  ? (i[
                        Object.keys(keyIndex).find(function (e) {
                            return keyIndex[e] === parseInt(t[1], 10);
                        })
                    ] = n[e])
                  : (i[e] = n[e]);
          }),
          i)
        : n;
}
function transformKeysinString(e) {
    var t = {},
        n =
            (e.split("&").forEach(function (e) {
                (e = e.split("=")), (t[e[0]] = e[1]);
            }),
            (t = transformKeys(t)),
            []);
    return (
        Object.keys(t).forEach(function (e) {
            n.push(e + "=" + t[e]);
        }),
        (e = n.join("&"))
    );
}
function Supported() {}
function Station() {}
($.fn.focusInput = function () {
    var e;
    return (
        this.get(0).setSelectionRange
            ? (this.focus(), this.get(0).setSelectionRange(0, this.val().length))
            : this.get(0).createTextRange && ((e = this.get(0).createTextRange()).collapse(!0), e.moveEnd("character", this.val().length), e.moveStart("character", 0), e.select()),
        this
    );
}),
    (Number.prototype.clamp = function (e, t) {
        return Math.min(Math.max(this, e), t);
    }),
    (Supported.master = function (e) {
        switch (e) {
            case MASTER_STATION_1:
                return !!controller.options.mas;
            case MASTER_STATION_2:
                return !!controller.options.mas2;
            default:
                return !1;
        }
    }),
    (Supported.ignoreRain = function () {
        return "object" == typeof controller.stations.ignore_rain;
    }),
    (Supported.ignoreSensor = function (e) {
        switch (e) {
            case IGNORE_SENSOR_1:
                return "object" == typeof controller.stations.ignore_sn1;
            case IGNORE_SENSOR_2:
                return "object" == typeof controller.stations.ignore_sn2;
            default:
                return !1;
        }
    }),
    (Supported.actRelay = function () {
        return "object" == typeof controller.stations.act_relay;
    }),
    (Supported.disabled = function () {
        return "object" == typeof controller.stations.stn_dis;
    }),
    (Supported.sequential = function () {
        return !checkOSVersion(220) && "object" == typeof controller.stations.stn_seq;
    }),
    (Supported.special = function () {
        return "object" == typeof controller.stations.stn_spe;
    }),
    (Supported.pausing = function () {
        return void 0 !== controller.settings.pq;
    }),
    (Supported.groups = function () {
        return 4 <= getNumberProgramStatusOptions();
    }),
    (Supported.dateRange = function () {
        return checkOSVersion(220);
    });
var ProgramStatusOptions = { PID: 0, REM: 1, START: 2, GID: 3 };
function getNumberProgramStatusOptions() {
    if (!(controller.settings.ps.length <= 0)) return controller.settings.ps[0].length;
}
function StationAttribute() {}
function CardList() {}
function Card() {}
function Groups() {}
function StationQueue() {}
function mapIndexToGIDValue(e) {
    return e - NUM_SEQ_GROUPS ? e : PARALLEL_GID_VALUE;
}
function mapGIDValueToName(e) {
    switch (e) {
        case PARALLEL_GID_VALUE:
            return PARALLEL_GROUP_NAME;
        case MASTER_GID_VALUE:
            return MASTER_GROUP_NAME;
        default:
            return String.fromCharCode(65 + e);
    }
}
function mapGIDNameToValue(e) {
    switch (e) {
        case PARALLEL_GROUP_NAME:
            return PARALLEL_GID_VALUE;
        case MASTER_GROUP_NAME:
            return MASTER_GID_VALUE;
        default:
            return e.charCodeAt(0) - 65;
    }
}
(Station.getName = function (e) {
    return controller.stations.snames[e];
}),
    (Station.setName = function (e, t) {
        controller.settings.snames[e] = t;
    }),
    (Station.getPID = function (e) {
        return controller.settings.ps[e][ProgramStatusOptions.PID];
    }),
    (Station.setPID = function (e, t) {
        controller.settings.ps[e][ProgramStatusOptions.PID] = t;
    }),
    (Station.getRemainingRuntime = function (e) {
        return controller.settings.ps[e][ProgramStatusOptions.REM];
    }),
    (Station.setRemainingRuntime = function (e, t) {
        controller.settings.ps[e][ProgramStatusOptions.REM] = t;
    }),
    (Station.getStartTime = function (e) {
        return controller.settings.ps[e][ProgramStatusOptions.START];
    }),
    (Station.setStartTime = function (e, t) {
        controller.settings.ps[e][ProgramStatusOptions.START] = t;
    }),
    (Station.getGIDValue = function (e) {
        if (Supported.groups()) return controller.settings.ps[e][ProgramStatusOptions.GID];
    }),
    (Station.setGIDValue = function (e, t) {
        Supported.groups() && (controller.settings.ps[e][ProgramStatusOptions.GID] = t);
    }),
    (Station.getStatus = function (e) {
        return controller.status[e];
    }),
    (Station.setStatus = function (e, t) {
        controller.status[e] = t;
    }),
    (Station.isRunning = function (e) {
        return 0 < Station.getStatus(e);
    }),
    (Station.isMaster = function (e) {
        var t = "number" == typeof controller.options.mas ? controller.options.mas : 0,
            n = "number" == typeof controller.options.mas2 ? controller.options.mas2 : 0;
        return t === ++e ? 1 : n === e ? 2 : 0;
    }),
    (Station.isSequential = function (e) {
        return 0 < StationAttribute.getSequential(e);
    }),
    (Station.isSpecial = function (e) {
        return 0 < StationAttribute.getSpecial(e);
    }),
    (Station.isDisabled = function (e) {
        return 0 < StationAttribute.getDisabled(e);
    }),
    (StationAttribute.getMasterOperation = function (e, t) {
        var n,
            i = (e / 8) >> 0;
        if (!Supported.master(t)) return 0;
        switch (t) {
            case MASTER_STATION_1:
                n = controller.stations.masop;
                break;
            case MASTER_STATION_2:
                n = controller.stations.masop2;
                break;
            default:
                return 0;
        }
        return n[i] & (1 << e % 8) ? 1 : 0;
    }),
    (StationAttribute.getIgnoreRain = function (e) {
        return Supported.ignoreRain() && controller.stations.ignore_rain[(e / 8) >> 0] & (1 << e % 8) ? 1 : 0;
    }),
    (StationAttribute.getIgnoreSensor = function (e, t) {
        var n,
            i = (e / 8) >> 0;
        if (!Supported.ignoreSensor(t)) return 0;
        switch (t) {
            case IGNORE_SENSOR_1:
                n = controller.stations.ignore_sn1;
                break;
            case IGNORE_SENSOR_2:
                n = controller.stations.ignore_sn2;
                break;
            default:
                return 0;
        }
        return n[i] & (1 << e % 8) ? 1 : 0;
    }),
    (StationAttribute.getActRelay = function (e) {
        return Supported.actRelay() && controller.stations.act_relay[(e / 8) >> 0] & (1 << e % 8) ? 1 : 0;
    }),
    (StationAttribute.getDisabled = function (e) {
        return Supported.disabled() && controller.stations.stn_dis[(e / 8) >> 0] & (1 << e % 8) ? 1 : 0;
    }),
    (StationAttribute.getSequential = function (e) {
        return Supported.groups() ? (Station.getGIDValue !== PARALLEL_GID_VALUE ? 1 : 0) : Supported.sequential() && controller.stations.stn_seq[(e / 8) >> 0] & (1 << e % 8) ? 1 : 0;
    }),
    (StationAttribute.getSpecial = function (e) {
        return Supported.special() && controller.stations.stn_spe[(e / 8) >> 0] & (1 << e % 8) ? 1 : 0;
    }),
    (CardList.getAllCards = function (e) {
        return e.filter(".card");
    }),
    (CardList.getCardBySID = function (e, t) {
        return e.filter("[data-station='" + t + "']");
    }),
    (CardList.getCardByIndex = function (e, t) {
        return $(e[t]);
    }),
    (Card.getSID = function (e) {
        return e.data("station");
    }),
    (Card.getDivider = function (e) {
        return e.find(".content-divider");
    }),
    (Card.getGroupLabel = function (e) {
        if (Supported.groups()) return e.find(".station-gid");
    }),
    (Card.setGroupLabel = function (e, t) {
        Supported.groups() && ((e = Card.getGroupLabel(e)).removeClass("hidden"), e.text(t));
    }),
    (Card.getGIDValue = function (e) {
        return Supported.groups() ? ((e = $(e.children()[0]).children().filter("span")), (e = $(e[e.length - 1])), parseInt(e.attr("data-gid"))) : 0;
    }),
    (Card.getGIDName = function (e) {
        return mapGIDValueToName(Station.getGIDValue(Card.getSID(e)));
    }),
    (Card.isMasterStation = function (e) {
        return Station.isMaster(Card.getSID(e));
    }),
    (Groups.numActiveStations = function (t) {
        var n = $(".station-status.on, .station-status.wait").parents(".card"),
            i = 0;
        return (
            $.each(n, function (e) {
                e = $(n[e]);
                Card.getGIDValue(e) !== t || Card.isMasterStation(e) || i++;
            }),
            i
        );
    }),
    (Groups.canShift = function (e) {
        return 1 < Groups.numActiveStations(e);
    }),
    (StationQueue.isActive = function () {
        for (var e = 0; e < controller.status.length; e++) if (0 < Station.getStatus(e) && 0 < Station.getPID(e)) return e;
        return -1;
    }),
    (StationQueue.isPaused = function () {
        return controller.settings.pq;
    }),
    (StationQueue.size = function () {
        return controller.settings.nq;
    });
var dateRegex = /[0-9]{1,2}[\/][0-9]{1,2}/g;
function Program() {}
function extractDateFromString(e) {
    return e.match(dateRegex);
}
function isValidDateFormat(e) {
    return null !== extractDateFromString(e);
}
function isValidDateRange(e, t) {
    return isValidDateFormat(e) && isValidDateFormat(t);
}
function encodeDate(e) {
    var e = extractDateFromString(e);
    return null === e ? -1 : ((e = e[0].split("/", 2)), (parseInt(e[0]) << 5) + parseInt(e[1]));
}
(Program.getDateRange = function (e) {
    return controller.programs.pd[e][6];
}),
    (Program.isDateRangeEnabled = function (e) {
        return "new" === e ? 0 : Program.getDateRange(e)[0];
    }),
    (Program.getDateRangeStart = function (e) {
        return "new" === e ? minEncodedDate : Program.getDateRange(e)[1];
    }),
    (Program.getDateRangeEnd = function (e) {
        return "new" === e ? maxEncodedDate : Program.getDateRange(e)[2];
    });
var minEncodedDate = encodeDate("01/01"),
    maxEncodedDate = encodeDate("12/31");
function decodeDate(e) {
    var t,
        n = [];
    return minEncodedDate <= e && e <= maxEncodedDate ? (n.push(((t = e >> 5) / 10) >> 0, t % 10, "/", ((t = e % 32) / 10) >> 0, t % 10), n.join("")) : e < minEncodedDate ? "01/01" : "12/31";
}
function q(e) {
    throw e;
}
!(function (p) {
    "use strict";
    var t = "__RETRY__" + new Date().getTime();
    p.ajaxPrefilter(function (s, e, i) {
        var r, l, c, d, u;
        s[t] ||
            void 0 === s.shouldRetry ||
            ((e[t] = !0),
            (l = p.Deferred()),
            (c = p.Deferred()),
            (d = {}),
            (u = 0),
            (function o(a, t, n) {
                (t
                    ? (function (e, t, n) {
                          var i,
                              o = s.shouldRetry;
                          switch (typeof o) {
                              case "number":
                                  i = t < o;
                                  break;
                              case "boolean":
                                  i = o;
                                  break;
                              case "function":
                                  i = o(e, t, n);
                          }
                          return "object" == typeof i && "function" == typeof i.then
                              ? p
                                    .Deferred(function (e) {
                                        i.then(e.resolve, function () {
                                            e.resolve(!1);
                                        });
                                    })
                                    .promise()
                              : p.when(i);
                      })(t, u++, a.type || "GET")
                    : p.when(!0)
                ).done(function (e) {
                    !0 === e
                        ? (t ? p.ajax(a) : i).then(
                              function (e, t, n) {
                                  (r = n.status), l.resolveWith(this, arguments), l.done(d[r]), c.resolveWith(this, [n, t]);
                              },
                              function (e, t) {
                                  var n = arguments,
                                      i = this;
                                  o(a, e, function () {
                                      (r = e.status), l.rejectWith(i, n), l.fail(d[r]), c.resolveWith(i, [e, t]);
                                  });
                              }
                          )
                        : n();
                });
            })(p.extend({}, e, { success: p.noop, error: p.noop, complete: p.noop, statusCode: {} })),
            i.complete && ((i.complete = c.done), (i.success = l.done), (i.error = l.fail)),
            p.extend(i, l.promise()),
            (i.statusCode = function (e) {
                var t, n;
                if (e)
                    if ((n = l).state ? "pending" !== n.state() : n.isResolved() || n.isRejected()) l.then(e[r], e[r]);
                    else for (t in e) d[t] = [d[t], e[t]];
                return this;
            }));
    });
})(jQuery),
    !(function () {
        "use strict";
        function s(o, e) {
            var t;
            if (
                ((e = e || {}),
                (this.trackingClick = !1),
                (this.trackingClickStart = 0),
                (this.targetElement = null),
                (this.touchStartX = 0),
                (this.touchStartY = 0),
                (this.lastTouchIdentifier = 0),
                (this.touchBoundary = e.touchBoundary || 10),
                (this.layer = o),
                (this.tapDelay = e.tapDelay || 200),
                (this.tapTimeout = e.tapTimeout || 700),
                !s.notNeeded(o))
            ) {
                for (var n = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"], i = 0, a = n.length; i < a; i++)
                    this[n[i]] = (function (e, t) {
                        return function () {
                            return e.apply(t, arguments);
                        };
                    })(this[n[i]], this);
                r && (o.addEventListener("mouseover", this.onMouse, !0), o.addEventListener("mousedown", this.onMouse, !0), o.addEventListener("mouseup", this.onMouse, !0)),
                    o.addEventListener("click", this.onClick, !0),
                    o.addEventListener("touchstart", this.onTouchStart, !1),
                    o.addEventListener("touchmove", this.onTouchMove, !1),
                    o.addEventListener("touchend", this.onTouchEnd, !1),
                    o.addEventListener("touchcancel", this.onTouchCancel, !1),
                    Event.prototype.stopImmediatePropagation ||
                        ((o.removeEventListener = function (e, t, n) {
                            var i = Node.prototype.removeEventListener;
                            "click" === e ? i.call(o, e, t.hijacked || t, n) : i.call(o, e, t, n);
                        }),
                        (o.addEventListener = function (e, t, n) {
                            var i = Node.prototype.addEventListener;
                            "click" === e
                                ? i.call(
                                      o,
                                      e,
                                      t.hijacked ||
                                          (t.hijacked = function (e) {
                                              e.propagationStopped || t(e);
                                          }),
                                      n
                                  )
                                : i.call(o, e, t, n);
                        })),
                    "function" == typeof o.onclick &&
                        ((t = o.onclick),
                        o.addEventListener(
                            "click",
                            function (e) {
                                t(e);
                            },
                            !1
                        ),
                        (o.onclick = null));
            }
        }
        var e = 0 <= navigator.userAgent.indexOf("Windows Phone"),
            r = 0 < navigator.userAgent.indexOf("Android") && !e,
            l = /iP(ad|hone|od)/.test(navigator.userAgent) && !e,
            c = l && /OS 4_\d(_\d)?/.test(navigator.userAgent),
            d = l && /OS [6-7]_\d/.test(navigator.userAgent),
            i = 0 < navigator.userAgent.indexOf("BB10");
        (s.prototype.needsClick = function (e) {
            switch (e.nodeName.toLowerCase()) {
                case "button":
                case "select":
                case "textarea":
                    if (e.disabled) return !0;
                    break;
                case "input":
                    if ((l && "file" === e.type) || e.disabled) return !0;
                    break;
                case "label":
                case "iframe":
                case "video":
                    return !0;
            }
            return /\bneedsclick\b/.test(e.className);
        }),
            (s.prototype.needsFocus = function (e) {
                switch (e.nodeName.toLowerCase()) {
                    case "textarea":
                        return !0;
                    case "select":
                        return !r;
                    case "input":
                        switch (e.type) {
                            case "button":
                            case "checkbox":
                            case "file":
                            case "image":
                            case "radio":
                            case "submit":
                                return !1;
                        }
                        return !e.disabled && !e.readOnly;
                    default:
                        return /\bneedsfocus\b/.test(e.className);
                }
            }),
            (s.prototype.sendClick = function (e, t) {
                var n;
                document.activeElement && document.activeElement !== e && document.activeElement.blur(),
                    (t = t.changedTouches[0]),
                    (n = document.createEvent("MouseEvents")).initMouseEvent(this.determineEventType(e), !0, !0, window, 1, t.screenX, t.screenY, t.clientX, t.clientY, !1, !1, !1, !1, 0, null),
                    (n.forwardedTouchEvent = !0),
                    e.dispatchEvent(n);
            }),
            (s.prototype.determineEventType = function (e) {
                return r && "select" === e.tagName.toLowerCase() ? "mousedown" : "click";
            }),
            (s.prototype.focus = function (e) {
                var t;
                l && e.setSelectionRange && 0 !== e.type.indexOf("date") && "time" !== e.type && "month" !== e.type && "email" !== e.type ? ((t = e.value.length), e.focus(), e.setSelectionRange(t, t)) : e.focus();
            }),
            (s.prototype.updateScrollParent = function (e) {
                var t, n;
                if (!(t = e.fastClickScrollParent) || !t.contains(e)) {
                    n = e;
                    do {
                        if (n.scrollHeight > n.offsetHeight) {
                            (t = n), (e.fastClickScrollParent = n);
                            break;
                        }
                    } while ((n = n.parentElement));
                }
                t && (t.fastClickLastScrollTop = t.scrollTop);
            }),
            (s.prototype.getTargetElementFromEventTarget = function (e) {
                return e.nodeType === Node.TEXT_NODE ? e.parentNode : e;
            }),
            (s.prototype.onTouchStart = function (e) {
                var t, n, i, o;
                if ((e.timeStamp < 0 ? ((o = new Date().getTime()), (this.isTrackingClickStartFromEvent = !1)) : ((o = e.timeStamp), (this.isTrackingClickStartFromEvent = !0)), !(1 < e.targetTouches.length))) {
                    if (((t = this.getTargetElementFromEventTarget(e.target)), (n = e.targetTouches[0]), l)) {
                        if ((i = window.getSelection()).rangeCount && !i.isCollapsed) return !0;
                        if (!c) {
                            if (n.identifier && n.identifier === this.lastTouchIdentifier) return e.preventDefault(), !1;
                            (this.lastTouchIdentifier = n.identifier), this.updateScrollParent(t);
                        }
                    }
                    (this.trackingClick = !0), (this.trackingClickStart = o), (this.targetElement = t), (this.touchStartX = n.pageX), (this.touchStartY = n.pageY), o - this.lastClickTime < this.tapDelay && e.preventDefault();
                }
                return !0;
            }),
            (s.prototype.touchHasMoved = function (e) {
                var e = e.changedTouches[0],
                    t = this.touchBoundary;
                return Math.abs(e.pageX - this.touchStartX) > t || Math.abs(e.pageY - this.touchStartY) > t;
            }),
            (s.prototype.onTouchMove = function (e) {
                return !this.trackingClick || ((this.targetElement === this.getTargetElementFromEventTarget(e.target) && !this.touchHasMoved(e)) || ((this.trackingClick = !1), (this.targetElement = null)), !0);
            }),
            (s.prototype.findControl = function (e) {
                return void 0 !== e.control ? e.control : e.htmlFor ? document.getElementById(e.htmlFor) : e.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea");
            }),
            (s.prototype.onTouchEnd = function (e) {
                var t,
                    n,
                    i,
                    o = this.targetElement,
                    a = this.isTrackingClickStartFromEvent ? e.timeStamp : new Date().getTime();
                if (!this.trackingClick) return !0;
                if (a - this.lastClickTime < this.tapDelay) return (this.cancelNextClick = !0);
                if (a - this.trackingClickStart > this.tapTimeout) return !0;
                if (
                    ((this.cancelNextClick = !1),
                    (this.lastClickTime = a),
                    (t = this.trackingClickStart),
                    (this.trackingClick = !1),
                    (this.trackingClickStart = 0),
                    d && ((i = e.changedTouches[0]), ((o = document.elementFromPoint(i.pageX - window.pageXOffset, i.pageY - window.pageYOffset) || o).fastClickScrollParent = this.targetElement.fastClickScrollParent)),
                    "label" === (i = o.tagName.toLowerCase()))
                ) {
                    if ((n = this.findControl(o))) {
                        if ((this.focus(o), r)) return !1;
                        o = n;
                    }
                } else if (this.needsFocus(o))
                    return 100 < a - t || (l && window.top !== window && "input" === i) ? (this.targetElement = null) : (this.focus(o), this.sendClick(o, e), (l && "select" === i) || ((this.targetElement = null), e.preventDefault())), !1;
                return !(!l || c || !(n = o.fastClickScrollParent) || n.fastClickLastScrollTop === n.scrollTop) || (this.needsClick(o) || (e.preventDefault(), this.sendClick(o, e)), !1);
            }),
            (s.prototype.onTouchCancel = function () {
                (this.trackingClick = !1), (this.targetElement = null);
            }),
            (s.prototype.onMouse = function (e) {
                return !(
                    this.targetElement &&
                    !e.forwardedTouchEvent &&
                    e.cancelable &&
                    (!this.needsClick(this.targetElement) || this.cancelNextClick) &&
                    (e.stopImmediatePropagation ? e.stopImmediatePropagation() : (e.propagationStopped = !0), e.stopPropagation(), e.preventDefault(), 1)
                );
            }),
            (s.prototype.onClick = function (e) {
                return this.trackingClick ? ((this.targetElement = null), !(this.trackingClick = !1)) : ("submit" === e.target.type && 0 === e.detail) || ((e = this.onMouse(e)) || (this.targetElement = null), e);
            }),
            (s.prototype.destroy = function () {
                var e = this.layer;
                r && (e.removeEventListener("mouseover", this.onMouse, !0), e.removeEventListener("mousedown", this.onMouse, !0), e.removeEventListener("mouseup", this.onMouse, !0)),
                    e.removeEventListener("click", this.onClick, !0),
                    e.removeEventListener("touchstart", this.onTouchStart, !1),
                    e.removeEventListener("touchmove", this.onTouchMove, !1),
                    e.removeEventListener("touchend", this.onTouchEnd, !1),
                    e.removeEventListener("touchcancel", this.onTouchCancel, !1);
            }),
            (s.notNeeded = function (e) {
                var t, n;
                if (void 0 === window.ontouchstart) return !0;
                if ((n = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1])) {
                    if (!r) return !0;
                    if ((t = document.querySelector("meta[name=viewport]"))) {
                        if (-1 !== t.content.indexOf("user-scalable=no")) return !0;
                        if (31 < n && document.documentElement.scrollWidth <= window.outerWidth) return !0;
                    }
                }
                if (i && 10 <= (n = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/))[1] && 3 <= n[2] && (t = document.querySelector("meta[name=viewport]"))) {
                    if (-1 !== t.content.indexOf("user-scalable=no")) return !0;
                    if (document.documentElement.scrollWidth <= window.outerWidth) return !0;
                }
                return (
                    "none" === e.style.msTouchAction ||
                    "manipulation" === e.style.touchAction ||
                    !!(
                        27 <= +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1] &&
                        (t = document.querySelector("meta[name=viewport]")) &&
                        (-1 !== t.content.indexOf("user-scalable=no") || document.documentElement.scrollWidth <= window.outerWidth)
                    ) ||
                    "none" === e.style.touchAction ||
                    "manipulation" === e.style.touchAction
                );
            }),
            (s.attach = function (e, t) {
                return new s(e, t);
            }),
            "function" == typeof define && "object" == typeof define.amd && define.amd
                ? define(function () {
                      return s;
                  })
                : "undefined" != typeof module && module.exports
                ? ((module.exports = s.attach), (module.exports.FastClick = s))
                : (window.FastClick = s);
    })(),
    "undefined" == typeof links && (links = {}),
    "undefined" == typeof google && (google = void 0),
    Array.prototype.indexOf ||
        (Array.prototype.indexOf = function (e) {
            for (var t = 0; t < this.length; t++) if (this[t] == e) return t;
            return -1;
        }),
    Array.prototype.forEach ||
        (Array.prototype.forEach = function (e, t) {
            for (var n = 0, i = this.length; n < i; ++n) e.call(t || this, this[n], n, this);
        }),
    (links.Timeline = function (e, t) {
        if (e) {
            (this.dom = {}),
                (this.conversion = {}),
                (this.eventParams = {}),
                (this.groups = []),
                (this.groupIndexes = {}),
                (this.items = []),
                (this.renderQueue = { show: [], hide: [], update: [] }),
                (this.renderedItems = []),
                (this.clusterGenerator = new links.Timeline.ClusterGenerator(this)),
                (this.currentClusters = []),
                (this.selection = void 0),
                (this.listeners = {}),
                (this.size = {
                    actualHeight: 0,
                    axis: {
                        characterMajorHeight: 0,
                        characterMajorWidth: 0,
                        characterMinorHeight: 0,
                        characterMinorWidth: 0,
                        height: 0,
                        labelMajorTop: 0,
                        labelMinorTop: 0,
                        line: 0,
                        lineMajorWidth: 0,
                        lineMinorHeight: 0,
                        lineMinorTop: 0,
                        lineMinorWidth: 0,
                        top: 0,
                    },
                    contentHeight: 0,
                    contentLeft: 0,
                    contentWidth: 0,
                    frameHeight: 0,
                    frameWidth: 0,
                    groupsLeft: 0,
                    groupsWidth: 0,
                    items: { top: 0 },
                }),
                (this.dom.container = e),
                (this.options = {
                    width: "100%",
                    height: "auto",
                    minHeight: 0,
                    groupMinHeight: 0,
                    autoHeight: !0,
                    eventMargin: 10,
                    eventMarginAxis: 20,
                    dragAreaWidth: 10,
                    min: void 0,
                    max: void 0,
                    zoomMin: 10,
                    zoomMax: 31536e10,
                    moveable: !0,
                    zoomable: !0,
                    selectable: !0,
                    unselectable: !0,
                    editable: !1,
                    snapEvents: !0,
                    groupChangeable: !0,
                    timeChangeable: !0,
                    showCurrentTime: !0,
                    showCustomTime: !1,
                    showMajorLabels: !0,
                    showMinorLabels: !0,
                    showNavigation: !1,
                    showButtonNew: !1,
                    groupsOnRight: !1,
                    groupsOrder: !0,
                    axisOnTop: !1,
                    stackEvents: !0,
                    animate: !0,
                    animateZoom: !0,
                    cluster: !1,
                    clusterMaxItems: 5,
                    style: "box",
                    customStackOrder: !1,
                    locale: "en",
                    MONTHS: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    MONTHS_SHORT: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    DAYS: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    DAYS_SHORT: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                    ZOOM_IN: "Zoom in",
                    ZOOM_OUT: "Zoom out",
                    MOVE_LEFT: "Move left",
                    MOVE_RIGHT: "Move right",
                    NEW: "New",
                    CREATE_NEW_EVENT: "Create new event",
                }),
                this.setOptions(t),
                (this.clientTimeOffset = 0);
            for (var n = this.dom; n.container.hasChildNodes(); ) n.container.removeChild(n.container.firstChild);
            (this.step = new links.Timeline.StepDate()),
                (this.itemTypes = { box: links.Timeline.ItemBox, range: links.Timeline.ItemRange, floatingRange: links.Timeline.ItemFloatingRange, dot: links.Timeline.ItemDot }),
                (this.data = []),
                (this.firstDraw = !0),
                this.setVisibleChartRange(void 0, void 0, !1),
                this.render();
            var i = this;
            setTimeout(function () {
                i.trigger("ready");
            }, 0);
        }
    }),
    (links.Timeline.prototype.draw = function (e, t) {
        t && console.log("WARNING: Passing options in draw() is deprecated. Pass options to the constructur or use setOptions() instead!"),
            this.setOptions(t),
            this.options.selectable && links.Timeline.addClassName(this.dom.frame, "timeline-selectable"),
            this.setData(e),
            t && (t.start || t.end) ? this.setVisibleChartRange(t.start, t.end) : this.firstDraw && this.setVisibleChartRangeAuto(),
            (this.firstDraw = !1);
    }),
    (links.Timeline.prototype.setOptions = function (e) {
        if (e) {
            for (var t in e) e.hasOwnProperty(t) && (this.options[t] = e[t]);
            if (void 0 !== links.locales && "en" !== this.options.locale) {
                var n = links.locales[this.options.locale];
                if (n) for (var i in n) n.hasOwnProperty(i) && (this.options[i] = n[i]);
            }
            null != e.showButtonAdd && ((this.options.showButtonNew = e.showButtonAdd), console.log("WARNING: Option showButtonAdd is deprecated. Use showButtonNew instead")),
                null != e.intervalMin && ((this.options.zoomMin = e.intervalMin), console.log("WARNING: Option intervalMin is deprecated. Use zoomMin instead")),
                null != e.intervalMax && ((this.options.zoomMax = e.intervalMax), console.log("WARNING: Option intervalMax is deprecated. Use zoomMax instead")),
                e.scale && e.step && this.step.setScale(e.scale, e.step);
        }
        this.options.autoHeight = "auto" === this.options.height;
    }),
    (links.Timeline.prototype.getOptions = function () {
        return this.options;
    }),
    (links.Timeline.prototype.addItemType = function (e, t) {
        this.itemTypes[e] = t;
    }),
    (links.Timeline.mapColumnIds = function (e) {
        for (var t = {}, n = e.getNumberOfColumns(), i = !0, o = 0; o < n; o++) {
            var a = e.getColumnId(o) || e.getColumnLabel(o);
            (t[a] = o), ("start" != a && "end" != a && "content" != a && "group" != a && "className" != a && "editable" != a && "type" != a) || (i = !1);
        }
        return i && ((t.start = 0), (t.end = 1), (t.content = 2), 3 < n && (t.group = 3), 4 < n && (t.className = 4), 5 < n && (t.editable = 5), 6 < n) && (t.type = 6), t;
    }),
    (links.Timeline.prototype.setData = function (e) {
        this.unselectItem(), (e = e || []), this.stackCancelAnimation(), this.clearItems(), (this.data = e);
        var t = this.items;
        if ((this.deleteGroups(), google && google.visualization && e instanceof google.visualization.DataTable))
            for (var n = links.Timeline.mapColumnIds(e), i = 0, o = e.getNumberOfRows(); i < o; i++)
                t.push(
                    this.createItem({
                        start: null != n.start ? e.getValue(i, n.start) : void 0,
                        end: null != n.end ? e.getValue(i, n.end) : void 0,
                        content: null != n.content ? e.getValue(i, n.content) : void 0,
                        group: null != n.group ? e.getValue(i, n.group) : void 0,
                        className: null != n.className ? e.getValue(i, n.className) : void 0,
                        editable: null != n.editable ? e.getValue(i, n.editable) : void 0,
                        type: null != n.type ? e.getValue(i, n.type) : void 0,
                    })
                );
        else {
            if (!links.Timeline.isArray(e)) throw "Unknown data type. DataTable or Array expected.";
            for (i = 0, o = e.length; i < o; i++) {
                var a = e[i],
                    a = this.createItem(a);
                t.push(a);
            }
        }
        this.options.cluster && this.clusterGenerator.setData(this.items), this.render({ animate: !1 });
    }),
    (links.Timeline.prototype.getData = function () {
        return this.data;
    }),
    (links.Timeline.prototype.updateData = function (e, t) {
        var n,
            i = this.data;
        if (google && google.visualization && i instanceof google.visualization.DataTable) {
            var o,
                a,
                s,
                r = e + 1 - i.getNumberOfRows(),
                l = (0 < r && i.addRows(r), links.Timeline.mapColumnIds(i));
            for (n in t)
                t.hasOwnProperty(n) &&
                    (null == (o = l[n]) && ((s = "string"), "number" == typeof (a = t[n]) ? (s = "number") : "boolean" == typeof a ? (s = "boolean") : a instanceof Date && (s = "datetime"), (o = i.addColumn(s, n))), i.setValue(e, o, t[n]));
        } else {
            if (!links.Timeline.isArray(i)) throw "Cannot update data, unknown type of data";
            var c = i[e];
            for (n in (null == c && (i[e] = c = {}), t)) t.hasOwnProperty(n) && (c[n] = t[n]);
        }
    }),
    (links.Timeline.prototype.getItemIndex = function (e) {
        for (var t = e, n = this.dom.items.frame, i = this.items, o = void 0; t.parentNode && t.parentNode !== n; ) t = t.parentNode;
        if (t.parentNode === n)
            for (var a = 0, s = i.length; a < s; a++)
                if (i[a].dom === t) {
                    o = a;
                    break;
                }
        return o;
    }),
    (links.Timeline.prototype.getClusterIndex = function (e) {
        var t = e,
            n = this.dom.items.frame,
            i = this.clusters,
            o = void 0;
        if (this.clusters) {
            for (; t.parentNode && t.parentNode !== n; ) t = t.parentNode;
            if (t.parentNode === n)
                for (var a = 0, s = i.length; a < s; a++)
                    if (i[a].dom === t) {
                        o = a;
                        break;
                    }
        }
        return o;
    }),
    (links.Timeline.prototype.getVisibleItems = function (e, t) {
        var n = this.items,
            i = [];
        if (n)
            for (var o = 0, a = n.length; o < a; o++) {
                var s = n[o];
                s.end ? e <= s.start && s.end <= t && i.push({ row: o }) : e <= s.start && s.start <= t && i.push({ row: o });
            }
        return i;
    }),
    (links.Timeline.prototype.setSize = function (e, t) {
        e && ((this.options.width = e), (this.dom.frame.style.width = e)),
            t && ((this.options.height = t), (this.options.autoHeight = "auto" === this.options.height), "auto" !== t) && (this.dom.frame.style.height = t),
            this.render({ animate: !1 });
    }),
    (links.Timeline.prototype.setVisibleChartRange = function (e, t, n) {
        var i = {},
            i =
                ((e && t) || (i = this.getDataRange(!0)),
                e || (t ? (i.min && i.min.valueOf() < t.valueOf() ? (e = i.min) : (e = new Date(t.valueOf())).setDate(e.getDate() - 7)) : (e = new Date()).setDate(e.getDate() - 3)),
                t || (i.max ? (t = i.max) : (t = new Date(e.valueOf())).setDate(t.getDate() + 7)),
                t <= e && (t = new Date(e.valueOf())).setDate(t.getDate() + 7),
                this.options.min || void 0),
            i = (null != i && e.valueOf() < i.valueOf() && (e = new Date(i.valueOf())), this.options.max || void 0);
        null != i && t.valueOf() > i.valueOf() && (t = new Date(i.valueOf())), this.applyRange(e, t), null == n || 1 == n ? this.render({ animate: !1 }) : this.recalcConversion();
    }),
    (links.Timeline.prototype.setVisibleChartRangeAuto = function () {
        var e = this.getDataRange(!0);
        this.setVisibleChartRange(e.min, e.max);
    }),
    (links.Timeline.prototype.setVisibleChartRangeNow = function () {
        var e = new Date(),
            t = this.end.valueOf() - this.start.valueOf(),
            e = new Date(e.valueOf() - t / 2),
            t = new Date(e.valueOf() + t);
        this.setVisibleChartRange(e, t);
    }),
    (links.Timeline.prototype.getVisibleChartRange = function () {
        return { start: new Date(this.start.valueOf()), end: new Date(this.end.valueOf()) };
    }),
    (links.Timeline.prototype.getDataRange = function (e) {
        var t = this.items,
            n = void 0,
            i = void 0;
        if (t)
            for (var o = 0, a = t.length; o < a; o++) {
                var s = t[o],
                    r = null != s.start ? s.start.valueOf() : void 0,
                    s = null != s.end ? s.end.valueOf() : r;
                null != r && (n = null != n ? Math.min(n.valueOf(), r.valueOf()) : r), null != s && (i = null != i ? Math.max(i.valueOf(), s.valueOf()) : s);
            }
        return n && i && e && ((n -= 0.05 * (e = i - n)), (i += 0.05 * e)), { min: null != n ? new Date(n) : void 0, max: null != i ? new Date(i) : void 0 };
    }),
    (links.Timeline.prototype.render = function (e) {
        this.reflowFrame(), this.reflowAxis(), this.reflowGroups(), this.reflowItems();
        var t = this.options.animate;
        e && null != e.animate && (t = e.animate),
            this.recalcConversion(),
            this.clusterItems(),
            this.filterItems(),
            this.stackItems(t),
            this.recalcItems(),
            this.repaint() && 0 < (t = null == (t = e ? e.renderTimesLeft : void 0) ? 5 : t) && this.render({ animate: e ? e.animate : void 0, renderTimesLeft: t - 1 });
    }),
    (links.Timeline.prototype.repaint = function () {
        var e = this.repaintFrame(),
            t = this.repaintAxis(),
            n = this.repaintGroups(),
            i = this.repaintItems();
        return this.repaintCurrentTime(), this.repaintCustomTime(), e || t || n || i;
    }),
    (links.Timeline.prototype.reflowFrame = function () {
        var e,
            t = this.dom,
            n = (this.options, this.size),
            i = t.frame ? t.frame.offsetWidth : 0,
            t = t.frame ? t.frame.clientHeight : 0;
        return (e = n.frameWidth !== i || n.frameHeight !== t), (n.frameWidth = i), (n.frameHeight = t), e;
    }),
    (links.Timeline.prototype.repaintFrame = function () {
        var t,
            e = !1,
            n = this.dom,
            i = this.options,
            o = this.size,
            a =
                (n.frame || ((n.frame = document.createElement("DIV")), (n.frame.className = "timeline-frame ui-widget ui-widget-content ui-corner-all"), n.container.appendChild(n.frame), (e = !0)),
                i.autoHeight ? o.actualHeight + "px" : i.height || "100%"),
            i = i.width || "100%";
        return (
            (e = (e = e || n.frame.style.height != a) || n.frame.style.width != i),
            (n.frame.style.height = a),
            (n.frame.style.width = i),
            n.content ||
                ((n.content = document.createElement("DIV")),
                (n.content.className = "timeline-content"),
                n.frame.appendChild(n.content),
                ((a = document.createElement("DIV")).style.position = "absolute"),
                (a.style.left = "0px"),
                (a.style.top = "0px"),
                (a.style.height = "100%"),
                (a.style.width = "0px"),
                n.content.appendChild(a),
                (n.contentTimelines = a),
                (i = this.eventParams),
                (t = this),
                i.onMouseDown ||
                    ((i.onMouseDown = function (e) {
                        t.onMouseDown(e);
                    }),
                    links.Timeline.addEventListener(n.content, "mousedown", i.onMouseDown)),
                i.onTouchStart ||
                    ((i.onTouchStart = function (e) {
                        t.onTouchStart(e);
                    }),
                    links.Timeline.addEventListener(n.content, "touchstart", i.onTouchStart)),
                i.onMouseWheel ||
                    ((i.onMouseWheel = function (e) {
                        t.onMouseWheel(e);
                    }),
                    links.Timeline.addEventListener(n.content, "mousewheel", i.onMouseWheel)),
                i.onDblClick ||
                    ((i.onDblClick = function (e) {
                        t.onDblClick(e);
                    }),
                    links.Timeline.addEventListener(n.content, "dblclick", i.onDblClick)),
                (e = !0)),
            (n.content.style.left = o.contentLeft + "px"),
            (n.content.style.top = "0px"),
            (n.content.style.width = o.contentWidth + "px"),
            (n.content.style.height = o.frameHeight + "px"),
            this.repaintNavigation(),
            e
        );
    }),
    (links.Timeline.prototype.reflowAxis = function () {
        var e,
            t = this.dom,
            n = this.options,
            i = this.size,
            t = t.axis,
            o = t && t.characterMinor ? t.characterMinor.clientWidth : 0,
            a = t && t.characterMinor ? t.characterMinor.clientHeight : 0,
            s = t && t.characterMajor ? t.characterMajor.clientWidth : 0,
            r = t && t.characterMajor ? t.characterMajor.clientHeight : 0,
            l = (n.showMinorLabels ? a : 0) + (n.showMajorLabels ? r : 0),
            c = n.axisOnTop ? 0 : i.frameHeight - l,
            d = n.axisOnTop ? l : c,
            c =
                ((e = i.axis.top !== c || i.axis.line !== d || i.axis.height !== l),
                (i.axis.top = c),
                (i.axis.line = d),
                (i.axis.height = l),
                (i.axis.labelMajorTop = n.axisOnTop ? 0 : d + (n.showMinorLabels ? a : 0)),
                (i.axis.labelMinorTop = n.axisOnTop ? (n.showMajorLabels ? r : 0) : d),
                (i.axis.lineMinorTop = n.axisOnTop ? i.axis.labelMinorTop : 0),
                (i.axis.lineMinorHeight = n.showMajorLabels ? i.frameHeight - r : i.frameHeight),
                (i.axis.lineMinorWidth = t && t.minorLines && t.minorLines.length ? t.minorLines[0].offsetWidth : 1),
                (i.axis.lineMajorWidth = t && t.majorLines && t.majorLines.length ? t.majorLines[0].offsetWidth : 1),
                (e = e || i.axis.characterMinorWidth !== o || i.axis.characterMinorHeight !== a || i.axis.characterMajorWidth !== s || i.axis.characterMajorHeight !== r),
                (i.axis.characterMinorWidth = o),
                (i.axis.characterMinorHeight = a),
                (i.axis.characterMajorWidth = s),
                (i.axis.characterMajorHeight = r),
                Math.max(i.frameHeight - l, 0));
        return (i.contentLeft = n.groupsOnRight ? 0 : i.groupsWidth), (i.contentWidth = Math.max(i.frameWidth - i.groupsWidth, 0)), (i.contentHeight = c), e;
    }),
    (links.Timeline.prototype.repaintAxis = function () {
        var e = !1,
            t = this.dom,
            n = this.options,
            i = this.size,
            o = this.step,
            a = t.axis,
            s =
                (a || (t.axis = a = {}),
                i.axis.properties || (i.axis.properties = {}),
                a.minorTexts || (a.minorTexts = []),
                a.minorLines || (a.minorLines = []),
                a.majorTexts || (a.majorTexts = []),
                a.majorLines || (a.majorLines = []),
                a.frame || ((a.frame = document.createElement("DIV")), (a.frame.style.position = "absolute"), (a.frame.style.left = "0px"), (a.frame.style.top = "0px"), t.content.appendChild(a.frame)),
                t.content.removeChild(a.frame),
                (a.frame.style.width = i.contentWidth + "px"),
                (a.frame.style.height = i.axis.height + "px"),
                this.screenToTime(0)),
            r = this.screenToTime(i.contentWidth);
        i.axis.characterMinorWidth && ((this.minimumStep = this.screenToTime(6 * i.axis.characterMinorWidth) - this.screenToTime(0)), o.setRange(s, r, this.minimumStep));
        e = this.repaintAxisCharacters();
        this.repaintAxisStartOverwriting(), o.start();
        for (var l = void 0, c = 0; !o.end() && c < 1e3; ) {
            c++;
            var d = o.getCurrent(),
                d = this.timeToScreen(d),
                u = o.isMajor();
            n.showMinorLabels && this.repaintAxisMinorText(d, o.getLabelMinor(n)),
                u && n.showMajorLabels ? (0 < d && (null == l && (l = d), this.repaintAxisMajorText(d, o.getLabelMajor(n))), this.repaintAxisMajorLine(d)) : this.repaintAxisMinorLine(d),
                o.next();
        }
        return (
            n.showMajorLabels && ((s = this.screenToTime(0)), (i = (r = this.step.getLabelMajor(n, s)).length * i.axis.characterMajorWidth + 10), null == l || i < l) && this.repaintAxisMajorText(0, r, s),
            this.repaintAxisEndOverwriting(),
            this.repaintAxisHorizontal(),
            t.content.insertBefore(a.frame, t.content.firstChild),
            e
        );
    }),
    (links.Timeline.prototype.repaintAxisCharacters = function () {
        var e,
            t,
            n = !1,
            i = this.dom.axis;
        return (
            i.characterMinor ||
                ((e = document.createTextNode("0")),
                ((t = document.createElement("DIV")).className = "timeline-axis-text timeline-axis-text-minor"),
                t.appendChild(e),
                (t.style.position = "absolute"),
                (t.style.visibility = "hidden"),
                (t.style.paddingLeft = "0px"),
                (t.style.paddingRight = "0px"),
                i.frame.appendChild(t),
                (i.characterMinor = t),
                (n = !0)),
            i.characterMajor ||
                ((e = document.createTextNode("0")),
                ((t = document.createElement("DIV")).className = "timeline-axis-text timeline-axis-text-major"),
                t.appendChild(e),
                (t.style.position = "absolute"),
                (t.style.visibility = "hidden"),
                (t.style.paddingLeft = "0px"),
                (t.style.paddingRight = "0px"),
                i.frame.appendChild(t),
                (i.characterMajor = t),
                (n = !0)),
            n
        );
    }),
    (links.Timeline.prototype.repaintAxisStartOverwriting = function () {
        var e = this.size.axis.properties;
        (e.minorTextNum = 0), (e.minorLineNum = 0), (e.majorTextNum = 0), (e.majorLineNum = 0);
    }),
    (links.Timeline.prototype.repaintAxisEndOverwriting = function () {
        for (var e = this.dom, t = this.size.axis.properties, n = this.dom.axis.frame, i = e.axis.minorTexts, o = t.minorTextNum; i.length > o; ) {
            var a = i[o];
            n.removeChild(a), i.splice(o, 1);
        }
        var s = e.axis.minorLines;
        for (o = t.minorLineNum; s.length > o; ) {
            var r = s[o];
            n.removeChild(r), s.splice(o, 1);
        }
        var l = e.axis.majorTexts;
        for (o = t.majorTextNum; l.length > o; ) {
            var c = l[o];
            n.removeChild(c), l.splice(o, 1);
        }
        var d = e.axis.majorLines;
        for (o = t.majorLineNum; d.length > o; ) {
            var u = d[o];
            n.removeChild(u), d.splice(o, 1);
        }
    }),
    (links.Timeline.prototype.repaintAxisHorizontal = function () {
        var e,
            t,
            n = this.dom.axis,
            i = this.size,
            o = this.options,
            o = o.showMinorLabels || o.showMajorLabels;
        o
            ? (n.backgroundLine ||
                  (((e = document.createElement("DIV")).className = "timeline-axis"),
                  (e.style.position = "absolute"),
                  (e.style.left = "0px"),
                  (e.style.width = "100%"),
                  (e.style.border = "none"),
                  n.frame.insertBefore(e, n.frame.firstChild),
                  (n.backgroundLine = e)),
              n.backgroundLine && ((n.backgroundLine.style.top = i.axis.top + "px"), (n.backgroundLine.style.height = i.axis.height + "px")))
            : n.backgroundLine && (n.frame.removeChild(n.backgroundLine), delete n.backgroundLine),
            o
                ? (n.line
                      ? ((t = n.frame.removeChild(n.line)), n.frame.appendChild(t))
                      : (((t = document.createElement("DIV")).className = "timeline-axis"), (t.style.position = "absolute"), (t.style.left = "0px"), (t.style.width = "100%"), (t.style.height = "0px"), n.frame.appendChild(t), (n.line = t)),
                  (n.line.style.top = i.axis.line + "px"))
                : n.line && n.line.parentElement && (n.frame.removeChild(n.line), delete n.line);
    }),
    (links.Timeline.prototype.repaintAxisMinorText = function (e, t) {
        var n,
            i = this.size,
            o = this.dom,
            a = i.axis.properties,
            s = o.axis.frame,
            o = o.axis.minorTexts,
            r = a.minorTextNum;
        r < o.length
            ? (n = o[r])
            : ((r = document.createTextNode("")), (n = document.createElement("DIV")).appendChild(r), (n.className = "timeline-axis-text timeline-axis-text-minor"), (n.style.position = "absolute"), s.appendChild(n), o.push(n)),
            (n.childNodes[0].nodeValue = t),
            (n.style.left = e + "px"),
            (n.style.top = i.axis.labelMinorTop + "px"),
            a.minorTextNum++;
    }),
    (links.Timeline.prototype.repaintAxisMinorLine = function (e) {
        var t,
            n = this.size.axis,
            i = this.dom,
            o = n.properties,
            a = i.axis.frame,
            i = i.axis.minorLines,
            s = o.minorLineNum;
        s < i.length ? (t = i[s]) : (((t = document.createElement("DIV")).className = "timeline-axis-grid timeline-axis-grid-minor"), (t.style.position = "absolute"), (t.style.width = "0px"), a.appendChild(t), i.push(t)),
            (t.style.top = n.lineMinorTop + "px"),
            (t.style.height = n.lineMinorHeight + "px"),
            (t.style.left = e - n.lineMinorWidth / 2 + "px"),
            o.minorLineNum++;
    }),
    (links.Timeline.prototype.repaintAxisMajorText = function (e, t) {
        var n,
            i = this.size,
            o = i.axis.properties,
            a = this.dom.axis.frame,
            s = this.dom.axis.majorTexts,
            r = o.majorTextNum;
        r < s.length
            ? (n = s[r])
            : ((r = document.createTextNode(t)),
              ((n = document.createElement("DIV")).className = "timeline-axis-text timeline-axis-text-major"),
              n.appendChild(r),
              (n.style.position = "absolute"),
              (n.style.top = "0px"),
              a.appendChild(n),
              s.push(n)),
            (n.childNodes[0].nodeValue = t),
            (n.style.top = i.axis.labelMajorTop + "px"),
            (n.style.left = e + "px"),
            o.majorTextNum++;
    }),
    (links.Timeline.prototype.repaintAxisMajorLine = function (e) {
        var t,
            n = this.size,
            i = n.axis.properties,
            o = this.size.axis,
            a = this.dom.axis.frame,
            s = this.dom.axis.majorLines,
            r = i.majorLineNum;
        r < s.length
            ? (t = s[r])
            : (((t = document.createElement("DIV")).className = "timeline-axis-grid timeline-axis-grid-major"), (t.style.position = "absolute"), (t.style.top = "0px"), (t.style.width = "0px"), a.appendChild(t), s.push(t)),
            (t.style.left = e - o.lineMajorWidth / 2 + "px"),
            (t.style.height = n.frameHeight + "px"),
            i.majorLineNum++;
    }),
    (links.Timeline.prototype.reflowItems = function () {
        var e,
            t,
            n = !1,
            i = this.groups,
            o = this.renderedItems;
        for (
            i &&
                i.forEach(function (e) {
                    e.itemsHeight = 0;
                }),
                e = 0,
                t = o.length;
            e < t;
            e++
        ) {
            var a,
                s = o[e],
                r = s.dom,
                l = s.group;
            r && ((a = r ? r.clientWidth : 0), (r = r ? r.clientHeight : 0), (n = (n = n || s.width != a) || s.height != r), (s.width = a), (s.height = r), s.reflow()),
                l && (l.itemsHeight = Math.max(this.options.groupMinHeight, l.itemsHeight ? Math.max(l.itemsHeight, s.height) : s.height));
        }
        return n;
    }),
    (links.Timeline.prototype.recalcItems = function () {
        var e,
            t,
            n,
            i = !1,
            o = this.groups,
            a = this.size,
            s = this.options,
            r = this.renderedItems,
            l = 0;
        if (0 == o.length) {
            if (s.autoHeight || s.cluster) {
                var c = 0,
                    d = 0;
                if (this.stack && this.stack.finalItems)
                    for ((t = (n = this.stack.finalItems)[0]) && t.top && ((c = t.top), (d = t.top + t.height)), v = 1, b = n.length; v < b; v++) (t = n[v]), (c = Math.min(c, t.top)), (d = Math.max(d, t.top + t.height));
                else for ((e = r[0]) && e.top && ((c = e.top), (d = e.top + e.height)), v = 1, b = r.length; v < b; v++) (e = r[v]).top && ((c = Math.min(c, e.top)), (d = Math.max(d, e.top + e.height)));
                if (((l = d - c + 2 * s.eventMarginAxis + a.axis.height) < s.minHeight && (l = s.minHeight), a.actualHeight != l && s.autoHeight && !s.axisOnTop)) {
                    var u = l - a.actualHeight;
                    if (this.stack && this.stack.finalItems) for (v = 0, b = (n = this.stack.finalItems).length; v < b; v++) (n[v].top += u), (n[v].item.top += u);
                    else for (v = 0, b = r.length; v < b; v++) r[v].top += u;
                }
            }
        } else {
            for (l = a.axis.height + 2 * s.eventMarginAxis, v = 0, b = o.length; v < b; v++) {
                var p,
                    h = (p = o[v]).itemsHeight,
                    i = i || h != p.height;
                (p.height = Math.max(h, s.groupMinHeight)), (l += o[v].height + s.eventMargin);
            }
            for (var f = s.eventMargin, m = s.axisOnTop ? s.eventMarginAxis + f / 2 : a.contentHeight - s.eventMarginAxis + f / 2, g = a.axis.height, v = 0, b = o.length; v < b; v++)
                (p = o[v]),
                    s.axisOnTop
                        ? ((p.top = m + g), (p.labelTop = m + g + (p.height - p.labelHeight) / 2), (p.lineTop = m + g + p.height + f / 2), (m += p.height + f))
                        : ((m -= p.height + f), (p.top = m), (p.labelTop = m + (p.height - p.labelHeight) / 2), (p.lineTop = m - f / 2));
            i = !0;
        }
        return l < s.minHeight && (l = s.minHeight), (i = i || l != a.actualHeight), (a.actualHeight = l), i;
    }),
    (links.Timeline.prototype.clearItems = function () {
        var t = this.renderQueue.hide;
        this.renderedItems.forEach(function (e) {
            t.push(e);
        }),
            this.clusterGenerator.clear(),
            (this.items = []);
    }),
    (links.Timeline.prototype.repaintItems = function () {
        for (
            var e,
                t,
                n = this.dom,
                i = this.size,
                o = this,
                a = this.renderedItems,
                s = (n.items || (n.items = {}), n.items.frame),
                r =
                    (s || (((s = document.createElement("DIV")).style.position = "relative"), n.content.appendChild(s), (n.items.frame = s)),
                    (s.style.left = "0px"),
                    (s.style.top = i.items.top + "px"),
                    (s.style.height = "0px"),
                    n.content.removeChild(s),
                    this.renderQueue),
                l = [],
                i = 0 < r.show.length || 0 < r.update.length || 0 < r.hide.length;
            (e = r.show.shift());

        )
            e.showDOM(s), e.getImageUrls(l), a.push(e);
        for (; (e = r.update.shift()); ) e.updateDOM(s), e.getImageUrls(l), -1 == (t = this.renderedItems.indexOf(e)) && a.push(e);
        for (; (e = r.hide.shift()); ) e.hideDOM(s), -1 != (t = this.renderedItems.indexOf(e)) && a.splice(t, 1);
        return (
            a.forEach(function (e) {
                e.updatePosition(o);
            }),
            this.repaintDeleteButton(),
            this.repaintDragAreas(),
            n.content.appendChild(s),
            l.length &&
                links.imageloader.loadAll(
                    l,
                    function () {
                        o.render();
                    },
                    !1
                ),
            i
        );
    }),
    (links.Timeline.prototype.reflowGroups = function () {
        for (var e = this.options, t = this.size, n = this.dom, i = 0, o = this.groups, a = this.dom.groups ? this.dom.groups.labels : [], s = 0, r = o.length; s < r; s++) {
            var l = o[s],
                c = a[s];
            (l.labelWidth = c ? c.clientWidth : 0), (l.labelHeight = c ? c.clientHeight : 0), (l.width = l.labelWidth), (i = Math.max(i, l.width));
        }
        void 0 !== e.groupsWidth && (i = n.groups.frame ? n.groups.frame.clientWidth : 0), (i += 1);
        n = e.groupsOnRight ? t.frameWidth - i : 0;
        return (e = t.groupsWidth !== i || t.groupsLeft !== n), (t.groupsWidth = i), (t.groupsLeft = n), e;
    }),
    (links.Timeline.prototype.repaintGroups = function () {
        var e = this.dom,
            t = this,
            n = this.options,
            i = this.size,
            o = this.groups,
            a = (void 0 === e.groups && (e.groups = {}), e.groups.labels),
            s = (a || (e.groups.labels = a = []), e.groups.labelLines),
            r = (s || (e.groups.labelLines = s = []), e.groups.itemLines),
            l = (r || (e.groups.itemLines = r = []), e.groups.frame);
        l ||
            (((l = document.createElement("DIV")).className = "timeline-groups-axis"),
            (l.style.position = "absolute"),
            (l.style.overflow = "hidden"),
            (l.style.top = "0px"),
            (l.style.height = "100%"),
            e.frame.appendChild(l),
            (e.groups.frame = l)),
            (l.style.left = i.groupsLeft + "px"),
            (l.style.width = void 0 !== n.groupsWidth ? n.groupsWidth : i.groupsWidth + "px"),
            (l.style.display = 0 == o.length ? "none" : "");
        for (var c = a.length, d = o.length, u = 0, p = Math.min(c, d); u < p; u++) {
            var h = o[u];
            ((f = a[u]).innerHTML = this.getGroupName(h)), (f.style.display = "");
        }
        for (u = c; u < d; u++) {
            h = o[u];
            ((f = document.createElement("DIV")).className = "timeline-groups-text"),
                (f.style.position = "absolute"),
                void 0 === n.groupsWidth && (f.style.whiteSpace = "nowrap"),
                (f.innerHTML = this.getGroupName(h)),
                l.appendChild(f),
                (a[u] = f),
                ((m = document.createElement("DIV")).className = "timeline-axis-grid timeline-axis-grid-minor"),
                (m.style.position = "absolute"),
                (m.style.left = "0px"),
                (m.style.width = "100%"),
                (m.style.height = "0px"),
                (m.style.borderTopStyle = "solid"),
                l.appendChild(m),
                (s[u] = m),
                ((g = document.createElement("DIV")).className = "timeline-axis-grid timeline-axis-grid-minor"),
                (g.style.position = "absolute"),
                (g.style.left = "0px"),
                (g.style.width = "100%"),
                (g.style.height = "0px"),
                (g.style.borderTopStyle = "solid"),
                e.content.insertBefore(g, e.content.firstChild),
                (r[u] = g);
        }
        for (u = d; u < c; u++) {
            var f = a[u],
                m = s[u],
                g = r[u];
            l.removeChild(f), l.removeChild(m), e.content.removeChild(g);
        }
        a.splice(d, c - d), s.splice(d, c - d), r.splice(d, c - d), links.Timeline.addClassName(l, n.groupsOnRight ? "timeline-groups-axis-onright" : "timeline-groups-axis-onleft");
        for (var v, u = 0, p = o.length; u < p; u++) {
            (h = o[u]), (f = a[u]), (m = s[u]), (g = r[u]);
            (f.style.top = h.labelTop + "px"), (m.style.top = h.lineTop + "px"), (g.style.top = h.lineTop + "px"), (g.style.width = i.contentWidth + "px");
        }
        e.groups.background ||
            (((v = document.createElement("DIV")).className = "timeline-axis"), (v.style.position = "absolute"), (v.style.left = "0px"), (v.style.width = "100%"), (v.style.border = "none"), l.appendChild(v), (e.groups.background = v)),
            (e.groups.background.style.top = i.axis.top + "px"),
            (e.groups.background.style.height = i.axis.height + "px"),
            e.groups.line ||
                (((v = document.createElement("DIV")).className = "timeline-axis"), (v.style.position = "absolute"), (v.style.left = "0px"), (v.style.width = "100%"), (v.style.height = "0px"), l.appendChild(v), (e.groups.line = v)),
            (e.groups.line.style.top = i.axis.line + "px"),
            e.groups.frame &&
                o.length &&
                ((v = []), links.imageloader.filterImageUrls(e.groups.frame, v), v.length) &&
                links.imageloader.loadAll(
                    v,
                    function () {
                        t.render();
                    },
                    !1
                );
    }),
    (links.Timeline.prototype.repaintCurrentTime = function () {
        var e,
            t,
            n = this.options,
            i = this.dom,
            o = this.size;
        n.showCurrentTime
            ? (i.currentTime ||
                  (((n = document.createElement("DIV")).className = "timeline-currenttime"), (n.style.position = "absolute"), (n.style.top = "0px"), (n.style.height = "100%"), i.contentTimelines.appendChild(n), (i.currentTime = n)),
              (n = new Date()),
              (n = new Date(n.valueOf() + this.clientTimeOffset)),
              (o = (e = this.timeToScreen(n)) > -o.contentWidth && e < 2 * o.contentWidth),
              (i.currentTime.style.display = o ? "" : "none"),
              (i.currentTime.style.left = e + "px"),
              (i.currentTime.title = "Current time: " + n),
              null != this.currentTimeTimer && (clearTimeout(this.currentTimeTimer), delete this.currentTimeTimer),
              (t = this),
              (o = 1 / this.conversion.factor / 2) < 30 && (o = 30),
              (this.currentTimeTimer = setTimeout(function () {
                  t.repaintCurrentTime();
              }, o)))
            : i.currentTime && (i.contentTimelines.removeChild(i.currentTime), delete i.currentTime);
    }),
    (links.Timeline.prototype.repaintCustomTime = function () {
        var e,
            t = this.options,
            n = this.dom,
            i = this.size;
        t.showCustomTime
            ? (n.customTime ||
                  (((t = document.createElement("DIV")).className = "timeline-customtime"),
                  (t.style.position = "absolute"),
                  (t.style.top = "0px"),
                  (t.style.height = "100%"),
                  ((e = document.createElement("DIV")).style.position = "relative"),
                  (e.style.top = "0px"),
                  (e.style.left = "-10px"),
                  (e.style.height = "100%"),
                  (e.style.width = "20px"),
                  t.appendChild(e),
                  n.contentTimelines.appendChild(t),
                  (n.customTime = t),
                  (this.customTime = new Date())),
              (t = (e = this.timeToScreen(this.customTime)) > -i.contentWidth && e < 2 * i.contentWidth),
              (n.customTime.style.display = t ? "" : "none"),
              (n.customTime.style.left = e + "px"),
              (n.customTime.title = "Time: " + this.customTime))
            : n.customTime && (n.contentTimelines.removeChild(n.customTime), delete n.customTime);
    }),
    (links.Timeline.prototype.repaintDeleteButton = function () {
        var e,
            t = this.dom,
            n = t.items.frame,
            i = t.items.deleteButton,
            t =
                (i || (((i = document.createElement("DIV")).className = "timeline-navigation-delete"), (i.style.position = "absolute"), n.appendChild(i), (t.items.deleteButton = i)),
                this.selection && void 0 !== this.selection.index ? this.selection.index : -1),
            t = this.selection && void 0 !== this.selection.index ? this.items[t] : void 0;
        t && t.rendered && this.isEditable(t) ? ((e = t.getRight(this)), (t = t.top), (i.style.left = e + "px"), (i.style.top = t + "px"), (i.style.display = ""), n.removeChild(i), n.appendChild(i)) : (i.style.display = "none");
    }),
    (links.Timeline.prototype.repaintDragAreas = function () {
        var e,
            t,
            n,
            i = this.options,
            o = this.dom,
            a = this.dom.items.frame,
            s = o.items.dragLeft,
            r = (s || (((s = document.createElement("DIV")).className = "timeline-event-range-drag-left"), (s.style.position = "absolute"), a.appendChild(s), (o.items.dragLeft = s)), o.items.dragRight),
            o =
                (r || (((r = document.createElement("DIV")).className = "timeline-event-range-drag-right"), (r.style.position = "absolute"), a.appendChild(r), (o.items.dragRight = r)),
                this.selection && void 0 !== this.selection.index ? this.selection.index : -1),
            o = this.selection && void 0 !== this.selection.index ? this.items[o] : void 0;
        o && o.rendered && this.isEditable(o) && (o instanceof links.Timeline.ItemRange || o instanceof links.Timeline.ItemFloatingRange)
            ? ((e = o.getLeft(this)),
              (t = o.getRight(this)),
              (n = o.top),
              (o = o.height),
              (s.style.left = e + "px"),
              (s.style.top = n + "px"),
              (s.style.width = i.dragAreaWidth + "px"),
              (s.style.height = o + "px"),
              (s.style.display = ""),
              a.removeChild(s),
              a.appendChild(s),
              (r.style.left = t - i.dragAreaWidth + "px"),
              (r.style.top = n + "px"),
              (r.style.width = i.dragAreaWidth + "px"),
              (r.style.height = o + "px"),
              (r.style.display = ""),
              a.removeChild(r),
              a.appendChild(r))
            : ((s.style.display = "none"), (r.style.display = "none"));
    }),
    (links.Timeline.prototype.repaintNavigation = function () {
        var e,
            t,
            i = this,
            o = this.options,
            n = this.dom,
            a = n.frame,
            s = n.navBar;
        s ||
            ((e = o.showButtonNew && o.editable),
            ((t = o.showNavigation && (o.zoomable || o.moveable)) || e) &&
                (((s = document.createElement("DIV")).style.position = "absolute"),
                (s.className = "timeline-navigation ui-widget ui-state-highlight ui-corner-all"),
                o.groupsOnRight ? (s.style.left = "10px") : (s.style.right = "10px"),
                o.axisOnTop ? (s.style.bottom = "10px") : (s.style.top = "10px"),
                (n.navBar = s),
                a.appendChild(s)),
            e &&
                ((s.addButton = document.createElement("DIV")),
                (s.addButton.className = "timeline-navigation-new"),
                (s.addButton.title = o.CREATE_NEW_EVENT),
                ((n = document.createElement("SPAN")).className = "ui-icon ui-icon-circle-plus"),
                s.addButton.appendChild(n),
                links.Timeline.addEventListener(s.addButton, "mousedown", function (e) {
                    links.Timeline.preventDefault(e), links.Timeline.stopPropagation(e);
                    var e = i.size.contentWidth,
                        e = i.screenToTime(e / 2),
                        t = (o.snapEvents && i.step.snap(e), o.NEW),
                        n = i.groups.length ? i.groups[0].content : void 0,
                        e = (i.addItem({ start: e, content: t, group: n }, !0), i.items.length - 1);
                    i.selectItem(e), (i.applyAdd = !0), i.trigger("add"), i.applyAdd ? (i.render({ animate: !1 }), i.selectItem(e)) : i.deleteItem(e);
                }),
                s.appendChild(s.addButton)),
            e && t && links.Timeline.addClassName(s.addButton, "timeline-navigation-new-line"),
            t &&
                (o.zoomable &&
                    ((s.zoomInButton = document.createElement("DIV")),
                    (s.zoomInButton.className = "timeline-navigation-zoom-in"),
                    (s.zoomInButton.title = this.options.ZOOM_IN),
                    ((a = document.createElement("SPAN")).className = "ui-icon ui-icon-circle-zoomin"),
                    s.zoomInButton.appendChild(a),
                    links.Timeline.addEventListener(s.zoomInButton, "mousedown", function (e) {
                        links.Timeline.preventDefault(e), links.Timeline.stopPropagation(e), i.zoom(0.4), i.trigger("rangechange"), i.trigger("rangechanged");
                    }),
                    s.appendChild(s.zoomInButton),
                    (s.zoomOutButton = document.createElement("DIV")),
                    (s.zoomOutButton.className = "timeline-navigation-zoom-out"),
                    (s.zoomOutButton.title = this.options.ZOOM_OUT),
                    ((n = document.createElement("SPAN")).className = "ui-icon ui-icon-circle-zoomout"),
                    s.zoomOutButton.appendChild(n),
                    links.Timeline.addEventListener(s.zoomOutButton, "mousedown", function (e) {
                        links.Timeline.preventDefault(e), links.Timeline.stopPropagation(e), i.zoom(-0.4), i.trigger("rangechange"), i.trigger("rangechanged");
                    }),
                    s.appendChild(s.zoomOutButton)),
                o.moveable) &&
                ((s.moveLeftButton = document.createElement("DIV")),
                (s.moveLeftButton.className = "timeline-navigation-move-left"),
                (s.moveLeftButton.title = this.options.MOVE_LEFT),
                ((e = document.createElement("SPAN")).className = "ui-icon ui-icon-circle-arrow-w"),
                s.moveLeftButton.appendChild(e),
                links.Timeline.addEventListener(s.moveLeftButton, "mousedown", function (e) {
                    links.Timeline.preventDefault(e), links.Timeline.stopPropagation(e), i.move(-0.2), i.trigger("rangechange"), i.trigger("rangechanged");
                }),
                s.appendChild(s.moveLeftButton),
                (s.moveRightButton = document.createElement("DIV")),
                (s.moveRightButton.className = "timeline-navigation-move-right"),
                (s.moveRightButton.title = this.options.MOVE_RIGHT),
                ((t = document.createElement("SPAN")).className = "ui-icon ui-icon-circle-arrow-e"),
                s.moveRightButton.appendChild(t),
                links.Timeline.addEventListener(s.moveRightButton, "mousedown", function (e) {
                    links.Timeline.preventDefault(e), links.Timeline.stopPropagation(e), i.move(0.2), i.trigger("rangechange"), i.trigger("rangechanged");
                }),
                s.appendChild(s.moveRightButton)));
    }),
    (links.Timeline.prototype.setCurrentTime = function (e) {
        var t = new Date();
        (this.clientTimeOffset = e.valueOf() - t.valueOf()), this.repaintCurrentTime();
    }),
    (links.Timeline.prototype.getCurrentTime = function () {
        var e = new Date();
        return new Date(e.valueOf() + this.clientTimeOffset);
    }),
    (links.Timeline.prototype.setCustomTime = function (e) {
        (this.customTime = new Date(e.valueOf())), this.repaintCustomTime();
    }),
    (links.Timeline.prototype.getCustomTime = function () {
        return new Date(this.customTime.valueOf());
    }),
    (links.Timeline.prototype.setScale = function (e, t) {
        this.step.setScale(e, t), this.render();
    }),
    (links.Timeline.prototype.setAutoScale = function (e) {
        this.step.setAutoScale(e), this.render();
    }),
    (links.Timeline.prototype.redraw = function () {
        this.setData(this.data);
    }),
    (links.Timeline.prototype.checkResize = function () {
        this.render();
    }),
    (links.Timeline.prototype.isEditable = function (e) {
        return !!e && (null != e.editable ? e : this.options).editable;
    }),
    (links.Timeline.prototype.recalcConversion = function () {
        (this.conversion.offset = this.start.valueOf()), (this.conversion.factor = this.size.contentWidth / (this.end.valueOf() - this.start.valueOf()));
    }),
    (links.Timeline.prototype.screenToTime = function (e) {
        var t = this.conversion;
        return new Date(e / t.factor + t.offset);
    }),
    (links.Timeline.prototype.timeToScreen = function (e) {
        var t = this.conversion;
        return (e.valueOf() - t.offset) * t.factor;
    }),
    (links.Timeline.prototype.onTouchStart = function (e) {
        var t,
            n = this.eventParams,
            i = this;
        n.touchDown ||
            ((n.touchDown = !0),
            (n.zoomed = !1),
            this.onMouseDown(e),
            n.onTouchMove ||
                ((n.onTouchMove = function (e) {
                    i.onTouchMove(e);
                }),
                links.Timeline.addEventListener(document, "touchmove", n.onTouchMove)),
            n.onTouchEnd ||
                ((n.onTouchEnd = function (e) {
                    i.onTouchEnd(e);
                }),
                links.Timeline.addEventListener(document, "touchend", n.onTouchEnd)),
            (t = links.Timeline.getTarget(e)),
            (t = this.getItemIndex(t)),
            (n.doubleTapStartPrev = n.doubleTapStart),
            (n.doubleTapStart = new Date().valueOf()),
            (n.doubleTapItemPrev = n.doubleTapItem),
            (n.doubleTapItem = t),
            links.Timeline.preventDefault(e));
    }),
    (links.Timeline.prototype.onTouchMove = function (e) {
        var t,
            n,
            i = this.eventParams;
        e.scale && 1 !== e.scale && (i.zoomed = !0),
            i.zoomed
                ? this.options.zoomable &&
                  ((i.zoomed = !0),
                  (t = e.scale),
                  (t = (n = i.end.valueOf() - i.start.valueOf()) / t - n),
                  (n = new Date(parseInt(i.start.valueOf() - t / 2))),
                  (i = new Date(parseInt(i.end.valueOf() + t / 2))),
                  this.setVisibleChartRange(n, i),
                  this.trigger("rangechange"))
                : this.onMouseMove(e),
            links.Timeline.preventDefault(e);
    }),
    (links.Timeline.prototype.onTouchEnd = function (e) {
        var t = this.eventParams,
            n =
                ((t.touchDown = !1),
                t.zoomed && this.trigger("rangechanged"),
                t.onTouchMove && (links.Timeline.removeEventListener(document, "touchmove", t.onTouchMove), delete t.onTouchMove),
                t.onTouchEnd && (links.Timeline.removeEventListener(document, "touchend", t.onTouchEnd), delete t.onTouchEnd),
                this.onMouseUp(e),
                new Date().valueOf()),
            i = links.Timeline.getTarget(e);
        this.getItemIndex(i), t.doubleTapStartPrev && n - t.doubleTapStartPrev < 500 && t.doubleTapItem == t.doubleTapItemPrev && ((t.touchDown = !0), this.onDblClick(e), (t.touchDown = !1)), links.Timeline.preventDefault(e);
    }),
    (links.Timeline.prototype.onMouseDown = function (e) {
        e = e || window.event;
        var t,
            n,
            i,
            o = this.eventParams,
            a = this.options,
            s = this.dom;
        ((e.which ? 1 != e.which : 1 != e.button) && !o.touchDown) ||
            ((o.mouseX = links.Timeline.getPageX(e)),
            (o.mouseY = links.Timeline.getPageY(e)),
            (o.frameLeft = links.Timeline.getAbsoluteLeft(this.dom.content)),
            (o.frameTop = links.Timeline.getAbsoluteTop(this.dom.content)),
            (o.previousLeft = 0),
            (o.previousOffset = 0),
            (o.moved = !1),
            (o.start = new Date(this.start.valueOf())),
            (o.end = new Date(this.end.valueOf())),
            (o.target = links.Timeline.getTarget(e)),
            (n = s.items && s.items.dragLeft ? s.items.dragLeft : void 0),
            (t = s.items && s.items.dragRight ? s.items.dragRight : void 0),
            (o.itemDragLeft = o.target === n),
            (o.itemDragRight = o.target === t),
            o.itemDragLeft || o.itemDragRight
                ? ((o.itemIndex = this.selection && void 0 !== this.selection.index ? this.selection.index : void 0), delete o.clusterIndex)
                : ((o.itemIndex = this.getItemIndex(o.target)), (o.clusterIndex = this.getClusterIndex(o.target))),
            (o.customTime = o.target === s.customTime || o.target.parentNode === s.customTime ? this.customTime : void 0),
            (o.addItem = a.editable && e.ctrlKey),
            o.addItem &&
                ((n = o.mouseX - o.frameLeft),
                (t = o.mouseY - o.frameTop),
                (s = this.screenToTime(n)),
                a.snapEvents && this.step.snap(s),
                (n = new Date(s.valueOf())),
                (a = a.NEW),
                (t = this.getGroupFromHeight(t)),
                this.addItem({ start: s, end: n, content: a, group: this.getGroupName(t) }),
                (o.itemIndex = this.items.length - 1),
                delete o.clusterIndex,
                this.selectItem(o.itemIndex),
                (o.itemDragRight = !0)),
            (s = this.items[o.itemIndex]),
            (n = this.isSelected(o.itemIndex)),
            (o.editItem = n && this.isEditable(s)),
            o.editItem ? ((o.itemStart = s.start), (o.itemEnd = s.end), (o.itemGroup = s.group), (o.itemLeft = s.getLeft(this)), (o.itemRight = s.getRight(this))) : (this.dom.frame.style.cursor = "move"),
            o.touchDown) ||
            ((i = this),
            o.onMouseMove ||
                ((o.onMouseMove = function (e) {
                    i.onMouseMove(e);
                }),
                links.Timeline.addEventListener(document, "mousemove", o.onMouseMove)),
            o.onMouseUp ||
                ((o.onMouseUp = function (e) {
                    i.onMouseUp(e);
                }),
                links.Timeline.addEventListener(document, "mouseup", o.onMouseUp)),
            links.Timeline.preventDefault(e));
    }),
    (links.Timeline.prototype.onMouseMove = function (e) {
        e = e || window.event;
        var t,
            n,
            i = this.eventParams,
            o = this.size,
            a = this.dom,
            s = this.options,
            r = links.Timeline.getPageX(e),
            l = links.Timeline.getPageY(e),
            r = (null == i.mouseX && (i.mouseX = r), null == i.mouseY && (i.mouseY = l), r - i.mouseX),
            c = l - i.mouseY;
        1 <= Math.abs(c) && ((newy = $.mobile.window.scrollTop()), $.mobile.window.scrollTop(newy - c)),
            1 <= Math.abs(r) && (i.moved = !0),
            i.customTime
                ? ((c = this.timeToScreen(i.customTime)), (this.customTime = this.screenToTime(c + r)), this.repaintCustomTime(), this.trigger("timechange"))
                : i.editItem
                ? ((c = this.items[i.itemIndex]),
                  i.itemDragLeft && s.timeChangeable
                      ? ((n = i.itemLeft + r),
                        (t = i.itemRight),
                        (c.start = this.screenToTime(n)),
                        s.snapEvents && (this.step.snap(c.start), (n = this.timeToScreen(c.start))),
                        t < n && ((n = t), (c.start = this.screenToTime(n))),
                        this.trigger("change"))
                      : i.itemDragRight && s.timeChangeable
                      ? ((n = i.itemLeft),
                        (t = i.itemRight + r),
                        (c.end = this.screenToTime(t)),
                        s.snapEvents && (this.step.snap(c.end), (t = this.timeToScreen(c.end))),
                        t < n && ((t = n), (c.end = this.screenToTime(t))),
                        this.trigger("change"))
                      : s.timeChangeable &&
                        ((n = i.itemLeft + r),
                        (c.start = this.screenToTime(n)),
                        s.snapEvents && (this.step.snap(c.start), (n = this.timeToScreen(c.start))),
                        c.end && ((t = n + (i.itemRight - i.itemLeft)), (c.end = this.screenToTime(t))),
                        this.trigger("change")),
                  c.setPosition(n, t),
                  (n = i.itemDragLeft || i.itemDragRight),
                  this.groups.length && !n
                      ? ((t = l - i.frameTop),
                        (n = this.getGroupFromHeight(t)),
                        s.groupsChangeable && c.group !== n ? ((l = this.items.indexOf(c)), this.changeItem(l, { group: this.getGroupName(n) })) : (this.repaintDeleteButton(), this.repaintDragAreas()))
                      : this.render())
                : s.moveable &&
                  ((t = i.end.valueOf() - i.start.valueOf()),
                  (c = Math.round((-r / o.contentWidth) * t)),
                  (l = new Date(i.start.valueOf() + c)),
                  (n = new Date(i.end.valueOf() + c)),
                  this.applyRange(l, n),
                  (s = this.start.valueOf() - l.valueOf()) && (c += s),
                  this.recalcConversion(),
                  (r = i.previousLeft || 0),
                  (n = parseFloat(a.items.frame.style.left) || 0),
                  (l = (i.previousOffset || 0) + (n - r)),
                  (s = (-c / t) * o.contentWidth + l),
                  (a.items.frame.style.left = s + "px"),
                  (i.previousOffset = l),
                  (i.previousLeft = parseFloat(a.items.frame.style.left) || s),
                  this.repaintCurrentTime(),
                  this.repaintCustomTime(),
                  this.repaintAxis(),
                  this.trigger("rangechange")),
            links.Timeline.preventDefault(e);
    }),
    (links.Timeline.prototype.onMouseUp = function (e) {
        var t = this.eventParams,
            n = this.options;
        (e = e || window.event),
            (this.dom.frame.style.cursor = "auto"),
            t.onMouseMove && (links.Timeline.removeEventListener(document, "mousemove", t.onMouseMove), delete t.onMouseMove),
            t.onMouseUp && (links.Timeline.removeEventListener(document, "mouseup", t.onMouseUp), delete t.onMouseUp),
            t.customTime
                ? this.trigger("timechanged")
                : t.editItem
                ? ((e = this.items[t.itemIndex]),
                  (t.moved || t.addItem) &&
                      ((this.applyChange = !0),
                      (this.applyAdd = !0),
                      this.updateData(t.itemIndex, { start: e.start, end: e.end }),
                      this.trigger(t.addItem ? "add" : "changed"),
                      (e = this.items[t.itemIndex]),
                      t.addItem
                          ? this.applyAdd
                              ? this.updateData(t.itemIndex, { start: e.start, end: e.end, content: e.content, group: this.getGroupName(e.group) })
                              : this.deleteItem(t.itemIndex)
                          : this.applyChange
                          ? this.updateData(t.itemIndex, { start: e.start, end: e.end })
                          : (delete this.applyChange,
                            delete this.applyAdd,
                            (e = this.items[t.itemIndex]).dom,
                            (e.start = t.itemStart),
                            (e.end = t.itemEnd),
                            (e.group = t.itemGroup),
                            e.setPosition(t.itemLeft, t.itemRight),
                            this.updateData(t.itemIndex, { start: t.itemStart, end: t.itemEnd })),
                      this.options.cluster && this.clusterGenerator.updateData(),
                      this.render()))
                : t.moved || t.zoomed
                ? (this.render(), ((t.moved && n.moveable) || (t.zoomed && n.zoomable)) && this.trigger("rangechanged"))
                : t.target === this.dom.items.deleteButton
                ? this.selection && void 0 !== this.selection.index && this.confirmDeleteItem(this.selection.index)
                : n.selectable &&
                  (null != t.itemIndex
                      ? this.isSelected(t.itemIndex) || (this.selectItem(t.itemIndex), this.trigger("select"))
                      : null != t.clusterIndex
                      ? (this.selectCluster(t.clusterIndex), this.trigger("select"))
                      : n.unselectable && (this.unselectItem(), this.trigger("select")));
    }),
    (links.Timeline.prototype.onDblClick = function (e) {
        var t,
            n = this.eventParams,
            i = this.options,
            o = this.dom;
        this.size,
            (e = e || window.event),
            null != n.itemIndex
                ? (t = this.items[n.itemIndex]) && this.isEditable(t) && this.trigger("edit")
                : i.editable &&
                  ((n.mouseX = links.Timeline.getPageX(e)),
                  (n.mouseY = links.Timeline.getPageY(e)),
                  (t = n.mouseX - links.Timeline.getAbsoluteLeft(o.content)),
                  (o = n.mouseY - links.Timeline.getAbsoluteTop(o.content)),
                  (t = this.screenToTime(t)),
                  i.snapEvents && this.step.snap(t),
                  (i = i.NEW),
                  (o = this.getGroupFromHeight(o)),
                  this.addItem({ start: t, content: i, group: this.getGroupName(o) }, !0),
                  (n.itemIndex = this.items.length - 1),
                  this.selectItem(n.itemIndex),
                  (this.applyAdd = !0),
                  this.trigger("add"),
                  this.applyAdd ? (this.render({ animate: !1 }), this.selectItem(n.itemIndex)) : this.deleteItem(n.itemIndex)),
            links.Timeline.preventDefault(e);
    }),
    (links.Timeline.prototype.onMouseWheel = function (e) {
        var t, n, i, o;
        this.options.zoomable &&
            ((e = e || window.event),
            (n = 0),
            e.wheelDelta ? (n = e.wheelDelta / 120) : e.detail && (n = -e.detail / 3),
            n &&
                ((t = this),
                e.shiftKey ? t.move(-0.2 * n) : ((n = n / 5), (i = links.Timeline.getAbsoluteLeft(t.dom.content)), (o = null != (o = links.Timeline.getPageX(e)) && null != i ? t.screenToTime(o - i) : void 0), t.zoom(n, o)),
                t.trigger("rangechange"),
                t.trigger("rangechanged")),
            links.Timeline.preventDefault(e));
    }),
    (links.Timeline.prototype.zoom = function (e, t) {
        null == t && (t = new Date((this.start.valueOf() + this.end.valueOf()) / 2)), (e = (e = 1 <= e ? 0.9 : e) <= -1 ? -0.9 : e) < 0 && (e /= 1 + e);
        var n = this.start.valueOf() - t,
            i = this.end.valueOf() - t,
            n = new Date(this.start.valueOf() - n * e),
            i = new Date(this.end.valueOf() - i * e),
            e = i.valueOf() - n.valueOf(),
            o = Number(this.options.zoomMin) || 10;
        (o = o < 10 ? 10 : o) <= e && (this.applyRange(n, i, t), this.render({ animate: this.options.animate && this.options.animateZoom }));
    }),
    (links.Timeline.prototype.move = function (e) {
        var t = this.end.valueOf() - this.start.valueOf(),
            n = new Date(this.start.valueOf() + t * e),
            t = new Date(this.end.valueOf() + t * e);
        this.applyRange(n, t), this.render();
    }),
    (links.Timeline.prototype.applyRange = function (e, t, n) {
        var i,
            o,
            e = e.valueOf(),
            t = t.valueOf(),
            a = t - e,
            s = this.options,
            r = Number(s.zoomMin) || 10,
            l = (r < 10 && (r = 10), Number(s.zoomMax) || 31536e10),
            c = ((l = 31536e10 < l ? 31536e10 : l) < r && (l = r), s.min ? s.min.valueOf() : void 0),
            s = s.max ? s.max.valueOf() : void 0;
        t <= e && (t += 864e5),
            a < (r = null != c && null != s && (s <= c && (s = c + 864e5), s - c < l && (l = s - c), s - c < r) ? s - c : r) && ((o = r - a), (i = n ? (n.valueOf() - e) / a : 0.5), (e -= Math.round(o * i)), (t += Math.round(o * (1 - i)))),
            l < a && ((o = a - l), (i = n ? (n.valueOf() - e) / a : 0.5), (e += Math.round(o * i)), (t -= Math.round(o * (1 - i)))),
            null != c && (o = e - c) < 0 && ((e -= o), (t -= o)),
            null != s && (o = s - t) < 0 && ((e += o), (t += o)),
            (this.start = new Date(e)),
            (this.end = new Date(t));
    }),
    (links.Timeline.prototype.confirmDeleteItem = function (e) {
        (this.applyDelete = !0), this.isSelected(e) || this.selectItem(e), this.trigger("delete"), this.applyDelete && this.deleteItem(e), delete this.applyDelete;
    }),
    (links.Timeline.prototype.deleteItem = function (e, t) {
        if (e >= this.items.length) throw "Cannot delete row, index out of range";
        this.selection && void 0 !== this.selection.index && (this.selection.index == e ? this.unselectItem() : this.selection.index > e && this.selection.index--);
        var n = this.items.splice(e, 1)[0];
        if ((this.renderQueue.hide.push(n), this.data))
            if (google && google.visualization && this.data instanceof google.visualization.DataTable) this.data.removeRow(e);
            else {
                if (!links.Timeline.isArray(this.data)) throw "Cannot delete row from data, unknown data type";
                this.data.splice(e, 1);
            }
        this.options.cluster && this.clusterGenerator.updateData(), t || this.render();
    }),
    (links.Timeline.prototype.deleteAllItems = function () {
        if ((this.unselectItem(), this.clearItems(), this.deleteGroups(), this.data))
            if (google && google.visualization && this.data instanceof google.visualization.DataTable) this.data.removeRows(0, this.data.getNumberOfRows());
            else {
                if (!links.Timeline.isArray(this.data)) throw "Cannot delete row from data, unknown data type";
                this.data.splice(0, this.data.length);
            }
        this.options.cluster && this.clusterGenerator.updateData(), this.render();
    }),
    (links.Timeline.prototype.getGroupFromHeight = function (e) {
        var t,
            n,
            i = this.groups;
        if (i.length) {
            if (this.options.axisOnTop) {
                for (t = i.length - 1; 0 <= t; t--) if (e > (n = i[t]).top) return n;
            } else for (t = 0; t < i.length; t++) if (e > (n = i[t]).top) return n;
            return n;
        }
    }),
    (links.Timeline.Item = function (e, t) {
        if (
            (e && ((this.start = e.start), (this.end = e.end), (this.content = e.content), (this.className = e.className), (this.editable = e.editable), (this.group = e.group), (this.type = e.type)),
            (this.top = 0),
            (this.left = 0),
            (this.width = 0),
            (this.height = 0),
            (this.lineWidth = 0),
            (this.dotWidth = 0),
            (this.dotHeight = 0),
            (this.rendered = !1),
            t)
        )
            for (var n in t) t.hasOwnProperty(n) && (this[n] = t[n]);
    }),
    (links.Timeline.Item.prototype.reflow = function () {
        return !1;
    }),
    (links.Timeline.Item.prototype.getImageUrls = function (e) {
        this.dom && links.imageloader.filterImageUrls(this.dom, e);
    }),
    (links.Timeline.Item.prototype.select = function () {}),
    (links.Timeline.Item.prototype.unselect = function () {}),
    (links.Timeline.Item.prototype.createDOM = function () {}),
    (links.Timeline.Item.prototype.showDOM = function () {}),
    (links.Timeline.Item.prototype.hideDOM = function () {}),
    (links.Timeline.Item.prototype.updateDOM = function () {}),
    (links.Timeline.Item.prototype.updatePosition = function () {}),
    (links.Timeline.Item.prototype.isRendered = function () {
        return this.rendered;
    }),
    (links.Timeline.Item.prototype.isVisible = function () {
        return !1;
    }),
    (links.Timeline.Item.prototype.setPosition = function () {}),
    (links.Timeline.Item.prototype.getLeft = function () {
        return 0;
    }),
    (links.Timeline.Item.prototype.getRight = function () {
        return 0;
    }),
    (links.Timeline.Item.prototype.getWidth = function () {
        return this.width || 0;
    }),
    (links.Timeline.ItemBox = function (e, t) {
        links.Timeline.Item.call(this, e, t);
    }),
    (links.Timeline.ItemBox.prototype = new links.Timeline.Item()),
    (links.Timeline.ItemBox.prototype.reflow = function () {
        var e = this.dom,
            t = e.dot.offsetHeight,
            n = e.dot.offsetWidth,
            e = e.line.offsetWidth,
            i = this.dotHeight != t || this.dotWidth != n || this.lineWidth != e;
        return (this.dotHeight = t), (this.dotWidth = n), (this.lineWidth = e), i;
    }),
    (links.Timeline.ItemBox.prototype.select = function () {
        var e = this.dom;
        links.Timeline.addClassName(e, "timeline-event-selected ui-state-active"),
            links.Timeline.addClassName(e.line, "timeline-event-selected ui-state-active"),
            links.Timeline.addClassName(e.dot, "timeline-event-selected ui-state-active");
    }),
    (links.Timeline.ItemBox.prototype.unselect = function () {
        var e = this.dom;
        links.Timeline.removeClassName(e, "timeline-event-selected ui-state-active"),
            links.Timeline.removeClassName(e.line, "timeline-event-selected ui-state-active"),
            links.Timeline.removeClassName(e.dot, "timeline-event-selected ui-state-active");
    }),
    (links.Timeline.ItemBox.prototype.createDOM = function () {
        var e = document.createElement("DIV"),
            t = ((e.style.position = "absolute"), (e.style.left = this.left + "px"), (e.style.top = this.top + "px"), document.createElement("DIV")),
            t = ((t.className = "timeline-event-content"), (t.innerHTML = this.content), e.appendChild(t), document.createElement("DIV")),
            t = ((t.style.position = "absolute"), (t.style.width = "0px"), (e.line = t), document.createElement("DIV"));
        return (t.style.position = "absolute"), (t.style.width = "0px"), (t.style.height = "0px"), (e.dot = t), (this.dom = e), this.updateDOM(), e;
    }),
    (links.Timeline.ItemBox.prototype.showDOM = function (e) {
        var t = this.dom;
        (t = t || this.createDOM()).parentNode != e && (t.parentNode && this.hideDOM(), e.appendChild(t), e.insertBefore(t.line, e.firstChild), e.appendChild(t.dot), (this.rendered = !0));
    }),
    (links.Timeline.ItemBox.prototype.hideDOM = function () {
        var e = this.dom;
        e && (e.parentNode && e.parentNode.removeChild(e), e.line && e.line.parentNode && e.line.parentNode.removeChild(e.line), e.dot && e.dot.parentNode && e.dot.parentNode.removeChild(e.dot), (this.rendered = !1));
    }),
    (links.Timeline.ItemBox.prototype.updateDOM = function () {
        var e,
            t,
            n = this.dom;
        n &&
            ((e = n.line),
            (t = n.dot),
            (n.firstChild.innerHTML = this.content),
            (n.className = "timeline-event timeline-event-box ui-widget ui-state-default"),
            (e.className = "timeline-event timeline-event-line ui-widget ui-state-default"),
            (t.className = "timeline-event timeline-event-dot ui-widget ui-state-default"),
            this.isCluster &&
                (links.Timeline.addClassName(n, "timeline-event-cluster ui-widget-header"),
                links.Timeline.addClassName(e, "timeline-event-cluster ui-widget-header"),
                links.Timeline.addClassName(t, "timeline-event-cluster ui-widget-header")),
            this.className) &&
            (links.Timeline.addClassName(n, this.className), links.Timeline.addClassName(e, this.className), links.Timeline.addClassName(t, this.className));
    }),
    (links.Timeline.ItemBox.prototype.updatePosition = function (e) {
        var t,
            n,
            i,
            o,
            a = this.dom;
        a &&
            ((t = e.timeToScreen(this.start)),
            (n = e.options.axisOnTop),
            (i = e.size.axis.top),
            (o = e.size.axis.height),
            (e = e.options.box && e.options.box.align ? e.options.box.align : void 0),
            (a.style.top = this.top + "px"),
            (a.style.left = "right" == e ? t - this.width + "px" : "left" == e ? t + "px" : t - this.width / 2 + "px"),
            (e = a.line),
            (a = a.dot),
            (e.style.left = t - this.lineWidth / 2 + "px"),
            (a.style.left = t - this.dotWidth / 2 + "px"),
            n
                ? ((e.style.top = o + "px"), (e.style.height = Math.max(this.top - o, 0) + "px"), (a.style.top = o - this.dotHeight / 2 + "px"))
                : ((e.style.top = this.top + this.height + "px"), (e.style.height = Math.max(i - this.top - this.height, 0) + "px"), (a.style.top = i - this.dotHeight / 2 + "px")));
    }),
    (links.Timeline.ItemBox.prototype.isVisible = function (e, t) {
        return !this.cluster && this.start > e && this.start < t;
    }),
    (links.Timeline.ItemBox.prototype.setPosition = function (e) {
        var t = this.dom;
        (t.style.left = e - this.width / 2 + "px"), (t.line.style.left = e - this.lineWidth / 2 + "px"), (t.dot.style.left = e - this.dotWidth / 2 + "px"), this.group && ((this.top = this.group.top), (t.style.top = this.top + "px"));
    }),
    (links.Timeline.ItemBox.prototype.getLeft = function (e) {
        var t = e.options.box && e.options.box.align ? e.options.box.align : void 0;
        return e.timeToScreen(this.start) - ("right" == t ? width : this.width / 2);
    }),
    (links.Timeline.ItemBox.prototype.getRight = function (e) {
        var t = e.options.box && e.options.box.align ? e.options.box.align : void 0,
            e = e.timeToScreen(this.start);
        return "right" == t ? e : "left" == t ? e + this.width : e + this.width / 2;
    }),
    (links.Timeline.ItemRange = function (e, t) {
        links.Timeline.Item.call(this, e, t);
    }),
    (links.Timeline.ItemRange.prototype = new links.Timeline.Item()),
    (links.Timeline.ItemRange.prototype.select = function () {
        var e = this.dom;
        links.Timeline.addClassName(e, "timeline-event-selected ui-state-active");
    }),
    (links.Timeline.ItemRange.prototype.unselect = function () {
        var e = this.dom;
        links.Timeline.removeClassName(e, "timeline-event-selected ui-state-active");
    }),
    (links.Timeline.ItemRange.prototype.createDOM = function () {
        var e = document.createElement("DIV"),
            t = ((e.style.position = "absolute"), document.createElement("DIV"));
        return (t.className = "timeline-event-content"), e.appendChild(t), (this.dom = e), this.updateDOM(), e;
    }),
    (links.Timeline.ItemRange.prototype.showDOM = function (e) {
        var t = this.dom;
        (t = t || this.createDOM()).parentNode != e && (t.parentNode && this.hideDOM(), e.appendChild(t), (this.rendered = !0));
    }),
    (links.Timeline.ItemRange.prototype.hideDOM = function () {
        var e = this.dom;
        e && (e.parentNode && e.parentNode.removeChild(e), (this.rendered = !1));
    }),
    (links.Timeline.ItemRange.prototype.updateDOM = function () {
        var e = this.dom;
        e &&
            ((e.firstChild.innerHTML = this.content),
            (e.className = "timeline-event timeline-event-range ui-widget ui-state-default"),
            this.isCluster && links.Timeline.addClassName(e, "timeline-event-cluster ui-widget-header"),
            this.className) &&
            links.Timeline.addClassName(e, this.className);
    }),
    (links.Timeline.ItemRange.prototype.updatePosition = function (e) {
        var t,
            n,
            i = this.dom;
        i &&
            ((t = e.size.contentWidth),
            (n = e.timeToScreen(this.start)) < -t && (n = -t),
            2 * t < (e = e.timeToScreen(this.end)) && (e = 2 * t),
            (i.style.top = this.top + "px"),
            (i.style.left = n + "px"),
            (i.style.width = Math.max(e - n, 1) + "px"));
    }),
    (links.Timeline.ItemRange.prototype.isVisible = function (e, t) {
        return !this.cluster && this.end > e && this.start < t;
    }),
    (links.Timeline.ItemRange.prototype.setPosition = function (e, t) {
        var n = this.dom;
        (n.style.left = e + "px"), (n.style.width = t - e + "px"), this.group && ((this.top = this.group.top), (n.style.top = this.top + "px"));
    }),
    (links.Timeline.ItemRange.prototype.getLeft = function (e) {
        return e.timeToScreen(this.start);
    }),
    (links.Timeline.ItemRange.prototype.getRight = function (e) {
        return e.timeToScreen(this.end);
    }),
    (links.Timeline.ItemRange.prototype.getWidth = function (e) {
        return e.timeToScreen(this.end) - e.timeToScreen(this.start);
    }),
    (links.Timeline.ItemFloatingRange = function (e, t) {
        links.Timeline.Item.call(this, e, t);
    }),
    (links.Timeline.ItemFloatingRange.prototype = new links.Timeline.Item()),
    (links.Timeline.ItemFloatingRange.prototype.select = function () {
        var e = this.dom;
        links.Timeline.addClassName(e, "timeline-event-selected ui-state-active");
    }),
    (links.Timeline.ItemFloatingRange.prototype.unselect = function () {
        var e = this.dom;
        links.Timeline.removeClassName(e, "timeline-event-selected ui-state-active");
    }),
    (links.Timeline.ItemFloatingRange.prototype.createDOM = function () {
        var e = document.createElement("DIV"),
            t = ((e.style.position = "absolute"), document.createElement("DIV"));
        return (t.className = "timeline-event-content"), e.appendChild(t), (this.dom = e), this.updateDOM(), e;
    }),
    (links.Timeline.ItemFloatingRange.prototype.showDOM = function (e) {
        var t = this.dom;
        (t = t || this.createDOM()).parentNode != e && (t.parentNode && this.hideDOM(), e.appendChild(t), (this.rendered = !0));
    }),
    (links.Timeline.ItemFloatingRange.prototype.hideDOM = function () {
        var e = this.dom;
        e && (e.parentNode && e.parentNode.removeChild(e), (this.rendered = !1));
    }),
    (links.Timeline.ItemFloatingRange.prototype.updateDOM = function () {
        var e = this.dom;
        e &&
            ((e.firstChild.innerHTML = this.content),
            (e.className = "timeline-event timeline-event-range ui-widget ui-state-default"),
            this.isCluster && links.Timeline.addClassName(e, "timeline-event-cluster ui-widget-header"),
            this.className) &&
            links.Timeline.addClassName(e, this.className);
    }),
    (links.Timeline.ItemFloatingRange.prototype.updatePosition = function (e) {
        var t,
            n,
            i = this.dom;
        i && ((t = e.size.contentWidth), (n = this.getLeft(e)) < -t && (n = -t), 2 * t < (e = this.getRight(e)) && (e = 2 * t), (i.style.top = this.top + "px"), (i.style.left = n + "px"), (i.style.width = Math.max(e - n, 1) + "px"));
    }),
    (links.Timeline.ItemFloatingRange.prototype.isVisible = function (e, t) {
        return !this.cluster && (this.end && this.start ? this.end > e && this.start < t : this.start ? this.start < t : !this.end || this.end > e);
    }),
    (links.Timeline.ItemFloatingRange.prototype.setPosition = function (e, t) {
        var n = this.dom;
        (n.style.left = e + "px"), (n.style.width = t - e + "px"), this.group && ((this.top = this.group.top), (n.style.top = this.top + "px"));
    }),
    (links.Timeline.ItemFloatingRange.prototype.getLeft = function (e) {
        return this.start ? e.timeToScreen(this.start) : 0;
    }),
    (links.Timeline.ItemFloatingRange.prototype.getRight = function (e) {
        return this.end ? e.timeToScreen(this.end) : e.size.contentWidth;
    }),
    (links.Timeline.ItemFloatingRange.prototype.getWidth = function (e) {
        return this.getRight(e) - this.getLeft(e);
    }),
    (links.Timeline.ItemDot = function (e, t) {
        links.Timeline.Item.call(this, e, t);
    }),
    (links.Timeline.ItemDot.prototype = new links.Timeline.Item()),
    (links.Timeline.ItemDot.prototype.reflow = function () {
        var e = this.dom,
            t = e.dot.offsetHeight,
            n = e.dot.offsetWidth,
            e = e.content.offsetHeight,
            i = this.dotHeight != t || this.dotWidth != n || this.contentHeight != e;
        return (this.dotHeight = t), (this.dotWidth = n), (this.contentHeight = e), i;
    }),
    (links.Timeline.ItemDot.prototype.select = function () {
        var e = this.dom;
        links.Timeline.addClassName(e, "timeline-event-selected ui-state-active");
    }),
    (links.Timeline.ItemDot.prototype.unselect = function () {
        var e = this.dom;
        links.Timeline.removeClassName(e, "timeline-event-selected ui-state-active");
    }),
    (links.Timeline.ItemDot.prototype.createDOM = function () {
        var e = document.createElement("DIV"),
            t = ((e.style.position = "absolute"), document.createElement("DIV")),
            n = ((t.className = "timeline-event-content"), e.appendChild(t), document.createElement("DIV"));
        return (n.style.position = "absolute"), (n.style.width = "0px"), (n.style.height = "0px"), e.appendChild(n), (e.content = t), (e.dot = n), (this.dom = e), this.updateDOM(), e;
    }),
    (links.Timeline.ItemDot.prototype.showDOM = function (e) {
        var t = this.dom;
        (t = t || this.createDOM()).parentNode != e && (t.parentNode && this.hideDOM(), e.appendChild(t), (this.rendered = !0));
    }),
    (links.Timeline.ItemDot.prototype.hideDOM = function () {
        var e = this.dom;
        e && (e.parentNode && e.parentNode.removeChild(e), (this.rendered = !1));
    }),
    (links.Timeline.ItemDot.prototype.updateDOM = function () {
        var e, t;
        this.dom &&
            ((t = (e = this.dom).dot),
            (e.firstChild.innerHTML = this.content),
            (e.className = "timeline-event-dot-container"),
            (t.className = "timeline-event timeline-event-dot ui-widget ui-state-default"),
            this.isCluster && (links.Timeline.addClassName(e, "timeline-event-cluster ui-widget-header"), links.Timeline.addClassName(t, "timeline-event-cluster ui-widget-header")),
            this.className) &&
            (links.Timeline.addClassName(e, this.className), links.Timeline.addClassName(t, this.className));
    }),
    (links.Timeline.ItemDot.prototype.updatePosition = function (e) {
        var t = this.dom;
        t &&
            ((e = e.timeToScreen(this.start)),
            (t.style.top = this.top + "px"),
            (t.style.left = e - this.dotWidth / 2 + "px"),
            (t.content.style.marginLeft = 1.5 * this.dotWidth + "px"),
            (t.dot.style.top = (this.height - this.dotHeight) / 2 + "px"));
    }),
    (links.Timeline.ItemDot.prototype.isVisible = function (e, t) {
        return !this.cluster && this.start > e && this.start < t;
    }),
    (links.Timeline.ItemDot.prototype.setPosition = function (e) {
        var t = this.dom;
        (t.style.left = e - this.dotWidth / 2 + "px"), this.group && ((this.top = this.group.top), (t.style.top = this.top + "px"));
    }),
    (links.Timeline.ItemDot.prototype.getLeft = function (e) {
        return e.timeToScreen(this.start);
    }),
    (links.Timeline.ItemDot.prototype.getRight = function (e) {
        return e.timeToScreen(this.start) + this.width;
    }),
    (links.Timeline.prototype.getItem = function (e) {
        if (e >= this.items.length) throw "Cannot get item, index out of range";
        var t = this.data;
        if (google && google.visualization && t instanceof google.visualization.DataTable) {
            var n,
                i = links.Timeline.mapColumnIds(t),
                o = {};
            for (n in i) i.hasOwnProperty(n) && (o[n] = this.data.getValue(e, i[n]));
        } else {
            if (!links.Timeline.isArray(this.data)) throw "Unknown data type. DataTable or Array expected.";
            o = links.Timeline.clone(this.data[e]);
        }
        t = this.items[e];
        return (
            (o.start = new Date(t.start.valueOf())),
            t.end && (o.end = new Date(t.end.valueOf())),
            (o.content = t.content),
            t.group && (o.group = this.getGroupName(t.group)),
            t.className && (o.className = t.className),
            void 0 !== t.editable && (o.editable = t.editable),
            t.type && (o.type = t.type),
            o
        );
    }),
    (links.Timeline.prototype.getCluster = function (e) {
        if (e >= this.clusters.length) throw "Cannot get cluster, index out of range";
        var t = {},
            e = this.clusters[e],
            n = e.items;
        (t.start = new Date(e.start.valueOf())), e.type && (t.type = e.type), (t.items = []);
        for (var i = 0; i < n.length; i++)
            for (var o = 0; o < this.items.length; o++)
                if (this.items[o] == n[i]) {
                    t.items.push(this.getItem(o));
                    break;
                }
        return t;
    }),
    (links.Timeline.prototype.addItem = function (e, t) {
        this.addItems([e], t);
    }),
    (links.Timeline.prototype.addItems = function (e, t) {
        var n = this,
            i = this.items;
        e.forEach(function (e) {
            var t = i.length;
            i.push(n.createItem(e)), n.updateData(t, e);
        }),
            this.options.cluster && this.clusterGenerator.updateData(),
            t || this.render({ animate: !1 });
    }),
    (links.Timeline.prototype.createItem = function (e) {
        var t = e.type || (e.end ? "range" : this.options.style),
            n = links.Timeline.clone(e);
        (n.type = t), (n.group = this.getGroup(e.group));
        (e = this.options), (e = e.axisOnTop ? this.size.axis.height + e.eventMarginAxis + e.eventMargin / 2 : this.size.contentHeight - e.eventMarginAxis - e.eventMargin / 2);
        return new (t in this.itemTypes ? this.itemTypes[t] : (console.log('ERROR: Unknown event type "' + t + '"'), links.Timeline.Item))(n, { top: e });
    }),
    (links.Timeline.prototype.changeItem = function (e, t, n) {
        var i = this.items[e];
        if (!i) throw "Cannot change item, index out of range";
        var o = this.createItem({
            start: (t.hasOwnProperty("start") ? t : i).start,
            end: (t.hasOwnProperty("end") ? t : i).end,
            content: (t.hasOwnProperty("content") ? t : i).content,
            group: t.hasOwnProperty("group") ? t.group : this.getGroupName(i.group),
            className: (t.hasOwnProperty("className") ? t : i).className,
            editable: (t.hasOwnProperty("editable") ? t : i).editable,
            type: (t.hasOwnProperty("type") ? t : i).type,
        });
        (this.items[e] = o),
            this.renderQueue.hide.push(i),
            this.renderQueue.show.push(o),
            this.updateData(e, t),
            this.options.cluster && this.clusterGenerator.updateData(),
            n || (this.render({ animate: !1 }), this.selection && this.selection.index == e && o.select());
    }),
    (links.Timeline.prototype.deleteGroups = function () {
        (this.groups = []), (this.groupIndexes = {});
    }),
    (links.Timeline.prototype.getGroup = function (e) {
        var t = this.groups,
            n = this.groupIndexes,
            i = void 0,
            o = n[e];
        if (null == o && null != e) {
            t.push((i = { content: e, labelTop: 0, lineTop: 0 })),
                1 == this.options.groupsOrder
                    ? (t = t.sort(function (e, t) {
                          return e.content > t.content ? 1 : e.content < t.content ? -1 : 0;
                      }))
                    : "function" == typeof this.options.groupsOrder && (t = t.sort(this.options.groupsOrder));
            for (var a = 0, s = t.length; a < s; a++) n[t[a].content] = a;
        } else i = t[o];
        return i;
    }),
    (links.Timeline.prototype.getGroupName = function (e) {
        return e ? e.content : void 0;
    }),
    (links.Timeline.prototype.cancelChange = function () {
        this.applyChange = !1;
    }),
    (links.Timeline.prototype.cancelDelete = function () {
        this.applyDelete = !1;
    }),
    (links.Timeline.prototype.cancelAdd = function () {
        this.applyAdd = !1;
    }),
    (links.Timeline.prototype.setSelection = function (e) {
        if (null != e && 0 < e.length) {
            if (null != e[0].row) {
                var t,
                    n,
                    e = e[0].row;
                if (this.items[e])
                    return (
                        (n = this.items[e]),
                        this.selectItem(e),
                        (e = n.start),
                        (n = null != (n = n.end) ? (n.valueOf() + e.valueOf()) / 2 : e.valueOf()),
                        (e = this.end.valueOf() - this.start.valueOf()),
                        (t = new Date(n - e / 2)),
                        (n = new Date(n + e / 2)),
                        this.setVisibleChartRange(t, n),
                        !0
                    );
            }
        } else this.unselectItem();
        return !1;
    }),
    (links.Timeline.prototype.getSelection = function () {
        var e = [];
        return this.selection && e.push(void 0 !== this.selection.index ? { row: this.selection.index } : { cluster: this.selection.cluster }), e;
    }),
    (links.Timeline.prototype.selectItem = function (e) {
        var t;
        this.unselectItem(),
            (this.selection = void 0),
            null != this.items[e] && ((t = this.items[e]).dom, (this.selection = { index: e }), t && t.dom && (this.isEditable(t) && (t.dom.style.cursor = "move"), t.select()), this.repaintDeleteButton(), this.repaintDragAreas());
    }),
    (links.Timeline.prototype.selectCluster = function (e) {
        this.unselectItem(), (this.selection = void 0), null != this.clusters[e] && ((this.selection = { cluster: e }), this.repaintDeleteButton(), this.repaintDragAreas());
    }),
    (links.Timeline.prototype.isSelected = function (e) {
        return this.selection && this.selection.index == e;
    }),
    (links.Timeline.prototype.unselectItem = function () {
        var e;
        this.selection && void 0 !== this.selection.index && ((e = this.items[this.selection.index]) && e.dom && ((e.dom.style.cursor = ""), e.unselect()), (this.selection = void 0), this.repaintDeleteButton(), this.repaintDragAreas());
    }),
    (links.Timeline.prototype.stackItems = function (e) {
        null == e && (e = !1);
        var t,
            n,
            i = this.stack;
        i || ((i = {}), (this.stack = i)),
            (i.sortedItems = this.stackOrder(this.renderedItems)),
            (i.finalItems = this.stackCalculateFinal(i.sortedItems)),
            e || i.timer
                ? ((t = this),
                  (n = function () {
                      var e = t.stackMoveOneStep(i.sortedItems, i.finalItems);
                      t.repaint(), e ? delete i.timer : (i.timer = setTimeout(n, 30));
                  }),
                  i.timer || (i.timer = setTimeout(n, 30)))
                : this.stackMoveToFinal(i.sortedItems, i.finalItems);
    }),
    (links.Timeline.prototype.stackCancelAnimation = function () {
        this.stack && this.stack.timer && (clearTimeout(this.stack.timer), delete this.stack.timer);
    }),
    (links.Timeline.prototype.getItemsByGroup = function (e) {
        for (var t = {}, n = 0; n < e.length; ++n) {
            var i = e[n],
                o = "undefined";
            t[(o = i.group ? i.group.content || i.group : o)] || (t[o] = []), t[o].push(i);
        }
        return t;
    }),
    (links.Timeline.prototype.stackOrder = function (e) {
        var e = e.concat([]),
            t =
                this.options.customStackOrder && "function" == typeof this.options.customStackOrder
                    ? this.options.customStackOrder
                    : function (e, t) {
                          return (e instanceof links.Timeline.ItemRange || e instanceof links.Timeline.ItemFloatingRange) && !(t instanceof links.Timeline.ItemRange || t instanceof links.Timeline.ItemFloatingRange)
                              ? -1
                              : e instanceof links.Timeline.ItemRange || e instanceof links.Timeline.ItemFloatingRange || !(t instanceof links.Timeline.ItemRange || t instanceof links.Timeline.ItemFloatingRange)
                              ? e.left - t.left
                              : 1;
                      };
        return e.sort(t), e;
    }),
    (links.Timeline.prototype.stackCalculateFinal = function (e) {
        var t = this.size,
            n = this.options,
            i = n.axisOnTop,
            o = n.eventMargin,
            a = n.eventMarginAxis,
            s = i ? t.axis.height + a + o / 2 : t.contentHeight - a - o / 2,
            r = [],
            l = this.getItemsByGroup(e);
        for (j = 0; j < this.groups.length; ++j) {
            var c = this.groups[j];
            l[c.content]
                ? (this.finalItemsPosition(l[c.content], s, c).forEach(function (e) {
                      r.push(e);
                  }),
                  i ? (s += c.itemsHeight + o) : (s -= c.itemsHeight + o))
                : i
                ? (s += n.groupMinHeight + o)
                : (s -= n.groupMinHeight + o);
        }
        return (
            l.undefined &&
                this.finalItemsPosition(l.undefined, s).forEach(function (e) {
                    r.push(e);
                }),
            r
        );
    }),
    (links.Timeline.prototype.finalItemsPosition = function (e, t, n) {
        for (var i = this.options, o = i.axisOnTop, a = i.eventMargin, s = this.initialItemsPosition(e, t), r = 0, l = s.length; r < l; r++) {
            var c,
                d = s[r];
            if (this.options.stackEvents) for (; null != (c = this.stackItemsCheckOverlap(s, r, 0, r - 1)) && ((d.top = o ? c.top + c.height + a : c.top - d.height - a), (d.bottom = d.top + d.height)), c; );
            n && (n.itemsHeight = o ? (n.itemsHeight ? Math.max(n.itemsHeight, d.bottom - t) : d.height + a) : n.itemsHeight ? Math.max(n.itemsHeight, t - d.top) : d.height + a);
        }
        return s;
    }),
    (links.Timeline.prototype.initialItemsPosition = function (e, t) {
        for (var n = this.options.axisOnTop, i = [], o = 0, a = e.length; o < a; ++o) {
            var s = e[o],
                r = s.height,
                l = s.getWidth(this),
                c = s.getRight(this),
                d = n ? t : t - r;
            i.push({ left: c - l, top: d, right: c, bottom: d + r, height: r, item: s });
        }
        return i;
    }),
    (links.Timeline.prototype.stackMoveOneStep = function (e, t) {
        for (var n = !0, i = 0, o = t.length; i < o; i++) {
            var a,
                s = t[i],
                r = s.item,
                l = parseInt(r.top),
                c = parseInt(s.top),
                d = c - l;
            d ? ((a = c == l ? 0 : l < c ? 1 : -1), 4 < Math.abs(d) && (a = d / 4), (d = parseInt(l + a)) != c && (n = !1), (r.top = d), (r.bottom = r.top + r.height)) : ((r.top = s.top), (r.bottom = s.bottom)),
                (r.left = s.left),
                (r.right = s.right);
        }
        return n;
    }),
    (links.Timeline.prototype.stackMoveToFinal = function (e, t) {
        for (var n = 0, i = t.length; n < i; n++) {
            var o = t[n],
                a = o.item;
            (a.left = o.left), (a.top = o.top), (a.right = o.right), (a.bottom = o.bottom);
        }
    }),
    (links.Timeline.prototype.stackItemsCheckOverlap = function (e, t, n, i) {
        for (var o = this.options.eventMargin, a = this.collision, s = e[t], r = i; n <= r; r--) {
            var l = e[r];
            if (a(s, l, o) && r != t) return l;
        }
    }),
    (links.Timeline.prototype.collision = function (e, t, n) {
        return e.left - (n = null == n ? 0 : n) < t.right && e.right + n > t.left && e.top - n < t.bottom && e.bottom + n > t.top;
    }),
    (links.Timeline.prototype.trigger = function (e) {
        var t = null;
        switch (e) {
            case "rangechange":
            case "rangechanged":
                t = { start: new Date(this.start.valueOf()), end: new Date(this.end.valueOf()) };
                break;
            case "timechange":
            case "timechanged":
                t = { time: new Date(this.customTime.valueOf()) };
        }
        links.events.trigger(this, e, t), google && google.visualization && google.visualization.events.trigger(this, e, t);
    }),
    (links.Timeline.prototype.clusterItems = function () {
        var e, t;
        this.options.cluster &&
            ((e = this.clusterGenerator.getClusters(this.conversion.factor, this.options.clusterMaxItems)), this.clusters != e) &&
            ((t = this.renderQueue),
            this.clusters &&
                this.clusters.forEach(function (e) {
                    t.hide.push(e),
                        e.items.forEach(function (e) {
                            e.cluster = void 0;
                        });
                }),
            e.forEach(function (t) {
                t.items.forEach(function (e) {
                    e.cluster = t;
                });
            }),
            (this.clusters = e));
    }),
    (links.Timeline.prototype.filterItems = function () {
        function e(e) {
            e.forEach(function (e) {
                var t = e.rendered,
                    n = e.isVisible(o, a);
                t != n && (t && i.hide.push(e), n) && -1 == i.show.indexOf(e) && i.show.push(e);
            });
        }
        var i = this.renderQueue,
            t = this.end - this.start,
            o = new Date(this.start.valueOf() - t),
            a = new Date(this.end.valueOf() + t);
        e(this.items), this.clusters && e(this.clusters);
    }),
    (links.Timeline.ClusterGenerator = function (e) {
        (this.timeline = e), this.clear();
    }),
    (links.Timeline.ClusterGenerator.prototype.clear = function () {
        (this.items = []), (this.groups = {}), this.clearCache();
    }),
    (links.Timeline.ClusterGenerator.prototype.clearCache = function () {
        (this.cache = {}), (this.cacheLevel = -1), (this.cache[this.cacheLevel] = []);
    }),
    (links.Timeline.ClusterGenerator.prototype.setData = function (e, t) {
        (this.items = e || []), (this.dataChanged = !0), (this.applyOnChangedLevel = !0), t && t.applyOnChangedLevel && (this.applyOnChangedLevel = t.applyOnChangedLevel);
    }),
    (links.Timeline.ClusterGenerator.prototype.updateData = function () {
        (this.dataChanged = !0), (this.applyOnChangedLevel = !1);
    }),
    (links.Timeline.ClusterGenerator.prototype.filterData = function () {
        var e,
            t = this.items || [],
            i = {};
        for (e in ((this.groups = i),
        t.forEach(function (e) {
            var t = e.group ? e.group.content : "",
                n = i[t];
            n || (i[t] = n = []), n.push(e), e.start && (e.center = e.end ? (e.start.valueOf() + e.end.valueOf()) / 2 : e.start.valueOf());
        }),
        i))
            i.hasOwnProperty(e) &&
                i[e].sort(function (e, t) {
                    return e.center - t.center;
                });
        this.dataChanged = !1;
    }),
    (links.Timeline.ClusterGenerator.prototype.getClusters = function (e, t) {
        var n = -1,
            i = 0,
            o =
                (0 < e && ((n = Math.round(Math.log(100 / e) / Math.log(2))), (i = Math.pow(2, n))),
                this.dataChanged && ((e = n != this.cacheLevel), (this.applyOnChangedLevel && !e) || (this.clearCache(), this.filterData())),
                (this.cacheLevel = n),
                this.cache[n]);
        if (!o) {
            for (var a in ((o = []), this.groups))
                if (this.groups.hasOwnProperty(a))
                    for (var s = this.groups[a], r = s.length, l = 0; l < r; ) {
                        for (var c = s[l], d = 1, u = l - 1; 0 <= u && c.center - s[u].center < i / 2; ) s[u].cluster || d++, u--;
                        for (var p = l + 1; p < s.length && s[p].center - c.center < i / 2; ) d++, p++;
                        for (var h = o.length - 1; 0 <= h && c.center - o[h].center < i / 2; ) c.group == o[h].group && d++, h--;
                        if (t < d) {
                            for (var f = d - t + 1, m = [], g = void 0, v = void 0, b = void 0, y = !1, w = 0, S = l; m.length < f && S < s.length; ) {
                                var k = s[S],
                                    T = k.start.valueOf(),
                                    x = (k.end || k.start).valueOf();
                                m.push(k),
                                    (g = w ? (w / (w + 1)) * g + (1 / (w + 1)) * k.center : k.center),
                                    (v = null != v ? Math.min(v, T) : T),
                                    (b = null != b ? Math.max(b, x) : x),
                                    (y = y || k instanceof links.Timeline.ItemRange || k instanceof links.Timeline.ItemFloatingRange),
                                    w++,
                                    S++;
                            }
                            var _ = '<div title="' + ("Cluster containing " + w + " events. Zoom in to see the individual events.") + '">' + w + " events</div>",
                                C = c.group ? c.group.content : void 0,
                                D = this.timeline.createItem(y ? { start: new Date(v), end: new Date(b), content: _, group: C } : { start: new Date(g), content: _, group: C });
                            (D.isCluster = !0),
                                (D.items = m),
                                D.items.forEach(function (e) {
                                    e.cluster = D;
                                }),
                                o.push(D),
                                (l += f);
                        } else delete c.cluster, (l += 1);
                    }
            this.cache[n] = o;
        }
        return o;
    }),
    (links.events = links.events || {
        listeners: [],
        indexOf: function (e) {
            for (var t = this.listeners, n = 0, i = this.listeners.length; n < i; n++) {
                var o = t[n];
                if (o && o.object == e) return n;
            }
            return -1;
        },
        addListener: function (e, t, n) {
            var i = this.indexOf(e),
                i = this.listeners[i],
                e = (i || this.listeners.push((i = { object: e, events: {} })), i.events[t]);
            e || (i.events[t] = e = []), -1 == e.indexOf(n) && e.push(n);
        },
        removeListener: function (e, t, n) {
            var e = this.indexOf(e),
                i = this.listeners[e];
            if (i) {
                var o,
                    a = i.events[t],
                    s = (a && (-1 != (e = a.indexOf(n)) && a.splice(e, 1), 0 == a.length) && delete i.events[t], 0),
                    r = i.events;
                for (o in r) r.hasOwnProperty(o) && s++;
                0 == s && delete this.listeners[e];
            }
        },
        removeAllListeners: function () {
            this.listeners = [];
        },
        trigger: function (e, t, n) {
            (e = this.indexOf(e)), (e = this.listeners[e]);
            if (e) {
                var i = e.events[t];
                if (i) for (var o = 0, a = i.length; o < a; o++) i[o](n);
            }
        },
    }),
    (links.Timeline.StepDate = function (e, t, n) {
        (this.current = new Date()), (this._start = new Date()), (this._end = new Date()), (this.autoScale = !0), (this.scale = links.Timeline.StepDate.SCALE.DAY), (this.step = 1), this.setRange(e, t, n);
    }),
    (links.Timeline.StepDate.SCALE = { MILLISECOND: 1, SECOND: 2, MINUTE: 3, HOUR: 4, DAY: 5, WEEKDAY: 6, MONTH: 7, YEAR: 8 }),
    (links.Timeline.StepDate.prototype.setRange = function (e, t, n) {
        e instanceof Date && t instanceof Date && ((this._start = null != e ? new Date(e.valueOf()) : new Date()), (this._end = null != t ? new Date(t.valueOf()) : new Date()), this.autoScale) && this.setMinimumStep(n);
    }),
    (links.Timeline.StepDate.prototype.start = function () {
        (this.current = new Date(this._start.valueOf())), this.roundToMinor();
    }),
    (links.Timeline.StepDate.prototype.roundToMinor = function () {
        switch (this.scale) {
            case links.Timeline.StepDate.SCALE.YEAR:
                this.current.setFullYear(this.step * Math.floor(this.current.getFullYear() / this.step)), this.current.setMonth(0);
            case links.Timeline.StepDate.SCALE.MONTH:
                this.current.setDate(1);
            case links.Timeline.StepDate.SCALE.DAY:
            case links.Timeline.StepDate.SCALE.WEEKDAY:
                this.current.setHours(0);
            case links.Timeline.StepDate.SCALE.HOUR:
                this.current.setMinutes(0);
            case links.Timeline.StepDate.SCALE.MINUTE:
                this.current.setSeconds(0);
            case links.Timeline.StepDate.SCALE.SECOND:
                this.current.setMilliseconds(0);
        }
        if (1 != this.step)
            switch (this.scale) {
                case links.Timeline.StepDate.SCALE.MILLISECOND:
                    this.current.setMilliseconds(this.current.getMilliseconds() - (this.current.getMilliseconds() % this.step));
                    break;
                case links.Timeline.StepDate.SCALE.SECOND:
                    this.current.setSeconds(this.current.getSeconds() - (this.current.getSeconds() % this.step));
                    break;
                case links.Timeline.StepDate.SCALE.MINUTE:
                    this.current.setMinutes(this.current.getMinutes() - (this.current.getMinutes() % this.step));
                    break;
                case links.Timeline.StepDate.SCALE.HOUR:
                    this.current.setHours(this.current.getHours() - (this.current.getHours() % this.step));
                    break;
                case links.Timeline.StepDate.SCALE.WEEKDAY:
                case links.Timeline.StepDate.SCALE.DAY:
                    this.current.setDate(this.current.getDate() - 1 - ((this.current.getDate() - 1) % this.step) + 1);
                    break;
                case links.Timeline.StepDate.SCALE.MONTH:
                    this.current.setMonth(this.current.getMonth() - (this.current.getMonth() % this.step));
                    break;
                case links.Timeline.StepDate.SCALE.YEAR:
                    this.current.setFullYear(this.current.getFullYear() - (this.current.getFullYear() % this.step));
            }
    }),
    (links.Timeline.StepDate.prototype.end = function () {
        return this.current.valueOf() > this._end.valueOf();
    }),
    (links.Timeline.StepDate.prototype.next = function () {
        var e = this.current.valueOf();
        if (this.current.getMonth() < 6)
            switch (this.scale) {
                case links.Timeline.StepDate.SCALE.MILLISECOND:
                    this.current = new Date(this.current.valueOf() + this.step);
                    break;
                case links.Timeline.StepDate.SCALE.SECOND:
                    this.current = new Date(this.current.valueOf() + 1e3 * this.step);
                    break;
                case links.Timeline.StepDate.SCALE.MINUTE:
                    this.current = new Date(this.current.valueOf() + 1e3 * this.step * 60);
                    break;
                case links.Timeline.StepDate.SCALE.HOUR:
                    this.current = new Date(this.current.valueOf() + 1e3 * this.step * 60 * 60);
                    var t = this.current.getHours();
                    this.current.setHours(t - (t % this.step));
                    break;
                case links.Timeline.StepDate.SCALE.WEEKDAY:
                case links.Timeline.StepDate.SCALE.DAY:
                    this.current.setDate(this.current.getDate() + this.step);
                    break;
                case links.Timeline.StepDate.SCALE.MONTH:
                    this.current.setMonth(this.current.getMonth() + this.step);
                    break;
                case links.Timeline.StepDate.SCALE.YEAR:
                    this.current.setFullYear(this.current.getFullYear() + this.step);
            }
        else
            switch (this.scale) {
                case links.Timeline.StepDate.SCALE.MILLISECOND:
                    this.current = new Date(this.current.valueOf() + this.step);
                    break;
                case links.Timeline.StepDate.SCALE.SECOND:
                    this.current.setSeconds(this.current.getSeconds() + this.step);
                    break;
                case links.Timeline.StepDate.SCALE.MINUTE:
                    this.current.setMinutes(this.current.getMinutes() + this.step);
                    break;
                case links.Timeline.StepDate.SCALE.HOUR:
                    this.current.setHours(this.current.getHours() + this.step);
                    break;
                case links.Timeline.StepDate.SCALE.WEEKDAY:
                case links.Timeline.StepDate.SCALE.DAY:
                    this.current.setDate(this.current.getDate() + this.step);
                    break;
                case links.Timeline.StepDate.SCALE.MONTH:
                    this.current.setMonth(this.current.getMonth() + this.step);
                    break;
                case links.Timeline.StepDate.SCALE.YEAR:
                    this.current.setFullYear(this.current.getFullYear() + this.step);
            }
        if (1 != this.step)
            switch (this.scale) {
                case links.Timeline.StepDate.SCALE.MILLISECOND:
                    this.current.getMilliseconds() < this.step && this.current.setMilliseconds(0);
                    break;
                case links.Timeline.StepDate.SCALE.SECOND:
                    this.current.getSeconds() < this.step && this.current.setSeconds(0);
                    break;
                case links.Timeline.StepDate.SCALE.MINUTE:
                    this.current.getMinutes() < this.step && this.current.setMinutes(0);
                    break;
                case links.Timeline.StepDate.SCALE.HOUR:
                    this.current.getHours() < this.step && this.current.setHours(0);
                    break;
                case links.Timeline.StepDate.SCALE.WEEKDAY:
                case links.Timeline.StepDate.SCALE.DAY:
                    this.current.getDate() < this.step + 1 && this.current.setDate(1);
                    break;
                case links.Timeline.StepDate.SCALE.MONTH:
                    this.current.getMonth() < this.step && this.current.setMonth(0);
                    break;
                case links.Timeline.StepDate.SCALE.YEAR:
            }
        this.current.valueOf() == e && (this.current = new Date(this._end.valueOf()));
    }),
    (links.Timeline.StepDate.prototype.getCurrent = function () {
        return this.current;
    }),
    (links.Timeline.StepDate.prototype.setScale = function (e, t) {
        (this.scale = e), 0 < t && (this.step = t), (this.autoScale = !1);
    }),
    (links.Timeline.StepDate.prototype.setAutoScale = function (e) {
        this.autoScale = e;
    }),
    (links.Timeline.StepDate.prototype.setMinimumStep = function (e) {
        var t;
        null != e &&
            ((t = 31104e6),
            e < 31104e9 && ((this.scale = links.Timeline.StepDate.SCALE.YEAR), (this.step = 1e3)),
            e < 15552e9 && ((this.scale = links.Timeline.StepDate.SCALE.YEAR), (this.step = 500)),
            e < 31104e8 && ((this.scale = links.Timeline.StepDate.SCALE.YEAR), (this.step = 100)),
            e < 50 * t && ((this.scale = links.Timeline.StepDate.SCALE.YEAR), (this.step = 50)),
            e < 10 * t && ((this.scale = links.Timeline.StepDate.SCALE.YEAR), (this.step = 10)),
            e < 5 * t && ((this.scale = links.Timeline.StepDate.SCALE.YEAR), (this.step = 5)),
            e < t && ((this.scale = links.Timeline.StepDate.SCALE.YEAR), (this.step = 1)),
            e < 7776e6 && ((this.scale = links.Timeline.StepDate.SCALE.MONTH), (this.step = 3)),
            e < 2592e6 && ((this.scale = links.Timeline.StepDate.SCALE.MONTH), (this.step = 1)),
            e < 432e6 && ((this.scale = links.Timeline.StepDate.SCALE.DAY), (this.step = 5)),
            e < 1728e5 && ((this.scale = links.Timeline.StepDate.SCALE.DAY), (this.step = 2)),
            e < 864e5 && ((this.scale = links.Timeline.StepDate.SCALE.DAY), (this.step = 1)),
            e < 432e5 && ((this.scale = links.Timeline.StepDate.SCALE.WEEKDAY), (this.step = 1)),
            e < 144e5 && ((this.scale = links.Timeline.StepDate.SCALE.HOUR), (this.step = 4)),
            e < 36e5 && ((this.scale = links.Timeline.StepDate.SCALE.HOUR), (this.step = 1)),
            e < 9e5 && ((this.scale = links.Timeline.StepDate.SCALE.MINUTE), (this.step = 15)),
            e < 6e5 && ((this.scale = links.Timeline.StepDate.SCALE.MINUTE), (this.step = 10)),
            e < 3e5 && ((this.scale = links.Timeline.StepDate.SCALE.MINUTE), (this.step = 5)),
            e < 6e4 && ((this.scale = links.Timeline.StepDate.SCALE.MINUTE), (this.step = 1)),
            e < 15e3 && ((this.scale = links.Timeline.StepDate.SCALE.SECOND), (this.step = 15)),
            e < 1e4 && ((this.scale = links.Timeline.StepDate.SCALE.SECOND), (this.step = 10)),
            e < 5e3 && ((this.scale = links.Timeline.StepDate.SCALE.SECOND), (this.step = 5)),
            e < 1e3 && ((this.scale = links.Timeline.StepDate.SCALE.SECOND), (this.step = 1)),
            e < 200 && ((this.scale = links.Timeline.StepDate.SCALE.MILLISECOND), (this.step = 200)),
            e < 100 && ((this.scale = links.Timeline.StepDate.SCALE.MILLISECOND), (this.step = 100)),
            e < 50 && ((this.scale = links.Timeline.StepDate.SCALE.MILLISECOND), (this.step = 50)),
            e < 10 && ((this.scale = links.Timeline.StepDate.SCALE.MILLISECOND), (this.step = 10)),
            e < 5 && ((this.scale = links.Timeline.StepDate.SCALE.MILLISECOND), (this.step = 5)),
            e < 1) &&
            ((this.scale = links.Timeline.StepDate.SCALE.MILLISECOND), (this.step = 1));
    }),
    (links.Timeline.StepDate.prototype.snap = function (e) {
        if (this.scale == links.Timeline.StepDate.SCALE.YEAR) {
            var t = e.getFullYear() + Math.round(e.getMonth() / 12);
            e.setFullYear(Math.round(t / this.step) * this.step), e.setMonth(0), e.setDate(0), e.setHours(0), e.setMinutes(0), e.setSeconds(0), e.setMilliseconds(0);
        } else if (this.scale == links.Timeline.StepDate.SCALE.MONTH) 15 < e.getDate() ? (e.setDate(1), e.setMonth(e.getMonth() + 1)) : e.setDate(1), e.setHours(0), e.setMinutes(0), e.setSeconds(0), e.setMilliseconds(0);
        else if (this.scale == links.Timeline.StepDate.SCALE.DAY || this.scale == links.Timeline.StepDate.SCALE.WEEKDAY) {
            switch (this.step) {
                case 5:
                case 2:
                    e.setHours(24 * Math.round(e.getHours() / 24));
                    break;
                default:
                    e.setHours(12 * Math.round(e.getHours() / 12));
            }
            e.setMinutes(0), e.setSeconds(0), e.setMilliseconds(0);
        } else if (this.scale == links.Timeline.StepDate.SCALE.HOUR) 4 === this.step ? e.setMinutes(60 * Math.round(e.getMinutes() / 60)) : e.setMinutes(30 * Math.round(e.getMinutes() / 30)), e.setSeconds(0), e.setMilliseconds(0);
        else if (this.scale == links.Timeline.StepDate.SCALE.MINUTE) {
            switch (this.step) {
                case 15:
                case 10:
                    e.setMinutes(5 * Math.round(e.getMinutes() / 5)), e.setSeconds(0);
                    break;
                case 5:
                    e.setSeconds(60 * Math.round(e.getSeconds() / 60));
                    break;
                default:
                    e.setSeconds(30 * Math.round(e.getSeconds() / 30));
            }
            e.setMilliseconds(0);
        } else if (this.scale == links.Timeline.StepDate.SCALE.SECOND)
            switch (this.step) {
                case 15:
                case 10:
                    e.setSeconds(5 * Math.round(e.getSeconds() / 5)), e.setMilliseconds(0);
                    break;
                case 5:
                    e.setMilliseconds(1e3 * Math.round(e.getMilliseconds() / 1e3));
                    break;
                default:
                    e.setMilliseconds(500 * Math.round(e.getMilliseconds() / 500));
            }
        else this.scale == links.Timeline.StepDate.SCALE.MILLISECOND && ((t = 5 < this.step ? this.step / 2 : 1), e.setMilliseconds(Math.round(e.getMilliseconds() / t) * t));
    }),
    (links.Timeline.StepDate.prototype.isMajor = function () {
        switch (this.scale) {
            case links.Timeline.StepDate.SCALE.MILLISECOND:
                return 0 == this.current.getMilliseconds();
            case links.Timeline.StepDate.SCALE.SECOND:
                return 0 == this.current.getSeconds();
            case links.Timeline.StepDate.SCALE.MINUTE:
                return 0 == this.current.getHours() && 0 == this.current.getMinutes();
            case links.Timeline.StepDate.SCALE.HOUR:
                return 0 == this.current.getHours();
            case links.Timeline.StepDate.SCALE.WEEKDAY:
            case links.Timeline.StepDate.SCALE.DAY:
                return 1 == this.current.getDate();
            case links.Timeline.StepDate.SCALE.MONTH:
                return 0 == this.current.getMonth();
            default:
                links.Timeline.StepDate.SCALE.YEAR;
                return !1;
        }
    }),
    (links.Timeline.StepDate.prototype.getLabelMinor = function (e, t) {
        switch ((null == t && (t = this.current), this.scale)) {
            case links.Timeline.StepDate.SCALE.MILLISECOND:
                return String(t.getMilliseconds());
            case links.Timeline.StepDate.SCALE.SECOND:
                return String(t.getSeconds());
            case links.Timeline.StepDate.SCALE.MINUTE:
            case links.Timeline.StepDate.SCALE.HOUR:
                return this.addZeros(t.getHours(), 2) + ":" + this.addZeros(t.getMinutes(), 2);
            case links.Timeline.StepDate.SCALE.WEEKDAY:
                return e.DAYS_SHORT[t.getDay()] + " " + t.getDate();
            case links.Timeline.StepDate.SCALE.DAY:
                return String(t.getDate());
            case links.Timeline.StepDate.SCALE.MONTH:
                return e.MONTHS_SHORT[t.getMonth()];
            case links.Timeline.StepDate.SCALE.YEAR:
                return String(t.getFullYear());
            default:
                return "";
        }
    }),
    (links.Timeline.StepDate.prototype.getLabelMajor = function (e, t) {
        switch ((null == t && (t = this.current), this.scale)) {
            case links.Timeline.StepDate.SCALE.MILLISECOND:
                return this.addZeros(t.getHours(), 2) + ":" + this.addZeros(t.getMinutes(), 2) + ":" + this.addZeros(t.getSeconds(), 2);
            case links.Timeline.StepDate.SCALE.SECOND:
                return t.getDate() + " " + e.MONTHS[t.getMonth()] + " " + this.addZeros(t.getHours(), 2) + ":" + this.addZeros(t.getMinutes(), 2);
            case links.Timeline.StepDate.SCALE.MINUTE:
            case links.Timeline.StepDate.SCALE.HOUR:
                return e.DAYS[t.getDay()] + " " + t.getDate() + " " + e.MONTHS[t.getMonth()] + " " + t.getFullYear();
            case links.Timeline.StepDate.SCALE.WEEKDAY:
            case links.Timeline.StepDate.SCALE.DAY:
                return e.MONTHS[t.getMonth()] + " " + t.getFullYear();
            case links.Timeline.StepDate.SCALE.MONTH:
                return String(t.getFullYear());
            default:
                return "";
        }
    }),
    (links.Timeline.StepDate.prototype.addZeros = function (e, t) {
        for (var n = "" + e; n.length < t; ) n = "0" + n;
        return n;
    }),
    (links.imageloader = (function () {
        function a(e) {
            var t;
            return 1 == r[e] || (((t = new Image()).src = e), !!t.complete);
        }
        function o(e) {
            return null != l[e];
        }
        function s(t, e, n) {
            var i;
            null == n && (n = !0),
                a(t)
                    ? n && e(t)
                    : (o(t) && !n) ||
                      ((i = l[t]) ||
                          (((n = new Image()).src = t),
                          (i = []),
                          (l[t] = i),
                          (n.onload = function () {
                              (r[t] = !0), delete l[t];
                              for (var e = 0; e < i.length; e++) i[e](t);
                          })),
                      -1 == i.indexOf(e) && i.push(e));
        }
        var r = {},
            l = {};
        return {
            isLoaded: a,
            isLoading: o,
            load: s,
            loadAll: function (e, t, n) {
                var i,
                    o = [];
                e.forEach(function (e) {
                    a(e) || o.push(e);
                }),
                    o.length
                        ? ((i = o.length),
                          o.forEach(function (e) {
                              s(
                                  e,
                                  function () {
                                      0 == --i && t();
                                  },
                                  n
                              );
                          }))
                        : n && t();
            },
            filterImageUrls: function e(t, n) {
                for (var i, o = t.firstChild; o; ) "IMG" == o.tagName && ((i = o.src), -1 == n.indexOf(i)) && n.push(i), e(o, n), (o = o.nextSibling);
            },
        };
    })()),
    (links.Timeline.addEventListener = function (e, t, n, i) {
        e.addEventListener ? (void 0 === i && (i = !1), "mousewheel" === t && 0 <= navigator.userAgent.indexOf("Firefox") && (t = "DOMMouseScroll"), e.addEventListener(t, n, i)) : e.attachEvent("on" + t, n);
    }),
    (links.Timeline.removeEventListener = function (e, t, n, i) {
        e.removeEventListener ? (void 0 === i && (i = !1), "mousewheel" === t && 0 <= navigator.userAgent.indexOf("Firefox") && (t = "DOMMouseScroll"), e.removeEventListener(t, n, i)) : e.detachEvent("on" + t, n);
    }),
    (links.Timeline.getTarget = function (e) {
        var t;
        return (e = e || window.event).target ? (t = e.target) : e.srcElement && (t = e.srcElement), (t = null != t.nodeType && 3 == t.nodeType ? t.parentNode : t);
    }),
    (links.Timeline.stopPropagation = function (e) {
        (e = e || window.event).stopPropagation ? e.stopPropagation() : (e.cancelBubble = !0);
    }),
    (links.Timeline.preventDefault = function (e) {
        (e = e || window.event).preventDefault ? e.preventDefault() : (e.returnValue = !1);
    }),
    (links.Timeline.getAbsoluteLeft = function (e) {
        for (var t = document.documentElement, n = document.body, i = e.offsetLeft, o = e.offsetParent; null != o && o != n && o != t; ) (i = (i += o.offsetLeft) - o.scrollLeft), (o = o.offsetParent);
        return i;
    }),
    (links.Timeline.getAbsoluteTop = function (e) {
        for (var t = document.documentElement, n = document.body, i = e.offsetTop, o = e.offsetParent; null != o && o != n && o != t; ) (i = (i += o.offsetTop) - o.scrollTop), (o = o.offsetParent);
        return i;
    }),
    (links.Timeline.getPageY = function (e) {
        var t, n;
        return "pageY" in (e = "targetTouches" in e && e.targetTouches.length ? e.targetTouches[0] : e)
            ? e.pageY
            : ((e = e.clientY), (t = document.documentElement), (n = document.body), e + ((t && t.scrollTop) || (n && n.scrollTop) || 0) - ((t && t.clientTop) || (n && n.clientTop) || 0));
    }),
    (links.Timeline.getPageX = function (e) {
        var t, n;
        return "pageX" in (e = "targetTouches" in e && e.targetTouches.length ? e.targetTouches[0] : e)
            ? e.pageX
            : ((e = e.clientX), (t = document.documentElement), (n = document.body), e + ((t && t.scrollLeft) || (n && n.scrollLeft) || 0) - ((t && t.clientLeft) || (n && n.clientLeft) || 0));
    }),
    (links.Timeline.addClassName = function (e, t) {
        for (var n = e.className.split(" "), i = t.split(" "), o = !1, a = 0; a < i.length; a++) -1 == n.indexOf(i[a]) && (n.push(i[a]), (o = !0));
        o && (e.className = n.join(" "));
    }),
    (links.Timeline.removeClassName = function (e, t) {
        for (var n = e.className.split(" "), i = t.split(" "), o = !1, a = 0; a < i.length; a++) {
            var s = n.indexOf(i[a]);
            -1 != s && (n.splice(s, 1), (o = !0));
        }
        o && (e.className = n.join(" "));
    }),
    (links.Timeline.isArray = function (e) {
        return e instanceof Array || "[object Array]" === Object.prototype.toString.call(e);
    }),
    (links.Timeline.clone = function (e) {
        var t,
            n = {};
        for (t in e) e.hasOwnProperty(t) && (n[t] = e[t]);
        return n;
    }),
    (links.Timeline.parseJSONDate = function (e) {
        var t, n;
        if (null != e) return e instanceof Date ? e : (t = e.match(/\/Date\((-?\d+)([-\+]?\d{2})?(\d{2})?\)\//i)) ? ((n = t[2] ? 36e5 * t[2] + 6e4 * t[3] * (t[2] / Math.abs(t[2])) : 0), new Date(+t[1] + n)) : Date.parse(e);
    }),
    !(function (l) {
        function n(e) {
            return c.hasOwnProperty(e) && 0 < c[e].length;
        }
        var c = {},
            d = {};
        (l.ajaxq = function (t, n) {
            function i() {
                var e;
                c[t] && ((e = c[t].shift()) ? ((e = e()), (d[t] = e)) : (delete c[t], delete d[t]));
            }
            if (void 0 === n) throw "AjaxQ: queue name is not provided";
            var e,
                o = l.Deferred(),
                a = o.promise(),
                s = ((a.success = a.done), (a.error = a.fail), (a.complete = a.always), "function" == typeof n),
                r = s ? null : l.extend(!0, {}, n);
            return (
                (e = function () {
                    var e = l.ajax.apply(window, [s ? n() : r]);
                    return (
                        e.done(function () {
                            o.resolve.apply(this, arguments);
                        }),
                        e.fail(function () {
                            o.reject.apply(this, arguments);
                        }),
                        e.always(i),
                        e
                    );
                }),
                c[t] ? c[t].push(e) : ((c[t] = []), (e = e()), (d[t] = e)),
                a
            );
        }),
            l.each(["getq", "postq"], function (e, a) {
                l[a] = function (e, t, n, i, o) {
                    return l.isFunction(n) && ((o = o || i), (i = n), (n = void 0)), l.ajaxq(e, { type: "postq" === a ? "post" : "get", url: t, data: n, success: i, dataType: o });
                };
            });
        (l.ajaxq.isRunning = function (e) {
            if (e) return n(e);
            for (var t in c) if (n(t)) return !0;
            return !1;
        }),
            (l.ajaxq.getActiveRequest = function (e) {
                if (e) return d[e];
                throw "AjaxQ: queue name is required";
            }),
            (l.ajaxq.abort = function (e) {
                if (!e) throw "AjaxQ: queue name is required";
                var t = l.ajaxq.getActiveRequest(e);
                delete c[e], delete d[e], t && t.abort();
            }),
            (l.ajaxq.clear = function (e) {
                if (e) c[e] && (c[e] = []);
                else for (var t in c) c.hasOwnProperty(t) && (c[t] = []);
            });
    })(jQuery),
    !(function () {
        "use strict";
        function m(e) {
            return new Date((e + 0.5 - t) * n);
        }
        function g(e) {
            return e.valueOf() / n - 0.5 + t - 2451545;
        }
        function i(e, t) {
            return h(c(e) * d(C) - u(t) * c(C), d(e));
        }
        function v(e, t) {
            return p(c(t) * d(C) + d(t) * c(C) * c(e));
        }
        function o(e, t, n) {
            return h(c(e), d(e) * c(t) - u(n) * d(t));
        }
        function a(e, t, n) {
            return p(c(t) * c(n) + d(t) * d(n) * d(e));
        }
        function s(e, t) {
            return _ * (280.16 + 360.9856235 * e) - t;
        }
        function b(e) {
            return _ * (357.5291 + 0.98560028 * e);
        }
        function y(e) {
            return e + _ * (1.9148 * c(e) + 0.02 * c(2 * e) + 3e-4 * c(3 * e)) + 102.9372 * _ + x;
        }
        function r(e) {
            e = y(b(e));
            return { dec: v(e, 0), ra: i(e, 0) };
        }
        function w(e, t, n) {
            return 9e-4 + (e + t) / (2 * x) + n;
        }
        function S(e, t, n) {
            return 2451545 + e + 0.0053 * c(t) - 0.0069 * c(2 * n);
        }
        function k(e, t, n, i, o, a, s) {
            return (n = n), (i = i), S(w(f((c(e) - c(n) * c(i)) / (d(n) * d(i))), t, o), a, s);
        }
        function l(e) {
            var t = _ * (134.963 + 13.064993 * e),
                n = _ * (93.272 + 13.22935 * e),
                e = _ * (218.316 + 13.176396 * e) + 6.289 * _ * c(t),
                n = 5.128 * _ * c(n),
                t = 385001 - 20905 * d(t);
            return { ra: i(e, n), dec: v(e, n), dist: t };
        }
        function T(e, t) {
            return new Date(e.valueOf() + (t * n) / 24);
        }
        var x = Math.PI,
            c = Math.sin,
            d = Math.cos,
            u = Math.tan,
            p = Math.asin,
            h = Math.atan2,
            f = Math.acos,
            _ = x / 180,
            n = 864e5,
            t = 2440588,
            C = 23.4397 * _,
            D = {
                getPosition: function (e, t, n) {
                    var n = _ * -n,
                        t = _ * t,
                        e = g(e),
                        i = r(e),
                        e = s(e, n) - i.ra;
                    return { azimuth: o(e, t, i.dec), altitude: a(e, t, i.dec) };
                },
            },
            O = (D.times = [
                [-0.833, "sunrise", "sunset"],
                [-0.3, "sunriseEnd", "sunsetStart"],
                [-6, "dawn", "dusk"],
                [-12, "nauticalDawn", "nauticalDusk"],
                [-18, "nightEnd", "night"],
                [6, "goldenHourEnd", "goldenHour"],
            ]);
        D.addTime = function (e, t, n) {
            O.push([e, t, n]);
        };
        (D.getTimes = function (e, t, n) {
            for (
                var i, o, a = _ * -n, s = _ * t, n = g(e), r = Math.round(n - 9e-4 - a / (2 * x)), t = w(0, a, r), l = b(t), c = y(l), d = v(c, 0), u = S(t, l, c), p = { solarNoon: m(u), nadir: m(u - 0.5) }, h = 0, f = O.length;
                h < f;
                h += 1
            )
                (o = k((i = O[h])[0] * _, a, s, d, r, l, c)), (p[i[1]] = m(u - (o - u))), (p[i[2]] = m(o));
            return p;
        }),
            (D.getMoonPosition = function (e, t, n) {
                var n = _ * -n,
                    t = _ * t,
                    e = g(e),
                    i = l(e),
                    e = s(e, n) - i.ra,
                    n = a(e, t, i.dec);
                return (n += (0.017 * _) / u(n + (10.26 * _) / (n + 5.1 * _))), { azimuth: o(e, t, i.dec), altitude: n, distance: i.dist };
            }),
            (D.getMoonIllumination = function (e) {
                var e = g(e),
                    t = r(e),
                    e = l(e),
                    n = f(c(t.dec) * c(e.dec) + d(t.dec) * d(e.dec) * d(t.ra - e.ra)),
                    n = h(149598e3 * c(n), e.dist - 149598e3 * d(n)),
                    t = h(d(t.dec) * c(t.ra - e.ra), c(t.dec) * d(e.dec) - d(t.dec) * c(e.dec) * d(t.ra - e.ra));
                return { fraction: (1 + d(n)) / 2, phase: 0.5 + (0.5 * n * (t < 0 ? -1 : 1)) / Math.PI, angle: t };
            }),
            (D.getMoonTimes = function (e, t, n) {
                var i = new Date(e);
                i.setHours(0), i.setMinutes(0), i.setSeconds(0), i.setMilliseconds(0);
                for (
                    var o, a, s, r, l, c, d, u, p, h, f, m = 0.133 * _, g = D.getMoonPosition(i, t, n).altitude - m, v = 1;
                    v <= 24 &&
                    ((f = D.getMoonPosition(T(i, v), t, n).altitude - m),
                    (c = ((r = (g + (o = D.getMoonPosition(T(i, v + 1), t, n).altitude - m)) / 2 - f) * (l = -(d = (o - g) / 2) / (2 * r)) + d) * l + f),
                    (u = 0) <= (d = d * d - 4 * r * f) && ((p = l - (f = Math.sqrt(d) / (2 * Math.abs(r)))), (h = l + f), Math.abs(p) <= 1 && u++, Math.abs(h) <= 1 && u++, p < -1) && (p = h),
                    1 === u ? (g < 0 ? (a = v + p) : (s = v + p)) : 2 === u && ((a = v + (c < 0 ? h : p)), (s = v + (c < 0 ? p : h))),
                    !a || !s);
                    v += 2
                )
                    g = o;
                e = {};
                return a && (e.rise = T(i, a)), s && (e.set = T(i, s)), a || s || (e[0 < c ? "alwaysUp" : "alwaysDown"] = !0), e;
            }),
            "function" == typeof define && define.amd ? define(D) : "undefined" != typeof module ? (module.exports = D) : (window.SunCalc = D);
    })(),
    !(function (e) {
        "use strict";
        function u(e, t) {
            var n = (65535 & e) + (65535 & t);
            return (((e >> 16) + (t >> 16) + (n >> 16)) << 16) | (65535 & n);
        }
        function r(e, t, n, i, o, a) {
            return u(((t = u(u(t, e), u(i, a))) << o) | (t >>> (32 - o)), n);
        }
        function p(e, t, n, i, o, a, s) {
            return r((t & n) | (~t & i), e, t, o, a, s);
        }
        function h(e, t, n, i, o, a, s) {
            return r((t & i) | (n & ~i), e, t, o, a, s);
        }
        function f(e, t, n, i, o, a, s) {
            return r(t ^ n ^ i, e, t, o, a, s);
        }
        function m(e, t, n, i, o, a, s) {
            return r(n ^ (t | ~i), e, t, o, a, s);
        }
        function s(e, t) {
            (e[t >> 5] |= 128 << t % 32), (e[14 + (((t + 64) >>> 9) << 4)] = t);
            for (var n, i, o, a, s = 1732584193, r = -271733879, l = -1732584194, c = 271733878, d = 0; d < e.length; d += 16)
                (s = p((n = s), (i = r), (o = l), (a = c), e[d], 7, -680876936)),
                    (c = p(c, s, r, l, e[d + 1], 12, -389564586)),
                    (l = p(l, c, s, r, e[d + 2], 17, 606105819)),
                    (r = p(r, l, c, s, e[d + 3], 22, -1044525330)),
                    (s = p(s, r, l, c, e[d + 4], 7, -176418897)),
                    (c = p(c, s, r, l, e[d + 5], 12, 1200080426)),
                    (l = p(l, c, s, r, e[d + 6], 17, -1473231341)),
                    (r = p(r, l, c, s, e[d + 7], 22, -45705983)),
                    (s = p(s, r, l, c, e[d + 8], 7, 1770035416)),
                    (c = p(c, s, r, l, e[d + 9], 12, -1958414417)),
                    (l = p(l, c, s, r, e[d + 10], 17, -42063)),
                    (r = p(r, l, c, s, e[d + 11], 22, -1990404162)),
                    (s = p(s, r, l, c, e[d + 12], 7, 1804603682)),
                    (c = p(c, s, r, l, e[d + 13], 12, -40341101)),
                    (l = p(l, c, s, r, e[d + 14], 17, -1502002290)),
                    (s = h(s, (r = p(r, l, c, s, e[d + 15], 22, 1236535329)), l, c, e[d + 1], 5, -165796510)),
                    (c = h(c, s, r, l, e[d + 6], 9, -1069501632)),
                    (l = h(l, c, s, r, e[d + 11], 14, 643717713)),
                    (r = h(r, l, c, s, e[d], 20, -373897302)),
                    (s = h(s, r, l, c, e[d + 5], 5, -701558691)),
                    (c = h(c, s, r, l, e[d + 10], 9, 38016083)),
                    (l = h(l, c, s, r, e[d + 15], 14, -660478335)),
                    (r = h(r, l, c, s, e[d + 4], 20, -405537848)),
                    (s = h(s, r, l, c, e[d + 9], 5, 568446438)),
                    (c = h(c, s, r, l, e[d + 14], 9, -1019803690)),
                    (l = h(l, c, s, r, e[d + 3], 14, -187363961)),
                    (r = h(r, l, c, s, e[d + 8], 20, 1163531501)),
                    (s = h(s, r, l, c, e[d + 13], 5, -1444681467)),
                    (c = h(c, s, r, l, e[d + 2], 9, -51403784)),
                    (l = h(l, c, s, r, e[d + 7], 14, 1735328473)),
                    (s = f(s, (r = h(r, l, c, s, e[d + 12], 20, -1926607734)), l, c, e[d + 5], 4, -378558)),
                    (c = f(c, s, r, l, e[d + 8], 11, -2022574463)),
                    (l = f(l, c, s, r, e[d + 11], 16, 1839030562)),
                    (r = f(r, l, c, s, e[d + 14], 23, -35309556)),
                    (s = f(s, r, l, c, e[d + 1], 4, -1530992060)),
                    (c = f(c, s, r, l, e[d + 4], 11, 1272893353)),
                    (l = f(l, c, s, r, e[d + 7], 16, -155497632)),
                    (r = f(r, l, c, s, e[d + 10], 23, -1094730640)),
                    (s = f(s, r, l, c, e[d + 13], 4, 681279174)),
                    (c = f(c, s, r, l, e[d], 11, -358537222)),
                    (l = f(l, c, s, r, e[d + 3], 16, -722521979)),
                    (r = f(r, l, c, s, e[d + 6], 23, 76029189)),
                    (s = f(s, r, l, c, e[d + 9], 4, -640364487)),
                    (c = f(c, s, r, l, e[d + 12], 11, -421815835)),
                    (l = f(l, c, s, r, e[d + 15], 16, 530742520)),
                    (s = m(s, (r = f(r, l, c, s, e[d + 2], 23, -995338651)), l, c, e[d], 6, -198630844)),
                    (c = m(c, s, r, l, e[d + 7], 10, 1126891415)),
                    (l = m(l, c, s, r, e[d + 14], 15, -1416354905)),
                    (r = m(r, l, c, s, e[d + 5], 21, -57434055)),
                    (s = m(s, r, l, c, e[d + 12], 6, 1700485571)),
                    (c = m(c, s, r, l, e[d + 3], 10, -1894986606)),
                    (l = m(l, c, s, r, e[d + 10], 15, -1051523)),
                    (r = m(r, l, c, s, e[d + 1], 21, -2054922799)),
                    (s = m(s, r, l, c, e[d + 8], 6, 1873313359)),
                    (c = m(c, s, r, l, e[d + 15], 10, -30611744)),
                    (l = m(l, c, s, r, e[d + 6], 15, -1560198380)),
                    (r = m(r, l, c, s, e[d + 13], 21, 1309151649)),
                    (s = m(s, r, l, c, e[d + 4], 6, -145523070)),
                    (c = m(c, s, r, l, e[d + 11], 10, -1120210379)),
                    (l = m(l, c, s, r, e[d + 2], 15, 718787259)),
                    (r = m(r, l, c, s, e[d + 9], 21, -343485551)),
                    (s = u(s, n)),
                    (r = u(r, i)),
                    (l = u(l, o)),
                    (c = u(c, a));
            return [s, r, l, c];
        }
        function l(e) {
            for (var t = "", n = 0; n < 32 * e.length; n += 8) t += String.fromCharCode((e[n >> 5] >>> n % 32) & 255);
            return t;
        }
        function c(e) {
            var t,
                n = [];
            for (n[(e.length >> 2) - 1] = void 0, t = 0; t < n.length; t += 1) n[t] = 0;
            for (t = 0; t < 8 * e.length; t += 8) n[t >> 5] |= (255 & e.charCodeAt(t / 8)) << t % 32;
            return n;
        }
        function i(e) {
            for (var t, n = "0123456789abcdef", i = "", o = 0; o < e.length; o += 1) (t = e.charCodeAt(o)), (i += n.charAt((t >>> 4) & 15) + n.charAt(15 & t));
            return i;
        }
        function d(e) {
            return unescape(encodeURIComponent(e));
        }
        function o(e) {
            return l(s(c((e = d(e))), 8 * e.length));
        }
        function a(e, t) {
            var n,
                e = d(e),
                t = d(t),
                i = c(e),
                o = [],
                a = [];
            for (o[15] = a[15] = void 0, 16 < i.length && (i = s(i, 8 * e.length)), n = 0; n < 16; n += 1) (o[n] = 909522486 ^ i[n]), (a[n] = 1549556828 ^ i[n]);
            return (e = s(o.concat(c(t)), 512 + 8 * t.length)), l(s(a.concat(e), 640));
        }
        function t(e, t, n) {
            return t ? (n ? a(t, e) : i(a(t, e))) : n ? o(e) : i(o(e));
        }
        "function" == typeof define && define.amd
            ? define(function () {
                  return t;
              })
            : (e.md5 = t);
    })(this),
    (Array.prototype.remove = function (e, t) {
        t = this.slice((t || e) + 1 || this.length);
        return (this.length = e < 0 ? this.length + e : e), this.push.apply(this, t);
    });
var s = void 0,
    u = !1,
    sjcl = {
        cipher: {},
        hash: {},
        keyexchange: {},
        mode: {},
        misc: {},
        codec: {},
        exception: {
            corrupt: function (e) {
                (this.toString = function () {
                    return "CORRUPT: " + this.message;
                }),
                    (this.message = e);
            },
            invalid: function (e) {
                (this.toString = function () {
                    return "INVALID: " + this.message;
                }),
                    (this.message = e);
            },
            bug: function (e) {
                (this.toString = function () {
                    return "BUG: " + this.message;
                }),
                    (this.message = e);
            },
            notReady: function (e) {
                (this.toString = function () {
                    return "NOT READY: " + this.message;
                }),
                    (this.message = e);
            },
        },
    },
    F,
    G,
    H,
    I,
    J,
    K;
function w(e, t, n) {
    4 !== t.length && q(new sjcl.exception.invalid("invalid aes block size"));
    var i = e.b[n],
        o = t[0] ^ i[0],
        a = t[n ? 3 : 1] ^ i[1],
        s = t[2] ^ i[2];
    t = t[n ? 1 : 3] ^ i[3];
    for (var r, l, c = i.length / 4 - 2, d = 4, u = [0, 0, 0, 0], p = e.l[n], h = ((e = p[0]), p[1]), f = p[2], m = p[3], g = p[4], v = 0; v < c; v++)
        (p = e[o >>> 24] ^ h[(a >> 16) & 255] ^ f[(s >> 8) & 255] ^ m[255 & t] ^ i[d]),
            (r = e[a >>> 24] ^ h[(s >> 16) & 255] ^ f[(t >> 8) & 255] ^ m[255 & o] ^ i[d + 1]),
            (l = e[s >>> 24] ^ h[(t >> 16) & 255] ^ f[(o >> 8) & 255] ^ m[255 & a] ^ i[d + 2]),
            (t = e[t >>> 24] ^ h[(o >> 16) & 255] ^ f[(a >> 8) & 255] ^ m[255 & s] ^ i[d + 3]),
            (d += 4),
            (o = p),
            (a = r),
            (s = l);
    for (v = 0; v < 4; v++) (u[n ? 3 & -v : v] = (g[o >>> 24] << 24) ^ (g[(a >> 16) & 255] << 16) ^ (g[(s >> 8) & 255] << 8) ^ g[255 & t] ^ i[d++]), (p = o), (o = a), (a = s), (s = t), (t = p);
    return u;
}
function x(e, t) {
    for (var n, i, o = t.slice(0), t = e.s, a = e.b, s = t[0], r = t[1], l = t[2], c = t[3], d = t[4], u = t[5], p = t[6], h = t[7], f = 0; f < 64; f++)
        (n =
            (n =
                f < 16
                    ? o[f]
                    : ((n = o[(f + 1) & 15]),
                      (i = o[(f + 14) & 15]),
                      (o[15 & f] = (((n >>> 7) ^ (n >>> 18) ^ (n >>> 3) ^ (n << 25) ^ (n << 14)) + ((i >>> 17) ^ (i >>> 19) ^ (i >>> 10) ^ (i << 15) ^ (i << 13)) + o[15 & f] + o[(f + 9) & 15]) | 0))) +
            h +
            ((d >>> 6) ^ (d >>> 11) ^ (d >>> 25) ^ (d << 26) ^ (d << 21) ^ (d << 7)) +
            (p ^ (d & (u ^ p))) +
            a[f]),
            (h = p),
            (p = u),
            (u = d),
            (d = (c + n) | 0),
            (c = l),
            (l = r),
            (s = (n + (((r = s) & l) ^ (c & (r ^ l))) + ((r >>> 2) ^ (r >>> 13) ^ (r >>> 22) ^ (r << 30) ^ (r << 19) ^ (r << 10))) | 0);
    (t[0] = (t[0] + s) | 0), (t[1] = (t[1] + r) | 0), (t[2] = (t[2] + l) | 0), (t[3] = (t[3] + c) | 0), (t[4] = (t[4] + d) | 0), (t[5] = (t[5] + u) | 0), (t[6] = (t[6] + p) | 0), (t[7] = (t[7] + h) | 0);
}
function C(e, t) {
    var n,
        i = sjcl.random.B[e],
        o = [];
    for (n in i) i.hasOwnProperty(n) && o.push(i[n]);
    for (n = 0; n < o.length; n++) o[n](t);
}
function E(e) {
    "undefined" != typeof window && window.performance && "function" == typeof window.performance.now ? sjcl.random.addEntropy(window.performance.now(), e, "loadtime") : sjcl.random.addEntropy(new Date().valueOf(), e, "loadtime");
}
function A(e) {
    (e.b = B(e).concat(B(e))), (e.C = new sjcl.cipher.aes(e.b));
}
function B(e) {
    for (var t = 0; t < 4 && ((e.f[t] = (e.f[t] + 1) | 0), !e.f[t]); t++);
    return e.C.encrypt(e.f);
}
function D(e, t) {
    return function () {
        t.apply(e, arguments);
    };
}
"undefined" != typeof module && module.exports && (module.exports = sjcl),
    "function" == typeof define &&
        define([], function () {
            return sjcl;
        }),
    (sjcl.cipher.aes = function (e) {
        this.l[0][0][0] || this.G();
        var t,
            n,
            i,
            o = this.l[0][4],
            a = this.l[1],
            s = e.length,
            r = 1;
        for (4 !== s && 6 !== s && 8 !== s && q(new sjcl.exception.invalid("invalid aes key size")), this.b = [(n = e.slice(0)), (i = [])], e = s; e < 4 * s + 28; e++)
            (t = n[e - 1]),
                (0 == e % s || (8 === s && 4 == e % s)) &&
                    ((t = (o[t >>> 24] << 24) ^ (o[(t >> 16) & 255] << 16) ^ (o[(t >> 8) & 255] << 8) ^ o[255 & t]), 0 == e % s) &&
                    ((t = (t << 8) ^ (t >>> 24) ^ (r << 24)), (r = (r << 1) ^ (283 * (r >> 7)))),
                (n[e] = n[e - s] ^ t);
        for (s = 0; e; s++, e--) (t = n[3 & s ? e : e - 4]), (i[s] = e <= 4 || s < 4 ? t : a[0][o[t >>> 24]] ^ a[1][o[(t >> 16) & 255]] ^ a[2][o[(t >> 8) & 255]] ^ a[3][o[255 & t]]);
    }),
    (sjcl.cipher.aes.prototype = {
        encrypt: function (e) {
            return w(this, e, 0);
        },
        decrypt: function (e) {
            return w(this, e, 1);
        },
        l: [
            [[], [], [], [], []],
            [[], [], [], [], []],
        ],
        G: function () {
            for (var e, t, n, i, o, a, s = this.l[0], r = this.l[1], l = s[4], c = r[4], d = [], u = [], p = 0; p < 256; p++) u[(d[p] = (p << 1) ^ (283 * (p >> 7))) ^ p] = p;
            for (e = t = 0; !l[e]; e ^= n || 1, t = u[t] || 1)
                for (
                    a = (16843009 * (i = d[(p = d[(n = d[(c[(l[e] = o = ((o = t ^ (t << 1) ^ (t << 2) ^ (t << 3) ^ (t << 4)) >> 8) ^ (255 & o) ^ 99)] = e)])])])) ^ (65537 * p) ^ (257 * n) ^ (16843008 * e),
                        i = (257 * d[o]) ^ (16843008 * o),
                        p = 0;
                    p < 4;
                    p++
                )
                    (s[p][e] = i = (i << 24) ^ (i >>> 8)), (r[p][o] = a = (a << 24) ^ (a >>> 8));
            for (p = 0; p < 5; p++) (s[p] = s[p].slice(0)), (r[p] = r[p].slice(0));
        },
    }),
    (sjcl.bitArray = {
        bitSlice: function (e, t, n) {
            return (e = sjcl.bitArray.R(e.slice(t / 32), 32 - (31 & t)).slice(1)), n === s ? e : sjcl.bitArray.clamp(e, n - t);
        },
        extract: function (e, t, n) {
            var i = Math.floor((-t - n) & 31);
            return (-32 & ((t + n - 1) ^ t) ? (e[(t / 32) | 0] << (32 - i)) ^ (e[(t / 32 + 1) | 0] >>> i) : e[(t / 32) | 0] >>> i) & ((1 << n) - 1);
        },
        concat: function (e, t) {
            var n, i;
            return 0 === e.length || 0 === t.length || ((n = e[e.length - 1]), 32 === (i = sjcl.bitArray.getPartial(n))) ? e.concat(t) : sjcl.bitArray.R(t, i, 0 | n, e.slice(0, e.length - 1));
        },
        bitLength: function (e) {
            var t = e.length;
            return 0 === t ? 0 : 32 * (t - 1) + sjcl.bitArray.getPartial(e[t - 1]);
        },
        clamp: function (e, t) {
            var n;
            return 32 * e.length < t || ((n = (e = e.slice(0, Math.ceil(t / 32))).length), (t &= 31), 0 < n && t && (e[n - 1] = sjcl.bitArray.partial(t, e[n - 1] & (2147483648 >> (t - 1)), 1))), e;
        },
        partial: function (e, t, n) {
            return 32 === e ? t : (n ? 0 | t : t << (32 - e)) + 1099511627776 * e;
        },
        getPartial: function (e) {
            return Math.round(e / 1099511627776) || 32;
        },
        equal: function (e, t) {
            if (sjcl.bitArray.bitLength(e) !== sjcl.bitArray.bitLength(t)) return u;
            for (var n = 0, i = 0; i < e.length; i++) n |= e[i] ^ t[i];
            return 0 === n;
        },
        R: function (e, t, n, i) {
            var o = 0;
            for (i === s && (i = []); 32 <= t; t -= 32) i.push(n), (n = 0);
            if (0 === t) return i.concat(e);
            for (o = 0; o < e.length; o++) i.push(n | (e[o] >>> t)), (n = e[o] << (32 - t));
            return (o = e.length ? e[e.length - 1] : 0), (e = sjcl.bitArray.getPartial(o)), i.push(sjcl.bitArray.partial((t + e) & 31, 32 < t + e ? n : i.pop(), 1)), i;
        },
        g: function (e, t) {
            return [e[0] ^ t[0], e[1] ^ t[1], e[2] ^ t[2], e[3] ^ t[3]];
        },
        byteswapM: function (e) {
            for (var t, n = 0; n < e.length; ++n) (t = e[n]), (e[n] = (t >>> 24) | ((t >>> 8) & 65280) | ((65280 & t) << 8) | (t << 24));
            return e;
        },
    }),
    (sjcl.codec.utf8String = {
        fromBits: function (e) {
            for (var t, n = "", i = sjcl.bitArray.bitLength(e), o = 0; o < i / 8; o++) 0 == (3 & o) && (t = e[o / 4]), (n += String.fromCharCode(t >>> 24)), (t <<= 8);
            return decodeURIComponent(escape(n));
        },
        toBits: function (e) {
            e = unescape(encodeURIComponent(e));
            for (var t = [], n = 0, i = 0; i < e.length; i++) (n = (n << 8) | e.charCodeAt(i)), 3 == (3 & i) && (t.push(n), (n = 0));
            return 3 & i && t.push(sjcl.bitArray.partial(8 * (3 & i), n)), t;
        },
    }),
    (sjcl.codec.hex = {
        fromBits: function (e) {
            for (var t = "", n = 0; n < e.length; n++) t += (0xf00000000000 + (0 | e[n])).toString(16).substr(4);
            return t.substr(0, sjcl.bitArray.bitLength(e) / 4);
        },
        toBits: function (e) {
            var t,
                n = [],
                i = (e = e.replace(/\s|0x/g, "")).length;
            for (e += "00000000", t = 0; t < e.length; t += 8) n.push(0 ^ parseInt(e.substr(t, 8), 16));
            return sjcl.bitArray.clamp(n, 4 * i);
        },
    }),
    (sjcl.codec.base32 = {
        p: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
        O: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
        BITS: 32,
        BASE: 5,
        REMAINING: 27,
        fromBits: function (e, t, n) {
            var i = sjcl.codec.base32.BASE,
                o = sjcl.codec.base32.REMAINING,
                a = "",
                s = 0,
                r = sjcl.codec.base32.p,
                l = 0,
                c = sjcl.bitArray.bitLength(e);
            for (n && (r = sjcl.codec.base32.O), n = 0; a.length * i < c; ) (a += r.charAt((l ^ (e[n] >>> s)) >>> o)), s < i ? ((l = e[n] << (i - s)), (s += o), n++) : ((l <<= i), (s -= i));
            for (; 7 & a.length && !t; ) a += "=";
            return a;
        },
        toBits: function (e, t) {
            e = e.replace(/\s|=/g, "").toUpperCase();
            var n,
                i,
                o = sjcl.codec.base32.BITS,
                a = sjcl.codec.base32.BASE,
                s = sjcl.codec.base32.REMAINING,
                r = [],
                l = 0,
                c = sjcl.codec.base32.p,
                d = 0,
                u = "base32";
            for (t && ((c = sjcl.codec.base32.O), (u = "base32hex")), n = 0; n < e.length; n++) {
                if ((i = c.indexOf(e.charAt(n))) < 0) {
                    if (!t)
                        try {
                            return sjcl.codec.base32hex.toBits(e);
                        } catch (e) {}
                    q(new sjcl.exception.invalid("this isn't " + u + "!"));
                }
                s < l ? (r.push(d ^ (i >>> (l -= s))), (d = i << (o - l))) : (d ^= i << (o - (l += a)));
            }
            return 56 & l && r.push(sjcl.bitArray.partial(56 & l, d, 1)), r;
        },
    }),
    (sjcl.codec.base32hex = {
        fromBits: function (e, t) {
            return sjcl.codec.base32.fromBits(e, t, 1);
        },
        toBits: function (e) {
            return sjcl.codec.base32.toBits(e, 1);
        },
    }),
    (sjcl.codec.base64 = {
        p: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        fromBits: function (e, t, n) {
            var i = "",
                o = 0,
                a = sjcl.codec.base64.p,
                s = 0,
                r = sjcl.bitArray.bitLength(e);
            for (n && (a = a.substr(0, 62) + "-_"), n = 0; 6 * i.length < r; ) (i += a.charAt((s ^ (e[n] >>> o)) >>> 26)), o < 6 ? ((s = e[n] << (6 - o)), (o += 26), n++) : ((s <<= 6), (o -= 6));
            for (; 3 & i.length && !t; ) i += "=";
            return i;
        },
        toBits: function (e, t) {
            e = e.replace(/\s|=/g, "");
            var n,
                i,
                o = [],
                a = 0,
                s = sjcl.codec.base64.p,
                r = 0;
            for (t && (s = s.substr(0, 62) + "-_"), n = 0; n < e.length; n++)
                (i = s.indexOf(e.charAt(n))) < 0 && q(new sjcl.exception.invalid("this isn't base64!")), 26 < a ? (o.push(r ^ (i >>> (a -= 26))), (r = i << (32 - a))) : (r ^= i << (32 - (a += 6)));
            return 56 & a && o.push(sjcl.bitArray.partial(56 & a, r, 1)), o;
        },
    }),
    (sjcl.codec.base64url = {
        fromBits: function (e) {
            return sjcl.codec.base64.fromBits(e, 1, 1);
        },
        toBits: function (e) {
            return sjcl.codec.base64.toBits(e, 1);
        },
    }),
    (sjcl.hash.sha256 = function (e) {
        this.b[0] || this.G(), e ? ((this.s = e.s.slice(0)), (this.o = e.o.slice(0)), (this.i = e.i)) : this.reset();
    }),
    (sjcl.hash.sha256.hash = function (e) {
        return new sjcl.hash.sha256().update(e).finalize();
    }),
    (sjcl.hash.sha256.prototype = {
        blockSize: 512,
        reset: function () {
            return (this.s = this.P.slice(0)), (this.o = []), (this.i = 0), this;
        },
        update: function (e) {
            "string" == typeof e && (e = sjcl.codec.utf8String.toBits(e));
            var t = (this.o = sjcl.bitArray.concat(this.o, e)),
                n = this.i;
            for (e = this.i = n + sjcl.bitArray.bitLength(e), n = (512 + n) & -512; n <= e; n += 512) x(this, t.splice(0, 16));
            return this;
        },
        finalize: function () {
            for (var e = this.o, t = this.s, n = (e = sjcl.bitArray.concat(e, [sjcl.bitArray.partial(1, 1)])).length + 2; 15 & n; n++) e.push(0);
            for (e.push(Math.floor(this.i / 4294967296)), e.push(0 | this.i); e.length; ) x(this, e.splice(0, 16));
            return this.reset(), t;
        },
        P: [],
        b: [],
        G: function () {
            function e(e) {
                return (4294967296 * (e - Math.floor(e))) | 0;
            }
            var t,
                n = 0,
                i = 2;
            e: for (; n < 64; i++) {
                for (t = 2; t * t <= i; t++) if (0 == i % t) continue e;
                n < 8 && (this.P[n] = e(Math.pow(i, 0.5))), (this.b[n] = e(Math.pow(i, 1 / 3))), n++;
            }
        },
    }),
    (sjcl.mode.ccm = {
        name: "ccm",
        t: [],
        listenProgress: function (e) {
            sjcl.mode.ccm.t.push(e);
        },
        unListenProgress: function (e) {
            -1 < (e = sjcl.mode.ccm.t.indexOf(e)) && sjcl.mode.ccm.t.splice(e, 1);
        },
        X: function (e) {
            for (var t = sjcl.mode.ccm.t.slice(), n = 0; n < t.length; n += 1) t[n](e);
        },
        encrypt: function (e, t, n, i, o) {
            var a,
                s = t.slice(0),
                r = sjcl.bitArray,
                l = r.bitLength(n) / 8,
                c = r.bitLength(s) / 8;
            for (o = o || 64, i = i || [], l < 7 && q(new sjcl.exception.invalid("ccm: iv must be at least 7 bytes")), a = 2; a < 4 && c >>> (8 * a); a++);
            return (n = r.clamp(n, 8 * (15 - (a = a < 15 - l ? 15 - l : a)))), (t = sjcl.mode.ccm.M(e, t, n, i, o, a)), (s = sjcl.mode.ccm.q(e, s, n, t, o, a)), r.concat(s.data, s.tag);
        },
        decrypt: function (e, t, n, i, o) {
            (o = o || 64), (i = i || []);
            var a = sjcl.bitArray,
                s = a.bitLength(n) / 8,
                r = a.bitLength(t),
                l = a.clamp(t, r - o),
                c = a.bitSlice(t, r - o),
                r = (r - o) / 8;
            for (s < 7 && q(new sjcl.exception.invalid("ccm: iv must be at least 7 bytes")), t = 2; t < 4 && r >>> (8 * t); t++);
            return (
                (n = a.clamp(n, 8 * (15 - (t = t < 15 - s ? 15 - s : t)))),
                (l = sjcl.mode.ccm.q(e, l, n, c, o, t)),
                (e = sjcl.mode.ccm.M(e, l.data, n, i, o, t)),
                a.equal(l.tag, e) || q(new sjcl.exception.corrupt("ccm: tag doesn't match")),
                l.data
            );
        },
        ea: function (e, t, n, i, o, a) {
            var s = [],
                r = sjcl.bitArray,
                l = r.g;
            if (((i = [r.partial(8, (t.length ? 64 : 0) | ((i - 2) << 2) | (a - 1))]), ((i = r.concat(i, n))[3] |= o), (i = e.encrypt(i)), t.length))
                for ((n = r.bitLength(t) / 8) <= 65279 ? (s = [r.partial(16, n)]) : n <= 4294967295 && (s = r.concat([r.partial(16, 65534)], [n])), s = r.concat(s, t), t = 0; t < s.length; t += 4)
                    i = e.encrypt(l(i, s.slice(t, t + 4).concat([0, 0, 0])));
            return i;
        },
        M: function (e, t, n, i, o, a) {
            var s = sjcl.bitArray,
                r = s.g;
            for (
                ((o /= 8) % 2 || o < 4 || 16 < o) && q(new sjcl.exception.invalid("ccm: invalid tag length")),
                    (4294967295 < i.length || 4294967295 < t.length) && q(new sjcl.exception.bug("ccm: can't deal with 4GiB or more data")),
                    n = sjcl.mode.ccm.ea(e, i, n, o, s.bitLength(t) / 8, a),
                    i = 0;
                i < t.length;
                i += 4
            )
                n = e.encrypt(r(n, t.slice(i, i + 4).concat([0, 0, 0])));
            return s.clamp(n, 8 * o);
        },
        q: function (e, t, n, i, o, a) {
            var s = sjcl.bitArray,
                r = s.g,
                l = t.length,
                c = s.bitLength(t),
                d = l / 50,
                u = d;
            if (
                ((n = s
                    .concat([s.partial(8, a - 1)], n)
                    .concat([0, 0, 0])
                    .slice(0, 4)),
                (i = s.bitSlice(r(i, e.encrypt(n)), 0, o)),
                !l)
            )
                return { tag: i, data: [] };
            for (r = 0; r < l; r += 4) d < r && (sjcl.mode.ccm.X(r / l), (d += u)), n[3]++, (o = e.encrypt(n)), (t[r] ^= o[0]), (t[r + 1] ^= o[1]), (t[r + 2] ^= o[2]), (t[r + 3] ^= o[3]);
            return { tag: i, data: s.clamp(t, c) };
        },
    }),
    (sjcl.mode.ocb2 = {
        name: "ocb2",
        encrypt: function (e, t, n, i, o, a) {
            128 !== sjcl.bitArray.bitLength(n) && q(new sjcl.exception.invalid("ocb iv must be 128 bits"));
            var s,
                r = sjcl.mode.ocb2.J,
                l = sjcl.bitArray,
                c = l.g,
                d = [0, 0, 0, 0];
            n = r(e.encrypt(n));
            var u,
                p = [];
            for (i = i || [], o = o || 64, s = 0; s + 4 < t.length; s += 4) (d = c(d, (u = t.slice(s, s + 4)))), (p = p.concat(c(n, e.encrypt(c(n, u))))), (n = r(n));
            return (
                (u = t.slice(s)),
                (t = l.bitLength(u)),
                (s = e.encrypt(c(n, [0, 0, 0, t]))),
                (u = l.clamp(c(u.concat([0, 0, 0]), s), t)),
                (d = c(d, c(u.concat([0, 0, 0]), s))),
                (d = e.encrypt(c(d, c(n, r(n))))),
                i.length && (d = c(d, a ? i : sjcl.mode.ocb2.pmac(e, i))),
                p.concat(l.concat(u, l.clamp(d, o)))
            );
        },
        decrypt: function (e, t, n, i, o, a) {
            128 !== sjcl.bitArray.bitLength(n) && q(new sjcl.exception.invalid("ocb iv must be 128 bits")), (o = o || 64);
            var s,
                r,
                l = sjcl.mode.ocb2.J,
                c = sjcl.bitArray,
                d = c.g,
                u = [0, 0, 0, 0],
                p = l(e.encrypt(n)),
                h = sjcl.bitArray.bitLength(t) - o,
                f = [];
            for (i = i || [], n = 0; n + 4 < h / 32; n += 4) (s = d(p, e.decrypt(d(p, t.slice(n, n + 4))))), (u = d(u, s)), (f = f.concat(s)), (p = l(p));
            return (
                (s = e.encrypt(d(p, [0, 0, 0, (r = h - 32 * n)]))),
                (s = d(s, c.clamp(t.slice(n), r).concat([0, 0, 0]))),
                (u = d(u, s)),
                (u = e.encrypt(d(u, d(p, l(p))))),
                i.length && (u = d(u, a ? i : sjcl.mode.ocb2.pmac(e, i))),
                c.equal(c.clamp(u, o), c.bitSlice(t, h)) || q(new sjcl.exception.corrupt("ocb: tag doesn't match")),
                f.concat(c.clamp(s, r))
            );
        },
        pmac: function (e, t) {
            for (var n = sjcl.mode.ocb2.J, i = sjcl.bitArray, o = i.g, a = [0, 0, 0, 0], s = o((s = e.encrypt([0, 0, 0, 0])), n(n(s))), r = 0; r + 4 < t.length; r += 4) (s = n(s)), (a = o(a, e.encrypt(o(s, t.slice(r, r + 4)))));
            return (r = t.slice(r)), i.bitLength(r) < 128 && ((s = o(s, n(s))), (r = i.concat(r, [-2147483648, 0, 0, 0]))), (a = o(a, r)), e.encrypt(o(n(o(s, n(s))), a));
        },
        J: function (e) {
            return [(e[0] << 1) ^ (e[1] >>> 31), (e[1] << 1) ^ (e[2] >>> 31), (e[2] << 1) ^ (e[3] >>> 31), (e[3] << 1) ^ (135 * (e[0] >>> 31))];
        },
    }),
    (sjcl.mode.gcm = {
        name: "gcm",
        encrypt: function (e, t, n, i, o) {
            var a = t.slice(0);
            return (t = sjcl.bitArray), (e = sjcl.mode.gcm.q(!0, e, a, (i = i || []), n, o || 128)), t.concat(e.data, e.tag);
        },
        decrypt: function (e, t, n, i, o) {
            var a = t.slice(0),
                s = sjcl.bitArray,
                r = s.bitLength(a);
            return (
                (i = i || []),
                (a = (o = o || 128) <= r ? ((t = s.bitSlice(a, r - o)), s.bitSlice(a, 0, r - o)) : ((t = a), [])),
                (e = sjcl.mode.gcm.q(u, e, a, i, n, o)),
                s.equal(e.tag, t) || q(new sjcl.exception.corrupt("gcm: tag doesn't match")),
                e.data
            );
        },
        ba: function (e, t) {
            for (var n, i, o = sjcl.bitArray.g, a = [0, 0, 0, 0], s = t.slice(0), r = 0; r < 128; r++) {
                for ((n = 0 != (e[Math.floor(r / 32)] & (1 << (31 - (r % 32))))) && (a = o(a, s)), i = 0 != (1 & s[3]), n = 3; 0 < n; n--) s[n] = (s[n] >>> 1) | ((1 & s[n - 1]) << 31);
                (s[0] >>>= 1), i && (s[0] ^= -520093696);
            }
            return a;
        },
        h: function (e, t, n) {
            var i,
                o = n.length;
            for (t = t.slice(0), i = 0; i < o; i += 4) (t[0] ^= 4294967295 & n[i]), (t[1] ^= 4294967295 & n[i + 1]), (t[2] ^= 4294967295 & n[i + 2]), (t[3] ^= 4294967295 & n[i + 3]), (t = sjcl.mode.gcm.ba(t, e));
            return t;
        },
        q: function (e, t, n, i, o, a) {
            var s,
                r,
                l,
                c = sjcl.bitArray,
                d = n.length,
                u = c.bitLength(n),
                p = c.bitLength(i),
                h = c.bitLength(o),
                f = t.encrypt([0, 0, 0, 0]);
            for (
                o = 96 === h ? ((o = o.slice(0)), c.concat(o, [1])) : ((o = sjcl.mode.gcm.h(f, [0, 0, 0, 0], o)), sjcl.mode.gcm.h(f, o, [0, 0, Math.floor(h / 4294967296), 4294967295 & h])),
                    h = sjcl.mode.gcm.h(f, [0, 0, 0, 0], i),
                    l = o.slice(0),
                    i = h.slice(0),
                    e || (i = sjcl.mode.gcm.h(f, h, n)),
                    r = 0;
                r < d;
                r += 4
            )
                l[3]++, (s = t.encrypt(l)), (n[r] ^= s[0]), (n[r + 1] ^= s[1]), (n[r + 2] ^= s[2]), (n[r + 3] ^= s[3]);
            return (
                (n = c.clamp(n, u)),
                e && (i = sjcl.mode.gcm.h(f, h, n)),
                (e = [Math.floor(p / 4294967296), 4294967295 & p, Math.floor(u / 4294967296), 4294967295 & u]),
                (i = sjcl.mode.gcm.h(f, i, e)),
                (s = t.encrypt(o)),
                (i[0] ^= s[0]),
                (i[1] ^= s[1]),
                (i[2] ^= s[2]),
                (i[3] ^= s[3]),
                { tag: c.bitSlice(i, 0, a), data: n }
            );
        },
    }),
    (sjcl.misc.hmac = function (e, t) {
        this.N = t = t || sjcl.hash.sha256;
        var n,
            i = [[], []],
            o = t.prototype.blockSize / 32;
        for (this.n = [new t(), new t()], e.length > o && (e = t.hash(e)), n = 0; n < o; n++) (i[0][n] = 909522486 ^ e[n]), (i[1][n] = 1549556828 ^ e[n]);
        this.n[0].update(i[0]), this.n[1].update(i[1]), (this.I = new t(this.n[0]));
    }),
    (sjcl.misc.hmac.prototype.encrypt = sjcl.misc.hmac.prototype.mac = function (e) {
        return this.S && q(new sjcl.exception.invalid("encrypt on already updated hmac called!")), this.update(e), this.digest(e);
    }),
    (sjcl.misc.hmac.prototype.reset = function () {
        (this.I = new this.N(this.n[0])), (this.S = u);
    }),
    (sjcl.misc.hmac.prototype.update = function (e) {
        (this.S = !0), this.I.update(e);
    }),
    (sjcl.misc.hmac.prototype.digest = function () {
        var e = this.I.finalize(),
            e = new this.N(this.n[1]).update(e).finalize();
        return this.reset(), e;
    }),
    (sjcl.misc.pbkdf2 = function (e, t, n, i, o) {
        (n = n || 1e3),
            (i < 0 || n < 0) && q(sjcl.exception.invalid("invalid params to pbkdf2")),
            "string" == typeof e && (e = sjcl.codec.utf8String.toBits(e)),
            "string" == typeof t && (t = sjcl.codec.utf8String.toBits(t)),
            (e = new (o = o || sjcl.misc.hmac)(e));
        for (var a, s, r, l = [], c = sjcl.bitArray, d = 1; 32 * l.length < (i || 1); d++) {
            for (o = a = e.encrypt(c.concat(t, [d])), s = 1; s < n; s++) for (a = e.encrypt(a), r = 0; r < a.length; r++) o[r] ^= a[r];
            l = l.concat(o);
        }
        return (l = i ? c.clamp(l, i) : l);
    }),
    (sjcl.prng = function (e) {
        (this.c = [new sjcl.hash.sha256()]),
            (this.j = [0]),
            (this.H = 0),
            (this.u = {}),
            (this.F = 0),
            (this.L = {}),
            (this.Q = this.d = this.k = this.Z = 0),
            (this.b = [0, 0, 0, 0, 0, 0, 0, 0]),
            (this.f = [0, 0, 0, 0]),
            (this.C = s),
            (this.D = e),
            (this.r = u),
            (this.B = { progress: {}, seeded: {} }),
            (this.m = this.Y = 0),
            (this.w = 1),
            (this.A = 2),
            (this.U = 65536),
            (this.K = [0, 48, 64, 96, 128, 192, 256, 384, 512, 768, 1024]),
            (this.V = 3e4),
            (this.T = 80);
    }),
    (sjcl.prng.prototype = {
        randomWords: function (e, t) {
            var n = [];
            if (((o = this.isReady(t)) === this.m && q(new sjcl.exception.notReady("generator isn't seeded")), o & this.A)) {
                var i,
                    o = !(o & this.w),
                    a = [],
                    s = 0;
                for (this.Q = a[0] = new Date().valueOf() + this.V, i = 0; i < 16; i++) a.push((4294967296 * Math.random()) | 0);
                for (i = 0; i < this.c.length && ((a = a.concat(this.c[i].finalize())), (s += this.j[i]), (this.j[i] = 0), o || !(this.H & (1 << i))); i++);
                for (
                    this.H >= 1 << this.c.length && (this.c.push(new sjcl.hash.sha256()), this.j.push(0)),
                        this.d -= s,
                        s > this.k && (this.k = s),
                        this.H++,
                        this.b = sjcl.hash.sha256.hash(this.b.concat(a)),
                        this.C = new sjcl.cipher.aes(this.b),
                        o = 0;
                    o < 4 && ((this.f[o] = (this.f[o] + 1) | 0), !this.f[o]);
                    o++
                );
            }
            for (o = 0; o < e; o += 4) 0 == (o + 1) % this.U && A(this), (a = B(this)), n.push(a[0], a[1], a[2], a[3]);
            return A(this), n.slice(0, e);
        },
        setDefaultParanoia: function (e, t) {
            0 === e && "Setting paranoia=0 will ruin your security; use it only for testing" !== t && q("Setting paranoia=0 will ruin your security; use it only for testing"), (this.D = e);
        },
        addEntropy: function (e, t, n) {
            n = n || "user";
            var i,
                o = new Date().valueOf(),
                a = this.u[n],
                r = this.isReady(),
                l = 0,
                c = this.L[n];
            switch ((c === s && (c = this.L[n] = this.Z++), a === s && (a = this.u[n] = 0), (this.u[n] = (this.u[n] + 1) % this.c.length), typeof e)) {
                case "number":
                    t === s && (t = 1), this.c[a].update([c, this.F++, 1, t, o, 1, 0 | e]);
                    break;
                case "object":
                    if ("[object Uint32Array]" === (n = Object.prototype.toString.call(e))) {
                        for (i = [], n = 0; n < e.length; n++) i.push(e[n]);
                        e = i;
                    } else for ("[object Array]" !== n && (l = 1), n = 0; n < e.length && !l; n++) "number" != typeof e[n] && (l = 1);
                    if (!l) {
                        if (t === s) for (n = t = 0; n < e.length; n++) for (i = e[n]; 0 < i; ) t++, (i >>>= 1);
                        this.c[a].update([c, this.F++, 2, t, o, e.length].concat(e));
                    }
                    break;
                case "string":
                    t === s && (t = e.length), this.c[a].update([c, this.F++, 3, t, o, e.length]), this.c[a].update(e);
                    break;
                default:
                    l = 1;
            }
            l && q(new sjcl.exception.bug("random: addEntropy only supports number, array of numbers or string")),
                (this.j[a] += t),
                (this.d += t),
                r === this.m && (this.isReady() !== this.m && C("seeded", Math.max(this.k, this.d)), C("progress", this.getProgress()));
        },
        isReady: function (e) {
            return (e = this.K[e !== s ? e : this.D]), this.k && this.k >= e ? (this.j[0] > this.T && new Date().valueOf() > this.Q ? this.A | this.w : this.w) : this.d >= e ? this.A | this.m : this.m;
        },
        getProgress: function (e) {
            return (e = this.K[e || this.D]), this.k >= e || this.d > e ? 1 : this.d / e;
        },
        startCollectors: function () {
            this.r ||
                ((this.a = { loadTimeCollector: D(this, this.da), mouseCollector: D(this, this.fa), keyboardCollector: D(this, this.ca), accelerometerCollector: D(this, this.W), touchCollector: D(this, this.ha) }),
                window.addEventListener
                    ? (window.addEventListener("load", this.a.loadTimeCollector, u),
                      window.addEventListener("mousemove", this.a.mouseCollector, u),
                      window.addEventListener("keypress", this.a.keyboardCollector, u),
                      window.addEventListener("devicemotion", this.a.accelerometerCollector, u),
                      window.addEventListener("touchmove", this.a.touchCollector, u))
                    : document.attachEvent
                    ? (document.attachEvent("onload", this.a.loadTimeCollector), document.attachEvent("onmousemove", this.a.mouseCollector), document.attachEvent("keypress", this.a.keyboardCollector))
                    : q(new sjcl.exception.bug("can't attach event")),
                (this.r = !0));
        },
        stopCollectors: function () {
            this.r &&
                (window.removeEventListener
                    ? (window.removeEventListener("load", this.a.loadTimeCollector, u),
                      window.removeEventListener("mousemove", this.a.mouseCollector, u),
                      window.removeEventListener("keypress", this.a.keyboardCollector, u),
                      window.removeEventListener("devicemotion", this.a.accelerometerCollector, u),
                      window.removeEventListener("touchmove", this.a.touchCollector, u))
                    : document.detachEvent && (document.detachEvent("onload", this.a.loadTimeCollector), document.detachEvent("onmousemove", this.a.mouseCollector), document.detachEvent("keypress", this.a.keyboardCollector)),
                (this.r = u));
        },
        addEventListener: function (e, t) {
            this.B[e][this.Y++] = t;
        },
        removeEventListener: function (e, t) {
            var n,
                i,
                o = this.B[e],
                a = [];
            for (i in o) o.hasOwnProperty(i) && o[i] === t && a.push(i);
            for (n = 0; n < a.length; n++) delete o[(i = a[n])];
        },
        ca: function () {
            E(1);
        },
        fa: function (e) {
            var t, n;
            try {
                (t = e.x || e.clientX || e.offsetX || 0), (n = e.y || e.clientY || e.offsetY || 0);
            } catch (e) {
                n = t = 0;
            }
            0 != t && 0 != n && sjcl.random.addEntropy([t, n], 2, "mouse"), E(0);
        },
        ha: function (e) {
            (e = e.touches[0] || e.changedTouches[0]), sjcl.random.addEntropy([e.pageX || e.clientX, e.pageY || e.clientY], 1, "touch"), E(0);
        },
        da: function () {
            E(2);
        },
        W: function (e) {
            var t;
            (e = e.accelerationIncludingGravity.x || e.accelerationIncludingGravity.y || e.accelerationIncludingGravity.z),
                window.orientation && "number" == typeof (t = window.orientation) && sjcl.random.addEntropy(t, 1, "accelerometer"),
                e && sjcl.random.addEntropy(e, 2, "accelerometer"),
                E(0);
        },
    }),
    (sjcl.random = new sjcl.prng(6));
e: try {
    if ((I = "undefined" != typeof module)) {
        if ((J = module.exports)) {
            try {
                K = require("crypto");
            } catch (L) {
                K = null;
            }
            J = (G = K) && G.randomBytes;
        }
        I = J;
    }
    if (I) (F = G.randomBytes(128)), (F = new Uint32Array(new Uint8Array(F).buffer)), sjcl.random.addEntropy(F, 1024, "crypto['randomBytes']");
    else if ("undefined" != typeof window && "undefined" != typeof Uint32Array) {
        if (((H = new Uint32Array(32)), window.crypto && window.crypto.getRandomValues)) window.crypto.getRandomValues(H);
        else {
            if (!window.msCrypto || !window.msCrypto.getRandomValues) break e;
            window.msCrypto.getRandomValues(H);
        }
        sjcl.random.addEntropy(H, 1024, "crypto['getRandomValues']");
    }
} catch (M) {
    "undefined" != typeof window && window.console && (console.log("There was an error collecting entropy from the browser:"), console.log(M));
}
(sjcl.json = {
    defaults: { v: 1, iter: 1e3, ks: 128, ts: 64, mode: "ccm", adata: "", cipher: "aes" },
    aa: function (e, t, n, i) {
        (n = n || {}), (i = i || {});
        var o,
            a = sjcl.json,
            s = a.e({ iv: sjcl.random.randomWords(4, 0) }, a.defaults);
        return (
            a.e(s, n),
            (n = s.adata),
            "string" == typeof s.salt && (s.salt = sjcl.codec.base64.toBits(s.salt)),
            "string" == typeof s.iv && (s.iv = sjcl.codec.base64.toBits(s.iv)),
            (!sjcl.mode[s.mode] || !sjcl.cipher[s.cipher] || ("string" == typeof e && s.iter <= 100) || (64 !== s.ts && 96 !== s.ts && 128 !== s.ts) || (128 !== s.ks && 192 !== s.ks && 256 !== s.ks) || s.iv.length < 2 || 4 < s.iv.length) &&
                q(new sjcl.exception.invalid("json encrypt: invalid parameters")),
            "string" == typeof e
                ? ((e = (o = sjcl.misc.cachedPbkdf2(e, s)).key.slice(0, s.ks / 32)), (s.salt = o.salt))
                : sjcl.ecc && e instanceof sjcl.ecc.elGamal.publicKey && ((o = e.kem()), (s.kemtag = o.tag), (e = o.key.slice(0, s.ks / 32))),
            "string" == typeof t && (t = sjcl.codec.utf8String.toBits(t)),
            "string" == typeof n && (s.adata = n = sjcl.codec.utf8String.toBits(n)),
            (o = new sjcl.cipher[s.cipher](e)),
            a.e(i, s),
            (i.key = e),
            (s.ct = ("ccm" === s.mode && sjcl.arrayBuffer && sjcl.arrayBuffer.ccm && t instanceof ArrayBuffer ? sjcl.arrayBuffer.ccm : sjcl.mode[s.mode]).encrypt(o, t, s.iv, n, s.ts)),
            s
        );
    },
    encrypt: function (e, t, n, i) {
        var o = sjcl.json,
            a = o.aa.apply(o, arguments);
        return o.encode(a);
    },
    $: function (e, t, n, i) {
        (n = n || {}), (i = i || {});
        var o,
            a = sjcl.json,
            s = (t = a.e(a.e(a.e({}, a.defaults), t), n, !0)).adata;
        return (
            "string" == typeof t.salt && (t.salt = sjcl.codec.base64.toBits(t.salt)),
            "string" == typeof t.iv && (t.iv = sjcl.codec.base64.toBits(t.iv)),
            (!sjcl.mode[t.mode] ||
                !sjcl.cipher[t.cipher] ||
                ("string" == typeof e && t.iter <= 100) ||
                (64 !== t.ts && 96 !== t.ts && 128 !== t.ts) ||
                (128 !== t.ks && 192 !== t.ks && 256 !== t.ks) ||
                !t.iv ||
                t.iv.length < 2 ||
                4 < t.iv.length) &&
                q(new sjcl.exception.invalid("json decrypt: invalid parameters")),
            "string" == typeof e
                ? ((e = (o = sjcl.misc.cachedPbkdf2(e, t)).key.slice(0, t.ks / 32)), (t.salt = o.salt))
                : sjcl.ecc && e instanceof sjcl.ecc.elGamal.secretKey && (e = e.unkem(sjcl.codec.base64.toBits(t.kemtag)).slice(0, t.ks / 32)),
            "string" == typeof s && (s = sjcl.codec.utf8String.toBits(s)),
            (o = new sjcl.cipher[t.cipher](e)),
            (s = "ccm" === t.mode && sjcl.arrayBuffer && sjcl.arrayBuffer.ccm && t.ct instanceof ArrayBuffer ? sjcl.arrayBuffer.ccm.decrypt(o, t.ct, t.iv, t.tag, s, t.ts) : sjcl.mode[t.mode].decrypt(o, t.ct, t.iv, s, t.ts)),
            a.e(i, t),
            (i.key = e),
            1 === n.raw ? s : sjcl.codec.utf8String.fromBits(s)
        );
    },
    decrypt: function (e, t, n, i) {
        var o = sjcl.json;
        return o.$(e, o.decode(t), n, i);
    },
    encode: function (e) {
        var t,
            n = "{",
            i = "";
        for (t in e)
            if (e.hasOwnProperty(t))
                switch ((t.match(/^[a-z0-9]+$/i) || q(new sjcl.exception.invalid("json encode: invalid property name")), (n += i + '"' + t + '":'), (i = ","), typeof e[t])) {
                    case "number":
                    case "boolean":
                        n += e[t];
                        break;
                    case "string":
                        n += '"' + escape(e[t]) + '"';
                        break;
                    case "object":
                        n += '"' + sjcl.codec.base64.fromBits(e[t], 0) + '"';
                        break;
                    default:
                        q(new sjcl.exception.bug("json encode: unsupported type"));
                }
        return n + "}";
    },
    decode: function (e) {
        (e = e.replace(/\s/g, "")).match(/^\{.*\}$/) || q(new sjcl.exception.invalid("json decode: this isn't json!")), (e = e.replace(/^\{|\}$/g, "").split(/,/));
        for (var t, n = {}, i = 0; i < e.length; i++)
            (t = e[i].match(/^\s*(?:(["']?)([a-z][a-z0-9]*)\1)\s*:\s*(?:(-?\d+)|"([a-z0-9+\/%*_.@=\-]*)"|(true|false))$/i)) || q(new sjcl.exception.invalid("json decode: this isn't json!")),
                null != t[3] ? (n[t[2]] = parseInt(t[3], 10)) : null != t[4] ? (n[t[2]] = t[2].match(/^(ct|adata|salt|iv)$/) ? sjcl.codec.base64.toBits(t[4]) : unescape(t[4])) : null != t[5] && (n[t[2]] = "true" === t[5]);
        return n;
    },
    e: function (e, t, n) {
        if ((e === s && (e = {}), t !== s)) for (var i in t) t.hasOwnProperty(i) && (n && e[i] !== s && e[i] !== t[i] && q(new sjcl.exception.invalid("required parameter overridden")), (e[i] = t[i]));
        return e;
    },
    ja: function (e, t) {
        var n,
            i = {};
        for (n in e) e.hasOwnProperty(n) && e[n] !== t[n] && (i[n] = e[n]);
        return i;
    },
    ia: function (e, t) {
        for (var n = {}, i = 0; i < t.length; i++) e[t[i]] !== s && (n[t[i]] = e[t[i]]);
        return n;
    },
}),
    (sjcl.encrypt = sjcl.json.encrypt),
    (sjcl.decrypt = sjcl.json.decrypt),
    (sjcl.misc.ga = {}),
    (sjcl.misc.cachedPbkdf2 = function (e, t) {
        var n = sjcl.misc.ga,
            i = (t = t || {}).iter || 1e3;
        return (
            ((i = (n = n[e] = n[e] || {})[i] = n[i] || { firstSalt: t.salt && t.salt.length ? t.salt.slice(0) : sjcl.random.randomWords(2, 0) })[(n = t.salt === s ? i.firstSalt : t.salt)] = i[n] || sjcl.misc.pbkdf2(e, n, t.iter)),
            { key: i[n].slice(0), salt: n.slice(0) }
        );
    });
