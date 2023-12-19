"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var userRouter_1 = __importDefault(require("./userRouter"));
var applicationRouter_1 = __importDefault(require("./applicationRouter"));
var apiRouter = (0, express_1.Router)();
apiRouter.use("/user", userRouter_1.default);
apiRouter.use("/app", applicationRouter_1.default);
exports.default = apiRouter;
//# sourceMappingURL=apiRouter.js.map