# The Living Room Studios — Website Manual

This is your complete guide to launching and running your site. No coding
experience needed for the day-to-day tasks — adding work, replying to
enquiries, changing text. Deployment is a one-time setup, done once and
then mostly left alone.

**Read this once fully before you start** — the order of steps matters
(especially Identity → Git Gateway → invite yourself).

---

## 1. What you have

```
tlrs/
├── index.html          Homepage
├── work.html            Portfolio / gallery
├── services.html        Services page
├── about.html           About page
├── contact.html         Booking / enquiry form
├── dashboard.html        Your private admin dashboard (enquiries + links)
├── admin/                Content manager for posting work (Decap CMS)
│   ├── index.html
│   └── config.yml
├── content/
│   └── portfolio.json   The data behind your Work page (edited via /admin)
├── netlify/functions/
│   └── get-submissions.js   Powers the "Enquiries" list on your dashboard
├── css/style.css
├── js/main.js
├── netlify.toml
└── README.md             This file
```

- The **public site** is the four pages plus the homepage.
- The **admin panel** is two things working together: `/admin` (for posting
  photography work) and `/dashboard.html` (for reading and replying to
  booking enquiries, and a jumping-off point to everything else).
- Both are locked behind a login only you control — nobody can reach them
  without an account you personally invite.

---

## 2. Deploying the site (one-time setup)

Because your admin panel needs to *save* the work you post, it needs a real
Git repository behind it — not just a drag-and-drop upload. This is a
Netlify requirement for the content manager (Decap CMS) to work. It's still
free and still Netlify, just one extra step at the start.

### Step 1 — Put the files on GitHub

1. Create a free account at [github.com](https://github.com) if you don't have one.
2. Create a new **repository** (e.g. `tlrs-website`). Keep it **Private** if
   you'd rather the raw files not be public (this doesn't affect the live
   site, which is public either way).
3. Upload every file in this project to that repository, keeping the folder
   structure exactly as it is. Easiest way: on the repo page, use
   **Add file → Upload files** and drag the whole folder in, or use GitHub
   Desktop if you're comfortable installing it.

### Step 2 — Connect Netlify to that repository

1. Create a free account at [netlify.com](https://netlify.com) (sign up with
   your GitHub account to make step 3 easier).
2. Click **Add new site → Import an existing project**.
3. Choose **GitHub**, authorize Netlify, and select your `tlrs-website` repo.
4. Build settings: leave **Build command** empty and set **Publish
   directory** to `.` (a single dot) — this site has no build step, it's
   deployed as-is. Click **Deploy**.
5. After a minute your site is live at a `random-name-123.netlify.app`
   address. You can rename this (Site settings → General → Site details →
   Change site name) or attach your own domain later (Section 7).

### Step 3 — Turn on Identity (your login system)

1. In your site's Netlify dashboard: **Site configuration → Identity → Enable Identity**.
2. Under **Registration preferences**, set it to **Invite only** — this is
   what keeps the admin panel to just you. Save.
3. Under **Services → Git Gateway**, click **Enable Git Gateway**. This is
   what allows the content manager to save your posted work back to the
   site.

### Step 4 — Invite yourself as the admin

1. Still in **Identity**, click **Invite users**, and enter your own email
   address (the one from your brand sheet, `studiosthelivingroom@gmail.com`,
   or whichever you prefer to log in with).
2. Check that inbox for an email titled something like "You've been invited"
   — click the link, set a password. (Check spam if it doesn't arrive in a
   couple of minutes.)
3. That's your login for both `/admin` and `/dashboard.html` from now on.

**You're done with setup.** Your site is live, and only you can log into
the admin areas.

---

## 3. Logging in day-to-day

- Go to `yoursite.netlify.app/dashboard.html`
- Click **Log In**, enter the email + password from Step 4 above
- From there:
  - **"Open Content Manager"** → post/edit/remove work
  - Scroll down → see and reply to booking enquiries

Bookmark `/dashboard.html` — that's your home base.

---

## 4. Posting and managing your work

1. From the dashboard, click **Open Content Manager** (or go directly to
   `/admin`).
2. Click **Portfolio → Portfolio Items**.
3. You'll see every piece currently on your Work page as a list you can
   drag to reorder (top = shows first).
4. Click **Add** (or open an existing entry) to set:
   - **Title** — e.g. "Golden Hour Portrait"
   - **Category** — choose from the dropdown (Portraits, Weddings, Fashion
     & Beauty, Corporate Shoot, Events, Commercials, Graphics Design)
   - **Photo** — click to upload an image straight from your computer
   - **Short description** — optional
5. Click **Publish** (top right). Give it 30–60 seconds — your site
   rebuilds automatically and the new piece appears on the Work page and
   homepage.
