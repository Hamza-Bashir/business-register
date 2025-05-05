const { verifyJWTToken } = require("../utils/jwtToken");
const { STATUS_CODES, TEXTS } = require("../config/constants");
const allowRoute = require("../config/allowRoute")

const authenticate = async (req, res, next) => {
 
  const header = req.get("Authorization");
  if (!header || !header.startsWith("Bearer")) {
    return res
      .status(STATUS_CODES.UNAUTHORIZED)
      .json({ message: TEXTS.INVALID_AUTH_TOKEN });
  }

  const accessToken = header.split(" ")[1];
  if (accessToken) {
    const result = await verifyJWTToken(accessToken);
    if (result.err) {
      res
        .status(STATUS_CODES.UNAUTHORIZED)
        .json({ message: TEXTS.INVALID_AUTH_TOKEN });
    } else {
      req.user = result.decoded;

      const isAdmin = !!req.user.isAdmin

      const matchedRoute = allowRoute.find((route)=>
        route.path.test(req.path) &&
        route.method.toLowerCase() === req.method.toLowerCase()
      )

      if (matchedRoute.isAdmin !== isAdmin) {
        return res.status(403).json({ message: "Access denied, Is only admin available" });
      }
     
      next();
    }
    
  } else {
    res
      .status(STATUS_CODES.UNAUTHORIZED)
      .json({ message: TEXTS.NO_AUTH_GIVEN });
  }
};

module.exports = {
  authenticate,
};
