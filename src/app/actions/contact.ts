'use server';

import nodemailer from 'nodemailer';

// Simple in-memory rate limiting (resets on server restart)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Rate limit: max 3 emails per 10 minutes per IP
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutes in ms

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  if (!record || now > record.resetTime) {
    // First request or window expired
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false; // Rate limit exceeded
  }

  // Increment count
  record.count++;
  return true;
}

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  honeypot?: string; // Anti-spam honeypot field
  recaptchaToken?: string; // reCAPTCHA v3 token
}

async function verifyRecaptcha(token: string): Promise<boolean> {
  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    if (!secretKey) {
      console.warn('reCAPTCHA secret key not configured');
      return true; // Allow submission if not configured
    }

    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json();

    // Score is 0.0 (bot) to 1.0 (human). Threshold of 0.5 is recommended
    if (data.success && data.score >= 0.5) {
      return true;
    }

    console.warn('reCAPTCHA verification failed:', {
      success: data.success,
      score: data.score,
      action: data.action,
    });
    return false;
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return false;
  }
}

export async function sendContactEmail(formData: ContactFormData) {
  try {
    // Honeypot check - if filled, it's a bot
    if (formData.honeypot) {
      return { success: false, error: 'Spam detected' };
    }

    // reCAPTCHA verification
    if (formData.recaptchaToken) {
      const isHuman = await verifyRecaptcha(formData.recaptchaToken);
      if (!isHuman) {
        return { success: false, error: 'reCAPTCHA verification failed' };
      }
    }

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      return { success: false, error: 'All fields are required' };
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return { success: false, error: 'Invalid email format' };
    }

    // Rate limiting (using email as identifier)
    if (!checkRateLimit(formData.email)) {
      return {
        success: false,
        error: 'Too many requests. Please try again later.',
      };
    }

    // Check required environment variables
    if (!process.env.ZOHO_EMAIL || !process.env.ZOHO_APP_PASSWORD) {
      console.error('Missing Zoho credentials in environment variables');
      return {
        success: false,
        error: 'Email service not configured. Please contact directly.',
      };
    }

    // Create transporter with Zoho SMTP
    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 465,
      secure: true, // Use SSL
      auth: {
        user: process.env.ZOHO_EMAIL,
        pass: process.env.ZOHO_APP_PASSWORD,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.ZOHO_EMAIL,
      to: process.env.ZOHO_EMAIL, // Send to yourself
      replyTo: formData.email, // Allow replying to sender
      subject: `Portfolio Contact: ${formData.name}`,
      text: `
Name: ${formData.name}
Email: ${formData.email}

Message:
${formData.message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <h3>Message:</h3>
        <p>${formData.message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      error: 'Failed to send message. Please try again or contact directly.',
    };
  }
}
