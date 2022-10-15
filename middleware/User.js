module.exports = (req, res, next) => {

    try {

        if (undefined === req.body.email) {

            return res.status(400).json({message: "L'adresse mail est introuvable. Veuillez réessayé."});
        }

        const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

        if (!emailRegexp.test(req.body.email)) {

            return res.status(400).json({message: "L'adresse email est incorrect. Veuillez réessayé."});

        }

        if (undefined === req.body.password) {

            return res.status(400).json({message: "Le mot de passe est introuvable. Veuillez réessayé."});

        }

        const passwordRegexp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

        if (!passwordRegexp.test(req.body.password)) {

            return res.status(400).json({message: "Le mot de passe est incorrect. Il doit contenir au moins un chiffre, doit contenir au moins une minuscule, doit contenir au moins une majuscule, doit contenir au moins 8 des caractères mentionnés. Veuillez réessayé"});

        }

        next();

    } catch (error) {

        return res.status(500).json({message: "Le mot de passe est incorrect. Il doit contenir au moins un chiffre, doit contenir au moins une minuscule, doit contenir au moins une majuscule, doit contenir au moins 8 des caractères mentionnés. Veuillez réessayé"});

    }

};