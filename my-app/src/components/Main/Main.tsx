import React from 'react';
import Container from '../Container';
import HeroSlider from '../HeroSlider/HeroSlider';
import ProductList from '../ProductList/ProductList';
import CollectionList from '../CollectionList/CollectionList';
import Testimonials from '../Testimonials/Testimonials';
import Subscribe from '../Subscribe/Subscribe';

export default function Main() {
  return (
    <Container>
      <HeroSlider />
      <ProductList />
      <CollectionList />
      <Testimonials />
      <Subscribe />
    </Container>
  )
}
