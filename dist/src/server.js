"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var apiRouter_1 = __importDefault(require("./routes/apiRouter"));
var auth_1 = require("./utils/auth");
var user_1 = require("./controllers/user");
var errorRouter_1 = __importDefault(require("./routes/errorRouter"));
var app = (0, express_1.default)();
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api", auth_1.protect, apiRouter_1.default);
app.post("/signup", user_1.createNewUser);
app.post("/signin", user_1.signin);
app.use("/*", errorRouter_1.default);
exports.default = app;
//# sourceMappingURL=server.js.map