const router = require("express").Router();



router.use(require("../controllers/auth/index.js"))
router.use(require("../controllers/business/index.js"))
router.use(require("../controllers/category/index.js"))
router.use(require("../controllers/product/index.js"))
router.use(require("../controllers/customer/index.js"))

router.use(require("../controllers/order/index.js"))
router.use(require("../controllers/stock/index.js"))
router.use(require("../controllers/sale/index.js"))


module.exports = router;
