/**
 * Toast Component
 * @param {string} message
 */

const Toast = ({ message }) => {
  return (
    <div
      style={{
        marginTop: "20px",
        padding: "10px",
        borderRadius: "8px",
      }}
    >
      ✓ {message}
    </div>
  );
};

export default Toast;