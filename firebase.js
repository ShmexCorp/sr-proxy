export default async function handler(req, res) {
  const BASE = "https://sr-trix-default-rtdb.europe-west1.firebasedatabase.app/";

  const { path } = req.query;

  if (!path) {
    return res.status(400).json({ error: "Missing path" });
  }

  const url = BASE + path;

  try {
    if (req.method === "GET") {
      const r = await fetch(url);
      const data = await r.json();
      return res.status(200).json(data);
    }

    if (req.method === "PUT") {
      const r = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(req.body),
      });
      const data = await r.json();
      return res.status(200).json(data);
    }

    return res.status(405).json({ error: "Method not allowed" });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
