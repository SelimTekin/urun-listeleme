import React from 'react';
import {
  Typography,
  Box,
  Autocomplete,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from '@mui/material';

interface Props {
  categories: string[];
  selected: string[];
  onChange: (category: string) => void;
  categoryCounts: Record<string, number>;
}

const FilterPanel: React.FC<Props> = ({
  categories,
  selected,
  onChange,
  categoryCounts,
}) => {
  const handleAutocompleteChange = (
    _event: React.SyntheticEvent,
    values: string[]
  ) => {
    // Karşılaştırmalı toggle mantığı
    categories.forEach((category) => {
      const isNowSelected = selected.includes(category);
      const willBeSelected = values.includes(category);

      if (!isNowSelected && willBeSelected) onChange(category); // seçildi
      if (isNowSelected && !willBeSelected) onChange(category); // kaldırıldı
    });
  };

  return (
    <Box
  sx={{
    p: 2,
    borderRight: '1px solid #eee',
    minHeight: '100%',
    backgroundColor: '#fafafa',
    borderRadius: 2,
  }}
>

      <Typography variant="h6" gutterBottom>
        Kategoriler
      </Typography>

      <Autocomplete
        multiple
        options={categories}
        disableCloseOnSelect
        value={selected}
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
        sx={{ mb: 2 }}
      />

      <FormGroup>
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
    </Box>
  );
};

export default FilterPanel;