
# Angket – Smarter Check, Safer Choice

## 1. Project Title
Angket – Digital Safety Platform

## 2. Description
Angket is a digital safety platform designed to help users identify suspicious messages, links, URLs, and files. It consists of a Telegram bot and a web application. Users can submit suspicious content to the Telegram bot for analysis and receive a risk score, reasons for the assessment, and recommended actions.

For proactive protection, Angket provides a Live Scan feature that automatically scans messages received in connected Telegram groups or personal chats. Users receive alerts containing the sender, date, time, message type, risk score, reasons, and recommended actions.

The web application also allows users to report scam experiences by submitting details and supporting images. These reports help build a shared source of scam information, raise awareness, and help others recognize similar scams.

**Angket, smarter check, safer choice.**

## Email OTP authentication setup

Sign-up uses Supabase Auth and verifies the email with a six-digit OTP entered
on Angket's `/verify-email` page. In the Supabase Dashboard:

1. Enable **Authentication → Sign In / Providers → Email → Confirm email**.
2. Under **Authentication → Email Templates → Confirm signup**, show the code
   with `{{ .Token }}` (not `{{ .ConfirmationURL }}`), for example:

   ```html
   <h2>Confirm your Angket account</h2>
   <p>Your verification code is: <strong>{{ .Token }}</strong></p>
   ```

3. Configure SMTP for production email delivery. Supabase's default email OTP
   expires after one hour and has a 60-second resend interval; configure these
   under the Email provider settings as needed. The app follows the resend
   interval and displays validation/errors for rejected or expired codes.
4. Keep `SUPABASE_URL`, `SUPABASE_ANON_KEY` (or
   `SUPABASE_PUBLISHABLE_KEY`), and `SUPABASE_SECRET_KEY` in the backend
   environment only. Do not put the service-role/secret key in frontend config.

The confirmation email contains only an OTP, not a sign-up URL. Users enter it
in the app, where the backend calls Supabase `verifyOtp` with their email,
the code, and `type: "signup"`. Passwords and OTPs are not stored by Angket.
Password recovery continues to use the existing recovery flow.

To verify the full email flow, run the backend and frontend, sign up with an
email address you can access, retrieve the code from that inbox, and enter it
on `/verify-email`. Then confirm the user can sign in and open `/profile`, while
an unverified session is rejected by protected APIs.

## 3. Features
- **Scam Detection:** Analyze suspicious messages, links, URLs, and files.
- **Risk Assessment:** Provide risk scores, reasons, and recommended actions.
- **Telegram Bot:** Allow users to submit suspicious content directly through Telegram.
- **Live Scan:** Automatically scan new messages in connected Telegram groups or personal chats.
- **Real-Time Alerts:** Notify users about potential threats with relevant message and risk information.
- **Scam Reporting:** Allow users to submit scam experiences with supporting images.
- **Community Awareness:** Help users recognize scam patterns through shared reports and information.
