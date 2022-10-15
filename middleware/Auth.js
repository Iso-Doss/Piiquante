require('dotenv').config();

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    try {

        const bearToken = req.headers.authorization;

        if (undefined === bearToken) {

            return res.status(500).json({message: "Le token est introuvable. Veuillez réessayé."});

        } else {

            const tokenSplice = bearToken.split(' ');

            if (undefined === tokenSplice[1]) {

                return res.status(500).json({message: "Le token est introuvable. Veuillez réessayé."});

            } else {

                const token = tokenSplice[1];

                const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');

                const userId = decodedToken.userId;

                req.auth = {

                    userId: userId

                };

            }

        }

        next();

    } catch (error) {

        return res.status(500).json({message: "Une erreur inattendue s'est produite lors de la vérification du token. Veuillez réessayé."});

    }

};