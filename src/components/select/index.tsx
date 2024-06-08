import './style.css';

import Select, { GroupBase, Props } from 'react-select';

interface SelectProps<
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> extends Props<Option, IsMulti, Group> {
  label?: string;
  error?: string;
  padding?: boolean;
}

const MySelect = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: SelectProps<Option, IsMulti, Group>
) => {
  const { label, error, padding = true, ...rest } = props;
  return (
    <div className="form-control w-full">
      {padding && (
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
      )}
      <Select classNamePrefix="react-select" {...rest} />
      {padding && (
        <label className="label">
          {error && <span className="label-text-alt text-red-600">{error}</span>}
        </label>
      )}
    </div>
  );
};

export default MySelect;
