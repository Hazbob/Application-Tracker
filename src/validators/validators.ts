import { body, validationResult } from "express-validator";

export const postAppValidators = [
  body("jobTitle").exists().isString(),
  body("companyName").exists().isString(),
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
    .optional(),
  body("contactDetails").isString().optional(),
];

export function handlePostAppVal(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send({ errors: errors.array() });
  }
  next();
}
