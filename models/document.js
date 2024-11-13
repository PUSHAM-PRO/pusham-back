import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

    const documentSchema = new Schema({
    title: { type: String, required: true },
    type: { type: String, enum: ['Legal Agreement', 'Terms of Reference', 'Contract'], required: true },
    description: { type: String },
    uploadDate: { type: Date, default: Date.now },
    fileUrl: { type: String, required: true },
    createdBy: {
        type: Types.ObjectId, //reference for the user/role who adds the document
        ref: 'User',
        required: true
    },
}, { timestamps: true });

documentSchema.plugin(toJSON);

export const DocumentModel = model('Document', documentSchema);




