const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth.json");

function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    //verifica se exite token
    return res.status(401).send({ error: "No token provided" });

  const parts = authHeader.split(" ");
  if (!parts.lenght === 2)
    return res.status(401).send({ error: "Token error" });
  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({ error: "Token malformated" });

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) return res.status(401).send({ error: "Invalid Token" });

    req.userId = decoded.params.id;

    return next();
  });
}

module.exports = auth;
