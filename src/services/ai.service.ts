import axios from "axios";
import "dotenv/config";


export const analyzeContract = async (contract: any) => {
    const prompt = `
Eres un auditor experto en contratación pública (tipo SECOP ).

Analiza este contrato y responde SOLO en JSON:

{
  "risk": "LOW | MEDIUM | HIGH",
  "reasons": ["string"],
  "summary": "string"
}

Contrato:
${JSON.stringify(contract)}
`;

    const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
            model: "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free",
            messages: [
                { role: "system", content: "Eres un analista experto." },
                { role: "user", content: prompt }
            ],
            temperature: 0.3
        },
        {
            headers: {
                Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json"
            }
        }
    );

    return response.data.choices[0].message.content;
};