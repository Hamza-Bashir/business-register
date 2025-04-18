const asyncErrorHandler = require("../../utils/asyncErrorHandler");
const { STATUS_CODES, TEXTS } = require("../../config/constants");
const {
  CommisionRates,
  AgencyUser,
  Agency,
  Wallet,
  liveStream,
  User,
  Host_Invitation,
  Notification,
} = require("../../models");
const { Op, fn, literal, col, where } = require("sequelize");
const { Sequelize } = require("sequelize");

// create commision
const createCommsionRate = asyncErrorHandler(async (req, res) => {
  const data = await CommisionRates.create(req.body);

  res.status(STATUS_CODES.CREATED).json({
    statusCode: 201,
    message: TEXTS.CREATED,
    data: data,
  });
});

// update commision
const updateCommisionRate = asyncErrorHandler(async (req, res) => {
  const [status, data] = await CommisionRates.update(
    { ...req.body },
    {
      where: {
        id: req.params?.id,
      },
      returning: true,
    }
  );
  if (!status) {
    res.status(STATUS_CODES.NOT_FOUND).json({
      statusCode: 404,
      message: TEXTS.UPDATE_FAILED,
      data: data,
    });
    return;
  }

  res.status(STATUS_CODES.SUCCESS).json({
    statusCode: 200,
    message: TEXTS.UPDATED,
    data: data[0],
  });
});

// get commision
const getCommisionRate = asyncErrorHandler(async (req, res) => {
  const data = await CommisionRates.findAll({
    order: [["rate", "ASC"]],
  });

  res.status(STATUS_CODES.SUCCESS).json({
    statusCode: 200,
    message: TEXTS.FOUND,
    data: data,
  });
});

// get commision
const getSingleCommisionRate = asyncErrorHandler(async (req, res) => {
  const commisionId = req.params?.id;

  if (!commisionId) {
    return res.status(400).json({
      statusCode: 400,
      message: "Id not found in parameter",
    });
  }
  const data = await CommisionRates.findByPk(commisionId);

  res.status(STATUS_CODES.SUCCESS).json({
    statusCode: 200,
    message: TEXTS.FOUND,
    data: data,
  });
});

// delete
const deleteCommsionRate = asyncErrorHandler(async (req, res) => {
  const data = await CommisionRates.destroy({
    where: {
      id: req.params?.id,
    },
  });

  res.status(STATUS_CODES.SUCCESS).json({
    statusCode: 200,
    message: TEXTS.DELETED,
  });
});

// testting
const commisionRates = asyncErrorHandler(async (req, res) => {
  const { coins, incomeType, earningType, rateType } = req.body;
  const data = await CommisionRates.findOne({
    where: {
      incomeType: incomeType,
      earningType: earningType,
      rateType: rateType,
      start: { [Op.lte]: coins },
      end: { [Op.gte]: coins },
    },
  });

  // // Check if data is found
  if (!data) {
    return res.status(STATUS_CODES.NOT_FOUND).json({
      statusCode: 404,
      message:
        "No matching commission rates found for the provided coins value.",
    });
  }

  // Return the data with actual values for start, end, and rate
  res.status(200).json({
    statusCode: 200,
    message: "Commission rates found",
    data: {
      coins: coins,
      start: data.start,
      end: data.end,
      rate: data.rate,
      incomeType: data.incomeType,
      earningType: data.earningType,
      rateType: data.rateType,
    },
  });
});

const agencyList = asyncErrorHandler(async (req, res) => {
  const user = await User.findOne({
    where: { id: req?.user?.id },
  });

  if (!user) {
    return res.status(404).json({
      statusCode: 404,
      message: "User not found",
    });
  }

  const agencyId = user.agencyId;
  if (!agencyId) {
    return res
      .status(404)
      .json({ statusCode: 404, message: "Agency ID not found for user" });
  }

  var agency = await User.findOne({
    where: { agencyId: agencyId, role: { [Op.eq]: "Agency" } },
  });

  try {
    const hostDetails = await User.findAll({
      where: {
        agencyId: agencyId,
      },
      attributes: [
        "id",
        "name",
        "level",
        "agencyId",
        "code",
        "country",
        "picture",
        [fn("SUM", col("liveStreams.totalDiamondEarn")), "totalDiamondEarned"],
      ],
      include: [
        {
          model: liveStream,
          attributes: [],
          where: { hostId: { [Op.col]: "User.code" } },
        },
      ],
      group: ["User.id"],
    });

    if (!hostDetails.length) {
      return res.status(404).json({
        statusCode: 404,
        message: "No host details found for this agency.",
      });
    }

    // Fetch applicable commission rates for hosts based on their total earnings
    const totalEarnings = hostDetails.map((user) =>
      user.getDataValue("totalDiamondEarned")
    );

    const commissionRates = await CommisionRates.findAll({
      where: {
        incomeType: "Host",
        [Op.or]: totalEarnings.map((total) => ({
          [Op.and]: [
            { start: { [Op.lte]: total } },
            { end: { [Op.gte]: total } },
          ],
        })),
      },
      attributes: ["rate", "rateType", "start", "end"],
    });
    const results = hostDetails.map((user) => {
      const earned = user.getDataValue("totalDiamondEarned");
      const commission = commissionRates.find(
        (rate) => earned >= rate.start && earned <= rate.end
      );

      return {
        ...user.get(),
        commissionRate: commission ? commission.rate : 0,
        rateType: commission ? commission.rateType : null,
      };
    });

    return res.status(200).json({
      message: "Host details fetched successfully",
      statusCode: 200,
      data: {
        results,
        agency: agency,
      },
    });
  } catch (error) {
    console.error("Error fetching host details:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

// commision rates -details
const commisionRatesDetails = asyncErrorHandler(async (req, res) => {
  // Fetch all commission rates
  const commisionRates = await CommisionRates.findAll({});

  // Group the commission rates by earningType
  const groupedRates = commisionRates.reduce((acc, rate) => {
    const { earningType } = rate;

    if (!acc[earningType]) {
      acc[earningType] = [];
    }

    // Push the current rate to the corresponding earningType group
    acc[earningType].push(rate);

    return acc;
  }, {});

  // Send the response with main data object
  return res.status(200).json({
    status: 200,
    message: "Commission rates fetched successfully",
    data: groupedRates,
  });
});

module.exports = {
  createCommsionRate,
  updateCommisionRate,
  getCommisionRate,
  getSingleCommisionRate,
  deleteCommsionRate,
  commisionRates,
  agencyList,
  commisionRatesDetails,
};
