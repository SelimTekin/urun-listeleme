import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
  Box,
} from "@mui/material";
import { Product } from "../../models/Product";
import styles from "../../styles/ProductCard.module.scss";

interface Props {
  product: Product;
  onAddToCart: () => void;
}

const ProductCard = ({ product, onAddToCart }: Props) => {
  return (
    <Card className={styles.card}>
      <Box className={styles.imageWrapper}>
  <img src={product.image} alt={product.title} className={styles.image} />
</Box>


      <CardContent>
        <Typography variant="h6" gutterBottom>
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description.substring(0, 100)}...
        </Typography>
        <Typography variant="subtitle1" color="primary" sx={{ mt: 1 }}>
          ${product.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          onClick={onAddToCart}
          fullWidth
          className={styles.button}
        >
          Sepete Ekle
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
