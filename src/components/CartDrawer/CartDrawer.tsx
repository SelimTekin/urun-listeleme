import React from "react";
import {
  Drawer,
  IconButton,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useStore } from "../../store/useStore";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ open, onClose }) => {
  const cart = useStore((state) => state.cart);
  const updateQuantity = useStore((state) => state.updateQuantity);
  const removeFromCart = useStore((state) => state.removeFromCart);

  const totalPrice = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 400, p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" fontWeight="bold">
            Sepet
          </Typography>

          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>

        <List>
          {cart.map((item) => (
            <ListItem
              key={item.product.id}
              sx={{ mb: 2, pb: 2, borderBottom: "1px solid #eee" }}
            >
              <ListItemText
                primary={item.product.title}
                secondary={`Adet: ${item.quantity} - Fiyat: $${item.product.price}`}
              />
              <Box display="flex" gap={1} mt={1}>
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
              </Box>
            </ListItem>
          ))}
        </List>

        <Typography variant="h6" textAlign="right" mt={3}>
          Toplam: ${totalPrice.toFixed(2)}
        </Typography>
      </Box>
    </Drawer>
  );
};

export default CartDrawer;
