const Button = ({
  children,
  variant = "primary",
  type = "button",
  onClick,
  disabled,
  className = "",
  ...props
}) => {
  const baseStyles =
    "px-6 py-3 rounded-full cursor-pointer font-normal transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-[#0b0b0b] text-white hover:bg-[#121212] active:bg-[#c63e1a]",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400",
    outline:
      "border-2 border-[#f75d31] text-[#f75d31] hover:bg-[#fff7f5] active:bg-[#fff0ec]",
    danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
