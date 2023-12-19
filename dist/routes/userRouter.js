"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
//type for the request TODO make this into a type file
var userRouter = (0, express_1.Router)();
userRouter.get("/", function (req, res) { });
userRouter.post("/", function (req, res) { });
userRouter.put("/", function (req, res) { });
userRouter.delete("/", function (req, res) { });
exports.default = userRouter;
//# sourceMappingURL=userRouter.js.map