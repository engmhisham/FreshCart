import React, { useState } from "react";
import ProductsSlider from "../ProductsSlider/ProductsSlider";
import ProductDetails from "../ProductDetails/ProductDetails";
import { useParams } from "react-router-dom";

export default function ProductDetailsPage() {
  let { id } = useParams();
  const [categoryId, setCategoryId] = useState(null);
  return (
    <>
      <ProductDetails setCategoryId={setCategoryId} productId={id} />
      <ProductsSlider
        categoryId={categoryId}
        title={"Other products you may like"}
      />
    </>
  );
}
