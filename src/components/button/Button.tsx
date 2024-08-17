interface Props {
  children: React.ReactNode;
  type?: 'submit' | 'button' | 'reset';
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  variant?: 'primary' | 'danger' | 'secondary';
}
export default function Button(props: Props) {
  const { type = 'button', children, onClick, className = '', variant = 'primary' } = props;
  const variantColors = {
    primary:
      'bg-indigo-600 hover:bg-indigo-600-light hover:bg-indigo-500 focus-visible:outline-indigo-600',
    danger: 'bg-red-600 hover:bg-red-600-light hover:bg-red-500 focus-visible:outline-red-600',
    secondary:
      'bg-gray-600 hover:bg-gray-600-light hover:bg-gray-500 focus-visible:outline-gray-600',
  };
  const color = variantColors[variant];

  return (
    <button
      className={`${color} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${className}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
