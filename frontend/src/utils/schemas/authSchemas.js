import { z } from 'zod';

// Email validation schema
export const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .email('Please enter a valid email address');

// Password validation schema
export const passwordSchema = z
  .string()
  .min(1, 'Password is required')
  .min(6, 'Password must be at least 6 characters');

// Phone validation schema (optional)
export const phoneSchema = z
  .string()
  .regex(/^\+?[\d\s-()]+$/, 'Please enter a valid phone number')
  .optional()
  .or(z.literal(''));

// OTP validation schema
export const otpSchema = z
  .string()
  .min(1, 'OTP is required')
  .regex(/^\d{6}$/, 'OTP must be 6 digits');

// Login form schema
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

// Signup step 1 schema (Email/Phone)
export const signupStep1Schema = z.object({
  email: emailSchema,
  phone: phoneSchema,
});

// Signup step 2 schema (OTP verification)
export const signupStep2Schema = z.object({
  email: emailSchema,
  otp: otpSchema,
  phone: phoneSchema,
  password: passwordSchema,
});
