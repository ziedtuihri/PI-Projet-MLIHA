import Achat from "../models/achat.js";

export async function addOnce(req, res) {
  try {
    const { idClient, idProduit, quantite, prix, dateAchat } = req.body;

    const commande = prix.map((_, index) => ({
      idClient: idClient[index],
      idProduit: idProduit[index],
      quantite: quantite[index],
      prix: prix[index],
      total: prix[index] * quantite[index],
      dateAchat: new Date(dateAchat[index]),
    }));

    const total = commande.reduce(
      (accumulator, currentValue) => accumulator + currentValue.total,
      0
    );

    console.log(prix);
    console.log(quantite);
    console.log(total);
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
