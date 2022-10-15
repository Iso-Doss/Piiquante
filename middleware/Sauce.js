module.exports = (req, res, next) => {

    let sauceObject = {};

    if (req.body.sauce) {

        if (undefined === req.body.sauce) {

            return res.status(400).json({message: "Les informations de la sauce sont introuvables. Veuillez réessayé."});

        }

        if ("" === req.body.sauce) {

            return res.status(400).json({message: "Les informations de la sauce sont vides. Veuillez réessayé."});

        }

        sauceObject = JSON.parse(req.body.sauce);

    } else {

        sauceObject = req.body;

    }


    try {

        if (undefined === sauceObject.name) {

            return res.status(400).json({message: "Le nom de la sauce est introuvable. Veuillez réessayé."});

        }

        if ("" === sauceObject.name) {

            return res.status(400).json({message: "Le nom de la sauce est vide. Veuillez réessayé."});

        }

        if (undefined === sauceObject.manufacturer) {

            return res.status(400).json({message: "Le fabricant de la sauce est introuvable. Veuillez réessayé."});

        }

        if ("" === sauceObject.manufacturer) {

            return res.status(400).json({message: "Le fabricant de la sauce est vide. Veuillez réessayé."});

        }

        if (undefined === sauceObject.description) {

            return res.status(400).json({message: "La description de la sauce est introuvable. Veuillez réessayé."});

        }

        if ("" === sauceObject.description) {

            return res.status(400).json({message: "La description de la sauce est vide. Veuillez réessayé."});

        }

        if (undefined === sauceObject.mainPepper) {

            return res.status(400).json({message: "Le principal ingrédient épicé de la sauce est introuvable. Veuillez réessayé."});

        }

        if ("" === sauceObject.mainPepper) {

            return res.status(400).json({message: "Le principal ingrédient épicé de la sauce est vide. Veuillez réessayé."});

        }

        if ("POST" === req.method) {

            if (("" === req.body.image || undefined === req.body.image) && undefined === req.file) {

                return res.status(400).json({message: "L'image de la sauce est vide. Veuillez réessayé."});

            }

        }

        if (undefined === sauceObject.heat) {

            return res.status(400).json({message: "Le nombre entre 1 et 10 décrivant la sauce est introuvable. Veuillez réessayé."});

        }

        if ("" === sauceObject.heat) {

            return res.status(400).json({message: "Le nombre entre 1 et 10 décrivant la sauce est introuvable. Veuillez réessayé."});

        }

        next();

    } catch (error) {

        res.status(400).json({message: ""});

    }

};