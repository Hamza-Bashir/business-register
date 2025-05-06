const router = require("express").Router();
const authService = require("../../services/auth");
const {signUpSchema, loginSchema} = require("../../middlewares/validationSchemas/user")
const validate = require("../../middlewares/validator")


router.post(
  "/sign-up",
  validate(signUpSchema),
  authService.signUp
);

<<<<<<< HEAD
router.post("/user/login", authService.login)
=======
router.post("/login", validate(loginSchema), authService.login)
>>>>>>> 718d167444764fee5621956131aa704dd452833b




module.exports = router;
