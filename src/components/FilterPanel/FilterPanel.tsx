import React from "react";
import {
  Typography,
  Autocomplete,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import styles from "../../styles/FilterPanel.module.scss";

interface Props {
  categories: string[];
  selected: string[];
  onChange: (category: string) => void;
  categoryCounts: Record<string, number>;
  autocompleteSelected: string[];
  setAutocompleteSelected: (values: string[]) => void;
}

const FilterPanel = ({
  categories,
  selected,
  onChange,
  categoryCounts,
  autocompleteSelected,
  setAutocompleteSelected
}: Props) => {
  const handleAutocompleteChange = (
  _event: React.SyntheticEvent,
  values: string[]
) => {
  setAutocompleteSelected(values); // sadece autocomplete içeriğini güncelle

  categories.forEach((category) => {
    const isNowSelected = selected.includes(category);
    const willBeSelected = values.includes(category);

    if (!isNowSelected && willBeSelected) onChange(category); // eklendi
    if (isNowSelected && !willBeSelected) onChange(category); // çıkarıldı
  });
};


  return (
    <div className={styles.wrapper}>
      <Typography variant="h6" gutterBottom>
        Kategoriler
      </Typography>

      <Autocomplete
        multiple
        options={categories}
        disableCloseOnSelect
        value={autocompleteSelected}
        onChange={handleAutocompleteChange}
        getOptionLabel={(option) =>
          `${option} (${categoryCounts[option] || 0})`
        }
        isOptionEqualToValue={(option, value) => option === value}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox style={{ marginRight: 8 }} checked={selected} />
            {option} ({categoryCounts[option] || 0})
          </li>
        )}
        renderInput={(params) => (
          <TextField {...params} label="Kategori Ara" placeholder="Seç..." />
        )}
        size="small"
        className={styles.autocomplete}
      />

      <FormGroup className={styles.group}>
        {categories.map((category) => (
          <FormControlLabel
            key={category}
            control={
              <Checkbox
                checked={selected.includes(category)}
                onChange={() => onChange(category)}
              />
            }
            label={`${category} (${categoryCounts[category] || 0})`}
          />
        ))}
      </FormGroup>
    </div>
  );
};

export default FilterPanel;
