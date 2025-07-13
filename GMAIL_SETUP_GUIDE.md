# Gmail Setup Guide for EcoPulse OTP Emails

## Quick Setup (2 minutes)

### Step 1: Enable 2-Factor Authentication
1. Go to your Google Account settings: https://myaccount.google.com/
2. Click "Security" in the left sidebar
3. Under "How you sign in to Google", click "2-Step Verification"
4. Follow the setup process to enable 2FA

### Step 2: Generate App Password
1. After enabling 2FA, go back to Security settings
2. Under "How you sign in to Google", click "App passwords"
3. Select "Mail" and "Other (custom name)"
4. Type "EcoPulse App" as the name
5. Click "Generate"
6. **Copy the 16-character password** (it looks like: `abcd efgh ijkl mnop`)

### Step 3: Update Environment Variables
Edit your `.env` file in the backend folder:

```env
# Replace these with your actual Gmail credentials
EMAIL_USERNAME=your-actual-email@gmail.com
EMAIL_PASSWORD=abcd efgh ijkl mnop
EMAIL_FROM=EcoPulse <noreply@ecopulse.com>
NODE_ENV=development
```

### Step 4: Restart Backend Server
```bash
cd backend
node server.js
```

## Testing
1. Go to http://localhost:3000/login
2. Click "Forgot password?"
3. Enter any email address
4. You should receive a real email with OTP!

## Troubleshooting

### Issue: "Invalid credentials" error
- Make sure you're using an **App Password**, not your regular Gmail password
- Ensure 2-Factor Authentication is enabled

### Issue: "Less secure app access" error
- Use App Passwords instead (recommended)
- Or enable "Less secure app access" in Gmail settings (not recommended)

### Issue: Still not receiving emails
- Check your spam folder
- Verify the email address is correct
- Check server console for error messages

## Alternative: Console Fallback
If you don't want to set up email right now, the app will automatically fall back to showing the OTP in the browser console and on screen for testing purposes.

## Production Setup
For production deployment, consider using:
- **SendGrid** (recommended for production)
- **Amazon SES**
- **Mailgun**
- **SMTP2GO**

These services are more reliable for production email delivery.
