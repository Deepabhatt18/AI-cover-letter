export default async function handler(req, res) {
  try {
    const { prompt } = req.body;

    // ✅ API KEY VARIABLE
    const API_KEY = process.env.GEMINI_API_KEY;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ]
        })
      }
    );

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    // ✅ Safe check (important)
    if (!data.candidates || data.candidates.length === 0) {
      return res.status(500).json({ error: "No response from AI" });
    }

    const result = data.candidates[0].content.parts[0].text;

    res.status(200).json({ result });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
}