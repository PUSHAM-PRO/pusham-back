import multer from "multer"; 
import { multerSaveFilesOrg } from "multer-savefilesorg";

//remote storage creation
export const ticketUpload = multer({
    storage: multerSaveFilesOrg({
        apiAccessToken: process.env.SAVEFILESORG_API_KEY,
        relativePath: '/Pusham/ticket/*'
    }),
    preservePath: true
})

export const documentUpload = multer({
    storage: multerSaveFilesOrg({
        apiAccessToken: process.env.SAVEFILESORG_API_KEY,
        relativePath: '/Pusham/document/*'
    }),
    preservePath: true
})



export const profileUpload = multer({
    storage: multerSaveFilesOrg({
        apiAccessToken: process.env.SAVEFILESORG_API_KEY,
        relativePath: '/Pusham/profile/*'
    }),
    preservePath: true
})

