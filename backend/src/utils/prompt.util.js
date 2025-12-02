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
  
  lines.push('You are a high-performance social media hook generator.');
  lines.push(`Produce ${count || 4} unique, scroll-stopping hooks.`);
  lines.push('Rules:');
  lines.push('- Each hook under 12 words.');
  lines.push('- Start with a strong attention-grabber suitable for the first 2 seconds.');
  lines.push('- Use the requested tone and style.');
  lines.push('- Return each hook on its own line with no numbering.');

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
