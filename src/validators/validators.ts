import { body, param, validationResult } from "express-validator";

export const postAppValidators = [
  body("jobTitle")
    .exists()
    .isString()
    .isLength({ min: 1 })
    .withMessage("Invalid job title"),
  body("companyName")
    .exists()
    .isString()
    .isLength({ min: 1 })
    .withMessage("Invalid company name"),
  body("status")
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
  body("notes").isString().optional().withMessage("Invalid notes"),
  body("imageUrl").isString().optional().withMessage("Invalid image URL"),
];

export const putAppValidators = [
  body("jobTitle").isString().optional().withMessage("Invalid job title"),
  body("companyName").isString().optional().withMessage("Invalid company name"),
  body("status")
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
  body("notes").isString().optional().withMessage("Invalid notes"),
  body("imageUrl").isString().optional().withMessage("Invalid image URL"),
  body("appliedDate")
    .isDate({
      format: "DD/MM/YYYY",
    })
    .optional()
    .withMessage("Invalid applied date"),
];

export const idParamValidators = [
  param("id").isUUID().withMessage("Invalid UUID format"),
];

export const checkNotEmptyBody = body().custom((value, { req }) => {
  if (Object.keys(req.body).length === 0) {
    throw new Error("Request body cannot be empty");
  }
  return true;
});

export function handlePostAppVal(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }
  next();
}
