import mongoose, { Schema, model } from "mongoose";

const reclamationSchema = new Schema({
    
    idClient: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Client'
    },
    description: {
        type: String,
        required: [true, 'description is required'],
    },
    type: {
        type: String,
        required: [true, 'type is required'],
    },
    dateReclamation: {
        type: Date,
        default: Date.now
    },
    statut_rec: {
        type: String,
        required: [true, 'statut reclamation is required'],
    }
},
    {
        timestamps: true
    }
);

export default model("Reclamation", reclamationSchema);