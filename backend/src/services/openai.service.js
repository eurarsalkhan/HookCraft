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
