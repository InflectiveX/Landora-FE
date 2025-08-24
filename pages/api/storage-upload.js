import { createClient } from "@supabase/supabase-js";

// This API route accepts POST JSON: { bucket, path, base64, contentType }
// It uses the Supabase service role key (must be set in env: SUPABASE_SERVICE_ROLE_KEY)
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { bucket, path, base64, contentType } = req.body || {};
  if (!bucket || !path || !base64) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    return res
      .status(500)
      .json({ error: "Server missing Supabase configuration (service key)" });
  }

  const supabaseAdmin = createClient(url, serviceKey, {
    auth: { persistSession: false },
  });

  try {
    const buffer = Buffer.from(base64, "base64");

    const { data, error: uploadError } = await supabaseAdmin.storage
      .from(bucket)
      .upload(path, buffer, { contentType, upsert: false });

    if (uploadError) {
      return res
        .status(500)
        .json({ error: uploadError.message || uploadError });
    }

    const { data: urlData } = supabaseAdmin.storage
      .from(bucket)
      .getPublicUrl(path);

    return res
      .status(200)
      .json({ data, publicUrl: urlData?.publicUrl || null });
  } catch (err) {
    return res.status(500).json({ error: err.message || err });
  }
}
