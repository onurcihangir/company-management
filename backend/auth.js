const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    if (!req.headers?.authorization) {
      res.status(401).json({
        error: "Unauthorized",
      });
    }
    //   get the token from the authorization header
    const token = await req.headers.authorization.split(" ")[1];

    //check if the token matches the supposed origin
    const decodedToken = jwt.verify(token, "RESTFULAPIs");

    // retrieve the user details of the logged in user
    const user = decodedToken;

    // pass the user down to the endpoints here
    req.user = user;

    // pass down functionality to the endpoint
    next();
  } catch (error) {
    res.status(401).json({
      error: new Error("Invalid req!"),
    });
  }
};
