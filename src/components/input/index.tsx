import clsx from 'clsx';

const colorClasses = {
  primary: 'input-primary',
  secondary: 'input-secondary',
  accent: 'input-accent',
  info: 'input-info',
  success: 'input-success',
  warning: 'input-warning',
  error: 'input-error',
};
const sizeClasses = {
  xs: 'input-xs',
  sm: 'input-sm',
  md: 'input-md',
  lg: 'input-lg',
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name?: string;
  error?: string;
  ghost?: boolean;
  color?: 'primary' | 'error' | 'warning' | 'success' | 'info' | 'accent' | 'secondary';
  inputSize?: 'xs' | 'sm' | 'md' | 'lg';
}

const Input: React.FC<InputProps> = (props) => {
  const { label, name, error, ghost, color, inputSize = 'md', ...rest } = props;

  const classInput = clsx(
    'input input-bordered w-full',
    ghost && 'input-ghost',
    color && colorClasses[color],
    sizeClasses[inputSize]
  );

  return (
    <div className="form-control w-full">
      <label htmlFor={name} className="label">
        <span className="label-text">{label}</span>
      </label>
      <input className={classInput} id={name} name={name} {...rest} />
      <label className="label">
        {error && <span className="label-text-alt text-red-600">{error}</span>}
      </label>
    </div>
  );
};

export default Input;
