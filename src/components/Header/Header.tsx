import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Box,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import styles from '../../styles/Header.module.scss';
import { useStore } from '../../store/useStore';

interface Props {
  onCartClick: () => void;
}

const Header = ({ onCartClick }: Props) => {
  const cart = useStore((state) => state.cart);

  return (
    <AppBar position="static" className={styles.appbar} elevation={0}>
      <Toolbar className={styles.toolbar}>
        <Typography variant="h6" className={styles.logo}>
          Ürün Listesi
        </Typography>

        <Box>
          <IconButton onClick={onCartClick}>
            <Badge badgeContent={cart.length} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;