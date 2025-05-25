import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { useGetByPathQuery } from "../../hooks/useReduxHooks";

interface Option {
  id: number | string;
  name: string;
}

interface FormApiSelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TOption extends Option = Option,
> {
  name: Path<TFieldValues>;
  label?: string;
  placeholder?: string;
  control: Control<TFieldValues>;
  rules?: Record<string, unknown>;
  defaultValue?: TFieldValues[Path<TFieldValues>];
  path: string;
  mapOption?: (option: TOption) => { label: string; value: string | number };
}

function FormApiSelect<
  TFieldValues extends FieldValues = FieldValues,
  TOption extends Option = Option,
>({
  name,
  label,
  placeholder = "Select option",
  control,
  rules = {},
  defaultValue,
  path,
  mapOption = (option) => ({
    label: option.name,
    value: option.id,
  }),
}: FormApiSelectProps<TFieldValues, TOption>) {
  const result = useGetByPathQuery(path);
  const { isLoading, isError } = result;
  const data = (result.data as TOption[]) || [];

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
              <select
                {...field}
                className={`w-full px-4 py-2 rounded-lg border ${
                  error
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-[#01B399]"
                } focus:outline-none text-black placeholder-gray-500
                   dark:border-[#3A3A3A] dark:focus:border-[#01B399] dark:bg-[#2A2A2A] dark:text-gray-200 dark:placeholder-gray-500`}
                aria-invalid={!!error}
                aria-describedby={error ? `${name}-error` : undefined}
                disabled={isLoading || isError}
              >
                <option value="">{placeholder}</option>
                {data.map((option) => {
                  const { label, value } = mapOption(option);
                  return (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  );
                })}
              </select>
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

export default FormApiSelect;
