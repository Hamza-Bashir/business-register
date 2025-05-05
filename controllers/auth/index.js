const router = require("express").Router();
const authService = require("../../services/auth");
const {signUpSchema, loginSchema} = require("../../middlewares/validationSchemas/user")
const validate = require("../../middlewares/validator")


router.post(
  "/sign-up",
  validate(signUpSchema),
  authService.signUp
);

router.post("/login", validate(loginSchema), authService.login)




module.exports = router;
