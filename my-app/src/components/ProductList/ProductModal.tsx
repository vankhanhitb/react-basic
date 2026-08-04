import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { addToCartWithQuantity } from "../../features/cart/cartSlice";
import { showModal } from "../../features/cart/modalSlide";

import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from "swiper";
import { Thumbs } from 'swiper/modules';

import { FiXCircle, FiPlusCircle, FiMinusCircle, FiShoppingCart } from "react-icons/fi";
import { formattedPrice } from "../../ulti/formatPrice";


import { type productType } from "../../data/products";

type PropsType = {
  product: productType;
  onClose: () => void
}

export default function ProductModal({ product, onClose }: PropsType) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const dispatch = useDispatch();

  const handleClick = (type: string) => {
    switch (type){
      case "increase":
        setQuantity(quantity + 1);
      break;
      case "minus":
        if (quantity > 1) {
          setQuantity(quantity - 1) 
        }else {
          setQuantity(1);
        }
      break;
    }
  }

  const handleChange = (value: number) => {
    if(value === 0 || isNaN(value)){
      setQuantity(1);
    }else{
      setQuantity(value);
    }
  }

  const addToCart = (product: productType, quantity: number) => {
    const dataProduct= {
      ...product,
      quantity: quantity
    }
    dispatch(addToCartWithQuantity(dataProduct));
    onClose();
    dispatch(showModal());
  }

  return (
    <div className="fixed inset-0 z-99 flex items-center justify-center bg-gray-500/50 p-4">
      <div className="product-modal__overlay product-modal__overlay absolute inset-0 z-10"></div>
      <div className="product-modal__wrapper relative z-20 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white">
         <button
          aria-label="Close quick view"
          onClick={onClose}
          className="
          absolute 
          right-3 top-3 z-30
          p-2 
          flex 
          items-center 
          justify-center
          text-xl
          md:text-2xl
          rounded-full
          bg-black/80 text-white
          cursor-pointer
          "><FiXCircle /></button>
        <div className="product-modal__container relative grid w-full grid-cols-1 p-6 md:grid-cols-2">
          <div className="product-modal__media col-span-1 flex min-w-0 w-full flex-col gap-2">
            {/* Main Swiper -> pass thumbs swiper instance */}
            <Swiper 
              modules={[Thumbs]} 
              spaceBetween={12}
              thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper: null, }}
              className="w-full min-w-0"
            >
              {
                product.images?.gallery && product.images?.gallery.map((image, index) => (
                  <SwiperSlide key={`${image.src}-${index}`}> 
                    <img src={image.src} alt={product.name} className="aspect-square w-full object-cover" />
                  </SwiperSlide>
                ))
              }
            </Swiper>

            {/* Thumbs Swiper -> store swiper instance */}
            {/* It is also required to set watchSlidesProgress prop */ }
            <Swiper
              modules={[Thumbs]}
              watchSlidesProgress
              slidesPerView={4}
              spaceBetween={8}
              onSwiper={setThumbsSwiper}
              className="w-full min-w-0"
            >
              {
                product.images?.gallery && product.images?.gallery.map((image, index) => (
                  <SwiperSlide key={`${index}-thumb-${image.src}`}> 
                    <img src={image.src} alt="Product-gallery" className="aspect-square w-full object-cover cursor-pointer" />
                  </SwiperSlide>
                ))
              }
            </Swiper>
          </div>
          <div className="product-modal__main-info min-w-0 pt-10 md:p-10">
            <div className="product-modal__main-info--content flex flex-col gap-2">
              <h2 className="text-3xl font-700">{ product.name }</h2>
              <div>
                {
                  product.price.onSalePrice ? 
                  <><span className="text-2xl text-red-600 font-600">{ formattedPrice(product.price.onSalePrice) }</span> <span className="text-gray-400 italic line-through">{formattedPrice(product.price.salePrice)}</span></>
                  :
                  <span className="text-2xl font-bold">{formattedPrice(product.price.salePrice)}</span>
                }
              </div>
              <p className="text-1.5 font-500">{ product.description }</p>
            </div>
            <div className="product-modal__main-info--form">
              <div className="product-modal__main-info--form-options">
                <div className="product-modal__main-info--form-options-color mt-5 flex flex-row justify-start items-center gap-2">
                  <h3 className="text-md font-800">Colors: </h3>
                  {
                    product.options?.colors?.map((item) => {
                      return <span key={`color-${item.name}`} className="block w-8 h-8 rounded-full border border-gray-300 transition-all duration-300 cursor-pointer" style={{backgroundColor: item.color}}></span>
                    })
                  }
                </div>
                <div className="product-modal__main-info--form-options-color mt-5 flex flex-row justify-start items-center gap-2">
                  <h3 className="text-md font-800">Sizes: </h3>
                  {
                    product.options?.sizes?.map((item) => {
                      return <span key={`size-${item.name}`} className="block py-1 px-4 rounded-lg border border-gray-300 hover:bg-gray-700 transition-all duration-300 hover:text-white cursor-pointer">{item.name}</span>
                    })
                  }
                </div>
              </div>
              <div className="product-modal__main-info--form-button mt-13">
                <div className="w-fit flex flex-row justify-start items-center gap-2 mt-5">
                  <h3 className="text-md font-700">Quantity: </h3>
                  <button
                    onClick={() => handleClick("increase")}
                    className="text-2xl cursor-pointer"
                  >
                    <FiPlusCircle />
                  </button>
                  <input
                    type="text" 
                    name="quantity" 
                    value={quantity}
                    onChange={(e) => handleChange(Number(e.target.value))}
                    className="w-10 border border-gray-300 text-center"
                  />
                  <button
                    onClick={() => handleClick("minus")}
                    className="text-2xl cursor-pointer"
                  >
                    <FiMinusCircle />
                  </button>
                </div>
                <div className="mt-5">
                  <button
                    onClick={() => addToCart(product, quantity)} 
                    className="w-full h-12 flex justify-center items-center gap-2 uppercase border border-gray-400 rounded-4xl transition-all duration-300 hover:bg-primary hover:text-white cursor-pointer"
                  >
                    <FiShoppingCart /> Add To Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
