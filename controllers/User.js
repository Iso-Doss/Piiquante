require('dotenv').config();

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const User = require("../models/User");

/**
 * Signup a user.
 *
 * @param req The request
 * @param res The response
 * @param next The next.
 */
exports.signup = (req, res, next) => {

    User.find({email: req.body.email}).then((users) => {

        if (users.length >= 1) {

            return res.status(400).json({"message": "L'adresse email est déjà utilisé par un autre utilisateur. Veuillez réessayé."});

        } else {

            bcrypt.hash(req.body.password, 10).then((hash) => {

                const user = new User({

                    email: req.body.email,

                    password: hash

                });

                user.save().then(() => {

                    res.status(201).json({"message": "Utilisateur enregistré !"});

                }).catch((error) => {

                    res.status(400).json({"message": "Une erreur inattendue s'est produite lors de la sauvegarde de l'utilisateur. Veuillez réessayé."});

                });

            }).catch((error) => {

                res.status(400).json({"message": "Une erreur inattendue s'est produite lors du cryptage du mot de passe. Veuillez réessayé."});

            });

        }

    }).catch((error) => {

        res.status(400).json({"message": "Une erreur inattendue s'est produite lors de la vérification de l'existence du mail. Veuillez réessayé."});

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

    User.findOne({email: req.body.email}).then((user) => {

            if (null === user) {

                res.status(401).json({"message": "L'utilisateur est introuvable. Veuillez réessayé."});

            } else {

                bcrypt.compare(req.body.password, user.password).then((valid) => {

                        if (!valid) {

                            res.status(401).json({"message": "L'utilisateur est introuvable. Veuillez réessayé."});

                        } else {

                            let token = jwt.sign(
                                {

                                    userId: user._id

                                },

                                'RANDOM_TOKEN_SECRET',

                                //process.env.RANDOM_TOKEN_SECRET,

                                {expiresIn: '24h'}
                            );

                            res.status(200).json({userId: user._id, email: req.body.email, token: token});

                        }

                    }
                ).catch((error) => {

                    res.status(500).json({"message": "Une erreur inattendue s'est produite lors de la vérification du mot de passe. Veuillez réessayé."});

                });

            }
        }
    ).catch((error) => {

        res.status(500).json({"message": "Une erreur inattendue s'est produite lors de la rechercher de l'utilisateur. Veuillez réessayé."});

    });

};