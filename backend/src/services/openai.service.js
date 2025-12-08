// lightweight OpenAI wrapper using fetch
import fetch from 'node-fetch';
import { OPENAI_API_KEY } from '../config/env.js';

export async function generateFromOpenAI(prompt, max_tokens = 250) {
  
  const res = await fetch('https://api.openai.com/v1/chat/completions', {

    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${OPENAI_API_KEY}` },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      max_tokens
    })
  });

  const json = await res.json();
  if (json.error) throw new Error(json.error.message || 'OpenAI error');
  const text = json.choices?.[0]?.message?.content || '';
  const usage = json.usage || {};
  return { text, usage };
}

// lightweight OpenAI wrapper using fetch
// import fetch from 'node-fetch';
// import { OPENAI_API_KEY } from '../config/env.js';

// export async function generateFromOpenAI(prompt, max_tokens = 250) {

//   // 👇👇 YAHI FINAL LOG LINE ADD KARO
//   console.log("🔥 AI FINAL PROMPT:", prompt);

//   const res = await fetch('https://api.openai.com/v1/chat/completions', {
//     method: 'POST',
//     headers: { 
//       'Content-Type': 'application/json', 
//       Authorization: `Bearer ${OPENAI_API_KEY}` 
//     },
//     body: JSON.stringify({
//       model: 'gpt-4o-mini',
//       messages: [{ role: 'user', content: prompt }],
//       max_tokens
//     })
//   });

//   const json = await res.json();

//   if (json.error) throw new Error(json.error.message || 'OpenAI error');

//   const text = json.choices?.[0]?.message?.content || '';
//   const usage = json.usage || {};

//   return { text, usage };
// }
// import fetch from 'node-fetch';
// import { GEMINI_API_KEY } from '../config/env.js';

// export async function generateWithGemini(prompt, maxTokens = 250) {
//   const res = await fetch(
//     `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-preview:generateContent?key=${GEMINI_API_KEY}`,
//     {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         contents: [
//           {
//             parts: [{ text: prompt }]
//           }
//         ],
//         generationConfig: {
//           maxOutputTokens: maxTokens
//         }
//       })
//     }
//   );

//   const text = await res.text(); // read raw first

//   let json;
//   try {
//     json = JSON.parse(text);
//   } catch {
//     console.error("⚠ Gemini did not return JSON:", text);
//     throw new Error("Gemini Invalid JSON Response");
//   }

//   if (json.error) {
//     throw new Error(json.error.message || 'Gemini API error');
//   }

//   const content = json.candidates?.[0]?.content?.parts?.[0]?.text || '';
//   return { text: content };
// }
