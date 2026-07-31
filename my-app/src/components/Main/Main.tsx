import React from 'react';
import Container from '../Container';
import Hero from '../Hero/Hero';
import ProductList from '../ProductList/ProductList';
import CollectionList from '../CollectionList/CollectionList';
import Testimonials from '../Testimonials/Testimonials';
import Subscribe from '../Subscribe/Subscribe';

export default function Main() {
  return (
    <Container>
      <Hero />
      <ProductList />
      <CollectionList />
      <Testimonials />
      <Subscribe />
    </Container>
  )
}
