const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

app.post('/alimentacao', async (req, res) => {
    const { text } = req.body;
    const prompt = `Você é um assistente de alimentação saudável. Analise o texto a seguir, forneça dicas, sugestões de metas, cardápios, recomendações e alertas para melhorar a alimentação, considerando o perfil e objetivos descritos. Seja detalhado e motivacional. Texto: ${text}`;
    try {
        const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyBf55MpgGvURPydR0UDEStpOj2M9tndw44', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [
                    { parts: [{ text: prompt }] }
                ]
            })
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao acessar a API Gemini.' });
    }
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));