// // Hook generation orchestration: validate, check credits, caching, OpenAI call, persist
// import { buildPrompt } from '../../utils/prompt.util.js';
// import { generateFromOpenAI } from '../../services/openai.service.js';
// import { sha256 } from '../../utils/hash.util.js';
// import { getCached, setCache } from '../../utils/cache.util.js';
// import { query } from '../../config/db.js';

// export async function generateHooksForUser(userId, input) {
//   // input validated upstream
//   const creditsToDeduct = 2 * count;
//   const count = input.count || 5;
//   const hash = sha256(`${input.niche}|${input.topic}|${input.tone}|${input.audience||''}|${input.hookType||''}|${input.length||''}|${count}`);

//   // check cache
//   const cached = await getCached(hash);
//   if (cached) {
//     // record generation row (cached) but do not deduct credits (design choice)
//     await query('INSERT INTO generations(user_id, input_niche, input_topic, response_text, tokens_used) VALUES($1,$2,$3,$4,$5)', [userId, input.niche, input.topic, JSON.stringify(cached), 0]);
//     return { hooks: cached, cached: true };
//   }

//   // deduct credit atomically
//   const upd = await query(
//   'UPDATE users SET credits = credits - $1, total_generations = total_generations + $2 WHERE id=$3 AND credits >= $1 RETURNING credits',
//   [creditsToDeduct, count, userId]
// );
//   if (upd.rowCount === 0) throw new Error('INSUFFICIENT_CREDITS');

//   // call OpenAI
//   const prompt = buildPrompt({ ...input, count });
//   const { text, usage } = await generateFromOpenAI(prompt);

//   const hooks = text.split(/\n+/).map(s => s.trim()).filter(Boolean).slice(0, count);

//   // persist
//   await query('INSERT INTO generations(user_id, input_niche, input_topic, response_text, tokens_used) VALUES($1,$2,$3,$4,$5)', [userId, input.niche, input.topic, JSON.stringify(hooks), usage.total_tokens || 0]);

//   // cache
//   await setCache(hash, hooks);

//   return { hooks, cached: false, usage };
// }
// Hook generation orchestration: validate, check credits, caching, OpenAI call, persist
import { buildPrompt } from '../../utils/prompt.util.js';
import { generateFromOpenAI } from '../../services/openai.service.js';
import { sha256 } from '../../utils/hash.util.js';
import { getCached, setCache } from '../../utils/cache.util.js';
import { query } from '../../config/db.js';
// import { generateWithGemini } from '../../services/openai.service.js';

export async function generateHooksForUser(userId, input) {
  try {
    // ✅ Safe defaults for required fields
    const niche = input.niche || 'General';
    const topic = input.topic || 'Default topic';
    const tone = input.tone || 'Neutral';

    // ✅ Safe defaults for optional fields
    const audience = input.audience || '';
    const hookType = input.hookType || '';
    const length = input.length || 'Short';
    const genre = input.genre || '';
    const conflict = input.conflict || '';
    const language = input.language || 'English';
    const reaction = input.reaction || '';
    const type = input.type || '';

    // ✅ Count declared before use
    const count = (input.count && Number.isInteger(input.count)) ? input.count : 5;
    const creditsToDeduct = 2 * count;

    // ✅ Build cache key
    const hash = sha256([
      niche, topic, tone, audience, hookType, length,
      genre, conflict, language, reaction, type, count
    ].join('|'));

    // 🔄 Check cache
    const cached = await getCached(hash);
    if (cached) {
      await query(
        'INSERT INTO generations(user_id, input_niche, input_topic, response_text, tokens_used) VALUES($1,$2,$3,$4,$5)',
        [userId, niche, topic, JSON.stringify(cached), 0]
      );
      return { hooks: cached, cached: true };
    }

    // 💳 Deduct credits atomically
    const upd = await query(
      'UPDATE users SET credits = credits - $1, total_generations = total_generations + $2 WHERE id=$3 AND credits >= $1 RETURNING credits',
      [creditsToDeduct, count, userId]
    );
    if (upd.rowCount === 0) throw new Error('INSUFFICIENT_CREDITS');

    // 🤖 Call OpenAI
    const prompt = buildPrompt({
      niche, topic, tone, audience, hookType, length,
      genre, conflict, language, reaction, type, count
    });

    const { text, usage } = await generateFromOpenAI(prompt);

    // 📝 Normalize hooks
    const hooks = text
      .split(/\n+/)
      .map(s => s.trim())
      .filter(Boolean)
      .slice(0, count);

    // 🗄️ Persist generation
    await query(
      'INSERT INTO generations(user_id, input_niche, input_topic, response_text, tokens_used) VALUES($1,$2,$3,$4,$5)',
      [userId, niche, topic, JSON.stringify(hooks), usage?.total_tokens || 0]
    );

    // ⚡ Cache result
    await setCache(hash, hooks);

    return { hooks, cached: false, usage };
  } catch (err) {
    console.error('generateHooksForUser error:', err);
    // Return a structured error so frontend sees a clear message
    throw new Error(`GENERATION_FAILED: ${err.message}`);
  }
}


