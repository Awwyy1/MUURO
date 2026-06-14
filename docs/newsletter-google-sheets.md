# Newsletter through Google Sheets

The newsletter sign-up on `muuro.co` posts to `/api/subscribe`. That
route forwards the address to whichever provider is configured. The
recommended path for the early stage is a free **Google Sheet** with a
**Google Apps Script Web App** as the receiver. Zero monthly cost, a
real spreadsheet you can sort and export, and Resend / Klaviyo can take
over later by just swapping environment variables.

## What you get when this is wired up

- Every sign-up appends one row to a sheet you own.
- Columns: `timestamp`, `email`, `source`, `user agent`.
- No duplicates: the script silently skips an address that is already
  on the list.
- The endpoint is invisible to the public form. Customers only see the
  brand confirmation message.

## One-time setup

### 1. Create the sheet

1. Go to [sheets.new](https://sheets.new). Opens a blank sheet.
2. Rename the file to `MUURO Newsletter`.
3. In row 1 put the headers, one per column:

   ```
   timestamp | email | source | user agent
   ```

4. Freeze the first row: View → Freeze → 1 row.

### 2. Add the Apps Script

1. Same sheet, top menu: Extensions → Apps Script. A new tab opens.
2. Delete the placeholder `function myFunction() { ... }`.
3. Paste the script below in full:

   ```javascript
   const ALLOWED_ORIGINS = [
     "https://muuro.co",
     "https://www.muuro.co",
     // add preview URL here while testing on Vercel previews
   ];

   const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

   function doPost(e) {
     try {
       const payload = JSON.parse(e.postData.contents || "{}");
       const email = String(payload.email || "").trim().toLowerCase();
       const source = String(payload.source || "web").slice(0, 60);
       const ua = String(payload.userAgent || "").slice(0, 200);

       if (!EMAIL_RE.test(email)) {
         return json({ error: "invalid_email" });
       }

       const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
       const existing = sheet
         .getRange(2, 2, Math.max(sheet.getLastRow() - 1, 0), 1)
         .getValues()
         .flat()
         .map(String)
         .map(function (v) { return v.toLowerCase(); });

       if (existing.indexOf(email) === -1) {
         sheet.appendRow([new Date().toISOString(), email, source, ua]);
       }

       return json({ ok: true });
     } catch (err) {
       return json({ error: "server_error" });
     }
   }

   function doGet() {
     // Apps Script requires doGet for the Web App to deploy cleanly.
     return json({ ok: true, service: "muuro-newsletter" });
   }

   function json(obj) {
     return ContentService
       .createTextOutput(JSON.stringify(obj))
       .setMimeType(ContentService.MimeType.JSON);
   }
   ```

4. Save the file (⌘S / Ctrl+S). Name the project `muuro-newsletter`.

### 3. Deploy it as a Web App

1. Top right of the Apps Script editor: **Deploy → New deployment**.
2. Click the gear icon next to "Select type" and pick **Web app**.
3. Fill in:
   - **Description**: `MUURO newsletter v1`
   - **Execute as**: `Me (your@email)`
   - **Who has access**: **`Anyone`** (this is required so the website
     can post without a Google login; the script itself only writes,
     never exposes the sheet)
4. Click **Deploy**.
5. Google asks for permissions on the first deploy. Click
   *Authorize access*, choose your account, *Advanced → Go to
   muuro-newsletter (unsafe)*, then *Allow*. The "unsafe" warning is
   normal for personal Apps Scripts; only your own code runs.
6. Copy the **Web app URL**. It looks like:

   ```
   https://script.google.com/macros/s/AKfycbz…/exec
   ```

### 4. Add the URL to Vercel

1. Vercel dashboard → `muuro` project → **Settings** → **Environment
   Variables**.
2. Add a new variable:
   - Name: `GOOGLE_SHEET_WEBHOOK_URL`
   - Value: paste the Web app URL from step 3
   - Environments: tick **Production**, **Preview**, **Development**.
3. Save. Vercel does not auto-redeploy on env changes. Go to
   **Deployments**, find the latest production deploy, click the
   three-dot menu, then **Redeploy**.

That's it. The form on `muuro.co` will start writing to the sheet on
the next sign-up.

## Verifying it works

1. Open `muuro.co` (production).
2. Scroll to the newsletter section, drop a test address (e.g.
   `you+test@yourdomain.com`), submit.
3. The form should show "You're on the list."
4. Open your sheet. A new row should appear with the timestamp and
   email.

If the form shows "Sign-up opens with the first drop. Follow @muuro.co"
instead, the env var is not yet visible to the deployment. Confirm
you redeployed after adding it.

## Updating the script later

Apps Script Web Apps are versioned. To push a change:

1. Edit the code in the Apps Script editor.
2. Deploy → **Manage deployments** → pencil icon on the live
   deployment → **Version: New version** → **Deploy**.
3. The URL stays the same; you do not need to update Vercel.

## When to move off Sheets

Sheets is fine up to a few thousand contacts and once-a-month sends.
Move to a real ESP when any of these hit:

- You want to send the newsletter as an email, not just collect
  addresses. Resend, Loops, or Klaviyo work; Klaviyo is the standard
  if you also want post-purchase flows.
- You exceed ~10,000 contacts. Sheets stays performant but bulk-export
  becomes the bottleneck.
- You need segmentation, double opt-in, GDPR-compliant unsubscribe
  flows.

Switching is one-line in `app/api/subscribe/route.ts`: remove the
Sheets URL env var and add the `RESEND_API_KEY` + `RESEND_AUDIENCE_ID`
pair. The route already prefers Sheets, then falls back to Resend.

## Privacy note

The Sheet is owned by your Google account and is private to it. The
Web App URL is unguessable but not authenticated, so do not commit it
to git. The Vercel env var is the right place.

The `/privacy` page already describes newsletter processing in plain
language and cites GDPR Art. 6(1)(a), consent. Keep that reference
when switching providers.
