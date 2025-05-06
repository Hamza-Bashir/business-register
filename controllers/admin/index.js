const router = require("express").Router()

const admin = require("../../services/admin")

router.get("/admin/all-user", admin.getAllUser)
router.get("/admin/get-single-user/:userId", admin.getSingleUser)
router.delete("/admin/delete-user/:userId", admin.deleteUser)
router.post("/admin/search-user", admin.searchUser)
router.get("/admin/all-business", admin.getAllBusiness)
router.put("/admin/update-business/:businessId", admin.updateBsuiness)

module.exports = router