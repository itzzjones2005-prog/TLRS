// Fetches submissions to the "enquiries" form so the admin dashboard can
// list them without logging into the Netlify UI separately.
//
// Requires two environment variables set in Netlify (Site settings ->
// Environment variables) — see README.md "Enquiries dashboard setup":
//   NETLIFY_API_TOKEN  — a Personal Access Token from app.netlify.com/user/applications
//   NETLIFY_SITE_ID    — this site's Site ID (Site settings -> General -> Site details)
//
// Access is gated on a valid Netlify Identity session so only logged-in
// admins can call it.

exports.handler = async (event, context) => {
  const user = context.clientContext && context.clientContext.user;
  if (!user) {
    return { statusCode: 401, body: JSON.stringify({ error: "Not authenticated" }) };
  }

  const { NETLIFY_API_TOKEN, NETLIFY_SITE_ID } = process.env;
  if (!NETLIFY_API_TOKEN || !NETLIFY_SITE_ID) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        error: "not_configured",
        message: "NETLIFY_API_TOKEN and NETLIFY_SITE_ID are not set yet. See README.md."
      })
    };
  }

  const apiBase = "https://api.netlify.com/api/v1";
  const headers = { Authorization: `Bearer ${NETLIFY_API_TOKEN}` };

  try {
    const formsRes = await fetch(`${apiBase}/sites/${NETLIFY_SITE_ID}/forms`, { headers });
    if (!formsRes.ok) throw new Error(`Forms lookup failed (${formsRes.status})`);
    const forms = await formsRes.json();
    const enquiriesForm = forms.find(f => f.name === "enquiries");

    if (!enquiriesForm) {
      return { statusCode: 200, body: JSON.stringify({ items: [], note: "No 'enquiries' form found yet — it appears after your first submission." }) };
    }

    const subsRes = await fetch(`${apiBase}/forms/${enquiriesForm.id}/submissions`, { headers });
    if (!subsRes.ok) throw new Error(`Submissions lookup failed (${subsRes.status})`);
    const submissions = await subsRes.json();

    const items = submissions
      .map(s => ({
        id: s.id,
        created_at: s.created_at,
        data: s.data
      }))
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return { statusCode: 200, body: JSON.stringify({ items }) };
  } catch (err) {
    return { statusCode: 200, body: JSON.stringify({ error: "fetch_failed", message: err.message }) };
  }
};
