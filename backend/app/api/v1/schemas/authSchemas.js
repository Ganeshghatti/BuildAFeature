const { z } = require("zod");
const { validateBody } = require("../../../utils/validation");

// Send OTP validation schema
const sendSignupOTPSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please provide a valid email address")
    .toLowerCase()
    .trim(),
  phone: z
    .union([
      z
        .string()
        .regex(/^\+?[\d\s-()]+$/, "Please provide a valid phone number"),
      z.literal(""),
      z.null(),
      z.undefined(),
    ])
    .optional()
    .transform((val) =>
      val === "" || val === null || val === undefined ? undefined : val,
    ),
});

// Verify OTP validation schema
const verifySignupOTPSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .trim(),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please provide a valid email address")
    .toLowerCase()
    .trim(),
  otp: z
    .string()
    .min(1, "OTP is required")
    .regex(/^\d{6}$/, "OTP must be 6 digits"),
  phone: z
    .union([
      z
        .string()
        .regex(/^\+?[\d\s-()]+$/, "Please provide a valid phone number"),
      z.literal(""),
      z.null(),
      z.undefined(),
    ])
    .optional()
    .transform((val) =>
      val === "" || val === null || val === undefined ? undefined : val,
    ),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

// Login validation schema
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please provide a valid email address")
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

// Export validation middlewares
const sendSignupOTPValidation = validateBody(sendSignupOTPSchema);
const verifySignupOTPValidation = validateBody(verifySignupOTPSchema);
const loginValidation = validateBody(loginSchema);

module.exports = {
  sendSignupOTPValidation,
  verifySignupOTPValidation,
  loginValidation,
  // Export schemas for potential reuse
  sendSignupOTPSchema,
  verifySignupOTPSchema,
  loginSchema,
};
