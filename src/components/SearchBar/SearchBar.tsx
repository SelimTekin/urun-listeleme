import React from "react";
import TextField from "@mui/material/TextField";

interface Props {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const SearchBar: React.FC<Props> = ({ searchTerm, onSearchChange }) => {
  return (
    <TextField
      label="Ürün Ara"
      variant="outlined"
      fullWidth
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  );
};

export default SearchBar;
