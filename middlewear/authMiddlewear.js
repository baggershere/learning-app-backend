const jwt = require("jsonwebtoken");
const isAuth = (req, res, next) => {
  console.log("auth route -- " + req.cookies);
  const header = req.cookies.authorization;
  const token = header; //&& header.split(" ")[1];
  console.log(token);
  if (token === null) return res.sendStatus(400);

  jwt.verify(token, process.env.HASHINGPASSWORD, (err, user) => {
    if (err) return res.sendStatus(400);
    req.name = user.name;
    req.email = user.email;
    console.log(req.email);
    next();
  });
};
module.exports = {
  isAuth,
};
