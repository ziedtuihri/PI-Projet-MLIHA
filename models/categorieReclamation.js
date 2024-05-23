import mongoose, { Schema, model } from "mongoose";

const categorieReclamation = new Schema({
    
    idReclamation: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Reclamation'
    },
    libelleCategorie: {
        type: String,
        required: [true, 'libelleCategorie is required'],
    },
    description: {
        type: String,
        required: [true, 'description is required'],
    }
},
    {
        timestamps: true
    }
);

export default model("CategorieReclamation", categorieReclamation);