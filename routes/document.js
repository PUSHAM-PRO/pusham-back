//Documentation Storage: Implement backend for document repository, including legal agreements, terms of reference, and contracts.
import { Router } from "express";
import { addDocument } from "../controllers/document.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { documentUpload } from "../middlewares/upload.js";


const documentRouter = Router();

//define the routes
documentRouter.post('/document', documentUpload.single('fileUrl'), isAuthenticated, addDocument )

//export the router
export default documentRouter;


