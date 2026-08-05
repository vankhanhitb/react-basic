import { useState, useEffect, useRef } from 'react';
import { productsData, type productType } from "../../data/products";
import Container from "../Container";
import ProductCard from "../ProductCard";
import ProductModal from "../ProductList/ProductModal";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';

gsap.registerPlugin(useGSAP);

export default function ProductList() {
  const [tabTitle, setTabTitle] = useState<string>("Accessories");
  const [product, setProduct] = useState<productType[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<productType | null>(null);
  const productListRef = useRef<HTMLDivElement>(null);

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

  useGSAP(
    () => {
      if (!product.length) return;

      gsap.fromTo(
        ".product-list__slide",
        {
          autoAlpha: 0,
          y: 60,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.12,
          ease: "power3.out",
          clearProps: "opacity,visibility,transform",
        },
      );
    },
    {
      scope: productListRef,
      dependencies: [product],
      revertOnUpdate: true,
    },
  );

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
      <div ref={productListRef}>
        <Swiper
          modules={[A11y]}
          spaceBetween={20}
          slidesPerView={4.1}
          breakpoints={{
            320: {
              slidesPerView: 1.1,
              spaceBetween: 15,
            },
            480: {
              slidesPerView: 2.1,
              spaceBetween: 15,
            },
            768: {
              slidesPerView: 3.1,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4.1,
            }
          }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
        >
          {
            product.map((product) => (
              <SwiperSlide className="product-list__slide" key={product.productId}>
                <ProductCard key={product.name} product={product} onQuickView={setSelectedProduct} className="product-card flex-col gap-4" />
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </Container>
  )
}
