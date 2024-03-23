const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const modelPro = genAI.getGenerativeModel({ model: 'gemini-pro' });
const modelProVision = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });
const modelEmbed = genAI.getGenerativeModel({ model: 'embedding-001' });

function fileToGenerativePart(path, mimeType) {
    return {
        inlineData: {
            data: Buffer.from(fs.readFileSync(path)).toString('base64'), mimeType
        }
    }
}

async function textToText() {
    let prompt = 'Write a story a boy moving to work in the city.';
    let result = await modelPro.generateContent(prompt);
    let response = await result.response;
    let text = response.text();
    console.log(text);
}

async function imageToText() {
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

async function textToChat() {
    let chat = modelPro.startChat({
        history: [
            {
                role: 'user',
                parts: 'Hello. I have 2 dogs in my house.'
            },
            {
                role: 'model',
                parts: 'Great to meet you. What would you like to know?'
            }
        ]
    });
    let msg = 'How many paws are in my house?';
    let result = await chat.sendMessage(msg);
    let response = await result.response;
    let text = response.text();
    console.log(text);
}

async function textToEmbed() {
    let text = 'The quick brown fox jumped over the lazy dog';
    let result = await modelEmbed.embedContent(text);
    let embedding = result.embedding;
    console.log(embedding);
}

// textToText();
// imageToText();
// textToChat();
textToEmbed();