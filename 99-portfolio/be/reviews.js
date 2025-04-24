import express from 'express';
import fs from 'fs/promises';
import path from 'path';

const router = express.Router();

// Middleware checks if API key is present
router.use((req, res, next) => {
    const apiKey = req.header('X-Api-Key');
    if (!apiKey) {
        return res.status(401).json({error: 'API-Key fehlt'});
    }
    next();
});

// Hilfsfunktionen
function getFilePath(apiKey) {
    const safeKey = apiKey.replace(/[^a-zA-Z0-9_-]/g, '_');
    return path.resolve(`be/data/${safeKey}.json`);
}

async function readData(apiKey) {
    const filePath = getFilePath(apiKey);
    try {
        const content = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(content);
    } catch {
        return [];
    }
}

async function writeData(apiKey, data) {
    const filePath = getFilePath(apiKey);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

export default router;