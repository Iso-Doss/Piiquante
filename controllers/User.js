const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const User = require("../models/User");

const ApiResponse = require("../ApiResponse");

/**
 * Signup a user.
 *
 * @param req The request
 * @param res The response
 * @param next The next.
 */
exports.signup = (req, res, next) => {

    const apiResponse = new ApiResponse(false, "", req.body);

    User.find({email: req.body.email}).then((users) => {

        if (users.length >= 1) {

            apiResponse.message = "L'adresse email est déjà utilisé par un autre utilisateur. Veuillez réessayé.";

            res.status(400).json(apiResponse.apiResponse);

            return false;

        } else {

            bcrypt.hash(req.body.password, 10).then((hash) => {

                const user = new User({

                    email: req.body.email,

                    password: hash

                });

                user.save().then(() => {

                    apiResponse.success = true;

                    apiResponse.message = 'Utilisateur enregistré !'

                    res.status(201).json(apiResponse.apiResponse);

                }).catch((error) => {

                    apiResponse.message = "Une erreur inattendue s'est produite lors de la sauvegarde de l'utilisateur. Veuillez réessayé.";

                    res.status(400).json(apiResponse.apiResponse);

                });

            }).catch((error) => {

                apiResponse.message = "Une erreur inattendue s'est produite lors du cryptage du mot de passe. Veuillez réessayé.";

                res.status(500).json(apiResponse.apiResponse);

            });

        }

    }).catch((error) => {

        apiResponse.message = "Une erreur inattendue s'est produite lors de la vérification de l'existence du mail. Veuillez réessayé.";

        res.status(400).json(apiResponse.apiResponse);

    });

};

/**
 * Login a user.
 *
 * @param req The request
 * @param res The response
 * @param next The next.
 */
exports.login = (req, res, next) => {

    const apiResponse = new ApiResponse(false, "", req.body);

    User.findOne({email: req.body.email}).then((user) => {

            if (null === user) {

                apiResponse.message = "L'utilisateur est introuvable. Veuillez réessayé."

                res.status(401).json(apiResponse.apiResponse);

            } else {

                bcrypt.compare(req.body.password, user.password).then((valid) => {

                        if (!valid) {

                            apiResponse.message = "L'utilisateur est introuvable. Veuillez réessayé."

                            res.status(401).json(apiResponse.apiResponse);

                        } else {

                            apiResponse.success = true;

                            apiResponse.message = "L'utilisateur est authentifié."

                            apiResponse.data = {

                                userId: user._id,

                                email: req.body.email,

                                token: jwt.sign(
                                    {

                                        userId: user._id

                                    },

                                    'RANDOM_TOKEN_SECRET',

                                    {expiresIn: '24h'}
                                )

                            };

                            res.status(200).json(apiResponse.apiResponse);

                        }

                    }
                ).catch((error) => {

                    apiResponse.message = "Une erreur inattendue s'est produite lors de la vérification du mot de passe. Veuillez réessayé.";

                    res.status(500).json(apiResponse.apiResponse);

                });

            }
        }
    ).catch((error) => {

        apiResponse.message = "Une erreur inattendue s'est produite lors de la rechercher de l'utilisateur. Veuillez réessayé.";

        res.status(500).json(apiResponse.apiResponse);

    });

};