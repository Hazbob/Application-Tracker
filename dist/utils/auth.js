"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = exports.createJWT = exports.hashPassword = exports.comparePasswords = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var comparePasswords = function (password, hashedPassword) {
    return bcrypt_1.default.compare(password, hashedPassword);
};
exports.comparePasswords = comparePasswords;
var hashPassword = function (password) {
    return bcrypt_1.default.hash(password, 5);
};
exports.hashPassword = hashPassword;
var createJWT = function (user) {
    var token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username }, //payload with unique user info
    process.env.JWT_SECRET, //secret string which is used for decoding
    { expiresIn: "24h" });
    return token;
};
exports.createJWT = createJWT;
var protect = function (req, res, next) {
    var bearer = req.headers.authorization;
    if (!bearer) {
        res.status(401).send({ message: "Not authorised" });
        return;
    }
    var _a = bearer.split(" "), _ = _a[0], token = _a[1];
    if (!token) {
        res.status(401).send({ message: "Not authorised" });
        return;
    }
    try {
        var user = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    }
    catch (e) {
        res.status(401).send({ message: "Not authorised" });
        return;
    }
};
exports.protect = protect;
//# sourceMappingURL=auth.js.map