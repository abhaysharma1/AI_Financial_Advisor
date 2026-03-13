import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: 'GEMINI_API_KEY is not set' }, { status: 500 });
    }

    
    // Convert messages to Gemini format (optional, keeping it simple for now and sending everything)
    const prompt = `You are a professional, empathetic, and highly analytical financial advisor. 
You provide extremely premium, actionable, and accurate financial advice.
Format your responses using Markdown, including tables and bullet points where helpful.
CRITICAL INSTRUCTION: Keep your responses extremely concise, focused, and scannable. Limit your response to 1-3 short paragraphs at maximum unless a complex breakdown is explicitly requested. Do not write long, overwhelming essays.
Never break character.

Conversation so far:
${messages.map((m: { role: string; content: string }) => `${m.role === 'user' ? 'User' : 'Advisor'}: ${m.content}`).join('\n')}

Advisor:`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    if (!response.ok) {
        throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    return NextResponse.json({ text });

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
