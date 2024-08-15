export default async function handler(req, res) {
    const apiKey = process.env.API_KEY;

    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "contents": [{
                "role": "user",
                "parts": [{ "text": req.body.userMessage }]
            }]
        }),
    };

    try {
        const response = await fetch(API_URL, requestOptions);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Something went wrong." });
    }
}
