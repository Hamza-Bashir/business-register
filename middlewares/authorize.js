const allowRoute = require("../config/allowRoutes");

const authorize = (req, res, next) => {
   
  const isAdmin = req.user?.isAdmin; 
  const requestPath = req.path;
  const requestMethod = req.method;
 

  const matchRoute = allowRoute.find(route =>
    route.method === requestMethod && route.path.test(requestPath)
  );

  

  if (!matchRoute) {
    return res.status(403).json({
      statusCode: 403,
      message: "Access denied (no matching route rule)",
    });
  }

  

  if (matchRoute.isAdmin === true && isAdmin !== true) {
    return res.status(403).json({
      statusCode: 403,
      message: "Admin access required",
    });
  }

  

  next();
  
};

module.exports = { authorize };
