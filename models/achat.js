import mongoose from "mongoose";
const { Schema, model } = mongoose;

const achatScehma = new Schema({
  commande: {
    type: [
      {
        idClient: Number,
        idProduit: Number,
        quantite: Number,
        prix: Number,
        total: Number,
        dateAchat: Date,
      },
    ],
    required: true,
  },
  somme: {
    type: Number,
    required: true,
  },
});

export default model("Achat", achatScehma);
