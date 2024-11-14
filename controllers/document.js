import documentValidator from "../validators/document.js";
import { DocumentModel } from "../models/document.js";


export const addDocument = async (req, res, next)=>{
try {
    //validate user input for adding document
    const { error, value} = documentValidator.validate({
        ...req.body,
        fileUrl: req.file?.filename
    });
    if (error){
        return res.status(422).json({ error: error.details });
    }
    //Save the database
    const document = await DocumentModel.create(value);
    //Response to the request
    res.status(201).json(document)
} catch (error) {
    next(error);
}
}
