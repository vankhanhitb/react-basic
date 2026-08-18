import jwt from 'jsonwebtoken';
import db from "../db.js";

function authMiddleware (req, res, next) {
  //const token = req.headers['authorization'];
  const token = req.headers.authorization;

  if(!token) {
    return res.status(401).json({message: "no token provided"});
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if(err || !decoded?.id) {
      return res.status(401).json({message: "Invallid token"});
    }

    const user = db.prepare("SELECT id FROM users WHERE id= ?").get(decoded.id);
    
    if(!user) {
      return res.status(401).json({message: "Token user no longer exists"});
    }
    req.userId = user.id;
    next();
  })
}

export default authMiddleware;