import React, { useEffect, useState, useMemo } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Box from "@mui/material/Box";
import ProductCard from "../components/ProductCard/ProductCard";
import FilterPanel from "../components/FilterPanel/FilterPanel";
import CartDrawer from "../components/CartDrawer/CartDrawer";
import { useStore } from "../store/useStore";
import { fetchProducts } from "../services/productService";

const Home: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [categorySearchTerm, setCategorySearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "">("");
  const [searchTerm, setSearchTerm] = useState("");
  const setProducts = useStore((state) => state.setProducts);
  const addToCart = useStore((state) => state.addToCart);
  const products = useStore((state) => state.products);
  const cart = useStore((state) => state.cart);

  useEffect(() => {
    const load = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    load();
  }, [setProducts]);

  // Tüm kategorileri çıkar
  const categories = useMemo(() => {
    const all = products.map((p) => p.category);
    return Array.from(new Set(all));
  }, [products]);

  // Her kategoride kaç ürün var
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const product of products) {
      counts[product.category] = (counts[product.category] || 0) + 1;
    }
    return counts;
  }, [products]);

  // Filtrelenmiş ürünleri belirle
  const filtered = useMemo(() => {
    let result = products;

    // Kategori filtresi
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    // Arama filtresi (en az 2 karakter)
    if (searchTerm.length >= 2) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sıralama
    if (sortOrder === "asc") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, selectedCategories, searchTerm, sortOrder]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <>
      <Box display="flex" justifyContent="flex-end" p={2}>
        <IconButton onClick={() => setDrawerOpen(true)}>
          <Badge badgeContent={cart.length} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Box>

      <Container maxWidth="xl" sx={{ mt: 2, mb: 4 }}>
        <Grid container spacing={3} rowSpacing={4}>
          <Grid item xs={12} md={3}>
            <Box mt={4}>
              <FilterPanel
                categories={categories}
                selected={selectedCategories}
                onChange={toggleCategory}
                categoryCounts={categoryCounts}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={9}>
            <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  size="small"
                  label="Ürün Ara"
                  placeholder="En az 2 karakter"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <InputLabel id="sort-label">Sırala</InputLabel>
                  <Select
                    labelId="sort-label"
                    value={sortOrder}
                    label="Sırala"
                    onChange={(e) =>
                      setSortOrder(e.target.value as "asc" | "desc" | "")
                    }
                  >
                    <MenuItem value="">Sıralama Yok</MenuItem>
                    <MenuItem value="asc">Fiyat: En Düşük</MenuItem>
                    <MenuItem value="desc">Fiyat: En Yüksek</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            {/* Ürün kartları */}
            <Grid container spacing={4}>
              {filtered.map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={4} key={product.id}>
                  <ProductCard
                    product={product}
                    onAddToCart={() => {
                      addToCart(product);
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>

      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
};

export default Home;
