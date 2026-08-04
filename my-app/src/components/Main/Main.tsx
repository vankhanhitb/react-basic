import React from 'react';
import { useSelector } from "react-redux";
import { type RootState } from "../../store/store";

import HeroSlider from '../HeroSlider/HeroSlider';
import ProductList from '../ProductList/ProductList';
import CollectionList from '../CollectionList/CollectionList';
import Testimonials from '../Testimonials/Testimonials';
import Subscribe from '../Subscribe/Subscribe';
import CartModal from "../CartModal";

export default function Main() {
  const cart = useSelector((state: RootState) => state.cart)
  const modalStatus = useSelector((state: RootState) => state.modal.isOpen)
  console.log(modalStatus)
  return (
    <>
      <HeroSlider />
      <ProductList />
      <CollectionList />
      <Testimonials />
      <Subscribe />
      {modalStatus === true && <CartModal cartData={cart} />}
    </>
  )
}
