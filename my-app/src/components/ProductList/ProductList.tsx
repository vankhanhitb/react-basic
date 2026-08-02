import { useState, useEffect } from 'react';
import { productsData, type productType } from "../../data/products";
import Container from "../Container";
import Card from "../Card";
import { formattedPrice } from "../../ulti/formatPrice";

import { A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';

export default function ProductList() {
  const [tabTitle, setTabTitle] = useState<string>("Accessories");
  const [product, setProduct] = useState<productType[]>([]);

  const changeTab= (tab: string) => {
    setTabTitle(tab);
  }

  useEffect(() => {
    const filterProduct = (tabTitle: string) => {
      const category: string = tabTitle;
      const productData = productsData.filter((product) => {
          const exists = product.categories?.some(item => item.name === category); // true
          return exists === true
      })
      if(productData.length){
        setProduct(productData);
      }
    }
    filterProduct(tabTitle);
  }, [tabTitle])

  return (
    <Container>
      <div className="heading flex justify-between flex-wrap content-start items-center mt-20 mb-5">
        <h2 className="text-3xl uppercase font-700">Hot This Week</h2>
        <div className="w-full sm:w-auto tab-button flex items-center gap-3 mt-3 justify-center sm:mt-0 sm:justify-end">
          <button
            onClick={() => changeTab('Accessories')}
            className={`px-4 py-2 border rounded-4xl cursor-pointer font-600 ${tabTitle === "Accessories"? "bg-amber-500 text-white" : ""}`}
          >
            Accessories
          </button>
          <button
            onClick={() => changeTab('Shirts')}
            className={`px-4 py-2 border rounded-4xl cursor-pointer font-600 ${tabTitle === "Shirts"? "bg-amber-500 text-white" : ""}`}
          >
            Shirts
          </button>
        </div>
      </div>
      {/* Show Products */}
      <Swiper
        modules={[A11y]}
        spaceBetween={20}
        slidesPerView={4.1}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >
        {
          product.map((product) => (
            <SwiperSlide key={product.productId}>
              <Card className="product-card flex flex-col gap-4">
                <div className="product-card__image w-full rounded-2xl overflow-hidden">
                  <img 
                    src={product.images?.featuredImage} 
                    alt="Product Image" 
                    className="object-contain"
                  />
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
              </Card>
            </SwiperSlide>
          ))
        }

      </Swiper>
      
    </Container>
  )
}
