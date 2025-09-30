import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Button = ({ text, children, icon, type = "button", className = "", onClick,  }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 font-semibold ${className}`}
    >
      {icon && (
        <FontAwesomeIcon icon={icon} className="text-2xl" />
      )}
      {children}

      {text}
    </button>
  );
};

export default Button;
