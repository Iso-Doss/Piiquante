const fs = require("fs");

const Sauce = require("../models/Sauce");

/**
 * Create sauce.
 *
 * @param req The request.
 * @param res The response.
 */
exports.create = (req, res) => {

    const sauceObject = JSON.parse(req.body.sauce);

    delete sauceObject._id;

    delete sauceObject.userId;

    const sauce = new Sauce({

        ...sauceObject,

        userId: req.auth.userId,

        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`

    });

    sauce.save().then(() => {

        res.status(201).json({"message": "La sauce a été enregistrée avec succès."});

    }).catch((error) => {

        res.status(201).json(new Error("Une erreur inattendue s'est produite lors de la sauvegarde de la sauce. Veuillez réessayé."));

    });

};

/**
 * Read a sauce.
 *
 * @param req The request.
 * @param res The response.
 */
exports.read = (req, res) => {

    Sauce.findOne({_id: req.params.id}).then((sauce) => {

        res.status(200).json(sauce);

    }).catch((error) => {

        res.status(404).json({"message": "La sauce n'existe pas ou n'est pas disponible pour le moment. Veuillez réessayé."});

    });

};

/**
 * Read all sauces.
 *
 * @param req The request.
 * @param res The response.
 */
exports.readSauces = (req, res) => {

    Sauce.find().then((sauces) => {

        res.status(200).json(sauces);

    }).catch((error) => {

        res.status(404).json({"message": "Aucune sauce n'est disponible pour le moment. Veuillez réessayé."});

    });

};

/**
 * Update a sauce.
 *
 * @param req The request.
 * @param res The response.
 * @param next The next.
 */
exports.update = (req, res, next) => {

    const sauceObject = req.file ? {

        ...JSON.parse(req.body.sauce),

        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`

    } : {

        ...req.body

    }

    Sauce.findOne({_id: req.params.id}).then(sauce => {

            if (req.auth.userId !== sauce.userId) {

                res.status(404).json({"message": "Utilisateur non autorisé. Vous tentez de modifier une sauce qui ne vous appartient pas."});

            } else {

                if (req.file) {

                    const filename = sauce.imageUrl.split('/images/')[1];

                    fs.unlink(`images/${filename}`, () => {
                    });

                }

                Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id}).then(() => {

                    res.status(200).json({"message": "La sauce a été modifiée avec succès."});

                }).catch((error) => {

                    res.status(401).json({"message": "Une erreur inattendue s'est produite lors de la mise a jour de la sauce. Veuillez réessayé."});

                });

            }

        }
    ).catch((error) => {

        res.status(404).json({"message": "La sauce n'existe pas ou n'est pas disponible pour le moment. Veuillez réessayé."});

    });

};

/**
 * Delete a sauce.
 *
 * @param req The request.
 * @param res The response.
 */
exports.delete = (req, res) => {

    Sauce.findOne({_id: req.params.id}).then(sauce => {

        if (sauce.userId !== req.auth.userId) {

            res.status(401).json({"message": "Utilisateur non autorisé. Vous tentez de supprimer une sauce qui ne vous appartient pas."});

        } else {

            const filename = sauce.imageUrl.split('/images/')[1];

            fs.unlink(`images/${filename}`, () => {

                sauce.deleteOne({_id: req.params.id}).then(() => {

                    res.status(200).json({"message": "La sauce a été supprimée avec succès."});

                }).catch((error) => {

                    res.status(401).json({"message": "Une erreur inattendue s'est produite lors de la suppression de la sauce. Veuillez réessayé."});

                });

            });

        }

    }).catch((error) => {

        res.status(404).json({"message": "La sauce n'existe pas ou n'est pas disponible pour le moment. Veuillez réessayé."});

    });

};

/**
 * Like and dislike a sauce.
 *
 * @param req The request.
 * @param res The response.
 */
exports.likeAndDislike = (req, res) => {

    const like = req.body.like;

    const userId = req.body.userId;

    if (req.auth.userId !== userId) {

        res.status(404).json({"message": "Utilisateur non autorisé. L'utilisateur qui tante de mette un like ou dislike la sauce est différent de l'utilisateur connecté."});

    }

    Sauce.findOne({_id: req.params.id}).then((sauce) => {

        switch (like) {

            case -1:

                if (!sauce.usersDisliked.includes(userId)) {

                    Sauce.updateOne({_id: req.params.id},
                        {
                            $push: {usersDisliked: req.body.userId},
                            $inc: {dislikes: 1},
                        }).then(() => {

                        res.status(200).json({message: "Dislike ajouté avec succès."});

                    }).catch((error) => {

                        res.status(400).json({message: "Une erreur inattendue s'est produite lors de l'ajout du dislike sur la sauce. Veuillez réessayé."});

                    });

                } else {

                    res.status(404).json({"message": "Désolé vous avez déjà mit un dislike sur cette sauce."});

                }

                break;

            case 0:

                if (sauce.usersLiked.includes(userId)) {

                    Sauce.updateOne({_id: req.params.id},
                        {
                            $pull: {usersLiked: req.body.userId},
                            $inc: {likes: -1},
                        }).then(() => {

                        res.status(200).json({message: "Like retiré avec succès."});

                    }).catch((error) => {

                        res.status(400).json({message: "Une erreur inattendue s'est produite lors de la suppression du like sur la sauce. Veuillez réessayé."});

                    });

                } else if (sauce.usersDisliked.includes(userId)) {

                    Sauce.updateOne({_id: req.params.id},
                        {
                            $pull: {usersDisliked: req.body.userId},
                            $inc: {dislikes: -1},
                        }).then(() => {

                        res.status(200).json({message: "Dislike retiré avec succès."});

                    }).catch((error) => {

                        res.status(400).json({message: "Une erreur inattendue s'est produite lors de la suppression du dislike sur la sauce. Veuillez réessayé."});

                    });

                } else {

                    res.status(404).json({"message": "Désolé vous n'avez pas encore mit un dislike sur cette sauce."});

                }

                break;

            case 1:

                if (!sauce.usersLiked.includes(userId)) {

                    Sauce.updateOne({_id: req.params.id},
                        {
                            $push: {usersLiked: req.body.userId},
                            $inc: {likes: 1},
                        }).then(() => {

                        res.status(200).json({message: "Like ajouté avec succès."});

                    }).catch((error) => {

                        res.status(400).json({message: "Une erreur inattendue s'est produite lors de l'ajout du like sur la sauce. Veuillez réessayé."});

                    });

                } else {

                    res.status(404).json({"message": "Désolé vous avez déjà mit un dislike sur cette sauce."});

                }

                break;

            default:

                res.status(404).json({"message": "Action non reconnue. Vous essayez d'appliquer une action non disponible. Veuillez réessayé."});

                break;
        }

    }).catch((error) => {

        res.status(404).json({"message": "La sauce n'existe pas ou n'est pas disponible pour le moment. Veuillez réessayé."});

    });

};