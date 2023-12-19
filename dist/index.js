"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __importDefault(require("./server"));
server_1.default.listen(3001, function () {
    console.log("listening on port 3001");
});
//# sourceMappingURL=index.js.map