"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePostAppVal = exports.checkNotEmptyBody = exports.idParamValidators = exports.putAppValidators = exports.postAppValidators = void 0;
var express_validator_1 = require("express-validator");
exports.postAppValidators = [
    (0, express_validator_1.body)("jobTitle")
        .exists()
        .isString()
        .isLength({ min: 1 })
        .withMessage("Invalid job title"),
    (0, express_validator_1.body)("companyName")
        .exists()
        .isString()
        .isLength({ min: 1 })
        .withMessage("Invalid company name"),
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
        .optional()
        .withMessage("Invalid status"),
    (0, express_validator_1.body)("contactDetails")
        .isString()
        .optional()
        .withMessage("Invalid contact details"),
    (0, express_validator_1.body)("imageUrl").isString().optional().withMessage("Invalid image URL"),
];
exports.putAppValidators = [
    (0, express_validator_1.body)("jobTitle").isString().optional().withMessage("Invalid job title"),
    (0, express_validator_1.body)("companyName").isString().optional().withMessage("Invalid company name"),
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
        .optional()
        .withMessage("Invalid status"),
    (0, express_validator_1.body)("contactDetails")
        .isString()
        .optional()
        .withMessage("Invalid contact details"),
    (0, express_validator_1.body)("imageUrl").isString().optional().withMessage("Invalid image URL"),
    (0, express_validator_1.body)("appliedDate")
        .isDate({
        format: "DD/MM/YYYY",
    })
        .optional()
        .withMessage("Invalid applied date"),
];
exports.idParamValidators = [
    (0, express_validator_1.param)("id").isUUID().withMessage("Invalid UUID format"),
];
exports.checkNotEmptyBody = (0, express_validator_1.body)().custom(function (value, _a) {
    var req = _a.req;
    if (Object.keys(req.body).length === 0) {
        throw new Error("Request body cannot be empty");
    }
    return true;
});
function handlePostAppVal(req, res, next) {
    var errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
    }
    next();
}
exports.handlePostAppVal = handlePostAppVal;
//# sourceMappingURL=validators.js.map