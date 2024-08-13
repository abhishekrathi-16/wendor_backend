const jwt = require("jsonwebtoken");

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);

const attachCookiesToResponse = ({ res,user }) => {
    const token = createJWT({payload:user});
    const oneDay = 1000*60*60*24

  //we will use cookies, bcz this helps us in avoiding sending the token with the repsonse and then storing them in the local storage. Also, it allows only browsers to read the token in the cookie. 
  res.cookie('token',token,{
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
    signed: true
  })
}

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse
};
