/* eslint-disable no-unused-vars */

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/auth/authStore";
import {
  signupStep1Schema,
  signupStep2Schema,
} from "../../utils/schemas/authSchemas";
import { useZodForm } from "../../hooks/common/useZodForm";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { motion } from "motion/react";
import { Marquee } from "../../components/ui/marquee";

const icons = [
  { name: "React", logo: "/react.png" },
  { name: "Git", logo: "/git.svg" },
  { name: "Supabase", logo: "/supa.svg" },
  { name: "Vite", logo: "/vite.svg" },
  { name: "React", logo: "/react.png" },
  { name: "Git", logo: "/git.svg" },
  { name: "Supabase", logo: "/supa.svg" },
  { name: "Vite", logo: "/vite.svg" },
];

const ToolCard = ({ tool }) => (
  <div className="mx-3 flex items-center gap-2.5 px-3 py-2 border border-white/10 bg-white transition-colors">
    <div className="w-7 h-7 flex items-center justify-center p-1">
      <img
        src={tool.logo}
        alt={tool.name}
        className="w-full h-full object-contain"
      />
    </div>
    <span className="text-sm font-medium text-gray-700">{tool.name}</span>
  </div>
);

const SignupPage = () => {
  const navigate = useNavigate();

  const sendSignupOTP = useAuthStore((state) => state.sendSignupOTP);
  const verifySignupOTP = useAuthStore((state) => state.verifySignupOTP);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);

  const [step, setStep] = useState(1); // 1: Email/Phone, 2: OTP
  const [otpSent, setOtpSent] = useState(false);
  const [step1Data, setStep1Data] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [isSendingOTP, setIsSendingOTP] = useState(false);

  // Step 1 form (Email/Phone)
  const handleSendOTP = async (formData) => {
    setIsSendingOTP(true);
    try {
      const result = await sendSignupOTP(
        formData.email,
        formData.phone || null,
      );

      if (result.success) {
        // Set step1Data first - save all form data including password
        const newStep1Data = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || "",
          password: formData.password,
        };
        setStep1Data(newStep1Data);
        setOtpSent(true);
        // Then change step - this will trigger useEffect to sync step2Form
        setStep(2);
      }
    } finally {
      setIsSendingOTP(false);
    }
  };
  const step1Form = useZodForm(
    signupStep1Schema,
    { name: "", email: "", phone: "", password: "" },
    handleSendOTP,
  );

  // Step 2 form (OTP)
  const handleVerifyOTP = async (formData) => {
    const result = await verifySignupOTP(
      formData.name,
      formData.email,
      formData.otp,
      formData.phone || null,
      formData.password,
    );

    if (result.success) {
      navigate("/dashboard");
    }
  };

  // Initialize step2Form with default values, will be updated when step changes
  const step2Form = useZodForm(
    signupStep2Schema,
    {
      name: "",
      email: "",
      phone: "",
      otp: "",
      password: "",
    },
    handleVerifyOTP,
  );

  // Sync step 2 form when step changes to 2
  useEffect(() => {
    if (step === 2 && step1Data.email) {
      // Update step2Form with step1Data
      step2Form.setFieldValue("name", step1Data.name);
      step2Form.setFieldValue("email", step1Data.email);
      step2Form.setFieldValue("phone", step1Data.phone || "");
      step2Form.setFieldValue("password", step1Data.password);
      step2Form.setFieldValue("otp", "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, step1Data.email, step1Data.phone]);

  const handleResendOTP = async () => {
    const result = await sendSignupOTP(
      step2Form.formData.email,
      step2Form.formData.phone || null,
    );

    if (result.success) {
      alert("OTP resent successfully!");
    }
  };

  return (
    <div
      className="h-screen w-full flex bg-white font-sans overflow-hidden"
      style={{
        fontFamily: "Host Grotesk, ui-sans-serif, system-ui, sans-serif",
      }}
    >
      {/* LEFT PANEL - Input/Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12 lg:p-20 xl:p-24 overflow-y-auto h-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {/* Logo */}
        {/* <div className="mb-10">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-3xl font-bold text-[#f75d31]">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-56 h-56 inline-block"
              />
            </span>
          </Link>
        </div> */}

        {/* Main Content */}
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-[#0b0b0b] mb-2">
              {step === 1 ? "Get Started Now" : "Verify Code"}
            </h1>
            <p className="text-gray-500">
              {step === 1
                ? "Enter your credentials to access your account"
                : `We sent a code to ${step1Data.email}`}
            </p>
          </div>

          {step === 1 && (
            <>
              <div className="relative mb-8"></div>
            </>
          )}

          {step === 1 ? (
            <form className="space-y-5" onSubmit={step1Form.handleSubmit}>
              <Input
                label="Name"
                type="text"
                name="name"
                value={step1Form.formData.name}
                onChange={step1Form.handleChange}
                error={step1Form.errors.name}
                placeholder="Rafiqur Rahman"
                required
                className="rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white transition-all py-3 px-5 w-full"
              />

              <Input
                label="Email address"
                type="email"
                name="email"
                value={step1Form.formData.email}
                onChange={step1Form.handleChange}
                error={step1Form.errors.email}
                placeholder="rafiqur@company.com"
                required
                className="rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white transition-all py-3 px-5 w-full"
              />

              <Input
                label="Password"
                type="password"
                name="password"
                value={step1Form.formData.password}
                onChange={step1Form.handleChange}
                error={step1Form.errors.password}
                placeholder="Min 6 chars"
                required
                className="rounded-xl border w-full px-5  border-gray-200 bg-gray-50/50 focus:bg-white transition-all py-3"
              />

              <div className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="w-4 h-4 text-[#f75d31] border-gray-300 rounded focus:ring-[#f75d31]"
                />
                <label htmlFor="terms" className="text-sm text-gray-500">
                  I agree to the{" "}
                  <a
                    href="#"
                    className="font-medium underline hover:text-gray-800"
                  >
                    Terms & Privacy
                  </a>
                </label>
              </div>

              <Button
                type="submit"
                className="w-full rounded-xl py-3 bg-[#302630] hover:bg-[#302630]/90 active:bg-[#c63e1a] text-white font-medium shadow-none mb-4"
                disabled={isSendingOTP || step1Form.isSubmitting}
              >
                {isSendingOTP || step1Form.isSubmitting
                  ? "Sending Code..."
                  : "Register Account"}
              </Button>
            </form>
          ) : (
            <form className="space-y-5" onSubmit={step2Form.handleSubmit}>
              {otpSent && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                  OTP sent to {step2Form.formData.email}
                </div>
              )}

              <Input
                label="Verification Code (OTP)"
                type="text"
                name="otp"
                value={step2Form.formData.otp}
                onChange={step2Form.handleChange}
                error={step2Form.errors.otp}
                placeholder="123456"
                maxLength="6"
                required
                className="text-center border w-full text-xl tracking-widest rounded-xl py-3"
              />

              <Button
                type="submit"
                className="w-full rounded-xl py-4 bg-[#f75d31] hover:bg-[#e14b20] text-white font-medium shadow-none mb-4"
                disabled={isLoading || step2Form.isSubmitting}
              >
                {isLoading || step2Form.isSubmitting
                  ? "Verifying..."
                  : "Verify & Create Account"}
              </Button>

              <div className="flex flex-col gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full rounded-xl border-gray-200 text-gray-600 hover:bg-gray-50"
                  onClick={() => {
                    setStep(1);
                    step2Form.setFieldValue("otp", "");
                  }}
                >
                  Change Email
                </Button>
                <button
                  type="button"
                  className="text-sm text-gray-500 hover:text-gray-700 underline"
                  onClick={async () => {
                    const result = await sendSignupOTP(
                      step2Form.formData.email,
                      step2Form.formData.phone || null,
                    );
                    if (result.success) {
                      alert("OTP resent successfully!");
                    }
                  }}
                  disabled={isLoading}
                >
                  Resend Code
                </button>
              </div>
            </form>
          )}

          <div className="mt-8 text-center text-sm text-gray-500">
            Have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-[#f75d31] hover:text-[#e14b20]"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL - Visuals/Content */}
      <div className="hidden lg:flex w-1/2 bg-[#302630] relative overflow-hidden flex-col justify-between p-14 text-white h-full">
        {/* Subtle accent */}
        <div
          className="absolute top-0 right-0 w-96 h-96 bg-[#f75d31] opacity-5 pointer-events-none"
          style={{ filter: "blur(80px)" }}
        />

        {/* Quote + benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 flex-1 flex flex-col justify-center py-16 max-w-md"
        >
          <p className="text-xs font-medium tracking-widest uppercase text-white/30 mb-6">
            Why BuildAFeature
          </p>
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-10 leading-tight">
            Stop LeetCoding.
            <br />
            <span className="text-[#f75d31]">Beat every developer.</span>
          </h2>
          <ul className="space-y-4">
            {[
              "Build real features, not algorithms",
              "Get AI-powered feedback in seconds",
              "Prove your skills to any employer",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 bg-[#f75d31] shrink-0" />
                <span className="text-sm text-white/60 leading-relaxed">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Bottom Logos - Marquee */}
        <div className="relative z-10 w-full overflow-hidden">
          <Marquee pauseOnHover className="[--duration:40s]">
            {icons.slice(0, icons.length / 2).map((tool, index) => (
              <ToolCard key={`${tool.name}-${index}`} tool={tool} />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r from-[#302630] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l from-[#302630] to-transparent" />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
