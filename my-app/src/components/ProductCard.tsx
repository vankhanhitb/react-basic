import React from 'react';
import type { productType } from "../data/products";

import { formattedPrice } from "../ulti/formatPrice";
import { FiHeart, FiShoppingCart, FiSearch } from "react-icons/fi";

type PropType = {
  className?: string,
  product: productType,
}

export default function ProductCard ({ className, product }: PropType) {
  return (
    <div className={`flex ${className}`}>
      <div className="product-card__image group relative w-full rounded-2xl overflow-hidden aspect-3/4 transition-shadow duration-300 hover:shadow-md">
        <img 
          src={product.images?.featuredImage} 
          alt="Product Image" 
          className="w-full h-full absolute top-0 left-0 object-cover overflow-hidden transition-transform duration-300 ease-out group-hover:scale-105 "
        />
        <div className="product-card__add-to-cart w-full absolute bottom-10 left-0 flex justify-center items-center">
            <button
              className="max-w-80 w-full flex justify-center items-center gap-2 m-auto bg-white py-3 rounded-3xl uppercase transition-all duration-350 translate-y-5 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-primary hover:text-white cursor-pointer"
            >
              <FiShoppingCart /> Add To Cart
            </button>
        </div>
        <div className="product-card__badge flex flex-col gap-2 absolute top-3 left-3">
          {
            product.badges && product?.badges?.map((item, index) => {
              return(
                <span key={index} 
                  className={`flex justify-center items-center px-3 py-2 text-[13px] text-white ${item.name.toLocaleLowerCase() === "new" ? "bg-green-500" : item.name.toLocaleLowerCase() === "hot" ? "bg-red-500" : item.name.toLocaleLowerCase() === "new arrive" ? "bg-amber-500" : ""} capitalize rounded-2xl font-600`}
                >
                  {item.name}
                </span>
              )
            })
          }
        </div>
        <div className="product-card__icons flex flex-col gap-2 absolute top-3 right-3">
          <button 
            className="
              p-3 border
              transition-all
              duration-300
              translate-x-10
              opacity-0
              rounded-[100%]
              border-gray-400
              hover:bg-primary
              hover:text-white
              hover:border-white
              group-hover:translate-x-0
              group-hover:opacity-100
              cursor-pointer
            "
          >
            <FiHeart />
          </button>
          <button 
            className="
              p-3 border 
              transition-all
              duration-500
              translate-x-10
              opacity-0
              rounded-[100%]
              border-gray-400
              hover:bg-primary
              hover:text-white
              hover:border-white
              group-hover:translate-x-0
              group-hover:opacity-100
              cursor-pointer
            "
          >
            <FiSearch />
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-start gap-2">
        {product.categories &&
          <div className="product-card__tag flex gap-2">
              {
                product.categories?.map((item) => (
                  <span className="px-1 py-.5 text-sm text-gray-500 font-600 border border-gray-200 rounded-[10px]">{item.name}</span>
                ))
              }
          </div>
        }
        <h2 className="product-card__title text-2xl font-600">{product.name}</h2>
        <div className="product-card__price">
          {
            product.price.onSalePrice ? 
            <><span className="text-2 text-red-600 font-600">{ formattedPrice(product.price.onSalePrice) }</span> <span className="text-gray-400 italic line-through">{formattedPrice(product.price.salePrice)}</span></>
            :
            <span className="text-2 font-600">{formattedPrice(product.price.salePrice)}</span>
          }
        </div>
        
      </div>
    </div>
  )
}
