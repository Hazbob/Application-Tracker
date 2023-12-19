"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var db_1 = __importDefault(require("../db"));
var validators_1 = require("../validators/validators");
var applicationRouter = (0, express_1.Router)();
/**
 * POST application: creates new job application attached to the logged in user
 */
applicationRouter.post("/", validators_1.postAppValidators, validators_1.handlePostAppVal, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var application, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                if (!req.user.id)
                    res.status(401).send({ message: "Not Authorised" });
                return [4 /*yield*/, db_1.default.application.create({
                        data: {
                            jobTitle: req.body.jobTitle,
                            companyName: req.body.companyName,
                            imageUrl: req.body.imageUrl,
                            userId: req.user.id,
                        },
                    })];
            case 1:
                application = _a.sent();
                if (!application) {
                    throw new Error("Error adding new application");
                }
                return [2 /*return*/, res
                        .status(201)
                        .send({ message: "New Application Added, Good Luck!" })];
            case 2:
                error_1 = _a.sent();
                next(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
/*
 * GET applications : this retrieves the applications belonging to the logged in user
 * */
applicationRouter.get("/", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var applications, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1.default.application.findMany({
                        where: { userId: req.user.id },
                        select: {
                            id: true,
                            jobTitle: true,
                            companyName: true,
                            appliedDate: true,
                            imageUrl: true,
                            contactDetails: true,
                            status: true,
                        },
                    })];
            case 1:
                applications = _a.sent();
                if (applications.length === 0) {
                    throw new Error("No applications Found");
                }
                return [2 /*return*/, res.status(200).send({ applications: applications })];
            case 2:
                error_2 = _a.sent();
                next(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
/*
 * PUT route for updating existing Job Applications*/
applicationRouter.put("/", validators_1.putAppValidators, validators_1.handlePostAppVal, function (req, res) { });
applicationRouter.delete("/:id", function (req, res) { });
exports.default = applicationRouter;
//# sourceMappingURL=applicationRouter.js.map