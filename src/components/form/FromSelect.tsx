import { Controller, Control, FieldValues, Path } from "react-hook-form";

interface SelectOption {
  label: string;
  value: string | number;
}

interface FromSelectProps<TFieldValues extends FieldValues = FieldValues> {
  name: Path<TFieldValues>;
  label?: string;
  placeholder?: string;
  control: Control<TFieldValues>;
  rules?: Record<string, unknown>;
  defaultValue?: TFieldValues[Path<TFieldValues>];
  options: SelectOption[];
}

function FromSelect<TFieldValues extends FieldValues = FieldValues>({
  name,
  label,
  placeholder = "Select option",
  control,
  rules = {},
  defaultValue,
  options = [],
}: FromSelectProps<TFieldValues>) {
  return (
    <div>
      <div className="relative">
        <label htmlFor={name} className="text-gray-700 dark:text-gray-300">{label}</label>
        <Controller
          name={name}
          control={control}
          rules={rules}
          defaultValue={defaultValue}
          render={({ field, fieldState: { error } }) => (
            <>
              <select
                {...field}
                className={`w-full px-4 py-2 rounded-lg border ${
                  error
                    ? "border-red-500 focus:border-red-500 dark:border-red-400 dark:focus:border-red-400"
                    : "border-gray-300 focus:border-[#01B399] dark:border-[#3A3A3A] dark:focus:border-[#01B399]"
                } focus:outline-none text-gray-800 placeholder-gray-500
                   dark:bg-[#2A2A2A] dark:text-gray-200 dark:placeholder-gray-400 appearance-none`}
                aria-invalid={!!error}
                aria-describedby={error ? `${name}-error` : undefined}
              >
                <option value="" className="dark:bg-[#2A2A2A] dark:text-gray-300">{placeholder}</option>
                {options.map((option) => (
                  <option key={option.value} value={option.value} className="dark:bg-[#2A2A2A] dark:text-gray-300">
                    {option.label}
                  </option>
                ))}
              </select>
              {error && (
                <p
                  id={`${name}-error`}
                  className="text-red-500 dark:text-red-400 text-xs mt-1"
                  role="alert"
                >
                  {error.message || "This field is required"}
                </p>
              )}
            </>
          )}
        />
      </div>
    </div>
  );
}

export default FromSelect;
