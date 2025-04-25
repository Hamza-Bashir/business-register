const router = require("express").Router();
const authService = require("../../services/auth");


router.post(
  "/sign-up",
  authService.signUp
);

router.post("/login", authService.login)




module.exports = router;
