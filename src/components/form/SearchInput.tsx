
import { Search } from 'iconoir-react';
import React, { ChangeEvent } from 'react';

interface SearchInputProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ search, onSearchChange }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
      <div className="w-full md:w-72">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={handleChange}
            className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:border-[#01B399] focus:outline-none dark:border-[#3A3A3A] dark:focus:border-[#01B399] dark:bg-[#2A2A2A] dark:text-gray-200 dark:placeholder-gray-500"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-[#01B399]/80" />
          </div>
        </div>
      </div>
    </div>
  );
};