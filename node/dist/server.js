!function (e) {
    var t = {};
    function s(a) {
        if (t[a]) return t[a].exports;
        var r = t[a] = { i: a, l: !1, exports: {} };
        return e[a].call(r.exports, r, r.exports, s), r.l = !0, r.exports
    } s.m = e, s.c = t, s.d = function (e, t, a) { s.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: a }) }, s.r = function (e) { "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 }) }, s.t = function (e, t) {
        if (1 & t && (e = s(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var a = Object.create(null);
        if (s.r(a), Object.defineProperty(a, "default", { enumerable: !0, value: e }), 2 & t && "string" != typeof e) for (var r in e) s.d(a, r, function (t) { return e[t] }.bind(null, r));
        return a
    }, s.n = function (e) {
        var t = e && e.__esModule ? function () { return e.default } : function () { return e };
        return s.d(t, "a", t), t
    }, s.o = function (e, t) { return Object.prototype.hasOwnProperty.call(e, t) }, s.p = "/", s(s.s = 8)
}([function (e, t) { e.exports = require("express") }, function (e, t) { t.responseMiddleware = (e, t, s) => { t.data || (t.data = {}), !0 === t.data.error ? t.status(t.data.status).send(t.data) : t.status(200).send(t.data) } }, function (e, t, s) {
    const { BaseRepository: a } = s(3);
    t.UserRepository = new class extends a { constructor() { super("users") } }
}, function (e, t, s) {
    const { dbAdapter: a } = s(5), { v4: r } = s(12);
    t.BaseRepository = class {
        constructor(e) { this.dbContext = a.get(e), this.collectionName = e } generateId() { return r() } getAll() { return this.dbContext.value() } getOne(e) { return this.dbContext.find(e).value() } create(e) {
            e.id = this.generateId(), e.createdAt = new Date;
            return this.dbContext.push(e).write().find(t => t.id === e.id)
        } update(e, t) { return t.updatedAt = new Date, this.dbContext.find({ id: e }).assign(t).write() } delete(e) { return this.dbContext.remove({ id: e }).write() }
    }
}, function (e, t, s) {
    const { BaseRepository: a } = s(3);
    t.FighterRepository = new class extends a { constructor() { super("fighters") } }
}, function (e, t, s) {
    const a = s(7).resolve() + "/database.json", r = s(10)(new (s(11))(a));
    r.defaults({ users: [], fighters: [], fights: [], details: [], controls: [] }).write(), t.dbAdapter = r
}, function (e, t) {
    t.testFieldsList = (e, t) => {
        let s = "";
        const a = Object.keys(e);
        a.splice(0, 1);
        const r = Object.keys(t);
        let o = "";
        a.forEach(e => { r.indexOf(e) < 0 && (o += e + " ") }), "" !== o && (s = "No fields in request : " + o + "\n"), o = "";
        let i = "";
        return r.forEach(e => { a.indexOf(e) < 0 && (o += e + " "), "" === t[e] && (i += "\n --- " + e) }), "" !== o && (s += "Extra fields in request : " + o + "\n"), "" !== i && (s += "Empty fields in request : " + i + "\n"), s
    }
}, function (e, t) { e.exports = require("path") }, function (e, t, s) {
    const a = s(0), r = s(9), o = s(7);
    s(5);
    const { UserRepository: i } = s(2), n = a();
    let d = !0;
    n.use(r()), n.use(a.json()), n.use(a.urlencoded({ extended: !0 }));
    s(13)(n);
    const c = o.resolve(__dirname + "/../client/build");
    n.use(a.static(c)), n.get("/client/buttle/*", (function (e, t) {
        if (d) {
            const s = o.resolve(`${__dirname}/../${e.url}`);
            t.sendFile(s)
        } else t.sendStatus(403)
    })), n.get("/client/pages/*", (function (e, t) {
        const s = e.params[0].split(":");
        d || function (e) {
            if (e.id) {
                const t = i.getOne(t => t.id === e.id);
                d = t
            } return d
        }(e.query) ? t.sendFile(o.resolve(o.resolve(`${__dirname}/../client/pages/${s[0]}`))) : t.sendStatus(403)
    }));
    s(34).config();
    n.listen(3050, () => { console.log("Server listening on port 3050 !") }), t.app = n
}, function (e, t) { e.exports = require("cors") }, function (e, t) { e.exports = require("lowdb") }, function (e, t) { e.exports = require("lowdb/adapters/FileSync") }, function (e, t) { e.exports = require("uuid") }, function (e, t, s) {
    const a = s(14), r = s(18), o = s(19), i = s(23), n = s(28), d = s(31);
    e.exports = e => { e.use("/api/users", a), e.use("/api/fighters", o), e.use("/api/fights", i), e.use("/api/auth", r), e.use("/api/details", n), e.use("/api/controls", d) }
}, function (e, t, s) {
    const { Router: a } = s(0), r = s(15), { createUserValid: o, updateUserValid: i } = s(16), { responseMiddleware: n } = s(1), d = a();
    d.get("/", r.get, n), d.get("/:id", r.getId, n), d.delete("/:id", r.delete, n), d.post("/", o, r.post, n), d.put("/:id", i, r.put, n), e.exports = d
}, function (e, t, s) {
    const { UserRepository: a } = s(2);
    e.exports = new class {
        search(e) {
            const t = a.getOne(e);
            return t || null
        } get(e, t, s) {
            try {
                const e = a.getAll();
                t.data = e
            } catch (e) { t.data = { error: !0, message: e, status: 404 } } finally { s() }
        } getId(e, t, s) {
            try {
                const r = e.params.id, o = a.getOne(e => e.id === r);
                t.data = o || { error: !0, message: "No such user ...", status: 404 }
            } catch (e) { t.data = { error: !0, message: e, status: 404 } } finally { s() }
        } delete(e, t, s) {
            try {
                const r = e.params.id;
                let o = a.getOne(e => e.id === r);
                o || (t.data = { error: !0, message: "No such user found !", status: 404 }, s()), o = a.delete(r), t.data = o
            } catch (e) { t.data = { error: !0, message: e, status: 404 } } finally { s() }
        } post(e, t, s) {
            try {
                if (!t.data.error) {
                    const s = a.create(e.body);
                    t.data = s
                }
            } catch (e) { t.data = { error: !0, message: "Error while processing ...", status: 404 } } finally { s() }
        } put(e, t, s) {
            try {
                if (!t.data.error) {
                    const s = t.data.data, r = a.update(s, e.body);
                    t.data = r
                }
            } catch (e) { t.data = { error: !0, message: "Error while processing ...", status: 404 } } finally { s() }
        }
    }
}, function (e, t, s) {
    const { user: a } = s(17), { UserRepository: r } = s(2), { testFieldsList: o } = s(6);
    function i(e) {
        let t = "", s = !1, a = 0, r = 0, o = 0, i = "";
        for ("+" === e.charAt(0) && (s = !0, a = 1);
            a < e.length;
            a++) {
                switch (e.charAt(a)) {
                    case " ": case "-": break;
                    case "(": 0 == o ? o = 1 : i = e.charAt(a);
                        break;
                    case ")": 1 == o ? o = 2 : i = e.charAt(a);
                        break;
                    case "0": case "1": case "2": case "3": case "4": case "5": case "6": case "7": case "8": case "9": r++;
                        break;
                    default: i = e.charAt(a)
                }if ("" !== i) break
        } return "" !== i ? t += '\n incorrect simbol "' + i + '" in phone' : s && r < 12 || !s && r < 10 ? t += "\n phone is too short" : (s && r > 12 || !s && r > 10) && (t += "\n phone is too long"), t
    } t.createUserValid = (e, t, s) => {
        try {
            if (e.body) {
                let n = o(a, e.body);
                "" !== n && (t.data = { error: !0, message: n, status: 400 }, s());
                const d = e.body.email.indexOf("@"), c = e.body.email.substr(d + 1);
                if (r.getOne(t => t.firstName === e.body.firstName && t.lastName === e.body.lastName) && (n = "\n this user is already registered : " + e.body.firstName + "  " + e.body.lastName), d <= 0 || "" === c || c.indexOf(".") <= 0) n += "\n email " + e.body.email + " is incorrect";
                else { r.getOne(t => t.email == e.body.email) && (n += "\n found user with email : " + e.body.email) } n += i(e.body.phoneNumber), e.body.password.length <= 4 && (n += "\n password is too short, 5 simb min"), t.data = "" === n ? { error: !1, data: "", status: 200 } : { error: !0, message: n, status: 400 }
            } else t.data = { error: !0, message: "No data in request !", status: 404 };
            s()
        } catch (e) { t.data = { error: !0, message: e, status: 404 }, s() }
    }, t.updateUserValid = (e, t, s) => {
        try {
            if (e.body) {
                let n = e.params.id;
                r.getOne(e => e.id === n) || (t.data = { error: !0, message: "No such user found !", status: 400 }, s());
                let d = o(a, e.body);
                "" !== d && (t.data = { error: !0, message: d, status: 400 }, s());
                let c = r.getOne(t => t.firstName === e.body.firstName && t.lastName === e.body.lastName);
                c && c.id != n && (d = "Such user already registred : " + e.body.firstName + " " + e.body.lastName), "" !== d && (t.data = { error: !0, message: d, status: 400 }, s());
                let u = e.body.email.indexOf("@"), l = e.body.email.substr(u + 1);
                u <= 0 || "" === l || l.indexOf(".") <= 0 ? d += "\n email " + e.body.email + " is incorrect" : (c = r.getOne(t => t.email === e.body.email), c && c.id !== n && (d += "User with such email alredy registred !")), d += i(e.body.phoneNumber), e.body.password.length <= 4 && (d += "\n password is too short, 5 simb min"), t.data = "" === d ? { error: !1, data: n, status: 200 } : { error: !0, message: d, status: 400 }
            } else t.data = { error: !0, message: "No data in request !", status: 404 };
            s()
        } catch (e) { t.data = { error: !0, message: e, status: 404 }, s() }
    }
}, function (e, t) { t.user = { id: "", firstName: "", lastName: "", email: "", phoneNumber: "", password: "" } }, function (e, t, s) {
    const { Router: a } = s(0), { responseMiddleware: r } = s(1), { UserRepository: o } = s(2), i = a();
    i.post("/login", (e, t, s) => {
        try {
            const a = o.getOne(t => t.email === e.body.email);
            a && a.password === e.body.password ? t.data = a : t.data = { error: !0, message: "\n Incorrect password or email !", status: 400 }
        } catch (e) { t.data = { error: !0, message: "Error while login ...", status: 404 } } finally { s() }
    }, r), e.exports = i
}, function (e, t, s) {
    const { Router: a } = s(0), r = s(20), { responseMiddleware: o } = s(1), { createFighterValid: i, updateFighterValid: n } = s(21), d = a();
    d.get("/", r.get, o), d.get("/:id", r.getId, o), d.delete("/:id", r.delete, o), d.post("/", i, r.post, o), d.put("/:id", n, r.put, o), e.exports = d
}, function (e, t, s) {
    const { FighterRepository: a } = s(4);
    e.exports = new class {
        get(e, t, s) {
            try {
                const e = a.getAll();
                t.data = e
            } catch (e) { t.data = { error: !0, message: e, status: 404 } } finally { s() }
        } getId(e, t, s) {
            try {
                const r = e.params.id, o = a.getOne(e => e.id === r);
                t.data = o || { error: !0, message: "No such fighter ...", status: 404 }
            } catch (e) { t.data = { error: !0, message: e, status: 404 } } finally { s() }
        } delete(e, t, s) {
            try {
                const r = e.params.id;
                let o = a.getOne(e => e.id === r);
                o || (t.data = { error: !0, message: "No such fighter ...", status: 404 }, s()), o = a.delete(r), t.data = o
            } catch (e) { t.data = { error: !0, message: e, status: 404 } } finally { s() }
        } post(e, t, s) {
            try {
                if (!t.data.error) {
                    const s = a.create(e.body);
                    t.data = s
                }
            } catch (e) { t.data = { error: !0, message: "Error while processing ...", status: 404 } } finally { s() }
        } put(e, t, s) {
            try {
                if (!t.data.error) {
                    const s = e.params.id, r = a.update(s, e.body);
                    t.data = r
                }
            } catch (e) { t.data = { error: !0, message: "Error while processing ...", status: 404 } } finally { s() }
        }
    }
}, function (e, t, s) {
    const { fighter: a } = s(22), { FighterRepository: r } = s(4), { testFieldsList: o } = s(6);
    function i(e, t, s, a) {
        let r = "", o = "";
        for (let t = 0;
            t < e.length;
            t++) {
                switch (e.charAt(t)) {
                    case "0": case "1": case "2": case "3": case "4": case "5": case "6": case "7": case "8": case "9": break;
                    default: o = e.charAt(t)
                }if ("" !== o) break
        } return "" !== o ? r = '\n incorrect simbol "' + o + '" in ' + a : (e = Number.parseInt(e)) > s ? r = a + "\n is too large (mast be in " + t + " ... " + s + ")" : e < t && (r = a + "\n is too small (mast be in " + t + " ... " + s + ")"), r
    } t.createFighterValid = (e, t, s) => {
        try {
            if (e.body) {
                let n = o(a, e.body);
                "" !== n && (t.data = { error: !0, message: n, status: 400 }, s());
                r.getOne(t => t.name === e.body.name) ? n = "\n this fighter is already registered : " + e.body.name : (n = i(e.body.health, 10, 100, "health"), n += i(e.body.power, 1, 10, "power"), n += i(e.body.defense, 1, 10, "defense")), t.data = "" === n ? { error: !1, data: "", status: 200 } : { error: !0, message: n, status: 400 }
            } else t.data = { error: !0, message: "No data in request !", status: 404 };
            s()
        } catch (e) { t.data = { error: !0, message: e, status: 404 }, s() }
    }, t.updateFighterValid = (e, t, s) => {
        try {
            if (e.body) {
                const n = e.params.id;
                r.getOne(e => e.id == n) || (t.data = { error: !0, message: "No such fighter found !", status: 404 }, s());
                let d = o(a, e.body);
                "" !== d && (t.data = { error: !0, message: d, status: 400 }, s()), d = i(e.body.health, 10, 100, "health"), d += i(e.body.power, 1, 10, "power"), d += i(e.body.defense, 1, 10, "defense"), t.data = "" === d ? { error: !1, data: n, status: 200 } : { error: !0, message: d, status: 400 }
            } else t.data = { error: !0, message: "No data in request !", status: 404 };
            s()
        } catch (e) { t.data = { error: !0, message: e, status: 404 }, s() }
    }
}, function (e, t) { t.fighter = { id: "", name: "", health: 100, power: 0, defense: 1 } }, function (e, t, s) {
    const { Router: a } = s(0), r = s(24), { createFightValid: o, updateFightValid: i } = s(26), { responseMiddleware: n } = s(1), d = a();
    d.get("/", r.get, n), d.get("/:id", r.getId, n), d.delete("/:id", r.delete, n), d.post("/", o, r.post, n), d.put("/:id", i, r.put, n), e.exports = d
}, function (e, t, s) {
    const { FightRepository: a } = s(25);
    e.exports = new class {
        get(e, t, s) {
            try {
                const e = a.getAll();
                t.data = e
            } catch (e) { t.data = { error: !0, message: e, status: 404 } } finally { s() }
        } getId(e, t, s) {
            try {
                const r = e.params.id, o = a.getOne(e => e.id === r);
                t.data = o || { error: !0, message: "No such fight ...", status: 404 }
            } catch (e) { t.data = { error: !0, message: e, status: 404 } } finally { s() }
        } delete(e, t, s) {
            try {
                const r = e.params.id;
                let o = a.getOne(e => e.id === r);
                o || (t.data = { error: !0, message: "No such fight ...", status: 404 }, s()), o = a.delete(r), t.data = o
            } catch (e) { t.data = { error: !0, message: e, status: 404 } } finally { s() }
        } post(e, t, s) {
            try {
                if (!t.data.error) {
                    const s = a.create(e.body);
                    t.data = s
                }
            } catch (e) { t.data = { error: !0, message: "Error while processing ...", status: 404 } } finally { s() }
        } put(e, t, s) {
            try {
                if (!t.data.error) {
                    const s = e.params.id, r = a.update(s, e.body);
                    t.data = r
                }
            } catch (e) { t.data = { error: !0, message: "Error while processing ...", status: 404 } } finally { s() }
        }
    }
}, function (e, t, s) {
    const { BaseRepository: a } = s(3);
    t.FightRepository = new class extends a { constructor() { super("fights") } }
}, function (e, t, s) {
    const { fight: a } = s(27), { testFieldsList: r } = s(6), { UserRepository: o } = s(2), { FighterRepository: i } = s(4), n = e => {
        let t = "";
        return o.getOne(t => t.id === e) || (t += "Gamer not found ... "), t
    }, d = (e, t) => {
        let s = "", a = i.getOne(t => t.id === e);
        return a || (s += "First fighter not found"), a = i.getOne(e => e.id === t), a || ("" !== s && (s += "\n"), s += "Second fighter not found"), s
    };
    t.createFightValid = (e, t, s) => {
        try {
            if (e.body) {
                let o = r(a, e.body);
                "" !== o && (t.data = { error: !0, message: o, status: 400 }, s()), o = n(e.body.log[0]), "" !== o && (t.data = { error: !0, message: o, status: 404 }, s()), o = d(e.body.fighter1, e.body.fighter2), "" !== o && (t.data = { error: !0, message: o, status: 404 }, s()), t.data = { error: !1, data: "", status: 200 }
            } else t.data = { error: !0, message: "No data in request !", status: 404 };
            s()
        } catch (e) { t.data = { error: !0, message: e, status: 404 }, s() }
    }, t.updateFightValid = (e, t, s) => {
        try {
            let o = e.params.id;
            if (e.body) {
                let i = r(a, e.body);
                "" !== i && (t.data = { error: !0, message: i, status: 400 }, s()), i = n(e.body.log[0]), "" !== i && (t.data = { error: !0, message: i, status: 404 }, s()), i = d(e.body.fighter1, e.body.fighter2), "" !== i && (t.data = { error: !0, message: i, status: 404 }, s()), t.data = { error: !1, data: o, status: 200 }
            } else t.data = { error: !0, message: "No data in request !", status: 404 };
            s()
        } catch (e) { t.data = { error: !0, message: e, status: 404 }, s() }
    }
}, function (e, t) { t.fight = { id: "", fighter1: "id", fighter2: "id", log: [] } }, function (e, t, s) {
    const { Router: a } = s(0), r = s(29), { responseMiddleware: o } = s(1), i = a();
    i.get("/", r.get, o), i.get("/:id", r.getId, o), i.delete("/:id", r.delete, o), i.post("/", r.post, o), i.put("/:id", r.put, o), e.exports = i
}, function (e, t, s) {
    const { DetailRepository: a } = s(30);
    e.exports = new class {
        get(e, t, s) {
            try {
                const e = a.getAll();
                t.data = e
            } catch (e) { t.data = { error: !0, message: e, status: 404 } } finally { s() }
        } getId(e, t, s) {
            try {
                const r = e.params.id, o = a.getOne(e => e.id === r);
                t.data = o || { error: !1, data: { id: r, source: "" }, status: 200 }
            } catch (e) { t.data = { error: !0, message: e, status: 404 } } finally { s() }
        } delete(e, t, s) {
            try {
                const r = e.params.id, o = a.delete(r);
                t.data = o
            } catch (e) { t.data = { error: !0, message: e, status: 404 } } finally { s() }
        } post(e, t, s) {
            try {
                const r = a.create(e.body);
                t.data = r
            } catch (e) { t.data = { error: !0, message: "Error while processing ...", status: 404 } } finally { s() }
        } put(e, t, s) {
            try {
                const r = e.params.id, o = a.update(r, e.body);
                t.data = o
            } catch (e) { t.data = { error: !0, message: "Error while processing ...", status: 404 } } finally { s() }
        }
    }
}, function (e, t, s) {
    const { dbAdapter: a } = s(5), { BaseRepository: r } = s(3), { FighterRepository: o } = s(4);
    t.DetailRepository = new class extends r {
        constructor() { super("details") } create(e) {
            let t = { id: o.getOne(t => t.name == e.name).id, source: e.source, createdAt: new Date };
            return this.dbContext.push(t).write().find(e => e.id === t.id)
        } update(e, t) { return this.dbContext.find(t => t.id == e).value() ? (t.updatedAt = new Date, this.dbContext.find({ id: e }).assign(t).write()) : this.create(t) }
    }
}, function (e, t, s) {
    const { Router: a } = s(0), r = s(32), { responseMiddleware: o } = s(1), i = a();
    i.get("/", r.get, o), i.post("/", r.post, o), e.exports = i
}, function (e, t, s) {
    const { ControlsRepository: a } = s(33);
    e.exports = new class {
        async get(e, t, s) {
            try {
                const e = await a.getOne();
                t.data = e
            } catch (e) { t.data = { error: !0, message: e, status: 404 } } finally { s() }
        } async post(e, t, s) {
            try {
                let r = await a.getOne();
                if (r) {
                    const { id: t } = r;
                    r = await a.update(t, e.body)
                } else r = await a.create(e.body);
                t.data = { error: !1, data: r, status: 200 }
            } catch (e) { t.data = { error: !0, message: "Error while processing ...", status: 404 } } finally { s() }
        }
    }
}, function (e, t, s) {
    const { BaseRepository: a } = s(3);
    t.ControlsRepository = new class extends a { constructor() { super("controls") } }
}, function (e, t) { e.exports = require("dotenv") }]);
