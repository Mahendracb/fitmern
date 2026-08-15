import dotenv from 'dotenv';
dotenv.config();

async function testGemini25() {
  const apiKey = process.env.GEMINI_API_KEY;
  const contents = [
    {
      role: 'user',
      parts: [{ text: 'Hello, suggest a healthy high-protein post-workout snack.' }],
    },
  ];

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  console.log('Posting to:', url);
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents }),
  });

  const data = await res.json();
  console.log('Status:', res.status);
  console.log('Reply:', data.candidates?.[0]?.content?.parts?.[0]?.text || data);
}

testGemini25().catch(console.error);
