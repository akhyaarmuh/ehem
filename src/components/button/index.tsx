import clsx from 'clsx';

const colorClasses = {
  neutral: 'btn-neutral',
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  accent: 'btn-accent',
  ghost: 'btn-ghost',
  link: 'btn-link',

  info: 'btn-info',
  success: 'btn-success',
  warning: 'btn-warning',
  error: 'btn-error',
};
const sizeClasses = {
  lg: 'btn-lg',
  sm: 'btn-sm',
  xs: 'btn-xs',
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?:
    | 'neutral'
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'ghost'
    | 'link'
    | 'info'
    | 'success'
    | 'warning'
    | 'error';
  outline?: boolean;
  size?: 'lg' | 'sm' | 'xs';
  wide?: boolean;
  glass?: boolean;
  square?: boolean;
  circle?: boolean;
  block?: boolean;
  loading?: boolean;
  reverse?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = (props) => {
  const {
    color,
    outline,
    size,
    wide,
    glass,
    square,
    circle,
    block,
    loading,
    reverse,
    children,
    className,
    ...rest
  } = props;

  const classButton = clsx(
    'btn',
    color && colorClasses[color],
    outline && 'btn-outline',
    size && sizeClasses[size],
    wide && 'btn-wide',
    glass && 'glass',
    square && 'btn-square',
    circle && 'btn-circle',
    block && 'btn-block',
    reverse && 'flex-row-reverse'
  );

  return (
    <button className={classButton + ' ' + className} {...rest}>
      {children}
      {loading && <span className="loading loading-spinner"></span>}
    </button>
  );
};

export default Button;
