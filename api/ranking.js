// Ranking online do Breakpoint Tênis (função serverless da Vercel)
// Usa o Redis da Upstash conectado ao projeto (variáveis KV_REST_API_URL e KV_REST_API_TOKEN,
// ou UPSTASH_REDIS_REST_URL e UPSTASH_REDIS_REST_TOKEN). Guarda só apelido e números da carreira.
const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

async function redis(cmds) {
  const r = await fetch(`${URL_}/pipeline`, { method: 'POST', headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' }, body: JSON.stringify(cmds) });
  if (!r.ok) throw new Error('redis ' + r.status);
  return (await r.json()).map(x => x.result);
}
const clean = (s, n) => String(s || '').replace(/[<>"'`\\]/g, '').replace(/\s+/g, ' ').trim().slice(0, n);
const num = (v, lo, hi) => { v = Math.round(Number(v) || 0); return Math.max(lo, Math.min(hi, v)); };
const okId = id => /^[a-z0-9]{6,12}$/.test(String(id || ''));

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (!URL_ || !TOKEN) return res.status(503).json({ error: 'Ranking online ainda não configurado.' });
  try {
    if (req.method === 'POST') {
      const b = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
      if (!okId(b.id)) return res.status(400).json({ error: 'id inválido' });
      const e = {
        id: b.id, nick: clean(b.nick, 18) || 'Anônimo', circ: b.circ === 'WTA' ? 'WTA' : 'ATP', pais: clean(b.pais, 3).toUpperCase(),
        best: num(b.best, 0, 5000), titles: num(b.titles, 0, 400), slams: num(b.slams, 0, 60), w: num(b.w, 0, 3000), l: num(b.l, 0, 3000),
        prize: num(b.prize, 0, 1e9), age: num(b.age, 10, 60), ended: !!b.ended, at: Date.now()
      };
      const score = e.slams * 1000 + e.titles * 40 + (e.best ? Math.max(0, 1001 - e.best) : 0) + Math.floor(e.w / 2);
      e.score = score;
      await redis([['SET', `bp:p:${e.id}`, JSON.stringify(e), 'EX', 60 * 60 * 24 * 365], ['ZADD', `bp:rk:${e.circ}`, score, e.id]]);
      return res.status(200).json({ ok: true, score });
    }
    const q = req.query || {};
    const circ = q.circ === 'WTA' ? 'WTA' : 'ATP';
    let ids = [];
    if (q.ids) ids = String(q.ids).split(',').filter(okId).slice(0, 50);
    else ids = (await redis([['ZREVRANGE', `bp:rk:${circ}`, 0, 49]]))[0] || [];
    if (!ids.length) return res.status(200).json({ list: [] });
    const raw = await redis(ids.map(id => ['GET', `bp:p:${id}`]));
    const list = raw.map(x => { try { return JSON.parse(x) } catch (e) { return null } }).filter(Boolean).sort((a, b) => b.score - a.score);
    return res.status(200).json({ list });
  } catch (err) {
    return res.status(500).json({ error: 'Falha no ranking online.' });
  }
};
