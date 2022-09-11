const ApiResponse = require('../ApiResponse');

const User = require("../models/User");

module.exports = (req, res, next) => {

    const apiResponse = new ApiResponse(false, "", req.body);

    try {

        if (undefined === req.body.email) {

            apiResponse.message = "L'adresse mail est introuvable. Veuillez réessayé.";

            res.status(400).json(apiResponse.apiResponse);

            return false;
        }

        const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

        if (!emailRegexp.test(req.body.email)) {

            apiResponse.message = "L'adresse email est incorrect. Veuillez réessayé.";

            res.status(400).json(apiResponse.apiResponse);

            return false;

        }

        if (undefined === req.body.password) {

            apiResponse.message = "Le mot de passe est introuvable. Veuillez réessayé.";

            res.status(400).json(apiResponse.apiResponse);

            return false;
        }

        const passwordRegexp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

        if (!passwordRegexp.test(req.body.password)) {

            apiResponse.message = "Le mot de passe est incorrect. Il doit contenir au moins un chiffre, doit contenir au moins une minuscule, doit contenir au moins une majuscule, doit contenir au moins 8 des caractères mentionnés. Veuillez réessayé.";

            res.status(400).json(apiResponse.apiResponse);

            return false;

        }

        next();

    } catch (error) {

        res.status(400).json({error});

    }

};