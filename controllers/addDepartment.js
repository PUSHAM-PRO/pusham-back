import { fileURLToPath } from "url";
import path from "path";
import fs from "fs"; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const categoriesPath = path.join(__dirname, "../models/category.json");

export const addCategory = (req, res, next) => {
  try {
    const { category } = req.body;

    if (!category || typeof category !== "string") {
      return res.status(400).json("Invalid or missing category");
    }

    const data = JSON.parse(fs.readFileSync(categoriesPath, "utf8"));

    if (!data.category.includes(category)) {
      data.category.push(category);
      fs.writeFileSync(categoriesPath, JSON.stringify(data, null, 2));
      return res.status(201).json("Department added successfully");
    }

    return res.status(409).json("Department is already available");
  } catch (error) {
    next(error); 
  }
};
