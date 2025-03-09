import { Groq } from "groq-sdk";

export async function POST(req: Request) {
  try {
    const { code } = await req.json();

    if (!code) {
      return new Response(JSON.stringify({ error: "No code provided" }), { status: 400 });
    }

    // Initialize GROQ SDK
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    // Define the prompt
    const prompt = `Analyze and suggest improvements for the following code:\n\n${code}\n\nProvide brief suggestions in bullet points.`;

    // Send request to GROQ API
    const response = await groq.chat.completions.create({
      model: "mixtral-8x7b-32768", // High-quality model
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const suggestions = response.choices[0]?.message?.content || "No suggestions available.";

    return new Response(JSON.stringify({ suggestions }), { status: 200 });
  } catch (error) {
    console.error("Error fetching AI suggestions:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}