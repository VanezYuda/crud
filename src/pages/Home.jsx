import { useEffect, useState } from "react";
import { getProducts } from "../api/productApi";
import ProductList from "../components/product/ProductList";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
    });
  }, []);

  return <ProductList products={products} />;
}
