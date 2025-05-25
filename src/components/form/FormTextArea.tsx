import { Controller, Control, FieldValues, Path } from "react-hook-form";

interface FormTextAreaProps<TFieldValues extends FieldValues = FieldValues> {
  name: Path<TFieldValues>;
  label?: string;
  placeholder?: string;
  rows?: number;
  control: Control<TFieldValues>;
  rules?: Record<string, unknown>;
  defaultValue?: TFieldValues[Path<TFieldValues>];
}

function FormTextArea<TFieldValues extends FieldValues = FieldValues>({
  name,
  label,
  placeholder = "",
  rows = 4,
  control,
  rules = {},
  defaultValue,
}: FormTextAreaProps<TFieldValues>) {
  return (
    <div>
      <div className="relative">
        <label htmlFor={name}>{label}</label>
        <Controller
          name={name}
          control={control}
          rules={rules}
          defaultValue={defaultValue}
          render={({ field, fieldState: { error } }) => (
            <>
              <textarea
                {...field}
                rows={rows}
                placeholder={placeholder}
                className={`w-full px-4 py-2 rounded-lg border ${
                  error
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-[#01B399]"
                } focus:outline-none text-black placeholder-gray-500
                   dark:border-[#3A3A3A] dark:focus:border-[#01B399] dark:bg-[#2A2A2A] dark:text-gray-200 dark:placeholder-gray-500`}
                aria-invalid={!!error}
                aria-describedby={error ? `${name}-error` : undefined}
              />
              {error && (
                <p
                  id={`${name}-error`}
                  className="text-red-500 text-xs mt-1"
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

export default FormTextArea;
