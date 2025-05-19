import {
  Drawer,
  IconButton,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { useStore } from '../../store/useStore';
import styles from '../../styles/CartDrawer.module.scss';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const CartDrawer = ({ open, onClose }: CartDrawerProps) => {
  const cart = useStore((state) => state.cart);
  const updateQuantity = useStore((state) => state.updateQuantity);
  const removeFromCart = useStore((state) => state.removeFromCart);

  const totalPrice = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box className={styles.drawer}>
        <div className={styles.header}>
          <Typography variant="h5" fontWeight="bold">
            Sepet
          </Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </div>

        <List>
          {cart.map((item) => (
            <ListItem key={item.product.id} className={styles.item}>
              <ListItemText
                primary={item.product.title}
                secondary={`Adet: ${item.quantity} - Fiyat: $${item.product.price}`}
              />
              <div className={styles.actions}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() =>
                    updateQuantity(item.product.id, item.quantity + 1)
                  }
                >
                  +
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  disabled={item.quantity <= 1}
                  onClick={() =>
                    updateQuantity(item.product.id, item.quantity - 1)
                  }
                >
                  -
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => removeFromCart(item.product.id)}
                >
                  Sil
                </Button>
              </div>
            </ListItem>
          ))}
        </List>

        <Typography className={styles.total}>
          Toplam: ${totalPrice.toFixed(2)}
        </Typography>
      </Box>
    </Drawer>
  );
};

export default CartDrawer;