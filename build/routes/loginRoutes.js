"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var requireAuth = function (req, res, next) {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }
    res.status(403);
    res.send('Not permitted');
};
var router = express_1.Router();
exports.router = router;
router.get('/login', function (req, res) {
    res.send("\n        <form method=\"post\">\n            <div>\n                <label for=\"email\">Email</label>\n                <input name=\"email\">\n            </div>\n            <div>\n                <label for=\"password\">Password</label>\n                <input name=\"password\" type=\"password\">\n            </div>\n            <button>Submit</button>\n        </form>\n    ");
});
router.post('/login', function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    if (email && password && email === '111' && password === 'www') {
        req.session = { loggedIn: true };
        res.redirect('/');
    }
    else {
        res.send('Invalid email or password');
    }
});
router.get('/', function (req, res) {
    var _a;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.loggedIn) {
        res.send("\n            <div>\n                <h2>Ya logged in</h2>\n                <a href=\"/logout\">Logout</a>\n            </div>\n        ");
    }
    else {
        res.send("\n            <div>\n                <h2>Ya not logged in</h2>\n                <a href=\"/login\">Login</a>\n            </div>\n        ");
    }
});
router.get('/logout', function (req, res) {
    req.session = undefined;
    res.redirect('/login');
});
router.get('/protected', requireAuth, function (req, res) {
    res.send('Welcome to protected route');
});
