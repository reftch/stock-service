const jwt = require('jsonwebtoken');
const fs = require('fs');

module.exports = async (req, res, next) => {

  const authHeader = req.headers['authorization'];
  //const authHeader = req.body.token || req.query.token || req.headers["x-access-token"];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      status: "fail",
      message: "a token is required for authentication"
    });
  }

  try {
    const cert = fs.readFileSync('./config/jwt/public.pem');
    jwt.verify(token, cert, { algorithms: ['RS256'] }, (err, payload) => {
      const user_id = payload.user_id;
      if (user_id !== 'admin') {
        return res.status(401).json({
          status: "fail",
          message: "invalid token"
        });
      }
    });
  }
  catch (error) {
    return res.status(401).json({
      status: "fail",
      message: "invalid token"
    });
  }

  return next();
};