// export async function generateHooksForUser(userId, input) {
//   try {
//     // ✅ Safe defaults for required fields
//     const niche = input.niche || 'General';
//     const topic = input.topic || 'Default topic';
//     const tone = input.tone || 'Neutral';

//     // ✅ Safe defaults for optional fields
//     const audience = input.audience || '';
//     const hookType = input.hookType || '';
//     const length = input.length || 'Short';
//     const genre = input.genre || '';
//     const conflict = input.conflict || '';
//     const language = input.language || 'English';
//     const reaction = input.reaction || '';
//     const type = input.type || '';

//     // ✅ Count declared before use
//     const count = (input.count && Number.isInteger(input.count)) ? input.count : 5;
//     const creditsToDeduct = 2 * count;

//     // ✅ Build cache key
//     const hash = await sha256([
//       niche, topic, tone, audience, hookType, length,
//       genre, conflict, language, reaction, type, count
//     ].join('|'));

//     // 🔄 Check cache
//     const cached = await getCached(hash);
//     if (cached) {
//       await query(
//         'INSERT INTO generations(user_id, input_niche, input_topic, response_text, tokens_used) VALUES($1,$2,$3,$4,$5)',
//         [userId, niche, topic, JSON.stringify(cached), 0]
//       );
//       return { hooks: cached, cached: true };
//     }

//     // 💳 Deduct credits atomically
//     const upd = await query(
//       'UPDATE users SET credits = credits - $1, total_generations = total_generations + $2 WHERE id=$3 AND credits >= $1 RETURNING credits',
//       [creditsToDeduct, count, userId]
//     );
//     if (upd.rowCount === 0) throw new Error('INSUFFICIENT_CREDITS');

//     // 🤖 Call Gemini
//     const prompt = buildPrompt({
//       niche, topic, tone, audience, hookType, length,
//       genre, conflict, language, reaction, type, count
//     });

//     const { text, usage } = await generateWithGemini(prompt, 250); // max_tokens optional

//     // 📝 Normalize hooks
//     const hooks = text
//       .split(/\n+/)
//       .map(s => s.trim())
//       .filter(Boolean)
//       .slice(0, count);

//     // 🗄️ Persist generation
//     await query(
//       'INSERT INTO generations(user_id, input_niche, input_topic, response_text, tokens_used) VALUES($1,$2,$3,$4,$5)',
//       [userId, niche, topic, JSON.stringify(hooks), usage?.total_tokens || 0]
//     );

//     // ⚡ Cache result
//     await setCache(hash, hooks);

//     return { hooks, cached: false, usage };
//   } catch (err) {
//     console.error('generateHooksForUser error:', err);
//     throw new Error(`GENERATION_FAILED: ${err.message}`);
//   }
// }
