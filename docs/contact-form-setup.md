# Contact Form Setup Guide

This guide will help you configure the contact form to send emails via Zoho SMTP with Google reCAPTCHA v3 protection.

## Prerequisites

- Zoho Mail account with `contact@oswaldorosalesdev.com`
- Google account for reCAPTCHA v3
- Access to Zoho and Google account settings

---

## Step 1: Setup Google reCAPTCHA v3

reCAPTCHA v3 provides invisible spam protection with score-based verification.

### Instructions:

1. **Go to reCAPTCHA Admin Console**
   - Visit: https://www.google.com/recaptcha/admin
   - Sign in with your Google account

2. **Register a New Site**
   - Click **+** to create a new site
   - Label: `Portfolio Contact Form` (or any name)
   - reCAPTCHA type: **reCAPTCHA v3**
   - Domains:
     - `oswaldorosalesdev.com`
     - `localhost` (for local testing)
   - Accept terms and submit

3. **Copy Your Keys**
   - **Site Key** (public): Copy this - it will be `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
   - **Secret Key** (private): Copy this - it will be `RECAPTCHA_SECRET_KEY`
   - Keep the Secret Key confidential!

**Important Notes:**
- Score threshold is set to 0.5 (0.0 = bot, 1.0 = human)
- v3 is invisible - no user interaction required
- Free tier: 1,000,000 assessments/month

---

## Step 2: Generate Zoho App Password

Since the contact form uses SMTP authentication, you need to create an **App-Specific Password** (not your regular Zoho password).

### Instructions:

1. **Log in to Zoho Mail**
   - Go to https://mail.zoho.com

2. **Access Security Settings**
   - Click your profile icon (top right)
   - Go to **My Account**
   - Navigate to **Security** tab

3. **Enable Two-Factor Authentication (if not enabled)**
   - App passwords require 2FA to be enabled
   - Follow the setup wizard if needed

4. **Generate App Password**
   - Direct link: https://accounts.zoho.com/home#security/application-specific-passwords
   - Click **Generate New Password**
   - Name it: `Portfolio Contact Form`
   - Copy the generated password (you won't see it again!)

---

## Step 3: Configure Environment Variables

### Local Development

1. **Create `.env.local` file** in project root:
   ```bash
   touch .env.local
   ```

2. **Add your credentials:**
   ```env
   # Zoho Email
   ZOHO_EMAIL=contact@oswaldorosalesdev.com
   ZOHO_APP_PASSWORD=your_zoho_app_password_here

   # Google reCAPTCHA v3
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key_here
   RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key_here
   ```

3. **Replace placeholders:**
   - `your_zoho_app_password_here` - from Step 2
   - `your_recaptcha_site_key_here` - from Step 1 (Site Key)
   - `your_recaptcha_secret_key_here` - from Step 1 (Secret Key)

### Production (Vercel/Coolify)

**For Vercel:**
1. Go to your project settings
2. Navigate to **Environment Variables**
3. Add all four variables:
   - `ZOHO_EMAIL` = `contact@oswaldorosalesdev.com`
   - `ZOHO_APP_PASSWORD` = `your_app_password`
   - `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` = `your_site_key`
   - `RECAPTCHA_SECRET_KEY` = `your_secret_key`

**For Coolify:**
1. Open your application settings
2. Go to **Environment Variables**
3. Add all four variables (same as above)
4. Redeploy the application

**Important:** Make sure `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` starts with `NEXT_PUBLIC_` prefix - this makes it available to the client-side code.

---

## Step 4: Test the Contact Form

### Local Testing

1. **Start dev server:**
   ```bash
   pnpm dev
   ```

2. **Navigate to contact section:**
   ```
   http://localhost:3000/#contact
   ```

3. **Fill out the form and submit**
   - You should receive an email at `contact@oswaldorosalesdev.com`

4. **Check for errors:**
   - Open browser console (F12)
   - Check terminal for server logs

### Production Testing

1. Deploy to production with environment variables configured
2. Submit a test message through the live form
3. Check your Zoho inbox

---

## Security Features Implemented

### ✅ Google reCAPTCHA v3
- Invisible protection (no user interaction)
- Score-based verification (0.0-1.0, threshold 0.5)
- Blocks automated bot submissions
- Free tier: 1M assessments/month

### ✅ Rate Limiting
- Max 3 emails per 10 minutes per email address
- Prevents spam and abuse
- Resets on server restart (in-memory)

### ✅ Honeypot Field
- Hidden field that bots fill out
- Legitimate users never see it
- Submissions with filled honeypot are rejected

### ✅ Input Validation
- Email format validation
- Required field checks
- Server-side validation (never trust client)

### ✅ Secure Credentials
- App Password (not main password)
- Environment variables (not in code)
- SSL/TLS encryption (port 465)

**Multi-layered protection:**
1. reCAPTCHA v3 scores the request (bot detection)
2. Honeypot catches simple bots
3. Rate limiting prevents abuse
4. Email validation ensures data quality

---

## Troubleshooting

### "Email service not configured"

**Cause:** Missing Zoho environment variables

**Solution:**
1. Check `.env.local` exists
2. Verify variable names are exact: `ZOHO_EMAIL` and `ZOHO_APP_PASSWORD`
3. Restart dev server after adding variables

---

### reCAPTCHA not loading / "Cannot read properties of undefined (executeRecaptcha)"

**Cause:** Missing reCAPTCHA site key

**Solution:**
1. Verify `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` is set in `.env.local`
2. Ensure it starts with `NEXT_PUBLIC_` prefix
3. Restart dev server (required for NEXT_PUBLIC variables)
4. Check browser console for reCAPTCHA errors

---

### "reCAPTCHA verification failed"

**Cause:** Low score (< 0.5) or invalid secret key

**Solution:**
1. Check server logs for the actual score
2. Verify `RECAPTCHA_SECRET_KEY` matches your Google Console secret
3. For testing, temporarily lower threshold in `src/app/actions/contact.ts`:
   ```typescript
   if (data.success && data.score >= 0.3) { // Lower for testing
   ```
4. Check reCAPTCHA admin console for verification logs

---

### "Authentication failed"

**Cause:** Incorrect App Password or 2FA not enabled

**Solution:**
1. Verify App Password is correct (regenerate if needed)
2. Ensure 2FA is enabled on Zoho account
3. Try generating a new App Password

---

### "Too many requests"

**Cause:** Rate limit exceeded

**Solution:**
- Wait 10 minutes before trying again
- Rate limit resets automatically

---

### Email not arriving

**Possible causes:**
1. **Check spam folder** in Zoho Mail
2. **Verify Zoho email** is `contact@oswaldorosalesdev.com`
3. **Check server logs** for errors
4. **Firewall/port blocking** - Ensure port 465 is open

---

## SMTP Configuration Reference

```typescript
{
  host: 'smtp.zoho.com',
  port: 465,              // SSL port
  secure: true,           // Use SSL
  auth: {
    user: 'contact@oswaldorosalesdev.com',
    pass: 'app_password'  // App Password, not regular password
  }
}
```

**Alternative ports:**
- Port 587 (TLS) - Change `secure: false` and add `requireTLS: true`
- Port 465 (SSL) - Recommended (current setup)

---

## Rate Limit Customization

To adjust rate limits, edit `src/app/actions/contact.ts`:

```typescript
const RATE_LIMIT_MAX = 3;              // Max requests
const RATE_LIMIT_WINDOW = 10 * 60 * 1000;  // Time window (ms)
```

Example: 5 emails per 30 minutes:
```typescript
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 30 * 60 * 1000;
```

---

## Email Template Customization

Edit `src/app/actions/contact.ts` to customize the email format:

```typescript
const mailOptions = {
  subject: `Portfolio Contact: ${formData.name}`,
  html: `
    <!-- Customize HTML template here -->
  `,
};
```

---

## Production Checklist

Before deploying:

- [ ] Google reCAPTCHA v3 site registered
- [ ] reCAPTCHA Site Key and Secret Key copied
- [ ] Zoho App Password generated
- [ ] Two-Factor Authentication enabled on Zoho
- [ ] All 4 environment variables set in production:
  - [ ] `ZOHO_EMAIL`
  - [ ] `ZOHO_APP_PASSWORD`
  - [ ] `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
  - [ ] `RECAPTCHA_SECRET_KEY`
- [ ] Test email sent successfully
- [ ] reCAPTCHA badge appears (bottom-right corner)
- [ ] Check reCAPTCHA score in server logs (should be > 0.5)
- [ ] Rate limiting tested
- [ ] Spam protection verified (honeypot + CAPTCHA)
- [ ] Error messages user-friendly
- [ ] Success message appears after submission

---

## Support

If you encounter issues:

1. **Check Zoho SMTP status**: https://status.zoho.com/
2. **Review Zoho SMTP docs**: https://www.zoho.com/mail/help/zoho-smtp.html
3. **Check application logs** for detailed error messages

---

## Alternative Solutions

If Zoho SMTP doesn't work for you:

1. **Resend** - https://resend.com (3000 emails/month free)
2. **SendGrid** - https://sendgrid.com (100 emails/day free)
3. **FormSpree** - https://formspree.io (no backend needed)
4. **Web3Forms** - https://web3forms.com (free, no backend)

To switch providers, only modify `src/app/actions/contact.ts`.
