const router = require("express").Router();
const authService = require("../../services/auth");
const {signUpSchema, loginSchema} = require("../../middlewares/validationSchemas/user")
const validate = require("../../middlewares/validator")


router.post(
  "/user/sign-up",
  validate(signUpSchema),
  authService.signUp
);

router.post(
  "/user/login",
  validate(signUpSchema),
  authService.signUp
);






module.exports = router;
