export const config = { api: { bodyParser: true } };

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const key = process.env.ANTHROPIC_API_KEY;

  // GET ile test et: /api/chat adresini tarayıcıda aç
  if (req.method === 'GET') {
    return res.status(200).json({
      keyExists: !!key,
      keyPrefix: key ? key.slice(0, 15) + '...' : 'YOK',
      keyLength: key ? key.length : 0,
    });
  }

  try {
    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(req.body),
    });

    const text = await upstream.text();

    // Anthropic'in tam hatasını dön
    if (!upstream.ok) {
      return res.status(upstream.status).json({
        anthropic_error: text,
        status: upstream.status,
      });
    }

    return res.status(200).json(JSON.parse(text));
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}