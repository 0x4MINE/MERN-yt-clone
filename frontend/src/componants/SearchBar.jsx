import { ReceiptEuro, Search } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const SearchBar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!search) return;
    navigate(`/search?query=${search}`);
  };
  return (
    <div className="search-bar">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
        type="text"
        className="search-input"
      />
      <Search className="search-btn" onClick={handleSearch} />
    </div>
  );
};

export default SearchBar;
