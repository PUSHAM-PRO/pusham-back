import { Schema, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

    const documentSchema = new Schema({
    title: { type: String, required: true },
    type: { type: String, enum: ['Legal Agreement', 'Terms of Reference', 'Contract'],
        // required: true 
        },
    description: { type: String },
    fileUrl: { type: String},
    createdBy: {
        type: String
        // Types.ObjectId, 
        // ref: 'User',
        // required: true
    },
}, { timestamps: true });

documentSchema.plugin(toJSON);

export const DocumentModel = model('Document', documentSchema);




