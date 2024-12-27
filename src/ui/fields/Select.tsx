import { forwardRef } from 'react';

interface InputSelectProps {
  id: string;
  label: string;
  name: string;
  defaultValue: number;
  extra?: string;
  options: Array<{ value: number; option: string }>;
}

export const Select = forwardRef<HTMLSelectElement, InputSelectProps>(({ options, defaultValue, name, label, id, extra, ...rest }, ref) => {
  return (
    <div className={`${extra}`}>
      <label htmlFor={id} className={`text-sm text-white/60 dark:text-white ml-1.5 block mb-2 font-medium`}>
        {label}
      </label>
      <select
        name={name}
        defaultValue={defaultValue}
        ref={ref}
        id={id}
        className={`flex w-full items-center justify-center rounded-lg border border-border bg-white/0 p-3 text-white outline-none placeholder:text-white/60 placeholder:font-normal duration-500 transition-colors focus:border-primary`}
        {...rest}>
        {options &&
          options.length > 0 &&
          options.map(({ value, option }) => (
            <option key={value} value={value} className='text-black selected:bg-zinc-400'>
              {option}
            </option>
          ))}
      </select>
    </div>
  );
});

Select.displayName = 'Select';
