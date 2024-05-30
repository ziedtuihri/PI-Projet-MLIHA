import mongoose from "mongoose";
import Achat from "../models/achat.js";

export async function addOnce(req, res) {
  try {
    const { idClient, idProduit, quantite, prix, dateAchat } = req.body;
    const commande = [];

    for (let i = 0; i < idProduit.length; i++) {
      const index = commande.findIndex((x) => x.idProduit == idProduit[i]);
      if (index == -1) {
        commande.push({
          idClient: idClient[i],
          idProduit: idProduit[i],
          quantite: quantite[i],
          prix: prix[i],
          total: prix[i] * quantite[i],
          dateAchat: new Date(dateAchat[i]),
        });
      } else {
        commande[index].quantite += quantite[i];
        commande[index].total = commande[index].quantite * commande[index].prix;
      }
    }

    const total = commande.reduce(
      (accumulator, currentValue) => accumulator + currentValue.total,
      0
    );

    const achat = await Achat.create({
      commande: commande,
      somme: total,
    });
    res.status(200).json({ message: "purchase add successfully", achat });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

export async function getAll(req, res) {
  try {
    const achat = await Achat.find();
    res.status(200).json({ message: "purchase list", achat });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

export async function updateOne(req, res) {
  try {
    let newAchat;
    const achat = await Achat.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(req.params.idAchat) } },
      { $unwind: "$commande" },
      {
        $match: {
          "commande._id": new mongoose.Types.ObjectId(req.params.idProduit),
        },
      },
    ]);
    if (achat.length > 0) {
      const result = achat[0];

      if (req.body.quantite > result.commande.quantite) {
        const newQuantite = req.body.quantite - result.commande.quantite;
        const difference = newQuantite * result.commande.prix;
        const newSomme = difference + result.somme;
        newAchat = await Achat.findOneAndUpdate(
          {
            "commande._id": req.params.idProduit,
          },
          {
            $set: {
              "commande.$.quantite": req.body.quantite,
              "commande.$.total": req.body.quantite * result.commande.prix,
              somme: newSomme,
            },
          },
          { new: true }
        );
        res.status(200).json({ mesg: "update successfully", newAchat });
      } else if (req.body.quantite < result.commande.quantite) {
        const newQuantite = result.commande.quantite - req.body.quantite;
        const difference = newQuantite * result.commande.prix;
        const newSomme = result.somme - difference;
        newAchat = await Achat.findOneAndUpdate(
          {
            "commande._id": req.params.idProduit,
          },
          {
            $set: {
              "commande.$.quantite": req.body.quantite,
              "commande.$.total": req.body.quantite * result.commande.prix,
              somme: newSomme,
            },
          },
          { new: true }
        );
        res.status(200).json({ mesg: "update successfully", newAchat });
      } else {
        newAchat = await Achat.findOne({ _id: req.params.idAchat });
        res.status(200).json({ mesg: "la quantite est la même", newAchat });
      }
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
