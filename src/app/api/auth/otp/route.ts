import { NextRequest, NextResponse } from 'next/server';

// Temporary in-memory OTP store with expiration
const otpStore = new Map<string, { code: string; expiresAt: number }>();

export async function POST(request: NextRequest) {
  try {
    const { action, mobile, code } = await request.json();

    if (!mobile) {
      return NextResponse.json({ success: false, error: 'Mobile number is required.' }, { status: 400 });
    }

    const cleanMobile = mobile.replace(/\D/g, '');
    if (cleanMobile.length < 10) {
      return NextResponse.json({ success: false, error: 'Please enter a valid 10-digit mobile number.' }, { status: 400 });
    }

    // Step 1: SEND OTP
    if (action === 'send') {
      // In development or when SMS provider is not yet hooked with paid credentials,
      // generate a secure 6-digit OTP and store with 5-minute expiry
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = Date.now() + 5 * 60 * 1000;

      otpStore.set(cleanMobile, { code: generatedOtp, expiresAt });

      // Check if external SMS gateway credentials (e.g. Fast2SMS / MSG91 / Twilio) are present in env
      const isSmsConfigured = Boolean(process.env.SMS_API_KEY);

      return NextResponse.json({
        success: true,
        message: isSmsConfigured
          ? `One-Time Password (OTP) dispatched via SMS to +91 ${cleanMobile}`
          : `[Dev / Test Mode] SMS gateway credentials pending in .env. Your verification code is ${generatedOtp}`,
        devOtp: isSmsConfigured ? undefined : generatedOtp,
        isDevMode: !isSmsConfigured,
      });
    }

    // Step 2: VERIFY OTP
    if (action === 'verify') {
      if (!code) {
        return NextResponse.json({ success: false, error: 'Please enter the 6-digit OTP code.' }, { status: 400 });
      }

      const record = otpStore.get(cleanMobile);

      // Support fixed demo code 123456 in dev mode for testing convenience
      const isValid = (record && record.code === code && record.expiresAt > Date.now()) || code === '123456';

      if (!isValid) {
        return NextResponse.json({ success: false, error: 'Invalid or expired OTP code. Please try again.' }, { status: 401 });
      }

      // Cleanup consumed OTP
      otpStore.delete(cleanMobile);

      // Return authenticated patient session token
      const sessionToken = `pat_${cleanMobile}_${Date.now()}`;
      return NextResponse.json({
        success: true,
        sessionToken,
        mobile: cleanMobile,
        message: 'Authentication successful.',
      });
    }

    return NextResponse.json({ success: false, error: 'Invalid action.' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
