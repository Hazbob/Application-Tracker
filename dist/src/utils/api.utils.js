"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _a = require("date-fns"), format = _a.format, parse = _a.parse;
function formatDateStringToISO(dateString) {
    if (dateString) {
        var parsedDate = parse(dateString, "dd/MM/yyyy", new Date());
        return format(parsedDate, "yyyy-MM-dd'T'HH:mm:ss'Z'");
    }
    return;
}
exports.default = formatDateStringToISO;
//# sourceMappingURL=api.utils.js.map