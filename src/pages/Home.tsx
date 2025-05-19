import { useEffect, useState, useMemo } from "react";
import Header from "../components/Header/Header";
import { Container, Grid } from "@mui/material";
import ProductCard from "../components/ProductCard/ProductCard";
import CartDrawer from "../components/CartDrawer/CartDrawer";
import FilterPanel from "../components/FilterPanel/FilterPanel";
import SearchAndSort from "../components/SearchAndSort/SearchAndSort";
import { useStore } from "../store/useStore";
import { fetchProducts } from "../services/productService";
import styles from "../styles/Home.module.scss";

const Home = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "">("");
  const [autocompleteSelected, setAutocompleteSelected] = useState<string[]>(
    []
  );

  const setProducts = useStore((state) => state.setProducts);
  const addToCart = useStore((state) => state.addToCart);
  const products = useStore((state) => state.products);

  useEffect(() => {
    const load = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    load();
  }, [setProducts]);

  const categories = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.category)));
  }, [products]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of products) {
      counts[p.category] = (counts[p.category] || 0) + 1;
    }
    return counts;
  }, [products]);

  const filtered = useMemo(() => {
    let result = products;

    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    if (searchTerm.length >= 2) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

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
      <Header onCartClick={() => setDrawerOpen(true)} />
      <Container maxWidth="xl" sx={{ mt: 2, mb: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <FilterPanel
              categories={categories}
              selected={selectedCategories}
              onChange={toggleCategory}
              categoryCounts={categoryCounts}
              autocompleteSelected={autocompleteSelected}
              setAutocompleteSelected={setAutocompleteSelected}
            />
          </Grid>

          <Grid item xs={12} md={9}>
            <SearchAndSort
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />

            <div className={styles.productsWrapper}>
              {filtered.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={() => addToCart(product)}
                />
              ))}
            </div>
          </Grid>
        </Grid>
      </Container>

      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
};

export default Home;
