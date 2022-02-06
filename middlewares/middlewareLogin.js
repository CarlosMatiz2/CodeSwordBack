require('dotenv').config()
const jwt = require("jsonwebtoken");

//Midleware para validar Token del usuario
const middleLogin = (req, res, next) => {
    const jwtToken = req.headers["authorization"];
    // bearer mitoken
    if (!jwtToken) {
        return res.status(401).json({ message: "No Autorizado" });
    }
    const jwtClient = jwtToken.split(" ")[1];
    jwt.verify(jwtClient, process.env.LLAVE, (error, decoded) => {
        if (error) {
            return res.status(401).json({ message: "Su token a expirado" });
        }
       
        next();
    });
};

//Se exporta el Midleware para usarlo en todas las rutas
exports.middleLogin = middleLogin