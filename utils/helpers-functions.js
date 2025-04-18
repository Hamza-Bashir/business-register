const crypto = require('crypto');
const {
  Wallet,
  liveStream,
  User,
  AgencyUser,
  Agency, CommisionRates
  
} = require("../models");
const { Op } = require("sequelize");


// copy functions
module.exports.timeRewardForHost = async (time, diamonds) => {
  if (time < 45) {
    return {rate : 0 ,value : 0};
  }
  const result = await CommisionRates.findOne({
    where: {
      incomeType: "Host",
      earningType: "timeReward",
      start: { [Op.lte]: diamonds },
      [Op.or]: [
        { end: { [Op.gte]: diamonds } },
        { end: null }
      ]
    },
    raw: true,
  });


  if (result?.rateType === "fixed") {
    return {rate : result?.rate ,value : result?.rate};
  } else {
    return {rate : result?.rate ,value : (result?.rate / 100) * diamonds};
  }
};

module.exports.getComissionForHost = async (actualReceiving) => {

  const result = await CommisionRates.findOne({
    where: {
      incomeType: "Host",
      earningType: "hostGiftReceivingCommision",
      start: { [Op.lte]: actualReceiving },
      [Op.or]: [
        { end: { [Op.gte]: actualReceiving } },
        { end: null }
      ]
    },
    raw: true,
  });
  console.log('giftcommision', result);
  if (result?.rateType === "fixed") {
    return {rate : result?.rate ,value : result?.rate};
  } else {
    return {rate : result?.rate ,value : (result?.rate / 100) * actualReceiving};
  }

};

// calculation for agent earning against new host
module.exports.hostWorkingRewardForAgent = async (rcoins) => {
  const result = await CommisionRates.findOne({
    where: {
      incomeType: "Agent",
      earningType: "newHostReward",
      start: { [Op.lte]: rcoins },
      [Op.or]: [
        { end: { [Op.gte]: rcoins } },
        { end: null }
      ]
    },
    raw: true,
  });

  console.log('agent new host reward', result);

  if (result?.rateType === "fixed") {
    return result?.rate;
  } else {
    return (result?.rate / 100) * rcoins;
  }
};

// calculation for host working commision
module.exports.hostWorkingCommisionForAgent = async (totalHostEarnings, rcoins) => {


  const result = await CommisionRates.findOne({
    where: {
      incomeType: "Agent",
      earningType: "hostWorkingCommision",
      start: { [Op.lte]: totalHostEarnings },
      [Op.or]: [
        { end: { [Op.gte]: totalHostEarnings } },
        { end: null }
      ]
    },
    raw: true,
  });
  console.log('host working commision slab', result);
  if (result?.rateType === "fixed") {
    return result?.rate;
  } else {
    const commision = (rcoins * result.rate) / 100;
    return commision
  }
};


module.exports.hostWorkingRateForAgent = async (totalHostEarnings) => {
  const result = await CommisionRates.findOne({
    where: {
      incomeType: "Agent",
      earningType: "hostWorkingCommision",
      start: { [Op.lt]: totalHostEarnings },
      [Op.or]: [
        { end: { [Op.gte]: totalHostEarnings } },
        { end: null }
      ]
    },
    raw: true,
  });
  if (result) {
    return result?.rate;
  }else{
    return 0;
  }
};


module.exports.hostWorkingRateForAgent = async (totalHostEarnings) => {
  const result = await CommisionRates.findOne({
    where: {
      incomeType: "Agent",
      earningType: "hostWorkingCommision",
      start: { [Op.lt]: totalHostEarnings },
      [Op.or]: [
        { end: { [Op.gte]: totalHostEarnings } },
        { end: null }
      ]
    },
    raw: true,
  });
  if (result) {
    return result?.rate;
  }else{
    return 0;
  }
};


module.exports.inviteAgentRate = async (totalHostEarnings) => {
  const result = await CommisionRates.findOne({
    where: {
      incomeType: "Agent",
      earningType: "inviteAgentReward",
      start: { [Op.lt]: totalHostEarnings },
      [Op.or]: [
        { end: { [Op.gte]: totalHostEarnings } },
        { end: null }
      ]
    },
    raw: true,
  });
  if (result) {
    return result?.rate;
  }else{
    return 0;
  }
};




module.exports.generateHashed6DigitCode = (id) => {

  const hash = crypto.createHash('sha256').update(id).digest('hex');
  const decimalNumber = parseInt(hash.slice(0, 6), 16);
  const sixDigitNumber = ('000000' + decimalNumber).slice(-6);
  return sixDigitNumber.toString();
}

module.exports.generateUniqueCode = async (id, AgencyModel) => {
  console.log(id)
  let code;
  do {
    code = this.generateHashed6DigitCode(id);
  } while (await AgencyModel.findOne({ where: { code } }));

  return code;
}



module.exports.generateOTP = (length = 6) => {
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomDigit = Math.floor(Math.random() * 10);
    result += randomDigit.toString();
  }
  return result;
}

module.exports.getEarningSumByAgencyId = async(agencyId, thirtyDaysAgo) =>{

  const totalDiamondEarnAgainstAgency = (await liveStream.sum(
    "totalDiamondEarn",
    {
      include: [
        {
          model: User,
          attributes: [],
          where: {
            agencyId: agencyId,
          },
          required: true,
        },
      ],
      where: {
        created: {
          [Op.gte]: thirtyDaysAgo,
        },
      },
      group: ["User.agencyId"],
    }
  )) || 0;

  return totalDiamondEarnAgainstAgency;

}