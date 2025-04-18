const express = require("express");
const router = express.Router();
const commisionRateService = require("../../services/commision_rate/index");

const { validate } = require("../../middlewares/validator");
const validationSchemas = require("../../middlewares/validationSchemas");

validate(validationSchemas.familySchemaValidator),
  // Retrieve all commission rate
  router.get("/commision-rate", commisionRateService.getCommisionRate);

// Create commission rate
router.post(
  "/commision-rate",
  validate(validationSchemas.commisionRateValidator),
  commisionRateService.createCommsionRate
);

// Update commission rate
router.patch(
  "/commision-rate/:id",
  validate(validationSchemas.commisionRateValidator),
  commisionRateService.updateCommisionRate
);

// Delete commission rate
router.delete("/commision-rate/:id", commisionRateService.deleteCommsionRate);

//  retreive single commision date
router.get("/commision-rate/:id", commisionRateService.getSingleCommisionRate);

router.post("/commision-rates", commisionRateService.commisionRates);

// commision rates
router.get(
  "/commision-rates-details",
  commisionRateService.commisionRatesDetails
);

module.exports = router;
