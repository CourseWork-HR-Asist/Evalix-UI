import { useRef, useState, useCallback } from "react";
import { useController, Control, FieldPath, FieldValues } from "react-hook-form";
import { DocumentArrowUpIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface FileInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  name: TName;
  label: string;
  control: Control<TFieldValues>;
  accept?: string;
  placeholder?: string;
  rules?: Record<string, unknown>;
  maxSize?: number; // in bytes
  className?: string;
}

const FileInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  label,
  control,
  accept = "application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  placeholder = "Choose a file or drag and drop here",
  rules = {},
  maxSize = 5 * 1024 * 1024, // 5MB default
  className = "",
}: FileInputProps<TFieldValues, TName>) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
    defaultValue: undefined,
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.size > maxSize) {
        alert(`File size exceeds the maximum limit of ${maxSize / (1024 * 1024)}MB`);
        return;
      }
      onChange(file);
    }
  };

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        const file = files[0];
        
        // Check file type
        const acceptedTypes = accept.split(",");
        const fileType = file.type;
        const isAccepted = acceptedTypes.some(type => 
          fileType === type || 
          (type.includes("*") && fileType.startsWith(type.replace("*", "")))
        );
        
        if (!isAccepted) {
          alert("File type not supported. Please upload a file with the correct format.");
          return;
        }
        
        // Check file size
        if (file.size > maxSize) {
          alert(`File size exceeds the maximum limit of ${maxSize / (1024 * 1024)}MB`);
          return;
        }
        
        onChange(file);
      }
    },
    [accept, maxSize, onChange]
  );

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const clearFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Safe type checking for the file value
  const fileValue = value as File | null | undefined;
  const hasFile = fileValue instanceof File;

  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <div
        className={`relative border-2 ${
          isDragging
            ? "border-blue-400 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-500"
            : error
            ? "border-red-400 bg-red-50 dark:bg-red-900/20 dark:border-red-500"
            : "border-gray-300 bg-white dark:bg-[#2A2A2A] dark:border-[#3A3A3A]"
        } rounded-lg transition-colors cursor-pointer`}
        onClick={handleClick}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />
        
        <div className="flex items-center p-4">
          <DocumentArrowUpIcon className="h-6 w-6 text-gray-400 dark:text-gray-500 mr-3" />
          
          {hasFile ? (
            <div className="flex-1 flex items-center justify-between">
              <div className="truncate text-gray-700 dark:text-gray-300 font-medium">
                {fileValue.name}
                <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                  ({(fileValue.size / 1024).toFixed(1)} KB)
                </span>
              </div>
              <button
                type="button"
                onClick={clearFile}
                className="ml-2 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <div className="flex-1 text-gray-500 dark:text-gray-400">{placeholder}</div>
          )}
        </div>
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error.message}</p>
      )}
    </div>
  );
};

export default FileInput;
