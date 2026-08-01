import React from 'react';
import { productDatas } from "../../data/products";

export default function ProductList() {
  return (
    <div>
      {
        productDatas.map((product) => (
          <div key={product.productId}>
            {/* <img src={product.images?.featuredImage} alt="" /> */}
          </div>
        ))
      }
    </div>
  )
}
