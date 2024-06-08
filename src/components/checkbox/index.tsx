import clsx from 'clsx';

const colorClasses = {
  primary: 'checkbox-primary',
  secondary: 'checkbox-secondary',
  accent: 'checkbox-accent',
  success: 'checkbox-success',
  warning: 'checkbox-warning',
  info: 'checkbox-info',
  error: 'checkbox-error',
};
const sizeClasses = {
  xs: 'checkbox-xs mt-[2px]',
  sm: 'checkbox-sm',
  md: 'checkbox-md -mt-[2px]',
  lg: 'checkbox-lg -mt-[7px]',
};

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  color?: 'primary' | 'error' | 'warning' | 'success' | 'info' | 'accent' | 'secondary';
  inputSize?: 'xs' | 'sm' | 'md' | 'lg';
}

const Checkbox: React.FC<CheckboxProps> = (props) => {
  const { label, color, inputSize = 'sm', ...rest } = props;

  const classCheckbox = clsx(
    'checkbox mr-2',
    color && colorClasses[color],
    sizeClasses[inputSize]
  );

  return (
    <div className="form-control">
      <label className="label cursor-pointer items-start justify-start">
        <input type="checkbox" className={classCheckbox} {...rest} />
        <span className="label-text">{label}</span>
      </label>
    </div>
  );
};

export default Checkbox;
