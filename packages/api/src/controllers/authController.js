const jwt = require('jsonwebtoken');
const fs = require('fs');

const { ENV_JWT_EXPIRED_TIME } = process.env;

// User Token
exports.token = async (req, res) => {
  try {
    // Check session user
    if (!req.session.user) {
      return res.status(409).json({
        status: 'fail',
        message: 'user not found'
      });
    }

    const user_id = req.session.user.user_id;
    const privateKey = fs.readFileSync('./config/jwt/private.pem');
    const token = jwt.sign({ user_id: user_id }, privateKey, { algorithm: 'RS256', expiresIn: ENV_JWT_EXPIRED_TIME });

    // Return success message and token
    return res.status(200).json({
      username: user_id,
      token: token,
      expires: ENV_JWT_EXPIRED_TIME,
    });
  }
  catch (error) {
    return res.status(400).json({
      status: 'fail',
      message: error
    })
  }
}

