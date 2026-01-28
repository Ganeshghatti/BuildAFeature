import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/auth/authStore";
import { loginSchema } from "../../utils/schemas/authSchemas";
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
  <div className="mx-4 flex items-center gap-3 px-3 py-2 bg-white rounded-2xl   transition-shadow">
    <div className="w-8 h-8 rounded-lg flex items-center justify-center p-1.5 ">
      <img
        src={tool.logo}
        alt={tool.name}
        className="w-full h-full object-contain"
      />
    </div>
    <span className="font-medium text-gray-700">{tool.name}</span>
  </div>
);

const LoginPage = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);

  const handleSubmit = async (formData) => {
    const result = await login(formData.email, formData.password);
    if (result.success) {
      navigate("/dashboard");
    }
  };

  const {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit: handleFormSubmit,
  } = useZodForm(loginSchema, { email: "", password: "" }, handleSubmit);

  return (
    <div
      className="h-screen w-full flex bg-white font-sans overflow-hidden"
      style={{
        fontFamily: "Host Grotesk, ui-sans-serif, system-ui, sans-serif",
      }}
    >
      {/* LEFT PANEL - Input/Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12 lg:p-20 xl:p-24 overflow-y-auto h-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {/* Main Content */}
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-[#0b0b0b] mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-500">
              Enter your credentials to access your account
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleFormSubmit}>
            <Input
              label="Email address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="you@example.com"
              required
              className="rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white transition-all py-3 px-5 w-full"
            />

            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              placeholder="Enter your password"
              required
              className="rounded-xl border w-full px-5 border-gray-200 bg-gray-50/50 focus:bg-white transition-all py-3"
            />

            <Button
              type="submit"
              className="w-full rounded-xl py-3 bg-[#302630] hover:bg-[#302630]/90 active:bg-[#c63e1a] text-white font-medium shadow-none mb-4"
              disabled={isLoading || isSubmitting}
            >
              {isLoading || isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-[#f75d31] hover:text-[#e14b20]"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL - Visuals/Content */}
      <div className="hidden lg:flex w-1/2 bg-[#302630] relative overflow-hidden flex-col items-center justify-center p-12 text-center text-white h-full">
        {/* Background Gradients/Decor */}
        <div className="absolute top-0 right-0 w-125 h-125 bg-white opacity-10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-100 h-100 bg-white opacity-10 blur-[100px] rounded-full pointer-events-none translate-y-1/2 -translate-x-1/2"></div>

        <div className="relative z-10 w-full flex flex-col items-center justify-center h-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center flex-1 max-w-lg"
          >
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6 leading-tight">
              Stop LeetCoding. <br />
              Beat every developer.
            </h2>
            <p className="text-white/80 text-lg font-light">
              Enter your credentials to access your account
            </p>
          </motion.div>

          {/* Bottom Logos - Marquee */}
          <div className="mb-20 w-200 relative">
            <Marquee pauseOnHover className="[--duration:40s]">
              {icons.slice(0, icons.length / 2).map((tool, index) => (
                <ToolCard key={`${tool.name}-${index}`} tool={tool} />
              ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:40s] mt-4">
              {icons.slice(icons.length / 2).map((tool, index) => (
                <ToolCard key={`${tool.name}-${index}`} tool={tool} />
              ))}
            </Marquee>

            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-linear-to-r from-[#302630] to-transparent"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-linear-to-l from-[#302630] to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
