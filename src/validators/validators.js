"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePostAppVal = exports.postAppValidators = void 0;
var express_validator_1 = require("express-validator");
exports.postAppValidators = [
    (0, express_validator_1.body)("jobTitle").exists().isString(),
    (0, express_validator_1.body)("companyName").exists().isString(),
    (0, express_validator_1.body)("status")
        .isIn([
        "APPLIED",
        "INTERVIEW_SCHEDULED",
        "INTERVIEW_COMPLETED",
        "SKILL_ASSESSMENT",
        "OFFER_ACCEPTED",
        "OFFER_DECLINED",
        "WITHDRAWN",
    ])
        .optional(),
    (0, express_validator_1.body)("contactDetails").isString().optional(),
];
function handlePostAppVal(req, res, next) {
    var errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).send({ errors: errors.array() });
    }
    next();
}
exports.handlePostAppVal = handlePostAppVal;
