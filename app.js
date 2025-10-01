document.getElementById("summarize-btn").addEventListener("click", async function() {
    const text = document.getElementById("document-text").value;
    if (!text.trim()) {
        alert("Por favor, cole o texto que deseja resumir.");
        return;
    }

    // Alerta de que o resumo está sendo gerado
    document.getElementById("summary-result").textContent = "Gerando resumo...";

    // `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`
    try {
        const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [
                    { parts: [{ text: text }] }
                ]
            })
        });

        if (!response.ok) {
            throw new Error('Erro ao acessar a API do Gemini');
        }

        const data = await response.json();

        // Verificando se a API retornou o resumo corretamente
        if (data && data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0].text) {
            document.getElementById("summary-result").textContent = data.candidates[0].content.parts[0].text;
        } else {
            document.getElementById("summary-result").textContent = "Erro ao gerar resumo.";
        }

    } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
        document.getElementById("summary-result").textContent = "Ocorreu um erro. Tente novamente mais tarde.";
    }
});