6. To remove a piece, open it and use the trash/delete option, then Publish.

There's no limit on how many pieces you add. Large photos are automatically
optimized for the web when uploaded this way.

---

## 5. Reading and replying to bookings/enquiries

Every submission from the **Book / Enquire** page appears in two places:

- **Your dashboard** (`/dashboard.html`) — a clean list with a **Reply by
  Email** button per enquiry that opens a pre-filled email to that client
  in your own email app.
- **Netlify's own Forms tab** (Site configuration → Forms, or via
  app.netlify.com) — the underlying raw data, always available as a backup
  view even if the dashboard function isn't configured yet (see 5a).

### 5a. Getting instant email notifications (recommended, 2 minutes)

By default you have to check the dashboard/Netlify to see new enquiries.
To get emailed the moment someone submits the form:

1. Netlify dashboard → **Site configuration → Forms → Form notifications**
2. **Add notification → Email notification**
3. Set it to the `enquiries` form, enter your email
   (`studiosthelivingroom@gmail.com`), save.

Now every enquiry lands straight in your inbox too.

### 5b. Enabling the dashboard's enquiries list (optional, one-time)

The dashboard's built-in enquiries list needs two settings so it's allowed
to read your form data:

1. Go to **app.netlify.com/user/applications** → **New access token** →
   name it anything (e.g. "TLRS dashboard") → copy the token.
2. In your site: **Site configuration → Environment variables → Add a
   variable**:
   - `NETLIFY_API_TOKEN` = the token you just copied
   - `NETLIFY_SITE_ID` = found at **Site configuration → General → Site
     details → Site ID**
3. Redeploy the site once (Deploys tab → Trigger deploy) so the function
   picks up the new variables.

Until you do this, the dashboard will simply point you to the Netlify Forms
tab instead — nothing is broken, it's just an optional convenience layer.

---

## 6. Making everyday text edits

Some things are edited through GitHub directly rather than the visual
content manager, since they're page text rather than portfolio items:

| What | File | What to change |
|---|---|---|
| Services descriptions | `services.html` | Text inside each `<h3>`/`<p>` under "service-detail" |
| About page copy | `about.html` | Paragraph text |
| Phone / email / Instagram | `index.html`, `contact.html`, `work.html`, `services.html`, `about.html`, `dashboard.html` (footer + contact sections) | Search and replace the phone number/email — it appears in a few places |
| Site colors | `css/style.css`, top of file under `:root` | `--brass` (gold accent), `--navy` (blue tag color), `--ink` (background) — swap the hex codes |

To make an edit: open the file on GitHub, click the pencil (Edit) icon,
change the text, and commit. Netlify redeploys automatically within a
minute.

If you'd rather not touch GitHub for text at all, you can ask a developer
(or Claude) to add these fields to the content manager later — it's a small
extension of the same `admin/config.yml` file.

---

## 7. Custom domain (optional)

If you buy a domain (e.g. from Namecheap, GoDaddy, or Netlify itself):

1. Netlify dashboard → **Domain management → Add a domain**
2. Follow the prompts — if you bought it elsewhere, you'll add a couple of
   DNS records at your registrar; if you buy through Netlify, it's
   automatic.
3. HTTPS (the padlock) is issued automatically and free, usually within an
   hour.

---

## 8. Troubleshooting

**"Invite" email never arrived.** Check spam/promotions. You can re-send
from Identity → click the "..." next to the pending invite → Resend.

**I published work in the content manager but don't see it on the site.**
Give it 30–90 seconds and hard-refresh (Ctrl/Cmd+Shift+R). Check the
**Deploys** tab in Netlify — if it shows "Failed," open it to see why (this
is rare and usually means an image upload was interrupted; just try again).

**The booking form doesn't show up under Site configuration → Forms.**
Netlify only detects a form after it has been deployed at least once *and*
received at least one real submission (or you can force detection by
redeploying after the form's first deploy). If you just launched the site,
submit a test enquiry yourself first.

**Dashboard says "not configured yet" under Enquiries.** That's the
optional Section 5b setup — the Netlify Forms tab always works as a
fallback in the meantime.

**I want to remove someone's access.** Identity → find their entry → the
"..." menu → Delete. Only invite people you trust with full editing rights.

---

## 9. Who to contact if something breaks

This site has no ongoing subscription cost on the free tiers of GitHub and
Netlify used here. If you outgrow the free tier (very high traffic, need a
larger media library, etc.) both platforms have clearly priced paid plans —
nothing will "break," you'll simply be prompted to upgrade if you ever
cross a limit.

---

*Brand reference: The Living Room Studios — "A Team of Professional Visual
Scientists." Motto: "Visualising and Capturing Great Moments... From the
Lens to Your Heart."*
