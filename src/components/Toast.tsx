interface ToastProps {
  message: string;
  visible: boolean;
}

const Toast = ({ message, visible }: ToastProps) => {
  // Don't render the toast when it is not visible.
  if (!visible) {
    return null;
  }

  return (
    <div
      role="alert"
      className="fixed bottom-6 right-6 rounded-lg bg-green-600 px-5 py-3 font-semibold text-white shadow-lg"
    >
      ✓ {message}
    </div>
  );
};

export default Toast;
