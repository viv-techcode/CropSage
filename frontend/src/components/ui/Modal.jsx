/**
 * Modal Component
 * @param {boolean} isOpen
 * @param {function} onClose
 * @param {ReactNode} children
 */

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        {children}

        <button onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;