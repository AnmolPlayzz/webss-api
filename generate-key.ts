import * as crypto from "node:crypto";
function generateApiKey(length: number) {
    return crypto.randomBytes(length).toString('hex');
}

const apiKey = generateApiKey(32); //change it if u want
console.log(`API_KEY=${apiKey}`);