// OCP - Interface defines contract, open for extension
interface ButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
}

// OCP - Base Button component, closed for modification
function Button({ label, onClick, className = "custom-button" }: ButtonProps) {
  return (
    <button onClick={onClick} className={className}>
      {label}
    </button>
  );
}

// LSP - IconButton extends ButtonProps, can substitute Button
interface IconButtonProps extends ButtonProps {
  icon: string;
}

// LSP - IconButton honors Button contract while extending functionality
function IconButton({ onClick, icon, label, className = "custom-button" }: IconButtonProps) {
  return (
    <button onClick={onClick} className={className}>
      <img src={icon} alt="" />
      {label}
    </button>
  );
}

export { Button, IconButton };
export type { ButtonProps, IconButtonProps };