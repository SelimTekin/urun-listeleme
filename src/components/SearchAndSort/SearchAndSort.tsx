import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import styles from '../../styles/SearchAndSort.module.scss';

interface Props {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  sortOrder: 'asc' | 'desc' | '';
  setSortOrder: (value: 'asc' | 'desc' | '') => void;
}

const FilterControls = ({ searchTerm, setSearchTerm, sortOrder, setSortOrder }: Props) => {
  return (
    <div className={styles.controls}>
      <TextField
        className={styles.controlItem}
        size="small"
        label="Ürün Ara"
        placeholder="En az 2 karakter"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <FormControl className={styles.controlItem} size="small">
        <InputLabel id="sort-label">Sırala</InputLabel>
        <Select
          labelId="sort-label"
          value={sortOrder}
          label="Sırala"
          onChange={(e) =>
            setSortOrder(e.target.value as 'asc' | 'desc' | '')
          }
        >
          <MenuItem value="">Sıralama Yok</MenuItem>
          <MenuItem value="asc">Fiyat: En Düşük</MenuItem>
          <MenuItem value="desc">Fiyat: En Yüksek</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default FilterControls;