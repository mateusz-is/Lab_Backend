const jwt = require("jsonwebtoken");

const jwtKey = "my_secret_key"


const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"] || req.headers["Authorization"];

    if(token === undefined){
        return res.status(401).send("A token is required for authentication")
    }

    if(token.startsWith("Bearer ")){
        token = token.slice(7, token.length)
    }

    if (!token) {
        return res.status(403).send("A token is required for authentication");  
    }
    try {
        const decoded = jwt.verify(token, jwtKey);
        req.user = decoded;

    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};

module.exports = verifyToken;   