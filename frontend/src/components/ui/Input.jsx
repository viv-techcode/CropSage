/**
 * Reusable Input Component
 */

const Input = ({
  placeholder,
  value,
  onChange,
  type = "text",
  className = "",
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition ${className}`}
    />
  );
};

export default Input;