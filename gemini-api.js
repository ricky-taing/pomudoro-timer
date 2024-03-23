const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

function fileToGenerativePart(path, mimeType) {
    return {
        inlineData: {
            data: Buffer.from(fs.readFileSync(path)).toString('base64'), mimeType
        }
    }
}

async function runPro() {
    const modelPro = genAI.getGenerativeModel({ model: 'gemini-pro' });
    let prompt = 'Write a story about magic backpack.';
    let result = await model.generateContent(prompt);
    let response = await result.response;
    let text = response.text();
    // console.log(text);
}

async function runProVision() {
    const modelProVision = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });
    let prompt = 'What\'s different between these pictures?';
    let imageParts = [
        fileToGenerativePart('images/nissan-gtr.jpg', 'image/jpeg'),
        fileToGenerativePart('images/tanuki.jpg', 'image/jpeg')
    ];
    let result = await modelProVision.generateContent([prompt, ...imageParts]);
    let response = await result.response;
    let text = response.text();
    console.log(text);
}

// runPro();
runProVision();