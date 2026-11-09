export function buildPrompt({ niche, topic, tone, audience, hookType, length, count, genre, conflict, language, reaction, type }) {
   const lines = [];
  // lines.push('You are a high-performance social media hook generator.');
  // lines.push(`Produce ${count || 4} unique, scroll-stopping hooks.`);
  // lines.push('Rules:');
  // lines.push('- Each hook under 12 words.');
  // lines.push('- Start with a strong attention-grabber suitable for the first 2 seconds.');
  // lines.push('- Use the requested tone and style.');
  // lines.push('- Return each hook on its own line with no numbering.');

  // lines.push(`Niche: ${niche}`);
  // lines.push(`Topic: ${topic}`);
  // lines.push(`Tone: ${tone}`);
  // if (audience) lines.push(`Audience: ${audience}`);
  // if (hookType) lines.push(`HookType: ${hookType}`);
  // if (length) lines.push(`Length: ${length}`);

   const lines = [];

lines.push('You are an elite short-form retention strategist and viral content director.');
lines.push(`Produce ${count || 5} unique, scroll-stopping hooks strictly formatted as a JSON array.`);
lines.push('Rules:');
lines.push('- Tailor each hook specifically for the chosen platform (Instagram Reels, YouTube Shorts, Meta Ads, or LinkedIn).');
lines.push('- Every hook must use a clear psychological framework (e.g., Pattern Interrupt, Open Loop, Contrarian Truth, Negative Bias, PAS).');
lines.push('- Spoken script must be under 18 words, punchy, and suitable for the first 2 seconds.');
lines.push('- Include actionable Visual Cues (camera action/creator movement) and Text-on-Screen (bold high-contrast overlay).');
lines.push('- Include an Audio/SFX cue to set the pace immediately.');
lines.push('- Provide both a flawless, colloquial English script and a natural conversational Hindi script (Devanagari).');
lines.push('- Ban clichés like "Did you know", "In this video", or "Listen up".');
lines.push('Return ONLY a valid JSON object matching this structure:');
lines.push('{"hooks":[{"id":1,"platform":"...","framework":"...","visual_cue":"...","text_on_screen":"...","audio_cue":"...","script_en":"...","script_hi":"..."}]}');
  // lines.push('You are a high-performance social media hook generator.');
  // lines.push(`Produce ${count || 5} unique, scroll-stopping hooks.`);
  // lines.push('Rules:');
  // lines.push('- Each hook under 19 words.');
  // lines.push('- Start with a strong attention-grabber suitable for the first 2 seconds.');
  // lines.push('- Use the requested tone and style.');
  // lines.push('- Return each hook on its own line with no numbering.');

  // required info
  lines.push(`Niche: ${niche}`);
  lines.push(`Topic: ${topic}`);
  lines.push(`Tone: ${tone}`);
  if (audience) lines.push(`Audience: ${audience}`);
  if (hookType) lines.push(`HookType: ${hookType}`);
  if (length) lines.push(`Length: ${length}`);
  // new fields
  if (genre) lines.push(`Genre: ${genre}`);
  if (conflict) lines.push(`Conflict: ${conflict}`);
  if (language) lines.push(`Language: ${language}`);
  if (reaction) lines.push(`Reaction: ${reaction}`);
  if (type) lines.push(`Type: ${type}`);
  
  // safety guard
  lines.push("If the user's request seeks illegal or harmful content, respond: 'I cannot assist with that.'");

  return lines.join('\n');
}
