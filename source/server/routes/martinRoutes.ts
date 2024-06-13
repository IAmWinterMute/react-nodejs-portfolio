import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';


//The router & paths
let router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Routes
router.get('/', (req, res, next) => {
    return res.sendFile(path.join(__dirname, '../assets/views/', 'martinIndex.htm'));
});

//Export the router
export default router;