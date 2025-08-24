import { Search } from "lucide-react";
import React from "react";

const Input = ({
  searchTerm,
  setSearchTerm,
  handleSearch,
  placeholder,
}: {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleSearch: () => void;
  placeholder: string;
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    // <div className="relative flex items-center">
    //   <input
    //     type="text"
    //     value={searchTerm}
    //     onChange={(e) => setSearchTerm(e.target.value)}
    //     placeholder={placeholder}
    //     className="focus:outline-none focus:border-main-green text-base w-full z-10 pl-4 py-2 border rounded-2xl bg-gradient-to-r from-[#F0FEEF] to-[#EBEEFF]"
    //   />
    //   <Search
    //     className="absolute z-10 text-base cursor-pointer right-3"
    //     color="#a6a6a6"
    //     size={18}
    //     onClick={handleSearch}
    //   />
    // </div>
    <>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="focus:outline-none focus:border-main-green text-base w-full z-10 pl-4 py-2 border rounded-2xl bg-gradient-to-r from-[#F0FEEF] to-[#EBEEFF]"
      />
      <Search
        className="absolute z-10 text-base cursor-pointer right-3"
        color="#a6a6a6"
        size={18}
        onClick={handleSearch}
      />
    </>
  );
};

export default Input;
